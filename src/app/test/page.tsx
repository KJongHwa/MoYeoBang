'use client';

import Button from '@/components/@shared/Button';
import Modal from '@/components/@shared/Modal';
import { useState } from 'react';

export default function Test() {
  const [isModal, setIsModal] = useState(false);

  const openModalhandler = () => setIsModal(true);
  const closeModalhandler = () => setIsModal(false);

  return (
    <main className="m-10 flex flex-col items-center gap-8">
      <h1>공통 컴포넌트 테스트 페이지</h1>
      <section className="w-full text-center">
        <h2>버튼</h2>
        <ul>
          <h3>variant="primary"</h3>
          <li className="my-2 flex">
            <Button variant="primary" size="small" font="14">
              생성하기
            </Button>
            <Button variant="primary" size="large">
              생성하기
            </Button>
            <Button variant="primary" disabled={true}>
              비활성화
            </Button>
          </li>
          <h3>variant="secondary"</h3>
          <li className="my-2 flex">
            <Button variant="secondary" size="small" font="14">
              생성하기
            </Button>
            <Button variant="secondary" size="large">
              생성하기
            </Button>
            <Button variant="secondary" disabled={true}>
              비활성화
            </Button>
          </li>
        </ul>
      </section>
      <section className="w-full text-center">
        <h2>모달</h2>
        <Button
          variant="primary"
          size="small"
          font="14"
          onClick={openModalhandler}
        >
          모임 만들기
        </Button>
        <Modal
          isOpen={isModal}
          onClose={closeModalhandler}
          customDimStyle="w-[260px]"
        >
          <h2>모임 만들기</h2>
          <input
            placeholder="포커싱이 자동으로 되는지 테스트"
            className="w-[260px]"
          />
        </Modal>
      </section>
    </main>
  );
}
