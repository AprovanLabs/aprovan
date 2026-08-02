# Agent Tasks

5 operations · `@utdk/github`

```ts
import github from "@utdk/github";
```

## `github.agentTasks.listTasksForRepo`

List tasks for repository — [API reference](https://docs.github.com/rest/agent-tasks/agent-tasks#list-tasks-for-repository)

```ts
github.agentTasks.listTasksForRepo(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository. The name is not case sensitive. */
  repo: string;
  /** The number of results per page (max 100). */
  per_page?: number;
  /** The page number of the results to fetch. */
  page?: number;
  /** The field to sort results by. Can be `updated_at` or `created_at`. */
  sort?: "updated_at" | "created_at";
  /** The direction to sort results. Can be `asc` or `desc`. */
  direction?: "asc" | "desc";
  /** Comma-separated list of task states to filter by. Can be any combination of: `queued`, `in_progress`, `completed`, `failed`, `idle`, `waiting_for_user`, `timed_out`, `cancelled`. */
  state?: string;
  /** Filter by archived status. When `true`, returns only archived tasks. When `false` or omitted, returns only non-archived tasks. Defaults to `false`. */
  is_archived?: boolean;
  /** Only show tasks updated at or after this time (ISO 8601 timestamp) */
  since?: string;
  /** Filter tasks by creator user ID. Accepts one or more user IDs. */
  creator_id?: (number)[];
}): Promise<{ tasks: ({ id: string; url?: string; html_url?: string; name?: string; creator?: { id?: number }; creator_type?: "user" | "organization"; user_collaborators?: ({ id?: number })[]; owner?: { id?: number }; repository?: { id?: number }; state: "queued" | "in_progress" | "completed" | "failed" | "idle" | "waiting_for_user" | "timed_out" | "cancelled"; session_count?: number; artifacts?: ({ provider...>
```

<sub>`GET /agents/repos/{owner}/{repo}/tasks` · `agent-tasks/list-tasks-for-repo`</sub>

## `github.agentTasks.createTaskInRepo`

Start a task — [API reference](https://docs.github.com/rest/agent-tasks/agent-tasks#start-a-task)

```ts
github.agentTasks.createTaskInRepo(input: {
  /** The user's prompt for the agent */
  prompt: string;
  /** The model to use for this task. The allowed models may change over time and depend on the user's GitHub Copilot plan and organization policies. Currently supported values: `claude-sonnet-4.6`, `claude-opus-4.6`, `gpt-5.2-codex`, `gpt-5.3-codex`, `gpt-5.4`, `claude-sonnet-4.5`, `claude-opus-4.5` */
  model?: string;
  /** Whether to create a PR. */
  create_pull_request?: boolean;
  /** Base ref for new branch/PR */
  base_ref?: string;
  /** Head ref for existing branch/PR. If provided with `base_ref`, the agent looks up open PR context for `head_ref` targeting `base_ref` and commits to `head_ref` instead of creating a new branch. */
  head_ref?: string;
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository. The name is not case sensitive. */
  repo: string;
}): Promise<{ id: string; url?: string; html_url?: string; name?: string; creator?: { id?: number }; creator_type?: "user" | "organization"; user_collaborators?: ({ id?: number })[]; owner?: { id?: number }; repository?: { id?: number }; state: "queued" | "in_progress" | "completed" | "failed" | "idle" | "waiting_for_user" | "timed_out" | "cancelled"; session_count?: number; artifacts?: ({ provider: "github"...>
```

<sub>`POST /agents/repos/{owner}/{repo}/tasks` · `agent-tasks/create-task-in-repo`</sub>

## `github.agentTasks.getTaskByRepoAndId`

Get a task by repo — [API reference](https://docs.github.com/rest/agent-tasks/agent-tasks#get-a-task-by-repo)

```ts
github.agentTasks.getTaskByRepoAndId(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository. The name is not case sensitive. */
  repo: string;
  /** The unique identifier of the task. */
  task_id: string;
}): Promise<{ id: string; url?: string; html_url?: string; name?: string; creator?: { id?: number }; creator_type?: "user" | "organization"; user_collaborators?: ({ id?: number })[]; owner?: { id?: number }; repository?: { id?: number }; state: "queued" | "in_progress" | "completed" | "failed" | "idle" | "waiting_for_user" | "timed_out" | "cancelled"; session_count?: number; artifacts?: ({ provider: "github"...>
```

<sub>`GET /agents/repos/{owner}/{repo}/tasks/{task_id}` · `agent-tasks/get-task-by-repo-and-id`</sub>

## `github.agentTasks.listTasks`

List tasks — [API reference](https://docs.github.com/rest/agent-tasks/agent-tasks#list-tasks)

```ts
github.agentTasks.listTasks(input: {
  /** The number of results per page (max 100). */
  per_page?: number;
  /** The page number of the results to fetch. */
  page?: number;
  /** The field to sort results by. Can be `updated_at` or `created_at`. */
  sort?: "updated_at" | "created_at";
  /** The direction to sort results. Can be `asc` or `desc`. */
  direction?: "asc" | "desc";
  /** Comma-separated list of task states to filter by. Can be any combination of: `queued`, `in_progress`, `completed`, `failed`, `idle`, `waiting_for_user`, `timed_out`, `cancelled`. */
  state?: string;
  /** Filter by archived status. When `true`, returns only archived tasks. When `false` or omitted, returns only non-archived tasks. Defaults to `false`. */
  is_archived?: boolean;
  /** Only show tasks updated at or after this time (ISO 8601 timestamp) */
  since?: string;
}): Promise<{ tasks: ({ id: string; url?: string; html_url?: string; name?: string; creator?: { id?: number }; creator_type?: "user" | "organization"; user_collaborators?: ({ id?: number })[]; owner?: { id?: number }; repository?: { id?: number }; state: "queued" | "in_progress" | "completed" | "failed" | "idle" | "waiting_for_user" | "timed_out" | "cancelled"; session_count?: number; artifacts?: ({ provider...>
```

<sub>`GET /agents/tasks` · `agent-tasks/list-tasks`</sub>

## `github.agentTasks.getTaskById`

Get a task by ID — [API reference](https://docs.github.com/rest/agent-tasks/agent-tasks#get-a-task-by-id)

```ts
github.agentTasks.getTaskById(input: {
  /** The unique identifier of the task. */
  task_id: string;
}): Promise<{ id: string; url?: string; html_url?: string; name?: string; creator?: { id?: number }; creator_type?: "user" | "organization"; user_collaborators?: ({ id?: number })[]; owner?: { id?: number }; repository?: { id?: number }; state: "queued" | "in_progress" | "completed" | "failed" | "idle" | "waiting_for_user" | "timed_out" | "cancelled"; session_count?: number; artifacts?: ({ provider: "github"...>
```

<sub>`GET /agents/tasks/{task_id}` · `agent-tasks/get-task-by-id`</sub>

Named result types are exported from the package — hover them in your editor, or browse `types/schemas.ts`.

<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
