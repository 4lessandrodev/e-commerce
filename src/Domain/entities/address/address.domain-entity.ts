import { Entity, Result, UniqueEntityID } from 'types-ddd';
import {
	AddressComplementValueObject,
	AddressNumberValueObject,
	StreetNameValueObject,
	ZipCodeValueObject
} from '@domain/value-objects';
import { AddressProps } from './address.domain-entity.interface';
import { RegionId } from '@domain/aggregates-root';

export class Address extends Entity<AddressProps> {
	private constructor(props: AddressProps, id?: UniqueEntityID) {
		super(props, id);
	}

	get id(): UniqueEntityID {
		return this._id;
	}

	get zipCode(): ZipCodeValueObject {
		return this.props.zipCode;
	}

	get street(): StreetNameValueObject {
		return this.props.street;
	}

	get number(): AddressNumberValueObject {
		return this.props.number;
	}

	get complement(): AddressComplementValueObject {
		return this.props.complement;
	}

	get isMainAddress(): boolean {
		return this.props.isMainAddress;
	}

	get regionId(): RegionId {
		return this.props.regionId;
	}

	public static create(
		address: AddressProps,
		id?: UniqueEntityID
	): Result<Address> {
		return Result.ok<Address>(new Address(address, id));
	}
}
