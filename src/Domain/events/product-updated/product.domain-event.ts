import { IDomainEvent, UniqueEntityID } from 'types-ddd';
import { Product } from '@domain/aggregates-root';

export class ProductDomainEvent implements IDomainEvent {
	public dateTimeOccurred: Date;
	public product: Product;

	constructor(product: Product) {
		this.dateTimeOccurred = new Date();
		this.product = product;
	}

	getAggregateId(): UniqueEntityID {
		return this.product.id;
	}
}
