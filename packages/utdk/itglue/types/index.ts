import type { ConfigurationAttributes, ConfigurationUpdateAttributes, ContactAttributes, ContactUpdateAttributes, DocumentAttributes, DocumentUpdateAttributes, JsonApiCollection, JsonApiResource, OrganizationConfigurationAttributes, OrganizationContactAttributes, OrganizationContactUpdateAttributes, OrganizationDocumentAttributes, PasswordAttributes, PasswordUpdateAttributes } from "./schemas.js";

export type ItglueClient = {
  /**
   * List organizations
   */
  listOrganizations: (input: {
    "filter[id]"?: number;
    /** Exact match where supported by IT Glue. */
    "filter[name]"?: string;
    "page[number]"?: number;
    "page[size]"?: number;
    /** Comma separated sort fields; prefix with - for descending. */
    sort?: string;
  }) => Promise<JsonApiCollection>;

  /**
   * Retrieve one organization
   */
  getOrganization: (input: {
    id: number;
  }) => Promise<JsonApiResource>;

  /**
   * List contacts
   */
  listContacts: (input: {
    "filter[id]"?: number;
    /** Exact match where supported by IT Glue. */
    "filter[name]"?: string;
    "filter[organization_id]"?: number;
    "filter[email]"?: string;
    "page[number]"?: number;
    "page[size]"?: number;
    /** Comma separated sort fields; prefix with - for descending. */
    sort?: string;
  }) => Promise<JsonApiCollection>;

  /**
   * Create a contact
   */
  createContact: (input: {
    data: { type: "contacts"; attributes: ContactAttributes; [key: string]: unknown };
  }) => Promise<JsonApiResource>;

  /**
   * Retrieve a contact
   */
  getContact: (input: {
    id: number;
  }) => Promise<JsonApiResource>;

  /**
   * Update or deactivate a contact
   */
  updateContact: (input: {
    data: { type: "contacts"; id: string; attributes: ContactUpdateAttributes; [key: string]: unknown };
    id: number;
  }) => Promise<JsonApiResource>;

  /**
   * List contacts for an organization
   */
  listOrganizationContacts: (input: {
    organization_id: number;
    "filter[email]"?: string;
    "page[number]"?: number;
    "page[size]"?: number;
  }) => Promise<JsonApiCollection>;

  /**
   * Create a contact under an organization
   */
  createOrganizationContact: (input: {
    data: { type: "contacts"; attributes: OrganizationContactAttributes; [key: string]: unknown };
    organization_id: number;
  }) => Promise<JsonApiResource>;

  /**
   * Update or deactivate an organization contact
   */
  updateOrganizationContact: (input: {
    data: { type: "contacts"; id: string; attributes: OrganizationContactUpdateAttributes; [key: string]: unknown };
    organization_id: number;
    id: number;
  }) => Promise<JsonApiResource>;

  /**
   * List passwords
   */
  listPasswords: (input: {
    "filter[id]"?: number;
    /** Exact match where supported by IT Glue. */
    "filter[name]"?: string;
    "filter[organization_id]"?: number;
    "page[number]"?: number;
    "page[size]"?: number;
    /** Comma separated sort fields; prefix with - for descending. */
    sort?: string;
  }) => Promise<JsonApiCollection>;

  /**
   * Create a password
   */
  createPassword: (input: {
    data: { type: "passwords"; attributes: PasswordAttributes; [key: string]: unknown };
  }) => Promise<JsonApiResource>;

  /**
   * Retrieve a password metadata record
   */
  getPassword: (input: {
    id: number;
  }) => Promise<JsonApiResource>;

  /**
   * Update a password
   */
  updatePassword: (input: {
    data: { type: "passwords"; id: string; attributes: PasswordUpdateAttributes; [key: string]: unknown };
    id: number;
  }) => Promise<JsonApiResource>;

  /**
   * List configurations
   */
  listConfigurations: (input: {
    "filter[id]"?: number;
    /** Exact match where supported by IT Glue. */
    "filter[name]"?: string;
    "filter[organization_id]"?: number;
    "filter[serial_number]"?: string;
    "filter[asset_tag]"?: string;
    "filter[hostname]"?: string;
    "page[number]"?: number;
    "page[size]"?: number;
    /** Comma separated sort fields; prefix with - for descending. */
    sort?: string;
  }) => Promise<JsonApiCollection>;

  /**
   * Create a configuration
   */
  createConfiguration: (input: {
    data: { type: "configurations"; attributes: ConfigurationAttributes; relationships?: { [key: string]: unknown }; [key: string]: unknown };
  }) => Promise<JsonApiResource>;

  /**
   * Retrieve a configuration
   */
  getConfiguration: (input: {
    id: number;
  }) => Promise<JsonApiResource>;

  /**
   * Update a configuration
   */
  updateConfiguration: (input: {
    data: { type: "configurations"; id: string; attributes: ConfigurationUpdateAttributes; relationships?: { [key: string]: unknown }; [key: string]: unknown };
    id: number;
  }) => Promise<JsonApiResource>;

  /**
   * List configurations for an organization
   */
  listOrganizationConfigurations: (input: {
    organization_id: number;
    /** Exact match where supported by IT Glue. */
    "filter[name]"?: string;
    "page[number]"?: number;
    "page[size]"?: number;
  }) => Promise<JsonApiCollection>;

  /**
   * Create a configuration under an organization
   */
  createOrganizationConfiguration: (input: {
    data: { type: "configurations"; attributes: OrganizationConfigurationAttributes; relationships?: { [key: string]: unknown }; [key: string]: unknown };
    organization_id: number;
  }) => Promise<JsonApiResource>;

  /**
   * List documents
   */
  listDocuments: (input: {
    "filter[id]"?: number;
    /** Exact match where supported by IT Glue. */
    "filter[name]"?: string;
    "filter[organization_id]"?: number;
    "page[number]"?: number;
    "page[size]"?: number;
    /** Comma separated sort fields; prefix with - for descending. */
    sort?: string;
  }) => Promise<JsonApiCollection>;

  /**
   * Create a document
   */
  createDocument: (input: {
    data: { type: "documents"; attributes: DocumentAttributes; relationships?: { [key: string]: unknown }; [key: string]: unknown };
  }) => Promise<JsonApiResource>;

  /**
   * Retrieve a document
   */
  getDocument: (input: {
    id: number;
  }) => Promise<JsonApiResource>;

  /**
   * Update a document
   */
  updateDocument: (input: {
    data: { type: "documents"; id: string; attributes: DocumentUpdateAttributes; relationships?: { [key: string]: unknown }; [key: string]: unknown };
    id: number;
  }) => Promise<JsonApiResource>;

  /**
   * List documents for an organization
   */
  listOrganizationDocuments: (input: {
    organization_id: number;
    /** Exact match where supported by IT Glue. */
    "filter[name]"?: string;
    "page[number]"?: number;
    "page[size]"?: number;
  }) => Promise<JsonApiCollection>;

  /**
   * Create a document under an organization
   */
  createOrganizationDocument: (input: {
    data: { type: "documents"; attributes: OrganizationDocumentAttributes; relationships?: { [key: string]: unknown }; [key: string]: unknown };
    organization_id: number;
  }) => Promise<JsonApiResource>;
};

export * from "./schemas.js";
