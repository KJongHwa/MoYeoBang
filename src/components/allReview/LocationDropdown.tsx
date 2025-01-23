import Dropdown, {
  DropdownOption,
} from '@/components/@shared/dropdown/SelectLocationDropdown';

import { locationList } from '@/constants/themeList';

interface LocationDropdownProps {
  onLocatingChange: (value: string) => void;
  selectedLocation?: string | undefined;
}

export default function LocationDropdown({
  onLocatingChange,
  selectedLocation,
}: LocationDropdownProps) {
  const handleChange = (option: DropdownOption) => {
    onLocatingChange(option.value);
  };

  return (
    <Dropdown
      options={locationList}
      onChange={handleChange}
      defaultLabel="지역"
      selectedValue={selectedLocation}
    />
  );
}
