'use client';

import { useCalendar } from '@/hooks/useCalendar';
import { clsx } from 'clsx';
import Image from 'next/image';
import CustomCalendar from '@/components/@shared/calendar/CustomCalendar';

interface DateDropdownProps {
  onDateChange(date: string): void;
}

export default function DateDropdown({ onDateChange }: DateDropdownProps) {
  const { isOpen, date, handleChange, handleDateChange } = useCalendar({
    onDateChange,
  });

  return (
    <div className={clsx('relative flex')}>
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
          {date === '' ? '날짜' : date}
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
          selectedDate={date}
          onClose={handleChange}
          onDateChange={handleDateChange}
          layout="top-12 -right-full -left-full md:left-0"
        />
      )}
    </div>
  );
}
