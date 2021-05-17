import { ProductRepositoryInterface } from '@repo/product-repository.interface';
import { DeactivateManyProductsUseCase } from './deactivate-many-products.use-case';

describe('deactivate-many-products.use-case', () => {
  let productRepo: ProductRepositoryInterface;

  beforeEach(() => {
    productRepo = {
      delete: jest.fn(),
      exists: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      findProductsByIds: jest.fn(),
      save: jest.fn(),
      deactivateManyProducts: jest.fn(),
      resetStock: jest.fn(),
    };
  });

  it('should be defined', () => {
    const useCase = new DeactivateManyProductsUseCase(productRepo);
    expect(useCase).toBeDefined();
  });

  it('should call repository with success', async () => {
    const useCase = new DeactivateManyProductsUseCase(productRepo);
    const result = await useCase.execute({ productsIds: [] });
    expect(result.isSuccess).toBe(true);
  });

  it('should call repository with success', async () => {
    const useCase = new DeactivateManyProductsUseCase(productRepo);
    const result = await useCase.execute({ productsIds: ['valid_id'] });
    expect(result.isSuccess).toBe(true);
  });
});
