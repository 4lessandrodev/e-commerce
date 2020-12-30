import { State } from './State.domain-entity';
import { ERROR_STATE_DESCRIPTION_LENGTH } from './StateErrors.domain.entity';
import { StateId } from './StateId.domain-entity';

describe('State.domain-entity', () => {
  it('Should create a valid state', () => {
    const stateCreated = State.create({
      description: 'Rio de Janeiro',
      initial: 'RJ',
    });
    expect(stateCreated.isFailure).toBe(false);
    expect(stateCreated.isSuccess).toBe(true);
    expect(stateCreated.getResult().description).toBe('RIO DE JANEIRO');
    expect(stateCreated.getResult().initial).toBe('RJ');
  });

  it('Should fail if provide a long description', () => {
    const stateCreated = State.create({
      description: 'This is a long invalid description',
      initial: 'RJ',
    });
    expect(stateCreated.isFailure).toBe(true);
    expect(stateCreated.isSuccess).toBe(false);
    expect(stateCreated.error).toBe(ERROR_STATE_DESCRIPTION_LENGTH);
  });

  it('Should create a valid state with provided id', () => {
    const createdId = StateId.create();
    const stateCreated = State.create(
      {
        description: 'Rio de Janeiro',
        initial: 'RJ',
      },
      createdId.id,
    );
    expect(stateCreated.isFailure).toBe(false);
    expect(stateCreated.isSuccess).toBe(true);
    expect(stateCreated.getResult().id.toString()).toBe(
      createdId.id.toString(),
    );
  });
});
