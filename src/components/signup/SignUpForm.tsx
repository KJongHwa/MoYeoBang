'use client';

import { useForm } from 'react-hook-form';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import FormField from '@/components/@shared/form/Formfield';
import { authApi } from '@/axios/auth';

interface SignUpFormData {
  email: string;
  nickname: string;
  password: string;
  passwordConfirm: string;
}

function SignUpForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    mode: 'onSubmit',
  });

  const onSubmit = async (data: SignUpFormData) => {
    if (data.password !== data.passwordConfirm) {
      return;
    }

    try {
      await authApi.signup({
        email: data.email,
        password: data.password,
        nickname: data.nickname,
      });

      const loginResponse = await authApi.login({
        email: data.email,
        password: data.password,
      });

      localStorage.setItem('accessToken', loginResponse.data.accessToken);
      router.push('/');
    } catch (error) {
      // 에러 처리 제외
    }
  };

  return (
    <div className="relative flex h-full min-h-screen w-full items-center justify-center bg-[#17171c] pt-72">
      <div className="absolute inset-0 z-0">
        <div className="hidden min-[1920px]:block">
          <Image
            src="/signup_small.svg"
            alt=""
            width={191}
            height={155}
            className="absolute left-[36rem] top-[733px] h-auto w-auto"
          />
          <Image
            src="/signup_puzzle.svg"
            alt=""
            width={431}
            height={504}
            className="absolute right-[-12rem] top-[6rem] h-auto w-auto"
          />
        </div>
        <div className="hidden max-[744px]:block">
          <Image
            src="/signup_small_screen.svg"
            alt=""
            width={436}
            height={256}
            className="absolute bottom-[-2rem] left-0 h-auto w-auto"
          />
        </div>
      </div>

      <div className="relative z-10 flex h-auto w-full max-w-md flex-col items-center justify-center rounded-lg bg-[#2b2d36] px-6 py-8 shadow-lg">
        <h2 className="text-2xl font-bold text-white">회원가입</h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-6 w-full space-y-4"
        >
          <FormField
            id="nickname"
            label="이름"
            placeholder="이름을 입력해주세요."
            {...register('nickname', { required: true })}
            isError={!!errors.nickname}
            errorMessage={errors.nickname ? '이름을 입력해주세요' : ''}
          />
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
            errorMessage={errors.email ? '이메일을 입력해주세요' : ''}
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
          <FormField
            id="passwordConfirm"
            label="비밀번호 확인"
            type="password"
            placeholder="비밀번호를 다시 한 번 입력해주세요."
            showPasswordIcon
            {...register('passwordConfirm', {
              required: true,
              validate: (value, formValues) =>
                value === formValues.password ||
                '비밀번호가 일치하지 않습니다.',
            })}
            isError={!!errors.passwordConfirm}
            errorMessage={
              errors.passwordConfirm ? '비밀번호 확인을 입력해주세요' : ''
            }
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
          <Link
            href="/login"
            className="text-primary-20 hover:text-status-hover"
          >
            로그인
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUpForm;
