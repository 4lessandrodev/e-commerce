import { CustomBasketDomainService } from '@domain/services/custom-basket.domain-service';
import { BasketRepositoryInterface } from '@repo/basket-repository.interface';
import { OrderRepositoryInterface } from '@repo/order-repository.interface';
import { ProductRepositoryInterface } from '@repo/product-repository.interface';
import {
	Basket,
	BasketId,
	Client,
	CustomBasket,
	Order,
	Product,
	ProductId,
	Region,
	RegionId,
	UserId,
} from '@domain/aggregates-root';
import { OpenOrderUseCase } from '../open-order-use-case/open-order.use-case';
import { AddItemToCustomBasketUseCase } from './add-item-to-custom-basket.use-case';
import {
	AddressComplementValueObject,
	AddressNumberValueObject,
	BasketDescriptionValueObject,
	BasketItemValueObject,
	ChangesLimitValueObject,
	Currency,
	ExchangeFactorValueObject,
	ImageValueObject,
	InitialStateValueObject,
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
	Address,
	BasketCategory,
	City,
	DeliveryOrCollectionAddress,
	ProductCategory,
} from '@domain/entities';
import { ClientRepositoryInterface } from '@repo/client-repository.interface';
import { EcobagRepositoryInterface } from '@repo/ecobag.repository.interface';
import { RegionRepositoryInterface } from '@repo/region-repository.interface';
import { UniqueEntityID } from 'types-ddd/dist/src';
import { CustomBasketRepositoryInterface } from '../../Repo/custom-basket-repository.interface';
import { OrderDomainServiceInterface } from '../../Domain/services/interfaces/order.domain-service.interface';
import { OrderDomainService } from '../../Domain/services/order.domain-service';

describe('add-item-to-custom-basket-item', () => {
	// MOck zip code
	const zipCode = ZipCodeValueObject.create('75520140').getResult();

	// Mock items
	let item: BasketItemValueObject;

	// Mock custom basket
	let customBasket: CustomBasket;

	// Mock order
	let order: Order;
	//

	// Mock product
	let product: Product;

	// Mock client
	let client: Client;

	// Mock region
	let region: Region;

	// Mock basket
	let basket: Basket;

	let orderRepo: OrderRepositoryInterface;

	let productRepo: ProductRepositoryInterface;

	let basketRepo: BasketRepositoryInterface;

	let useCase: AddItemToCustomBasketUseCase;

	let clientRepo: ClientRepositoryInterface;

	let ecobagRepo: EcobagRepositoryInterface;

	let regionRepo: RegionRepositoryInterface;

	let customBasketRepo: CustomBasketRepositoryInterface;

	const orderDomainService: OrderDomainServiceInterface =
		new OrderDomainService(new CustomBasketDomainService());

	let openOrderUseCase: OpenOrderUseCase;

	beforeEach(() => {
		// Mock item on each interaction
		item = BasketItemValueObject.create({
			availableStock: QuantityAvailableValueObject.create(10).getResult(),
			description:
				ProductDescriptionValueObject.create('valid_description').getResult(),
			exchangeFactor: ExchangeFactorValueObject.create(1).getResult(),
			productId: ProductId.create(new UniqueEntityID('valid_id')),
			quantity: QuantityAvailableValueObject.create(1).getResult(),
			unitOfMeasurement: UnitOfMeasurementValueObject.create('KG').getResult(),
		}).getResult();

		// Mock custom basket on each interaction
		customBasket = CustomBasket.create(
			{
				basketId: BasketId.create(new UniqueEntityID('valid_basket_id')),
				category: BasketCategory.create({
					description: 'valid_description',
					changesLimit: ChangesLimitValueObject.create(10).getResult(),
				}).getResult(),
				currentItems: [item],
				description:
					BasketDescriptionValueObject.create('valid_description').getResult(),
				isDraft: true,
				itemsAdded: [],
				itemsRemoved: [item],
				price: MonetaryValueObject.create(
					Currency.create(10).getResult(),
				).getResult(),
				quantity: QuantityAvailableValueObject.create(1).getResult(),
			},
			new UniqueEntityID('valid_basket_id'),
		).getResult();

		// Mock order on each interaction
		order = Order.create({
			basketPacks: [],
			clientId: UserId.create(),
			clientName: UserNameValueObject.create('valid_name').getResult(),
			costOfFreight: MonetaryValueObject.create(
				Currency.create(10).getResult(),
			).getResult(),
			customBaskets: [customBasket],
			deliveryOrCollectionAddress: DeliveryOrCollectionAddress.create({
				complement:
					AddressComplementValueObject.create('valid_street').getResult(),
				number: AddressNumberValueObject.create('77b').getResult(),
				regionId: RegionId.create(),
				street: StreetNameValueObject.create('valid_street').getResult(),
				zipCode,
			}).getResult(),
			ecoBagFee: MonetaryValueObject.create(
				Currency.create(10).getResult(),
			).getResult(),
			includesEcobag: false,
			isTheOrderForCollection: true,
			orderNumber: OrderIdValueObject.create().getResult(),
			separateProducts: [],
			status: OrderStatusValueObject.create('COMPLETED').getResult(),
		}).getResult();

		// Mock product for each interaction
		product = Product.create({
			description:
				ProductDescriptionValueObject.create('Maçã Brasileira').getResult(),
			quantityAvailable: QuantityAvailableValueObject.create(2).getResult(),
			exchangeFactor: ExchangeFactorValueObject.create(2).getResult(),
			category: ProductCategory.create({ description: 'Frutas' }).getResult(),
			unitOfMeasurement: UnitOfMeasurementValueObject.create('KG').getResult(),
			isActive: true,
			isSpecial: false,
			price: MonetaryValueObject.create(
				Currency.create(100).getResult(),
			).getResult(),
			image: ImageValueObject.create(
				'https://aws.com/fake-s3/image.jpeg',
			).getResult(),
		}).getResult();

		// Mock client for each interaction
		client = Client.create({
			addresses: [
				Address.create({
					complement:
						AddressComplementValueObject.create('valid_address').getResult(),
					isMainAddress: true,
					number: AddressNumberValueObject.create('42b').getResult(),
					regionId: RegionId.create(),
					street: StreetNameValueObject.create('valid_street').getResult(),
					zipCode,
				}).getResult(),
			],
			hasEcobag: false,
			name: UserNameValueObject.create('valid_name').getResult(),
		}).getResult();

		// Mock region for each interaction
		region = Region.create({
			city: City.create({
				geoCode: 5000,
				name: 'valid_city_name',
				stateInitial: InitialStateValueObject.create('SP').getResult(),
			}).getResult(),
			description: 'valid_description',
			freightPrice: MonetaryValueObject.create(
				Currency.create(100).getResult(),
			).getResult(),
			isActive: true,
		}).getResult();

		// Mock basket for each interaction

		basket = Basket.create(
			{
				category: BasketCategory.create({
					changesLimit: ChangesLimitValueObject.create(10).getResult(),
					description: 'valid_description',
				}).getResult(),
				description:
					BasketDescriptionValueObject.create('valid_description').getResult(),
				isActive: true,
				price: MonetaryValueObject.create(
					Currency.create(50).getResult(),
				).getResult(),
			},
			new UniqueEntityID('valid_basket_id'),
		).getResult();

		// Mock order repository
		orderRepo = {
			delete: jest.fn(),
			exists: jest.fn(),
			find: jest.fn(),
			findOne: jest.fn(),
			getClientOpenedOrder: jest.fn(),
			hasClientOpenedOrder: jest.fn(),
			save: jest.fn(),
		};

		// Mock product repository
		productRepo = {
			deactivateManyProducts: jest.fn(),
			delete: jest.fn(),
			exists: jest.fn(),
			find: jest.fn(),
			findAllProductsOrFilteredByIds: jest.fn(),
			findOne: jest.fn(),
			findProductsByIds: jest.fn(),
			resetStock: jest.fn(),
			save: jest.fn(),
		};

		// Mock basket repository
		basketRepo = {
			deactivateManyBaskets: jest.fn(),
			delete: jest.fn(),
			exists: jest.fn(),
			find: jest.fn(),
			findOne: jest.fn(),
			resetStockOnBasketItems: jest.fn(),
			save: jest.fn(),
			updateAllBasketItemByProductId: jest.fn(),
		};

		// mock client repository
		clientRepo = {
			delete: jest.fn(),
			exists: jest.fn(),
			find: jest.fn(),
			findOne: jest.fn(),
			save: jest.fn(),
		};

		// Mock ecobag repository
		ecobagRepo = {
			definePrice: jest.fn(),
			getPrice: jest.fn(),
		};

		// Mock region repository
		regionRepo = {
			delete: jest.fn(),
			exists: jest.fn(),
			find: jest.fn(),
			findOne: jest.fn(),
			save: jest.fn(),
		};

		// Mock order use case
		openOrderUseCase = new OpenOrderUseCase(
			orderRepo,
			clientRepo,
			regionRepo,
			ecobagRepo,
		);

		// Mock customBasketRepo
		customBasketRepo = {
			delete: jest.fn(),
			exists: jest.fn(),
			find: jest.fn(),
			findOne: jest.fn(),
			save: jest.fn(),
			getCustomBasketFromOrder: jest.fn()
		};

		useCase = new AddItemToCustomBasketUseCase(
			orderRepo, productRepo, basketRepo,
			orderDomainService, openOrderUseCase, customBasketRepo
		);
	});

	it('should be defined', () => {
		expect(useCase).toBeDefined();
	});

	it('should fail if product does not exists', async () => {
		jest.spyOn(orderRepo, 'getClientOpenedOrder').mockResolvedValueOnce(order);

		const result = await useCase.execute({
			basketId: 'valid_basket_id',
			clientId: 'valid_client_id',
			productId: 'valid_product_id',
			quantityOfItemToAdd: 10,
		});

		expect(result.isFailure).toBe(true);
	});

	it('should fail if client does not exists', async () => {
		jest.spyOn(productRepo, 'findOne').mockResolvedValueOnce(product);

		const result = await useCase.execute({
			basketId: 'valid_basket_id',
			clientId: 'valid_client_id',
			productId: 'valid_product_id',
			quantityOfItemToAdd: 10,
		});

		expect(result.isFailure).toBe(true);
	});

	it('should fail if Client region is not available for delivery', async () => {
		jest.spyOn(productRepo, 'findOne').mockResolvedValueOnce(product);
		jest.spyOn(clientRepo, 'findOne').mockResolvedValueOnce(client);

		const result = await useCase.execute({
			basketId: 'valid_basket_id',
			clientId: 'valid_client_id',
			productId: 'valid_product_id',
			quantityOfItemToAdd: 10,
		});

		expect(result.isFailure).toBe(true);
	});

	it('should fail if not possible to open an order to client', async () => {
		jest.spyOn(productRepo, 'findOne').mockResolvedValueOnce(product);
		jest.spyOn(clientRepo, 'findOne').mockResolvedValueOnce(client);
		jest.spyOn(regionRepo, 'findOne').mockResolvedValueOnce(region);

		const result = await useCase.execute({
			basketId: 'valid_basket_id',
			clientId: 'valid_client_id',
			productId: 'valid_product_id',
			quantityOfItemToAdd: 10,
		});

		expect(result.isFailure).toBe(true);
	});

	it('should fail if basket does not exists', async () => {
		// Remove basket from order
		order.customBaskets.pop();

		jest.spyOn(productRepo, 'findOne').mockResolvedValueOnce(product);
		jest.spyOn(clientRepo, 'findOne').mockResolvedValueOnce(client);
		jest.spyOn(regionRepo, 'findOne').mockResolvedValueOnce(region);
		jest.spyOn(orderRepo, 'getClientOpenedOrder').mockResolvedValueOnce(order);
		jest.spyOn(basketRepo, 'findOne').mockResolvedValueOnce(null);

		const result = await useCase.execute({
			basketId: 'valid_basket_id',
			clientId: 'valid_client_id',
			productId: 'valid_product_id',
			quantityOfItemToAdd: 10,
		});

		expect(result.isFailure).toBe(true);
	});

	it('should fail if reached changes limit or exchange factor', async () => {
		// Add item to basket before test
		customBasket.itemsAdded.push(item);

		jest.spyOn(productRepo, 'findOne').mockResolvedValueOnce(product);
		jest.spyOn(clientRepo, 'findOne').mockResolvedValueOnce(client);
		jest.spyOn(regionRepo, 'findOne').mockResolvedValueOnce(region);
		jest.spyOn(orderRepo, 'getClientOpenedOrder').mockResolvedValueOnce(order);
		jest.spyOn(basketRepo, 'findOne').mockResolvedValueOnce(basket);

		const result = await useCase.execute({
			basketId: 'valid_basket_id',
			clientId: 'valid_client_id',
			productId: 'valid_product_id',
			quantityOfItemToAdd: 10,
		});

		expect(result.isFailure).toBe(true);
	});

	it('should fail if provide an invalid quantity', async () => {
		jest.spyOn(productRepo, 'findOne').mockResolvedValueOnce(product);
		jest.spyOn(clientRepo, 'findOne').mockResolvedValueOnce(client);
		jest.spyOn(regionRepo, 'findOne').mockResolvedValueOnce(region);
		jest.spyOn(orderRepo, 'getClientOpenedOrder').mockResolvedValueOnce(order);
		jest.spyOn(basketRepo, 'findOne').mockResolvedValueOnce(basket);

		const result = await useCase.execute({
			basketId: 'valid_basket_id',
			clientId: 'valid_client_id',
			productId: 'valid_product_id',
			quantityOfItemToAdd: 1001,
		});

		expect(result.isFailure).toBe(true);
	});

	it('should add item on basket with success', async () => {
		jest.spyOn(productRepo, 'findOne').mockResolvedValueOnce(product);
		jest.spyOn(clientRepo, 'findOne').mockResolvedValueOnce(client);
		jest.spyOn(regionRepo, 'findOne').mockResolvedValueOnce(region);
		jest.spyOn(orderRepo, 'getClientOpenedOrder').mockResolvedValueOnce(order);
		jest.spyOn(basketRepo, 'findOne').mockResolvedValueOnce(basket);
		jest.spyOn(customBasketRepo, 'getCustomBasketFromOrder').mockImplementationOnce(async () => customBasket);
		const result = await useCase.execute({
			basketId: 'valid_basket_id',
			clientId: 'valid_client_id',
			productId: 'valid_product_id',
			quantityOfItemToAdd: 1,
		});

		expect(result.isSuccess).toBe(true);
	});
});
