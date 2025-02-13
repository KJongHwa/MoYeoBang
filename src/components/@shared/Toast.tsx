import React from 'react';
import CheckBox from '@/public/icons/checkbox.svg';
import Warning from '@/public/icons/warning.svg';

import clsx from 'clsx';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
}

export default function Toast({ message, type }: ToastProps) {
  const textColor = clsx({
    'text-white': type === 'success',
    'text-status-danger': type === 'error',
  });

  return (
    <aside
      role="alert"
      className={clsx(
        'fixed bottom-28 left-1/2 z-100 w-11/12 -translate-x-1/2 translate-y-full transform rounded-lg border-2  bg-default-tertiary p-4 shadow-lg transition-transform duration-300 ease-in-out md:w-fit',
        {
          'border-primary-40': type === 'success',
          'border-status-danger': type === 'error',
        }
      )}
    >
      <div className="flex justify-center gap-2">
        {type === 'success' ? <CheckBox /> : <Warning />}
        <span className={textColor}>{message}</span>
      </div>
    </aside>
  );
}
