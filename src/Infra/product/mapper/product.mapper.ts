import { IMapper, UniqueEntityID } from 'types-ddd';
import { UnitOfMeasurementValueObject } from '@domain/value-objects/unit-of-measurement/UnitOfMeasurement.value-objects';
import { Product as Aggregate } from '@domain/aggregates-root';
import { Product as Schema } from '@infra/product/entities/product.schema';
import { CommentId } from '@domain/entities';
import { Inject, Injectable } from '@nestjs/common';
import { EmbedProductCategoryMapper } from './embed-category.mapper';
import { TagMapper } from '@infra/product/mapper/tag.mapper';
import {
  Currency,
  ImageValueObject,
  MonetaryValueObject,
} from '@domain/value-objects';

@Injectable()
export class ProductMapper implements IMapper<Aggregate, Schema> {
  //
  constructor(
    @Inject(EmbedProductCategoryMapper)
    private readonly categoryMapper: EmbedProductCategoryMapper,
    @Inject(TagMapper)
    private readonly tagMapper: TagMapper,
  ) {}
  //
  toDomain(target: Schema): Aggregate {
    return Aggregate.create(
      {
        description: target.description,
        exchangeFactor: target.exchangeFactor,
        unitOfMeasurement: UnitOfMeasurementValueObject.create(
          target.unitOfMeasurement,
        ).getResult(),
        category: this.categoryMapper.toDomain(target.category),
        info: target.info,
        isActive: target.isActive,
        isSpecial: target.isSpecial,
        numberOfRatings: target.numberOfRatings,
        ratingAverage: target.ratingAverage,
        commentIds: target.comments?.map((id) =>
          CommentId.create(new UniqueEntityID(id)),
        ),
        tags: target.tags?.map(this.tagMapper.toDomain),
        price: MonetaryValueObject.create(
          Currency.create(target.price).getResult(),
        ).getResult(),
        quantityAvailable: target.quantityAvailable,
        image: target.image
          ? ImageValueObject.create(target.image).getResult()
          : undefined,
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
      description: target.description,
      exchangeFactor: target.exchangeFactor,
      unitOfMeasurement: target.unitOfMeasurement.value,
      category: this.categoryMapper.toPersistence(target.category),
      isActive: target.isActive,
      isSpecial: target.isSpecial,
      numberOfRatings: target.numberOfRatings,
      price: {
        locale: target.price.currency.locale,
        symbol: target.price.currency.symbol,
        value: target.price.currency.value,
      },
      quantityAvailable: target.quantityAvailable,
      ratingAverage: target.ratingAverage,
      comments: target.comments.map(({ id }) => id.toString()),
      image: target.image?.value,
      info: target.info,
      tags: target.tags.map(this.tagMapper.toPersistence),
      createdAt: target.createdAt,
      updatedAt: target.updatedAt,
    };
  }
}
