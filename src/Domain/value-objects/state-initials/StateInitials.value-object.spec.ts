import {
  ERROR_INITIAL_STATE_INVALID,
  ERROR_INITIAL_STATE_INVALID_LENGTH,
} from './StateInitials-errors.domain';
import {
  InitialStates,
  InitialStateValueObject,
} from './StateInitials.value-object';

describe('StateInitials.value-object', () => {
  it('Should create a valid initial state', () => {
    const validInitialResult = InitialStateValueObject.create('GO');
    expect(validInitialResult.isFailure).toBe(false);
    expect(validInitialResult.isSuccess).toBe(true);
    expect(validInitialResult.getResult().value).toBe(InitialStates.GO);
  });

  it('Should create a valid initial state if provide a lowercase value', () => {
    const validInitialResult = InitialStateValueObject.create('sp');
    expect(validInitialResult.isFailure).toBe(false);
    expect(validInitialResult.isSuccess).toBe(true);
    expect(validInitialResult.getResult().value).toBe(InitialStates.SP);
  });

  it('Should fail if provide a value greatter than 2 char to initial state', () => {
    const validInitialResult = InitialStateValueObject.create('Invalid');
    expect(validInitialResult.isFailure).toBe(true);
    expect(validInitialResult.isSuccess).toBe(false);
    expect(validInitialResult.error).toBe(ERROR_INITIAL_STATE_INVALID_LENGTH);
  });

  it('Should fail if provide a invalid value to initial state', () => {
    const validInitialResult = InitialStateValueObject.create('cc');
    expect(validInitialResult.isFailure).toBe(true);
    expect(validInitialResult.isSuccess).toBe(false);
    expect(validInitialResult.error).toBe(ERROR_INITIAL_STATE_INVALID);
  });
});
