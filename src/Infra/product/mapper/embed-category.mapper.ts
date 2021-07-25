import { IMapper, UniqueEntityID } from 'types-ddd';
import { ProductCategory as Aggregate } from '@domain/entities';
import { Category as Schema } from '../entities/category.schema';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmbedProductCategoryMapper implements IMapper<Aggregate, Schema> {
	//
	toDomain(target: Schema): Aggregate {
		return Aggregate.create(
			{
				description: target.description
			},
			new UniqueEntityID(target.id)
		).getResult();
	}

	//
	toPersistence(target: Aggregate): Schema {
		return {
			id: target.id.toString(),
			description: target.description
		};
	}
	//
}
