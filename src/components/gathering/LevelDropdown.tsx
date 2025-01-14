'use client';

import Dropdown, { DropdownOption } from '@/components/@shared/Dropdown';
import { levels } from '@/constants/themeList';

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
