import { UnitTypes } from '@domain/value-objects';

export interface UpdateProductDto {
  productId: string;
  description: string;
  exchangeFactor: number;
  unitOfMeasurement: UnitTypes;
  isSpecial: boolean;
  price: number;
  isActive: boolean;
  quantityAvailable: number;
  info?: string;
}
