/** [lon, lat] pair, decimal degrees, WGS84. */
export type Coordinate = (number)[];

export type DirectionsRequest = {
  /** Ordered route waypoints. First is origin, last is destination. */
  coordinates: (Coordinate)[];
  alternative_routes?: { target_count?: number; weight_factor?: number; share_factor?: number };
  units?: "m" | "km" | "mi";
  /** Localisation for textual turn instructions (e.g. `en-AU`). */
  language?: string;
  instructions?: boolean;
  elevation?: boolean;
  preference?: "fastest" | "shortest" | "recommended";
  /** Per-waypoint snap-radius (m). Use -1 to disable snapping for that point. */
  radiuses?: (number)[];
};

export type DirectionsResponse = {
  routes?: ({ summary?: { distance?: number; duration?: number }; geometry?: string; segments?: ({ distance?: number; duration?: number; steps?: ({ [key: string]: unknown })[] })[]; bbox?: (number)[]; way_points?: (number)[] })[];
  bbox?: (number)[];
  metadata?: { [key: string]: unknown };
};

export type MatrixRequest = {
  /** All locations participating in the matrix. */
  locations: (Coordinate)[];
  /** Indices into `locations` to use as origins. Omit to use all locations. */
  sources?: (number)[];
  /** Indices into `locations` to use as destinations. Omit to use all locations. */
  destinations?: (number)[];
  metrics?: ("duration" | "distance")[];
  units?: "m" | "km" | "mi";
  resolve_locations?: boolean;
};

export type MatrixResponse = {
  /** N×M matrix of durations in seconds. */
  durations?: ((number | null)[])[];
  /** N×M matrix of distances (units per request). */
  distances?: ((number | null)[])[];
  sources?: ({ [key: string]: unknown })[];
  destinations?: ({ [key: string]: unknown })[];
  metadata?: { [key: string]: unknown };
};

export type IsochronesRequest = {
  locations: (Coordinate)[];
  /** Time (seconds) or distance (metres) thresholds. One polygon per value, per location. */
  range: (number)[];
  range_type?: "time" | "distance";
  /** Optional sub-interval to densify the response. */
  interval?: number;
  attributes?: ("area" | "reachfactor" | "total_pop")[];
  smoothing?: number;
};

export type IsochronesResponse = {
  type?: string;
  bbox?: (number)[];
  features?: ({ type?: string; properties?: { [key: string]: unknown }; geometry?: { [key: string]: unknown } })[];
  metadata?: { [key: string]: unknown };
};

export type OptimizationRequest = {
  jobs: ({ id: number; location: (number)[]; service?: number; amount?: (number)[]; skills?: (number)[]; time_windows?: ((number)[])[]; priority?: number })[];
  vehicles: ({ id: number; profile: "driving-car" | "driving-hgv" | "cycling-regular" | "cycling-mountain" | "cycling-road" | "cycling-electric" | "foot-walking" | "foot-hiking" | "wheelchair"; start?: (number)[]; end?: (number)[]; capacity?: (number)[]; skills?: (number)[]; time_window?: (number)[]; breaks?: ({ id?: number; service?: number; time_windows?: ((number)[])[] })[] })[];
  options?: { g?: boolean };
};

export type OptimizationResponse = {
  /** 0 = success. */
  code?: number;
  summary?: { cost?: number; duration?: number; distance?: number; unassigned?: number; service?: number; waiting_time?: number };
  routes?: ({ vehicle?: number; steps?: ({ type?: "start" | "job" | "break" | "end"; location?: (number)[]; job?: number; service?: number; waiting_time?: number; arrival?: number; duration?: number })[]; cost?: number; duration?: number; distance?: number; service?: number; waiting_time?: number; geometry?: string })[];
  unassigned?: ({ id?: number; location?: (number)[]; reason?: string })[];
};

export type GeocodeResponse = {
  type?: "FeatureCollection";
  bbox?: (number)[];
  features?: ({ type?: string; geometry?: { type?: "Point"; coordinates?: (number)[] }; properties?: { id?: string; gid?: string; layer?: string; source?: string; name?: string; confidence?: number; accuracy?: string; country?: string; country_a?: string; region?: string; locality?: string; street?: string; housenumber?: string; postalcode?: string; label?: string } })[];
  geocoding?: { [key: string]: unknown };
};

export type ApiError = {
  error?: { code?: number; message?: string };
  info?: { engine?: { [key: string]: unknown }; attribution?: string; timestamp?: number };
};
