import { IMapper, UniqueEntityID } from 'types-ddd';
import { Basket as Aggregate } from '@domain/aggregates-root';
import { Basket as Schema } from '../entities/basket.schema';
import { Inject, Injectable } from '@nestjs/common';
import { EmbedBasketCategoryMapper } from './embed-category.mapper';
import { BasketItemMapper } from './basket-item.mapper';
import { TagMapper } from '@infra/product/mapper/tag.mapper';
import {
  BasketDescriptionValueObject,
  BasketInfoValueObject,
  Currency,
  ImageValueObject,
  MonetaryValueObject,
} from '@domain/value-objects';
import { CommentId } from '@domain/entities';

@Injectable()
export class BasketMapper implements IMapper<Aggregate, Schema> {
  constructor(
    @Inject(EmbedBasketCategoryMapper)
    private readonly categoryMapper: EmbedBasketCategoryMapper,
    @Inject(BasketItemMapper) private readonly itemMapper: BasketItemMapper,
    @Inject(TagMapper) private readonly tagMapper: TagMapper,
  ) {}
  toDomain(target: Schema): Aggregate {
    return Aggregate.create(
      {
        category: this.categoryMapper.toDomain(target.category),
        description: BasketDescriptionValueObject.create(
          target.description,
        ).getResult(),
        isActive: target.isActive,
        price: MonetaryValueObject.create(
          Currency.create(target.price.value).getResult(),
        ).getResult(),
        comments: target.comments?.map((id) =>
          CommentId.create(new UniqueEntityID(id)),
        ),
        images: target.images?.map((url) =>
          ImageValueObject.create(url).getResult(),
        ),
        info: target.info
          ? BasketInfoValueObject.create(target.info).getResult()
          : undefined,
        items: target.items?.map(this.itemMapper.toDomain),
        numberOfRatings: target.numberOfRatings,
        ratingAverage: target.ratingAverage,
        tags: target.tags?.map(this.tagMapper.toDomain),
        createdAt: target.createdAt,
        updatedAt: target.updatedAt,
      },
      new UniqueEntityID(target.id),
    ).getResult();
  }
  //
  toPersistence(target: Aggregate): Schema {
    return {
      id: target.id.toString(),
      category: this.categoryMapper.toPersistence(target.category),
      description: target.description.value,
      isActive: target.isActive,
      price: {
        locale: target.price.currency.locale,
        symbol: target.price.currency.symbol,
        value: target.price.currency.value,
      },
      comments: target.comments.map(({ id }) => id.toString()),
      images: target.images.map((img) => img.value),
      info: target.info?.value,
      items: target.products.map(this.itemMapper.toPersistence),
      numberOfRatings: target.numberOfRatings,
      ratingAverage: target.ratingAverage,
      tags: target.tags.map(this.tagMapper.toPersistence),
      createdAt: target.createdAt,
      updatedAt: target.updatedAt,
    };
  }
}
