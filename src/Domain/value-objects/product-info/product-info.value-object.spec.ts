import { ProductInfoValueObject } from './product-info.value-object';

describe('ProductInfo.value-object', () => {
	//
	it('should be defined', () => {
		const productInfo = ProductInfoValueObject.create('valid_description');
		expect(productInfo).toBeDefined();
	});

	it('should fail if provide a long description', () => {
		const productInfo = ProductInfoValueObject.create(
			'invalid_description'.repeat(20)
		);
		expect(productInfo.isFailure).toBe(true);
	});

	it('should create a valid value object', () => {
		const productInfo = ProductInfoValueObject.create('valid_description');
		expect(productInfo.isSuccess).toBe(true);
	});

	it('should lowercase value', () => {
		const productInfo = ProductInfoValueObject.create('Valid_Description');
		expect(productInfo.getResult().value).toBe('valid_description');
	});
});
