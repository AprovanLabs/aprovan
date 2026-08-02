export type Ticket = {
  /** Ticket ID */
  id?: number;
  url?: string;
  external_id?: string;
  /** Ticket type */
  type?: "problem" | "incident" | "question" | "task";
  /** Ticket subject line */
  subject?: string;
  raw_subject?: string;
  /** First comment on the ticket */
  description?: string;
  /** Ticket priority */
  priority?: "urgent" | "high" | "normal" | "low";
  /** Ticket status */
  status?: "new" | "open" | "pending" | "hold" | "solved" | "closed";
  /** User ID of the ticket requester */
  requester_id?: number;
  submitter_id?: number;
  /** Agent ID assigned to the ticket */
  assignee_id?: number;
  organization_id?: number;
  group_id?: number;
  tags?: (string)[];
  created_at?: string;
  updated_at?: string;
};

export type TicketList = {
  tickets?: (Ticket)[];
  next_page?: string;
  previous_page?: string;
  count?: number;
};

export type TicketResponse = {
  ticket?: Ticket;
};

export type CreateTicketRequest = {
  ticket: { subject?: string; comment?: { body?: string; html_body?: string }; requester_id?: number; assignee_id?: number; group_id?: number; organization_id?: number; priority?: "urgent" | "high" | "normal" | "low"; status?: "new" | "open" | "pending" | "hold" | "solved"; type?: "problem" | "incident" | "question" | "task"; tags?: (string)[] };
};

export type UpdateTicketRequest = {
  ticket: { subject?: string; status?: "new" | "open" | "pending" | "hold" | "solved" | "closed"; priority?: "urgent" | "high" | "normal" | "low"; assignee_id?: number; tags?: (string)[]; comment?: { body?: string; public?: boolean } };
};

export type Comment = {
  id?: number;
  type?: string;
  author_id?: number;
  body?: string;
  html_body?: string;
  plain_body?: string;
  public?: boolean;
  created_at?: string;
};

export type CommentList = {
  comments?: (Comment)[];
  next_page?: string;
  count?: number;
};

export type User = {
  id?: number;
  name?: string;
  email?: string;
  role?: "end-user" | "agent" | "admin";
  organization_id?: number;
  verified?: boolean;
  created_at?: string;
  updated_at?: string;
};

export type UserList = {
  users?: (User)[];
  next_page?: string;
  count?: number;
};

export type UserResponse = {
  user?: User;
};

export type Organization = {
  id?: number;
  name?: string;
  notes?: string;
  details?: string;
  created_at?: string;
  updated_at?: string;
};

export type OrganizationList = {
  organizations?: (Organization)[];
  next_page?: string;
  count?: number;
};

export type SearchResults = {
  results?: ({ [key: string]: unknown })[];
  next_page?: string;
  previous_page?: string;
  count?: number;
};

export type Error = {
  error?: string;
  description?: string;
};
