import MyGatheringCard from './myGatheringCard';
import MyReviewNotWriteDetail from './myGatheringCard/myReviewNotWriteDetail';
import EmptyElement from '../@shared/EmptyElement';
import { useUserGatherings } from '@/hooks/useUserGatherings';

export default function MyReviewNotWrite() {
  const { data: notWriteMyReviews, isLoading: isNotWriteMyReviewsLoading } =
    useUserGatherings({ reviewed: false });
  if (isNotWriteMyReviewsLoading) {
    return (
      // 추후 loading 스피너로 구현
      <div className="flex h-dvh items-center justify-center">Loading...</div>
    );
  }

  if (!notWriteMyReviews) {
    return (
      <div className="flex h-dvh items-center justify-center">
        작성 가능한 모임 정보를 불러올 수 없습니다.
      </div>
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
        >
          <MyReviewNotWriteDetail
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
