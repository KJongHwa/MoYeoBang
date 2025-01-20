'use client';

import Modal from '@/components/@shared/Modal';
import Button from '@/components/@shared/Button';

interface DeleteModalProps {
  isModal: boolean;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  classification: string;
}

export default function DeleteModal({
  isModal,
  setIsModal,
  classification,
}: DeleteModalProps) {
  const closeModalhandler = () => {
    setIsModal(false);
  };
  return (
    <Modal
      isOpen={isModal}
      onClose={closeModalhandler}
      customDimStyle="w-[400px]"
    >
      <div className="flex flex-col gap-10">
        <p className="text-xl font-bold">
          {classification === 'cancel' ? '모임을 취소' : '리뷰를 삭제'}
          하시겠습니까?
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
              alert('아직 사용할 수 없는 기능입니다ㅜ');
            }}
          >
            {classification === 'cancel' ? '모임취소' : '리뷰삭제'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
