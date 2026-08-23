import type { Separators } from './types';

// Strips leading zeros but keeps the last one: "007" -> "7", "000" -> "0"
const LEADING_ZEROS_BUT_ONE = /^0+(?=\d)/;
const NON_DIGIT = /\D/g;

function stripLeadingZeros(digits: string): string {
  return digits.replace(LEADING_ZEROS_BUT_ONE, '');
}

export function maskRateInput(raw: string, sep: Separators): string {
  const digits = stripLeadingZeros(raw.replace(NON_DIGIT, '')).slice(0, 4);
  if (digits === '') return '';

  const padded = digits.padStart(3, '0');
  const intDigits = stripLeadingZeros(padded.slice(0, -2));
  const intPart = intDigits === '' ? '0' : intDigits;
  const decPart = padded.slice(-2);

  return intPart + sep.dec + decPart;
}

export function formatRateDisplay(num: number, sep: Separators): string {
  if (Number.isNaN(num)) return '';

  return num.toFixed(2).replace('.', sep.dec);
}
