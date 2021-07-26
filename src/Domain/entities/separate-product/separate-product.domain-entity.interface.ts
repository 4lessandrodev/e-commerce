import {
	ImageValueObject,
	UnitTypes,
	MonetaryValueObject,
	ProductDescriptionValueObject,
	QuantityAvailableValueObject
} from '@domain/value-objects';

import { ProductCategory } from '@domain/entities';
import { BaseDomainEntity } from 'types-ddd';

export interface ProductProps extends BaseDomainEntity {
	description: ProductDescriptionValueObject;
	image?: ImageValueObject;
	unitOfMeasurement: UnitTypes;
	category: ProductCategory;
	isSpecial: boolean;
	price: MonetaryValueObject;
	quantity: QuantityAvailableValueObject;
}
