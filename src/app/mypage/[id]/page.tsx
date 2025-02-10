import HeaderTitle from '@/components/@shared/HeaderTitle';
import GatheringForm from '@/components/gatheringEdit/GatheringForm';

export default function GatheringEdit({ params }: { params: { id: string } }) {
  const isEdit = Boolean(params.id);

  return (
    <>
      <div className="flex h-full w-full flex-col gap-12 overflow-x-hidden px-4 pb-5 pt-24 md:px-6 md:pb-12 md:pt-32 xl:mx-auto xl:max-w-[1166px] xl:px-0">
        <HeaderTitle title="모임 수정하기" />
      </div>
      <GatheringForm gatheringId={Number(params.id)} isEdit={isEdit} />
    </>
  );
}
