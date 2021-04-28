import {
  ERROR_INVALID_PASSWORD_MAX_LENGTH,
  ERROR_INVALID_PASSWORD_MIN_LENGTH,
} from './PasswordErrors.domain';
import { PasswordValueObject } from './Password.value-object';

describe('Password.value-object', () => {
  it('Should return a valid password ', () => {
    const createdPassword = PasswordValueObject.create('valid_password');
    expect(createdPassword.isFailure).toBe(false);
    expect(createdPassword.getResult().value).toBe('valid_password');
    expect(createdPassword.getResult().isAlreadyEncrypted()).toBe(false);
  });

  it('Should return a invalid password min length message', () => {
    const createdPassword = PasswordValueObject.create('inv');
    expect(createdPassword.isFailure).toBe(true);
    expect(createdPassword.errorValue()).toBe(
      ERROR_INVALID_PASSWORD_MIN_LENGTH,
    );
  });

  it('Should return a invalid password max length message', () => {
    const createdPassword = PasswordValueObject.create(
      'invalid_message_max_length',
    );
    expect(createdPassword.isFailure).toBe(true);
    expect(createdPassword.errorValue()).toBe(
      ERROR_INVALID_PASSWORD_MAX_LENGTH,
    );
  });

  it('Should return a invalid password max length message', async () => {
    const createdPassword = PasswordValueObject.create('valid_password');
    await createdPassword.getResult().encryptPassword();
    const isEncripted = createdPassword.getResult().isAlreadyEncrypted();
    expect(createdPassword.isFailure).toBe(false);
    expect(isEncripted).toBe(true);
  });

  it('Should regenerate a password with encripted value', async () => {
    const createdPassword = PasswordValueObject.create('valid_password');
    await createdPassword.getResult().encryptPassword();
    createdPassword.getResult().isAlreadyEncrypted();

    const generateEncriptedValue = PasswordValueObject.create(
      createdPassword.getResult().value,
    );

    expect(generateEncriptedValue.isFailure).toBe(false);
    expect(createdPassword.isFailure).toBe(false);
    expect(generateEncriptedValue.getResult().value).toBe(
      createdPassword.getResult().value,
    );
    expect(generateEncriptedValue.getResult().isAlreadyEncrypted()).toBe(true);
  });

  it('Shoud compare a not encrypted password and return true if match and false if not', async () => {
    const password = PasswordValueObject.create('valid_password').getResult();
    const matchPass = await password.comparePassword('valid_password');
    const notMatchPass = await password.comparePassword('invalid_password');

    expect(matchPass).toBe(true);
    expect(notMatchPass).toBe(false);
  });

  it('Shoud compare an encrypted password and return true if match and false if not', async () => {
    const password = PasswordValueObject.create('valid_password').getResult();
    await password.encryptPassword();

    const matchPass = await password.comparePassword('valid_password');
    const notMatchPass = await password.comparePassword('invalid_password');

    expect(matchPass).toBe(true);
    expect(notMatchPass).toBe(false);
  });

  it('Shoud do nothing on try encripty a password already encrypted ', async () => {
    const password = PasswordValueObject.create('valid_password').getResult();
    await password.encryptPassword();
    const passwordBefore = password.value;
    await password.encryptPassword();
    const passwordAfter = password.value;

    expect(password.isAlreadyEncrypted()).toBe(true);
    expect(passwordBefore).toBe(passwordAfter);
  });
});
