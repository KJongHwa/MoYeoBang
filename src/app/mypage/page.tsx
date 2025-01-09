'use client';

import { mockUser } from '@/data/mockUser';
import MyCreateGathering from '@/components/mypage/myCreateGathering';
import { useState } from 'react';
import Button from '@/components/@shared/Button';
import MyGathering from '../../components/mypage/myGathering';
import MyReview from '../../components/mypage/myReview';
import MyProfileEditModal from '../../components/mypage/myProfileEditModal';

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
    <main className="relative top-[142px] mx-10 xl:mx-auto xl:w-[1166px]">
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
        <nav className="flex gap-6">
          {navLinks.map((link) => (
            <button
              key={link.label}
              type="button"
              className={`pb-3 text-lg font-bold ${
                activeTab === link.label ? 'border-b-2 border-white' : ''
              }`}
              onClick={() => navClick(link.label)}
            >
              {link.label}
            </button>
          ))}
        </nav>
        <div className="mx-3 mt-8">{renderActiveComponent()}</div>
      </div>
    </main>
  );
}
