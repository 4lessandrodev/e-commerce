import { Result, ValueObject } from 'types-ddd';
import { validateStringLengthBetweenMaxAndMin } from '@domain/utils';
import { ERROR_BASKET_DESCRIPTION_LENGTH } from './basket-description-errors.domain';
export const MAX_BASKET_DESCRIPTION_LENGTH = 30;
export const MIN_BASKET_DESCRIPTION_LENGTH = 3;

interface BasketDescriptionProps {
  value: string;
}

export class BasketDescriptionValueObject extends ValueObject<BasketDescriptionProps> {
  private constructor(props: BasketDescriptionProps) {
    super(props);
  }

  get value(): string {
    return this.props.value.toLowerCase();
  }

  public static create(
    description: string,
  ): Result<BasketDescriptionValueObject> {
    const isValidDescription = validateStringLengthBetweenMaxAndMin({
      text: description,
      maxLength: MAX_BASKET_DESCRIPTION_LENGTH,
      minLength: MIN_BASKET_DESCRIPTION_LENGTH,
    });

    if (!isValidDescription) {
      return Result.fail<BasketDescriptionValueObject>(
        ERROR_BASKET_DESCRIPTION_LENGTH,
      );
    }

    return Result.ok<BasketDescriptionValueObject>(
      new BasketDescriptionValueObject({ value: description }),
    );
  }
}
