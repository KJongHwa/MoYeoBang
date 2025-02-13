import Image from 'next/image';
import { stringToNumber } from '@/utils/numberUtils';

interface ProgressBarProps {
  value: string | number;
  max?: string | number;
  bgColor?: string;
  progressColor?: string;
}

export default function ProgressPuzzleBar({
  value,
  max = 100,
  bgColor = 'bg-default-secondary',
  progressColor = 'bg-default-primary',
}: ProgressBarProps) {
  const numericValue = stringToNumber(value);
  const numericMax = stringToNumber(max);

  const percentage = numericValue === 0 ? 0 : (numericValue / numericMax) * 100;

  return (
    <div className={`h-3 w-full rounded-sm ${bgColor}`}>
      <div
        className={`relative h-full rounded-sm transition-all duration-300 ${progressColor}`}
        style={{ width: `${percentage}%` }}
      >
        <Image
          src="/icons/puzzle_full.svg"
          alt="보라색 퍼즐 아이콘"
          width={53}
          height={53}
          className="absolute -right-6 -top-3 h-9 w-9 md:-top-5 md:h-12 md:w-12"
        />
      </div>
    </div>
  );
}
