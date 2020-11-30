import { Result } from '../../../Shared/Result';
import { ValueObject } from '../value-object';
import { hashSync, compareSync } from 'bcrypt';
import {
  ERROR_INVALID_PASSWORD_MAX_LENGTH,
  ERROR_INVALID_PASSWORD_MIN_LENGTH,
} from './password-errors.domain';
import { isBcryptHash } from '../../utils/validate-bcrypt-hash.domain.util';
export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 21;
export const PASSWORD_SALT = 10;

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
  getValue(): string {
    return this.props.value;
  }

  /**
   * Return a boolean ckeck if instance value is encripted
   */
  isAlreadyEncrypted(): boolean {
    return this.props.isHashed;
  }

  /**
   *
   * @param password string not encryped value.
   * Return boolean, true if match or false if not
   */
  async comparePassword(password: string): Promise<boolean> {
    if (this.props.isHashed) {
      return compareSync(password, this.props.value);
    }
    return password === this.props.value;
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

    if (value.length < PASSWORD_MIN_LENGTH) {
      return Result.fail<PasswordValueObject>(
        ERROR_INVALID_PASSWORD_MIN_LENGTH,
      );
    }
    if (value.length > PASSWORD_MAX_LENGTH && !isHashed) {
      return Result.fail<PasswordValueObject>(
        ERROR_INVALID_PASSWORD_MAX_LENGTH,
      );
    }
    return Result.ok<PasswordValueObject>(
      new PasswordValueObject({ value, isHashed }),
    );
  }
}
