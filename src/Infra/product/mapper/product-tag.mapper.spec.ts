import { Tag } from '@domain/entities';
import { UniqueEntityID } from 'types-ddd/dist/src';
import { ProductTag } from '../entities/product-tag.schema';
import { ProductTagMapper } from './product-tag.mapper';

describe('product-tag.mapper', () => {
  //
  let persistence: ProductTag;
  let domain: Tag;
  const currentDate = new Date();
  //
  beforeAll(() => {
    persistence = {
      id: 'valid_id',
      description: 'valid_description',
      createdAt: currentDate,
      updatedAt: currentDate,
    };
    domain = Tag.create(
      {
        description: 'valid_description',
        createdAt: currentDate,
        updatedAt: currentDate,
      },
      new UniqueEntityID('valid_id'),
    ).getResult();
  });
  //
  it('should be defined', () => {
    const mapper = new ProductTagMapper();
    expect(mapper).toBeDefined();
  });

  it('should convert from persistence to domain', () => {
    const mapper = new ProductTagMapper();
    const result = mapper.toDomain(persistence);
    expect(result).toEqual(domain);
  });

  it('should convert from domain to persistence', () => {
    const mapper = new ProductTagMapper();
    const result = mapper.toPersistence(domain);
    expect(result).toEqual(persistence);
  });
});
