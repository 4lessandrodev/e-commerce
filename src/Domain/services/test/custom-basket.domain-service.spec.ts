import { BasketCategory } from '@domain/entities';
import {
	BasketDescriptionValueObject,
	BasketItemValueObject,
	ChangesLimitValueObject,
	Currency,
	ExchangeFactorValueObject,
	MonetaryValueObject,
	ProductDescriptionValueObject,
	QuantityAvailableValueObject,
	UnitOfMeasurementValueObject,
} from '@domain/value-objects';
import { BasketId, CustomBasket, ProductId } from '@domain/aggregates-root';
import { CustomBasketDomainService } from '../custom-basket.domain-service';

describe('custom-basket.domain-service', () => {
	//

	let customBasket: CustomBasket;
	let item: BasketItemValueObject;
	let quantityToAdd: QuantityAvailableValueObject;
	let quantityToRemove: QuantityAvailableValueObject;

	beforeEach(() => {
		//
		item = BasketItemValueObject.create({
			availableStock: QuantityAvailableValueObject.create(10).getResult(),
			description:
				ProductDescriptionValueObject.create('valid_description').getResult(),
			exchangeFactor: ExchangeFactorValueObject.create(1).getResult(),
			productId: ProductId.create(),
			quantity: QuantityAvailableValueObject.create(1).getResult(),
			unitOfMeasurement: UnitOfMeasurementValueObject.create('CX').getResult(),
		}).getResult();

		//
		customBasket = CustomBasket.create({
			basketId: BasketId.create(),
			category: BasketCategory.create({
				changesLimit: ChangesLimitValueObject.create(7).getResult(),
				description: 'valid_description',
			}).getResult(),
			currentItems: [item],
			description:
				BasketDescriptionValueObject.create('valid_description').getResult(),
			itemsAdded: [],
			itemsRemoved: [item],
			price: MonetaryValueObject.create(
				Currency.create(100).getResult(),
			).getResult(),
			quantity: QuantityAvailableValueObject.create(10).getResult(),
			isDraft: true,
		}).getResult();

		//
		quantityToAdd = QuantityAvailableValueObject.create(1).getResult();

		//
		quantityToRemove = QuantityAvailableValueObject.create(1).getResult();
	});

	it('should be defined', () => {
		const service = new CustomBasketDomainService();
		expect(service).toBeDefined();
	});

	it('should add one new item and count decrement changes limit, and add added item', () => {
		const service = new CustomBasketDomainService();

		service.removeItemFromCustomBasket({
			customBasket,
			item,
			quantityToRemove,
		});

		expect(customBasket.exchangesFactorAvailable).toBe(1);

		const resultSuccess = service.addItemToCustomBasket({
			customBasket,
			item,
			quantityToAdd,
		});

		const resultFailure = service.addItemToCustomBasket({
			customBasket,
			item,
			quantityToAdd,
		});

		expect(resultSuccess.isSuccess).toBe(true);
		expect(customBasket.changesLimitAvailable).toBe(6);
		expect(customBasket.exchangesFactorAvailable).toBe(0);
		expect(resultFailure.isFailure).toBe(true);
	});
});
