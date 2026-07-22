# Fix Prisma Driver Adapter Error

The application is encountering a `PrismaClientConstructorValidationError` because it's running in an environment (likely a Cloudflare Worker emulation via Vite/TanStack Start) that doesn't support Prisma's native engines. In such environments, Prisma requires a **driver adapter** to connect to the database.

## User Review Required

> [!IMPORTANT]
> This change adds `pg` and `@prisma/adapter-pg` as dependencies. These are required for Prisma to work in Cloudflare Workers and similar environments.

## Proposed Changes

### Dependencies

#### [MODIFY] [package.json](file:///D:/skill-shine-gateway-main-main/package.json)
- Add `pg` and `@prisma/adapter-pg` to `dependencies`.
- Add `@types/pg` to `devDependencies`.

### Prisma Configuration

#### [MODIFY] [prisma/schema.prisma](file:///D:/skill-shine-gateway-main-main/prisma/schema.prisma)
- Ensure the client generator is correctly configured (though Prisma 7 defaults should work, explicitly enabling driver adapters can sometimes help with specific generation issues).

#### [MODIFY] [src/lib/prisma.ts](file:///D:/skill-shine-gateway-main-main/src/lib/prisma.ts)
- Update `createPrismaClient` to use `PrismaPg` from `@prisma/adapter-pg` and `Pool` from `pg`.
- This will provide the necessary driver adapter to `PrismaClient`.

## Verification Plan

### Automated Tests
- Run `npm run dev` and verify the app loads without the `PrismaClientConstructorValidationError`.
- Verify database connectivity by checking if the "ensureWebsitePages" logic runs successfully.

### Manual Verification
- Check the console for any Prisma-related warnings or errors.
- Navigate to a page that uses Prisma (e.g., the home page) and ensure data is fetched correctly.
