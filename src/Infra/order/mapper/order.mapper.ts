import { IMapper, UniqueEntityID } from 'types-ddd';
import { Order as Aggregate, UserId } from '@domain/aggregates-root';
import { Order as Schema } from '../entities/order.schema';
import { Inject, Injectable } from '@nestjs/common';
import { OrderAddressMapper } from './order-address.mapper';
import { Currency, MonetaryValueObject } from '@domain/value-objects';
import { OrderStatusValueObject } from '@domain/value-objects';
import { OrderIdValueObject } from '@domain/value-objects';
import { UserNameValueObject } from '@domain/value-objects';
import { CustomBasketMapper } from './custom-basket.mapper';
import { BasketPackMapper } from './basket-pack.mapper';
import { SeparateProductMapper } from './separate-product.mapper';

@Injectable()
export class OrderMapper implements IMapper<Aggregate, Schema> {
	constructor (
		@Inject(OrderAddressMapper)
		private readonly orderAddressMapper: OrderAddressMapper,

		@Inject(CustomBasketMapper)
		private readonly customBasketMapper: CustomBasketMapper,

		@Inject(BasketPackMapper)
		private readonly basketPackMapper: BasketPackMapper,

		@Inject(SeparateProductMapper)
		private readonly separateProductMapper: SeparateProductMapper,
	) { }
	toDomain (target: Schema): Aggregate {
		return Aggregate.create(
			{
				customBaskets: target.customBaskets.map(
					this.customBasketMapper.toDomain,
				),
				basketPacks: target.basketPacks.map(this.basketPackMapper.toDomain),
				separateProducts: target.separateProducts.map(
					this.separateProductMapper.toDomain,
				),
				clientId: UserId.create(new UniqueEntityID(target.clientId)),
				clientName: UserNameValueObject.create(target.clientName).getResult(),
				costOfFreight: MonetaryValueObject.create(
					Currency.create(target.CostOfFreight.value).getResult(),
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
			},
			new UniqueEntityID(target.id),
		).getResult();
	}

	toPersistence (target: Aggregate): Schema {
		return {
			id: target.id.toString(),
			CostOfFreight: target.costOfFreight.currency,
			amount: target.amount.currency,
			basketPacks: target.basketPacks.map(this.basketPackMapper.toPersistence),
			separateProducts: target.separateProducts.map(
				this.separateProductMapper.toPersistence,
			),
			customBaskets: target.customBaskets.map(
				this.customBasketMapper.toPersistence,
			),
			clientId: target.clientId.id.toString(),
			clientName: target.clientName.value,
			deliveryOrCollectionAddress: this.orderAddressMapper.toPersistence(
				target.deliveryOrCollectionAddress,
			),
			ecobagFee: target.ecobagFee.currency,
			includesEcobag: target.includesEcobag,
			isTheOrderForCollection: target.isTheOrderForCollection,
			orderNumber: target.orderNumber.value,
			status: target.status.value,
			updatedAt: target.updatedAt,
			createdAt: target.createdAt,
		};
	}
}
