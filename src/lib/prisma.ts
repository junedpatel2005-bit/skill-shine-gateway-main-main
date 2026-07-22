import { PrismaClient } from "@prisma/client";

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

  // Load the Postgres adapter and pass it to the Prisma client.
  // Use a dynamic import so we can provide a clear error message if the
  // adapter package isn't installed.
  let adapter: unknown;
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const mod = await import("@prisma/adapter-pg");
    const PrismaPg = (mod && (mod.PrismaPg ?? mod.default)) as any;
    adapter = new PrismaPg({ connectionString: configuredDatabaseUrl });
  } catch (err) {
    throw new Error(
      "Missing package '@prisma/adapter-pg'. Run `npm install @prisma/adapter-pg` and restart your dev server."
    );
  }

  (options as any).adapter = adapter;

  return new PrismaClient(options as any);
}

export const prisma = globalForPrisma.prisma ?? (await createPrismaClient());

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
