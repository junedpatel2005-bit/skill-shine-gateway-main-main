import { copyFile, mkdir, stat, cp } from "node:fs/promises";
import path from "node:path";

const distServerDir = path.resolve(process.cwd(), "dist", "server");
const src = path.resolve(distServerDir, "server.js");
const destDir = path.resolve(process.cwd(), "api");
const dest = path.resolve(destDir, "server-bundle.js");

await mkdir(destDir, { recursive: true });
await copyFile(src, dest);
console.log(`Copied SSR bundle to ${dest}`);

// Also copy any assets/ directory next to the server bundle (Vite places hashed assets there)
const assetsSrc = path.resolve(distServerDir, "assets");
const assetsDest = path.resolve(destDir, "assets");
try {
	const s = await stat(assetsSrc);
	if (s && s.isDirectory()) {
		// Node 16+ supports recursive copy via cp
		await cp(assetsSrc, assetsDest, { recursive: true });
		console.log(`Copied SSR assets to ${assetsDest}`);
	}
} catch (err) {
	// no assets dir — that's fine
}
