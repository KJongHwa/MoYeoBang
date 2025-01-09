'use client';

import { hyphenYearMonthDay } from '@/utils/dateUtils';
import { useState } from 'react';
import Calendar from 'react-calendar';
import Button from './Button';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface CustomCalendarProps {
  onDateChange(date: string): void;
}

export default function CustomCalendar({ onDateChange }: CustomCalendarProps) {
  const initialValue = new Date();
  const [date, setDate] = useState<string>(String(initialValue));

  const handleDateChange = (newDate: Value) => {
    setDate(hyphenYearMonthDay(String(newDate)));
  };

  const handleReset = () => {
    setDate(date);
    onDateChange(date);
  };

  const handleSubmit = () => {
    onDateChange(date);
  };

  return (
    <div className="border-1 flex h-[326px] w-[336px] flex-col rounded-lg border-gray-200 bg-white px-6 py-[10px] text-black shadow-xl">
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
        <Button className="w-[122px]" variant="secondary" onClick={handleReset}>
          초기화
        </Button>
        <Button className="w-[122px]" onClick={handleSubmit}>
          적용
        </Button>
      </div>
    </div>
  );
}
