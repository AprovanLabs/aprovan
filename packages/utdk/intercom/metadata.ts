import type { ToolRuntimeMetadataMap } from "../client.js";

export const toolMetadata = {
  "identifyAdmin": {
    "accessPath": [
      "identifyAdmin"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "GET",
    "routeTemplate": "/me",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Identify an admin"
  },
  "setAwayAdmin": {
    "accessPath": [
      "setAwayAdmin"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "away_mode_enabled",
      "away_mode_reassign",
      "away_status_reason_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "PUT",
    "routeTemplate": "/admins/{admin_id}/away",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "admin_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Set an admin to away",
    "parameterDescriptions": {
      "admin_id": "The unique identifier of a given admin"
    }
  },
  "listActivityLogs": {
    "accessPath": [
      "listActivityLogs"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "GET",
    "routeTemplate": "/admins/activity_logs",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "created_at_after",
      "created_at_before"
    ],
    "description": "List all activity logs",
    "parameterDescriptions": {
      "created_at_after": "The start date that you request data for. It must be formatted as a UNIX timestamp.",
      "created_at_before": "The end date that you request data for. It must be formatted as a UNIX timestamp."
    }
  },
  "listAdmins": {
    "accessPath": [
      "listAdmins"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "GET",
    "routeTemplate": "/admins",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "display_avatar"
    ],
    "description": "List all admins",
    "parameterDescriptions": {
      "display_avatar": "If set to true, the response will include the admin's avatar object containing the image URL. Defaults to false."
    }
  },
  "retrieveAdmin": {
    "accessPath": [
      "retrieveAdmin"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "GET",
    "routeTemplate": "/admins/{admin_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "admin_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve an admin",
    "parameterDescriptions": {
      "admin_id": "The unique identifier of a given admin"
    }
  },
  "listContentImportSources": {
    "accessPath": [
      "listContentImportSources"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "GET",
    "routeTemplate": "/ai/content_import_sources",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List content import sources"
  },
  "createContentImportSource": {
    "accessPath": [
      "createContentImportSource"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "sync_behavior",
      "status",
      "url"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "POST",
    "routeTemplate": "/ai/content_import_sources",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a content import source"
  },
  "deleteContentImportSource": {
    "accessPath": [
      "deleteContentImportSource"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "DELETE",
    "routeTemplate": "/ai/content_import_sources/{source_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "source_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a content import source"
  },
  "getContentImportSource": {
    "accessPath": [
      "getContentImportSource"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "GET",
    "routeTemplate": "/ai/content_import_sources/{source_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "source_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve a content import source"
  },
  "updateContentImportSource": {
    "accessPath": [
      "updateContentImportSource"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "sync_behavior",
      "status",
      "url"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "PUT",
    "routeTemplate": "/ai/content_import_sources/{source_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "source_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a content import source"
  },
  "listExternalPages": {
    "accessPath": [
      "listExternalPages"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "GET",
    "routeTemplate": "/ai/external_pages",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List external pages"
  },
  "createExternalPage": {
    "accessPath": [
      "createExternalPage"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "title",
      "html",
      "url",
      "ai_agent_availability",
      "ai_copilot_availability",
      "locale",
      "source_id",
      "external_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "POST",
    "routeTemplate": "/ai/external_pages",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create an external page (or update an external page by external ID)"
  },
  "deleteExternalPage": {
    "accessPath": [
      "deleteExternalPage"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "DELETE",
    "routeTemplate": "/ai/external_pages/{page_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "page_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete an external page"
  },
  "getExternalPage": {
    "accessPath": [
      "getExternalPage"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "GET",
    "routeTemplate": "/ai/external_pages/{page_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "page_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve an external page"
  },
  "updateExternalPage": {
    "accessPath": [
      "updateExternalPage"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "title",
      "html",
      "url",
      "fin_availability",
      "locale",
      "source_id",
      "external_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "PUT",
    "routeTemplate": "/ai/external_pages/{page_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "page_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update an external page"
  },
  "listArticles": {
    "accessPath": [
      "listArticles"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "GET",
    "routeTemplate": "/articles",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List all articles"
  },
  "createArticle": {
    "accessPath": [
      "createArticle"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "title",
      "description",
      "body",
      "author_id",
      "state",
      "parent_id",
      "parent_type",
      "translated_content"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "POST",
    "routeTemplate": "/articles",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create an article"
  },
  "retrieveArticle": {
    "accessPath": [
      "retrieveArticle"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "GET",
    "routeTemplate": "/articles/{article_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "article_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve an article",
    "parameterDescriptions": {
      "article_id": "The unique identifier for the article which is given by Intercom."
    }
  },
  "updateArticle": {
    "accessPath": [
      "updateArticle"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "title",
      "description",
      "body",
      "author_id",
      "state",
      "parent_id",
      "parent_type",
      "translated_content"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "PUT",
    "routeTemplate": "/articles/{article_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "article_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update an article",
    "parameterDescriptions": {
      "article_id": "The unique identifier for the article which is given by Intercom."
    }
  },
  "deleteArticle": {
    "accessPath": [
      "deleteArticle"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "DELETE",
    "routeTemplate": "/articles/{article_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "article_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete an article",
    "parameterDescriptions": {
      "article_id": "The unique identifier for the article which is given by Intercom."
    }
  },
  "searchArticles": {
    "accessPath": [
      "searchArticles"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "GET",
    "routeTemplate": "/articles/search",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "phrase",
      "state",
      "help_center_id",
      "highlight"
    ],
    "description": "Search for articles",
    "parameterDescriptions": {
      "phrase": "The phrase within your articles to search for.",
      "state": "The state of the Articles returned. One of `published`, `draft` or `all`.",
      "help_center_id": "The ID of the Help Center to search in.",
      "highlight": "Return a highlighted version of the matching content within your articles. Refer to the response schema for more details."
    }
  },
  "listAwayStatusReasons": {
    "accessPath": [
      "listAwayStatusReasons"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "GET",
    "routeTemplate": "/away_status_reasons",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List all away status reasons"
  },
  "post_export_reporting_data_enqueue": {
    "accessPath": [
      "postExportReportingDataEnqueue"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "dataset_id",
      "attribute_ids",
      "start_time",
      "end_time"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "POST",
    "routeTemplate": "/export/reporting_data/enqueue",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Enqueue a new reporting data export job"
  },
  "get_export_reporting_data_job_identifier": {
    "accessPath": [
      "getExportReportingDataJobIdentifier"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "GET",
    "routeTemplate": "/export/reporting_data/{job_identifier}",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "app_id",
      "client_id",
      "job_identifier"
    ],
    "description": "Get export job status",
    "parameterDescriptions": {
      "app_id": "The Intercom defined code of the workspace the company is associated to.",
      "job_identifier": "Unique identifier of the job."
    }
  },
  "get_export_reporting_data_get_datasets": {
    "accessPath": [
      "getExportReportingDataGetDatasets"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "GET",
    "routeTemplate": "/export/reporting_data/get_datasets",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List available datasets and attributes"
  },
  "get_download_reporting_data_job_identifier": {
    "accessPath": [
      "getDownloadReportingDataJobIdentifier"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version",
      "Accept"
    ],
    "method": "GET",
    "routeTemplate": "/download/reporting_data/{job_identifier}",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "app_id",
      "job_identifier"
    ],
    "description": "Download completed export job data",
    "parameterDescriptions": {
      "Accept": "Required header for downloading the export file"
    }
  },
  "startFinConversation": {
    "accessPath": [
      "startFinConversation"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "conversation_id",
      "message",
      "user",
      "attachments",
      "conversation_metadata"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "POST",
    "routeTemplate": "/fin/start",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Start a conversation with Fin"
  },
  "replyToFin": {
    "accessPath": [
      "replyToFin"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "conversation_id",
      "message",
      "user",
      "attachments"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "POST",
    "routeTemplate": "/fin/reply",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Reply to Fin"
  },
  "listAllCollections": {
    "accessPath": [
      "listAllCollections"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "GET",
    "routeTemplate": "/help_center/collections",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List all collections"
  },
  "createCollection": {
    "accessPath": [
      "createCollection"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "description",
      "translated_content",
      "parent_id",
      "help_center_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "POST",
    "routeTemplate": "/help_center/collections",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a collection"
  },
  "retrieveCollection": {
    "accessPath": [
      "retrieveCollection"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "GET",
    "routeTemplate": "/help_center/collections/{collection_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "collection_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve a collection",
    "parameterDescriptions": {
      "collection_id": "The unique identifier for the collection which is given by Intercom."
    }
  },
  "updateCollection": {
    "accessPath": [
      "updateCollection"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "description",
      "translated_content",
      "parent_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "PUT",
    "routeTemplate": "/help_center/collections/{collection_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "collection_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a collection",
    "parameterDescriptions": {
      "collection_id": "The unique identifier for the collection which is given by Intercom."
    }
  },
  "deleteCollection": {
    "accessPath": [
      "deleteCollection"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "DELETE",
    "routeTemplate": "/help_center/collections/{collection_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "collection_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a collection",
    "parameterDescriptions": {
      "collection_id": "The unique identifier for the collection which is given by Intercom."
    }
  },
  "retrieveHelpCenter": {
    "accessPath": [
      "retrieveHelpCenter"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "GET",
    "routeTemplate": "/help_center/help_centers/{help_center_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "help_center_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve a Help Center",
    "parameterDescriptions": {
      "help_center_id": "The unique identifier for the collection which is given by Intercom."
    }
  },
  "listHelpCenters": {
    "accessPath": [
      "listHelpCenters"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "GET",
    "routeTemplate": "/help_center/help_centers",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List all Help Centers"
  },
  "listInternalArticles": {
    "accessPath": [
      "listInternalArticles"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "GET",
    "routeTemplate": "/internal_articles",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List all articles"
  },
  "createInternalArticle": {
    "accessPath": [
      "createInternalArticle"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "title",
      "body",
      "author_id",
      "owner_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "POST",
    "routeTemplate": "/internal_articles",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create an internal article"
  },
  "retrieveInternalArticle": {
    "accessPath": [
      "retrieveInternalArticle"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "GET",
    "routeTemplate": "/internal_articles/{internal_article_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "internal_article_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve an internal article",
    "parameterDescriptions": {
      "internal_article_id": "The unique identifier for the article which is given by Intercom."
    }
  },
  "updateInternalArticle": {
    "accessPath": [
      "updateInternalArticle"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "title",
      "body",
      "author_id",
      "owner_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "PUT",
    "routeTemplate": "/internal_articles/{internal_article_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "internal_article_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update an internal article",
    "parameterDescriptions": {
      "internal_article_id": "The unique identifier for the internal article which is given by Intercom."
    }
  },
  "deleteInternalArticle": {
    "accessPath": [
      "deleteInternalArticle"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "DELETE",
    "routeTemplate": "/internal_articles/{internal_article_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "internal_article_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete an internal article",
    "parameterDescriptions": {
      "internal_article_id": "The unique identifier for the internal article which is given by Intercom."
    }
  },
  "searchInternalArticles": {
    "accessPath": [
      "searchInternalArticles"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "GET",
    "routeTemplate": "/internal_articles/search",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "folder_id"
    ],
    "description": "Search for internal articles",
    "parameterDescriptions": {
      "folder_id": "The ID of the folder to search in."
    }
  },
  "getIpAllowlist": {
    "accessPath": [
      "getIpAllowlist"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "GET",
    "routeTemplate": "/ip_allowlist",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get IP allowlist settings"
  },
  "updateIpAllowlist": {
    "accessPath": [
      "updateIpAllowlist"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "type",
      "enabled",
      "ip_allowlist"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "PUT",
    "routeTemplate": "/ip_allowlist",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update IP allowlist settings"
  },
  "createOrUpdateCompany": {
    "accessPath": [
      "createOrUpdateCompany"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "company_id",
      "plan",
      "size",
      "website",
      "industry",
      "custom_attributes",
      "remote_created_at",
      "monthly_spend"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "POST",
    "routeTemplate": "/companies",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create or Update a company"
  },
  "retrieveCompany": {
    "accessPath": [
      "retrieveCompany"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "GET",
    "routeTemplate": "/companies",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "name",
      "company_id",
      "tag_id",
      "segment_id",
      "page",
      "per_page"
    ],
    "description": "Retrieve companies",
    "parameterDescriptions": {
      "name": "The `name` of the company to filter by.",
      "company_id": "The `company_id` of the company to filter by.",
      "tag_id": "The `tag_id` of the company to filter by.",
      "segment_id": "The `segment_id` of the company to filter by.",
      "page": "The page of results to fetch. Defaults to first page",
      "per_page": "How many results to display per page. Defaults to 15"
    }
  },
  "RetrieveACompanyById": {
    "accessPath": [
      "retrieveACompanyById"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "GET",
    "routeTemplate": "/companies/{company_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "company_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve a company by ID",
    "parameterDescriptions": {
      "company_id": "The unique identifier for the company which is given by Intercom"
    }
  },
  "UpdateCompany": {
    "accessPath": [
      "updateCompany"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "plan",
      "size",
      "website",
      "industry",
      "custom_attributes",
      "monthly_spend"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "PUT",
    "routeTemplate": "/companies/{company_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "company_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a company",
    "parameterDescriptions": {
      "company_id": "The unique identifier for the company which is given by Intercom"
    }
  },
  "deleteCompany": {
    "accessPath": [
      "deleteCompany"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "DELETE",
    "routeTemplate": "/companies/{company_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "company_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a company",
    "parameterDescriptions": {
      "company_id": "The unique identifier for the company which is given by Intercom"
    }
  },
  "ListAttachedContacts": {
    "accessPath": [
      "listAttachedContacts"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "GET",
    "routeTemplate": "/companies/{company_id}/contacts",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "company_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List attached contacts",
    "parameterDescriptions": {
      "company_id": "The unique identifier for the company which is given by Intercom"
    }
  },
  "ListAttachedSegmentsForCompanies": {
    "accessPath": [
      "listAttachedSegmentsForCompanies"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "GET",
    "routeTemplate": "/companies/{company_id}/segments",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "company_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List attached segments for companies",
    "parameterDescriptions": {
      "company_id": "The unique identifier for the company which is given by Intercom"
    }
  },
  "listCompanyNotes": {
    "accessPath": [
      "listCompanyNotes"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "GET",
    "routeTemplate": "/companies/{company_id}/notes",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "company_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List all company notes",
    "parameterDescriptions": {
      "company_id": "The unique identifier for the company which is given by Intercom"
    }
  },
  "listAllCompanies": {
    "accessPath": [
      "listAllCompanies"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "POST",
    "routeTemplate": "/companies/list",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "page",
      "per_page",
      "order"
    ],
    "description": "List all companies",
    "parameterDescriptions": {
      "page": "The page of results to fetch. Defaults to first page",
      "per_page": "How many results to return per page. Defaults to 15",
      "order": "`asc` or `desc`. Return the companies in ascending or descending order. Defaults to desc"
    }
  },
  "scrollOverAllCompanies": {
    "accessPath": [
      "scrollOverAllCompanies"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "GET",
    "routeTemplate": "/companies/scroll",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "scroll_param"
    ],
    "description": "Scroll over all companies"
  },
  "attachContactToACompany": {
    "accessPath": [
      "attachContactToACompany"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "POST",
    "routeTemplate": "/contacts/{contact_id}/companies",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "contact_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Attach a Contact to a Company",
    "parameterDescriptions": {
      "contact_id": "The unique identifier for the contact which is given by Intercom"
    }
  },
  "listCompaniesForAContact": {
    "accessPath": [
      "listCompaniesForAContact"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "GET",
    "routeTemplate": "/contacts/{contact_id}/companies",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "contact_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List attached companies for contact",
    "parameterDescriptions": {
      "contact_id": "The unique identifier for the contact which is given by Intercom"
    }
  },
  "detachContactFromACompany": {
    "accessPath": [
      "detachContactFromACompany"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "DELETE",
    "routeTemplate": "/contacts/{contact_id}/companies/{company_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "contact_id",
      "company_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Detach a contact from a company",
    "parameterDescriptions": {
      "contact_id": "The unique identifier for the contact which is given by Intercom",
      "company_id": "The unique identifier for the company which is given by Intercom"
    }
  },
  "listNotes": {
    "accessPath": [
      "listNotes"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "GET",
    "routeTemplate": "/contacts/{contact_id}/notes",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "contact_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List all notes",
    "parameterDescriptions": {
      "contact_id": "The unique identifier of a contact."
    }
  },
  "createNote": {
    "accessPath": [
      "createNote"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "body",
      "admin_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "POST",
    "routeTemplate": "/contacts/{contact_id}/notes",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "contact_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a note",
    "parameterDescriptions": {
      "contact_id": "The unique identifier of a given contact."
    }
  },
  "listSegmentsForAContact": {
    "accessPath": [
      "listSegmentsForAContact"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "GET",
    "routeTemplate": "/contacts/{contact_id}/segments",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "contact_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List attached segments for contact",
    "parameterDescriptions": {
      "contact_id": "The unique identifier for the contact which is given by Intercom"
    }
  },
  "listSubscriptionsForAContact": {
    "accessPath": [
      "listSubscriptionsForAContact"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "GET",
    "routeTemplate": "/contacts/{contact_id}/subscriptions",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "contact_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List subscriptions for a contact",
    "parameterDescriptions": {
      "contact_id": "The unique identifier for the contact which is given by Intercom"
    }
  },
  "attachSubscriptionTypeToContact": {
    "accessPath": [
      "attachSubscriptionTypeToContact"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "id",
      "consent_type"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "POST",
    "routeTemplate": "/contacts/{contact_id}/subscriptions",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "contact_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add subscription to a contact",
    "parameterDescriptions": {
      "contact_id": "The unique identifier for the contact which is given by Intercom"
    }
  },
  "detachSubscriptionTypeToContact": {
    "accessPath": [
      "detachSubscriptionTypeToContact"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "DELETE",
    "routeTemplate": "/contacts/{contact_id}/subscriptions/{subscription_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "contact_id",
      "subscription_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Remove subscription from a contact",
    "parameterDescriptions": {
      "contact_id": "The unique identifier for the contact which is given by Intercom",
      "subscription_id": "The unique identifier for the subscription type which is given by Intercom"
    }
  },
  "listTagsForAContact": {
    "accessPath": [
      "listTagsForAContact"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "GET",
    "routeTemplate": "/contacts/{contact_id}/tags",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "contact_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List tags attached to a contact",
    "parameterDescriptions": {
      "contact_id": "The unique identifier for the contact which is given by Intercom"
    }
  },
  "attachTagToContact": {
    "accessPath": [
      "attachTagToContact"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "POST",
    "routeTemplate": "/contacts/{contact_id}/tags",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "contact_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add tag to a contact",
    "parameterDescriptions": {
      "contact_id": "The unique identifier for the contact which is given by Intercom"
    }
  },
  "detachTagFromContact": {
    "accessPath": [
      "detachTagFromContact"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "DELETE",
    "routeTemplate": "/contacts/{contact_id}/tags/{tag_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "contact_id",
      "tag_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Remove tag from a contact",
    "parameterDescriptions": {
      "contact_id": "The unique identifier for the contact which is given by Intercom",
      "tag_id": "The unique identifier for the tag which is given by Intercom"
    }
  },
  "UpdateContact": {
    "accessPath": [
      "updateContact"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "PUT",
    "routeTemplate": "/contacts/{contact_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "contact_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a contact",
    "parameterDescriptions": {
      "contact_id": "id"
    }
  },
  "ShowContact": {
    "accessPath": [
      "showContact"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "GET",
    "routeTemplate": "/contacts/{contact_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "contact_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get a contact",
    "parameterDescriptions": {
      "contact_id": "contact_id"
    }
  },
  "DeleteContact": {
    "accessPath": [
      "deleteContact"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "DELETE",
    "routeTemplate": "/contacts/{contact_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "contact_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a contact",
    "parameterDescriptions": {
      "contact_id": "contact_id"
    }
  },
  "MergeContact": {
    "accessPath": [
      "mergeContact"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "from",
      "into"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "POST",
    "routeTemplate": "/contacts/merge",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Merge a lead and a user"
  },
  "SearchContacts": {
    "accessPath": [
      "searchContacts"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "query",
      "pagination"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "POST",
    "routeTemplate": "/contacts/search",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Search contacts"
  },
  "ListContacts": {
    "accessPath": [
      "listContacts"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "GET",
    "routeTemplate": "/contacts",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List all contacts"
  },
  "CreateContact": {
    "accessPath": [
      "createContact"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "POST",
    "routeTemplate": "/contacts",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create contact"
  },
  "ShowContactByExternalId": {
    "accessPath": [
      "showContactByExternalId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "GET",
    "routeTemplate": "/contacts/find_by_external_id/{external_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "external_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get a contact by External ID",
    "parameterDescriptions": {
      "external_id": "The external ID of the user that you want to retrieve"
    }
  },
  "ArchiveContact": {
    "accessPath": [
      "archiveContact"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "POST",
    "routeTemplate": "/contacts/{contact_id}/archive",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "contact_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Archive contact",
    "parameterDescriptions": {
      "contact_id": "contact_id"
    }
  },
  "UnarchiveContact": {
    "accessPath": [
      "unarchiveContact"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "POST",
    "routeTemplate": "/contacts/{contact_id}/unarchive",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "contact_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Unarchive contact",
    "parameterDescriptions": {
      "contact_id": "contact_id"
    }
  },
  "BlockContact": {
    "accessPath": [
      "blockContact"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "POST",
    "routeTemplate": "/contacts/{contact_id}/block",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "contact_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Block contact",
    "parameterDescriptions": {
      "contact_id": "contact_id"
    }
  },
  "attachTagToConversation": {
    "accessPath": [
      "attachTagToConversation"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "id",
      "admin_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "POST",
    "routeTemplate": "/conversations/{conversation_id}/tags",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "conversation_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add tag to a conversation",
    "parameterDescriptions": {
      "conversation_id": "conversation_id"
    }
  },
  "detachTagFromConversation": {
    "accessPath": [
      "detachTagFromConversation"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "admin_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "DELETE",
    "routeTemplate": "/conversations/{conversation_id}/tags/{tag_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "conversation_id",
      "tag_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Remove tag from a conversation",
    "parameterDescriptions": {
      "conversation_id": "conversation_id",
      "tag_id": "tag_id"
    }
  },
  "listConversations": {
    "accessPath": [
      "listConversations"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "GET",
    "routeTemplate": "/conversations",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "per_page",
      "starting_after"
    ],
    "description": "List all conversations",
    "parameterDescriptions": {
      "per_page": "How many results per page",
      "starting_after": "String used to get the next page of conversations."
    }
  },
  "createConversation": {
    "accessPath": [
      "createConversation"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "from",
      "body",
      "subject",
      "attachment_urls",
      "created_at"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "POST",
    "routeTemplate": "/conversations",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Creates a conversation"
  },
  "retrieveConversation": {
    "accessPath": [
      "retrieveConversation"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "GET",
    "routeTemplate": "/conversations/{conversation_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "conversation_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "display_as",
      "include_translations"
    ],
    "description": "Retrieve a conversation",
    "parameterDescriptions": {
      "conversation_id": "The id of the conversation to target",
      "display_as": "Set to plaintext to retrieve conversation messages in plain text.",
      "include_translations": "If set to true, conversation parts will be translated to the detected language of the conversation."
    }
  },
  "updateConversation": {
    "accessPath": [
      "updateConversation"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "read",
      "title",
      "custom_attributes",
      "company_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "PUT",
    "routeTemplate": "/conversations/{conversation_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "conversation_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "display_as"
    ],
    "description": "Update a conversation",
    "parameterDescriptions": {
      "conversation_id": "The id of the conversation to target",
      "display_as": "Set to plaintext to retrieve conversation messages in plain text."
    }
  },
  "deleteConversation": {
    "accessPath": [
      "deleteConversation"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "DELETE",
    "routeTemplate": "/conversations/{conversation_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "conversation_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a conversation",
    "parameterDescriptions": {
      "conversation_id": "id"
    }
  },
  "searchConversations": {
    "accessPath": [
      "searchConversations"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "query",
      "pagination"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "POST",
    "routeTemplate": "/conversations/search",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Search conversations"
  },
  "replyConversation": {
    "accessPath": [
      "replyConversation"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "POST",
    "routeTemplate": "/conversations/{conversation_id}/reply",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "conversation_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Reply to a conversation",
    "parameterDescriptions": {
      "conversation_id": "The Intercom provisioned identifier for the conversation or the string \"last\" to reply to the last part of the conversation"
    }
  },
  "manageConversation": {
    "accessPath": [
      "manageConversation"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "POST",
    "routeTemplate": "/conversations/{conversation_id}/parts",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "conversation_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Manage a conversation",
    "parameterDescriptions": {
      "conversation_id": "The identifier for the conversation as given by Intercom."
    }
  },
  "attachContactToConversation": {
    "accessPath": [
      "attachContactToConversation"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "admin_id",
      "customer"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "POST",
    "routeTemplate": "/conversations/{conversation_id}/customers",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "conversation_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Attach a contact to a conversation",
    "parameterDescriptions": {
      "conversation_id": "The identifier for the conversation as given by Intercom."
    }
  },
  "detachContactFromConversation": {
    "accessPath": [
      "detachContactFromConversation"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "admin_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "DELETE",
    "routeTemplate": "/conversations/{conversation_id}/customers/{contact_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "conversation_id",
      "contact_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Detach a contact from a group conversation",
    "parameterDescriptions": {
      "conversation_id": "The identifier for the conversation as given by Intercom.",
      "contact_id": "The identifier for the contact as given by Intercom."
    }
  },
  "redactConversation": {
    "accessPath": [
      "redactConversation"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "POST",
    "routeTemplate": "/conversations/redact",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Redact a conversation part"
  },
  "convertConversationToTicket": {
    "accessPath": [
      "convertConversationToTicket"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "ticket_type_id",
      "attributes"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "POST",
    "routeTemplate": "/conversations/{conversation_id}/convert",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "conversation_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Convert a conversation to a ticket",
    "parameterDescriptions": {
      "conversation_id": "The id of the conversation to target"
    }
  },
  "createCustomObjectInstances": {
    "accessPath": [
      "createCustomObjectInstances"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "external_id",
      "external_created_at",
      "external_updated_at",
      "custom_attributes"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "POST",
    "routeTemplate": "/custom_object_instances/{custom_object_type_identifier}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "custom_object_type_identifier"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create or Update a Custom Object Instance"
  },
  "getCustomObjectInstancesByExternalId": {
    "accessPath": [
      "getCustomObjectInstancesByExternalId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "GET",
    "routeTemplate": "/custom_object_instances/{custom_object_type_identifier}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "custom_object_type_identifier"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "external_id"
    ],
    "description": "Get Custom Object Instance by External ID"
  },
  "deleteCustomObjectInstancesById": {
    "accessPath": [
      "deleteCustomObjectInstancesById"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "DELETE",
    "routeTemplate": "/custom_object_instances/{custom_object_type_identifier}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "custom_object_type_identifier"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "external_id"
    ],
    "description": "Delete a Custom Object Instance by External ID"
  },
  "getCustomObjectInstancesById": {
    "accessPath": [
      "getCustomObjectInstancesById"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "GET",
    "routeTemplate": "/custom_object_instances/{custom_object_type_identifier}/{custom_object_instance_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "custom_object_type_identifier",
      "custom_object_instance_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get Custom Object Instance by ID",
    "parameterDescriptions": {
      "custom_object_instance_id": "The id or external_id of the custom object instance"
    }
  },
  "deleteCustomObjectInstancesByExternalId": {
    "accessPath": [
      "deleteCustomObjectInstancesByExternalId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "DELETE",
    "routeTemplate": "/custom_object_instances/{custom_object_type_identifier}/{custom_object_instance_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "custom_object_type_identifier",
      "custom_object_instance_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a Custom Object Instance by ID",
    "parameterDescriptions": {
      "custom_object_instance_id": "The Intercom defined id of the custom object instance"
    }
  },
  "lisDataAttributes": {
    "accessPath": [
      "lisDataAttributes"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "GET",
    "routeTemplate": "/data_attributes",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "model",
      "include_archived"
    ],
    "description": "List all data attributes",
    "parameterDescriptions": {
      "model": "Specify the data attribute model to return.",
      "include_archived": "Include archived attributes in the list. By default we return only non archived data attributes."
    }
  },
  "createDataAttribute": {
    "accessPath": [
      "createDataAttribute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "POST",
    "routeTemplate": "/data_attributes",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a data attribute"
  },
  "updateDataAttribute": {
    "accessPath": [
      "updateDataAttribute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "PUT",
    "routeTemplate": "/data_attributes/{data_attribute_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "data_attribute_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a data attribute",
    "parameterDescriptions": {
      "data_attribute_id": "The data attribute id"
    }
  },
  "createDataEvent": {
    "accessPath": [
      "createDataEvent"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "POST",
    "routeTemplate": "/events",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Submit a data event"
  },
  "lisDataEvents": {
    "accessPath": [
      "lisDataEvents"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "GET",
    "routeTemplate": "/events",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "filter",
      "type",
      "summary"
    ],
    "description": "List all data events",
    "parameterDescriptions": {
      "type": "The value must be user",
      "summary": "summary flag"
    }
  },
  "dataEventSummaries": {
    "accessPath": [
      "dataEventSummaries"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "user_id",
      "event_summaries"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "POST",
    "routeTemplate": "/events/summaries",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create event summaries"
  },
  "createDataExport": {
    "accessPath": [
      "createDataExport"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "created_at_after",
      "created_at_before"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "POST",
    "routeTemplate": "/export/content/data",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create content data export"
  },
  "getDataExport": {
    "accessPath": [
      "getDataExport"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "GET",
    "routeTemplate": "/export/content/data/{job_identifier}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "job_identifier"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Show content data export",
    "parameterDescriptions": {
      "job_identifier": "job_identifier"
    }
  },
  "cancelDataExport": {
    "accessPath": [
      "cancelDataExport"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "POST",
    "routeTemplate": "/export/cancel/{job_identifier}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "job_identifier"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Cancel content data export",
    "parameterDescriptions": {
      "job_identifier": "job_identifier"
    }
  },
  "downloadDataExport": {
    "accessPath": [
      "downloadDataExport"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "GET",
    "routeTemplate": "/download/content/data/{job_identifier}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "job_identifier"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Download content data export",
    "parameterDescriptions": {
      "job_identifier": "job_identifier"
    }
  },
  "jobsStatus": {
    "accessPath": [
      "jobsStatus"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "GET",
    "routeTemplate": "/jobs/status/{job_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "job_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve job status",
    "parameterDescriptions": {
      "job_id": "The unique identifier for the job which is given by Intercom"
    }
  },
  "createMessage": {
    "accessPath": [
      "createMessage"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "POST",
    "routeTemplate": "/messages",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a message"
  },
  "listNewsItems": {
    "accessPath": [
      "listNewsItems"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "GET",
    "routeTemplate": "/news/news_items",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List all news items"
  },
  "createNewsItem": {
    "accessPath": [
      "createNewsItem"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "title",
      "body",
      "sender_id",
      "state",
      "deliver_silently",
      "labels",
      "reactions",
      "newsfeed_assignments"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "POST",
    "routeTemplate": "/news/news_items",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a news item"
  },
  "retrieveNewsItem": {
    "accessPath": [
      "retrieveNewsItem"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "GET",
    "routeTemplate": "/news/news_items/{news_item_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "news_item_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve a news item",
    "parameterDescriptions": {
      "news_item_id": "The unique identifier for the news item which is given by Intercom."
    }
  },
  "updateNewsItem": {
    "accessPath": [
      "updateNewsItem"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "title",
      "body",
      "sender_id",
      "state",
      "deliver_silently",
      "labels",
      "reactions",
      "newsfeed_assignments"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "PUT",
    "routeTemplate": "/news/news_items/{news_item_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "news_item_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a news item",
    "parameterDescriptions": {
      "news_item_id": "The unique identifier for the news item which is given by Intercom."
    }
  },
  "deleteNewsItem": {
    "accessPath": [
      "deleteNewsItem"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "DELETE",
    "routeTemplate": "/news/news_items/{news_item_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "news_item_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a news item",
    "parameterDescriptions": {
      "news_item_id": "The unique identifier for the news item which is given by Intercom."
    }
  },
  "listLiveNewsfeedItems": {
    "accessPath": [
      "listLiveNewsfeedItems"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "GET",
    "routeTemplate": "/news/newsfeeds/{newsfeed_id}/items",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "newsfeed_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List all live newsfeed items",
    "parameterDescriptions": {
      "newsfeed_id": "The unique identifier for the news feed item which is given by Intercom."
    }
  },
  "listNewsfeeds": {
    "accessPath": [
      "listNewsfeeds"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "GET",
    "routeTemplate": "/news/newsfeeds",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List all newsfeeds"
  },
  "retrieveNewsfeed": {
    "accessPath": [
      "retrieveNewsfeed"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "GET",
    "routeTemplate": "/news/newsfeeds/{newsfeed_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "newsfeed_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve a newsfeed",
    "parameterDescriptions": {
      "newsfeed_id": "The unique identifier for the news feed item which is given by Intercom."
    }
  },
  "retrieveNote": {
    "accessPath": [
      "retrieveNote"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "GET",
    "routeTemplate": "/notes/{note_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "note_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve a note",
    "parameterDescriptions": {
      "note_id": "The unique identifier of a given note"
    }
  },
  "listSegments": {
    "accessPath": [
      "listSegments"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "GET",
    "routeTemplate": "/segments",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "include_count"
    ],
    "description": "List all segments",
    "parameterDescriptions": {
      "include_count": "It includes the count of contacts that belong to each segment."
    }
  },
  "retrieveSegment": {
    "accessPath": [
      "retrieveSegment"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "GET",
    "routeTemplate": "/segments/{segment_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "segment_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve a segment",
    "parameterDescriptions": {
      "segment_id": "The unique identified of a given segment."
    }
  },
  "listSubscriptionTypes": {
    "accessPath": [
      "listSubscriptionTypes"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "GET",
    "routeTemplate": "/subscription_types",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List subscription types"
  },
  "createPhoneSwitch": {
    "accessPath": [
      "createPhoneSwitch"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "phone",
      "custom_attributes"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "POST",
    "routeTemplate": "/phone_call_redirects",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a phone Switch"
  },
  "listCalls": {
    "accessPath": [
      "listCalls"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "GET",
    "routeTemplate": "/calls",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "page",
      "per_page"
    ],
    "description": "List all calls",
    "parameterDescriptions": {
      "page": "The page of results to fetch. Defaults to first page",
      "per_page": "How many results to display per page. Defaults to 25. Max 25."
    }
  },
  "showCall": {
    "accessPath": [
      "showCall"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "GET",
    "routeTemplate": "/calls/{call_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "call_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get a call",
    "parameterDescriptions": {
      "call_id": "The id of the call to retrieve"
    }
  },
  "showCallRecording": {
    "accessPath": [
      "showCallRecording"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "GET",
    "routeTemplate": "/calls/{call_id}/recording",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "call_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get call recording by call id",
    "parameterDescriptions": {
      "call_id": "The id of the call"
    }
  },
  "showCallTranscript": {
    "accessPath": [
      "showCallTranscript"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "GET",
    "routeTemplate": "/calls/{call_id}/transcript",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "call_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get call transcript by call id",
    "parameterDescriptions": {
      "call_id": "The id of the call"
    }
  },
  "listCallsWithTranscripts": {
    "accessPath": [
      "listCallsWithTranscripts"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "conversation_ids"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "POST",
    "routeTemplate": "/calls/search",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List calls with transcripts"
  },
  "listTags": {
    "accessPath": [
      "listTags"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "GET",
    "routeTemplate": "/tags",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List all tags"
  },
  "createTag": {
    "accessPath": [
      "createTag"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "POST",
    "routeTemplate": "/tags",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create or update a tag, Tag or untag companies, Tag contacts"
  },
  "findTag": {
    "accessPath": [
      "findTag"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "GET",
    "routeTemplate": "/tags/{tag_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "tag_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Find a specific tag",
    "parameterDescriptions": {
      "tag_id": "The unique identifier of a given tag"
    }
  },
  "deleteTag": {
    "accessPath": [
      "deleteTag"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "DELETE",
    "routeTemplate": "/tags/{tag_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "tag_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete tag",
    "parameterDescriptions": {
      "tag_id": "The unique identifier of a given tag"
    }
  },
  "listTeams": {
    "accessPath": [
      "listTeams"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "GET",
    "routeTemplate": "/teams",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List all teams"
  },
  "retrieveTeam": {
    "accessPath": [
      "retrieveTeam"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "GET",
    "routeTemplate": "/teams/{team_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "team_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve a team",
    "parameterDescriptions": {
      "team_id": "The unique identifier of a given team."
    }
  },
  "listTicketStates": {
    "accessPath": [
      "listTicketStates"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "GET",
    "routeTemplate": "/ticket_states",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List all ticket states"
  },
  "createTicketTypeAttribute": {
    "accessPath": [
      "createTicketTypeAttribute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "description",
      "data_type",
      "required_to_create",
      "required_to_create_for_contacts",
      "visible_on_create",
      "visible_to_contacts",
      "multiline",
      "list_items",
      "allow_multiple_values"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "POST",
    "routeTemplate": "/ticket_types/{ticket_type_id}/attributes",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "ticket_type_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a new attribute for a ticket type",
    "parameterDescriptions": {
      "ticket_type_id": "The unique identifier for the ticket type which is given by Intercom."
    }
  },
  "updateTicketTypeAttribute": {
    "accessPath": [
      "updateTicketTypeAttribute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "description",
      "required_to_create",
      "required_to_create_for_contacts",
      "visible_on_create",
      "visible_to_contacts",
      "multiline",
      "list_items",
      "allow_multiple_values",
      "archived"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "PUT",
    "routeTemplate": "/ticket_types/{ticket_type_id}/attributes/{attribute_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "ticket_type_id",
      "attribute_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update an existing attribute for a ticket type",
    "parameterDescriptions": {
      "ticket_type_id": "The unique identifier for the ticket type which is given by Intercom.",
      "attribute_id": "The unique identifier for the ticket type attribute which is given by Intercom."
    }
  },
  "listTicketTypes": {
    "accessPath": [
      "listTicketTypes"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "GET",
    "routeTemplate": "/ticket_types",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List all ticket types"
  },
  "createTicketType": {
    "accessPath": [
      "createTicketType"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "description",
      "category",
      "icon",
      "is_internal"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "POST",
    "routeTemplate": "/ticket_types",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a ticket type"
  },
  "getTicketType": {
    "accessPath": [
      "getTicketType"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "GET",
    "routeTemplate": "/ticket_types/{ticket_type_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "ticket_type_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve a ticket type",
    "parameterDescriptions": {
      "ticket_type_id": "The unique identifier for the ticket type which is given by Intercom."
    }
  },
  "updateTicketType": {
    "accessPath": [
      "updateTicketType"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "description",
      "category",
      "icon",
      "archived",
      "is_internal"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "PUT",
    "routeTemplate": "/ticket_types/{ticket_type_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "ticket_type_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a ticket type",
    "parameterDescriptions": {
      "ticket_type_id": "The unique identifier for the ticket type which is given by Intercom."
    }
  },
  "replyTicket": {
    "accessPath": [
      "replyTicket"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "POST",
    "routeTemplate": "/tickets/{ticket_id}/reply",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "ticket_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Reply to a ticket"
  },
  "attachTagToTicket": {
    "accessPath": [
      "attachTagToTicket"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "id",
      "admin_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "POST",
    "routeTemplate": "/tickets/{ticket_id}/tags",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "ticket_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add tag to a ticket",
    "parameterDescriptions": {
      "ticket_id": "ticket_id"
    }
  },
  "detachTagFromTicket": {
    "accessPath": [
      "detachTagFromTicket"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "admin_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "DELETE",
    "routeTemplate": "/tickets/{ticket_id}/tags/{tag_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "ticket_id",
      "tag_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Remove tag from a ticket",
    "parameterDescriptions": {
      "ticket_id": "ticket_id",
      "tag_id": "The unique identifier for the tag which is given by Intercom"
    }
  },
  "createTicket": {
    "accessPath": [
      "createTicket"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "skip_notifications",
      "ticket_type_id",
      "contacts",
      "conversation_to_link_id",
      "company_id",
      "created_at",
      "ticket_attributes",
      "assignment"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "POST",
    "routeTemplate": "/tickets",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a ticket"
  },
  "enqueueCreateTicket": {
    "accessPath": [
      "enqueueCreateTicket"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "skip_notifications",
      "ticket_type_id",
      "contacts",
      "conversation_to_link_id",
      "company_id",
      "created_at",
      "ticket_attributes",
      "assignment"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "POST",
    "routeTemplate": "/tickets/enqueue",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Enqueue create ticket"
  },
  "updateTicket": {
    "accessPath": [
      "updateTicket"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "skip_notifications",
      "ticket_attributes",
      "ticket_state_id",
      "company_id",
      "open",
      "is_shared",
      "snoozed_until",
      "admin_id",
      "assignee_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "PUT",
    "routeTemplate": "/tickets/{ticket_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "ticket_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a ticket",
    "parameterDescriptions": {
      "ticket_id": "The unique identifier for the ticket which is given by Intercom.\n{% admonition type=\"info\" name=\"Not the Inbox ticket ID\" %}\nThis is the internal `id` field from the API response, not the `ticket_id` displayed in the Intercom Inbox (e.g., #12345). Use the `id` value from the ticket object returned by the API.\n{% /admonition %}\n"
    }
  },
  "getTicket": {
    "accessPath": [
      "getTicket"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "GET",
    "routeTemplate": "/tickets/{ticket_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "ticket_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve a ticket",
    "parameterDescriptions": {
      "ticket_id": "The unique identifier for the ticket which is given by Intercom.\n{% admonition type=\"info\" name=\"Not the Inbox ticket ID\" %}\nThis is the internal `id` field from the API response, not the `ticket_id` displayed in the Intercom Inbox (e.g., #12345). Use the `id` value from the ticket object returned by the API.\n{% /admonition %}\n"
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
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "DELETE",
    "routeTemplate": "/tickets/{ticket_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "ticket_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a ticket",
    "parameterDescriptions": {
      "ticket_id": "The unique identifier for the ticket which is given by Intercom.\n{% admonition type=\"info\" name=\"Not the Inbox ticket ID\" %}\nThis is the internal `id` field from the API response, not the `ticket_id` displayed in the Intercom Inbox (e.g., #12345). Use the `id` value from the ticket object returned by the API.\n{% /admonition %}\n"
    }
  },
  "searchTickets": {
    "accessPath": [
      "searchTickets"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "query",
      "pagination"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "POST",
    "routeTemplate": "/tickets/search",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Search tickets"
  },
  "updateVisitor": {
    "accessPath": [
      "updateVisitor"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "PUT",
    "routeTemplate": "/visitors",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a visitor"
  },
  "retrieveVisitorWithUserId": {
    "accessPath": [
      "retrieveVisitorWithUserId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "GET",
    "routeTemplate": "/visitors",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "user_id"
    ],
    "description": "Retrieve a visitor with User ID",
    "parameterDescriptions": {
      "user_id": "The user_id of the Visitor you want to retrieve."
    }
  },
  "convertVisitor": {
    "accessPath": [
      "convertVisitor"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "type",
      "user",
      "visitor"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "POST",
    "routeTemplate": "/visitors/convert",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Convert a visitor"
  },
  "listBrands": {
    "accessPath": [
      "listBrands"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "GET",
    "routeTemplate": "/brands",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List all brands"
  },
  "retrieveBrand": {
    "accessPath": [
      "retrieveBrand"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "GET",
    "routeTemplate": "/brands/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve a brand",
    "parameterDescriptions": {
      "id": "The unique identifier of the brand"
    }
  },
  "listEmails": {
    "accessPath": [
      "listEmails"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "GET",
    "routeTemplate": "/emails",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List all email settings"
  },
  "retrieveEmail": {
    "accessPath": [
      "retrieveEmail"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "GET",
    "routeTemplate": "/emails/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve an email setting",
    "parameterDescriptions": {
      "id": "The unique identifier of the email setting"
    }
  },
  "registerFinVoiceCall": {
    "accessPath": [
      "registerFinVoiceCall"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "phone_number",
      "call_id",
      "source",
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/fin_voice/register",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Register a Fin Voice call"
  },
  "collectFinVoiceCallById": {
    "accessPath": [
      "collectFinVoiceCallById"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/fin_voice/collect/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Collect Fin Voice call by ID",
    "parameterDescriptions": {
      "id": "The external reference ID"
    }
  },
  "collectFinVoiceCallByExternalId": {
    "accessPath": [
      "collectFinVoiceCallByExternalId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/fin_voice/external_id/{external_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "external_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Collect Fin Voice call by external ID",
    "parameterDescriptions": {
      "external_id": "The external call identifier from the call provider"
    }
  },
  "collectFinVoiceCallByPhoneNumber": {
    "accessPath": [
      "collectFinVoiceCallByPhoneNumber"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/fin_voice/phone_number/{phone_number}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "phone_number"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Collect Fin Voice call by phone number",
    "parameterDescriptions": {
      "phone_number": "Phone number in E.164 format"
    }
  },
  "collectFinVoiceCallsByConversationId": {
    "accessPath": [
      "collectFinVoiceCallsByConversationId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/fin_voice/conversation/{conversation_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "conversation_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Collect Fin Voice calls by conversation ID",
    "parameterDescriptions": {
      "conversation_id": "The Intercom conversation identifier"
    }
  },
  "exportWorkflow": {
    "accessPath": [
      "exportWorkflow"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Intercom-Version"
    ],
    "method": "GET",
    "routeTemplate": "/export/workflows/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Export a workflow",
    "parameterDescriptions": {
      "id": "The unique identifier for the workflow"
    }
  }
} satisfies ToolRuntimeMetadataMap;
