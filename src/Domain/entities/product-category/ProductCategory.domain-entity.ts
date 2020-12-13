import { Entity, Result, UniqueEntityID } from '../../../Shared';
import { validateStringLengthBetweenMaxAndMin } from '../../utils';
import { ProductCategoryProps } from './ProductCategory.domain-entity-interface';
import { ERROR_PRODUCT_CATEGORY_DESCRIPTION_LENGTH } from './ProductCategoryErrors.domain-entity';
export const PRODUCT_CATEGORY_DESCRIPTION_MAX_STRING_LENGTH = 20;
export const PRODUCT_CATEGORY_DESCRIPTION_MIN_STRING_LENGTH = 3;

export class ProductCategory extends Entity<ProductCategoryProps> {
  private constructor(props: ProductCategoryProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  get description(): string {
    return this.props.description;
  }

  public static create(
    props: ProductCategoryProps,
    id?: UniqueEntityID,
  ): Result<ProductCategory> {
    const isValidDescription = validateStringLengthBetweenMaxAndMin({
      text: props.description,
      minLength: PRODUCT_CATEGORY_DESCRIPTION_MIN_STRING_LENGTH,
      maxLength: PRODUCT_CATEGORY_DESCRIPTION_MAX_STRING_LENGTH,
    });
    if (!isValidDescription) {
      return Result.fail<ProductCategory>(
        ERROR_PRODUCT_CATEGORY_DESCRIPTION_LENGTH,
      );
    }
    return Result.ok<ProductCategory>(new ProductCategory(props, id));
  }
}
