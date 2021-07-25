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
 * `key` is string you want to compare.
 * `enum` is an enum you have to check.
 *
 * @returns boolean `true`if enum includes provided key and `false` if not
 */
export const validateEnumIncludesKey = (props: paramsKey): boolean =>
	Object.keys(props.enum).includes(props.key.toUpperCase());

/**
 *
 * @param props is an object with values
 * `value` is string you want to compare.
 * `enum` is an enum you have to check.
 * @returns boolean `true`if enum includes provided value and `false` if not
 */
export const validateEnumIncludesValue = (props: paramsValue): boolean =>
	Object.values(props.enum).includes(props.value);
