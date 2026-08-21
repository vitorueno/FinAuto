import type { Separators } from './types';

export function formatRateInput(raw: string, sep: Separators): string {
  const digits = raw
    .replace(/\D/g, '')
    .replace(/^0+(?=\d)/, '')
    .slice(0, 4);
  if (digits === '') return '';

  const padded = digits.padStart(3, '0');
  const intPart = padded.slice(0, -2).replace(/^0+(?=\d)/, '');
  const decPart = padded.slice(-2);
  return (intPart === '' ? '0' : intPart) + sep.dec + decPart;
}

export function formatRateDisplay(num: number, sep: Separators): string {
  if (Number.isNaN(num)) return '';

  return num.toFixed(2).replace('.', sep.dec);
}
