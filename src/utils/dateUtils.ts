// Ex) 1월 16일
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('ko-KR', {
    month: 'long',
    day: 'numeric',
  });
};

// Ex) 14
export const extractHour = (dateString: string) => {
  const date = new Date(dateString);

  return date.getUTCHours();
};

// Ex) 2025.01.08
export const yearMonthDay = (dateString: string) => {
  const date = new Date(dateString);
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
};

// Ex) 2025-01-08
export const hyphenYearMonthDay = (dateString: string) => {
  const date = new Date(dateString);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

// Ex) 2025/01/08
export const slashYearMonthDay = (dateString: string) => {
  const date = new Date(dateString);
  return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`;
};
