import type { RateLimitOverview } from "./schemas.js";

export type RateLimitOperations = {
  /**
   * Get rate limit status for the authenticated user
   * @see https://docs.github.com/rest/rate-limit/rate-limit#get-rate-limit-status-for-the-authenticated-user
   */
  get: () => Promise<RateLimitOverview>;
};
