import request from "supertest";
import app from "../src/server.js";

describe("Public routes are reachable without a token", () => {
  const publicRoutes = [
    { path: "/api/products", method: "get" },
    { path: "/api/products/1", method: "get" },
  ];

  publicRoutes.forEach(({ path, method }) => {
    test(`${method.toUpperCase()} ${path} does not require authentication`, async () => {
      const res = await request(app)[method](path);
      expect(res.statusCode).not.toBe(401);
    });
  });
});

describe("Protected routes require authentication", () => {
  const protectedRoutes = [
    { path: "/api/products", method: "post", body: { name: "Test product" } },
    { path: "/api/products/1", method: "delete" },
    { path: "/api/user/profile", method: "get" },
    { path: "/api/user/profile", method: "put", body: { full_name: "X" } },
    { path: "/api/user/change-password", method: "post" },
    { path: "/api/user/stats", method: "get" },
    { path: "/api/user/products", method: "get" },
    { path: "/api/user/orders", method: "get" },
    { path: "/api/user/notifications", method: "post" },
    { path: "/api/user/account", method: "delete" },
  ];

  protectedRoutes.forEach(({ path, method, body }) => {
    test(`${method.toUpperCase()} ${path} requires authentication`, async () => {
      const requestBuilder = request(app)[method](path);
      const res = body ? await requestBuilder.send(body) : await requestBuilder;

      expect(res.statusCode).toBe(401);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toMatch(
        /no token provided|invalid or expired token/i,
      );
    });
  });
});
