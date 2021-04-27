import { UniqueEntityID } from 'types-ddd';
import { DeliveryStatus } from './DeliveryStatus.domain-entity';
import { DeliveryStatusProps } from './DeliveryStatus.domain-entity-interface';
import {
  ERROR_DELIVERY_STATUS_LENGTH_DESCRIPTION,
  ERROR_INFO_STATUS_LENGTH_DESCRIPTION,
} from './DeliveryStatusErrors.domain-entity';
import { DeliveryStatusId } from './DeliveryStatusId.domain-entity';

describe('DeliveryStatus.domain-entity', () => {
  const makeSut = (props?: DeliveryStatusProps, id?: UniqueEntityID) => {
    return DeliveryStatus.create(
      {
        description: props?.description ?? 'Valid Description',
        info: props?.info ?? 'Lorem Ipsum',
      },
      id,
    );
  };

  it('Should create a valid DeliveryStatus', () => {
    const validDeliveryStatus = makeSut();
    expect(validDeliveryStatus.isFailure).toBe(false);
    expect(validDeliveryStatus.getResult().description).toBe(
      'Valid Description',
    );
  });

  it('Should fail if not provide a DeliveryStatus description', () => {
    const validDeliveryStatus = makeSut({
      description: '',
    });
    expect(validDeliveryStatus.isFailure).toBe(true);
    expect(validDeliveryStatus.error).toBe(
      ERROR_DELIVERY_STATUS_LENGTH_DESCRIPTION,
    );
  });

  it('Should fail if provide a DeliveryStatus description length less than required', () => {
    const validDeliveryStatus = makeSut({
      description: 'a',
    });
    expect(validDeliveryStatus.isFailure).toBe(true);
    expect(validDeliveryStatus.error).toBe(
      ERROR_DELIVERY_STATUS_LENGTH_DESCRIPTION,
    );
  });

  it('Should fail if provide a DeliveryStatus description length more than max permited', () => {
    const description =
      'this-is-a-long-DeliveryStatus-invalid-description-to-check-the-validation';
    const validDeliveryStatus = DeliveryStatus.create({
      description,
      info: 'Lorem Ipsum dola',
    });
    expect(validDeliveryStatus.isFailure).toBe(true);
    expect(validDeliveryStatus.error).toBe(
      ERROR_DELIVERY_STATUS_LENGTH_DESCRIPTION,
    );
  });

  it('Should fail if provide a long info description length more than max permited', () => {
    const validDeliveryStatus = DeliveryStatus.create({
      description: 'Valid Description',
      info:
        'Lorem Ipsum dola this-is-a-long-DeliveryStatus-invalid-description-to-check-the-validation Lorem ',
    });

    expect(validDeliveryStatus.isFailure).toBe(true);
    expect(validDeliveryStatus.error).toBe(
      ERROR_INFO_STATUS_LENGTH_DESCRIPTION,
    );
  });

  it('Should create a long info description with success', () => {
    const info = 'Lorem Ipsum dola this-is-a-long-DeliveryStatus';
    const validDeliveryStatus = DeliveryStatus.create({
      description: 'Valid Description',
      info: info,
    });

    expect(validDeliveryStatus.isFailure).toBe(false);
    expect(validDeliveryStatus.getResult().info).toBe(info);
  });

  it('Should return the same id if provided', () => {
    const createdId = DeliveryStatusId.create().id;
    const validDeliveryStatus = DeliveryStatus.create(
      { description: 'Valid Description', info: 'LOrem Ipsum' },
      createdId,
    );
    expect(validDeliveryStatus.isFailure).toBe(false);
    expect(validDeliveryStatus.getResult().id.toString()).toBe(
      createdId.toString(),
    );
  });

  it('Should delete and deactivate with success', () => {
    const validDeliveryStatus = makeSut();
    expect(validDeliveryStatus.isFailure).toBe(false);
    expect(validDeliveryStatus.getResult().isActive).toBe(true);
    expect(validDeliveryStatus.getResult().isDeleted).toBe(false);
    validDeliveryStatus.getResult().delete();
    validDeliveryStatus.getResult().deactivate();
    expect(validDeliveryStatus.getResult().isActive).toBe(false);
    expect(validDeliveryStatus.getResult().isDeleted).toBe(true);
  });

  it('Should activate a status', () => {
    const validDeliveryStatus = makeSut();
    expect(validDeliveryStatus.getResult().isActive).toBe(true);
    validDeliveryStatus.getResult().deactivate();
    expect(validDeliveryStatus.getResult().isActive).toBe(false);
    validDeliveryStatus.getResult().activate();
    expect(validDeliveryStatus.getResult().isActive).toBe(true);
  });
});
