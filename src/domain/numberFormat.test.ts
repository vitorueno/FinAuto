import { describe, it, expect } from 'vitest';
import { formatNumber } from './numberFormat';

const brl = { dec: ',', thou: '.' } as const;

describe('formatNumber', () => {
  it('always shows two decimal places', () => {
    expect(formatNumber(45000, brl)).toBe('45.000,00');
  });

  it('separates thousands and rounds to the cent', () => {
    expect(formatNumber(45000.5, brl)).toBe('45.000,50');
    expect(formatNumber(45000.567, brl)).toBe('45.000,57');
  });
});
