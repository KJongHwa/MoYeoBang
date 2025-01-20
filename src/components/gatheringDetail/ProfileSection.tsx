import { GatheringCreaterDTO } from '@/types/gathering.types';
import Button from '@/components/@shared/Button';
import GatheringCreaterProfileModal from '@/components/gatheringDetail/GatheringCreaterProfileModal';
import Image from 'next/image';

interface ProfileSectionProps {
  createrProfile: GatheringCreaterDTO['get'];
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export default function ProfileSection({
  createrProfile,
  isOpen,
  openModal,
  closeModal,
}: ProfileSectionProps) {
  return (
    <div>
      <div className="flex h-[66px] w-full items-center justify-between rounded-2xl border border-default-inverse px-7 py-2 md:h-[90px]">
        <div className="flex items-center gap-3">
          <Image
            src={createrProfile.image || '/profile_image_default.png'}
            width={52}
            height={52}
            alt="모임주최자 프로필 이미지"
          />
          <div>
            <p className="text-xl font-bold">{createrProfile.nickname}</p>
            <p className="text-sm">
              모집글 ({createrProfile.gatherings.length})
            </p>
          </div>
        </div>
        <Button
          variant="primary"
          fontSize="14"
          padding="12"
          className="hidden md:block"
          onClick={openModal}
        >
          프로필 보기
        </Button>
        <button onClick={openModal} type="button" className="block md:hidden">
          <Image
            src="/icons/right.svg"
            width={24}
            height={24}
            alt="모임 주최자 프로필 상세보기 버튼"
          />
        </button>
      </div>
      {isOpen && (
        <GatheringCreaterProfileModal
          isModal={isOpen}
          onClose={closeModal}
          createrProfile={createrProfile}
        />
      )}
    </div>
  );
}
