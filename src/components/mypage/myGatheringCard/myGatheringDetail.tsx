/* eslint-disable prettier/prettier */

import GatheringBadge from '@/components/gathering/UI/GatheringBadge';
import Button from '@/components/@shared/button/Button';
import { formatDate } from '@/utils/dateUtils';
import Image from 'next/image';
import { useModal } from '@/hooks/useModal';
import { findLabelByValue } from '@/utils/mappingUtils';
import { locationList } from '@/constants/themeList';
import DeleteModal from '../deleteModal';

interface MyGatheringDetailProps {
  gatheringId: number;
  location: string;
  dateTime: string;
  name: string;
  themeName: string;
  capacity: string;
  participantCount: string;
  isCanceled: boolean;
}

export default function MyGatheringDetail({
  gatheringId,
  location,
  dateTime,
  name,
  themeName,
  capacity,
  participantCount,
  isCanceled,
}: MyGatheringDetailProps) {
  const {
    isOpen: isDeleteModal,
    openModal: openDeleteModal,
    closeModal: closeDeleteModal,
  } = useModal();

  return (
    <div className="flex flex-col gap-5 px-4 pb-7 pt-5 md:py-4 ">
      <div className="flex justify-between">
        <div className="flex items-center gap-1 text-sm md:gap-[6px]">
          <GatheringBadge variant="primary" fontColor="secondary">
            {findLabelByValue(location, locationList)}
          </GatheringBadge>
          <GatheringBadge variant="secondary" fontColor="primary">
            {new Date(dateTime) > new Date() ? '모임 예정' : '모임 완료'}
          </GatheringBadge>
          <GatheringBadge variant="secondary" fontColor="primary">
            {participantCount === capacity ? (
              <div className="flex">
                <Image
                  src="/icons/check.svg"
                  width={16}
                  height={16}
                  alt="체크 이미지"
                />
                일정 확정
              </div>
            ) : (
              '일정 미확정'
            )}
          </GatheringBadge>
        </div>
      </div>
      <div className="flex flex-col gap-[1px]">
        <p className="text-[18px] font-semibold">{name}</p>
        <p className="text-[14px] font-light text-secondary-40">{themeName}</p>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1 text-[10px] text-text-secondary md:text-sm">
          <p>{formatDate(dateTime)}</p>
          <p>.</p>
          <Image
            src="/icons/gathering_icon.svg"
            width={20}
            height={20}
            alt="모임 아이콘"
          />
          <p>
            {participantCount}/{capacity}
          </p>
          <Button
            variant="grayscale"
            padding="10"
            fontSize="14"
            onClick={openDeleteModal}
            className="absolute right-4 border-secondary-80 bg-secondary-70"
            disabled={isCanceled}
          >
            예약취소하기
          </Button>
          <DeleteModal
            id={gatheringId}
            isModal={isDeleteModal}
            setIsModal={closeDeleteModal}
            classification="gathering_cancel"
          />
        </div>
      </div>
    </div>
  );
}
