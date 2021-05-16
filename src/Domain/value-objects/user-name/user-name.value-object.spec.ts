import { UserNameValueObject } from './user-name.value-object';

describe('UserName.value-object', () => {
  it('should be defined', () => {
    const name = UserNameValueObject.create('street name');
    expect(name).toBeDefined();
  });

  it('should fail if description length is greater than 30 characters', () => {
    const name = UserNameValueObject.create(
      'invalid_long_description'.repeat(10),
    );
    expect(name.isFailure).toBe(true);
  });

  it('should create a valid name name', () => {
    const name = UserNameValueObject.create('valid description');
    expect(name.isSuccess).toBe(true);
  });
});
