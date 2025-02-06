'use client';

import { useGatheringWithHost } from '@/hooks/queries/useGathering';
import { useModal } from '@/hooks/useModal';
import { QueryProvider } from '@/components/@shared/QueryProvider';
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
    <QueryProvider>
      <div className="mx-auto max-w-screen-xl px-4">
        <div className="mt-36">
          <div className="flex flex-col gap-6 md:flex-row">
            <div className="flex-1">
              <GatheringMainSection {...gatheringData} />
            </div>
            <JoinBoxSection
              {...gatheringData}
              gatheringId={Number(params.id)}
            />
          </div>

          <div className="mt-16">
            <GatheringDetailSection {...gatheringData} />
          </div>

          {hostData ? (
            <div className="mt-16">
              <ProfileSection
                createrProfile={hostData}
                isOpen={isOpen}
                openModal={openModal}
                closeModal={closeModal}
              />
            </div>
          ) : null}

          <div className="mb-20 mt-16">
            <GatheringReviewSection gatheringId={Number(params.id)} />
          </div>
        </div>
      </div>
    </QueryProvider>
  );
}
