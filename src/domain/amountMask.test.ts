import { describe, it, expect } from 'vitest';
import { maskAmountInput } from './amountMask';

const brl = { dec: ',', thou: '.' } as const;

describe('maskAmountInput', () => {
  it('returns empty string for empty input', () => {
    expect(maskAmountInput('', brl)).toBe('');
  });

  it('inserts thousands separators as digits are typed', () => {
    expect(maskAmountInput('45000', brl)).toBe('45.000');
  });

  it('accepts both , and . as the decimal marker and normalizes to the active currency', () => {
    expect(maskAmountInput('45000.50', brl)).toBe('45.000,50');
    expect(maskAmountInput('45000,50', brl)).toBe('45.000,50');
  });

  it('limits the decimal part to two digits', () => {
    expect(maskAmountInput('45000,5678', brl)).toBe('45.000,56');
  });

  it('strips leading zeros in the integer part', () => {
    expect(maskAmountInput('00450', brl)).toBe('450');
  });

  it('ignores any character that is not a digit or a decimal marker', () => {
    expect(maskAmountInput('R$ 45a000', brl)).toBe('45.000');
  });
});
