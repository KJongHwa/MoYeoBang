import React from 'react';

import clsx from 'clsx';

type InputProps = {
  label?: string;
  labelText?: string;
  fontSize?: '14' | '16';
  fontColor?: 'dark' | 'light';
  gap?: '8' | '12';
  placeholder?: string;
  isError?: boolean;
  errorMessage?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

/**
 * InputProps Details
 *
 * @param labelText label값과 화면에 표시되는 Text를 다르게 설정할 경우 사용
 * @param fontSize 전체 글자 사이즈
 * @param fontColor label의 글자 색상과 input창의 글자 색상
 * @param gap label, input, errorMessage 세 요소 사이의 간격
 * @param isError 에러 존재 여부
 * @param errorMessage 에러가 존재할 경우 표시할 에러 메세지
 */

export default function Input({
  label,
  labelText,
  placeholder,
  gap = '12',
  fontSize = '16',
  fontColor = 'light',
  isError = false,
  errorMessage,
  inputProps,
  ...props
}: InputProps) {
  const inputId = React.useId();

  return (
    <div
      className={clsx('flex w-full flex-col items-start', {
        'gap-3': gap === '12',
        'gap-2': gap === '8',
        'text-sm': fontSize === '14',
        'text-md': fontSize === '16',
      })}
      {...props}
    >
      {label && (
        <label
          htmlFor={inputId}
          className={clsx('font-semibold', {
            'text-gray-900': fontColor === 'dark',
            'text-gray-800': fontColor === 'light',
          })}
        >
          {labelText || label}
        </label>
      )}
      <input
        id={inputId}
        placeholder={placeholder}
        className={clsx(
          'w-full rounded-lg border-2 bg-gray-50 px-4 py-[10px] outline-none',
          {
            'text-gray-800': fontColor === 'dark',
            'text-gray-700': fontColor === 'light',
            'border-red-600 focus-within:border-red-600': isError,
            'border-gray-50 focus-within:border-gray-200': !isError,
          }
        )}
        {...inputProps}
      />
      {isError && <p className="font-semibold text-red-600">{errorMessage}</p>}
    </div>
  );
}
