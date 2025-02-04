import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { GatheringRequestBody } from '@/types/gathering.types';
import useCustomForm from '@/hooks/useCustomForm';
import { useCalendar } from '@/hooks/useCalendar';
import useToast from '@/hooks/useToast';
import { getToday, convertToISO, splitDateTime } from '@/utils/dateUtils';
import { searchThemes } from '@/utils/searchUtils';
import { INIT_GATHRING } from '@/constants/initialValues';
import { postGathering } from '@/axios/gather/apis';

import Toast from '@/components/@shared/Toast';
import Modal from '@/components/@shared/Modal';
import Button from '@/components/@shared/button/Button';
import Input from '@/components/@shared/input/Input';
import DateInput from '@/components/@shared/input/DateInput';
import DateTimeCalendar from '@/components/@shared/calendar/DateTimeCalendar';
import { editMyCreateGathering } from '@/axios/mypage/api';
import LocationSelector from './selector/LocationSelector';
import CapacitySelector from './selector/CapacitySelector';
import ThemeSelector from './selector/ThemeSelector';

interface GatheringModalProps {
  isOpen: boolean;
  onClose: () => void;
  isEdit?: boolean;
  gatheringId?: number;
}

export default function GatheringModal({
  isOpen,
  onClose,
  isEdit = false,
  gatheringId,
}: GatheringModalProps) {
  const queryClient = useQueryClient();
  const { trigger, register, handleSubmit, setValue, watchFields, formState } =
    useCustomForm<GatheringRequestBody['post']>(INIT_GATHRING.POST);

  const [location, setLocation] = useState<string>('');
  const [inputThemeName, setInputThemeName] = useState<string>('');
  const [selectedThemeName, setSelectedThemeName] = useState<string>('');
  const [filteredThemes, setFilteredThemes] = useState<string[]>([]);
  const [searchAttempted, setSearchAttempted] = useState<boolean>(false);
  const [dateTimeError, setDateTimeError] = useState<string>('');
  const [registrationEndError, setRegistrationEndError] = useState<string>('');
  const [searchMessage, setSearchMessage] = useState<string>('');

  const { toastMessage, toastVisible, toastType, handleSuccess, handleError } =
    useToast();

  const { name, themeName, capacity, dateTime, registrationEnd } = watchFields([
    'name',
    'themeName',
    'capacity',
    'dateTime',
    'registrationEnd',
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
    const { filtered, message } = searchThemes(inputThemeName, location);
    setFilteredThemes(filtered);
    setSearchMessage(message);
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
      handleSuccess('모임이 생성되었습니다!');
      onClose();
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['gatherings'] });
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
      handleSuccess('모임이 수정되었습니다!');
      onClose();
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['gatherings'] });
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
      // 모임 수정
      await updateGathering(submissionData);
    } else {
      // 모임 생성
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
    themeName,
    dateTime,
    registrationEnd,
    registrationEndError,
    dateTimeError,
    trigger,
  ]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      customDimStyle="w-full md:w-[542px] overflow-visible"
    >
      <h1 className="mb-10 text-lg font-bold">
        {isEdit ? '모임 수정하기' : '모임 만들기'}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <Input
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
            setThemeName={(newName) => setValue('themeName', newName)}
            selectedThemeName={selectedThemeName}
            setSelectedThemeName={setSelectedThemeName}
            searchAttempted={searchAttempted}
          />
        )}
        <div className="relative flex flex-col gap-2">
          <DateInput
            label="dateTime"
            labelText="모임 날짜"
            placeholder="YYYY-MM-DD 00:00 AM"
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
          {dateTime && !dateTimeError && (
            <DateInput
              label="registrationEnd"
              labelText="마감 날짜"
              placeholder="YYYY-MM-DD 00:00 AM"
              inputProps={{
                readOnly: true,
                onClick: toggleEndDateCalendar,
                value: selectedEndDate || '',
                ...register('registrationEnd', { required: true }),
              }}
              isError={!!registrationEndError}
              errorMessage={registrationEndError}
            />
          )}
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
        <Button
          type="submit"
          variant="primary-gray"
          padding="10"
          disabled={!formState.isValid}
          className="mb-4 mt-3 w-full"
        >
          {isEdit ? '수정' : '생성'}
        </Button>
      </form>
      {toastVisible && <Toast message={toastMessage} type={toastType} />}
    </Modal>
  );
}
