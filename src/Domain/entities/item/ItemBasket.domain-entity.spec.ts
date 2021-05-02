import { UniqueEntityID } from 'types-ddd';
import { MonetaryValueObject } from '@domain/value-objects';
import { ERROR_ITEM_INVALID_QUANTITY } from './ItemErrors.domain-entity';
import { ItemBasket } from './ItemBasket.domain-entity';
import { Basket } from '@domain/aggregates-root';
import { BasketCategory } from '../basket-category/BasketCategory.domain-entity';
import { ItemId } from './ItemId.domain-entity';
import { Currency } from '@domain/value-objects/monetary/Currency.value-object';

describe('ItemBasket.domain-entity', () => {
  it('Should create a valid ItemBasket', () => {
    const itemCreated = ItemBasket.create({
      item: Basket.create({
        isActive: true,
        category: BasketCategory.create({
          changesLimit: 2,
          description: 'valid',
        }).getResult(),
        description: 'valid',
        images: [],
        price: MonetaryValueObject.create(
          Currency.create({
            locale: 'pt-BR',
            symbol: 'BRL',
            value: 10,
          }).getResult(),
        ).getResult(),
      }).getResult(),
      orderId: new UniqueEntityID(),
      quantity: 1,
      total: MonetaryValueObject.create(
        Currency.create({
          locale: 'pt-BR',
          symbol: 'BRL',
          value: 99,
        }).getResult(),
      ).getResult(),
    });

    expect(itemCreated.isFailure).toBe(false);
    expect(itemCreated.getResult().item).toBeDefined();
    expect(itemCreated.getResult().quantity).toBe(1);
    expect(itemCreated.getResult().total.value).toBe(99);
    expect(itemCreated.getResult().orderId).toBeDefined();
  });

  it('Should fail if provide a negative number', () => {
    const itemCreated = ItemBasket.create({
      item: Basket.create({
        isActive: true,
        category: BasketCategory.create({
          changesLimit: 2,
          description: 'valid',
        }).getResult(),
        description: 'valid',
        images: [],
        price: MonetaryValueObject.create(
          Currency.create({
            locale: 'pt-BR',
            symbol: 'BRL',
            value: 10,
          }).getResult(),
        ).getResult(),
      }).getResult(),
      orderId: new UniqueEntityID(),
      quantity: -10,
      total: MonetaryValueObject.create(
        Currency.create({
          locale: 'pt-BR',
          symbol: 'BRL',
          value: 99,
        }).getResult(),
      ).getResult(),
    });

    expect(itemCreated.isFailure).toBe(true);
    expect(itemCreated.error).toBe(ERROR_ITEM_INVALID_QUANTITY);
  });

  it('Should create a valid ItemBasket with provided id', () => {
    const providedId = ItemId.create().id;

    const itemCreated = ItemBasket.create(
      {
        item: Basket.create({
          isActive: true,
          category: BasketCategory.create({
            changesLimit: 2,
            description: 'valid',
          }).getResult(),
          description: 'valid',
          images: [],
          price: MonetaryValueObject.create(
            Currency.create({
              locale: 'pt-BR',
              symbol: 'BRL',
              value: 10,
            }).getResult(),
          ).getResult(),
        }).getResult(),
        orderId: new UniqueEntityID(),
        quantity: 1,
        total: MonetaryValueObject.create(
          Currency.create({
            locale: 'pt-BR',
            symbol: 'BRL',
            value: 99,
          }).getResult(),
        ).getResult(),
      },
      providedId,
    );

    expect(itemCreated.isFailure).toBe(false);
    expect(itemCreated.getResult().id.toString()).toBe(providedId.toString());
  });
});
