// FormField.tsx
import { forwardRef, useState } from 'react';
import Image from 'next/image';
import LoginInput from './LoginInput';

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  type?: 'text' | 'email' | 'password';
  placeholder: string;
  showPasswordIcon?: boolean;
  isError?: boolean;
  errorMessage?: string;
}

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  (
    {
      id,
      label,
      type = 'text',
      placeholder,
      showPasswordIcon = false,
      isError,
      errorMessage,
      ...rest
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
      setShowPassword(!showPassword);
    };

    return (
      <div className="relative">
        <LoginInput
          label={label}
          varient="elevated"
          fontSize="14"
          placeholder={placeholder}
          inputProps={{
            ...rest,
            id,
            type: showPassword ? 'text' : type,
            name: id,
            ref,
          }}
          isError={isError}
          errorMessage={errorMessage}
        />
        {showPasswordIcon && type === 'password' && (
          <button
            type="button"
            onClick={handleTogglePassword}
            aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
            className="absolute right-3 top-[50px] -translate-y-1/2"
          >
            <Image
              src={
                showPassword
                  ? '/icons/visibility_on.svg'
                  : '/icons/visibility_off.svg'
              }
              width={24}
              height={24}
              alt=""
              aria-hidden="true"
              className="object-contain"
            />
          </button>
        )}
      </div>
    );
  }
);

FormField.displayName = 'FormField';

export default FormField;
