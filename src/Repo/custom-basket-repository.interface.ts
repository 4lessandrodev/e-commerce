import { IBaseRepository } from 'types-ddd';
import { CustomBasket } from '@domain/aggregates-root';

export interface getCustomBasketFromOrderProps {
	orderId: string,
	basketId: string;
}
export interface CustomBasketRepositoryInterface extends IBaseRepository<CustomBasket> {
	getCustomBasketFromOrder: (props: getCustomBasketFromOrderProps) => Promise<CustomBasket | null>;
}