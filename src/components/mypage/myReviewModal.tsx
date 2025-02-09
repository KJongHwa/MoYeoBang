'use client';

import { useEffect, useState } from 'react';
import Modal from '@/components/@shared/Modal';
import Button from '@/components/@shared/button/Button';
import useToast from '@/hooks/useToast';
import TextArea from '@/components/@shared/input/TextArea';
import RatingInput from '@/components/@shared/rating/RatingInput';
import Toast from '@/components/@shared/Toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { EditReviewParams, ReviewParams } from '@/types/mypage.types';
import { editGatheringReview, postGatheringReview } from '@/axios/mypage/api';

interface MyReviewModalProps {
  isModal: boolean;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  id: number; // reviewId 또는 gatheringId
  score?: number;
  comment?: string;
}

export default function MyReviewModal({
  isModal,
  id,
  setIsModal,
  score,
  comment,
}: MyReviewModalProps) {
  const [updatedScore, setUpdatedScore] = useState<number>(score || 0);
  const [updatedComment, setUpdatedComment] = useState<string>(comment || '');
  const [commentError, setCommentError] = useState<string | undefined>(
    undefined
  );
  const { toastMessage, toastVisible, toastType, handleError, handleSuccess } =
    useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (isModal) {
      setUpdatedScore(score ?? 0);
      setUpdatedComment(comment ?? '');
    }
  }, [isModal, score, comment]);

  const closeModalhandler = () => {
    setIsModal(false);
    closeResethandler();
  };

  const closeResethandler = () => {
    setUpdatedComment(comment ?? '');
    setUpdatedScore(score ?? 0);
  };

  const scoreChangehandler = (value: number) => {
    setUpdatedScore(value);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (newValue.length < 101) {
      setUpdatedComment(newValue);
    } else {
      setCommentError('리뷰글은 100자 이하로 입력해주세요.');
    }
  };

  const isModified =
    (updatedComment?.trim() !== '' && comment !== updatedComment) ||
    (updatedScore > 0 && score !== updatedScore);

  // score||comment가 있을 때의 id는 reviewId => 리뷰 수정
  const { mutate: editReview } = useMutation({
    mutationFn: async ({
      reviewId,
      ...submissData
    }: { reviewId: number } & EditReviewParams) =>
      editGatheringReview(reviewId, submissData),
    onSuccess: () => {
      handleSuccess('리뷰가 수정되었습니다!');
      setTimeout(() => {
        closeModalhandler();
      }, 3500);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['myReviews', true] });
    },
    onError: (error: any) => {
      console.error('editReview Error:', error);
      handleError('리뷰 수정에 실패하였습니다. 다시 시도해주세요.');
    },
  });

  // score&&comment가 없을 때의 id는 gatheringId => 리뷰 작성
  const { mutate: writeReview } = useMutation({
    mutationFn: async (submissData: ReviewParams) =>
      postGatheringReview(submissData),
    onSuccess: () => {
      handleSuccess('리뷰를 작성했습니다!');
      setTimeout(() => {
        closeModalhandler();
      }, 3500);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['myReviews', false] });
      queryClient.invalidateQueries({ queryKey: ['myReviews', true] });
    },
    onError: (error: any) => {
      console.log('postReview Error:', error);
      handleError('리뷰 작성에 실패하였습니다. 다시 시도해주세요.');
    },
  });

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
            isError={!!commentError}
            errorMessage={commentError}
          />
        </div>
        <div className="flex w-full flex-col justify-center gap-3 md:flex-row">
          <Button
            variant="tertiary"
            fontSize="16"
            onClick={closeModalhandler}
            className="w-full"
          >
            취소하기
          </Button>
          <Button
            variant="primary-gray"
            fontSize="16"
            disabled={!isModified}
            className="w-full"
            onClick={() => {
              // 리뷰 작성
              if (!(score && comment)) {
                const submissionData = {
                  gatheringId: id,
                  score: updatedScore,
                  comment: updatedComment,
                };
                writeReview(submissionData);
                // 리뷰 수정
              } else {
                editReview({
                  reviewId: id,
                  score: updatedScore,
                  comment: updatedComment,
                });
              }
            }}
          >
            리뷰등록
          </Button>
        </div>
        {toastVisible && <Toast message={toastMessage} type={toastType} />}
      </div>
    </Modal>
  );
}
