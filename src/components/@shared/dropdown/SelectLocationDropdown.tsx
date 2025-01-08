'use client';

import { useState } from 'react';
import { clsx } from 'clsx';

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  defaultValue?: DropdownOption;
  onChange?: (option: DropdownOption) => void;
  className?: string;
}

const locationOptions: DropdownOption[] = [
  { value: 'all', label: '지역 전체' },
  { value: 'gangnam', label: '강남' },
  { value: 'hongdae', label: '홍대' },
  { value: 'konkuk', label: '건대' },
  { value: 'hyehwa', label: '혜화' },
];

function ChevronIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      width="15.7px"
      height="7.42px"
      viewBox="0 0 14 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx(
        'transition-transform duration-200',
        isOpen && 'rotate-180'
      )}
    >
      <path
        d="M7.71513 7.4653C7.3975 7.76539 6.90085 7.7654 6.58321 7.4653L0.8047 2.00605C0.262753 1.49404 0.625105 0.582861 1.37066 0.582861L12.9276 0.582862C13.6732 0.582862 14.0355 1.49404 13.4936 2.00604L7.71513 7.4653Z"
        fill="#D0D0D0"
      />
    </svg>
  );
}

/**
 * 지역 선택을 위한 드롭다운 컴포넌트
 *
 * @param defaultValue 초기 선택값 (기본값: 지역 전체)
 * @param onChange 선택값 변경 시 호출되는 콜백 함수
 * @param className 추가 스타일링을 위한 클래스명
 */

export default function SelectLocationDropdown({
  defaultValue = locationOptions[0],
  onChange,
  className,
}: DropdownProps) {
  const [selectedOption, setSelectedOption] =
    useState<DropdownOption>(defaultValue);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSelect = (option: DropdownOption) => {
    setSelectedOption(option);
    setIsOpen(false);
    onChange?.(option);
  };

  return (
    <div className={clsx('relative', className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          'h-[42px] w-[110px]',
          'relative',
          'border-2 border-[#808080]',
          'rounded-xl',
          'pb-[7px] pl-[17px] pr-[14px] pt-[7px]',
          'bg-[#2C2C2C]',
          'flex items-center justify-between',
          'gap-[7px]'
        )}
      >
        <span className="text-sm font-medium text-white">
          {selectedOption.label}
        </span>
        <ChevronIcon isOpen={isOpen} />
      </button>

      {isOpen && (
        <ul
          className={clsx(
            'absolute left-0 z-10 w-[90px]',
            'mt-2',
            'rounded-xl',
            'bg-[#404048]',
            'overflow-hidden shadow-lg'
          )}
        >
          {locationOptions.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                onClick={() => handleSelect(option)}
                className={clsx(
                  'w-full px-4 py-2 text-left',
                  'text-sm font-medium text-white',
                  'hover:bg-[#4A4A52]',
                  'transition-colors duration-150'
                )}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export { locationOptions };
export type { DropdownOption };
