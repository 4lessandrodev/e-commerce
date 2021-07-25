/* eslint-disable */
export const isBcryptHash = (value: string): boolean => {
	const regex = /\$2b\$\d\d\$[\s\S]{53}|{.}\b/g;
	return regex.test(value);
};
/* eslint-enabled */
