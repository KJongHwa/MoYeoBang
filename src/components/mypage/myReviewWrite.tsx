import { UseReviews } from '@/hooks/useReviews';
import usePagination from '@/hooks/usePagination';
import MyReviewCard from './myReviewCard';
import EmptyElement from '../@shared/EmptyElement';
import Spinner from '../@shared/Spinner';
import Pagination from '../@shared/Pagination';

export default function MyReviewWrite() {
  const itemsPerPage = 5;
  const { data: totalReviews, isLoading: isTotalReviewsLoading } = UseReviews({
    reviewed: true,
    offset: 0,
    limit: 50,
  });

  const {
    currentItems: writeMyReviews,
    currentPage,
    handleNextPage,
    handlePrevPage,
    totalPages,
  } = usePagination(totalReviews ?? [], itemsPerPage);

  if (isTotalReviewsLoading) {
    return <Spinner />;
  }
  if (!totalReviews || totalReviews.length === 0) {
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
            gatheringId={writeMyReview.gatheringId}
          />
        </div>
      ))}
      <Pagination
        currentPage={currentPage}
        totalItems={totalReviews?.length || 1}
        itemsPerPage={itemsPerPage}
        onNext={handleNextPage}
        onPrev={handlePrevPage}
        className="mt-4 flex items-center justify-center gap-3"
        mypage
      />
    </div>
  );
}
