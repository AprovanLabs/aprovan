import type { BaseList, CreateRecordsResponse, DeleteRecordResponse, DeleteRecordsResponse, Record, RecordList, TableList, UpdateRecordsResponse } from "./schemas.js";

export type AirtableClient = {
  /**
   * List records
   */
  listRecords: (input: {
    /** The Airtable base ID (starts with 'app') */
    baseId: string;
    /** The table ID (starts with 'tbl') or table name */
    tableIdOrName: string;
    /** Field names to include in the response. If not specified, all fields are returned. */
    "fields[]"?: (string)[];
    /** An Airtable formula to filter records (e.g. '{Status}="Done"') */
    filterByFormula?: string;
    /** Maximum number of records to return (max 100) */
    maxRecords?: number;
    /** Number of records per page (default 100, max 100) */
    pageSize?: number;
    /** Pagination offset string returned from a previous request */
    offset?: string;
    /** Name or ID of a view to filter and sort records */
    view?: string;
    /** Field name to sort by */
    "sort[0][field]"?: string;
    /** Sort direction */
    "sort[0][direction]"?: "asc" | "desc";
  }) => Promise<RecordList>;

  /**
   * Create a record
   */
  createRecord: (input: {
    /** Array of records to create (max 10) */
    records?: ({ fields?: { [key: string]: unknown } })[];
    /** Automatically convert string values to the appropriate field type */
    typecast?: boolean;
    /** Return field keys as field IDs instead of names */
    returnFieldsByFieldId?: boolean;
    /** The Airtable base ID */
    baseId: string;
    /** The table ID or name */
    tableIdOrName: string;
  }) => Promise<CreateRecordsResponse>;

  /**
   * Update multiple records
   */
  updateRecords: (input: {
    records?: ({ id: string; fields?: { [key: string]: unknown } })[];
    /** The Airtable base ID */
    baseId: string;
    /** The table ID or name */
    tableIdOrName: string;
  }) => Promise<UpdateRecordsResponse>;

  /**
   * Delete records
   */
  deleteRecords: (input: {
    /** The Airtable base ID */
    baseId: string;
    /** The table ID or name */
    tableIdOrName: string;
    /** Record IDs to delete */
    "records[]": (string)[];
  }) => Promise<DeleteRecordsResponse>;

  /**
   * Get a record
   */
  getRecord: (input: {
    /** The Airtable base ID */
    baseId: string;
    /** The table ID or name */
    tableIdOrName: string;
    /** The record ID (starts with 'rec') */
    recordId: string;
  }) => Promise<Record>;

  /**
   * Replace a record
   */
  replaceRecord: (input: {
    /** Fields to update */
    fields?: { [key: string]: unknown };
    /** The Airtable base ID */
    baseId: string;
    /** The table ID or name */
    tableIdOrName: string;
    /** The record ID */
    recordId: string;
  }) => Promise<Record>;

  /**
   * Delete a record
   */
  deleteRecord: (input: {
    /** The Airtable base ID */
    baseId: string;
    /** The table ID or name */
    tableIdOrName: string;
    /** The record ID to delete */
    recordId: string;
  }) => Promise<DeleteRecordResponse>;

  /**
   * List bases
   */
  listBases: (input: {
    /** Pagination offset for fetching the next page */
    offset?: string;
  }) => Promise<BaseList>;

  /**
   * List tables in a base
   */
  listTables: (input: {
    /** The Airtable base ID */
    baseId: string;
  }) => Promise<TableList>;
};

export * from "./schemas.js";
