import { CollectionAddressRepositoryInterface } from '@repo/collection-address-repository.interface';
import { UpdateCollectionAddressUseCase } from './update-collection-address.use-case';

describe('update-collection-address.use-case', () => {
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
    const useCase = new UpdateCollectionAddressUseCase(collectionAddressRepo);
    expect(useCase).toBeDefined();
  });

  it('should update with success', async () => {
    jest.spyOn(collectionAddressRepo, 'exists').mockResolvedValueOnce(true);

    const useCase = new UpdateCollectionAddressUseCase(collectionAddressRepo);
    const result = await useCase.execute({
      id: 'valid_id',
      complement: 'valid_complement',
      number: '77b',
      regionId: 'valid_region',
      street: 'valid_street',
      zipCode: '75520140',
    });

    expect(result.isSuccess).toBe(true);
  });

  it('should fail if provide some wrong value', async () => {
    jest.spyOn(collectionAddressRepo, 'exists').mockResolvedValueOnce(true);
    const useCase = new UpdateCollectionAddressUseCase(collectionAddressRepo);
    const result = await useCase.execute({
      id: 'valid_id',
      complement: 'valid_complement'.repeat(25),
      number: '77b',
      regionId: 'valid_region',
      street: 'valid_street',
      zipCode: '75520140',
    });

    expect(result.isFailure).toBe(true);
  });

  it('should fail if address does not exists', async () => {
    jest.spyOn(collectionAddressRepo, 'exists').mockResolvedValueOnce(false);
    const useCase = new UpdateCollectionAddressUseCase(collectionAddressRepo);
    const result = await useCase.execute({
      id: 'valid_id',
      complement: 'valid_complement',
      number: '77b',
      regionId: 'valid_region',
      street: 'valid_street',
      zipCode: '75520140',
    });

    expect(result.isFailure).toBe(true);
  });
});
