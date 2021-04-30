import { Entity, Result, UniqueEntityID } from 'types-ddd';
import {
  AddressComplement,
  AddressNumber,
  StreetName,
  ZipCodeValueObject,
} from '@domain/value-objects';
import { AddressProps } from './Address.domain-entity.interface';
import { RegionId } from '@domain/aggregates-root';

export class Address extends Entity<AddressProps> {
  private constructor(props: AddressProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get zipCode(): ZipCodeValueObject {
    return this.props.zipCode;
  }
  get street(): StreetName {
    return this.props.street;
  }
  get number(): AddressNumber {
    return this.props.number;
  }
  get complement(): AddressComplement {
    return this.props.complement;
  }
  get isMainAddress(): boolean {
    return this.props.isMainAddress;
  }
  get region(): RegionId {
    return this.props.region;
  }

  public static create(
    address: AddressProps,
    id?: UniqueEntityID,
  ): Result<Address> {
    return Result.ok<Address>(new Address(address, id));
  }
}
