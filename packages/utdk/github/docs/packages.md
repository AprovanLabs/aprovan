# Packages

27 operations · `@utdk/github`

```ts
import github from "@utdk/github";
```

## `github.packages.listDockerMigrationConflictingPackagesForOrganization`

Get list of conflicting packages during Docker migration for organization — [API reference](https://docs.github.com/rest/packages/packages#get-list-of-conflicting-packages-during-docker-migration-for-organization)

```ts
github.packages.listDockerMigrationConflictingPackagesForOrganization(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<(Package)[]>
```

<sub>`GET /orgs/{org}/docker/conflicts` · `packages/list-docker-migration-conflicting-packages-for-organization`</sub>

## `github.packages.listPackagesForOrganization`

List packages for an organization — [API reference](https://docs.github.com/rest/packages/packages#list-packages-for-an-organization)

```ts
github.packages.listPackagesForOrganization(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The type of supported package. Packages in GitHub's Gradle registry have the type `maven`. Docker images pushed to GitHub's Container registry (`ghcr.io`) have the type `container`. You can use the type `docker` to find images that were pushed to GitHub's Docker registry (`docker.pkg.github.com`), even if these have now been migrated to the Container registry. */
  package_type: "npm" | "maven" | "rubygems" | "docker" | "nuget" | "container";
  /** The selected visibility of the packages.  This parameter is optional and only filters an existing result set.  The `internal` visibility is only supported for GitHub Packages registries that allow for granular permissions. For other ecosystems `internal` is synonymous with `private`. For the list of GitHub Packages registries that support granular permissions, see "[About permissions for GitHub Packages](https://docs.github.com/packages/learn-github-packages/about-permissions-for-github-packages#granular-permissions-for-userorganization-scoped-packages)." */
  visibility?: "public" | "private" | "internal";
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
}): Promise<(Package)[]>
```

<sub>`GET /orgs/{org}/packages` · `packages/list-packages-for-organization`</sub>

## `github.packages.deletePackageForOrg`

Delete a package for an organization — [API reference](https://docs.github.com/rest/packages/packages#delete-a-package-for-an-organization)

```ts
github.packages.deletePackageForOrg(input: {
  /** The type of supported package. Packages in GitHub's Gradle registry have the type `maven`. Docker images pushed to GitHub's Container registry (`ghcr.io`) have the type `container`. You can use the type `docker` to find images that were pushed to GitHub's Docker registry (`docker.pkg.github.com`), even if these have now been migrated to the Container registry. */
  package_type: "npm" | "maven" | "rubygems" | "docker" | "nuget" | "container";
  /** The name of the package. */
  package_name: string;
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<BasicError>
```

<sub>`DELETE /orgs/{org}/packages/{package_type}/{package_name}` · `packages/delete-package-for-org`</sub>

## `github.packages.getPackageForOrganization`

Get a package for an organization — [API reference](https://docs.github.com/rest/packages/packages#get-a-package-for-an-organization)

```ts
github.packages.getPackageForOrganization(input: {
  /** The type of supported package. Packages in GitHub's Gradle registry have the type `maven`. Docker images pushed to GitHub's Container registry (`ghcr.io`) have the type `container`. You can use the type `docker` to find images that were pushed to GitHub's Docker registry (`docker.pkg.github.com`), even if these have now been migrated to the Container registry. */
  package_type: "npm" | "maven" | "rubygems" | "docker" | "nuget" | "container";
  /** The name of the package. */
  package_name: string;
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<Package>
```

<sub>`GET /orgs/{org}/packages/{package_type}/{package_name}` · `packages/get-package-for-organization`</sub>

## `github.packages.restorePackageForOrg`

Restore a package for an organization — [API reference](https://docs.github.com/rest/packages/packages#restore-a-package-for-an-organization)

```ts
github.packages.restorePackageForOrg(input: {
  /** The type of supported package. Packages in GitHub's Gradle registry have the type `maven`. Docker images pushed to GitHub's Container registry (`ghcr.io`) have the type `container`. You can use the type `docker` to find images that were pushed to GitHub's Docker registry (`docker.pkg.github.com`), even if these have now been migrated to the Container registry. */
  package_type: "npm" | "maven" | "rubygems" | "docker" | "nuget" | "container";
  /** The name of the package. */
  package_name: string;
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** package token */
  token?: string;
}): Promise<BasicError>
```

<sub>`POST /orgs/{org}/packages/{package_type}/{package_name}/restore` · `packages/restore-package-for-org`</sub>

## `github.packages.getAllPackageVersionsForPackageOwnedByOrg`

List package versions for a package owned by an organization — [API reference](https://docs.github.com/rest/packages/packages#list-package-versions-for-a-package-owned-by-an-organization)

```ts
github.packages.getAllPackageVersionsForPackageOwnedByOrg(input: {
  /** The type of supported package. Packages in GitHub's Gradle registry have the type `maven`. Docker images pushed to GitHub's Container registry (`ghcr.io`) have the type `container`. You can use the type `docker` to find images that were pushed to GitHub's Docker registry (`docker.pkg.github.com`), even if these have now been migrated to the Container registry. */
  package_type: "npm" | "maven" | "rubygems" | "docker" | "nuget" | "container";
  /** The name of the package. */
  package_name: string;
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The state of the package, either active or deleted. */
  state?: "active" | "deleted";
}): Promise<(PackageVersion)[]>
```

<sub>`GET /orgs/{org}/packages/{package_type}/{package_name}/versions` · `packages/get-all-package-versions-for-package-owned-by-org`</sub>

## `github.packages.deletePackageVersionForOrg`

Delete package version for an organization — [API reference](https://docs.github.com/rest/packages/packages#delete-package-version-for-an-organization)

```ts
github.packages.deletePackageVersionForOrg(input: {
  /** The type of supported package. Packages in GitHub's Gradle registry have the type `maven`. Docker images pushed to GitHub's Container registry (`ghcr.io`) have the type `container`. You can use the type `docker` to find images that were pushed to GitHub's Docker registry (`docker.pkg.github.com`), even if these have now been migrated to the Container registry. */
  package_type: "npm" | "maven" | "rubygems" | "docker" | "nuget" | "container";
  /** The name of the package. */
  package_name: string;
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** Unique identifier of the package version. */
  package_version_id: number;
}): Promise<BasicError>
```

<sub>`DELETE /orgs/{org}/packages/{package_type}/{package_name}/versions/{package_version_id}` · `packages/delete-package-version-for-org`</sub>

## `github.packages.getPackageVersionForOrganization`

Get a package version for an organization — [API reference](https://docs.github.com/rest/packages/packages#get-a-package-version-for-an-organization)

```ts
github.packages.getPackageVersionForOrganization(input: {
  /** The type of supported package. Packages in GitHub's Gradle registry have the type `maven`. Docker images pushed to GitHub's Container registry (`ghcr.io`) have the type `container`. You can use the type `docker` to find images that were pushed to GitHub's Docker registry (`docker.pkg.github.com`), even if these have now been migrated to the Container registry. */
  package_type: "npm" | "maven" | "rubygems" | "docker" | "nuget" | "container";
  /** The name of the package. */
  package_name: string;
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** Unique identifier of the package version. */
  package_version_id: number;
}): Promise<PackageVersion>
```

<sub>`GET /orgs/{org}/packages/{package_type}/{package_name}/versions/{package_version_id}` · `packages/get-package-version-for-organization`</sub>

## `github.packages.restorePackageVersionForOrg`

Restore package version for an organization — [API reference](https://docs.github.com/rest/packages/packages#restore-package-version-for-an-organization)

```ts
github.packages.restorePackageVersionForOrg(input: {
  /** The type of supported package. Packages in GitHub's Gradle registry have the type `maven`. Docker images pushed to GitHub's Container registry (`ghcr.io`) have the type `container`. You can use the type `docker` to find images that were pushed to GitHub's Docker registry (`docker.pkg.github.com`), even if these have now been migrated to the Container registry. */
  package_type: "npm" | "maven" | "rubygems" | "docker" | "nuget" | "container";
  /** The name of the package. */
  package_name: string;
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** Unique identifier of the package version. */
  package_version_id: number;
}): Promise<BasicError>
```

<sub>`POST /orgs/{org}/packages/{package_type}/{package_name}/versions/{package_version_id}/restore` · `packages/restore-package-version-for-org`</sub>

## `github.packages.listDockerMigrationConflictingPackagesForAuthenticatedUser`

Get list of conflicting packages during Docker migration for authenticated-user — [API reference](https://docs.github.com/rest/packages/packages#get-list-of-conflicting-packages-during-docker-migration-for-authenticated-user)

```ts
github.packages.listDockerMigrationConflictingPackagesForAuthenticatedUser(): Promise<(Package)[]>
```

<sub>`GET /user/docker/conflicts` · `packages/list-docker-migration-conflicting-packages-for-authenticated-user`</sub>

## `github.packages.listPackagesForAuthenticatedUser`

List packages for the authenticated user's namespace — [API reference](https://docs.github.com/rest/packages/packages#list-packages-for-the-authenticated-users-namespace)

```ts
github.packages.listPackagesForAuthenticatedUser(input: {
  /** The type of supported package. Packages in GitHub's Gradle registry have the type `maven`. Docker images pushed to GitHub's Container registry (`ghcr.io`) have the type `container`. You can use the type `docker` to find images that were pushed to GitHub's Docker registry (`docker.pkg.github.com`), even if these have now been migrated to the Container registry. */
  package_type: "npm" | "maven" | "rubygems" | "docker" | "nuget" | "container";
  /** The selected visibility of the packages.  This parameter is optional and only filters an existing result set.  The `internal` visibility is only supported for GitHub Packages registries that allow for granular permissions. For other ecosystems `internal` is synonymous with `private`. For the list of GitHub Packages registries that support granular permissions, see "[About permissions for GitHub Packages](https://docs.github.com/packages/learn-github-packages/about-permissions-for-github-packages#granular-permissions-for-userorganization-scoped-packages)." */
  visibility?: "public" | "private" | "internal";
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
}): Promise<(Package)[]>
```

<sub>`GET /user/packages` · `packages/list-packages-for-authenticated-user`</sub>

## `github.packages.deletePackageForAuthenticatedUser`

Delete a package for the authenticated user — [API reference](https://docs.github.com/rest/packages/packages#delete-a-package-for-the-authenticated-user)

```ts
github.packages.deletePackageForAuthenticatedUser(input: {
  /** The type of supported package. Packages in GitHub's Gradle registry have the type `maven`. Docker images pushed to GitHub's Container registry (`ghcr.io`) have the type `container`. You can use the type `docker` to find images that were pushed to GitHub's Docker registry (`docker.pkg.github.com`), even if these have now been migrated to the Container registry. */
  package_type: "npm" | "maven" | "rubygems" | "docker" | "nuget" | "container";
  /** The name of the package. */
  package_name: string;
}): Promise<BasicError>
```

<sub>`DELETE /user/packages/{package_type}/{package_name}` · `packages/delete-package-for-authenticated-user`</sub>

## `github.packages.getPackageForAuthenticatedUser`

Get a package for the authenticated user — [API reference](https://docs.github.com/rest/packages/packages#get-a-package-for-the-authenticated-user)

```ts
github.packages.getPackageForAuthenticatedUser(input: {
  /** The type of supported package. Packages in GitHub's Gradle registry have the type `maven`. Docker images pushed to GitHub's Container registry (`ghcr.io`) have the type `container`. You can use the type `docker` to find images that were pushed to GitHub's Docker registry (`docker.pkg.github.com`), even if these have now been migrated to the Container registry. */
  package_type: "npm" | "maven" | "rubygems" | "docker" | "nuget" | "container";
  /** The name of the package. */
  package_name: string;
}): Promise<Package>
```

<sub>`GET /user/packages/{package_type}/{package_name}` · `packages/get-package-for-authenticated-user`</sub>

## `github.packages.restorePackageForAuthenticatedUser`

Restore a package for the authenticated user — [API reference](https://docs.github.com/rest/packages/packages#restore-a-package-for-the-authenticated-user)

```ts
github.packages.restorePackageForAuthenticatedUser(input: {
  /** The type of supported package. Packages in GitHub's Gradle registry have the type `maven`. Docker images pushed to GitHub's Container registry (`ghcr.io`) have the type `container`. You can use the type `docker` to find images that were pushed to GitHub's Docker registry (`docker.pkg.github.com`), even if these have now been migrated to the Container registry. */
  package_type: "npm" | "maven" | "rubygems" | "docker" | "nuget" | "container";
  /** The name of the package. */
  package_name: string;
  /** package token */
  token?: string;
}): Promise<BasicError>
```

<sub>`POST /user/packages/{package_type}/{package_name}/restore` · `packages/restore-package-for-authenticated-user`</sub>

## `github.packages.getAllPackageVersionsForPackageOwnedByAuthenticatedUser`

List package versions for a package owned by the authenticated user — [API reference](https://docs.github.com/rest/packages/packages#list-package-versions-for-a-package-owned-by-the-authenticated-user)

```ts
github.packages.getAllPackageVersionsForPackageOwnedByAuthenticatedUser(input: {
  /** The type of supported package. Packages in GitHub's Gradle registry have the type `maven`. Docker images pushed to GitHub's Container registry (`ghcr.io`) have the type `container`. You can use the type `docker` to find images that were pushed to GitHub's Docker registry (`docker.pkg.github.com`), even if these have now been migrated to the Container registry. */
  package_type: "npm" | "maven" | "rubygems" | "docker" | "nuget" | "container";
  /** The name of the package. */
  package_name: string;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The state of the package, either active or deleted. */
  state?: "active" | "deleted";
}): Promise<(PackageVersion)[]>
```

<sub>`GET /user/packages/{package_type}/{package_name}/versions` · `packages/get-all-package-versions-for-package-owned-by-authenticated-user`</sub>

## `github.packages.deletePackageVersionForAuthenticatedUser`

Delete a package version for the authenticated user — [API reference](https://docs.github.com/rest/packages/packages#delete-a-package-version-for-the-authenticated-user)

```ts
github.packages.deletePackageVersionForAuthenticatedUser(input: {
  /** The type of supported package. Packages in GitHub's Gradle registry have the type `maven`. Docker images pushed to GitHub's Container registry (`ghcr.io`) have the type `container`. You can use the type `docker` to find images that were pushed to GitHub's Docker registry (`docker.pkg.github.com`), even if these have now been migrated to the Container registry. */
  package_type: "npm" | "maven" | "rubygems" | "docker" | "nuget" | "container";
  /** The name of the package. */
  package_name: string;
  /** Unique identifier of the package version. */
  package_version_id: number;
}): Promise<BasicError>
```

<sub>`DELETE /user/packages/{package_type}/{package_name}/versions/{package_version_id}` · `packages/delete-package-version-for-authenticated-user`</sub>

## `github.packages.getPackageVersionForAuthenticatedUser`

Get a package version for the authenticated user — [API reference](https://docs.github.com/rest/packages/packages#get-a-package-version-for-the-authenticated-user)

```ts
github.packages.getPackageVersionForAuthenticatedUser(input: {
  /** The type of supported package. Packages in GitHub's Gradle registry have the type `maven`. Docker images pushed to GitHub's Container registry (`ghcr.io`) have the type `container`. You can use the type `docker` to find images that were pushed to GitHub's Docker registry (`docker.pkg.github.com`), even if these have now been migrated to the Container registry. */
  package_type: "npm" | "maven" | "rubygems" | "docker" | "nuget" | "container";
  /** The name of the package. */
  package_name: string;
  /** Unique identifier of the package version. */
  package_version_id: number;
}): Promise<PackageVersion>
```

<sub>`GET /user/packages/{package_type}/{package_name}/versions/{package_version_id}` · `packages/get-package-version-for-authenticated-user`</sub>

## `github.packages.restorePackageVersionForAuthenticatedUser`

Restore a package version for the authenticated user — [API reference](https://docs.github.com/rest/packages/packages#restore-a-package-version-for-the-authenticated-user)

```ts
github.packages.restorePackageVersionForAuthenticatedUser(input: {
  /** The type of supported package. Packages in GitHub's Gradle registry have the type `maven`. Docker images pushed to GitHub's Container registry (`ghcr.io`) have the type `container`. You can use the type `docker` to find images that were pushed to GitHub's Docker registry (`docker.pkg.github.com`), even if these have now been migrated to the Container registry. */
  package_type: "npm" | "maven" | "rubygems" | "docker" | "nuget" | "container";
  /** The name of the package. */
  package_name: string;
  /** Unique identifier of the package version. */
  package_version_id: number;
}): Promise<BasicError>
```

<sub>`POST /user/packages/{package_type}/{package_name}/versions/{package_version_id}/restore` · `packages/restore-package-version-for-authenticated-user`</sub>

## `github.packages.listDockerMigrationConflictingPackagesForUser`

Get list of conflicting packages during Docker migration for user — [API reference](https://docs.github.com/rest/packages/packages#get-list-of-conflicting-packages-during-docker-migration-for-user)

```ts
github.packages.listDockerMigrationConflictingPackagesForUser(input: {
  /** The handle for the GitHub user account. */
  username: string;
}): Promise<(Package)[]>
```

<sub>`GET /users/{username}/docker/conflicts` · `packages/list-docker-migration-conflicting-packages-for-user`</sub>

## `github.packages.listPackagesForUser`

List packages for a user — [API reference](https://docs.github.com/rest/packages/packages#list-packages-for-a-user)

```ts
github.packages.listPackagesForUser(input: {
  /** The handle for the GitHub user account. */
  username: string;
  /** The type of supported package. Packages in GitHub's Gradle registry have the type `maven`. Docker images pushed to GitHub's Container registry (`ghcr.io`) have the type `container`. You can use the type `docker` to find images that were pushed to GitHub's Docker registry (`docker.pkg.github.com`), even if these have now been migrated to the Container registry. */
  package_type: "npm" | "maven" | "rubygems" | "docker" | "nuget" | "container";
  /** The selected visibility of the packages.  This parameter is optional and only filters an existing result set.  The `internal` visibility is only supported for GitHub Packages registries that allow for granular permissions. For other ecosystems `internal` is synonymous with `private`. For the list of GitHub Packages registries that support granular permissions, see "[About permissions for GitHub Packages](https://docs.github.com/packages/learn-github-packages/about-permissions-for-github-packages#granular-permissions-for-userorganization-scoped-packages)." */
  visibility?: "public" | "private" | "internal";
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
}): Promise<(Package)[]>
```

<sub>`GET /users/{username}/packages` · `packages/list-packages-for-user`</sub>

## `github.packages.deletePackageForUser`

Delete a package for a user — [API reference](https://docs.github.com/rest/packages/packages#delete-a-package-for-a-user)

```ts
github.packages.deletePackageForUser(input: {
  /** The type of supported package. Packages in GitHub's Gradle registry have the type `maven`. Docker images pushed to GitHub's Container registry (`ghcr.io`) have the type `container`. You can use the type `docker` to find images that were pushed to GitHub's Docker registry (`docker.pkg.github.com`), even if these have now been migrated to the Container registry. */
  package_type: "npm" | "maven" | "rubygems" | "docker" | "nuget" | "container";
  /** The name of the package. */
  package_name: string;
  /** The handle for the GitHub user account. */
  username: string;
}): Promise<BasicError>
```

<sub>`DELETE /users/{username}/packages/{package_type}/{package_name}` · `packages/delete-package-for-user`</sub>

## `github.packages.getPackageForUser`

Get a package for a user — [API reference](https://docs.github.com/rest/packages/packages#get-a-package-for-a-user)

```ts
github.packages.getPackageForUser(input: {
  /** The type of supported package. Packages in GitHub's Gradle registry have the type `maven`. Docker images pushed to GitHub's Container registry (`ghcr.io`) have the type `container`. You can use the type `docker` to find images that were pushed to GitHub's Docker registry (`docker.pkg.github.com`), even if these have now been migrated to the Container registry. */
  package_type: "npm" | "maven" | "rubygems" | "docker" | "nuget" | "container";
  /** The name of the package. */
  package_name: string;
  /** The handle for the GitHub user account. */
  username: string;
}): Promise<Package>
```

<sub>`GET /users/{username}/packages/{package_type}/{package_name}` · `packages/get-package-for-user`</sub>

## `github.packages.restorePackageForUser`

Restore a package for a user — [API reference](https://docs.github.com/rest/packages/packages#restore-a-package-for-a-user)

```ts
github.packages.restorePackageForUser(input: {
  /** The type of supported package. Packages in GitHub's Gradle registry have the type `maven`. Docker images pushed to GitHub's Container registry (`ghcr.io`) have the type `container`. You can use the type `docker` to find images that were pushed to GitHub's Docker registry (`docker.pkg.github.com`), even if these have now been migrated to the Container registry. */
  package_type: "npm" | "maven" | "rubygems" | "docker" | "nuget" | "container";
  /** The name of the package. */
  package_name: string;
  /** The handle for the GitHub user account. */
  username: string;
  /** package token */
  token?: string;
}): Promise<BasicError>
```

<sub>`POST /users/{username}/packages/{package_type}/{package_name}/restore` · `packages/restore-package-for-user`</sub>

## `github.packages.getAllPackageVersionsForPackageOwnedByUser`

List package versions for a package owned by a user — [API reference](https://docs.github.com/rest/packages/packages#list-package-versions-for-a-package-owned-by-a-user)

```ts
github.packages.getAllPackageVersionsForPackageOwnedByUser(input: {
  /** The type of supported package. Packages in GitHub's Gradle registry have the type `maven`. Docker images pushed to GitHub's Container registry (`ghcr.io`) have the type `container`. You can use the type `docker` to find images that were pushed to GitHub's Docker registry (`docker.pkg.github.com`), even if these have now been migrated to the Container registry. */
  package_type: "npm" | "maven" | "rubygems" | "docker" | "nuget" | "container";
  /** The name of the package. */
  package_name: string;
  /** The handle for the GitHub user account. */
  username: string;
}): Promise<(PackageVersion)[]>
```

<sub>`GET /users/{username}/packages/{package_type}/{package_name}/versions` · `packages/get-all-package-versions-for-package-owned-by-user`</sub>

## `github.packages.deletePackageVersionForUser`

Delete package version for a user — [API reference](https://docs.github.com/rest/packages/packages#delete-package-version-for-a-user)

```ts
github.packages.deletePackageVersionForUser(input: {
  /** The type of supported package. Packages in GitHub's Gradle registry have the type `maven`. Docker images pushed to GitHub's Container registry (`ghcr.io`) have the type `container`. You can use the type `docker` to find images that were pushed to GitHub's Docker registry (`docker.pkg.github.com`), even if these have now been migrated to the Container registry. */
  package_type: "npm" | "maven" | "rubygems" | "docker" | "nuget" | "container";
  /** The name of the package. */
  package_name: string;
  /** The handle for the GitHub user account. */
  username: string;
  /** Unique identifier of the package version. */
  package_version_id: number;
}): Promise<BasicError>
```

<sub>`DELETE /users/{username}/packages/{package_type}/{package_name}/versions/{package_version_id}` · `packages/delete-package-version-for-user`</sub>

## `github.packages.getPackageVersionForUser`

Get a package version for a user — [API reference](https://docs.github.com/rest/packages/packages#get-a-package-version-for-a-user)

```ts
github.packages.getPackageVersionForUser(input: {
  /** The type of supported package. Packages in GitHub's Gradle registry have the type `maven`. Docker images pushed to GitHub's Container registry (`ghcr.io`) have the type `container`. You can use the type `docker` to find images that were pushed to GitHub's Docker registry (`docker.pkg.github.com`), even if these have now been migrated to the Container registry. */
  package_type: "npm" | "maven" | "rubygems" | "docker" | "nuget" | "container";
  /** The name of the package. */
  package_name: string;
  /** Unique identifier of the package version. */
  package_version_id: number;
  /** The handle for the GitHub user account. */
  username: string;
}): Promise<PackageVersion>
```

<sub>`GET /users/{username}/packages/{package_type}/{package_name}/versions/{package_version_id}` · `packages/get-package-version-for-user`</sub>

## `github.packages.restorePackageVersionForUser`

Restore package version for a user — [API reference](https://docs.github.com/rest/packages/packages#restore-package-version-for-a-user)

```ts
github.packages.restorePackageVersionForUser(input: {
  /** The type of supported package. Packages in GitHub's Gradle registry have the type `maven`. Docker images pushed to GitHub's Container registry (`ghcr.io`) have the type `container`. You can use the type `docker` to find images that were pushed to GitHub's Docker registry (`docker.pkg.github.com`), even if these have now been migrated to the Container registry. */
  package_type: "npm" | "maven" | "rubygems" | "docker" | "nuget" | "container";
  /** The name of the package. */
  package_name: string;
  /** The handle for the GitHub user account. */
  username: string;
  /** Unique identifier of the package version. */
  package_version_id: number;
}): Promise<BasicError>
```

<sub>`POST /users/{username}/packages/{package_type}/{package_name}/versions/{package_version_id}/restore` · `packages/restore-package-version-for-user`</sub>

Named result types are exported from the package — hover them in your editor, or browse `types/schemas.ts`.

<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
