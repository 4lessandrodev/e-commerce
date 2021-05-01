import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  MaxLength,
} from 'class-validator';

export class AddressDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(9)
  readonly zipCode!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  readonly street!: string;

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
  avatar?: Blob;

  @IsBoolean()
  readonly hasEcobag!: boolean;

  readonly address!: AddressDto;
}
