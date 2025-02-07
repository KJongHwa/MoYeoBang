import { UseReviews } from '@/hooks/useReviews';
import MyGatheringCard from './myGatheringCard';
import MyReviewNotWriteDetail from './myGatheringCard/myReviewNotWriteDetail';
import EmptyElement from '../@shared/EmptyElement';
import Spinner from '../@shared/Spinner';

export default function MyReviewNotWrite() {
  const { data: notWriteMyReviews, isLoading: isNotWriteMyReviewsLoading } =
    UseReviews({ reviewed: false });
  if (isNotWriteMyReviewsLoading) {
    return <Spinner />;
  }

  if (!notWriteMyReviews) {
    return (
      <EmptyElement>작성 가능한 모임 정보를 불러올 수 없습니다.</EmptyElement>
    );
  }
  if (notWriteMyReviews.length === 0) {
    return <EmptyElement>아직 작성 가능한 리뷰가 없어요</EmptyElement>;
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
    </div>
  );
}
