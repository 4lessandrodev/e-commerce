import { InitialStateValueObject } from './StateInitials.value-object';

describe('StateInitials.value-object', () => {
  it('Should create a valid initial state', () => {
    const validInitialResult = InitialStateValueObject.create('GO');
    expect(validInitialResult.isFailure).toBe(false);
    expect(validInitialResult.isSuccess).toBe(true);
    expect(validInitialResult.getResult().value).toBe('GO');
  });

  it('Should create a valid initial state if provide a lowercase value', () => {
    const validInitialResult = InitialStateValueObject.create('SP');
    expect(validInitialResult.isFailure).toBe(false);
    expect(validInitialResult.isSuccess).toBe(true);
    expect(validInitialResult.getResult().value).toBe('SP');
  });
});
