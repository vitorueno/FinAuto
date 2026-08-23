import { describe, it, expect } from 'vitest';
import { formatNumber } from './numberFormat';

const brl = { dec: ',', thou: '.' } as const;

describe('formatNumber', () => {
  it('formats an integer without decimals', () => {
    expect(formatNumber(45000, brl)).toBe('45.000');
  });

  it('formats a number with a fractional part', () => {
    expect(formatNumber(45000.5, brl)).toBe('45.000,50');
  });
});
