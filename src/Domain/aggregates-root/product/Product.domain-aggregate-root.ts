export const MAX_PRODUCT_DESCRIPTION_LENGTH = 80;
export const MIN_PRODUCT_DESCRIPTION_LENGTH = 3;
export const MAX_PRODUCT_RATING_AVERAGE = 5;
export const MAX_PRODUCT_INFO_LENGTH = 250;
import {
  ImageValueObject,
  MAX_EXCHANGE_FACTOR,
  MIN_EXCHANGE_FACTOR,
  MonetaryValueObject,
} from '@domain/value-objects';
import {
  ERROR_PRODUCT_AVAILABLE_QUANTITY,
  ERROR_PRODUCT_DESCRIPTION_LENGTH,
  ERROR_PRODUCT_INFO_LENGTH,
  ERROR_PRODUCT_PRICE,
} from './ProductErrors.domain-aggregate-root';
import { ERROR_INVALID_EXCHANGE_FACTOR_RANGE } from '@domain/value-objects/basket-item/BasketItemErrors.domain';
import { Result, UniqueEntityID, AggregateRoot } from 'types-ddd';
import { CommentId, ProductCategory, Tag } from '@domain/entities';
import {
  validateNumberBetweenMaxAndMin,
  validateNumberGreaterOrEqualToZero,
  validateNumberGreaterThanZero,
  validateStringLengthBetweenMaxAndMin,
} from '@domain/utils';

import { ProductProps } from './Product.domain-aggregate-root-interface';
import { UnitOfMeasurementValueObject } from '@domain/value-objects/unit-of-measurement/UnitOfMeasurement.value-objects';

export class Product extends AggregateRoot<ProductProps> {
  private constructor(props: ProductProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  get info(): string {
    return this.props.info?.toLowerCase() ?? '';
  }

  get description(): string {
    return this.props.description.toLowerCase();
  }

  get category(): ProductCategory {
    return this.props.category;
  }

  get isSpecial(): boolean {
    return this.props.isSpecial;
  }

  get price(): MonetaryValueObject {
    return this.props.price;
  }

  get quantityAvailable(): number {
    return this.props.quantityAvailable;
  }

  get image(): ImageValueObject | undefined {
    return this.props.image;
  }

  get unitOfMeasurement(): UnitOfMeasurementValueObject {
    return this.props.unitOfMeasurement;
  }

  get isActive(): boolean {
    return this.props.isActive;
  }

  get numberOfRatings(): number {
    return this.props.numberOfRatings ?? 0;
  }

  get ratingAverage(): number {
    return this.props.ratingAverage ?? 0;
  }

  get comments(): CommentId[] {
    return this.props.commentIds ?? [];
  }

  get tags(): Tag[] {
    return this.props.tags ?? [];
  }

  get exchangeFactor(): number {
    return this.props.exchangeFactor;
  }

  updateProductRating(props: {
    numberOfRatings: number;
    ratingAverage: number;
  }): void {
    if (props.ratingAverage > MAX_PRODUCT_RATING_AVERAGE) {
      return;
    }
    this.props.ratingAverage = props.ratingAverage;
    this.props.numberOfRatings = props.numberOfRatings;
    this.props.updatedAt = new Date();
  }

  changePrice(price: MonetaryValueObject): Result<void> {
    if (!price.isPositive()) {
      return Result.fail<void>(ERROR_PRODUCT_PRICE);
    }
    this.props.price = price;
    this.props.updatedAt = new Date();
    return Result.ok<void>();
  }

  changeImage(image: ImageValueObject): void {
    this.props.image = image;
    this.props.updatedAt = new Date();
  }

  removeImage(): void {
    this.props.image = undefined;
    this.props.updatedAt = new Date();
  }

  launchStock(quantity: number): void {
    const isValidStock = validateNumberGreaterOrEqualToZero(quantity);
    if (!isValidStock) {
      return;
    }
    this.props.quantityAvailable = quantity;
    this.props.updatedAt = new Date();
  }

  incrementStock(): void {
    this.props.quantityAvailable++;
  }

  decrementStock(): void {
    const isValidStock = validateNumberGreaterThanZero(
      this.props.quantityAvailable,
    );
    if (!isValidStock) {
      return;
    }
    this.props.quantityAvailable--;
    this.props.updatedAt = new Date();
  }

  changeDescription(value: string): Result<void> {
    const isValidDescription = validateStringLengthBetweenMaxAndMin({
      text: value,
      maxLength: MAX_PRODUCT_DESCRIPTION_LENGTH,
      minLength: MIN_PRODUCT_DESCRIPTION_LENGTH,
    });
    if (!isValidDescription) {
      return Result.fail<void>(ERROR_PRODUCT_DESCRIPTION_LENGTH);
    }
    this.props.description = value;
    this.props.updatedAt = new Date();
    return Result.ok<void>();
  }

  deactivate(): void {
    this.props.isActive = false;
    this.props.updatedAt = new Date();
  }

  activate(): void {
    this.props.isActive = true;
    this.props.updatedAt = new Date();
  }

  addComment(comment: CommentId): void {
    const existComments = this.props.commentIds ?? null;
    this.props.commentIds = [comment];
    if (existComments) {
      this.props.commentIds = this.props.commentIds.concat(existComments);
    }
  }

  removeComment(comment: CommentId): void {
    const existComments = this.props.commentIds ?? null;
    if (!existComments) {
      return;
    }
    this.props.commentIds = existComments.filter(
      (cmt) => !cmt.id.equals(comment.id),
    );
  }

  addTag(tag: Tag): void {
    const existTags = this.props.tags ?? null;

    this.props.tags = [tag];
    if (existTags) {
      const tagAlreadyOnProduct = existTags.includes(tag);
      if (!tagAlreadyOnProduct) {
        this.props.tags = this.props.tags.concat(existTags);
      }
    }
  }

  removeTag(tag: Tag): void {
    const existTags = this.props.tags ?? null;
    if (!existTags) {
      return;
    }
    this.props.tags = existTags.filter((tg) => !tg.id.equals(tag.id));
  }

  public static create(
    props: ProductProps,
    id?: UniqueEntityID,
  ): Result<Product> {
    //
    const isValidDescription = validateStringLengthBetweenMaxAndMin({
      text: props.description,
      maxLength: MAX_PRODUCT_DESCRIPTION_LENGTH,
      minLength: MIN_PRODUCT_DESCRIPTION_LENGTH,
    });

    if (!isValidDescription) {
      return Result.fail<Product>(ERROR_PRODUCT_DESCRIPTION_LENGTH);
    }
    const isValidQuantity = validateNumberGreaterOrEqualToZero(
      props.quantityAvailable,
    );

    if (!isValidQuantity) {
      return Result.fail<Product>(ERROR_PRODUCT_AVAILABLE_QUANTITY);
    }

    if (!props.price.isPositive()) {
      return Result.fail<Product>(ERROR_PRODUCT_PRICE);
    }

    const isValidExchangeFactor = validateNumberBetweenMaxAndMin({
      max: MAX_EXCHANGE_FACTOR,
      min: MIN_EXCHANGE_FACTOR,
      value: props.exchangeFactor,
    });

    if (!isValidExchangeFactor) {
      return Result.fail<Product>(ERROR_INVALID_EXCHANGE_FACTOR_RANGE);
    }

    const isValidInfoLength = validateStringLengthBetweenMaxAndMin({
      maxLength: MAX_PRODUCT_INFO_LENGTH,
      text: props.info ?? '',
      minLength: 0,
    });

    if (!isValidInfoLength) {
      return Result.fail<Product>(ERROR_PRODUCT_INFO_LENGTH);
    }

    return Result.ok<Product>(new Product(props, id));
  }
}
