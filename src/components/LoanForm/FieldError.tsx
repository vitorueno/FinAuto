import styles from './FieldError.module.css';

export function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <div className={styles.error}>{message}</div>;
}
