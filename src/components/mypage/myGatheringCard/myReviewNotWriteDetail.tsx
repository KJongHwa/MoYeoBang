/* eslint-disable prettier/prettier */

import Button from '@/components/@shared/Button';
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
}

export default function MyReviewNotWriteDetail({
  dateTime,
  name,
  themeName,
  capacity,
  participantCount,
}: MyReviewNotWriteDetailProps) {
  const {
    isOpen: isEditModal,
    openModal: openEditModal,
    closeModal: closeEditModal,
  } = useModal();

  return (
    <div className="flex flex-col justify-evenly gap-5">
      <div>
        <p className="text-sm font-semibold md:text-lg">{name}</p>
        <p className="text-xs font-light md:text-sm">{themeName}</p>
      </div>
      <div className="flex flex-col gap-1">
        <div className="text-text-secondary flex items-center gap-1 text-[10px] md:text-sm">
          <p>{formatDate(dateTime)}</p>
          <p>.</p>
          <Image
            src="/gathering_icon.png"
            width={20}
            height={20}
            alt="모임 아이콘"
          />
          <p>
            {participantCount}/{capacity}
          </p>
          <Button
            variant="secondary"
            size="small"
            font="14"
            onClick={openEditModal}
            style={{
              position: 'absolute',
              right: '10px',
            }}
          >
            리뷰쓰기
          </Button>
          <MyReviewModal isModal={isEditModal} setIsModal={closeEditModal} />
        </div>
      </div>
    </div>
  );
}
