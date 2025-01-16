import Image from 'next/image';

type PaginationProps = {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onNext: () => void;
  onPrev: () => void;
  className?: string;
};

export default function Pagination({
  currentPage,
  totalItems,
  itemsPerPage,
  onNext,
  onPrev,
  className,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className={className}>
      <button
        type="button"
        onClick={onPrev}
        disabled={currentPage === 0}
        className="h-6 w-6 rounded-l-md bg-secondary-90"
      >
        <Image
          src="/icons/arrow_line_white.svg"
          alt="흰색 화살표 아이콘"
          width={24}
          height={24}
          className={`rotate-180 ${currentPage === 0 && 'opacity-50'}`}
        />
      </button>
      <button
        type="button"
        onClick={onNext}
        disabled={currentPage === totalPages - 1}
        className="`h-6 w-6 rounded-r-md bg-secondary-90"
      >
        <Image
          src="/icons/arrow_line_white.svg"
          alt="흰색 화살표 아이콘"
          width={24}
          height={24}
          className={`${currentPage === totalPages - 1 && 'opacity-50'}`}
        />
      </button>
    </div>
  );
}
