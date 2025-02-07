/* eslint-disable prettier/prettier */

'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import useToast from '@/hooks/useToast';
import Link from 'next/link';
import { useEffect } from 'react';

import Toast from '@/components/@shared/Toast';
import FormField from '@/components/@shared/form/Formfield';
import { authApi } from '@/axios/auth';
import { ACCESS_TOKEN_KEY } from '@/axios/constants';
import LoginImages from './LoginImages';

interface LoginFormData {
  email: string;
  password: string;
}

function LoginForm() {
  const router = useRouter();
  const { toastMessage, toastVisible, toastType, handleError } = useToast();

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    const userInfo = localStorage.getItem('userInfo');

    // 둘 중 하나만 있는 비정상적인 상태일 때
    if ((!token && userInfo) || (token && !userInfo)) {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem('userInfo');
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    mode: 'onSubmit',
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await authApi.login({
        email: data.email,
        password: data.password,
      });

      if (response.status === 200) {
        localStorage.setItem(
          'userInfo',
          JSON.stringify({
            email: data.email,
          })
        );
        const event = new Event('localStorageChange');
        window.dispatchEvent(event);
        router.push('/');
      }
    } catch (error) {
      handleError('로그인 실패');
    }
  };

  return (
    <div className="relative flex h-full min-h-screen w-full items-start justify-center bg-[#2b2d36] md:bg-[#17171c] md:pt-52">
      <div className="relative w-full md:w-[549px]">
        <div className="relative z-10 flex flex-col items-center bg-[#2b2d36] px-12 py-40 md:min-h-[560px] md:justify-center md:rounded-lg md:bg-[#2b2d36] md:px-[35px] md:py-8 md:pb-[124px] md:pt-[72px] md:shadow-lg">
          <h2 className="text-2xl font-bold text-white">로그인</h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 w-full space-y-4"
          >
            <FormField
              id="email"
              label="이메일"
              type="email"
              placeholder="이메일을 입력해주세요."
              {...register('email', {
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: '올바른 이메일 형식이 아닙니다',
                },
              })}
              isError={!!errors.email}
              errorMessage={
                errors.email
                  ? errors.email.message || '이메일을 입력해주세요'
                  : ''
              }
            />
            <FormField
              id="password"
              label="비밀번호"
              type="password"
              placeholder="비밀번호를 입력해주세요."
              showPasswordIcon
              {...register('password', { required: true })}
              isError={!!errors.password}
              errorMessage={errors.password ? '비밀번호를 입력해주세요' : ''}
            />
            <button
              type="submit"
              className="!mt-[46px] w-full rounded-lg bg-[#282469] py-2.5 text-white hover:bg-[#6659F4]"
            >
              로그인
            </button>
          </form>

          <p className="mt-6 text-sm text-secondary-50">
            모여방이 처음이신가요?{' '}
            <Link
              href="/signup"
              className="text-primary-20 hover:text-status-hover"
            >
              회원가입
            </Link>
          </p>
        </div>
        <LoginImages />
      </div>
      {toastVisible && <Toast message={toastMessage} type={toastType} />}
    </div>
  );
}

export default LoginForm;
