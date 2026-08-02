# Oidc

8 operations · `@utdk/github`

```ts
import github from "@utdk/github";
```

## `github.oidc.listOidcCustomPropertyInclusionsForEnterprise`

List OIDC custom property inclusions for an enterprise — [API reference](https://docs.github.com/rest/actions/oidc#list-oidc-custom-property-inclusions-for-an-enterprise)

```ts
github.oidc.listOidcCustomPropertyInclusionsForEnterprise(input: {
  /** The slug version of the enterprise name. */
  enterprise: string;
}): Promise<(OidcCustomPropertyInclusion)[]>
```

<sub>`GET /enterprises/{enterprise}/actions/oidc/customization/properties/repo` · `oidc/list-oidc-custom-property-inclusions-for-enterprise`</sub>

## `github.oidc.createOidcCustomPropertyInclusionForEnterprise`

Create an OIDC custom property inclusion for an enterprise — [API reference](https://docs.github.com/rest/actions/oidc#create-an-oidc-custom-property-inclusion-for-an-enterprise)

```ts
github.oidc.createOidcCustomPropertyInclusionForEnterprise(input: {
  /** The name of the custom property to include in the OIDC token */
  custom_property_name: string;
  /** The slug version of the enterprise name. */
  enterprise: string;
}): Promise<OidcCustomPropertyInclusion>
```

<sub>`POST /enterprises/{enterprise}/actions/oidc/customization/properties/repo` · `oidc/create-oidc-custom-property-inclusion-for-enterprise`</sub>

## `github.oidc.deleteOidcCustomPropertyInclusionForEnterprise`

Delete an OIDC custom property inclusion for an enterprise — [API reference](https://docs.github.com/rest/actions/oidc#delete-an-oidc-custom-property-inclusion-for-an-enterprise)

```ts
github.oidc.deleteOidcCustomPropertyInclusionForEnterprise(input: {
  /** The slug version of the enterprise name. */
  enterprise: string;
  /** The name of the custom property to remove from OIDC token inclusion */
  custom_property_name: string;
}): Promise<BasicError>
```

<sub>`DELETE /enterprises/{enterprise}/actions/oidc/customization/properties/repo/{custom_property_name}` · `oidc/delete-oidc-custom-property-inclusion-for-enterprise`</sub>

## `github.oidc.listOidcCustomPropertyInclusionsForOrg`

List OIDC custom property inclusions for an organization — [API reference](https://docs.github.com/rest/actions/oidc#list-oidc-custom-property-inclusions-for-an-organization)

```ts
github.oidc.listOidcCustomPropertyInclusionsForOrg(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<(OidcCustomPropertyInclusion)[]>
```

<sub>`GET /orgs/{org}/actions/oidc/customization/properties/repo` · `oidc/list-oidc-custom-property-inclusions-for-org`</sub>

## `github.oidc.createOidcCustomPropertyInclusionForOrg`

Create an OIDC custom property inclusion for an organization — [API reference](https://docs.github.com/rest/actions/oidc#create-an-oidc-custom-property-inclusion-for-an-organization)

```ts
github.oidc.createOidcCustomPropertyInclusionForOrg(input: {
  /** The name of the custom property to include in the OIDC token */
  custom_property_name: string;
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<OidcCustomPropertyInclusion>
```

<sub>`POST /orgs/{org}/actions/oidc/customization/properties/repo` · `oidc/create-oidc-custom-property-inclusion-for-org`</sub>

## `github.oidc.deleteOidcCustomPropertyInclusionForOrg`

Delete an OIDC custom property inclusion for an organization — [API reference](https://docs.github.com/rest/actions/oidc#delete-an-oidc-custom-property-inclusion-for-an-organization)

```ts
github.oidc.deleteOidcCustomPropertyInclusionForOrg(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The name of the custom property to remove from OIDC token inclusion */
  custom_property_name: string;
}): Promise<BasicError>
```

<sub>`DELETE /orgs/{org}/actions/oidc/customization/properties/repo/{custom_property_name}` · `oidc/delete-oidc-custom-property-inclusion-for-org`</sub>

## `github.oidc.getOidcCustomSubTemplateForOrg`

Get the customization template for an OIDC subject claim for an organization — [API reference](https://docs.github.com/rest/actions/oidc#get-the-customization-template-for-an-oidc-subject-claim-for-an-organization)

```ts
github.oidc.getOidcCustomSubTemplateForOrg(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<OidcCustomSub>
```

<sub>`GET /orgs/{org}/actions/oidc/customization/sub` · `oidc/get-oidc-custom-sub-template-for-org`</sub>

## `github.oidc.updateOidcCustomSubTemplateForOrg`

Set the customization template for an OIDC subject claim for an organization — [API reference](https://docs.github.com/rest/actions/oidc#set-the-customization-template-for-an-oidc-subject-claim-for-an-organization)

```ts
github.oidc.updateOidcCustomSubTemplateForOrg(input: {
  /** Array of unique strings. Each claim key can only contain alphanumeric characters and underscores. */
  include_claim_keys?: (string)[];
  /** Whether to opt in to the immutable OIDC subject claim format for the organization. When `true`, new OIDC tokens will use a stable, repository-ID-based `sub` claim instead of the name-based format. */
  use_immutable_subject?: boolean;
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<EmptyObject>
```

<sub>`PUT /orgs/{org}/actions/oidc/customization/sub` · `oidc/update-oidc-custom-sub-template-for-org`</sub>

Named result types are exported from the package — hover them in your editor, or browse `types/schemas.ts`.

<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
