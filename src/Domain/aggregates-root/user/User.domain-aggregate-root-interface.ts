import { BaseDomainEntity } from 'types-ddd/dist/src';
import { EmailValueObject, PasswordValueObject } from '../../value-objects';

export interface UserProps extends BaseDomainEntity {
  email: EmailValueObject;
  password: PasswordValueObject;
  permission: 'DEVELOPER' | 'ADMIN' | 'CLIENT' | 'DELIVERYMAN';
  isActive: boolean;
  isTheEmailConfirmed: boolean;
}
