# Implementation Plan: Fix Vercel 404 NOT_FOUND

This plan resolves the `404: NOT_FOUND` error by bridging your full-stack TanStack Start application to Vercel's serverless architecture.

## User Review Required

> [!IMPORTANT]
> **Vercel Settings**: After applying these changes, you must ensure that in the Vercel Dashboard, your **Framework Preset** is set to **Other** (not Vite) and the **Output Directory** is set to `dist/client`.

> [!WARNING]
> **Database Check**: Since we are moving to serverless functions, the Turso database configuration we set up earlier is **mandatory**. Ensure `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` are set in Vercel.

## Root Cause Analysis

1.  **Framework Mismatch**: The project is built as a standalone Node.js server (using `http-server.mjs`), which Vercel doesn't run natively for "Frontend" deployments.
2.  **Static Servicing**: Vercel is looking for static files in the `dist` folder. Because this is an SSR app, the "entry point" isn't a static `index.html` but a server-side function.
3.  **Missing Routing**: There is no configuration telling Vercel to send incoming web requests to your SSR logic.

## Proposed Changes

### 1. Vercel Function Bridge

We will create a serverless function that acts as the entry point for Vercel.

#### [NEW] [api/server.js](file:///D:/skill-shine-gateway-main-main/api/server.js)
- This file will import your built SSR handler and bridge it to Vercel's Node.js runtime.

### 2. Configuration

#### [MODIFY] [vercel.json](file:///D:/skill-shine-gateway-main-main/vercel.json)
- Add rewrites to route all traffic to the new serverless function.
- Configure the function runtime.

### 3. Build Optimization

#### [MODIFY] [package.json](file:///D:/skill-shine-gateway-main-main/package.json)
- Ensure the build script produces the necessary assets in a location Vercel can find.

## Verification Plan

### Manual Verification
- Deploy to Vercel.
- Verify the homepage loads (confirming SSR is working).
- Verify API routes like `/api/health` return JSON.
- Check Vercel Function logs to ensure no runtime errors.
