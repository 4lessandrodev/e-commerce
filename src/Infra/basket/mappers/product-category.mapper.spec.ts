import { BasketCategory as Aggregate } from '@domain/entities';
import { UniqueEntityID } from 'types-ddd/dist/src';
import { BasketCategoryMapper } from './product-category.mapper';
import { BasketCategory } from '../entities/basket-category.schema';

describe('basket-category.mapper', () => {
  //
  let domain: Aggregate;
  let persistence: BasketCategory;
  //
  beforeAll(() => {
    domain = Aggregate.create(
      {
        description: 'valid_description',
        changesLimit: 2,
      },
      new UniqueEntityID('valid_id'),
    ).getResult();
    persistence = {
      id: 'valid_id',
      description: 'valid_description',
      changesLimit: 2,
    };
  });
  //
  it('should be defined', () => {
    const mapper = new BasketCategoryMapper();
    expect(mapper).toBeDefined();
  });

  it('should convert from domain to persistence ', () => {
    const mapper = new BasketCategoryMapper();
    const result = mapper.toPersistence(domain);
    expect(result).toEqual(persistence);
  });

  it('should convert from persistence to domain ', () => {
    const mapper = new BasketCategoryMapper();
    const result = mapper.toDomain(persistence);
    expect(result).toEqual(domain);
  });
});
