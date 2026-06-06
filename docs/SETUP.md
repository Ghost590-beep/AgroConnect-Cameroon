# Setup Guide

## Install dependencies

```bash
cd server
npm install
```

## Environment

Create a `.env` file in `server/` with the following variables:

```env
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=agroconnect
JWT_SECRET=your_jwt_secret
```

## Start the server

```bash
cd server
npm run dev
```

## Test the API

```bash
cd server
npm test
```

## Swagger documentation

Open the browser to:

- `http://localhost:5000/api-docs`
