import { ProductCategory as Aggregate } from '@domain/entities';
import { UniqueEntityID } from 'types-ddd/dist/src';
import { ProductCategoryMapper } from './product-category.mapper';
import { ProductCategory } from '../entities/product-category.schema';

describe('product-category.mapper', () => {
  //
  let domain: Aggregate;
  let persistence: ProductCategory;
  const currentDate = new Date();
  //
  beforeAll(() => {
    domain = Aggregate.create(
      {
        description: 'valid_description',
        createdAt: currentDate,
        updatedAt: currentDate,
      },
      new UniqueEntityID('valid_id'),
    ).getResult();
    persistence = {
      id: 'valid_id',
      description: 'valid_description',
      createdAt: currentDate,
      updatedAt: currentDate,
    };
  });
  //
  it('should be defined', () => {
    const mapper = new ProductCategoryMapper();
    expect(mapper).toBeDefined();
  });

  it('should convert from domain to persistence ', () => {
    const mapper = new ProductCategoryMapper();
    const result = mapper.toPersistence(domain);
    expect(result).toEqual(persistence);
  });

  it('should convert from persistence to domain ', () => {
    const mapper = new ProductCategoryMapper();
    const result = mapper.toDomain(persistence);
    expect(result).toEqual(domain);
  });
});
