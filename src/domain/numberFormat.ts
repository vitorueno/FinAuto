import type { Separators } from './types';

// Matches every thousands-digit boundary for separator insertion.
const THOUSANDS_BOUNDARY = /\B(?=(\d{3})+(?!\d))/g;

export function formatNumber(num: number, sep: Separators): string {
  if (Number.isNaN(num)) return '';

  const [intPart, decPart] = num.toFixed(2).split('.');

  return intPart.replace(THOUSANDS_BOUNDARY, sep.thou) + sep.dec + decPart;
}
