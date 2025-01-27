/* eslint-disable prettier/prettier */

'use client';

import Image from 'next/image';
import Link from 'next/link';
import useToast from '@/hooks/useToast';
import { useDropdown } from '@/hooks/useDropdown';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '@/axios/auth';
import Button from './button/Button';
import HeaderNavBar from './HeaderNavbar';
import Toast from './Toast';

export default function Header() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searching, setSearching] = useState(true);
  const [mobileNav, setMobileNav] = useState(false);
  const { toastMessage, toastVisible, toastType, handleSuccess } = useToast();
  const {
    isOpen: isMenuOpen,
    openDropdown,
    closeDropdown,
    toggleDropdown,
  } = useDropdown();

  useEffect(() => {
    const checkLoginStatus = () => {
      const userInfo = localStorage.getItem('userInfo');
      setIsLoggedIn(!!userInfo);
    };

    checkLoginStatus();

    const handleLocalStorageChange = () => {
      checkLoginStatus();
    };

    window.addEventListener('localStorageChange', handleLocalStorageChange);

    return () => {
      window.removeEventListener(
        'localStorageChange',
        handleLocalStorageChange
      );
    };
  }, []);
  const handleSearching = () => {
    setSearching(!searching);
  };
  const handleMobileNav = () => {
    setMobileNav(!mobileNav);
  };

  const closeMobileNav = () => {
    setMobileNav(false);
  };

  const handleLogout = async () => {
    const { success } = await authApi.logout();
    if (success) {
      setIsLoggedIn(false);
      closeMobileNav();
      handleSuccess('로그아웃 되었습니다.');
      router.push('/');
    }
  };

  const navLinks = [
    { label: '모임 찾기', href: '/gathering' },
    { label: '찜한 모임', href: '/likes' },
    { label: '모든 리뷰', href: '/allreview' },
  ];
  const searchImg = searching
    ? { src: '/icons/search.svg', alt: '검색버튼' }
    : { src: '/icons/ic_delete.svg', alt: '검색닫기버튼' };

  return (
    <div>
      <div className="relative z-50">
        <div className="fixed top-0 w-full">
          <div className="mx-auto flex h-[52px] w-full max-w-[1920px] items-center justify-between border-b border-secondary-70 bg-secondary-bg px-5 md:h-[60px] md:px-[30px] xl:px-[200px]">
            {/* Navigation Links */}
            <nav className="flex items-center gap-8 text-base text-text-default">
              <Link href="/" onClick={closeMobileNav}>
                <Image
                  src="/icons/Logo.svg"
                  width={100}
                  height={23}
                  alt="로고 이미지"
                />
              </Link>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hidden rounded-xl px-4 py-1 transition duration-300 hover:bg-primary-40 md:block"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-5">
              <button type="button" onClick={handleSearching}>
                <Image
                  src={searchImg.src}
                  width={24}
                  height={24}
                  alt={searchImg.alt}
                />
              </button>
              {!isLoggedIn ? (
                <div className="flex gap-7 text-base font-bold text-white">
                  <Link href="/login">
                    <Button
                      type="button"
                      variant="tertiary-gray"
                      padding="8"
                      fontSize="14"
                      className="text-[12px]"
                      shape="round"
                      onClick={closeMobileNav}
                    >
                      로그인/회원가입
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="relative flex text-base font-bold text-white">
                  <button type="button" onClick={toggleDropdown}>
                    <Image
                      src="/icons/profile_image_default.svg"
                      width={24}
                      height={24}
                      alt="마이페이지 이미지"
                    />
                  </button>
                  {isMenuOpen && (
                    <ul className="absolute -right-12 z-50 mt-8 w-32 rounded-md bg-secondary-80 text-[16px] font-normal shadow-md">
                      <li>
                        <Link href="/mypage" onClick={closeDropdown}>
                          <button
                            type="button"
                            className="w-full rounded-md px-4 py-2 text-left hover:bg-secondary-60"
                          >
                            마이페이지
                          </button>
                        </Link>
                      </li>
                      <li>
                        <button
                          type="button"
                          className="w-full rounded-md px-4 py-2 text-left hover:bg-secondary-60"
                          onClick={() => {
                            handleLogout();
                            closeDropdown();
                          }}
                        >
                          로그아웃
                        </button>
                      </li>
                    </ul>
                  )}
                </div>
              )}
              <button
                type="button"
                onClick={() => {
                  handleMobileNav();
                  closeDropdown();
                }}
              >
                <Image
                  src={
                    mobileNav ? '/icons/ic_delete.svg' : '/icons/mobile_nav.svg'
                  }
                  width={24}
                  height={24}
                  alt="모바일네비게이션바"
                  className="md:hidden"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
      {mobileNav && <HeaderNavBar onClose={closeMobileNav} />}
      {toastVisible && <Toast message={toastMessage} type={toastType} />}
    </div>
  );
}
