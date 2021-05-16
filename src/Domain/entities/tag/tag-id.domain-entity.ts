import { Entity, UniqueEntityID } from 'types-ddd';

export class TagId extends Entity<any> {
  get id(): UniqueEntityID {
    return this._id;
  }
  private constructor(id?: UniqueEntityID) {
    super(null, id);
  }

  public static create(id?: UniqueEntityID): TagId {
    return new TagId(id);
  }
}
