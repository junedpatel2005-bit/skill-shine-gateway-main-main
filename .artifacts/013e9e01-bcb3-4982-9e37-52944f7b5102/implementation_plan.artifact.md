# Migration from SQLite to Supabase (Prisma)

The project is currently experiencing over 500 TypeScript errors because it contains a mixture of raw SQLite queries and a partial Prisma/Supabase setup. The code frequently references `BetterSqlite3Database` and other SQLite-specific types/libraries that are either missing or incompatible with the intended Supabase deployment.

This plan will complete the migration to Prisma, allowing the application to function correctly with Supabase and resolve all compilation errors.

## User Review Required

> [!IMPORTANT]
> This migration involves converting many synchronous database functions to **asynchronous** ones. This will require updating callers to use `await`. Since most callers are within `async` server functions or API routes, this is generally safe but extensive.

> [!WARNING]
> The local SQLite database (`prisma/app.db`) will no longer be used. All data must be in Supabase.

## Proposed Changes

### 1. Prisma Schema Completion
We will update [schema.prisma](file:///D:/skill-shine-gateway-main-main/prisma/schema.prisma) to include all missing models that are currently defined in SQLite `CREATE TABLE` statements across the codebase.

#### [MODIFY] [schema.prisma](file:///D:/skill-shine-gateway-main-main/prisma/schema.prisma)
- Add missing models: `ProjectRequest`, `ProjectTracking`, `ProjectWorkUpload`, `ProjectRevisionRequest`, `ProjectMilestone`, `ProjectWithdrawal`, `ProjectCompletionRequest`, `ProjectDispute`, `ProjectReviewRequest`, `Notification`, `ApiToken`, `BrowserSubscription`, `ServiceCategory`, `Service`, `ContactRequest`, `StoredFile`, `Wallet`, `WalletTransaction`, `Faq`.
- Ensure relations are correctly defined.

### 2. Database Utility Migration
We will replace the mock and SQLite-specific database utilities with Prisma-based equivalents.

#### [DELETE] [supabase-compat.ts](file:///D:/skill-shine-gateway-main-main/src/lib/supabase-compat.ts)
#### [DELETE] [sqlite-compat.ts](file:///D:/skill-shine-gateway-main-main/src/lib/sqlite-compat.ts)
#### [DELETE] [database.server.ts](file:///D:/skill-shine-gateway-main-main/src/backend/database.server.ts)

### 3. Service Layer Migration
All `*-db.server.ts` and `*-cms.server.ts` files will be rewritten to use the `prisma` client instead of raw SQL.

#### [MODIFY] [user-db.server.ts](file:///D:/skill-shine-gateway-main-main/src/lib/user-db.server.ts)
- Replace all `db.prepare(...)` calls with `prisma.user` or `prisma.clientProfile` calls.
- Convert functions to `async`.
- Remove table-initialization logic (`ensureUserTableShape`, etc.).

#### [MODIFY] [project-request-db.server.ts](file:///D:/skill-shine-gateway-main-main/src/lib/project-request-db.server.ts)
- Migrate complex project tracking and negotiation logic to Prisma.

#### [MODIFY] [job-db.server.ts](file:///D:/skill-shine-gateway-main-main/src/lib/job-db.server.ts)
- Migrate job management and favorite jobs to Prisma.

#### [MODIFY] [website-page-cms.server.ts](file:///D:/skill-shine-gateway-main-main/src/lib/website-page-cms.server.ts)
- Migrate CMS page management to `prisma.cmsPage`.

#### [MODIFY] [api.server.ts](file:///D:/skill-shine-gateway-main-main/src/backend/api.server.ts)
- Update all calls to the service layer to use `await`.
- Migrate raw SQL reports to Prisma queries.

### 4. Route and Component Updates
Update all server functions in routes and components to `await` the now-async database functions.

#### [MODIFY] Various routes (e.g., [login.tsx](file:///D:/skill-shine-gateway-main-main/src/routes/login.tsx), [forgot-password.tsx](file:///D:/skill-shine-gateway-main-main/src/client/forgot-password.tsx))
- Add `await` to calls like `findUserByEmail`.

## Verification Plan

### Automated Tests
- Run `npx prisma generate` to ensure the client is up to date.
- Run `npm run build` to verify all TypeScript errors are resolved.

### Manual Verification
- Verify that the login and registration flows work with Supabase.
- Check the admin dashboard and CMS pages.
- Verify that file uploads and notifications are functioning correctly.
