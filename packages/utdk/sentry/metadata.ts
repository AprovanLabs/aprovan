import type { ToolRuntimeMetadataMap } from "../client.js";

export const toolMetadata = {
  "List Your Organizations": {
    "accessPath": [
      "listYourOrganizations"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/organizations/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Return a list of organizations available to the authenticated session in a region.\nThis is particularly useful for requests with a user bound context. For API key-based requests this will only return the organization that belongs to the key."
  },
  "Retrieve an Organization": {
    "accessPath": [
      "retrieveAnOrganization"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Return details on an individual organization, including various details\nsuch as membership access and teams."
  },
  "Update an Organization": {
    "accessPath": [
      "updateAnOrganization"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update various attributes and configurable settings for the given organization."
  },
  "Get Integration Provider Information": {
    "accessPath": [
      "getIntegrationProviderInformation"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/config/integrations/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get integration provider information about all available integrations for an organization."
  },
  "List an Organization's Custom Dashboards": {
    "accessPath": [
      "listAnOrganizationSCustomDashboards"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/dashboards/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve a list of custom dashboards that are associated with the given organization."
  },
  "Create a New Dashboard for an Organization": {
    "accessPath": [
      "createANewDashboardForAnOrganization"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/dashboards/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a new dashboard for the given Organization"
  },
  "Retrieve an Organization's Custom Dashboard": {
    "accessPath": [
      "retrieveAnOrganizationSCustomDashboard"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/dashboards/{dashboard_id}/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Return details about an organization's custom dashboard."
  },
  "Edit an Organization's Custom Dashboard": {
    "accessPath": [
      "editAnOrganizationSCustomDashboard"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/dashboards/{dashboard_id}/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Edit an organization's custom dashboard as well as any bulk\nedits on widgets that may have been made. (For example, widgets\nthat have been rearranged, updated queries and fields, specific\ndisplay types, and so on.)"
  },
  "Delete an Organization's Custom Dashboard": {
    "accessPath": [
      "deleteAnOrganizationSCustomDashboard"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/dashboards/{dashboard_id}/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete an organization's custom dashboard."
  },
  "Fetch an Organization's Monitors": {
    "accessPath": [
      "fetchAnOrganizationSMonitors"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/detectors/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List an Organization's Monitors"
  },
  "Mutate an Organization's Monitors": {
    "accessPath": [
      "mutateAnOrganizationSMonitors"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/detectors/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Bulk enable or disable an Organization's Monitors"
  },
  "Bulk Delete Monitors": {
    "accessPath": [
      "bulkDeleteMonitors"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/detectors/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Bulk delete Monitors for a given organization"
  },
  "Fetch a Monitor": {
    "accessPath": [
      "fetchAMonitor"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/detectors/{detector_id}/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Return details on an individual monitor"
  },
  "Update a Monitor by ID": {
    "accessPath": [
      "updateAMonitorById"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/detectors/{detector_id}/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update an existing monitor"
  },
  "Delete a Monitor": {
    "accessPath": [
      "deleteAMonitor"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/detectors/{detector_id}/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a monitor"
  },
  "List an Organization's Discover Saved Queries": {
    "accessPath": [
      "listAnOrganizationSDiscoverSavedQueries"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/discover/saved/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve a list of saved queries that are associated with the given organization."
  },
  "Create a New Saved Query": {
    "accessPath": [
      "createANewSavedQuery"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/discover/saved/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a new saved query for the given organization."
  },
  "Retrieve an Organization's Discover Saved Query": {
    "accessPath": [
      "retrieveAnOrganizationSDiscoverSavedQuery"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/discover/saved/{query_id}/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve a saved query."
  },
  "Edit an Organization's Discover Saved Query": {
    "accessPath": [
      "editAnOrganizationSDiscoverSavedQuery"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/discover/saved/{query_id}/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Modify a saved query."
  },
  "Delete an Organization's Discover Saved Query": {
    "accessPath": [
      "deleteAnOrganizationSDiscoverSavedQuery"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/discover/saved/{query_id}/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a saved query."
  },
  "List an Organization's Environments": {
    "accessPath": [
      "listAnOrganizationSEnvironments"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/environments/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Lists an organization's environments."
  },
  "Resolve an Event ID": {
    "accessPath": [
      "resolveAnEventId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/eventids/{event_id}/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "This resolves an event ID to the project slug and internal issue ID and internal event ID."
  },
  "Query Explore Events in Table Format": {
    "accessPath": [
      "queryExploreEventsInTableFormat"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/events/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieves explore data for a given organization.\n\n**Note**: This endpoint is intended to get a table of results, and is not for doing a full export of data sent to\nSentry.\n\nThe `field` query parameter determines what fields will be selected in the `data` and `meta` keys of the endpoint response.\n- The `data` key contains a list of results row by row that match the `query` made\n- The `meta` key contains information about the response, including the unit or type of the fields requested"
  },
  "Query Explore Events in Timeseries Format": {
    "accessPath": [
      "queryExploreEventsInTimeseriesFormat"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/events-timeseries/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieves explore data for a given organization as a timeseries.\n\nThis endpoint can return timeseries for either 1 or many axis, and results grouped to the top events depending\non the parameters passed"
  },
  "Create an External User": {
    "accessPath": [
      "createAnExternalUser"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/external-users/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Link a user from an external provider to a Sentry user."
  },
  "Update an External User": {
    "accessPath": [
      "updateAnExternalUser"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/external-users/{external_user_id}/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a user in an external provider that is currently linked to a Sentry user."
  },
  "Delete an External User": {
    "accessPath": [
      "deleteAnExternalUser"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/external-users/{external_user_id}/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete the link between a user from an external provider and a Sentry user."
  },
  "Retrieve Data Forwarders for an Organization": {
    "accessPath": [
      "retrieveDataForwardersForAnOrganization"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/forwarding/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Returns a list of data forwarders for an organization."
  },
  "Create a Data Forwarder for an Organization": {
    "accessPath": [
      "createADataForwarderForAnOrganization"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/forwarding/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Creates a new data forwarder for an organization.\nOnly one data forwarder can be created per provider for a given organization.\n\nProject-specific overrides can only be created after creating the data forwarder."
  },
  "Update a Data Forwarder for an Organization": {
    "accessPath": [
      "updateADataForwarderForAnOrganization"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/forwarding/{data_forwarder_id}/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Updates a data forwarder for an organization or update a project-specific override.\nUpdates to the data forwarder's configuration require `org:write` permissions, and the entire\nconfiguration to be provided, including the `project_ids` field.\n\nTo configure project-specific overrides, specify only the following fields:\n\n  - 'project_id': The ID of the project to create/modify the override for.\n  - 'overrides': Follows the same format as `config` but all provider fields are optional, since only specified fields are overridden.\n  - 'is_enabled': To enable/disable the forwarder for events on the specific project.\n\nOverrides can be performed with `project:write` permissions on the project being modified."
  },
  "Delete a Data Forwarder for an Organization": {
    "accessPath": [
      "deleteADataForwarderForAnOrganization"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/forwarding/{data_forwarder_id}/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Deletes a data forwarder for an organization. All project-specific overrides will be deleted as well."
  },
  "List an Organization's Available Integrations": {
    "accessPath": [
      "listAnOrganizationSAvailableIntegrations"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/integrations/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Lists all the available Integrations for an Organization."
  },
  "Retrieve an Integration for an Organization": {
    "accessPath": [
      "retrieveAnIntegrationForAnOrganization"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/integrations/{integration_id}/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "OrganizationIntegrationBaseEndpoints expect both Integration and\nOrganizationIntegration DB entries to exist for a given organization and\nintegration_id."
  },
  "Delete an Integration for an Organization": {
    "accessPath": [
      "deleteAnIntegrationForAnOrganization"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/integrations/{integration_id}/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "OrganizationIntegrationBaseEndpoints expect both Integration and\nOrganizationIntegration DB entries to exist for a given organization and\nintegration_id."
  },
  "List an Organization's Issues": {
    "accessPath": [
      "listAnOrganizationSIssues"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/issues/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Return a list of issues for an organization. All parameters are supplied as query string parameters. A default query of `is:unresolved` is applied. To return all results, use an empty query value (i.e. ``?query=`). "
  },
  "Bulk Mutate an Organization's Issues": {
    "accessPath": [
      "bulkMutateAnOrganizationSIssues"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/issues/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Bulk mutate various attributes on a maxmimum of 1000 issues. \n- For non-status updates, the `id` query parameter is required. \n- For status updates, the `id` query parameter may be omitted to update issues that match the filtering. \nIf any IDs are out of scope, the data won't be mutated but the endpoint will still produce a successful response. For example, if no issues were found matching the criteria, a HTTP 204 is returned."
  },
  "Bulk Remove an Organization's Issues": {
    "accessPath": [
      "bulkRemoveAnOrganizationSIssues"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/issues/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Permanently remove the given issues. If IDs are provided, queries and filtering will be ignored. If any IDs are out of scope, the data won't be mutated but the endpoint will still produce a successful response. For example, if no issues were found matching the criteria, a HTTP 204 is returned."
  },
  "List an Organization's Members": {
    "accessPath": [
      "listAnOrganizationSMembers"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/members/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List all organization members.\n\nResponse includes pending invites that are approved by organization owners or managers but waiting to be accepted by the invitee."
  },
  "Add a Member to an Organization": {
    "accessPath": [
      "addAMemberToAnOrganization"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/members/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add or invite a member to an organization."
  },
  "Retrieve an Organization Member": {
    "accessPath": [
      "retrieveAnOrganizationMember"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/members/{member_id}/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve an organization member's details.\n\nResponse will be a pending invite if it has been approved by organization owners or managers but is waiting to be accepted by the invitee."
  },
  "Update an Organization Member's Roles": {
    "accessPath": [
      "updateAnOrganizationMemberSRoles"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/members/{member_id}/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a member's [organization-level](https://docs.sentry.io/organization/membership/#organization-level-roles) and [team-level](https://docs.sentry.io/organization/membership/#team-level-roles) roles.\n\nNote that for changing organization-roles, this endpoint is restricted to\n[user auth tokens](https://docs.sentry.io/account/auth-tokens/#user-auth-tokens).\nAdditionally, both the original and desired organization role must have\nthe same or lower permissions than the role of the organization user making the request\n\nFor example, an organization Manager may change someone's role from\nMember to Manager, but not to Owner."
  },
  "Delete an Organization Member": {
    "accessPath": [
      "deleteAnOrganizationMember"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/members/{member_id}/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Remove an organization member."
  },
  "Add an Organization Member to a Team": {
    "accessPath": [
      "addAnOrganizationMemberToATeam"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/members/{member_id}/teams/{team_id_or_slug}/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "This request can return various success codes depending on the context of the team:\n- **`201`**: The member has been successfully added.\n- **`202`**: The member needs permission to join the team and an access request\nhas been generated.\n- **`204`**: The member is already on the team.\n\nIf the team is provisioned through an identity provider, the member cannot join the\nteam through Sentry.\n\nNote the permission scopes vary depending on the organization setting `\"Open Membership\"`\nand the type of authorization token. The following table outlines the accepted scopes.\n<table style=\"width: 100%;\">\n<thead>\n    <tr>\n    <th style=\"width: 33%;\"></th>\n    <th colspan=\"2\" style=\"text-align: center; font-weight: bold; width: 33%;\">Open Membership</th>\n    </tr>\n</thead>\n<tbody>\n    <tr>\n    <td style=\"width: 34%;\"></td>\n    <td style=\"text-align: center; font-weight: bold; width: 33%;\">On</td>\n    <td style=\"text-align: center; font-weight: bold; width: 33%;\">Off</td>\n    </tr>\n    <tr>\n    <td style=\"text-align: center; font-weight: bold; vertical-align: middle;\"><a\n    href=\"https://docs.sentry.io/account/auth-tokens/#internal-integrations\">Internal Integration Token</a></td>\n    <td style=\"text-align: left; width: 33%;\">\n        <ul style=\"list-style-type: none; padding-left: 0;\">\n        <li><strong style=\"color: #9c5f99;\">&bull; org:read</strong></li>\n        </ul>\n    </td>\n    <td style=\"text-align: left; width: 33%;\">\n        <ul style=\"list-style-type: none; padding-left: 0;\">\n        <li><strong style=\"color: #9c5f99;\">&bull; org:write</strong></li>\n        <li><strong style=\"color: #9c5f99;\">&bull; team:write</strong></li>\n        </ul>\n    </td>\n    </tr>\n    <tr>\n    <td style=\"text-align: center; font-weight: bold; vertical-align: middle;\"><a\n    href=\"https://docs.sentry.io/account/auth-tokens/#user-auth-tokens\">User Auth Token</a></td>\n    <td style=\"text-align: left; width: 33%;\">\n        <ul style=\"list-style-type: none; padding-left: 0;\">\n        <li><strong style=\"color: #9c5f99;\">&bull; org:read</strong></li>\n        </ul>\n    </td>\n    <td style=\"text-align: left; width: 33%;\">\n        <ul style=\"list-style-type: none; padding-left: 0;\">\n        <li><strong style=\"color: #9c5f99;\">&bull; org:read*</strong></li>\n        <li><strong style=\"color: #9c5f99;\">&bull; org:write</strong></li>\n        <li><strong style=\"color: #9c5f99;\">&bull; org:read +</strong></li>\n        <li><strong style=\"color: #9c5f99;\">&nbsp; &nbsp;team:write**</strong></li>\n        </ul>\n    </td>\n    </tr>\n</tbody>\n</table>\n\n\n*Organization members are restricted to this scope. When sending a request, it will always\nreturn a 202 and request an invite to the team.\n\n\n\\*\\*Team Admins must have both **`org:read`** and **`team:write`** scopes in their user\nauthorization token to add members to their teams."
  },
  "Update an Organization Member's Team Role": {
    "accessPath": [
      "updateAnOrganizationMemberSTeamRole"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/members/{member_id}/teams/{team_id_or_slug}/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "The relevant organization member must already be a part of the team.\n\nNote that for organization admins, managers, and owners, they are\nautomatically granted a minimum team role of `admin` on all teams they\nare part of. Read more about [team roles](https://docs.sentry.io/product/teams/roles/)."
  },
  "Delete an Organization Member from a Team": {
    "accessPath": [
      "deleteAnOrganizationMemberFromATeam"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/members/{member_id}/teams/{team_id_or_slug}/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete an organization member from a team.\n\nNote the permission scopes vary depending on the type of authorization token. The following\ntable outlines the accepted scopes.\n<table style=\"width: 100%;\">\n    <tr style=\"width: 50%;\">\n        <td style=\"width: 50%; text-align: center; font-weight: bold; vertical-align: middle;\"><a href=\"https://docs.sentry.io/api/auth/#auth-tokens\">Org Auth Token</a></td>\n        <td style=\"width: 50%; text-align: left;\">\n            <ul style=\"list-style-type: none; padding-left: 0;\">\n                <li><strong style=\"color: #9c5f99;\">&bull; org:write</strong></li>\n                <li><strong style=\"color: #9c5f99;\">&bull; org:admin</strong></li>\n                <li><strong style=\"color: #9c5f99;\">&bull; team:admin</strong></li>\n            </ul>\n        </td>\n    </tr>\n    <tr style=\"width: 50%;\">\n        <td style=\"width: 50%; text-align: center; font-weight: bold; vertical-align: middle;\"><a href=\"https://docs.sentry.io/api/auth/#user-authentication-tokens\">User Auth Token</a></td>\n        <td style=\"width: 50%; text-align: left;\">\n            <ul style=\"list-style-type: none; padding-left: 0;\">\n                <li><strong style=\"color: #9c5f99;\">&bull; org:read*</strong></li>\n                <li><strong style=\"color: #9c5f99;\">&bull; org:write</strong></li>\n                <li><strong style=\"color: #9c5f99;\">&bull; org:admin</strong></li>\n                <li><strong style=\"color: #9c5f99;\">&bull; team:admin</strong></li>\n                <li><strong style=\"color: #9c5f99;\">&bull; org:read + team:admin**</strong></li>\n            </ul>\n        </td>\n    </tr>\n</table>\n\n\n\\***`org:read`** can only be used to remove yourself from the teams you are a member of.\n\n\n\\*\\*Team Admins must have both **`org:read`** and **`team:admin`** scopes in their user\nauthorization token to delete members from their teams."
  },
  "Retrieve Monitors for an Organization": {
    "accessPath": [
      "retrieveMonitorsForAnOrganization"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/monitors/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Lists monitors, including nested monitor environments. May be filtered to a project or environment."
  },
  "Create a Monitor": {
    "accessPath": [
      "createAMonitor"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/monitors/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a new monitor."
  },
  "Retrieve a Monitor": {
    "accessPath": [
      "retrieveAMonitor"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/monitors/{monitor_id_or_slug}/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieves details for a monitor."
  },
  "Update a Monitor": {
    "accessPath": [
      "updateAMonitor"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/monitors/{monitor_id_or_slug}/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a monitor."
  },
  "Delete a Monitor or Monitor Environments": {
    "accessPath": [
      "deleteAMonitorOrMonitorEnvironments"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/monitors/{monitor_id_or_slug}/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a monitor or monitor environments."
  },
  "Retrieve Check-Ins for a Monitor": {
    "accessPath": [
      "retrieveCheckInsForAMonitor"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/monitors/{monitor_id_or_slug}/checkins/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve a list of check-ins for a monitor"
  },
  "List Spike Protection Notifications": {
    "accessPath": [
      "listSpikeProtectionNotifications"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/notifications/actions/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Returns all Spike Protection Notification Actions for an organization.\n\nNotification Actions notify a set of members when an action has been triggered through a notification service such as Slack or Sentry.\nFor example, organization owners and managers can receive an email when a spike occurs.\n\nYou can use either the `project` or `projectSlug` query parameter to filter for certain projects. Note that if both are present, `projectSlug` takes priority."
  },
  "Create a Spike Protection Notification Action": {
    "accessPath": [
      "createASpikeProtectionNotificationAction"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/notifications/actions/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Creates a new Notification Action for Spike Protection.\n\nNotification Actions notify a set of members when an action has been triggered through a notification service such as Slack or Sentry.\nFor example, organization owners and managers can receive an email when a spike occurs."
  },
  "Retrieve a Spike Protection Notification Action": {
    "accessPath": [
      "retrieveASpikeProtectionNotificationAction"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/notifications/actions/{action_id}/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Returns a serialized Spike Protection Notification Action object.\n\nNotification Actions notify a set of members when an action has been triggered through a notification service such as Slack or Sentry.\nFor example, organization owners and managers can receive an email when a spike occurs."
  },
  "Update a Spike Protection Notification Action": {
    "accessPath": [
      "updateASpikeProtectionNotificationAction"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/notifications/actions/{action_id}/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Updates a Spike Protection Notification Action.\n\nNotification Actions notify a set of members when an action has been triggered through a notification service such as Slack or Sentry.\nFor example, organization owners and managers can receive an email when a spike occurs."
  },
  "Delete a Spike Protection Notification Action": {
    "accessPath": [
      "deleteASpikeProtectionNotificationAction"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/notifications/actions/{action_id}/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Deletes a Spike Protection Notification Action.\n\nNotification Actions notify a set of members when an action has been triggered through a notification service such as Slack or Sentry.\nFor example, organization owners and managers can receive an email when a spike occurs."
  },
  "Retrieve install info for a given artifact": {
    "accessPath": [
      "retrieveInstallInfoForAGivenArtifact"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/preprodartifacts/{artifact_id}/install-details/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve install info for a given artifact.\n\nReturns distribution and installation details for a specific preprod artifact,\nincluding whether the artifact is installable, the install URL, download count,\nand iOS-specific code signing information."
  },
  "Retrieve Size Analysis results for a given artifact": {
    "accessPath": [
      "retrieveSizeAnalysisResultsForAGivenArtifact"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/preprodartifacts/{artifact_id}/size-analysis/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve size analysis results for a given artifact.\n\nReturns size metrics including download size, install size, and optional insights.\nWhen a base artifact exists (either from commit comparison or via the `baseArtifactId` parameter),\ncomparison data showing size differences is included.\n\nThe response `state` field indicates the analysis status:\n- `PENDING`: Analysis has not started yet.\n- `PROCESSING`: Analysis is currently running.\n- `FAILED` / `NOT_RAN`: Analysis did not complete; `errorCode` and `errorMessage` are included.\n- `COMPLETED`: Analysis finished successfully with full size data."
  },
  "Retrieve Snapshot details": {
    "accessPath": [
      "retrieveSnapshotDetails"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/preprodartifacts/snapshots/{snapshot_id}/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve full details for a snapshot, including categorized image lists\nand comparison status.\n\nWhen a comparison exists, images are categorized into `changed`, `added`,\n`removed`, `renamed`, `unchanged`, `errored`, and `skipped` lists with\ncounts. Without a comparison, only the `images` list is populated.\n\nUse `compact_metadata=1` to strip image objects down to `display_name`,\n`image_file_name`, `group`, and `description` only.\n\nThis endpoint requires a bearer token with `project:read` access."
  },
  "Delete a Snapshot": {
    "accessPath": [
      "deleteASnapshot"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/preprodartifacts/snapshots/{snapshot_id}/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a snapshot and all associated data (images, comparisons, metrics).\n\nThis is a permanent, irreversible operation. The snapshot and its images\nwill no longer be accessible after deletion.\n\nThis endpoint requires a bearer token with `project:write` access."
  },
  "Download Snapshot images as ZIP": {
    "accessPath": [
      "downloadSnapshotImagesAsZip"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/preprodartifacts/snapshots/{snapshot_id}/download/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Download all images in a snapshot as a ZIP archive.\n\nThe response is a streaming `application/zip` file. Images that share\nthe same content hash are deduplicated during fetch but written under\ntheir original filenames in the archive.\n\nThis endpoint requires a bearer token with `project:read` access."
  },
  "Retrieve Snapshot image detail": {
    "accessPath": [
      "retrieveSnapshotImageDetail"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/preprodartifacts/snapshots/{snapshot_id}/images/{image_identifier}/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve detailed information for a single image within a snapshot.\n\nThe `image_identifier` can be either the image filename or its content\nhash. The response includes head and base image metadata, comparison\nstatus, diff image URL, diff percentage, and previous filename for\nrenames.\n\nThis endpoint uses a flat response format with nullable fields designed\nfor LLM/MCP consumers.\n\nThis endpoint requires a bearer token with `project:read` access."
  },
  "Retrieve latest base Snapshot": {
    "accessPath": [
      "retrieveLatestBaseSnapshot"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/preprodartifacts/snapshots/latest-base/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve the most recent base snapshot for a given app.\n\nA base snapshot is one uploaded without a `base_sha` (i.e., a snapshot\nfrom a base branch like `main`). Use the optional `branch` and `project`\nparameters to narrow the search.\n\nThe response includes the full image list with download URLs. Use\n`compact_metadata=1` to reduce image metadata.\n\nThis endpoint requires a bearer token with `project:read` access."
  },
  "Retrieves list of repositories for a given owner": {
    "accessPath": [
      "retrievesListOfRepositoriesForAGivenOwner"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/prevent/owner/{owner}/repositories/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieves repository data for a given owner."
  },
  "Gets syncing status for repositories for an integrated org": {
    "accessPath": [
      "getsSyncingStatusForRepositoriesForAnIntegratedOrg"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/prevent/owner/{owner}/repositories/sync/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Gets syncing status for repositories for an integrated organization."
  },
  "Syncs repositories from an integrated org with GitHub": {
    "accessPath": [
      "syncsRepositoriesFromAnIntegratedOrgWithGitHub"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/prevent/owner/{owner}/repositories/sync/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Syncs repositories for an integrated organization with GitHub."
  },
  "Retrieves a paginated list of repository tokens for a given owner": {
    "accessPath": [
      "retrievesAPaginatedListOfRepositoryTokensForAGivenOwner"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/prevent/owner/{owner}/repositories/tokens/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieves a paginated list of repository tokens for a given owner."
  },
  "Retrieves a single repository for a given owner": {
    "accessPath": [
      "retrievesASingleRepositoryForAGivenOwner"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/prevent/owner/{owner}/repository/{repository}/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieves repository data for a single repository."
  },
  "Retrieves list of branches for a given owner and repository": {
    "accessPath": [
      "retrievesListOfBranchesForAGivenOwnerAndRepository"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/prevent/owner/{owner}/repository/{repository}/branches/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieves branch data for a given owner and repository."
  },
  "Retrieve paginated list of test results for repository, owner, and organization": {
    "accessPath": [
      "retrievePaginatedListOfTestResultsForRepositoryOwnerAndOrganization"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/prevent/owner/{owner}/repository/{repository}/test-results/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieves the list of test results for a given repository and owner. Also accepts a number of query parameters to filter the results."
  },
  "Retrieve aggregated test result metrics for repository, owner, and organization": {
    "accessPath": [
      "retrieveAggregatedTestResultMetricsForRepositoryOwnerAndOrganization"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/prevent/owner/{owner}/repository/{repository}/test-results-aggregates/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieves aggregated test result metrics for a given repository and owner.\nAlso accepts a query parameter to specify the time period for the metrics."
  },
  "Retrieve test suites belonging to a repository's test results": {
    "accessPath": [
      "retrieveTestSuitesBelongingToARepositorySTestResults"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/prevent/owner/{owner}/repository/{repository}/test-suites/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieves test suites belonging to a repository's test results.\nIt accepts a list of test suites as a query parameter to specify individual test suites."
  },
  "Regenerates a repository upload token and returns the new token": {
    "accessPath": [
      "regeneratesARepositoryUploadTokenAndReturnsTheNewToken"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/prevent/owner/{owner}/repository/{repository}/token/regenerate/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Regenerates a repository upload token and returns the new token."
  },
  "List an Organization's Client Keys": {
    "accessPath": [
      "listAnOrganizationSClientKeys"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/project-keys/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Return a list of client keys (DSNs) for all projects in an organization.\n\nThis paginated endpoint lists client keys across all projects in an organization. Each key includes the project ID\nto identify which project it belongs to.\n\nQuery Parameters:\n- team: Filter by team slug or ID to get keys only for that team's projects\n- status: Filter by 'active' or 'inactive' to get keys with specific status"
  },
  "List an Organization's Projects": {
    "accessPath": [
      "listAnOrganizationSProjects"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/projects/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Return a list of projects bound to a organization."
  },
  "Create a Project for an Organization": {
    "accessPath": [
      "createAProjectForAnOrganization"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/projects/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a new project for an organization. A personal team (`team-{username}`) is automatically created for the caller with Team Admin role, and the project is bound to it. If the org has member project creation disabled (`disable_member_project_creation`), `org:write` scope is required."
  },
  "Create a Monitor for a Project": {
    "accessPath": [
      "createAMonitorForAProject"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/projects/{project_id_or_slug}/detectors/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a Monitor for a project"
  },
  "List an Organization's trusted Relays": {
    "accessPath": [
      "listAnOrganizationSTrustedRelays"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/relay_usage/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Return a list of trusted relays bound to an organization."
  },
  "Retrieve Statuses of Release Thresholds (Alpha)": {
    "accessPath": [
      "retrieveStatusesOfReleaseThresholdsAlpha"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/release-threshold-statuses/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "**`[WARNING]`**: This API is an experimental Alpha feature and is subject to change!\n\nList all derived statuses of releases that fall within the provided start/end datetimes.\n\nConstructs a response key'd off \\{`release_version`\\}-\\{`project_slug`\\} that lists thresholds with their status for *specified* projects.\nEach returned enriched threshold will contain the full serialized `release_threshold` instance as well as it's derived health statuses."
  },
  "Retrieve an Organization's Release": {
    "accessPath": [
      "retrieveAnOrganizationSRelease"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/releases/{version}/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Return details on an individual release."
  },
  "Update an Organization's Release": {
    "accessPath": [
      "updateAnOrganizationSRelease"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/releases/{version}/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a release. This can change some metadata associated with\nthe release (the ref, url, and dates)."
  },
  "Delete an Organization's Release": {
    "accessPath": [
      "deleteAnOrganizationSRelease"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/releases/{version}/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Permanently remove a release and all of its files."
  },
  "List a Release's Deploys": {
    "accessPath": [
      "listAReleaseSDeploys"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/releases/{version}/deploys/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Returns a list of deploys based on the organization, version, and project."
  },
  "Create a Deploy": {
    "accessPath": [
      "createADeploy"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/releases/{version}/deploys/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a deploy for a given release."
  },
  "Retrieve a Count of Replays for a Given Issue or Transaction": {
    "accessPath": [
      "retrieveACountOfReplaysForAGivenIssueOrTransaction"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/replay-count/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Return a count of replays for a list of issue or transaction IDs.\n\nThe `query` parameter is required. It is a search query that includes exactly one of `issue.id`, `transaction`, or `replay_id` (string or list of strings)."
  },
  "List an Organization's Selectors": {
    "accessPath": [
      "listAnOrganizationSSelectors"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/replay-selectors/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Return a list of selectors for a given organization."
  },
  "List an Organization's Replays": {
    "accessPath": [
      "listAnOrganizationSReplays"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/replays/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Return a list of replays belonging to an organization."
  },
  "Retrieve a Replay Instance": {
    "accessPath": [
      "retrieveAReplayInstance"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/replays/{replay_id}/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Return details on an individual replay."
  },
  "List a Repository's Commits": {
    "accessPath": [
      "listARepositorySCommits"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/repos/{repo_id}/commits/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List a Repository's Commits"
  },
  "List an Organization's Paginated Teams": {
    "accessPath": [
      "listAnOrganizationSPaginatedTeams"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/scim/v2/Groups",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "organization_id_or_slug"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "startIndex",
      "count",
      "filter",
      "excludedAttributes"
    ],
    "description": "Returns a paginated list of teams bound to a organization with a SCIM Groups GET Request.\n\nNote that the members field will only contain up to 10,000 members.",
    "parameterDescriptions": {
      "organization_id_or_slug": "The ID or slug of the organization the resource belongs to.",
      "startIndex": "SCIM 1-offset based index for pagination.",
      "count": "The maximum number of results the query should return, maximum of 100.",
      "filter": "A SCIM filter expression. The only operator currently supported is `eq`.",
      "excludedAttributes": "Fields that should be left off of return values. Right now the only supported field for this query is members."
    }
  },
  "Provision a New Team": {
    "accessPath": [
      "provisionANewTeam"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "displayName"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/scim/v2/Groups",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "organization_id_or_slug"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a new team bound to an organization via a SCIM Groups POST\nRequest. The slug will have a normalization of uppercases/spaces to\nlowercases and dashes.\n\nNote that teams are always created with an empty member set.",
    "parameterDescriptions": {
      "organization_id_or_slug": "The ID or slug of the organization the resource belongs to."
    }
  },
  "Query an Individual Team": {
    "accessPath": [
      "queryAnIndividualTeam"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/scim/v2/Groups/{team_id_or_slug}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "team_id_or_slug",
      "organization_id_or_slug"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Query an individual team with a SCIM Group GET Request.\n- Note that the members field will only contain up to 10000 members.",
    "parameterDescriptions": {
      "team_id_or_slug": "The ID or slug of the team the resource belongs to.",
      "organization_id_or_slug": "The ID or slug of the organization the resource belongs to."
    }
  },
  "Update a Team's Attributes": {
    "accessPath": [
      "updateATeamSAttributes"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "Operations"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/scim/v2/Groups/{team_id_or_slug}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "organization_id_or_slug",
      "team_id_or_slug"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a team's attributes with a SCIM Group PATCH Request.",
    "parameterDescriptions": {
      "organization_id_or_slug": "The ID or slug of the organization the resource belongs to.",
      "team_id_or_slug": "The ID or slug of the team the resource belongs to."
    }
  },
  "Delete an Individual Team": {
    "accessPath": [
      "deleteAnIndividualTeam"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/scim/v2/Groups/{team_id_or_slug}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "organization_id_or_slug",
      "team_id_or_slug"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a team with a SCIM Group DELETE Request.",
    "parameterDescriptions": {
      "organization_id_or_slug": "The ID or slug of the organization the resource belongs to.",
      "team_id_or_slug": "The ID or slug of the team the resource belongs to."
    }
  },
  "List an Organization's SCIM Members": {
    "accessPath": [
      "listAnOrganizationSScimMembers"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/scim/v2/Users",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "organization_id_or_slug"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "startIndex",
      "count",
      "filter",
      "excludedAttributes"
    ],
    "description": "Returns a paginated list of members bound to a organization with a SCIM Users GET Request.",
    "parameterDescriptions": {
      "organization_id_or_slug": "The ID or slug of the organization the resource belongs to.",
      "startIndex": "SCIM 1-offset based index for pagination.",
      "count": "The maximum number of results the query should return, maximum of 100.",
      "filter": "A SCIM filter expression. The only operator currently supported is `eq`.",
      "excludedAttributes": "Fields that should be left off of return values. Right now the only supported field for this query is members."
    }
  },
  "Provision a New Organization Member": {
    "accessPath": [
      "provisionANewOrganizationMember"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "userName",
      "sentryOrgRole"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/scim/v2/Users",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "organization_id_or_slug"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a new Organization Member via a SCIM Users POST Request.\n\nNote that this API does not support setting secondary emails.",
    "parameterDescriptions": {
      "organization_id_or_slug": "The ID or slug of the organization the resource belongs to."
    }
  },
  "Query an Individual Organization Member": {
    "accessPath": [
      "queryAnIndividualOrganizationMember"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/scim/v2/Users/{member_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "organization_id_or_slug",
      "member_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Query an individual organization member with a SCIM User GET Request.\n- The `name` object will contain fields `firstName` and `lastName` with the values of `N/A`.\nSentry's SCIM API does not currently support these fields but returns them for compatibility purposes.",
    "parameterDescriptions": {
      "organization_id_or_slug": "The ID or slug of the organization the resource belongs to.",
      "member_id": "The ID of the member to query."
    }
  },
  "Update an Organization Member's Attributes": {
    "accessPath": [
      "updateAnOrganizationMemberSAttributes"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "Operations"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/scim/v2/Users/{member_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "organization_id_or_slug",
      "member_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update an organization member's attributes with a SCIM PATCH Request.",
    "parameterDescriptions": {
      "organization_id_or_slug": "The ID or slug of the organization the resource belongs to.",
      "member_id": "The ID of the member to update."
    }
  },
  "Delete an Organization Member via SCIM": {
    "accessPath": [
      "deleteAnOrganizationMemberViaScim"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/scim/v2/Users/{member_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "organization_id_or_slug",
      "member_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete an organization member with a SCIM User DELETE Request.",
    "parameterDescriptions": {
      "organization_id_or_slug": "The ID or slug of the organization the resource belongs to.",
      "member_id": "The ID of the member to delete."
    }
  },
  "Retrieve the custom integrations created by an organization": {
    "accessPath": [
      "retrieveTheCustomIntegrationsCreatedByAnOrganization"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/sentry-apps/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve the custom integrations for an organization"
  },
  "Retrieve Release Health Session Statistics": {
    "accessPath": [
      "retrieveReleaseHealthSessionStatistics"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/sessions/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Returns a time series of release health session statistics for projects bound to an organization.\n\nThe interval and date range are subject to certain restrictions and rounding rules.\n\nThe date range is rounded to align with the interval, and is rounded to at least one\nhour. The interval can at most be one day and at least one hour currently. It has to cleanly\ndivide one day, for rounding reasons.\n\nBecause of technical limitations, this endpoint returns\nat most 10000 data points. For example, if you select a 90 day window grouped by releases,\nyou will see at most `floor(10k / (90 + 1)) = 109` releases. To get more results, reduce the\n`statsPeriod`."
  },
  "Resolve a Short ID": {
    "accessPath": [
      "resolveAShortId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/shortids/{issue_id}/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Resolve a short ID to the project slug and group details."
  },
  "Retrieve an Organization's Events Count by Project": {
    "accessPath": [
      "retrieveAnOrganizationSEventsCountByProject"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/stats-summary/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Query summarized event counts by project for your Organization. Also see https://docs.sentry.io/api/organizations/retrieve-event-counts-for-an-organization-v2/ for reference."
  },
  "Retrieve Event Counts for an Organization (v2)": {
    "accessPath": [
      "retrieveEventCountsForAnOrganizationV2"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/stats_v2/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Query event counts for your Organization.\nSelect a field, define a date range, and group or filter by columns."
  },
  "List an Organization's Teams": {
    "accessPath": [
      "listAnOrganizationSTeams"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/teams/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Returns a list of teams bound to a organization."
  },
  "Create a New Team": {
    "accessPath": [
      "createANewTeam"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/teams/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a new team bound to an organization. Requires at least one of the `name`\nor `slug` body params to be set."
  },
  "List a User's Teams for an Organization": {
    "accessPath": [
      "listAUserSTeamsForAnOrganization"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/user-teams/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Returns a list of teams the user has access to in the specified organization.\nNote that this endpoint is restricted to [user auth tokens](https://docs.sentry.io/account/auth-tokens/#user-auth-tokens)."
  },
  "Fetch Alerts": {
    "accessPath": [
      "fetchAlerts"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/workflows/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Returns a list of alerts for a given organization"
  },
  "Create an Alert for an Organization": {
    "accessPath": [
      "createAnAlertForAnOrganization"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/workflows/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Creates an alert for an organization"
  },
  "Mutate an Organization's Alerts": {
    "accessPath": [
      "mutateAnOrganizationSAlerts"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/workflows/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Bulk enable or disable alerts for a given Organization"
  },
  "Bulk Delete Alerts": {
    "accessPath": [
      "bulkDeleteAlerts"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/workflows/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Bulk delete alerts for a given organization"
  },
  "Fetch an Alert": {
    "accessPath": [
      "fetchAnAlert"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/workflows/{workflow_id}/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Returns an alert."
  },
  "Update an Alert by ID": {
    "accessPath": [
      "updateAnAlertById"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/workflows/{workflow_id}/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Updates an alert."
  },
  "Delete an Alert": {
    "accessPath": [
      "deleteAnAlert"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/workflows/{workflow_id}/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Deletes an alert."
  },
  "Retrieve a Project": {
    "accessPath": [
      "retrieveAProject"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/projects/{organization_id_or_slug}/{project_id_or_slug}/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Return details on an individual project."
  },
  "Update a Project": {
    "accessPath": [
      "updateAProject"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/0/projects/{organization_id_or_slug}/{project_id_or_slug}/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update various attributes and configurable settings for the given project.\n\nNote that solely having the **`project:read`** scope restricts updatable settings to\n`isBookmarked`, `autofixAutomationTuning`, `seerScannerAutomation`,\n`preprodSizeStatusChecksEnabled`, `preprodSizeStatusChecksRules`,\n`preprodSizeEnabledQuery`, `preprodDistributionEnabledQuery`,\n`preprodSizeEnabledByCustomer`, `preprodDistributionEnabledByCustomer`,\nand `preprodDistributionPrCommentsEnabledByCustomer`."
  },
  "Delete a Project": {
    "accessPath": [
      "deleteAProject"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/0/projects/{organization_id_or_slug}/{project_id_or_slug}/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Schedules a project for deletion.\n\nDeletion happens asynchronously and therefore is not immediate. However once deletion has\nbegun the state of a project changes and will be hidden from most public views."
  },
  "List a Project's Environments": {
    "accessPath": [
      "listAProjectSEnvironments"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/projects/{organization_id_or_slug}/{project_id_or_slug}/environments/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Lists a project's environments."
  },
  "Retrieve a Project Environment": {
    "accessPath": [
      "retrieveAProjectEnvironment"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/projects/{organization_id_or_slug}/{project_id_or_slug}/environments/{environment}/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Return details on a project environment."
  },
  "Update a Project Environment": {
    "accessPath": [
      "updateAProjectEnvironment"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/0/projects/{organization_id_or_slug}/{project_id_or_slug}/environments/{environment}/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update the visibility for a project environment."
  },
  "List a Project's Error Events": {
    "accessPath": [
      "listAProjectSErrorEvents"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/projects/{organization_id_or_slug}/{project_id_or_slug}/events/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Return a list of events bound to a project."
  },
  "Retrieve an Event for a Project": {
    "accessPath": [
      "retrieveAnEventForAProject"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/projects/{organization_id_or_slug}/{project_id_or_slug}/events/{event_id}/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Return details on an individual event."
  },
  "Debug Issues Related to Source Maps for a Given Event": {
    "accessPath": [
      "debugIssuesRelatedToSourceMapsForAGivenEvent"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/projects/{organization_id_or_slug}/{project_id_or_slug}/events/{event_id}/source-map-debug/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Return a list of source map errors for a given event."
  },
  "List a Project's Debug Information Files": {
    "accessPath": [
      "listAProjectSDebugInformationFiles"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/projects/{organization_id_or_slug}/{project_id_or_slug}/files/dsyms/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve a list of debug information files for a given project."
  },
  "List a Project's Data Filters": {
    "accessPath": [
      "listAProjectSDataFilters"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/projects/{organization_id_or_slug}/{project_id_or_slug}/filters/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve a list of filters for a given project.\n`active` will be either a boolean or a list for the legacy browser filters."
  },
  "Update an Inbound Data Filter": {
    "accessPath": [
      "updateAnInboundDataFilter"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/0/projects/{organization_id_or_slug}/{project_id_or_slug}/filters/{filter_id}/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update various inbound data filters for a project."
  },
  "List a Project's Client Keys": {
    "accessPath": [
      "listAProjectSClientKeys"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/projects/{organization_id_or_slug}/{project_id_or_slug}/keys/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Return a list of client keys bound to a project."
  },
  "Create a New Client Key": {
    "accessPath": [
      "createANewClientKey"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/0/projects/{organization_id_or_slug}/{project_id_or_slug}/keys/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a new client key bound to a project.  The key's secret and public key\nare generated by the server."
  },
  "Retrieve a Client Key": {
    "accessPath": [
      "retrieveAClientKey"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/projects/{organization_id_or_slug}/{project_id_or_slug}/keys/{key_id}/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Return a client key bound to a project."
  },
  "Update a Client Key": {
    "accessPath": [
      "updateAClientKey"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/0/projects/{organization_id_or_slug}/{project_id_or_slug}/keys/{key_id}/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update various settings for a client key."
  },
  "Delete a Client Key": {
    "accessPath": [
      "deleteAClientKey"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/0/projects/{organization_id_or_slug}/{project_id_or_slug}/keys/{key_id}/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a client key for a given project."
  },
  "List a Project's Organization Members": {
    "accessPath": [
      "listAProjectSOrganizationMembers"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/projects/{organization_id_or_slug}/{project_id_or_slug}/members/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Returns a list of active organization members that belong to any team assigned to the project."
  },
  "Retrieve a Monitor for a Project": {
    "accessPath": [
      "retrieveAMonitorForAProject"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/projects/{organization_id_or_slug}/{project_id_or_slug}/monitors/{monitor_id_or_slug}/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieves details for a monitor."
  },
  "Update a Monitor for a Project": {
    "accessPath": [
      "updateAMonitorForAProject"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/0/projects/{organization_id_or_slug}/{project_id_or_slug}/monitors/{monitor_id_or_slug}/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a monitor."
  },
  "Delete a Monitor or Monitor Environments for a Project": {
    "accessPath": [
      "deleteAMonitorOrMonitorEnvironmentsForAProject"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/0/projects/{organization_id_or_slug}/{project_id_or_slug}/monitors/{monitor_id_or_slug}/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a monitor or monitor environments."
  },
  "Retrieve Check-Ins for a Monitor by Project": {
    "accessPath": [
      "retrieveCheckInsForAMonitorByProject"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/projects/{organization_id_or_slug}/{project_id_or_slug}/monitors/{monitor_id_or_slug}/checkins/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve a list of check-ins for a monitor"
  },
  "Retrieve Ownership Configuration for a Project": {
    "accessPath": [
      "retrieveOwnershipConfigurationForAProject"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/projects/{organization_id_or_slug}/{project_id_or_slug}/ownership/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Returns details on a project's ownership configuration."
  },
  "Update Ownership Configuration for a Project": {
    "accessPath": [
      "updateOwnershipConfigurationForAProject"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/0/projects/{organization_id_or_slug}/{project_id_or_slug}/ownership/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Updates ownership configurations for a project. Note that only the\nattributes submitted are modified."
  },
  "Retrieve Size Analysis status check rules for a project": {
    "accessPath": [
      "retrieveSizeAnalysisStatusCheckRulesForAProject"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/projects/{organization_id_or_slug}/{project_id_or_slug}/preprod/size-analysis/status-check-rules/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve the current Size Analysis status check rules configured for a project.\n\nUse this endpoint after receiving a `size_analysis.completed` webhook when you\nwant external CI to evaluate the same Size Analysis status check thresholds that\nSentry uses. The endpoint returns the current project configuration, not a\nhistorical snapshot from when the webhook was emitted.\n\nThe response includes whether status check enforcement is enabled and the\nnormalized rule list Sentry uses when evaluating Size Analysis thresholds.\n\nThis endpoint requires a bearer token with `project:read` access. Project\ndistribution tokens are not supported.\n\nResponse notes:\n\n- `enabled: false` means status-check enforcement is disabled for the project.\n- `rules: []` means there are no configured thresholds to evaluate.\n- `value` is returned as a string. For `absolute` and `absolute_diff`\n  measurements it is a byte value; for `relative_diff` it is a percentage.\n- `filterQuery` is the original configured filter string.\n- `filters` is the machine-readable version of `filterQuery`.\n- `filters: []` means the rule has no filters and applies to all builds.\n- `filters: null` means the saved filter query could not be parsed; Sentry's\n  status check trigger treats that rule as non-matching.\n\nRule evaluation semantics:\n\n- Threshold comparisons are strict: a rule triggers only when the computed value\n  is greater than the configured threshold, not greater than or equal to it.\n- `absolute_diff` and `relative_diff` require a matching base metric/build.\n- `relative_diff` does not trigger when the base size is zero.\n- `artifactType` identifies the artifact scope the rule evaluates.\n  `main_artifact`, `watch_artifact`, `android_dynamic_feature_artifact`,\n  and `app_clip_artifact` target their matching artifact metric.\n  `all_artifacts` evaluates all available artifact metrics.\n- Rule filters support the keys `app_id`, `git_head_ref`,\n  `build_configuration_name`, and `platform_name`.\n- Filter objects are combined with AND. Multiple `conditions` inside one\n  filter object are combined with OR.\n- Each condition uses `values`; single-value operators still return a\n  one-item array.\n- Values in `filters` are decoded literal values for exact/simple operators,\n  not query syntax. For example, `app_id:\\*com` in `filterQuery` becomes\n  `values: [\"*com\"]` with `operator: \"equals\"`.\n- The same key can appear in more than one filter object when positive and\n  negative conditions both exist; those filter objects are still combined with\n  AND.\n- Supported filter operators are `equals`, `notEquals`, `in`, `notIn`,\n  `contains`, `notContains`, `startsWith`, `notStartsWith`, `endsWith`,\n  `notEndsWith`, `matches`, and `notMatches`.\n- `matches` and `notMatches` values use Sentry wildcard pattern syntax, not\n  regular expressions. `*` matches zero or more characters, escaped `\\*`\n  matches a literal asterisk, and a pattern without `*` is an exact match.\n- `in` and `notIn` are evaluated as one condition against all values, matching\n  Sentry's status check trigger behavior.\n- A rule applies only when the build metadata matches all filters. If a\n  referenced metadata key is missing, the filter does not match, even for\n  negated operators."
  },
  "Retrieve Snapshot status check rules for a project": {
    "accessPath": [
      "retrieveSnapshotStatusCheckRulesForAProject"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/projects/{organization_id_or_slug}/{project_id_or_slug}/preprod/snapshots/status-check-rules/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve the current Snapshot status check rules configured for a project.\n\nUse this endpoint when external CI needs to evaluate the same Snapshot\nchange-type rules that Sentry uses. The endpoint returns the current\nproject configuration, not a historical snapshot from when a build was\nprocessed.\n\nThe response includes whether status check enforcement is enabled and the\nSnapshot change types that fail the status check.\n\nThis endpoint requires a bearer token with `project:read` access. Project\ndistribution tokens are not supported.\n\nResponse notes:\n\n- `enabled: false` means status-check enforcement is disabled for the project.\n- `rules` contains one boolean per Snapshot change type.\n- `failOnAdded`, `failOnRemoved`, `failOnChanged`, and `failOnRenamed`\n  indicate which unapproved change types fail the status check."
  },
  "Get the latest installable build for a project": {
    "accessPath": [
      "getTheLatestInstallableBuildForAProject"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/projects/{organization_id_or_slug}/{project_id_or_slug}/preprodartifacts/build-distribution/latest/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get the latest installable build for a project.\n\nReturns the latest installable build matching filter criteria.\nWhen buildVersion is provided, also returns the current build and\nwhether an update is available."
  },
  "Upload a Snapshot": {
    "accessPath": [
      "uploadASnapshot"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/0/projects/{organization_id_or_slug}/{project_id_or_slug}/preprodartifacts/snapshots/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Upload a new snapshot with image metadata.\n\nThe request body is a JSON object containing `app_id` (required),\n`images` (required, a mapping of filenames to image metadata objects),\nand optional VCS fields (`head_sha`, `base_sha`, `provider`,\n`head_repo_name`, `head_ref`, `base_repo_name`, `base_ref`, `pr_number`).\n\nWhen VCS info with a `base_sha` is provided and a matching base snapshot\nexists, a comparison is automatically triggered.\n\nThis endpoint requires a bearer token with `project:write` access."
  },
  "Delete a Replay Instance": {
    "accessPath": [
      "deleteAReplayInstance"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/0/projects/{organization_id_or_slug}/{project_id_or_slug}/replays/{replay_id}/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a replay."
  },
  "List Clicked Nodes": {
    "accessPath": [
      "listClickedNodes"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/projects/{organization_id_or_slug}/{project_id_or_slug}/replays/{replay_id}/clicks/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve a collection of RRWeb DOM node-ids and the timestamp they were clicked."
  },
  "List Recording Segments": {
    "accessPath": [
      "listRecordingSegments"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/projects/{organization_id_or_slug}/{project_id_or_slug}/replays/{replay_id}/recording-segments/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Return a collection of replay recording segments."
  },
  "Retrieve a Recording Segment": {
    "accessPath": [
      "retrieveARecordingSegment"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/projects/{organization_id_or_slug}/{project_id_or_slug}/replays/{replay_id}/recording-segments/{segment_id}/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Return a replay recording segment."
  },
  "List Users Who Have Viewed a Replay": {
    "accessPath": [
      "listUsersWhoHaveViewedAReplay"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/projects/{organization_id_or_slug}/{project_id_or_slug}/replays/{replay_id}/viewed-by/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Return a list of users who have viewed a replay."
  },
  "List Replay Batch-Deletion Jobs": {
    "accessPath": [
      "listReplayBatchDeletionJobs"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/projects/{organization_id_or_slug}/{project_id_or_slug}/replays/jobs/delete/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve a collection of replay delete jobs."
  },
  "Create Replay Batch Deletion Job": {
    "accessPath": [
      "createReplayBatchDeletionJob"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/0/projects/{organization_id_or_slug}/{project_id_or_slug}/replays/jobs/delete/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a new replay deletion job."
  },
  "Retrieve a Replay Batch-Deletion Job": {
    "accessPath": [
      "retrieveAReplayBatchDeletionJob"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/projects/{organization_id_or_slug}/{project_id_or_slug}/replays/jobs/delete/{job_id}/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Fetch a replay delete job instance."
  },
  "Link a Repository to a Project": {
    "accessPath": [
      "linkARepositoryToAProject"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/0/projects/{organization_id_or_slug}/{project_id_or_slug}/repo/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Link a repository to a project. The repository must already exist\nin the organization (connected via a VCS integration). Idempotent:\nreturns 200 if the link already exists, 201 if created."
  },
  "Retrieve a Project's Symbol Sources": {
    "accessPath": [
      "retrieveAProjectSSymbolSources"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/projects/{organization_id_or_slug}/{project_id_or_slug}/symbol-sources/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List custom symbol sources configured for a project."
  },
  "Add a Symbol Source to a Project": {
    "accessPath": [
      "addASymbolSourceToAProject"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/0/projects/{organization_id_or_slug}/{project_id_or_slug}/symbol-sources/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add a custom symbol source to a project."
  },
  "Update a Project's Symbol Source": {
    "accessPath": [
      "updateAProjectSSymbolSource"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/0/projects/{organization_id_or_slug}/{project_id_or_slug}/symbol-sources/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a custom symbol source in a project."
  },
  "Delete a Symbol Source from a Project": {
    "accessPath": [
      "deleteASymbolSourceFromAProject"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/0/projects/{organization_id_or_slug}/{project_id_or_slug}/symbol-sources/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a custom symbol source from a project."
  },
  "List a Project's Teams": {
    "accessPath": [
      "listAProjectSTeams"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/projects/{organization_id_or_slug}/{project_id_or_slug}/teams/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Return a list of teams that have access to this project."
  },
  "Add a Team to a Project": {
    "accessPath": [
      "addATeamToAProject"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/0/projects/{organization_id_or_slug}/{project_id_or_slug}/teams/{team_id_or_slug}/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Give a team access to a project."
  },
  "Delete a Team from a Project": {
    "accessPath": [
      "deleteATeamFromAProject"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/0/projects/{organization_id_or_slug}/{project_id_or_slug}/teams/{team_id_or_slug}/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Revoke a team's access to a project.\n\nNote that Team Admins can only revoke access to teams they are admins of."
  },
  "List Seer AI Models": {
    "accessPath": [
      "listSeerAiModels"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/seer/models/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get list of actively used LLM model names from Seer.\n\nReturns the list of AI models that are currently used in production in Seer.\nThis endpoint does not require authentication and can be used to discover which models Seer uses.\n\nRequests to this endpoint should use the region-specific domain\neg. `us.sentry.io` or `de.sentry.io`"
  },
  "Retrieve a custom integration by ID or slug.": {
    "accessPath": [
      "retrieveACustomIntegrationByIdOrSlug"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/sentry-apps/{sentry_app_id_or_slug}/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve a custom integration."
  },
  "Update an existing custom integration.": {
    "accessPath": [
      "updateAnExistingCustomIntegration"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/0/sentry-apps/{sentry_app_id_or_slug}/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update an existing custom integration."
  },
  "Delete a custom integration.": {
    "accessPath": [
      "deleteACustomIntegration"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/0/sentry-apps/{sentry_app_id_or_slug}/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a custom integration."
  },
  "Retrieve a Team": {
    "accessPath": [
      "retrieveATeam"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/teams/{organization_id_or_slug}/{team_id_or_slug}/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Return details on an individual team."
  },
  "Update a Team": {
    "accessPath": [
      "updateATeam"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/0/teams/{organization_id_or_slug}/{team_id_or_slug}/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update various attributes and configurable settings for the given\nteam."
  },
  "Delete a Team": {
    "accessPath": [
      "deleteATeam"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/0/teams/{organization_id_or_slug}/{team_id_or_slug}/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Schedules a team for deletion.\n\n**Note:** Deletion happens asynchronously and therefore is not\nimmediate. Teams will have their slug released while waiting for deletion."
  },
  "Create an External Team": {
    "accessPath": [
      "createAnExternalTeam"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/0/teams/{organization_id_or_slug}/{team_id_or_slug}/external-teams/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Link a team from an external provider to a Sentry team."
  },
  "Update an External Team": {
    "accessPath": [
      "updateAnExternalTeam"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/0/teams/{organization_id_or_slug}/{team_id_or_slug}/external-teams/{external_team_id}/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a team in an external provider that is currently linked to a Sentry team."
  },
  "Delete an External Team": {
    "accessPath": [
      "deleteAnExternalTeam"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/0/teams/{organization_id_or_slug}/{team_id_or_slug}/external-teams/{external_team_id}/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete the link between a team from an external provider and a Sentry team."
  },
  "List a Team's Members": {
    "accessPath": [
      "listATeamSMembers"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/teams/{organization_id_or_slug}/{team_id_or_slug}/members/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List all members on a team.\n\nThe response will not include members with pending invites."
  },
  "List a Team's Projects": {
    "accessPath": [
      "listATeamSProjects"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/teams/{organization_id_or_slug}/{team_id_or_slug}/projects/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Return a list of projects bound to a team."
  },
  "Create a New Project": {
    "accessPath": [
      "createANewProject"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/0/teams/{organization_id_or_slug}/{team_id_or_slug}/projects/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a new project bound to a team.\n\n        Note: If your organization has disabled member project creation, the `org:write` or `team:admin` scope is required.\n        "
  },
  "List an Organization's Repositories": {
    "accessPath": [
      "listAnOrganizationSRepositories"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/repos/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Return a list of version control repositories for a given organization."
  },
  "List a Project's Users": {
    "accessPath": [
      "listAProjectSUsers"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/projects/{organization_id_or_slug}/{project_id_or_slug}/users/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Return a list of users seen within this project."
  },
  "List a Tag's Values": {
    "accessPath": [
      "listATagSValues"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/projects/{organization_id_or_slug}/{project_id_or_slug}/tags/{key}/values/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Return a list of values associated with this key.  The `query`\nparameter can be used to to perform a \"contains\" match on\nvalues. \n\nWhen [paginated](/api/pagination) can return at most 1000 values."
  },
  "Retrieve Event Counts for a Project": {
    "accessPath": [
      "retrieveEventCountsForAProject"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/projects/{organization_id_or_slug}/{project_id_or_slug}/stats/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Caution\nThis endpoint may change in the future without  notice."
  },
  "List a Project's User Feedback": {
    "accessPath": [
      "listAProjectSUserFeedback"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/projects/{organization_id_or_slug}/{project_id_or_slug}/user-feedback/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Return a list of user feedback items within this project.\n\n*This list does not include submissions from the [User Feedback Widget](https://docs.sentry.io/product/user-feedback/#user-feedback-widget). This is because it is based on an older format called User Reports - read more [here](https://develop.sentry.dev/application/feedback-architecture/#user-reports). To return a list of user feedback items from the widget, please use the [issue API](https://docs.sentry.io/api/events/list-a-projects-issues/) with the filter `issue.category:feedback`.*"
  },
  "Submit User Feedback": {
    "accessPath": [
      "submitUserFeedback"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/0/projects/{organization_id_or_slug}/{project_id_or_slug}/user-feedback/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "*This endpoint is DEPRECATED. We document it here for older SDKs and users who are still migrating to the [User Feedback Widget](https://docs.sentry.io/product/user-feedback/#user-feedback-widget) or [API](https://docs.sentry.io/platforms/javascript/user-feedback/#user-feedback-api)(multi-platform). If you are a new user, do not use this endpoint - unless you don't have a JS frontend, and your platform's SDK does not offer a feedback API.*\n\nFeedback must be received by the server no more than 30 minutes after the event was saved.\n\nAdditionally, within 5 minutes of submitting feedback it may also be overwritten. This is useful in situations where you may need to retry sending a request due to network failures.\n\nIf feedback is rejected due to a mutability threshold, a 409 status code will be returned.\n\nNote: Feedback may be submitted with DSN authentication (see auth documentation)."
  },
  "List a Project's Service Hooks": {
    "accessPath": [
      "listAProjectSServiceHooks"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/projects/{organization_id_or_slug}/{project_id_or_slug}/hooks/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Return a list of service hooks bound to a project."
  },
  "Register a New Service Hook": {
    "accessPath": [
      "registerANewServiceHook"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/0/projects/{organization_id_or_slug}/{project_id_or_slug}/hooks/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Register a new service hook on a project.\n\nEvents include:\n\n- event.alert: An alert is generated for an event (via rules).\n- event.created: A new event has been processed.\n\nThis endpoint requires the 'servicehooks' feature to be enabled for your project."
  },
  "Retrieve a Service Hook": {
    "accessPath": [
      "retrieveAServiceHook"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/projects/{organization_id_or_slug}/{project_id_or_slug}/hooks/{hook_id}/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Return a service hook bound to a project."
  },
  "Update a Service Hook": {
    "accessPath": [
      "updateAServiceHook"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/0/projects/{organization_id_or_slug}/{project_id_or_slug}/hooks/{hook_id}/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a service hook."
  },
  "Remove a Service Hook": {
    "accessPath": [
      "removeAServiceHook"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/0/projects/{organization_id_or_slug}/{project_id_or_slug}/hooks/{hook_id}/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Remove a service hook."
  },
  "List a Project's Issues": {
    "accessPath": [
      "listAProjectSIssues"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/projects/{organization_id_or_slug}/{project_id_or_slug}/issues/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "**Deprecated**: This endpoint has been replaced with the [Organization Issues endpoint](/api/events/list-an-organizations-issues/) which\nsupports filtering on project and additional functionality.\n\nReturn a list of issues (groups) bound to a project.  All parameters are supplied as query string parameters. \n\n A default query of ``is:unresolved`` is applied. To return results with other statuses send an new query value (i.e. ``?query=`` for all results).\n\nThe ``statsPeriod`` parameter can be used to select the timeline stats which should be present. Possible values are: ``\"\"`` (disable),``\"24h\"`` (default), ``\"14d\"``\n\nUser feedback items from the [User Feedback Widget](https://docs.sentry.io/product/user-feedback/#user-feedback-widget) are built off the issue platform, so to return a list of user feedback items for a specific project, filter for `issue.category:feedback`."
  },
  "Bulk Mutate a List of Issues": {
    "accessPath": [
      "bulkMutateAListOfIssues"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/0/projects/{organization_id_or_slug}/{project_id_or_slug}/issues/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Bulk mutate various attributes on issues.  The list of issues to modify is given through the `id` query parameter.  It is repeated for each issue that should be modified.\n\n- For non-status updates, the `id` query parameter is required.\n- For status updates, the `id` query parameter may be omitted\nfor a batch \"update all\" query.\n- An optional `status` query parameter may be used to restrict\nmutations to only events with the given status.\n\nThe following attributes can be modified and are supplied as JSON object in the body:\n\nIf any IDs are out of scope this operation will succeed without any data mutation."
  },
  "Bulk Remove a List of Issues": {
    "accessPath": [
      "bulkRemoveAListOfIssues"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/0/projects/{organization_id_or_slug}/{project_id_or_slug}/issues/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Permanently remove the given issues. The list of issues to modify is given through the `id` query parameter.  It is repeated for each issue that should be removed.\n\nOnly queries by 'id' are accepted.\n\nIf any IDs are out of scope this operation will succeed without any data mutation."
  },
  "List a Tag's Values for an Issue": {
    "accessPath": [
      "listATagSValuesForAnIssue"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/issues/{issue_id}/tags/{key}/values/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Returns a list of values associated with this key for an issue.\nReturns at most 1000 values when paginated."
  },
  "List an Issue's Hashes": {
    "accessPath": [
      "listAnIssueSHashes"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/issues/{issue_id}/hashes/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "This endpoint lists an issue's hashes, which are the generated checksums used to aggregate individual events."
  },
  "List an Organization's Releases": {
    "accessPath": [
      "listAnOrganizationSReleases"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/releases/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Return a list of releases for a given organization."
  },
  "Create a New Release for an Organization": {
    "accessPath": [
      "createANewReleaseForAnOrganization"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/releases/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a new release for the given organization.  Releases are used by\nSentry to improve its error reporting abilities by correlating\nfirst seen events with the release that might have introduced the\nproblem.\nReleases are also necessary for source maps and other debug features\nthat require manual upload for functioning well."
  },
  "List an Organization's Release Files": {
    "accessPath": [
      "listAnOrganizationSReleaseFiles"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/releases/{version}/files/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Return a list of files for a given release."
  },
  "Upload a New Organization Release File": {
    "accessPath": [
      "uploadANewOrganizationReleaseFile"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/releases/{version}/files/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Upload a new file for the given release.\n\nUnlike other API requests, files must be uploaded using the traditional multipart/form-data content-type.\n\nRequests to this endpoint should use the region-specific domain eg. `us.sentry.io` or `de.sentry.io`.\n\nThe optional 'name' attribute should reflect the absolute path that this file will be referenced as. For example, in the case of JavaScript you might specify the full web URI."
  },
  "List a Project's Release Files": {
    "accessPath": [
      "listAProjectSReleaseFiles"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/projects/{organization_id_or_slug}/{project_id_or_slug}/releases/{version}/files/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Return a list of files for a given release."
  },
  "Upload a New Project Release File": {
    "accessPath": [
      "uploadANewProjectReleaseFile"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/0/projects/{organization_id_or_slug}/{project_id_or_slug}/releases/{version}/files/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Upload a new file for the given release.\n\nUnlike other API requests, files must be uploaded using the traditional multipart/form-data content-type.\n\nRequests to this endpoint should use the region-specific domain eg. `us.sentry.io` or `de.sentry.io`\n\nThe optional 'name' attribute should reflect the absolute path that this file will be referenced as. For example, in the case of JavaScript you might specify the full web URI."
  },
  "Retrieve an Organization Release's File": {
    "accessPath": [
      "retrieveAnOrganizationReleaseSFile"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/releases/{version}/files/{file_id}/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve a file for a given release."
  },
  "Update an Organization Release File": {
    "accessPath": [
      "updateAnOrganizationReleaseFile"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/releases/{version}/files/{file_id}/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update an organization release file."
  },
  "Delete an Organization Release's File": {
    "accessPath": [
      "deleteAnOrganizationReleaseSFile"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/releases/{version}/files/{file_id}/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a file for a given release."
  },
  "Retrieve a Project Release's File": {
    "accessPath": [
      "retrieveAProjectReleaseSFile"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/projects/{organization_id_or_slug}/{project_id_or_slug}/releases/{version}/files/{file_id}/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve a file for a given release."
  },
  "Update a Project Release File": {
    "accessPath": [
      "updateAProjectReleaseFile"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/0/projects/{organization_id_or_slug}/{project_id_or_slug}/releases/{version}/files/{file_id}/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a project release file."
  },
  "Delete a Project Release's File": {
    "accessPath": [
      "deleteAProjectReleaseSFile"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/0/projects/{organization_id_or_slug}/{project_id_or_slug}/releases/{version}/files/{file_id}/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a file for a given release."
  },
  "List an Organization Release's Commits": {
    "accessPath": [
      "listAnOrganizationReleaseSCommits"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/releases/{version}/commits/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List an organization release's commits."
  },
  "List a Project Release's Commits": {
    "accessPath": [
      "listAProjectReleaseSCommits"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/projects/{organization_id_or_slug}/{project_id_or_slug}/releases/{version}/commits/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List a project release's commits."
  },
  "Retrieve Files Changed in a Release's Commits": {
    "accessPath": [
      "retrieveFilesChangedInAReleaseSCommits"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/releases/{version}/commitfiles/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve files changed in a release's commits"
  },
  "List an Organization's Integration Platform Installations": {
    "accessPath": [
      "listAnOrganizationSIntegrationPlatformInstallations"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/sentry-app-installations/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Return a list of integration platform installations for a given organization."
  },
  "Create or update an External Issue": {
    "accessPath": [
      "createOrUpdateAnExternalIssue"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/0/sentry-app-installations/{uuid}/external-issues/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create or update an external issue from an integration platform integration."
  },
  "Delete an External Issue": {
    "accessPath": [
      "deleteAnExternalIssue"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/0/sentry-app-installations/{uuid}/external-issues/{external_issue_id}/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete an external issue."
  },
  "Enable Spike Protection": {
    "accessPath": [
      "enableSpikeProtection"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/spike-protections/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Enables Spike Protection feature for some of the projects within the organization."
  },
  "Disable Spike Protection": {
    "accessPath": [
      "disableSpikeProtection"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/spike-protections/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Disables Spike Protection feature for some of the projects within the organization."
  },
  "Retrieve an Issue": {
    "accessPath": [
      "retrieveAnIssue"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/issues/{issue_id}/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Return details on an individual issue, including its basic stats, comment\nand user-report counts, and a summary of the latest event."
  },
  "Update an Issue": {
    "accessPath": [
      "updateAnIssue"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/issues/{issue_id}/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update an individual issue's attributes. Only the attributes submitted\nare modified."
  },
  "Remove an Issue": {
    "accessPath": [
      "removeAnIssue"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/issues/{issue_id}/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Asynchronously queue an individual issue for deletion."
  },
  "Retrieve Seer Issue Fix State": {
    "accessPath": [
      "retrieveSeerIssueFixState"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/issues/{issue_id}/autofix/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve the current detailed state of an issue fix process for a specific issue including:\n\n- Current status\n- Steps performed and their outcomes\n- Repository information and permissions\n- Root Cause Analysis\n- Proposed Solution\n- Generated code changes\n\nThis endpoint although documented is still experimental and the payload may change in the future."
  },
  "Start Seer Issue Fix": {
    "accessPath": [
      "startSeerIssueFix"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/issues/{issue_id}/autofix/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Trigger a Seer Issue Fix run for a specific issue.\n\nThe issue fix process can:\n- Identify the root cause of the issue\n- Propose a solution\n- Generate code changes\n- Create a pull request with the fix\n\nThe process runs asynchronously, and you can get the state using the GET endpoint."
  },
  "List an Issue's Events": {
    "accessPath": [
      "listAnIssueSEvents"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/issues/{issue_id}/events/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Return a list of error events bound to an issue"
  },
  "Retrieve an Issue Event": {
    "accessPath": [
      "retrieveAnIssueEvent"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/issues/{issue_id}/events/{event_id}/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieves the details of an issue event."
  },
  "Retrieve custom integration issue links for the given Sentry issue": {
    "accessPath": [
      "retrieveCustomIntegrationIssueLinksForTheGivenSentryIssue"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/issues/{issue_id}/external-issues/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve custom integration issue links for the given Sentry issue"
  },
  "Retrieve Tag Details": {
    "accessPath": [
      "retrieveTagDetails"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/0/organizations/{organization_id_or_slug}/issues/{issue_id}/tags/{key}/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Return a list of values associated with this key for an issue. When paginated can return at most 1000 values."
  }
} satisfies ToolRuntimeMetadataMap;
