import { copyFile, mkdir } from "node:fs/promises";
import path from "node:path";

const src = path.resolve(process.cwd(), "dist", "server", "server.js");
const destDir = path.resolve(process.cwd(), "api");
const dest = path.resolve(destDir, "server-bundle.js");

await mkdir(destDir, { recursive: true });
await copyFile(src, dest);
console.log(`Copied SSR bundle to ${dest}`);
