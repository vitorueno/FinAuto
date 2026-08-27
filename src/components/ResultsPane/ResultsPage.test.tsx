import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ResultsPane } from './ResultsPane';
import { COPY } from '../../i18n/copy';

describe('ResultsPane', () => {
  it('shows the empty-state message before any calculation', () => {
    render(
      <ResultsPane
        t={COPY.en}
        currency="BRL"
        hasResults={false}
        values={null}
      />,
    );
    expect(screen.getByText(COPY.en.empty)).toBeInTheDocument();
  });

  it('formats and displays every stat once results exist', () => {
    const values = {
      principal: 35000,
      monthlyPayment: 1028.1249862856819,
      totalPaid: 49349.999341712726,
      totalInterest: 14349.999341712726,
      effectiveAnnualRatePercent: 19.561817146153395,
    };
    render(
      <ResultsPane t={COPY.en} currency="BRL" hasResults values={values} />,
    );

    expect(screen.getByText('R$ 1.028,12')).toBeInTheDocument();
    expect(screen.getByText('R$ 35.000,00')).toBeInTheDocument();
    expect(screen.getByText('R$ 14.350,00')).toBeInTheDocument();
    expect(screen.getByText('R$ 49.350,00')).toBeInTheDocument();
    expect(screen.getByText('19.56%')).toBeInTheDocument();
    expect(screen.getByText('29%')).toBeInTheDocument();
  });
});
