import type { Error } from "./schemas.js";

export type DeleteOperations = {
  /**
   * Archive a contact
   */
  contactIdArchive: (input: {
    contactId: string;
  }) => Promise<Error>;
};
