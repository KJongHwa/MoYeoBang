import { slashYearMonthDay } from '@/utils/dateUtils';
import { useState } from 'react';

interface UseCalendarProps {
  onDateChange?: (date: string) => void;
}

export const useCalendar = ({ onDateChange }: UseCalendarProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [date, setDate] = useState<string>('');

  const handleChange = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleDateChange = (newDate: string) => {
    if (newDate === '') {
      setDate('');
    } else {
      setDate(slashYearMonthDay(newDate));
    }
    if (onDateChange) {
      onDateChange(newDate);
    }
  };

  return {
    isOpen,
    date,
    handleChange,
    handleDateChange,
  };
};
