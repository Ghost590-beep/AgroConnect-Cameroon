import request from "supertest";
import app from "../src/server.js";

describe("Product API", () => {
  test("POST /api/products requires authentication", async () => {
    const res = await request(app).post("/api/products").send({
      name: "Sample product",
      price: 1000,
      categoryId: 1,
      description: "Sample description",
    });

    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toMatch(
      /no token provided|invalid or expired token/i,
    );
  });
});
