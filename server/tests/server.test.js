import request from "supertest";
import app from "../src/server.js";

describe("Server documentation", () => {
  test("GET /api-docs returns Swagger UI content", async () => {
    const res = await request(app).get("/api-docs");

    expect([200, 301, 302]).toContain(res.statusCode);
  });
});
