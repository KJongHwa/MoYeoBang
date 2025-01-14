import Dropdown, {
  DropdownOption,
} from '@/components/@shared/dropdown/SelectLocationDropdown';

interface SortDropdownProps {
  sortList: DropdownOption[];
  onSortingChange: (value: string) => void;
}

export default function SortDropdown({
  sortList,
  onSortingChange,
}: SortDropdownProps) {
  const handleChange = (option: DropdownOption) => {
    onSortingChange(option.value);
  };

  return (
    <Dropdown
      options={sortList}
      onChange={handleChange}
      defaultValue={sortList[0]}
      icon="/icons/sort.svg"
    />
  );
}
