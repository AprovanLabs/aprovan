import { randomUUID } from "node:crypto";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test as base, type BrowserContext, type Page } from "@playwright/test";

/** Mirrors `AUTH_TOKEN_KEY` in `src/lib/auth.ts` — do not import the client module here. */
const AUTH_TOKEN_KEY = "patchwork:authToken";

export type UserSession = {
  context: BrowserContext;
  page: Page;
  /** Stable label for assertions / logs (`A` = primary, `B` = peer/guest). */
  label: "A" | "B";
};

export type TwoUsers = {
  userA: UserSession;
  userB: UserSession;
  /**
   * Unique id for this test — use as a namespace for channels / installs so
   * parallel suite residue cannot collide (flake mitigation, tech-plan T6).
   */
  testId: string;
  /** Per-test scratch directory; removed after the test. */
  scratchDir: string;
  /**
   * Register async teardown (delete install, revoke invite, …). Runs after
   * the test body, before contexts close — fresh workspace/instance state
   * for the next test.
   */
  registerCleanup: (fn: () => Promise<void>) => void;
};

type TwoUsersFixtures = {
  twoUsers: TwoUsers;
};

/**
 * Seed `patchwork:authToken` when Cognito tokens are supplied via env.
 * Local auth-none (no OIDC) ignores tokens and resolves every request as
 * `sub: "local"` — streams 10–12 still get isolated browser state here;
 * distinct principals require `E2E_USER_A_TOKEN` / `E2E_USER_B_TOKEN` (or
 * invite-join flows that mint session state in each context).
 */
async function seedAuthToken(
  context: BrowserContext,
  token: string | undefined,
): Promise<void> {
  if (!token) return;
  await context.addInitScript(
    ({ key, value }) => {
      window.localStorage.setItem(key, value);
    },
    { key: AUTH_TOKEN_KEY, value: token },
  );
}

export const test = base.extend<TwoUsersFixtures>({
  twoUsers: async ({ browser, baseURL }, use) => {
    const testId = randomUUID();
    const scratchDir = mkdtempSync(join(tmpdir(), `aprovan-e2e-${testId}-`));
    const cleanups: Array<() => Promise<void>> = [];

    const contextA = await browser.newContext({ baseURL });
    const contextB = await browser.newContext({ baseURL });

    await seedAuthToken(contextA, process.env["E2E_USER_A_TOKEN"]);
    await seedAuthToken(contextB, process.env["E2E_USER_B_TOKEN"]);

    const pageA = await contextA.newPage();
    const pageB = await contextB.newPage();

    await use({
      userA: { context: contextA, page: pageA, label: "A" },
      userB: { context: contextB, page: pageB, label: "B" },
      testId,
      scratchDir,
      registerCleanup(fn) {
        cleanups.push(fn);
      },
    });

    // Reverse order: dependents first (install before workspace, etc.).
    for (const fn of cleanups.reverse()) {
      await fn();
    }

    await contextA.close();
    await contextB.close();
    rmSync(scratchDir, { recursive: true, force: true });
  },
});

export { expect } from "@playwright/test";
