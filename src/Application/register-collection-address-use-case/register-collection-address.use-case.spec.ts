import { CollectionAddressRepositoryInterface } from '@repo/collection-address-repository.interface';
import { RegisterCollectionAddressUseCase } from './register-collection-address.use-case';

describe('register-collection-address.use-case', () => {
  //
  let collectionAddressRepo: CollectionAddressRepositoryInterface;
  beforeEach(() => {
    collectionAddressRepo = {
      delete: jest.fn(),
      exists: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      save: jest.fn(),
    };
  });

  it('should be defined', () => {
    const useCase = new RegisterCollectionAddressUseCase(collectionAddressRepo);
    expect(useCase).toBeDefined();
  });

  it('should save with success', async () => {
    const useCase = new RegisterCollectionAddressUseCase(collectionAddressRepo);
    const result = await useCase.execute({
      complement: 'valid_complement',
      zipCode: '75520140',
      street: 'valid_street',
      regionId: 'valid_id',
      number: '77b',
    });

    expect(result.isSuccess).toBe(true);
  });

  it('should fail if provide some wrong value', async () => {
    const useCase = new RegisterCollectionAddressUseCase(collectionAddressRepo);
    const result = await useCase.execute({
      complement: 'valid_complement',
      zipCode: 'invalid',
      street: 'valid_street',
      regionId: 'valid_id',
      number: '77b',
    });

    expect(result.isFailure).toBe(true);
  });
});
