'use client';

import Modal from '@/components/@shared/Modal';
import Button from '@/components/@shared/Button';
import TextArea from '../@shared/TextArea';
import Rating from '../@shared/Rating';

interface MyReviewModalProps {
  isModal: boolean;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  score?: number;
  comment?: string;
}

export default function MyReviewModal({
  isModal,
  setIsModal,
  score,
  comment,
}: MyReviewModalProps) {
  const closeModalhandler = () => {
    setIsModal(false);
  };

  return (
    <Modal
      isOpen={isModal}
      onClose={closeModalhandler}
      customDimStyle="w-[400px]"
    >
      <div className="flex flex-col gap-5">
        <p className="text-base font-bold">
          {score && comment ? '리뷰 수정하기' : '리뷰 쓰기'}
        </p>
        <div className="flex flex-col gap-3">
          <p className="text-sm font-bold">만족스러운 경험이었나요?</p>
          <Rating rating={score || 0} width={120} height={24} />
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-sm font-bold">경험에 대해 남겨주세요.</p>
          <TextArea
            placeholder={comment || '리뷰를 입력해주세요.'}
            label="리뷰코멘트란"
            inputProps={{ value: comment || '' }}
          />
        </div>
        <div className="flex justify-center gap-3">
          <Button variant="secondary" onClick={closeModalhandler}>
            취소하기
          </Button>
          <Button variant="primary" disabled>
            {score && comment ? '수정하기' : '작성하기'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
