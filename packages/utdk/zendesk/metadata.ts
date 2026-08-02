import type { ToolRuntimeMetadataMap } from "../client.js";

export const toolMetadata = {
  "listTickets": {
    "accessPath": [
      "listTickets"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/tickets",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "page",
      "per_page",
      "sort_by",
      "sort_order"
    ],
    "description": "List tickets",
    "parameterDescriptions": {
      "page": "Page number for pagination",
      "per_page": "Number of tickets per page (max 100)",
      "sort_by": "Field to sort results by",
      "sort_order": "Sort direction"
    }
  },
  "createTicket": {
    "accessPath": [
      "createTicket"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "ticket"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/tickets",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a ticket"
  },
  "getTicket": {
    "accessPath": [
      "getTicket"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/tickets/{ticketId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "ticketId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Show a ticket",
    "parameterDescriptions": {
      "ticketId": "The ticket ID"
    }
  },
  "updateTicket": {
    "accessPath": [
      "updateTicket"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "ticket"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/v2/tickets/{ticketId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "ticketId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a ticket",
    "parameterDescriptions": {
      "ticketId": "The ticket ID"
    }
  },
  "deleteTicket": {
    "accessPath": [
      "deleteTicket"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/tickets/{ticketId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "ticketId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a ticket",
    "parameterDescriptions": {
      "ticketId": "The ticket ID"
    }
  },
  "listTicketComments": {
    "accessPath": [
      "listTicketComments"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/tickets/{ticketId}/comments",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "ticketId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "page",
      "per_page"
    ],
    "description": "List ticket comments",
    "parameterDescriptions": {
      "ticketId": "The ticket ID",
      "page": "Page number",
      "per_page": "Comments per page"
    }
  },
  "listUsers": {
    "accessPath": [
      "listUsers"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/users",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "role",
      "page",
      "per_page"
    ],
    "description": "List users",
    "parameterDescriptions": {
      "role": "Filter by user role"
    }
  },
  "getUser": {
    "accessPath": [
      "getUser"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/users/{userId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "userId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Show a user",
    "parameterDescriptions": {
      "userId": "The user ID"
    }
  },
  "listOrganizations": {
    "accessPath": [
      "listOrganizations"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/organizations",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "page",
      "per_page"
    ],
    "description": "List organizations"
  },
  "search": {
    "accessPath": [
      "search"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/search",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "query",
      "sort_by",
      "sort_order",
      "page",
      "per_page"
    ],
    "description": "Search Zendesk",
    "parameterDescriptions": {
      "query": "Search query using Zendesk search syntax (e.g. 'type:ticket status:open priority:high')",
      "sort_by": "Field to sort results by",
      "sort_order": "Sort direction"
    }
  }
} satisfies ToolRuntimeMetadataMap;
