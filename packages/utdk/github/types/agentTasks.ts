export type AgentTasksOperations = {
  /**
   * List tasks for repository
   * @see https://docs.github.com/rest/agent-tasks/agent-tasks#list-tasks-for-repository
   */
  listTasksForRepo: (input: {
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
  }) => Promise<{ tasks: ({ id: string; url?: string; html_url?: string; name?: string; creator?: { id?: number }; creator_type?: "user" | "organization"; user_collaborators?: ({ id?: number })[]; owner?: { id?: number }; repository?: { id?: number }; state: "queued" | "in_progress" | "completed" | "failed" | "idle" | "waiting_for_user" | "timed_out" | "cancelled"; session_count?: number; artifacts?: ({ provider: "github"; type: "pull" | "branch"; data: { id: number; global_id?: string } | { head_ref: string; base_ref: string } })[]; archived_at?: string | null; updated_at?: string; created_at: string })[]; total_active_count?: number; total_archived_count?: number }>;

  /**
   * Start a task
   * @see https://docs.github.com/rest/agent-tasks/agent-tasks#start-a-task
   */
  createTaskInRepo: (input: {
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
  }) => Promise<{ id: string; url?: string; html_url?: string; name?: string; creator?: { id?: number }; creator_type?: "user" | "organization"; user_collaborators?: ({ id?: number })[]; owner?: { id?: number }; repository?: { id?: number }; state: "queued" | "in_progress" | "completed" | "failed" | "idle" | "waiting_for_user" | "timed_out" | "cancelled"; session_count?: number; artifacts?: ({ provider: "github"; type: "pull" | "branch"; data: { id: number; global_id?: string } | { head_ref: string; base_ref: string } })[]; archived_at?: string | null; updated_at?: string; created_at: string }>;

  /**
   * Get a task by repo
   * @see https://docs.github.com/rest/agent-tasks/agent-tasks#get-a-task-by-repo
   */
  getTaskByRepoAndId: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository. The name is not case sensitive. */
    repo: string;
    /** The unique identifier of the task. */
    task_id: string;
  }) => Promise<{ id: string; url?: string; html_url?: string; name?: string; creator?: { id?: number }; creator_type?: "user" | "organization"; user_collaborators?: ({ id?: number })[]; owner?: { id?: number }; repository?: { id?: number }; state: "queued" | "in_progress" | "completed" | "failed" | "idle" | "waiting_for_user" | "timed_out" | "cancelled"; session_count?: number; artifacts?: ({ provider: "github"; type: "pull" | "branch"; data: { id: number; global_id?: string } | { head_ref: string; base_ref: string } })[]; archived_at?: string | null; updated_at?: string; created_at: string } & { sessions?: ({ id: string; name?: string; user?: { id?: number }; owner?: { id?: number }; repository?: { id?: number }; task_id?: string; state: "queued" | "in_progress" | "completed" | "failed" | "idle" | "waiting_for_user" | "timed_out" | "cancelled"; created_at: string; updated_at?: string; completed_at?: string; prompt?: string; head_ref?: string; base_ref?: string; model?: string; error?: { message?: string } })[] }>;

  /**
   * List tasks
   * @see https://docs.github.com/rest/agent-tasks/agent-tasks#list-tasks
   */
  listTasks: (input: {
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
  }) => Promise<{ tasks: ({ id: string; url?: string; html_url?: string; name?: string; creator?: { id?: number }; creator_type?: "user" | "organization"; user_collaborators?: ({ id?: number })[]; owner?: { id?: number }; repository?: { id?: number }; state: "queued" | "in_progress" | "completed" | "failed" | "idle" | "waiting_for_user" | "timed_out" | "cancelled"; session_count?: number; artifacts?: ({ provider: "github"; type: "pull" | "branch"; data: { id: number; global_id?: string } | { head_ref: string; base_ref: string } })[]; archived_at?: string | null; updated_at?: string; created_at: string })[]; total_active_count?: number; total_archived_count?: number }>;

  /**
   * Get a task by ID
   * @see https://docs.github.com/rest/agent-tasks/agent-tasks#get-a-task-by-id
   */
  getTaskById: (input: {
    /** The unique identifier of the task. */
    task_id: string;
  }) => Promise<{ id: string; url?: string; html_url?: string; name?: string; creator?: { id?: number }; creator_type?: "user" | "organization"; user_collaborators?: ({ id?: number })[]; owner?: { id?: number }; repository?: { id?: number }; state: "queued" | "in_progress" | "completed" | "failed" | "idle" | "waiting_for_user" | "timed_out" | "cancelled"; session_count?: number; artifacts?: ({ provider: "github"; type: "pull" | "branch"; data: { id: number; global_id?: string } | { head_ref: string; base_ref: string } })[]; archived_at?: string | null; updated_at?: string; created_at: string } & { sessions?: ({ id: string; name?: string; user?: { id?: number }; owner?: { id?: number }; repository?: { id?: number }; task_id?: string; state: "queued" | "in_progress" | "completed" | "failed" | "idle" | "waiting_for_user" | "timed_out" | "cancelled"; created_at: string; updated_at?: string; completed_at?: string; prompt?: string; head_ref?: string; base_ref?: string; model?: string; error?: { message?: string } })[] }>;
};
