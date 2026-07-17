import request from "supertest";
import app from "../src/server.js";

async function registerAndLogin() {
  const email = `product.test.${Date.now()}@example.com`;
  await request(app).post("/api/auth/register").send({
    full_name: "Product Tester",
    email,
    password: "Password123!",
    phone: "+237600000001",
    location: "Douala",
  });
  const loginRes = await request(app)
    .post("/api/auth/login")
    .send({ email, password: "Password123!" });
  return loginRes.body.data.token;
}

describe("Product API", () => {
  test("POST /api/products requires authentication", async () => {
    const res = await request(app).post("/api/products").send({
      name: "Sample product",
      price: 1000,
      category: "Crops & Seeds",
      description: "Sample description",
    });

    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toMatch(
      /no token provided|invalid or expired token/i,
    );
  });

  test('status "public" is normalized and stored as "active"', async () => {
    const token = await registerAndLogin();

    const createRes = await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Public Product",
        category: "Crops & Seeds",
        description: "Available for sale",
        price: 500,
        status: "public",
      });

    expect(createRes.statusCode).toBe(201);
    const productId = createRes.body.data.id;

    const getRes = await request(app).get(`/api/products/${productId}`);
    expect(getRes.statusCode).toBe(200);
    expect(getRes.body.data.status).toBe("active");
    expect(getRes.body.data.farmer).toEqual(expect.any(String));
  });

  test("draft products are excluded from the public list but visible to their owner", async () => {
    const token = await registerAndLogin();

    const createRes = await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Draft Product",
        category: "Crops & Seeds",
        status: "draft",
      });

    expect(createRes.statusCode).toBe(201);
    const productId = createRes.body.data.id;

    const publicListRes = await request(app).get("/api/products");
    expect(publicListRes.body.data.some((p) => p.id === productId)).toBe(false);

    const ownProductsRes = await request(app)
      .get("/api/user/products")
      .set("Authorization", `Bearer ${token}`);
    expect(ownProductsRes.body.data.some((p) => p.id === productId)).toBe(true);
  });
});
