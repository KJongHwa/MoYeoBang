import Image from 'next/image';
import Link from 'next/link';

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
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<'button'>;

export default function LinkButton({
  type = 'button',
  href,
  variant = 'dark',
  size = 'long',
  children,
  disabled,
  ...props
}: LinkButtonProps) {
  const { src, alt } = arrowIcons[variant];

  return (
    <Link href={href}>
      <button
        // eslint-disable-next-line react/button-has-type
        type={type}
        className={clsx(
          'my-auto flex items-center justify-center gap-2 rounded-full py-[5px] text-xs font-semibold md:text-sm',
          {
            'bg-default-tertiary text-text-default': variant === 'dark',
            'bg-white text-default-tertiary': variant === 'light',
            'pl-7 pr-4 md:py-3 md:pl-8 md:pr-4': size === 'long',
            'pl-4 pr-2': size === 'short',
          }
        )}
        disabled={disabled}
        {...props}
      >
        {children}
        <Image src={src} width={24} height={24} alt={alt} quality={100} />
      </button>
    </Link>
  );
}
