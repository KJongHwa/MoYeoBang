import { useState } from 'react';

interface UseCalendarProps {
  onDateChange?: (date: string) => void; // 부모 컴포넌트로 날짜 데이터를 전달하는 콜백 (선택적)
}

/**
 * useCalendar Hook
 *
 * - 공용 캘린더 컴포넌트(CustomCalendar.tsx 및 DateTimeCalendar.tsx)에서 사용할 수 있도록 제공되는 커스텀 훅
 * - 상태 관리와 콜백 함수들을 통해 캘린더의 열림/닫힘 상태 및 선택된 날짜를 관리
 *
 * 주요 기능:
 * 1. `isOpen`: 캘린더의 열림/닫힘 상태를 나타내는 boolean 값
 * 2. `date`: 선택된 날짜를 문자열로 관리 (형식은 부모 컴포넌트에서 정의)
 * 3. `handleChange`: 캘린더의 열림/닫힘 상태를 토글
 * 4. `handleDateChange`: 선택된 날짜를 업데이트하고, 부모로 데이터를 전달 (필요시)
 *
 * 사용법:
 * const { isOpen, date, handleChange, handleDateChange } = useCalendar({ onDateChange });
 *
 * - `onDateChange`는 선택적 콜백으로, 부모 컴포넌트에 선택된 날짜를 전달할 때 사용됩니다.
 */
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
      setDate(newDate);
    }
    if (onDateChange) {
      onDateChange(newDate);
    }
  };

  return {
    setIsOpen,
    isOpen, // 캘린더 열림/닫힘 상태
    date, // 선택된 날짜
    handleChange, // 캘린더 상태 토글 함수
    handleDateChange, // 날짜 변경 함수
  };
};
