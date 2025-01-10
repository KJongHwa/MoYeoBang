import { mockReviews } from '@/data/mockReviews';
import ReviewCard from './ReviewCard';
import ReviewFilters from './ReviewFilters';

interface ReviewSectionProps {
  selectedGenre: string;
}

export default function ReviewSection({
  selectedGenre = 'all',
}: ReviewSectionProps) {
  const filteredReviews =
    selectedGenre === 'all'
      ? mockReviews
      : mockReviews.filter((review) => {
          return review.Gathering.genre === selectedGenre;
        });

  return (
    <>
      <ReviewFilters />
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
