import { useUserGatherings } from '@/hooks/useUserGatherings';
import usePagination from '@/hooks/usePagination';
import MyGatheringCard from './myGatheringCard';
import MyGatheringDetail from './myGatheringCard/myGatheringDetail';
import EmptyElement from '../@shared/EmptyElement';
import Spinner from '../@shared/Spinner';
import CardMotion from '../@shared/animation/CardMotion';
import Pagination from '../@shared/Pagination';

export default function MyGathering() {
  const itemsPerPage = 5;
  const { data: totalMyJoinedGatherings, isLoading: isJoinedLoading } =
    useUserGatherings({ isHost: false, offset: 0, limit: 50 });
  const {
    currentItems: myJoinedGatherings,
    currentPage,
    handleNextPage,
    handlePrevPage,
    totalPages,
  } = usePagination(totalMyJoinedGatherings ?? [], itemsPerPage);
  if (isJoinedLoading) {
    return <Spinner />;
  }
  if (!totalMyJoinedGatherings || totalMyJoinedGatherings.length === 0) {
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
      <Pagination
        currentPage={currentPage}
        totalItems={totalMyJoinedGatherings?.length || 1}
        itemsPerPage={itemsPerPage}
        onNext={handleNextPage}
        onPrev={handlePrevPage}
        className="mt-4 flex items-center justify-center gap-3"
        mypage
      />
    </div>
  );
}
