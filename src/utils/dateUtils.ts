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

// EX) 00:00:00
export const getToday = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

export const getDateTime = (dateString?: string): number => {
  return dateString ? new Date(dateString).getTime() : 0;
};

export const isToday = (date: any) => {
  const today = getToday();
  const dateToCompare = new Date(date);
  // 한국 시간으로 변환
  const koreaOffset = dateToCompare.getTimezoneOffset() * 60000;
  const koreaDateToCompare = new Date(
    dateToCompare.getTime() + koreaOffset + 9 * 60 * 60 * 1000
  ); // UTC+9
  return today.toDateString() === koreaDateToCompare.toDateString();
};
