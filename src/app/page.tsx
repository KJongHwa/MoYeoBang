import { mockGatherings } from '@/data/mockGatherings';

import CreateGatheringBtn from '@/components/gathering/CreateGatheringBtn';
import GatheringList from '@/components/gathering/GatheringList';

export default function Gathering() {
  const gatherings = mockGatherings;

  return (
    <div className="mx-auto flex h-full max-w-6xl flex-col gap-12 px-4 py-32 md:py-48">
      <header className="mx-1 flex flex-col gap-2 text-white xl:mx-5">
        <h1 className="order-2 text-2xl font-semibold">지금 여기로 모여방</h1>
        <p className="order-1 text-sm font-medium">함께 할 사람이 없나요?</p>
      </header>
      <main className="flex flex-col gap-10 md:gap-12">
        <GatheringList gatherings={gatherings} />
        <CreateGatheringBtn />
      </main>
    </div>
  );
}
