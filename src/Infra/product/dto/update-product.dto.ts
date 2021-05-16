import {
  Units,
  UnitTypes,
} from '@domain/value-objects/unit-of-measurement/unit-of-measurement.value-objects';
import {
  IsBoolean,
  IsEnum,
  IsPositive,
  IsString,
  IsUUID,
  Length,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import {
  MAX_EXCHANGE_FACTOR_VALUE,
  MAX_PRODUCT_DESCRIPTION_LENGTH,
  MAX_PRODUCT_INFO_LENGTH,
  MIN_EXCHANGE_FACTOR_VALUE,
  MIN_PRODUCT_DESCRIPTION_LENGTH,
} from '@domain/value-objects';

export class UpdateProductDto {
  productId!: string;

  @IsString()
  @Length(MIN_PRODUCT_DESCRIPTION_LENGTH, MAX_PRODUCT_DESCRIPTION_LENGTH)
  description!: string;

  @IsPositive()
  @Min(MIN_EXCHANGE_FACTOR_VALUE)
  @Max(MAX_EXCHANGE_FACTOR_VALUE)
  exchangeFactor!: number;

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

  @IsString()
  @MaxLength(MAX_PRODUCT_INFO_LENGTH)
  info?: string;
}

export class ProductIdDto {
  @IsUUID()
  id!: string;
}
