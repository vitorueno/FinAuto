export function computeInterestSharePercent(
  totalInterest: number,
  totalPaid: number,
): number {
  if (totalPaid <= 0) return 0;
  return Math.max(0, Math.min(100, (totalInterest / totalPaid) * 100));
}
