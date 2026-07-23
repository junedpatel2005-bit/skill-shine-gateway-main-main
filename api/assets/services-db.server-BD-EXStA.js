import path__default from "node:path";
import { D as Database } from "../server.js";
const globalForServicesDb = globalThis;
function getDatabase() {
  if (!globalForServicesDb.servicesDb) {
    const databasePath = path__default.resolve(process.cwd(), "prisma", "app.db");
    globalForServicesDb.servicesDb = new Database(databasePath);
    ensureServicesTables(globalForServicesDb.servicesDb);
  }
  return globalForServicesDb.servicesDb;
}
function ensureServicesTables(db) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS "ServiceCategory" (
      "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      "name" TEXT NOT NULL UNIQUE,
      "slug" TEXT NOT NULL UNIQUE,
      "description" TEXT DEFAULT '',
      "iconName" TEXT DEFAULT '',
      "sortOrder" INTEGER DEFAULT 0,
      "createdAt" TEXT NOT NULL DEFAULT (datetime('now')),
      "updatedAt" TEXT NOT NULL DEFAULT (datetime('now'))
    );

    INSERT OR IGNORE INTO "ServiceCategory" ("name", "slug", "iconName", "sortOrder") VALUES
      ('Home Services', 'home-services', 'Wrench', 1),
      ('Development', 'development', 'Code', 2),
      ('Design', 'design', 'Paintbrush', 3),
      ('Photography', 'photography', 'Camera', 4),
      ('Marketing', 'marketing', 'Megaphone', 5),
      ('Tutoring', 'tutoring', 'GraduationCap', 6),
      ('Repair', 'repair', 'Hammer', 7),
      ('Cleaning', 'cleaning', 'Sparkles', 8),
      ('Moving', 'moving', 'Truck', 9),
      ('Events', 'events', 'Music', 10),
      ('Business', 'business', 'Briefcase', 11),
      ('Wellness', 'wellness', 'HeartPulse', 12);
  `);
}
function getServiceCategories() {
  const db = getDatabase();
  const rows = db.prepare(
    `SELECT sc.id, sc.name, sc.slug, sc.iconName, sc.description, sc.sortOrder, sc.createdAt, sc.updatedAt,
              (SELECT COUNT(*) FROM "User" WHERE "professionalCategory" = sc.name AND role = 'PROFESSIONAL' AND "isActive" = 1) AS proCount,
              (SELECT COUNT(*) FROM "ClientJob" WHERE "category" = sc.name AND status = 'OPEN') AS jobCount
       FROM "ServiceCategory" sc
       ORDER BY sc.sortOrder ASC`
  ).all();
  return rows;
}
function getTotalProfessionalsCount() {
  const db = getDatabase();
  const result = db.prepare('SELECT COUNT(*) AS count FROM "User" WHERE role = ? AND "isActive" = 1').get("PROFESSIONAL");
  return result.count;
}
function slugify(value) {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);
}
function getServiceCategoryById(id) {
  const db = getDatabase();
  return db.prepare(
    `SELECT sc.*, 
              (SELECT COUNT(*) FROM "User" WHERE "professionalCategory" = sc.name AND role = 'PROFESSIONAL' AND "isActive" = 1) AS proCount,
              (SELECT COUNT(*) FROM "ClientJob" WHERE "category" = sc.name AND status = 'OPEN') AS jobCount
         FROM "ServiceCategory" sc
        WHERE sc.id = ?`
  ).get(id);
}
function createServiceCategory(input) {
  const db = getDatabase();
  const slug = input.slug ? slugify(input.slug) : slugify(input.name);
  const stamp = (/* @__PURE__ */ new Date()).toISOString();
  const result = db.prepare(
    `INSERT INTO "ServiceCategory" (name, slug, description, iconName, sortOrder, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)`
  ).run(
    input.name.trim(),
    slug,
    input.description?.trim() ?? "",
    input.iconName?.trim() ?? "",
    input.sortOrder ?? 0,
    stamp,
    stamp
  );
  return getServiceCategoryById(Number(result.lastInsertRowid));
}
function updateServiceCategory(id, input) {
  const db = getDatabase();
  const fields = [];
  if (input.name !== void 0) fields.push(["name", input.name.trim()]);
  if (input.slug !== void 0) fields.push(["slug", slugify(input.slug)]);
  if (input.description !== void 0) fields.push(["description", input.description.trim()]);
  if (input.iconName !== void 0) fields.push(["iconName", input.iconName.trim()]);
  if (input.sortOrder !== void 0) fields.push(["sortOrder", input.sortOrder]);
  if (!fields.length) return getServiceCategoryById(id);
  const sql = `UPDATE "ServiceCategory" SET ${fields.map(([key]) => `"${key}" = ?`).join(", ")}, "updatedAt" = ? WHERE id = ?`;
  db.prepare(sql).run(...fields.map(([, value]) => value), (/* @__PURE__ */ new Date()).toISOString(), id);
  return getServiceCategoryById(id);
}
function deleteServiceCategory(id) {
  const db = getDatabase();
  return db.prepare(`DELETE FROM "ServiceCategory" WHERE id = ?`).run(id).changes > 0;
}
export {
  getTotalProfessionalsCount as a,
  createServiceCategory as c,
  deleteServiceCategory as d,
  getServiceCategories as g,
  updateServiceCategory as u
};
