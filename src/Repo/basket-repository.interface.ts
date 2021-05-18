import { IBaseRepository } from 'types-ddd';
import { Basket } from '@domain/aggregates-root';

export interface BasketRepositoryInterface extends IBaseRepository<Basket> {
  deactivateManyBaskets: (ids?: string[]) => Promise<void>;
  updateAllBasketItemByProductId: (items: any) => Promise<void>;
}
