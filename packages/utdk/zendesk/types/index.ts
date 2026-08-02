import type { CommentList, Error, OrganizationList, SearchResults, TicketList, TicketResponse, UserList, UserResponse } from "./schemas.js";

export type ZendeskClient = {
  /**
   * List tickets
   */
  listTickets: (input: {
    /** Page number for pagination */
    page?: number;
    /** Number of tickets per page (max 100) */
    per_page?: number;
    /** Field to sort results by */
    sort_by?: "created_at" | "updated_at" | "priority" | "status" | "ticket_type";
    /** Sort direction */
    sort_order?: "asc" | "desc";
  }) => Promise<TicketList>;

  /**
   * Create a ticket
   */
  createTicket: (input: {
    ticket: { subject?: string; comment?: { body?: string; html_body?: string }; requester_id?: number; assignee_id?: number; group_id?: number; organization_id?: number; priority?: "urgent" | "high" | "normal" | "low"; status?: "new" | "open" | "pending" | "hold" | "solved"; type?: "problem" | "incident" | "question" | "task"; tags?: (string)[] };
  }) => Promise<TicketResponse>;

  /**
   * Show a ticket
   */
  getTicket: (input: {
    /** The ticket ID */
    ticketId: number;
  }) => Promise<TicketResponse>;

  /**
   * Update a ticket
   */
  updateTicket: (input: {
    ticket: { subject?: string; status?: "new" | "open" | "pending" | "hold" | "solved" | "closed"; priority?: "urgent" | "high" | "normal" | "low"; assignee_id?: number; tags?: (string)[]; comment?: { body?: string; public?: boolean } };
    /** The ticket ID */
    ticketId: number;
  }) => Promise<TicketResponse>;

  /**
   * Delete a ticket
   */
  deleteTicket: (input: {
    /** The ticket ID */
    ticketId: number;
  }) => Promise<Error>;

  /**
   * List ticket comments
   */
  listTicketComments: (input: {
    /** The ticket ID */
    ticketId: number;
    /** Page number */
    page?: number;
    /** Comments per page */
    per_page?: number;
  }) => Promise<CommentList>;

  /**
   * List users
   */
  listUsers: (input: {
    /** Filter by user role */
    role?: "end-user" | "agent" | "admin";
    page?: number;
    per_page?: number;
  }) => Promise<UserList>;

  /**
   * Show a user
   */
  getUser: (input: {
    /** The user ID */
    userId: number;
  }) => Promise<UserResponse>;

  /**
   * List organizations
   */
  listOrganizations: (input: {
    page?: number;
    per_page?: number;
  }) => Promise<OrganizationList>;

  /**
   * Search Zendesk
   */
  search: (input: {
    /** Search query using Zendesk search syntax (e.g. 'type:ticket status:open priority:high') */
    query: string;
    /** Field to sort results by */
    sort_by?: string;
    /** Sort direction */
    sort_order?: "asc" | "desc";
    page?: number;
    per_page?: number;
  }) => Promise<SearchResults>;
};

export * from "./schemas.js";
