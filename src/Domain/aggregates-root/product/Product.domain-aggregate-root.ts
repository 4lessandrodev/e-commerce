import { Result, UniqueEntityID, AggregateRoot } from 'types-ddd';
import { Comment, ProductCategory, Tag } from '../../entities';
import {
  validateNumberGreatterOrEqualToZero,
  validateNumberGreatterThanZero,
  validateStringLengthBetweenMaxAndMin,
} from '../../utils';

import { ImageValueObject, MonetaryValueObject } from '../../value-objects';
import { ProductProps } from './Product.domain-aggregate-root-interface';
import {
  ERROR_PRODUCT_AVAILABLE_QUANTITY,
  ERROR_PRODUCT_DESCRIPTION_LENGTH,
  ERROR_PRODUCT_PRICE,
} from './ProductErrors.domain-aggregate-root';
export const MAX_PRODUCT_DESCRIPTION_LENGTH = 80;
export const MIN_PRODUCT_DESCRIPTION_LENGTH = 3;
export const MAX_PRODUCT_RATING_AVERAGE = 5;

export class Product extends AggregateRoot<ProductProps> {
  private constructor(props: ProductProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  get info(): string {
    return this.props.info ?? '';
  }

  get description(): string {
    return this.props.description;
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

  get quantityAvaliable(): number {
    return this.props.quantityAvailable;
  }

  get images(): ImageValueObject[] {
    return this.props.images;
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

  get comments(): Comment[] | null {
    return this.props.comments ?? null;
  }

  get tags(): Tag[] | null {
    return this.props.tags ?? null;
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

  addImage(image: ImageValueObject): void {
    this.props.images.push(image);
    this.props.updatedAt = new Date();
  }

  removeImage(image: ImageValueObject): void {
    this.props.images = this.props.images.filter(
      (img) => img.value !== image.value,
    );
    this.props.updatedAt = new Date();
  }

  launchStock(quantity: number): void {
    const isValidStock = validateNumberGreatterOrEqualToZero(quantity);
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
    const isValidStock = validateNumberGreatterThanZero(
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

  addComment(comment: Comment): void {
    const existComments = this.props.comments ?? null;
    this.props.comments = [comment];
    if (existComments) {
      this.props.comments = this.props.comments.concat(existComments);
    }
  }

  removeComment(comment: Comment): void {
    const existComments = this.props.comments ?? null;
    if (!existComments) {
      return;
    }
    this.props.comments = existComments.filter(
      (cmt) => !cmt.id.equals(comment.id),
    );
  }

  addTag(tag: Tag): void {
    const existTags = this.props.tags ?? null;
    this.props.tags = [tag];
    if (existTags) {
      this.props.tags = this.props.tags.concat(existTags);
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
    const isValidDescription = validateStringLengthBetweenMaxAndMin({
      text: props.description,
      maxLength: MAX_PRODUCT_DESCRIPTION_LENGTH,
      minLength: MIN_PRODUCT_DESCRIPTION_LENGTH,
    });
    if (!isValidDescription) {
      return Result.fail<Product>(ERROR_PRODUCT_DESCRIPTION_LENGTH);
    }
    const isValidQuantity = validateNumberGreatterOrEqualToZero(
      props.quantityAvailable,
    );
    if (!isValidQuantity) {
      return Result.fail<Product>(ERROR_PRODUCT_AVAILABLE_QUANTITY);
    }

    if (!props.price.isPositive()) {
      return Result.fail<Product>(ERROR_PRODUCT_PRICE);
    }
    return Result.ok<Product>(new Product(props, id));
  }
}
