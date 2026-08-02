# Git

13 operations · `@utdk/github`

```ts
import github from "@utdk/github";
```

## `github.git.createBlob`

Create a blob — [API reference](https://docs.github.com/rest/git/blobs#create-a-blob)

```ts
github.git.createBlob(input: {
  /** The new blob's content. */
  content: string;
  /** The encoding used for `content`. Currently, `"utf-8"` and `"base64"` are supported. */
  encoding?: string;
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
}): Promise<ShortBlob>
```

<sub>`POST /repos/{owner}/{repo}/git/blobs` · `git/create-blob`</sub>

## `github.git.getBlob`

Get a blob — [API reference](https://docs.github.com/rest/git/blobs#get-a-blob)

```ts
github.git.getBlob(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  file_sha: string;
}): Promise<Blob>
```

<sub>`GET /repos/{owner}/{repo}/git/blobs/{file_sha}` · `git/get-blob`</sub>

## `github.git.createCommit`

Create a commit — [API reference](https://docs.github.com/rest/git/commits#create-a-commit)

```ts
github.git.createCommit(input: {
  /** The commit message */
  message: string;
  /** The SHA of the tree object this commit points to */
  tree: string;
  /** The full SHAs of the commits that were the parents of this commit. If omitted or empty, the commit will be written as a root commit. For a single parent, an array of one SHA should be provided; for a merge commit, an array of more than one should be provided. */
  parents?: (string)[];
  /** Information about the author of the commit. By default, the `author` will be the authenticated user and the current date. See the `author` and `committer` object below for details. */
  author?: { name: string; email: string; date?: string };
  /** Information about the person who is making the commit. By default, `committer` will use the information set in `author`. See the `author` and `committer` object below for details. */
  committer?: { name?: string; email?: string; date?: string };
  /** The [PGP signature](https://en.wikipedia.org/wiki/Pretty_Good_Privacy) of the commit. GitHub adds the signature to the `gpgsig` header of the created commit. For a commit signature to be verifiable by Git or GitHub, it must be an ASCII-armored detached PGP signature over the string commit as it would be written to the object database. To pass a `signature` parameter, you need to first manually create a valid PGP signature, which can be complicated. You may find it easier to [use the command line](https://git-scm.com/book/id/v2/Git-Tools-Signing-Your-Work) to create signed commits. */
  signature?: string;
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
}): Promise<GitCommit>
```

<sub>`POST /repos/{owner}/{repo}/git/commits` · `git/create-commit`</sub>

## `github.git.getCommit`

Get a commit object — [API reference](https://docs.github.com/rest/git/commits#get-a-commit-object)

```ts
github.git.getCommit(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The SHA of the commit. */
  commit_sha: string;
}): Promise<GitCommit>
```

<sub>`GET /repos/{owner}/{repo}/git/commits/{commit_sha}` · `git/get-commit`</sub>

## `github.git.listMatchingRefs`

List matching references — [API reference](https://docs.github.com/rest/git/refs#list-matching-references)

```ts
github.git.listMatchingRefs(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The Git reference. For more information, see "[Git References](https://git-scm.com/book/en/v2/Git-Internals-Git-References)" in the Git documentation. */
  ref: string;
}): Promise<(GitRef)[]>
```

<sub>`GET /repos/{owner}/{repo}/git/matching-refs/{ref}` · `git/list-matching-refs`</sub>

## `github.git.getRef`

Get a reference — [API reference](https://docs.github.com/rest/git/refs#get-a-reference)

```ts
github.git.getRef(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The Git reference. For more information, see "[Git References](https://git-scm.com/book/en/v2/Git-Internals-Git-References)" in the Git documentation. */
  ref: string;
}): Promise<GitRef>
```

<sub>`GET /repos/{owner}/{repo}/git/ref/{ref}` · `git/get-ref`</sub>

## `github.git.createRef`

Create a reference — [API reference](https://docs.github.com/rest/git/refs#create-a-reference)

```ts
github.git.createRef(input: {
  /** The name of the fully qualified reference (ie: `refs/heads/master`). If it doesn't start with 'refs' and have at least two slashes, it will be rejected. */
  ref: string;
  /** The SHA1 value for this reference. */
  sha: string;
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
}): Promise<GitRef>
```

<sub>`POST /repos/{owner}/{repo}/git/refs` · `git/create-ref`</sub>

## `github.git.deleteRef`

Delete a reference — [API reference](https://docs.github.com/rest/git/refs#delete-a-reference)

```ts
github.git.deleteRef(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The Git reference. For more information, see "[Git References](https://git-scm.com/book/en/v2/Git-Internals-Git-References)" in the Git documentation. */
  ref: string;
}): Promise<BasicError>
```

<sub>`DELETE /repos/{owner}/{repo}/git/refs/{ref}` · `git/delete-ref`</sub>

## `github.git.updateRef`

Update a reference — [API reference](https://docs.github.com/rest/git/refs#update-a-reference)

```ts
github.git.updateRef(input: {
  /** The SHA1 value to set this reference to */
  sha: string;
  /** Indicates whether to force the update or to make sure the update is a fast-forward update. Leaving this out or setting it to `false` will make sure you're not overwriting work. */
  force?: boolean;
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The Git reference. For more information, see "[Git References](https://git-scm.com/book/en/v2/Git-Internals-Git-References)" in the Git documentation. */
  ref: string;
}): Promise<GitRef>
```

<sub>`PATCH /repos/{owner}/{repo}/git/refs/{ref}` · `git/update-ref`</sub>

## `github.git.createTag`

Create a tag object — [API reference](https://docs.github.com/rest/git/tags#create-a-tag-object)

```ts
github.git.createTag(input: {
  /** The tag's name. This is typically a version (e.g., "v0.0.1"). */
  tag: string;
  /** The tag message. */
  message: string;
  /** The SHA of the git object this is tagging. */
  object: string;
  /** The type of the object we're tagging. Normally this is a `commit` but it can also be a `tree` or a `blob`. */
  type: "commit" | "tree" | "blob";
  /** An object with information about the individual creating the tag. */
  tagger?: { name: string; email: string; date?: string };
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
}): Promise<GitTag>
```

<sub>`POST /repos/{owner}/{repo}/git/tags` · `git/create-tag`</sub>

## `github.git.getTag`

Get a tag — [API reference](https://docs.github.com/rest/git/tags#get-a-tag)

```ts
github.git.getTag(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  tag_sha: string;
}): Promise<GitTag>
```

<sub>`GET /repos/{owner}/{repo}/git/tags/{tag_sha}` · `git/get-tag`</sub>

## `github.git.createTree`

Create a tree — [API reference](https://docs.github.com/rest/git/trees#create-a-tree)

```ts
github.git.createTree(input: {
  /** Objects (of `path`, `mode`, `type`, and `sha`) specifying a tree structure. */
  tree: ({ path?: string; mode?: "100644" | "100755" | "040000" | "160000" | "120000"; type?: "blob" | "tree" | "commit"; sha?: string | null; content?: string })[];
  /** The SHA1 of an existing Git tree object which will be used as the base for the new tree. If provided, a new Git tree object will be created from entries in the Git tree object pointed to by `base_tree` and entries defined in the `tree` parameter. Entries defined in the `tree` parameter will overwrite items from `base_tree` with the same `path`. If you're creating new changes on a branch, then normally you'd set `base_tree` to the SHA1 of the Git tree object of the current latest commit on the branch you're working on. If not provided, GitHub will create a new Git tree object from only the entries defined in the `tree` parameter. If you create a new commit pointing to such a tree, then all files which were a part of the parent commit's tree and were not defined in the `tree` parameter will be listed as deleted by the new commit. */
  base_tree?: string;
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
}): Promise<GitTree>
```

<sub>`POST /repos/{owner}/{repo}/git/trees` · `git/create-tree`</sub>

## `github.git.getTree`

Get a tree — [API reference](https://docs.github.com/rest/git/trees#get-a-tree)

```ts
github.git.getTree(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The SHA1 value or ref (branch or tag) name of the tree. */
  tree_sha: string;
  /** Setting this parameter to any value returns the objects or subtrees referenced by the tree specified in `:tree_sha`. For example, setting `recursive` to any of the following will enable returning objects or subtrees: `0`, `1`, `"true"`, and `"false"`. Omit this parameter to prevent recursively returning objects or subtrees. */
  recursive?: string;
}): Promise<GitTree>
```

<sub>`GET /repos/{owner}/{repo}/git/trees/{tree_sha}` · `git/get-tree`</sub>

Named result types are exported from the package — hover them in your editor, or browse `types/schemas.ts`.

<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
