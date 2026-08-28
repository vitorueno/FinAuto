import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useLoanForm } from './useLoanForm';
import { COPY } from '../i18n/copy';
import type { Currency } from '../domain/types';

function setup(currency: Currency = 'BRL') {
  return renderHook(({ currency }) => useLoanForm({ currency, t: COPY.en }), {
    initialProps: { currency },
  });
}

describe('useLoanForm', () => {
  it('starts with the default preset values and no results', () => {
    const { result } = setup();
    expect(result.current.vehiclePrice).toBe('45.000,00');
    expect(result.current.results).toBeNull();
  });

  it('masks amount input as the user types', () => {
    const { result } = setup();
    act(() => result.current.handleVehiclePriceChange('6000000'));
    expect(result.current.vehiclePrice).toBe('60.000,00');
  });

  it('blocks submit and reports errors when the form is invalid', () => {
    const { result } = setup();
    act(() => result.current.handleRateChange(''));
    act(() => result.current.submit());
    expect(result.current.errors.rate).toBe(COPY.en.errors.ratePositive);
    expect(result.current.results).toBeNull();
  });

  it('computes and stores results for a valid submission', () => {
    const { result } = setup();
    act(() => result.current.handleRateChange('150'));
    act(() => result.current.submit());
    expect(result.current.results).not.toBeNull();
    expect(result.current.results?.principal).toBe(35000);
  });

  it('reformats typed amounts when the currency changes, without clearing them', () => {
    const { result, rerender } = setup('BRL');
    act(() => result.current.handleVehiclePriceChange('6000000'));
    expect(result.current.vehiclePrice).toBe('60.000,00');

    act(() => result.current.reformatForCurrency('USD'));
    rerender({ currency: 'USD' });

    expect(result.current.vehiclePrice).toBe('60,000.00');
  });
});
