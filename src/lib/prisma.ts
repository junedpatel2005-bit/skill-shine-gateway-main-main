import { PrismaClient } from "@/generated/prisma-client/client.ts";

const globalForPrisma = globalThis as typeof globalThis & {
  prisma?: PrismaClient;
};

async function createPrismaClient() {
  const options = {
    log: ["warn", "error"],
  } as NonNullable<ConstructorParameters<typeof PrismaClient>[0]>;

  if (process.env.PRISMA_ACCELERATE_URL) {
    options.accelerateUrl = process.env.PRISMA_ACCELERATE_URL;
  } else {
    // LibSQL works with both Turso in production and file: SQLite URLs locally.
    // This keeps the driver consistent with the SQLite Prisma schema and avoids
    // loading a native better-sqlite3 adapter in Vercel deployments.
    const databaseUrl = process.env.TURSO_DATABASE_URL ?? process.env.DATABASE_URL;
    if (!databaseUrl) {
      throw new Error("DATABASE_URL or TURSO_DATABASE_URL is required for Prisma adapter initialization.");
    }

    try {
      const { PrismaLibSql } = await import("@prisma/adapter-libsql");
      options.adapter = new PrismaLibSql({
        url: databaseUrl,
        authToken: process.env.TURSO_AUTH_TOKEN,
      });
    } catch (cause) {
      throw new Error(
        `Failed to load @prisma/adapter-libsql or @libsql/client. Cause: ${cause instanceof Error ? cause.message : String(cause)}`,
      );
    }
  }

  return new PrismaClient(options);
}

export const prisma = globalForPrisma.prisma ?? (await createPrismaClient());

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
