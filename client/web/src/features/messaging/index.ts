export type {
  Channel,
  ChannelKind,
  ChatRealtimeEvent,
  ConnectionState,
  InstancePresence,
  Message,
  MessageAgent,
  Unsubscribe,
} from "./schema";
export {
  channelKey,
  messageKey,
  messageKeyPrefix,
  parseChannel,
  parseChatRealtimeEvent,
  parseMessage,
} from "./schema";

export {
  appTopic,
  createChatTimelineAdapter,
  type ChatRecordsClient,
  type ChatRealtimeClient,
  type ChatTimelineAdapter,
  type ChatTimelineAdapterHandle,
  type CreateChatTimelineAdapterOptions,
  type RealtimeSocketState,
} from "./adapter";

export {
  StorageCapError,
  isStorageCapError,
  toStorageCapError,
} from "./errors";

export {
  createGatewayRealtimeClient,
  createKeyvalueRecordsClient,
} from "./platform";

export { Composer } from "./Composer";
export { ChannelRail } from "./ChannelRail";
export { TimelinePane, toTimelineMessages } from "./TimelinePane";
export { ThreadPane } from "./ThreadPane";
export { InstanceView } from "./InstanceView";
export {
  PresenceDot,
  PresenceTypingBar,
  TypingIndicator,
  rosterOnline,
  rosterTooltip,
  useAdapterPresence,
  useChannelTypers,
} from "./PresenceTyping";
export { renderChatMessage } from "./messageRow";
