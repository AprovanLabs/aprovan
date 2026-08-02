

export type NotionClient = {
  /**
   * Delete a block
   */
  deleteABlock: (input: {
    id: string;
  }, options?: { headers?: { "Notion-Version"?: string } }) => Promise<{ archived?: boolean; created_by?: { id?: string; object?: string }; created_time?: string; has_children?: boolean; id?: string; last_edited_by?: { id?: string; object?: string }; last_edited_time?: string; object?: string; paragraph?: { text?: ({ annotations?: { bold?: boolean; code?: boolean; color?: string; italic?: boolean; strikethrough?: boolean; underline?: boolean }; href?: unknown; plain_text?: string; text?: { content?: string; link?: unknown }; type?: string })[] }; type?: string }>;

  /**
   * Retrieve a block
   */
  retrieveABlock: (input: {
    id: string;
  }, options?: { headers?: { "Notion-Version"?: string } }) => Promise<{ created_time?: string; has_children?: boolean; id?: string; last_edited_time?: string; object?: string; paragraph?: { text?: ({ annotations?: { bold?: boolean; code?: boolean; color?: string; italic?: boolean; strikethrough?: boolean; underline?: boolean }; href?: unknown; plain_text?: string; text?: { content?: string; link?: unknown }; type?: string })[] }; type?: string }>;

  /**
   * Update a block
   */
  updateABlock: (input: {
    paragraph?: { rich_text?: ({ text?: { content?: string }; type?: string })[] };
    id: string;
  }, options?: { headers?: { "Notion-Version"?: string } }) => Promise<{ created_time?: string; has_children?: boolean; id?: string; last_edited_time?: string; object?: string; paragraph?: { text?: ({ annotations?: { bold?: boolean; code?: boolean; color?: string; italic?: boolean; strikethrough?: boolean; underline?: boolean }; href?: unknown; plain_text?: string; text?: { content?: string; link?: unknown }; type?: string })[] }; type?: string }>;

  /**
   * Retrieve block children
   */
  retrieveBlockChildren: (input: {
    id: string;
    page_size?: string;
  }, options?: { headers?: { "Notion-Version"?: string } }) => Promise<{ has_more?: boolean; next_cursor?: unknown; object?: string; results?: ({ created_time?: string; has_children?: boolean; id?: string; last_edited_time?: string; object?: string; paragraph?: { text?: ({ annotations?: { bold?: boolean; code?: boolean; color?: string; italic?: boolean; strikethrough?: boolean; underline?: boolean }; href?: unknown; plain_text?: string; text?: { content?: string; link?: unknown }; type?: string })[] }; type?: string; unsupported?: { [key: string]: unknown } })[] }>;

  /**
   * Append block children
   */
  appendBlockChildren: (input: {
    children?: ({ heading_2?: { text?: ({ text?: { content?: string }; type?: string })[] }; object?: string; paragraph?: { rich_text?: ({ text?: { content?: string; link?: { url?: string } }; type?: string })[] }; type?: string })[];
    id: string;
  }, options?: { headers?: { "Notion-Version"?: string } }) => Promise<{ child_page?: { title?: string }; created_time?: string; has_children?: boolean; id?: string; last_edited_time?: string; object?: string; type?: string }>;

  /**
   * Retrieve comments
   */
  retrieveComments: (input: {
    body?: { [key: string]: unknown };
    block_id?: string;
    page_size?: string;
  }, options?: { headers?: { "Notion-Version"?: string } }) => Promise<{ comment?: { [key: string]: unknown }; has_more?: boolean; next_cursor?: unknown; object?: string; results?: ({ created_by?: { id?: string; object?: string }; created_time?: string; discussion_id?: string; id?: string; last_edited_time?: string; object?: string; parent?: { block_id?: string; type?: string }; rich_text?: ({ annotations?: { bold?: boolean; code?: boolean; color?: string; italic?: boolean; strikethrough?: boolean; underline?: boolean }; href?: unknown; plain_text?: string; text?: { content?: string; link?: unknown }; type?: string })[] })[]; type?: string }>;

  /**
   * Retrieve a database
   */
  retrieveADatabase: (input: {
    id: string;
  }, options?: { headers?: { "Notion-Version"?: string } }) => Promise<{ archived?: boolean; cover?: unknown; created_by?: { id?: string; object?: string }; created_time?: string; icon?: unknown; id?: string; last_edited_by?: { id?: string; object?: string }; last_edited_time?: string; object?: string; parent?: { page_id?: string; type?: string }; properties?: { Author?: { id?: string; multi_select?: { options?: ({ color?: string; id?: string; name?: string })[] }; name?: string; type?: string }; Link?: { id?: string; name?: string; type?: string; url?: { [key: string]: unknown } }; Name?: { id?: string; name?: string; title?: { [key: string]: unknown }; type?: string }; Publisher?: { id?: string; name?: string; select?: { options?: ({ color?: string; id?: string; name?: string })[] }; type?: string }; "Publishing/Release Date"?: { date?: { [key: string]: unknown }; id?: string; name?: string; type?: string }; Read?: { checkbox?: { [key: string]: unknown }; id?: string; name?: string; type?: string }; "Score /5"?: { id?: string; name?: string; select?: { options?: ({ color?: string; id?: string; name?: string })[] }; type?: string }; Status?: { id?: string; name?: string; select?: { options?: ({ color?: string; id?: string; name?: string })[] }; type?: string }; Summary?: { id?: string; name?: string; rich_text?: { [key: string]: unknown }; type?: string }; Type?: { id?: string; name?: string; select?: { options?: ({ color?: string; id?: string; name?: string })[] }; type?: string } }; title?: ({ annotations?: { bold?: boolean; code?: boolean; color?: string; italic?: boolean; strikethrough?: boolean; underline?: boolean }; href?: unknown; plain_text?: string; text?: { content?: string; link?: unknown }; type?: string })[]; url?: string }>;

  /**
   * Update a database
   */
  updateADatabase: (input: {
    properties?: { "Wine Pairing"?: { rich_text?: { [key: string]: unknown } } };
    title?: ({ text?: { content?: string } })[];
    id: string;
  }, options?: { headers?: { "Notion-Version"?: string } }) => Promise<{ archived?: boolean; cover?: unknown; created_by?: { id?: string; object?: string }; created_time?: string; icon?: unknown; id?: string; last_edited_by?: { id?: string; object?: string }; last_edited_time?: string; object?: string; parent?: { page_id?: string; type?: string }; properties?: { Author?: { id?: string; multi_select?: { options?: ({ color?: string; id?: string; name?: string })[] }; name?: string; type?: string }; Link?: { id?: string; name?: string; type?: string; url?: { [key: string]: unknown } }; Name?: { id?: string; name?: string; title?: { [key: string]: unknown }; type?: string }; Publisher?: { id?: string; name?: string; select?: { options?: ({ color?: string; id?: string; name?: string })[] }; type?: string }; "Publishing/Release Date"?: { date?: { [key: string]: unknown }; id?: string; name?: string; type?: string }; Read?: { checkbox?: { [key: string]: unknown }; id?: string; name?: string; type?: string }; "Score /5"?: { id?: string; name?: string; select?: { options?: ({ color?: string; id?: string; name?: string })[] }; type?: string }; Status?: { id?: string; name?: string; select?: { options?: ({ color?: string; id?: string; name?: string })[] }; type?: string }; Summary?: { id?: string; name?: string; rich_text?: { [key: string]: unknown }; type?: string }; Type?: { id?: string; name?: string; select?: { options?: ({ color?: string; id?: string; name?: string })[] }; type?: string }; "Wine Pairing"?: { id?: string; name?: string; rich_text?: { [key: string]: unknown }; type?: string } }; title?: ({ annotations?: { bold?: boolean; code?: boolean; color?: string; italic?: boolean; strikethrough?: boolean; underline?: boolean }; href?: unknown; plain_text?: string; text?: { content?: string; link?: unknown }; type?: string })[]; url?: string }>;

  /**
   * Query a database
   */
  queryADatabase: (input: {
    filter?: { property?: string; select?: { equals?: string } };
    id: string;
  }, options?: { headers?: { "Notion-Version"?: string } }) => Promise<{ has_more?: boolean; next_cursor?: unknown; object?: string; results?: ({ archived?: boolean; cover?: unknown; created_by?: { id?: string; object?: string }; created_time?: string; icon?: unknown; id?: string; last_edited_by?: { id?: string; object?: string }; last_edited_time?: string; object?: string; parent?: { database_id?: string; type?: string }; properties?: { Author?: { id?: string; multi_select?: ({ color?: string; id?: string; name?: string })[]; type?: string }; Link?: { id?: string; type?: string; url?: string }; Name?: { id?: string; title?: ({ annotations?: { bold?: boolean; code?: boolean; color?: string; italic?: boolean; strikethrough?: boolean; underline?: boolean }; href?: unknown; plain_text?: string; text?: { content?: string; link?: unknown }; type?: string })[]; type?: string }; Publisher?: { id?: string; select?: { color?: string; id?: string; name?: string }; type?: string }; "Publishing/Release Date"?: { date?: { end?: unknown; start?: string; time_zone?: unknown }; id?: string; type?: string }; Read?: { checkbox?: boolean; id?: string; type?: string }; "Score /5"?: { id?: string; select?: { color?: string; id?: string; name?: string }; type?: string }; Status?: { id?: string; select?: { color?: string; id?: string; name?: string }; type?: string }; Summary?: { id?: string; rich_text?: (unknown)[]; type?: string }; Type?: { id?: string; select?: { color?: string; id?: string; name?: string }; type?: string } }; url?: string })[] }>;

  /**
   * Retrieve a Page
   */
  retrieveAPage: (input: {
    id: string;
  }, options?: { headers?: { "Notion-Version"?: string; ""?: string } }) => Promise<{ archived?: boolean; cover?: unknown; created_by?: { id?: string; object?: string }; created_time?: string; icon?: { emoji?: string; type?: string }; id?: string; last_edited_by?: { id?: string; object?: string }; last_edited_time?: string; object?: string; parent?: { page_id?: string; type?: string }; properties?: { title?: { id?: string; title?: ({ annotations?: { bold?: boolean; code?: boolean; color?: string; italic?: boolean; strikethrough?: boolean; underline?: boolean }; href?: unknown; plain_text?: string; text?: { content?: string; link?: unknown }; type?: string })[]; type?: string } }; url?: string }>;

  /**
   * Update Page properties 
   */
  updatePageProperties: (input: {
    properties?: { Status?: { select?: { name?: string } } };
    id: string;
  }, options?: { headers?: { "Notion-Version"?: string } }) => Promise<{ archived?: boolean; created_time?: string; id?: string; last_edited_time?: string; object?: string; parent?: { database_id?: string; type?: string }; properties?: { Author?: { id?: string; multi_select?: ({ color?: string; id?: string; name?: string })[]; type?: string }; Link?: { id?: string; type?: string; url?: string }; Name?: { id?: string; title?: ({ annotations?: { bold?: boolean; code?: boolean; color?: string; italic?: boolean; strikethrough?: boolean; underline?: boolean }; href?: unknown; plain_text?: string; text?: { content?: string; link?: unknown }; type?: string })[]; type?: string }; Publisher?: { id?: string; select?: { color?: string; id?: string; name?: string }; type?: string }; "Publishing/Release Date"?: { date?: { end?: unknown; start?: string }; id?: string; type?: string }; Read?: { checkbox?: boolean; id?: string; type?: string }; "Score /5"?: { id?: string; select?: { color?: string; id?: string; name?: string }; type?: string }; Status?: { id?: string; select?: { color?: string; id?: string; name?: string }; type?: string }; Summary?: { id?: string; rich_text?: ({ annotations?: { bold?: boolean; code?: boolean; color?: string; italic?: boolean; strikethrough?: boolean; underline?: boolean }; href?: unknown; plain_text?: string; text?: { content?: string; link?: unknown }; type?: string })[]; type?: string }; Type?: { id?: string; select?: { color?: string; id?: string; name?: string }; type?: string } } }>;

  /**
   * Retrieve a Page Property Item
   */
  retrieveAPagePropertyItem: (input: {
    page_id: string;
    property_id: string;
  }) => Promise<{ object?: string; select?: { color?: string; id?: string; name?: string }; type?: string }>;

  /**
   * Retrieve a user
   */
  retrieveAUser: (input: {
    body?: { [key: string]: unknown };
    id: string;
  }, options?: { headers?: { "Notion-Version"?: string } }) => Promise<{ avatar_url?: unknown; id?: string; name?: string; object?: string; person?: { email?: string }; type?: string }>;
};


