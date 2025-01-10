import { mockGatherings } from '@/data/mockGatherings';
import GatheringCard from '../gathering/GatheringCard';

export default function MyReviewNotWrite() {
  return (
    <div className="flex-col gap-3">
      {mockGatherings.map((gathering: any) => (
        <GatheringCard
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
