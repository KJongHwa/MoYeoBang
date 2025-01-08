import { stringToNumber } from '@/utils/numberUtils';

interface ProgressBarProps {
  value: string | number;
  max?: string | number;
}

export default function ProgressBar({ value, max = 100 }: ProgressBarProps) {
  const numericValue = stringToNumber(value);
  const numericMax = stringToNumber(max);

  const percentage = (numericValue / numericMax) * 100;

  return (
    <div className="h-1 w-full overflow-hidden rounded-sm bg-gray-200">
      <div
        className="bg-text-disabled h-full transition-all duration-300"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
