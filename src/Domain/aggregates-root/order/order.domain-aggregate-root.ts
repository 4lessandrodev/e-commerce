import { AggregateRoot, Result, UniqueEntityID } from 'types-ddd';
import { CustomBasket, SeparateProduct } from '@domain/entities';
import { Currency, MonetaryValueObject } from '@domain/value-objects';
import { UserNameValueObject } from '@domain/value-objects';
import { DeliveryOrCollectionAddress } from '@domain/entities';
import { OrderStatusValueObject } from '@domain/value-objects';
import { OrderIdValueObject } from '@domain/value-objects';
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

  get separateProducts(): SeparateProduct[] {
    return this.props.separateProducts;
  }

  get customBaskets(): CustomBasket[] {
    return this.props.customBaskets;
  }

  get basketPacks(): any[] {
    return this.props.basketPacks;
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
      Currency.create(0).getResult(),
    ).getResult();
  }

  get amount(): MonetaryValueObject {
    const subtotalCustomBaskets = this.calculateSubTotalForCustomBaskets();
    const subtotalSeparateProducts =
      this.calculateSubTotalForSeparateProducts();
    const currency = Currency.create(0).getResult();

    currency.sum(subtotalSeparateProducts);
    currency.sum(subtotalCustomBaskets);
    currency.sum(this.ecobagFee.value);
    currency.sum(this.costOfFreight.value);

    const amount = MonetaryValueObject.create(currency).getResult();
    return amount;
  }

  private calculateSubTotalForSeparateProducts(): number {
    const subtotalForSeparateProducts = this.separateProducts.reduce(
      (total, product) => product.subTotal.value + total,
      0,
    );
    return subtotalForSeparateProducts;
  }

  private calculateSubTotalForCustomBaskets(): number {
    const subtotalForCustomBaskets = this.customBaskets.reduce(
      (total, basket) => basket.subTotal.value + total,
      0,
    );
    return subtotalForCustomBaskets;
  }

  public static create(props: OrderProps, id?: UniqueEntityID): Result<Order> {
    return Result.ok<Order>(new Order(props, id));
  }
}
