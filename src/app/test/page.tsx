'use client';

import { useState } from 'react';
import Button from '@/components/@shared/Button';
import Dropdown, {
  DropdownOption,
} from '@/components/@shared/dropdown/SelectLocationDropdown';
import Input from '@/components/@shared/Input';
import Modal from '@/components/@shared/Modal';
import TextArea from '@/components/@shared/TextArea';
import CustomCalendar from '@/components/@shared/CustomCalendar';

// 옵션 데이터 정의 예시
const locationOptions: DropdownOption[] = [
  { value: 'all', label: '지역 전체' },
  { value: 'gangnam', label: '강남' },
  { value: 'hongdae', label: '홍대' },
  { value: 'konkuk', label: '건대' },
  { value: 'hyehwa', label: '혜화' },
];

export default function Test() {
  const [isModal, setIsModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<DropdownOption>(
    locationOptions[0]
  );

  const [date, setDate] = useState<string>('');
  const handleDateChange = (newDate: string) => {
    setDate(newDate);
  };

  const openModalhandler = () => setIsModal(true);
  const closeModalhandler = () => setIsModal(false);

  const handleLocationChange = (option: DropdownOption) => {
    setSelectedLocation(option);
  };

  return (
    <main className="m-10 flex flex-col items-center gap-12">
      <h1 className="text-lg">공통 컴포넌트 테스트 페이지</h1>

      <section className="w-full text-center">
        <h2 className="mb-3 bg-slate-200 p-1 font-extrabold">Button</h2>
        <ul className="text-left">
          <h3>{`variant = "primary"`}</h3>
          <li className="my-2 flex justify-between">
            <Button variant="primary" size="small" font="14">
              생성하기
            </Button>
            <Button variant="primary" size="large">
              생성하기
            </Button>
            <Button variant="primary" disabled>
              비활성화
            </Button>
          </li>
          <h3>{`variant = "secondary"`}</h3>
          <li className="my-2 flex justify-between">
            <Button variant="secondary" size="small" font="14">
              생성하기
            </Button>
            <Button variant="secondary" size="large" className="bg-gray-50">
              생성하기
            </Button>
            <Button variant="secondary" disabled>
              비활성화
            </Button>
          </li>
        </ul>
      </section>

      <section className="w-full text-center">
        <h2 className="mb-3 bg-slate-200 p-1 font-extrabold">Dropdown</h2>
        <div className="flex justify-center gap-4">
          <Dropdown
            options={locationOptions}
            defaultValue={locationOptions[0]}
            onChange={handleLocationChange}
          />
          <p className="text-sm">디버깅용: {selectedLocation.label}</p>
        </div>
      </section>

      <section className="w-full text-center">
        <h2>모달</h2>
        <Button
          variant="primary"
          size="small"
          font="14"
          onClick={openModalhandler}
        >
          모임 만들기
        </Button>
        <Modal isOpen={isModal} onClose={closeModalhandler}>
          <input
            placeholder="포커싱이 자동으로 되는지 테스트"
            className="w-[260px]"
          />
        </Modal>
      </section>

      <section className="flex w-full flex-col gap-4 text-center">
        <h2 className="mb-3 bg-slate-200 p-1 font-extrabold">TextArea</h2>
        <TextArea placeholder="JSDoc 주석을 추가했습니다." label="label" />
        <TextArea
          placeholder="label 값과 labelText 값을 따로 지정해줄 수 있습니다. labelText 속성을 사용할 때 label 속성이 필수입니다."
          label="labelText"
          isError
          errorMessage="에러 메세지 디자인은 동일합니다."
        />
      </section>

      <section className="flex w-full flex-col gap-4 text-center">
        <h2 className="mb-3 bg-slate-200 p-1 font-extrabold">Input</h2>
        <Input
          placeholder="디자인 시안에 없는 부분, focus 스타일을 추가했습니다."
          label="예시1"
          labelText="fontSize=16 / fontColor=dark / gap=12"
          fontSize="16"
          gap="12"
          fontColor="dark"
        />
        <Input
          placeholder="placeholder"
          label="예시2"
          labelText="fontSize=14 / fontColor=light / gap=8"
          fontSize="14"
          fontColor="light"
          gap="8"
          isError
          errorMessage="에러 메세지 디자인은 동일합니다."
        />
      </section>

      <section>
        <input
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="text-black"
        />
        <CustomCalendar onDateChange={handleDateChange} />
      </section>
    </main>
  );
}
