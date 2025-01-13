'use client';

import Dropdown, { DropdownOption } from '@/components/@shared/Dropdown';

const levels = [
  { value: 'all', label: '난이도 전체' },
  { value: '초급', label: '초급' },
  { value: '중급', label: '중급' },
  { value: '고급', label: '고급' },
];

interface LevelDropdownProps {
  onLevelChange: (value: string) => void;
}

export default function LevelDropdown({ onLevelChange }: LevelDropdownProps) {
  const handleChange = (option: DropdownOption) => {
    onLevelChange(option.value);
  };

  return (
    <Dropdown
      options={levels}
      onChange={handleChange}
      defaultValue={levels[0]}
    />
  );
}
