export type Task = {
  /** Completion date of the task (as a RFC 3339 timestamp). This field is omitted if the task has not been completed. */
  completed?: string;
  /** Flag indicating whether the task has been deleted. The default is False. */
  deleted?: boolean;
  /** Due date of the task (as a RFC 3339 timestamp). Optional. The due date only records date information; the time portion of the timestamp is discarded when setting the due date. It isn't possible to read or write the time that a task is due via the API. */
  due?: string;
  /** ETag of the resource. */
  etag?: string;
  /** Flag indicating whether the task is hidden. This is the case if the task had been marked completed when the task list was last cleared. The default is False. This field is read-only. */
  hidden?: boolean;
  /** Task identifier. */
  id?: string;
  /** Type of the resource. This is always "tasks#task". */
  kind?: string;
  /** Collection of links. This collection is read-only. */
  links?: ({ description?: string; link?: string; type?: string })[];
  /** Notes describing the task. Optional. */
  notes?: string;
  /** Parent task identifier. This field is omitted if it is a top-level task. This field is read-only. Use the "move" method to move the task under a different parent or to the top level. */
  parent?: string;
  /** String indicating the position of the task among its sibling tasks under the same parent task or at the top level. If this string is greater than another task's corresponding position string according to lexicographical ordering, the task is positioned after the other task under the same parent task (or at the top level). This field is read-only. Use the "move" method to move the task to another position. */
  position?: string;
  /** URL pointing to this task. Used to retrieve, update, or delete this task. */
  selfLink?: string;
  /** Status of the task. This is either "needsAction" or "completed". */
  status?: string;
  /** Title of the task. */
  title?: string;
  /** Last modification time of the task (as a RFC 3339 timestamp). */
  updated?: string;
};

export type TaskList = {
  /** ETag of the resource. */
  etag?: string;
  /** Task list identifier. */
  id?: string;
  /** Type of the resource. This is always "tasks#taskList". */
  kind?: string;
  /** URL pointing to this task list. Used to retrieve, update, or delete this task list. */
  selfLink?: string;
  /** Title of the task list. */
  title?: string;
  /** Last modification time of the task list (as a RFC 3339 timestamp). */
  updated?: string;
};

export type TaskLists = {
  /** ETag of the resource. */
  etag?: string;
  /** Collection of task lists. */
  items?: (TaskList)[];
  /** Type of the resource. This is always "tasks#taskLists". */
  kind?: string;
  /** Token that can be used to request the next page of this result. */
  nextPageToken?: string;
};

export type Tasks = {
  /** ETag of the resource. */
  etag?: string;
  /** Collection of tasks. */
  items?: (Task)[];
  /** Type of the resource. This is always "tasks#tasks". */
  kind?: string;
  /** Token used to access the next page of this result. */
  nextPageToken?: string;
};
