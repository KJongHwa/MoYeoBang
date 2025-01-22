import { useState, useEffect } from 'react';

import type { GatheringRequestBody } from '@/types/gathering.types';
import useCustomForm from '@/hooks/useCustomForm';
import useToast from '@/hooks/useToast';
import { getToday } from '@/utils/dateUtils';
import { postGathering } from '@/axios/gather/apis';
import Toast from '@/components/@shared/Toast';
import Modal from '@/components/@shared/Modal';
import Button from '@/components/@shared/button/Button';
import Input from '@/components/@shared/input/Input';
import DateInput from '@/components/@shared/input/DateInput';
import DateTimeCalendar from '@/components/@shared/calendar/DateTimeCalendar';
import { themeNameList } from '@/constants/themeList';
import { INIT_GATHRING } from '@/constants/initialValues';
import { useCalendar } from '@/hooks/useCalendar';

import LocationSelector from './selector/LocationSelector';
import CapacitySelector from './selector/CapacitySelector';
import ThemeSelector from './selector/ThemeSelector';

interface GatheringModalProps {
  isOpen: boolean;
  onClose: () => void;
  isEdit?: boolean;
}

export default function GatheringModal({
  isOpen,
  onClose,
  isEdit = false,
}: GatheringModalProps) {
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
  const searchThemes = () => {
    setSearchAttempted(true);

    if (inputThemeName.length < 2) {
      setSearchMessage('2글자 이상 입력해주세요.');
      setFilteredThemes([]);
      return;
    }

    if (location) {
      const filtered = themeNameList[location]?.theme.filter((theme) =>
        theme.toLowerCase().includes(inputThemeName.toLowerCase())
      );

      if (filtered.length === 0) {
        setSearchMessage('검색어가 없어요. 다시 입력해 주세요.');
      } else {
        setSearchMessage('');
      }

      setFilteredThemes(filtered);
    }
  };

  // location이 변경될 때
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

  // 폼 제출 시 날짜 형식 포맷
  const onSubmit = async (data: GatheringRequestBody['post']) => {
    const dateTimeString = data.dateTime;
    const registrationEndString = data.registrationEnd;

    // 날짜와와 시간 분리
    const [datePart, ...timeParts] = dateTimeString.split(' ');
    const timePart = timeParts.join(' ');

    // AM/PM 정보 추출
    const periodParts = timePart.split(' ');
    const [hourString, minuteString] = periodParts[0].split(':');

    const selectedPeriod = periodParts[1];
    const selectedHour = parseInt(hourString, 10); // 정수 변환
    const selectedMinute = parseInt(minuteString, 10);

    // 등록 마감 시간
    const [regEndDatePart, regEndTimePart] = registrationEndString.split(' ');
    const [regEndHourString, regEndMinuteString] = regEndTimePart.split(':');
    const registrationEndPeriod = regEndTimePart.split(' ')[1];
    const registrationEndHour = parseInt(regEndHourString, 10);
    const registrationEndMinute = parseInt(regEndMinuteString, 10);

    // 선택된 시간에 따라 시간 조정
    const adjustHour = (hour: number, period: string) => {
      if (period === 'PM') {
        return hour === 12 ? hour : hour + 12;
      }
      return hour === 12 ? 0 : hour;
    };

    const adjustedHour = adjustHour(selectedHour, selectedPeriod);
    const adjustedRegistrationEndHour = adjustHour(
      registrationEndHour,
      registrationEndPeriod
    );

    // 최종 Date 객체 생성
    const finalDateTimeString = `${datePart}T${adjustedHour.toString().padStart(2, '0')}:${selectedMinute.toString().padStart(2, '0')}:00Z`; // UTC
    const finalDateTime = new Date(finalDateTimeString);

    const finalRegistrationEndString = `${regEndDatePart}T${adjustedRegistrationEndHour.toString().padStart(2, '0')}:${registrationEndMinute.toString().padStart(2, '0')}:00Z`;
    const finalRegistrationEnd = new Date(finalRegistrationEndString);

    const isoDateTime = finalDateTime.toISOString();
    const isoRegistrationEnd = finalRegistrationEnd.toISOString();

    const submissionData = {
      ...data,
      dateTime: isoDateTime,
      registrationEnd: isoRegistrationEnd,
    };

    try {
      await postGathering(submissionData);
      handleSuccess('모임이 생성되었습니다!');
      onClose();
    } catch (error) {
      console.error('Error:', error);
      handleError('모임 생성에 실패했습니다. 다시 시도해 주세요.');
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
            searchThemes={searchThemes}
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
