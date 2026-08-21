import { describe, it, expect } from 'vitest';
import { computeInterestSharePercent } from './interestShare';

describe('computeInterestSharePercent', () => {
  it('returns 0 when nothing has been paid yet', () => {
    expect(computeInterestSharePercent(0, 0)).toBe(0);
  });

  it('computes the interest share as a percentage of the total paid', () => {
    expect(computeInterestSharePercent(14350, 49350)).toBeCloseTo(29.08, 1);
  });
});
