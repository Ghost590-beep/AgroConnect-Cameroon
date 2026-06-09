import request from "supertest";
import app from "../src/server.js";

describe("Auth API", () => {
  test("POST /api/auth/register rejects invalid payload", async () => {
    const res = await request(app).post("/api/auth/register").send({});

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toMatch(/validation failed/i);
  });

  test("POST /api/auth/login rejects invalid payload", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "bademail", password: "" });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  test("POST /api/auth/google rejects invalid payload", async () => {
    const res = await request(app).post("/api/auth/google").send({});

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toMatch(/validation failed/i);
  });

  test("GET /api/auth/1 rejects missing token", async () => {
    const res = await request(app).get("/api/auth/1");

    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toMatch(
      /no token provided|invalid or expired token/i,
    );
  });
});
