# Security Guide

## Authentication

- Uses JWT tokens for protected endpoints.
- Tokens should be sent in the `Authorization` header as `Bearer <token>`.
- Keep `JWT_SECRET` secure and do not commit it to source control.

## Password handling

- Passwords must be hashed before storage.
- The backend uses `bcrypt` for hashing.

## Recommended security checks

- Use HTTPS in production.
- Validate all request bodies using `express-validator`.
- Restrict CORS to trusted origins when deploying.
- Monitor dependencies with tools like `Snyk` or `npm audit`.

## Additional testing

- Use OWASP ZAP or similar tools to scan for API vulnerabilities.
- Include rate limiting in the future to protect public endpoints.
