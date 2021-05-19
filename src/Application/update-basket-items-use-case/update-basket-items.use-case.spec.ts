import { BasketRepositoryInterface } from '@repo/basket-repository.interface';
import { UpdateBasketItemUseCase } from './update-basket-items.use-case';

describe('update-basket-items.use-case', () => {
  //
  let basketRepo: BasketRepositoryInterface;

  beforeEach(() => {
    basketRepo = {
      deactivateManyBaskets: jest.fn(),
      delete: jest.fn(),
      exists: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      save: jest.fn(),
      updateAllBasketItemByProductId: jest.fn(),
      resetStockOnBasketItems: jest.fn(),
    };
  });

  it('should be defined', () => {
    const useCase = new UpdateBasketItemUseCase(basketRepo);
    expect(useCase).toBeDefined();
  });

  it('should call repository with success', async () => {
    const useCase = new UpdateBasketItemUseCase(basketRepo);
    const result = await useCase.execute({
      availableStock: 10,
      description: 'new description',
      exchangeFactor: 2,
      productId: 'valid_id',
      unitOfMeasurement: 'CX',
    });

    expect(result.isSuccess).toBe(true);
  });
});
