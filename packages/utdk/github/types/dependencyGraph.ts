import type { BasicError, DependencyGraphDiff, DependencyGraphSpdxSbom, Manifest, Metadata } from "./schemas.js";

export type DependencyGraphOperations = {
  /**
   * Get a diff of the dependencies between commits
   * @see https://docs.github.com/rest/dependency-graph/dependency-review#get-a-diff-of-the-dependencies-between-commits
   */
  diffRange: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The base and head Git revisions to compare. The Git revisions will be resolved to commit SHAs. Named revisions will be resolved to their corresponding HEAD commits, and an appropriate merge base will be determined. This parameter expects the format `{base}...{head}`. */
    basehead: string;
    /** The full path, relative to the repository root, of the dependency manifest file. */
    name?: string;
  }) => Promise<DependencyGraphDiff>;

  /**
   * Export a software bill of materials (SBOM) for a repository.
   * @see https://docs.github.com/rest/dependency-graph/sboms#export-a-software-bill-of-materials-sbom-for-a-repository
   */
  exportSbom: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<DependencyGraphSpdxSbom>;

  /**
   * Fetch a software bill of materials (SBOM) for a repository.
   * @see https://docs.github.com/rest/dependency-graph/sboms#fetch-a-software-bill-of-materials-sbom-for-a-repository
   */
  fetchSbomReport: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The unique identifier of the SBOM export. */
    sbom_uuid: string;
  }) => Promise<BasicError>;

  /**
   * Request generation of a software bill of materials (SBOM) for a repository.
   * @see https://docs.github.com/rest/dependency-graph/sboms#request-generation-of-a-software-bill-of-materials-sbom-for-a-repository
   */
  generateSbomReport: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<{ sbom_url?: string }>;

  /**
   * Create a snapshot of dependencies for a repository
   * @see https://docs.github.com/rest/dependency-graph/dependency-submission#create-a-snapshot-of-dependencies-for-a-repository
   */
  createRepositorySnapshot: (input: {
    /** The version of the repository snapshot submission. */
    version: number;
    job: { id: string; correlator: string; html_url?: string };
    /** The commit SHA associated with this dependency snapshot. Maximum length: 40 characters. */
    sha: string;
    /** The repository branch that triggered this snapshot. */
    ref: string;
    /** A description of the detector used. */
    detector: { name: string; version: string; url: string };
    metadata?: Metadata;
    /** A collection of package manifests, which are a collection of related dependencies declared in a file or representing a logical group of dependencies. */
    manifests?: { [key: string]: Manifest | undefined };
    /** The time at which the snapshot was scanned. */
    scanned: string;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<{ id: number; created_at: string; result: string; message: string }>;
};
