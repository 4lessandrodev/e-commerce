import { Result, ValueObject } from 'types-ddd';
import { validateStringLengthBetweenMaxAndMin } from '@domain/utils';
export const MAX_BASKET_INFO_LENGTH = 250;
export const MIN_BASKET_INFO_LENGTH = 3;
import { ERROR_BASKET_INFO_MAX_LENGTH } from './BasketInfoErrors.domain';

interface BasketInfoProps {
  value: string;
}

export class BasketInfoValueObject extends ValueObject<BasketInfoProps> {
  private constructor(props: BasketInfoProps) {
    super(props);
  }

  get value(): string {
    return this.props.value.toLowerCase();
  }

  public static create(description: string): Result<BasketInfoValueObject> {
    const isValidDescription = validateStringLengthBetweenMaxAndMin({
      text: description,
      maxLength: MAX_BASKET_INFO_LENGTH,
      minLength: MIN_BASKET_INFO_LENGTH,
    });

    if (!isValidDescription) {
      return Result.fail<BasketInfoValueObject>(ERROR_BASKET_INFO_MAX_LENGTH);
    }

    return Result.ok<BasketInfoValueObject>(
      new BasketInfoValueObject({ value: description }),
    );
  }
}
