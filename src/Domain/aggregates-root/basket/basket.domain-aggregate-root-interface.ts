import { BasketDescriptionValueObject } from '@domain/value-objects/basket-description/basket-description.value-object';
import { BaseDomainEntity } from 'types-ddd';
import { BasketInfoValueObject } from '@domain/value-objects/basket-info/basket-info.value-object';
import { BasketCategory, CommentId, Tag } from '@domain/entities';
import {
	ImageValueObject,
	MonetaryValueObject,
	BasketItemValueObject
} from '@domain/value-objects';

export interface BasketProps extends BaseDomainEntity {
	description: BasketDescriptionValueObject;
	category: BasketCategory;
	price: MonetaryValueObject;
	isActive: boolean;
	images?: ImageValueObject[];
	numberOfRatings?: number;
	ratingAverage?: number;
	items?: BasketItemValueObject[];
	comments?: CommentId[];
	info?: BasketInfoValueObject;
	tags?: Tag[];
}
