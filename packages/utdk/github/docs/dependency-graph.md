# Dependency Graph

5 operations · `@utdk/github`

```ts
import github from "@utdk/github";
```

## `github.dependencyGraph.diffRange`

Get a diff of the dependencies between commits — [API reference](https://docs.github.com/rest/dependency-graph/dependency-review#get-a-diff-of-the-dependencies-between-commits)

```ts
github.dependencyGraph.diffRange(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The base and head Git revisions to compare. The Git revisions will be resolved to commit SHAs. Named revisions will be resolved to their corresponding HEAD commits, and an appropriate merge base will be determined. This parameter expects the format `{base}...{head}`. */
  basehead: string;
  /** The full path, relative to the repository root, of the dependency manifest file. */
  name?: string;
}): Promise<DependencyGraphDiff>
```

<sub>`GET /repos/{owner}/{repo}/dependency-graph/compare/{basehead}` · `dependency-graph/diff-range`</sub>

## `github.dependencyGraph.exportSbom`

Export a software bill of materials (SBOM) for a repository. — [API reference](https://docs.github.com/rest/dependency-graph/sboms#export-a-software-bill-of-materials-sbom-for-a-repository)

```ts
github.dependencyGraph.exportSbom(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
}): Promise<DependencyGraphSpdxSbom>
```

<sub>`GET /repos/{owner}/{repo}/dependency-graph/sbom` · `dependency-graph/export-sbom`</sub>

## `github.dependencyGraph.fetchSbomReport`

Fetch a software bill of materials (SBOM) for a repository. — [API reference](https://docs.github.com/rest/dependency-graph/sboms#fetch-a-software-bill-of-materials-sbom-for-a-repository)

```ts
github.dependencyGraph.fetchSbomReport(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The unique identifier of the SBOM export. */
  sbom_uuid: string;
}): Promise<BasicError>
```

<sub>`GET /repos/{owner}/{repo}/dependency-graph/sbom/fetch-report/{sbom_uuid}` · `dependency-graph/fetch-sbom-report`</sub>

## `github.dependencyGraph.generateSbomReport`

Request generation of a software bill of materials (SBOM) for a repository. — [API reference](https://docs.github.com/rest/dependency-graph/sboms#request-generation-of-a-software-bill-of-materials-sbom-for-a-repository)

```ts
github.dependencyGraph.generateSbomReport(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
}): Promise<{ sbom_url?: string }>
```

<sub>`GET /repos/{owner}/{repo}/dependency-graph/sbom/generate-report` · `dependency-graph/generate-sbom-report`</sub>

## `github.dependencyGraph.createRepositorySnapshot`

Create a snapshot of dependencies for a repository — [API reference](https://docs.github.com/rest/dependency-graph/dependency-submission#create-a-snapshot-of-dependencies-for-a-repository)

```ts
github.dependencyGraph.createRepositorySnapshot(input: {
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
}): Promise<{ id: number; created_at: string; result: string; message: string }>
```

<sub>`POST /repos/{owner}/{repo}/dependency-graph/snapshots` · `dependency-graph/create-repository-snapshot`</sub>

Named result types are exported from the package — hover them in your editor, or browse `types/schemas.ts`.

<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
