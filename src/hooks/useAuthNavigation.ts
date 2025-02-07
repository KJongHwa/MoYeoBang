import { ACCESS_TOKEN_KEY } from '@/axios/constants';
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
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    const userInfo = localStorage.getItem('userInfo');

    if (!token || !userInfo) {
      // 둘 중 하나라도 없으면 모두 제거
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem('userInfo');
      router.push(redirectPath);
    } else {
      onSuccess();
    }
  };
  return { checkAndNavigate };
}
