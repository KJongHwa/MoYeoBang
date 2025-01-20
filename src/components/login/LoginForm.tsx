/* eslint-disable prettier/prettier */

'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import FormField from '@/components/@shared/form/Formfield';
import { authApi } from '@/axios/auth';

interface LoginFormData {
  email: string;
  password: string;
}

function LoginForm() {
  const router = useRouter();

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
        alert('로그인 성공');
        router.push('/');
      }
    } catch (error) {
      localStorage.setItem(
        'userInfo',
        JSON.stringify({
          email: data.email,
        })
      );
      router.push('/');
    }
  };

  return (
    <div className="relative flex h-full min-h-screen w-full items-center justify-center bg-[#17171c] pt-72">
      <div className="relative z-10 flex h-auto w-full max-w-md flex-col items-center justify-center rounded-lg bg-[#2b2d36] px-6 py-8 shadow-lg">
        <h2 className="text-2xl font-bold text-white">로그인</h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-6 w-full space-y-4"
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
            className="mt-6 w-full rounded-lg bg-[#282469] py-2.5 text-white hover:bg-[#6659F4]"
          >
            로그인
          </button>
        </form>

        <p className="text-secondary-50 mt-4 text-sm">
          아직 계정이 없으신가요?{' '}
          <Link
            href="/signup"
            className="text-primary-20 hover:text-status-hover"
          >
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
