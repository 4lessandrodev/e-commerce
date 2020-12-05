const _Object = {};

interface params {
  value: string;
  enum: typeof _Object;
}

/**
 *
 * @param props is an object with values.
 * `value` is string you want to compare.
 * `enum` is an enum you have to check.
 *
 * Return is a boolean `true`if string is in enum and `false` if not
 */
export const enumIncludesValue = (props: params): boolean =>
  Object.keys(props.enum).includes(props.value.toUpperCase());
