import { BasketRepositoryInterface } from '@repo/basket-repository.interface';
import { DeactivateManyBasketsUseCase } from './deactivate-many-baskets.use-case';

describe('deactivate-many-baskets.use-case', () => {
  let basketRepo: BasketRepositoryInterface;

  beforeEach(() => {
    basketRepo = {
      delete: jest.fn(),
      exists: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      save: jest.fn(),
      deactivateManyBaskets: jest.fn(),
    };
  });

  it('should be defined', () => {
    const useCase = new DeactivateManyBasketsUseCase(basketRepo);
    expect(useCase).toBeDefined();
  });

  it('should call repository with success', async () => {
    const deactivateMethod = jest.spyOn(basketRepo, 'deactivateManyBaskets');
    const useCase = new DeactivateManyBasketsUseCase(basketRepo);

    await useCase.execute({ basketsIds: [] });

    expect(deactivateMethod).toHaveBeenCalled();
  });

  it('should call repository with success', async () => {
    const deactivateMethod = jest.spyOn(basketRepo, 'deactivateManyBaskets');
    const useCase = new DeactivateManyBasketsUseCase(basketRepo);

    await useCase.execute({ basketsIds: ['valid_id'] });

    expect(deactivateMethod).toHaveBeenCalled();
  });
});
