import request from "supertest";
import app from "../src/server.js";

describe("Route availability", () => {
  const publicRoutes = [
    { path: "/api/farmers/1", method: "get" },
    { path: "/api/products/1", method: "get" },
    { path: "/api/categories", method: "get" },
    { path: "/api/payment-providers", method: "get" },
    { path: "/api/payment-methods", method: "get" },
    { path: "/api/reviews/latest", method: "get" },
  ];

  publicRoutes.forEach(({ path, method }) => {
    test(`${method.toUpperCase()} ${path} is mounted`, async () => {
      const res = await request(app)[method](path);
      expect(res.statusCode).not.toBe(404);
    });
  });
});

describe("Protected API middleware", () => {
  const protectedRoutes = [
    { path: "/api/products", method: "post", body: { name: "Test product" } },
    { path: "/api/orders", method: "post", body: { items: [] } },
    { path: "/api/farmers", method: "post", body: { name: "Farmer" } },
    { path: "/api/cart", method: "post", body: { productId: 1, quantity: 1 } },
    { path: "/api/categories", method: "post", body: { name: "Test" } },
    { path: "/api/deliveries", method: "post", body: { orderId: 1 } },
    { path: "/api/escrows", method: "post", body: { orderId: 1, amount: 100 } },
    { path: "/api/favorites", method: "post", body: { productId: 1 } },
    {
      path: "/api/messages",
      method: "post",
      body: { senderId: 1, receiverId: 2, text: "Hello" },
    },
    { path: "/api/notifications/1", method: "get" },
    { path: "/api/orders/1", method: "get" },
    { path: "/api/cart", method: "get" },
    { path: "/api/messages/received/1", method: "get" },
    { path: "/api/escrows/1", method: "get" },
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
