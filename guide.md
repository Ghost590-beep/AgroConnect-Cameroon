# AgroConnect Project Guide

## 1. Push this project to GitHub

### 1.1 Initialize Git (if not already initialized)

```bash
cd c:/Users/Lenovo/Desktop/AgroConnect-Cameroon
git init
```

### 1.2 Add a remote repository

Replace `<YOUR_REMOTE_URL>` with your GitHub repo URL.

```bash
git remote add origin <YOUR_REMOTE_URL>
```

### 1.3 Stage and commit files

```bash
git add .
git commit -m "Initial AgroConnect backend and frontend project"
```

### 1.4 Push to GitHub

```bash
git branch -M main
git push -u origin main
```

If your repository uses `master` instead of `main`, replace `main` with `master`.

---

## 2. How team members clone and start the project

### 2.1 Clone the repository

```bash
git clone <YOUR_REMOTE_URL>
cd AgroConnect-Cameroon
```

### 2.2 Install dependencies

This project has two folders:

- `server` for the backend API
- `client` for the frontend app

Install dependencies separately in each folder.

```bash
cd server
npm install
```

If the frontend is needed too:

```bash
cd ../client
npm install
```

### 2.3 Start the backend server

From the `server` folder:

```bash
npm run dev
```

This should launch the backend and watch for changes in the `server` folder. If you want the production-style startup instead, use:

```bash
npm start
```

Notes:

- `npm run dev` is for development with automatic restart if files change.
- `npm start` runs the server once.

### 2.4 Start the frontend

If the frontend is being used, go to `client` and run the frontend start command there. This repository has a `client/package.json` with its own scripts.

```bash
cd ../client
npm install
npm run dev
```

---

## 3. How frontend developers consume this backend

The backend API is mounted under:

```text
http://localhost:5000/api
```

Common backend endpoints include:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/products`
- `POST /api/products`
- `GET /api/farmers/:id`

Protected routes require a JWT token in the request header:

```http
Authorization: Bearer <JWT_TOKEN>
```

Frontend developers can use Axios, fetch, or any HTTP client to call these routes.

---

## 4. How to test the API using Swagger

### 4.1 Open Swagger UI

Start the backend server, then open:

```text
http://localhost:5000/api-docs
```

### 4.2 Purpose of Swagger UI

Swagger UI is a live API explorer and documentation page. It lets you:

- inspect all available routes
- understand request bodies, query parameters, and response formats
- authenticate protected routes with a Bearer token
- execute requests directly from the browser

### 4.3 Are all APIs working properly?

Swagger UI only shows routes and schemas. It does not guarantee every endpoint works correctly in every case. It is a useful tool for manual exploration and validation, but proper automated testing is still required.

To know whether APIs are working, use both:

- Swagger for live manual validation
- automated tests for regression coverage

---

## 5. What `npm test` does

In the `server` folder, `npm test` runs the backend test suite using Jest and Supertest.

It is not a general frontend test command. It only tests the backend API layer.

### 5.1 What it covers

The current backend tests include:

- validation behavior for authentication endpoints
- protected route middleware behavior
- route mounting checks for main API groups
- Swagger UI route availability

### 5.2 What it does not cover

It does not currently test:

- frontend UI logic
- full frontend integration
- database migrations or seed data setup beyond request behavior
- all business logic branches in every controller/service

---

## 6. Recommended startup workflow for developers

1. Clone repository
2. Install dependencies in `server` and `client`
3. Start backend in `server` with `npm run dev`
4. Start frontend in `client` with `npm run dev`
5. Use Swagger at `http://localhost:5000/api-docs` to explore and test backend routes
6. Run `npm test` in `server` when making backend changes

---

## 7. OOP concepts in this codebase

This project uses object-oriented design patterns in the backend.

### 7.1 Abstraction

Controllers, services, and repositories each expose a clean interface for their responsibilities.

- `controllers/*` handle HTTP requests and responses
- `services/*` contain business logic
- `repositories/*` access the database

This abstracts away implementation details so each layer only knows what it needs to do.

### 7.2 Encapsulation

Each class or module keeps its internal behavior private and exposes only the methods needed by other layers.
For example, `Database` in `server/src/config/db.js` exposes `query()` and `transaction()` instead of exposing raw connection details.

### 7.3 Inheritance

The code structure is mostly layer-based rather than deep class inheritance, but some controller or service objects may share common patterns. If there are base classes in the backend, they are used to avoid duplicate logic across similar controllers or services.

### 7.4 Polymorphism

Route handlers and middleware are composed so the same Express middleware patterns work with many route controllers.
For example, the same `AuthMiddleware.verifyToken` method can protect any route regardless of resource type.

### 7.5 Single Responsibility Principle (SRP)

Each file has one main purpose:

- routes only define URLs and middleware
- controllers only format HTTP requests/responses
- services only handle business rules
- repositories only query the database

### 7.6 Dependency Injection / Inversion of Control

Routes import controllers, controllers import services, and services import repositories. Each layer depends on abstractions rather than directly managing lower-level details.
This makes the code easier to test and maintain.

---

## 8. API Mocking

API mocking is useful when external services are not available or when you want to simulate them during development.

### WireMock

WireMock is a Java-based tool that runs a local mock server. It is useful when external services are unavailable, such as:

- Payment API unavailable
- SMS API unavailable
- Email API unavailable

With WireMock, you can create response stubs that mimic those external services.

### Mockoon

Mockoon is an easier, GUI-based alternative for mocking APIs.

- Start a local mock server in Mockoon
- Define the routes and responses visually
- Use the mocked endpoints from your frontend or backend tests

Use mocking when your backend depends on external integrations that are not yet ready or not reachable.

---

## 9. Final notes

- Use `npm run dev` for local backend development.
- Use `npm start` for a normal backend startup.
- Use Swagger to inspect endpoints, but confirm behavior with the backend test suite.
- `npm test` in `server` runs API test coverage for the backend only.
- Frontend developers should clone the repo, install dependencies, and run the frontend and backend separately.

If you want, I can also add a short `git` checklist or a dedicated frontend setup section for your team.
