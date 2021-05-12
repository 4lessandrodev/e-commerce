import { Basket as Aggregate, ProductId } from '@domain/aggregates-root';
import { UniqueEntityID } from 'types-ddd';
import { BasketCategory, CommentId, Tag } from '@domain/entities';
import { Basket as Schema } from '../entities/basket.schema';
import {
  BasketItemValueObject,
  Currency,
  ImageValueObject,
  MonetaryValueObject,
} from '@domain/value-objects';
import { BasketMapper } from './basket.mapper';
import { BasketItemMapper } from './basket-item.mapper';
import { TagMapper } from '../../product/mapper/tag.mapper';
import { CategoryMapper } from './category.mapper';

describe('basket.mapper', () => {
  //
  const categoryMapper = new CategoryMapper();
  const itemMapper = new BasketItemMapper();
  const tagMapper = new TagMapper();
  //
  const currentDate = new Date();
  const domain: Aggregate = Aggregate.create(
    {
      category: BasketCategory.create(
        {
          changesLimit: 2,
          description: 'valid_description',
        },
        new UniqueEntityID('valid_id'),
      ).getResult(),
      description: 'valid_description',
      isActive: true,
      price: MonetaryValueObject.create(
        Currency.create({
          locale: 'pt-BR',
          symbol: 'BRL',
          value: 10,
        }).getResult(),
      ).getResult(),
      comments: [CommentId.create(new UniqueEntityID('valid_id'))],
      images: [
        ImageValueObject.create(
          'https://username.s3.amazonaws.com/image.png',
        ).getResult(),
      ],
      info: 'valid_info',
      items: [
        BasketItemValueObject.create({
          description: 'valid_description',
          exchangeFactor: 2,
          productId: ProductId.create(new UniqueEntityID('valid_id')),
          quantity: 7,
        }).getResult(),
      ],
      numberOfRatings: 3,
      ratingAverage: 2,
      tags: [
        Tag.create(
          {
            description: 'valid_description',
          },
          new UniqueEntityID('valid_id'),
        ).getResult(),
      ],
      createdAt: currentDate,
      updatedAt: currentDate,
    },
    new UniqueEntityID('valid_id'),
  ).getResult();
  //
  const persistence: Schema = {
    id: 'valid_id',
    category: {
      id: 'valid_id',
      changesLimit: 2,
      description: 'valid_description',
    },
    description: 'valid_description',
    isActive: true,
    price: {
      locale: 'pt-BR',
      symbol: 'BRL',
      value: 10,
    },
    comments: ['valid_id'],
    images: ['https://username.s3.amazonaws.com/image.png'],
    info: 'valid_info',
    items: [
      {
        description: 'valid_description',
        exchangeFactor: 2,
        productId: 'valid_id',
        quantity: 7,
      },
    ],
    numberOfRatings: 3,
    ratingAverage: 2,
    tags: [
      {
        description: 'valid_description',
        id: 'valid_id',
      },
    ],
    createdAt: currentDate,
    updatedAt: currentDate,
  };
  //
  it('should be defined', () => {
    const mapper = new BasketMapper(categoryMapper, itemMapper, tagMapper);
    expect(mapper).toBeDefined();
  });

  it('should convert from persistence to domain', () => {
    const mapper = new BasketMapper(categoryMapper, itemMapper, tagMapper);
    const result = mapper.toDomain(persistence);
    expect(result).toEqual(domain);
  });

  it('should convert from domain to persistence', () => {
    const mapper = new BasketMapper(categoryMapper, itemMapper, tagMapper);
    const result = mapper.toPersistence(domain);
    expect(result).toEqual(persistence);
  });
});
