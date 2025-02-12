'use client';

import { useGatheringWithHost } from '@/hooks/queries/useGathering';
import { useModal } from '@/hooks/useModal';
import GatheringMainSection from '@/components/gatheringDetail/GatheringMainSection';
import JoinBoxSection from '@/components/gatheringDetail/JoinBoxSection';
import GatheringDetailSection from '@/components/gatheringDetail/GatheringDetailSection';
import ProfileSection from '@/components/gatheringDetail/ProfileSection';
import GatheringReviewSection from '@/components/gatheringDetail/GatheringReviewSection';

export default function GatheringDetail({
  params,
}: {
  params: { id: string };
}) {
  const { isOpen, openModal, closeModal } = useModal();
  const { gatheringData, hostData, isLoading, isError } = useGatheringWithHost(
    Number(params.id)
  );

  if (isLoading)
    return (
      <div className="flex h-dvh items-center justify-center">로딩중...</div>
    );
  if (isError)
    return (
      <div className="flex h-dvh items-center justify-center">
        에러가 발생했습니다
      </div>
    );
  if (!gatheringData)
    return (
      <div className="flex h-dvh items-center justify-center">
        모임을 찾을 수 없습니다
      </div>
    );

  return (
    <div className="mx-auto max-w-screen-xl px-4">
      <div className="mt-36">
        {/* Main section과 JoinBox를 포함하는 컨테이너 */}
        <div className="flex flex-col gap-6 min-[1111px]:flex-row">
          {/* Main section 컨테이너 */}
          <div className="flex flex-1 justify-center min-[1111px]:justify-start">
            <GatheringMainSection {...gatheringData} />
          </div>
          <JoinBoxSection {...gatheringData} gatheringId={Number(params.id)} />
        </div>

        {/* Detail section */}
        <div className="mt-16 flex justify-center min-[1111px]:justify-start">
          <GatheringDetailSection {...gatheringData} />
        </div>

        {/* Profile section */}
        {hostData && (
          <div className="mt-16 flex justify-center min-[1111px]:justify-start">
            <ProfileSection
              createrProfile={hostData}
              isOpen={isOpen}
              openModal={openModal}
              closeModal={closeModal}
            />
          </div>
        )}

        {/* Review section */}
        <div className="mb-20 mt-16 flex justify-center min-[1111px]:justify-start">
          <GatheringReviewSection gatheringId={Number(params.id)} />
        </div>
      </div>
    </div>
  );
}
