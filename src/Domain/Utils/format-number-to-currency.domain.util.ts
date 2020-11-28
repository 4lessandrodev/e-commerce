export const FormatNumberToCurrency = (value: number): string =>
  value.toLocaleString('pt-BR', {
    style: 'currency',
    minimumFractionDigits: 2,
    currency: 'BRL',
  });
