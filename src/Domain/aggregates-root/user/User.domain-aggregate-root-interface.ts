import { BaseDomainEntity } from 'types-ddd';
import { EmailValueObject, PasswordValueObject } from '@domain/value-objects';
export enum Roles {
  'DEVELOPER',
  'ADMIN',
  'CLIENT',
  'DELIVERYMAN',
  'UNDEFINED',
}

export type Role = keyof typeof Roles;
export interface UserProps extends BaseDomainEntity {
  email: EmailValueObject;
  password: PasswordValueObject;
  role: Role;
  isActive: boolean;
  isTheEmailConfirmed: boolean;
}
