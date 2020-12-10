import { ProductCategory } from './ProductCategory.domain-entity';
import { ERROR_PRODUCT_CATEGORY_DESCRIPTION_LENGTH } from './ProductCategoryErrors.domain-entity';

describe('ProductCategory', () => {
  it('Should create a valid Product Category', () => {
    const productCategoryResult = ProductCategory.create({
      description: 'Frutas',
    });
    expect(productCategoryResult.getResult().description).toBe('Frutas');
  });

  it('Should fail if provide a short description', () => {
    const productCategoryResult = ProductCategory.create({
      description: 'a',
    });
    expect(productCategoryResult.isFailure).toBe(true);
    expect(productCategoryResult.isSuccess).toBe(false);
    expect(productCategoryResult.error).toBe(
      ERROR_PRODUCT_CATEGORY_DESCRIPTION_LENGTH,
    );
  });

  it('Should fail if provide a long description', () => {
    const productCategoryResult = ProductCategory.create({
      description: 'this is a long description to fail the test',
    });
    expect(productCategoryResult.isFailure).toBe(true);
    expect(productCategoryResult.isSuccess).toBe(false);
    expect(productCategoryResult.error).toBe(
      ERROR_PRODUCT_CATEGORY_DESCRIPTION_LENGTH,
    );
  });
});
