/** Contains the id and type of an association */
export type AssociatedId = {
  /** The ID for the association type. */
  id: string;
  /** The type of associations. */
  type: string;
};

/** Defines the type, direction, and details of the relationship between two CRM objects. */
export type AssociationSpec = {
  /** The category of the association, such as "HUBSPOT_DEFINED". */
  associationCategory: "HUBSPOT_DEFINED" | "INTEGRATOR_DEFINED" | "USER_DEFINED" | "WORK";
  /** The ID representing the specific type of association. */
  associationTypeId: number;
};

export type BatchInputSimplePublicObjectBatchInput = {
  inputs: (SimplePublicObjectBatchInput)[];
};

export type BatchInputSimplePublicObjectBatchInputForCreate = {
  inputs: (SimplePublicObjectBatchInputForCreate)[];
};

export type BatchInputSimplePublicObjectBatchInputUpsert = {
  inputs: (SimplePublicObjectBatchInputUpsert)[];
};

export type BatchInputSimplePublicObjectId = {
  inputs: (SimplePublicObjectId)[];
};

/** Specifies the input for reading a batch of CRM objects, including arrays of object IDs, requested property names (with optional history), and an optional unique identifying property. */
export type BatchReadInputSimplePublicObjectId = {
  /** When using a custom unique value property to retrieve records, the name of the property. Do not include this parameter if retrieving by record ID. */
  idProperty?: string;
  inputs: (SimplePublicObjectId)[];
  /** Key-value pairs for setting properties for the new object. */
  properties: (string)[];
  /** Key-value pairs for setting properties for the new object and their histories. */
  propertiesWithHistory: (string)[];
};

/** A public object batch response object */
export type BatchResponseSimplePublicObject = {
  /** The timestamp when the batch processing was completed, in ISO 8601 format. */
  completedAt: string;
  /** An object containing relevant links related to the batch request. */
  links?: { [key: string]: string | undefined };
  /** The timestamp when the batch request was initially made, in ISO 8601 format. */
  requestedAt?: string;
  results: (SimplePublicObject)[];
  /** The timestamp when the batch processing began, in ISO 8601 format. */
  startedAt: string;
  /** The status of the batch processing request. The expected value is "COMPLETE". */
  status: "CANCELED" | "COMPLETE" | "PENDING" | "PROCESSING";
};

/** Represents the result of a batch operation on CRM objects, including the processing status, batch results, timestamps, and a list of any errors encountered during the operation. */
export type BatchResponseSimplePublicObjectWithErrors = {
  /** The timestamp when the batch process was completed, in ISO 8601 format. */
  completedAt: string;
  errors?: (StandardError)[];
  /** An object containing relevant links related to the batch request. */
  links?: { [key: string]: string | undefined };
  /** The number of errors encountered during the batch process. */
  numErrors?: number;
  /** The timestamp when the batch process was initiated, in ISO 8601 format. */
  requestedAt?: string;
  results: (SimplePublicObject)[];
  /** The timestamp when the batch process began execution, in ISO 8601 format. */
  startedAt: string;
  /** The status of the batch processing request - "PENDING", "PROCESSING", "CANCELLED", or "COMPLETE" */
  status: "CANCELED" | "COMPLETE" | "PENDING" | "PROCESSING";
};

/** Represents the result of a batch upsert operation, including the operation’s status, timestamps, and a list of successfully created or updated objects. */
export type BatchResponseSimplePublicUpsertObject = {
  /** The timestamp when the batch process was completed, in ISO 8601 format. */
  completedAt: string;
  /** An object containing relevant links related to the batch request. */
  links?: { [key: string]: string | undefined };
  /** The timestamp when the batch process was initiated, in ISO 8601 format. */
  requestedAt?: string;
  results: (SimplePublicUpsertObject)[];
  /** The timestamp when the batch process began execution, in ISO 8601 format. */
  startedAt: string;
  /** The status of the batch processing request. Can be: "PENDING", "PROCESSING", "CANCELED", or "COMPLETE". */
  status: "CANCELED" | "COMPLETE" | "PENDING" | "PROCESSING";
};

/** Represents the response from a batch upsert operation, including the status, timestamps, successfully processed objects, and any errors that occurred during processing. */
export type BatchResponseSimplePublicUpsertObjectWithErrors = {
  /** The timestamp when the batch process was completed, in ISO 8601 format. */
  completedAt: string;
  errors?: (StandardError)[];
  /** An object containing relevant links related to the batch request. */
  links?: { [key: string]: string | undefined };
  /** The number of errors encountered during the batch process. */
  numErrors?: number;
  /** The timestamp when the batch process was initiated, in ISO 8601 format. */
  requestedAt?: string;
  results: (SimplePublicUpsertObject)[];
  /** The timestamp when the batch process began execution, in ISO 8601 format. */
  startedAt: string;
  /** The status of the batch processing request. Can be: "PENDING", "PROCESSING", "CANCELLED", or "COMPLETE". */
  status: "CANCELED" | "COMPLETE" | "PENDING" | "PROCESSING";
};

export type CollectionResponseAssociatedId = {
  paging?: Paging;
  results: (AssociatedId)[];
};

export type CollectionResponseSimplePublicObjectWithAssociationsForwardPaging = {
  paging?: ForwardPaging;
  results: (SimplePublicObjectWithAssociations)[];
};

/** Represents a list of simple objects returned from an API request, along with the total count of objects available. */
export type CollectionResponseWithTotalSimplePublicObject = {
  paging?: Paging;
  results: (SimplePublicObject)[];
  /** The number of available results */
  total: number;
};

export type Error = {
  /** The error category */
  category: string;
  /** Context about the error condition */
  context?: { [key: string]: (string)[] | undefined };
  /** A unique identifier for the request. Include this value with any error reports or support tickets */
  correlationId: string;
  /** further information about the error */
  errors?: (ErrorDetail)[];
  /** A map of link names to associated URIs containing documentation about the error or recommended remediation steps */
  links?: { [key: string]: string | undefined };
  /** A human readable message describing the error along with remediation steps where appropriate */
  message: string;
  /** A specific category that contains more specific detail about the error */
  subCategory?: string;
};

export type ErrorDetail = {
  /** The status code associated with the error detail */
  code?: string;
  /** Context about the error condition */
  context?: { [key: string]: (string)[] | undefined };
  /** The name of the field or parameter in which the error was found. */
  in?: string;
  /** A human readable message describing the error along with remediation steps where appropriate */
  message: string;
  /** A specific category that contains more specific detail about the error */
  subCategory?: string;
};

/** Defines a single condition for searching CRM objects, specifying the property to filter on, the operator to use (such as equals, greater than, or contains), and the value(s) to compare against. */
export type Filter = {
  /** The upper boundary value when using ranged-based filters. */
  highValue?: string;
  /** null */
  operator: "BETWEEN" | "CONTAINS_TOKEN" | "EQ" | "GT" | "GTE" | "HAS_PROPERTY" | "IN" | "LT" | "LTE" | "NEQ" | "NOT_CONTAINS_TOKEN" | "NOT_HAS_PROPERTY" | "NOT_IN";
  /** The name of the property to apply the filter to. */
  propertyName: string;
  /** The value to match against the property. */
  value?: string;
  /** The values to match against the property. */
  values?: (string)[];
};

export type FilterGroup = {
  filters: (Filter)[];
};

export type ForwardPaging = {
  next?: NextPage;
};

/** Specifies the paging information needed to retrieve the next set of results in a paginated API response */
export type NextPage = {
  /** A paging cursor token for retrieving subsequent pages. */
  after: string;
  /** A URL that can be used to retrieve the next page results. */
  link?: string;
};

export type Paging = {
  next?: NextPage;
  prev?: PreviousPage;
};

/** specifies the paging information needed to retrieve the previous set of results in a paginated API response */
export type PreviousPage = {
  /** A paging cursor token for retrieving previous pages. */
  before: string;
  /** A URL that can be used to retrieve the previous pages' results. */
  link?: string;
};

export type PublicAssociationsForObject = {
  to: PublicObjectId;
  types: (AssociationSpec)[];
};

/** An input that contains the information required to process a public GDPR data deletion request. */
export type PublicGdprDeleteInput = {
  /** The name of a property whose values are unique for this object. An alternative to identifying a contact by ID. */
  idProperty?: string;
  /** The ID of the contact to permanently delete. */
  objectId: string;
};

/** Input data for merging two records. */
export type PublicMergeInput = {
  /** The object ID of the record that the merge will not set as the current value after the merge. */
  objectIdToMerge: string;
  /** The object ID of the record that the merge will generally set as the current value after the merge. */
  primaryObjectId: string;
};

/** Contains the Id of a Public Object */
export type PublicObjectId = {
  /** The unique ID of the object. */
  id: string;
};

/** Describes a search request */
export type PublicObjectSearchRequest = {
  /** A paging cursor token for retrieving subsequent pages. */
  after: string;
  /** Up to 6 groups of filters defining additional query criteria. */
  filterGroups: (FilterGroup)[];
  /** The maximum results to return, up to 200 objects. */
  limit: number;
  /** A list of property names to include in the response. */
  properties: (string)[];
  /** The search query string, up to 3000 characters. */
  query?: string;
  /** Specifies sorting order based on object properties. */
  sorts: (string)[];
};

/** A simple public object. */
export type SimplePublicObject = {
  /** Whether the object is archived. */
  archived: boolean;
  /** The timestamp when the object was archived, in ISO 8601 format. */
  archivedAt?: string;
  /** The timestamp when the object was created, in ISO 8601 format. */
  createdAt: string;
  /** The unique ID of the object. */
  id: string;
  /** An identifier used for tracing the write request for the object. */
  objectWriteTraceId?: string;
  /** Key-value pairs representing the properties of the object. */
  properties: { [key: string]: string | undefined };
  /** Key-value pairs representing the properties of the object along with their history. */
  propertiesWithHistory?: { [key: string]: (ValueWithTimestamp)[] | undefined };
  /** The timestamp when the object was last updated, in ISO 8601 format. */
  updatedAt: string;
  /** The URL associated with the object. */
  url?: string;
};

/** Contains an array of CRM object records to be processed in a batch operation, each defined by their ID and properties. */
export type SimplePublicObjectBatchInput = {
  /** The ID of the contact to update. This can be the object ID, or the unique property value of the `idProperty` property. */
  id: string;
  /** The name of a unique property, when identifying records by property.  */
  idProperty?: string;
  /** A unique identifier for tracing the request. */
  objectWriteTraceId?: string;
  /** Key-value pairs representing the properties of the object. */
  properties: { [key: string]: string | undefined };
};

/** An input object that contains a collection of objects to be created together in a batch. */
export type SimplePublicObjectBatchInputForCreate = {
  associations: (PublicAssociationsForObject)[];
  /** An identifier used for tracing the creation or update request of the object. */
  objectWriteTraceId?: string;
  /** Key value pairs representing the properties of the object. */
  properties: { [key: string]: string | undefined };
};

/** Represents an object used in batch upsert operations, containing an object’s unique identifier, its properties, and optionally the unique property name and a write trace ID. */
export type SimplePublicObjectBatchInputUpsert = {
  /** The unique ID of the object. */
  id: string;
  /** The name of a property whose values are unique for this object */
  idProperty?: string;
  /** An identifier for tracing the creation request. */
  objectWriteTraceId?: string;
  /** Key value pairs representing the properties of the object. */
  properties: { [key: string]: string | undefined };
};

/** Contains the Id of a Public Object */
export type SimplePublicObjectId = {
  /** The unique ID of the object. */
  id: string;
};

/** Represents the input required to create or update a CRM object, containing an object with property names and their corresponding values. */
export type SimplePublicObjectInput = {
  /** Key value pairs representing the properties of the object. */
  properties: { [key: string]: string | undefined };
};

/** Is the input object used to create a new CRM object, containing the properties to be set and optional associations to link the new record with other CRM objects. */
export type SimplePublicObjectInputForCreate = {
  associations: (PublicAssociationsForObject)[];
  /** Key-value pairs for setting properties for the new object. */
  properties: { [key: string]: string | undefined };
};

/** Represents a CRM object along with its properties, timestamps, and a set of associated object IDs grouped by association type. */
export type SimplePublicObjectWithAssociations = {
  /** Whether the object is archived. */
  archived: boolean;
  /** The timestamp when the object was archived, in ISO 8601 format. */
  archivedAt?: string;
  /** A list defining relationships with other objects. */
  associations?: { [key: string]: CollectionResponseAssociatedId | undefined };
  /** The timestamp when the object was created, in ISO 8601 format. */
  createdAt: string;
  /** The unique ID of the object. */
  id: string;
  /** An identifier used for tracing the creation or update request of the object. */
  objectWriteTraceId?: string;
  /** Key value pairs representing the properties of the object. */
  properties: { [key: string]: string | undefined };
  /** Key-value pairs representing the properties of the object along with their history. */
  propertiesWithHistory?: { [key: string]: (ValueWithTimestamp)[] | undefined };
  /** The timestamp when the object was last updated, in ISO 8601 format. */
  updatedAt: string;
  /** The URL on the API that provide direct navigation to the corresponding UI pages for the connectors. */
  url?: string;
};

/** Represents a CRM object that has either been created or updated (upserted) */
export type SimplePublicUpsertObject = {
  /** Whether the object is archived. */
  archived: boolean;
  /** The timestamp when the object was archived, in ISO 8601 format. */
  archivedAt?: string;
  /** The timestamp when the object was created, in ISO 8601 format. */
  createdAt: string;
  /** The unique ID of the object. */
  id: string;
  /** Whether the property is new. */
  new: boolean;
  /** An identifier for tracing the creation request. */
  objectWriteTraceId?: string;
  /** Key value pairs representing the properties of the object. */
  properties: { [key: string]: string | undefined };
  /** Key-value pairs representing the properties of the object along with their history. */
  propertiesWithHistory?: { [key: string]: (ValueWithTimestamp)[] | undefined };
  /** The timestamp when the object was last updated, in ISO 8601 format. */
  updatedAt: string;
  /** The URL associated with the object. */
  url?: string;
};

/** Represents a standard error response in the HubSpot API, providing detailed information about an error that occurred during an API request. */
export type StandardError = {
  /** The main category of the error. */
  category: string;
  /** Additional context-specific information related to the error. */
  context: { [key: string]: (string)[] | undefined };
  /** The detailed error objects. */
  errors: (ErrorDetail)[];
  /** A unique ID for the error instance. */
  id?: string;
  /** URLs linking to documentation or resources associated with the error. */
  links: { [key: string]: string | undefined };
  /** A human-readable string describing the error and possible remediation steps. */
  message: string;
  /** The HTTP status code associated with the error. */
  status: string;
  /** A more specific error category within each main category. */
  subCategory?: { [key: string]: unknown };
};

/** Property model that includes timestamp. */
export type ValueWithTimestamp = {
  /** The unique ID of the property. */
  sourceId?: string;
  /** A human-readable label. */
  sourceLabel?: string;
  /** The property type. */
  sourceType: string;
  /** The timestamp when the property was updated, in ISO 8601 format. */
  timestamp: string;
  /** The ID of the user who last updated the property. */
  updatedByUserId?: number;
  /** The property value. */
  value: string;
};
