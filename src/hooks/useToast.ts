import { useState } from 'react';

const useToast = () => {
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastVisible, setToastVisible] = useState<boolean>(false);
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  const showToast = (message: string, type: 'success' | 'error') => {
    setToastMessage(message);
    setToastType(type);
    setToastVisible(true);

    setTimeout(() => {
      setToastVisible(false);
    }, 3000);
  };

  const handleSuccess = (message: string) => {
    showToast(message, 'success');
  };

  const handleError = (message: string) => {
    showToast(message, 'error');
  };

  return {
    toastMessage,
    toastVisible,
    toastType,
    handleSuccess,
    handleError,
  };
};

export default useToast;
