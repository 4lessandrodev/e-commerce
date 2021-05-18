import { Inject, Injectable } from '@nestjs/common';
import { DomainEvents, IHandle } from 'types-ddd';
import { UpdateBasketItemUseCase } from '@app/update-basket-items-use-case/update-basket-items.use-case';
import { ProductDomainEvent } from './product.domain-event';
import { UpdateBasketItemsDto } from '@app/update-basket-items-use-case/update-basket-items.dto';

@Injectable()
export class AfterProductUpdated implements IHandle<ProductDomainEvent> {
  //
  constructor(
    @Inject(UpdateBasketItemUseCase)
    private readonly updateBasketItemUseCase: UpdateBasketItemUseCase,
  ) {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      (event) => this.dispatch(Object.assign(event)),
      ProductDomainEvent.name,
    );
  }
  async dispatch(event: ProductDomainEvent): Promise<void> {
    //
    const item: UpdateBasketItemsDto = {
      productId: event.product.id.toString(),
      exchangeFactor: event.product.exchangeFactor.value,
      description: event.product.description.value,
      availableStock: event.product.quantityAvailable.value,
    };

    await this.updateBasketItemUseCase.execute(item);
  }
}
