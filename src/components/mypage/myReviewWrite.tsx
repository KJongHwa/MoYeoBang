import { mockReviews } from '@/data/mockReviews';
import MyReviewCard from './myReviewCard';
import EmptyElement from '../@shared/EmptyElement';

export default function MyReviewWrite() {
  return (
    <div className="mt-10 flex flex-col gap-6">
      {mockReviews.length === 0 ? (
        <EmptyElement>아직 작성한 리뷰가 없어요</EmptyElement>
      ) : (
        mockReviews.map((review) => (
          <div key={review.reviewId}>
            <MyReviewCard
              score={review.score}
              comment={review.comment}
              createdAt={review.createdAt}
              Gathering={review.Gathering}
              User={review.User}
            />
          </div>
        ))
      )}
    </div>
  );
}
