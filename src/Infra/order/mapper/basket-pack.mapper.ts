import { IMapper } from 'types-ddd';
import {} from '@domain/aggregates-root';
import { BasketPack } from '../entities/order-basket-pack.schema';

export class BasketPackMapper implements IMapper<any, BasketPack> {
	toDomain(target: BasketPack): any {
		/** @todo refactor to add real basket pack */
		return target;
	}

	toPersistence(target: any): BasketPack {
		return target;
	}
}
