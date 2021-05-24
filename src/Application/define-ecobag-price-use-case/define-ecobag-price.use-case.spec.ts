import { EcobagRepositoryInterface } from '@repo/ecobag.repository.interface';
import { DefineEcobagPriceUseCase } from './define-ecobag-price.use-case';

describe('define-ecobag-price.use-case', () => {
  let ecobagRepo: EcobagRepositoryInterface;

  beforeEach(() => {
    ecobagRepo = {
      definePrice: jest.fn(),
      getPrice: jest.fn(),
    };
  });

  it('should be defined', () => {
    const useCase = new DefineEcobagPriceUseCase(ecobagRepo);
    expect(useCase).toBeDefined();
  });

  it('should define price with success', async () => {
    const useCase = new DefineEcobagPriceUseCase(ecobagRepo);
    const result = await useCase.execute({ price: 10 });

    expect(result.isSuccess).toBe(true);
  });
});
