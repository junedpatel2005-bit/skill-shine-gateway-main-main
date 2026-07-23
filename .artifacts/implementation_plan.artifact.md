# Fix Vercel 404 Routing for TanStack Start App

The application is still showing a 404 error on Vercel. This is because the previous `vercel.json` used legacy `builds` and `routes` which may conflict with modern Vercel project settings and routing behaviors. This plan updates the configuration to use modern `rewrites` and `functions` settings.

## User Review Required

> [!IMPORTANT]
> I am moving from a legacy "Builds" configuration to a modern "Rewrites" configuration in `vercel.json`. This is the recommended way to handle custom server routing on Vercel.

## Proposed Changes

### Project Root

#### [MODIFY] [vercel.json](file:///D:/skill-shine-gateway-main-main/vercel.json)
Update `vercel.json` to:
- Use modern `rewrites` instead of legacy `routes`.
- Remove the `builds` block to allow Vercel's zero-config deployment to correctly identify the `api/` directory.
- Map all non-asset requests specifically to the serverless function at `/api/server`.
- Set the `outputDirectory` to `dist/client` to serve static assets directly.

### Dependencies

#### [MODIFY] [package.json](file:///D:/skill-shine-gateway-main-main/package.json)
- Add a `postbuild` script to ensure that the `dist` directory is correctly structured if needed, though the current Vite build seems correct. (Optional, will check first).

## Verification Plan

### Manual Verification
1. Push the updated `vercel.json` to the repository.
2. Monitor the Vercel deployment.
3. Verify that hitting the root URL (`/`) now correctly loads the application via the `api/server.js` function.
4. Verify that static assets (CSS/JS) are loading from the `/assets/` path.
