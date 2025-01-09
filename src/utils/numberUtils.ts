export const stringToNumber = (val: string | number): number => {
  const numberValue = Number(val);
  return Number.isNaN(numberValue) ? 0 : numberValue;
};
