'use client';

import { useState } from 'react';
import Modal from '@/components/@shared/Modal';
import Button from '@/components/@shared/Button';
import TextArea from '../@shared/TextArea';
import RatingInput from '../@shared/RatingInput';

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
  const [updatedScore, setUpdatedScore] = useState<number>(score || 0);
  const [updatedComment, setUpdatedComment] = useState<string>(comment || '');
  const closeModalhandler = () => {
    setIsModal(false);
  };

  const scoreChangehandler = (value: number) => {
    setUpdatedScore(value);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUpdatedComment(e.target.value);
  };

  const isModified =
    (updatedComment?.trim() !== '' && comment !== updatedComment) ||
    (updatedScore > 0 && score !== updatedScore);
  return (
    <Modal
      isOpen={isModal}
      onClose={closeModalhandler}
      customDimStyle="w-[325px] md:w-[520px]"
    >
      <div className="flex flex-col gap-5">
        <p className="text-lg font-semibold">
          {score || comment ? '리뷰 수정하기' : '리뷰 쓰기'}
        </p>
        <div className="flex flex-col gap-3">
          <p className="text-base font-semibold">만족스러운 경험이었나요?</p>
          <RatingInput
            rating={updatedScore}
            width={128}
            height={24}
            onChange={(value) => scoreChangehandler(value)}
          />
        </div>
        <div className="flex flex-col gap-3 text-base">
          <p className="text-base font-semibold">경험에 대해 남겨주세요.</p>
          <TextArea
            placeholder="남겨주신 리뷰는 다른 회원 분들께 큰 도움이 됩니다."
            inputProps={{
              value: updatedComment,
              onChange: handleCommentChange,
            }}
          />
        </div>
        <div className="flex w-full flex-col justify-center gap-3 md:flex-row">
          <Button
            variant="tertiary"
            fontSize="16"
            onClick={closeModalhandler}
            style={{ width: '280px' }}
          >
            취소하기
          </Button>
          <Button
            variant="primary-gray"
            fontSize="16"
            disabled={!isModified}
            style={{ width: '280px' }}
          >
            리뷰등록
          </Button>
        </div>
      </div>
    </Modal>
  );
}
