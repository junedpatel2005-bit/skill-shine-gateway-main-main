# Implementation Plan: Deploying to Vercel with a Managed Database (Turso)

The goal is to deploy the "Skill Shine Gateway" project to Vercel while replacing the local SQLite database with a managed **Turso** (LibSQL) database to ensure data persistence.

## User Review Required

> [!IMPORTANT]
> **Turso Setup**: You will need to create a free account at [turso.tech](https://turso.tech), create a database, and get a **Database URL** and **Auth Token**.
>
> **File Storage**: This plan only covers the **Database**. Local file uploads (in `storage/` or `public/uploads`) will still be lost on Vercel. For persistent files, you should migrate to a service like AWS S3 or Cloudflare R2 later.

## Proposed Changes

### 1. Dependency Updates

- Install the LibSQL adapter for Prisma.
- `npm install @libsql/client @prisma/adapter-libsql`

### 2. Code Modifications

#### [MODIFY] [prisma/schema.prisma](file:///D:/skill-shine-gateway-main-main/prisma/schema.prisma)
- Ensure the schema is ready for the LibSQL driver (usually no changes needed to the `provider = "sqlite"` line, but we must use the adapter in code).

#### [MODIFY] [src/lib/prisma.ts](file:///D:/skill-shine-gateway-main-main/src/lib/prisma.ts)
- Update the `createPrismaClient` function to detect and use the `LibSQL` adapter when the appropriate environment variables are set.

### 3. Deployment Steps

1. **Create Turso Database**:
   - Install Turso CLI: `curl -sSfL https://get.turso.tech/install.sh | bash`
   - Login: `turso auth login`
   - Create DB: `turso db create skill-shine`
   - Get URL: `turso db show skill-shine --url`
   - Get Token: `turso db tokens create skill-shine`
2. **Push Schema**:
   - `export DATABASE_URL=libsql://...`
   - `npx prisma db push` (to create tables in Turso).
3. **Configure Vercel**:
   - Add `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` to Vercel Project Settings.
   - Add other required env vars from `.env.example`.
4. **Deploy**:
   - Push to GitHub and import to Vercel.

## Verification Plan

### Manual Verification
- Verify that the app connects to the remote Turso database.
- Perform a sign-up or data entry and verify it persists after a page refresh or redeploy.
- Check Vercel logs for any Prisma connection errors.
