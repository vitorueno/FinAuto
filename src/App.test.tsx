import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { COPY } from './i18n/copy';

describe('App', () => {
  beforeEach(() => {
    vi.stubGlobal('requestAnimationFrame', vi.fn());
    vi.stubGlobal('cancelAnimationFrame', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('shows validation errors and no results when submitting an empty rate', async () => {
    render(<App />);
    await userEvent.click(
      screen.getByRole('button', { name: COPY.en.calculate }),
    );

    expect(screen.getByText(COPY.en.errors.ratePositive)).toBeInTheDocument();
    expect(screen.getByText(COPY.en.empty)).toBeInTheDocument();
  });

  it('calculates and displays results for a valid submission', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<App />);

    await user.type(screen.getByLabelText(COPY.en.rate), '150');
    await user.click(screen.getByRole('button', { name: COPY.en.calculate }));

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(screen.getByText('R$ 35.000,00')).toBeInTheDocument();
    expect(screen.getByText('19.56%')).toBeInTheDocument();

    vi.useRealTimers();
  });
});
