import type { Copy } from '../../i18n/copy';
import type { Currency, LoanResult } from '../../domain/types';
import { formatCurrency } from '../../domain/currencyFormat';
import { computeInterestSharePercent } from '../../domain/interestShare';
import { Donut } from './Donut';
import { StatBlock } from './StatBlock';
import { EmptyState } from './EmptyState';
import styles from './ResultsPane.module.css';

const ZERO_RESULT: LoanResult = {
  principal: 0,
  monthlyPayment: 0,
  totalPaid: 0,
  totalInterest: 0,
  effectiveAnnualRatePercent: 0,
};

interface ResultsPaneProps {
  t: Copy;
  currency: Currency;
  hasResults: boolean;
  values: LoanResult | null;
}

export function ResultsPane({
  t,
  currency,
  hasResults,
  values,
}: ResultsPaneProps) {
  const v = values ?? ZERO_RESULT;
  const interestPercent = computeInterestSharePercent(
    v.totalInterest,
    v.totalPaid,
  );

  return (
    <div>
      <div className={styles.resultsLabel}>{t.results}</div>

      {hasResults ? (
        <>
          <div className={styles.donutRow}>
            <Donut interestPercent={interestPercent} />
            <div className={styles.legend}>
              <div className={styles.legendItem}>
                <span
                  className={styles.legendSwatch}
                  style={{ background: 'var(--accent)' }}
                />
                {t.interest}
              </div>
              <div className={styles.legendItem}>
                <span
                  className={styles.legendSwatch}
                  style={{ background: 'var(--principal-color)' }}
                />
                {t.principal}
              </div>
            </div>
          </div>

          <div className={styles.stats}>
            <StatBlock
              label={t.monthlyPayment}
              value={formatCurrency(v.monthlyPayment, currency)}
              emphasis
            />
            <StatBlock
              label={t.totalFinanced}
              value={formatCurrency(v.principal, currency)}
            />
            <StatBlock
              label={t.totalInterest}
              value={formatCurrency(v.totalInterest, currency)}
            />
            <StatBlock
              label={t.totalPaid}
              value={formatCurrency(v.totalPaid, currency)}
            />
          </div>

          <div className={styles.effRateRow}>
            <span>{t.effectiveRate}</span>
            <span className={styles.effRateValue}>
              {v.effectiveAnnualRatePercent.toFixed(2)}%
            </span>
          </div>
        </>
      ) : (
        <EmptyState message={t.empty} />
      )}
    </div>
  );
}
