import {
  IsBoolean,
  IsPositive,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

export class RegisterRegionDto {
  @IsString()
  @Length(3, 20)
  description!: string;

  @IsPositive()
  freightPrice!: number;

  @IsBoolean()
  isActive!: boolean;

  @IsUUID()
  cityId!: string;
}
