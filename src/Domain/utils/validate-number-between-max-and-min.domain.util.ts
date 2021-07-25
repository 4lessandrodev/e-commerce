interface validateParams {
	value: number;
	max: number;
	min: number;
}
/**
 *
 * @param value number to validate
 * @param max max value as number to check `equal or less`.
 * @param min min value as number to check: `equal or greater`.
 * @returns `true` if value is between range or `false`if not
 */
export const validateNumberBetweenMaxAndMin = (
	props: validateParams
): boolean => {
	return props.value >= props.min && props.value <= props.max;
};
