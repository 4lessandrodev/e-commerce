import { Result, UniqueEntityID } from '../../../Shared';
import { MonetaryValueObject } from '../../value-objects';
import { ItemProps } from './Item.domain-entity-interface';
import { ERROR_ITEM_INVALID_QUANTITY } from './ItemErrors.domain-entity';
import { ItemProduct } from './ItemProduct.domain-entity';

describe('ItemProduct.domain-entity', () => {
  const makeSut = (
    props?: ItemProps<any>,
    id?: UniqueEntityID,
  ): Result<ItemProduct> => {
    return ItemProduct.create(
      {
        item: props?.item ?? 'teste',
        orderId: props?.orderId ?? new UniqueEntityID(),
        quantity: props?.quantity ?? 1,
        total: props?.total ?? MonetaryValueObject.create(10).getResult(),
      },
      id,
    );
  };

  it('Should create a valid ItemProduct', () => {
    const itemCreated = makeSut();
    expect(itemCreated.isFailure).toBe(false);
    expect(itemCreated.getResult().item).toBe('teste');
    expect(itemCreated.getResult().quantity).toBe(1);
    expect(itemCreated.getResult().total.value).toBe(10);
  });

  it('Should fail if provide a negative number', () => {
    const itemCreated = makeSut({
      item: 'teste',
      orderId: new UniqueEntityID(),
      quantity: -1,
      total: MonetaryValueObject.create(0).getResult(),
    });
    expect(itemCreated.isFailure).toBe(true);
    expect(itemCreated.error).toBe(ERROR_ITEM_INVALID_QUANTITY);
  });

  it('Should create a valid ItemProduct with provided id', () => {
    const providedId = new UniqueEntityID();
    const itemCreated = makeSut(
      {
        item: 'teste',
        orderId: new UniqueEntityID(),
        quantity: 1,
        total: MonetaryValueObject.create(0).getResult(),
      },
      providedId,
    );
    expect(itemCreated.isFailure).toBe(false);
    expect(itemCreated.getResult().id.toString()).toBe(providedId.toString());
  });
});
