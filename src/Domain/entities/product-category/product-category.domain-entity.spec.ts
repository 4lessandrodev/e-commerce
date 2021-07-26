import { ProductCategory } from './product-category.domain-entity';
import { ERROR_PRODUCT_CATEGORY_DESCRIPTION_LENGTH } from './product-category-errors.domain-entity';
import delay from 'delay';
import { UniqueEntityID } from 'types-ddd';
import { ProductCategoryId } from './product-category-id.domain-entity';
import { ProductCategoryProps } from './product-category.domain-entity-interface';

describe('ProductCategory', () => {
	const makeSut = (props?: ProductCategoryProps, id?: UniqueEntityID) => {
		return ProductCategory.create(
			props ?? { description: 'valid category' },
			id
		);
	};

	it('Should create a valid Product Category', () => {
		expect(makeSut().getResult().description).toBe('valid category');
	});

	it('Should fail if provide a short description', () => {
		const productCategoryResult = makeSut({ description: 'a' });
		expect(productCategoryResult.isFailure).toBe(true);
		expect(productCategoryResult.isSuccess).toBe(false);
		expect(productCategoryResult.error).toBe(
			ERROR_PRODUCT_CATEGORY_DESCRIPTION_LENGTH
		);
	});

	it('Should fail if provide a long description', () => {
		const productCategoryResult = makeSut({
			description: 'this is a long description to fail the test'
		});
		expect(productCategoryResult.isFailure).toBe(true);
		expect(productCategoryResult.isSuccess).toBe(false);
		expect(productCategoryResult.error).toBe(
			ERROR_PRODUCT_CATEGORY_DESCRIPTION_LENGTH
		);
	});

	it('Should create a not deleted entity', () => {
		const productCategoryResult = makeSut();
		expect(productCategoryResult.isFailure).toBe(false);
		expect(productCategoryResult.isSuccess).toBe(true);
		expect(productCategoryResult.getResult().isDeleted).toBe(false);
	});

	it('Should create a deleted entity', () => {
		const productCategoryResult = makeSut({
			description: 'Valid Category',
			isDeleted: true
		});
		expect(productCategoryResult.isFailure).toBe(false);
		expect(productCategoryResult.isSuccess).toBe(true);
		expect(productCategoryResult.getResult().isDeleted).toBe(true);
	});

	it('Should create a entity with provided id', () => {
		const createdId = ProductCategoryId.create();
		const productCategoryResult = makeSut(
			{
				description: 'Valid Category',
				isDeleted: false
			},
			createdId.id
		);
		expect(productCategoryResult.isFailure).toBe(false);
		expect(productCategoryResult.isSuccess).toBe(true);
		expect(productCategoryResult.getResult().id.toString()).toBe(
			createdId.id.toString()
		);
	});

	it('Should create a not deleted entity and delete after create and update event date to updatedAt', async () => {
		const productCategoryResult = makeSut().getResult();
		const dateUpdatedAtBeforeDelete =
			productCategoryResult.updatedAt.getMilliseconds();
		await delay(500);
		productCategoryResult.delete();
		expect(productCategoryResult.isDeleted).toBe(true);
		const dateUpdatedAtAfterDelete =
			productCategoryResult.updatedAt.getMilliseconds();
		expect(dateUpdatedAtAfterDelete).not.toEqual(dateUpdatedAtBeforeDelete);
	});
});
