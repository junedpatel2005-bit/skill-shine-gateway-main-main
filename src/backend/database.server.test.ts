import { describe, expect, it } from "vitest";
import { getApiDatabase } from "./database.server";

describe("Supabase database adapter", () => {
  it("persists and reads a User row through the adapter", () => {
    const db = getApiDatabase();
    const email = `adapter-test-${Date.now()}@example.com`;
    const now = new Date().toISOString();

    const result = db
      .prepare(
        `INSERT INTO "User" (role, firstName, lastName, email, passwordHash, authProvider, isActive, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, 1, ?, ?)`,
      )
      .run("CLIENT", "Adapter", "Test", email, "hash123", "LOCAL", now, now);

    expect(result.lastInsertRowid).toBeGreaterThan(0);

    const user = db.prepare(`SELECT * FROM "User" WHERE email=?`).get(email) as { email: string; role: string } | undefined;

    expect(user).toBeDefined();
    expect(user?.email).toBe(email);
    expect(user?.role).toBe("CLIENT");
  });
});
