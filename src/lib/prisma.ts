import { PrismaClient } from "@/generated/prisma/client.ts";

const globalForPrisma = globalThis as typeof globalThis & {
  prisma?: PrismaClient;
};

async function createPrismaClient() {
  const options: ConstructorParameters<typeof PrismaClient>[0] = {
    log: ["warn", "error"],
  };

  if (process.env.PRISMA_ACCELERATE_URL) {
    options.accelerateUrl = process.env.PRISMA_ACCELERATE_URL;
  } else if (process.env.TURSO_DATABASE_URL) {
    // Turso / LibSQL adapter for cloud persistence (e.g. Vercel)
    try {
      const { createClient } = await import("@libsql/client");
      const { PrismaLibSql } = await import("@prisma/adapter-libsql");

      const libsql = createClient({
        url: process.env.TURSO_DATABASE_URL,
        authToken: process.env.TURSO_AUTH_TOKEN,
      });

      options.adapter = new PrismaLibSql(libsql);
    } catch (cause) {
      throw new Error(
        `Failed to load @prisma/adapter-libsql or @libsql/client. Cause: ${cause instanceof Error ? cause.message : String(cause)}`,
      );
    }
  } else {
    // Local SQLite adapter
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      throw new Error("DATABASE_URL or TURSO_DATABASE_URL is required for Prisma adapter initialization.");
    }

    try {
      const { PrismaBetterSqlite3 } = await import("@prisma/adapter-better-sqlite3");
      options.adapter = new PrismaBetterSqlite3({ url: databaseUrl });
    } catch (cause) {
      throw new Error(
        `Failed to load @prisma/adapter-better-sqlite3. Install the package and run this project with Node >=22.12.0 or install the required native build tools. Cause: ${cause instanceof Error ? cause.message : String(cause)}`,
      );
    }
  }

  return new PrismaClient(options);
}

export const prisma = globalForPrisma.prisma ?? (await createPrismaClient());

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
