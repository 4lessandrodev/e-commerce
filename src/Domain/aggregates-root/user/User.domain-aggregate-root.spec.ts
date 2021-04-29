import { internet } from 'faker';
import { Result, UniqueEntityID } from 'types-ddd';
import { EmailValueObject, PasswordValueObject } from '@domain/value-objects';
import { User } from './User.domain-aggregate-root';
import { UserProps } from './User.domain-aggregate-root-interface';
import { UserId } from './UserId.domain-aggregate-root';

describe('User.domain-aggregate-root', () => {
  const makeSut = (props?: UserProps, id?: UniqueEntityID): Result<User> => {
    return User.create(
      {
        email:
          props?.email ?? EmailValueObject.create(internet.email()).getResult(),
        isActive: props?.isActive ?? true,
        role: props?.role ?? 'CLIENT',
        isTheEmailConfirmed: props?.isTheEmailConfirmed ?? false,
        password:
          props?.password ??
          PasswordValueObject.create('valid password').getResult(),
        terms: [
          {
            acceptedAt: new Date(),
            browser: 'firefox',
            ip: '123.123.123.123',
            os: 'Linux',
            termVersion: '1.0.2',
          },
        ],
      },
      id,
    );
  };

  it('Should create a valid user', () => {
    const createdUser = makeSut();
    expect(createdUser.isFailure).toBe(false);
    expect(createdUser.getResult().email.value).toBeDefined();
    expect(createdUser.getResult().isActive).toBe(true);
    expect(createdUser.getResult().isAdmin).toBe(false);
    expect(createdUser.getResult().isDeliveryman).toBe(false);
    expect(createdUser.getResult().isDeveloper).toBe(false);
    expect(createdUser.getResult().isTheEmailConfirmed).toBe(false);
  });

  it('Should create a valid user with provided id', () => {
    const userId = UserId.create().id;
    const createdUser = makeSut(
      {
        email: EmailValueObject.create(internet.email()).getResult(),
        isActive: true,
        role: 'CLIENT',
        isTheEmailConfirmed: false,
        password: PasswordValueObject.create('valid password').getResult(),
        terms: [
          {
            acceptedAt: new Date(),
            browser: 'firefox',
            ip: '123.123.123.123',
            os: 'Linux',
            termVersion: '1.0.2',
          },
        ],
      },
      userId,
    );
    expect(createdUser.isFailure).toBe(false);
    expect(createdUser.getResult().id.toString()).toBe(userId.toString());
  });

  it('Should confirm the email with success', () => {
    const createdUser = makeSut();
    expect(createdUser.getResult().isTheEmailConfirmed).toBe(false);
    createdUser.getResult().confirmEmail();
    expect(createdUser.getResult().isTheEmailConfirmed).toBe(true);
  });

  it('Should make user as admin profile', () => {
    const createdUser = makeSut();
    expect(createdUser.getResult().isAdmin).toBe(false);
    expect(createdUser.getResult().isDeliveryman).toBe(false);
    expect(createdUser.getResult().isDeveloper).toBe(false);
    createdUser.getResult().makeAdmin();
    expect(createdUser.getResult().isAdmin).toBe(true);
    expect(createdUser.getResult().isDeliveryman).toBe(false);
    expect(createdUser.getResult().isDeveloper).toBe(false);
  });

  it('Should make user as developer profile', () => {
    const createdUser = makeSut();
    expect(createdUser.getResult().isAdmin).toBe(false);
    expect(createdUser.getResult().isDeliveryman).toBe(false);
    expect(createdUser.getResult().isDeveloper).toBe(false);
    createdUser.getResult().makeDeveloper();
    expect(createdUser.getResult().isAdmin).toBe(false);
    expect(createdUser.getResult().isDeliveryman).toBe(false);
    expect(createdUser.getResult().isDeveloper).toBe(true);
  });

  it('Should make user as deliveryman profile', () => {
    const createdUser = makeSut();
    expect(createdUser.getResult().isAdmin).toBe(false);
    expect(createdUser.getResult().isDeliveryman).toBe(false);
    expect(createdUser.getResult().isDeveloper).toBe(false);
    createdUser.getResult().makeDeliveryman();
    expect(createdUser.getResult().isAdmin).toBe(false);
    expect(createdUser.getResult().isDeliveryman).toBe(true);
    expect(createdUser.getResult().isDeveloper).toBe(false);
  });

  it('Should make user as undefined profile', () => {
    const createdUser = makeSut();
    expect(createdUser.getResult().isAdmin).toBe(false);
    expect(createdUser.getResult().isDeliveryman).toBe(false);
    expect(createdUser.getResult().isDeveloper).toBe(false);
    expect(createdUser.getResult().isUndefined).toBe(false);
    createdUser.getResult().makeUndefined();
    expect(createdUser.getResult().isAdmin).toBe(false);
    expect(createdUser.getResult().isDeliveryman).toBe(false);
    expect(createdUser.getResult().isUndefined).toBe(true);
    expect(createdUser.getResult().isDeveloper).toBe(false);
  });

  it('Should deactivate old profile on change for a new one', () => {
    const createdUser = makeSut();
    expect(createdUser.getResult().isAdmin).toBe(false);
    expect(createdUser.getResult().isDeliveryman).toBe(false);
    expect(createdUser.getResult().isDeveloper).toBe(false);
    createdUser.getResult().makeDeveloper();
    createdUser.getResult().makeAdmin();
    createdUser.getResult().makeDeliveryman();
    expect(createdUser.getResult().isAdmin).toBe(false);
    expect(createdUser.getResult().isDeliveryman).toBe(true);
    expect(createdUser.getResult().isDeveloper).toBe(false);
  });
});
