import { Ecobag } from '@domain/entities';
import { MonetaryValueObject } from '@domain/value-objects';

export interface EcobagRepositoryInterface {
  definePrice: (ecobag: Ecobag) => Promise<void>;
  getPrice: (id: string) => Promise<MonetaryValueObject>;
}
