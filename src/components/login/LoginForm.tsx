'use client';

import { useState } from 'react';
import FormField from '@/components/@shared/form/Formfield';

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginForm() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 로그인 처리 로직
  };

  return (
    <div className="relative flex h-full min-h-screen w-full items-center justify-center bg-[#17171c] pt-72">
      <div className="relative z-10 flex h-auto w-full max-w-md flex-col items-center justify-center rounded-lg bg-[#2b2d36] px-6 py-8 shadow-lg">
        <h2 className="text-2xl font-bold text-white">로그인</h2>

        <form onSubmit={handleSubmit} className="mt-6 w-full space-y-4">
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

          <button
            type="submit"
            className="mt-6 w-full rounded-lg bg-[#282469] py-2.5 text-white hover:bg-[#6659F4]"
          >
            로그인
          </button>
        </form>

        <p className="mt-4 text-sm text-secondary-50">
          아직 계정이 없으신가요?{' '}
          <a href="/signup" className="text-primary-20 hover:text-status-hover">
            회원가입
          </a>
        </p>
      </div>
    </div>
  );
}
