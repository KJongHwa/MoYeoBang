'use client';

import Modal from '@/components/@shared/Modal';
import Button from '@/components/@shared/Button';

interface DeleteModalProps {
  isModal: boolean;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DeleteModal({ isModal, setIsModal }: DeleteModalProps) {
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
        <p className="text-xl font-bold">삭제하시겠습니까?</p>
        <div className="flex justify-center gap-3">
          <Button variant="secondary" onClick={closeModalhandler}>
            취소하기
          </Button>
          <Button variant="primary">삭제하기</Button>
        </div>
      </div>
    </Modal>
  );
}
