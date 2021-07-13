import { OrderRepositoryInterface } from '@repo/order-repository.interface';
import { ClientRepositoryInterface } from '@repo/client-repository.interface';
import { EcobagRepositoryInterface } from '@repo/ecobag.repository.interface';
import { RegionRepositoryInterface } from '@repo/region-repository.interface';
import { OpenOrderUseCase } from './open-order.use-case';
import { Client, Region, RegionId } from '@domain/aggregates-root';
import {
	AddressComplementValueObject,
	AddressNumberValueObject,
	Currency,
	InitialStateValueObject,
	MonetaryValueObject,
	StreetNameValueObject,
	UserNameValueObject,
	ZipCodeValueObject,
} from '@domain/value-objects';
import { Address, City } from '@domain/entities';
import { UniqueEntityID } from 'types-ddd';

describe('open-order.use-case', () => {
	let orderRepo: OrderRepositoryInterface;
	let clientRepo: ClientRepositoryInterface;
	let regionRepo: RegionRepositoryInterface;
	let ecobagRepo: EcobagRepositoryInterface;

	beforeEach(() => {
		orderRepo = {
			delete: jest.fn(),
			exists: jest.fn(),
			find: jest.fn(),
			findOne: jest.fn(),
			save: jest.fn(),
			hasClientOpenedOrder: jest.fn(),
			getClientOpenedOrder: jest.fn(),
		};

		clientRepo = {
			delete: jest.fn(),
			exists: jest.fn(),
			find: jest.fn(),
			findOne: jest.fn(),
			save: jest.fn(),
		};
		regionRepo = {
			delete: jest.fn(),
			exists: jest.fn(),
			find: jest.fn(),
			findOne: jest.fn(),
			save: jest.fn(),
		};

		ecobagRepo = {
			definePrice: jest.fn(),
			getPrice: jest.fn(),
		};
	});

	// Mock client
	const client = Client.create({
		name: UserNameValueObject.create('valid_name').getResult(),
		addresses: [
			Address.create(
				{
					complement:
						AddressComplementValueObject.create('valid_complement').getResult(),
					isMainAddress: true,
					number: AddressNumberValueObject.create('77b').getResult(),
					regionId: RegionId.create(),
					street: StreetNameValueObject.create('valid_street_name').getResult(),
					zipCode: ZipCodeValueObject.create('75520140').getResult(),
				},
				new UniqueEntityID('valid_id'),
			).getResult(),
		],
		hasEcobag: false,
	}).getResult();

	// Mock region
	const region = Region.create(
		{
			city: City.create({
				geoCode: 808020,
				name: 'valid_city',
				stateInitial: InitialStateValueObject.create('RJ').getResult(),
			}).getResult(),
			description: 'valid_description',
			freightPrice: MonetaryValueObject.create(
				Currency.create(10).getResult(),
			).getResult(),
			isActive: true,
		},
		new UniqueEntityID('valid_id'),
	).getResult();

	// Mock ecobag price
	const ecobagPrice = MonetaryValueObject.create(
		Currency.create(6).getResult(),
	).getResult();

	it('should be defined', () => {
		const useCase = new OpenOrderUseCase(
			orderRepo,
			clientRepo,
			regionRepo,
			ecobagRepo,
		);
		expect(useCase).toBeDefined();
	});

	it('should open a new order', async () => {
		jest.spyOn(clientRepo, 'findOne').mockResolvedValueOnce(client);
		jest.spyOn(orderRepo, 'hasClientOpenedOrder').mockResolvedValueOnce(false);
		jest.spyOn(ecobagRepo, 'getPrice').mockResolvedValueOnce(ecobagPrice);
		jest.spyOn(regionRepo, 'findOne').mockResolvedValueOnce(region);

		const useCase = new OpenOrderUseCase(
			orderRepo,
			clientRepo,
			regionRepo,
			ecobagRepo,
		);

		const result = await useCase.execute({ userId: 'valid_id' });
		expect(result.isSuccess).toBe(true);
	});

	it('should fail if client does not exists', async () => {
		jest.spyOn(clientRepo, 'findOne').mockResolvedValueOnce(null);
		jest.spyOn(orderRepo, 'hasClientOpenedOrder').mockResolvedValueOnce(false);
		jest.spyOn(ecobagRepo, 'getPrice').mockResolvedValueOnce(ecobagPrice);
		jest.spyOn(regionRepo, 'findOne').mockResolvedValueOnce(region);

		const useCase = new OpenOrderUseCase(
			orderRepo,
			clientRepo,
			regionRepo,
			ecobagRepo,
		);

		const result = await useCase.execute({ userId: 'valid_id' });
		expect(result.isFailure).toBe(true);
	});

	it('should fail if client has an opened order', async () => {
		jest.spyOn(clientRepo, 'findOne').mockResolvedValueOnce(client);
		jest.spyOn(orderRepo, 'hasClientOpenedOrder').mockResolvedValueOnce(true);
		jest.spyOn(ecobagRepo, 'getPrice').mockResolvedValueOnce(ecobagPrice);
		jest.spyOn(regionRepo, 'findOne').mockResolvedValueOnce(region);

		const useCase = new OpenOrderUseCase(
			orderRepo,
			clientRepo,
			regionRepo,
			ecobagRepo,
		);

		const result = await useCase.execute({ userId: 'valid_id' });
		expect(result.isFailure).toBe(true);
	});

	it('should fail if client region is not active', async () => {
		region.deactivate();
		jest.spyOn(clientRepo, 'findOne').mockResolvedValueOnce(client);
		jest.spyOn(orderRepo, 'hasClientOpenedOrder').mockResolvedValueOnce(false);
		jest.spyOn(ecobagRepo, 'getPrice').mockResolvedValueOnce(ecobagPrice);
		jest.spyOn(regionRepo, 'findOne').mockResolvedValueOnce(region);

		const useCase = new OpenOrderUseCase(
			orderRepo,
			clientRepo,
			regionRepo,
			ecobagRepo,
		);

		const result = await useCase.execute({ userId: 'valid_id' });
		expect(result.isFailure).toBe(true);
	});
});
