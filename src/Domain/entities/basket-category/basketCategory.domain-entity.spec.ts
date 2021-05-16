import { BasketCategory } from './basketCategory.domain-entity';
import {
  ERROR_BASKET_CATEGORY_DESCRIPTION_LENGTH,
  ERROR_BASKET_CATEGORY_MAX_VALUE,
} from './basket-category-errors.domain-entity';
import delay from 'delay';
import { UniqueEntityID } from 'types-ddd';
import { BasketCategoryId } from './basket-category-id.domain-entity';
import { BasketCategoryProps } from './basketCategory.domain-entity-interface';
import { random } from 'faker';

describe('BasketCategory', () => {
  const makeSut = (props?: BasketCategoryProps, id?: UniqueEntityID) => {
    return BasketCategory.create(
      {
        description: props?.description ?? 'Valid Category',
        isDeleted: props?.isDeleted ?? undefined,
        changesLimit: props?.changesLimit ?? 1,
      },
      id,
    );
  };

  it('Should create a valid Basket Category', () => {
    const BasketCategoryResult = makeSut({
      changesLimit: 1,
      description: 'Valid Category',
    }).getResult();
    expect(BasketCategoryResult.description).toBe('valid category');
    expect(BasketCategoryResult.changesLimit).toBe(1);
    expect(BasketCategoryResult.isDeleted).toBe(false);
  });

  it('Should create a valid Basket Category with one provided id', () => {
    const createdId = BasketCategoryId.create().id;
    const BasketCategoryResult = makeSut(
      {
        changesLimit: 1,
        description: 'Valid Category',
      },
      createdId,
    ).getResult();
    expect(BasketCategoryResult.description).toBe('valid category');
    expect(BasketCategoryResult.changesLimit).toBe(1);
    expect(BasketCategoryResult.isDeleted).toBe(false);
    expect(BasketCategoryResult.id.toString()).toBe(createdId.toString());
  });

  it('Should create a valid Basket Category converting a negative changesLimit in positive value', () => {
    const BasketCategoryResult = makeSut({
      changesLimit: -5,
      description: 'Valid Category',
    }).getResult();
    expect(BasketCategoryResult.description).toBe('valid category');
    expect(BasketCategoryResult.changesLimit).toBe(5);
    expect(BasketCategoryResult.isDeleted).toBe(false);
  });

  it('Should fail if provide a short description', () => {
    const BasketCategoryResult = makeSut({ description: 'a', changesLimit: 1 });
    expect(BasketCategoryResult.isFailure).toBe(true);
    expect(BasketCategoryResult.isSuccess).toBe(false);
    expect(BasketCategoryResult.error).toBe(
      ERROR_BASKET_CATEGORY_DESCRIPTION_LENGTH,
    );
  });

  it('Should fail if provide a long description', () => {
    const BasketCategoryResult = makeSut({
      description: 'this is a long description to fail the test',
      changesLimit: 1,
    });
    expect(BasketCategoryResult.isFailure).toBe(true);
    expect(BasketCategoryResult.isSuccess).toBe(false);
    expect(BasketCategoryResult.error).toBe(
      ERROR_BASKET_CATEGORY_DESCRIPTION_LENGTH,
    );
  });

  it('Should fail if provide a change limit greater than 20', () => {
    const BasketCategoryResult = makeSut({
      description: 'Valid Description',
      changesLimit: 21,
    });
    expect(BasketCategoryResult.isFailure).toBe(true);
    expect(BasketCategoryResult.isSuccess).toBe(false);
    expect(BasketCategoryResult.error).toBe(ERROR_BASKET_CATEGORY_MAX_VALUE);
  });

  it('Should create a not deleted entity', () => {
    const BasketCategoryResult = makeSut();
    expect(BasketCategoryResult.isFailure).toBe(false);
    expect(BasketCategoryResult.isSuccess).toBe(true);
    expect(BasketCategoryResult.getResult().isDeleted).toBe(false);
  });

  it('Should create a deleted entity', () => {
    const BasketCategoryResult = makeSut({
      description: 'Valid Category',
      isDeleted: true,
      changesLimit: 1,
    });
    expect(BasketCategoryResult.isFailure).toBe(false);
    expect(BasketCategoryResult.isSuccess).toBe(true);
    expect(BasketCategoryResult.getResult().isDeleted).toBe(true);
  });

  it('Should create a not deleted entity and delete after create and update event date to updatedAt', async () => {
    const BasketCategoryResult = makeSut().getResult();
    const dateUpdatedAtBeforeDelete =
      BasketCategoryResult.updatedAt.getMilliseconds();
    await delay(500);
    BasketCategoryResult.delete();
    expect(BasketCategoryResult.isDeleted).toBe(true);
    const dateUpdatedAtAfterDelete =
      BasketCategoryResult.updatedAt.getMilliseconds();
    expect(dateUpdatedAtAfterDelete).not.toEqual(dateUpdatedAtBeforeDelete);
  });

  it('Should convert to positive a negative value provided as changeLimit ', async () => {
    const category = makeSut({
      changesLimit: -7,
      description: 'Convert Negative',
    });
    expect(category.getResult().changesLimit).toBe(7);
  });

  it('Should fail if provide a change limit greater than 20 ', async () => {
    const category = makeSut({
      changesLimit: 21,
      description: 'Invalid Category',
    });
    expect(category.isFailure).toBe(true);
    expect(category.error).toBe(ERROR_BASKET_CATEGORY_MAX_VALUE);
  });

  it('Should fail if provide description greater than 20 ', async () => {
    const category = makeSut({
      changesLimit: 3,
      description: random.words(20),
    });
    expect(category.isFailure).toBe(true);
    expect(category.error).toBe(ERROR_BASKET_CATEGORY_DESCRIPTION_LENGTH);
  });
});
