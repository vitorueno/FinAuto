import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoanForm } from './LoanForm';
import { COPY } from '../../i18n/copy';

const baseProps = {
  t: COPY.en,
  vehiclePrice: '45.000',
  downPayment: '10.000',
  rate: '1,50',
  installments: 48,
  errors: {},
  placeholders: { vehicle: '45.000', down: '10.000', rate: '1,50' },
  onVehiclePriceChange: vi.fn(),
  onDownPaymentChange: vi.fn(),
  onRateChange: vi.fn(),
  onInstallmentsChange: vi.fn(),
  onSubmit: vi.fn(),
};

describe('LoanForm', () => {
  it('shows the inline error message for a field that has one', () => {
    render(
      <LoanForm {...baseProps} errors={{ rate: 'Must be greater than 0' }} />,
    );
    expect(screen.getByText('Must be greater than 0')).toBeInTheDocument();
  });

  it('forwards the raw typed value to the vehicle price handler', async () => {
    const onVehiclePriceChange = vi.fn();
    render(
      <LoanForm {...baseProps} onVehiclePriceChange={onVehiclePriceChange} />,
    );

    await userEvent.type(screen.getByLabelText(COPY.en.vehiclePrice), '9');
    expect(onVehiclePriceChange).toHaveBeenCalled();
  });

  it('calls onSubmit when the form is submitted, without a page reload', async () => {
    const onSubmit = vi.fn();
    render(<LoanForm {...baseProps} onSubmit={onSubmit} />);

    await userEvent.click(
      screen.getByRole('button', { name: COPY.en.calculate }),
    );
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});
