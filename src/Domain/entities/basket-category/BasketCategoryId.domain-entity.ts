import { Entity, UniqueEntityID } from '../../../Shared';

export class BasketCategoryId extends Entity<any> {
  get id(): UniqueEntityID {
    return this._id;
  }
  private constructor(id?: UniqueEntityID) {
    super(null, id);
  }

  public static create(id?: UniqueEntityID): BasketCategoryId {
    return new BasketCategoryId(id);
  }
}
