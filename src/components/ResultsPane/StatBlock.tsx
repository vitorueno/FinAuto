import clsx from 'clsx';
import styles from './ResultsPane.module.css';

interface StatBlockProps {
  label: string;
  value: string;
  emphasis?: boolean;
}

export function StatBlock({ label, value, emphasis }: StatBlockProps) {
  return (
    <div>
      <div className={styles.statLabel}>{label}</div>
      <div className={clsx(styles.statValue, emphasis && styles.isAccent)}>
        {value}
      </div>
    </div>
  );
}
