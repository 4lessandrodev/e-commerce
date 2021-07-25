import { BasketCategoryRepositoryInterface } from '@repo/basket-category-repository.interface';
import { RegisterBasketCategoryUseCase } from './register-basket-category.use-case';

describe('register-basket-category.use-case', () => {
	//
	let basketCategoryRepo: BasketCategoryRepositoryInterface;
	//
	beforeEach(() => {
		basketCategoryRepo = {
			delete: jest.fn(),
			exists: jest.fn(),
			findOne: jest.fn(),
			save: jest.fn()
		};
	});
	//
	it('should be defined', () => {
		const useCase = new RegisterBasketCategoryUseCase(basketCategoryRepo);
		expect(useCase).toBeDefined();
	});

	it('should fail if provide invalid change limit', async () => {
		const useCase = new RegisterBasketCategoryUseCase(basketCategoryRepo);
		const result = await useCase.execute({
			changesLimit: 500,
			description: 'valid_description'
		});

		expect(result.isFailure).toBe(true);
	});

	it('should fail if provide invalid description', async () => {
		const useCase = new RegisterBasketCategoryUseCase(basketCategoryRepo);
		const result = await useCase.execute({
			changesLimit: 3,
			description: 'invalid_description'.repeat(10)
		});

		expect(result.isFailure).toBe(true);
	});

	it('should fail if provide a existent description', async () => {
		//
		jest.spyOn(basketCategoryRepo, 'exists').mockResolvedValueOnce(true);

		const useCase = new RegisterBasketCategoryUseCase(basketCategoryRepo);
		const result = await useCase.execute({
			changesLimit: 3,
			description: 'invalid_description'
		});

		expect(result.isFailure).toBe(true);
	});

	it('should save with success', async () => {
		//
		jest.spyOn(basketCategoryRepo, 'exists').mockResolvedValueOnce(false);

		const useCase = new RegisterBasketCategoryUseCase(basketCategoryRepo);
		const result = await useCase.execute({
			changesLimit: 3,
			description: 'valid_description'
		});

		expect(result.isSuccess).toBe(true);
	});
});
