/**
 * Minimal 5-field cron matcher (minute hour day-of-month month day-of-week),
 * evaluated in UTC. Supports: "*", numbers, ranges (1-5), lists (1,3,5), and
 * steps ("*\/15", "0-30/5"). Enough for workflow schedules without a
 * dependency; anything fancier should move to EventBridge Scheduler.
 */

import { ServiceError } from "../service-kernel.js";

const FIELD_RANGES: Array<[number, number]> = [
  [0, 59], // minute
  [0, 23], // hour
  [1, 31], // day of month
  [1, 12], // month
  [0, 6], // day of week (0 = Sunday)
];

function parseField(field: string, [min, max]: [number, number]): Set<number> {
  const values = new Set<number>();
  for (const part of field.split(",")) {
    const [rangePart, stepPart] = part.split("/");
    const step = stepPart === undefined ? 1 : Number(stepPart);
    if (!Number.isInteger(step) || step < 1) {
      throw new ServiceError(`Invalid cron step in "${part}"`, 400);
    }
    let lo = min;
    let hi = max;
    if (rangePart !== "*" && rangePart !== "") {
      const [a, b] = rangePart!.split("-");
      lo = Number(a);
      hi = b === undefined ? (stepPart === undefined ? lo : max) : Number(b);
      if (
        !Number.isInteger(lo) ||
        !Number.isInteger(hi) ||
        lo < min ||
        hi > max ||
        lo > hi
      ) {
        throw new ServiceError(`Invalid cron range "${part}" (${min}-${max})`, 400);
      }
    }
    for (let v = lo; v <= hi; v += step) values.add(v);
  }
  return values;
}

export interface CronSchedule {
  minute: Set<number>;
  hour: Set<number>;
  dayOfMonth: Set<number>;
  month: Set<number>;
  dayOfWeek: Set<number>;
}

export function parseCron(expression: string): CronSchedule {
  const fields = expression.trim().split(/\s+/u);
  if (fields.length !== 5) {
    throw new ServiceError(
      `Cron expression must have 5 fields (minute hour dom month dow): "${expression}"`,
      400,
    );
  }
  const [minute, hour, dayOfMonth, month, dayOfWeek] = fields.map((field, i) =>
    parseField(field!, FIELD_RANGES[i]!),
  );
  return { minute: minute!, hour: hour!, dayOfMonth: dayOfMonth!, month: month!, dayOfWeek: dayOfWeek! };
}

/** Does the schedule fire in the UTC minute containing `date`? */
export function cronMatches(expression: string, date: Date): boolean {
  const s = parseCron(expression);
  return (
    s.minute.has(date.getUTCMinutes()) &&
    s.hour.has(date.getUTCHours()) &&
    s.dayOfMonth.has(date.getUTCDate()) &&
    s.month.has(date.getUTCMonth() + 1) &&
    s.dayOfWeek.has(date.getUTCDay())
  );
}
