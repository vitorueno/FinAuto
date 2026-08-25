import { useEffect, useRef, useState } from 'react';

type NumericRecord<T> = { [K in keyof T]: number };

const ANIMATION_DURATION_MS = 550;
const FALLBACK_MARGIN_MS = 200;

function interpolate<T extends NumericRecord<T>>(
  start: T,
  target: T,
  progress: number,
): T {
  const eased = 1 - Math.pow(1 - progress, 3);
  const result = { ...target };

  for (const key of Object.keys(target) as Array<keyof T>) {
    const distance = target[key] - start[key];
    result[key] = (start[key] + distance * eased) as T[keyof T];
  }

  return result;
}

function animate(
  durationMs: number,
  onProgress: (progress: number) => void,
): () => void {
  const startedAt = performance.now();

  let rafId = requestAnimationFrame(function drawFrame(now: number) {
    const elapsed = (now - startedAt) / durationMs;
    const progress = Math.min(1, elapsed);

    onProgress(progress);
    if (progress < 1) rafId = requestAnimationFrame(drawFrame);
  });

  const fallbackId = setTimeout(() => {
    cancelAnimationFrame(rafId);
    onProgress(1);
  }, durationMs + FALLBACK_MARGIN_MS);

  return () => {
    cancelAnimationFrame(rafId);
    clearTimeout(fallbackId);
  };
}

export function useCountUpValues<T extends NumericRecord<T>>(zeroValues: T) {
  const [values, setValues] = useState<T | null>(null);
  const cancelRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    return () => cancelRef.current?.();
  }, []);

  function animateTo(target: T) {
    cancelRef.current?.();

    const start = values ?? zeroValues;
    cancelRef.current = animate(ANIMATION_DURATION_MS, (progress) => {
      setValues(progress === 1 ? target : interpolate(start, target, progress));
    });
  }

  return { values, animateTo };
}
