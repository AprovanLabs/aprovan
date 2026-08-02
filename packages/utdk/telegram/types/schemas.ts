/** This object represents an animation file (GIF or H.264/MPEG-4 AVC video without sound). */
export type Animation = {
  /** Duration of the video in seconds as defined by sender */
  duration: number;
  /** Identifier for this file, which can be used to download or reuse the file */
  file_id: string;
  /** *Optional*. Original animation filename as defined by sender */
  file_name?: string;
  /** *Optional*. File size */
  file_size?: number;
  /** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
  file_unique_id: string;
  /** Video height as defined by sender */
  height: number;
  /** *Optional*. MIME type of the file as defined by sender */
  mime_type?: string;
  thumb?: PhotoSize;
  /** Video width as defined by sender */
  width: number;
};

/** This object represents an audio file to be treated as music by the Telegram clients. */
export type Audio = {
  /** Duration of the audio in seconds as defined by sender */
  duration: number;
  /** Identifier for this file, which can be used to download or reuse the file */
  file_id: string;
  /** *Optional*. Original filename as defined by sender */
  file_name?: string;
  /** *Optional*. File size */
  file_size?: number;
  /** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
  file_unique_id: string;
  /** *Optional*. MIME type of the file as defined by sender */
  mime_type?: string;
  /** *Optional*. Performer of the audio as defined by sender or by audio tags */
  performer?: string;
  thumb?: PhotoSize;
  /** *Optional*. Title of the audio as defined by sender or by audio tags */
  title?: string;
};

/** This object represents a bot command. */
export type BotCommand = {
  /** Text of the command, 1-32 characters. Can contain only lowercase English letters, digits and underscores. */
  command: string;
  /** Description of the command, 3-256 characters. */
  description: string;
};

/** A placeholder, currently holds no information. Use [BotFather](https://t.me/botfather) to set up your game. */
export type CallbackGame = unknown;

/** This object represents an incoming callback query from a callback button in an [inline keyboard](/bots#inline-keyboards-and-on-the-fly-updating). If the button that originated the query was attached to a message sent by the bot, the field *message* will be present. If the button was attached to a message sent via the bot (in [inline mode](https://core.telegram.org/bots/api/#inline-mode)), the field *inline\_message\_id* will be present. Exactly one of the fields *data* or *game\_short\_name* will be present. */
export type CallbackQuery = {
  /** Global identifier, uniquely corresponding to the chat to which the message with the callback button was sent. Useful for high scores in [games](https://core.telegram.org/bots/api/#games). */
  chat_instance: string;
  /** *Optional*. Data associated with the callback button. Be aware that a bad client can send arbitrary data in this field. */
  data?: string;
  from: User;
  /** *Optional*. Short name of a [Game](https://core.telegram.org/bots/api/#games) to be returned, serves as the unique identifier for the game */
  game_short_name?: string;
  /** Unique identifier for this query */
  id: string;
  /** *Optional*. Identifier of the message sent via the bot in inline mode, that originated the query. */
  inline_message_id?: string;
  message?: Message;
};

/** This object represents a chat. */
export type Chat = {
  /** *Optional*. Bio of the other party in a private chat. Returned only in [getChat](https://core.telegram.org/bots/api/#getchat). */
  bio?: string;
  /** *Optional*. True, if the bot can change the group sticker set. Returned only in [getChat](https://core.telegram.org/bots/api/#getchat). */
  can_set_sticker_set?: boolean;
  /** *Optional*. Description, for groups, supergroups and channel chats. Returned only in [getChat](https://core.telegram.org/bots/api/#getchat). */
  description?: string;
  /** *Optional*. First name of the other party in a private chat */
  first_name?: string;
  /** Unique identifier for this chat. This number may be greater than 32 bits and some programming languages may have difficulty/silent defects in interpreting it. But it is smaller than 52 bits, so a signed 64 bit integer or double-precision float type are safe for storing this identifier. */
  id: number;
  /** *Optional*. Chat invite link, for groups, supergroups and channel chats. Each administrator in a chat generates their own invite links, so the bot must first generate the link using [exportChatInviteLink](https://core.telegram.org/bots/api/#exportchatinvitelink). Returned only in [getChat](https://core.telegram.org/bots/api/#getchat). */
  invite_link?: string;
  /** *Optional*. Last name of the other party in a private chat */
  last_name?: string;
  /** *Optional*. Unique identifier for the linked chat, i.e. the discussion group identifier for a channel and vice versa; for supergroups and channel chats. This identifier may be greater than 32 bits and some programming languages may have difficulty/silent defects in interpreting it. But it is smaller than 52 bits, so a signed 64 bit integer or double-precision float type are safe for storing this identifier. Returned only in [getChat](https://core.telegram.org/bots/api/#getchat). */
  linked_chat_id?: number;
  location?: ChatLocation;
  permissions?: ChatPermissions;
  photo?: ChatPhoto;
  pinned_message?: Message;
  /** *Optional*. For supergroups, the minimum allowed delay between consecutive messages sent by each unpriviledged user. Returned only in [getChat](https://core.telegram.org/bots/api/#getchat). */
  slow_mode_delay?: number;
  /** *Optional*. For supergroups, name of group sticker set. Returned only in [getChat](https://core.telegram.org/bots/api/#getchat). */
  sticker_set_name?: string;
  /** *Optional*. Title, for supergroups, channels and group chats */
  title?: string;
  /** Type of chat, can be either “private”, “group”, “supergroup” or “channel” */
  type: "private" | "group" | "supergroup" | "channel";
  /** *Optional*. Username, for private chats, supergroups and channels if available */
  username?: string;
};

/** Represents a location to which a chat is connected. */
export type ChatLocation = {
  /** Location address; 1-64 characters, as defined by the chat owner */
  address: string;
  location: Location;
};

/** This object contains information about one member of a chat. */
export type ChatMember = {
  /** *Optional*. Restricted only. True, if the user is allowed to add web page previews to their messages */
  can_add_web_page_previews?: boolean;
  /** *Optional*. Administrators only. True, if the bot is allowed to edit administrator privileges of that user */
  can_be_edited?: boolean;
  /** *Optional*. Administrators and restricted only. True, if the user is allowed to change the chat title, photo and other settings */
  can_change_info?: boolean;
  /** *Optional*. Administrators only. True, if the administrator can delete messages of other users */
  can_delete_messages?: boolean;
  /** *Optional*. Administrators only. True, if the administrator can edit messages of other users and can pin messages; channels only */
  can_edit_messages?: boolean;
  /** *Optional*. Administrators and restricted only. True, if the user is allowed to invite new users to the chat */
  can_invite_users?: boolean;
  /** *Optional*. Administrators and restricted only. True, if the user is allowed to pin messages; groups and supergroups only */
  can_pin_messages?: boolean;
  /** *Optional*. Administrators only. True, if the administrator can post in the channel; channels only */
  can_post_messages?: boolean;
  /** *Optional*. Administrators only. True, if the administrator can add new administrators with a subset of their own privileges or demote administrators that he has promoted, directly or indirectly (promoted by administrators that were appointed by the user) */
  can_promote_members?: boolean;
  /** *Optional*. Administrators only. True, if the administrator can restrict, ban or unban chat members */
  can_restrict_members?: boolean;
  /** *Optional*. Restricted only. True, if the user is allowed to send audios, documents, photos, videos, video notes and voice notes */
  can_send_media_messages?: boolean;
  /** *Optional*. Restricted only. True, if the user is allowed to send text messages, contacts, locations and venues */
  can_send_messages?: boolean;
  /** *Optional*. Restricted only. True, if the user is allowed to send animations, games, stickers and use inline bots */
  can_send_other_messages?: boolean;
  /** *Optional*. Restricted only. True, if the user is allowed to send polls */
  can_send_polls?: boolean;
  /** *Optional*. Owner and administrators only. Custom title for this user */
  custom_title?: string;
  /** *Optional*. Owner and administrators only. True, if the user's presence in the chat is hidden */
  is_anonymous?: boolean;
  /** *Optional*. Restricted only. True, if the user is a member of the chat at the moment of the request */
  is_member?: boolean;
  /** The member's status in the chat. Can be “creator”, “administrator”, “member”, “restricted”, “left” or “kicked” */
  status: "creator" | "administrator" | "member" | "restricted" | "left" | "kicked";
  /** *Optional*. Restricted and kicked only. Date when restrictions will be lifted for this user; unix time */
  until_date?: number;
  user: User;
};

/** Describes actions that a non-administrator user is allowed to take in a chat. */
export type ChatPermissions = {
  /** *Optional*. True, if the user is allowed to add web page previews to their messages, implies can\_send\_media\_messages */
  can_add_web_page_previews?: boolean;
  /** *Optional*. True, if the user is allowed to change the chat title, photo and other settings. Ignored in public supergroups */
  can_change_info?: boolean;
  /** *Optional*. True, if the user is allowed to invite new users to the chat */
  can_invite_users?: boolean;
  /** *Optional*. True, if the user is allowed to pin messages. Ignored in public supergroups */
  can_pin_messages?: boolean;
  /** *Optional*. True, if the user is allowed to send audios, documents, photos, videos, video notes and voice notes, implies can\_send\_messages */
  can_send_media_messages?: boolean;
  /** *Optional*. True, if the user is allowed to send text messages, contacts, locations and venues */
  can_send_messages?: boolean;
  /** *Optional*. True, if the user is allowed to send animations, games, stickers and use inline bots, implies can\_send\_media\_messages */
  can_send_other_messages?: boolean;
  /** *Optional*. True, if the user is allowed to send polls, implies can\_send\_messages */
  can_send_polls?: boolean;
};

/** This object represents a chat photo. */
export type ChatPhoto = {
  /** File identifier of big (640x640) chat photo. This file\_id can be used only for photo download and only for as long as the photo is not changed. */
  big_file_id: string;
  /** Unique file identifier of big (640x640) chat photo, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
  big_file_unique_id: string;
  /** File identifier of small (160x160) chat photo. This file\_id can be used only for photo download and only for as long as the photo is not changed. */
  small_file_id: string;
  /** Unique file identifier of small (160x160) chat photo, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
  small_file_unique_id: string;
};

/** Represents a [result](https://core.telegram.org/bots/api/#inlinequeryresult) of an inline query that was chosen by the user and sent to their chat partner. */
export type ChosenInlineResult = {
  from: User;
  /** *Optional*. Identifier of the sent inline message. Available only if there is an [inline keyboard](https://core.telegram.org/bots/api/#inlinekeyboardmarkup) attached to the message. Will be also received in [callback queries](https://core.telegram.org/bots/api/#callbackquery) and can be used to [edit](https://core.telegram.org/bots/api/#updating-messages) the message. */
  inline_message_id?: string;
  location?: Location;
  /** The query that was used to obtain the result */
  query: string;
  /** The unique identifier for the result that was chosen */
  result_id: string;
};

/** This object represents a phone contact. */
export type Contact = {
  /** Contact's first name */
  first_name: string;
  /** *Optional*. Contact's last name */
  last_name?: string;
  /** Contact's phone number */
  phone_number: string;
  /** *Optional*. Contact's user identifier in Telegram */
  user_id?: number;
  /** *Optional*. Additional data about the contact in the form of a [vCard](https://en.wikipedia.org/wiki/VCard) */
  vcard?: string;
};

/** This object represents an animated emoji that displays a random value. */
export type Dice = {
  /** Emoji on which the dice throw animation is based */
  emoji: string;
  /** Value of the dice, 1-6 for “<img alt="🎲" src="//telegram.org/img/emoji/40/F09F8EB2.png" height="20" width="20" />” and “<img alt="🎯" src="//telegram.org/img/emoji/40/F09F8EAF.png" height="20" width="20" />” base emoji, 1-5 for “<img alt="🏀" src="//telegram.org/img/emoji/40/F09F8F80.png" height="20" width="20" />” and “<img alt="⚽" src="//telegram.org/img/emoji/40/E29ABD.png" height="20" width="20" />” base emoji, 1-64 for “<img alt="🎰" src="//telegram.org/img/emoji/40/F09F8EB0.png" height="20" width="20" />” base emoji */
  value: number;
};

/** This object represents a general file (as opposed to [photos](https://core.telegram.org/bots/api/#photosize), [voice messages](https://core.telegram.org/bots/api/#voice) and [audio files](https://core.telegram.org/bots/api/#audio)). */
export type Document = {
  /** Identifier for this file, which can be used to download or reuse the file */
  file_id: string;
  /** *Optional*. Original filename as defined by sender */
  file_name?: string;
  /** *Optional*. File size */
  file_size?: number;
  /** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
  file_unique_id: string;
  /** *Optional*. MIME type of the file as defined by sender */
  mime_type?: string;
  thumb?: PhotoSize;
};

/** Contains data required for decrypting and authenticating [EncryptedPassportElement](https://core.telegram.org/bots/api/#encryptedpassportelement). See the [Telegram Passport Documentation](https://core.telegram.org/passport#receiving-information) for a complete description of the data decryption and authentication processes. */
export type EncryptedCredentials = {
  /** Base64-encoded encrypted JSON-serialized data with unique user's payload, data hashes and secrets required for [EncryptedPassportElement](https://core.telegram.org/bots/api/#encryptedpassportelement) decryption and authentication */
  data: string;
  /** Base64-encoded data hash for data authentication */
  hash: string;
  /** Base64-encoded secret, encrypted with the bot's public RSA key, required for data decryption */
  secret: string;
};

/** Contains information about documents or other Telegram Passport elements shared with the bot by the user. */
export type EncryptedPassportElement = {
  /** *Optional*. Base64-encoded encrypted Telegram Passport element data provided by the user, available for “personal\_details”, “passport”, “driver\_license”, “identity\_card”, “internal\_passport” and “address” types. Can be decrypted and verified using the accompanying [EncryptedCredentials](https://core.telegram.org/bots/api/#encryptedcredentials). */
  data?: string;
  /** *Optional*. User's verified email address, available only for “email” type */
  email?: string;
  /** *Optional*. Array of encrypted files with documents provided by the user, available for “utility\_bill”, “bank\_statement”, “rental\_agreement”, “passport\_registration” and “temporary\_registration” types. Files can be decrypted and verified using the accompanying [EncryptedCredentials](https://core.telegram.org/bots/api/#encryptedcredentials). */
  files?: (PassportFile)[];
  front_side?: PassportFile;
  /** Base64-encoded element hash for using in [PassportElementErrorUnspecified](https://core.telegram.org/bots/api/#passportelementerrorunspecified) */
  hash: string;
  /** *Optional*. User's verified phone number, available only for “phone\_number” type */
  phone_number?: string;
  reverse_side?: PassportFile;
  selfie?: PassportFile;
  /** *Optional*. Array of encrypted files with translated versions of documents provided by the user. Available if requested for “passport”, “driver\_license”, “identity\_card”, “internal\_passport”, “utility\_bill”, “bank\_statement”, “rental\_agreement”, “passport\_registration” and “temporary\_registration” types. Files can be decrypted and verified using the accompanying [EncryptedCredentials](https://core.telegram.org/bots/api/#encryptedcredentials). */
  translation?: (PassportFile)[];
  /** Element type. One of “personal\_details”, “passport”, “driver\_license”, “identity\_card”, “internal\_passport”, “address”, “utility\_bill”, “bank\_statement”, “rental\_agreement”, “passport\_registration”, “temporary\_registration”, “phone\_number”, “email”. */
  type: "personal_details" | "passport" | "driver_license" | "identity_card" | "internal_passport" | "address" | "utility_bill" | "bank_statement" | "rental_agreement" | "passport_registration" | "temporary_registration" | "phone_number" | "email";
};

export type Error = {
  description: string;
  error_code: number;
  ok: boolean;
  parameters?: ResponseParameters;
};

/** This object represents a file ready to be downloaded. The file can be downloaded via the link `https://api.telegram.org/file/bot<token>/<file_path>`. It is guaranteed that the link will be valid for at least 1 hour. When the link expires, a new one can be requested by calling [getFile](https://core.telegram.org/bots/api/#getfile).  Maximum file size to download is 20 MB */
export type File = {
  /** Identifier for this file, which can be used to download or reuse the file */
  file_id: string;
  /** *Optional*. File path. Use `https://api.telegram.org/file/bot<token>/<file_path>` to get the file. */
  file_path?: string;
  /** *Optional*. File size, if known */
  file_size?: number;
  /** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
  file_unique_id: string;
};

/** Upon receiving a message with this object, Telegram clients will display a reply interface to the user (act as if the user has selected the bot's message and tapped 'Reply'). This can be extremely useful if you want to create user-friendly step-by-step interfaces without having to sacrifice [privacy mode](/bots#privacy-mode). */
export type ForceReply = {
  /** Shows reply interface to the user, as if they manually selected the bot's message and tapped 'Reply' */
  force_reply: boolean;
  /** *Optional*. Use this parameter if you want to force reply from specific users only. Targets: 1) users that are @mentioned in the *text* of the [Message](https://core.telegram.org/bots/api/#message) object; 2) if the bot's message is a reply (has *reply\_to\_message\_id*), sender of the original message. */
  selective?: boolean;
};

/** This object represents a game. Use BotFather to create and edit games, their short names will act as unique identifiers. */
export type Game = {
  animation?: Animation;
  /** Description of the game */
  description: string;
  /** Photo that will be displayed in the game message in chats. */
  photo: (PhotoSize)[];
  /** *Optional*. Brief description of the game or high scores included in the game message. Can be automatically edited to include current high scores for the game when the bot calls [setGameScore](https://core.telegram.org/bots/api/#setgamescore), or manually edited using [editMessageText](https://core.telegram.org/bots/api/#editmessagetext). 0-4096 characters. */
  text?: string;
  /** *Optional*. Special entities that appear in *text*, such as usernames, URLs, bot commands, etc. */
  text_entities?: (MessageEntity)[];
  /** Title of the game */
  title: string;
};

/** This object represents one row of the high scores table for a game. */
export type GameHighScore = {
  /** Position in high score table for the game */
  position: number;
  /** Score */
  score: number;
  user: User;
};

/** This object represents one button of an inline keyboard. You **must** use exactly one of the optional fields. */
export type InlineKeyboardButton = {
  /** *Optional*. Data to be sent in a [callback query](https://core.telegram.org/bots/api/#callbackquery) to the bot when button is pressed, 1-64 bytes */
  callback_data?: string;
  callback_game?: CallbackGame;
  login_url?: LoginUrl;
  /** *Optional*. Specify True, to send a [Pay button](https://core.telegram.org/bots/api/#payments).    **NOTE:** This type of button **must** always be the first button in the first row. */
  pay?: boolean;
  /** *Optional*. If set, pressing the button will prompt the user to select one of their chats, open that chat and insert the bot's username and the specified inline query in the input field. Can be empty, in which case just the bot's username will be inserted.    **Note:** This offers an easy way for users to start using your bot in [inline mode](/bots/inline) when they are currently in a private chat with it. Especially useful when combined with [*switch\_pm…*](https://core.telegram.org/bots/api/#answerinlinequery) actions – in this case the user will be automatically returned to the chat they switched from, skipping the chat selection screen. */
  switch_inline_query?: string;
  /** *Optional*. If set, pressing the button will insert the bot's username and the specified inline query in the current chat's input field. Can be empty, in which case only the bot's username will be inserted.    This offers a quick way for the user to open your bot in inline mode in the same chat – good for selecting something from multiple options. */
  switch_inline_query_current_chat?: string;
  /** Label text on the button */
  text: string;
  /** *Optional*. HTTP or tg:// url to be opened when button is pressed */
  url?: string;
};

/** This object represents an [inline keyboard](https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating) that appears right next to the message it belongs to. */
export type InlineKeyboardMarkup = {
  /** Array of button rows, each represented by an Array of [InlineKeyboardButton](https://core.telegram.org/bots/api/#inlinekeyboardbutton) objects */
  inline_keyboard: ((InlineKeyboardButton)[])[];
};

/** This object represents an incoming inline query. When the user sends an empty query, your bot could return some default or trending results. */
export type InlineQuery = {
  from: User;
  /** Unique identifier for this query */
  id: string;
  location?: Location;
  /** Offset of the results to be returned, can be controlled by the bot */
  offset: string;
  /** Text of the query (up to 256 characters) */
  query: string;
};

/** This object represents one result of an inline query. Telegram clients currently support results of the following 20 types: */
export type InlineQueryResult = InlineQueryResultCachedAudio | InlineQueryResultCachedDocument | InlineQueryResultCachedGif | InlineQueryResultCachedMpeg4Gif | InlineQueryResultCachedPhoto | InlineQueryResultCachedSticker | InlineQueryResultCachedVideo | InlineQueryResultCachedVoice | InlineQueryResultArticle | InlineQueryResultAudio | InlineQueryResultContact | InlineQueryResultGame | InlineQueryResultDocument | InlineQueryResultGif | InlineQueryResultLocation | InlineQueryResultMpeg4Gif | InlineQueryResultPhoto | InlineQueryResultVenue | InlineQueryResultVideo | InlineQueryResultVoice;

/** Represents a link to an article or web page. */
export type InlineQueryResultArticle = {
  /** *Optional*. Short description of the result */
  description?: string;
  /** *Optional*. Pass *True*, if you don't want the URL to be shown in the message */
  hide_url?: boolean;
  /** Unique identifier for this result, 1-64 Bytes */
  id: string;
  input_message_content: InputMessageContent;
  reply_markup?: InlineKeyboardMarkup;
  /** *Optional*. Thumbnail height */
  thumb_height?: number;
  /** *Optional*. Url of the thumbnail for the result */
  thumb_url?: string;
  /** *Optional*. Thumbnail width */
  thumb_width?: number;
  /** Title of the result */
  title: string;
  /** Type of the result, must be *article* */
  type: string;
  /** *Optional*. URL of the result */
  url?: string;
};

/** Represents a link to an MP3 audio file. By default, this audio file will be sent by the user. Alternatively, you can use *input\_message\_content* to send a message with the specified content instead of the audio. */
export type InlineQueryResultAudio = {
  /** *Optional*. Audio duration in seconds */
  audio_duration?: number;
  /** A valid URL for the audio file */
  audio_url: string;
  /** *Optional*. Caption, 0-1024 characters after entities parsing */
  caption?: string;
  /** *Optional*. List of special entities that appear in the caption, which can be specified instead of *parse\_mode* */
  caption_entities?: (MessageEntity)[];
  /** Unique identifier for this result, 1-64 bytes */
  id: string;
  input_message_content?: InputMessageContent;
  /** *Optional*. Mode for parsing entities in the audio caption. See [formatting options](https://core.telegram.org/bots/api/#formatting-options) for more details. */
  parse_mode?: string;
  /** *Optional*. Performer */
  performer?: string;
  reply_markup?: InlineKeyboardMarkup;
  /** Title */
  title: string;
  /** Type of the result, must be *audio* */
  type: string;
};

/** Represents a link to an MP3 audio file stored on the Telegram servers. By default, this audio file will be sent by the user. Alternatively, you can use *input\_message\_content* to send a message with the specified content instead of the audio. */
export type InlineQueryResultCachedAudio = {
  /** A valid file identifier for the audio file */
  audio_file_id: string;
  /** *Optional*. Caption, 0-1024 characters after entities parsing */
  caption?: string;
  /** *Optional*. List of special entities that appear in the caption, which can be specified instead of *parse\_mode* */
  caption_entities?: (MessageEntity)[];
  /** Unique identifier for this result, 1-64 bytes */
  id: string;
  input_message_content?: InputMessageContent;
  /** *Optional*. Mode for parsing entities in the audio caption. See [formatting options](https://core.telegram.org/bots/api/#formatting-options) for more details. */
  parse_mode?: string;
  reply_markup?: InlineKeyboardMarkup;
  /** Type of the result, must be *audio* */
  type: string;
};

/** Represents a link to a file stored on the Telegram servers. By default, this file will be sent by the user with an optional caption. Alternatively, you can use *input\_message\_content* to send a message with the specified content instead of the file. */
export type InlineQueryResultCachedDocument = {
  /** *Optional*. Caption of the document to be sent, 0-1024 characters after entities parsing */
  caption?: string;
  /** *Optional*. List of special entities that appear in the caption, which can be specified instead of *parse\_mode* */
  caption_entities?: (MessageEntity)[];
  /** *Optional*. Short description of the result */
  description?: string;
  /** A valid file identifier for the file */
  document_file_id: string;
  /** Unique identifier for this result, 1-64 bytes */
  id: string;
  input_message_content?: InputMessageContent;
  /** *Optional*. Mode for parsing entities in the document caption. See [formatting options](https://core.telegram.org/bots/api/#formatting-options) for more details. */
  parse_mode?: string;
  reply_markup?: InlineKeyboardMarkup;
  /** Title for the result */
  title: string;
  /** Type of the result, must be *document* */
  type: string;
};

/** Represents a link to an animated GIF file stored on the Telegram servers. By default, this animated GIF file will be sent by the user with an optional caption. Alternatively, you can use *input\_message\_content* to send a message with specified content instead of the animation. */
export type InlineQueryResultCachedGif = {
  /** *Optional*. Caption of the GIF file to be sent, 0-1024 characters after entities parsing */
  caption?: string;
  /** *Optional*. List of special entities that appear in the caption, which can be specified instead of *parse\_mode* */
  caption_entities?: (MessageEntity)[];
  /** A valid file identifier for the GIF file */
  gif_file_id: string;
  /** Unique identifier for this result, 1-64 bytes */
  id: string;
  input_message_content?: InputMessageContent;
  /** *Optional*. Mode for parsing entities in the caption. See [formatting options](https://core.telegram.org/bots/api/#formatting-options) for more details. */
  parse_mode?: string;
  reply_markup?: InlineKeyboardMarkup;
  /** *Optional*. Title for the result */
  title?: string;
  /** Type of the result, must be *gif* */
  type: string;
};

/** Represents a link to a video animation (H.264/MPEG-4 AVC video without sound) stored on the Telegram servers. By default, this animated MPEG-4 file will be sent by the user with an optional caption. Alternatively, you can use *input\_message\_content* to send a message with the specified content instead of the animation. */
export type InlineQueryResultCachedMpeg4Gif = {
  /** *Optional*. Caption of the MPEG-4 file to be sent, 0-1024 characters after entities parsing */
  caption?: string;
  /** *Optional*. List of special entities that appear in the caption, which can be specified instead of *parse\_mode* */
  caption_entities?: (MessageEntity)[];
  /** Unique identifier for this result, 1-64 bytes */
  id: string;
  input_message_content?: InputMessageContent;
  /** A valid file identifier for the MP4 file */
  mpeg4_file_id: string;
  /** *Optional*. Mode for parsing entities in the caption. See [formatting options](https://core.telegram.org/bots/api/#formatting-options) for more details. */
  parse_mode?: string;
  reply_markup?: InlineKeyboardMarkup;
  /** *Optional*. Title for the result */
  title?: string;
  /** Type of the result, must be *mpeg4\_gif* */
  type: string;
};

/** Represents a link to a photo stored on the Telegram servers. By default, this photo will be sent by the user with an optional caption. Alternatively, you can use *input\_message\_content* to send a message with the specified content instead of the photo. */
export type InlineQueryResultCachedPhoto = {
  /** *Optional*. Caption of the photo to be sent, 0-1024 characters after entities parsing */
  caption?: string;
  /** *Optional*. List of special entities that appear in the caption, which can be specified instead of *parse\_mode* */
  caption_entities?: (MessageEntity)[];
  /** *Optional*. Short description of the result */
  description?: string;
  /** Unique identifier for this result, 1-64 bytes */
  id: string;
  input_message_content?: InputMessageContent;
  /** *Optional*. Mode for parsing entities in the photo caption. See [formatting options](https://core.telegram.org/bots/api/#formatting-options) for more details. */
  parse_mode?: string;
  /** A valid file identifier of the photo */
  photo_file_id: string;
  reply_markup?: InlineKeyboardMarkup;
  /** *Optional*. Title for the result */
  title?: string;
  /** Type of the result, must be *photo* */
  type: string;
};

/** Represents a link to a sticker stored on the Telegram servers. By default, this sticker will be sent by the user. Alternatively, you can use *input\_message\_content* to send a message with the specified content instead of the sticker. */
export type InlineQueryResultCachedSticker = {
  /** Unique identifier for this result, 1-64 bytes */
  id: string;
  input_message_content?: InputMessageContent;
  reply_markup?: InlineKeyboardMarkup;
  /** A valid file identifier of the sticker */
  sticker_file_id: string;
  /** Type of the result, must be *sticker* */
  type: string;
};

/** Represents a link to a video file stored on the Telegram servers. By default, this video file will be sent by the user with an optional caption. Alternatively, you can use *input\_message\_content* to send a message with the specified content instead of the video. */
export type InlineQueryResultCachedVideo = {
  /** *Optional*. Caption of the video to be sent, 0-1024 characters after entities parsing */
  caption?: string;
  /** *Optional*. List of special entities that appear in the caption, which can be specified instead of *parse\_mode* */
  caption_entities?: (MessageEntity)[];
  /** *Optional*. Short description of the result */
  description?: string;
  /** Unique identifier for this result, 1-64 bytes */
  id: string;
  input_message_content?: InputMessageContent;
  /** *Optional*. Mode for parsing entities in the video caption. See [formatting options](https://core.telegram.org/bots/api/#formatting-options) for more details. */
  parse_mode?: string;
  reply_markup?: InlineKeyboardMarkup;
  /** Title for the result */
  title: string;
  /** Type of the result, must be *video* */
  type: string;
  /** A valid file identifier for the video file */
  video_file_id: string;
};

/** Represents a link to a voice message stored on the Telegram servers. By default, this voice message will be sent by the user. Alternatively, you can use *input\_message\_content* to send a message with the specified content instead of the voice message. */
export type InlineQueryResultCachedVoice = {
  /** *Optional*. Caption, 0-1024 characters after entities parsing */
  caption?: string;
  /** *Optional*. List of special entities that appear in the caption, which can be specified instead of *parse\_mode* */
  caption_entities?: (MessageEntity)[];
  /** Unique identifier for this result, 1-64 bytes */
  id: string;
  input_message_content?: InputMessageContent;
  /** *Optional*. Mode for parsing entities in the voice message caption. See [formatting options](https://core.telegram.org/bots/api/#formatting-options) for more details. */
  parse_mode?: string;
  reply_markup?: InlineKeyboardMarkup;
  /** Voice message title */
  title: string;
  /** Type of the result, must be *voice* */
  type: string;
  /** A valid file identifier for the voice message */
  voice_file_id: string;
};

/** Represents a contact with a phone number. By default, this contact will be sent by the user. Alternatively, you can use *input\_message\_content* to send a message with the specified content instead of the contact. */
export type InlineQueryResultContact = {
  /** Contact's first name */
  first_name: string;
  /** Unique identifier for this result, 1-64 Bytes */
  id: string;
  input_message_content?: InputMessageContent;
  /** *Optional*. Contact's last name */
  last_name?: string;
  /** Contact's phone number */
  phone_number: string;
  reply_markup?: InlineKeyboardMarkup;
  /** *Optional*. Thumbnail height */
  thumb_height?: number;
  /** *Optional*. Url of the thumbnail for the result */
  thumb_url?: string;
  /** *Optional*. Thumbnail width */
  thumb_width?: number;
  /** Type of the result, must be *contact* */
  type: string;
  /** *Optional*. Additional data about the contact in the form of a [vCard](https://en.wikipedia.org/wiki/VCard), 0-2048 bytes */
  vcard?: string;
};

/** Represents a link to a file. By default, this file will be sent by the user with an optional caption. Alternatively, you can use *input\_message\_content* to send a message with the specified content instead of the file. Currently, only **.PDF** and **.ZIP** files can be sent using this method. */
export type InlineQueryResultDocument = {
  /** *Optional*. Caption of the document to be sent, 0-1024 characters after entities parsing */
  caption?: string;
  /** *Optional*. List of special entities that appear in the caption, which can be specified instead of *parse\_mode* */
  caption_entities?: (MessageEntity)[];
  /** *Optional*. Short description of the result */
  description?: string;
  /** A valid URL for the file */
  document_url: string;
  /** Unique identifier for this result, 1-64 bytes */
  id: string;
  input_message_content?: InputMessageContent;
  /** Mime type of the content of the file, either “application/pdf” or “application/zip” */
  mime_type: "application/pdf" | "application/zip";
  /** *Optional*. Mode for parsing entities in the document caption. See [formatting options](https://core.telegram.org/bots/api/#formatting-options) for more details. */
  parse_mode?: string;
  reply_markup?: InlineKeyboardMarkup;
  /** *Optional*. Thumbnail height */
  thumb_height?: number;
  /** *Optional*. URL of the thumbnail (jpeg only) for the file */
  thumb_url?: string;
  /** *Optional*. Thumbnail width */
  thumb_width?: number;
  /** Title for the result */
  title: string;
  /** Type of the result, must be *document* */
  type: string;
};

/** Represents a [Game](https://core.telegram.org/bots/api/#games). */
export type InlineQueryResultGame = {
  /** Short name of the game */
  game_short_name: string;
  /** Unique identifier for this result, 1-64 bytes */
  id: string;
  reply_markup?: InlineKeyboardMarkup;
  /** Type of the result, must be *game* */
  type: string;
};

/** Represents a link to an animated GIF file. By default, this animated GIF file will be sent by the user with optional caption. Alternatively, you can use *input\_message\_content* to send a message with the specified content instead of the animation. */
export type InlineQueryResultGif = {
  /** *Optional*. Caption of the GIF file to be sent, 0-1024 characters after entities parsing */
  caption?: string;
  /** *Optional*. List of special entities that appear in the caption, which can be specified instead of *parse\_mode* */
  caption_entities?: (MessageEntity)[];
  /** *Optional*. Duration of the GIF */
  gif_duration?: number;
  /** *Optional*. Height of the GIF */
  gif_height?: number;
  /** A valid URL for the GIF file. File size must not exceed 1MB */
  gif_url: string;
  /** *Optional*. Width of the GIF */
  gif_width?: number;
  /** Unique identifier for this result, 1-64 bytes */
  id: string;
  input_message_content?: InputMessageContent;
  /** *Optional*. Mode for parsing entities in the caption. See [formatting options](https://core.telegram.org/bots/api/#formatting-options) for more details. */
  parse_mode?: string;
  reply_markup?: InlineKeyboardMarkup;
  /** *Optional*. MIME type of the thumbnail, must be one of “image/jpeg”, “image/gif”, or “video/mp4”. Defaults to “image/jpeg” */
  thumb_mime_type?: "image/jpeg" | "image/gif" | "video/mp4";
  /** URL of the static (JPEG or GIF) or animated (MPEG4) thumbnail for the result */
  thumb_url: string;
  /** *Optional*. Title for the result */
  title?: string;
  /** Type of the result, must be *gif* */
  type: string;
};

/** Represents a location on a map. By default, the location will be sent by the user. Alternatively, you can use *input\_message\_content* to send a message with the specified content instead of the location. */
export type InlineQueryResultLocation = {
  /** *Optional*. For live locations, a direction in which the user is moving, in degrees. Must be between 1 and 360 if specified. */
  heading?: number;
  /** *Optional*. The radius of uncertainty for the location, measured in meters; 0-1500 */
  horizontal_accuracy?: number;
  /** Unique identifier for this result, 1-64 Bytes */
  id: string;
  input_message_content?: InputMessageContent;
  /** Location latitude in degrees */
  latitude: number;
  /** *Optional*. Period in seconds for which the location can be updated, should be between 60 and 86400. */
  live_period?: number;
  /** Location longitude in degrees */
  longitude: number;
  /** *Optional*. For live locations, a maximum distance for proximity alerts about approaching another chat member, in meters. Must be between 1 and 100000 if specified. */
  proximity_alert_radius?: number;
  reply_markup?: InlineKeyboardMarkup;
  /** *Optional*. Thumbnail height */
  thumb_height?: number;
  /** *Optional*. Url of the thumbnail for the result */
  thumb_url?: string;
  /** *Optional*. Thumbnail width */
  thumb_width?: number;
  /** Location title */
  title: string;
  /** Type of the result, must be *location* */
  type: string;
};

/** Represents a link to a video animation (H.264/MPEG-4 AVC video without sound). By default, this animated MPEG-4 file will be sent by the user with optional caption. Alternatively, you can use *input\_message\_content* to send a message with the specified content instead of the animation. */
export type InlineQueryResultMpeg4Gif = {
  /** *Optional*. Caption of the MPEG-4 file to be sent, 0-1024 characters after entities parsing */
  caption?: string;
  /** *Optional*. List of special entities that appear in the caption, which can be specified instead of *parse\_mode* */
  caption_entities?: (MessageEntity)[];
  /** Unique identifier for this result, 1-64 bytes */
  id: string;
  input_message_content?: InputMessageContent;
  /** *Optional*. Video duration */
  mpeg4_duration?: number;
  /** *Optional*. Video height */
  mpeg4_height?: number;
  /** A valid URL for the MP4 file. File size must not exceed 1MB */
  mpeg4_url: string;
  /** *Optional*. Video width */
  mpeg4_width?: number;
  /** *Optional*. Mode for parsing entities in the caption. See [formatting options](https://core.telegram.org/bots/api/#formatting-options) for more details. */
  parse_mode?: string;
  reply_markup?: InlineKeyboardMarkup;
  /** *Optional*. MIME type of the thumbnail, must be one of “image/jpeg”, “image/gif”, or “video/mp4”. Defaults to “image/jpeg” */
  thumb_mime_type?: "image/jpeg" | "image/gif" | "video/mp4";
  /** URL of the static (JPEG or GIF) or animated (MPEG4) thumbnail for the result */
  thumb_url: string;
  /** *Optional*. Title for the result */
  title?: string;
  /** Type of the result, must be *mpeg4\_gif* */
  type: string;
};

/** Represents a link to a photo. By default, this photo will be sent by the user with optional caption. Alternatively, you can use *input\_message\_content* to send a message with the specified content instead of the photo. */
export type InlineQueryResultPhoto = {
  /** *Optional*. Caption of the photo to be sent, 0-1024 characters after entities parsing */
  caption?: string;
  /** *Optional*. List of special entities that appear in the caption, which can be specified instead of *parse\_mode* */
  caption_entities?: (MessageEntity)[];
  /** *Optional*. Short description of the result */
  description?: string;
  /** Unique identifier for this result, 1-64 bytes */
  id: string;
  input_message_content?: InputMessageContent;
  /** *Optional*. Mode for parsing entities in the photo caption. See [formatting options](https://core.telegram.org/bots/api/#formatting-options) for more details. */
  parse_mode?: string;
  /** *Optional*. Height of the photo */
  photo_height?: number;
  /** A valid URL of the photo. Photo must be in **jpeg** format. Photo size must not exceed 5MB */
  photo_url: string;
  /** *Optional*. Width of the photo */
  photo_width?: number;
  reply_markup?: InlineKeyboardMarkup;
  /** URL of the thumbnail for the photo */
  thumb_url: string;
  /** *Optional*. Title for the result */
  title?: string;
  /** Type of the result, must be *photo* */
  type: string;
};

/** Represents a venue. By default, the venue will be sent by the user. Alternatively, you can use *input\_message\_content* to send a message with the specified content instead of the venue. */
export type InlineQueryResultVenue = {
  /** Address of the venue */
  address: string;
  /** *Optional*. Foursquare identifier of the venue if known */
  foursquare_id?: string;
  /** *Optional*. Foursquare type of the venue, if known. (For example, “arts\_entertainment/default”, “arts\_entertainment/aquarium” or “food/icecream”.) */
  foursquare_type?: string;
  /** *Optional*. Google Places identifier of the venue */
  google_place_id?: string;
  /** *Optional*. Google Places type of the venue. (See [supported types](https://developers.google.com/places/web-service/supported_types).) */
  google_place_type?: string;
  /** Unique identifier for this result, 1-64 Bytes */
  id: string;
  input_message_content?: InputMessageContent;
  /** Latitude of the venue location in degrees */
  latitude: number;
  /** Longitude of the venue location in degrees */
  longitude: number;
  reply_markup?: InlineKeyboardMarkup;
  /** *Optional*. Thumbnail height */
  thumb_height?: number;
  /** *Optional*. Url of the thumbnail for the result */
  thumb_url?: string;
  /** *Optional*. Thumbnail width */
  thumb_width?: number;
  /** Title of the venue */
  title: string;
  /** Type of the result, must be *venue* */
  type: string;
};

/** Represents a link to a page containing an embedded video player or a video file. By default, this video file will be sent by the user with an optional caption. Alternatively, you can use *input\_message\_content* to send a message with the specified content instead of the video.  If an InlineQueryResultVideo message contains an embedded video (e.g., YouTube), you **must** replace its content using *input\_message\_content*. */
export type InlineQueryResultVideo = {
  /** *Optional*. Caption of the video to be sent, 0-1024 characters after entities parsing */
  caption?: string;
  /** *Optional*. List of special entities that appear in the caption, which can be specified instead of *parse\_mode* */
  caption_entities?: (MessageEntity)[];
  /** *Optional*. Short description of the result */
  description?: string;
  /** Unique identifier for this result, 1-64 bytes */
  id: string;
  input_message_content?: InputMessageContent;
  /** Mime type of the content of video url, “text/html” or “video/mp4” */
  mime_type: string;
  /** *Optional*. Mode for parsing entities in the video caption. See [formatting options](https://core.telegram.org/bots/api/#formatting-options) for more details. */
  parse_mode?: string;
  reply_markup?: InlineKeyboardMarkup;
  /** URL of the thumbnail (jpeg only) for the video */
  thumb_url: string;
  /** Title for the result */
  title: string;
  /** Type of the result, must be *video* */
  type: string;
  /** *Optional*. Video duration in seconds */
  video_duration?: number;
  /** *Optional*. Video height */
  video_height?: number;
  /** A valid URL for the embedded video player or video file */
  video_url: string;
  /** *Optional*. Video width */
  video_width?: number;
};

/** Represents a link to a voice recording in an .OGG container encoded with OPUS. By default, this voice recording will be sent by the user. Alternatively, you can use *input\_message\_content* to send a message with the specified content instead of the the voice message. */
export type InlineQueryResultVoice = {
  /** *Optional*. Caption, 0-1024 characters after entities parsing */
  caption?: string;
  /** *Optional*. List of special entities that appear in the caption, which can be specified instead of *parse\_mode* */
  caption_entities?: (MessageEntity)[];
  /** Unique identifier for this result, 1-64 bytes */
  id: string;
  input_message_content?: InputMessageContent;
  /** *Optional*. Mode for parsing entities in the voice message caption. See [formatting options](https://core.telegram.org/bots/api/#formatting-options) for more details. */
  parse_mode?: string;
  reply_markup?: InlineKeyboardMarkup;
  /** Recording title */
  title: string;
  /** Type of the result, must be *voice* */
  type: string;
  /** *Optional*. Recording duration in seconds */
  voice_duration?: number;
  /** A valid URL for the voice recording */
  voice_url: string;
};

/** Represents the [content](https://core.telegram.org/bots/api/#inputmessagecontent) of a contact message to be sent as the result of an inline query. */
export type InputContactMessageContent = {
  /** Contact's first name */
  first_name: string;
  /** *Optional*. Contact's last name */
  last_name?: string;
  /** Contact's phone number */
  phone_number: string;
  /** *Optional*. Additional data about the contact in the form of a [vCard](https://en.wikipedia.org/wiki/VCard), 0-2048 bytes */
  vcard?: string;
};

/** This object represents the contents of a file to be uploaded. Must be posted using multipart/form-data in the usual way that files are uploaded via the browser. */
export type InputFile = unknown;

/** Represents the [content](https://core.telegram.org/bots/api/#inputmessagecontent) of a location message to be sent as the result of an inline query. */
export type InputLocationMessageContent = {
  /** *Optional*. For live locations, a direction in which the user is moving, in degrees. Must be between 1 and 360 if specified. */
  heading?: number;
  /** *Optional*. The radius of uncertainty for the location, measured in meters; 0-1500 */
  horizontal_accuracy?: number;
  /** Latitude of the location in degrees */
  latitude: number;
  /** *Optional*. Period in seconds for which the location can be updated, should be between 60 and 86400. */
  live_period?: number;
  /** Longitude of the location in degrees */
  longitude: number;
  /** *Optional*. For live locations, a maximum distance for proximity alerts about approaching another chat member, in meters. Must be between 1 and 100000 if specified. */
  proximity_alert_radius?: number;
};

/** This object represents the content of a media message to be sent. It should be one of */
export type InputMedia = InputMediaAnimation | InputMediaDocument | InputMediaAudio | InputMediaPhoto | InputMediaVideo;

/** Represents an animation file (GIF or H.264/MPEG-4 AVC video without sound) to be sent. */
export type InputMediaAnimation = {
  /** *Optional*. Caption of the animation to be sent, 0-1024 characters after entities parsing */
  caption?: string;
  /** *Optional*. List of special entities that appear in the caption, which can be specified instead of *parse\_mode* */
  caption_entities?: (MessageEntity)[];
  /** *Optional*. Animation duration */
  duration?: number;
  /** *Optional*. Animation height */
  height?: number;
  /** File to send. Pass a file\_id to send a file that exists on the Telegram servers (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or pass “attach://<file\_attach\_name>” to upload a new one using multipart/form-data under <file\_attach\_name> name. [More info on Sending Files »](https://core.telegram.org/bots/api/#sending-files) */
  media: string;
  /** *Optional*. Mode for parsing entities in the animation caption. See [formatting options](https://core.telegram.org/bots/api/#formatting-options) for more details. */
  parse_mode?: string;
  /** *Optional*. Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass “attach://<file\_attach\_name>” if the thumbnail was uploaded using multipart/form-data under <file\_attach\_name>. [More info on Sending Files »](https://core.telegram.org/bots/api/#sending-files) */
  thumb?: InputFile | string;
  /** Type of the result, must be *animation* */
  type: string;
  /** *Optional*. Animation width */
  width?: number;
};

/** Represents an audio file to be treated as music to be sent. */
export type InputMediaAudio = {
  /** *Optional*. Caption of the audio to be sent, 0-1024 characters after entities parsing */
  caption?: string;
  /** *Optional*. List of special entities that appear in the caption, which can be specified instead of *parse\_mode* */
  caption_entities?: (MessageEntity)[];
  /** *Optional*. Duration of the audio in seconds */
  duration?: number;
  /** File to send. Pass a file\_id to send a file that exists on the Telegram servers (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or pass “attach://<file\_attach\_name>” to upload a new one using multipart/form-data under <file\_attach\_name> name. [More info on Sending Files »](https://core.telegram.org/bots/api/#sending-files) */
  media: string;
  /** *Optional*. Mode for parsing entities in the audio caption. See [formatting options](https://core.telegram.org/bots/api/#formatting-options) for more details. */
  parse_mode?: string;
  /** *Optional*. Performer of the audio */
  performer?: string;
  /** *Optional*. Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass “attach://<file\_attach\_name>” if the thumbnail was uploaded using multipart/form-data under <file\_attach\_name>. [More info on Sending Files »](https://core.telegram.org/bots/api/#sending-files) */
  thumb?: InputFile | string;
  /** *Optional*. Title of the audio */
  title?: string;
  /** Type of the result, must be *audio* */
  type: string;
};

/** Represents a general file to be sent. */
export type InputMediaDocument = {
  /** *Optional*. Caption of the document to be sent, 0-1024 characters after entities parsing */
  caption?: string;
  /** *Optional*. List of special entities that appear in the caption, which can be specified instead of *parse\_mode* */
  caption_entities?: (MessageEntity)[];
  /** *Optional*. Disables automatic server-side content type detection for files uploaded using multipart/form-data. Always true, if the document is sent as part of an album. */
  disable_content_type_detection?: boolean;
  /** File to send. Pass a file\_id to send a file that exists on the Telegram servers (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or pass “attach://<file\_attach\_name>” to upload a new one using multipart/form-data under <file\_attach\_name> name. [More info on Sending Files »](https://core.telegram.org/bots/api/#sending-files) */
  media: string;
  /** *Optional*. Mode for parsing entities in the document caption. See [formatting options](https://core.telegram.org/bots/api/#formatting-options) for more details. */
  parse_mode?: string;
  /** *Optional*. Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass “attach://<file\_attach\_name>” if the thumbnail was uploaded using multipart/form-data under <file\_attach\_name>. [More info on Sending Files »](https://core.telegram.org/bots/api/#sending-files) */
  thumb?: InputFile | string;
  /** Type of the result, must be *document* */
  type: string;
};

/** Represents a photo to be sent. */
export type InputMediaPhoto = {
  /** *Optional*. Caption of the photo to be sent, 0-1024 characters after entities parsing */
  caption?: string;
  /** *Optional*. List of special entities that appear in the caption, which can be specified instead of *parse\_mode* */
  caption_entities?: (MessageEntity)[];
  /** File to send. Pass a file\_id to send a file that exists on the Telegram servers (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or pass “attach://<file\_attach\_name>” to upload a new one using multipart/form-data under <file\_attach\_name> name. [More info on Sending Files »](https://core.telegram.org/bots/api/#sending-files) */
  media: string;
  /** *Optional*. Mode for parsing entities in the photo caption. See [formatting options](https://core.telegram.org/bots/api/#formatting-options) for more details. */
  parse_mode?: string;
  /** Type of the result, must be *photo* */
  type: string;
};

/** Represents a video to be sent. */
export type InputMediaVideo = {
  /** *Optional*. Caption of the video to be sent, 0-1024 characters after entities parsing */
  caption?: string;
  /** *Optional*. List of special entities that appear in the caption, which can be specified instead of *parse\_mode* */
  caption_entities?: (MessageEntity)[];
  /** *Optional*. Video duration */
  duration?: number;
  /** *Optional*. Video height */
  height?: number;
  /** File to send. Pass a file\_id to send a file that exists on the Telegram servers (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or pass “attach://<file\_attach\_name>” to upload a new one using multipart/form-data under <file\_attach\_name> name. [More info on Sending Files »](https://core.telegram.org/bots/api/#sending-files) */
  media: string;
  /** *Optional*. Mode for parsing entities in the video caption. See [formatting options](https://core.telegram.org/bots/api/#formatting-options) for more details. */
  parse_mode?: string;
  /** *Optional*. Pass *True*, if the uploaded video is suitable for streaming */
  supports_streaming?: boolean;
  /** *Optional*. Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass “attach://<file\_attach\_name>” if the thumbnail was uploaded using multipart/form-data under <file\_attach\_name>. [More info on Sending Files »](https://core.telegram.org/bots/api/#sending-files) */
  thumb?: InputFile | string;
  /** Type of the result, must be *video* */
  type: string;
  /** *Optional*. Video width */
  width?: number;
};

/** This object represents the content of a message to be sent as a result of an inline query. Telegram clients currently support the following 4 types: */
export type InputMessageContent = InputTextMessageContent | InputLocationMessageContent | InputVenueMessageContent | InputContactMessageContent;

/** Represents the [content](https://core.telegram.org/bots/api/#inputmessagecontent) of a text message to be sent as the result of an inline query. */
export type InputTextMessageContent = {
  /** *Optional*. Disables link previews for links in the sent message */
  disable_web_page_preview?: boolean;
  /** *Optional*. List of special entities that appear in message text, which can be specified instead of *parse\_mode* */
  entities?: (MessageEntity)[];
  /** Text of the message to be sent, 1-4096 characters */
  message_text: string;
  /** *Optional*. Mode for parsing entities in the message text. See [formatting options](https://core.telegram.org/bots/api/#formatting-options) for more details. */
  parse_mode?: string;
};

/** Represents the [content](https://core.telegram.org/bots/api/#inputmessagecontent) of a venue message to be sent as the result of an inline query. */
export type InputVenueMessageContent = {
  /** Address of the venue */
  address: string;
  /** *Optional*. Foursquare identifier of the venue, if known */
  foursquare_id?: string;
  /** *Optional*. Foursquare type of the venue, if known. (For example, “arts\_entertainment/default”, “arts\_entertainment/aquarium” or “food/icecream”.) */
  foursquare_type?: string;
  /** *Optional*. Google Places identifier of the venue */
  google_place_id?: string;
  /** *Optional*. Google Places type of the venue. (See [supported types](https://developers.google.com/places/web-service/supported_types).) */
  google_place_type?: string;
  /** Latitude of the venue in degrees */
  latitude: number;
  /** Longitude of the venue in degrees */
  longitude: number;
  /** Name of the venue */
  title: string;
};

/** This object contains basic information about an invoice. */
export type Invoice = {
  /** Three-letter ISO 4217 [currency](/bots/payments#supported-currencies) code */
  currency: string;
  /** Product description */
  description: string;
  /** Unique bot deep-linking parameter that can be used to generate this invoice */
  start_parameter: string;
  /** Product name */
  title: string;
  /** Total price in the *smallest units* of the currency (integer, **not** float/double). For example, for a price of `US$ 1.45` pass `amount = 145`. See the *exp* parameter in [currencies.json](https://core.telegram.org/bots/payments/currencies.json), it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). */
  total_amount: number;
};

/** This object represents one button of the reply keyboard. For simple text buttons *String* can be used instead of this object to specify text of the button. Optional fields *request\_contact*, *request\_location*, and *request\_poll* are mutually exclusive. */
export type KeyboardButton = {
  /** *Optional*. If *True*, the user's phone number will be sent as a contact when the button is pressed. Available in private chats only */
  request_contact?: boolean;
  /** *Optional*. If *True*, the user's current location will be sent when the button is pressed. Available in private chats only */
  request_location?: boolean;
  request_poll?: KeyboardButtonPollType;
  /** Text of the button. If none of the optional fields are used, it will be sent as a message when the button is pressed */
  text: string;
};

/** This object represents type of a poll, which is allowed to be created and sent when the corresponding button is pressed. */
export type KeyboardButtonPollType = {
  /** *Optional*. If *quiz* is passed, the user will be allowed to create only polls in the quiz mode. If *regular* is passed, only regular polls will be allowed. Otherwise, the user will be allowed to create a poll of any type. */
  type?: string;
};

/** This object represents a portion of the price for goods or services. */
export type LabeledPrice = {
  /** Price of the product in the *smallest units* of the [currency](/bots/payments#supported-currencies) (integer, **not** float/double). For example, for a price of `US$ 1.45` pass `amount = 145`. See the *exp* parameter in [currencies.json](https://core.telegram.org/bots/payments/currencies.json), it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). */
  amount: number;
  /** Portion label */
  label: string;
};

/** This object represents a point on the map. */
export type Location = {
  /** *Optional*. The direction in which user is moving, in degrees; 1-360. For active live locations only. */
  heading?: number;
  /** *Optional*. The radius of uncertainty for the location, measured in meters; 0-1500 */
  horizontal_accuracy?: number;
  /** Latitude as defined by sender */
  latitude: number;
  /** *Optional*. Time relative to the message sending date, during which the location can be updated, in seconds. For active live locations only. */
  live_period?: number;
  /** Longitude as defined by sender */
  longitude: number;
  /** *Optional*. Maximum distance for proximity alerts about approaching another chat member, in meters. For sent live locations only. */
  proximity_alert_radius?: number;
};

/** This object represents a parameter of the inline keyboard button used to automatically authorize a user. Serves as a great replacement for the [Telegram Login Widget](https://core.telegram.org/widgets/login) when the user is coming from Telegram. All the user needs to do is tap/click a button and confirm that they want to log in:  Telegram apps support these buttons as of [version 5.7](https://telegram.org/blog/privacy-discussions-web-bots#meet-seamless-web-bots).  Sample bot: [@discussbot](https://t.me/discussbot) */
export type LoginUrl = {
  /** *Optional*. Username of a bot, which will be used for user authorization. See [Setting up a bot](https://core.telegram.org/widgets/login#setting-up-a-bot) for more details. If not specified, the current bot's username will be assumed. The *url*'s domain must be the same as the domain linked with the bot. See [Linking your domain to the bot](https://core.telegram.org/widgets/login#linking-your-domain-to-the-bot) for more details. */
  bot_username?: string;
  /** *Optional*. New text of the button in forwarded messages. */
  forward_text?: string;
  /** *Optional*. Pass True to request the permission for your bot to send messages to the user. */
  request_write_access?: boolean;
  /** An HTTP URL to be opened with user authorization data added to the query string when the button is pressed. If the user refuses to provide authorization data, the original URL without information about the user will be opened. The data added is the same as described in [Receiving authorization data](https://core.telegram.org/widgets/login#receiving-authorization-data).    **NOTE:** You **must** always check the hash of the received data to verify the authentication and the integrity of the data as described in [Checking authorization](https://core.telegram.org/widgets/login#checking-authorization). */
  url: string;
};

/** This object describes the position on faces where a mask should be placed by default. */
export type MaskPosition = {
  /** The part of the face relative to which the mask should be placed. One of “forehead”, “eyes”, “mouth”, or “chin”. */
  point: "forehead" | "eyes" | "mouth" | "chin";
  /** Mask scaling coefficient. For example, 2.0 means double size. */
  scale: number;
  /** Shift by X-axis measured in widths of the mask scaled to the face size, from left to right. For example, choosing -1.0 will place mask just to the left of the default mask position. */
  x_shift: number;
  /** Shift by Y-axis measured in heights of the mask scaled to the face size, from top to bottom. For example, 1.0 will place the mask just below the default mask position. */
  y_shift: number;
};

/** This object represents a message. */
export type Message = {
  animation?: Animation;
  audio?: Audio;
  /** *Optional*. Signature of the post author for messages in channels, or the custom title of an anonymous group administrator */
  author_signature?: string;
  /** *Optional*. Caption for the animation, audio, document, photo, video or voice, 0-1024 characters */
  caption?: string;
  /** *Optional*. For messages with a caption, special entities like usernames, URLs, bot commands, etc. that appear in the caption */
  caption_entities?: (MessageEntity)[];
  /** *Optional*. Service message: the channel has been created. This field can't be received in a message coming through updates, because bot can't be a member of a channel when it is created. It can only be found in reply\_to\_message if someone replies to a very first message in a channel. */
  channel_chat_created?: boolean;
  chat: Chat;
  /** *Optional*. The domain name of the website on which the user has logged in. [More about Telegram Login »](/widgets/login) */
  connected_website?: string;
  contact?: Contact;
  /** Date the message was sent in Unix time */
  date: number;
  /** *Optional*. Service message: the chat photo was deleted */
  delete_chat_photo?: boolean;
  dice?: Dice;
  document?: Document;
  /** *Optional*. Date the message was last edited in Unix time */
  edit_date?: number;
  /** *Optional*. For text messages, special entities like usernames, URLs, bot commands, etc. that appear in the text */
  entities?: (MessageEntity)[];
  /** *Optional*. For forwarded messages, date the original message was sent in Unix time */
  forward_date?: number;
  forward_from?: User;
  forward_from_chat?: Chat;
  /** *Optional*. For messages forwarded from channels, identifier of the original message in the channel */
  forward_from_message_id?: number;
  /** *Optional*. Sender's name for messages forwarded from users who disallow adding a link to their account in forwarded messages */
  forward_sender_name?: string;
  /** *Optional*. For messages forwarded from channels, signature of the post author if present */
  forward_signature?: string;
  from?: User;
  game?: Game;
  /** *Optional*. Service message: the group has been created */
  group_chat_created?: boolean;
  invoice?: Invoice;
  left_chat_member?: User;
  location?: Location;
  /** *Optional*. The unique identifier of a media message group this message belongs to */
  media_group_id?: string;
  /** Unique message identifier inside this chat */
  message_id: number;
  /** *Optional*. The supergroup has been migrated from a group with the specified identifier. This number may be greater than 32 bits and some programming languages may have difficulty/silent defects in interpreting it. But it is smaller than 52 bits, so a signed 64 bit integer or double-precision float type are safe for storing this identifier. */
  migrate_from_chat_id?: number;
  /** *Optional*. The group has been migrated to a supergroup with the specified identifier. This number may be greater than 32 bits and some programming languages may have difficulty/silent defects in interpreting it. But it is smaller than 52 bits, so a signed 64 bit integer or double-precision float type are safe for storing this identifier. */
  migrate_to_chat_id?: number;
  /** *Optional*. New members that were added to the group or supergroup and information about them (the bot itself may be one of these members) */
  new_chat_members?: (User)[];
  /** *Optional*. A chat photo was change to this value */
  new_chat_photo?: (PhotoSize)[];
  /** *Optional*. A chat title was changed to this value */
  new_chat_title?: string;
  passport_data?: PassportData;
  /** *Optional*. Message is a photo, available sizes of the photo */
  photo?: (PhotoSize)[];
  pinned_message?: Message;
  poll?: Poll;
  proximity_alert_triggered?: ProximityAlertTriggered;
  reply_markup?: InlineKeyboardMarkup;
  reply_to_message?: Message;
  sender_chat?: Chat;
  sticker?: Sticker;
  successful_payment?: SuccessfulPayment;
  /** *Optional*. Service message: the supergroup has been created. This field can't be received in a message coming through updates, because bot can't be a member of a supergroup when it is created. It can only be found in reply\_to\_message if someone replies to a very first message in a directly created supergroup. */
  supergroup_chat_created?: boolean;
  /** *Optional*. For text messages, the actual UTF-8 text of the message, 0-4096 characters */
  text?: string;
  venue?: Venue;
  via_bot?: User;
  video?: Video;
  video_note?: VideoNote;
  voice?: Voice;
};

/** This object represents one special entity in a text message. For example, hashtags, usernames, URLs, etc. */
export type MessageEntity = {
  /** *Optional*. For “pre” only, the programming language of the entity text */
  language?: string;
  /** Length of the entity in UTF-16 code units */
  length: number;
  /** Offset in UTF-16 code units to the start of the entity */
  offset: number;
  /** Type of the entity. Can be “mention” (`@username`), “hashtag” (`#hashtag`), “cashtag” (`$USD`), “bot\_command” (`/start@jobs_bot`), “url” (`https://telegram.org`), “email” (`do-not-reply@telegram.org`), “phone\_number” (`+1-212-555-0123`), “bold” (**bold text**), “italic” (*italic text*), “underline” (underlined text), “strikethrough” (strikethrough text), “code” (monowidth string), “pre” (monowidth block), “text\_link” (for clickable text URLs), “text\_mention” (for users [without usernames](https://telegram.org/blog/edit#new-mentions)) */
  type: "mention" | "hashtag" | "cashtag" | "bot_command" | "url" | "email" | "phone_number" | "bold" | "italic" | "underline" | "strikethrough" | "code" | "pre" | "text_link" | "text_mention";
  /** *Optional*. For “text\_link” only, url that will be opened after user taps on the text */
  url?: string;
  user?: User;
};

/** This object represents a unique message identifier. */
export type MessageId = {
  /** Unique message identifier */
  message_id: number;
};

/** This object represents information about an order. */
export type OrderInfo = {
  /** *Optional*. User email */
  email?: string;
  /** *Optional*. User name */
  name?: string;
  /** *Optional*. User's phone number */
  phone_number?: string;
  shipping_address?: ShippingAddress;
};

/** Contains information about Telegram Passport data shared with the bot by the user. */
export type PassportData = {
  credentials: EncryptedCredentials;
  /** Array with information about documents and other Telegram Passport elements that was shared with the bot */
  data: (EncryptedPassportElement)[];
};

/** This object represents an error in the Telegram Passport element which was submitted that should be resolved by the user. It should be one of: */
export type PassportElementError = PassportElementErrorDataField | PassportElementErrorFrontSide | PassportElementErrorReverseSide | PassportElementErrorSelfie | PassportElementErrorFile | PassportElementErrorFiles | PassportElementErrorTranslationFile | PassportElementErrorTranslationFiles | PassportElementErrorUnspecified;

/** Represents an issue in one of the data fields that was provided by the user. The error is considered resolved when the field's value changes. */
export type PassportElementErrorDataField = {
  /** Base64-encoded data hash */
  data_hash: string;
  /** Name of the data field which has the error */
  field_name: string;
  /** Error message */
  message: string;
  /** Error source, must be *data* */
  source: string;
  /** The section of the user's Telegram Passport which has the error, one of “personal\_details”, “passport”, “driver\_license”, “identity\_card”, “internal\_passport”, “address” */
  type: "personal_details" | "passport" | "driver_license" | "identity_card" | "internal_passport" | "address";
};

/** Represents an issue with a document scan. The error is considered resolved when the file with the document scan changes. */
export type PassportElementErrorFile = {
  /** Base64-encoded file hash */
  file_hash: string;
  /** Error message */
  message: string;
  /** Error source, must be *file* */
  source: string;
  /** The section of the user's Telegram Passport which has the issue, one of “utility\_bill”, “bank\_statement”, “rental\_agreement”, “passport\_registration”, “temporary\_registration” */
  type: "utility_bill" | "bank_statement" | "rental_agreement" | "passport_registration" | "temporary_registration";
};

/** Represents an issue with a list of scans. The error is considered resolved when the list of files containing the scans changes. */
export type PassportElementErrorFiles = {
  /** List of base64-encoded file hashes */
  file_hashes: (string)[];
  /** Error message */
  message: string;
  /** Error source, must be *files* */
  source: string;
  /** The section of the user's Telegram Passport which has the issue, one of “utility\_bill”, “bank\_statement”, “rental\_agreement”, “passport\_registration”, “temporary\_registration” */
  type: "utility_bill" | "bank_statement" | "rental_agreement" | "passport_registration" | "temporary_registration";
};

/** Represents an issue with the front side of a document. The error is considered resolved when the file with the front side of the document changes. */
export type PassportElementErrorFrontSide = {
  /** Base64-encoded hash of the file with the front side of the document */
  file_hash: string;
  /** Error message */
  message: string;
  /** Error source, must be *front\_side* */
  source: string;
  /** The section of the user's Telegram Passport which has the issue, one of “passport”, “driver\_license”, “identity\_card”, “internal\_passport” */
  type: "passport" | "driver_license" | "identity_card" | "internal_passport";
};

/** Represents an issue with the reverse side of a document. The error is considered resolved when the file with reverse side of the document changes. */
export type PassportElementErrorReverseSide = {
  /** Base64-encoded hash of the file with the reverse side of the document */
  file_hash: string;
  /** Error message */
  message: string;
  /** Error source, must be *reverse\_side* */
  source: string;
  /** The section of the user's Telegram Passport which has the issue, one of “driver\_license”, “identity\_card” */
  type: "driver_license" | "identity_card";
};

/** Represents an issue with the selfie with a document. The error is considered resolved when the file with the selfie changes. */
export type PassportElementErrorSelfie = {
  /** Base64-encoded hash of the file with the selfie */
  file_hash: string;
  /** Error message */
  message: string;
  /** Error source, must be *selfie* */
  source: string;
  /** The section of the user's Telegram Passport which has the issue, one of “passport”, “driver\_license”, “identity\_card”, “internal\_passport” */
  type: "passport" | "driver_license" | "identity_card" | "internal_passport";
};

/** Represents an issue with one of the files that constitute the translation of a document. The error is considered resolved when the file changes. */
export type PassportElementErrorTranslationFile = {
  /** Base64-encoded file hash */
  file_hash: string;
  /** Error message */
  message: string;
  /** Error source, must be *translation\_file* */
  source: string;
  /** Type of element of the user's Telegram Passport which has the issue, one of “passport”, “driver\_license”, “identity\_card”, “internal\_passport”, “utility\_bill”, “bank\_statement”, “rental\_agreement”, “passport\_registration”, “temporary\_registration” */
  type: "passport" | "driver_license" | "identity_card" | "internal_passport" | "utility_bill" | "bank_statement" | "rental_agreement" | "passport_registration" | "temporary_registration";
};

/** Represents an issue with the translated version of a document. The error is considered resolved when a file with the document translation change. */
export type PassportElementErrorTranslationFiles = {
  /** List of base64-encoded file hashes */
  file_hashes: (string)[];
  /** Error message */
  message: string;
  /** Error source, must be *translation\_files* */
  source: string;
  /** Type of element of the user's Telegram Passport which has the issue, one of “passport”, “driver\_license”, “identity\_card”, “internal\_passport”, “utility\_bill”, “bank\_statement”, “rental\_agreement”, “passport\_registration”, “temporary\_registration” */
  type: "passport" | "driver_license" | "identity_card" | "internal_passport" | "utility_bill" | "bank_statement" | "rental_agreement" | "passport_registration" | "temporary_registration";
};

/** Represents an issue in an unspecified place. The error is considered resolved when new data is added. */
export type PassportElementErrorUnspecified = {
  /** Base64-encoded element hash */
  element_hash: string;
  /** Error message */
  message: string;
  /** Error source, must be *unspecified* */
  source: string;
  /** Type of element of the user's Telegram Passport which has the issue */
  type: string;
};

/** This object represents a file uploaded to Telegram Passport. Currently all Telegram Passport files are in JPEG format when decrypted and don't exceed 10MB. */
export type PassportFile = {
  /** Unix time when the file was uploaded */
  file_date: number;
  /** Identifier for this file, which can be used to download or reuse the file */
  file_id: string;
  /** File size */
  file_size: number;
  /** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
  file_unique_id: string;
};

/** This object represents one size of a photo or a [file](https://core.telegram.org/bots/api/#document) / [sticker](https://core.telegram.org/bots/api/#sticker) thumbnail. */
export type PhotoSize = {
  /** Identifier for this file, which can be used to download or reuse the file */
  file_id: string;
  /** *Optional*. File size */
  file_size?: number;
  /** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
  file_unique_id: string;
  /** Photo height */
  height: number;
  /** Photo width */
  width: number;
};

/** This object contains information about a poll. */
export type Poll = {
  /** True, if the poll allows multiple answers */
  allows_multiple_answers: boolean;
  /** *Optional*. Point in time (Unix timestamp) when the poll will be automatically closed */
  close_date?: number;
  /** *Optional*. 0-based identifier of the correct answer option. Available only for polls in the quiz mode, which are closed, or was sent (not forwarded) by the bot or to the private chat with the bot. */
  correct_option_id?: number;
  /** *Optional*. Text that is shown when a user chooses an incorrect answer or taps on the lamp icon in a quiz-style poll, 0-200 characters */
  explanation?: string;
  /** *Optional*. Special entities like usernames, URLs, bot commands, etc. that appear in the *explanation* */
  explanation_entities?: (MessageEntity)[];
  /** Unique poll identifier */
  id: string;
  /** True, if the poll is anonymous */
  is_anonymous: boolean;
  /** True, if the poll is closed */
  is_closed: boolean;
  /** *Optional*. Amount of time in seconds the poll will be active after creation */
  open_period?: number;
  /** List of poll options */
  options: (PollOption)[];
  /** Poll question, 1-255 characters */
  question: string;
  /** Total number of users that voted in the poll */
  total_voter_count: number;
  /** Poll type, currently can be “regular” or “quiz” */
  type: string;
};

/** This object represents an answer of a user in a non-anonymous poll. */
export type PollAnswer = {
  /** 0-based identifiers of answer options, chosen by the user. May be empty if the user retracted their vote. */
  option_ids: (number)[];
  /** Unique poll identifier */
  poll_id: string;
  user: User;
};

/** This object contains information about one answer option in a poll. */
export type PollOption = {
  /** Option text, 1-100 characters */
  text: string;
  /** Number of users that voted for this option */
  voter_count: number;
};

/** This object contains information about an incoming pre-checkout query. */
export type PreCheckoutQuery = {
  /** Three-letter ISO 4217 [currency](/bots/payments#supported-currencies) code */
  currency: string;
  from: User;
  /** Unique query identifier */
  id: string;
  /** Bot specified invoice payload */
  invoice_payload: string;
  order_info?: OrderInfo;
  /** *Optional*. Identifier of the shipping option chosen by the user */
  shipping_option_id?: string;
  /** Total price in the *smallest units* of the currency (integer, **not** float/double). For example, for a price of `US$ 1.45` pass `amount = 145`. See the *exp* parameter in [currencies.json](https://core.telegram.org/bots/payments/currencies.json), it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). */
  total_amount: number;
};

/** This object represents the content of a service message, sent whenever a user in the chat triggers a proximity alert set by another user. */
export type ProximityAlertTriggered = {
  /** The distance between the users */
  distance: number;
  traveler: User;
  watcher: User;
};

/** This object represents a [custom keyboard](https://core.telegram.org/bots#keyboards) with reply options (see [Introduction to bots](https://core.telegram.org/bots#keyboards) for details and examples). */
export type ReplyKeyboardMarkup = {
  /** Array of button rows, each represented by an Array of [KeyboardButton](https://core.telegram.org/bots/api/#keyboardbutton) objects */
  keyboard: ((KeyboardButton)[])[];
  /** *Optional*. Requests clients to hide the keyboard as soon as it's been used. The keyboard will still be available, but clients will automatically display the usual letter-keyboard in the chat – the user can press a special button in the input field to see the custom keyboard again. Defaults to *false*. */
  one_time_keyboard?: boolean;
  /** *Optional*. Requests clients to resize the keyboard vertically for optimal fit (e.g., make the keyboard smaller if there are just two rows of buttons). Defaults to *false*, in which case the custom keyboard is always of the same height as the app's standard keyboard. */
  resize_keyboard?: boolean;
  /** *Optional*. Use this parameter if you want to show the keyboard to specific users only. Targets: 1) users that are @mentioned in the *text* of the [Message](https://core.telegram.org/bots/api/#message) object; 2) if the bot's message is a reply (has *reply\_to\_message\_id*), sender of the original message.    *Example:* A user requests to change the bot's language, bot replies to the request with a keyboard to select the new language. Other users in the group don't see the keyboard. */
  selective?: boolean;
};

/** Upon receiving a message with this object, Telegram clients will remove the current custom keyboard and display the default letter-keyboard. By default, custom keyboards are displayed until a new keyboard is sent by a bot. An exception is made for one-time keyboards that are hidden immediately after the user presses a button (see [ReplyKeyboardMarkup](https://core.telegram.org/bots/api/#replykeyboardmarkup)). */
export type ReplyKeyboardRemove = {
  /** Requests clients to remove the custom keyboard (user will not be able to summon this keyboard; if you want to hide the keyboard from sight but keep it accessible, use *one\_time\_keyboard* in [ReplyKeyboardMarkup](https://core.telegram.org/bots/api/#replykeyboardmarkup)) */
  remove_keyboard: boolean;
  /** *Optional*. Use this parameter if you want to remove the keyboard for specific users only. Targets: 1) users that are @mentioned in the *text* of the [Message](https://core.telegram.org/bots/api/#message) object; 2) if the bot's message is a reply (has *reply\_to\_message\_id*), sender of the original message.    *Example:* A user votes in a poll, bot returns confirmation message in reply to the vote and removes the keyboard for that user, while still showing the keyboard with poll options to users who haven't voted yet. */
  selective?: boolean;
};

/** Contains information about why a request was unsuccessful. */
export type ResponseParameters = {
  /** *Optional*. The group has been migrated to a supergroup with the specified identifier. This number may be greater than 32 bits and some programming languages may have difficulty/silent defects in interpreting it. But it is smaller than 52 bits, so a signed 64 bit integer or double-precision float type are safe for storing this identifier. */
  migrate_to_chat_id?: number;
  /** *Optional*. In case of exceeding flood control, the number of seconds left to wait before the request can be repeated */
  retry_after?: number;
};

/** This object represents a shipping address. */
export type ShippingAddress = {
  /** City */
  city: string;
  /** ISO 3166-1 alpha-2 country code */
  country_code: string;
  /** Address post code */
  post_code: string;
  /** State, if applicable */
  state: string;
  /** First line for the address */
  street_line1: string;
  /** Second line for the address */
  street_line2: string;
};

/** This object represents one shipping option. */
export type ShippingOption = {
  /** Shipping option identifier */
  id: string;
  /** List of price portions */
  prices: (LabeledPrice)[];
  /** Option title */
  title: string;
};

/** This object contains information about an incoming shipping query. */
export type ShippingQuery = {
  from: User;
  /** Unique query identifier */
  id: string;
  /** Bot specified invoice payload */
  invoice_payload: string;
  shipping_address: ShippingAddress;
};

/** This object represents a sticker. */
export type Sticker = {
  /** *Optional*. Emoji associated with the sticker */
  emoji?: string;
  /** Identifier for this file, which can be used to download or reuse the file */
  file_id: string;
  /** *Optional*. File size */
  file_size?: number;
  /** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
  file_unique_id: string;
  /** Sticker height */
  height: number;
  /** *True*, if the sticker is [animated](https://telegram.org/blog/animated-stickers) */
  is_animated: boolean;
  mask_position?: MaskPosition;
  /** *Optional*. Name of the sticker set to which the sticker belongs */
  set_name?: string;
  thumb?: PhotoSize;
  /** Sticker width */
  width: number;
};

/** This object represents a sticker set. */
export type StickerSet = {
  /** *True*, if the sticker set contains masks */
  contains_masks: boolean;
  /** *True*, if the sticker set contains [animated stickers](https://telegram.org/blog/animated-stickers) */
  is_animated: boolean;
  /** Sticker set name */
  name: string;
  /** List of all set stickers */
  stickers: (Sticker)[];
  thumb?: PhotoSize;
  /** Sticker set title */
  title: string;
};

/** This object contains basic information about a successful payment. */
export type SuccessfulPayment = {
  /** Three-letter ISO 4217 [currency](/bots/payments#supported-currencies) code */
  currency: string;
  /** Bot specified invoice payload */
  invoice_payload: string;
  order_info?: OrderInfo;
  /** Provider payment identifier */
  provider_payment_charge_id: string;
  /** *Optional*. Identifier of the shipping option chosen by the user */
  shipping_option_id?: string;
  /** Telegram payment identifier */
  telegram_payment_charge_id: string;
  /** Total price in the *smallest units* of the currency (integer, **not** float/double). For example, for a price of `US$ 1.45` pass `amount = 145`. See the *exp* parameter in [currencies.json](https://core.telegram.org/bots/payments/currencies.json), it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). */
  total_amount: number;
};

/** This [object](https://core.telegram.org/bots/api/#available-types) represents an incoming update.   At most **one** of the optional parameters can be present in any given update. */
export type Update = {
  callback_query?: CallbackQuery;
  channel_post?: Message;
  chosen_inline_result?: ChosenInlineResult;
  edited_channel_post?: Message;
  edited_message?: Message;
  inline_query?: InlineQuery;
  message?: Message;
  poll?: Poll;
  poll_answer?: PollAnswer;
  pre_checkout_query?: PreCheckoutQuery;
  shipping_query?: ShippingQuery;
  /** The update's unique identifier. Update identifiers start from a certain positive number and increase sequentially. This ID becomes especially handy if you're using [Webhooks](https://core.telegram.org/bots/api/#setwebhook), since it allows you to ignore repeated updates or to restore the correct update sequence, should they get out of order. If there are no new updates for at least a week, then identifier of the next update will be chosen randomly instead of sequentially. */
  update_id: number;
};

/** This object represents a Telegram user or bot. */
export type User = {
  /** *Optional*. True, if the bot can be invited to groups. Returned only in [getMe](https://core.telegram.org/bots/api/#getme). */
  can_join_groups?: boolean;
  /** *Optional*. True, if [privacy mode](https://core.telegram.org/bots#privacy-mode) is disabled for the bot. Returned only in [getMe](https://core.telegram.org/bots/api/#getme). */
  can_read_all_group_messages?: boolean;
  /** User's or bot's first name */
  first_name: string;
  /** Unique identifier for this user or bot */
  id: number;
  /** True, if this user is a bot */
  is_bot: boolean;
  /** *Optional*. [IETF language tag](https://en.wikipedia.org/wiki/IETF_language_tag) of the user's language */
  language_code?: string;
  /** *Optional*. User's or bot's last name */
  last_name?: string;
  /** *Optional*. True, if the bot supports inline queries. Returned only in [getMe](https://core.telegram.org/bots/api/#getme). */
  supports_inline_queries?: boolean;
  /** *Optional*. User's or bot's username */
  username?: string;
};

/** This object represent a user's profile pictures. */
export type UserProfilePhotos = {
  /** Requested profile pictures (in up to 4 sizes each) */
  photos: ((PhotoSize)[])[];
  /** Total number of profile pictures the target user has */
  total_count: number;
};

/** This object represents a venue. */
export type Venue = {
  /** Address of the venue */
  address: string;
  /** *Optional*. Foursquare identifier of the venue */
  foursquare_id?: string;
  /** *Optional*. Foursquare type of the venue. (For example, “arts\_entertainment/default”, “arts\_entertainment/aquarium” or “food/icecream”.) */
  foursquare_type?: string;
  /** *Optional*. Google Places identifier of the venue */
  google_place_id?: string;
  /** *Optional*. Google Places type of the venue. (See [supported types](https://developers.google.com/places/web-service/supported_types).) */
  google_place_type?: string;
  location: Location;
  /** Name of the venue */
  title: string;
};

/** This object represents a video file. */
export type Video = {
  /** Duration of the video in seconds as defined by sender */
  duration: number;
  /** Identifier for this file, which can be used to download or reuse the file */
  file_id: string;
  /** *Optional*. Original filename as defined by sender */
  file_name?: string;
  /** *Optional*. File size */
  file_size?: number;
  /** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
  file_unique_id: string;
  /** Video height as defined by sender */
  height: number;
  /** *Optional*. Mime type of a file as defined by sender */
  mime_type?: string;
  thumb?: PhotoSize;
  /** Video width as defined by sender */
  width: number;
};

/** This object represents a [video message](https://telegram.org/blog/video-messages-and-telescope) (available in Telegram apps as of [v.4.0](https://telegram.org/blog/video-messages-and-telescope)). */
export type VideoNote = {
  /** Duration of the video in seconds as defined by sender */
  duration: number;
  /** Identifier for this file, which can be used to download or reuse the file */
  file_id: string;
  /** *Optional*. File size */
  file_size?: number;
  /** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
  file_unique_id: string;
  /** Video width and height (diameter of the video message) as defined by sender */
  length: number;
  thumb?: PhotoSize;
};

/** This object represents a voice note. */
export type Voice = {
  /** Duration of the audio in seconds as defined by sender */
  duration: number;
  /** Identifier for this file, which can be used to download or reuse the file */
  file_id: string;
  /** *Optional*. File size */
  file_size?: number;
  /** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
  file_unique_id: string;
  /** *Optional*. MIME type of the file as defined by sender */
  mime_type?: string;
};

/** Contains information about the current status of a webhook. */
export type WebhookInfo = {
  /** *Optional*. A list of update types the bot is subscribed to. Defaults to all update types */
  allowed_updates?: (string)[];
  /** True, if a custom certificate was provided for webhook certificate checks */
  has_custom_certificate: boolean;
  /** *Optional*. Currently used webhook IP address */
  ip_address?: string;
  /** *Optional*. Unix time for the most recent error that happened when trying to deliver an update via webhook */
  last_error_date?: number;
  /** *Optional*. Error message in human-readable format for the most recent error that happened when trying to deliver an update via webhook */
  last_error_message?: string;
  /** *Optional*. Maximum allowed number of simultaneous HTTPS connections to the webhook for update delivery */
  max_connections?: number;
  /** Number of updates awaiting delivery */
  pending_update_count: number;
  /** Webhook URL, may be empty if webhook is not set up */
  url: string;
};
