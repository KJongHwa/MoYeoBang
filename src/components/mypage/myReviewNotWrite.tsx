import { mockGatherings } from '@/data/mockGatherings';
import MyGatheringCard from './myGatheringCard';
import MyReviewNotWriteDetail from './myGatheringCard/myReviewNotWriteDetail';
import EmptyElement from '../@shared/EmptyElement';

export default function MyReviewNotWrite() {
  return (
    <div className="flex flex-col gap-5">
      {mockGatherings.length === 0 ? (
        <EmptyElement>아직 작성 가능한 리뷰가 없어요</EmptyElement>
      ) : (
        mockGatherings.map((gathering: any) => (
          <MyGatheringCard key={gathering.gatheringId} image={gathering.image}>
            <MyReviewNotWriteDetail
              dateTime={gathering.dateTime}
              name={gathering.name}
              themeName={gathering.themeName}
              capacity={gathering.capacity}
              participantCount={gathering.participantCount}
            />
          </MyGatheringCard>
        ))
      )}
    </div>
  );
}
