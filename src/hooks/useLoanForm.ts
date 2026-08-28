import { useState } from 'react';
import type { Copy } from '../i18n/copy';
import type { Currency, FieldErrors, LoanResult } from '../domain/types';
import { getSeparators } from '../domain/separators';
import { maskAmountInput } from '../domain/amountMask';
import { maskRateInput, formatRateDisplay } from '../domain/rateMask';
import { parseAmount } from '../domain/parseAmount';
import { formatNumber } from '../domain/numberFormat';
import { computeAmortization } from '../domain/amortization';
import { validateLoanForm } from '../domain/validateLoanForm';
import { useCountUpValues } from './useCountUpValues';

const ZERO_RESULT: LoanResult = {
  principal: 0,
  monthlyPayment: 0,
  totalPaid: 0,
  totalInterest: 0,
  effectiveAnnualRatePercent: 0,
};

interface UseLoanFormArgs {
  currency: Currency;
  t: Copy;
}

export function useLoanForm({ currency, t }: UseLoanFormArgs) {
  const [vehiclePrice, setVehiclePrice] = useState('45.000,00');
  const [downPayment, setDownPayment] = useState('10.000,00');
  const [rate, setRate] = useState('');
  const [installments, setInstallments] = useState(48);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [results, setResults] = useState<LoanResult | null>(null);
  const { values: animatedValues, animateTo } = useCountUpValues(ZERO_RESULT);

  const sep = getSeparators(currency);

  function handleVehiclePriceChange(raw: string) {
    setVehiclePrice(maskAmountInput(raw, sep));
  }

  function handleDownPaymentChange(raw: string) {
    setDownPayment(maskAmountInput(raw, sep));
  }

  function handleRateChange(raw: string) {
    setRate(maskRateInput(raw, sep));
  }

  function handleInstallmentsChange(next: number) {
    setInstallments(Math.max(1, Math.min(96, next)));
  }

  function reformatForCurrency(newCurrency: Currency) {
    const oldSep = sep;
    const newSep = getSeparators(newCurrency);

    const convertAmount = (value: string) => {
      const n = parseAmount(value, oldSep);
      return isNaN(n) ? '' : formatNumber(n, newSep);
    };

    const convertRate = (value: string) => {
      const n = parseAmount(value, oldSep);
      return isNaN(n) ? '' : formatRateDisplay(n, newSep);
    };

    setVehiclePrice((v) => convertAmount(v));
    setDownPayment((v) => convertAmount(v));
    setRate((v) => convertRate(v));
  }

  function submit() {
    const values = { vehiclePrice, downPayment, rate, installments };
    const validationErrors = validateLoanForm(values, sep, t.errors);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setResults(null);
      return;
    }

    const vp = parseAmount(vehiclePrice, sep);
    const dp = parseAmount(downPayment, sep);
    const r = parseAmount(rate, sep);
    const computed = computeAmortization(vp - dp, r, installments);
    setResults(computed);
    animateTo(computed);
  }

  return {
    sep,
    vehiclePrice,
    downPayment,
    rate,
    installments,
    errors,
    results,
    animatedValues,
    handleVehiclePriceChange,
    handleDownPaymentChange,
    handleRateChange,
    handleInstallmentsChange,
    reformatForCurrency,
    submit,
  };
}
