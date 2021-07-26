import { StreetNameValueObject } from './street-name.value-object';

describe('StreetName.value-object', () => {
	it('should be defined', () => {
		const street = StreetNameValueObject.create('street name');
		expect(street).toBeDefined();
	});

	it('should fail if description length is greater than 40 characters', () => {
		const street = StreetNameValueObject.create(
			'invalid_long_description'.repeat(10)
		);
		expect(street.isFailure).toBe(true);
	});

	it('should create a valid street name', () => {
		const street = StreetNameValueObject.create('valid description');
		expect(street.isSuccess).toBe(true);
	});
});
