'use client';

import { useForm } from 'react-hook-form';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import FormField from '@/components/@shared/form/Formfield';
import { authApi } from '@/axios/auth';
import LoginImages from '../login/LoginImages';

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
    watch,
  } = useForm<SignUpFormData>({
    mode: 'onSubmit',
  });

  const onSubmit = async (data: SignUpFormData) => {
    if (data.password !== data.passwordConfirm) {
      return;
    }

    try {
      const signupResponse = await authApi.signup({
        email: data.email,
        password: data.password,
        nickname: data.nickname,
      });

      if (signupResponse.status === 200) {
        localStorage.setItem('accessToken', signupResponse.data.accessToken);
        localStorage.setItem(
          'userInfo',
          JSON.stringify({
            email: data.email,
            nickname: signupResponse.data.nickname || data.nickname,
          })
        );
        router.push('/login');
      }
    } catch (error) {
      // 에러
    }
  };
  return (
    <div className="relative flex h-full min-h-screen w-full items-start justify-center bg-[#2b2d36] md:bg-[#17171c] md:pt-52">
      <div className="relative w-full md:w-[549px]">
        <div className="relative z-10 flex flex-col items-center bg-[#2b2d36] px-12 py-40 md:min-h-[560px] md:justify-center md:rounded-lg md:bg-[#2b2d36] md:px-[35px] md:py-8 md:pt-[72px] md:shadow-lg">
          <h2 className="text-2xl font-bold text-white">회원가입</h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 w-full space-y-4"
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
            <FormField
              id="passwordConfirm"
              label="비밀번호 확인"
              type="password"
              placeholder="비밀번호를 다시 한 번 입력해주세요."
              showPasswordIcon
              {...register('passwordConfirm', {
                required: true,
                validate: (value) =>
                  value === watch('password') ||
                  '비밀번호가 일치하지 않습니다.',
              })}
              isError={!!errors.passwordConfirm}
              errorMessage={
                errors.passwordConfirm
                  ? errors.passwordConfirm.message ||
                    '비밀번호 확인을 입력해주세요'
                  : ''
              }
            />

            <button
              type="submit"
              className="!mt-[46px] w-full rounded-lg bg-[#282469] py-2.5 text-white hover:bg-[#6659F4]"
            >
              확인
            </button>
          </form>

          <p className="mt-6 text-sm text-secondary-50">
            이미 회원이신가요?{' '}
            <Link
              href="/login"
              className="text-primary-20 hover:text-status-hover"
            >
              로그인
            </Link>
          </p>
        </div>
        <LoginImages />
      </div>
    </div>
  );
}

export default SignUpForm;
