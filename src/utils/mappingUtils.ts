export const findLabelByValue = (
  value: string,
  list: { value: string; label: string }[]
): string => {
  const result = list.find((item) => item.value === value);
  return result ? result.label : value;
};
