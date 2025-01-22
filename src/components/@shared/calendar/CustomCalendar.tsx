'use client';

import { hyphenYearMonthDay, slashYearMonthDay } from '@/utils/dateUtils';
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import Button from '@/components/@shared/button/Button';
import '@/styles/customCalendar.css';

type CalendarValue = Date | null | [Date | null, Date | null];

interface CustomCalendarProps {
  isOpen: boolean;
  selectedDate: string;
  onClose(): void;
  onDateChange(date: string): void;
  layout?: string;
}

/**
 * 공통 Calendar 컴포넌트
 * @param isOpen 캘린더의 열린 상태 (true), 닫힌 상태 (false)를 가지는 boolean state
 * @param onClose 캘린더의 닫는 기능을 실행하는 함수
 * @param onDateChange 캘린더의 값을 교환하는 함수
 * @param layout 캘린더의 레이아웃을 수정하기 위한 tailwind css className
 */

export default function CustomCalendar({
  isOpen,
  selectedDate,
  onClose,
  onDateChange,
  layout,
}: CustomCalendarProps) {
  const [date, setDate] = useState<string>(selectedDate);

  const handleDateChange = (newDate: CalendarValue) => {
    setDate(hyphenYearMonthDay(String(newDate)));
  };

  const handleReset = () => {
    setDate('');
    onDateChange('');
    onClose();
  };

  const handleSubmit = () => {
    onDateChange(slashYearMonthDay(date));
    onClose();
  };

  // ESC 키 입력 시 캘린더 닫기 처리
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isOpen && e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <div
      className={`${isOpen ? '' : 'hidden'} ${layout} border-1 absolute z-100 flex h-[326px] w-[336px] flex-col rounded-lg border-gray-200 bg-white px-6 py-[10px] text-black shadow-xl`}
    >
      <Calendar
        onChange={handleDateChange}
        value={date}
        calendarType="gregory"
        locale="en-us"
        className="custom-calendar"
        next2Label={null}
        prev2Label={null}
        minDetail="year"
      />
      <div className="mx-auto flex w-[250px] items-center justify-between">
        <Button
          className="w-[122px]"
          variant="secondary"
          onClick={handleReset}
          disabled={date === ''}
        >
          초기화
        </Button>
        <Button
          className="w-[122px]"
          variant="primary"
          onClick={handleSubmit}
          disabled={date === ''}
        >
          적용
        </Button>
      </div>
    </div>
  );
}
