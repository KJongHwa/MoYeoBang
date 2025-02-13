import Image from 'next/image';
import ButtonMotion from '@/components/@shared/animation/ButtonMotion';

type IconButtonProps = {
  type?: 'button' | 'submit' | 'reset';
  src: string;
  alt: string;
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<'button'>;

/**
 * IconButtonProps Details
 *
 * @param type 버튼의 type, 기본 값 button
 * @param src 이미지의 src 값 지정
 * @param alt 이미지의 alt 값 지정
 *
 */

export default function IconButton({
  type = 'button',
  src,
  alt,
  children,
  className,
  disabled,
  ...props
}: IconButtonProps) {
  return (
    <ButtonMotion
      // eslint-disable-next-line react/button-has-type
      type={type}
      className="flex items-center justify-center gap-1 rounded-lg bg-default-tertiary px-[10px] py-[5px] text-xs text-text-default md:gap-2 md:px-4 md:py-3 md:text-sm"
      disabled={disabled}
      {...props}
    >
      <Image src={src} width={14} height={14} alt={alt} />
      {children}
    </ButtonMotion>
  );
}
