import {
	MAX_ORDER_STATUS_LENGTH,
	MIN_ORDER_STATUS_LENGTH
} from './order-status.value-object';

export const ERROR_ORDER_STATUS_INVALID = 'Error invalid status enum';
export const ERROR_ORDER_STATUS_INVALID_LENGTH = `Enum length must be between ${MIN_ORDER_STATUS_LENGTH} and ${MAX_ORDER_STATUS_LENGTH}`;
