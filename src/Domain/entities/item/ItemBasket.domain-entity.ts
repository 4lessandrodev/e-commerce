import { Entity, Result, UniqueEntityID } from 'types-ddd/dist/src';
import { Basket } from '@domain/aggregates-root';
import { validateNumberGreaterThanZero } from '@domain/utils';
import { MonetaryValueObject } from '@domain/value-objects';
import { ItemProps } from './Item.domain-entity-interface';
import { ERROR_ITEM_INVALID_QUANTITY } from './ItemErrors.domain-entity';
export class ItemBasket extends Entity<ItemProps<Basket>> {
  private constructor(props: ItemProps<Basket>, id?: UniqueEntityID) {
    super(props, id);
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  get item(): Basket {
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
    props: ItemProps<Basket>,
    id?: UniqueEntityID,
  ): Result<ItemBasket> {
    const isValidQuantity = validateNumberGreaterThanZero(props.quantity);
    if (!isValidQuantity) {
      return Result.fail<ItemBasket>(ERROR_ITEM_INVALID_QUANTITY);
    }
    return Result.ok<ItemBasket>(new ItemBasket(props, id));
  }
}
