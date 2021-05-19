import { IBaseRepository } from 'types-ddd';
import { Basket } from '@domain/aggregates-root';

export interface BasketRepositoryInterface extends IBaseRepository<Basket> {
  deactivateManyBaskets: (ids?: string[]) => Promise<void>;
  updateAllBasketItemByProductId: (item: any) => Promise<void>;
  resetStockOnBasketItems: (productIds?: string[]) => Promise<void>;
}
