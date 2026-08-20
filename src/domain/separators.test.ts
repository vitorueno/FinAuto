import { describe, it, expect } from 'vitest';
import { getSeparators } from './separators';

describe('getSeparators', () => {
  it('uses comma decimal and dot thousands for BRL', () => {
    expect(getSeparators('BRL')).toEqual({ dec: ',', thou: '.' });
  });

  it('uses dot decimal and comma thousands for USD', () => {
    expect(getSeparators('USD')).toEqual({ dec: '.', thou: ',' });
  });
});
