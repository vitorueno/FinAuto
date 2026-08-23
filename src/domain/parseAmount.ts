import type { Separators } from './types';

export function parseAmount(str: string, sep: Separators): number {
  if (!str) return NaN;

  const cleaned = str.split(sep.thou).join('').split(sep.dec).join('.');

  return parseFloat(cleaned);
}
