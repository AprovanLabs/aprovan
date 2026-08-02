export type MarkdownOperations = {
  /**
   * Render a Markdown document
   * @see https://docs.github.com/rest/markdown/markdown#render-a-markdown-document
   */
  render: (input: {
    /** The Markdown text to render in HTML. */
    text: string;
    /** The rendering mode. */
    mode?: "markdown" | "gfm";
    /** The repository context to use when creating references in `gfm` mode.  For example, setting `context` to `octo-org/octo-repo` will change the text `#42` into an HTML link to issue 42 in the `octo-org/octo-repo` repository. */
    context?: string;
  }) => Promise<string>;

  /**
   * Render a Markdown document in raw mode
   * @see https://docs.github.com/rest/markdown/markdown#render-a-markdown-document-in-raw-mode
   */
  renderRaw: (input: {
    body?: string;
  }) => Promise<string>;
};
