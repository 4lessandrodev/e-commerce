import { BasketInfoValueObject } from './basket-info.value-object';

describe('BasketDescription.value-object', () => {
	//
	it('should be defined', () => {
		const basketDescription =
			BasketInfoValueObject.create('valid_description');
		expect(basketDescription).toBeDefined();
	});

	it('should fail if provide a long description', () => {
		const basketDescription = BasketInfoValueObject.create(
			'invalid_description'.repeat(20)
		);
		expect(basketDescription.isFailure).toBe(true);
	});

	it('should create a valid value object', () => {
		const basketDescription =
			BasketInfoValueObject.create('valid_description');
		expect(basketDescription.isSuccess).toBe(true);
	});

	it('should lowercase value', () => {
		const basketDescription =
			BasketInfoValueObject.create('Valid_Description');
		expect(basketDescription.getResult().value).toBe('valid_description');
	});
});
