import { BasketRepositoryInterface } from '@repo/basket-repository.interface';
import { Basket } from '@domain/aggregates-root';
import { BasketCategory } from '@domain/entities';
import {
	ChangesLimitValueObject,
	Currency,
	MonetaryValueObject,
	BasketDescriptionValueObject
} from '@domain/value-objects';

import { UpdateBasketUseCase } from './update-basket.use-case';

describe('update-basket.use-case', () => {
	//
	let basketRepo: BasketRepositoryInterface;
	let basket: Basket;
	//

	beforeEach(() => {
		basketRepo = {
			delete: jest.fn(),
			exists: jest.fn(),
			find: jest.fn(),
			findOne: jest.fn(),
			save: jest.fn(),
			deactivateManyBaskets: jest.fn(),
			updateAllBasketItemByProductId: jest.fn(),
			resetStockOnBasketItems: jest.fn()
		};

		basket = Basket.create({
			category: BasketCategory.create({
				changesLimit: ChangesLimitValueObject.create(1).getResult(),
				description: 'valid_description'
			}).getResult(),
			description:
        BasketDescriptionValueObject.create('valid_description').getResult(),
			isActive: true,
			price: MonetaryValueObject.create(
				Currency.create(15).getResult()
			).getResult()
		}).getResult();
	});

	it('should be defined', () => {
		const useCase = new UpdateBasketUseCase(basketRepo);
		expect(useCase).toBeDefined();
	});

	it('should fail if provide a long description', async () => {
		const useCase = new UpdateBasketUseCase(basketRepo);

		const result = await useCase.execute({
			basketId: 'valid_id',
			description: 'invalid_description'.repeat(5),
			isActive: true,
			price: 10,
			info: 'valid_info'
		});

		expect(result.isFailure).toBe(true);
	});

	it('should fail if provide a long description to info', async () => {
		const useCase = new UpdateBasketUseCase(basketRepo);

		const result = await useCase.execute({
			basketId: 'valid_id',
			description: 'valid_description',
			isActive: true,
			price: 10,
			info: 'invalid_info'.repeat(25)
		});

		expect(result.isFailure).toBe(true);
	});

	it('should fail if provide a invalid value to price', async () => {
		const useCase = new UpdateBasketUseCase(basketRepo);

		const result = await useCase.execute({
			basketId: 'valid_id',
			description: 'valid_description',
			isActive: true,
			price: '10a' as any,
			info: 'valid_info'
		});

		expect(result.isFailure).toBe(true);
	});

	it('should fail if basket does not exits', async () => {
		jest.spyOn(basketRepo, 'findOne').mockResolvedValueOnce(null);
		jest.spyOn(basketRepo, 'exists').mockResolvedValueOnce(false);

		const useCase = new UpdateBasketUseCase(basketRepo);

		const result = await useCase.execute({
			basketId: 'valid_id',
			description: 'valid_description',
			isActive: true,
			price: 10,
			info: 'valid_info'
		});

		expect(result.isFailure).toBe(true);
	});

	it('should fail if basket already exists basket with description', async () => {
		jest.spyOn(basketRepo, 'findOne').mockResolvedValueOnce(basket);
		jest.spyOn(basketRepo, 'exists').mockResolvedValueOnce(true);

		const useCase = new UpdateBasketUseCase(basketRepo);

		const result = await useCase.execute({
			basketId: 'valid_id',
			description: 'exist_description',
			isActive: true,
			price: 10,
			info: 'valid_info'
		});

		expect(result.isFailure).toBe(true);
	});

	it('should update basket with success', async () => {
		jest.spyOn(basketRepo, 'findOne').mockResolvedValueOnce(basket);
		jest.spyOn(basketRepo, 'exists').mockResolvedValueOnce(false);

		const oldDescription = basket.description.value;
		const oldStatus = basket.isActive;
		const oldPrice = basket.price.value;
		const oldInfo = basket.info?.value;

		const useCase = new UpdateBasketUseCase(basketRepo);

		const result = await useCase.execute({
			basketId: 'valid_id',
			description: 'new_valid_description',
			isActive: false,
			price: 10,
			info: 'new_valid_info'
		});

		expect(result.isSuccess).toBe(true);

		expect(oldDescription).not.toBe(basket.description.value);
		expect(oldStatus).not.toBe(basket.isActive);
		expect(oldPrice).not.toBe(basket.price.value);
		expect(oldInfo).not.toBe(basket.info?.value);
	});
});
