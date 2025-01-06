import DeleteIcon from '@/public/delete.svg';
import Image from 'next/image';
import { ReactNode, useEffect, useRef } from 'react';

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  customDimStyle?: string;
}

/**
 * 공통 Modal 컴포넌트
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
  const modalContentRef = useRef<HTMLDivElement>(null);

  // modalContent가 등록되었고, 현재 클릭한 target이 modal 내부의 target이 아닌 경우 모달을 닫는 함수
  const handleClickOutside: EventListener = (e) => {
    if (!isOpen) return;
    if (
      modalContentRef.current &&
      !modalContentRef.current.contains(e.target as Node)
    ) {
      onClose();
    }
  };

  // 내부에서 이벤트 핸들러를 등록 해서 모달 외부 클릭 시 모달 닫히게 설정
  // SSR 환경에서 작동을 안할 수도 있는 문제 때문에, 클라이언트 환경에서만 실행되도록 처리
  useEffect(() => {
    if (isOpen && typeof window !== 'undefined') {
      window.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('mousedown', handleClickOutside);
      }
    };
  }, [isOpen]);

  // 모달이 열렸을 때 input 영역에 포커스를 설정하기 위한 useEffect
  useEffect(() => {
    if (isOpen && modalContentRef.current) {
      const firstInput = modalContentRef.current.querySelector('input');
      if (firstInput instanceof HTMLInputElement) {
        firstInput.focus();
      }
    }
  }, [isOpen]);

  return (
    <div>
      {isOpen && (
        <div className="fixed bottom-0 left-0 right-0 top-0 z-50">
          <div className={`absolute h-full w-full bg-black opacity-30`} />
          <div
            ref={modalContentRef}
            className={`absolute left-1/2 top-1/2 max-h-[90vh] max-w-[90vw] translate-x-[-50%] translate-y-[-50%] overflow-auto whitespace-normal break-words rounded-lg bg-white p-6 ${customDimStyle}`}
          >
            {children}
            <button
              type="button"
              onClick={onClose}
              className="absolute right-6 top-6 cursor-pointer"
            >
              <Image src={DeleteIcon} alt="모달창 닫기" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
