import { mockGatherings } from '@/data/mockGatherings';
import MyGatheringCard from './myGatheringCard';

export default function MyGathering() {
  return (
    <div className="flex flex-col gap-5">
      {mockGatherings.map((gathering: any) => (
        <MyGatheringCard
          registrationEnd={gathering.registrationEnd}
          key={gathering.gatheringId}
          location={gathering.location}
          dateTime={gathering.dateTime}
          level={gathering.level.toString()}
          capacity={gathering.capacity}
          name={gathering.name}
          themeName={gathering.themeName}
          image={gathering.image}
          participantCount={gathering.participantCount.toString()}
        />
      ))}
    </div>
  );
}
