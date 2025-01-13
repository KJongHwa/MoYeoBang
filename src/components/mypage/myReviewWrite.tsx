import { mockReviews } from '@/data/mockReviews';
import MyReviewCard from './myReviewCard';

export default function MyReviewWrite() {
  return (
    <div className="mt-10 flex flex-col gap-6">
      {mockReviews.map((review) => (
        <div key={review.reviewId}>
          <MyReviewCard
            score={review.score}
            comment={review.comment}
            createdAt={review.createdAt}
            Gathering={review.Gathering}
            User={review.User}
          />
        </div>
      ))}
    </div>
  );
}
