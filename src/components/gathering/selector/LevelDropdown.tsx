'use client';

import Dropdown, {
  DropdownOption,
} from '@/components/@shared/dropdown/SelectLocationDropdown';
import { levels } from '@/constants/themeList';

interface LevelDropdownProps {
  onLevelChange: (value: string) => void;
  selectedLevel: string | undefined;
}

export default function LevelDropdown({
  onLevelChange,
  selectedLevel,
}: LevelDropdownProps) {
  const handleChange = (option: DropdownOption) => {
    onLevelChange(option.value);
  };

  return (
    <Dropdown
      options={levels}
      onChange={handleChange}
      defaultLabel="난이도"
      selectedValue={selectedLevel}
    />
  );
}
