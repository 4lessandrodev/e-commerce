import { RegisterProductCategoryUseCase } from './register-product-category.use-case';

describe('register-product-category.use-case', () => {
	//
	let repo: any;
	//
	beforeEach(() => {
		repo = {
			exists: jest.fn(),
			save: jest.fn()
		};
	});
	//
	it('should be defined ', async () => {
		const useCase = new RegisterProductCategoryUseCase(repo);
		expect(useCase).toBeDefined();
	});

	it('should fail if category already exists', async () => {
		jest.spyOn(repo, 'exists').mockResolvedValue(true);
		const useCase = new RegisterProductCategoryUseCase(repo);
		const result = await useCase.execute({
			description: 'invalid_description'
		});
		expect(result.isFailure).toBe(true);
	});

	it('should fail if provide long description ', async () => {
		jest.spyOn(repo, 'exists').mockResolvedValue(false);
		const useCase = new RegisterProductCategoryUseCase(repo);
		const result = await useCase.execute({
			description: 'invalid_description'.repeat(50)
		});
		expect(result.isFailure).toBe(true);
	});

	it('should save with success', async () => {
		jest.spyOn(repo, 'exists').mockResolvedValue(false);
		const useCase = new RegisterProductCategoryUseCase(repo);
		const result = await useCase.execute({
			description: 'valid_description'
		});
		expect(result.isSuccess).toBe(true);
	});
});
