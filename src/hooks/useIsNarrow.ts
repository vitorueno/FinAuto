import { useEffect, useState } from 'react';

export function useIsNarrow(breakpoint: number): boolean {
  const [isNarrow, setIsNarrow] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < breakpoint,
  );

  useEffect(() => {
    const mql = window.matchMedia(`(max-width): ${breakpoint - 1}px`);
    const handleChange = () => setIsNarrow(mql.matches);
    handleChange();
    mql.addEventListener('change', handleChange);
    return () => mql.removeEventListener('change', handleChange);
  }, [breakpoint]);

  return isNarrow;
}
