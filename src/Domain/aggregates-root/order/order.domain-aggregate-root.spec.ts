import {
	AddressComplementValueObject,
	AddressNumberValueObject,
	BasketDescriptionValueObject,
	BasketItemValueObject,
	ChangesLimitValueObject,
	Currency,
	ExchangeFactorValueObject,
	ImageValueObject,
	MonetaryValueObject,
	OrderIdValueObject,
	OrderStatusValueObject,
	ProductDescriptionValueObject,
	QuantityAvailableValueObject,
	StreetNameValueObject,
	UnitOfMeasurementValueObject,
	UserNameValueObject,
	ZipCodeValueObject,
} from '@domain/value-objects';
import {
	BasketCategory,
	DeliveryOrCollectionAddress,
	ProductCategory,
	SeparateProduct,
} from '@domain/entities';
import { RegionId } from '../region/region-id.domain-aggregate-root';
import { UserId } from '../user/UserId.domain-aggregate-root';
import { Order } from './order.domain-aggregate-root';
import { ProductId } from '../product/product-id.domain-aggregate-root';
import { BasketId } from '../basket/basket-id.domain-aggregate-root';
import { CustomBasket } from '../custom-basket/custom-basket.domain-aggregate-root';

describe('order.domain-aggregate-root.spec', () => {
	const zipCode = ZipCodeValueObject.create('75520140').getResult();

	it('should be defined', () => {
		const monetary = MonetaryValueObject.create(
			Currency.create(10).getResult(),
		).getResult();

		const order = Order.create({
			costOfFreight: monetary,
			basketPacks: [],
			clientId: UserId.create(),
			clientName: UserNameValueObject.create('valid_name').getResult(),
			customBaskets: [],
			isTheOrderForCollection: true,
			deliveryOrCollectionAddress: DeliveryOrCollectionAddress.create({
				complement:
					AddressComplementValueObject.create('valid_street').getResult(),
				number: AddressNumberValueObject.create('77b').getResult(),
				regionId: RegionId.create(),
				street: StreetNameValueObject.create('valid_street').getResult(),
				zipCode,
			}).getResult(),
			ecoBagFee: monetary,
			includesEcobag: true,
			orderNumber: OrderIdValueObject.create().getResult(),
			separateProducts: [],
			status: OrderStatusValueObject.create('COMPLETED').getResult(),
		});

		expect(order).toBeDefined();
	});

	it('should return 0 as ecobag fee if it is not included on order', () => {
		const monetary = MonetaryValueObject.create(
			Currency.create(10).getResult(),
		).getResult();

		const order = Order.create({
			costOfFreight: monetary,
			basketPacks: [],
			clientId: UserId.create(),
			clientName: UserNameValueObject.create('valid_name').getResult(),
			customBaskets: [],
			isTheOrderForCollection: true,
			deliveryOrCollectionAddress: DeliveryOrCollectionAddress.create({
				complement:
					AddressComplementValueObject.create('valid_street').getResult(),
				number: AddressNumberValueObject.create('77b').getResult(),
				regionId: RegionId.create(),
				street: StreetNameValueObject.create('valid_street').getResult(),
				zipCode,
			}).getResult(),
			ecoBagFee: monetary,
			includesEcobag: false,
			orderNumber: OrderIdValueObject.create().getResult(),
			separateProducts: [],
			status: OrderStatusValueObject.create('COMPLETED').getResult(),
		}).getResult();

		expect(order.includesEcobag).toBe(false);
		expect(order.ecobagFee.value).toBe(0);
	});

	it('should calculate amount based on products, basket include, freight and ecobag fee ', () => {
		const monetary = MonetaryValueObject.create(
			Currency.create(10).getResult(),
		).getResult();

		const item = BasketItemValueObject.create({
			availableStock: QuantityAvailableValueObject.create(20).getResult(),
			description:
				ProductDescriptionValueObject.create('valid_description').getResult(),
			exchangeFactor: ExchangeFactorValueObject.create(2).getResult(),
			productId: ProductId.create(),
			quantity: QuantityAvailableValueObject.create(1).getResult(),
			unitOfMeasurement: UnitOfMeasurementValueObject.create('CX').getResult(),
		}).getResult();

		const customBasket = CustomBasket.create({
			basketId: BasketId.create(),
			category: BasketCategory.create({
				description: 'valid_description',
				changesLimit: ChangesLimitValueObject.create(1).getResult(),
			}).getResult(),
			currentItems: [item, item, item],
			description:
				BasketDescriptionValueObject.create('valid_description').getResult(),
			itemsAdded: [],
			itemsRemoved: [],
			quantity: QuantityAvailableValueObject.create(2).getResult(),
			price: MonetaryValueObject.create(
				Currency.create(10).getResult(),
			).getResult(),
			image: undefined,
			isDraft: true,
		}).getResult();

		const separateProduct = SeparateProduct.create({
			image: ImageValueObject.create('https://aws.com/image.jpeg').getResult(),
			description:
				ProductDescriptionValueObject.create('valid_description').getResult(),
			unitOfMeasurement: 'KG',
			category: ProductCategory.create({
				description: 'valid_description',
			}).getResult(),
			isSpecial: true,
			price: MonetaryValueObject.create(
				Currency.create(21).getResult(),
			).getResult(),
			quantity: QuantityAvailableValueObject.create(3).getResult(),
		}).getResult();

		//

		const order = Order.create({
			costOfFreight: monetary, // 10,00
			basketPacks: [],
			clientId: UserId.create(),
			clientName: UserNameValueObject.create('valid_name').getResult(),
			customBaskets: [customBasket, customBasket], // 20,00 + 20,00
			isTheOrderForCollection: true,
			deliveryOrCollectionAddress: DeliveryOrCollectionAddress.create({
				complement:
					AddressComplementValueObject.create('valid_street').getResult(),
				number: AddressNumberValueObject.create('77b').getResult(),
				regionId: RegionId.create(),
				street: StreetNameValueObject.create('valid_street').getResult(),
				zipCode,
			}).getResult(),
			ecoBagFee: monetary, // 10,00
			includesEcobag: true,
			orderNumber: OrderIdValueObject.create().getResult(),
			separateProducts: [separateProduct, separateProduct], // 63,00 + 63,00
			status: OrderStatusValueObject.create('COMPLETED').getResult(),
			subTotalCustomBaskets: MonetaryValueObject.create(Currency.create(40).getResult()).getResult(),
			subTotalSeparateProducts: MonetaryValueObject.create(Currency.create(126).getResult()).getResult(),
		}).getResult();

		// total = 186,00

		expect(order.includesEcobag).toBe(true);
		expect(order.ecobagFee.value).toBe(10);
		expect(order.costOfFreight.value).toBe(10);
		expect(order.amount.value).toBe(186);
	});

	it('should calculate amount based on products, basket include, freight and not ecobag fee ', () => {
		const monetary = MonetaryValueObject.create(
			Currency.create(10).getResult(),
		).getResult();

		const item = BasketItemValueObject.create({
			availableStock: QuantityAvailableValueObject.create(20).getResult(),
			description:
				ProductDescriptionValueObject.create('valid_description').getResult(),
			exchangeFactor: ExchangeFactorValueObject.create(2).getResult(),
			productId: ProductId.create(),
			quantity: QuantityAvailableValueObject.create(1).getResult(),
			unitOfMeasurement: UnitOfMeasurementValueObject.create('CX').getResult(),
		}).getResult();

		const customBasket = CustomBasket.create({
			basketId: BasketId.create(),
			category: BasketCategory.create({
				description: 'valid_description',
				changesLimit: ChangesLimitValueObject.create(1).getResult(),
			}).getResult(),
			currentItems: [item, item, item],
			description:
				BasketDescriptionValueObject.create('valid_description').getResult(),
			itemsAdded: [],
			itemsRemoved: [],
			quantity: QuantityAvailableValueObject.create(2).getResult(),
			price: MonetaryValueObject.create(
				Currency.create(20).getResult(),
			).getResult(),
			image: undefined,
			isDraft: true,
		}).getResult();

		const separateProduct = SeparateProduct.create({
			image: ImageValueObject.create('https://aws.com/image.jpeg').getResult(),
			description:
				ProductDescriptionValueObject.create('valid_description').getResult(),
			unitOfMeasurement: 'KG',
			category: ProductCategory.create({
				description: 'valid_description',
			}).getResult(),
			isSpecial: true,
			price: MonetaryValueObject.create(
				Currency.create(21).getResult(),
			).getResult(),
			quantity: QuantityAvailableValueObject.create(3).getResult(),
		}).getResult();

		//

		const order = Order.create({
			costOfFreight: monetary, // 10,00
			basketPacks: [],
			clientId: UserId.create(),
			clientName: UserNameValueObject.create('valid_name').getResult(),
			customBaskets: [customBasket, customBasket], // 20,00 + 20,00
			isTheOrderForCollection: true,
			deliveryOrCollectionAddress: DeliveryOrCollectionAddress.create({
				complement:
					AddressComplementValueObject.create('valid_street').getResult(),
				number: AddressNumberValueObject.create('77b').getResult(),
				regionId: RegionId.create(),
				street: StreetNameValueObject.create('valid_street').getResult(),
				zipCode,
			}).getResult(),
			ecoBagFee: MonetaryValueObject.create(Currency.create(0).getResult()).getResult(), // 00,00 not included
			includesEcobag: false,
			orderNumber: OrderIdValueObject.create().getResult(),
			separateProducts: [separateProduct, separateProduct], // 63,00 + 63,00
			status: OrderStatusValueObject.create('COMPLETED').getResult(),
			subTotalCustomBaskets: MonetaryValueObject.create(Currency.create(40).getResult()).getResult(),
			subTotalSeparateProducts: MonetaryValueObject.create(Currency.create(126).getResult()).getResult(),
		});

		// total = 176,00

		expect(order.getResult().includesEcobag).toBe(false);
		expect(order.getResult().ecobagFee.value).toBe(0);
		expect(order.getResult().costOfFreight.value).toBe(10);
		expect(order.getResult().amount.value).toBe(176);
	});
});
