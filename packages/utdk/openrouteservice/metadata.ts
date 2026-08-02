import type { ToolRuntimeMetadataMap } from "../client.js";

export const toolMetadata = {
  "getDirections": {
    "accessPath": [
      "getDirections"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "coordinates",
      "alternative_routes",
      "units",
      "language",
      "instructions",
      "elevation",
      "preference",
      "radiuses"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v2/directions/{profile}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "profile"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Compute a route between coordinates",
    "parameterDescriptions": {
      "profile": "Routing profile. `driving-hgv` is the right pick for service vans / utility\nvehicles — it respects bridge weight, low-clearance, and large-vehicle turn\nrestrictions that `driving-car` ignores.\n"
    }
  },
  "getMatrix": {
    "accessPath": [
      "getMatrix"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "locations",
      "sources",
      "destinations",
      "metrics",
      "units",
      "resolve_locations"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v2/matrix/{profile}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "profile"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Many-to-many duration / distance matrix",
    "parameterDescriptions": {
      "profile": "Routing profile. `driving-hgv` is the right pick for service vans / utility\nvehicles — it respects bridge weight, low-clearance, and large-vehicle turn\nrestrictions that `driving-car` ignores.\n"
    }
  },
  "getIsochrones": {
    "accessPath": [
      "getIsochrones"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "locations",
      "range",
      "range_type",
      "interval",
      "attributes",
      "smoothing"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v2/isochrones/{profile}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "profile"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Reachable-area polygons by time or distance",
    "parameterDescriptions": {
      "profile": "Routing profile. `driving-hgv` is the right pick for service vans / utility\nvehicles — it respects bridge weight, low-clearance, and large-vehicle turn\nrestrictions that `driving-car` ignores.\n"
    }
  },
  "solveOptimization": {
    "accessPath": [
      "solveOptimization"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "jobs",
      "vehicles",
      "options"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/optimization",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Solve a Vehicle Routing Problem (Vroom)"
  },
  "geocodeSearch": {
    "accessPath": [
      "geocodeSearch"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/geocode/search",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "text",
      "focus.point.lon",
      "focus.point.lat",
      "boundary.country",
      "size"
    ],
    "description": "Forward geocode an address or place name",
    "parameterDescriptions": {
      "text": "Free-form address or place name.",
      "focus.point.lon": "Longitude to bias results toward.",
      "focus.point.lat": "Latitude to bias results toward.",
      "boundary.country": "ISO 3166-1 country code to restrict results to (e.g. `AU`).",
      "size": "Maximum candidates to return."
    }
  },
  "geocodeReverse": {
    "accessPath": [
      "geocodeReverse"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/geocode/reverse",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "point.lon",
      "point.lat",
      "size",
      "boundary.circle.radius"
    ],
    "description": "Reverse-geocode a coordinate into an address",
    "parameterDescriptions": {
      "point.lon": "Longitude.",
      "point.lat": "Latitude.",
      "size": "Maximum candidates to return.",
      "boundary.circle.radius": "Restrict to this radius (km) around the point."
    }
  }
} satisfies ToolRuntimeMetadataMap;
