import React, { useState } from 'react';
import Image from 'next/image';

type ToggleInputProps = {
  label?: string;
  labelText?: string;
  placeholder?: string;
  isError?: boolean;
  errorMessage?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

const icons = {
  visible: '/icons/visibility_on.svg',
  hidden: '/icons/visibility_off.svg',
};

/**
 * ToggleInputProps Details
 *
 * @param label
 * @param labelText label값과 화면에 표시되는 Text를 다르게 설정할 경우 사용
 * @param isError 에러 존재 여부
 * @param errorMessage 에러가 존재할 경우 표시할 에러 메세지
 */

export default function ToggleInput({
  label,
  labelText,
  placeholder,
  isError = false,
  errorMessage,
  inputProps,
  ...props
}: ToggleInputProps) {
  const [isVisible, setIsVisible] = useState(false);
  const inputId = React.useId();

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <div className="flex w-full flex-col items-start gap-2 text-sm" {...props}>
      {label && (
        <label htmlFor={inputId} className="font-semibold text-secondary-50">
          {labelText || label}
        </label>
      )}
      <div className="relative w-full">
        <input
          id={inputId}
          type={isVisible ? 'text' : 'password'}
          placeholder={placeholder}
          className={`w-full rounded-lg bg-secondary-100 px-4 py-[10px] outline outline-1 placeholder:text-secondary-70 
            ${isVisible ? 'text-text-default' : 'text-gray-500'}
            ${isError ? 'outline-status-danger focus-within:outline-status-danger' : 'outline-transparent focus-within:outline-default-primary'}`}
          {...inputProps}
        />
        <Image
          src={isVisible ? icons.visible : icons.hidden}
          alt={isVisible ? '숨김 아이콘' : '보기 아이콘'}
          width={24}
          height={24}
          className="absolute right-3 top-1/2 -translate-y-1/2 transform  cursor-pointer"
          onClick={toggleVisibility}
        />
      </div>
      {isError && (
        <p className="font-semibold text-status-danger">{errorMessage}</p>
      )}
    </div>
  );
}
