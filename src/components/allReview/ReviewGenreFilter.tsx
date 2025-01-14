import { genres } from '@/constants/themeList';

interface ReviewGenreFilterProps {
  selectedGenre: string;
  onGenreChange: (value: string) => void;
}

export default function ReviewGenreFilter({
  selectedGenre,
  onGenreChange,
}: ReviewGenreFilterProps) {
  const handleGenreClick = (value: string) => {
    onGenreChange(value);
  };

  const buttonClass = (isSelected: boolean) =>
    isSelected ? 'text-white customUnderline' : 'text-text-disabled';

  return (
    <ul className="scrollbar-hidden flex  gap-3 overflow-x-auto overflow-y-hidden whitespace-nowrap text-lg font-semibold">
      {genres.map((genre) => (
        <button
          key={genre.value}
          type="button"
          onClick={() => handleGenreClick(genre.value)}
          className={buttonClass(selectedGenre === genre.value)}
        >
          {genre.label}
        </button>
      ))}
    </ul>
  );
}
