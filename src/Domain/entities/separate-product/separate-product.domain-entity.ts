import { Entity, Result } from 'types-ddd/dist/src';
import { ProductProps } from './separate-product.domain-entity.interface';
import { Currency, ImageValueObject } from '@domain/value-objects';
import { MonetaryValueObject } from '@domain/value-objects';
import { AvailableInitialsType } from '@domain/value-objects';
import { ProductDescriptionValueObject } from '@domain/value-objects';
import { QuantityAvailableValueObject } from '@domain/value-objects';
import { ProductCategory } from '@domain/entities';
import * as currencyUtil from 'currency.js';

export class SeparateProduct extends Entity<ProductProps> {
  private constructor(props: ProductProps) {
    super(props);
  }

  get description(): ProductDescriptionValueObject {
    return this.props.description;
  }

  get image(): ImageValueObject | undefined {
    return this.props.image;
  }

  get unitOfMeasurement(): AvailableInitialsType {
    return this.props.unitOfMeasurement;
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

  get quantity(): QuantityAvailableValueObject {
    return this.props.quantity;
  }

  get subTotal(): MonetaryValueObject {
    //
    const quantityOfItems = this.quantity.value;
    const unitPrice = this.price.getAlwaysPositiveValue();
    const subTotal = currencyUtil(unitPrice).multiply(quantityOfItems);

    const subTotalAsValueObject = MonetaryValueObject.create(
      Currency.create(subTotal.value).getResult(),
    ).getResult();

    return subTotalAsValueObject;
  }

  public static create(props: ProductProps): Result<SeparateProduct> {
    const isValidQuantity = props.quantity.value >= 1;
    if (!isValidQuantity) {
      return Result.fail<SeparateProduct>(
        'Invalid quantity to individual product. Quantity must be greater than 0',
      );
    }
    return Result.ok<SeparateProduct>(new SeparateProduct(props));
  }
}
