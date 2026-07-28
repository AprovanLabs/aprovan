import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Race a promise against a timeout, rejecting with `message` instead of
 * leaving the caller awaiting forever. The edit flow's post-edit compile
 * step (`compile(response.newCode)` in `useEditSession`) calls into a
 * host-supplied compiler with no timeout of its own — a stalled fetch inside
 * it (e.g. an unreachable CDN) previously left `isApplying` stuck `true`
 * indefinitely, an infinite spinner with no way for the user to tell a hang
 * from a slow compile. The timer is always cleared, win or lose.
 */
export function withTimeout<T>(promise: Promise<T>, ms: number, message: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(message)), ms);
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (err) => {
        clearTimeout(timer);
        reject(err);
      },
    );
  });
}
