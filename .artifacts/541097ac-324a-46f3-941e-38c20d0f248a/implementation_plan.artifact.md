# Implementation Plan - Migrate from better-sqlite3 to Prisma for Turso/LibSQL Compatibility

The current application uses a mix of Prisma and direct `better-sqlite3` calls. This causes failures in Vercel deployments because `better-sqlite3` is a native module that often fails to load in serverless environments, and it attempts to write to a local SQLite file (`prisma/app.db`) which is not persistent or writable in Vercel.

To fix the `HTTP 500` and `FUNCTION_INVOCATION_FAILED` errors, we will migrate all database interactions to use the centralized Prisma Client configured with the LibSQL adapter for Turso.

## User Review Required

> [!IMPORTANT]
> This migration involves moving several "shadow" tables from a local SQLite file into the main Prisma schema. This will require a `prisma db push` or `prisma migrate` to update the production Turso database.

> [!WARNING]
> Existing data in the local `prisma/app.db` file (if any was used in development) will not be automatically migrated to Turso unless a manual migration script is run. However, for production stability, this consolidation is mandatory.

## Proposed Changes

### Database Schema

#### [MODIFY] [schema.prisma](file:///D:/skill-shine-gateway-main-main/prisma/schema.prisma)
- Add models for:
    - `WebsitePage`
    - `LegalPage`
    - `ServiceCategory`
    - `UserNotification`
    - `UserNotificationState`
    - `ProjectRequest`
    - `ProjectTracking`
    - `ProjectWorkUpload`
    - `ProjectRevisionRequest`
    - `ProjectMilestone`
    - `ProjectCompletionRequest`
    - `SocketConversation`
    - `SocketMessage`
    - `SocketConversationClear`
- Ensure all enums and relations are correctly defined.

### Library Migration

#### [MODIFY] [src/lib/prisma.ts](file:///D:/skill-shine-gateway-main-main/src/lib/prisma.ts)
- Verify environment variable reading logic for `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN`.

#### [MODIFY] [src/lib/website-page-cms.server.ts](file:///D:/skill-shine-gateway-main-main/src/lib/website-page-cms.server.ts)
- Replace `better-sqlite3` with `prisma.websitePage`.

#### [MODIFY] [src/lib/legal-cms.server.ts](file:///D:/skill-shine-gateway-main-main/src/lib/legal-cms.server.ts)
- Replace `better-sqlite3` with `prisma.legalPage`.

#### [MODIFY] [src/lib/user-db.server.ts](file:///D:/skill-shine-gateway-main-main/src/lib/user-db.server.ts)
- Remove manual table creation/recovery logic.
- Replace all SQL queries with Prisma Client calls (`prisma.user`, `prisma.clientProfile`, etc.).

#### [MODIFY] [src/lib/notification-db.server.ts](file:///D:/skill-shine-gateway-main-main/src/lib/notification-db.server.ts)
- Replace complex multi-table SQL queries with Prisma relations and queries.

#### [MODIFY] [src/lib/services-db.server.ts](file:///D:/skill-shine-gateway-main-main/src/lib/services-db.server.ts)
- Replace `better-sqlite3` with `prisma.serviceCategory`.

#### [MODIFY] Other files using `better-sqlite3`
- `src/lib/admin-dashboard-db.server.ts`
- `src/lib/admin-global-search.server.ts`
- `src/lib/hire-db.server.ts`
- `src/lib/job-db.server.ts`
- `src/lib/pro-verification-db.server.ts`
- `src/lib/project-request-db.server.ts`
- `src/lib/seed-jobs.server.ts`

### Dependencies

#### [MODIFY] [package.json](file:///D:/skill-shine-gateway-main-main/package.json)
- Remove `better-sqlite3` and `@types/better-sqlite3`.

## Verification Plan

### Automated Tests
- Run `npx prisma generate` to ensure the new schema is valid.
- Run `npm run build` to verify production compilation.
- (Optional) Run `vitest` if unit tests are available.

### Manual Verification
- Verify that the local development environment starts up without `ERR_DLOPEN_FAILED`.
- Verify that the application can still read/write data (it will now target Turso or a local SQLite handled by Prisma, depending on the environment variables).
