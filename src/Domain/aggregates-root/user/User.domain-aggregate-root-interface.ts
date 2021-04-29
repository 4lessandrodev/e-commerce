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

export interface Term {
  ip: string;
  acceptedAt: Date;
  os: string;
  browser: string;
  termVersion: string;
}
export interface UserProps extends BaseDomainEntity {
  email: EmailValueObject;
  password: PasswordValueObject;
  role: Role;
  isActive: boolean;
  isTheEmailConfirmed: boolean;
  terms: Term[];
}
