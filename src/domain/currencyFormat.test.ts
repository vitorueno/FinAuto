import { describe, it, expect } from 'vitest';
import { formatCurrency } from './currencyFormat';

describe('formatCurrency', () => {
  it('renders BRL with a space between symbol and amount', () => {
    expect(formatCurrency(1234.56, 'BRL')).toBe('R$ 1.234,56');
  });

  it('renders USD with a space between symbol and amount', () => {
    expect(formatCurrency(1234.56, 'USD')).toBe('$ 1,234.56');
  });
});
