'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import clsx from 'clsx';

const arrowIcons = {
  light: { src: '/icons/arrow_line_black.svg', alt: '검은색 화살표 아이콘' },
  dark: { src: '/icons/arrow_line_white.svg', alt: '흰색 화살표 아이콘' },
};

type LinkButtonProps = {
  href: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'dark' | 'light';
  size?: 'long' | 'short';
  shape?: 'round' | 'default';
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<'button'>;

export default function LinkButton({
  type = 'button',
  href,
  variant = 'dark',
  size = 'long',
  shape = 'round',
  children,
  disabled,
  ...props
}: LinkButtonProps) {
  const router = useRouter();
  const { src, alt } = arrowIcons[variant];

  const handleClick = () => {
    if (!disabled) {
      router.push(href);
    }
  };

  return (
    <div>
      <button
        // eslint-disable-next-line react/button-has-type
        type={type}
        className={clsx(
          'my-auto flex items-center justify-center gap-2 py-[5px] text-xs font-semibold md:text-sm',
          {
            'bg-default-tertiary text-text-default': variant === 'dark',
            'bg-white text-default-tertiary': variant === 'light',
            'pl-7 pr-4 md:py-3 md:pl-8 md:pr-4': size === 'long',
            'pl-4 pr-2': size === 'short',
            'rounded-full': shape === 'round',
            'rounded-lg': shape === 'default',
          }
        )}
        disabled={disabled}
        onClick={handleClick}
        {...props}
      >
        {children}
        <Image src={src} width={24} height={24} alt={alt} quality={100} />
      </button>
    </div>
  );
}
