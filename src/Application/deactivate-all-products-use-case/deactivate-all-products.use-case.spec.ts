import { ProductRepositoryInterface } from '@repo/product-repository.interface';
import { DeactivateAllProductsUseCase } from './deactivate-all-products.use-case';

describe('deactivate-all-products.use-case', () => {
  let productRepo: ProductRepositoryInterface;

  beforeEach(() => {
    productRepo = {
      delete: jest.fn(),
      exists: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      findProductsByIds: jest.fn(),
      save: jest.fn(),
      deactivateAllProducts: jest.fn(),
    };
  });

  it('should be defined', () => {
    const useCase = new DeactivateAllProductsUseCase(productRepo);
    expect(useCase).toBeDefined();
  });

  it('should call repository with success', async () => {
    const useCase = new DeactivateAllProductsUseCase(productRepo);
    const result = await useCase.execute();
    expect(result.isSuccess).toBe(true);
  });
});
