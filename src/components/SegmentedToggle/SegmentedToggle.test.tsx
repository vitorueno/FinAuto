import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SegmentedToggle } from './SegmentedToggle';
import styles from './SegmentedToggle.module.css';

const options = [
  { value: 'en', label: 'EN' },
  { value: 'pt', label: 'PT' },
] as const;

describe('SegmentedToggle', () => {
  it('marks the active option and calls onChange with the clicked value', async () => {
    const onChange = vi.fn();
    render(
      <SegmentedToggle options={[...options]} value="en" onChange={onChange} />,
    );

    expect(screen.getByRole('button', { name: 'EN' })).toHaveClass(
      styles.isActive,
    );
    expect(screen.getByRole('button', { name: 'PT' })).not.toHaveClass(
      styles.isActive,
    );

    await userEvent.click(screen.getByRole('button', { name: 'PT' }));
    expect(onChange).toHaveBeenCalledWith('pt');
  });
});
