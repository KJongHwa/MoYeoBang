import { mockGatherings } from '@/data/mockGatherings';
import MyGatheringCard from './myGatheringCard';
import MyCreateGatheringDetail from './myGatheringCard/myCreateGatheringDetail';

interface MyCreateGatheringProps {
  userID: number; //
}

export default function MyCreateGathering({ userID }: MyCreateGatheringProps) {
  const userGatherings = mockGatherings.filter(
    (gathering: any) => gathering.userId === userID
  );

  return (
    <div className="flex flex-col gap-5">
      {userGatherings.map((gathering: any) => (
        <MyGatheringCard key={gathering.gatheringId} image={gathering.image}>
          <MyCreateGatheringDetail
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
