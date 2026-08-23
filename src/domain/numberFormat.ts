import type { Separators } from './types';

// Tolerance for float rounding error in "num % 1".
const FLOAT_EPSILON = 1e-9;

// Matches every thousands-digit boundary for separator insertion.
const THOUSANDS_BOUNDARY = /\B(?=(\d{3})+(?!\d))/g;

export function formatNumber(num: number, sep: Separators): string {
  if (Number.isNaN(num)) return '';

  const hasDecimal = Math.abs(num % 1) > FLOAT_EPSILON;
  const str = hasDecimal ? num.toFixed(2) : String(Math.round(num));

  const [intRaw, decRaw] = str.split('.');
  const intPart = intRaw.replace(THOUSANDS_BOUNDARY, sep.thou);

  return decRaw ? intPart + sep.dec + decRaw : intPart;
}
