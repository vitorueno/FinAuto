import type { Separators } from './types';

export function numberToDisplay(num: number, sep: Separators): string {
  if (Number.isNaN(num)) return '';

  const hasDecimal = Math.abs(num % 1) > 1e-9;
  const str = hasDecimal ? num.toFixed(2) : String(Math.round(num));
  const [intRaw, decRaw] = str.split('.');
  const intPart = intRaw.replace(/\B(?=(\d{3})+(?!\d))/g, sep.thou);
  return decRaw ? intPart + sep.dec + decRaw : intPart;
}
