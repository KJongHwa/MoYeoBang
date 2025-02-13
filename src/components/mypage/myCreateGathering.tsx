import { useUserGatherings } from '@/hooks/useUserGatherings';
import usePagination from '@/hooks/usePagination';
import MyGatheringCard from './myGatheringCard';
import MyCreateGatheringDetail from './myGatheringCard/myCreateGatheringDetail';
import EmptyElement from '../@shared/EmptyElement';
import Spinner from '../@shared/Spinner';
import CardMotion from '../@shared/animation/CardMotion';
import Pagination from '../@shared/Pagination';

export default function MyCreateGathering() {
  const itemsPerPage = 5;
  const {
    data: totalMyCreateGatherings,
    isLoading: isMyCreateGatheringsLoading,
  } = useUserGatherings({ isHost: true, offset: 0, limit: 50 });
  const {
    currentItems: myCreateGatherings,
    currentPage,
    handleNextPage,
    handlePrevPage,
    totalPages,
  } = usePagination(totalMyCreateGatherings ?? [], itemsPerPage);
  if (isMyCreateGatheringsLoading) {
    return <Spinner />;
  }
  if (!totalMyCreateGatherings || totalMyCreateGatherings.length === 0) {
    return <EmptyElement>아직 만든 모임이 없어요</EmptyElement>;
  }
  return (
    <div className="flex flex-col gap-5">
      {myCreateGatherings.map((gathering: any) => (
        <CardMotion borderRadius="24px" key={gathering.gatheringId}>
          <MyGatheringCard
            image={gathering.image}
            gatheringId={gathering.gatheringId}
          >
            <MyCreateGatheringDetail
              location={gathering.location}
              dateTime={gathering.dateTime}
              name={gathering.name}
              themeName={gathering.themeName}
              capacity={gathering.capacity}
              participantCount={gathering.participantCount}
              gatheringId={gathering.gatheringId}
            />
          </MyGatheringCard>
        </CardMotion>
      ))}
      <Pagination
        currentPage={currentPage}
        totalItems={totalMyCreateGatherings?.length || 1}
        itemsPerPage={itemsPerPage}
        onNext={handleNextPage}
        onPrev={handlePrevPage}
        className="mt-4 flex items-center justify-center gap-3"
        mypage
      />
    </div>
  );
}
