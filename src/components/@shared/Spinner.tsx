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
    primary: 'fill-default-primary',
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
    <>
      <style jsx global>{`
        @keyframes spinnerAppear {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes smoothSpin {
          0% {
            transform: rotate(0deg);
            animation-timing-function: cubic-bezier(0.33, 0, 0.66, 0.33);
          }
          50% {
            transform: rotate(180deg);
            animation-timing-function: cubic-bezier(0.33, 0.66, 0.66, 1);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .spinner-appear {
          animation: spinnerAppear 0.3s cubic-bezier(0.2, 0, 0, 1);
        }

        .spinner-overlay {
          animation: fadeIn 0.2s ease-in-out;
        }

        .smooth-spin {
          animation: smoothSpin 1.5s infinite;
        }
      `}</style>

      <div
        role="status"
        className={clsx(
          'inline-flex items-center justify-center',
          isFullscreen ? 'fixed inset-0 z-50' : 'relative z-10',
          hasOverlay && isFullscreen && 'spinner-overlay bg-black/50',
          className
        )}
      >
        <div className="spinner-appear">
          <Image
            src="/spinner.svg"
            fill
            alt="loading spinner"
            className={clsx(
              'smooth-spin',
              sizeClasses[size],
              colorClasses[color],
              !isFullscreen && opacityClasses[opacity]
            )}
          />
        </div>
        <span className="sr-only">{loadingText}</span>
      </div>
    </>
  );
}
