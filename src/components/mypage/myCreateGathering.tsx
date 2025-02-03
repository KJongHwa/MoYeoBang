import { useUserGatherings } from '@/hooks/useUserGatherings';
import MyGatheringCard from './myGatheringCard';
import MyCreateGatheringDetail from './myGatheringCard/myCreateGatheringDetail';
import EmptyElement from '../@shared/EmptyElement';

export default function MyCreateGathering() {
  const { data: myCreateGatherings, isLoading: isMyCreateGatheringsLoading } =
    useUserGatherings({ isHost: true });
  if (isMyCreateGatheringsLoading) {
    return (
      // 추후 loading 스피너로 구현
      <div className="flex h-dvh items-center justify-center">Loading...</div>
    );
  }

  if (!myCreateGatherings) {
    return (
      <div className="flex h-dvh items-center justify-center">
        모임 정보를 불러올 수 없습니다.
      </div>
    );
  }
  if (myCreateGatherings.length === 0) {
    return <EmptyElement>아직 만든 모임이 없어요</EmptyElement>;
  }
  return (
    <div className="flex flex-col gap-5">
      {myCreateGatherings.map((gathering: any) => (
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
