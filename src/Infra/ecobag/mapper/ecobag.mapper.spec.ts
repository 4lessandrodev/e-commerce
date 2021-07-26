import { Ecobag as Aggregate } from '@domain/entities';
import { Currency, MonetaryValueObject } from '@domain/value-objects';
import { Ecobag as Schema } from '../entities/ecobag.schema';
import { EcobagMapper } from './ecobag.mapper';

describe('ecobag.mapper', () => {
	const currentDate = new Date();

	const domain: Aggregate = Aggregate.create(
		MonetaryValueObject.create(Currency.create(10).getResult()).getResult()
	).getResult();

	const schema: Schema = {
		id: '4520abad-cee3-453e-9740-3db0dc457ffd', // always the same id
		price: 10,
		updatedAt: currentDate
	};

	it('should be defined', () => {
		const mapper = new EcobagMapper();
		expect(mapper).toBeDefined();
	});

	it('should convert from domain to persistence', () => {
		const mapper = new EcobagMapper();
		const result = mapper.toPersistence(domain);
		expect(result.price).toBe(schema.price);
		expect(result.id).toBe(schema.id);
	});

	it('should convert from persistence to domain', () => {
		const mapper = new EcobagMapper();
		const result = mapper.toDomain(schema);
		expect(result.price.value).toBe(domain.price.value);
		expect(result.id.toString()).toBe(domain.id.toString());
	});
});
