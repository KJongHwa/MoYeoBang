'use client';

import { useSearchParams } from 'next/navigation';

import HeaderTitle from '@/components/@shared/HeaderTitle';
import GatheringForm from '@/components/gatheringEdit/GatheringForm';

export default function GatheringEdit() {
  const searchParams = useSearchParams();
  const gatheringId = searchParams.get('gatheringId');
  const isEdit = Boolean(gatheringId);

  return (
    <>
      <div className="flex h-full w-full flex-col gap-12 overflow-x-hidden px-4 pb-5 pt-24 md:px-6 md:pb-12 md:pt-32 xl:mx-auto xl:max-w-[1166px] xl:px-0">
        <HeaderTitle title={isEdit ? '모임 수정하기' : '모임 만들기'} />
      </div>
      <GatheringForm
        gatheringId={isEdit ? Number(gatheringId) : undefined}
        isEdit={isEdit}
      />
    </>
  );
}
