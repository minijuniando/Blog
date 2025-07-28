import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { describe, expect, it, vi } from "vitest";
import { validateUser } from "../../middleware/auth";

vi.mock("jsonwebtoken");

describe("Middleware: validateUser", (): void => {
  it("should return 401 if no authorization header is present", async (): Promise<void> => {
    const req = { headers: {} } as Request;
    const res = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
    } as unknown as Response;
    const next = vi.fn();

    await validateUser(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith("Missing auth token");
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 403 if token is invalid", async () => {
    const req = {
      headers: { authorization: "Bearer invalidtoken" },
    } as Request;
    const res = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
    } as unknown as Response;
    const next = vi.fn();

    (jwt.verify as vi.Mock).mockImplementation(
      (
        token: string,
        secret: string,
        callback: (err: Error, idk: null) => unknown,
      ): void => {
        callback(new Error("Invalid token"), null);
      },
    );

    await validateUser(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(next).not.toHaveBeenCalled();
  });

  it("should call next() and attach user to request if token is valid", async (): Promise<void> => {
    const userPayload = { id: "123", name: "Test User" };
    const req = {
      headers: { authorization: "Bearer validtoken" },
    } as Request;

    const res = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
    } as unknown as Response;
    const next = vi.fn();

    (jwt.verify as vi.Mock).mockImplementation((token, secret, callback) => {
      callback(null, userPayload);
    });

    await validateUser(req, res, next);

    expect(next).toHaveBeenCalled();
    expect((req as any).user).toEqual(userPayload);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.send).not.toHaveBeenCalled();
  });
});
