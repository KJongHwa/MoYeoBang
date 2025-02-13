import Button from '@/components/@shared/button/Button';
import { formatDate } from '@/utils/dateUtils';
import Image from 'next/image';
import { useModal } from '@/hooks/useModal';
import MyReviewModal from '../myReviewModal';

interface MyReviewNotWriteDetailProps {
  dateTime: string;
  name: string;
  themeName: string;
  capacity: string;
  participantCount: string;
  gatheringId: number;
}

export default function MyReviewNotWriteDetail({
  dateTime,
  name,
  themeName,
  capacity,
  participantCount,
  gatheringId,
}: MyReviewNotWriteDetailProps) {
  const {
    isOpen: isEditModal,
    openModal: openEditModal,
    closeModal: closeEditModal,
  } = useModal();

  return (
    <div className="md: flex flex-col justify-evenly gap-5 px-4 pb-7 pt-5 md:py-5">
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
            variant="primary"
            padding="12"
            fontSize="14"
            onClick={openEditModal}
            style={{
              position: 'absolute',
              right: '18px',
            }}
            className="w-[120px]"
          >
            리뷰쓰기
          </Button>
          <MyReviewModal
            id={gatheringId}
            isModal={isEditModal}
            setIsModal={closeEditModal}
          />
        </div>
      </div>
    </div>
  );
}
