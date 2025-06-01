import { jest } from "@jest/globals";
import request from "supertest";
import express from "express";

// Mock middleware và controller
jest.unstable_mockModule("../src/middlewares/auth.js", () => ({
  authMiddleware: (req, res, next) => next(),
  authRoles: () => (req, res, next) => next(),
}));

jest.unstable_mockModule("../src/controllers/accountController.js", () => ({
  accountController: {
    getAllAccounts: (req, res) =>
      res
        .status(200)
        .json([
          { id: "ACC12345", Email: "user@example.com", Role: "resident" },
        ]),
    loginAccount: (req, res) => res.status(200).json({ token: "fake-token" }),
    createAccount: (req, res) => res.status(201).json({ id: "ACC12345" }),
    changePassword: (req, res) => res.status(200).json({ message: "ok" }),
    removeAccount: (req, res) => res.status(200).json({ message: "ok" }),
    updateAccount: (req, res) => res.status(200).json({ message: "ok" }),
    forgetPassword: (req, res) => res.status(200).json({ message: "ok" }),
    getAccountById: (req, res) => res.status(200).json({ id: "ACC12345" }),
    // ...mock thêm các hàm khác nếu cần
  },
}));

let accountRoute;
let app;

beforeAll(async () => {
  ({ accountRoute } = await import("../src/routes/accountRoute.js"));
  app = express();
  app.use(express.json());
  app.use("/accounts", accountRoute);
});

describe("GET /accounts/get-all", () => {
  it("should return 200 and an array of accounts", async () => {
    const response = await request(app).get("/accounts/get-all");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0]).toHaveProperty("Email");
    expect(response.body[0]).toHaveProperty("Role");
  });
});
