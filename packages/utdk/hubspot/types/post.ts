import type { BatchResponseSimplePublicObject, BatchResponseSimplePublicUpsertObject, CollectionResponseWithTotalSimplePublicObject, Error, FilterGroup, PublicAssociationsForObject, SimplePublicObject, SimplePublicObjectBatchInput, SimplePublicObjectBatchInputForCreate, SimplePublicObjectBatchInputUpsert, SimplePublicObjectId } from "./schemas.js";

export type PostOperations = {
  /**
   * Create a contact
   */
  contactsCreate: (input: {
    associations: (PublicAssociationsForObject)[];
    /** Key-value pairs for setting properties for the new object. */
    properties: { [key: string]: string | undefined };
  }) => Promise<SimplePublicObject>;

  /**
   * Archive a batch of contacts
   */
  archiveArchive: (input: {
    inputs: (SimplePublicObjectId)[];
  }) => Promise<Error>;

  /**
   * Create a batch of contacts
   */
  createCreate: (input: {
    inputs: (SimplePublicObjectBatchInputForCreate)[];
  }) => Promise<BatchResponseSimplePublicObject>;

  /**
   * Retrieve a batch of contacts
   */
  readRead: (input: {
    /** When using a custom unique value property to retrieve records, the name of the property. Do not include this parameter if retrieving by record ID. */
    idProperty?: string;
    inputs: (SimplePublicObjectId)[];
    /** Key-value pairs for setting properties for the new object. */
    properties: (string)[];
    /** Key-value pairs for setting properties for the new object and their histories. */
    propertiesWithHistory: (string)[];
    /** Whether to return only results that have been archived. */
    archived?: boolean;
  }) => Promise<BatchResponseSimplePublicObject>;

  /**
   * Update a batch of contacts
   */
  updateUpdate: (input: {
    inputs: (SimplePublicObjectBatchInput)[];
  }) => Promise<BatchResponseSimplePublicObject>;

  /**
   * Create or update a batch of contacts
   */
  upsertUpsert: (input: {
    inputs: (SimplePublicObjectBatchInputUpsert)[];
  }) => Promise<BatchResponseSimplePublicUpsertObject>;

  /**
   * Permanently delete a contact (GDPR-compliant)
   */
  gdprDeletePurge: (input: {
    /** The name of a property whose values are unique for this object. An alternative to identifying a contact by ID. */
    idProperty?: string;
    /** The ID of the contact to permanently delete. */
    objectId: string;
  }) => Promise<Error>;

  /**
   * Merge two contacts
   */
  mergeMerge: (input: {
    /** The object ID of the record that the merge will not set as the current value after the merge. */
    objectIdToMerge: string;
    /** The object ID of the record that the merge will generally set as the current value after the merge. */
    primaryObjectId: string;
  }) => Promise<SimplePublicObject>;

  /**
   * Search for contacts
   */
  searchDoSearch: (input: {
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
  }) => Promise<CollectionResponseWithTotalSimplePublicObject>;
};
