import { mockGatherings } from '@/data/mockGatherings';
import MyGatheringCard from './myGatheringCard';
import MyCreateGatheringDetail from './myGatheringCard/myCreateGatheringDetail';
import EmptyElement from '../@shared/EmptyElement';

interface MyCreateGatheringProps {
  userID: number;
}
export default function MyCreateGathering({ userID }: MyCreateGatheringProps) {
  const userGatherings = mockGatherings.filter(
    (gathering: any) => gathering.userId === userID
  );
  if (userGatherings.length === 0) {
    return <EmptyElement>아직 만든 모임이 없어요</EmptyElement>;
  }
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
