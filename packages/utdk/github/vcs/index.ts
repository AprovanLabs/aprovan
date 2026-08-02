/**
 * `utdk/github/vcs` — the GitHub adapter for the `@utdk/vcs` contract.
 *
 * Handwritten, like `utdk/postgres` over `@utdk/sql`: the generated
 * `utdk/github` module already covers the whole REST surface, but a workflow
 * written against it is welded to GitHub. This module maps the small
 * contract surface (repos / pullRequests / branches / files) onto
 * api.github.com so the `vcs` interface can swap hosts with a binding
 * change. `createGithubVcsClient({ headers })` returns the operation
 * surface, with the credential injected as `Authorization: Bearer <token>` —
 * the same `github` credential the generated module uses.
 */

import {
  clampDiff,
  requireNumber,
  requireReviewEvent,
  requireString,
  VcsError,
  vcsToolEntries,
  type VcsBranch,
  type VcsClient,
  type VcsClientOptions,
  type VcsComment,
  type VcsFileContent,
  type VcsPullRequest,
  type VcsPullRequestState,
  type VcsRepo,
  type VcsReview,
  type VcsReviewEvent,
} from "@utdk/vcs";
import { createLazyClient } from "../../client.js";

export type { VcsClient, VcsPullRequest, VcsRepo } from "@utdk/vcs";

const DEFAULT_BASE_URL = "https://api.github.com";

/** GitHub's REVIEW event casing for the contract's lowercase verbs. */
const REVIEW_EVENT_MAP: Record<VcsReviewEvent, string> = {
  approve: "APPROVE",
  request_changes: "REQUEST_CHANGES",
  comment: "COMMENT",
};

interface GithubRequestOptions {
  method?: string;
  /** Media type; the diff read swaps in `application/vnd.github.v3.diff`. */
  accept?: string;
  body?: unknown;
}

function pullRequestState(pr: Record<string, unknown>): VcsPullRequestState {
  // GitHub reports a merged PR as `state: "closed"` with `merged_at` set;
  // the contract makes "landed" a first-class state.
  if (pr["merged_at"]) return "merged";
  return pr["state"] === "open" ? "open" : "closed";
}

function toPullRequest(pr: Record<string, unknown>): VcsPullRequest {
  const head = (pr["head"] ?? {}) as Record<string, unknown>;
  const base = (pr["base"] ?? {}) as Record<string, unknown>;
  const user = pr["user"] as Record<string, unknown> | null | undefined;
  return {
    number: pr["number"] as number,
    title: (pr["title"] as string | null) ?? "",
    state: pullRequestState(pr),
    ...(typeof pr["body"] === "string" && pr["body"] ? { body: pr["body"] } : {}),
    ...(typeof user?.["login"] === "string" ? { author: user["login"] } : {}),
    sourceBranch: (head["ref"] as string | undefined) ?? "",
    targetBranch: (base["ref"] as string | undefined) ?? "",
    draft: pr["draft"] === true,
    url: (pr["html_url"] as string | undefined) ?? "",
    ...(typeof pr["created_at"] === "string" ? { createdAt: pr["created_at"] } : {}),
    ...(typeof pr["updated_at"] === "string" ? { updatedAt: pr["updated_at"] } : {}),
    ...(typeof pr["merged_at"] === "string" ? { mergedAt: pr["merged_at"] } : {}),
  };
}

export async function createGithubVcsClient(
  options: VcsClientOptions = {},
): Promise<VcsClient> {
  const fetchImpl = options.fetchImpl ?? fetch;
  const baseUrl = (options.baseUrl ?? DEFAULT_BASE_URL).replace(/\/+$/u, "");

  const request = async (
    path: string,
    { method = "GET", accept = "application/vnd.github+json", body }: GithubRequestOptions = {},
  ): Promise<Response> => {
    const response = await fetchImpl(`${baseUrl}${path}`, {
      method,
      headers: {
        // GitHub rejects requests with no User-Agent, and undici sends none.
        "User-Agent": "utdk-github-vcs",
        Accept: accept,
        "X-GitHub-Api-Version": "2022-11-28",
        ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
        // Injected last so the credential's Authorization always wins.
        ...options.headers,
      },
      ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
    });
    if (!response.ok) {
      let message = `GitHub responded ${response.status}`;
      try {
        const parsed = (await response.json()) as { message?: string };
        if (parsed.message) message = `GitHub: ${parsed.message}`;
      } catch {
        // Non-JSON error body; the status alone will have to do.
      }
      throw new VcsError(message, response.status);
    }
    return response;
  };

  const json = async <T>(path: string, init?: GithubRequestOptions): Promise<T> =>
    (await (await request(path, init)).json()) as T;

  const repoPath = (args: object, operation: string): string => {
    const owner = requireString(args, "owner", operation);
    const repo = requireString(args, "repo", operation);
    return `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`;
  };

  return {
    repos: {
      get: async (args): Promise<VcsRepo> => {
        const data = await json<Record<string, unknown>>(repoPath(args, "repos.get"));
        const owner = (data["owner"] ?? {}) as Record<string, unknown>;
        return {
          owner: (owner["login"] as string | undefined) ?? "",
          name: (data["name"] as string | undefined) ?? "",
          fullName: (data["full_name"] as string | undefined) ?? "",
          ...(typeof data["description"] === "string" && data["description"]
            ? { description: data["description"] }
            : {}),
          defaultBranch: (data["default_branch"] as string | undefined) ?? "",
          private: data["private"] === true,
          url: (data["html_url"] as string | undefined) ?? "",
        };
      },
    },
    pullRequests: {
      get: async (args): Promise<VcsPullRequest> => {
        const number = requireNumber(args, "number", "pullRequests.get");
        return toPullRequest(
          await json<Record<string, unknown>>(`${repoPath(args, "pullRequests.get")}/pulls/${number}`),
        );
      },
      list: async (args): Promise<VcsPullRequest[]> => {
        const state = args.state ?? "open";
        const list = await json<Array<Record<string, unknown>>>(
          `${repoPath(args, "pullRequests.list")}/pulls?state=${encodeURIComponent(state)}&per_page=50`,
        );
        return list.map(toPullRequest);
      },
      diff: async (args): Promise<string> => {
        const number = requireNumber(args, "number", "pullRequests.diff");
        const response = await request(
          `${repoPath(args, "pullRequests.diff")}/pulls/${number}`,
          { accept: "application/vnd.github.v3.diff" },
        );
        return clampDiff(await response.text());
      },
      create: async (args): Promise<VcsPullRequest> => {
        const title = requireString(args, "title", "pullRequests.create");
        const head = requireString(args, "sourceBranch", "pullRequests.create");
        const base = requireString(args, "targetBranch", "pullRequests.create");
        const data = await json<Record<string, unknown>>(
          `${repoPath(args, "pullRequests.create")}/pulls`,
          {
            method: "POST",
            body: {
              title,
              head,
              base,
              ...(typeof args.body === "string" && args.body ? { body: args.body } : {}),
              ...(args.draft === true ? { draft: true } : {}),
            },
          },
        );
        return toPullRequest(data);
      },
      comment: async (args): Promise<VcsComment> => {
        const number = requireNumber(args, "number", "pullRequests.comment");
        const body = requireString(args, "body", "pullRequests.comment");
        // Conversation comments live on the issue resource; the pulls
        // comments endpoint is line-anchored review comments only.
        const data = await json<Record<string, unknown>>(
          `${repoPath(args, "pullRequests.comment")}/issues/${number}/comments`,
          { method: "POST", body: { body } },
        );
        const user = data["user"] as Record<string, unknown> | null | undefined;
        return {
          id: String(data["id"] ?? ""),
          body: (data["body"] as string | undefined) ?? body,
          ...(typeof user?.["login"] === "string" ? { author: user["login"] } : {}),
          ...(typeof data["html_url"] === "string" ? { url: data["html_url"] } : {}),
          ...(typeof data["created_at"] === "string" ? { createdAt: data["created_at"] } : {}),
        };
      },
      review: async (args): Promise<VcsReview> => {
        const number = requireNumber(args, "number", "pullRequests.review");
        const event = requireReviewEvent(args, "pullRequests.review");
        const data = await json<Record<string, unknown>>(
          `${repoPath(args, "pullRequests.review")}/pulls/${number}/reviews`,
          {
            method: "POST",
            body: {
              event: REVIEW_EVENT_MAP[event],
              ...(typeof args.body === "string" && args.body ? { body: args.body } : {}),
            },
          },
        );
        return {
          id: String(data["id"] ?? ""),
          state: (data["state"] as string | undefined) ?? "",
          ...(typeof data["body"] === "string" && data["body"] ? { body: data["body"] } : {}),
          ...(typeof data["html_url"] === "string" ? { url: data["html_url"] } : {}),
        };
      },
    },
    branches: {
      get: async (args): Promise<VcsBranch> => {
        const branch = requireString(args, "branch", "branches.get");
        const data = await json<Record<string, unknown>>(
          `${repoPath(args, "branches.get")}/branches/${encodeURIComponent(branch)}`,
        );
        const commit = (data["commit"] ?? {}) as Record<string, unknown>;
        return {
          name: (data["name"] as string | undefined) ?? branch,
          sha: (commit["sha"] as string | undefined) ?? "",
          ...(typeof data["protected"] === "boolean" ? { protected: data["protected"] } : {}),
        };
      },
    },
    files: {
      get: async (args): Promise<VcsFileContent> => {
        const path = requireString(args, "path", "files.get");
        const ref = typeof args.ref === "string" && args.ref ? args.ref : undefined;
        const query = ref ? `?ref=${encodeURIComponent(ref)}` : "";
        const data = await json<Record<string, unknown> | unknown[]>(
          `${repoPath(args, "files.get")}/contents/${path
            .split("/")
            .map(encodeURIComponent)
            .join("/")}${query}`,
        );
        if (Array.isArray(data)) {
          throw new VcsError(`files.get: "${path}" is a directory, not a file`, 400);
        }
        if (data["type"] !== "file" || typeof data["content"] !== "string") {
          throw new VcsError(`files.get: "${path}" is not a readable file (${String(data["type"])})`, 400);
        }
        // GitHub hands file bodies back base64-wrapped; decode for the
        // common case (a review reads source text), fall back for binaries.
        const raw = Buffer.from(data["content"], "base64");
        const content = raw.toString("utf8");
        const roundTrips = Buffer.from(content, "utf8").equals(raw);
        return {
          path,
          ...(ref ? { ref } : {}),
          content: roundTrips ? content : raw.toString("base64"),
          encoding: roundTrips ? "utf8" : "base64",
          size: raw.length,
          ...(typeof data["sha"] === "string" ? { sha: data["sha"] } : {}),
        };
      },
    },
  };
}

const defaultClient = createLazyClient(() => createGithubVcsClient());

export default defaultClient;

/**
 * Discovery entries for GET /tools. Named under `github` — the credential
 * provider — because the gateway strips that prefix when re-labelling onto
 * the `vcs` interface namespace (see vcsToolEntries).
 */
export const tools = vcsToolEntries("github");
