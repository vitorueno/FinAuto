import type { Currency, Separators } from './types';

export function getSeparators(currency: Currency): Separators {
  return currency === 'BRL' ? { dec: ',', thou: '.' } : { dec: '.', thou: ',' };
}
