import type { LoanResult } from './types';

const MONTHS_PER_YEAR = 12;

export function computeAmortization(
  principal: number,
  monthlyRatePct: number,
  installments: number,
): LoanResult {
  const monthlyRate = monthlyRatePct / 100;

  const payment =
    monthlyRate === 0
      ? principal / installments
      : priceFormulaPayment(principal, monthlyRate, installments);

  const totalPaid = payment * installments;
  const totalInterest = totalPaid - principal;
  const effectiveAnnual = compoundedAnnualRate(monthlyRate);

  return { principal, payment, totalPaid, totalInterest, effectiveAnnual };
}

function priceFormulaPayment(
  principal: number,
  monthlyRate: number,
  installments: number,
): number {
  return (
    (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -installments))
  );
}

function compoundedAnnualRate(monthlyRate: number): number {
  return (Math.pow(1 + monthlyRate, MONTHS_PER_YEAR) - 1) * 100;
}
