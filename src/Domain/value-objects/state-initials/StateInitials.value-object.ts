import { Result, ValueObject } from 'types-ddd';
import { validateEnumIncludesValue } from '../../utils/validate-is-string-in-enum.domain.util';
import { validateStringLengthBetweenMaxAndMin } from '../../utils/validate-string-length.domain.util';
import {
  ERROR_INITIAL_STATE_INVALID,
  ERROR_INITIAL_STATE_INVALID_LENGTH,
} from './StateInitialsErrors.domain';

export enum AvaliableInitials {
  AC = 'AC',
  AL = 'AL',
  AP = 'AP',
  AM = 'AM',
  BA = 'BA',
  CE = 'CE',
  ES = 'ES',
  GO = 'GO',
  MA = 'MA',
  MT = 'MT',
  MS = 'MS',
  MG = 'MG',
  PA = 'PA',
  OB = 'PB',
  PR = 'PR',
  PE = 'PE',
  PI = 'PI',
  RJ = 'RJ',
  RN = 'RN',
  RS = 'RS',
  RO = 'RO',
  RR = 'RR',
  SC = 'SC',
  SP = 'SP',
  SE = 'SE',
  TO = 'TO',
  DF = 'DF',
}

export interface InitialStateProps {
  value: keyof typeof AvaliableInitials;
}

export class InitialStateValueObject extends ValueObject<InitialStateProps> {
  private constructor(props: InitialStateProps) {
    super(props);
  }

  get value(): AvaliableInitials {
    return AvaliableInitials[this.props.value];
  }

  private static isValidInitial = (initial: keyof typeof AvaliableInitials) => {
    return initial in AvaliableInitials;
  };

  public static create(
    initial: keyof typeof AvaliableInitials,
  ): Result<InitialStateValueObject> {
    const isValidString = validateStringLengthBetweenMaxAndMin({
      text: initial,
      maxLength: 2,
      minLength: 2,
    });

    if (!isValidString) {
      return Result.fail<InitialStateValueObject>(
        ERROR_INITIAL_STATE_INVALID_LENGTH,
      );
    }

    const isValid = validateEnumIncludesValue({
      enum: AvaliableInitials,
      value: initial,
    });

    if (!isValid) {
      return Result.fail<InitialStateValueObject>(ERROR_INITIAL_STATE_INVALID);
    }

    if (!this.isValidInitial(initial)) {
      return Result.fail<InitialStateValueObject>(ERROR_INITIAL_STATE_INVALID);
    }

    return Result.ok<InitialStateValueObject>(
      new InitialStateValueObject({ value: initial }),
    );
  }
}
