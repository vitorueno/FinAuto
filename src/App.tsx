import { useState } from 'react';
import clsx from 'clsx';
import { Header } from './components/Header/Header';
import { LoanForm } from './components/LoanForm/LoanForm';
import { ResultsPane } from './components/ResultsPane/ResultsPane';
import { useLoanForm } from './hooks/useLoanForm';
import { useIsNarrow } from './hooks/useIsNarrow';
import { COPY } from './i18n/copy';
import { formatNumber } from './domain/numberFormat';
import { formatRateDisplay } from './domain/rateMask';
import type { Currency, Lang } from './domain/types';
import styles from './App.module.css';

const NARROW_BREAKPOINT = 760;

function App() {
  const [lang, setLang] = useState<Lang>('en');
  const [currency, setCurrency] = useState<Currency>('USD');
  const isNarrow = useIsNarrow(NARROW_BREAKPOINT);

  const t = COPY[lang];
  const form = useLoanForm({ currency, t });

  const placeholders = {
    vehicle: formatNumber(45000, form.sep),
    down: formatNumber(10000, form.sep),
    rate: formatRateDisplay(1.5, form.sep),
  };

  function handleCurrencyChange(next: Currency) {
    form.reformatForCurrency(next);
    setCurrency(next);
  }

  return (
    <div className={clsx(styles.page, isNarrow && styles.isNarrow)}>
      <div className={clsx(styles.card, isNarrow && styles.isNarrow)}>
        <div className={clsx(styles.grid, isNarrow && styles.isNarrow)}>
          <div
            className={clsx(
              styles.pane,
              styles.formPane,
              isNarrow && styles.isNarrow,
            )}
          >
            <Header
              t={t}
              lang={lang}
              currency={currency}
              onLangChange={setLang}
              onCurrencyChange={handleCurrencyChange}
            />
            <LoanForm
              t={t}
              vehiclePrice={form.vehiclePrice}
              downPayment={form.downPayment}
              rate={form.rate}
              installments={form.installments}
              errors={form.errors}
              placeholders={placeholders}
              onVehiclePriceChange={form.handleVehiclePriceChange}
              onDownPaymentChange={form.handleDownPaymentChange}
              onRateChange={form.handleRateChange}
              onInstallmentsChange={form.handleInstallmentsChange}
              onSubmit={form.submit}
            />
          </div>
          <div
            className={clsx(
              styles.pane,
              styles.resultPane,
              isNarrow && styles.isNarrow,
            )}
          >
            <ResultsPane
              t={t}
              currency={currency}
              hasResults={!!form.results}
              values={form.animatedValues}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
