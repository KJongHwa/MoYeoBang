import { sortList } from '@/constants/sortList';

import SortDropdown from '@/components/@shared/dropdown/SortDropdown';
import DateDropdown from '@/components/@shared/dropdown/DateDropdown';
import LocationDropdown from '@/components/@shared/dropdown/LocationDropdown';

interface ReviewFiltersProps {
  onLocatingChange: (value: string) => void;
  onDateChange: (value: string) => void;
  onSortingChange: (value: string) => void;
}

export default function ReviewFilters({
  onLocatingChange,
  onDateChange,
  onSortingChange,
}: ReviewFiltersProps) {
  return (
    <div className="flex justify-between">
      <div className="flex gap-2">
        <LocationDropdown onLocatingChange={onLocatingChange} />
        <DateDropdown onDateChange={onDateChange} />
      </div>
      <SortDropdown
        onSortingChange={onSortingChange}
        sortList={sortList.review}
      />
    </div>
  );
}
