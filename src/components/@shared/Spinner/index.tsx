'use client';

import { clsx } from 'clsx';

interface SpinnerProps {
  /** 스피너의 크기 */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** 스피너의 색상 */
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
  /** 스피너의 투명도 */
  opacity?: 'light' | 'medium' | 'dark';
  /** 추가 스타일링을 위한 클래스명 */
  className?: string;
  /** 로딩 중 메시지 (screen reader 용) */
  loadingText?: string;
  /** 전체 화면 로딩 여부 */
  isFullscreen?: boolean;
  /** 배경 오버레이 사용 여부 (isFullscreen이 true일 때만 적용) */
  hasOverlay?: boolean;
}

/**
 * 로딩 상태를 표시하는 스피너 컴포넌트
 *
 * @example
 * // 기본 사용
 * <Spinner />
 *
 * // 크기와 색상 지정
 * <Spinner size="lg" color="primary" />
 *
 * // 전체 화면 로딩
 * <Spinner isFullscreen hasOverlay />
 */
export default function Spinner({
  size = 'md',
  color = 'primary',
  opacity = 'medium',
  className,
  loadingText = 'Loading...',
  isFullscreen = false,
  hasOverlay = false,
}: SpinnerProps) {
  const sizeClasses = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const colorClasses = {
    primary: 'fill-blue-600',
    secondary: 'fill-gray-600',
    success: 'fill-green-500',
    danger: 'fill-red-600',
    warning: 'fill-yellow-400',
  };

  const opacityClasses = {
    light: 'opacity-25',
    medium: 'opacity-50',
    dark: 'opacity-75',
  };

  const spinnerContent = (
    <div
      role="status"
      className={clsx(
        'inline-flex items-center justify-center',
        isFullscreen && 'fixed inset-0 z-50',
        hasOverlay && isFullscreen && 'bg-black/50',
        className
      )}
    >
      <svg
        aria-hidden="true"
        className={clsx(
          'animate-spin',
          sizeClasses[size],
          colorClasses[color],
          !isFullscreen && opacityClasses[opacity]
        )}
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">{loadingText}</span>
    </div>
  );

  return spinnerContent;
}
