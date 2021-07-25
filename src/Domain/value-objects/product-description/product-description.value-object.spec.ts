import { ProductDescriptionValueObject } from './product-description.value-object';

describe('ProductDescription.value-object', () => {
	//
	it('should be defined', () => {
		const productDescription =
			ProductDescriptionValueObject.create('valid_description');
		expect(productDescription).toBeDefined();
	});

	it('should fail if provide a long description', () => {
		const productDescription = ProductDescriptionValueObject.create(
			'invalid_description'.repeat(10)
		);
		expect(productDescription.isFailure).toBe(true);
	});

	it('should create a valid value object', () => {
		const productDescription =
			ProductDescriptionValueObject.create('valid_description');
		expect(productDescription.isSuccess).toBe(true);
	});

	it('should lowercase value', () => {
		const productDescription =
			ProductDescriptionValueObject.create('Valid_Description');
		expect(productDescription.getResult().value).toBe('valid_description');
	});
});
