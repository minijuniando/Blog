import bcrypt from "bcrypt";
import { type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { db } from "../../db/client";
import { signup } from "../../routes/user/signup";
import { handleSendEmail } from "../../utils/send-email";

// Mocking the named export 'db' from the client module
vi.mock("../../db/client", () => ({
  db: {
    user: {
      findUnique: vi.fn(),
      create: vi.fn(),
    },
  },
}));

// Mocking the named export 'handleSendEmail'
vi.mock("../../utils/send-email", () => ({
  handleSendEmail: vi.fn(),
}));

// Mocking the default export 'bcrypt'
vi.mock("bcrypt", () => ({
  default: {
    hash: vi.fn(),
  },
}));

// Mocking the default export 'jwt'
vi.mock("jsonwebtoken", () => ({
  default: {
    sign: vi.fn(),
  },
}));

describe("User signup", () => {
  let request: Partial<Request>;
  let response: Partial<Response>;
  let statusMock: ReturnType<typeof vi.fn>;
  let jsonMock: ReturnType<typeof vi.fn>;
  let sendMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    statusMock = vi.fn().mockReturnThis();
    jsonMock = vi.fn();
    sendMock = vi.fn();
    response = {
      status: statusMock,
      json: jsonMock,
      send: sendMock,
    };
    request = {
      body: {
        username: "testuser",
        email: "test@example.com",
        password: "password123",
        confirmPassword: "password123",
        role: "READER",
      },
    };
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should create a new user and return a token", async () => {
    vi.mocked(db.user.findUnique).mockResolvedValue(null);
    vi.mocked(bcrypt.hash).mockResolvedValue("hashedpassword");
    vi.mocked(db.user.create).mockResolvedValue({
      id: "1",
      username: "testuser",
      email: "test@example.com",
      role: "READER",
      photoUrl: null,
      createdAt: new Date(),
    });
    vi.mocked(jwt.sign).mockReturnValue("testtoken");

    await signup(request as Request, response as Response);

    expect(statusMock).toHaveBeenCalledWith(201);
    expect(sendMock).toHaveBeenCalledWith({
      user: expect.any(Object),
      jwt: "testtoken",
    });
    expect(handleSendEmail).toHaveBeenCalled();
  });

  it("should return 400 if user already exists", async () => {
    vi.mocked(db.user.findUnique).mockResolvedValue({
      id: "1",
      username: "existinguser",
      email: "test@example.com",
      password: "hashedpassword",
      role: "READER",
      photoUrl: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await signup(request as Request, response as Response);

    expect(statusMock).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith({
      success: false,
      message: "Usuário já existe com este email",
    });
  });

  it("should return 400 for invalid input", async () => {
    request.body.password = "short";
    request.body.confirmPassword = "short";

    await signup(request as Request, response as Response);

    expect(statusMock).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith({
      success: false,
      message: "Senha deve ter pelo menos 6 caracteres",
    });
  });
});