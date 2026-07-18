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

  test("POST /api/auth/google rejects an invalid ID token", async () => {
    const res = await request(app)
      .post("/api/auth/google")
      .send({ id_token: "not-a-real-google-token" });

    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
  });

  test("register -> login -> GET /api/user/profile happy path", async () => {
    const email = `test.user.${Date.now()}@example.com`;

    const registerRes = await request(app).post("/api/auth/register").send({
      full_name: "Test User",
      email,
      password: "Password123!",
      phone: "+237600000000",
      location: "Douala",
    });

    expect(registerRes.statusCode).toBe(201);
    expect(registerRes.body.data.token).toEqual(expect.any(String));
    expect(registerRes.body.data.user.email).toBe(email);
    expect(registerRes.body.data.user.password).toBeUndefined();

    const loginRes = await request(app)
      .post("/api/auth/login")
      .send({ email, password: "Password123!" });

    expect(loginRes.statusCode).toBe(200);
    const { token } = loginRes.body.data;

    const profileRes = await request(app)
      .get("/api/user/profile")
      .set("Authorization", `Bearer ${token}`);

    expect(profileRes.statusCode).toBe(200);
    expect(profileRes.body.data.email).toBe(email);
  });
});
