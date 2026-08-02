/**
 * @utdk/vcs — the shared Git-hosting contract for UTDK VCS providers.
 *
 * Every hosting vendor exposes the same nouns (repos, pull requests,
 * branches, files) behind an incompatible REST surface, so provider modules
 * are handwritten — exactly like the database providers on `@utdk/sql` and
 * the runtimes on `@utdk/agent` — and all of them speak this contract:
 *
 *   - the operation surface is what a code-review workflow needs and nothing
 *     more: read a repo, read/list/diff a PR, comment on it, submit a
 *     review, read a branch, read a file at a ref. Repo administration,
 *     issues, CI and webhooks are the vendor's own module's business
 *     (`utdk/github` already generates all of it);
 *   - every provider resolves to the same normalized shapes below — a
 *     workflow written against `vcs.pullRequests.get` must not care whether
 *     `merged` is a boolean, a state, or a timestamp upstream;
 *   - `pullRequests.diff` returns unified diff *text*, capped at
 *     {@link MAX_DIFF_BYTES} with an explicit truncation marker — a diff is
 *     read by a model or a human, and both handle "cut here" better than an
 *     OOM in a 32 MiB script heap;
 *   - the secret arrives as the standard UTDK `Authorization: Bearer …`
 *     header injection, keyed by the *concrete* provider id (`github`), so
 *     credentials a workspace already connected keep working.
 *
 * Adding a host = one thin provider module mapping these operations onto its
 * REST API (see `utdk/github/vcs`); nothing gateway-side changes.
 */

// ---------------------------------------------------------------------------
// Budgets
// ---------------------------------------------------------------------------

/**
 * Cap on the diff text handed back to a caller. A monorepo lockfile bump can
 * be tens of MB; the consumers of this operation (review workflows, models)
 * want "the first megabyte and the fact that it was cut", not the bytes.
 */
export const MAX_DIFF_BYTES = 1_000_000;

/** Appended to a diff that was cut at {@link MAX_DIFF_BYTES}. */
export const DIFF_TRUNCATION_MARKER = "\n... [diff truncated by @utdk/vcs]\n";

// ---------------------------------------------------------------------------
// Errors
// ---------------------------------------------------------------------------

/** Error with an HTTP-ish status for hosts that map errors onto responses. */
export class VcsError extends Error {
  readonly status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.name = "VcsError";
    this.status = status;
  }
}

// ---------------------------------------------------------------------------
// Shapes
// ---------------------------------------------------------------------------

/** Every operation addresses a repository this way. */
export interface VcsRepoRef {
  owner: string;
  repo: string;
}

export interface VcsRepo {
  owner: string;
  name: string;
  /** `owner/name` — what a human pastes and a log line prints. */
  fullName: string;
  description?: string;
  defaultBranch: string;
  private: boolean;
  url: string;
}

/**
 * `merged` is a first-class state rather than a flag on `closed`: "was this
 * closed or did it land" is the first question every review workflow asks,
 * and vendors answer it three different ways (GitHub: `state: closed` +
 * `merged_at`; Bitbucket: `state: MERGED`).
 */
export type VcsPullRequestState = "open" | "closed" | "merged";

export interface VcsPullRequest {
  number: number;
  title: string;
  state: VcsPullRequestState;
  body?: string;
  /** Author login/username in the vendor's own namespace. */
  author?: string;
  /** Head — the branch proposing the change. */
  sourceBranch: string;
  /** Base — the branch the change lands on. */
  targetBranch: string;
  draft: boolean;
  url: string;
  createdAt?: string;
  updatedAt?: string;
  mergedAt?: string;
}

export interface VcsBranch {
  name: string;
  /** Commit id the branch points at. */
  sha: string;
  protected?: boolean;
}

export interface VcsFileContent {
  path: string;
  /** The ref the read was pinned to, when the caller pinned one. */
  ref?: string;
  content: string;
  /** `utf8` unless the body is not valid text. */
  encoding: "utf8" | "base64";
  size: number;
  /** Vendor content id (blob sha), for callers that diff by identity. */
  sha?: string;
}

export interface VcsComment {
  id: string;
  body: string;
  author?: string;
  url?: string;
  createdAt?: string;
}

/**
 * The three review verbs every host has. Lowercase in the contract; each
 * adapter maps onto its vendor's casing (GitHub wants `APPROVE`).
 */
export type VcsReviewEvent = "approve" | "request_changes" | "comment";

export interface VcsReview {
  id: string;
  /** Vendor-reported state of the submitted review (e.g. `APPROVED`). */
  state: string;
  body?: string;
  url?: string;
}

// ---------------------------------------------------------------------------
// The client
// ---------------------------------------------------------------------------

/** Options every VCS provider client factory accepts. */
export interface VcsClientOptions {
  /** Injected headers; the secret rides `Authorization: Bearer …`. */
  headers?: Record<string, string>;
  /** API root override; undefined = the provider module's own default. */
  baseUrl?: string;
  /** Injection point for tests. */
  fetchImpl?: typeof fetch;
}

/** The operation surface every VCS provider module implements. */
export interface VcsClient {
  repos: {
    get(args: VcsRepoRef): Promise<VcsRepo>;
  };
  pullRequests: {
    get(args: VcsRepoRef & { number: number }): Promise<VcsPullRequest>;
    list(args: VcsRepoRef & { state?: "open" | "closed" | "all" }): Promise<VcsPullRequest[]>;
    /** Unified diff text, cut at {@link MAX_DIFF_BYTES} with the marker appended. */
    diff(args: VcsRepoRef & { number: number }): Promise<string>;
    /**
     * Open a pull request from an existing branch. The branch itself is
     * pushed by whatever holds the checkout (an agent in a machine sandbox,
     * a script with git); this operation only proposes the merge.
     */
    create(
      args: VcsRepoRef & {
        title: string;
        sourceBranch: string;
        targetBranch: string;
        body?: string;
        draft?: boolean;
      },
    ): Promise<VcsPullRequest>;
    comment(args: VcsRepoRef & { number: number; body: string }): Promise<VcsComment>;
    review(
      args: VcsRepoRef & { number: number; event: VcsReviewEvent; body?: string },
    ): Promise<VcsReview>;
  };
  branches: {
    get(args: VcsRepoRef & { branch: string }): Promise<VcsBranch>;
  };
  files: {
    get(args: VcsRepoRef & { path: string; ref?: string }): Promise<VcsFileContent>;
  };
}

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

// The helpers take `object` rather than `Record<string, unknown>` so the
// contract's own typed argument shapes (which have no index signature) pass
// without a cast at every call site; adapters still get runtime validation
// because the executor hands them whatever JSON the caller sent.

/** Demand a non-empty string argument, naming the operation that needs it. */
export function requireString(args: object, key: string, operation: string): string {
  const value = (args as Record<string, unknown>)[key];
  if (typeof value !== "string" || !value.trim()) {
    throw new VcsError(`${operation} requires { ${key}: "…" }`, 400);
  }
  return value;
}

/** Demand a positive integer argument (a PR number). */
export function requireNumber(args: object, key: string, operation: string): number {
  const value = (args as Record<string, unknown>)[key];
  if (typeof value !== "number" || !Number.isInteger(value) || value <= 0) {
    throw new VcsError(`${operation} requires { ${key}: <positive integer> }`, 400);
  }
  return value;
}

const REVIEW_EVENTS: readonly VcsReviewEvent[] = ["approve", "request_changes", "comment"];

export function requireReviewEvent(args: object, operation: string): VcsReviewEvent {
  const value = (args as Record<string, unknown>)["event"];
  if (typeof value !== "string" || !REVIEW_EVENTS.includes(value as VcsReviewEvent)) {
    throw new VcsError(
      `${operation} requires { event: ${REVIEW_EVENTS.map((event) => `"${event}"`).join(" | ")} }`,
      400,
    );
  }
  return value as VcsReviewEvent;
}

/** Cut diff text at the contract cap, marking the cut in-band. */
export function clampDiff(diff: string): string {
  if (diff.length <= MAX_DIFF_BYTES) return diff;
  return diff.slice(0, MAX_DIFF_BYTES) + DIFF_TRUNCATION_MARKER;
}

// ---------------------------------------------------------------------------
// Discovery
// ---------------------------------------------------------------------------

const REPO_REF_PROPERTIES = {
  owner: { type: "string", description: "Repository owner (org or user)" },
  repo: { type: "string", description: "Repository name" },
} as const;

const PR_NUMBER = { type: "number", description: "Pull request number" } as const;

/**
 * Tool-discovery entries for a VCS provider — the static `tools` export the
 * gateway's `GET /tools` prefers over runtime metadata.
 *
 * `provider` is the *credential* provider id (`github`), not the module path
 * (`github/vcs`): the gateway derives entries under the concrete provider and
 * re-labels them onto the interface namespace (`github.repos.get` →
 * `vcs.repos.get`), the same way `postgres.query` becomes `sql.query`.
 */
export function vcsToolEntries(
  provider: string,
): Array<{ name: string; description: string; inputSchema: Record<string, unknown> }> {
  const repoArgs = (extra: Record<string, unknown> = {}, required: string[] = []) => ({
    type: "object",
    properties: { ...REPO_REF_PROPERTIES, ...extra },
    required: ["owner", "repo", ...required],
  });
  return [
    {
      name: `${provider}.repos.get`,
      description:
        "Read one repository: { owner, name, fullName, defaultBranch, private, url }.",
      inputSchema: repoArgs(),
    },
    {
      name: `${provider}.pullRequests.get`,
      description:
        "Read one pull request: { number, title, state (open|closed|merged), author, sourceBranch, targetBranch, draft, url }.",
      inputSchema: repoArgs({ number: PR_NUMBER }, ["number"]),
    },
    {
      name: `${provider}.pullRequests.list`,
      description: "List pull requests, optionally filtered by state (open|closed|all; default open).",
      inputSchema: repoArgs({
        state: { type: "string", enum: ["open", "closed", "all"], description: "Filter (default open)" },
      }),
    },
    {
      name: `${provider}.pullRequests.diff`,
      description:
        `Read one pull request's unified diff as text (cut at ${MAX_DIFF_BYTES} bytes with an explicit marker).`,
      inputSchema: repoArgs({ number: PR_NUMBER }, ["number"]),
    },
    {
      name: `${provider}.pullRequests.create`,
      description:
        "Open a pull request from an existing branch: { title, sourceBranch (head), targetBranch (base), body?, draft? }. Push the branch first; this only proposes the merge.",
      inputSchema: repoArgs(
        {
          title: { type: "string", description: "Pull request title" },
          sourceBranch: { type: "string", description: "Head — the branch proposing the change" },
          targetBranch: { type: "string", description: "Base — the branch the change lands on" },
          body: { type: "string", description: "Description (markdown)" },
          draft: { type: "boolean", description: "Open as a draft" },
        },
        ["title", "sourceBranch", "targetBranch"],
      ),
    },
    {
      name: `${provider}.pullRequests.comment`,
      description: "Post a comment on a pull request's conversation.",
      inputSchema: repoArgs(
        { number: PR_NUMBER, body: { type: "string", description: "Comment body (markdown)" } },
        ["number", "body"],
      ),
    },
    {
      name: `${provider}.pullRequests.review`,
      description:
        'Submit a review on a pull request: event "approve" | "request_changes" | "comment", with an optional body.',
      inputSchema: repoArgs(
        {
          number: PR_NUMBER,
          event: {
            type: "string",
            enum: [...REVIEW_EVENTS],
            description: "Review verdict",
          },
          body: { type: "string", description: "Review body (required for request_changes/comment on most hosts)" },
        },
        ["number", "event"],
      ),
    },
    {
      name: `${provider}.branches.get`,
      description: "Read one branch: { name, sha, protected }.",
      inputSchema: repoArgs({ branch: { type: "string", description: "Branch name" } }, ["branch"]),
    },
    {
      name: `${provider}.files.get`,
      description:
        "Read one file's content at an optional ref: { path, content, encoding, size, sha }.",
      inputSchema: repoArgs(
        {
          path: { type: "string", description: "File path within the repository" },
          ref: { type: "string", description: "Branch, tag, or commit (default: the default branch)" },
        },
        ["path"],
      ),
    },
  ];
}
