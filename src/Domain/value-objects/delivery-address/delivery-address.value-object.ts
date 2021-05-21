import { Result, ValueObject } from 'types-ddd';
import {
  MAX_CITY_NAME_LENGTH,
  MIN_CITY_NAME_MIN_LENGTH,
} from '@domain/entities';
import { ERROR_CITY_LENGTH_NAME } from '@domain/entities/city/city-errors.domain-entity';
import { validateStringLengthBetweenMaxAndMin } from '@domain/utils';
import { AddressComplementValueObject } from '../address-complement/address-complement.value-object';
import { AddressNumberValueObject } from '../address-number/address-number.value-object';
import { RegionNameValueObject } from '../region-name/region-name.value-object';
import {
  AvailableInitialsType,
  InitialStateValueObject,
} from '../state-initials/state-initials.value-object';
import { StreetNameValueObject } from '../street-name/street-name.value-object';
import { ZipCodeValueObject } from '../zip-code/zip-code.value-object';

interface Props {
  zipCode: string;
  street: string;
  number: string;
  complement: string;
  region: string;
  city: string;
  state: AvailableInitialsType;
}

export interface DeliveryAddressProps {
  value: Props;
}

export class DeliveryAddressValueObject extends ValueObject<DeliveryAddressProps> {
  private constructor(props: DeliveryAddressProps) {
    super(props);
  }

  public static create(props: Props): Result<DeliveryAddressValueObject> {
    const isValidCity = validateStringLengthBetweenMaxAndMin({
      text: props.city,
      maxLength: MAX_CITY_NAME_LENGTH,
      minLength: MIN_CITY_NAME_MIN_LENGTH,
    });

    if (!isValidCity) {
      return Result.fail<DeliveryAddressValueObject>(ERROR_CITY_LENGTH_NAME);
    }

    const validateAttributes = Result.combine([
      ZipCodeValueObject.create(props.zipCode),
      StreetNameValueObject.create(props.street),
      AddressNumberValueObject.create(props.number),
      AddressComplementValueObject.create(props.complement),
      RegionNameValueObject.create(props.region),
      InitialStateValueObject.create(props.state),
    ]);

    if (validateAttributes.isFailure) {
      return Result.fail<DeliveryAddressValueObject>(validateAttributes.error);
    }

    return Result.ok<DeliveryAddressValueObject>(
      new DeliveryAddressValueObject({ value: props }),
    );
  }
}
