import { IdValueObject } from './id.value-object';
import { v4 as uuid, validate } from 'uuid';
import { UniqueEntityID } from 'types-ddd';

describe('Id.value-object', () => {
  it('Should generate a valid uuid', async () => {
    const uuidGenerated = IdValueObject.create();
    const isValidId = validate(uuidGenerated.getResult().id.toString());
    expect(uuidGenerated.getResult().id).toBeDefined();
    expect(isValidId).toBe(true);
  });

  it('Should return the same uuid provided', async () => {
    const randomId = uuid();
    const uuidGenerated = IdValueObject.create(new UniqueEntityID(randomId));
    expect(uuidGenerated.getResult().id).toBeDefined();
    expect(uuidGenerated.getResult().id.toString()).toBe(randomId);
  });
});
