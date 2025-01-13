import { stringToNumber } from '@/utils/numberUtils';

interface ProgressBarProps {
  value: string | number;
  max?: string | number;
  bgColor?: string;
  progressColor?: string;
}

export default function ProgressBar({
  value,
  max = 100,
  bgColor = 'bg-default-secondary',
  progressColor = 'bg-default-primary',
}: ProgressBarProps) {
  const numericValue = stringToNumber(value);
  const numericMax = stringToNumber(max);

  const percentage = numericValue === 0 ? 0 : (numericValue / numericMax) * 100;

  return (
    <div className={`h-1 w-full overflow-hidden rounded-sm ${bgColor}`}>
      <div
        className={`h-full transition-all duration-300 ${progressColor}`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
