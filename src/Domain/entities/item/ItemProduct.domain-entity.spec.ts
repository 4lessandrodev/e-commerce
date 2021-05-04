import { image, random } from 'faker';
import { Product } from '@domain/aggregates-root/product/Product.domain-aggregate-root';
import { ImageValueObject, MonetaryValueObject } from '../../value-objects';
import { ProductCategory } from '../product-category/ProductCategory.domain-entity';
import { ItemProps } from './Item.domain-entity-interface';
import { ERROR_ITEM_INVALID_QUANTITY } from './ItemErrors.domain-entity';
import { ItemProduct } from './ItemProduct.domain-entity';
import { ItemId } from './ItemId.domain-entity';
import { Currency } from '@domain/value-objects/monetary/Currency.value-object';
import { Result, UniqueEntityID } from 'types-ddd';
import { ProductId } from '../../aggregates-root/product/ProductId.domain-aggregate-root';

describe('ItemProduct.domain-entity', () => {
  const makeSut = (
    props?: ItemProps<Product>,
    id?: UniqueEntityID,
  ): Result<ItemProduct> => {
    const price = MonetaryValueObject.create(
      Currency.create({
        locale: 'pt-BR',
        symbol: 'BRL',
        value: 9.9,
      }).getResult(),
    ).getResult();
    return ItemProduct.create(
      {
        item:
          props?.item ??
          Product.create({
            description: 'Pera Brasileira',
            category: ProductCategory.create({
              description: 'Pera Portuguesa',
            }).getResult(),
            image: ImageValueObject.create(image.imageUrl()).getResult(),
            info: random.words(7),
            isActive: true,
            isSpecial: false,
            price,
            quantityAvailable: 3,
          }).getResult(),
        orderId: props?.orderId ?? new UniqueEntityID(),
        quantity: props?.quantity ?? 1,
        total:
          props?.total ??
          MonetaryValueObject.create(
            Currency.create({
              locale: 'pt-BR',
              symbol: 'BRL',
              value: 88,
            }).getResult(),
          ).getResult(),
      },
      id,
    );
  };

  it('Should create a valid ItemProduct', () => {
    const itemCreated = makeSut();
    expect(itemCreated.isFailure).toBe(false);
    expect(itemCreated.getResult().item).toBeInstanceOf(Product);
    expect(itemCreated.getResult().quantity).toBe(1);
    expect(itemCreated.getResult().total.value).toBe(88);
    expect(itemCreated.getResult().orderId).toBeDefined();
  });

  it('Should fail if provide a negative number', () => {
    const itemCreated = ItemProduct.create({
      item: [ProductId.create()],
      total: MonetaryValueObject.create(
        Currency.create({
          locale: 'pt-BR',
          symbol: 'BRL',
          value: 20,
        }).getResult(),
      ).getResult(),
      orderId: new UniqueEntityID(),
      quantity: -5,
    });
    expect(itemCreated.isFailure).toBe(true);
    expect(itemCreated.error).toBe(ERROR_ITEM_INVALID_QUANTITY);
  });

  it('Should create a valid ItemProduct with provided id', () => {
    const providedId = ItemId.create().id;
    const itemCreated = ItemProduct.create(
      {
        item: [ProductId.create()],
        total: MonetaryValueObject.create(
          Currency.create({
            locale: 'pt-BR',
            symbol: 'BRL',
            value: 20,
          }).getResult(),
        ).getResult(),
        orderId: new UniqueEntityID(),
        quantity: 10,
      },
      providedId,
    );
    expect(itemCreated.isFailure).toBe(false);
    expect(itemCreated.getResult().id.toString()).toBe(providedId.toString());
  });
});
