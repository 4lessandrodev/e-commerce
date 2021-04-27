import { Currency } from '../value-objects/monetary/Currency.value-object';

export const formatNumberToCurrency = (props: Currency): string =>
  props.value.toLocaleString(props.locale, {
    style: 'currency',
    minimumFractionDigits: 2,
    currency: props.symbol,
  });
