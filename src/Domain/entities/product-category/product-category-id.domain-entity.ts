import { Entity, UniqueEntityID } from 'types-ddd';

export class ProductCategoryId extends Entity<any> {
  get id(): UniqueEntityID {
    return this._id;
  }
  private constructor(id?: UniqueEntityID) {
    super(null, id);
  }

  public static create(id?: UniqueEntityID): ProductCategoryId {
    return new ProductCategoryId(id);
  }
}
