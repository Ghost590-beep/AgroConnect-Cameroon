# Deployment Guide

## Production build

This backend is a Node.js Express API. Deployment typically requires:

- Node.js 18+ installed
- A configured MySQL database
- Environment variables for database credentials and JWT secret

## Run in production

```bash
cd server
npm install --production
npm start
```

## Recommended deployment platforms

- DigitalOcean App Platform
- AWS Elastic Beanstalk
- Heroku (with ClearDB or other MySQL add-on)
- Railway

## Environment variables

The `.env` file should include:

- `PORT`
- `DB_HOST`
- `DB_PORT`
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`
- `JWT_SECRET`

### Client-side environment

For the React frontend, set a production API base URL in `client/.env.production` when the frontend and API are hosted on different domains:

```env
VITE_API_BASE=http://173.249.53.17
VITE_GOOGLE_CLIENT_ID=your-google-client-id
```

If the backend serves the frontend from the same host (recommended for production), you can leave `VITE_API_BASE` unset and the app will use relative API paths (`/api`).

## GitHub Actions CI/CD

The repository can use GitHub Actions to build, test, and deploy automatically when code is pushed to `main`.

Required GitHub Secrets:

- `VPS_HOST`
- `VPS_USER`
- `VPS_PORT`
- `VPS_DEPLOY_PATH`
- `VPS_PRIVATE_KEY` or `VPS_PASSWORD`
- `VPS_NODE_ENV`

The workflow will:

1. install and test the backend
2. install and build the frontend
3. deploy to the VPS on `main`

The repo also includes `ecosystem.config.js` so the backend can be managed by PM2 in production.

## Database migration / seed

Use `server/src/config/seed.sql` to create test data and schema if needed.
