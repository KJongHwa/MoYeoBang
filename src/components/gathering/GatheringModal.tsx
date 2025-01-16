import { useState, useEffect } from 'react';

import useCustomForm from '@/hooks/useCustomForm';
import { getToday } from '@/utils/dateUtils';
import { GatheringRequestBody } from '@/types/gathering.types';
import Modal from '@/components/@shared/Modal';
import Button from '@/components/@shared/Button';
import Input from '@/components/@shared/Input';
import { themeNameList } from '@/constants/themeList';
import { INIT_GATHRING } from '@/constants/initialValues';

import LocationSelector from './LocationSelector';
import CapacitySelector from './CapacitySelector';
import ThemeSelector from './ThemeSelector';

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
  const {
    register,
    handleSubmit,
    setValue,
    watchFields,
    formState: { isValid },
  } = useCustomForm<GatheringRequestBody['post']>(INIT_GATHRING.POST);

  const [location, setLocation] = useState<string>('');
  const [inputThemeName, setInputThemeName] = useState<string>('');
  const [selectedThemeName, setSelectedThemeName] = useState<string>('');
  const [filteredThemes, setFilteredThemes] = useState<string[]>([]);
  const [searchAttempted, setSearchAttempted] = useState<boolean>(false);
  const [dateTimeError, setDateTimeError] = useState<string>('');
  const [registrationEndError, setRegistrationEndError] = useState<string>('');

  const { themeName, capacity, dateTime, registrationEnd } = watchFields([
    'themeName',
    'capacity',
    'dateTime',
    'registrationEnd',
  ]);

  const handleLocationClick = (selectedLocation: string) => {
    setLocation(selectedLocation);
    setInputThemeName('');
    setSelectedThemeName('');
    setFilteredThemes([]);
    setSearchAttempted(false);
    setValue('location', selectedLocation);
    setValue('themeName', '');
  };

  const searchThemes = () => {
    if (inputThemeName.length > 0 && location) {
      const filtered = themeNameList[location]?.theme.filter((theme) =>
        theme.toLowerCase().includes(inputThemeName.toLowerCase())
      );
      setSearchAttempted(true);
      setFilteredThemes(filtered);
    } else {
      setSearchAttempted(false);
      setFilteredThemes([]);
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

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      customDimStyle="w-full md:w-[542px]"
    >
      <h1 className="mb-10 text-lg font-bold">
        {isEdit ? '모임 수정하기' : '모임 만들기'}
      </h1>
      <form
        onSubmit={handleSubmit(() => onClose())}
        className="flex flex-col gap-6"
      >
        <Input
          label="name"
          labelText="모임 이름"
          placeholder="모임 이름을 입력하세요."
          inputProps={{
            ...register('name', { required: true }),
          }}
        />
        <LocationSelector
          location={location}
          handleLocationClick={handleLocationClick}
        />
        {location && (
          <ThemeSelector
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
        <div className="flex flex-col gap-2">
          <Input
            label="dateTime"
            labelText="모임 날짜"
            inputProps={{
              type: 'date',
              ...register('dateTime', { required: true }),
            }}
            isError={!!dateTimeError}
            errorMessage={dateTimeError}
          />
          {dateTime && !dateTimeError && (
            <Input
              label="registrationEnd"
              labelText="마감 날짜"
              inputProps={{
                type: 'date',
                ...register('registrationEnd', { required: true }),
              }}
              isError={!!registrationEndError}
              errorMessage={registrationEndError}
            />
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
          disabled={
            !isValid || !themeName || !!registrationEndError || !!dateTimeError
          }
          className="mb-4 mt-14 w-full md:mt-6"
        >
          {isEdit ? '수정' : '생성'}
        </Button>
      </form>
    </Modal>
  );
}
