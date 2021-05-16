import { Entity, Result, UniqueEntityID } from 'types-ddd';
import { DeliveryStatusProps } from './delivery-status.domain-entity-interface';
import { validateStringLengthBetweenMaxAndMin } from '../../utils';
import {
  ERROR_DELIVERY_STATUS_LENGTH_DESCRIPTION,
  ERROR_INFO_STATUS_LENGTH_DESCRIPTION,
} from './delivery-status-errors.domain-entity';
export const DELIVERY_STATUS_DESCRIPTION_MAX_STRING_LENGTH = 20;
export const DELIVERY_STATUS_DESCRIPTION_MIN_STRING_LENGTH = 3;
export const DELIVERY_INFO_DESCRIPTION_MAX_STRING_LENGTH = 70;
export const DELIVERY_INFO_DESCRIPTION_MIN_STRING_LENGTH = 3;

export class DeliveryStatus extends Entity<DeliveryStatusProps> {
  private constructor(props: DeliveryStatusProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  get isActive(): boolean {
    return this.props.isActive ?? true;
  }

  get description(): string {
    return this.props.description;
  }

  get info(): string {
    return this.props.info ?? '';
  }

  delete(): void {
    this.props.isDeleted = true;
    this.props.updatedAt = new Date();
  }

  deactivate(): void {
    this.props.updatedAt = new Date();
    this.props.isActive = false;
  }

  activate(): void {
    this.props.updatedAt = new Date();
    this.props.isActive = true;
  }

  public static create(
    props: DeliveryStatusProps,
    id?: UniqueEntityID,
  ): Result<DeliveryStatus> {
    const isValidDescription = validateStringLengthBetweenMaxAndMin({
      text: props.description,
      maxLength: DELIVERY_STATUS_DESCRIPTION_MAX_STRING_LENGTH,
      minLength: DELIVERY_STATUS_DESCRIPTION_MIN_STRING_LENGTH,
    });

    if (!isValidDescription) {
      return Result.fail<DeliveryStatus>(
        ERROR_DELIVERY_STATUS_LENGTH_DESCRIPTION,
      );
    }

    if (props.info) {
      const isValidInfo = validateStringLengthBetweenMaxAndMin({
        text: props.info,
        maxLength: DELIVERY_INFO_DESCRIPTION_MAX_STRING_LENGTH,
        minLength: DELIVERY_INFO_DESCRIPTION_MIN_STRING_LENGTH,
      });

      if (!isValidInfo) {
        return Result.fail<DeliveryStatus>(
          ERROR_INFO_STATUS_LENGTH_DESCRIPTION,
        );
      }
    }
    return Result.ok<DeliveryStatus>(new DeliveryStatus(props, id));
  }
}
