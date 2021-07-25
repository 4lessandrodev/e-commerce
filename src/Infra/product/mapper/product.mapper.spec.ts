import { UnitOfMeasurementValueObject } from '@domain/value-objects/unit-of-measurement/unit-of-measurement.value-objects';
import { Product as Aggregate } from '@domain/aggregates-root';
import { Product as Schema } from '@infra/product/entities/product.schema';
import { UniqueEntityID } from 'types-ddd';
import { CommentId, ProductCategory, Tag } from '@domain/entities';
import {
	Currency,
	ImageValueObject,
	MonetaryValueObject,
	ProductDescriptionValueObject,
	QuantityAvailableValueObject,
	ProductInfoValueObject,
	ExchangeFactorValueObject
} from '@domain/value-objects';

import { ProductMapper } from './product.mapper';
import { EmbedProductCategoryMapper } from './embed-category.mapper';
import { TagMapper } from '@infra/product/mapper/tag.mapper';

describe('product.mapper', () => {
	//
	const currentDate = new Date();
	let domain: Aggregate;
	let persistence: Schema;
	//
	beforeEach(() => {
		domain = Aggregate.create(
			{
				description:
					ProductDescriptionValueObject.create(
						'valid_description'
					).getResult(),
				exchangeFactor: ExchangeFactorValueObject.create(1).getResult(),
				unitOfMeasurement:
					UnitOfMeasurementValueObject.create('UN').getResult(),
				category: ProductCategory.create(
					{
						description: 'valid_description'
					},
					new UniqueEntityID('valid_id')
				).getResult(),
				info: ProductInfoValueObject.create('valid_info').getResult(),
				isActive: true,
				isSpecial: false,
				numberOfRatings: 10,
				ratingAverage: 8,
				commentIds: [
					CommentId.create(new UniqueEntityID('valid_id')),
					CommentId.create(new UniqueEntityID('valid_id'))
				],
				tags: [
					Tag.create(
						{ description: 'valid_description' },
						new UniqueEntityID('valid_id')
					).getResult(),
					Tag.create(
						{ description: 'valid_description' },
						new UniqueEntityID('valid_id')
					).getResult()
				],
				price: MonetaryValueObject.create(
					Currency.create(100).getResult()
				).getResult(),
				quantityAvailable:
					QuantityAvailableValueObject.create(10).getResult(),
				image: ImageValueObject.create(
					'https://aws.s3.bucket/OIPOUERT.589ASD89/image.jpeg'
				).getResult(),
				createdAt: currentDate,
				updatedAt: currentDate
			},
			new UniqueEntityID('valid_id')
		).getResult();
		//
		persistence = {
			id: 'valid_id',
			description: 'valid_description',
			exchangeFactor: 1,
			unitOfMeasurement: 'UN',
			category: {
				id: 'valid_id',
				description: 'valid_description'
			},
			isActive: true,
			isSpecial: false,
			numberOfRatings: 10,
			price: {
				locale: 'pt-BR',
				symbol: 'BRL',
				value: 100
			},
			quantityAvailable: 10,
			ratingAverage: 8,
			comments: ['valid_id', 'valid_id'],
			image: 'https://aws.s3.bucket/OIPOUERT.589ASD89/image.jpeg',
			info: 'valid_info',
			tags: [
				{
					id: 'valid_id',
					description: 'valid_description'
				},
				{
					id: 'valid_id',
					description: 'valid_description'
				}
			],
			createdAt: currentDate,
			updatedAt: currentDate
		};
	});
	//
	it('should be defined', () => {
		const categoryMapper = new EmbedProductCategoryMapper();
		const productTagMapper = new TagMapper();
		const mapper = new ProductMapper(categoryMapper, productTagMapper);
		expect(mapper).toBeDefined();
	});

	it('should convert from domain to persistence', () => {
		const categoryMapper = new EmbedProductCategoryMapper();
		const productTagMapper = new TagMapper();
		const mapper = new ProductMapper(categoryMapper, productTagMapper);
		const result = mapper.toPersistence(domain);
		expect(result).toEqual(persistence);
	});

	it('should convert from persistence to domain', () => {
		const categoryMapper = new EmbedProductCategoryMapper();
		const productTagMapper = new TagMapper();
		const mapper = new ProductMapper(categoryMapper, productTagMapper);
		const result = mapper.toDomain(persistence);
		expect(result).toEqual(domain);
	});
});
