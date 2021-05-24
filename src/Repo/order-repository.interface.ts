import { IBaseRepository } from 'types-ddd';
import { Order } from '@domain/aggregates-root';
import { AvailableOrderStatusType } from '@domain/value-objects';

export interface clientHasOpenedOrderProps {
  clientId: string;
  status: AvailableOrderStatusType;
}

export interface OrderRepositoryInterface extends IBaseRepository<Order> {
  clientHasOpenedOrder: (props: clientHasOpenedOrderProps) => Promise<boolean>;
}
