import { useRouter } from 'next/navigation';

/**
 * 로컬 스토리지 체크 및 리다이렉트
 *
 * @param redirectPath - 리다이렉트 경로
 * @param onSuccess - 아이템이 존재할 때 호출할 함수
 */

export function useAuthNavigation(redirectPath: string, onSuccess: () => void) {
  const router = useRouter();

  const checkAndNavigate = () => {
    const item = localStorage.getItem('accessToken');

    if (!item) {
      router.push(redirectPath);
    } else {
      onSuccess();
    }
  };

  return { checkAndNavigate };
}
