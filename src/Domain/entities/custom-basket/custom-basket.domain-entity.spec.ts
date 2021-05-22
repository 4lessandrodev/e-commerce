import { BasketId, ProductId } from '@domain/aggregates-root';
import {
  BasketDescriptionValueObject,
  BasketItemValueObject,
  ChangesLimitValueObject,
  Currency,
  ExchangeFactorValueObject,
  MonetaryValueObject,
  ProductDescriptionValueObject,
  QuantityAvailableValueObject,
  UnitOfMeasurementValueObject,
} from '@domain/value-objects';
import { BasketCategory } from '../basket-category/basketCategory.domain-entity';
import { CustomBasket } from './custom-basket.domain-entity';

describe('custom-basket.domain-entity', () => {
  let item: BasketItemValueObject;

  beforeAll(() => {
    item = BasketItemValueObject.create({
      availableStock: QuantityAvailableValueObject.create(20).getResult(),
      description:
        ProductDescriptionValueObject.create('valid_description').getResult(),
      exchangeFactor: ExchangeFactorValueObject.create(2).getResult(),
      productId: ProductId.create(),
      quantity: QuantityAvailableValueObject.create(1).getResult(),
      unitOfMeasurement: UnitOfMeasurementValueObject.create('CX').getResult(),
    }).getResult();
  });

  it('should be defined', () => {
    const customBasket = CustomBasket.create({
      basketId: BasketId.create(),
      category: BasketCategory.create({
        description: 'valid_description',
        changesLimit: ChangesLimitValueObject.create(1).getResult(),
      }).getResult(),
      currentItems: [],
      description:
        BasketDescriptionValueObject.create('valid_description').getResult(),
      itemsAdded: [],
      itemsRemoved: [],
      quantity: QuantityAvailableValueObject.create(2).getResult(),
      price: MonetaryValueObject.create(
        Currency.create(10).getResult(),
      ).getResult(),
      image: undefined,
    });

    expect(customBasket.getResult()).toBeDefined();
  });

  it('should calculate available changes limit', () => {
    const customBasket = CustomBasket.create({
      basketId: BasketId.create(),
      category: BasketCategory.create({
        description: 'valid_description',
        changesLimit: ChangesLimitValueObject.create(5).getResult(),
      }).getResult(),
      currentItems: [],
      description:
        BasketDescriptionValueObject.create('valid_description').getResult(),
      itemsAdded: [item, item, item],
      itemsRemoved: [],
      quantity: QuantityAvailableValueObject.create(2).getResult(),
      price: MonetaryValueObject.create(
        Currency.create(10).getResult(),
      ).getResult(),
      image: undefined,
    }).getResult();

    expect(customBasket.changesLimitAvailable).toBe(2);
  });

  it('should calculate available exchange factor', () => {
    const customBasket = CustomBasket.create({
      basketId: BasketId.create(),
      category: BasketCategory.create({
        description: 'valid_description',
        changesLimit: ChangesLimitValueObject.create(5).getResult(),
      }).getResult(),
      currentItems: [],
      description:
        BasketDescriptionValueObject.create('valid_description').getResult(),
      itemsAdded: [],
      itemsRemoved: [item, item, item],
      quantity: QuantityAvailableValueObject.create(2).getResult(),
      price: MonetaryValueObject.create(
        Currency.create(10).getResult(),
      ).getResult(),
      image: undefined,
    }).getResult();

    expect(customBasket.exchangesFactorAvailable).toBe(6);
  });

  it('should calculate available exchange factor', () => {
    const customBasket = CustomBasket.create({
      basketId: BasketId.create(),
      category: BasketCategory.create({
        description: 'valid_description',
        changesLimit: ChangesLimitValueObject.create(5).getResult(),
      }).getResult(),
      currentItems: [],
      description:
        BasketDescriptionValueObject.create('valid_description').getResult(),
      itemsAdded: [item],
      itemsRemoved: [item, item, item],
      quantity: QuantityAvailableValueObject.create(2).getResult(),
      price: MonetaryValueObject.create(
        Currency.create(10).getResult(),
      ).getResult(),
      image: undefined,
    }).getResult();

    expect(customBasket.exchangesFactorAvailable).toBe(4);
  });

  it('should calculate available exchange factor', () => {
    const customBasket = CustomBasket.create({
      basketId: BasketId.create(),
      category: BasketCategory.create({
        description: 'valid_description',
        changesLimit: ChangesLimitValueObject.create(5).getResult(),
      }).getResult(),
      currentItems: [],
      description:
        BasketDescriptionValueObject.create('valid_description').getResult(),
      itemsAdded: [],
      itemsRemoved: [],
      quantity: QuantityAvailableValueObject.create(2).getResult(),
      price: MonetaryValueObject.create(
        Currency.create(10).getResult(),
      ).getResult(),
      image: undefined,
    }).getResult();

    expect(customBasket.exchangesFactorAvailable).toBe(0);
  });
});
