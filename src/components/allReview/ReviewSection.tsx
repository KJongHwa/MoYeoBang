import { mockReviews } from '@/data/mockReviews';
import { hyphenYearMonthDay } from '@/utils/dateUtils';
import ReviewCard from './ReviewCard';
import ReviewFilters from './ReviewFilters';
import EmptyReview from './EmptyReview';

interface ReviewSectionProps {
  selectedGenre: string;
  selectedLocation: string;
  selectedDate: string;
  selectedSort: string;
  onLocatingChange: (value: string) => void;
  onDateChange: (value: string) => void;
  onSortingChange: (value: string) => void;
}

export default function ReviewSection({
  selectedGenre = 'all',
  selectedLocation = 'all',
  selectedDate = '',
  selectedSort = 'createdAt',
  onLocatingChange,
  onDateChange,
  onSortingChange,
}: ReviewSectionProps) {
  const filteredReviews = mockReviews
    .filter((review) => {
      const genreMatches =
        selectedGenre === 'all' || review.Gathering.genre === selectedGenre;
      const locationMatches =
        selectedLocation === 'all' ||
        review.Gathering.location === selectedLocation;
      const dateMatches =
        selectedDate === '' ||
        hyphenYearMonthDay(review.createdAt) === selectedDate;
      return genreMatches && locationMatches && dateMatches;
    })
    .sort((a, b) => {
      switch (selectedSort) {
        case 'createdAt':
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case 'score':
          return b.score - a.score;
        case 'participantCount':
          return b.Gathering.participantCount - a.Gathering.participantCount;
        default:
          return 0;
      }
    });

  return (
    <>
      <ReviewFilters
        onLocatingChange={onLocatingChange}
        onDateChange={onDateChange}
        onSortingChange={onSortingChange}
      />
      <div key={selectedGenre} className="mt-10 flex flex-col gap-6">
        {filteredReviews.length === 0 ? (
          <EmptyReview />
        ) : (
          filteredReviews.map((review) => (
            <ReviewCard
              key={review.reviewId}
              score={review.score}
              comment={review.comment}
              createdAt={review.createdAt}
              Gathering={review.Gathering}
              User={review.User}
            />
          ))
        )}
      </div>
    </>
  );
}
