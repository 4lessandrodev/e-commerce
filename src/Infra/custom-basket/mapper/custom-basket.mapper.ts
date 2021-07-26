import { IMapper, UniqueEntityID } from 'types-ddd';
import { BasketCategory } from '@domain/entities';
import { CustomBasket as Aggregate, BasketId } from '@domain/aggregates-root';
import { CustomBasket } from '../entities/custom-basket.schema';
import { Inject, Injectable } from '@nestjs/common';
import { CustomBasketItemMapper } from './custom-basket-item.mapper';
import {
	Currency,
	ImageValueObject,
	BasketDescriptionValueObject,
	ChangesLimitValueObject,
	QuantityAvailableValueObject,
	MonetaryValueObject
} from '@domain/value-objects';

@Injectable()
export class CustomBasketMapper implements IMapper<Aggregate, CustomBasket> {
	constructor(
		@Inject(CustomBasketItemMapper)
		private readonly itemMapper: CustomBasketItemMapper
	) {}

	toDomain(target: CustomBasket): Aggregate {
		return Aggregate.create({
			basketId: BasketId.create(new UniqueEntityID(target.basketId)),
			category: BasketCategory.create({
				changesLimit: ChangesLimitValueObject.create(
					target.category.changesLimit
				).getResult(),
				description: target.category.description
			}).getResult(),
			description: BasketDescriptionValueObject.create(
				target.description
			).getResult(),
			isDraft: target.isDraft,
			itemsAdded: target.itemsAdded.map(this.itemMapper.toDomain),
			itemsRemoved: target.itemsRemoved.map(this.itemMapper.toDomain),
			currentItems: target.items.map(this.itemMapper.toDomain),
			price: MonetaryValueObject.create(
				Currency.create(target.price.value).getResult()
			).getResult(),
			quantity: QuantityAvailableValueObject.create(
				target.quantity
			).getResult(),
			image: target.image
				? ImageValueObject.create(target.image).getResult()
				: undefined
		}).getResult();
	}

	toPersistence(target: Aggregate): CustomBasket {
		return {
			basketId: target.basketId.id.toString(),
			category: {
				changesLimit: target.category.changesLimit.value,
				description: target.category.description
			},
			changesLimitAvailable: target.changesLimitAvailable,
			description: target.description.value,
			exchangesFactorAvailable: target.exchangesFactorAvailable,
			id: target.id.toString(),
			image: target.image?.value,
			isDraft: target.isDraft,
			items: target.currentItems.map(this.itemMapper.toPersistence),
			itemsAdded: target.itemsAdded.map(this.itemMapper.toPersistence),
			itemsRemoved: target.itemsRemoved.map(
				this.itemMapper.toPersistence
			),
			price: {
				locale: target.price.currency.locale,
				symbol: target.price.currency.symbol,
				value: target.price.currency.value
			},
			quantity: target.quantity.value
		};
	}
}
