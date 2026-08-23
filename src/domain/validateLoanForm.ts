import type { FieldErrors, Separators } from './types';
import { parseAmount } from './parseAmount';

export interface ValidationMessages {
  invalidAmount: string;
  downPaymentExceedsVehiclePrice: string;
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
  const vehiclePrice = parseAmount(values.vehiclePrice, sep);
  const downPayment = parseAmount(values.downPayment, sep);
  const rate = parseAmount(values.rate, sep);
  const installments = values.installments;

  if (isNaN(vehiclePrice) || vehiclePrice <= 0)
    errors.vehiclePrice = messages.invalidAmount;

  if (isNaN(downPayment) || downPayment < 0)
    errors.downPayment = messages.invalidAmount;
  else if (!isNaN(vehiclePrice) && downPayment >= vehiclePrice)
    errors.downPayment = messages.downPaymentExceedsVehiclePrice;

  if (isNaN(rate) || rate <= 0) errors.rate = messages.ratePositive;

  if (!installments || installments < 1 || installments > 96)
    errors.installments = messages.installmentsRange;

  return errors;
}
