# OpenRouteService API

Open-source routing, geocoding, isochrone, distance-matrix, and VRP optimization API
built on OpenStreetMap. Pelias powers geocoding; Vroom powers optimization.

This spec covers the endpoints commonly used for back-end agent workflows
(geocoding, matrices for VRP solvers, route ETAs, isochrones, full VRP solve).
The full ORS surface (POIs, snap-to-road, elevation, optimization advanced
constraints) can be added incrementally — see notes in the catalog entry.

The hosted free API (`https://api.openrouteservice.org`) exposes routing,
matrix, isochrones, optimization, and geocoding. Self-hosted ORS Docker
covers the ORS backend endpoints (routing, matrix, isochrones, optimization);
geocoding is hosted-public-API only.

Auth: pass the API key in the `Authorization` header. Sign up free at
https://openrouteservice.org/dev/#/signup.

Rate limits (free plan, hosted): 2,000 directions/day, 500 matrix/day,
500 optimization/day, 500 isochrones/day, 1,000 geocode/day, 40/min on
most endpoints. Self-hosted backend endpoints: no hosted request caps.

- **Provider URL**: https://raw.githubusercontent.com/GIScience/openrouteservice-docs/master/API%20V2/swagger.json
- **Operations**: 6
- **Authentication**: apiKey
- **Top capabilities**: geocode, directions, isochrones, matrix, optimization

## Quick start

```ts
import client from "@utdk/openrouteservice";

// Use the typed client to call provider operations
const result = await client.someOperation({});
```

## Documentation

Refer to the typed client interface (`types.ts`) for complete operation signatures with TypeScript types.
