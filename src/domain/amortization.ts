import type { LoanResult } from './types';

const MONTHS_PER_YEAR = 12;

export function computeAmortization(
  principal: number,
  monthlyRatePct: number,
  installments: number,
): LoanResult {
  const monthlyRate = monthlyRatePct / 100;

  const monthlyPayment =
    monthlyRate === 0
      ? principal / installments
      : priceFormulaPayment(principal, monthlyRate, installments);

  const totalPaid = monthlyPayment * installments;
  const totalInterest = totalPaid - principal;
  const effectiveAnnualRatePercent = compoundedAnnualRatePercent(monthlyRate);

  return {
    principal,
    monthlyPayment,
    totalPaid,
    totalInterest,
    effectiveAnnualRatePercent,
  };
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

function compoundedAnnualRatePercent(monthlyRate: number): number {
  return (Math.pow(1 + monthlyRate, MONTHS_PER_YEAR) - 1) * 100;
}
