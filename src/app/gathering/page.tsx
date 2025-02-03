import { Suspense } from 'react';

import HeaderTitle from '@/components/@shared/HeaderTitle';
import AddGatheringButton from '@/components/gathering/UI/AddGatheringButton';
import GatheringList from '@/components/gathering/GatheringList';

export default function Gathering() {
  return (
    <div className="mx-auto flex h-full max-w-[1166px] flex-col gap-12 px-4 py-24 md:px-6 md:py-32 xl:px-0">
      <HeaderTitle
        title="지금 여기로 모여방"
        content="함께 할 사람이 없나요?"
        order="inverse"
      />
      <main className="flex flex-col gap-10 md:gap-12 ">
        <Suspense
          fallback={
            <div className="flex h-dvh items-center justify-center">
              로딩 스피너
            </div>
          }
        >
          <GatheringList />
        </Suspense>
        <AddGatheringButton />
      </main>
    </div>
  );
}
