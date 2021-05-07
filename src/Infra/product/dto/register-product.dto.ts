import { File } from '@shared/services/upload-files/interfaces/uploader.interface';
import {
  Units,
  UnitTypes,
} from '@domain/value-objects/unit-of-measurement/UnitOfMeasurement.value-objects';
import {
  IsBoolean,
  IsEnum,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  Length,
  MaxLength,
} from 'class-validator';

export class RegisterProductDto {
  @IsString()
  @Length(3, 80)
  description!: string;

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
  @MaxLength(250)
  info?: string;

  @IsOptional()
  @IsUUID('4', { each: true })
  tagsIds?: string[];
}
