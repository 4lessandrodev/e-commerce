import {
  IsBoolean,
  IsPositive,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';
import {
  MAX_REGION_DESCRIPTION_LENGTH,
  MIN_REGION_DESCRIPTION_LENGTH,
} from '@domain/aggregates-root';

export class RegisterRegionDto {
  @IsString()
  @Length(MIN_REGION_DESCRIPTION_LENGTH, MAX_REGION_DESCRIPTION_LENGTH)
  description!: string;

  @IsPositive()
  freightPrice!: number;

  @IsBoolean()
  isActive!: boolean;

  @IsUUID()
  cityId!: string;
}
