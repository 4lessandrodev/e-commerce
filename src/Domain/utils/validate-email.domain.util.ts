import isEmail from 'validator/lib/isEmail';
export const isValidEmail = (email: string): boolean => {
	return isEmail(email);
};
