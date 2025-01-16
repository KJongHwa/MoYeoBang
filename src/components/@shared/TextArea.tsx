import React, { useEffect, useRef } from 'react';

type TextAreaProps = {
  label?: string;
  labelText?: string;
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
  label,
  labelText,
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
        <label htmlFor={textAreaId} className="font-semibold text-gray-800">
          {labelText || label}
        </label>
      )}
      <div
        className={`relative h-[120px] w-full overflow-hidden rounded-lg bg-secondary-5 px-4 py-[10px] outline outline-1 ${isError ? 'outline-status-danger focus-within:outline-status-danger' : 'outline-transparent focus-within:outline-default-primary'}`}
      >
        <textarea
          ref={textAreaRef}
          id={textAreaId}
          placeholder={placeholder}
          className="min-h-[100px] w-full resize-none overflow-auto bg-transparent font-medium leading-6 text-secondary-70 outline-none placeholder:text-secondary-50"
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
