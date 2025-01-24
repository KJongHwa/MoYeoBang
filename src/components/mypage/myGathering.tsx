import { mockGatherings } from '@/data/mockGatherings';
import { useQuery } from '@tanstack/react-query';
import { UserGatheringJoined } from '@/types/mypage.types';
import { getMyGatheringJoied } from '@/axios/mypage/api';
import MyGatheringCard from './myGatheringCard';
import MyGatheringDetail from './myGatheringCard/myGatheringDetail';
import EmptyElement from '../@shared/EmptyElement';

export default function MyGathering() {
  const { data: gatherings, isLoading: isGatheringLoading } = useQuery<
    UserGatheringJoined[]
  >({
    queryKey: ['myGatheringJoined'],
    queryFn: getMyGatheringJoied,
  });

  if (isGatheringLoading) {
    return (
      <div className="flex h-dvh items-center justify-center">Loading...</div>
    );
  }

  if (!gatherings) {
    return (
      <div className="flex h-dvh items-center justify-center">
        모임 정보를 불러올 수 없습니다.
      </div>
    );
  }
  if (gatherings.length === 0) {
    return <EmptyElement>신청한 모임이 아직 없어요</EmptyElement>;
  }
  return (
    <div className="flex flex-col gap-5">
      {gatherings.map((gathering: any) => (
        <MyGatheringCard
          key={gathering.gatheringId}
          image={gathering.image}
          isCanceled={gathering.isCanceled}
        >
          <MyGatheringDetail
            location={gathering.location}
            dateTime={gathering.dateTime}
            name={gathering.name}
            themeName={gathering.themeName}
            capacity={gathering.capacity}
            participantCount={gathering.participantCount}
            isCanceled={gathering.isCanceled}
          />
        </MyGatheringCard>
      ))}
    </div>
  );
}
