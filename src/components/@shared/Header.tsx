/* eslint-disable prettier/prettier */

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Button from './Button';

export default function Header() {
  const [user, setUser] = useState(true);
  const [searching, setSearching] = useState(true);
  const handleLogin = () => {
    setUser(!user);
  };
  const handleSearching = () => {
    setSearching(!searching);
  };

  const navLinks = [
    { label: '모임 찾기', href: '/gathering' },
    { label: '찜한 모임', href: '/likes' },
    { label: '모든 리뷰', href: '/allreview' },
  ];
  const searchImg = searching
    ? { src: '/search.png', alt: '검색버튼' }
    : { src: '/search_delete.png', alt: '검색닫기버튼' };

  const liDropdowns = [{ label: '마이페이지' }, { label: '로그아웃' }];

  return (
    <div className="relative z-10">
      <div className="fixed top-0 w-full">
        <div className="bg-secondary-bg mx-auto flex h-[52px] w-full max-w-[1920px] items-center justify-between border-b px-5 md:h-[60px] md:px-[30px] xl:h-[60px] xl:px-[200px]">
          {/* Navigation Links */}
          <nav className="text-text-default flex items-center gap-8 text-base">
            <Link href="/">
              <Image
                src="/Logo_Large.png"
                width={100}
                height={23}
                alt="로고 이미지"
              />
            </Link>

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:bg-primary-40 hidden rounded-xl px-4 py-1 transition duration-300 md:block"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex gap-5">
            <button type="button" onClick={handleSearching}>
              <Image
                src={searchImg.src}
                width={24}
                height={24}
                alt={searchImg.alt}
              />
            </button>
            {user ? (
              <div className="flex gap-7 text-base font-bold text-white">
                <Link href="/login">
                  <Button
                    type="button"
                    variant="primary"
                    padding="8"
                    fontSize="14"
                    className=" border border-white"
                    style={{
                      width: '120px',
                      padding: '10px 5px',
                      backgroundColor: '#17171C',
                    }}
                    onClick={handleLogin}
                  >
                    로그인/회원가입
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="group relative flex text-base font-bold text-white">
                <Link href="/mypage">
                  <Image
                    src="/profile_image_default.png"
                    width={40}
                    height={40}
                    alt="마이페이지 이미지"
                    className="cursor-pointer"
                  />
                </Link>
                <ul className="bg-secondary-80 absolute -right-11 top-full z-50 mt-2 hidden w-32 rounded-md shadow-md group-hover:pointer-events-auto group-hover:block md:-right-10">
                  {liDropdowns.map((liDropdown) => (
                    <li key={liDropdown.label}>
                      {liDropdown.label === '마이페이지' ? (
                        <Link href="/mypage">
                          <button
                            type="button"
                            className="hover:bg-secondary-60 w-full px-4 py-2 text-left"
                          >
                            {liDropdown.label}
                          </button>
                        </Link>
                      ) : (
                        <button
                          onClick={handleLogin}
                          type="button"
                          className="hover:bg-secondary-60 w-full px-4 py-2 text-left"
                        >
                          {liDropdown.label}
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <Image
              src="/hamburger.png"
              width={20}
              height={20}
              alt="모바일네비게이션바"
              className="md:hidden"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
