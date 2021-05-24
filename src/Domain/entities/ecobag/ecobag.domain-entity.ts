import { Result, UniqueEntityID } from 'types-ddd';
import { MonetaryValueObject } from '@domain/value-objects';

export class Ecobag {
  readonly id: UniqueEntityID = new UniqueEntityID(Ecobag.id());
  readonly price: MonetaryValueObject;
  readonly updatedAt: Date = new Date();

  static id(): string {
    return '4520abad-cee3-453e-9740-3db0dc457ffd';
  }

  private constructor(price: MonetaryValueObject) {
    this.price = price;
  }

  public static create(price: MonetaryValueObject): Result<Ecobag> {
    return Result.ok<Ecobag>(new Ecobag(price));
  }
}
