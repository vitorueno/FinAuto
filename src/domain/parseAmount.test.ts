import { describe, it, expect } from 'vitest';
import { parseAmount } from './parseAmount';

const brl = { dec: ',', thou: '.' } as const;
const usd = { dec: '.', thou: ',' } as const;

describe('parseAmount', () => {
  it('parses a BRL-formatted string back to a number', () => {
    expect(parseAmount('45.000,50', brl)).toBe(45000.5);
  });

  it('parsed a USD-formatted string back to a number', () => {
    expect(parseAmount('45,000.50', usd)).toBe(45000.5);
  });

  it('returns NaN for an empty string', () => {
    expect(parseAmount('', brl)).toBeNaN();
  });
});
