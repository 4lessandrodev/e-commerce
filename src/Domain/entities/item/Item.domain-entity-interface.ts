import { BaseDomainEntity, UniqueEntityID } from '../../../Shared';
import { MonetaryValueObject } from '../../value-objects';

export interface ItemProps<T> extends BaseDomainEntity {
  orderId: UniqueEntityID;
  item: T;
  quantity: number;
  total: MonetaryValueObject;
}
