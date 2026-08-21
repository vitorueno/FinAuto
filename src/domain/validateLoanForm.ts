import type { FieldErrors, Separators } from './types';
import { parseAmountWith } from './parseAmount';

export interface ValidationMessages {
  required: string;
  downGteVehicle: string;
  ratePositive: string;
  installmentsRange: string;
}

export interface LoanFormValues {
  vehiclePrice: string;
  downPayment: string;
  rate: string;
  installments: number;
}

export function validateLoanForm(
  values: LoanFormValues,
  sep: Separators,
  messages: ValidationMessages,
): FieldErrors {
  const errors: FieldErrors = {};
  const vehiclePrice = parseAmountWith(values.vehiclePrice, sep);
  const downPayment = parseAmountWith(values.downPayment, sep);
  const rate = parseAmountWith(values.rate, sep);
  const installments = values.installments;

  if (isNaN(vehiclePrice) || vehiclePrice <= 0)
    errors.vehiclePrice = messages.required;

  if (isNaN(downPayment) || downPayment < 0)
    errors.downPayment = messages.required;
  else if (!isNaN(vehiclePrice) && downPayment >= vehiclePrice)
    errors.downPayment = messages.downGteVehicle;

  if (isNaN(rate) || rate <= 0) errors.rate = messages.ratePositive;

  if (!installments || installments < 1 || installments > 96)
    errors.installments = messages.installmentsRange;

  return errors;
}
