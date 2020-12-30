const _Object = {};

interface paramsKey {
  key: string;
  enum: typeof _Object;
}

interface paramsValue {
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
export const validateEnumIncludesKey = (props: paramsKey): boolean =>
  Object.keys(props.enum).includes(props.key.toUpperCase());

export const validateEnumIncludesValue = (props: paramsValue): boolean =>
  Object.values(props.enum).includes(props.value);
