import { UnitTypes } from '@domain/value-objects';

export interface UpdateBasketItemsDto {
  productId: string;
  description: string;
  availableStock: number;
  exchangeFactor: number;
  unitOfMeasurement: UnitTypes;
}
