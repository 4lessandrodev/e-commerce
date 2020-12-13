import { Entity, Result, UniqueEntityID } from '../../../Shared';
import {
  convertNegativeNumberToPositive,
  validateStringLengthBetweenMaxAndMin,
} from '../../utils';
import { BasketCategoryProps } from './BasketCategory.domain-entity-interface';
import {
  ERROR_BASKET_CATEGORY_DESCRIPTION_LENGTH,
  ERROR_BASKET_CATEGORY_MAX_VALUE,
} from './BasketCategoryErrors.domain-entity';
export const BASKET_CATEGORY_DESCRIPTION_MIN_STRING_LENGTH = 3;
export const BASKET_CATEGORY_DESCRIPTION_MAX_STRING_LENGTH = 20;
export const BASKET_CATEGORY_CHANGE_LIMIT_MAX_VALUE = 20;

export class BasketCategory extends Entity<BasketCategoryProps> {
  private constructor(props: BasketCategoryProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  get description(): string {
    return this.props.description;
  }

  get changesLimit(): number {
    return this.props.changesLimit;
  }

  public static create(
    props: BasketCategoryProps,
    id?: UniqueEntityID,
  ): Result<BasketCategory> {
    const isValidDescription = validateStringLengthBetweenMaxAndMin({
      text: props.description,
      minLength: BASKET_CATEGORY_DESCRIPTION_MIN_STRING_LENGTH,
      maxLength: BASKET_CATEGORY_DESCRIPTION_MAX_STRING_LENGTH,
    });

    if (props.changesLimit < 0) {
      props.changesLimit = convertNegativeNumberToPositive(props.changesLimit);
    }

    if (props.changesLimit > BASKET_CATEGORY_CHANGE_LIMIT_MAX_VALUE) {
      return Result.fail<BasketCategory>(ERROR_BASKET_CATEGORY_MAX_VALUE);
    }

    if (!isValidDescription) {
      return Result.fail<BasketCategory>(
        ERROR_BASKET_CATEGORY_DESCRIPTION_LENGTH,
      );
    }
    return Result.ok<BasketCategory>(new BasketCategory(props, id));
  }
}
