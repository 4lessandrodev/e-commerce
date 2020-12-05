import { Result, ValueObject } from '../../../Shared';
import { enumIncludesValue } from '../../utils/validate-is-string-in-enum.domain.util';
import { validateStringLengthBetweenMaxAndMin } from '../../utils/validate-string-length.domain.util';
import {
  ERROR_INITIAL_STATE_INVALID,
  ERROR_INITIAL_STATE_INVALID_LENGTH,
} from './StateInitials-errors.domain';

export interface InitialStateProps {
  value: InitialStates;
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

  get value(): InitialStates {
    return this.props.value;
  }

  public static create(initial: string): Result<InitialStateValueObject> {
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

    const isValid = enumIncludesValue({ enum: InitialStates, value: initial });

    if (!isValid) {
      return Result.fail<InitialStateValueObject>(ERROR_INITIAL_STATE_INVALID);
    }

    const arrayValues = Object.values(InitialStates);
    const foundKey = arrayValues.find(
      (entity) => entity === initial.toUpperCase(),
    );

    if (!foundKey) {
      return Result.fail<InitialStateValueObject>(ERROR_INITIAL_STATE_INVALID);
    }

    return Result.ok<InitialStateValueObject>(
      new InitialStateValueObject({
        value: InitialStates[foundKey],
      }),
    );
  }
}
