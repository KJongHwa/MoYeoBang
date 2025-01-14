import { mockGatherings } from '@/data/mockGatherings';
import MyGatheringCard from './myGatheringCard';
import MyReviewNotWriteDetail from './myGatheringCard/myReviewNotWriteDetail';

export default function MyReviewNotWrite() {
  return (
    <div className="flex flex-col gap-5">
      {mockGatherings.map((gathering: any) => (
        <MyGatheringCard key={gathering.gatheringId} image={gathering.image}>
          <MyReviewNotWriteDetail
            dateTime={gathering.dateTime}
            name={gathering.name}
            themeName={gathering.themeName}
            capacity={gathering.capacity}
            participantCount={gathering.participantCount}
          />
        </MyGatheringCard>
      ))}
    </div>
  );
}
