import { BaseDomainEntity } from 'types-ddd';
import { CommentId, ProductCategory, Tag } from '@domain/entities';
import {
	ImageValueObject,
	MonetaryValueObject,
	ProductInfoValueObject,
	ExchangeFactorValueObject,
	ProductDescriptionValueObject,
	UnitOfMeasurementValueObject,
	QuantityAvailableValueObject
} from '@domain/value-objects';

export interface ProductProps extends BaseDomainEntity {
	description: ProductDescriptionValueObject;
	category: ProductCategory;
	exchangeFactor: ExchangeFactorValueObject;
	unitOfMeasurement: UnitOfMeasurementValueObject;
	isSpecial: boolean;
	price: MonetaryValueObject;
	isActive: boolean;
	quantityAvailable: QuantityAvailableValueObject;
	image?: ImageValueObject;
	numberOfRatings?: number;
	ratingAverage?: number;
	commentIds?: CommentId[];
	info?: ProductInfoValueObject;
	tags?: Tag[];
}
