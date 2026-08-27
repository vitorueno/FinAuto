import styles from './LoanForm.module.css';
import { FieldError } from './FieldError';

interface InstallmentsFieldProps {
  label: string;
  unit: string;
  value: number;
  error?: string;
  onChange: (value: number) => void;
}

export function InstallmentsField({
  label,
  unit,
  value,
  error,
  onChange,
}: InstallmentsFieldProps) {
  return (
    <div>
      <label className={styles.fieldLabel}>
        {label}: <span className={styles.installmentsValue}>{value}</span>{' '}
        {unit}
      </label>
      <div className={styles.installmentsRow}>
        <input
          className={styles.slider}
          type="range"
          min={1}
          max={96}
          aria-label={label}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
        />
        <input
          type="text"
          inputMode="numeric"
          className={styles.installmentsNumber}
          aria-label={`${label} (${unit})`}
          value={value}
          onChange={(e) => onChange(Number(e.target.value.replace(/\D/g, '')))}
        />
      </div>
      <FieldError message={error} />
    </div>
  );
}
