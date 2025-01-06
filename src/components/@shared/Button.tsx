import clsx from 'clsx';

type ButtonProps = {
  variant?: 'primary' | 'secondary';
  size?: 'large' | 'small' | 'full';
  font?: '16' | '14';
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<'button'>;

export default function Button({
  size,
  variant = 'primary',
  font = '16',
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const buttonClass = clsx(
    'base-class',
    {
      'm-auto rounded-lg p-[10px] text-center':
        variant === 'primary' || variant === 'secondary',
      'bg-orange-600 text-white hover:bg-orange-500 focus:bg-orange-700':
        !disabled && variant === 'primary',
      'border-[1px] border-orange-600 bg-white text-orange-600 hover:border-orange-500 hover:text-orange-500 focus:border-orange-700 focus:text-orange-700':
        !disabled && variant === 'secondary',

      'bg-gray-400 text-white': disabled && variant === 'primary',
      'border-[1px] border-gray-400 text-gray-400':
        disabled && variant === 'secondary',

      'text-base font-semibold': font === '16',
      'text-sm font-semibold': font === '14',

      'h-11 w-[332px]': size === 'large',
      'h-10 w-[120px]': size === 'small',
      'w-full': size === 'full',
    },
    className
  );

  return (
    <button
      type="button"
      className={buttonClass}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
