import clsx from 'clsx';
import styles from './SegmentedToggle.module.css';

export interface SegmentedToggleOption<T extends string> {
  value: T;
  label: string;
}

interface SegmentedToggleProps<T extends string> {
  options: SegmentedToggleOption<T>[];
  value: T;
  onChange: (value: T) => void;
}

export function SegmentedToggle<T extends string>({
  options,
  value,
  onChange,
}: SegmentedToggleProps<T>) {
  return (
    <div className={styles.toggle}>
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          className={clsx(
            styles.button,
            opt.value === value && styles.isActive,
          )}
          onClick={() => onChange(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
