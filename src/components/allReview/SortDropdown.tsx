import Dropdown from '../@shared/dropdown/SelectLocationDropdown';

const sortList = [
  { value: 'createdAt', label: '최신순' },
  { value: 'score', label: '평점순' },
  { value: 'participantCount', label: '참여 인원순' },
];

interface DropdownOption {
  value: string;
  label: string;
}

interface SortDropdownProps {
  onSortingChange: (value: string) => void;
}

export default function SortDropdown({ onSortingChange }: SortDropdownProps) {
  const handleChange = (option: DropdownOption) => {
    onSortingChange(option.value);
  };

  return (
    <Dropdown
      options={sortList}
      onChange={handleChange}
      defaultValue={sortList[0]}
      icon="/refresh.png"
    />
  );
}
