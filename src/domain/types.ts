export type Currency = 'BRL' | 'USD';
export type Lang = 'en' | 'pt';

export interface Separators {
  dec: ',' | '.';
  thou: ',' | '.';
}

export interface LoanResult {
  principal: number;
  monthlyPayment: number;
  totalPaid: number;
  totalInterest: number;
  effectiveAnnualRatePercent: number;
}

export type FieldErrors = Partial<{
  vehiclePrice: string;
  downPayment: string;
  rate: string;
  installments: string;
}>;
