import type { Separators } from './types';

const NON_DIGIT = /\D/g;
// The field fills from the right, so the last two digits typed are the cents.
const CENTS_PER_UNIT = 100;

export function maskAmountInput(raw: string, sep: Separators): string {
  const digits = raw.replace(NON_DIGIT, '');
  if (digits === '') return '';

  const locale = sep.thou === '.' ? 'pt-BR' : 'en-US';

  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(digits) / CENTS_PER_UNIT);
}
