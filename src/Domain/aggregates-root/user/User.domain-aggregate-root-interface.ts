import { BaseDomainEntity } from '../../../Shared';
import { EmailValueObject, PasswordValueObject } from '../../value-objects';

export interface UserProps extends BaseDomainEntity {
  email: EmailValueObject;
  password: PasswordValueObject;
  isDeveloper: boolean;
  isAdmin: boolean;
  isDeliveryman: boolean;
  isActive: boolean;
  isTheEmailConfirmed: boolean;
}
