import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as typeof globalThis & {
  prisma?: PrismaClient | unknown;
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
  const { PrismaPg } = await import("@prisma/adapter-pg");

  adapter = new PrismaPg({
    connectionString: configuredDatabaseUrl,
  });
} catch (err) {
  throw new Error(
    `Failed to load @prisma/adapter-pg: ${
      err instanceof Error ? err.message : String(err)
    }`
  );
}
  (options as any).adapter = adapter;

  return new PrismaClient(options as any);
}

function makeUnavailableProxy(message: string) {
  const handler: ProxyHandler<any> = {
    get() {
      return new Proxy(() => {
        throw new Error(message);
      }, handler);
    },
    apply() {
      throw new Error(message);
    },
  };
  return new Proxy({}, handler) as any;
}

let prismaInstance: PrismaClient | any = null;
let prismaInitError: unknown = null;

try {
  prismaInstance = globalForPrisma.prisma ?? (await createPrismaClient());
  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prismaInstance;
  }
} catch (err) {
  // Don't throw during module import — log and export a proxy that fails on use.
  // This prevents serverless function cold starts from crashing the whole function
  // when environment or adapter isn't available.
  // The real error will still appear in the server logs for diagnosis.
  // eslint-disable-next-line no-console
  console.error("Prisma client initialization failed:", err);
  prismaInitError = err;
  prismaInstance = makeUnavailableProxy(
    `Prisma client is not available in this environment: ${err instanceof Error ? err.message : String(err)}`
  );
}

export const prisma = prismaInstance;
export const isPrismaConfigured = () => Boolean(getConfiguredDatabaseUrl());
export const getPrismaInitError = () => prismaInitError;
