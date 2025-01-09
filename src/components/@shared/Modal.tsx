import DeleteIcon from '@/public/delete.svg';
import { ReactNode, useEffect, useRef } from 'react';

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  customDimStyle?: string;
}

/**
 * HTML5 dialog 태그를 활용한 공통 Modal 컴포넌트
 * @param isOpen 모달이 열린 상태 (true), 닫힌 상태 (false)를 가지는 boolean state
 * @param onClose 모달의 닫는 기능을 실행하는 함수
 * @param customDimStyle padding 등의 스타일을 커스텀 하는 tailwind css classname
 */
export default function Modal({
  children,
  isOpen,
  onClose,
  customDimStyle,
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // 모달 상태 변화와 첫 번째 input에 포커스 설정을 위한 useEffect
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
      dialog.querySelector('input')?.focus();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  // ESC 키 입력 시 모달 닫기 처리
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-40 h-full w-full bg-black opacity-50" />
      )}
      <dialog
        ref={dialogRef}
        className={`fixed inset-0 z-50 rounded-lg bg-white p-6 shadow-lg ${customDimStyle}`}
      >
        {children}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-6 top-6"
        >
          <DeleteIcon />
        </button>
      </dialog>
    </>
  );
}
