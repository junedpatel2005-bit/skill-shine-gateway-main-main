import { PrismaClient } from "@/generated/prisma-client/client.ts";

const globalForPrisma = globalThis as typeof globalThis & {
  prisma?: PrismaClient;
};

function getConfiguredDatabaseUrl() {
  const candidates = [process.env.SUPABASE_POSTGRES_URL, process.env.POSTGRES_URL, process.env.DIRECT_URL, process.env.DATABASE_URL];
  return candidates.find((candidate): candidate is string => Boolean(candidate && /^postgres(ql)?:\/\//i.test(candidate.trim())))?.trim();
}

async function createPrismaClient() {
  const options = {
    log: ["warn", "error"],
  } as NonNullable<ConstructorParameters<typeof PrismaClient>[0]>;

  const configuredDatabaseUrl = getConfiguredDatabaseUrl();

  if (!configuredDatabaseUrl) {
    throw new Error("Missing Prisma database URL. Set SUPABASE_POSTGRES_URL, POSTGRES_URL, or DIRECT_URL to your Supabase PostgreSQL connection string.");
  }

  process.env.DATABASE_URL = configuredDatabaseUrl;

  return new PrismaClient(options);
}

export const prisma = globalForPrisma.prisma ?? (await createPrismaClient());

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
