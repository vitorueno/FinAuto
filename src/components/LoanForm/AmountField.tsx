import { useId } from 'react';
import styles from './LoanForm.module.css';
import { FieldError } from './FieldError';

interface AmountFieldProps {
  label: string;
  placeholder: string;
  value: string;
  error?: string;
  onChange: (raw: string) => void;
}

export function AmountField({
  label,
  placeholder,
  value,
  error,
  onChange,
}: AmountFieldProps) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className={styles.fieldLabel}>
        {label}
      </label>
      <input
        id={id}
        type="text"
        inputMode="decimal"
        className={styles.input}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <FieldError message={error} />
    </div>
  );
}
