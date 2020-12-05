import { Entity, UniqueEntityID } from '../../../Shared';

export class CityId extends Entity<any> {
  get id(): UniqueEntityID {
    return this._id;
  }
  private constructor(id?: UniqueEntityID) {
    super(null, id);
  }

  public static create(id?: UniqueEntityID): CityId {
    return new CityId(id);
  }
}
