import { useUserGatherings } from '@/hooks/useUserGatherings';
import MyGatheringCard from './myGatheringCard';
import MyGatheringDetail from './myGatheringCard/myGatheringDetail';
import EmptyElement from '../@shared/EmptyElement';
import Spinner from '../@shared/Spinner';
import CardMotion from '../@shared/animation/CardMotion';

export default function MyGathering() {
  const { data: myJoinedGatherings, isLoading: isJoinedLoading } =
    useUserGatherings({ isHost: false });

  if (isJoinedLoading) {
    return <Spinner />;
  }

  if (!myJoinedGatherings) {
    return <EmptyElement>모임 정보를 불러올 수 없습니다.</EmptyElement>;
  }

  if (myJoinedGatherings.length === 0) {
    return <EmptyElement>신청한 모임이 아직 없어요</EmptyElement>;
  }
  return (
    <div className="flex flex-col gap-5">
      {myJoinedGatherings.map((gathering: any) => (
        <CardMotion borderRadius="24px" key={gathering.gatheringId}>
          <MyGatheringCard
            gatheringId={gathering.gatheringId}
            image={gathering.image}
            isCanceled={gathering.canceled}
          >
            <MyGatheringDetail
              gatheringId={gathering.gatheringId}
              location={gathering.location}
              dateTime={gathering.dateTime}
              name={gathering.name}
              themeName={gathering.themeName}
              capacity={gathering.capacity}
              participantCount={gathering.participantCount}
              isCanceled={gathering.canceled}
            />
          </MyGatheringCard>
        </CardMotion>
      ))}
    </div>
  );
}
