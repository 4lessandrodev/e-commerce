export const MAX_PRODUCT_RATING_AVERAGE = 5;
import { ImageValueObject, MonetaryValueObject } from '@domain/value-objects';
import { ProductInfoValueObject } from '@domain/value-objects';
import { ProductDescriptionValueObject } from '@domain/value-objects';
import { ExchangeFactorValueObject } from '@domain/value-objects';
import { QuantityInStockValueObject } from '@domain/value-objects';
import { ERROR_PRODUCT_PRICE } from './product-errors.domain-aggregate-root';
import { Result, UniqueEntityID, AggregateRoot, IDomainEvent } from 'types-ddd';
import { CommentId, ProductCategory, Tag } from '@domain/entities';
import { ProductProps } from './product.domain-aggregate-root-interface';
import { UnitOfMeasurementValueObject } from '@domain/value-objects/unit-of-measurement/unit-of-measurement.value-objects';
import { ProductDomainEvent } from '@domain/events/product-updated/product.domain-event';

export class Product extends AggregateRoot<ProductProps> {
  private constructor(props: ProductProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  get info(): ProductInfoValueObject | undefined {
    return this.props.info;
  }

  get description(): ProductDescriptionValueObject {
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

  get quantityAvailable(): QuantityInStockValueObject {
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

  get exchangeFactor(): ExchangeFactorValueObject {
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

  launchStock(quantity: QuantityInStockValueObject): void {
    this.props.quantityAvailable = quantity;
    this.props.updatedAt = new Date();
    // Add domain event to update embed basket item
    this.addNewUniqueEvent(new ProductDomainEvent(this));
  }

  changeDescription(description: ProductDescriptionValueObject): void {
    this.props.description = description;
    this.props.updatedAt = new Date();
    // Add domain event to update embed basket item
    this.addNewUniqueEvent(new ProductDomainEvent(this));
  }

  deactivate(): void {
    this.props.isActive = false;
    this.props.updatedAt = new Date();
    // Add domain event to update embed basket item: remove item from basket
    this.addNewUniqueEvent(new ProductDomainEvent(this));
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

  changeExchangeFactor(factor: ExchangeFactorValueObject): void {
    this.props.exchangeFactor = factor;
    this.props.updatedAt = new Date();
    // Add domain event to update embed basket item
    this.addNewUniqueEvent(new ProductDomainEvent(this));
  }

  changeUnitOfMeasurement(unit: UnitOfMeasurementValueObject): void {
    this.props.unitOfMeasurement = unit;
  }

  changeInfo(info: ProductInfoValueObject | undefined): void {
    this.props.info = info;
    this.props.updatedAt = new Date();
  }

  setAsSpecial(): void {
    this.props.isSpecial = true;
    this.props.updatedAt = new Date();
  }

  setAsNotSpecial(): void {
    this.props.isSpecial = false;
    this.props.updatedAt = new Date();
  }

  private addNewUniqueEvent(event: IDomainEvent): void {
    const exists = this.checkIfEventAlreadyExists(event);
    if (!exists) {
      this.addDomainEvent(event);
    }
  }

  private checkIfEventAlreadyExists(event: IDomainEvent): boolean {
    const newEventName = new Object(event).constructor.name;
    const existsEventsName = this.domainEvents.map((e) => {
      return new Object(e).constructor.name;
    });
    return existsEventsName.includes(newEventName);
  }

  public static create(
    props: ProductProps,
    id?: UniqueEntityID,
  ): Result<Product> {
    //

    if (!props.price.isPositive()) {
      return Result.fail<Product>(ERROR_PRODUCT_PRICE);
    }

    return Result.ok<Product>(new Product(props, id));
  }
}
