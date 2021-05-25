export const MAX_ORDER_STATUS_LENGTH = 40;
export const MIN_ORDER_STATUS_LENGTH = 2;

import {
  ERROR_ORDER_STATUS_INVALID,
  ERROR_ORDER_STATUS_INVALID_LENGTH,
} from './order-status-errors.domain';
import { Result, ValueObject } from 'types-ddd';
import {
  validateEnumIncludesValue,
  validateStringLengthBetweenMaxAndMin,
} from '@domain/utils';

export enum AvailableOrderStatus {
  'PENDING',
  'IN_PREPARATION',
  'OUT_FOR_DELIVERY',
  'AWAITING_PAYMENT',
  'AWAITING_FULFILLMENT',
  'AWAITING_SHIPMENT',
  'AWAITING_PICKUP',
  'PARTIALLY_SHIPPED',
  'COMPLETED',
  'CANCELLED',
  'DECLINED',
  'REFUNDED',
  'MANUAL_VERIFICATION_REQUIRED',
  'PARTIALLY_REFUNDED',
}

export type AvailableOrderStatusType = keyof typeof AvailableOrderStatus;

export interface OrderStatusProps {
  value: AvailableOrderStatusType;
}

/**
 * @enum
 * `PENDING`
 * @description
 * Customer started the checkout process but did not complete it.
 * Incomplete orders are assigned a "Pending" status and can be found under the More tab in the View Orders screen.
 *
 * @enum
 * `IN_PREPARATION`
 * Customer has completed the checkout, and the products are being prepared for delivery
 *
 * @enum
 * `OUT_FOR_DELIVERY`
 * The products have been prepared and are in transit for delivery
 *
 * @enum
 * `AWAITING_PAYMENT`
 * @description
 * Customer has completed the checkout process, but payment has yet to be confirmed.
 * Authorize only transactions that are not yet captured have this status.
 *
 * @enum
 * `AWAITING_FULFILLMENT`
 * @description
 * Customer has completed the checkout process and payment has been confirmed.
 *
 * @enum
 *`AWAITING_SHIPMENT`
 * @description
 * Order has been pulled and packaged and is awaiting collection from a shipping provider.
 *
 * @enum
 *`AWAITING_PICKUP`
 * @description
 * Order has been packaged and is awaiting customer pickup from a seller-specified location.
 *
 * @enum
 *`PARTIALLY_SHIPPED`
 * @description
 * Only some items in the order have been shipped.
 *
 * @enum
 *`COMPLETED`
 * @description
 * Order has been shipped/picked up, and receipt is confirmed; client has paid for their
 * digital product, and their file(s) are available for download.
 *
 * @enum
 *`SHIPPED`
 * @description
 * Order has been shipped, but receipt has not been confirmed; seller has used the Ship Items action.
 * A listing of all orders with a "Shipped" status can be found under the More tab of the View Orders screen.
 *
 * @enum
 *`CANCELLED`
 * @description
 * Seller has cancelled an order, due to a stock inconsistency or other reasons.
 * Stock levels will automatically update depending on your Inventory Settings. Cancelling an order will not refund the order.
 * This status is triggered automatically when
 *
 * @enum
 *`DECLINED`
 * @description
 * Seller has marked the order as declined.
 *
 * @enum
 *`REFUNDED`
 * @description
 * Seller has used the Refund action to refund the whole order.
 * A listing of all orders with a "Refunded" status can be found under the More tab of the View Orders screen.
 *
 * @enum
 *`DISPUTED`
 * @description
 * Customer has initiated a dispute resolution process for the PayPal transaction that paid for the order
 * or the seller has marked the order as a fraudulent order.
 *
 * @enum
 *`MANUAL_VERIFICATION_REQUIRED`
 * @description
 * Order on hold while some aspect, such as tax-exempt documentation, is manually confirmed.
 * Orders with this status must be updated manually. Capturing funds or other order actions
 * will not automatically update the status of an order marked Manual Verification Required.
 *
 * @enum
 *`PARTIALLY_REFUNDED`
 * @description
 * Seller has partially refunded the order.
 */
export class OrderStatusValueObject extends ValueObject<OrderStatusProps> {
  private constructor(props: OrderStatusProps) {
    super(props);
  }

  get value(): AvailableOrderStatusType {
    return this.props.value;
  }

  private static isValidInitial = (initial: AvailableOrderStatusType) => {
    return initial in AvailableOrderStatus;
  };

  public static create(
    status: AvailableOrderStatusType,
  ): Result<OrderStatusValueObject> {
    const isValidString = validateStringLengthBetweenMaxAndMin({
      text: status,
      maxLength: MAX_ORDER_STATUS_LENGTH,
      minLength: MIN_ORDER_STATUS_LENGTH,
    });

    if (!isValidString) {
      return Result.fail<OrderStatusValueObject>(
        ERROR_ORDER_STATUS_INVALID_LENGTH,
      );
    }

    const isValid = validateEnumIncludesValue({
      enum: AvailableOrderStatus,
      value: status,
    });

    if (!isValid) {
      return Result.fail<OrderStatusValueObject>(ERROR_ORDER_STATUS_INVALID);
    }

    if (!this.isValidInitial(status)) {
      return Result.fail<OrderStatusValueObject>(ERROR_ORDER_STATUS_INVALID);
    }

    return Result.ok<OrderStatusValueObject>(
      new OrderStatusValueObject({ value: status }),
    );
  }
}
