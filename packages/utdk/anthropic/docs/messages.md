# Messages

2 operations · `@utdk/anthropic`

```ts
import anthropic from "@utdk/anthropic";
```

## `anthropic.createMessage`

Create a message — [Provider docs](https://platform.claude.com/docs)

```ts
anthropic.createMessage(input: {
  /** Model id, e.g. claude-opus-4-8 */
  model: string;
  max_tokens: number;
  messages: (InputMessage)[];
  system?: string;
  thinking?: { type?: "adaptive" | "disabled"; display?: "summarized" | "omitted" };
  output_config?: { effort?: "low" | "medium" | "high" | "xhigh" | "max"; [key: string]: unknown };
  tools?: (Tool)[];
  tool_choice?: { [key: string]: unknown };
  stop_sequences?: (string)[];
  stream?: boolean;
  metadata?: { user_id?: string };
}, options: { headers: { "anthropic-version": string } }): Promise<Message>
```

<sub>`POST /v1/messages` · `createMessage`</sub>

## `anthropic.countTokens`

Count tokens in a message — [Provider docs](https://platform.claude.com/docs)

```ts
anthropic.countTokens(input: {
  model: string;
  messages: (InputMessage)[];
  system?: string;
  tools?: (Tool)[];
}, options: { headers: { "anthropic-version": string } }): Promise<{ input_tokens: number }>
```

<sub>`POST /v1/messages/count_tokens` · `countTokens`</sub>

Named result types are exported from the package — hover them in your editor, or browse `types/schemas.ts`.

<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
