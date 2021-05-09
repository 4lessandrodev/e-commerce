import { IMapper, UniqueEntityID } from 'types-ddd';
import { Tag as Aggregate } from '@domain/entities';
import { Tag as Schema } from '../entities/tag.schema';

export class TagMapper implements IMapper<Aggregate, Schema> {
  toDomain(target: Schema): Aggregate {
    return Aggregate.create(
      {
        description: target.description,
      },
      new UniqueEntityID(target.id),
    ).getResult();
  }
  //
  toPersistence(target: Aggregate): Schema {
    return {
      id: target.id.toString(),
      description: target.description,
    };
  }
}
