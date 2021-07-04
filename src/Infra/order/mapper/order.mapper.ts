import { DomainId, IMapper, UniqueEntityID } from 'types-ddd';
import { Order as Aggregate, UserId } from '@domain/aggregates-root';
import { Order as Schema } from '../entities/order.schema';
import { Inject, Injectable } from '@nestjs/common';
import { OrderAddressMapper } from './order-address.mapper';
import { Currency, MonetaryValueObject } from '@domain/value-objects';
import { OrderStatusValueObject } from '@domain/value-objects';
import { OrderIdValueObject } from '@domain/value-objects';
import { UserNameValueObject } from '@domain/value-objects';

@Injectable()
export class OrderMapper implements IMapper<Aggregate, Schema> {
	constructor (
		@Inject(OrderAddressMapper)
		private readonly orderAddressMapper: OrderAddressMapper,
	) { }
	toDomain (target: Schema): Aggregate {
		return Aggregate.create(
			{
				customBaskets: target.customBaskets.map((id) => DomainId.create(id)),
				basketPacks: target.basketPacks.map((id) => DomainId.create(id)),
				separateProducts: target.separateProducts.map((id) => DomainId.create(id)),
				clientId: UserId.create(new UniqueEntityID(target.clientId)),
				clientName: UserNameValueObject.create(target.clientName).getResult(),
				costOfFreight: MonetaryValueObject.create(
					Currency.create(target.costOfFreight.value).getResult(),
				).getResult(),
				deliveryOrCollectionAddress: this.orderAddressMapper.toDomain(
					target.deliveryOrCollectionAddress,
				),
				ecoBagFee: MonetaryValueObject.create(
					Currency.create(target.ecobagFee.value).getResult(),
				).getResult(),
				includesEcobag: target.includesEcobag,
				isTheOrderForCollection: target.isTheOrderForCollection,
				orderNumber: OrderIdValueObject.create(target.status).getResult(),
				status: OrderStatusValueObject.create(target.status).getResult(),
				subTotalCustomBaskets: MonetaryValueObject.create(Currency.create(target.subTotalCustomBaskets.value).getResult()).getResult(),
				subTotalSeparateProducts: MonetaryValueObject.create(Currency.create(target.subTotalSeparateProducts.value).getResult()).getResult(),
				subtotalBasketPacks: MonetaryValueObject.create(Currency.create(target.subtotalBasketPacks.value).getResult()).getResult(),
			},
			new UniqueEntityID(target.id),
		).getResult();
	}

	toPersistence (target: Aggregate): Schema {
		return {
			id: target.id.toString(),
			costOfFreight: {
				locale: target.costOfFreight.currency.locale,
				symbol: target.costOfFreight.currency.symbol,
				value: target.costOfFreight.currency.value
			},
			amount: {
				locale: target.amount.currency.locale,
				symbol: target.amount.currency.symbol,
				value: target.amount.currency.value
			},
			basketPacks: target.basketPacks.map(({ id }) => id.toString()),
			separateProducts: target.separateProducts.map(({ id }) => id.toString()),
			customBaskets: target.customBaskets.map(({ id }) => id.toString()),
			clientId: target.clientId.id.toString(),
			clientName: target.clientName.value,
			deliveryOrCollectionAddress: this.orderAddressMapper.toPersistence(
				target.deliveryOrCollectionAddress,
			),
			ecobagFee: {
				locale: target.ecobagFee.currency.locale,
				symbol: target.ecobagFee.currency.symbol,
				value: target.ecobagFee.currency.value
			},
			includesEcobag: target.includesEcobag,
			isTheOrderForCollection: target.isTheOrderForCollection,
			orderNumber: target.orderNumber.value,
			status: target.status.value,
			updatedAt: target.updatedAt,
			createdAt: target.createdAt,
			subTotalCustomBaskets: {
				locale: target.subTotalCustomBaskets.currency.locale,
				symbol: target.subTotalCustomBaskets.currency.symbol,
				value: target.subTotalCustomBaskets.currency.value
			},
			subTotalSeparateProducts: {
				locale: target.subTotalSeparateProducts.currency.locale,
				symbol: target.subTotalSeparateProducts.currency.symbol,
				value: target.subTotalSeparateProducts.currency.value
			},
			subtotalBasketPacks: {
				locale: target.subtotalBasketPacks.currency.locale,
				symbol: target.subtotalBasketPacks.currency.symbol,
				value: target.subtotalBasketPacks.currency.value
			}
		};
	}
}
