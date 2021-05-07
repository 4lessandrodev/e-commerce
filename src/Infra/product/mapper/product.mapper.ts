import { IMapper, UniqueEntityID } from 'types-ddd';
import { UnitOfMeasurementValueObject } from '@domain/value-objects/unit-of-measurement/UnitOfMeasurement.value-objects';
import { Product as Aggregate } from '@domain/aggregates-root';
import { Product as Schema } from '@infra/product/entities/product.schema';
import { CommentId } from '@domain/entities';
import { Inject } from '@nestjs/common';
import { ProductCategoryMapper } from './product-category.mapper';
import { ProductTagMapper } from '@infra/product/mapper/product-tag.mapper';
import {
  Currency,
  ImageValueObject,
  MonetaryValueObject,
} from '@domain/value-objects';

export class ProductMapper implements IMapper<Aggregate, Schema> {
  //
  constructor(
    @Inject(ProductCategoryMapper)
    private readonly productCategoryMapper: ProductCategoryMapper,
    @Inject(ProductTagMapper)
    private readonly productTagMapper: ProductTagMapper,
  ) {}
  //
  toDomain(target: Schema): Aggregate {
    return Aggregate.create(
      {
        description: target.description,
        unitOfMeasurement: UnitOfMeasurementValueObject.create(
          target.unitOfMeasurement,
        ).getResult(),
        category: this.productCategoryMapper.toDomain(target.category),
        info: target.info,
        isActive: target.isActive,
        isSpecial: target.isSpecial,
        numberOfRatings: target.numberOfRatings,
        ratingAverage: target.ratingAverage,
        commentIds: target.comments?.map((id) =>
          CommentId.create(new UniqueEntityID(id)),
        ),
        tags: target.tags?.map(this.productTagMapper.toDomain),
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
      unitOfMeasurement: target.unitOfMeasurement.value,
      category: this.productCategoryMapper.toPersistence(target.category),
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
      tags: target.tags.map(this.productTagMapper.toPersistence),
      createdAt: target.createdAt,
      updatedAt: target.updatedAt,
    };
  }
}
