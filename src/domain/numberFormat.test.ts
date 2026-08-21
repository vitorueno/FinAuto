import { describe, it, expect } from 'vitest';
import { numberToDisplay } from './numberFormat';

const brl = { dec: ',', thou: '.' } as const;

describe('numberToDisplay', () => {
  it('formats an integer without decimals', () => {
    expect(numberToDisplay(45000, brl)).toBe('45.000');
  });

  it('formats a number with a fractional part', () => {
    expect(numberToDisplay(45000.5, brl)).toBe('45.000,50');
  });
});
