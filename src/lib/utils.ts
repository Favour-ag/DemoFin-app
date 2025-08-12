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
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };

  // Format date and remove the comma before year
  const formattedDate = date
    .toLocaleDateString("en-US", dateOptions)
    .replace(/, (\d{4})$/, " $1");

  // Format time and make AM/PM lowercase
  const formattedTime = date
    .toLocaleTimeString("en-US", timeOptions)
    .toLowerCase();

  return `${formattedDate} - ${formattedTime}`;
}

