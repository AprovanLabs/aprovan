export type Record = {
  /** The record ID (starts with 'rec') */
  id?: string;
  /** Field values keyed by field name */
  fields?: { [key: string]: unknown };
  /** Timestamp when the record was created */
  createdTime?: string;
};

export type RecordList = {
  records?: (Record)[];
  /** Pagination cursor for the next page of results */
  offset?: string;
};

export type CreateRecordsRequest = {
  /** Array of records to create (max 10) */
  records?: ({ fields?: { [key: string]: unknown } })[];
  /** Automatically convert string values to the appropriate field type */
  typecast?: boolean;
  /** Return field keys as field IDs instead of names */
  returnFieldsByFieldId?: boolean;
};

export type CreateRecordsResponse = {
  records?: (Record)[];
};

export type UpdateRecordRequest = {
  /** Fields to update */
  fields?: { [key: string]: unknown };
};

export type UpdateRecordsRequest = {
  records?: ({ id: string; fields?: { [key: string]: unknown } })[];
};

export type UpdateRecordsResponse = {
  records?: (Record)[];
};

export type DeleteRecordResponse = {
  id?: string;
  deleted?: boolean;
};

export type DeleteRecordsResponse = {
  records?: (DeleteRecordResponse)[];
};

export type Base = {
  /** Base ID */
  id?: string;
  /** Base name */
  name?: string;
  /** Permission level for the current user */
  permissionLevel?: "none" | "read" | "comment" | "edit" | "create";
};

export type BaseList = {
  bases?: (Base)[];
  offset?: string;
};

export type Field = {
  id?: string;
  name?: string;
  /** Field type (singleLineText, multilineText, number, date, etc.) */
  type?: string;
  description?: string;
  options?: { [key: string]: unknown };
};

export type Table = {
  id?: string;
  name?: string;
  description?: string;
  fields?: (Field)[];
  views?: ({ id?: string; name?: string; type?: string })[];
};

export type TableList = {
  tables?: (Table)[];
};

export type Error = {
  error?: { type?: string; message?: string };
};
