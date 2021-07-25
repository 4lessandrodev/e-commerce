import { CollectionAddressRepositoryInterface } from '@repo/collection-address-repository.interface';
import { DeleteCollectionAddressUseCase } from './delete-collection-address.use-case';

describe('delete-collection-address.use-case', () => {
	//
	let collectionAddressRepo: CollectionAddressRepositoryInterface;
	beforeEach(() => {
		collectionAddressRepo = {
			delete: jest.fn(),
			exists: jest.fn(),
			find: jest.fn(),
			findOne: jest.fn(),
			save: jest.fn()
		};
	});

	it('should be defined', () => {
		const useCase = new DeleteCollectionAddressUseCase(
			collectionAddressRepo
		);
		expect(useCase).toBeDefined();
	});

	it('should delete with success', async () => {
		jest.spyOn(collectionAddressRepo, 'exists').mockResolvedValueOnce(true);
		const useCase = new DeleteCollectionAddressUseCase(
			collectionAddressRepo
		);
		const result = await useCase.execute({ id: 'valid_id' });

		expect(result.isSuccess).toBe(true);
	});

	it('should fail address does not exists', async () => {
		jest.spyOn(collectionAddressRepo, 'exists').mockResolvedValueOnce(
			false
		);
		const useCase = new DeleteCollectionAddressUseCase(
			collectionAddressRepo
		);
		const result = await useCase.execute({ id: 'valid_id' });

		expect(result.isFailure).toBe(true);
	});
});
