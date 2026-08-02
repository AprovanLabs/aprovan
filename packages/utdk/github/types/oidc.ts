import type { BasicError, EmptyObject, OidcCustomPropertyInclusion, OidcCustomSub } from "./schemas.js";

export type OidcOperations = {
  /**
   * List OIDC custom property inclusions for an enterprise
   * @see https://docs.github.com/rest/actions/oidc#list-oidc-custom-property-inclusions-for-an-enterprise
   */
  listOidcCustomPropertyInclusionsForEnterprise: (input: {
    /** The slug version of the enterprise name. */
    enterprise: string;
  }) => Promise<(OidcCustomPropertyInclusion)[]>;

  /**
   * Create an OIDC custom property inclusion for an enterprise
   * @see https://docs.github.com/rest/actions/oidc#create-an-oidc-custom-property-inclusion-for-an-enterprise
   */
  createOidcCustomPropertyInclusionForEnterprise: (input: {
    /** The name of the custom property to include in the OIDC token */
    custom_property_name: string;
    /** The slug version of the enterprise name. */
    enterprise: string;
  }) => Promise<OidcCustomPropertyInclusion>;

  /**
   * Delete an OIDC custom property inclusion for an enterprise
   * @see https://docs.github.com/rest/actions/oidc#delete-an-oidc-custom-property-inclusion-for-an-enterprise
   */
  deleteOidcCustomPropertyInclusionForEnterprise: (input: {
    /** The slug version of the enterprise name. */
    enterprise: string;
    /** The name of the custom property to remove from OIDC token inclusion */
    custom_property_name: string;
  }) => Promise<BasicError>;

  /**
   * List OIDC custom property inclusions for an organization
   * @see https://docs.github.com/rest/actions/oidc#list-oidc-custom-property-inclusions-for-an-organization
   */
  listOidcCustomPropertyInclusionsForOrg: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<(OidcCustomPropertyInclusion)[]>;

  /**
   * Create an OIDC custom property inclusion for an organization
   * @see https://docs.github.com/rest/actions/oidc#create-an-oidc-custom-property-inclusion-for-an-organization
   */
  createOidcCustomPropertyInclusionForOrg: (input: {
    /** The name of the custom property to include in the OIDC token */
    custom_property_name: string;
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<OidcCustomPropertyInclusion>;

  /**
   * Delete an OIDC custom property inclusion for an organization
   * @see https://docs.github.com/rest/actions/oidc#delete-an-oidc-custom-property-inclusion-for-an-organization
   */
  deleteOidcCustomPropertyInclusionForOrg: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The name of the custom property to remove from OIDC token inclusion */
    custom_property_name: string;
  }) => Promise<BasicError>;

  /**
   * Get the customization template for an OIDC subject claim for an organization
   * @see https://docs.github.com/rest/actions/oidc#get-the-customization-template-for-an-oidc-subject-claim-for-an-organization
   */
  getOidcCustomSubTemplateForOrg: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<OidcCustomSub>;

  /**
   * Set the customization template for an OIDC subject claim for an organization
   * @see https://docs.github.com/rest/actions/oidc#set-the-customization-template-for-an-oidc-subject-claim-for-an-organization
   */
  updateOidcCustomSubTemplateForOrg: (input: {
    /** Array of unique strings. Each claim key can only contain alphanumeric characters and underscores. */
    include_claim_keys?: (string)[];
    /** Whether to opt in to the immutable OIDC subject claim format for the organization. When `true`, new OIDC tokens will use a stable, repository-ID-based `sub` claim instead of the name-based format. */
    use_immutable_subject?: boolean;
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<EmptyObject>;
};
