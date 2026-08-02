import type { BasicError, Package, PackageVersion } from "./schemas.js";

export type PackagesOperations = {
  /**
   * Get list of conflicting packages during Docker migration for organization
   * @see https://docs.github.com/rest/packages/packages#get-list-of-conflicting-packages-during-docker-migration-for-organization
   */
  listDockerMigrationConflictingPackagesForOrganization: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<(Package)[]>;

  /**
   * List packages for an organization
   * @see https://docs.github.com/rest/packages/packages#list-packages-for-an-organization
   */
  listPackagesForOrganization: (input: {
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
  }) => Promise<(Package)[]>;

  /**
   * Get a package for an organization
   * @see https://docs.github.com/rest/packages/packages#get-a-package-for-an-organization
   */
  getPackageForOrganization: (input: {
    /** The type of supported package. Packages in GitHub's Gradle registry have the type `maven`. Docker images pushed to GitHub's Container registry (`ghcr.io`) have the type `container`. You can use the type `docker` to find images that were pushed to GitHub's Docker registry (`docker.pkg.github.com`), even if these have now been migrated to the Container registry. */
    package_type: "npm" | "maven" | "rubygems" | "docker" | "nuget" | "container";
    /** The name of the package. */
    package_name: string;
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<Package>;

  /**
   * Delete a package for an organization
   * @see https://docs.github.com/rest/packages/packages#delete-a-package-for-an-organization
   */
  deletePackageForOrg: (input: {
    /** The type of supported package. Packages in GitHub's Gradle registry have the type `maven`. Docker images pushed to GitHub's Container registry (`ghcr.io`) have the type `container`. You can use the type `docker` to find images that were pushed to GitHub's Docker registry (`docker.pkg.github.com`), even if these have now been migrated to the Container registry. */
    package_type: "npm" | "maven" | "rubygems" | "docker" | "nuget" | "container";
    /** The name of the package. */
    package_name: string;
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<BasicError>;

  /**
   * Restore a package for an organization
   * @see https://docs.github.com/rest/packages/packages#restore-a-package-for-an-organization
   */
  restorePackageForOrg: (input: {
    /** The type of supported package. Packages in GitHub's Gradle registry have the type `maven`. Docker images pushed to GitHub's Container registry (`ghcr.io`) have the type `container`. You can use the type `docker` to find images that were pushed to GitHub's Docker registry (`docker.pkg.github.com`), even if these have now been migrated to the Container registry. */
    package_type: "npm" | "maven" | "rubygems" | "docker" | "nuget" | "container";
    /** The name of the package. */
    package_name: string;
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** package token */
    token?: string;
  }) => Promise<BasicError>;

  /**
   * List package versions for a package owned by an organization
   * @see https://docs.github.com/rest/packages/packages#list-package-versions-for-a-package-owned-by-an-organization
   */
  getAllPackageVersionsForPackageOwnedByOrg: (input: {
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
  }) => Promise<(PackageVersion)[]>;

  /**
   * Get a package version for an organization
   * @see https://docs.github.com/rest/packages/packages#get-a-package-version-for-an-organization
   */
  getPackageVersionForOrganization: (input: {
    /** The type of supported package. Packages in GitHub's Gradle registry have the type `maven`. Docker images pushed to GitHub's Container registry (`ghcr.io`) have the type `container`. You can use the type `docker` to find images that were pushed to GitHub's Docker registry (`docker.pkg.github.com`), even if these have now been migrated to the Container registry. */
    package_type: "npm" | "maven" | "rubygems" | "docker" | "nuget" | "container";
    /** The name of the package. */
    package_name: string;
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** Unique identifier of the package version. */
    package_version_id: number;
  }) => Promise<PackageVersion>;

  /**
   * Delete package version for an organization
   * @see https://docs.github.com/rest/packages/packages#delete-package-version-for-an-organization
   */
  deletePackageVersionForOrg: (input: {
    /** The type of supported package. Packages in GitHub's Gradle registry have the type `maven`. Docker images pushed to GitHub's Container registry (`ghcr.io`) have the type `container`. You can use the type `docker` to find images that were pushed to GitHub's Docker registry (`docker.pkg.github.com`), even if these have now been migrated to the Container registry. */
    package_type: "npm" | "maven" | "rubygems" | "docker" | "nuget" | "container";
    /** The name of the package. */
    package_name: string;
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** Unique identifier of the package version. */
    package_version_id: number;
  }) => Promise<BasicError>;

  /**
   * Restore package version for an organization
   * @see https://docs.github.com/rest/packages/packages#restore-package-version-for-an-organization
   */
  restorePackageVersionForOrg: (input: {
    /** The type of supported package. Packages in GitHub's Gradle registry have the type `maven`. Docker images pushed to GitHub's Container registry (`ghcr.io`) have the type `container`. You can use the type `docker` to find images that were pushed to GitHub's Docker registry (`docker.pkg.github.com`), even if these have now been migrated to the Container registry. */
    package_type: "npm" | "maven" | "rubygems" | "docker" | "nuget" | "container";
    /** The name of the package. */
    package_name: string;
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** Unique identifier of the package version. */
    package_version_id: number;
  }) => Promise<BasicError>;

  /**
   * Get list of conflicting packages during Docker migration for authenticated-user
   * @see https://docs.github.com/rest/packages/packages#get-list-of-conflicting-packages-during-docker-migration-for-authenticated-user
   */
  listDockerMigrationConflictingPackagesForAuthenticatedUser: () => Promise<(Package)[]>;

  /**
   * List packages for the authenticated user's namespace
   * @see https://docs.github.com/rest/packages/packages#list-packages-for-the-authenticated-users-namespace
   */
  listPackagesForAuthenticatedUser: (input: {
    /** The type of supported package. Packages in GitHub's Gradle registry have the type `maven`. Docker images pushed to GitHub's Container registry (`ghcr.io`) have the type `container`. You can use the type `docker` to find images that were pushed to GitHub's Docker registry (`docker.pkg.github.com`), even if these have now been migrated to the Container registry. */
    package_type: "npm" | "maven" | "rubygems" | "docker" | "nuget" | "container";
    /** The selected visibility of the packages.  This parameter is optional and only filters an existing result set.  The `internal` visibility is only supported for GitHub Packages registries that allow for granular permissions. For other ecosystems `internal` is synonymous with `private`. For the list of GitHub Packages registries that support granular permissions, see "[About permissions for GitHub Packages](https://docs.github.com/packages/learn-github-packages/about-permissions-for-github-packages#granular-permissions-for-userorganization-scoped-packages)." */
    visibility?: "public" | "private" | "internal";
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
  }) => Promise<(Package)[]>;

  /**
   * Get a package for the authenticated user
   * @see https://docs.github.com/rest/packages/packages#get-a-package-for-the-authenticated-user
   */
  getPackageForAuthenticatedUser: (input: {
    /** The type of supported package. Packages in GitHub's Gradle registry have the type `maven`. Docker images pushed to GitHub's Container registry (`ghcr.io`) have the type `container`. You can use the type `docker` to find images that were pushed to GitHub's Docker registry (`docker.pkg.github.com`), even if these have now been migrated to the Container registry. */
    package_type: "npm" | "maven" | "rubygems" | "docker" | "nuget" | "container";
    /** The name of the package. */
    package_name: string;
  }) => Promise<Package>;

  /**
   * Delete a package for the authenticated user
   * @see https://docs.github.com/rest/packages/packages#delete-a-package-for-the-authenticated-user
   */
  deletePackageForAuthenticatedUser: (input: {
    /** The type of supported package. Packages in GitHub's Gradle registry have the type `maven`. Docker images pushed to GitHub's Container registry (`ghcr.io`) have the type `container`. You can use the type `docker` to find images that were pushed to GitHub's Docker registry (`docker.pkg.github.com`), even if these have now been migrated to the Container registry. */
    package_type: "npm" | "maven" | "rubygems" | "docker" | "nuget" | "container";
    /** The name of the package. */
    package_name: string;
  }) => Promise<BasicError>;

  /**
   * Restore a package for the authenticated user
   * @see https://docs.github.com/rest/packages/packages#restore-a-package-for-the-authenticated-user
   */
  restorePackageForAuthenticatedUser: (input: {
    /** The type of supported package. Packages in GitHub's Gradle registry have the type `maven`. Docker images pushed to GitHub's Container registry (`ghcr.io`) have the type `container`. You can use the type `docker` to find images that were pushed to GitHub's Docker registry (`docker.pkg.github.com`), even if these have now been migrated to the Container registry. */
    package_type: "npm" | "maven" | "rubygems" | "docker" | "nuget" | "container";
    /** The name of the package. */
    package_name: string;
    /** package token */
    token?: string;
  }) => Promise<BasicError>;

  /**
   * List package versions for a package owned by the authenticated user
   * @see https://docs.github.com/rest/packages/packages#list-package-versions-for-a-package-owned-by-the-authenticated-user
   */
  getAllPackageVersionsForPackageOwnedByAuthenticatedUser: (input: {
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
  }) => Promise<(PackageVersion)[]>;

  /**
   * Get a package version for the authenticated user
   * @see https://docs.github.com/rest/packages/packages#get-a-package-version-for-the-authenticated-user
   */
  getPackageVersionForAuthenticatedUser: (input: {
    /** The type of supported package. Packages in GitHub's Gradle registry have the type `maven`. Docker images pushed to GitHub's Container registry (`ghcr.io`) have the type `container`. You can use the type `docker` to find images that were pushed to GitHub's Docker registry (`docker.pkg.github.com`), even if these have now been migrated to the Container registry. */
    package_type: "npm" | "maven" | "rubygems" | "docker" | "nuget" | "container";
    /** The name of the package. */
    package_name: string;
    /** Unique identifier of the package version. */
    package_version_id: number;
  }) => Promise<PackageVersion>;

  /**
   * Delete a package version for the authenticated user
   * @see https://docs.github.com/rest/packages/packages#delete-a-package-version-for-the-authenticated-user
   */
  deletePackageVersionForAuthenticatedUser: (input: {
    /** The type of supported package. Packages in GitHub's Gradle registry have the type `maven`. Docker images pushed to GitHub's Container registry (`ghcr.io`) have the type `container`. You can use the type `docker` to find images that were pushed to GitHub's Docker registry (`docker.pkg.github.com`), even if these have now been migrated to the Container registry. */
    package_type: "npm" | "maven" | "rubygems" | "docker" | "nuget" | "container";
    /** The name of the package. */
    package_name: string;
    /** Unique identifier of the package version. */
    package_version_id: number;
  }) => Promise<BasicError>;

  /**
   * Restore a package version for the authenticated user
   * @see https://docs.github.com/rest/packages/packages#restore-a-package-version-for-the-authenticated-user
   */
  restorePackageVersionForAuthenticatedUser: (input: {
    /** The type of supported package. Packages in GitHub's Gradle registry have the type `maven`. Docker images pushed to GitHub's Container registry (`ghcr.io`) have the type `container`. You can use the type `docker` to find images that were pushed to GitHub's Docker registry (`docker.pkg.github.com`), even if these have now been migrated to the Container registry. */
    package_type: "npm" | "maven" | "rubygems" | "docker" | "nuget" | "container";
    /** The name of the package. */
    package_name: string;
    /** Unique identifier of the package version. */
    package_version_id: number;
  }) => Promise<BasicError>;

  /**
   * Get list of conflicting packages during Docker migration for user
   * @see https://docs.github.com/rest/packages/packages#get-list-of-conflicting-packages-during-docker-migration-for-user
   */
  listDockerMigrationConflictingPackagesForUser: (input: {
    /** The handle for the GitHub user account. */
    username: string;
  }) => Promise<(Package)[]>;

  /**
   * List packages for a user
   * @see https://docs.github.com/rest/packages/packages#list-packages-for-a-user
   */
  listPackagesForUser: (input: {
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
  }) => Promise<(Package)[]>;

  /**
   * Get a package for a user
   * @see https://docs.github.com/rest/packages/packages#get-a-package-for-a-user
   */
  getPackageForUser: (input: {
    /** The type of supported package. Packages in GitHub's Gradle registry have the type `maven`. Docker images pushed to GitHub's Container registry (`ghcr.io`) have the type `container`. You can use the type `docker` to find images that were pushed to GitHub's Docker registry (`docker.pkg.github.com`), even if these have now been migrated to the Container registry. */
    package_type: "npm" | "maven" | "rubygems" | "docker" | "nuget" | "container";
    /** The name of the package. */
    package_name: string;
    /** The handle for the GitHub user account. */
    username: string;
  }) => Promise<Package>;

  /**
   * Delete a package for a user
   * @see https://docs.github.com/rest/packages/packages#delete-a-package-for-a-user
   */
  deletePackageForUser: (input: {
    /** The type of supported package. Packages in GitHub's Gradle registry have the type `maven`. Docker images pushed to GitHub's Container registry (`ghcr.io`) have the type `container`. You can use the type `docker` to find images that were pushed to GitHub's Docker registry (`docker.pkg.github.com`), even if these have now been migrated to the Container registry. */
    package_type: "npm" | "maven" | "rubygems" | "docker" | "nuget" | "container";
    /** The name of the package. */
    package_name: string;
    /** The handle for the GitHub user account. */
    username: string;
  }) => Promise<BasicError>;

  /**
   * Restore a package for a user
   * @see https://docs.github.com/rest/packages/packages#restore-a-package-for-a-user
   */
  restorePackageForUser: (input: {
    /** The type of supported package. Packages in GitHub's Gradle registry have the type `maven`. Docker images pushed to GitHub's Container registry (`ghcr.io`) have the type `container`. You can use the type `docker` to find images that were pushed to GitHub's Docker registry (`docker.pkg.github.com`), even if these have now been migrated to the Container registry. */
    package_type: "npm" | "maven" | "rubygems" | "docker" | "nuget" | "container";
    /** The name of the package. */
    package_name: string;
    /** The handle for the GitHub user account. */
    username: string;
    /** package token */
    token?: string;
  }) => Promise<BasicError>;

  /**
   * List package versions for a package owned by a user
   * @see https://docs.github.com/rest/packages/packages#list-package-versions-for-a-package-owned-by-a-user
   */
  getAllPackageVersionsForPackageOwnedByUser: (input: {
    /** The type of supported package. Packages in GitHub's Gradle registry have the type `maven`. Docker images pushed to GitHub's Container registry (`ghcr.io`) have the type `container`. You can use the type `docker` to find images that were pushed to GitHub's Docker registry (`docker.pkg.github.com`), even if these have now been migrated to the Container registry. */
    package_type: "npm" | "maven" | "rubygems" | "docker" | "nuget" | "container";
    /** The name of the package. */
    package_name: string;
    /** The handle for the GitHub user account. */
    username: string;
  }) => Promise<(PackageVersion)[]>;

  /**
   * Get a package version for a user
   * @see https://docs.github.com/rest/packages/packages#get-a-package-version-for-a-user
   */
  getPackageVersionForUser: (input: {
    /** The type of supported package. Packages in GitHub's Gradle registry have the type `maven`. Docker images pushed to GitHub's Container registry (`ghcr.io`) have the type `container`. You can use the type `docker` to find images that were pushed to GitHub's Docker registry (`docker.pkg.github.com`), even if these have now been migrated to the Container registry. */
    package_type: "npm" | "maven" | "rubygems" | "docker" | "nuget" | "container";
    /** The name of the package. */
    package_name: string;
    /** Unique identifier of the package version. */
    package_version_id: number;
    /** The handle for the GitHub user account. */
    username: string;
  }) => Promise<PackageVersion>;

  /**
   * Delete package version for a user
   * @see https://docs.github.com/rest/packages/packages#delete-package-version-for-a-user
   */
  deletePackageVersionForUser: (input: {
    /** The type of supported package. Packages in GitHub's Gradle registry have the type `maven`. Docker images pushed to GitHub's Container registry (`ghcr.io`) have the type `container`. You can use the type `docker` to find images that were pushed to GitHub's Docker registry (`docker.pkg.github.com`), even if these have now been migrated to the Container registry. */
    package_type: "npm" | "maven" | "rubygems" | "docker" | "nuget" | "container";
    /** The name of the package. */
    package_name: string;
    /** The handle for the GitHub user account. */
    username: string;
    /** Unique identifier of the package version. */
    package_version_id: number;
  }) => Promise<BasicError>;

  /**
   * Restore package version for a user
   * @see https://docs.github.com/rest/packages/packages#restore-package-version-for-a-user
   */
  restorePackageVersionForUser: (input: {
    /** The type of supported package. Packages in GitHub's Gradle registry have the type `maven`. Docker images pushed to GitHub's Container registry (`ghcr.io`) have the type `container`. You can use the type `docker` to find images that were pushed to GitHub's Docker registry (`docker.pkg.github.com`), even if these have now been migrated to the Container registry. */
    package_type: "npm" | "maven" | "rubygems" | "docker" | "nuget" | "container";
    /** The name of the package. */
    package_name: string;
    /** The handle for the GitHub user account. */
    username: string;
    /** Unique identifier of the package version. */
    package_version_id: number;
  }) => Promise<BasicError>;
};
