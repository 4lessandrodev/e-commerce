import { Entity, Result, UniqueEntityID } from '../../../Shared';
import { Product } from '../../aggregates-root/product/Product.domain-aggregate-root';
import { validateNumberGreatterThanZero } from '../../utils';
import { MonetaryValueObject } from '../../value-objects';
import { ItemProps } from './Item.domain-entity-interface';
import { ERROR_ITEM_INVALID_QUANTITY } from './ItemErrors.domain-entity';
export class ItemProduct extends Entity<ItemProps<Product>> {
  private constructor(props: ItemProps<any>, id?: UniqueEntityID) {
    super(props, id);
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  get item(): Product {
    return this.props.item;
  }

  get orderId(): UniqueEntityID {
    return this.props.orderId;
  }

  get quantity(): number {
    return this.props.quantity;
  }

  get total(): MonetaryValueObject {
    return this.props.total;
  }

  public static create(
    props: ItemProps<any>,
    id?: UniqueEntityID,
  ): Result<ItemProduct> {
    const isValidQuantity = validateNumberGreatterThanZero(props.quantity);
    if (!isValidQuantity) {
      return Result.fail<ItemProduct>(ERROR_ITEM_INVALID_QUANTITY);
    }
    return Result.ok<ItemProduct>(new ItemProduct(props, id));
  }
}
