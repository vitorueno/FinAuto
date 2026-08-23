import { describe, it, expect } from 'vitest';
import { maskRateInput, formatRateDisplay } from './rateMask';

const brl = { dec: ',', thou: '.' } as const;

describe('maskRateInput', () => {
  it.each([
    ['1', '0,01'],
    ['18', '0,18'],
    ['180', '1,80'],
    ['220', '2,20'],
    ['', ''],
  ])('typing "%s" renders "%s"', (typed, expeted) => {
    expect(maskRateInput(typed, brl)).toBe(expeted);
  });

  it('caps input at 4 digits', () => {
    expect(maskRateInput('123456', brl)).toBe('12,34');
  });
});

describe('formatRateDisplay', () => {
  it('formats a number to two decimals using the given separator', () => {
    expect(formatRateDisplay(1.5, brl)).toBe('1,50');
  });
});
