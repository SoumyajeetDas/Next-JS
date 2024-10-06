import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  // All the classes are merged
  return twMerge(clsx(inputs));
}
