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
  { value: 'all', label: '지역 전체' }, // 첫 번째 옵션으로 '지역 전체' 설정
  { value: 'gangnam', label: '강남' },
  { value: 'hongdae', label: '홍대' },
  { value: 'konkuk', label: '건대' },
  { value: 'hyehwa', label: '혜화' },
];
export default function SelectLocationDropdown({
  defaultValue = locationOptions[0],
  onChange,
  className,
}: DropdownProps) {
  const [selectedOption, setSelectedOption] = useState<DropdownOption>(
    defaultValue || locationOptions[0]
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSelect = (option: DropdownOption) => {
    setSelectedOption(option);
    setIsOpen(false);
    onChange?.(option);
  };

  return (
    <div className={clsx('relative min-w-[120px]', className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          'flex w-full items-center justify-between',
          'rounded-lg bg-black px-4 py-2',
          'text-white hover:bg-gray-800'
        )}
      >
        <span className="text-sm">{selectedOption.label}</span>
        <svg
          className={clsx(
            'h-5 w-5 transition-transform duration-200 ease-in-out',
            isOpen && 'rotate-180'
          )}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {isOpen && (
        <ul
          className={clsx(
            'absolute left-0 z-10 w-full',
            'mt-1 rounded-lg bg-black shadow-lg'
          )}
        >
          {locationOptions.map((option) => (
            <li key={option.value} className="p-0">
              <button
                type="button"
                onClick={() => handleSelect(option)}
                className={clsx(
                  'w-full cursor-pointer px-4 py-2 text-left text-sm',
                  'text-white hover:bg-gray-800',
                  'first:rounded-t-lg last:rounded-b-lg'
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
