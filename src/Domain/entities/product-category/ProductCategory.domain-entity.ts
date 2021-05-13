import { Entity, Result, UniqueEntityID } from 'types-ddd';
import { validateStringLengthBetweenMaxAndMin } from '@domain/utils';
import { ProductCategoryProps } from './ProductCategory.domain-entity-interface';
import { ERROR_PRODUCT_CATEGORY_DESCRIPTION_LENGTH } from './ProductCategoryErrors.domain-entity';
export const MAX_PRODUCT_CATEGORY_DESCRIPTION_LENGTH = 20;
export const MIN_PRODUCT_CATEGORY_DESCRIPTION_LENGTH = 3;

export class ProductCategory extends Entity<ProductCategoryProps> {
  private constructor(props: ProductCategoryProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  get description(): string {
    return this.props.description.toLowerCase();
  }

  delete(): void {
    this.props.isDeleted = true;
    this.props.updatedAt = new Date();
  }

  public static create(
    props: ProductCategoryProps,
    id?: UniqueEntityID,
  ): Result<ProductCategory> {
    const isValidDescription = validateStringLengthBetweenMaxAndMin({
      text: props.description,
      minLength: MIN_PRODUCT_CATEGORY_DESCRIPTION_LENGTH,
      maxLength: MAX_PRODUCT_CATEGORY_DESCRIPTION_LENGTH,
    });
    if (!isValidDescription) {
      return Result.fail<ProductCategory>(
        ERROR_PRODUCT_CATEGORY_DESCRIPTION_LENGTH,
      );
    }
    return Result.ok<ProductCategory>(new ProductCategory(props, id));
  }
}
