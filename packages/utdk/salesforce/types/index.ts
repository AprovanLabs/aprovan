import type { BatchResponse, CreateResponse, ErrorList, QueryResult, SObjectDescribe, SObjectList, SearchResult } from "./schemas.js";

export type SalesforceClient = {
  /**
   * List available sObjects
   */
  listSObjects: () => Promise<SObjectList>;

  /**
   * Describe a sObject
   */
  describeSObject: (input: {
    /** API name of the Salesforce object (e.g. Account, Contact, Opportunity) */
    sObjectName: string;
  }) => Promise<SObjectDescribe>;

  /**
   * Create a record
   */
  createRecord: (input: {
    /** Field values for the new record */
    body: { [key: string]: unknown };
    /** API name of the Salesforce object */
    sObjectName: string;
  }) => Promise<CreateResponse>;

  /**
   * Get a record
   */
  getRecord: (input: {
    /** API name of the Salesforce object */
    sObjectName: string;
    /** Salesforce record ID (15 or 18 character ID) */
    id: string;
    /** Comma-separated list of fields to return */
    fields?: string;
  }) => Promise<{ [key: string]: unknown }>;

  /**
   * Update a record
   */
  updateRecord: (input: {
    /** Field values to update */
    body: { [key: string]: unknown };
    /** API name of the Salesforce object */
    sObjectName: string;
    /** Salesforce record ID */
    id: string;
  }) => Promise<ErrorList>;

  /**
   * Delete a record
   */
  deleteRecord: (input: {
    /** API name of the Salesforce object */
    sObjectName: string;
    /** Salesforce record ID */
    id: string;
  }) => Promise<ErrorList>;

  /**
   * Execute a SOQL query
   */
  query: (input: {
    /** The SOQL query string (e.g. 'SELECT Id, Name FROM Account WHERE CreatedDate = TODAY') */
    q: string;
  }) => Promise<QueryResult>;

  /**
   * Get next page of query results
   */
  queryMore: (input: {
    /** The query locator identifier from the nextRecordsUrl */
    queryLocator: string;
  }) => Promise<QueryResult>;

  /**
   * Execute a SOSL search
   */
  search: (input: {
    /** The SOSL search string (e.g. 'FIND {Acme} IN ALL FIELDS RETURNING Account, Contact') */
    q: string;
  }) => Promise<SearchResult>;

  /**
   * Execute composite batch requests
   */
  compositeBatch: (input: {
    batchRequests?: ({ method: "GET" | "POST" | "PATCH" | "DELETE"; url: string; richInput?: { [key: string]: unknown } })[];
    /** Stop processing if any sub-request fails */
    haltOnError?: boolean;
  }) => Promise<BatchResponse>;
};

export * from "./schemas.js";
