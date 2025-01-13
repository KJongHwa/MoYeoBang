/* eslint-disable prettier/prettier */

'use client';

import { mockUser } from '@/data/mockUser';
import MyCreateGathering from '@/components/mypage/myCreateGathering';
import { useState } from 'react';
import Image from 'next/image';
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
    {
      label: '내가 만든 모임',
      component: <MyCreateGathering userID={user.userID} />,
    },
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
    <main className="relative top-[100px] mx-10 xl:mx-auto xl:w-[1166px]">
      <p className="text-xl font-bold">{`안녕하세요 ${user.nickname}님!`}</p>
      <div className="bg-primary-30 mb-5 mt-8 flex items-center justify-between rounded-[25px] border px-3 py-8 md:mb-7 md:px-10">
        <div className="text-text-primary flex flex-col gap-3">
          <Image
            src={user.image || '/profile_image_default.png'}
            width={66}
            height={66}
            alt="프로필 이미지 미리보기"
            className="h-[56px] w-[56px] rounded-full md:h-[66px] md:w-[66px]"
          />
          <div>
            <p className="text-base font-bold md:text-2xl">{user.nickname}</p>
            <p className="text-sm md:text-base">{user.email}</p>
          </div>
        </div>
        <Button
          type="button"
          variant="primary"
          size="small"
          font="14"
          className="border "
          onClick={openModalhandler}
          style={{
            width: '115px',
            backgroundColor: '#17171C',
            color: '#FFFFFF',
          }}
        >
          <div className="flex">
            <Image
              src="/edit_icon.png"
              alt="프로필편집아이콘"
              width={20}
              height={20}
            />
            <span className="hidden pl-1 md:block ">프로필 편집</span>
          </div>
        </Button>
        <MyProfileEditModal
          isModal={isModal}
          setIsModal={setIsModal}
          nickname={user.nickname}
          image={user.image}
        />
      </div>
      <hr className="mb-7" />
      <div className="mx-2 md:mx-12">
        <nav className="flex gap-8 md:gap-6">
          {navLinks.map((link) => (
            <button
              key={link.label}
              type="button"
              className={`pb-3 text-base font-bold md:text-lg ${
                activeTab === link.label ? 'border-b-2 border-white' : ''
              }`}
              onClick={() => navClick(link.label)}
            >
              {link.label}
            </button>
          ))}
        </nav>
        <div className="mx-3 mb-10 mt-8">{renderActiveComponent()}</div>
      </div>
    </main>
  );
}
