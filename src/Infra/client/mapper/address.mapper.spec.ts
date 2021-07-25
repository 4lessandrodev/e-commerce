import { UniqueEntityID } from 'types-ddd';
import { RegionId } from '@domain/aggregates-root';
import { Address } from '@domain/entities';
import {
	AddressComplementValueObject,
	AddressNumberValueObject,
	StreetNameValueObject,
	ZipCodeValueObject
} from '@domain/value-objects';
import { AddressMapper } from './address.mapper';
import { Address as Schema } from '../entities/address.schema';
import { Region } from '@infra/region/entities/region.schema';

describe('address.mapper', () => {
	//
	const currentDate = new Date();
	let schema: Schema;
	let domain: Address;
	//
	beforeAll(() => {
		//
		const region = new Region();
		region.id = 'valid_region';
		//
		schema = {
			complement: 'valid_complement',
			createdAt: currentDate,
			id: 'valid_id',
			isMainAddress: true,
			number: '777',
			region,
			street: 'valid_street',
			updatedAt: currentDate,
			zipCode: '75520140'
		};
		//
		domain = Address.create(
			{
				complement:
					AddressComplementValueObject.create(
						'valid_complement'
					).getResult(),
				isMainAddress: true,
				number: AddressNumberValueObject.create('777').getResult(),
				regionId: RegionId.create(new UniqueEntityID('valid_region')),
				street: StreetNameValueObject.create(
					'valid_street'
				).getResult(),
				zipCode: ZipCodeValueObject.create('75520140').getResult(),
				createdAt: currentDate,
				updatedAt: currentDate
			},
			new UniqueEntityID('valid_id')
		).getResult();
		//
	});

	it('should be defined', () => {
		const mapper = new AddressMapper();

		expect(mapper).toBeDefined();
	});

	it('should convert from persistence to domain', () => {
		const mapper = new AddressMapper();
		const result = mapper.toDomain(schema);
		const isEqual = result.equals(domain);

		expect(isEqual).toBe(true);
	});

	it('should convert from domain to persistence', () => {
		const mapper = new AddressMapper();
		const result = mapper.toPersistence(domain);

		expect(result).toEqual(schema);
	});
});
