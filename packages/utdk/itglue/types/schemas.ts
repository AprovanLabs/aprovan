export type JsonApiCollection = {
  data: (JsonApiResourceObject)[];
  meta?: { [key: string]: unknown };
  links?: { [key: string]: unknown };
  [key: string]: unknown;
};

export type JsonApiResource = {
  data: JsonApiResourceObject;
  meta?: { [key: string]: unknown };
  links?: { [key: string]: unknown };
  [key: string]: unknown;
};

export type JsonApiResourceObject = {
  id?: string;
  type: string;
  attributes?: { [key: string]: unknown };
  relationships?: { [key: string]: unknown };
  links?: { [key: string]: unknown };
  [key: string]: unknown;
};

export type JsonApiErrors = {
  errors?: ({ [key: string]: unknown })[];
  [key: string]: unknown;
};

export type ContactRequest = {
  data: { type: "contacts"; attributes: ContactAttributes; [key: string]: unknown };
};

export type ContactAttributes = {
  "organization-id": number;
  "first-name"?: string;
  "last-name"?: string;
  name: string;
  title?: string;
  email?: string;
  notes?: string | null;
  important?: boolean;
  "contact-type-id"?: number;
  "location-id"?: number | null;
  /** Included for non-destructive deactivation where available in the tenant. */
  archived?: boolean;
  [key: string]: unknown;
};

export type ContactUpdateRequest = {
  data: { type: "contacts"; id: string; attributes: ContactUpdateAttributes; [key: string]: unknown };
};

export type ContactUpdateAttributes = {
  "organization-id"?: number;
  "first-name"?: string;
  "last-name"?: string;
  name?: string;
  title?: string;
  email?: string;
  notes?: string | null;
  important?: boolean;
  "contact-type-id"?: number;
  "location-id"?: number | null;
  /** Included for non-destructive deactivation where available in the tenant. */
  archived?: boolean;
  [key: string]: unknown;
};

export type OrganizationContactRequest = {
  data: { type: "contacts"; attributes: OrganizationContactAttributes; [key: string]: unknown };
};

export type OrganizationContactAttributes = {
  "first-name"?: string;
  "last-name"?: string;
  name: string;
  title?: string;
  email?: string;
  notes?: string | null;
  important?: boolean;
  "contact-type-id"?: number;
  "location-id"?: number | null;
  /** Included for non-destructive deactivation where available in the tenant. */
  archived?: boolean;
  [key: string]: unknown;
};

export type OrganizationContactUpdateRequest = {
  data: { type: "contacts"; id: string; attributes: OrganizationContactUpdateAttributes; [key: string]: unknown };
};

export type OrganizationContactUpdateAttributes = {
  "first-name"?: string;
  "last-name"?: string;
  name?: string;
  title?: string;
  email?: string;
  notes?: string | null;
  important?: boolean;
  "contact-type-id"?: number;
  "location-id"?: number | null;
  /** Included for non-destructive deactivation where available in the tenant. */
  archived?: boolean;
  [key: string]: unknown;
};

export type PasswordRequest = {
  data: { type: "passwords"; attributes: PasswordAttributes; [key: string]: unknown };
};

export type PasswordAttributes = {
  "organization-id": number;
  name: string;
  username?: string;
  password?: string;
  url?: string | null;
  notes?: string | null;
  "password-category-id"?: number | null;
  "password-folder-id"?: number | null;
  "resource-id"?: number | null;
  "resource-type"?: string | null;
  [key: string]: unknown;
};

export type PasswordUpdateRequest = {
  data: { type: "passwords"; id: string; attributes: PasswordUpdateAttributes; [key: string]: unknown };
};

export type PasswordUpdateAttributes = {
  "organization-id"?: number;
  name?: string;
  username?: string;
  password?: string;
  url?: string | null;
  notes?: string | null;
  "password-category-id"?: number | null;
  "password-folder-id"?: number | null;
  "resource-id"?: number | null;
  "resource-type"?: string | null;
  [key: string]: unknown;
};

export type ConfigurationRequest = {
  data: { type: "configurations"; attributes: ConfigurationAttributes; relationships?: { [key: string]: unknown }; [key: string]: unknown };
};

export type ConfigurationAttributes = {
  "organization-id": number;
  name: string;
  hostname?: string | null;
  "configuration-type-id"?: number;
  "configuration-status-id"?: number;
  "manufacturer-id"?: number | null;
  "model-id"?: number | null;
  "location-id"?: number | null;
  "serial-number"?: string | null;
  "asset-tag"?: string | null;
  "primary-ip"?: string | null;
  "mac-address"?: string | null;
  notes?: string | null;
  [key: string]: unknown;
};

export type ConfigurationUpdateRequest = {
  data: { type: "configurations"; id: string; attributes: ConfigurationUpdateAttributes; relationships?: { [key: string]: unknown }; [key: string]: unknown };
};

export type ConfigurationUpdateAttributes = {
  "organization-id"?: number;
  name?: string;
  hostname?: string | null;
  "configuration-type-id"?: number;
  "configuration-status-id"?: number;
  "manufacturer-id"?: number | null;
  "model-id"?: number | null;
  "location-id"?: number | null;
  "serial-number"?: string | null;
  "asset-tag"?: string | null;
  "primary-ip"?: string | null;
  "mac-address"?: string | null;
  notes?: string | null;
  [key: string]: unknown;
};

export type OrganizationConfigurationRequest = {
  data: { type: "configurations"; attributes: OrganizationConfigurationAttributes; relationships?: { [key: string]: unknown }; [key: string]: unknown };
};

export type OrganizationConfigurationAttributes = {
  name: string;
  hostname?: string | null;
  "configuration-type-id"?: number;
  "configuration-status-id"?: number;
  "manufacturer-id"?: number | null;
  "model-id"?: number | null;
  "location-id"?: number | null;
  "serial-number"?: string | null;
  "asset-tag"?: string | null;
  "primary-ip"?: string | null;
  "mac-address"?: string | null;
  notes?: string | null;
  [key: string]: unknown;
};

export type DocumentRequest = {
  data: { type: "documents"; attributes: DocumentAttributes; relationships?: { [key: string]: unknown }; [key: string]: unknown };
};

export type DocumentAttributes = {
  "organization-id": number;
  name: string;
  /** Document body content, typically HTML or rich text from IT Glue. */
  content?: string | null;
  restricted?: boolean | null;
  archived?: boolean | null;
  public?: boolean | null;
  "document-folder-id"?: number | null;
  "my-glue"?: boolean | null;
  [key: string]: unknown;
};

export type DocumentUpdateRequest = {
  data: { type: "documents"; id: string; attributes: DocumentUpdateAttributes; relationships?: { [key: string]: unknown }; [key: string]: unknown };
};

export type DocumentUpdateAttributes = {
  "organization-id"?: number;
  name?: string;
  /** Document body content, typically HTML or rich text from IT Glue. */
  content?: string | null;
  restricted?: boolean | null;
  archived?: boolean | null;
  public?: boolean | null;
  "document-folder-id"?: number | null;
  "my-glue"?: boolean | null;
  [key: string]: unknown;
};

export type OrganizationDocumentRequest = {
  data: { type: "documents"; attributes: OrganizationDocumentAttributes; relationships?: { [key: string]: unknown }; [key: string]: unknown };
};

export type OrganizationDocumentAttributes = {
  name: string;
  /** Document body content, typically HTML or rich text from IT Glue. */
  content?: string | null;
  restricted?: boolean | null;
  archived?: boolean | null;
  public?: boolean | null;
  "document-folder-id"?: number | null;
  "my-glue"?: boolean | null;
  [key: string]: unknown;
};
