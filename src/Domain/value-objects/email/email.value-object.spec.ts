import { EmailValueObject } from './email.value-object';

describe('email.value-object', () => {
  it('Should return a valid email ', () => {
    const emailCreateResult = EmailValueObject.create('valid_email@domain.com');
    expect(emailCreateResult.getResult().getValue()).toBe(
      'valid_email@domain.com',
    );
    expect(emailCreateResult.isSuccess).toBe(true);
  });
});
