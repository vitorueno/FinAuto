import { describe, it, expect } from 'vitest';
import { validateLoanForm } from './validateLoanForm';
import { getSeparators } from './separators';

const sep = getSeparators('BRL');
const messages = {
  required: 'Required',
  downGteVehicle: 'Must be less than vehicle price',
  ratePositive: 'Must be greater than 0',
  installmentsRange: 'Enter 1–96 installments',
};

const validValues = {
  vehiclePrice: '45.000',
  downPayment: '10.000',
  rate: '1,50',
  installments: 48,
};

describe('validateLoanForm', () => {
  it('returns no errors for a fully valid form', () => {
    expect(validateLoanForm(validValues, sep, messages)).toEqual({});
  });

  it('requires vehicle price', () => {
    const errors = validateLoanForm(
      { ...validValues, vehiclePrice: '' },
      sep,
      messages,
    );
    expect(errors.vehiclePrice).toBe(messages.required);
  });

  it('rejects a down payment greater than or equal to the vehicle price', () => {
    const errors = validateLoanForm(
      { ...validValues, downPayment: '45.000' },
      sep,
      messages,
    );
    expect(errors.downPayment).toBe(messages.downGteVehicle);
  });

  it('requires a positive rate', () => {
    const errors = validateLoanForm(
      { ...validValues, rate: '' },
      sep,
      messages,
    );
    expect(errors.rate).toBe(messages.ratePositive);
  });

  it('requires installments between 1 and 96', () => {
    expect(
      validateLoanForm({ ...validValues, installments: 0 }, sep, messages)
        .installments,
    ).toBe(messages.installmentsRange);
    expect(
      validateLoanForm({ ...validValues, installments: 97 }, sep, messages)
        .installments,
    ).toBe(messages.installmentsRange);
  });
});
