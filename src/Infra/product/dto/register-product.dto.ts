import { File } from '@shared/services/upload-files/interfaces/uploader.interface';
import {
  Units,
  UnitTypes,
} from '@domain/value-objects/unit-of-measurement/unit-of-measurement.value-objects';
import {
  IsBoolean,
  IsEnum,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  Length,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import {
  MAX_PRODUCT_DESCRIPTION_LENGTH,
  MAX_PRODUCT_INFO_LENGTH,
  MIN_PRODUCT_DESCRIPTION_LENGTH,
} from '@domain/aggregates-root';
import {
  MAX_EXCHANGE_FACTOR,
  MIN_EXCHANGE_FACTOR,
} from '@domain/value-objects';

export class RegisterProductDto {
  @IsString()
  @Length(MIN_PRODUCT_DESCRIPTION_LENGTH, MAX_PRODUCT_DESCRIPTION_LENGTH)
  description!: string;

  @IsPositive()
  @Min(MIN_EXCHANGE_FACTOR)
  @Max(MAX_EXCHANGE_FACTOR)
  exchangeFactor!: number;

  @IsUUID()
  categoryId!: string;

  @IsEnum(Units)
  unitOfMeasurement!: UnitTypes;

  @IsBoolean()
  isSpecial!: boolean;

  @IsPositive()
  price!: number;

  @IsBoolean()
  isActive!: boolean;

  @IsPositive()
  quantityAvailable!: number;

  image?: File;

  @IsString()
  @MaxLength(MAX_PRODUCT_INFO_LENGTH)
  info?: string;

  @IsOptional()
  @IsUUID('4', { each: true })
  tagsIds?: string[];
}
