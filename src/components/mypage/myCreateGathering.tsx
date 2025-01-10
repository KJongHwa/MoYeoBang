import { mockGatherings } from '@/data/mockGatherings';
import MyGatheringCard from './myGatheringCard';

interface MyCreateGatheringProps {
  userID: number; //
}

export default function MyCreateGathering({ userID }: MyCreateGatheringProps) {
  console.log(userID);
  const userGatherings = mockGatherings.filter(
    (gathering: any) => gathering.userId === userID
  );

  return (
    <div className="flex flex-col gap-5">
      {userGatherings.map((gathering: any) => (
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
