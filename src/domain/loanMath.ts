import type { LoanResult } from './types';

export function computeAmortization(
  principal: number,
  monthlyRatePct: number,
  n: number,
): LoanResult {
  const i = monthlyRatePct / 100;
  const payment =
    i === 0 ? principal / n : (principal * i) / (1 - Math.pow(1 + i, -n));
  const totalPaid = payment * n;
  const totalInterest = totalPaid - principal;
  const effectiveAnnual = (Math.pow(1 + i, 12) - 1) * 100;

  return { principal, payment, totalPaid, totalInterest, effectiveAnnual };
}
