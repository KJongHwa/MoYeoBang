'use client';

import GatheringDetailSection from '@/components/gatheringDetail/GatheringDetailSection';
import GatheringMainSection from '@/components/gatheringDetail/GatheringMainSection';
import GatheringReviewSection from '@/components/gatheringDetail/GatheringReviewSection';
import JoinBoxSection from '@/components/gatheringDetail/JoinBoxSection';
import ProfileSection from '@/components/gatheringDetail/ProfileSection';
import { mockGatheringCreater } from '@/data/mockGatheringCreater';
import { mockGatheringDetails } from '@/data/mockGatheringDetail';
import { useModal } from '@/hooks/useModal';

export default function GatheringDetail({ params }: any) {
  const { id } = params;
  const gatheringData = mockGatheringDetails.find(
    (gathering) => gathering.gatheringId === Number(id)
  );
  const createrProfile = mockGatheringCreater;
  const { isOpen, openModal, closeModal } = useModal();

  if (!gatheringData) return null;

  return (
    <div className="mx-auto max-w-screen-xl px-4">
      <div className="mt-36">
        {/* 1. 이미지와 기본 정보를 포함하는 섹션 */}
        <div className="flex gap-6">
          <GatheringMainSection
            image={gatheringData.image}
            name={gatheringData.name}
            themeName={gatheringData.themeName}
            synopsis={gatheringData.synopsis}
            location={gatheringData.location}
          />
          <JoinBoxSection
            name={gatheringData.name}
            themeName={gatheringData.themeName}
            participantCount={gatheringData.participantCount}
            capacity={gatheringData.capacity}
          />
        </div>
        {/* 2. 모임 세부 정보 섹션 */}
        <div className="mt-16">
          <GatheringDetailSection
            level={gatheringData.level}
            genre={gatheringData.genre}
            themeName={gatheringData.themeName}
            playtime={gatheringData.playtime}
            dateTime={gatheringData.dateTime}
            registrationEnd={gatheringData.registrationEnd}
            capacity={gatheringData.capacity}
            participantCount={gatheringData.participantCount}
            map={gatheringData.map}
          />
        </div>

        {/* 3. 프로필 섹션 */}
        <div className="mt-16">
          <ProfileSection
            createrProfile={createrProfile}
            isOpen={isOpen}
            openModal={openModal}
            closeModal={closeModal}
          />
        </div>

        {/* 4. 리뷰 섹션 */}
        <div className="mb-20 mt-16">
          <GatheringReviewSection gatheringId={Number(id)} />
        </div>
      </div>
    </div>
  );
}
