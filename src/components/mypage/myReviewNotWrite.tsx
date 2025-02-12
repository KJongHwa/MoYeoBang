import { UseReviews } from '@/hooks/useReviews';
import usePagination from '@/hooks/usePagination';
import MyGatheringCard from './myGatheringCard';
import MyReviewNotWriteDetail from './myGatheringCard/myReviewNotWriteDetail';
import EmptyElement from '../@shared/EmptyElement';
import Spinner from '../@shared/Spinner';
import Pagination from '../@shared/Pagination';

export default function MyReviewNotWrite() {
  const itemsPerPage = 5;
  const {
    data: totalNotWriteMyReviews,
    isLoading: isNotWriteMyReviewsLoading,
  } = UseReviews({ reviewed: false, offset: 0, limit: 50 });

  const {
    currentItems: notWriteMyReviews,
    currentPage,
    handleNextPage,
    handlePrevPage,
    totalPages,
  } = usePagination(totalNotWriteMyReviews ?? [], itemsPerPage);
  if (isNotWriteMyReviewsLoading) {
    return <Spinner />;
  }
  if (!totalNotWriteMyReviews || totalNotWriteMyReviews.length === 0) {
    return <EmptyElement>아직 리뷰를 작성 가능한 모임이 없어요</EmptyElement>;
  }
  return (
    <div className="flex flex-col gap-5">
      {notWriteMyReviews.map((notWriteMyReview: any) => (
        <MyGatheringCard
          key={notWriteMyReview.gatheringId}
          image={notWriteMyReview.image}
          gatheringId={notWriteMyReview.gatheringId}
        >
          <MyReviewNotWriteDetail
            gatheringId={notWriteMyReview.gatheringId}
            dateTime={notWriteMyReview.dateTime}
            name={notWriteMyReview.name}
            themeName={notWriteMyReview.themeName}
            capacity={notWriteMyReview.capacity}
            participantCount={notWriteMyReview.participantCount}
          />
        </MyGatheringCard>
      ))}
      <Pagination
        currentPage={currentPage}
        totalItems={totalNotWriteMyReviews?.length || 1}
        itemsPerPage={itemsPerPage}
        onNext={handleNextPage}
        onPrev={handlePrevPage}
        className="mt-4 flex items-center justify-center gap-3"
        mypage={true}
      />
    </div>
  );
}
