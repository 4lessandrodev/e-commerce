import isURL from 'validator/lib/isURL';
export const validateLink = (linkString: string): boolean => isURL(linkString);
