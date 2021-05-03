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
export class AddressDto {
  @Length(8, 9)
  @IsString()
  zipCode!: string;

  @IsString()
  @Length(1, 40)
  street!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(7)
  readonly number!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  readonly complement!: string;

  @IsNotEmpty()
  @IsUUID('4')
  readonly regionId!: string;
}

export class RegisterClientDto {
  @IsOptional()
  userId!: string;

  @IsString()
  @Length(1, 30)
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
