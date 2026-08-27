import type { Copy } from '../../i18n/copy';
import type { Currency, Lang } from '../../domain/types';
import { CarLogo } from '../CarLogo/CarLogo';
import { SegmentedToggle } from '../SegmentedToggle/SegmentedToggle';
import styles from './Header.module.css';

interface HeaderProps {
  t: Copy;
  lang: Lang;
  currency: Currency;
  onLangChange: (lang: Lang) => void;
  onCurrencyChange: (currency: Currency) => void;
}

export function Header({
  t,
  lang,
  currency,
  onLangChange,
  onCurrencyChange,
}: HeaderProps) {
  return (
    <div className={styles.header}>
      <div className={styles.brand}>
        <div className={styles.logo}>
          <CarLogo />
        </div>
        <div>
          <div className={styles.title}>{t.title}</div>
          <div className={styles.subtitle}>{t.subtitle}</div>
        </div>
      </div>
      <div className={styles.toggles}>
        <SegmentedToggle
          value={lang}
          onChange={onLangChange}
          options={[
            { value: 'en', label: 'EN' },
            { value: 'pt', label: 'PT' },
          ]}
        />
        <SegmentedToggle
          value={currency}
          onChange={onCurrencyChange}
          options={[
            { value: 'BRL', label: 'R$' },
            { value: 'USD', label: '$' },
          ]}
        />
      </div>
    </div>
  );
}
