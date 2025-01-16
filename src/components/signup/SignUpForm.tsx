'use client';

import { useState } from 'react';
import Image from 'next/image';
import FormField from '@/components/@shared/form/Formfield';

interface SignUpFormData {
  email: string;
  nickname: string;
  password: string;
  passwordConfirm: string;
}

export default function SignUpForm() {
  const [formData, setFormData] = useState<SignUpFormData>({
    nickname: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // 퍼즐 디자인 공부
  return (
    <div className="relative flex h-full min-h-screen w-full items-center justify-center bg-[#17171c] pt-72">
      <div className="absolute inset-0 z-0">
        <div className="hidden min-[1920px]:block">
          <Image
            src="/signup_small.svg"
            alt=""
            width={191}
            height={155}
            className="absolute left-[36rem] top-[733px]"
          />
          <Image
            src="/signup_puzzle.svg"
            alt=""
            width={431}
            height={504}
            className="absolute right-[-12rem] top-[6rem]"
          />
        </div>
        <div className="hidden max-[744px]:block">
          <Image
            src="/signup_small_screen.svg"
            alt=""
            width={436}
            height={256}
            className="absolute bottom-[-2rem] left-0"
          />
        </div>
      </div>

      <div className="relative z-10 flex h-auto w-full max-w-md flex-col items-center justify-center rounded-lg bg-[#2b2d36] px-6 py-8 shadow-lg">
        <h2 className="text-2xl font-bold text-white">회원가입</h2>

        <form onSubmit={handleSubmit} className="mt-6 w-full space-y-4">
          <FormField
            id="nickname"
            label="이름"
            placeholder="이름을 입력해주세요."
            value={formData.nickname}
            onChange={handleChange}
          />
          <FormField
            id="email"
            label="이메일"
            type="email"
            placeholder="이메일을 입력해주세요."
            value={formData.email}
            onChange={handleChange}
          />
          <FormField
            id="password"
            label="비밀번호"
            type="password"
            placeholder="비밀번호를 입력해주세요."
            showPasswordIcon
            value={formData.password}
            onChange={handleChange}
          />
          <FormField
            id="passwordConfirm"
            label="비밀번호 확인"
            type="password"
            placeholder="비밀번호를 다시 한 번 입력해주세요."
            showPasswordIcon
            value={formData.passwordConfirm}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="mt-6 w-full rounded-lg bg-[#282469] py-2.5 text-white hover:bg-[#6659F4]"
          >
            확인
          </button>
        </form>

        <p className="mt-4 text-sm text-secondary-50">
          이미 회원이신가요?{' '}
          <a href="/login" className="text-primary-20 hover:text-status-hover">
            로그인
          </a>
        </p>
      </div>
    </div>
  );
}
