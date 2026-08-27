import styles from './ResultsPane.module.css';

export function EmptyState({ message }: { message: string }) {
  return <div className={styles.empty}>{message}</div>;
}
