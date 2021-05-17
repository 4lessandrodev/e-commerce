import { ProductRepositoryInterface } from '@repo/product-repository.interface';
import { ResetProductStockUseCase } from './reset-product-stock.use-case';

describe('reset-product-stock.use-case', () => {
  //
  let productRepo: ProductRepositoryInterface;
  beforeEach(() => {
    productRepo = {
      deactivateManyProducts: jest.fn(),
      delete: jest.fn(),
      exists: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      findProductsByIds: jest.fn(),
      save: jest.fn(),
      resetStock: jest.fn(),
    };
  });

  it('should be defined', () => {
    const useCase = new ResetProductStockUseCase(productRepo);
    expect(useCase).toBeDefined();
  });

  it('should call reset method with success', async () => {
    const useCase = new ResetProductStockUseCase(productRepo);
    const result = await useCase.execute({ productsIds: [] });
    expect(result.isSuccess).toBe(true);
  });

  it('should call reset method with success', async () => {
    const useCase = new ResetProductStockUseCase(productRepo);
    const result = await useCase.execute({ productsIds: ['valid_id'] });
    expect(result.isSuccess).toBe(true);
  });
});
