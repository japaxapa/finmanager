import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/* eslint-disable */
export function debounce<T extends (...args: any[]) => any>(
  callback: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function (this: any, ...args: Parameters<T>): void {
    const context = this;

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      callback.apply(context, args);
    }, wait);
  };
}
/* eslint-enable */
