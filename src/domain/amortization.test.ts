import { describe, it, expect } from 'vitest';
import { computeAmortization } from './amortization';

describe('computeAmortization', () => {
  it('falls back to a flat split when the rate is zero', () => {
    const result = computeAmortization(12000, 0, 12);
    expect(result.monthlyPayment).toBe(1000);
    expect(result.totalInterest).toBe(0);
  });

  it('reduces to principal * (1 + i) when there is a single installment', () => {
    const result = computeAmortization(1000, 2, 1);
    expect(result.monthlyPayment).toBeCloseTo(1000 * 1.02, 6);
  });

  it('keeps total paid and total interest consistent with the payment, for a realistic scenario', () => {
    const result = computeAmortization(35000, 1.5, 48);
    expect(result.monthlyPayment).toBeCloseTo(1028.125, 2);
    expect(result.totalPaid).toBeCloseTo(result.monthlyPayment * 48, 6);
    expect(result.totalInterest).toBeCloseTo(result.totalPaid - 35000, 6);
  });

  it('computes the effective annual rate as the 12-month compound of the monthly rate', () => {
    const result = computeAmortization(35000, 1.5, 48);
    expect(result.effectiveAnnualRatePercent).toBeCloseTo(19.56, 2);
  });
});
