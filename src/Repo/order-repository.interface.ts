import { IBaseRepository } from 'types-ddd';
import { Order } from '@domain/aggregates-root';
import { AvailableOrderStatusType } from '@domain/value-objects';

export interface hasClientOpenedOrderProps {
	clientId: string;
	status: AvailableOrderStatusType;
}

export interface OrderRepositoryInterface extends IBaseRepository<Order> {
	hasClientOpenedOrder: (props: hasClientOpenedOrderProps) => Promise<boolean>;
	getClientOpenedOrder: (
		props: hasClientOpenedOrderProps,
	) => Promise<Order | null>;
}
