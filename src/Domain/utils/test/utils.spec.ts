import { convertNegativeNumberToPositive } from '../convert-negative-number-to-positive.domain.util';
import { convertPositiveNumberToNegative } from '../convert-positive-number-to-negative.domain.util';

describe('Utils', () => {
	it('Should return the same value', () => {
		const negativeNumber = -10;
		const convertedNumber = convertPositiveNumberToNegative(negativeNumber);
		expect(convertedNumber).toBe(negativeNumber);
	});
});

describe('Utils', () => {
	it('Should return the same value', () => {
		const positiveNumber = 10;
		const convertedNumber = convertNegativeNumberToPositive(positiveNumber);
		expect(convertedNumber).toBe(positiveNumber);
	});
});
