import { describe, it, expect } from 'vitest';
import { maskAmountInput } from './amountMask';
import type { Separators } from './types';

const brl: Separators = { dec: ',', thou: '.' };
const usd: Separators = { dec: '.', thou: ',' };

function typeDigits(digits: string, sep: Separators): string {
  let value = '';
  for (const digit of digits) value = maskAmountInput(value + digit, sep);
  return value;
}

describe('maskAmountInput', () => {
  it('returns empty string for empty input', () => {
    expect(maskAmountInput('', brl)).toBe('');
  });

  it('fills from the right, treating the last two digits as cents', () => {
    expect(maskAmountInput('3', brl)).toBe('0,03');
    expect(maskAmountInput('350', brl)).toBe('3,50');
    expect(maskAmountInput('3500000', brl)).toBe('35.000,00');
  });

  it('keeps growing when it re-reads its own output, one keystroke at a time', () => {
    expect(typeDigits('3500000', brl)).toBe('35.000,00');
  });

  it('ignores every character that is not a digit', () => {
    expect(maskAmountInput('R$ 45a000,00', brl)).toBe('45.000,00');
  });

  it('separates every thousands group, not only the first', () => {
    expect(maskAmountInput('123456789', brl)).toBe('1.234.567,89');
  });

  it('uses the separators of the active currency', () => {
    expect(typeDigits('3500000', usd)).toBe('35,000.00');
  });
});
