import { describe, it, expect } from 'vitest';
import { formatAmountInput } from './amountMask';

const brl = { dec: ',', thou: '.' } as const;

describe('formatAmountInput', () => {
  it('returns empty string for empty input', () => {
    expect(formatAmountInput('', brl)).toBe('');
  });

  it('inserts thousands separators as digits are typed', () => {
    expect(formatAmountInput('45000', brl)).toBe('45.000');
  });

  it('accepts both , and . as the decimal marker and normalizes to the active currency', () => {
    expect(formatAmountInput('45000.50', brl)).toBe('45.000,50');
    expect(formatAmountInput('45000,50', brl)).toBe('45.000,50');
  });

  it('limits the decimal part to two digits', () => {
    expect(formatAmountInput('45000,5678', brl)).toBe('45.000,56');
  });

  it('strips leading zeros in the integer part', () => {
    expect(formatAmountInput('00450', brl)).toBe('450');
  });

  it('ignores any character that is not a digit or a decimal marker', () => {
    expect(formatAmountInput('R$ 45a000', brl)).toBe('45.000');
  });
});
