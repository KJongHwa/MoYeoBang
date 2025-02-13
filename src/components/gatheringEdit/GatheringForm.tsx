'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { GatheringRequestBody } from '@/types/gathering.types';
import useCustomForm from '@/hooks/useCustomForm';
import { useCalendar } from '@/hooks/useCalendar';
import useToast from '@/hooks/useToast';
import { getToday, convertToISO, splitDateTime } from '@/utils/dateUtils';
import { searchThemes } from '@/utils/searchUtils';
import { INIT_GATHERING } from '@/constants/initialValues';
import { postGathering } from '@/axios/gather/apis';
import { themeNameList } from '@/constants/themeList';

import Toast from '@/components/@shared/Toast';
import Button from '@/components/@shared/button/Button';
import Input from '@/components/@shared/input/Input';
import TextArea from '@/components/@shared/input/TextArea';
import DateInput from '@/components/@shared/input/DateInput';
import DateTimeCalendar from '@/components/@shared/calendar/DateTimeCalendar';
import { editMyCreateGathering } from '@/axios/mypage/api';
import LocationSelector from '@/components/gatheringEdit/selector/LocationSelector';
import CapacitySelector from '@/components/gatheringEdit/selector/CapacitySelector';
import ThemeSelector from '@/components/gatheringEdit/selector/ThemeSelector';

interface GatheringFormProps {
  isEdit?: boolean;
  gatheringId?: number;
  editName?: string;
  editLocation?: string;
  editThemeName?: string;
  editDateTime?: string;
  editRegistrationEnd?: string;
  editMessage?: string;
}

export default function GatheringForm({
  isEdit = false,
  gatheringId,
  editName,
  editLocation,
  editThemeName,
  editDateTime,
  editRegistrationEnd,
  editMessage,
}: GatheringFormProps) {
  const queryClient = useQueryClient();
  const { trigger, register, handleSubmit, setValue, watchFields, formState } =
    useCustomForm<GatheringRequestBody['post']>(INIT_GATHERING.POST);

  const [location, setLocation] = useState<string>('');
  const [inputThemeName, setInputThemeName] = useState<string>('');
  const [selectedThemeName, setSelectedThemeName] = useState<string>('');
  const [filteredThemes, setFilteredThemes] = useState<string[]>([]);
  const [searchAttempted, setSearchAttempted] = useState<boolean>(false);
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);
  const [dateTimeError, setDateTimeError] = useState<string>('');
  const [registrationEndError, setRegistrationEndError] = useState<string>('');
  const [searchMessage, setSearchMessage] = useState<string>('');
  const [success, setSuccess] = useState(false);

  const { toastMessage, toastVisible, toastType, handleSuccess, handleError } =
    useToast();

  const { name, themeName, message, capacity, dateTime, registrationEnd } =
    watchFields([
      'name',
      'message',
      'themeName',
      'capacity',
      'dateTime',
      'registrationEnd',
    ]);

  // 모임 수정시 해당 pro을 default로
  useEffect(() => {
    if (isEdit) {
      if (editName) {
        setValue('name', editName);
      }
      if (editLocation) {
        setLocation(editLocation);
        setValue('location', editLocation);
      }
      if (editThemeName) {
        setSelectedThemeName(editThemeName);
        setValue('themeName', editThemeName);
      }
      if (editDateTime) {
        setValue('dateTime', editDateTime);
      }
      if (editRegistrationEnd) {
        setValue('registrationEnd', editRegistrationEnd);
      }
      if (editMessage) {
        setValue('message', editMessage);
      }
    }
  }, [
    isEdit,
    editName,
    editLocation,
    editThemeName,
    editDateTime,
    editRegistrationEnd,
    setValue,
  ]);

  // 모임 날짜 캘린더
  const {
    isOpen: isCalendarOpen,
    date: selectedDate,
    handleChange: toggleCalendar,
    handleDateChange,
  } = useCalendar({
    onDateChange: (newDate) => {
      setValue('dateTime', newDate || '');
    },
  });

  // 마감 날짜 캘린더
  const {
    isOpen: isEndDateCalendarOpen,
    date: selectedEndDate,
    handleChange: toggleEndDateCalendar,
    handleDateChange: handleEndDateChange,
  } = useCalendar({
    onDateChange: (newDate) => {
      setValue('registrationEnd', newDate || '');
    },
  });

  // 방탈출 지역 선택
  const handleLocationClick = (selectedLocation: string) => {
    setLocation(selectedLocation);
    setInputThemeName('');
    setSelectedThemeName('');
    setFilteredThemes([]);
    setSearchAttempted(false);
    setValue('location', selectedLocation);
    setValue('themeName', '');
  };

  // 방탈출 테마 검색
  const handleThemeSearch = () => {
    setSearchAttempted(true);
    const { filtered, searchErrorMessage } = searchThemes(
      inputThemeName,
      location
    );
    setFilteredThemes(filtered);
    setSearchMessage(searchErrorMessage);
    setShowThemeDropdown(true);

    if (searchErrorMessage) {
      setValue('themeName', '');
    }
  };

  // 방탈출 테마 전체보기
  const handleShowAllThemes = (selectedLocation: string) => {
    if (themeNameList[selectedLocation]) {
      const allThemes = themeNameList[selectedLocation].theme;
      setFilteredThemes(allThemes);
    } else {
      setFilteredThemes([]);
    }
    setShowThemeDropdown(true);
  };

  // 방탈출 지역 변경 처리
  useEffect(() => {
    if (location) {
      setSearchAttempted(false);
      setInputThemeName('');
      setSelectedThemeName('');
      setFilteredThemes([]);
      setValue('themeName', '');
    }
  }, [location, setValue]);

  // 모임 날짜 검증
  useEffect(() => {
    const today = getToday();
    if (!dateTime) return;
    const selectedDateTime = new Date(dateTime);

    if (selectedDateTime < today) {
      setDateTimeError('오늘 이전 날짜를 모임 날짜로 설정할 수 없습니다.');
      setValue('dateTime', '');
      setRegistrationEndError('');
    } else {
      setDateTimeError('');
    }
  }, [dateTime, setValue]);

  // 마감 날짜 검증
  useEffect(() => {
    const today = getToday();
    if (!(registrationEnd && dateTime)) return;
    const selectedRegistrationEnd = new Date(registrationEnd);
    const selectedDateTime = new Date(dateTime);

    if (selectedRegistrationEnd < today) {
      setRegistrationEndError(
        '오늘 이전 날짜를 마감 날짜로 설정할 수 없습니다.'
      );
      setValue('registrationEnd', '');
    } else if (selectedRegistrationEnd >= selectedDateTime) {
      setRegistrationEndError('마감 날짜는 모임 날짜보다 이전이어야 합니다.');
      setValue('registrationEnd', '');
    } else {
      setRegistrationEndError('');
    }
  }, [registrationEnd, dateTime, setValue]);

  // POST
  const { mutate: createGathering } = useMutation({
    mutationFn: async (submissionData: GatheringRequestBody['post']) =>
      postGathering(submissionData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gatherings'] });
      handleSuccess('모임이 생성되었습니다!');
      setTimeout(() => {
        setSuccess(true);
      }, 2000);
    },
    onError: (error: any) => {
      console.error('createGathering Error:', error);
      handleError('모임 생성에 실패했습니다. 다시 시도해 주세요.');
    },
  });

  // PUT
  const { mutate: updateGathering } = useMutation({
    mutationFn: async (submissionData: GatheringRequestBody['post']) => {
      if (!gatheringId) return Promise.resolve();
      return editMyCreateGathering(submissionData, gatheringId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gatherings'] });
      queryClient.invalidateQueries({ queryKey: ['myGatheringJoined'] });
      handleSuccess('모임이 수정되었습니다!');
      setTimeout(() => {
        setSuccess(true);
      }, 2000);
    },
    onError: (error: any) => {
      console.error('updateGathering Error:', error);
      handleError('모임 수정에 실패했습니다. 다시 시도해 주세요.');
    },
  });

  // 폼 제출 시 날짜 형식 포맷
  const onSubmit = async (data: GatheringRequestBody['post']) => {
    const dateTimeString = data.dateTime;
    const registrationEndString = data.registrationEnd;

    const [datePart, timePart] = splitDateTime(dateTimeString);
    const [regEndDatePart, regEndTimePart] = splitDateTime(
      registrationEndString
    );

    const isoDateTime = convertToISO(datePart, timePart);
    const isoRegistrationEnd = convertToISO(regEndDatePart, regEndTimePart);

    const submissionData = {
      ...data,
      dateTime: isoDateTime,
      registrationEnd: isoRegistrationEnd,
    };

    if (isEdit) {
      await updateGathering(submissionData);
    } else {
      await createGathering(submissionData);
    }
  };

  // 유효성 검사 강제 수행
  useEffect(() => {
    const validateForm = async () => {
      await trigger();
    };

    validateForm();
  }, [
    name,
    message,
    dateTime,
    registrationEnd,
    registrationEndError,
    dateTimeError,
    trigger,
  ]);

  // FIX: next-router-not-mounted 오류
  useEffect(() => {
    if (success) {
      window.location.href = isEdit ? '/mypage' : '/gathering';
    }
  }, [success, isEdit]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-12"
    >
      <main className="flex h-full w-full flex-col gap-12 px-4 pb-32 pt-5 md:gap-12 md:px-6 md:pb-40 md:pt-8 xl:mx-auto xl:max-w-[1166px] xl:px-0 xl:pt-12">
        <Input
          variant="elevated"
          label="name"
          labelText="모임 이름"
          placeholder="모임 이름을 입력하세요."
          inputProps={{
            ...register('name', {
              required: {
                value: true,
                message: '모임 이름을 입력해주세요.',
              },
              maxLength: {
                value: 12,
                message: '모임 이름은 12글자 이하로 입력해주세요.',
              },
            }),
          }}
          isError={!!formState.errors.name}
          errorMessage={formState.errors.name?.message}
        />
        <LocationSelector
          location={location}
          handleLocationClick={handleLocationClick}
        />
        {location && (
          <ThemeSelector
            searchMessage={searchMessage}
            location={location}
            inputThemeName={inputThemeName}
            setInputThemeName={setInputThemeName}
            searchThemes={handleThemeSearch}
            filteredThemes={filteredThemes}
            setFilteredThemes={setFilteredThemes}
            setThemeName={(newName) => setValue('themeName', newName)}
            selectedThemeName={selectedThemeName}
            setSelectedThemeName={setSelectedThemeName}
            searchAttempted={searchAttempted}
            showThemeDropdown={showThemeDropdown}
            setShowThemeDropdown={setShowThemeDropdown}
            handleShowAllThemes={handleShowAllThemes}
          />
        )}
        <TextArea
          variant="dark"
          size="large"
          labelColor="white"
          label="모집글"
          inputProps={{
            ...register('message', {
              required: {
                value: true,
                message: '모임 설명을 입력해주세요.',
              },
            }),
          }}
        />
        <div className="relative flex gap-5">
          <DateInput
            label="dateTime"
            labelText="모임 날짜"
            inputProps={{
              readOnly: true,
              onClick: toggleCalendar,
              value: selectedDate || '',
              ...register('dateTime', { required: true }),
            }}
            isError={!!dateTimeError}
            errorMessage={dateTimeError}
          />
          {isCalendarOpen && (
            <div className="fixed inset-0 z-90 flex items-center justify-center bg-black bg-opacity-50">
              <DateTimeCalendar
                isOpen={isCalendarOpen}
                selectedDate={selectedDate}
                onClose={toggleCalendar}
                onDateChange={handleDateChange}
                layout="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-90"
              />
            </div>
          )}
          <DateInput
            label="registrationEnd"
            labelText="마감 날짜"
            inputProps={{
              readOnly: true,
              onClick: toggleEndDateCalendar,
              value: selectedEndDate || '',
              ...register('registrationEnd', { required: true }),
              disabled: !dateTime || !!dateTimeError,
            }}
            isError={!!registrationEndError}
            errorMessage={registrationEndError}
          />
          {isEndDateCalendarOpen && (
            <div className="fixed inset-0 z-90 flex items-center justify-center bg-black bg-opacity-50">
              <DateTimeCalendar
                isOpen={isEndDateCalendarOpen}
                selectedDate={selectedEndDate}
                onClose={toggleEndDateCalendar}
                onDateChange={handleEndDateChange}
                layout="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-90"
              />
            </div>
          )}
        </div>
        <CapacitySelector
          capacity={capacity}
          setCapacity={(newCapacity) => setValue('capacity', newCapacity)}
        />
        {toastVisible && <Toast message={toastMessage} type={toastType} />}
      </main>

      <footer className="fixed bottom-0 w-screen border-t-2 border-secondary-70 bg-secondary-100 px-4 pb-6 pt-2 md:px-6 md:py-1 xl:px-0">
        <div className="my-auto flex max-w-[1166px] items-center justify-between xl:mx-auto">
          <div className="flex md:gap-6 xl:gap-14">
            <Image
              src="/images/puzzle_footer.png"
              alt="하단 퍼즐 캐릭터"
              width={113}
              height={78}
              className="-mb-1 hidden md:block"
            />
            <p className="my-auto hidden text-sm font-semibold md:block xl:text-base">
              모집글 쓰고 손발이 척척 맞는 <br className="xl:hidden" /> 방탈출
              팀원을 모집해보세요!
            </p>
          </div>
          <div className="mx-auto flex gap-2 md:mx-0">
            <Link href={isEdit ? '/mypage' : '/gathering'}>
              <Button className="w-36 bg-secondary-70 hover:bg-secondary-60">
                취소
              </Button>
            </Link>
            <Button
              type="submit"
              variant="primary-gray"
              padding="10"
              disabled={!formState.isValid || !location || !themeName}
              className="w-36"
            >
              {isEdit ? '수정' : '생성'}
            </Button>
          </div>
        </div>
      </footer>
    </form>
  );
}
