import { Injectable } from '@nestjs/common';
import { DomainEvents, IHandle } from 'types-ddd';
import { ProductDomainEvent } from './product.domain-event';

@Injectable()
export class AfterProductUpdated implements IHandle<ProductDomainEvent> {
  //
  constructor() {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      (event) => this.dispatch(Object.assign(event)),
      ProductDomainEvent.name,
    );
  }
  async dispatch(event: ProductDomainEvent): Promise<void> {
    console.log('CALLED EVENT');
    console.log(event.dateTimeOccurred);
    /**
     * @todo: call update baskets use case.
     * @description update all products on basket: product name and exchange factor
     */
  }
}
