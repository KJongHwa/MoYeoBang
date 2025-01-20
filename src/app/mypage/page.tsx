/* eslint-disable prettier/prettier */

'use client';

import { mockUser } from '@/data/mockUser';
import { mockGatherings } from '@/data/mockGatherings';
import MyCreateGathering from '@/components/mypage/myCreateGathering';
import { useState } from 'react';
import Image from 'next/image';
import IconButton from '@/components/@shared/IconButton';
import { useModal } from '@/hooks/useModal';
import MyReview from '../../components/mypage/myReview';
import MyProfileEditModal from '../../components/mypage/myProfileEditModal';
import MyGathering from '../../components/mypage/myGathering';

export default function MyPage() {
  const user = mockUser;
  const levelImage = Math.min(mockGatherings.length, 6);
  const {
    isOpen: isEditModal,
    openModal: openEditModal,
    closeModal: closeEditModal,
  } = useModal();

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
    <main className="relative top-[100px] mx-4 md:mx-6 xl:mx-auto xl:w-[1166px]">
      <p className="text-[18px] font-bold">{`안녕하세요 ${user.nickname}님!`}</p>
      <div className="bg-primary-30 relative z-0 mb-4 mt-8 flex justify-between overflow-hidden rounded-[25px] px-3 py-8 md:mb-7 md:px-10">
        <div className="text-text-primary z-10 flex flex-col gap-3">
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
        <Image
          src={`/myprofile_bg/l/${levelImage}.svg`}
          width={612}
          height={224}
          alt="프로필 배경"
          className="pointer-events-none absolute left-16 top-3 -z-10 hidden lg:-top-1 lg:left-64 lg:block"
        />
        <Image
          src={`/myprofile_bg/l/${levelImage}.svg`}
          width={540}
          height={224}
          alt="프로필 배경"
          className="pointer-events-none absolute left-16 top-3 -z-10 hidden md:-top-1 md:left-40 md:block lg:hidden"
        />
        <Image
          src={`/myprofile_bg/s/${levelImage}.svg`}
          width={241}
          height={121}
          alt="프로필 배경"
          className="pointer-events-none absolute left-12 top-2 -z-10 md:hidden"
        />

        <div className="mt-20">
          <IconButton
            src="/icons/pencil.svg"
            alt="연필 아이콘"
            onClick={openEditModal}
            className="absolute z-20 mt-10"
          >
            프로필 편집
          </IconButton>
          <MyProfileEditModal
            isModal={isEditModal}
            setIsModal={closeEditModal}
            nickname={user.nickname}
            image={user.image}
          />
        </div>
      </div>

      <hr className="mb-9 border-[#646464]" />
      <div className="">
        <nav className="ml-3 flex items-center gap-8 md:gap-6">
          {navLinks.map((link) => (
            <button
              key={link.label}
              type="button"
              className={`text-secondary-60 pb-2 text-[18px] font-bold ${
                activeTab === link.label
                  ? 'border-b-2 border-white !text-white'
                  : ''
              }`}
              onClick={() => navClick(link.label)}
            >
              {link.label}
            </button>
          ))}
        </nav>
        <div className=" mb-10 mt-8">{renderActiveComponent()}</div>
      </div>
    </main>
  );
}
