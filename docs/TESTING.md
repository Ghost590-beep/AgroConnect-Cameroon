# Testing the AgroConnect Backend

## Overview

The backend uses Jest + Supertest for automated integration tests, and Swagger UI for manual API exploration.

## Run tests

From the `server` directory:

```bash
cd server
npm test
```

This project uses Jest with Node ESM support, so the `server/package.json` test scripts run Jest through Node's experimental VM modules flag.

To watch source changes and rerun tests automatically:

```bash
npm run test:watch
```

## What is covered

- `auth.test.js` checks that auth endpoints validate request payloads and reject bad login/register requests.
- `product.test.js` verifies that protected product creation routes require a JWT.
- `routes.test.js` verifies that major route groups are mounted and that protected endpoints return `401` when no token is provided.

## How to test the API using Swagger

1. Start the backend server:
   ```bash
   cd server
   npm start
   ```
2. Open the browser at:
   ```
   http://localhost:5000/api-docs
   ```
3. Use the Swagger UI to:
   - inspect each endpoint
   - review request schema and response examples
   - authenticate with `Bearer <token>` if the endpoint is protected
   - click `Try it out` for live testing

## How the frontend should consume the API

- The backend base URL is:
  - `http://localhost:5000/api` for local development
- Client requests should use the mounted routes under `/api`, for example:
  - `POST /api/auth/login`
  - `GET /api/products`
  - `POST /api/products` (requires auth)
- Protected routes require an HTTP header:
  - `Authorization: Bearer <JWT token>`

## Example Supertest pattern

```js
import request from "supertest";
import app from "../src/server.js";

test("GET /api/products is mounted", async () => {
  const res = await request(app).get("/api/products");
  expect(res.statusCode).not.toBe(404);
});
```

## Notes for backend developers

- Swagger docs are assembled from the route JSDoc blocks in `server/src/routes/*.js`.
- Add new route documentation by updating the comments in the route file.
- Keep tests focused on route availability, validation, and auth guard behavior so they remain stable while the database schema evolves.
