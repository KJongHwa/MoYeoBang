import HeaderTitle from '@/components/@shared/HeaderTitle';
import GatheringForm from '@/components/gatheringEdit/GatheringForm';

export default function GatheringCreate() {
  return (
    <>
      <div className="flex h-full w-full flex-col gap-12 overflow-x-hidden px-4 pb-5 pt-24 md:px-6 md:pb-12 md:pt-32 xl:mx-auto xl:max-w-[1166px] xl:px-0">
        <HeaderTitle h1="모임 만들기" />
      </div>
      <GatheringForm />
    </>
  );
}
