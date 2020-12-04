import { Entity } from '../../../Shared/Entity';
import { Result } from '../../../Shared/Result';
import { UniqueEntityID } from '../../../Shared/UniqueEntityID';

export class IdValueObject extends Entity<any> {
  private constructor(id?: UniqueEntityID) {
    super(null, id);
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  public static create(id?: UniqueEntityID): Result<IdValueObject> {
    return Result.ok<IdValueObject>(new IdValueObject(id));
  }
}
