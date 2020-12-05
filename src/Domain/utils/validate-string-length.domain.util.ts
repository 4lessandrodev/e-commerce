import IsLength from 'validator/lib/isLength';
interface validateParams {
  text: string;
  maxLength: number;
  minLength?: number;
}
/**
 *
 * @param text string to validate
 * @param max max value as number to check string length.
 * @param min min value as number to chack string length `default is 1`
 */
export const validateStringLengthBetweenMaxAndMin = (
  props: validateParams,
): boolean => {
  return IsLength(props.text, {
    max: props.maxLength,
    min: props.minLength ?? 1,
  });
};
