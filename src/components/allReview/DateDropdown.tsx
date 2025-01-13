'use client';

import { formatDate } from '@/utils/dateUtils';
import { useState } from 'react';
import { clsx } from 'clsx';
import Image from 'next/image';
import CustomCalendar from '../@shared/CustomCalendar';

interface DateDropdownProps {
  onDateChange(date: string): void;
}

export default function DateDropdown({ onDateChange }: DateDropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [date, setDate] = useState<string>('날짜 전체');

  const handleChange = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleDateChange = (newDate: string) => {
    setDate(formatDate(newDate));
    onDateChange(newDate);
  };

  return (
    <div className={clsx('relative min-w-[120px]')}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          'h-[42px] w-[120px]',
          'relative',
          'border-2 border-[#808080]',
          'rounded-xl',
          'px-4 py-2',
          'bg-[#2C2C2C]',
          'flex items-center',
          'gap-[2px]'
        )}
      >
        <p className="flex-1 text-sm font-medium text-white">{date}</p>
        <Image
          src="/chevron-down.svg"
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
          onClose={handleChange}
          onDateChange={handleDateChange}
          layout="top-12"
        />
      )}
    </div>
  );
}
