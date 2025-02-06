import { slashYearMonthDay } from '@/utils/dateUtils';

interface FilterOptions {
  option: string; // 선택된 옵션
  target: string; // 비교할 값
  isDate?: boolean; // 날짜값인지 확인
}

export const filter = ({ option, target }: FilterOptions) => {
  return option === '' || target === option;
};

export const dateFilter = ({ option, target }: FilterOptions) => {
  return option === '' || slashYearMonthDay(target) === option;
};

// 필터들을 조합하여 사용
export const matchFilter = ({
  option,
  target,
  isDate = false,
}: FilterOptions) => {
  return isDate ? dateFilter({ option, target }) : filter({ option, target });
};

export const getLabelFromValue = (
  value: string,
  list: { value: string; label: string }[]
) => {
  return list.find((item) => item.value === value)?.label || '';
};
