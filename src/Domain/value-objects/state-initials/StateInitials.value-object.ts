import { Result, ValueObject } from '../../../Shared';
import { validateEnumIncludesValue } from '../../utils/validate-is-string-in-enum.domain.util';
import { validateStringLengthBetweenMaxAndMin } from '../../utils/validate-string-length.domain.util';
import {
  ERROR_INITIAL_STATE_INVALID,
  ERROR_INITIAL_STATE_INVALID_LENGTH,
} from './StateInitialsErrors.domain';

export interface InitialStateProps {
  value: keyof typeof InitialStates;
}

export enum InitialStates {
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

export class InitialStateValueObject extends ValueObject<InitialStateProps> {
  private constructor(props: InitialStateProps) {
    super(props);
  }

  get value(): keyof typeof InitialStates {
    return InitialStates[this.props.value];
  }

  private static isValidInitial = (initial: InitialStates) => {
    return initial in InitialStates;
  };

  public static create(
    initial: keyof typeof InitialStates,
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
      enum: InitialStates,
      value: initial,
    });

    if (!isValid) {
      return Result.fail<InitialStateValueObject>(ERROR_INITIAL_STATE_INVALID);
    }

    if (!this.isValidInitial(InitialStates[initial])) {
      return Result.fail<InitialStateValueObject>(ERROR_INITIAL_STATE_INVALID);
    }

    return Result.ok<InitialStateValueObject>(
      new InitialStateValueObject({
        value: InitialStates[initial],
      }),
    );
  }
}
