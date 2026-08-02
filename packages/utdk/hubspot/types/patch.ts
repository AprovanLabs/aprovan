import type { SimplePublicObject } from "./schemas.js";

export type PatchOperations = {
  /**
   * Update a contact
   */
  contactIdUpdate: (input: {
    /** Key value pairs representing the properties of the object. */
    properties: { [key: string]: string | undefined };
    contactId: string;
    /** The name of a property whose values are unique for this object type */
    idProperty?: string;
  }) => Promise<SimplePublicObject>;
};
