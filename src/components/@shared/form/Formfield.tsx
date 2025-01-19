// FormField.tsx
import { forwardRef, useState } from 'react';
import Image from 'next/image';
import Input from '@/components/@shared/Input';

interface FormFieldProps {
  id: string;
  label: string;
  type?: 'text' | 'email' | 'password';
  placeholder: string;
  showPasswordIcon?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  isError?: boolean;
  errorMessage?: string;
}

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({
    id,
    label,
    type = 'text',
    placeholder,
    showPasswordIcon = false,
    onChange,
    value,
    isError,
    errorMessage,
    ...props
  }) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
      setShowPassword(!showPassword);
    };

    return (
      <div className="relative">
        <Input
          label={label}
          varient="elevated"
          fontSize="14"
          placeholder={placeholder}
          inputProps={{
            id,
            type: showPassword ? 'text' : type,
            onChange,
            value,
            name: id,
            ...props,
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
