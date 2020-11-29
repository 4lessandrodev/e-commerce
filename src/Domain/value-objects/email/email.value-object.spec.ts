import { ERROR_INVALID_EMAIL_FORMAT } from './email-errors.domain';
import { EmailValueObject } from './email.value-object';

describe('email.value-object', () => {
  it('Should return a valid email ', () => {
    const emailCreateResult = EmailValueObject.create('valid_email@domain.com');
    expect(emailCreateResult.getResult().getValue()).toBe(
      'valid_email@domain.com',
    );
    expect(emailCreateResult.isSuccess).toBe(true);
  });

  it('Should return a invalid email message', () => {
    const emailCreateResult = EmailValueObject.create('invalid_email');
    expect(emailCreateResult.isFailure).toBe(true);
    expect(emailCreateResult.errorValue()).toBe(ERROR_INVALID_EMAIL_FORMAT);
  });

  it('Should return lowercase email string', () => {
    const emailCreateResult = EmailValueObject.create('Valid_Email@Domain.COM');
    expect(emailCreateResult.getResult().getValue()).toBe(
      'valid_email@domain.com',
    );
    expect(emailCreateResult.isSuccess).toBe(true);
  });
});
