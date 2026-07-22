# Implementation Plan - Migrate WebsitePage CMS to Supabase (Prisma)

The application is currently failing because `src/lib/website-page-cms.server.ts` uses a local SQLite database which has been disabled in favor of Supabase. This plan details the migration of `WebsitePage` and `LegalPage` data models to Prisma, connected to Supabase PostgreSQL.

## User Review Required

> [!IMPORTANT]
> This change requires updating the database schema in Supabase. I will add the `WebsitePage` and `LegalPage` models to `schema.prisma`. After applying these changes, you may need to run `npx prisma db push` to create the tables in your Supabase instance if I am unable to do so.

> [!WARNING]
> Existing content in the local `prisma/app.db` (if any) will not be migrated. The system will re-seed the default pages upon first access.

## Proposed Changes

### Database Schema

#### [MODIFY] [schema.prisma](file:///D:/skill-shine-gateway-main-main/prisma/schema.prisma)
- Add `WebsitePage` model.
- Add `LegalPage` model.

### Library Migration

#### [MODIFY] [website-page-cms.server.ts](file:///D:/skill-shine-gateway-main-main/src/lib/website-page-cms.server.ts)
- Replace `supabase-compat` Database usage with `prisma`.
- Update seeding logic to use Prisma.
- Update CRUD functions (`listWebsitePages`, `listPublishedWebsitePages`, `getPublishedWebsitePage`, `saveWebsitePage`) to use Prisma.

#### [MODIFY] [legal-cms.server.ts](file:///D:/skill-shine-gateway-main-main/src/lib/legal-cms.server.ts)
- Replace `supabase-compat` Database usage with `prisma`.
- Update seeding logic to use Prisma.
- Update CRUD functions (`listLegalPages`, `getLegalPageBySlug`, `saveLegalPage`) to use Prisma.

## Verification Plan

### Automated Tests
- Run `npx prisma generate` to ensure the schema is valid and client is updated.
- Run `npm run build` to verify no regressions in build.

### Manual Verification
- Access the website pages (Home, About, etc.) to trigger seeding.
- Verify that saving a page in the CMS persists the data to Supabase.
