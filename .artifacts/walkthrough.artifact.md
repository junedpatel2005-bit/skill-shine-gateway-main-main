# Walkthrough - Fixing SSR Chunk SyntaxError

We resolved a critical deployment issue where Vite SSR chunks failed to load their dependencies, causing a `SyntaxError` on Vercel.

## The Problem
The Vercel "bridge" script was named `api/server.js`, which shadowed the main SSR bundle name. Vite produces chunks in `api/assets/` that use relative imports like `import { g } from "../server.js"`. Instead of loading the real bundle, they were loading the bridge script, which does not contain the internal Vite exports.

## Changes Made

### Vercel Deployment

#### [vercel.json](file:///D:/skill-shine-gateway-main-main/vercel.json)
- Changed the catch-all route destination from `/api/server.js` to `/api/index.js`. This allows the bridge and the bundle to co-exist without name collisions.

#### [api/index.js](file:///D:/skill-shine-gateway-main-main/api/index.js) (NEW)
- Created this new bridge script (renamed from `server.js`).
- Updated it to import the app from `./server.js` (the real bundle).

### Build Scripts

#### [copy-ssr-bundle.mjs](file:///D:/skill-shine-gateway-main-main/scripts/copy-ssr-bundle.mjs)
- Updated the script to copy the SSR bundle from `dist/server/server.js` to `api/server.js`.
- By keeping the original filename, all relative imports from asset chunks now resolve correctly.

## Verification

- **Path Consistency**: Verified that `vercel.json` points to the bridge (`index.js`) and the bridge correctly imports the bundle (`server.js`).
- **Chunk Resolution**: This structure ensures that files in `api/assets/` can successfully reach `../server.js`.
