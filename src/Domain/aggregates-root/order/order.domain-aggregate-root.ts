import { AggregateRoot, Result, UniqueEntityID } from 'types-ddd';
import { SeparateProduct } from '@domain/entities';
import { MonetaryValueObject } from '@domain/value-objects';
import { UserNameValueObject } from '@domain/value-objects';
import { DeliveryOrCollectionAddress } from '@domain/entities';
import { OrderStatusValueObject } from '@domain/value-objects';
import { OrderIdValueObject } from '@domain/value-objects';
import { UserId } from '../user/UserId.domain-aggregate-root';
import { OrderProps } from './order.domain-aggregate.interface';

export class Order extends AggregateRoot<OrderProps> {
  private constructor(props: OrderProps) {
    super(props);
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
  get separateProducts(): SeparateProduct[] {
    return this.props.separateProducts;
  }
  get customBaskets(): any[] {
    return this.props.customBaskets;
  }
  get basketPacks(): any[] {
    return this.props.basketPacks;
  }
  get status(): OrderStatusValueObject {
    return this.props.status;
  }
  get CostOfFreight(): MonetaryValueObject {
    return this.props.CostOfFreight;
  }
  get includesEcobag(): boolean {
    return this.props.includesEcobag;
  }
  get ecobagFee(): MonetaryValueObject {
    return this.props.ecobagFee;
  }
  get amount(): MonetaryValueObject {
    /**
     * @todo calculate total
     */
    return this.props.amount;
  }

  public static create(props: OrderProps): Result<Order> {
    return Result.ok<Order>(new Order(props));
  }
}
