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

## Database migration / seed

Use `server/src/config/seed.sql` to create test data and schema if needed.
