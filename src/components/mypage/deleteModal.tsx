import Modal from '@/components/@shared/Modal';
import Button from '@/components/@shared/button/Button';
import {
  deleteGatheringReview,
  deleteMyCreateGathering,
  deleteParticipantGathering,
} from '@/axios/mypage/api';
import useToast from '@/hooks/useToast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Toast from '../@shared/Toast';

interface DeleteModalProps {
  id: number; // 리뷰 삭제 할때는 reviewId, 모임 예약 취소 또는 내가 만든 모임 삭제 할때는 gatheringId
  isModal: boolean;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  classification: string;
}

export default function DeleteModal({
  id,
  isModal,
  setIsModal,
  classification,
}: DeleteModalProps) {
  const queryClient = useQueryClient();
  const { toastMessage, toastVisible, toastType, handleError, handleSuccess } =
    useToast();

  const closeModalhandler = () => {
    setIsModal(false);
  };

  // eslint-disable-next-line consistent-return
  const getActionText = (type: string) => {
    // eslint-disable-next-line default-case
    switch (type) {
      case 'gathering_cancel':
        return '모임 취소';
      case 'gathering_delete':
        return '모임 삭제';
      case 'review_delete':
        return '리뷰 삭제';
    }
  };

  const { mutate: deleteGathering } = useMutation({
    mutationFn: async (gatheringId: number) =>
      deleteMyCreateGathering(gatheringId),
    onSuccess: () => {
      handleSuccess('모임이 삭제 되었습니다!');
      closeModalhandler();
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['myGatheringJoined'] });
    },
    onError: (error: any) => {
      console.log('delete MyCreateGathering:', error);
      handleError('모임 삭제 중 에러가 발생하였습니다!');
    },
  });

  const { mutate: deleteReview } = useMutation({
    mutationFn: async (reviewId: number) => deleteGatheringReview(reviewId),
    onSuccess: () => {
      handleSuccess('리뷰가 삭제 되었습니다!');
      closeModalhandler();
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['myReviews', false] });
      queryClient.invalidateQueries({ queryKey: ['myReviews', true] });
    },
    onError: (error: any) => {
      console.log('delete MyReview:', error);
      handleError('리뷰 삭제 중 에러가 발생하였습니다!');
    },
  });

  const { mutate: deleteCancelGathering } = useMutation({
    mutationFn: async (gatheringId: number) =>
      deleteParticipantGathering(gatheringId),
    onSuccess: () => {
      handleSuccess('참여가 취소 되었습니다');
      closeModalhandler();
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['myGatheringJoined'] });
    },
    onError: (error: any) => {
      console.log('delete cancel Gathering:', error);
      handleError('모임 참여 취소 중 에러가 발생하였습니다!');
    },
  });

  return (
    <Modal
      isOpen={isModal}
      onClose={closeModalhandler}
      customDimStyle="w-[400px]"
    >
      <div className="flex flex-col gap-10">
        <p className="text-xl font-bold">
          {getActionText(classification)} 하시겠습니까?
        </p>
        <div className="flex justify-center gap-3">
          <Button
            variant="tertiary"
            fontSize="16"
            onClick={closeModalhandler}
            className="w-full"
          >
            취소하기
          </Button>
          <Button
            variant="primary"
            fontSize="16"
            className="w-full"
            onClick={() => {
              if (classification === 'gathering_delete') {
                deleteGathering(id);
              }
              if (classification === 'review_delete') {
                deleteReview(id);
              } else {
                handleError('아직 구현되지 않은 기능입니다!');
              }
            }}
          >
            {getActionText(classification)}
          </Button>
        </div>
        {toastVisible && <Toast message={toastMessage} type={toastType} />}
      </div>
    </Modal>
  );
}
