import {
  MonetaryValueObject,
  UserNameValueObject,
} from '@domain/value-objects';
import { UserId } from '@domain/aggregates-root';
import { OrderStatusValueObject } from '@domain/value-objects';
import { DeliveryAddressValueObject } from '@domain/value-objects';

export interface OrderProps {
  orderNumber: number;
  clientName: UserNameValueObject;
  clientId: UserId;
  deliveryAddress: DeliveryAddressValueObject;
  separateProducts: any[]; // Create Entity
  customBaskets: any[]; // Create Entity
  basketPacks: any[]; // Create Entity
  status: OrderStatusValueObject;
  CostOfFreight: MonetaryValueObject;
  includesEcobag: boolean;
  ecobagFee: MonetaryValueObject;
  amount: MonetaryValueObject;
}
