import { Result, ValueObject } from 'types-ddd';
import { validateStringLengthBetweenMaxAndMin } from '@domain/utils';
import { ERROR_ADDRESS_COMPLEMENT_LENGTH } from './AddressComplement.domain';
export const MIN_ADDRESS_COMPLEMENT_LENGTH = 0;
export const MAX_ADDRESS_COMPLEMENT_LENGTH = 40;

export interface AddressComplementProps {
  value: string;
}

export class AddressComplement extends ValueObject<AddressComplementProps> {
  private constructor(props: AddressComplementProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  public static create(street: string): Result<AddressComplement> {
    const isValidStreetLength = validateStringLengthBetweenMaxAndMin({
      maxLength: MAX_ADDRESS_COMPLEMENT_LENGTH,
      minLength: MIN_ADDRESS_COMPLEMENT_LENGTH,
      text: street,
    });

    if (!isValidStreetLength) {
      return Result.fail<AddressComplement>(ERROR_ADDRESS_COMPLEMENT_LENGTH);
    }

    return Result.ok<AddressComplement>(
      new AddressComplement({ value: street }),
    );
  }
}
