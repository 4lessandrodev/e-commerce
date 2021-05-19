import { Inject, Injectable } from '@nestjs/common';
import { DomainEvents, IHandle } from 'types-ddd';
import { BasketItemDomainEvent } from './basket-item.domain-event';
import { ResetBasketItemStockUseCase } from '@app/reset-basket-item-stock-use-case/reset-basket-item-stock.use-case';

@Injectable()
export class AfterProductStockResected
  implements IHandle<BasketItemDomainEvent>
{
  //
  constructor(
    @Inject(ResetBasketItemStockUseCase)
    private readonly resetBasketItemStockUseCase: ResetBasketItemStockUseCase,
  ) {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      (event) => this.dispatch(Object.assign(event)),
      BasketItemDomainEvent.name,
    );
  }
  async dispatch(event: BasketItemDomainEvent): Promise<void> {
    //
    await this.resetBasketItemStockUseCase.execute({
      productsIds: event.productIds,
    });
  }
}
