import { BaseDomainEntity } from '../../../Shared';
import { EmailValueObject, PasswordValueObject } from '../../value-objects';

export interface UserProps extends BaseDomainEntity {
  email: EmailValueObject;
  password: PasswordValueObject;
  permission: 'DEVELOPER' | 'ADMIN' | 'CLIENT' | 'DELIVERYMAN';
  isActive: boolean;
  isTheEmailConfirmed: boolean;
}
