import {
  ERROR_INITIAL_STATE_INVALID,
  ERROR_INITIAL_STATE_INVALID_LENGTH,
} from './StateInitialsErrors.domain';
import { Result, ValueObject } from 'types-ddd';
import {
  validateEnumIncludesValue,
  validateStringLengthBetweenMaxAndMin,
} from '@domain/utils';

export enum AvailableInitials {
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
  PB = 'PB',
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

export type AvailableInitialsType = keyof typeof AvailableInitials;

export interface InitialStateProps {
  value: AvailableInitialsType;
}

export class InitialStateValueObject extends ValueObject<InitialStateProps> {
  private constructor(props: InitialStateProps) {
    super(props);
  }

  get value(): AvailableInitials {
    return AvailableInitials[this.props.value];
  }

  private static isValidInitial = (initial: keyof typeof AvailableInitials) => {
    return initial in AvailableInitials;
  };

  public static create(
    initial: keyof typeof AvailableInitials,
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
      enum: AvailableInitials,
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
