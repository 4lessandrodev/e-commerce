import { BasketCategory as Aggregate } from '@domain/entities';
import { UniqueEntityID } from 'types-ddd';
import { EmbedBasketCategoryMapper } from './embed-category.mapper';
import { Category } from '../entities/category.schema';
import { ChangesLimitValueObject } from '@domain/value-objects';

describe('basket-category.mapper', () => {
  //

  let domain: Aggregate;
  let persistence: Category;
  //
  beforeAll(() => {
    domain = Aggregate.create(
      {
        description: 'valid_description',
        changesLimit: ChangesLimitValueObject.create(2).getResult(),
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
    const mapper = new EmbedBasketCategoryMapper();
    expect(mapper).toBeDefined();
  });

  it('should convert from domain to persistence ', () => {
    const mapper = new EmbedBasketCategoryMapper();
    const result = mapper.toPersistence(domain);
    expect(result).toEqual(persistence);
  });

  it('should convert from persistence to domain ', () => {
    const mapper = new EmbedBasketCategoryMapper();
    const result = mapper.toDomain(persistence);
    expect(result).toEqual(domain);
  });
});
