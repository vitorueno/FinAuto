import { useId } from 'react';
import styles from './LoanForm.module.css';
import { FieldError } from './FieldError';

interface RateFieldProps {
  label: string;
  hint: string;
  placeholder: string;
  value: string;
  error?: string;
  onChange: (raw: string) => void;
}

export function RateField({
  label,
  hint,
  placeholder,
  value,
  error,
  onChange,
}: RateFieldProps) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className={styles.fieldLabel}>
        {label}
      </label>
      <div className={styles.inputWrap}>
        <input
          id={id}
          type="text"
          inputMode="decimal"
          className={styles.input}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <span className={styles.inputSuffix}>{hint}</span>
      </div>
      <FieldError message={error} />
    </div>
  );
}
