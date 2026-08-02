import type { ToolRuntimeMetadataMap } from "../client.js";

export const toolMetadata = {
  "assetReportCreate": {
    "accessPath": [
      "assetReportCreate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "access_tokens",
      "days_requested",
      "options"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/asset_report/create",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create an Asset Report"
  },
  "assetReportGet": {
    "accessPath": [
      "assetReportGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "asset_report_token",
      "user_token",
      "include_insights",
      "fast_report",
      "options"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/asset_report/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve an Asset Report"
  },
  "assetReportPdfGet": {
    "accessPath": [
      "assetReportPdfGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "asset_report_token",
      "options"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/asset_report/pdf/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve a PDF Asset Report"
  },
  "assetReportRefresh": {
    "accessPath": [
      "assetReportRefresh"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "asset_report_token",
      "days_requested",
      "options"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/asset_report/refresh",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Refresh an Asset Report"
  },
  "assetReportFilter": {
    "accessPath": [
      "assetReportFilter"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "asset_report_token",
      "account_ids_to_exclude"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/asset_report/filter",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Filter Asset Report"
  },
  "assetReportRemove": {
    "accessPath": [
      "assetReportRemove"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "asset_report_token"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/asset_report/remove",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete an Asset Report"
  },
  "assetReportAuditCopyCreate": {
    "accessPath": [
      "assetReportAuditCopyCreate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "asset_report_token",
      "auditor_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/asset_report/audit_copy/create",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create Asset Report Audit Copy"
  },
  "assetReportAuditCopyGet": {
    "accessPath": [
      "assetReportAuditCopyGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "audit_copy_token"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/asset_report/audit_copy/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve an Asset Report Audit Copy"
  },
  "assetReportAuditCopyPdfGet": {
    "accessPath": [
      "assetReportAuditCopyPdfGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "audit_copy_token",
      "options"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/asset_report/audit_copy/pdf/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve a PDF Asset Report Audit Copy"
  },
  "assetReportAuditCopyRemove": {
    "accessPath": [
      "assetReportAuditCopyRemove"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "audit_copy_token"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/asset_report/audit_copy/remove",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Remove Asset Report Audit Copy"
  },
  "craMonitoringInsightsSubscribe": {
    "accessPath": [
      "craMonitoringInsightsSubscribe"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "user_id",
      "item_id",
      "webhook",
      "income_categories",
      "user_token"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/cra/monitoring_insights/subscribe",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Subscribe to Monitoring Insights"
  },
  "craMonitoringInsightsUnsubscribe": {
    "accessPath": [
      "craMonitoringInsightsUnsubscribe"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "subscription_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/cra/monitoring_insights/unsubscribe",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Unsubscribe from Monitoring Insights"
  },
  "craMonitoringInsightsGet": {
    "accessPath": [
      "craMonitoringInsightsGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "user_id",
      "consumer_report_permissible_purpose",
      "user_token"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/cra/monitoring_insights/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve a Monitoring Insights Report"
  },
  "creditAuditCopyTokenUpdate": {
    "accessPath": [
      "creditAuditCopyTokenUpdate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "audit_copy_token",
      "report_tokens"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/credit/audit_copy_token/update",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update an Audit Copy Token"
  },
  "craPartnerInsightsGet": {
    "accessPath": [
      "craPartnerInsightsGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "user_token",
      "user_tier"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/cra/partner_insights/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve cash flow insights from the bank accounts used for income verification"
  },
  "craCheckReportIncomeInsightsGet": {
    "accessPath": [
      "craCheckReportIncomeInsightsGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "user_token",
      "third_party_user_token",
      "user_id",
      "options"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/cra/check_report/income_insights/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve cash flow information from your user's banks"
  },
  "craCheckReportBaseReportGet": {
    "accessPath": [
      "craCheckReportBaseReportGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "user_id",
      "third_party_user_token",
      "item_ids",
      "user_token",
      "user_tier"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/cra/check_report/base_report/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve a Base Report"
  },
  "craCheckReportPdfGet": {
    "accessPath": [
      "craCheckReportPdfGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "user_id",
      "third_party_user_token",
      "add_ons",
      "user_token"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/cra/check_report/pdf/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve Consumer Reports as a PDF"
  },
  "craCheckReportCreate": {
    "accessPath": [
      "craCheckReportCreate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "user_id",
      "user_token",
      "webhook",
      "days_requested",
      "days_required",
      "client_report_id",
      "products",
      "base_report",
      "cashflow_insights",
      "partner_insights",
      "lend_score",
      "network_insights",
      "include_investments",
      "income_insights",
      "consumer_report_permissible_purpose"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/cra/check_report/create",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Refresh or create a Consumer Report"
  },
  "craCheckReportPartnerInsightsGet": {
    "accessPath": [
      "craCheckReportPartnerInsightsGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "user_id",
      "third_party_user_token",
      "user_token",
      "user_tier",
      "partner_insights",
      "options"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/cra/check_report/partner_insights/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve cash flow insights from partners"
  },
  "craCheckReportCashflowInsightsGet": {
    "accessPath": [
      "craCheckReportCashflowInsightsGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "user_id",
      "third_party_user_token",
      "user_token",
      "options"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/cra/check_report/cashflow_insights/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve cash flow insights from your user's banking data"
  },
  "craCheckReportLendScoreGet": {
    "accessPath": [
      "craCheckReportLendScoreGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "user_id",
      "third_party_user_token",
      "user_token",
      "options"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/cra/check_report/lend_score/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve the LendScore from your user's banking data"
  },
  "craCheckReportNetworkInsightsGet": {
    "accessPath": [
      "craCheckReportNetworkInsightsGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "user_id",
      "options",
      "third_party_user_token",
      "user_token"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/cra/check_report/network_insights/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve network attributes for the user"
  },
  "craCheckReportVerificationGet": {
    "accessPath": [
      "craCheckReportVerificationGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "user_id",
      "reports_requested",
      "employment_refresh_options",
      "user_token"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/cra/check_report/verification/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve various home lending reports for a user."
  },
  "craCheckReportVerificationPdfGet": {
    "accessPath": [
      "craCheckReportVerificationPdfGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "user_id",
      "third_party_user_token",
      "report_requested",
      "user_token"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/cra/check_report/verification/pdf/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve Consumer Reports as a Verification PDF"
  },
  "craLoansApplicationsRegister": {
    "accessPath": [
      "craLoansApplicationsRegister"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "applications"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/cra/loans/applications/register",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Register loan applications and decisions."
  },
  "craLoansRegister": {
    "accessPath": [
      "craLoansRegister"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "loans"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/cra/loans/register",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Register a list of loans to their applicants."
  },
  "craLoansUpdate": {
    "accessPath": [
      "craLoansUpdate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "loans"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/cra/loans/update",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Updates loan data."
  },
  "craLoansUnregister": {
    "accessPath": [
      "craLoansUnregister"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "loans"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/cra/loans/unregister",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Unregister a list of loans."
  },
  "craCreditProfileReportGet": {
    "accessPath": [
      "craCreditProfileReportGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "user_id",
      "consumer_report_permissible_purpose",
      "client_report_id",
      "report_type",
      "inquiry_type",
      "version"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/cra/credit_profile/report/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve the credit profile report for a user"
  },
  "consumerReportPdfGet": {
    "accessPath": [
      "consumerReportPdfGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "user_token"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/consumer_report/pdf/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve a PDF Reports"
  },
  "oauthToken": {
    "accessPath": [
      "oauthToken"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "grant_type",
      "client_id",
      "client_secret",
      "secret",
      "scope",
      "refresh_token",
      "resource",
      "audience",
      "subject_token",
      "subject_token_type"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/oauth/token",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create or refresh an OAuth access token"
  },
  "oauthIntrospect": {
    "accessPath": [
      "oauthIntrospect"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "token",
      "client_id",
      "client_secret",
      "secret"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/oauth/introspect",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get metadata about an OAuth token"
  },
  "oauthRevoke": {
    "accessPath": [
      "oauthRevoke"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "token",
      "client_id",
      "client_secret",
      "secret"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/oauth/revoke",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Revoke an OAuth token"
  },
  "statementsList": {
    "accessPath": [
      "statementsList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "access_token",
      "client_id",
      "secret"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/statements/list",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve a list of all statements associated with an item."
  },
  "statementsDownload": {
    "accessPath": [
      "statementsDownload"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "access_token",
      "client_id",
      "secret",
      "statement_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/statements/download",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve a single statement."
  },
  "statementsRefresh": {
    "accessPath": [
      "statementsRefresh"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "access_token",
      "client_id",
      "secret",
      "start_date",
      "end_date"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/statements/refresh",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Refresh statements data."
  },
  "consentEventsGet": {
    "accessPath": [
      "consentEventsGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "access_token"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/consent/events/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List a historical log of item consent events"
  },
  "itemActivityList": {
    "accessPath": [
      "itemActivityList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "access_token",
      "cursor",
      "count"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/item/activity/list",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List a historical log of user consent events"
  },
  "itemApplicationList": {
    "accessPath": [
      "itemApplicationList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "access_token"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/item/application/list",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List a user’s connected applications"
  },
  "itemApplicationUnlink": {
    "accessPath": [
      "itemApplicationUnlink"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "access_token",
      "application_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/item/application/unlink",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Unlink a user’s connected application"
  },
  "itemApplicationScopesUpdate": {
    "accessPath": [
      "itemApplicationScopesUpdate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "access_token",
      "application_id",
      "scopes",
      "state",
      "context"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/item/application/scopes/update",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update the scopes of access for a particular application"
  },
  "applicationGet": {
    "accessPath": [
      "applicationGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "application_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/application/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve information about a Plaid application"
  },
  "itemGet": {
    "accessPath": [
      "itemGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "access_token"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/item/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve an Item"
  },
  "userAccountSessionGet": {
    "accessPath": [
      "userAccountSessionGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "public_token"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/user_account/session/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve User Account"
  },
  "userAccountSessionEventSend": {
    "accessPath": [
      "userAccountSessionEventSend"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "cohort_id",
      "link_session_id",
      "event"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/user_account/session/event/send",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Send User Account Session Event"
  },
  "profileNetworkStatusGet": {
    "accessPath": [
      "profileNetworkStatusGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "user"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/profile/network_status/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Check a user's Plaid Network status"
  },
  "networkStatusGet": {
    "accessPath": [
      "networkStatusGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "user",
      "template_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/network/status/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Check a user's Plaid Network status"
  },
  "authGet": {
    "accessPath": [
      "authGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "access_token",
      "options"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/auth/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve auth data"
  },
  "authVerify": {
    "accessPath": [
      "authVerify"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "legal_name",
      "numbers"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/auth/verify",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Verify auth data"
  },
  "transactionsGet": {
    "accessPath": [
      "transactionsGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "options",
      "access_token",
      "secret",
      "start_date",
      "end_date"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/transactions/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get transaction data"
  },
  "transactionsRefresh": {
    "accessPath": [
      "transactionsRefresh"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "access_token",
      "secret"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/transactions/refresh",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Refresh transaction data"
  },
  "sandboxTransactionsCreate": {
    "accessPath": [
      "sandboxTransactionsCreate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "access_token",
      "transactions"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/sandbox/transactions/create",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create sandbox transactions"
  },
  "cashflowReportRefresh": {
    "accessPath": [
      "cashflowReportRefresh"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "access_token",
      "secret",
      "days_requested"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/cashflow_report/refresh",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Refresh transaction data in `cashflow_report`"
  },
  "cashflowReportGet": {
    "accessPath": [
      "cashflowReportGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "access_token",
      "secret",
      "days_requested",
      "count",
      "cursor",
      "options"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/cashflow_report/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Gets transaction data in `cashflow_report`"
  },
  "cashflowReportTransactionsGet": {
    "accessPath": [
      "cashflowReportTransactionsGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "access_token",
      "secret",
      "count",
      "cursor",
      "options"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/cashflow_report/transactions/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Gets transaction data in cashflow_report"
  },
  "cashflowReportInsightsGet": {
    "accessPath": [
      "cashflowReportInsightsGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "access_token",
      "secret"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/cashflow_report/insights/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Gets insights data in Cashflow Report"
  },
  "transactionsRecurringGet": {
    "accessPath": [
      "transactionsRecurringGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "access_token",
      "secret",
      "options",
      "account_ids"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/transactions/recurring/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Fetch recurring transaction streams"
  },
  "transactionsSync": {
    "accessPath": [
      "transactionsSync"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "access_token",
      "secret",
      "cursor",
      "count",
      "options"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/transactions/sync",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get incremental transaction updates on an Item"
  },
  "transactionsEnrich": {
    "accessPath": [
      "transactionsEnrich"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "account_type",
      "transactions",
      "options"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/transactions/enrich",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Enrich locally-held transaction data"
  },
  "userTransactionsRefresh": {
    "accessPath": [
      "userTransactionsRefresh"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "user_id",
      "client_id",
      "secret"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/user/transactions/refresh",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Refresh user items for Transactions bundle"
  },
  "userFinancialDataRefresh": {
    "accessPath": [
      "userFinancialDataRefresh"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "user_id",
      "client_id",
      "secret"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/user/financial_data/refresh",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Refresh user items for Financial-Insights bundle"
  },
  "institutionsGet": {
    "accessPath": [
      "institutionsGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "count",
      "offset",
      "country_codes",
      "options"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/institutions/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get details of all supported institutions"
  },
  "institutionsSearch": {
    "accessPath": [
      "institutionsSearch"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "query",
      "products",
      "country_codes",
      "options"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/institutions/search",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Search institutions"
  },
  "institutionsGetById": {
    "accessPath": [
      "institutionsGetById"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "institution_id",
      "country_codes",
      "options"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/institutions/get_by_id",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get details of an institution"
  },
  "itemRemove": {
    "accessPath": [
      "itemRemove"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "access_token",
      "reason_code",
      "reason_note"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/item/remove",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Remove an Item"
  },
  "itemProductsTerminate": {
    "accessPath": [
      "itemProductsTerminate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "access_token",
      "reason_code",
      "reason_note"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/item/products/terminate",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Terminate products for an Item"
  },
  "itemHandleFraudReport": {
    "accessPath": [
      "itemHandleFraudReport"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "access_token",
      "user_id",
      "incident_event",
      "report_confidence",
      "report_type",
      "report_source",
      "bank_account",
      "ach_return_code",
      "notes"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/item/handle_fraud_report",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Report fraud for an Item"
  },
  "accountsGet": {
    "accessPath": [
      "accountsGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "access_token",
      "options"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/accounts/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve accounts"
  },
  "categoriesGet": {
    "accessPath": [
      "categoriesGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/categories/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "(Deprecated) Get legacy categories"
  },
  "sandboxProcessorTokenCreate": {
    "accessPath": [
      "sandboxProcessorTokenCreate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "institution_id",
      "options"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/sandbox/processor_token/create",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a test Item and processor token"
  },
  "sandboxPublicTokenCreate": {
    "accessPath": [
      "sandboxPublicTokenCreate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "institution_id",
      "initial_products",
      "options",
      "user_token",
      "user_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/sandbox/public_token/create",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a test Item"
  },
  "sandboxItemFireWebhook": {
    "accessPath": [
      "sandboxItemFireWebhook"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "access_token",
      "webhook_type",
      "webhook_code"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/sandbox/item/fire_webhook",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Fire a test webhook"
  },
  "accountsBalanceGet": {
    "accessPath": [
      "accountsBalanceGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "access_token",
      "secret",
      "client_id",
      "options"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/accounts/balance/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve real-time balance data"
  },
  "identityGet": {
    "accessPath": [
      "identityGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "access_token",
      "options"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/identity/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve identity data"
  },
  "identityDocumentsUploadsGet": {
    "accessPath": [
      "identityDocumentsUploadsGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "access_token",
      "options"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/identity/documents/uploads/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Returns uploaded document identity"
  },
  "identityMatch": {
    "accessPath": [
      "identityMatch"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "access_token",
      "user",
      "options"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/identity/match",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve identity match score"
  },
  "identityRefresh": {
    "accessPath": [
      "identityRefresh"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "access_token",
      "secret"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/identity/refresh",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Refresh identity data"
  },
  "dashboardUserGet": {
    "accessPath": [
      "dashboardUserGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "dashboard_user_id",
      "secret",
      "client_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/dashboard_user/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve a dashboard user"
  },
  "dashboardUserList": {
    "accessPath": [
      "dashboardUserList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "secret",
      "client_id",
      "cursor"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/dashboard_user/list",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List dashboard users"
  },
  "identityVerificationCreate": {
    "accessPath": [
      "identityVerificationCreate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_user_id",
      "user_id",
      "is_shareable",
      "template_id",
      "gave_consent",
      "user",
      "client_id",
      "secret",
      "is_idempotent"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/identity_verification/create",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a new Identity Verification"
  },
  "identityVerificationGet": {
    "accessPath": [
      "identityVerificationGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "identity_verification_id",
      "secret",
      "client_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/identity_verification/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve Identity Verification"
  },
  "identityVerificationList": {
    "accessPath": [
      "identityVerificationList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "secret",
      "client_id",
      "template_id",
      "client_user_id",
      "user_id",
      "cursor"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/identity_verification/list",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List Identity Verifications"
  },
  "identityVerificationRetry": {
    "accessPath": [
      "identityVerificationRetry"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_user_id",
      "template_id",
      "strategy",
      "user",
      "steps",
      "is_shareable",
      "client_id",
      "secret"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/identity_verification/retry",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retry an Identity Verification"
  },
  "watchlistScreeningEntityCreate": {
    "accessPath": [
      "watchlistScreeningEntityCreate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "search_terms",
      "client_user_id",
      "client_id",
      "secret"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/watchlist_screening/entity/create",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a watchlist screening for an entity"
  },
  "watchlistScreeningEntityGet": {
    "accessPath": [
      "watchlistScreeningEntityGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "entity_watchlist_screening_id",
      "secret",
      "client_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/watchlist_screening/entity/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get an entity screening"
  },
  "watchlistScreeningEntityHistoryList": {
    "accessPath": [
      "watchlistScreeningEntityHistoryList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "secret",
      "client_id",
      "entity_watchlist_screening_id",
      "cursor"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/watchlist_screening/entity/history/list",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List history for entity watchlist screenings"
  },
  "watchlistScreeningEntityHitList": {
    "accessPath": [
      "watchlistScreeningEntityHitList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "secret",
      "client_id",
      "entity_watchlist_screening_id",
      "cursor"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/watchlist_screening/entity/hit/list",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List hits for entity watchlist screenings"
  },
  "watchlistScreeningEntityList": {
    "accessPath": [
      "watchlistScreeningEntityList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "secret",
      "client_id",
      "entity_watchlist_program_id",
      "client_user_id",
      "status",
      "assignee",
      "cursor"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/watchlist_screening/entity/list",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List entity watchlist screenings"
  },
  "watchlistScreeningEntityProgramGet": {
    "accessPath": [
      "watchlistScreeningEntityProgramGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "entity_watchlist_program_id",
      "secret",
      "client_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/watchlist_screening/entity/program/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get entity watchlist screening program"
  },
  "watchlistScreeningEntityProgramList": {
    "accessPath": [
      "watchlistScreeningEntityProgramList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "secret",
      "client_id",
      "cursor"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/watchlist_screening/entity/program/list",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List entity watchlist screening programs"
  },
  "watchlistScreeningEntityReviewCreate": {
    "accessPath": [
      "watchlistScreeningEntityReviewCreate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "confirmed_hits",
      "dismissed_hits",
      "comment",
      "client_id",
      "secret",
      "entity_watchlist_screening_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/watchlist_screening/entity/review/create",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a review for an entity watchlist screening"
  },
  "watchlistScreeningEntityReviewList": {
    "accessPath": [
      "watchlistScreeningEntityReviewList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "secret",
      "client_id",
      "entity_watchlist_screening_id",
      "cursor"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/watchlist_screening/entity/review/list",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List reviews for entity watchlist screenings"
  },
  "watchlistScreeningEntityUpdate": {
    "accessPath": [
      "watchlistScreeningEntityUpdate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "entity_watchlist_screening_id",
      "search_terms",
      "assignee",
      "status",
      "client_user_id",
      "client_id",
      "secret",
      "reset_fields"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/watchlist_screening/entity/update",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update an entity screening"
  },
  "watchlistScreeningIndividualCreate": {
    "accessPath": [
      "watchlistScreeningIndividualCreate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "search_terms",
      "client_user_id",
      "client_id",
      "secret"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/watchlist_screening/individual/create",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a watchlist screening for a person"
  },
  "watchlistScreeningIndividualGet": {
    "accessPath": [
      "watchlistScreeningIndividualGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "watchlist_screening_id",
      "secret",
      "client_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/watchlist_screening/individual/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve an individual watchlist screening"
  },
  "watchlistScreeningIndividualHistoryList": {
    "accessPath": [
      "watchlistScreeningIndividualHistoryList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "secret",
      "client_id",
      "watchlist_screening_id",
      "cursor"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/watchlist_screening/individual/history/list",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List history for individual watchlist screenings"
  },
  "watchlistScreeningIndividualHitList": {
    "accessPath": [
      "watchlistScreeningIndividualHitList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "secret",
      "client_id",
      "watchlist_screening_id",
      "cursor"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/watchlist_screening/individual/hit/list",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List hits for individual watchlist screening"
  },
  "watchlistScreeningIndividualList": {
    "accessPath": [
      "watchlistScreeningIndividualList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "secret",
      "client_id",
      "watchlist_program_id",
      "client_user_id",
      "status",
      "assignee",
      "cursor"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/watchlist_screening/individual/list",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List Individual Watchlist Screenings"
  },
  "watchlistScreeningIndividualProgramGet": {
    "accessPath": [
      "watchlistScreeningIndividualProgramGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "watchlist_program_id",
      "secret",
      "client_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/watchlist_screening/individual/program/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get individual watchlist screening program"
  },
  "watchlistScreeningIndividualProgramList": {
    "accessPath": [
      "watchlistScreeningIndividualProgramList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "secret",
      "client_id",
      "cursor"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/watchlist_screening/individual/program/list",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List individual watchlist screening programs"
  },
  "watchlistScreeningIndividualReviewCreate": {
    "accessPath": [
      "watchlistScreeningIndividualReviewCreate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "confirmed_hits",
      "dismissed_hits",
      "comment",
      "client_id",
      "secret",
      "watchlist_screening_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/watchlist_screening/individual/review/create",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a review for an individual watchlist screening"
  },
  "watchlistScreeningIndividualReviewList": {
    "accessPath": [
      "watchlistScreeningIndividualReviewList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "secret",
      "client_id",
      "watchlist_screening_id",
      "cursor"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/watchlist_screening/individual/review/list",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List reviews for individual watchlist screenings"
  },
  "watchlistScreeningIndividualUpdate": {
    "accessPath": [
      "watchlistScreeningIndividualUpdate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "watchlist_screening_id",
      "search_terms",
      "assignee",
      "status",
      "client_user_id",
      "client_id",
      "secret",
      "reset_fields"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/watchlist_screening/individual/update",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update individual watchlist screening"
  },
  "beaconAccountRiskEvaluate": {
    "accessPath": [
      "beaconAccountRiskEvaluate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "access_token",
      "options",
      "client_user_id",
      "client_evaluation_id",
      "evaluation_reason",
      "device",
      "evaluate_time"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/beacon/account_risk/v1/evaluate",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Evaluate risk of a bank account"
  },
  "beaconUserCreate": {
    "accessPath": [
      "beaconUserCreate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "program_id",
      "client_user_id",
      "user",
      "access_tokens",
      "client_id",
      "secret"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/beacon/user/create",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a Beacon User"
  },
  "beaconUserGet": {
    "accessPath": [
      "beaconUserGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "beacon_user_id",
      "client_id",
      "secret"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/beacon/user/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get a Beacon User"
  },
  "beaconUserReview": {
    "accessPath": [
      "beaconUserReview"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "beacon_user_id",
      "status",
      "client_id",
      "secret"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/beacon/user/review",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Review a Beacon User"
  },
  "beaconReportCreate": {
    "accessPath": [
      "beaconReportCreate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "beacon_user_id",
      "type",
      "fraud_date",
      "fraud_amount",
      "client_id",
      "secret"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/beacon/report/create",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a Beacon Report"
  },
  "beaconReportList": {
    "accessPath": [
      "beaconReportList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "beacon_user_id",
      "cursor",
      "client_id",
      "secret"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/beacon/report/list",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List Beacon Reports for a Beacon User"
  },
  "beaconReportSyndicationList": {
    "accessPath": [
      "beaconReportSyndicationList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "beacon_user_id",
      "cursor",
      "client_id",
      "secret"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/beacon/report_syndication/list",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List Beacon Report Syndications for a Beacon User"
  },
  "beaconReportGet": {
    "accessPath": [
      "beaconReportGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "beacon_report_id",
      "client_id",
      "secret"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/beacon/report/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get a Beacon Report"
  },
  "beaconReportSyndicationGet": {
    "accessPath": [
      "beaconReportSyndicationGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "beacon_report_syndication_id",
      "client_id",
      "secret"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/beacon/report_syndication/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get a Beacon Report Syndication"
  },
  "beaconUserUpdate": {
    "accessPath": [
      "beaconUserUpdate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "beacon_user_id",
      "user",
      "access_tokens",
      "client_id",
      "secret"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/beacon/user/update",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update the identity data of a Beacon User"
  },
  "beaconDuplicateGet": {
    "accessPath": [
      "beaconDuplicateGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "beacon_duplicate_id",
      "client_id",
      "secret"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/beacon/duplicate/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get a Beacon Duplicate"
  },
  "identityVerificationAutofillCreate": {
    "accessPath": [
      "identityVerificationAutofillCreate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "identity_verification_id",
      "client_id",
      "secret"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/identity_verification/autofill/create",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create autofill for an Identity Verification"
  },
  "beaconUserHistoryList": {
    "accessPath": [
      "beaconUserHistoryList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "beacon_user_id",
      "cursor",
      "client_id",
      "secret"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/beacon/user/history/list",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List a Beacon User's history"
  },
  "beaconUserAccountInsightsGet": {
    "accessPath": [
      "beaconUserAccountInsightsGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "beacon_user_id",
      "access_token",
      "client_id",
      "secret"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/beacon/user/account_insights/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get Account Insights for a Beacon User"
  },
  "protectUserInsightsGet": {
    "accessPath": [
      "protectUserInsightsGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "user_id",
      "client_user_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/protect/user/insights/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get Protect user insights"
  },
  "protectReportCreate": {
    "accessPath": [
      "protectReportCreate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "user_id",
      "incident_event",
      "report_confidence",
      "report_type",
      "report_source",
      "bank_account",
      "ach_return_code",
      "notes"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/protect/report/create",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a Protect report"
  },
  "protectCompute": {
    "accessPath": [
      "protectCompute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "model",
      "user",
      "model_inputs"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/protect/compute",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Compute Protect Trust Index Score"
  },
  "protectEventSend": {
    "accessPath": [
      "protectEventSend"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "timestamp",
      "event",
      "protect_session_id",
      "request_trust_index"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/protect/event/send",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Send a new event to enrich user data"
  },
  "protectEventGet": {
    "accessPath": [
      "protectEventGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "event_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/protect/event/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get information about a user event"
  },
  "businessVerificationGet": {
    "accessPath": [
      "businessVerificationGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "business_verification_id",
      "secret",
      "client_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/business_verification/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get a business verification"
  },
  "businessVerificationCreate": {
    "accessPath": [
      "businessVerificationCreate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_user_id",
      "business",
      "client_id",
      "secret"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/business_verification/create",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a business verification"
  },
  "processorAuthGet": {
    "accessPath": [
      "processorAuthGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "processor_token"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/processor/auth/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve Auth data"
  },
  "processorAccountGet": {
    "accessPath": [
      "processorAccountGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "processor_token",
      "secret"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/processor/account/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve the account associated with a processor token"
  },
  "processorInvestmentsHoldingsGet": {
    "accessPath": [
      "processorInvestmentsHoldingsGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "processor_token",
      "secret"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/processor/investments/holdings/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve Investment Holdings"
  },
  "processorInvestmentsAuthGet": {
    "accessPath": [
      "processorInvestmentsAuthGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "processor_token"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/processor/investments/auth/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get investment account authentication data"
  },
  "processorInvestmentsTransactionsGet": {
    "accessPath": [
      "processorInvestmentsTransactionsGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "options",
      "processor_token",
      "secret",
      "start_date",
      "end_date"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/processor/investments/transactions/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get investment transactions data"
  },
  "processorTransactionsGet": {
    "accessPath": [
      "processorTransactionsGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "options",
      "processor_token",
      "secret",
      "start_date",
      "end_date"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/processor/transactions/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get transaction data"
  },
  "processorTransactionsSync": {
    "accessPath": [
      "processorTransactionsSync"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "processor_token",
      "secret",
      "cursor",
      "count",
      "options"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/processor/transactions/sync",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get incremental transaction updates on a processor token"
  },
  "processorTransactionsRefresh": {
    "accessPath": [
      "processorTransactionsRefresh"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "processor_token",
      "secret"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/processor/transactions/refresh",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Refresh transaction data"
  },
  "processorTransactionsRecurringGet": {
    "accessPath": [
      "processorTransactionsRecurringGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "processor_token",
      "secret",
      "options"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/processor/transactions/recurring/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Fetch recurring transaction streams"
  },
  "processorSignalEvaluate": {
    "accessPath": [
      "processorSignalEvaluate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "processor_token",
      "client_transaction_id",
      "amount",
      "user_present",
      "client_user_id",
      "is_recurring",
      "default_payment_method",
      "user",
      "device",
      "ruleset_key"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/processor/signal/evaluate",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Evaluate a planned ACH transaction"
  },
  "processorSignalDecisionReport": {
    "accessPath": [
      "processorSignalDecisionReport"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "processor_token",
      "client_transaction_id",
      "initiated",
      "days_funds_on_hold",
      "decision_outcome",
      "payment_method",
      "amount_instantly_available"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/processor/signal/decision/report",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Report whether you initiated an ACH transaction"
  },
  "processorSignalReturnReport": {
    "accessPath": [
      "processorSignalReturnReport"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "processor_token",
      "client_transaction_id",
      "return_code",
      "returned_at"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/processor/signal/return/report",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Report a return for an ACH transaction"
  },
  "processorSignalPrepare": {
    "accessPath": [
      "processorSignalPrepare"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "processor_token"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/processor/signal/prepare",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Opt-in a processor token to Signal"
  },
  "processorBankTransferCreate": {
    "accessPath": [
      "processorBankTransferCreate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "idempotency_key",
      "processor_token",
      "type",
      "network",
      "amount",
      "iso_currency_code",
      "description",
      "ach_class",
      "user",
      "custom_tag",
      "metadata",
      "origination_account_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/processor/bank_transfer/create",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a bank transfer as a processor"
  },
  "processorLiabilitiesGet": {
    "accessPath": [
      "processorLiabilitiesGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "processor_token"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/processor/liabilities/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve Liabilities data"
  },
  "processorIdentityGet": {
    "accessPath": [
      "processorIdentityGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "processor_token"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/processor/identity/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve Identity data"
  },
  "processorIdentityMatch": {
    "accessPath": [
      "processorIdentityMatch"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "processor_token",
      "user"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/processor/identity/match",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve identity match score"
  },
  "processorBalanceGet": {
    "accessPath": [
      "processorBalanceGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "processor_token",
      "options"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/processor/balance/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve Balance data"
  },
  "itemWebhookUpdate": {
    "accessPath": [
      "itemWebhookUpdate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "access_token",
      "webhook"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/item/webhook/update",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update Webhook URL"
  },
  "itemAccessTokenInvalidate": {
    "accessPath": [
      "itemAccessTokenInvalidate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "access_token"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/item/access_token/invalidate",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Invalidate access_token"
  },
  "webhookVerificationKeyGet": {
    "accessPath": [
      "webhookVerificationKeyGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "key_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/webhook_verification_key/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get webhook verification key"
  },
  "liabilitiesGet": {
    "accessPath": [
      "liabilitiesGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "access_token",
      "options"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/liabilities/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve Liabilities data"
  },
  "paymentInitiationRecipientCreate": {
    "accessPath": [
      "paymentInitiationRecipientCreate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "name",
      "iban",
      "bacs",
      "address"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/payment_initiation/recipient/create",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create payment recipient"
  },
  "paymentInitiationPaymentReverse": {
    "accessPath": [
      "paymentInitiationPaymentReverse"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "payment_id",
      "idempotency_key",
      "reference",
      "amount",
      "counterparty_date_of_birth",
      "counterparty_address"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/payment_initiation/payment/reverse",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Reverse an existing payment"
  },
  "paymentInitiationRecipientGet": {
    "accessPath": [
      "paymentInitiationRecipientGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "recipient_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/payment_initiation/recipient/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get payment recipient"
  },
  "paymentInitiationRecipientList": {
    "accessPath": [
      "paymentInitiationRecipientList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "count",
      "cursor"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/payment_initiation/recipient/list",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List payment recipients"
  },
  "paymentInitiationPaymentCreate": {
    "accessPath": [
      "paymentInitiationPaymentCreate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "recipient_id",
      "reference",
      "amount",
      "schedule",
      "options"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/payment_initiation/payment/create",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a payment"
  },
  "createPaymentToken": {
    "accessPath": [
      "createPaymentToken"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "payment_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/payment_initiation/payment/token/create",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create payment token"
  },
  "paymentInitiationConsentCreate": {
    "accessPath": [
      "paymentInitiationConsentCreate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "recipient_id",
      "reference",
      "scopes",
      "type",
      "constraints",
      "options",
      "payer_details"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/payment_initiation/consent/create",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create payment consent"
  },
  "paymentInitiationConsentGet": {
    "accessPath": [
      "paymentInitiationConsentGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "consent_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/payment_initiation/consent/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get payment consent"
  },
  "paymentInitiationConsentRevoke": {
    "accessPath": [
      "paymentInitiationConsentRevoke"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "consent_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/payment_initiation/consent/revoke",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Revoke payment consent"
  },
  "paymentInitiationConsentPaymentExecute": {
    "accessPath": [
      "paymentInitiationConsentPaymentExecute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "consent_id",
      "amount",
      "idempotency_key",
      "reference",
      "scope",
      "processing_mode"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/payment_initiation/consent/payment/execute",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Execute a single payment using consent"
  },
  "sandboxItemResetLogin": {
    "accessPath": [
      "sandboxItemResetLogin"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "access_token"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/sandbox/item/reset_login",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Force a Sandbox Item into an error state"
  },
  "sandboxItemApplicationSeed": {
    "accessPath": [
      "sandboxItemApplicationSeed"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "access_token",
      "application_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/sandbox/item/application/seed",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Seed a connected application for a Permissions Manager sandbox item"
  },
  "sandboxItemSetVerificationStatus": {
    "accessPath": [
      "sandboxItemSetVerificationStatus"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "access_token",
      "account_id",
      "verification_status"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/sandbox/item/set_verification_status",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Set verification status for Sandbox account"
  },
  "sandboxUserResetLogin": {
    "accessPath": [
      "sandboxUserResetLogin"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "user_token",
      "item_ids",
      "user_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/sandbox/user/reset_login",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Force item(s) for a Sandbox User into an error state"
  },
  "itemPublicTokenExchange": {
    "accessPath": [
      "itemPublicTokenExchange"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "public_token"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/item/public_token/exchange",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Exchange public token for an access token"
  },
  "itemCreatePublicToken": {
    "accessPath": [
      "itemCreatePublicToken"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "access_token"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/item/public_token/create",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create public token"
  },
  "userCreate": {
    "accessPath": [
      "userCreate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "client_user_id",
      "identity",
      "end_customer",
      "consumer_report_user_identity",
      "with_upgraded_user"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Plaid-New-User-API-Enabled"
    ],
    "method": "POST",
    "routeTemplate": "/user/create",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create user",
    "parameterDescriptions": {
      "Plaid-New-User-API-Enabled": "The HTTP header used in API requests to determine which set of User APIs to invoke: the legacy CRA version or the new User API version."
    }
  },
  "userGet": {
    "accessPath": [
      "userGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "user_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Plaid-New-User-API-Enabled"
    ],
    "method": "POST",
    "routeTemplate": "/user/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve user identity and information",
    "parameterDescriptions": {
      "Plaid-New-User-API-Enabled": "The HTTP header used in API requests to determine which set of User APIs to invoke: the legacy CRA version or the new User API version."
    }
  },
  "userIdentityRemove": {
    "accessPath": [
      "userIdentityRemove"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "user_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Plaid-New-User-API-Enabled"
    ],
    "method": "POST",
    "routeTemplate": "/user/identity/remove",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Remove user identity data",
    "parameterDescriptions": {
      "Plaid-New-User-API-Enabled": "The HTTP header used in API requests to determine which set of User APIs to invoke: the legacy CRA version or the new User API version."
    }
  },
  "userUpdate": {
    "accessPath": [
      "userUpdate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "user_id",
      "identity",
      "user_token",
      "consumer_report_user_identity"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Plaid-New-User-API-Enabled"
    ],
    "method": "POST",
    "routeTemplate": "/user/update",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update user information",
    "parameterDescriptions": {
      "Plaid-New-User-API-Enabled": "The HTTP header used in API requests to determine which set of User APIs to invoke: the legacy CRA version or the new User API version."
    }
  },
  "userRemove": {
    "accessPath": [
      "userRemove"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "user_id",
      "user_token"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Plaid-New-User-API-Enabled"
    ],
    "method": "POST",
    "routeTemplate": "/user/remove",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Remove user",
    "parameterDescriptions": {
      "Plaid-New-User-API-Enabled": "The HTTP header used in API requests to determine which set of User APIs to invoke: the legacy CRA version or the new User API version."
    }
  },
  "userProductsTerminate": {
    "accessPath": [
      "userProductsTerminate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "user_id",
      "products"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/user/products/terminate",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Terminate user-based products"
  },
  "userItemsGet": {
    "accessPath": [
      "userItemsGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "user_token",
      "user_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/user/items/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get Items associated with a User"
  },
  "userItemsAssociate": {
    "accessPath": [
      "userItemsAssociate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "user_id",
      "item_ids"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/user/items/associate",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Associate Items to a User"
  },
  "userItemsRemove": {
    "accessPath": [
      "userItemsRemove"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "user_token",
      "user_id",
      "item_ids"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/user/items/remove",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Remove Items from a User"
  },
  "userThirdPartyTokenCreate": {
    "accessPath": [
      "userThirdPartyTokenCreate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "user_token",
      "third_party_client_id",
      "expiration_time",
      "user_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/user/third_party_token/create",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a third-party user token"
  },
  "userThirdPartyTokenRemove": {
    "accessPath": [
      "userThirdPartyTokenRemove"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "third_party_user_token"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/user/third_party_token/remove",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Remove a third-party user token"
  },
  "creditSessionsGet": {
    "accessPath": [
      "creditSessionsGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "user_token"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/credit/sessions/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve Link sessions for your user"
  },
  "paymentInitiationPaymentGet": {
    "accessPath": [
      "paymentInitiationPaymentGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "payment_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/payment_initiation/payment/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get payment details"
  },
  "paymentInitiationPaymentList": {
    "accessPath": [
      "paymentInitiationPaymentList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "count",
      "cursor",
      "consent_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/payment_initiation/payment/list",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List payments"
  },
  "investmentsHoldingsGet": {
    "accessPath": [
      "investmentsHoldingsGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "access_token",
      "options"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/investments/holdings/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get Investment holdings"
  },
  "investmentsTransactionsGet": {
    "accessPath": [
      "investmentsTransactionsGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "access_token",
      "start_date",
      "end_date",
      "options"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/investments/transactions/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get investment transactions"
  },
  "investmentsRefresh": {
    "accessPath": [
      "investmentsRefresh"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "access_token",
      "secret"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/investments/refresh",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Refresh investment data"
  },
  "investmentsAuthGet": {
    "accessPath": [
      "investmentsAuthGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "access_token",
      "options"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/investments/auth/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get data needed to authorize an investments transfer"
  },
  "processorTokenCreate": {
    "accessPath": [
      "processorTokenCreate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "access_token",
      "account_id",
      "processor"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/processor/token/create",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create processor token"
  },
  "processorTokenPermissionsSet": {
    "accessPath": [
      "processorTokenPermissionsSet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "processor_token",
      "products"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/processor/token/permissions/set",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Control a processor's access to products"
  },
  "processorTokenPermissionsGet": {
    "accessPath": [
      "processorTokenPermissionsGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "processor_token"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/processor/token/permissions/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get a processor token's product permissions"
  },
  "processorTokenWebhookUpdate": {
    "accessPath": [
      "processorTokenWebhookUpdate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "processor_token",
      "webhook"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/processor/token/webhook/update",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a processor token's webhook URL"
  },
  "processorStripeBankAccountTokenCreate": {
    "accessPath": [
      "processorStripeBankAccountTokenCreate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "access_token",
      "account_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/processor/stripe/bank_account_token/create",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create Stripe bank account token"
  },
  "processorApexProcessorTokenCreate": {
    "accessPath": [
      "processorApexProcessorTokenCreate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "access_token",
      "account_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/processor/apex/processor_token/create",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create Apex bank account token"
  },
  "itemImport": {
    "accessPath": [
      "itemImport"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "institution_id",
      "products",
      "user_auth",
      "options"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/item/import",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Import Item"
  },
  "linkTokenCreate": {
    "accessPath": [
      "linkTokenCreate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "client_name",
      "language",
      "country_codes",
      "user",
      "user_id",
      "products",
      "required_if_supported_products",
      "optional_products",
      "additional_consented_products",
      "webhook",
      "access_token",
      "access_tokens",
      "link_customization_name",
      "appearance_mode",
      "redirect_uri",
      "android_package_name",
      "institution_data",
      "card_switch",
      "account_filters",
      "eu_config",
      "institution_id",
      "payment_configuration",
      "payment_initiation",
      "employment",
      "income_verification",
      "base_report",
      "credit_partner_insights",
      "cra_options",
      "consumer_report_permissible_purpose",
      "auth",
      "transfer",
      "update",
      "identity_verification",
      "statements",
      "third_party_user_token",
      "investments",
      "investments_auth",
      "hosted_link",
      "transactions",
      "cashflow_report",
      "cra_enabled",
      "identity",
      "financekit_supported",
      "enable_multi_item_link",
      "user_token"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/link/token/create",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create Link Token"
  },
  "linkTokenGet": {
    "accessPath": [
      "linkTokenGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "link_token"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/link/token/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get Link Token"
  },
  "linkOauthCorrelationIdExchange": {
    "accessPath": [
      "linkOauthCorrelationIdExchange"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "link_correlation_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/link/oauth/correlation_id/exchange",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Exchange the Link Correlation Id for a Link Token"
  },
  "sessionTokenCreate": {
    "accessPath": [
      "sessionTokenCreate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "template_id",
      "user",
      "redirect_uri",
      "android_package_name",
      "webhook",
      "user_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/session/token/create",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a Link token for Layer"
  },
  "transferGet": {
    "accessPath": [
      "transferGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "transfer_id",
      "authorization_id",
      "originator_client_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/transfer/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve a transfer"
  },
  "transferRecurringGet": {
    "accessPath": [
      "transferRecurringGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "recurring_transfer_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/transfer/recurring/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve a recurring transfer"
  },
  "bankTransferGet": {
    "accessPath": [
      "bankTransferGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "bank_transfer_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/bank_transfer/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve a bank transfer"
  },
  "transferAuthorizationCreate": {
    "accessPath": [
      "transferAuthorizationCreate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "access_token",
      "account_id",
      "funding_account_id",
      "ledger_id",
      "payment_profile_token",
      "type",
      "network",
      "amount",
      "ach_class",
      "wire_details",
      "user",
      "device",
      "origination_account_id",
      "iso_currency_code",
      "idempotency_key",
      "user_present",
      "with_guarantee",
      "request_guarantee",
      "beacon_session_id",
      "originator_client_id",
      "credit_funds_source",
      "test_clock_id",
      "ruleset_key"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/transfer/authorization/create",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a transfer authorization"
  },
  "transferAuthorizationCancel": {
    "accessPath": [
      "transferAuthorizationCancel"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "authorization_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/transfer/authorization/cancel",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Cancel a transfer authorization"
  },
  "transferBalanceGet": {
    "accessPath": [
      "transferBalanceGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "originator_client_id",
      "secret",
      "type"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/transfer/balance/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "(Deprecated) Retrieve a balance held with Plaid"
  },
  "transferCapabilitiesGet": {
    "accessPath": [
      "transferCapabilitiesGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "access_token",
      "account_id",
      "payment_profile_token"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/transfer/capabilities/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get RTP eligibility information of a transfer"
  },
  "transferConfigurationGet": {
    "accessPath": [
      "transferConfigurationGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "originator_client_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/transfer/configuration/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get transfer product configuration"
  },
  "transferLedgerGet": {
    "accessPath": [
      "transferLedgerGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "ledger_id",
      "originator_client_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/transfer/ledger/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve Plaid Ledger balance"
  },
  "transferLedgerDistribute": {
    "accessPath": [
      "transferLedgerDistribute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "from_ledger_id",
      "to_ledger_id",
      "amount",
      "idempotency_key",
      "description"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/transfer/ledger/distribute",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Move available balance between ledgers"
  },
  "transferLedgerDeposit": {
    "accessPath": [
      "transferLedgerDeposit"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "originator_client_id",
      "funding_account_id",
      "ledger_id",
      "amount",
      "description",
      "idempotency_key",
      "network"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/transfer/ledger/deposit",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Deposit funds into a Plaid Ledger balance"
  },
  "transferLedgerWithdraw": {
    "accessPath": [
      "transferLedgerWithdraw"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "originator_client_id",
      "funding_account_id",
      "ledger_id",
      "amount",
      "description",
      "idempotency_key",
      "network"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/transfer/ledger/withdraw",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Withdraw funds from a Plaid Ledger balance"
  },
  "transferOriginatorFundingAccountUpdate": {
    "accessPath": [
      "transferOriginatorFundingAccountUpdate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "originator_client_id",
      "funding_account"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/transfer/originator/funding_account/update",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update the funding account associated with the originator"
  },
  "transferOriginatorFundingAccountCreate": {
    "accessPath": [
      "transferOriginatorFundingAccountCreate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "originator_client_id",
      "funding_account"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/transfer/originator/funding_account/create",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a new funding account for an originator"
  },
  "transferMetricsGet": {
    "accessPath": [
      "transferMetricsGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "originator_client_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/transfer/metrics/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get transfer product usage metrics"
  },
  "transferCreate": {
    "accessPath": [
      "transferCreate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "idempotency_key",
      "access_token",
      "account_id",
      "authorization_id",
      "type",
      "network",
      "amount",
      "description",
      "ach_class",
      "user",
      "metadata",
      "origination_account_id",
      "iso_currency_code",
      "test_clock_id",
      "facilitator_fee"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/transfer/create",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a transfer"
  },
  "transferRecurringCreate": {
    "accessPath": [
      "transferRecurringCreate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "access_token",
      "idempotency_key",
      "account_id",
      "funding_account_id",
      "type",
      "network",
      "ach_class",
      "amount",
      "user_present",
      "iso_currency_code",
      "description",
      "test_clock_id",
      "schedule",
      "user",
      "device"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/transfer/recurring/create",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a recurring transfer"
  },
  "bankTransferCreate": {
    "accessPath": [
      "bankTransferCreate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "idempotency_key",
      "access_token",
      "account_id",
      "type",
      "network",
      "amount",
      "iso_currency_code",
      "description",
      "ach_class",
      "user",
      "custom_tag",
      "metadata",
      "origination_account_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/bank_transfer/create",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a bank transfer"
  },
  "transferList": {
    "accessPath": [
      "transferList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "start_date",
      "end_date",
      "count",
      "offset",
      "origination_account_id",
      "originator_client_id",
      "funding_account_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/transfer/list",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List transfers"
  },
  "transferRecurringList": {
    "accessPath": [
      "transferRecurringList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "start_time",
      "end_time",
      "count",
      "offset",
      "funding_account_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/transfer/recurring/list",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List recurring transfers"
  },
  "bankTransferList": {
    "accessPath": [
      "bankTransferList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "start_date",
      "end_date",
      "count",
      "offset",
      "origination_account_id",
      "direction"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/bank_transfer/list",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List bank transfers"
  },
  "transferCancel": {
    "accessPath": [
      "transferCancel"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "transfer_id",
      "originator_client_id",
      "reason_code"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/transfer/cancel",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Cancel a transfer"
  },
  "transferRecurringCancel": {
    "accessPath": [
      "transferRecurringCancel"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "recurring_transfer_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/transfer/recurring/cancel",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Cancel a recurring transfer."
  },
  "bankTransferCancel": {
    "accessPath": [
      "bankTransferCancel"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "bank_transfer_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/bank_transfer/cancel",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Cancel a bank transfer"
  },
  "transferEventList": {
    "accessPath": [
      "transferEventList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "start_date",
      "end_date",
      "transfer_id",
      "account_id",
      "transfer_type",
      "event_types",
      "sweep_id",
      "count",
      "offset",
      "origination_account_id",
      "originator_client_id",
      "funding_account_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/transfer/event/list",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List transfer events"
  },
  "transferLedgerEventList": {
    "accessPath": [
      "transferLedgerEventList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "originator_client_id",
      "secret",
      "start_date",
      "end_date",
      "ledger_id",
      "ledger_event_id",
      "source_type",
      "source_id",
      "count",
      "offset"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/transfer/ledger/event/list",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List transfer ledger events"
  },
  "bankTransferEventList": {
    "accessPath": [
      "bankTransferEventList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "start_date",
      "end_date",
      "bank_transfer_id",
      "account_id",
      "bank_transfer_type",
      "event_types",
      "count",
      "offset",
      "origination_account_id",
      "direction"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/bank_transfer/event/list",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List bank transfer events"
  },
  "transferEventSync": {
    "accessPath": [
      "transferEventSync"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "after_id",
      "count"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/transfer/event/sync",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Sync transfer events"
  },
  "bankTransferEventSync": {
    "accessPath": [
      "bankTransferEventSync"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "after_id",
      "count"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/bank_transfer/event/sync",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Sync bank transfer events"
  },
  "transferSweepGet": {
    "accessPath": [
      "transferSweepGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "sweep_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/transfer/sweep/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve a sweep"
  },
  "bankTransferSweepGet": {
    "accessPath": [
      "bankTransferSweepGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "sweep_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/bank_transfer/sweep/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve a sweep"
  },
  "transferSweepList": {
    "accessPath": [
      "transferSweepList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "start_date",
      "end_date",
      "count",
      "offset",
      "amount",
      "status",
      "originator_client_id",
      "funding_account_id",
      "transfer_id",
      "trigger"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/transfer/sweep/list",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List sweeps"
  },
  "bankTransferSweepList": {
    "accessPath": [
      "bankTransferSweepList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "origination_account_id",
      "start_time",
      "end_time",
      "count"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/bank_transfer/sweep/list",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List sweeps"
  },
  "bankTransferBalanceGet": {
    "accessPath": [
      "bankTransferBalanceGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "origination_account_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/bank_transfer/balance/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get balance of your Bank Transfer account"
  },
  "bankTransferMigrateAccount": {
    "accessPath": [
      "bankTransferMigrateAccount"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "account_number",
      "routing_number",
      "wire_routing_number",
      "account_type"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/bank_transfer/migrate_account",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Migrate account into Bank Transfers"
  },
  "transferMigrateAccount": {
    "accessPath": [
      "transferMigrateAccount"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "account_number",
      "routing_number",
      "wire_routing_number",
      "account_type"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/transfer/migrate_account",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Migrate account into Transfers"
  },
  "transferIntentCreate": {
    "accessPath": [
      "transferIntentCreate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "account_id",
      "funding_account_id",
      "mode",
      "network",
      "amount",
      "description",
      "ach_class",
      "origination_account_id",
      "user",
      "metadata",
      "iso_currency_code",
      "require_guarantee"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/transfer/intent/create",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a transfer intent object to invoke the Transfer UI"
  },
  "transferIntentGet": {
    "accessPath": [
      "transferIntentGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "transfer_intent_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/transfer/intent/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve more information about a transfer intent"
  },
  "transferRepaymentList": {
    "accessPath": [
      "transferRepaymentList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "start_date",
      "end_date",
      "count",
      "offset"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/transfer/repayment/list",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Lists historical repayments"
  },
  "transferRepaymentReturnList": {
    "accessPath": [
      "transferRepaymentReturnList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "repayment_id",
      "count",
      "offset"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/transfer/repayment/return/list",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List the returns included in a repayment"
  },
  "transferPlatformRequirementSubmit": {
    "accessPath": [
      "transferPlatformRequirementSubmit"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "originator_client_id",
      "requirement_submissions"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/transfer/platform/requirement/submit",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Submit additional onboarding information on behalf of an originator"
  },
  "transferOriginatorCreate": {
    "accessPath": [
      "transferOriginatorCreate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "company_name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/transfer/originator/create",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a new originator"
  },
  "transferQuestionnaireCreate": {
    "accessPath": [
      "transferQuestionnaireCreate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "originator_client_id",
      "redirect_uri"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/transfer/questionnaire/create",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Generate a Plaid-hosted onboarding UI URL."
  },
  "transferDiligenceSubmit": {
    "accessPath": [
      "transferDiligenceSubmit"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "originator_client_id",
      "originator_diligence"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/transfer/diligence/submit",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Submit transfer diligence on behalf of the originator"
  },
  "transferDiligenceDocumentUpload": {
    "accessPath": [
      "transferDiligenceDocumentUpload"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "originator_client_id",
      "file",
      "purpose"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/transfer/diligence/document/upload",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Upload transfer diligence document on behalf of the originator"
  },
  "transferOriginatorGet": {
    "accessPath": [
      "transferOriginatorGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "originator_client_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/transfer/originator/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get status of an originator's onboarding"
  },
  "transferOriginatorList": {
    "accessPath": [
      "transferOriginatorList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "count",
      "offset"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/transfer/originator/list",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get status of all originators' onboarding"
  },
  "transferRefundCreate": {
    "accessPath": [
      "transferRefundCreate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "transfer_id",
      "amount",
      "idempotency_key"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/transfer/refund/create",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a refund"
  },
  "transferRefundGet": {
    "accessPath": [
      "transferRefundGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "refund_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/transfer/refund/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve a refund"
  },
  "transferRefundCancel": {
    "accessPath": [
      "transferRefundCancel"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "refund_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/transfer/refund/cancel",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Cancel a refund"
  },
  "transferPlatformOriginatorCreate": {
    "accessPath": [
      "transferPlatformOriginatorCreate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "originator_client_id",
      "tos_acceptance_metadata",
      "originator_reviewed_at",
      "webhook"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/transfer/platform/originator/create",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create an originator for Transfer for Platforms customers"
  },
  "transferPlatformPersonCreate": {
    "accessPath": [
      "transferPlatformPersonCreate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "originator_client_id",
      "name",
      "email_address",
      "phone_number",
      "address",
      "id_number",
      "date_of_birth",
      "relationship_to_originator",
      "ownership_percentage",
      "title"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/transfer/platform/person/create",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a person associated with an originator"
  },
  "sandboxBankTransferSimulate": {
    "accessPath": [
      "sandboxBankTransferSimulate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "bank_transfer_id",
      "event_type",
      "failure_reason"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/sandbox/bank_transfer/simulate",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Simulate a bank transfer event in Sandbox"
  },
  "sandboxTransferSweepSimulate": {
    "accessPath": [
      "sandboxTransferSweepSimulate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "test_clock_id",
      "webhook"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/sandbox/transfer/sweep/simulate",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Simulate creating a sweep"
  },
  "sandboxTransferSimulate": {
    "accessPath": [
      "sandboxTransferSimulate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "transfer_id",
      "test_clock_id",
      "event_type",
      "failure_reason",
      "webhook"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/sandbox/transfer/simulate",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Simulate a transfer event in Sandbox"
  },
  "sandboxTransferRefundSimulate": {
    "accessPath": [
      "sandboxTransferRefundSimulate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "refund_id",
      "test_clock_id",
      "event_type",
      "failure_reason",
      "webhook"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/sandbox/transfer/refund/simulate",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Simulate a refund event in Sandbox"
  },
  "sandboxTransferLedgerSimulateAvailable": {
    "accessPath": [
      "sandboxTransferLedgerSimulateAvailable"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "ledger_id",
      "originator_client_id",
      "test_clock_id",
      "webhook"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/sandbox/transfer/ledger/simulate_available",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Simulate converting pending balance to available balance"
  },
  "sandboxTransferLedgerDepositSimulate": {
    "accessPath": [
      "sandboxTransferLedgerDepositSimulate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "sweep_id",
      "event_type",
      "failure_reason"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/sandbox/transfer/ledger/deposit/simulate",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Simulate a ledger deposit event in Sandbox"
  },
  "sandboxTransferLedgerWithdrawSimulate": {
    "accessPath": [
      "sandboxTransferLedgerWithdrawSimulate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "sweep_id",
      "event_type",
      "failure_reason"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/sandbox/transfer/ledger/withdraw/simulate",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Simulate a ledger withdraw event in Sandbox"
  },
  "sandboxTransferRepaymentSimulate": {
    "accessPath": [
      "sandboxTransferRepaymentSimulate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/sandbox/transfer/repayment/simulate",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Trigger the creation of a repayment"
  },
  "sandboxTransferFireWebhook": {
    "accessPath": [
      "sandboxTransferFireWebhook"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "webhook"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/sandbox/transfer/fire_webhook",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Manually fire a Transfer webhook"
  },
  "sandboxTransferTestClockCreate": {
    "accessPath": [
      "sandboxTransferTestClockCreate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "virtual_time"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/sandbox/transfer/test_clock/create",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a test clock"
  },
  "sandboxTransferTestClockAdvance": {
    "accessPath": [
      "sandboxTransferTestClockAdvance"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "test_clock_id",
      "new_virtual_time"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/sandbox/transfer/test_clock/advance",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Advance a test clock"
  },
  "sandboxTransferTestClockGet": {
    "accessPath": [
      "sandboxTransferTestClockGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "test_clock_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/sandbox/transfer/test_clock/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get a test clock"
  },
  "sandboxTransferTestClockList": {
    "accessPath": [
      "sandboxTransferTestClockList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "start_virtual_time",
      "end_virtual_time",
      "count",
      "offset"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/sandbox/transfer/test_clock/list",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List test clocks"
  },
  "sandboxPaymentProfileResetLogin": {
    "accessPath": [
      "sandboxPaymentProfileResetLogin"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "payment_profile_token"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/sandbox/payment_profile/reset_login",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Reset the login of a Payment Profile"
  },
  "sandboxPaymentSimulate": {
    "accessPath": [
      "sandboxPaymentSimulate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "payment_id",
      "webhook",
      "status"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/sandbox/payment/simulate",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Simulate a payment event in Sandbox"
  },
  "employersSearch": {
    "accessPath": [
      "employersSearch"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "query",
      "products"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/employers/search",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Search employer database"
  },
  "incomeVerificationCreate": {
    "accessPath": [
      "incomeVerificationCreate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "webhook",
      "precheck_id",
      "options"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/income/verification/create",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "(Deprecated) Create an income verification instance"
  },
  "incomeVerificationPaystubsGet": {
    "accessPath": [
      "incomeVerificationPaystubsGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "income_verification_id",
      "access_token"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/income/verification/paystubs/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "(Deprecated) Retrieve information from the paystubs used for income verification"
  },
  "incomeVerificationDocumentsDownload": {
    "accessPath": [
      "incomeVerificationDocumentsDownload"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "income_verification_id",
      "access_token",
      "document_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/income/verification/documents/download",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "(Deprecated) Download the original documents used for income verification"
  },
  "incomeVerificationTaxformsGet": {
    "accessPath": [
      "incomeVerificationTaxformsGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "income_verification_id",
      "access_token"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/income/verification/taxforms/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "(Deprecated) Retrieve information from the tax documents used for income verification"
  },
  "incomeVerificationPrecheck": {
    "accessPath": [
      "incomeVerificationPrecheck"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "user",
      "employer",
      "payroll_institution",
      "transactions_access_token",
      "transactions_access_tokens",
      "us_military_info"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/income/verification/precheck",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "(Deprecated) Check digital income verification eligibility and optimize conversion"
  },
  "employmentVerificationGet": {
    "accessPath": [
      "employmentVerificationGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "access_token"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/employment/verification/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "(Deprecated) Retrieve a summary of an individual's employment information"
  },
  "creditAuditCopyTokenCreate": {
    "accessPath": [
      "creditAuditCopyTokenCreate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "report_tokens"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/credit/audit_copy_token/create",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create Asset or Income Report Audit Copy Token"
  },
  "creditReportAuditCopyRemove": {
    "accessPath": [
      "creditReportAuditCopyRemove"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "audit_copy_token"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/credit/audit_copy_token/remove",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Remove an Audit Copy token"
  },
  "creditAssetReportFreddieMacGet": {
    "accessPath": [
      "creditAssetReportFreddieMacGet"
    ],
    "bodyAllowsAdditionalProperties": true,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "audit_copy_token",
      "client_id",
      "secret"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/credit/asset_report/freddie_mac/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve an Asset Report with Freddie Mac format. Only Freddie Mac can use this endpoint."
  },
  "creditFreddieMacReportsGet": {
    "accessPath": [
      "creditFreddieMacReportsGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "audit_copy_token",
      "client_id",
      "secret"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/credit/freddie_mac/reports/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve an Asset Report with Freddie Mac format (aka VOA - Verification Of Assets), and a Verification Of Employment (VOE) report if this one is available. Only Freddie Mac can use this endpoint."
  },
  "creditBankEmploymentGet": {
    "accessPath": [
      "creditBankEmploymentGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "user_token"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/beta/credit/v1/bank_employment/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve information from the bank accounts used for employment verification"
  },
  "creditBankIncomeGet": {
    "accessPath": [
      "creditBankIncomeGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "user_token",
      "user_id",
      "options"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/credit/bank_income/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve information from the bank accounts used for income verification"
  },
  "creditBankIncomePdfGet": {
    "accessPath": [
      "creditBankIncomePdfGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "user_token",
      "user_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/credit/bank_income/pdf/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve information from the bank accounts used for income verification in PDF format"
  },
  "creditBankIncomeRefresh": {
    "accessPath": [
      "creditBankIncomeRefresh"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "user_token",
      "user_id",
      "options"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/credit/bank_income/refresh",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Refresh a user's bank income information"
  },
  "creditBankIncomeWebhookUpdate": {
    "accessPath": [
      "creditBankIncomeWebhookUpdate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "user_token",
      "user_id",
      "enable_webhooks"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/credit/bank_income/webhook/update",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Subscribe and unsubscribe to proactive notifications for a user's income profile"
  },
  "creditPayrollIncomeParsingConfigUpdate": {
    "accessPath": [
      "creditPayrollIncomeParsingConfigUpdate"
    ],
    "bodyAllowsAdditionalProperties": true,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "user_token",
      "user_id",
      "item_id",
      "parsing_config"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/credit/payroll_income/parsing_config/update",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update the parsing configuration for a document income verification"
  },
  "creditBankStatementsUploadsGet": {
    "accessPath": [
      "creditBankStatementsUploadsGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "user_token",
      "options"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/credit/bank_statements/uploads/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve data for a user's uploaded bank statements"
  },
  "creditPayrollIncomeGet": {
    "accessPath": [
      "creditPayrollIncomeGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "user_token",
      "user_id",
      "options"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/credit/payroll_income/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve a user's payroll information"
  },
  "creditPayrollIncomeRiskSignalsGet": {
    "accessPath": [
      "creditPayrollIncomeRiskSignalsGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "user_token",
      "user_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/credit/payroll_income/risk_signals/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve fraud insights for a user's manually uploaded document(s)."
  },
  "creditPayrollIncomePrecheck": {
    "accessPath": [
      "creditPayrollIncomePrecheck"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "user_token",
      "user_id",
      "access_tokens",
      "employer",
      "us_military_info",
      "payroll_institution"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/credit/payroll_income/precheck",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Check income verification eligibility and optimize conversion"
  },
  "creditEmploymentGet": {
    "accessPath": [
      "creditEmploymentGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "user_token"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/credit/employment/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve a summary of an individual's employment information"
  },
  "creditPayrollIncomeRefresh": {
    "accessPath": [
      "creditPayrollIncomeRefresh"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "user_token",
      "user_id",
      "options"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/credit/payroll_income/refresh",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Refresh a digital payroll income verification"
  },
  "creditRelayCreate": {
    "accessPath": [
      "creditRelayCreate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "report_tokens",
      "secondary_client_id",
      "webhook"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/credit/relay/create",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a relay token to share an Asset Report with a partner client"
  },
  "creditRelayGet": {
    "accessPath": [
      "creditRelayGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "relay_token",
      "report_type",
      "include_insights"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/credit/relay/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve the reports associated with a relay token that was shared with you"
  },
  "creditRelayPdfGet": {
    "accessPath": [
      "creditRelayPdfGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "relay_token",
      "report_type"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/credit/relay/pdf/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve the pdf reports associated with a relay token that was shared with you (beta)"
  },
  "creditRelayRefresh": {
    "accessPath": [
      "creditRelayRefresh"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "relay_token",
      "report_type",
      "webhook"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/credit/relay/refresh",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Refresh a report of a relay token"
  },
  "creditRelayRemove": {
    "accessPath": [
      "creditRelayRemove"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "relay_token"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/credit/relay/remove",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Remove relay token"
  },
  "sandboxBankTransferFireWebhook": {
    "accessPath": [
      "sandboxBankTransferFireWebhook"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "webhook"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/sandbox/bank_transfer/fire_webhook",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Manually fire a Bank Transfer webhook"
  },
  "sandboxIncomeFireWebhook": {
    "accessPath": [
      "sandboxIncomeFireWebhook"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "item_id",
      "user_id",
      "webhook",
      "verification_status",
      "webhook_code"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/sandbox/income/fire_webhook",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Manually fire an Income webhook"
  },
  "sandboxBankIncomeFireWebhook": {
    "accessPath": [
      "sandboxBankIncomeFireWebhook"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "webhook_override",
      "webhook_code",
      "webhook_fields"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/sandbox/bank_income/fire_webhook",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Manually fire a bank income webhook in sandbox"
  },
  "sandboxCraCashflowUpdatesUpdate": {
    "accessPath": [
      "sandboxCraCashflowUpdatesUpdate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "user_token",
      "webhook_codes",
      "user_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/sandbox/cra/cashflow_updates/update",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Trigger an update for Cash Flow Updates"
  },
  "sandboxOauthSelectAccounts": {
    "accessPath": [
      "sandboxOauthSelectAccounts"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "oauth_state_id",
      "accounts"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/sandbox/oauth/select_accounts",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Save the selected accounts when connecting to the Platypus Oauth institution"
  },
  "signalEvaluate": {
    "accessPath": [
      "signalEvaluate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "access_token",
      "account_id",
      "client_transaction_id",
      "amount",
      "user_present",
      "client_user_id",
      "is_recurring",
      "default_payment_method",
      "user",
      "device",
      "risk_profile_key",
      "ruleset_key"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/signal/evaluate",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Evaluate a planned ACH transaction"
  },
  "signalSchedule": {
    "accessPath": [
      "signalSchedule"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "access_token",
      "account_id",
      "client_transaction_id",
      "amount",
      "default_payment_method"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/signal/schedule",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Schedule a planned ACH transaction"
  },
  "signalDecisionReport": {
    "accessPath": [
      "signalDecisionReport"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "client_transaction_id",
      "initiated",
      "days_funds_on_hold",
      "decision_outcome",
      "payment_method",
      "amount_instantly_available",
      "submitted_at"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/signal/decision/report",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Report whether you initiated an ACH transaction"
  },
  "signalReturnReport": {
    "accessPath": [
      "signalReturnReport"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "client_transaction_id",
      "return_code",
      "returned_at"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/signal/return/report",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Report a return for an ACH transaction"
  },
  "signalPrepare": {
    "accessPath": [
      "signalPrepare"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "access_token"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/signal/prepare",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Opt-in an Item to Signal Transaction Scores"
  },
  "walletCreate": {
    "accessPath": [
      "walletCreate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "iso_currency_code"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/wallet/create",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create an e-wallet"
  },
  "walletGet": {
    "accessPath": [
      "walletGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "wallet_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/wallet/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Fetch an e-wallet"
  },
  "walletList": {
    "accessPath": [
      "walletList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "iso_currency_code",
      "cursor",
      "count"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/wallet/list",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Fetch a list of e-wallets"
  },
  "walletTransactionExecute": {
    "accessPath": [
      "walletTransactionExecute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "idempotency_key",
      "wallet_id",
      "counterparty",
      "amount",
      "reference",
      "originating_fund_source"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/wallet/transaction/execute",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Execute a transaction using an e-wallet"
  },
  "walletTransactionGet": {
    "accessPath": [
      "walletTransactionGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "transaction_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/wallet/transaction/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Fetch an e-wallet transaction"
  },
  "walletTransactionList": {
    "accessPath": [
      "walletTransactionList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "wallet_id",
      "cursor",
      "count",
      "options"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/wallet/transaction/list",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List e-wallet transactions"
  },
  "transactionsEnhance": {
    "accessPath": [
      "transactionsEnhance"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "account_type",
      "transactions"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/beta/transactions/v1/enhance",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "enhance locally-held transaction data"
  },
  "transactionsRulesCreate": {
    "accessPath": [
      "transactionsRulesCreate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "client_user_id",
      "pfc_primary_category",
      "pfc_detailed_category",
      "rule_details"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/beta/transactions/rules/v1/create",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create transaction category rule"
  },
  "transactionsRulesList": {
    "accessPath": [
      "transactionsRulesList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "client_user_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/beta/transactions/rules/v1/list",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Return a list of rules created for the Item associated with the access token."
  },
  "transactionsRulesRemove": {
    "accessPath": [
      "transactionsRulesRemove"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "client_user_id",
      "rule_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/beta/transactions/rules/v1/remove",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Remove transaction rule"
  },
  "transactionsUserInsightsGet": {
    "accessPath": [
      "transactionsUserInsightsGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "client_user_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/beta/transactions/user_insights/v1/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Obtain user insights based on transactions sent through /transactions/enrich"
  },
  "betaEwaReportV1Get": {
    "accessPath": [
      "betaEwaReportV1Get"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "access_token",
      "client_id",
      "secret"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/beta/ewa_report/v1/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get EWA Score Report"
  },
  "issuesSearch": {
    "accessPath": [
      "issuesSearch"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "item_id",
      "link_session_id",
      "link_session_request_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/issues/search",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Search for an Issue"
  },
  "issuesGet": {
    "accessPath": [
      "issuesGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "issue_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/issues/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get an Issue"
  },
  "issuesSubscribe": {
    "accessPath": [
      "issuesSubscribe"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "issue_id",
      "webhook"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/issues/subscribe",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Subscribe to an Issue"
  },
  "paymentProfileCreate": {
    "accessPath": [
      "paymentProfileCreate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/payment_profile/create",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create payment profile"
  },
  "paymentProfileGet": {
    "accessPath": [
      "paymentProfileGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "payment_profile_token"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/payment_profile/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get payment profile"
  },
  "paymentProfileRemove": {
    "accessPath": [
      "paymentProfileRemove"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "payment_profile_token"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/payment_profile/remove",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Remove payment profile"
  },
  "partnerCustomerCreate": {
    "accessPath": [
      "partnerCustomerCreate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "company_name",
      "is_diligence_attested",
      "products",
      "create_link_customization",
      "logo",
      "legal_entity_name",
      "website",
      "application_name",
      "technical_contact",
      "billing_contact",
      "customer_support_info",
      "address",
      "is_bank_addendum_completed",
      "assets_under_management",
      "redirect_uris",
      "registration_number"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/partner/customer/create",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Creates a new end customer for a Plaid reseller."
  },
  "partnerCustomerGet": {
    "accessPath": [
      "partnerCustomerGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "end_customer_client_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/partner/customer/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Returns a Plaid reseller's end customer."
  },
  "partnerCustomerEnable": {
    "accessPath": [
      "partnerCustomerEnable"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "end_customer_client_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/partner/customer/enable",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Enables a Plaid reseller's end customer in the Production environment."
  },
  "partnerCustomerRemove": {
    "accessPath": [
      "partnerCustomerRemove"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "end_customer_client_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/partner/customer/remove",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Removes a Plaid reseller's end customer."
  },
  "partnerCustomerOauthInstitutionsGet": {
    "accessPath": [
      "partnerCustomerOauthInstitutionsGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "end_customer_client_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/partner/customer/oauth_institutions/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Returns OAuth-institution registration information for a given end customer."
  },
  "betaPartnerCustomerV1Create": {
    "accessPath": [
      "betaPartnerCustomerV1Create"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "company_name",
      "is_diligence_attested",
      "products",
      "create_link_customization",
      "logo",
      "legal_entity_name",
      "website",
      "application_name",
      "technical_contact",
      "billing_contact",
      "customer_support_info",
      "address",
      "redirect_uris",
      "bank_addendum_acceptance",
      "questionnaires"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/beta/partner/customer/v1/create",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Creates a new end customer for a Plaid reseller."
  },
  "betaPartnerCustomerV1Get": {
    "accessPath": [
      "betaPartnerCustomerV1Get"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "end_customer_client_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/beta/partner/customer/v1/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieves the details of a Plaid reseller's end customer."
  },
  "betaPartnerCustomerV1Update": {
    "accessPath": [
      "betaPartnerCustomerV1Update"
    ],
    "bodyAllowsAdditionalProperties": true,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "end_customer_client_id",
      "legal_entity_name",
      "redirect_uris",
      "bank_addendum_acceptance",
      "questionnaires"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/beta/partner/customer/v1/update",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Updates an existing end customer."
  },
  "betaPartnerCustomerV1Enable": {
    "accessPath": [
      "betaPartnerCustomerV1Enable"
    ],
    "bodyAllowsAdditionalProperties": true,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "end_customer_client_id",
      "products"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/beta/partner/customer/v1/enable",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Enables a Plaid reseller's end customer in the Production environment."
  },
  "linkDeliveryCreate": {
    "accessPath": [
      "linkDeliveryCreate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "link_token",
      "options"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/link_delivery/create",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create Hosted Link session"
  },
  "linkDeliveryGet": {
    "accessPath": [
      "linkDeliveryGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "link_delivery_session_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/link_delivery/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get Hosted Link session"
  },
  "fdxNotifications": {
    "accessPath": [
      "fdxNotifications"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "notificationId",
      "type",
      "subtype",
      "sentOn",
      "category",
      "severity",
      "priority",
      "publisher",
      "subscriber",
      "notificationPayload",
      "url"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/fdx/notifications",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Webhook receiver for fdx notifications"
  },
  "getRecipients": {
    "accessPath": [
      "getRecipients"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/fdx/recipients",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get Recipients"
  },
  "getRecipient": {
    "accessPath": [
      "getRecipient"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "OAUTH-STATE-ID"
    ],
    "method": "GET",
    "routeTemplate": "/fdx/recipient/{recipientId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "recipientId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get Recipient",
    "parameterDescriptions": {
      "recipientId": "Recipient Identifier. Uniquely identifies the recipient",
      "OAUTH-STATE-ID": "The value that is passed into the OAuth URI 'state' query parameter."
    }
  },
  "networkInsightsReportGet": {
    "accessPath": [
      "networkInsightsReportGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "secret",
      "access_tokens"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/network_insights/report/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve network insights for the provided `access_tokens`"
  }
} satisfies ToolRuntimeMetadataMap;
