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
        className={`relative h-[120px] w-full overflow-hidden rounded-lg border-2 bg-gray-50 px-4 py-[10px] ${isError ? 'border-red-600 focus-within:border-red-600' : 'border-gray-50 focus-within:border-gray-200'}`}
      >
        <textarea
          ref={textAreaRef}
          id={textAreaId}
          placeholder={placeholder}
          className="min-h-[100px] w-full resize-none overflow-auto bg-transparent leading-6 text-gray-700 outline-none"
          {...inputProps}
        />
      </div>
      {isError && <p className="font-semibold text-red-600">{errorMessage}</p>}
    </div>
  );
}
