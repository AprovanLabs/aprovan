import { describe, it, expect, vi } from "vitest";
import { withRetry, isRetryable, RetryError } from "../retry.js";

const noSleep = () => Promise.resolve();

describe("isRetryable", () => {
  it("returns true for 429 status", () => {
    expect(isRetryable({ status: 429 })).toBe(true);
  });

  it("returns true for 503 status", () => {
    expect(isRetryable({ status: 503 })).toBe(true);
  });

  it("returns false for 400 status", () => {
    expect(isRetryable({ status: 400 })).toBe(false);
  });

  it("returns false for 404 status", () => {
    expect(isRetryable({ status: 404 })).toBe(false);
  });

  it("returns false for 500 status", () => {
    expect(isRetryable({ status: 500 })).toBe(false);
  });

  it("returns true for TypeError (network error)", () => {
    expect(isRetryable(new TypeError("Failed to fetch"))).toBe(true);
  });

  it("returns false for generic Error", () => {
    expect(isRetryable(new Error("Something went wrong"))).toBe(false);
  });
});

describe("withRetry", () => {
  it("returns the result on first success", async () => {
    const fn = vi.fn().mockResolvedValue("ok");
    const result = await withRetry(fn, { sleep: noSleep });
    expect(result).toBe("ok");
    expect(fn).toHaveBeenCalledOnce();
  });

  it("retries on 429 and succeeds on second attempt", async () => {
    const fn = vi
      .fn()
      .mockRejectedValueOnce({ status: 429 })
      .mockResolvedValueOnce("success");

    const result = await withRetry(fn, { maxAttempts: 3, sleep: noSleep });
    expect(result).toBe("success");
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("retries on 503 and succeeds", async () => {
    const fn = vi
      .fn()
      .mockRejectedValueOnce({ status: 503 })
      .mockResolvedValueOnce("data");

    const result = await withRetry(fn, { sleep: noSleep });
    expect(result).toBe("data");
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("does NOT retry on non-retryable 4xx errors", async () => {
    const fn = vi.fn().mockRejectedValue({ status: 404 });

    await expect(withRetry(fn, { maxAttempts: 3, sleep: noSleep })).rejects.toBeInstanceOf(RetryError);
    expect(fn).toHaveBeenCalledOnce();
  });

  it("throws RetryError after max attempts with retryable errors", async () => {
    const fn = vi.fn().mockRejectedValue({ status: 429 });

    await expect(
      withRetry(fn, { maxAttempts: 3, sleep: noSleep }),
    ).rejects.toBeInstanceOf(RetryError);

    expect(fn).toHaveBeenCalledTimes(3);
  });

  it("propagates the original error as cause in RetryError", async () => {
    const originalError = { status: 503, message: "Service Unavailable" };
    const fn = vi.fn().mockRejectedValue(originalError);

    let caughtError: RetryError | undefined;
    try {
      await withRetry(fn, { maxAttempts: 2, sleep: noSleep });
    } catch (e) {
      caughtError = e as RetryError;
    }

    expect(caughtError).toBeInstanceOf(RetryError);
    expect(caughtError?.cause).toBe(originalError);
    expect(caughtError?.attempts).toBe(2);
  });

  it("calls onRetry before each retry with attempt index and delay", async () => {
    const fn = vi
      .fn()
      .mockRejectedValueOnce({ status: 429 })
      .mockRejectedValueOnce({ status: 429 })
      .mockResolvedValueOnce("done");

    const onRetry = vi.fn();
    await withRetry(fn, { maxAttempts: 5, sleep: noSleep, onRetry });

    expect(onRetry).toHaveBeenCalledTimes(2);
    expect(onRetry.mock.calls[0]?.[0]).toBe(0); // first retry
    expect(onRetry.mock.calls[1]?.[0]).toBe(1); // second retry
  });

  it("respects Retry-After header on the error object", async () => {
    const sleepFn = vi.fn().mockResolvedValue(undefined);
    const headers = new Headers({ "Retry-After": "5" });
    const error = { status: 429, headers };

    const fn = vi.fn().mockRejectedValueOnce(error).mockResolvedValueOnce("ok");

    await withRetry(fn, { maxAttempts: 3, sleep: sleepFn });

    expect(sleepFn).toHaveBeenCalledOnce();
    // Delay should be ~5000ms from the Retry-After header
    const delay = sleepFn.mock.calls[0]?.[0] as number;
    expect(delay).toBeGreaterThanOrEqual(4_900);
    expect(delay).toBeLessThanOrEqual(5_100);
  });
});
