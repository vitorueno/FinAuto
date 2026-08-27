import type { Copy } from '../../i18n/copy';
import type { FieldErrors } from '../../domain/types';
import { AmountField } from './AmountField';
import { RateField } from './RateField';
import { InstallmentsField } from './InstallmentsField';
import styles from './LoanForm.module.css';

interface Placeholders {
  vehicle: string;
  down: string;
  rate: string;
}

interface LoanFormProps {
  t: Copy;
  vehiclePrice: string;
  downPayment: string;
  rate: string;
  installments: number;
  errors: FieldErrors;
  placeholders: Placeholders;
  onVehiclePriceChange: (raw: string) => void;
  onDownPaymentChange: (raw: string) => void;
  onRateChange: (raw: string) => void;
  onInstallmentsChange: (value: number) => void;
  onSubmit: () => void;
}

export function LoanForm({
  t,
  vehiclePrice,
  downPayment,
  rate,
  installments,
  errors,
  placeholders,
  onVehiclePriceChange,
  onDownPaymentChange,
  onRateChange,
  onInstallmentsChange,
  onSubmit,
}: LoanFormProps) {
  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <AmountField
        label={t.vehiclePrice}
        placeholder={placeholders.vehicle}
        value={vehiclePrice}
        error={errors.vehiclePrice}
        onChange={onVehiclePriceChange}
      />
      <AmountField
        label={t.downPayment}
        placeholder={placeholders.down}
        value={downPayment}
        error={errors.downPayment}
        onChange={onDownPaymentChange}
      />
      <RateField
        label={t.rate}
        hint={t.rateHint}
        placeholder={placeholders.rate}
        value={rate}
        error={errors.rate}
        onChange={onRateChange}
      />
      <InstallmentsField
        label={t.installments}
        unit={t.installmentsUnit}
        value={installments}
        error={errors.installments}
        onChange={onInstallmentsChange}
      />
      <button type="submit" className={styles.submit}>
        {t.calculate}
      </button>
    </form>
  );
}
