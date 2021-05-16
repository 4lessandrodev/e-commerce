import { BasketRepositoryInterface } from '@repo/basket-repository.interface';
import { DeactivateAllBasketsUseCase } from './deactivate-all-baskets.use-case';

describe('deactivate-all-baskets.use-case', () => {
  let basketRepo: BasketRepositoryInterface;

  beforeEach(() => {
    basketRepo = {
      delete: jest.fn(),
      exists: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      save: jest.fn(),
      deactivateAllBaskets: jest.fn(),
    };
  });

  it('should be defined', () => {
    const useCase = new DeactivateAllBasketsUseCase(basketRepo);
    expect(useCase).toBeDefined();
  });

  it('should call repository with success', async () => {
    const deactivateMethod = jest.spyOn(basketRepo, 'deactivateAllBaskets');
    const useCase = new DeactivateAllBasketsUseCase(basketRepo);

    await useCase.execute();

    expect(deactivateMethod).toHaveBeenCalled();
  });
});
