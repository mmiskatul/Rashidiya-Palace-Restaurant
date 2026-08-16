import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge conditional class names, with later Tailwind utilities winning. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Turn a stored E.164 phone number into a human-readable form.
 * "+971568123717" -> "+971 56 812 3717"
 */
export function formatPhone(e164: string): string {
  const digits = e164.replace(/[^\d]/g, "");
  if (digits.length !== 12 || !digits.startsWith("971")) return e164;
  return `+971 ${digits.slice(3, 5)} ${digits.slice(5, 8)} ${digits.slice(8)}`;
}
