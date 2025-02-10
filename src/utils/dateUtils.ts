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

  return date.getHours();
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
export const slashYearMonthDay = (dateString: string | undefined) => {
  if (!dateString) return '';

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

// 오늘 날짜 비교 및 확인
export const isToday = (date: any) => {
  const today = getToday();
  const dateToCompare = new Date(date);

  const koreaOffset = dateToCompare.getTimezoneOffset() * 60000; // 한국 시간 변환
  const koreaDateToCompare = new Date(
    dateToCompare.getTime() + koreaOffset + 9 * 60 * 60 * 1000
  ); // UTC+9
  return today.toDateString() === koreaDateToCompare.toDateString();
};

// 날짜, 시간, AM/PM 분리
export const splitDateTime = (dateTimeString: string): [string, string] => {
  const [datePart, ...timeParts] = dateTimeString.split(' ');
  const timePart = timeParts.join(' ');
  return [datePart, timePart];
};

// AM/PM 정보를 반영하여 시간 계산
export const adjustHour = (hour: number, period: string): number => {
  if (period === 'PM') {
    return hour === 12 ? hour : hour + 12;
  }
  return hour === 12 ? 0 : hour;
};

// EX) 0000-00-00T00:00:000Z
export const convertToISO = (
  dateString: string,
  timeString: string
): string => {
  const [time, period] = timeString.split(' ');
  const [hourString, minuteString] = time.split(':');

  const adjustedHour = adjustHour(parseInt(hourString, 10), period);
  const finalDateTimeString = `${dateString}T${adjustedHour.toString().padStart(2, '0')}:${minuteString.split(' ')[0].padStart(2, '0')}:00Z`;

  return new Date(finalDateTimeString).toISOString();
};
