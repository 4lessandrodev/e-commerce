import { File } from '@shared/services/upload-files/interfaces/uploader.interface';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import {
  MAX_ADDRESS_COMPLEMENT_LENGTH,
  MAX_ADDRESS_NUMBER_LENGTH,
  MAX_STREET_NAME_LENGTH,
  MAX_USER_NAME_LENGTH,
  MIN_STREET_NAME_LENGTH,
  MIN_USER_NAME_LENGTH,
} from '@domain/value-objects';
export class AddressDto {
  @Length(8, 9)
  @IsString()
  zipCode!: string;

  @IsString()
  @Length(MIN_STREET_NAME_LENGTH, MAX_STREET_NAME_LENGTH)
  street!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(MAX_ADDRESS_NUMBER_LENGTH)
  readonly number!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(MAX_ADDRESS_COMPLEMENT_LENGTH)
  readonly complement!: string;

  @IsNotEmpty()
  @IsUUID('4')
  readonly regionId!: string;
}

export class RegisterClientDto {
  @IsOptional()
  userId!: string;

  @IsString()
  @Length(MIN_USER_NAME_LENGTH, MAX_USER_NAME_LENGTH)
  readonly name!: string;

  @IsOptional()
  avatar?: File;

  @IsBoolean()
  readonly hasEcobag!: boolean;

  @IsNotEmpty({ each: true })
  @IsObject({ each: true })
  @ValidateNested()
  @Type(() => AddressDto)
  readonly address!: AddressDto;
}
