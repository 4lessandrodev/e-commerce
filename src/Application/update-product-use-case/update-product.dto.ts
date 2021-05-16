import { UnitTypes } from '@domain/value-objects';

export interface UpdateProductDto {
  description: string;
  exchangeFactor: number;
  unitOfMeasurement: UnitTypes;
  isSpecial: boolean;
  price: number;
  isActive: boolean;
  quantityAvailable: number;
  info?: string;
}
