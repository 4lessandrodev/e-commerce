import IsLength from 'validator/lib/isLength';
/**
 *
 * @param text string to validate
 * @param max max value as number to check string length.
 * @param min min value as number to chack string length `default is 1`
 */
export const validateStringLengthBetweenMaxAndMin = (
  text: string,
  max: number,
  min?: number,
): boolean => {
  return IsLength(text, { max, min: min ?? 1 });
};
