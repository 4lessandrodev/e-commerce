import { User } from '@domain/aggregates-root';
import { User as Schema } from '@infra/user/entities/user.schema';
import { DomainId } from 'types-ddd';
import { EmailValueObject, PasswordValueObject } from '@domain/value-objects';
import { UserMapper } from './user.mapper';

describe('user.mapper', () => {
  //
  const currentDate = new Date();
  const email = 'valid_email@domain.com';
  const role = 'ADMIN';
  const password = '123456';
  const id = 'SF-PO.IPJ.DFG46565D.DFG4';
  const terms = [
    {
      acceptedAt: currentDate,
      browser: 'firefox',
      ip: '123.123.123.123',
      os: 'Linux',
      termVersion: '1.0.5',
    },
  ];

  //
  const domain: User = User.create(
    {
      terms,
      role,
      password: PasswordValueObject.create(password).getResult(),
      isTheEmailConfirmed: true,
      isActive: true,
      email: EmailValueObject.create(email).getResult(),
      createdAt: currentDate,
      deletedAt: undefined,
      isDeleted: false,
      updatedAt: currentDate,
    },
    DomainId.create(id).id,
  ).getResult();
  //
  const persistence: Schema = {
    createdAt: currentDate,
    email,
    id,
    isActive: true,
    isTheEmailConfirmed: true,
    password,
    role,
    terms,
    updatedAt: currentDate,
  };

  it('should be defined', () => {
    const mapper = new UserMapper();
    expect(mapper).toBeDefined();
  });

  it('should convert from persistence to domain with success', () => {
    const mapper = new UserMapper();
    const domainTarget = mapper.toDomain(persistence);
    const isEqual = domainTarget.equals(domain);
    expect(isEqual).toBe(true);
  });

  it('should convert from domain to persistence with success', () => {
    const mapper = new UserMapper();
    const persistenceTarget = mapper.toPersistence(domain);
    expect(persistenceTarget).toEqual(persistence);
  });
});
