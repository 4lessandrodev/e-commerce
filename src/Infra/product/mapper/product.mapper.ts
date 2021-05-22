import { IMapper, UniqueEntityID } from 'types-ddd';
import { UnitOfMeasurementValueObject } from '@domain/value-objects/unit-of-measurement/unit-of-measurement.value-objects';
import { Product as Aggregate } from '@domain/aggregates-root';
import { Product as Schema } from '@infra/product/entities/product.schema';
import { CommentId } from '@domain/entities';
import { Inject, Injectable } from '@nestjs/common';
import { EmbedProductCategoryMapper } from './embed-category.mapper';
import { TagMapper } from '@infra/product/mapper/tag.mapper';
import { ProductInfoValueObject } from '@domain/value-objects';
import { QuantityAvailableValueObject } from '@domain/value-objects';
import { ExchangeFactorValueObject } from '@domain/value-objects';
import { MonetaryValueObject, ImageValueObject } from '@domain/value-objects';
import { Currency, ProductDescriptionValueObject } from '@domain/value-objects';

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
        description: ProductDescriptionValueObject.create(
          target.description,
        ).getResult(),
        exchangeFactor: ExchangeFactorValueObject.create(
          target.exchangeFactor,
        ).getResult(),
        unitOfMeasurement: UnitOfMeasurementValueObject.create(
          target.unitOfMeasurement,
        ).getResult(),
        category: this.categoryMapper.toDomain(target.category),
        info: target.info
          ? ProductInfoValueObject.create(target.info).getResult()
          : undefined,
        isActive: target.isActive,
        isSpecial: target.isSpecial,
        numberOfRatings: target.numberOfRatings,
        ratingAverage: target.ratingAverage,
        commentIds: target.comments?.map((id) =>
          CommentId.create(new UniqueEntityID(id)),
        ),
        tags: target.tags?.map(this.tagMapper.toDomain),
        price: MonetaryValueObject.create(
          Currency.create(target.price.value).getResult(),
        ).getResult(),
        quantityAvailable: QuantityAvailableValueObject.create(
          target.quantityAvailable,
        ).getResult(),
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
      description: target.description.value,
      exchangeFactor: target.exchangeFactor.value,
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
      quantityAvailable: target.quantityAvailable.value,
      ratingAverage: target.ratingAverage,
      comments: target.comments.map(({ id }) => id.toString()),
      image: target.image?.value,
      info: target.info?.value,
      tags: target.tags.map(this.tagMapper.toPersistence),
      createdAt: target.createdAt,
      updatedAt: target.updatedAt,
    };
  }
}
