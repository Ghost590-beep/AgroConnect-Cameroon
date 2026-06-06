# Authentication API

## Endpoints

### Register

- Method: `POST`
- Route: `/api/auth/register`
- Body:
  - `full_name` (string, required)
  - `email` (string, required)
  - `password` (string, required)
  - `phone` (string, required)
  - `location` (string, required)

### Login

- Method: `POST`
- Route: `/api/auth/login`
- Body:
  - `email` (string, required)
  - `password` (string, required)

### Get user by ID

- Method: `GET`
- Route: `/api/auth/{id}`
- Authorization: Bearer JWT required

### Update profile

- Method: `PUT`
- Route: `/api/auth/{id}/profile`
- Authorization: Bearer JWT required
- Body may include:
  - `full_name`
  - `phone`
  - `location`

## Example Authorization

```
Authorization: Bearer <JWT_TOKEN>
```
