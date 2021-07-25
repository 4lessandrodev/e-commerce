import { AggregateRoot, DomainId, Result, UniqueEntityID } from 'types-ddd';
import {
	Currency,
	MonetaryValueObject,
	UserNameValueObject,
	OrderStatusValueObject,
	OrderIdValueObject
} from '@domain/value-objects';

import { DeliveryOrCollectionAddress } from '@domain/entities';

import { UserId } from '../user/UserId.domain-aggregate-root';
import { OrderProps } from './order.domain-aggregate.interface';

export class Order extends AggregateRoot<OrderProps> {
	private constructor(props: OrderProps, id?: UniqueEntityID) {
		super(props, id);
	}

	get id(): UniqueEntityID {
		return this._id;
	}

	get orderNumber(): OrderIdValueObject {
		return this.props.orderNumber;
	}

	get clientName(): UserNameValueObject {
		return this.props.clientName;
	}

	get clientId(): UserId {
		return this.props.clientId;
	}

	get isTheOrderForCollection(): boolean {
		return this.props.isTheOrderForCollection;
	}

	get deliveryOrCollectionAddress(): DeliveryOrCollectionAddress {
		return this.props.deliveryOrCollectionAddress;
	}

	get separateProducts(): DomainId[] {
		return this.props.separateProducts ?? [];
	}

	get customBaskets(): DomainId[] {
		return this.props.customBaskets ?? [];
	}

	get basketPacks(): DomainId[] {
		return this.props.basketPacks ?? [];
	}

	get status(): OrderStatusValueObject {
		return this.props.status;
	}

	get costOfFreight(): MonetaryValueObject {
		return this.props.costOfFreight;
	}

	get includesEcobag(): boolean {
		return this.props.includesEcobag;
	}

	get ecobagFee(): MonetaryValueObject {
		if (this.includesEcobag) {
			return this.props.ecoBagFee;
		}
		return MonetaryValueObject.create(
			Currency.create(0).getResult()
		).getResult();
	}

	get subTotalSeparateProducts(): MonetaryValueObject {
		if (!this.props.subTotalSeparateProducts) {
			this.props.subTotalSeparateProducts = MonetaryValueObject.create(
				Currency.create(0).getResult()
			).getResult();
		}
		return this.props.subTotalSeparateProducts;
	}

	get subTotalCustomBaskets(): MonetaryValueObject {
		if (!this.props.subTotalCustomBaskets) {
			this.props.subTotalCustomBaskets = MonetaryValueObject.create(
				Currency.create(0).getResult()
			).getResult();
		}
		return this.props.subTotalCustomBaskets;
	}

	get subtotalBasketPacks(): MonetaryValueObject {
		if (!this.props.subtotalBasketPacks) {
			this.props.subtotalBasketPacks = MonetaryValueObject.create(
				Currency.create(0).getResult()
			).getResult();
		}
		return this.props.subtotalBasketPacks;
	}

	get amount(): MonetaryValueObject {
		const subtotal =
			this.subTotalCustomBaskets.value +
			this.subTotalSeparateProducts.value +
			this.subtotalBasketPacks.value +
			this.props.costOfFreight.value +
			this.props.ecoBagFee.value;
		const total = MonetaryValueObject.create(
			Currency.create(subtotal).getResult()
		).getResult();
		return total;
	}

	removeCustomBasket(customBasket: DomainId): void {
		this.props.customBaskets = this.props?.customBaskets?.filter(
			(cb) => !cb.id.equals(customBasket.id)
		);
	}

	addCustomBasket(customBasket: DomainId): void {
		this.customBaskets.push(customBasket);
	}

	/** Removes and readded item */
	updateCustomBasket(customBasket: DomainId): void {
		this.removeCustomBasket(customBasket);
		this.addCustomBasket(customBasket);
	}

	public static create(
		props: OrderProps,
		id?: UniqueEntityID
	): Result<Order> {
		return Result.ok<Order>(new Order(props, id));
	}
}
