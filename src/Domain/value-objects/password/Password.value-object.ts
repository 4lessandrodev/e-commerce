export const MIN_PASSWORD_LENGTH = 5;
export const MAX_PASSWORD_LENGTH = 21;
export const PASSWORD_SALT = 10;
import { Result, ValueObject } from 'types-ddd';
import { hashSync, compareSync } from 'bcrypt';
import {
  ERROR_INVALID_PASSWORD_MAX_LENGTH,
  ERROR_INVALID_PASSWORD_MIN_LENGTH,
} from './PasswordErrors.domain';
import { isBcryptHash } from '@domain/utils/validate-bcrypt-hash.domain.util';

interface PasswordValueObjectProps {
  value: string;
  isHashed: boolean;
}

/**
 * @extends ValueObject
 */
export class PasswordValueObject extends ValueObject<PasswordValueObjectProps> {
  private constructor(props: PasswordValueObjectProps) {
    super(props);
  }

  /**
   * Return password value as string
   */
  get value(): string {
    return this.props.value;
  }

  /**
   * Return a boolean check if instance value is encrypted
   */
  isAlreadyEncrypted(): boolean {
    return this.props.isHashed;
  }

  /**
   *
   * @param password string not encrypted value.
   * Return boolean, true if match or false if not
   */
  async comparePassword(plainText: string): Promise<boolean> {
    if (this.props.isHashed) {
      return compareSync(plainText, this.props.value);
    }
    return plainText === this.props.value;
  }

  /**
   * Only encripty the instance of class value
   */
  async encryptPassword(): Promise<void> {
    if (this.props.isHashed) {
      return;
    }
    this.props.value = hashSync(this.props.value, PASSWORD_SALT);
    this.props.isHashed = true;
  }

  /**
   *
   * @param value is password string hashed or not hashed.
   * If success Returns `Result.ok` with instance of PasswordValueObject or
   * in error case return `Result.fail`
   */
  static create(value: string): Result<PasswordValueObject> {
    const isHashed = isBcryptHash(value);

    if (value.length < MIN_PASSWORD_LENGTH) {
      return Result.fail<PasswordValueObject>(
        ERROR_INVALID_PASSWORD_MIN_LENGTH,
      );
    }
    if (value.length > MAX_PASSWORD_LENGTH && !isHashed) {
      return Result.fail<PasswordValueObject>(
        ERROR_INVALID_PASSWORD_MAX_LENGTH,
      );
    }
    return Result.ok<PasswordValueObject>(
      new PasswordValueObject({ value, isHashed }),
    );
  }
}
