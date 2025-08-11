import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatCurrency(amount: number | string): string {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (isNaN(num)) return '0';

  return num.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}

export function formatCurrencyWithSymbol(amount: number | string, symbol = '₦'): string {
  return `${symbol}${formatCurrency(amount)}`;
}


export function formatDateCustom(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  };

  const formatted = date.toLocaleDateString("en-US", options);
  return formatted.replace(/, (\d{4})$/, " $1"); // remove comma before year
}