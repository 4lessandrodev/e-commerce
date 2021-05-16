import { Result, ValueObject } from 'types-ddd';
import { validateStringLengthBetweenMaxAndMin } from '@domain/utils';
import { ERROR_USER_NAME_LENGTH } from './user-name-errors.domain';
export const MIN_USER_NAME_LENGTH = 1;
export const MAX_USER_NAME_LENGTH = 30;

export interface UserNameProps {
  value: string;
}

export class UserNameValueObject extends ValueObject<UserNameProps> {
  private constructor(props: UserNameProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  public static create(name: string): Result<UserNameValueObject> {
    const isValidStreetLength = validateStringLengthBetweenMaxAndMin({
      maxLength: MAX_USER_NAME_LENGTH,
      minLength: MIN_USER_NAME_LENGTH,
      text: name,
    });

    if (!isValidStreetLength) {
      return Result.fail<UserNameValueObject>(ERROR_USER_NAME_LENGTH);
    }

    return Result.ok<UserNameValueObject>(
      new UserNameValueObject({ value: name }),
    );
  }
}
