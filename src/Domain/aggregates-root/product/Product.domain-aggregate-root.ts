import { AggregateRoot, Result, UniqueEntityID } from '../../../Shared';
import { ProductCategory } from '../../entities';
import {
  validateNumberGreatterOrEqualToZero,
  validateNumberGreatterThanZero,
  validateStringLengthBetweenMaxAndMin,
} from '../../utils';

import {
  ImageValueObject,
  MonetaryType,
  MonetaryValueObject,
} from '../../value-objects';
import { ProductProps } from './Product.domain-aggregate-root-interface';
import {
  ERROR_PRODUCT_AVALIABLE_QUANTITY,
  ERROR_PRODUCT_DESCRIPTION_LENGTH,
  ERROR_PRODUCT_PRICE,
} from './ProductErrors.domain-aggregate-root';
export const MAX_DESCRIPTION_LENGTH = 80;
export const MIN_DESCRIPTION_LENGTH = 3;

export class Product extends AggregateRoot<ProductProps> {
  private constructor(props: ProductProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  get info(): string {
    return this.props.info;
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
    return this.props.quantityAvaliable;
  }

  get images(): ImageValueObject[] {
    return this.props.images;
  }

  changePrice(price: MonetaryValueObject): Result<void> {
    const isValidPrice = price.type === MonetaryType.POSITIVE;
    if (!isValidPrice) {
      return Result.fail<void>(ERROR_PRODUCT_PRICE);
    }
    this.props.price = price;
    this.props.updatedAt = new Date();
    return Result.ok<void>();
  }

  addProductImage(image: ImageValueObject): void {
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
    this.props.quantityAvaliable = quantity;
    this.props.updatedAt = new Date();
  }

  incrementStock(): void {
    this.props.quantityAvaliable++;
  }

  decrementStock(): void {
    const isValidStock = validateNumberGreatterThanZero(
      this.props.quantityAvaliable,
    );
    if (!isValidStock) {
      return;
    }
    this.props.quantityAvaliable--;
    this.props.updatedAt = new Date();
  }

  changeDescription(value: string): Result<void> {
    const isValidDescription = validateStringLengthBetweenMaxAndMin({
      text: value,
      maxLength: MAX_DESCRIPTION_LENGTH,
      minLength: MIN_DESCRIPTION_LENGTH,
    });
    if (!isValidDescription) {
      return Result.fail<void>(ERROR_PRODUCT_DESCRIPTION_LENGTH);
    }
    this.props.description = value;
    this.props.updatedAt = new Date();
    return Result.ok<void>();
  }

  public static create(
    props: ProductProps,
    id?: UniqueEntityID,
  ): Result<Product> {
    const isValidDescription = validateStringLengthBetweenMaxAndMin({
      text: props.description,
      maxLength: MAX_DESCRIPTION_LENGTH,
      minLength: MIN_DESCRIPTION_LENGTH,
    });
    if (!isValidDescription) {
      return Result.fail<Product>(ERROR_PRODUCT_DESCRIPTION_LENGTH);
    }
    const isValidQuantity = validateNumberGreatterOrEqualToZero(
      props.quantityAvaliable,
    );
    if (!isValidQuantity) {
      return Result.fail<Product>(ERROR_PRODUCT_AVALIABLE_QUANTITY);
    }
    const isValidPrice = props.price.type === MonetaryType.POSITIVE;
    if (!isValidPrice) {
      return Result.fail<Product>(ERROR_PRODUCT_PRICE);
    }
    return Result.ok<Product>(new Product(props, id));
  }
}
