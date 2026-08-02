# Shape audit — @utdk/vcs

Paper audit (documentation-level) of the contract surface against real vendor
APIs, per Decision 8. Freeze criterion for the 0.2.0 bump.

## Vendors

1. **GitLab** (REST v4: projects, merge requests, branches, repository files)
2. **Bitbucket Cloud** (REST 2.0: repositories, pullrequests)
3. **Gitea** (API v1: repos, pulls, branches, contents)

## Per-operation mapping

| Contract op | GitLab | Bitbucket Cloud | Gitea |
| --- | --- | --- | --- |
| `repos.get` | `GET /projects/:id` | `GET /repositories/{ws}/{slug}` | `GET /repos/{owner}/{repo}` |
| `pullRequests.get` | `GET /projects/:id/merge_requests/:iid` | `GET .../pullrequests/{id}` | `GET /repos/{o}/{r}/pulls/{index}` |
| `pullRequests.list` (state filter) | `?state=opened/closed/merged/all` | `?state=OPEN/MERGED/DECLINED` | `?state=open/closed/all` |
| `pullRequests.diff` (unified text) | `GET .../merge_requests/:iid/raw_diffs` (or `/changes`) | `GET .../pullrequests/{id}/diff` (raw) | `GET .../pulls/{index}.diff` |
| `pullRequests.create` (branch → target) | `POST /merge_requests` (`source_branch`, `target_branch`, `title`, `description`, `draft` via title prefix/param) | `POST .../pullrequests` (source/destination branch) | `POST .../pulls` (head, base, title, body) |
| `pullRequests.comment` | `POST .../merge_requests/:iid/notes` | `POST .../pullrequests/{id}/comments` | `POST .../issues/{index}/comments` |
| `pullRequests.review` (approve / request_changes / comment) | approve: `POST .../approve`; request_changes: unapprove + note (no native state) | approve: `POST .../approve`; request-changes: `POST .../request-changes` | `POST .../pulls/{index}/reviews` (APPROVED / REQUEST_CHANGES / COMMENT) |
| `branches.get` | `GET .../repository/branches/:name` | `GET .../refs/branches/{name}` | `GET .../branches/{name}` |
| `files.get` (path + ref) | `GET .../repository/files/:path?ref=` (base64) | `GET .../src/{commit}/{path}` (raw) | `GET .../contents/{path}?ref=` (base64) |
| `state` normalization (open/closed/merged) | opened/merged/closed/locked → mapped | OPEN/MERGED/DECLINED/SUPERSEDED → mapped | open/closed + `merged` flag → mapped |
| error → `VcsError(status)` | HTTP status | HTTP status | HTTP status |

Findings:

- Every operation has a direct endpoint on all three vendors; the normalized
  `VcsPullRequest`/`VcsReview` shapes carry only fields all three return.
- GitLab has no native "request changes" review state; an adapter maps
  `request_changes` to unapprove-plus-note. The normalized `VcsReviewEvent`
  union survives because the *intent* is expressible on every vendor even
  where the vendor vocabulary differs — recorded as an adapter mapping, not
  a contract gap.
- Raw unified diff is retrievable on all three vendors, so `MAX_DIFF_BYTES`
  clamping with the truncation marker works unchanged.
- Bitbucket's `SUPERSEDED`/GitLab's `locked` states collapse into `closed` —
  consistent with the contract's three-state posture.

## Changes

No change. The repos/pullRequests/branches/files surface mapped onto all
three vendors; vendor review-state vocabulary differences are adapter
mappings.

## Verdict

**Frozen at 0.2.0.** All operations implementable against GitLab, Bitbucket
Cloud, and Gitea.
