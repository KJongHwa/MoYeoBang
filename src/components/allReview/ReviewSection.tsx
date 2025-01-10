import { mockReviews } from '@/data/mockReviews';
import ReviewCard from './ReviewCard';
import ReviewFilters from './ReviewFilters';

interface ReviewSectionProps {
  selectedGenre: string;
  selectedLocation: string;
  onLocatingChange: (value: string) => void;
}

export default function ReviewSection({
  selectedGenre = 'all',
  selectedLocation = 'all',
  onLocatingChange,
}: ReviewSectionProps) {
  const filteredReviews = mockReviews.filter((review) => {
    const genreMatches =
      selectedGenre === 'all' || review.Gathering.genre === selectedGenre;
    const locationMatches =
      selectedLocation === 'all' ||
      review.Gathering.location === selectedLocation;
    return genreMatches && locationMatches;
  });

  return (
    <>
      <ReviewFilters onLocatingChange={onLocatingChange} />
      <div key={selectedGenre} className="mt-10 flex flex-col gap-6">
        {filteredReviews.map((review) => (
          <ReviewCard
            key={review.reviewId}
            score={review.score}
            comment={review.comment}
            createdAt={review.createdAt}
            Gathering={review.Gathering}
            User={review.User}
          />
        ))}
      </div>
    </>
  );
}
