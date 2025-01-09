'use client';

import { useState } from 'react';

import Button from '@/components/@shared/Button';

import MyGathering from '../../components/mypage/myGathering';
import MyCreateGathering from '@/components/mypage/myCreateGathering';
import MyReview from '../../components/mypage/myReview';
import MyProfileEditModal from '../../components/mypage/myProfileEditModal';
import { mockUser } from '@/data/mockUser';

export default function MyPage() {
  const user = mockUser;

  const [isModal, setIsModal] = useState(false);

  const openModalhandler = () => setIsModal(true);

  const navLinks = [
    { label: '나의 모임', component: <MyGathering /> },
    { label: '나의 리뷰', component: <MyReview /> },
    { label: '내가 만든 모임', component: <MyCreateGathering /> },
  ];

  const [activeTab, setActiveTab] = useState(navLinks[0].label);

  const navClick = (label: string) => {
    setActiveTab(label);
  };

  const renderActiveComponent = () => {
    const activeLink = navLinks.find((link) => link.label === activeTab);
    return activeLink?.component;
  };

  return (
    <main className="mx-[150px] my-[130px] flex flex-col justify-center ">
      <p className="text-xl font-bold">{`안녕하세요 ${user.nickname}님!`}</p>
      <div className="mb-12 mt-8 flex h-[130px] items-center justify-around rounded-[25px] border bg-orange-600">
        <div className="text-text-primary">
          <p>{user.nickname}</p>
          <p>{user.email}</p>
        </div>
        <Button
          type="button"
          variant="primary"
          size="small"
          font="14"
          className="border "
          onClick={openModalhandler}
        >
          프로필 편집
        </Button>
        <MyProfileEditModal
          isModal={isModal}
          setIsModal={setIsModal}
          nickname={user.nickname}
          image={user.image}
        />
      </div>
      <div className="mx-12">
        <nav className="flex gap-5">
          {navLinks.map((link) => (
            <button
              key={link.label}
              type="button"
              className={`text-lg font-bold ${
                activeTab === link.label ? 'border-b-2 border-white' : ''
              }`}
              onClick={() => navClick(link.label)}
            >
              {link.label}
            </button>
          ))}
        </nav>
        <div className="mt-8">{renderActiveComponent()}</div>
      </div>
    </main>
  );
}
