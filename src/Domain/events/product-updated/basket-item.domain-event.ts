import { IDomainEvent, UniqueEntityID } from 'types-ddd';
import { Product } from '@domain/aggregates-root';

export class BasketItemDomainEvent implements IDomainEvent {
  public dateTimeOccurred: Date;
  public productIds: string[] | undefined;
  public product: Product;

  constructor(product: Product, productIds?: string[]) {
    this.dateTimeOccurred = new Date();
    this.productIds = productIds;
    this.product = product;
  }
  getAggregateId(): UniqueEntityID {
    console.log(this.product.id);
    return this.product.id;
  }
}
