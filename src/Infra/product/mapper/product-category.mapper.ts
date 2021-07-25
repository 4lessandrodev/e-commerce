import { IMapper, UniqueEntityID } from 'types-ddd';
import { ProductCategory as Aggregate } from '@domain/entities';
import { ProductCategory } from '../entities/product-category.schema';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductCategoryMapper
	implements IMapper<Aggregate, ProductCategory>
{
	//
	toDomain(target: ProductCategory): Aggregate {
		return Aggregate.create(
			{
				description: target.description,
				createdAt: target.createdAt,
				updatedAt: target.updatedAt
			},
			new UniqueEntityID(target.id)
		).getResult();
	}

	//
	toPersistence(target: Aggregate): ProductCategory {
		return {
			id: target.id.toString(),
			description: target.description,
			createdAt: target.createdAt,
			updatedAt: target.updatedAt
		};
	}
	//
}
