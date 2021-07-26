import {
	IsNotEmpty,
	IsString,
	IsUUID,
	Length,
	MaxLength
} from 'class-validator';
import {
	MAX_ADDRESS_COMPLEMENT_LENGTH,
	MAX_ADDRESS_NUMBER_LENGTH,
	MAX_STREET_NAME_LENGTH,
	MIN_STREET_NAME_LENGTH
} from '@domain/value-objects';

export class UpdateAddressDto {
	id!: string;

	@IsNotEmpty()
	@Length(8, 9)
	zipCode!: string;

	@IsNotEmpty()
	@Length(MIN_STREET_NAME_LENGTH, MAX_STREET_NAME_LENGTH)
	street!: string;

	@IsNotEmpty()
	@IsString()
	@MaxLength(MAX_ADDRESS_NUMBER_LENGTH)
	number!: string;

	@IsNotEmpty()
	@MaxLength(MAX_ADDRESS_COMPLEMENT_LENGTH)
	complement!: string;

	@IsUUID('4')
	@IsNotEmpty()
	regionId!: string;
}
