import { Entity } from '../../../Shared/Entity';
import { UniqueEntityID } from '../../../Shared/UniqueEntityID';

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
