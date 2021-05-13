import { IMapper, UniqueEntityID } from 'types-ddd';
import { BasketCategory as Aggregate } from '@domain/entities';
import { Category as Schema } from '../entities/category.schema';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmbedBasketCategoryMapper implements IMapper<Aggregate, Schema> {
  //
  toDomain(target: Schema): Aggregate {
    return Aggregate.create(
      {
        description: target.description,
        changesLimit: target.changesLimit,
      },
      new UniqueEntityID(target.id),
    ).getResult();
  }
  //
  toPersistence(target: Aggregate): Schema {
    return {
      id: target.id.toString(),
      description: target.description,
      changesLimit: target.changesLimit,
    };
  }
  //
}
