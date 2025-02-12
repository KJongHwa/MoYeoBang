'use client';

import EmptyElement from '@/components/@shared/EmptyElement';
import HeaderTitle from '@/components/@shared/HeaderTitle';
import Spinner from '@/components/@shared/Spinner';
import GatheringForm from '@/components/gatheringEdit/GatheringForm';
import { useGatheringDetail } from '@/hooks/queries/useGathering';

export default function GatheringEdit({ params }: { params: { id: string } }) {
  const isEdit = Boolean(params.id);
  const { data: gatheringDetail, isLoading: isGatheringDetailLoading } =
    useGatheringDetail(Number(params.id));
  if (isGatheringDetailLoading) {
    return <Spinner />;
  }
  if (!gatheringDetail) {
    return <EmptyElement>모임 정보를 가져올 수 없습니다.</EmptyElement>;
  }
  // console.log(gatheringDetail);
  return (
    <>
      <div className="flex h-full w-full flex-col gap-12 overflow-x-hidden px-4 pb-5 pt-24 md:px-6 md:pb-12 md:pt-32 xl:mx-auto xl:max-w-[1166px] xl:px-0">
        <HeaderTitle h1="모임 수정하기" />
      </div>
      <GatheringForm
        gatheringId={Number(params.id)}
        isEdit={isEdit}
        editName={gatheringDetail.name}
        editLocation={gatheringDetail.location}
        editThemeName={gatheringDetail.themeName}
        editDateTime={gatheringDetail.dateTime}
        editRegistrationEnd={gatheringDetail.registrationEnd}
      />
    </>
  );
}
