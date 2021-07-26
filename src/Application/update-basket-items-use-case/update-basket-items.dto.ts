import { UnitTypes } from '@domain/value-objects';

export interface UpdateBasketItemsDto {
	productId: string;
	description: string;
	availableStock: number;
	exchangeFactor: number;
	unitOfMeasurement: UnitTypes;
	/**
	 * @link (basket.domain-service) and called on @link (AfterProductUpdated)
	 * @description this attribute is set on domain service
	 */
	image?: string;
}
