/** One peer focused on a file (server roster entry; display filters self). */
export type FilePeer = {
  userId: string;
  path: string;
  lastActive: string;
};

export type PresenceRosterSnapshot = { peers: FilePeer[] };

export type PresenceDelta = {
  kind: "join" | "leave" | "update";
  peer: FilePeer;
};
