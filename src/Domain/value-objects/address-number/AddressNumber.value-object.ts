import { Result, ValueObject } from 'types-ddd';
import { validateStringLengthBetweenMaxAndMin } from '@domain/utils';
import { ERROR_ADDRESS_NUMBER_LENGTH } from './AddressNumber.domain';
export const MIN_ADDRESS_NUMBER_LENGTH = 1;
export const MAX_ADDRESS_NUMBER_LENGTH = 7;

export interface AddressNumberProps {
  value: string;
}

export class AddressNumber extends ValueObject<AddressNumberProps> {
  private constructor(props: AddressNumberProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  public static create(street: string): Result<AddressNumber> {
    const isValidStreetLength = validateStringLengthBetweenMaxAndMin({
      maxLength: MAX_ADDRESS_NUMBER_LENGTH,
      minLength: MIN_ADDRESS_NUMBER_LENGTH,
      text: street,
    });

    if (!isValidStreetLength) {
      return Result.fail<AddressNumber>(ERROR_ADDRESS_NUMBER_LENGTH);
    }

    return Result.ok<AddressNumber>(new AddressNumber({ value: street }));
  }
}
