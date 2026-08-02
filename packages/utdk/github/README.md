# GitHub v3 REST API

`@utdk/github` — a typed SDK generated from the provider's OpenAPI spec. This client wraps the provider API in typed methods focused on Repos, Actions, Orgs, Issues.

## Quick start

```ts
import github from "@utdk/github";

const result = await github.meta.root();
```

In the UTDK isolate runtime, `github` is also available directly as a namespace value — no import needed.

## Operations

- [Actions](./docs/actions.md) — 187 operations
- [Activity](./docs/activity.md) — 32 operations
- [Agent Tasks](./docs/agent-tasks.md) — 5 operations
- [Agents](./docs/agents.md) — 30 operations
- [Apps](./docs/apps.md) — 37 operations
- [Billing](./docs/billing.md) — 13 operations
- [Campaigns](./docs/campaigns.md) — 5 operations
- [Checks](./docs/checks.md) — 12 operations
- [Classroom](./docs/classroom.md) — 6 operations
- [Code Quality](./docs/code-quality.md) — 4 operations
- [Code Scanning](./docs/code-scanning.md) — 21 operations
- [Code Security](./docs/code-security.md) — 20 operations
- [Codes Of Conduct](./docs/codes-of-conduct.md) — 2 operations
- [Codespaces](./docs/codespaces.md) — 48 operations
- [Copilot](./docs/copilot.md) — 29 operations
- [Copilot Spaces](./docs/copilot-spaces.md) — 28 operations
- [Credentials](./docs/credentials.md) — 1 operation
- [Dependabot](./docs/dependabot.md) — 25 operations
- [Dependency Graph](./docs/dependency-graph.md) — 5 operations
- [Emojis](./docs/emojis.md) — 1 operation
- [Enterprise Team Memberships](./docs/enterprise-team-memberships.md) — 6 operations
- [Enterprise Team Organizations](./docs/enterprise-team-organizations.md) — 6 operations
- [Enterprise Teams](./docs/enterprise-teams.md) — 5 operations
- [Gists](./docs/gists.md) — 20 operations
- [Git](./docs/git.md) — 13 operations
- [Gitignore](./docs/gitignore.md) — 2 operations
- [Hosted Compute](./docs/hosted-compute.md) — 6 operations
- [Interactions](./docs/interactions.md) — 14 operations
- [Issues](./docs/issues.md) — 55 operations
- [Licenses](./docs/licenses.md) — 3 operations
- [Markdown](./docs/markdown.md) — 2 operations
- [Meta](./docs/meta.md) — 5 operations
- [Migrations](./docs/migrations.md) — 22 operations
- [Oidc](./docs/oidc.md) — 8 operations
- [Orgs](./docs/orgs.md) — 108 operations
- [Packages](./docs/packages.md) — 27 operations
- [Private Registries](./docs/private-registries.md) — 6 operations
- [Projects](./docs/projects.md) — 26 operations
- [Pulls](./docs/pulls.md) — 27 operations
- [Rate Limit](./docs/rate-limit.md) — 1 operation
- [Reactions](./docs/reactions.md) — 15 operations
- [Repos](./docs/repos.md) — 203 operations
- [Search](./docs/search.md) — 7 operations
- [Secret Scanning](./docs/secret-scanning.md) — 17 operations
- [Security Advisories](./docs/security-advisories.md) — 10 operations
- [Teams](./docs/teams.md) — 32 operations
- [Users](./docs/users.md) — 47 operations

Every operation is a typed method (`github.group.action(input)`); result shapes are named exported types you can hover in your editor.

## Source Index


