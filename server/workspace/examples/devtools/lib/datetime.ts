/**
 * Date/timezone helpers — epoch ↔ ISO conversion and rendering one instant
 * across time zones, all on Intl (no dependencies).
 */

export const COMMON_ZONES = [
  "UTC",
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "Europe/London",
  "Europe/Berlin",
  "Asia/Tokyo",
  "Asia/Kolkata",
  "Australia/Sydney",
] as const;

/** Parse epoch seconds, epoch millis, or any Date-parsable string. */
export function parseInstant(input: string): Date {
  const text = input.trim();
  if (/^\d{13}$/.test(text)) return new Date(Number(text));
  if (/^\d{10}$/.test(text)) return new Date(Number(text) * 1000);
  const date = new Date(text);
  if (Number.isNaN(date.getTime())) {
    throw new Error("Not a recognizable instant (epoch s/ms or ISO date)");
  }
  return date;
}

export function inZone(date: Date, timeZone: string): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    dateStyle: "medium",
    timeStyle: "long",
  }).format(date);
}

export interface InstantViews {
  iso: string;
  epochSeconds: number;
  epochMillis: number;
  zones: Array<{ zone: string; display: string }>;
}

export function describeInstant(date: Date): InstantViews {
  return {
    iso: date.toISOString(),
    epochSeconds: Math.floor(date.getTime() / 1000),
    epochMillis: date.getTime(),
    zones: COMMON_ZONES.map((zone) => ({ zone, display: inZone(date, zone) })),
  };
}
