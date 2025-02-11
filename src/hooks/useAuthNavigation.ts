import { useRouter } from 'next/navigation';
import { ACCESS_TOKEN_KEY } from '@/axios/constants';

/**
 * 로컬 스토리지 체크 및 리다이렉트
 *
 * @param redirectPath - 리다이렉트 경로
 * @param onSuccess - 아이템이 존재할 때 호출할 함수
 */

export function useAuthNavigation(redirectPath: string, onSuccess: () => void) {
  const router = useRouter();

  const checkAndNavigate = () => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem(ACCESS_TOKEN_KEY);
      const userInfo = localStorage.getItem('userInfo');

      if (!token || !userInfo) {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem('userInfo');
        router.push(redirectPath);
      } else {
        onSuccess();
      }
    }
  };

  return { checkAndNavigate };
}
