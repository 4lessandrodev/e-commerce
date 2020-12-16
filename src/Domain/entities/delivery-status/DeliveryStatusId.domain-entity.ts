import { Entity, UniqueEntityID } from '../../../Shared';

export class DeliveryStatusId extends Entity<any> {
  get id(): UniqueEntityID {
    return this._id;
  }
  private constructor(id?: UniqueEntityID) {
    super(null, id);
  }

  public static create(id?: UniqueEntityID): DeliveryStatusId {
    return new DeliveryStatusId(id);
  }
}
