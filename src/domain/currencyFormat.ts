import type { Currency } from './types';

export function formatCurrency(value: number, currency: Currency): string {
  const locale = currency === 'BRL' ? 'pt-BR' : 'en-US';
  const symbol = currency === 'BRL' ? 'R$' : '$';

  try {
    const numStr = new Intl.NumberFormat(locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value || 0);

    return `${symbol} ${numStr}`;
  } catch {
    return String(value);
  }
}
