import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';

type TextAreaProps = {
  size?: 'large' | 'small';
  variant?: 'light' | 'dark';
  label?: string;
  labelText?: string;
  labelColor?: 'charcoal' | 'white';
  placeholder?: string;
  isError?: boolean;
  errorMessage?: string;
  inputProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
};

/**
 * TextAreaProps Details
 *
 * @param label
 * @param labelText label 값과 화면에 표시되는 문구를 다르게 설정할 경우 사용
 * @param isError 에러 존재 여부
 * @param errorMessage 에러가 존재할 경우 표시할 에러 메세지
 */

export default function TextArea({
  size = 'small',
  label,
  labelText,
  labelColor = 'charcoal',
  variant = 'light',
  placeholder,
  isError = false,
  errorMessage = '',
  inputProps,
  ...props
}: TextAreaProps) {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const textAreaId = React.useId();

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [inputProps?.value]);

  return (
    <div className="flex w-full flex-col items-start gap-3" {...props}>
      {label && (
        <label
          htmlFor={textAreaId}
          className={clsx('font-semibold', {
            'text-gray-800': labelColor === 'charcoal',
            'text-white': labelColor === 'white',
          })}
        >
          {labelText || label}
        </label>
      )}
      <div
        className={clsx(
          'relative  w-full overflow-hidden rounded-lg px-4 outline outline-1',
          {
            'outline-status-danger focus-within:outline-status-danger': isError,
            'outline-transparent focus-within:outline-default-primary':
              !isError,
            'bg-secondary-5': variant === 'light',
            'bg-default-tertiary': variant === 'dark',
            'h-[120px] py-[10px]': size === 'small',
            'h-64 py-4 md:h-[472px] md:px-5': size === 'large',
          }
        )}
      >
        <textarea
          ref={textAreaRef}
          id={textAreaId}
          placeholder={placeholder}
          className={clsx(
            'h-full w-full resize-none overflow-auto bg-transparent font-medium leading-6 outline-none ',
            {
              'text-secondary-70 placeholder:text-secondary-50':
                variant === 'light',
              'text-white placeholder:text-secondary-50': variant === 'dark',
            }
          )}
          {...inputProps}
        />
      </div>
      {isError && (
        <p className="text-xs font-semibold text-status-danger md:text-sm">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
