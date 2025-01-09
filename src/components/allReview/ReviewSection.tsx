import { mockReviews } from '@/data/mockReviews';
import ReviewCard from './ReviewCard';
import ReviewFilters from './ReviewFilters';

export default function ReviewSection() {
  return (
    <>
      <ReviewFilters />
      <div className="mt-10 flex flex-col gap-6">
        {mockReviews.map((review) => (
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
