import { Result, ValueObject } from 'types-ddd';
import { validateStringLengthBetweenMaxAndMin } from '@domain/utils';
export const MAX_PRODUCT_DESCRIPTION_LENGTH = 30;
export const MIN_PRODUCT_DESCRIPTION_LENGTH = 3;
import { ERROR_PRODUCT_DESCRIPTION_LENGTH } from './product-description-errors.domain';

interface ProductDescriptionProps {
  value: string;
}

export class ProductDescriptionValueObject extends ValueObject<ProductDescriptionProps> {
  private constructor(props: ProductDescriptionProps) {
    super(props);
  }

  get value(): string {
    return this.props.value.toLowerCase();
  }

  public static create(
    description: string,
  ): Result<ProductDescriptionValueObject> {
    const isValidDescription = validateStringLengthBetweenMaxAndMin({
      text: description,
      maxLength: MAX_PRODUCT_DESCRIPTION_LENGTH,
      minLength: MIN_PRODUCT_DESCRIPTION_LENGTH,
    });

    if (!isValidDescription) {
      return Result.fail<ProductDescriptionValueObject>(
        ERROR_PRODUCT_DESCRIPTION_LENGTH,
      );
    }

    return Result.ok<ProductDescriptionValueObject>(
      new ProductDescriptionValueObject({ value: description }),
    );
  }
}
