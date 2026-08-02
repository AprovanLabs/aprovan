import type { Coordinate, DirectionsResponse, GeocodeResponse, IsochronesResponse, MatrixResponse, OptimizationResponse } from "./schemas.js";

export type OpenrouteserviceClient = {
  /**
   * Compute a route between coordinates
   */
  getDirections: (input: {
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
    /** Routing profile. `driving-hgv` is the right pick for service vans / utility vehicles — it respects bridge weight, low-clearance, and large-vehicle turn restrictions that `driving-car` ignores.  */
    profile: "driving-car" | "driving-hgv" | "cycling-regular" | "cycling-mountain" | "cycling-road" | "cycling-electric" | "foot-walking" | "foot-hiking" | "wheelchair";
  }) => Promise<DirectionsResponse>;

  /**
   * Many-to-many duration / distance matrix
   */
  getMatrix: (input: {
    /** All locations participating in the matrix. */
    locations: (Coordinate)[];
    /** Indices into `locations` to use as origins. Omit to use all locations. */
    sources?: (number)[];
    /** Indices into `locations` to use as destinations. Omit to use all locations. */
    destinations?: (number)[];
    metrics?: ("duration" | "distance")[];
    units?: "m" | "km" | "mi";
    resolve_locations?: boolean;
    /** Routing profile. `driving-hgv` is the right pick for service vans / utility vehicles — it respects bridge weight, low-clearance, and large-vehicle turn restrictions that `driving-car` ignores.  */
    profile: "driving-car" | "driving-hgv" | "cycling-regular" | "cycling-mountain" | "cycling-road" | "cycling-electric" | "foot-walking" | "foot-hiking" | "wheelchair";
  }) => Promise<MatrixResponse>;

  /**
   * Reachable-area polygons by time or distance
   */
  getIsochrones: (input: {
    locations: (Coordinate)[];
    /** Time (seconds) or distance (metres) thresholds. One polygon per value, per location. */
    range: (number)[];
    range_type?: "time" | "distance";
    /** Optional sub-interval to densify the response. */
    interval?: number;
    attributes?: ("area" | "reachfactor" | "total_pop")[];
    smoothing?: number;
    /** Routing profile. `driving-hgv` is the right pick for service vans / utility vehicles — it respects bridge weight, low-clearance, and large-vehicle turn restrictions that `driving-car` ignores.  */
    profile: "driving-car" | "driving-hgv" | "cycling-regular" | "cycling-mountain" | "cycling-road" | "cycling-electric" | "foot-walking" | "foot-hiking" | "wheelchair";
  }) => Promise<IsochronesResponse>;

  /**
   * Solve a Vehicle Routing Problem (Vroom)
   */
  solveOptimization: (input: {
    jobs: ({ id: number; location: (number)[]; service?: number; amount?: (number)[]; skills?: (number)[]; time_windows?: ((number)[])[]; priority?: number })[];
    vehicles: ({ id: number; profile: "driving-car" | "driving-hgv" | "cycling-regular" | "cycling-mountain" | "cycling-road" | "cycling-electric" | "foot-walking" | "foot-hiking" | "wheelchair"; start?: (number)[]; end?: (number)[]; capacity?: (number)[]; skills?: (number)[]; time_window?: (number)[]; breaks?: ({ id?: number; service?: number; time_windows?: ((number)[])[] })[] })[];
    options?: { g?: boolean };
  }) => Promise<OptimizationResponse>;

  /**
   * Forward geocode an address or place name
   */
  geocodeSearch: (input: {
    /** Free-form address or place name. */
    text: string;
    /** Longitude to bias results toward. */
    "focus.point.lon"?: number;
    /** Latitude to bias results toward. */
    "focus.point.lat"?: number;
    /** ISO 3166-1 country code to restrict results to (e.g. `AU`). */
    "boundary.country"?: string;
    /** Maximum candidates to return. */
    size?: number;
  }) => Promise<GeocodeResponse>;

  /**
   * Reverse-geocode a coordinate into an address
   */
  geocodeReverse: (input: {
    /** Longitude. */
    "point.lon": number;
    /** Latitude. */
    "point.lat": number;
    /** Maximum candidates to return. */
    size?: number;
    /** Restrict to this radius (km) around the point. */
    "boundary.circle.radius"?: number;
  }) => Promise<GeocodeResponse>;
};

export * from "./schemas.js";
