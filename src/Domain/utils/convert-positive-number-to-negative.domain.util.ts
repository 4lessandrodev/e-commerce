export const convertPositiveNumberToNegative = (value: number): number => {
  if (value < 0) {
    return value;
  }
  return value * -1;
};
