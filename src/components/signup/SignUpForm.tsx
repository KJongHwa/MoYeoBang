'use client';

interface SignUpFormData {
  email: string;
  nickname: string;
  password: string;
  passwordConfirm: string;
}

export default function SignUpForm() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black">
      <div className="w-full max-w-md rounded-lg bg-brand-secondary p-6">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold text-text-primary">회원가입</h2>
          <button
            type="button"
            className="text-text-secondary"
            aria-label="닫기"
          >
            <span className="sr-only">닫기</span>
          </button>
        </div>

        <form className="mt-6 space-y-4">
          <div className="space-y-1">
            <label className="block text-sm text-text-secondary">
              이름
              <input
                type="text"
                name="nickname"
                aria-label="이름 입력"
                placeholder="이름을 입력해주세요."
                className="mt-1 w-full rounded bg-brand-tertiary px-4 py-2.5 text-text-primary placeholder:text-text-disabled focus:outline-none focus:ring-1 focus:ring-status-focus"
              />
            </label>
          </div>

          <div className="space-y-1">
            <label className="block text-sm text-text-secondary">
              아이디
              <input
                type="email"
                name="email"
                aria-label="이메일 입력"
                placeholder="이메일을 입력해주세요."
                className="mt-1 w-full rounded bg-brand-tertiary px-4 py-2.5 text-text-primary placeholder:text-text-disabled focus:outline-none focus:ring-1 focus:ring-status-focus"
              />
            </label>
          </div>

          <div className="space-y-1">
            <label className="block text-sm text-text-secondary">
              비밀번호
              <div className="relative mt-1">
                <input
                  type="password"
                  name="password"
                  aria-label="비밀번호 입력"
                  placeholder="비밀번호를 입력해주세요."
                  className="w-full rounded bg-brand-tertiary px-4 py-2.5 text-text-primary placeholder:text-text-disabled focus:outline-none focus:ring-1 focus:ring-status-focus"
                />
                <button
                  type="button"
                  aria-label="비밀번호 보기"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-point-icon"
                >
                  {/* 아이콘이 들어갈 자리 */}
                </button>
              </div>
            </label>
          </div>

          <div className="space-y-1">
            <label className="block text-sm text-text-secondary">
              비밀번호 확인
              <div className="relative mt-1">
                <input
                  type="password"
                  name="passwordConfirm"
                  aria-label="비밀번호 확인 입력"
                  placeholder="비밀번호를 다시 한 번 입력해주세요."
                  className="w-full rounded bg-brand-tertiary px-4 py-2.5 text-text-primary placeholder:text-text-disabled focus:outline-none focus:ring-1 focus:ring-status-focus"
                />
                <button
                  type="button"
                  aria-label="비밀번호 확인 보기"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-point-icon"
                >
                  {/* 아이콘이 들어갈 자리 */}
                </button>
              </div>
            </label>
          </div>

          <button
            type="submit"
            className="mt-6 w-full rounded bg-status-danger py-2.5 text-text-primary hover:bg-status-hover focus:bg-status-focus"
          >
            회원가입
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-text-secondary">
          이미 회원이신가요?
          <a
            href="/login"
            className="text-status-danger hover:text-status-hover"
          >
            로그인
          </a>
        </p>
      </div>
    </div>
  );
}
