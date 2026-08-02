import type { CollectionResponseSimplePublicObjectWithAssociationsForwardPaging, SimplePublicObjectWithAssociations } from "./schemas.js";

export type GetOperations = {
  /**
   * Retrieve contacts
   */
  contactsGetPage: (input: {
    /** The paging cursor token of the last successfully read resource will be returned as the `paging.next.after` JSON property of a paged response containing more results. */
    after?: string;
    /** Whether to return only results that have been archived. */
    archived?: boolean;
    /** A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored. */
    associations?: (string)[];
    /** The maximum number of results to display per page. */
    limit?: number;
    /** A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored. */
    properties?: (string)[];
    /** A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored. Usage of this parameter will reduce the maximum number of objects that can be read by a single request. */
    propertiesWithHistory?: (string)[];
  }) => Promise<CollectionResponseSimplePublicObjectWithAssociationsForwardPaging>;

  /**
   * Retrieve a contact
   */
  contactIdGetById: (input: {
    contactId: string;
    /** Whether to return only results that have been archived. */
    archived?: boolean;
    /** A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored. */
    associations?: (string)[];
    /** The name of a property whose values are unique for this object type */
    idProperty?: string;
    /** A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored. */
    properties?: (string)[];
    /** A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored. */
    propertiesWithHistory?: (string)[];
  }) => Promise<SimplePublicObjectWithAssociations>;
};
