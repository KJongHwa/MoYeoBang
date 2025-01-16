import { mockGatherings } from '@/data/mockGatherings';
import MyGatheringCard from './myGatheringCard';
import MyGatheringDetail from './myGatheringCard/myGatheringDetail';
import EmptyElement from '../@shared/EmptyElement';

export default function MyGathering() {
  if (mockGatherings.length === 0) {
    return <EmptyElement>신청한 모임이 아직 없어요</EmptyElement>;
  }
  return (
    <div className="flex flex-col gap-5">
      {mockGatherings.map((gathering: any) => (
        <MyGatheringCard key={gathering.gatheringId} image={gathering.image}>
          <MyGatheringDetail
            location={gathering.location}
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
