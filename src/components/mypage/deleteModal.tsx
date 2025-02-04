import Modal from '@/components/@shared/Modal';
import Button from '@/components/@shared/button/Button';
import { deleteMyCreateGathering } from '@/axios/mypage/api';
import useToast from '@/hooks/useToast';
import Toast from '../@shared/Toast';

interface DeleteModalProps {
  id: number;
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
  const { toastMessage, toastVisible, toastType, handleError, handleSuccess } =
    useToast();
  const closeModalhandler = () => {
    setIsModal(false);
  };
  const getActionText = (type: string) => {
    switch (type) {
      case 'cancel':
        return '모임 취소';
      case 'gathering_delete':
        return '모임 삭제';
      default:
        return '리뷰 삭제';
    }
  };
  const handleMyCreateGatheringDelete = async () => {
    try {
      deleteMyCreateGathering(id);
      console.log('모임 삭제');
      handleSuccess('모임이 삭제 되었습니다!');
      closeModalhandler();
    } catch (error) {
      console.log(error);
      handleError('모임 삭제중 에러가 발생하였습니다!');
    }
  };

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
                handleMyCreateGatheringDelete();
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
