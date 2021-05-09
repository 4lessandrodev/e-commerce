import { Tag as Aggregate } from '@domain/entities';
import { UniqueEntityID } from 'types-ddd/dist/src';
import { Tag as Schema } from '../entities/tag.schema';
import { TagMapper } from './tag.mapper';

describe('tag', () => {
  //
  let domain: Aggregate;
  let persistence: Schema;
  //
  beforeAll(() => {
    //
    domain = Aggregate.create(
      {
        description: 'valid_description',
      },
      new UniqueEntityID('valid_id'),
    ).getResult();
    //
    persistence = {
      id: 'valid_id',
      description: 'valid_description',
    };
  });
  //
  it('should tag', () => {
    const mapper = new TagMapper();
    expect(mapper).toBeDefined();
  });

  it('should convert from persistence to domain', () => {
    const mapper = new TagMapper();
    const result = mapper.toDomain(persistence);
    expect(result).toEqual(domain);
  });

  it('should convert from domain to persistence', () => {
    const mapper = new TagMapper();
    const result = mapper.toPersistence(domain);
    expect(result).toEqual(persistence);
  });
});
