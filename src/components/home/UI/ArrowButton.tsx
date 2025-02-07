import clsx from 'clsx';
import Image from 'next/image';

interface ArrowButtonProps {
  onClick?: () => void;
  type: 'next' | 'prev';
}

export default function ArrowButton({ onClick, type }: ArrowButtonProps) {
  return (
    <button
      type="button"
      className={clsx(
        'absolute bottom-1/2 top-1/2 z-10 m-auto flex h-6 w-6 rounded-full bg-default-tertiary outline outline-2 outline-primary-0',
        {
          'right-5': type === 'next',
          'left-5': type === 'prev',
        }
      )}
      onClick={onClick}
    >
      <Image
        src="/icons/arrow_line_white.svg"
        alt="흰색 화살표 아이콘"
        width={24}
        height={24}
        className={clsx('base-class', {
          'rotate-180': type === 'prev',
        })}
      />
    </button>
  );
}
