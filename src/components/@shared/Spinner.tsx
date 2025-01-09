import { clsx } from 'clsx';
import Image from 'next/image';

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

  return (
    <div
      role="status"
      className={clsx(
        'inline-flex items-center justify-center',
        isFullscreen && 'fixed inset-0 z-50',
        hasOverlay && isFullscreen && 'bg-black/50',
        className
      )}
    >
      <Image
        src="/spinner.svg"
        fill
        alt="loading spinner"
        className={clsx(
          'animate-spin',
          sizeClasses[size],
          colorClasses[color],
          !isFullscreen && opacityClasses[opacity]
        )}
      />
      <span className="sr-only">{loadingText}</span>
    </div>
  );
}
