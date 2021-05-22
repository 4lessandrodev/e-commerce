import { Entity, Result, UniqueEntityID } from 'types-ddd';
import { validateStringLengthBetweenMaxAndMin } from '@domain/utils';
import { BasketCategoryProps } from './basketCategory.domain-entity-interface';
import { ERROR_BASKET_CATEGORY_DESCRIPTION_LENGTH } from './basket-category-errors.domain-entity';
import { ChangesLimitValueObject } from '@domain/value-objects';
export const MIN_BASKET_CATEGORY_DESCRIPTION_LENGTH = 3;
export const MAX_BASKET_CATEGORY_DESCRIPTION_LENGTH = 20;

export class BasketCategory extends Entity<BasketCategoryProps> {
  private constructor(props: BasketCategoryProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  get description(): string {
    return this.props.description.toLowerCase();
  }

  get changesLimit(): ChangesLimitValueObject {
    return this.props.changesLimit;
  }

  delete(): void {
    this.props.isDeleted = true;
    this.props.updatedAt = new Date();
  }

  public static create(
    props: BasketCategoryProps,
    id?: UniqueEntityID,
  ): Result<BasketCategory> {
    const isValidDescription = validateStringLengthBetweenMaxAndMin({
      text: props.description,
      minLength: MIN_BASKET_CATEGORY_DESCRIPTION_LENGTH,
      maxLength: MAX_BASKET_CATEGORY_DESCRIPTION_LENGTH,
    });

    if (!isValidDescription) {
      return Result.fail<BasketCategory>(
        ERROR_BASKET_CATEGORY_DESCRIPTION_LENGTH,
      );
    }
    return Result.ok<BasketCategory>(new BasketCategory(props, id));
  }
}
