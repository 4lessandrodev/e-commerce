import { File } from '@shared/services/upload-files/interfaces/uploader.interface';
import { UnitTypes } from '@domain/value-objects/unit-of-measurement/unit-of-measurement.value-objects';

export interface RegisterProductDto {
  description: string;
  exchangeFactor: number;
  categoryId: string;
  unitOfMeasurement: UnitTypes;
  isSpecial: boolean;
  price: number;
  isActive: boolean;
  quantityAvailable: number;
  image?: File;
  info?: string;
  tagsIds?: string[];
}
