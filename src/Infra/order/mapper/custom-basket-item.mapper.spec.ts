import { BasketCategory, CustomBasket } from '@domain/entities';
import { BasketId } from '@domain/aggregates-root';
import {
  BasketDescriptionValueObject,
  ChangesLimitValueObject,
  Currency,
  MonetaryValueObject,
  QuantityAvailableValueObject,
} from '@domain/value-objects';
import { BasketItemMapper } from '../../basket/mappers/basket-item.mapper';
import { CustomBasketMapper } from './custom-basket.mapper';
import { CustomBasket as Schema } from '../entities/order-custom-basket.schema';
import { UniqueEntityID } from 'types-ddd/dist/src';
describe('custom-basket-item.mapper', () => {
  const domain: CustomBasket = CustomBasket.create(
    {
      basketId: BasketId.create(new UniqueEntityID('valid_basket_id')),
      category: BasketCategory.create({
        description: 'valid_description',
        changesLimit: ChangesLimitValueObject.create(1).getResult(),
      }).getResult(),
      currentItems: [],
      description:
        BasketDescriptionValueObject.create('valid_description').getResult(),
      itemsAdded: [],
      itemsRemoved: [],
      quantity: QuantityAvailableValueObject.create(20).getResult(),
      price: MonetaryValueObject.create(
        Currency.create(10).getResult(),
      ).getResult(),
      image: undefined,
      isDraft: true,
    },
    new UniqueEntityID('valid_id'),
  ).getResult();

  const persistence: Schema = {
    basketId: 'valid_basket_id',
    category: {
      changesLimit: 1,
      description: 'valid_description',
    },
    changesLimitAvailable: 1,
    description: 'valid_description',
    exchangesFactorAvailable: 0,
    id: 'valid_id',
    isDraft: true,
    items: [],
    itemsAdded: [],
    itemsRemoved: [],
    price: {
      locale: 'pt-BR',
      symbol: 'BRL',
      value: 10,
    },
    quantity: 20,
    image: undefined,
  };

  const itemMapper = new BasketItemMapper();
  const customBasketMapper = new CustomBasketMapper(itemMapper);

  it('should be defined', () => {
    expect(itemMapper).toBeDefined();
    expect(customBasketMapper).toBeDefined();
  });

  it('should convert from domain to persistence', () => {
    const result = customBasketMapper.toPersistence(domain);
    expect(result).toEqual(persistence);
  });

  it('should convert from persistence to domain', () => {
    const result = customBasketMapper.toPersistence(domain);
    expect(result).toEqual(persistence);
  });
});
