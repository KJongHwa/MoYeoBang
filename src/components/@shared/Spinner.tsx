import Image from 'next/image';

/**
 * 로딩 상태를 표시하는 스피너 컴포넌트
 *
 * @example
 * // 기본 사용
 * <Spinner />
 */
export default function Spinner() {
  return (
    <div className="flex h-dvh items-center justify-center">
      <Image
        src="/loading.svg"
        alt="loading..."
        className="animate-spin"
        width={36}
        height={36}
      />
    </div>
  );
}
