export type SObjectList = {
  encoding?: string;
  maxBatchSize?: number;
  sobjects?: (SObjectInfo)[];
};

export type SObjectInfo = {
  /** API name of the object */
  name?: string;
  /** Display label */
  label?: string;
  labelPlural?: string;
  /** 3-character ID prefix */
  keyPrefix?: string;
  queryable?: boolean;
  retrieveable?: boolean;
  createable?: boolean;
  updateable?: boolean;
  deletable?: boolean;
  custom?: boolean;
  urls?: { [key: string]: string | undefined };
};

export type SObjectDescribe = {
  name?: string;
  label?: string;
  fields?: (FieldDescribe)[];
  childRelationships?: ({ childSObject?: string; field?: string; relationshipName?: string })[];
};

export type FieldDescribe = {
  name?: string;
  label?: string;
  type?: string;
  length?: number;
  nillable?: boolean;
  createable?: boolean;
  updateable?: boolean;
};

export type CreateResponse = {
  /** Salesforce ID of the created record */
  id?: string;
  success?: boolean;
  errors?: (Error)[];
};

export type QueryResult = {
  /** Whether all records have been returned */
  done?: boolean;
  /** Total number of matching records */
  totalSize?: number;
  /** Array of record objects */
  records?: ({ [key: string]: unknown })[];
  /** URL to fetch the next page of results (only present when done=false) */
  nextRecordsUrl?: string;
};

export type SearchResult = {
  searchRecords?: ({ attributes?: { type?: string; url?: string }; [key: string]: unknown })[];
};

export type BatchRequest = {
  batchRequests?: ({ method: "GET" | "POST" | "PATCH" | "DELETE"; url: string; richInput?: { [key: string]: unknown } })[];
  /** Stop processing if any sub-request fails */
  haltOnError?: boolean;
};

export type BatchResponse = {
  hasErrors?: boolean;
  results?: ({ statusCode?: number; result?: { [key: string]: unknown } })[];
};

export type Error = {
  statusCode?: string;
  message?: string;
  fields?: (string)[];
};

export type ErrorList = (Error)[];
