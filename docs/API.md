# AgroConnect API Documentation

## Live API Documentation

- Swagger UI is available at: `http://localhost:5000/api-docs`
- This is the primary living documentation for the backend.

## Key Endpoints

- `POST /api/auth/register` - register a new user
- `POST /api/auth/login` - login and retrieve JWT token
- `GET /api/auth/{id}` - retrieve user by id (protected)
- `PUT /api/auth/{id}/profile` - update profile (protected)
- `POST /api/products` - add product (protected)
- `GET /api/products` - list products
- `GET /api/products/{id}` - get product details

## API groups

- `POST /api/farmers`, `GET /api/farmers/:id`
- `POST /api/orders`, `GET /api/orders/:id`
- `POST /api/cart`, `GET /api/cart`
- `POST /api/categories`, `GET /api/categories`
- `POST /api/deliveries`, `GET /api/deliveries/:id`
- `POST /api/escrows`, `GET /api/escrows/:orderId`
- `POST /api/favorites`, `GET /api/favorites/user/:userId`
- `POST /api/messages`, `GET /api/messages/conversation/:userAId/:userBId`
- `POST /api/notifications/:userId/send`, `GET /api/notifications/:userId`
- `POST /api/payment-providers`, `GET /api/payment-providers`
- `POST /api/payment-methods`, `GET /api/payment-methods`
- `POST /api/reviews`, `GET /api/reviews/product/:productId`
- `POST /api/audit-logs`, `GET /api/audit-logs`

## Testing

- Run unit and integration tests with:
  ```bash
  cd server
  npm test
  ```
- Run tests continuously while you develop with:
  ```bash
  npm run test:watch
  ```

## Swagger and API discovery

- Live OpenAPI docs are available at `http://localhost:5000/api-docs`
- The Swagger UI is generated from JSDoc comments in the route files under `server/src/routes`
- Use the interactive `Try it out` button in Swagger to test endpoints before wiring the frontend
- Example frontend base URL for local development: `http://localhost:5000/api`

## Notes

- API routes are mounted under `/api`
- Authentication uses JWT tokens in the `Authorization: Bearer <token>` header
- Validation errors return `400` and standardized JSON with `success: false`
