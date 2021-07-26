import { Basket, Product } from '@domain/aggregates-root';
import { ItemDto } from '@app/register-basket-use-case/register-basket.dto';
import { BasketDomainService } from '../basket.domain-service';
import { BasketCategory, ProductCategory } from '@domain/entities';
import {
	BasketDescriptionValueObject,
	ChangesLimitValueObject,
	Currency,
	ExchangeFactorValueObject,
	MonetaryValueObject,
	ProductDescriptionValueObject,
	QuantityAvailableValueObject,
	UnitOfMeasurementValueObject
} from '@domain/value-objects';
import { UniqueEntityID } from 'types-ddd';

describe('basket.service', () => {
	//
	const category: ProductCategory = ProductCategory.create({
		description: 'valid_description'
	}).getResult();
	//
	const price: MonetaryValueObject = MonetaryValueObject.create(
		Currency.create(10).getResult()
	).getResult();
	//
	const unitOfMeasurement: UnitOfMeasurementValueObject =
		UnitOfMeasurementValueObject.create('KG').getResult();
	//
	const product: Product = Product.create(
		{
			category,
			exchangeFactor: ExchangeFactorValueObject.create(1).getResult(),
			description:
				ProductDescriptionValueObject.create(
					'valid_description'
				).getResult(),
			isActive: true,
			isSpecial: false,
			price,
			quantityAvailable:
				QuantityAvailableValueObject.create(10).getResult(),
			unitOfMeasurement
		},
		new UniqueEntityID('valid_id')
	).getResult();

	const itemDto: ItemDto = {
		productId: 'valid_id',
		quantity: 3
	};
	//
	const basketCategory: BasketCategory = BasketCategory.create({
		changesLimit: ChangesLimitValueObject.create(2).getResult(),
		description: 'valid_description'
	}).getResult();
	//
	const basket: Basket = Basket.create({
		category: basketCategory,
		description:
			BasketDescriptionValueObject.create(
				'valid_description'
			).getResult(),
		isActive: true,
		price
	}).getResult();
	//

	it('should be defined', () => {
		const service = new BasketDomainService();
		expect(service).toBeDefined();
	});

	it('should not add products if ids does not match', () => {
		const service = new BasketDomainService();
		const invalidItemDto: ItemDto = { ...itemDto, productId: 'invalid_id' };
		service.addItemsOnBasket([invalidItemDto, itemDto], basket, [product]);
		expect(basket.products.length).toBe(1);
	});

	it('should add products if provide valid ids', () => {
		const service = new BasketDomainService();
		service.addItemsOnBasket([itemDto, itemDto], basket, [
			product,
			product
		]);
		expect(basket.products.length).toBe(3);
		expect(basket.products[0].value.exchangeFactor.value).toBe(1);
	});
});
