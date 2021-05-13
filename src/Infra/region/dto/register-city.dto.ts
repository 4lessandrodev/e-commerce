import { IsEnum, IsPositive, IsString, Length, Max } from 'class-validator';
import {
  AvailableInitials,
  AvailableInitialsType,
} from '@domain/value-objects';
import {
  MAX_CITY_NAME_LENGTH,
  MIN_CITY_NAME_MIN_LENGTH,
} from '@domain/entities';

export class RegisterCityDto {
  @IsString()
  @Length(MIN_CITY_NAME_MIN_LENGTH, MAX_CITY_NAME_LENGTH)
  name!: string;

  @IsPositive()
  @Max(999999999)
  geoCode!: number;

  @IsEnum(AvailableInitials)
  state!: AvailableInitialsType;
}
