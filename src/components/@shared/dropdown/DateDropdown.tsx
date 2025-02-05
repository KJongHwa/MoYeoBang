'use client';

import { useEffect, useRef } from 'react';
import { useCalendar } from '@/hooks/useCalendar';
import { clsx } from 'clsx';
import Image from 'next/image';
import CustomCalendar from '@/components/@shared/calendar/CustomCalendar';
import { slashYearMonthDay } from '@/utils/dateUtils';

interface DateDropdownProps {
  onDateChange(date: string): void;
  selectedDate?: string | undefined;
}

export default function DateDropdown({
  onDateChange,
  selectedDate,
}: DateDropdownProps) {
  const { isOpen, date, setIsOpen, handleChange, handleDateChange } =
    useCalendar({
      onDateChange,
    });
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const listener = (event: MouseEvent) => handleClickOutside(event);

    document.addEventListener('mousedown', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
    };
  }, []);

  return (
    <div ref={dropdownRef} className={clsx('relative flex')}>
      <button
        type="button"
        onClick={handleChange}
        className={clsx(
          'h-7 md:h-[42px]',
          'relative',
          'border-2 border-default-tertiary',
          'rounded-xl',
          'py-2 pl-4 pr-3',
          'bg-default-tertiary',
          'flex items-center',
          'gap-2'
        )}
      >
        <p className="flex-1 text-xs font-medium text-text-tertiary md:text-sm">
          {slashYearMonthDay(selectedDate) || slashYearMonthDay(date) || '날짜'}
        </p>
        <Image
          src="/icons/chevron-down.svg"
          width={16}
          height={8}
          alt="dropdown arrow"
          className={clsx(
            'transition-transform duration-300 ease-in-out',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {isOpen && (
        <CustomCalendar
          isOpen={isOpen}
          selectedDate={selectedDate}
          onClose={handleChange}
          onDateChange={handleDateChange}
          layout="top-12 -right-full -left-full md:left-0"
        />
      )}
    </div>
  );
}
