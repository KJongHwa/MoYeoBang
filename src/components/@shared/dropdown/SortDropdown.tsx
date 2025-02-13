import { useState } from 'react';
import Image from 'next/image';
import { DropdownOption } from './Dropdown';
import SlideDownMotion from '../animation/SlideDownMotion';

interface SortDropdownProps {
  sortList: DropdownOption[];
  onSortingChange: (value: string) => void;
}

/**
 * 정렬 드롭다운
 *
 * @param sortList 드롭다운 옵션 배열
 * @param onSortingChange 선택값 변경 시 호출되는 콜백 함수
 */

export default function SortDropdown({
  sortList,
  onSortingChange,
}: SortDropdownProps) {
  const [selectedOption, setSelectedOption] = useState<DropdownOption>(
    sortList[0]
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSelect = (option: DropdownOption) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSortingChange(option.value);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex max-h-[42px] items-center gap-2 rounded-full bg-default-tertiary px-[6px] py-1 md:rounded-xl md:px-4 md:py-2"
      >
        <Image
          src="/icons/sort.svg"
          width={24}
          height={24}
          alt="정렬 아이콘"
          className={`transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-180' : ''}`}
        />
        <span className="hidden flex-1 text-sm font-medium text-secondary-40 md:block">
          {selectedOption.label}
        </span>
      </button>

      {isOpen && (
        <SlideDownMotion>
          <ul className="absolute right-0 z-10 mt-2 w-28 overflow-hidden rounded-xl bg-secondary-80 shadow-lg">
            {sortList.map((option) => (
              <li key={option.value} className="relative w-full p-1">
                <button
                  type="button"
                  onClick={() => handleSelect(option)}
                  className="flex w-full flex-1 cursor-pointer rounded-lg px-3 py-1 text-left text-xs text-white transition-colors duration-150 hover:bg-default-primary md:text-sm "
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </SlideDownMotion>
      )}
    </div>
  );
}
