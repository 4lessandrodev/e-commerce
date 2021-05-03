import { IsEnum, IsPositive, IsString, Length, Max } from 'class-validator';
import {
  AvailableInitials,
  AvailableInitialsType,
} from '@domain/value-objects';

export class RegisterCityDto {
  @IsString()
  @Length(3, 50)
  name!: string;

  @IsPositive()
  @Max(999999999)
  geoCode!: number;

  @IsEnum(AvailableInitials)
  state!: AvailableInitialsType;
}
