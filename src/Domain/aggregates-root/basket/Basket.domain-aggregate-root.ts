import { AggregateRoot, Result, UniqueEntityID } from '../../../Shared';
import { BasketCategory, Tag } from '../../entities';
import { ImageValueObject, MonetaryValueObject } from '../../value-objects';
import { Product } from '../';
import { BasketProps } from './Basket.domain-aggregate-root-interface';
import { validateStringLengthBetweenMaxAndMin } from '../../utils';
import {
  ERROR_BASKET_DESCRIPTION_LENGTH,
  ERROR_BASKET_PRICE,
} from './BasketErrors.domain-aggregate-root';
import { Comment } from '../../entities';
export const MAX_BASKET_DESCRIPTION_LENGTH = 20;
export const MIN_BASKET_DESCRIPTION_LENGTH = 3;
export const MAX_BASKET_RATING_AVERAGE = 5;

export class Basket extends AggregateRoot<BasketProps> {
  private constructor(props: BasketProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get description(): string {
    return this.props.description;
  }

  get category(): BasketCategory {
    return this.props.category;
  }

  get products(): Product[] | null {
    return this.props.products ?? null;
  }

  get price(): MonetaryValueObject {
    return this.props.price;
  }

  get isActive(): boolean {
    return this.props.isActive;
  }

  get info(): string {
    return this.props.info ?? '';
  }

  get numberOfRatings(): number {
    return this.props.numberOfRatings ?? 0;
  }

  get ratingAverage(): number {
    return this.props.ratingAverage ?? 0;
  }

  get images(): ImageValueObject[] {
    return this.props.images;
  }

  get comments(): Comment[] | null {
    return this.props.comments ?? null;
  }

  get tags(): Tag[] | null {
    return this.props.tags ?? null;
  }

  updateBasketRating(props: {
    numberOfRatings: number;
    ratingAverage: number;
  }): void {
    if (props.ratingAverage > MAX_BASKET_RATING_AVERAGE) {
      return;
    }
    this.props.ratingAverage = props.ratingAverage;
    this.props.numberOfRatings = props.numberOfRatings;
    this.props.updatedAt = new Date();
  }

  changePrice(price: MonetaryValueObject): Result<void> {
    if (!price.isPositive()) {
      return Result.fail<void>(ERROR_BASKET_PRICE);
    }
    this.props.price.props.currency.changePrice(price.value);
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
      (cmt) => cmt.id.toString() !== comment.id.toString(),
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
    this.props.tags = existTags.filter(
      (tg) => tg.id.toString() !== tag.id.toString(),
    );
  }

  addProduct(product: Product): void {
    const existProducts = this.props.products ?? null;
    this.props.products = [product];
    if (existProducts) {
      this.props.products = this.props.products.concat(existProducts);
    }
  }

  removeProduct(product: Product): void {
    const existProducts = this.props.products ?? null;
    if (!existProducts) {
      return;
    }
    this.props.products = existProducts.filter(
      (prd) => prd.id.toString() !== product.id.toString(),
    );
  }

  public static create(
    props: BasketProps,
    id?: UniqueEntityID,
  ): Result<Basket> {
    const isValidDescription = validateStringLengthBetweenMaxAndMin({
      text: props.description,
      maxLength: MAX_BASKET_DESCRIPTION_LENGTH,
      minLength: MIN_BASKET_DESCRIPTION_LENGTH,
    });
    if (!isValidDescription) {
      return Result.fail<Basket>(ERROR_BASKET_DESCRIPTION_LENGTH);
    }

    if (!props.price.isPositive()) {
      return Result.fail<Basket>(ERROR_BASKET_PRICE);
    }
    return Result.ok<Basket>(new Basket(props, id));
  }
}
