import type { Separators } from './types';

function keepDigitsAndDecimalChar(raw: string, sep: Separators): string {
  const otherDec = sep.dec === ',' ? '.' : ',';
  const kept = raw
    .split('')
    .filter((c) => /[0-9]/.test(c) || c === sep.dec || c === otherDec)
    .join('');
  return kept.split(otherDec).join(sep.dec);
}

function splitIntegerAndDecimal(
  cleaned: string,
  sep: Separators,
): { intPart: string; decPart: string | null } {
  const decIdx = cleaned.indexOf(sep.dec);
  if (decIdx === -1) return { intPart: cleaned, decPart: null };

  const intPart = cleaned.slice(0, decIdx);
  const decPart = cleaned
    .slice(decIdx + 1)
    .split(sep.dec)
    .join('')
    .slice(0, 2);
  return { intPart, decPart };
}

function insertThousandsSeparators(digits: string, sep: Separators): string {
  const locale = sep.thou === '.' ? 'pt-BR' : 'en-US';
  return new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(
    Number(digits),
  );
}

export function formatAmountInput(raw: string, sep: Separators): string {
  const cleaned = keepDigitsAndDecimalChar(raw, sep);
  if (cleaned === '') return '';

  const { intPart, decPart } = splitIntegerAndDecimal(cleaned, sep);
  const withThousands = insertThousandsSeparators(intPart, sep);

  return decPart !== null ? withThousands + sep.dec + decPart : withThousands;
}
