import { IMapper, UniqueEntityID } from 'types-ddd';
import { Tag as Aggregate } from '@domain/entities';
import { ProductTag as Schema } from '../entities/product-tag.schema';

export class ProductTagMapper implements IMapper<Aggregate, Schema> {
  toDomain(target: Schema): Aggregate {
    return Aggregate.create(
      {
        description: target.description,
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
      createdAt: target.createdAt,
      updatedAt: target.updatedAt,
    };
  }
}
