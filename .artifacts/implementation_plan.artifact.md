# Fix Vercel 404 Error for TanStack Start App

The project is currently experiencing a 404 error when deployed to Vercel. This is because Vercel is not correctly routing requests to the Serverless Function that handles the SSR (Server-Side Rendering) for the TanStack Start application. Additionally, the Node.js version specified in `package.json` is newer than what Vercel currently supports.

## User Review Required

> [!IMPORTANT]
> This plan involves adding a `vercel.json` configuration file and modifying `package.json`. These changes are necessary for Vercel to understand how to route traffic to your application.

## Proposed Changes

### Project Root

#### [NEW] [vercel.json](file:///D:/skill-shine-gateway-main-main/vercel.json)
Create a `vercel.json` file to configure Vercel's routing. This will:
- Route static asset requests (`/assets/*`) to the built client files in `dist/client/assets/`.
- Route all other requests to the serverless function located at `api/server.js`.
- Ensure the project is treated as a Node.js application.

#### [MODIFY] [package.json](file:///D:/skill-shine-gateway-main-main/package.json)
- Downgrade the required Node.js version from `24.x` to `22.x` to ensure compatibility with Vercel's current supported runtimes.
- Verify that the build script is correctly producing the `dist` directory.

### API Bridge

#### [MODIFY] [api/server.js](file:///D:/skill-shine-gateway-main-main/api/server.js) (Optional Check)
- Ensure the relative path to the built server entry (`../dist/server/server.js`) is correct and will be bundled by Vercel.

## Verification Plan

### Manual Verification
1. After applying these changes, the user should push the changes to their Git repository linked to Vercel.
2. Monitor the Vercel build logs to ensure the build completes and the function is deployed.
3. Visit the Vercel deployment URL to confirm the 404 is resolved and the app loads correctly.
