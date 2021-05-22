import {
  MAX_CHANGES_LIMIT_VALUE,
  MIN_CHANGES_LIMIT_VALUE,
} from './changes-limit.value-object';

export const ERROR_INVALID_CHANGES_LIMIT = `Invalid value for changes limit, must be greater than ${MIN_CHANGES_LIMIT_VALUE} and less than ${MAX_CHANGES_LIMIT_VALUE}`;
