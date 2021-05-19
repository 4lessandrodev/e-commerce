import { BasketRepositoryInterface } from '@repo/basket-repository.interface';
import { ResetBasketItemStockUseCase } from './reset-basket-item-stock.use-case';

describe('reset-basket-item-stock.use-case', () => {
  //
  let productRepo: BasketRepositoryInterface;
  beforeEach(() => {
    productRepo = {
      resetStockOnBasketItems: jest.fn(),
      delete: jest.fn(),
      exists: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      deactivateManyBaskets: jest.fn(),
      save: jest.fn(),
      updateAllBasketItemByProductId: jest.fn(),
    };
  });

  it('should be defined', () => {
    const useCase = new ResetBasketItemStockUseCase(productRepo);
    expect(useCase).toBeDefined();
  });

  it('should call reset method with success', async () => {
    const useCase = new ResetBasketItemStockUseCase(productRepo);
    const result = await useCase.execute({ productsIds: [] });
    expect(result.isSuccess).toBe(true);
  });

  it('should call reset method with success', async () => {
    const useCase = new ResetBasketItemStockUseCase(productRepo);
    const result = await useCase.execute({ productsIds: ['valid_id'] });
    expect(result.isSuccess).toBe(true);
  });
});
