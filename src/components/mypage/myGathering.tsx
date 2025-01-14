import { mockGatherings } from '@/data/mockGatherings';
import MyGatheringCard from './myGatheringCard';
import MyGatheringDetail from './myGatheringCard/myGatheringDetail';

export default function MyGathering() {
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
