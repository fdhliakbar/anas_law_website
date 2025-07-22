import { describe, it, expect } from "vitest";
import supertest from "supertest";

const api = supertest("http://localhost:3000");

const randomEmail = () =>
  `testuser_${Math.floor(Math.random() * 100000)}@example.com`;

let testUser = {
  name: "Test User",
  email: randomEmail(),
  password: "password123",
  confirmPassword: "password123",
};
let token = "";

describe("User API", () => {
  it("POST /api/users/post-users register user baru", async () => {
    const res = await api.post("/api/users/post-users").send({
      action: "register",
      ...testUser,
    });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("user");
    expect(res.body.user).toHaveProperty("email", testUser.email);
  });

  it("POST /api/users/post-users gagal register email sama", async () => {
    const res = await api.post("/api/users/post-users").send({
      action: "register",
      ...testUser,
    });
    expect(res.status).toBe(409);
    expect(res.body).toHaveProperty("message");
  });

  it("POST /api/users/post-users login user", async () => {
    const res = await api.post("/api/users/post-users").send({
      action: "login",
      email: testUser.email,
      password: testUser.password,
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
    token = res.body.token;
  });

  it("GET /api/users/get-users ambil semua user", async () => {
    const res = await api.get("/api/users/get-users");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("users");
    expect(Array.isArray(res.body.users)).toBe(true);
  });

  it("PUT /api/users/update-users update user profile", async () => {
    const newName = "Updated User";
    const res = await api
      .put("/api/users/update-users")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: newName });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("user");
    expect(res.body.user).toHaveProperty("name", newName);
  });

  it("DELETE /api/users/delete-users hapus user sendiri", async () => {
    const res = await api
      .delete("/api/users/delete-users")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message");
  });
});
