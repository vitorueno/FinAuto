import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCountUpValues } from './useCountUpValues';

describe('useCountUpValues', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.stubGlobal('requestAnimationFrame', vi.fn());
    vi.stubGlobal('cancelAnimationFrame', vi.fn());
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it('starts with no values until animateTo is called', () => {
    const { result } = renderHook(() => useCountUpValues({ total: 0 }));
    expect(result.current.values).toBe(null);
  });

  it('forces exact target values once the fallback timeout fires, even if rAF never ran', () => {
    const { result } = renderHook(() => useCountUpValues({ total: 0 }));

    act(() => {
      result.current.animateTo({ total: 100 });
    });

    act(() => {
      vi.advanceTimersByTime(750);
    });

    expect(result.current.values).toEqual({ total: 100 });
  });
});
