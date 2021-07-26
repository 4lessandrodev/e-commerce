import {
	MonetaryValueObject,
	OrderStatusValueObject,
	OrderIdValueObject,
	UserNameValueObject
} from '@domain/value-objects';
import { UserId } from '@domain/aggregates-root';

import { DeliveryOrCollectionAddress } from '@domain/entities';

import { DomainId } from 'types-ddd';

export interface OrderProps {
	orderNumber: OrderIdValueObject;
	clientName: UserNameValueObject;
	clientId: UserId;
	isTheOrderForCollection: boolean;
	deliveryOrCollectionAddress: DeliveryOrCollectionAddress;
	separateProducts?: DomainId[];
	subTotalSeparateProducts?: MonetaryValueObject;
	customBaskets?: DomainId[];
	subTotalCustomBaskets?: MonetaryValueObject;
	basketPacks?: DomainId[];
	subtotalBasketPacks?: MonetaryValueObject;
	status: OrderStatusValueObject;
	costOfFreight: MonetaryValueObject;
	includesEcobag: boolean;
	ecoBagFee: MonetaryValueObject;
	amount?: MonetaryValueObject;
}
