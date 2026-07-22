# Fix Prisma Client initialization for Cloudflare Workers / Edge

The `PrismaClientConstructorValidationError` occurs because the app is running in an environment (likely Cloudflare Workers via TanStack Start) where Prisma requires a driver adapter to connect to the database. The native binary query engine is not supported in these environments.

## User Review Required

> [!IMPORTANT]
> I will be installing `pg` and `@prisma/adapter-pg` dependencies. These are required to allow Prisma to connect to PostgreSQL (Supabase) in an edge environment.

## Proposed Changes

### [Component] Database Configuration

#### [MODIFY] [schema.prisma](file:///D:/skill-shine-gateway-main-main/prisma/schema.prisma)
- Add `previewFeatures = ["driverAdapters"]` to the `generator client` block.
- Ensure `url` and `directUrl` are properly referenced from environment variables.

#### [MODIFY] [prisma.ts](file:///D:/skill-shine-gateway-main-main/src/lib/prisma.ts)
- Import `pg` and `PrismaPg`.
- Update `createPrismaClient` to initialize a `pg.Pool` and pass it to `PrismaClient` via the `adapter` option.

### [Component] Dependencies

#### [MODIFY] [package.json](file:///D:/skill-shine-gateway-main-main/package.json)
- I will run commands to add `pg` and `@prisma/adapter-pg` to dependencies.

## Verification Plan

### Automated Tests
- Run `prisma generate` to ensure the client is generated with driver adapter support.
- Check if the server starts without the `PrismaClientConstructorValidationError`.

### Manual Verification
- Refresh the page where the error occurred and verify that database queries are now working.
