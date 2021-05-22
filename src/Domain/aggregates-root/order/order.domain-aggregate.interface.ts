import { MonetaryValueObject } from '@domain/value-objects';
import { UserId } from '@domain/aggregates-root';
import { OrderStatusValueObject } from '@domain/value-objects';
import { DeliveryOrCollectionAddressValueObject } from '@domain/value-objects';
import { OrderIdValueObject } from '@domain/value-objects';
import { UserNameValueObject } from '@domain/value-objects';
import { SeparateProduct } from '@domain/entities';

export interface OrderProps {
  orderNumber: OrderIdValueObject;
  clientName: UserNameValueObject;
  clientId: UserId;
  isTheOrderForCollection: boolean;
  deliveryOrCollectionAddress: DeliveryOrCollectionAddressValueObject;
  separateProducts: SeparateProduct[];
  customBaskets: any[]; // Create Entity
  basketPacks: any[]; // Create Entity
  status: OrderStatusValueObject;
  CostOfFreight: MonetaryValueObject;
  includesEcobag: boolean;
  ecobagFee: MonetaryValueObject;
  amount: MonetaryValueObject;
}
