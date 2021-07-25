import { IMapper } from 'types-ddd';
import { Ecobag as Aggregate } from '@domain/entities';
import { Ecobag as Schema } from '../entities/ecobag.schema';
import { Currency, MonetaryValueObject } from '@domain/value-objects';

export class EcobagMapper implements IMapper<Aggregate, Schema> {
	toDomain(target: Schema): Aggregate {
		return Aggregate.create(
			MonetaryValueObject.create(
				Currency.create(target.price).getResult()
			).getResult()
		).getResult();
	}

	toPersistence(target: Aggregate): Schema {
		return {
			id: target.id.toString(),
			price: target.price.value,
			updatedAt: target.updatedAt
		};
	}
}
