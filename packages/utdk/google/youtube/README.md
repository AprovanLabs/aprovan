# YouTube Data API v3

`utdk/google/youtube` — a typed SDK generated from the provider's OpenAPI spec. This client wraps the provider API in typed methods focused on LiveBroadcasts, Videos, Comments, Captions.

## Quick start

```ts
import youtube from "utdk/google/youtube";

const result = await youtube.youtubeActivitiesList({ /* part */ });
```

In the UTDK isolate runtime, `youtube` is also available directly as a namespace value — no import needed.

## Authentication

- **OAuth 2.0** — flows: implicit.
- **OAuth 2.0** — flows: authorizationCode.

Configure credentials once in the registry credentials area — the gateway injects them on every call, so code stays credential-free.

## Operations

- [AbuseReports](./docs/abusereports.md) — 1 operation
- [Activities](./docs/activities.md) — 1 operation
- [Captions](./docs/captions.md) — 5 operations
- [ChannelBanners](./docs/channelbanners.md) — 1 operation
- [Channels](./docs/channels.md) — 2 operations
- [ChannelSections](./docs/channelsections.md) — 4 operations
- [Comments](./docs/comments.md) — 6 operations
- [CommentThreads](./docs/commentthreads.md) — 2 operations
- [I18nLanguages](./docs/i18nlanguages.md) — 1 operation
- [I18nRegions](./docs/i18nregions.md) — 1 operation
- [LiveBroadcasts](./docs/livebroadcasts.md) — 7 operations
- [LiveChatBans](./docs/livechatbans.md) — 2 operations
- [LiveChatMessages](./docs/livechatmessages.md) — 3 operations
- [LiveChatModerators](./docs/livechatmoderators.md) — 3 operations
- [LiveStreams](./docs/livestreams.md) — 4 operations
- [Members](./docs/members.md) — 1 operation
- [MembershipsLevels](./docs/membershipslevels.md) — 1 operation
- [PlaylistItems](./docs/playlistitems.md) — 4 operations
- [Playlists](./docs/playlists.md) — 4 operations
- [Search](./docs/search.md) — 1 operation
- [Subscriptions](./docs/subscriptions.md) — 3 operations
- [SuperChatEvents](./docs/superchatevents.md) — 1 operation
- [Tests](./docs/tests.md) — 1 operation
- [ThirdPartyLinks](./docs/thirdpartylinks.md) — 4 operations
- [Thumbnails](./docs/thumbnails.md) — 1 operation
- [VideoAbuseReportReasons](./docs/videoabusereportreasons.md) — 1 operation
- [VideoCategories](./docs/videocategories.md) — 1 operation
- [Videos](./docs/videos.md) — 7 operations
- [Watermarks](./docs/watermarks.md) — 2 operations
- [Youtube](./docs/youtube.md) — 1 operation

Every operation is a typed method (`youtube.group.action(input)`); result shapes are named exported types you can hover in your editor.

## Source Index


