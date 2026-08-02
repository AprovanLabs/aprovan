# Shape audit — @utdk/events

Paper audit (documentation-level) of the contract surface against real vendor
APIs, per Decision 8. Freeze criterion for the 0.2.0 bump.

## Vendors

1. **Redis Streams** (XADD/XRANGE)
2. **Amazon SNS** (Publish; paired with an SQS/stream sink for reads)
3. **Ably** (REST: publish to channel, channel history)

## Per-operation mapping

| Contract element | Redis Streams | SNS | Ably |
| --- | --- | --- | --- |
| `emit` (channel, type, payload) | `XADD channel * type … payload …` | `Publish` to topic (type → message attribute) | `POST /channels/{channel}/messages` (`name` = type, `data` = payload) |
| provider-assigned, channel-ordered id | stream ID `ms-seq` (lexicographic within stream) | `MessageId` (NOT ordered) | message id + `timeSerial` (ordered) |
| `timestamp` (ISO, provider clock) | derived from stream ID ms | publish timestamp | message `timestamp` |
| `list` oldest-first | `XRANGE channel (after +` (native exclusive-after) | not natively readable — adapter pairs a durable sink (SQS/Kinesis/S3) | history API (`start`, `direction=forwards`, `limit`) |
| `after` exclusive id | native (`(id` exclusive range) | sink-dependent | `timeSerial`-based resume |
| opaque `cursor` | last-returned id wrapped opaque | sink pagination token | pagination `next` link |
| unknown channel ⇒ empty list | `XRANGE` on missing key → empty | empty sink | empty history |
| payload cap 256 KiB | well under Redis limits | equals SNS's 256 KB message cap | under Ably's 64 KiB*/plan caps (adapter documents) |
| append-only, at-least-once, no delivery semantics | consumer groups NOT surfaced | subscriptions NOT surfaced | subscriptions NOT surfaced |
| error → `EventsError(status)` | protocol errors mapped | HTTP/SDK status | HTTP status |

Findings:

- `emit` is one native call on all three vendors. The 256 KiB payload cap
  aligns exactly with SNS's hard limit; Ably plan limits below that are an
  adapter-documented constraint.
- `list` with exclusive-`after` is native on Redis Streams and expressible
  on Ably history. SNS alone is publish-only — an SNS adapter is an
  *emit-capable* implementation that documents list as requiring a paired
  sink; this is the audit's strongest argument for keeping delivery
  semantics (subscriptions) OUT of the contract, as designed: had the
  contract required push delivery, none of the three would implement it the
  same way.
- Provider-assigned ordered ids hold for Redis and Ably; SNS `MessageId` is
  unordered, so an SNS-with-sink adapter derives the ordered id from the
  sink (e.g. Kinesis sequence number) — an adapter mapping, not a shape gap.
- Unknown-channel-lists-empty is the natural behavior on all three (no
  create-channel race).

## Changes

No change. The two-operation append-only surface mapped cleanly; the audit
validated the decision to exclude subscriptions/delivery from the contract.

## Verdict

**Frozen at 0.2.0.** Implementable against all three audited vendors, with
SNS's read side documented as sink-backed in its future adapter.
