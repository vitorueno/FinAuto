import styles from './ResultsPane.module.css';

interface DonutProps {
  interestPercent: number;
}

export function Donut({ interestPercent }: DonutProps) {
  const style = {
    background: `conic-gradient(var(--accent) 0% ${interestPercent}%, var(--principal-color) ${interestPercent}% 100%)`,
  };
  return (
    <div className={styles.donut} style={style}>
      <div className={styles.donutCenter}>{Math.round(interestPercent)}%</div>
    </div>
  );
}
