import { UseReviews } from '@/hooks/useReviews';
import MyReviewCard from './myReviewCard';
import EmptyElement from '../@shared/EmptyElement';
import Spinner from '../@shared/Spinner';

export default function MyReviewWrite() {
  const { data: writeMyReviews, isLoading: isWriteMyReviewsLoading } =
    UseReviews({ reviewed: true });
  if (isWriteMyReviewsLoading) {
    return <Spinner />;
  }

  if (!writeMyReviews) {
    return (
      <EmptyElement>내가 쓴 리뷰의 정보를 불러올 수 없습니다.</EmptyElement>
    );
  }
  if (writeMyReviews.length === 0) {
    return <EmptyElement>아직 작성한 리뷰가 없어요</EmptyElement>;
  }
  return (
    <div className="mt-10 flex flex-col gap-6">
      {writeMyReviews.map((writeMyReview) => (
        <div key={writeMyReview.review.reviewId}>
          <MyReviewCard
            reviewId={writeMyReview.review.reviewId}
            score={writeMyReview.review.score}
            comment={writeMyReview.review.comment}
            themeName={writeMyReview.themeName}
            image={writeMyReview.image}
          />
        </div>
      ))}
    </div>
  );
}
