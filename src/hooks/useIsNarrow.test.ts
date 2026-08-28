import { describe, it, expect, vi } from 'vitest';
import type { Mock } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useIsNarrow } from './useIsNarrow';

function mockMatchMedia(initialMatches: boolean) {
  const listeners: Array<() => void> = [];
  const mql = {
    matches: initialMatches,
    media: '',
    addEventListener: (_: string, listener: () => void) =>
      listeners.push(listener),
    removeEventListener: vi.fn(),
  };

  window.matchMedia = vi
    .fn()
    .mockReturnValue(mql) as unknown as typeof window.matchMedia;

  return {
    queries: () =>
      (window.matchMedia as unknown as Mock).mock.calls.map((c) => c[0]),
    trigger(next: boolean) {
      mql.matches = next;
      listeners.forEach((l) => l());
    },
  };
}

describe('useIsNarrow', () => {
  it('returns true when the viewport starts narrower than the breakpoint', () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useIsNarrow(760));
    expect(result.current).toBe(true);
  });

  it('asks the browser for a syntactically valid media query', () => {
    const { queries } = mockMatchMedia(false);
    renderHook(() => useIsNarrow(760));
    expect(queries()).toEqual(['(max-width: 759px)']);
  });

  it('updates when the media query match changes', () => {
    const { trigger } = mockMatchMedia(false);
    const { result } = renderHook(() => useIsNarrow(760));
    expect(result.current).toBe(false);

    act(() => trigger(true));
    expect(result.current).toBe(true);
  });
});
