import { createHmac, randomBytes, createHash, timingSafeEqual, scryptSync, randomUUID } from "node:crypto";
import { unlink, mkdir, writeFile, readFile } from "node:fs/promises";
import * as path from "node:path";
import path__default from "node:path";
import { z } from "zod";
import nodemailer from "nodemailer";
import { AsyncLocalStorage } from "node:async_hooks";
import { H3Event, toResponse } from "h3-v2";
import { PrismaClient } from "@prisma/client";
import * as xssModule from "xss";
import { io } from "socket.io-client";
let lastCapturedError;
const TTL_MS = 5e3;
function record(error) {
  lastCapturedError = { error, at: Date.now() };
}
if (typeof globalThis.addEventListener === "function") {
  globalThis.addEventListener("error", (event) => record(event.error ?? event));
  globalThis.addEventListener(
    "unhandledrejection",
    (event) => record(event.reason)
  );
}
function consumeLastCapturedError() {
  if (!lastCapturedError) return void 0;
  if (Date.now() - lastCapturedError.at > TTL_MS) {
    lastCapturedError = void 0;
    return void 0;
  }
  const { error } = lastCapturedError;
  lastCapturedError = void 0;
  return error;
}
function renderErrorPage() {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>This page didn't load</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { font: 15px/1.5 system-ui, -apple-system, sans-serif; background: #fafafa; color: #111; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .card { max-width: 28rem; width: 100%; text-align: center; padding: 2rem; }
      h1 { font-size: 1.25rem; margin: 0 0 0.5rem; }
      p { color: #4b5563; margin: 0 0 1.5rem; }
      .actions { display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; }
      a, button { padding: 0.5rem 1rem; border-radius: 0.375rem; font: inherit; cursor: pointer; text-decoration: none; border: 1px solid transparent; }
      .primary { background: #111; color: #fff; }
      .secondary { background: #fff; color: #111; border-color: #d1d5db; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>This page didn't load</h1>
      <p>Something went wrong on our end. You can try refreshing or head back home.</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">Try again</button>
        <a class="secondary" href="/">Go home</a>
      </div>
    </div>
  </body>
</html>`;
}
function secret() {
  const value = process.env.JWT_SECRET || process.env.AUTH_SECRET;
  if (!value && true)
    throw new Error("JWT_SECRET is required in production.");
  return value || "dev-only-change-this-secret";
}
function encode(value) {
  return Buffer.from(JSON.stringify(value)).toString("base64url");
}
function issueAccessToken(user) {
  const now2 = Math.floor(Date.now() / 1e3);
  const unsigned = `${encode({ alg: "HS256", typ: "JWT" })}.${encode({ sub: user.id, role: user.role, email: user.email, iat: now2, exp: now2 + 3600 * 24 })}`;
  return `${unsigned}.${createHmac("sha256", secret()).update(unsigned).digest("base64url")}`;
}
function readAccessToken(request) {
  const token = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  const parts = token?.split(".");
  if (!parts || parts.length !== 3) return null;
  const unsigned = `${parts[0]}.${parts[1]}`;
  const expected = Buffer.from(createHmac("sha256", secret()).update(unsigned).digest("base64url"));
  const actual = Buffer.from(parts[2]);
  if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) return null;
  try {
    const payload = JSON.parse(Buffer.from(parts[1], "base64url").toString());
    return payload.exp > Math.floor(Date.now() / 1e3) ? payload : null;
  } catch {
    return null;
  }
}
function opaqueToken() {
  return randomBytes(32).toString("base64url");
}
function tokenHash(token) {
  return createHash("sha256").update(token).digest("hex");
}
class DatabaseShim {
  constructor(_filePath) {
    this._filePath = _filePath;
  }
  _filePath;
  prepare(_query) {
    return {
      all: (..._args) => [],
      get: (..._args) => null,
      run: (..._args) => ({ changes: 0, lastInsertRowid: 0 })
    };
  }
  exec(_sql) {
    return this;
  }
  pragma(_sql) {
    return [];
  }
  transaction(operation) {
    return operation;
  }
  close() {
    return void 0;
  }
}
class Database extends DatabaseShim {
}
const globalDatabase = globalThis;
function getApiDatabase() {
  if (!globalDatabase.servioApiDb) {
    const db = new Database();
    globalDatabase.servioApiDb = db;
  }
  return globalDatabase.servioApiDb;
}
class ApiError extends Error {
  constructor(status, message, details) {
    super(message);
    this.status = status;
    this.details = details;
  }
  status;
  details;
}
function json(data, status = 200, headers) {
  return Response.json({ data }, { status, headers });
}
function errorResponse(error, requestId) {
  const status = error instanceof ApiError ? error.status : 500;
  const message = error instanceof ApiError ? error.message : "Internal server error.";
  if (status >= 500)
    console.error(
      JSON.stringify({
        level: "error",
        requestId,
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : void 0
      })
    );
  return Response.json(
    {
      error: { message, details: error instanceof ApiError ? error.details : void 0, requestId }
    },
    { status }
  );
}
async function body(request) {
  try {
    return await request.json();
  } catch {
    throw new ApiError(400, "Request body must be valid JSON.");
  }
}
function mailer() {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) return null;
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT || 587) === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
  });
}
async function sendAccountLink(email2, kind, token) {
  const transport = mailer();
  if (!transport) {
    throw new Error("SMTP is not configured.");
  }
  const appUrl = (process.env.APP_URL || "http://localhost:5173").replace(/\/$/, "");
  const target = kind === "verify" ? `${appUrl}/verify?token=${encodeURIComponent(token)}` : `${appUrl}/forgot-password?token=${encodeURIComponent(token)}`;
  await transport.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: email2,
    subject: kind === "verify" ? "Verify your Servio account" : "Reset your Servio password",
    text: `${kind === "verify" ? "Verify your email" : "Reset your password"}: ${target}

This link expires automatically.`,
    html: `<p>${kind === "verify" ? "Verify your email address" : "Reset your password"} by opening the secure link below.</p><p><a href="${target}">${target}</a></p><p>This link expires automatically.</p>`
  });
  return true;
}
var GLOBAL_EVENT_STORAGE_KEY = /* @__PURE__ */ Symbol.for("tanstack-start:event-storage");
var globalObj = globalThis;
if (!globalObj[GLOBAL_EVENT_STORAGE_KEY]) globalObj[GLOBAL_EVENT_STORAGE_KEY] = new AsyncLocalStorage();
var eventStorage = globalObj[GLOBAL_EVENT_STORAGE_KEY];
function isPromiseLike(value) {
  return typeof value.then === "function";
}
function getSetCookieValues(headers) {
  const headersWithSetCookie = headers;
  if (typeof headersWithSetCookie.getSetCookie === "function") return headersWithSetCookie.getSetCookie();
  const value = headers.get("set-cookie");
  return value ? [value] : [];
}
function mergeEventResponseHeaders(response, event) {
  if (response.ok) return;
  const eventSetCookies = getSetCookieValues(event.res.headers);
  if (eventSetCookies.length === 0) return;
  const responseSetCookies = getSetCookieValues(response.headers);
  response.headers.delete("set-cookie");
  for (const cookie of responseSetCookies) response.headers.append("set-cookie", cookie);
  for (const cookie of eventSetCookies) response.headers.append("set-cookie", cookie);
}
function attachResponseHeaders(value, event) {
  if (isPromiseLike(value)) return value.then((resolved) => {
    if (resolved instanceof Response) mergeEventResponseHeaders(resolved, event);
    return resolved;
  });
  if (value instanceof Response) mergeEventResponseHeaders(value, event);
  return value;
}
function requestHandler(handler) {
  return (request, requestOpts) => {
    let h3Event;
    try {
      h3Event = new H3Event(request);
    } catch (error) {
      if (error instanceof URIError) return new Response(null, {
        status: 400,
        statusText: "Bad Request"
      });
      throw error;
    }
    return toResponse(attachResponseHeaders(eventStorage.run({ h3Event }, () => handler(request, requestOpts)), h3Event), h3Event);
  };
}
function getH3Event() {
  const event = eventStorage.getStore();
  if (!event) throw new Error(`No StartEvent found in AsyncLocalStorage. Make sure you are using the function within the server runtime.`);
  return event.h3Event;
}
function getRequest() {
  return getH3Event().req;
}
function setResponseHeader(name, value) {
  const event = getH3Event();
  if (Array.isArray(value)) {
    event.res.headers.delete(name);
    for (const valueItem of value) event.res.headers.append(name, valueItem);
  } else event.res.headers.set(name, value);
}
function getResponse() {
  return getH3Event().res;
}
const SESSION_COOKIE_NAME = "servio_session";
const GOOGLE_STATE_COOKIE_NAME = "servio_google_state";
const ONE_DAY_IN_SECONDS = 60 * 60 * 24;
const THIRTY_DAYS_IN_SECONDS = ONE_DAY_IN_SECONDS * 30;
function getAuthSecret() {
  const secret2 = process.env.AUTH_SECRET || process.env.JWT_SECRET;
  if (secret2) {
    return secret2;
  }
  {
    throw new Error("AUTH_SECRET is required to sign login sessions.");
  }
}
function toBase64Url(input) {
  return Buffer.from(input, "utf8").toString("base64url");
}
function fromBase64Url(input) {
  return JSON.parse(Buffer.from(input, "base64url").toString("utf8"));
}
function signValue(value) {
  return createHmac("sha256", getAuthSecret()).update(value).digest("base64url");
}
function encodeSignedPayload(payload) {
  const encodedPayload = toBase64Url(JSON.stringify(payload));
  const signature = signValue(encodedPayload);
  return `${encodedPayload}.${signature}`;
}
function decodeSignedPayload(value) {
  if (!value) {
    return null;
  }
  const [encodedPayload, providedSignature] = value.split(".");
  if (!encodedPayload || !providedSignature) {
    return null;
  }
  const expectedSignature = signValue(encodedPayload);
  const providedBuffer = Buffer.from(providedSignature);
  const expectedBuffer = Buffer.from(expectedSignature);
  if (providedBuffer.length !== expectedBuffer.length || !timingSafeEqual(providedBuffer, expectedBuffer)) {
    return null;
  }
  return fromBase64Url(encodedPayload);
}
function shouldUseSecureCookie() {
  try {
    const request = getRequest();
    const forwardedProto = request.headers.get("x-forwarded-proto");
    const requestUrl = new URL(request.url);
    return forwardedProto === "https" || requestUrl.protocol === "https:";
  } catch {
    return true;
  }
}
function serializeCookie(name, value, maxAge) {
  const parts = [`${name}=${value}`, "Path=/", "HttpOnly", "SameSite=Lax", `Max-Age=${maxAge}`];
  if (shouldUseSecureCookie()) {
    parts.push("Secure");
  }
  return parts.join("; ");
}
function createSessionCookie(user) {
  const payload = {
    userId: user.id,
    email: user.email,
    role: user.role,
    exp: Date.now() + THIRTY_DAYS_IN_SECONDS * 1e3
  };
  return serializeCookie(SESSION_COOKIE_NAME, encodeSignedPayload(payload), THIRTY_DAYS_IN_SECONDS);
}
function clearSessionCookie() {
  return serializeCookie(SESSION_COOKIE_NAME, "", 0);
}
function createGoogleStateCookie(state, returnTo) {
  const payload = {
    state,
    returnTo,
    exp: Date.now() + 10 * 60 * 1e3
  };
  return serializeCookie(GOOGLE_STATE_COOKIE_NAME, encodeSignedPayload(payload), 10 * 60);
}
function clearGoogleStateCookie() {
  return serializeCookie(GOOGLE_STATE_COOKIE_NAME, "", 0);
}
function getCookieValue(cookieHeader, name) {
  if (!cookieHeader) {
    return null;
  }
  const cookies = cookieHeader.split(";").map((part) => part.trim());
  const match2 = cookies.find((entry) => entry.startsWith(`${name}=`));
  return match2 ? match2.slice(name.length + 1) : null;
}
function readSessionFromCookieHeader(cookieHeader) {
  const cookieValue = getCookieValue(cookieHeader, SESSION_COOKIE_NAME);
  const payload = decodeSignedPayload(cookieValue);
  if (!payload || payload.exp < Date.now()) {
    return null;
  }
  return payload;
}
function readGoogleStateFromCookieHeader(cookieHeader) {
  const cookieValue = getCookieValue(cookieHeader, GOOGLE_STATE_COOKIE_NAME);
  const payload = decodeSignedPayload(cookieValue);
  if (!payload || payload.exp < Date.now()) {
    return null;
  }
  return payload;
}
const KEY_LENGTH = 64;
function hashPassword(password) {
  const salt = randomBytes(16).toString("base64url");
  const digest = scryptSync(password, salt, KEY_LENGTH).toString("base64url");
  return `scrypt$${salt}$${digest}`;
}
async function verifyPassword(password, storedHash) {
  if (!storedHash) return { valid: false, needsUpgrade: false };
  if (storedHash.startsWith("scrypt$")) {
    const [, salt, expectedText] = storedHash.split("$");
    if (!salt || !expectedText) return { valid: false, needsUpgrade: false };
    const expected = Buffer.from(expectedText, "base64url");
    const actual = scryptSync(password, salt, expected.length);
    return {
      valid: actual.length === expected.length && timingSafeEqual(actual, expected),
      needsUpgrade: false
    };
  }
  if (/^[a-f0-9]{64}$/i.test(storedHash)) {
    const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(password));
    const actual = Buffer.from(digest);
    const expected = Buffer.from(storedHash, "hex");
    return {
      valid: actual.length === expected.length && timingSafeEqual(actual, expected),
      needsUpgrade: true
    };
  }
  return { valid: false, needsUpgrade: false };
}
const globalForUserDb = globalThis;
function isMissingColumnError(error) {
  return error instanceof Error && /no such column/i.test(error.message);
}
function withSchemaRecovery(db, operation) {
  try {
    return operation();
  } catch (error) {
    if (!isMissingColumnError(error)) {
      throw error;
    }
    ensureUserTableShape(db);
    ensureClientProfileTables(db);
    return operation();
  }
}
function ensureClientProfileTables(db) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS "ClientProfile" (
      "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      "userId" INTEGER NOT NULL,
      "fullName" TEXT NOT NULL,
      "email" TEXT NOT NULL DEFAULT '',
      "phone" TEXT NOT NULL DEFAULT '',
      "companyName" TEXT NOT NULL,
      "companyWebsite" TEXT,
      "industry" TEXT,
      "teamSize" TEXT,
      "companyDescription" TEXT,
      "address" TEXT NOT NULL,
      "profilePhotoUrl" TEXT,
      "createdAt" TEXT NOT NULL,
      "updatedAt" TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "ClientSavedLocation" (
      "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      "clientProfileId" INTEGER NOT NULL,
      "label" TEXT NOT NULL,
      "address" TEXT NOT NULL,
      "createdAt" TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "ClientHiringNeed" (
      "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      "clientProfileId" INTEGER NOT NULL,
      "value" TEXT NOT NULL,
      "createdAt" TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS "ClientProfile_userId_idx" ON "ClientProfile"("userId");
    CREATE INDEX IF NOT EXISTS "ClientSavedLocation_clientProfileId_idx" ON "ClientSavedLocation"("clientProfileId");
    CREATE INDEX IF NOT EXISTS "ClientHiringNeed_clientProfileId_idx" ON "ClientHiringNeed"("clientProfileId");
  `);
  const profileColumns = new Set(
    db.prepare(`PRAGMA table_info("ClientProfile")`).all().map((column) => column.name)
  );
  const missingProfileColumns = [
    {
      name: "email",
      sql: `ALTER TABLE "ClientProfile" ADD COLUMN "email" TEXT NOT NULL DEFAULT ''`
    },
    {
      name: "phone",
      sql: `ALTER TABLE "ClientProfile" ADD COLUMN "phone" TEXT NOT NULL DEFAULT ''`
    },
    { name: "companyWebsite", sql: `ALTER TABLE "ClientProfile" ADD COLUMN "companyWebsite" TEXT` },
    { name: "industry", sql: `ALTER TABLE "ClientProfile" ADD COLUMN "industry" TEXT` },
    { name: "teamSize", sql: `ALTER TABLE "ClientProfile" ADD COLUMN "teamSize" TEXT` },
    {
      name: "companyDescription",
      sql: `ALTER TABLE "ClientProfile" ADD COLUMN "companyDescription" TEXT`
    }
  ].filter((column) => !profileColumns.has(column.name));
  for (const column of missingProfileColumns) {
    db.exec(column.sql);
  }
}
function ensureUserTableShape(db) {
  const table = db.prepare(
    `
        SELECT name
        FROM sqlite_master
        WHERE type = 'table' AND name = 'User'
      `
  ).get();
  if (!table) {
    db.exec(`
      CREATE TABLE "User" (
        "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        "role" TEXT NOT NULL DEFAULT 'CLIENT',
        "firstName" TEXT NOT NULL,
        "lastName" TEXT NOT NULL,
        "email" TEXT NOT NULL,
        "phone" TEXT,
        "passwordHash" TEXT,
        "googleId" TEXT,
        "avatarUrl" TEXT,
        "companyName" TEXT,
        "companyWebsite" TEXT,
        "industry" TEXT,
        "teamSize" TEXT,
        "companyDescription" TEXT,
        "address" TEXT,
        "professionalCategory" TEXT,
        "professionalCity" TEXT,
        "professionalSkillsJson" TEXT,
        "experienceYears" INTEGER,
        "hourlyRate" INTEGER,
        "fixedRate" INTEGER,
        "portfolioUrl" TEXT,
        "workPhotosJson" TEXT,
        "certificationsJson" TEXT,
        "tradeLicenseUrl" TEXT,
        "serviceArea" TEXT,
        "workMode" TEXT NOT NULL DEFAULT 'both',
        "serviceRadiusKm" INTEGER,
        "averageRating" REAL NOT NULL DEFAULT 0,
        "reviewCount" INTEGER NOT NULL DEFAULT 0,
        "emailNotificationsEnabled" INTEGER NOT NULL DEFAULT 1,
        "browserNotificationsEnabled" INTEGER NOT NULL DEFAULT 1,
        "projectActivityNotificationsEnabled" INTEGER NOT NULL DEFAULT 1,
        "isVerified" INTEGER NOT NULL DEFAULT 0,
        "availabilityStatus" TEXT NOT NULL DEFAULT 'available',
        "savedLocationsJson" TEXT,
        "hiringNeedsJson" TEXT,
        "authProvider" TEXT NOT NULL DEFAULT 'LOCAL',
        "isActive" INTEGER NOT NULL DEFAULT 1,
        "lastLoginAt" TEXT,
        "createdAt" TEXT NOT NULL,
        "updatedAt" TEXT NOT NULL
      );
      CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
      CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");
      CREATE UNIQUE INDEX "User_googleId_key" ON "User"("googleId");
    `);
    return;
  }
  const columns = db.prepare(`PRAGMA table_info("User")`).all();
  const requiredColumns = [
    "id",
    "role",
    "firstName",
    "lastName",
    "email",
    "phone",
    "passwordHash",
    "googleId",
    "avatarUrl",
    "companyName",
    "companyWebsite",
    "industry",
    "teamSize",
    "companyDescription",
    "address",
    "professionalCategory",
    "professionalCity",
    "professionalSkillsJson",
    "experienceYears",
    "hourlyRate",
    "fixedRate",
    "portfolioUrl",
    "workPhotosJson",
    "certificationsJson",
    "tradeLicenseUrl",
    "serviceArea",
    "workMode",
    "serviceRadiusKm",
    "averageRating",
    "reviewCount",
    "emailNotificationsEnabled",
    "browserNotificationsEnabled",
    "projectActivityNotificationsEnabled",
    "isVerified",
    "availabilityStatus",
    "savedLocationsJson",
    "hiringNeedsJson",
    "authProvider",
    "isActive",
    "lastLoginAt",
    "createdAt",
    "updatedAt"
  ];
  const needsRebuild = requiredColumns.some((column) => !columns.some((entry) => entry.name === column)) || columns.some((entry) => entry.name === "phone" && entry.notnull === 1) || columns.some((entry) => entry.name === "passwordHash" && entry.notnull === 1);
  if (!needsRebuild) {
    return;
  }
  db.exec(`
    CREATE TABLE "User__new" (
      "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      "role" TEXT NOT NULL DEFAULT 'CLIENT',
      "firstName" TEXT NOT NULL,
      "lastName" TEXT NOT NULL,
      "email" TEXT NOT NULL,
      "phone" TEXT,
      "passwordHash" TEXT,
      "googleId" TEXT,
      "avatarUrl" TEXT,
      "companyName" TEXT,
      "companyWebsite" TEXT,
      "industry" TEXT,
      "teamSize" TEXT,
      "companyDescription" TEXT,
      "address" TEXT,
      "professionalCategory" TEXT,
      "professionalCity" TEXT,
      "professionalSkillsJson" TEXT,
      "experienceYears" INTEGER,
      "hourlyRate" INTEGER,
      "fixedRate" INTEGER,
      "portfolioUrl" TEXT,
      "workPhotosJson" TEXT,
      "certificationsJson" TEXT,
      "tradeLicenseUrl" TEXT,
      "serviceArea" TEXT,
      "workMode" TEXT NOT NULL DEFAULT 'both',
      "serviceRadiusKm" INTEGER,
      "averageRating" REAL NOT NULL DEFAULT 0,
      "reviewCount" INTEGER NOT NULL DEFAULT 0,
      "emailNotificationsEnabled" INTEGER NOT NULL DEFAULT 1,
      "browserNotificationsEnabled" INTEGER NOT NULL DEFAULT 1,
      "projectActivityNotificationsEnabled" INTEGER NOT NULL DEFAULT 1,
      "isVerified" INTEGER NOT NULL DEFAULT 0,
      "availabilityStatus" TEXT NOT NULL DEFAULT 'available',
      "savedLocationsJson" TEXT,
      "hiringNeedsJson" TEXT,
      "authProvider" TEXT NOT NULL DEFAULT 'LOCAL',
      "isActive" INTEGER NOT NULL DEFAULT 1,
      "lastLoginAt" TEXT,
      "createdAt" TEXT NOT NULL,
      "updatedAt" TEXT NOT NULL
    );
  `);
  const columnNames = new Set(columns.map((column) => column.name));
  db.prepare(
    `
      INSERT INTO "User__new" (
        "id",
        "role",
        "firstName",
        "lastName",
        "email",
        "phone",
        "passwordHash",
        "googleId",
        "avatarUrl",
        "companyName",
        "companyWebsite",
        "industry",
        "teamSize",
        "companyDescription",
        "address",
        "professionalCategory",
        "professionalCity",
        "professionalSkillsJson",
        "experienceYears",
        "hourlyRate",
        "fixedRate",
        "portfolioUrl",
        "workPhotosJson",
        "certificationsJson",
        "tradeLicenseUrl",
        "serviceArea",
        "workMode",
        "serviceRadiusKm",
        "averageRating",
        "reviewCount",
        "emailNotificationsEnabled",
        "browserNotificationsEnabled",
        "projectActivityNotificationsEnabled",
        "isVerified",
        "availabilityStatus",
        "savedLocationsJson",
        "hiringNeedsJson",
        "authProvider",
        "isActive",
        "lastLoginAt",
        "createdAt",
        "updatedAt"
      )
      SELECT
        "id",
        COALESCE("role", 'CLIENT'),
        "firstName",
        "lastName",
        LOWER(TRIM("email")),
        ${columnNames.has("phone") ? `"phone"` : "NULL"},
        ${columnNames.has("passwordHash") ? `"passwordHash"` : "NULL"},
        ${columnNames.has("googleId") ? `"googleId"` : "NULL"},
        ${columnNames.has("avatarUrl") ? `"avatarUrl"` : "NULL"},
        ${columnNames.has("companyName") ? `"companyName"` : "NULL"},
        ${columnNames.has("companyWebsite") ? `"companyWebsite"` : "NULL"},
        ${columnNames.has("industry") ? `"industry"` : "NULL"},
        ${columnNames.has("teamSize") ? `"teamSize"` : "NULL"},
        ${columnNames.has("companyDescription") ? `"companyDescription"` : "NULL"},
        ${columnNames.has("address") ? `"address"` : "NULL"},
        ${columnNames.has("professionalCategory") ? `"professionalCategory"` : "NULL"},
        ${columnNames.has("professionalCity") ? `"professionalCity"` : "NULL"},
        ${columnNames.has("professionalSkillsJson") ? `"professionalSkillsJson"` : "NULL"},
        ${columnNames.has("experienceYears") ? `"experienceYears"` : "NULL"},
        ${columnNames.has("hourlyRate") ? `"hourlyRate"` : "NULL"},
        ${columnNames.has("fixedRate") ? `"fixedRate"` : "NULL"},
        ${columnNames.has("portfolioUrl") ? `"portfolioUrl"` : "NULL"},
        ${columnNames.has("workPhotosJson") ? `"workPhotosJson"` : "NULL"},
        ${columnNames.has("certificationsJson") ? `"certificationsJson"` : "NULL"},
        ${columnNames.has("tradeLicenseUrl") ? `"tradeLicenseUrl"` : "NULL"},
        ${columnNames.has("serviceArea") ? `"serviceArea"` : "NULL"},
        ${columnNames.has("workMode") ? `COALESCE("workMode", 'both')` : "'both'"},
        ${columnNames.has("serviceRadiusKm") ? `"serviceRadiusKm"` : "NULL"},
        ${columnNames.has("averageRating") ? `COALESCE("averageRating", 0)` : "0"},
        ${columnNames.has("reviewCount") ? `COALESCE("reviewCount", 0)` : "0"},
        ${columnNames.has("emailNotificationsEnabled") ? `COALESCE("emailNotificationsEnabled", 1)` : "1"},
        ${columnNames.has("browserNotificationsEnabled") ? `COALESCE("browserNotificationsEnabled", 1)` : "1"},
        ${columnNames.has("projectActivityNotificationsEnabled") ? `COALESCE("projectActivityNotificationsEnabled", 1)` : "1"},
        ${columnNames.has("isVerified") ? `COALESCE("isVerified", 0)` : "0"},
        ${columnNames.has("availabilityStatus") ? `COALESCE("availabilityStatus", 'available')` : "'available'"},
        ${columnNames.has("savedLocationsJson") ? `"savedLocationsJson"` : "NULL"},
        ${columnNames.has("hiringNeedsJson") ? `"hiringNeedsJson"` : "NULL"},
        ${columnNames.has("authProvider") ? `COALESCE("authProvider", CASE WHEN "googleId" IS NOT NULL THEN 'GOOGLE' ELSE 'LOCAL' END)` : `CASE WHEN ${columnNames.has("googleId") ? `"googleId"` : "NULL"} IS NOT NULL THEN 'GOOGLE' ELSE 'LOCAL' END`},
        COALESCE("isActive", 1),
        ${columnNames.has("lastLoginAt") ? `"lastLoginAt"` : "NULL"},
        COALESCE("createdAt", CURRENT_TIMESTAMP),
        COALESCE("updatedAt", CURRENT_TIMESTAMP)
      FROM "User"
    `
  ).run();
  db.exec(`
    DROP TABLE "User";
    ALTER TABLE "User__new" RENAME TO "User";
    CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
    CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");
    CREATE UNIQUE INDEX "User_googleId_key" ON "User"("googleId");
  `);
}
function getDatabase$5() {
  if (!globalForUserDb.userDb) {
    const databasePath = path__default.resolve(process.cwd(), "prisma", "app.db");
    globalForUserDb.userDb = new Database(databasePath);
    ensureUserTableShape(globalForUserDb.userDb);
    ensureClientProfileTables(globalForUserDb.userDb);
  }
  return globalForUserDb.userDb;
}
function syncClientProfileTables(db, input, timestamp) {
  const trimmedFullName = input.fullName.trim();
  const trimmedEmail = input.email.trim().toLowerCase();
  const trimmedPhone = input.phone.trim();
  const trimmedCompanyName = input.companyName?.trim() || "";
  const trimmedCompanyWebsite = input.companyWebsite?.trim() || null;
  const trimmedIndustry = input.industry?.trim() || null;
  const trimmedTeamSize = input.teamSize?.trim() || null;
  const trimmedCompanyDescription = input.companyDescription?.trim() || null;
  const trimmedAddress = input.address.trim();
  const trimmedAvatarUrl = input.avatarUrl?.trim() || null;
  const existingProfile = db.prepare(
    `
        SELECT id
        FROM "ClientProfile"
        WHERE userId = ?
        ORDER BY id DESC
        LIMIT 1
      `
  ).get(input.userId);
  let clientProfileId = existingProfile?.id;
  if (clientProfileId) {
    db.prepare(
      `
        UPDATE "ClientProfile"
        SET
          fullName = ?,
          email = ?,
          phone = ?,
          companyName = ?,
          companyWebsite = ?,
          industry = ?,
          teamSize = ?,
          companyDescription = ?,
          address = ?,
          profilePhotoUrl = ?,
          updatedAt = ?
        WHERE id = ?
      `
    ).run(
      trimmedFullName,
      trimmedEmail,
      trimmedPhone,
      trimmedCompanyName,
      trimmedCompanyWebsite,
      trimmedIndustry,
      trimmedTeamSize,
      trimmedCompanyDescription,
      trimmedAddress,
      trimmedAvatarUrl,
      timestamp,
      clientProfileId
    );
  } else {
    const result = db.prepare(
      `
          INSERT INTO "ClientProfile" (
            userId,
            fullName,
            email,
            phone,
            companyName,
            companyWebsite,
            industry,
            teamSize,
            companyDescription,
            address,
            profilePhotoUrl,
            createdAt,
            updatedAt
          )
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `
    ).run(
      input.userId,
      trimmedFullName,
      trimmedEmail,
      trimmedPhone,
      trimmedCompanyName,
      trimmedCompanyWebsite,
      trimmedIndustry,
      trimmedTeamSize,
      trimmedCompanyDescription,
      trimmedAddress,
      trimmedAvatarUrl,
      timestamp,
      timestamp
    );
    clientProfileId = Number(result.lastInsertRowid);
  }
  db.prepare(
    `
      DELETE FROM "ClientSavedLocation"
      WHERE clientProfileId = ?
    `
  ).run(clientProfileId);
  db.prepare(
    `
      DELETE FROM "ClientHiringNeed"
      WHERE clientProfileId = ?
    `
  ).run(clientProfileId);
  const insertSavedLocation = db.prepare(
    `
      INSERT INTO "ClientSavedLocation" (
        clientProfileId,
        label,
        address,
        createdAt
      )
      VALUES (?, ?, ?, ?)
    `
  );
  for (const location of input.savedLocations) {
    insertSavedLocation.run(
      clientProfileId,
      location.label.trim(),
      location.address.trim(),
      timestamp
    );
  }
  const insertHiringNeed = db.prepare(
    `
      INSERT INTO "ClientHiringNeed" (
        clientProfileId,
        value,
        createdAt
      )
      VALUES (?, ?, ?)
    `
  );
  for (const hiringNeed of input.hiringNeeds) {
    insertHiringNeed.run(clientProfileId, hiringNeed.trim(), timestamp);
  }
}
function mapPublicUser(user) {
  return {
    id: user.id,
    role: user.role,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    avatarUrl: user.avatarUrl,
    authProvider: user.authProvider
  };
}
function parseSavedLocations(value) {
  if (!value) {
    return [];
  }
  try {
    const parsed = JSON.parse(value);
    return parsed.filter((location) => location?.label && location?.address).map((location) => ({
      label: String(location.label).trim(),
      address: String(location.address).trim()
    }));
  } catch {
    return [];
  }
}
function stringifySavedLocations(locations) {
  return JSON.stringify(
    locations.map((location) => ({
      label: location.label.trim(),
      address: location.address.trim()
    }))
  );
}
function parseHiringNeeds(value) {
  if (!value) {
    return [];
  }
  try {
    const parsed = JSON.parse(value);
    return parsed.map((entry) => String(entry ?? "").trim()).filter(Boolean);
  } catch {
    return [];
  }
}
function parseStringList(value) {
  if (!value) {
    return [];
  }
  try {
    const parsed = JSON.parse(value);
    return parsed.map((entry) => String(entry ?? "").trim()).filter(Boolean);
  } catch {
    return [];
  }
}
function stringifyStringList(values) {
  return JSON.stringify(values.map((value) => value.trim()).filter(Boolean));
}
function stringifyHiringNeeds(needs) {
  return JSON.stringify(needs.map((need) => need.trim()).filter(Boolean));
}
function splitFullName(fullName) {
  const trimmed = fullName.trim();
  const parts = trimmed.split(/\s+/).filter(Boolean);
  const firstName = parts[0] || "";
  const lastName = parts.slice(1).join(" ") || firstName;
  return {
    firstName,
    lastName
  };
}
function findUserByEmailOrPhone(email2, phone) {
  const db = getDatabase$5();
  if (phone) {
    return withSchemaRecovery(
      db,
      () => db.prepare(
        `
              SELECT id, email, phone
              FROM "User"
              WHERE email = ? OR phone = ?
              LIMIT 1
            `
      ).get(email2, phone)
    );
  }
  return withSchemaRecovery(
    db,
    () => db.prepare(
      `
            SELECT id, email, phone
            FROM "User"
            WHERE email = ?
            LIMIT 1
          `
    ).get(email2)
  );
}
function updateUserPasswordByEmail(email2, passwordHash) {
  const db = getDatabase$5();
  const timestamp = (/* @__PURE__ */ new Date()).toISOString();
  return withSchemaRecovery(db, () => {
    const result = db.prepare(
      `
          UPDATE "User"
          SET passwordHash = ?, updatedAt = ?
          WHERE email = ?
        `
    ).run(passwordHash, timestamp, email2.trim().toLowerCase());
    return result.changes > 0;
  });
}
function updateUserPasswordByAdmin(userId, passwordHash) {
  const db = getDatabase$5();
  const timestamp = (/* @__PURE__ */ new Date()).toISOString();
  return withSchemaRecovery(db, () => {
    const result = db.prepare(
      `
          UPDATE "User"
          SET passwordHash = ?, updatedAt = ?
          WHERE id = ? AND role IN ('CLIENT', 'PROFESSIONAL')
        `
    ).run(passwordHash, timestamp, userId);
    if (!result.changes) {
      throw new Error("Managed user account not found.");
    }
    return true;
  });
}
function findUserByEmail(email2) {
  const db = getDatabase$5();
  return withSchemaRecovery(
    db,
    () => db.prepare(
      `
            SELECT id, role, firstName, lastName, email, phone, passwordHash, googleId, avatarUrl, authProvider, isActive
            FROM "User"
            WHERE email = ?
            LIMIT 1
          `
    ).get(email2)
  );
}
function findUserByGoogleId(googleId) {
  const db = getDatabase$5();
  return withSchemaRecovery(
    db,
    () => db.prepare(
      `
            SELECT id, role, firstName, lastName, email, phone, passwordHash, googleId, avatarUrl, authProvider
            FROM "User"
            WHERE googleId = ?
            LIMIT 1
          `
    ).get(googleId)
  );
}
function findUserById(userId) {
  const db = getDatabase$5();
  return withSchemaRecovery(
    db,
    () => db.prepare(
      `
            SELECT id, role, firstName, lastName, email, phone, avatarUrl, authProvider
            FROM "User"
            WHERE id = ? AND isActive = 1
            LIMIT 1
          `
    ).get(userId)
  );
}
function getAdminUsers() {
  const db = getDatabase$5();
  return withSchemaRecovery(
    db,
    () => db.prepare(
      `
              SELECT
                id,
                role,
                firstName,
                lastName,
                email,
                phone,
                avatarUrl,
                companyName,
                industry,
                professionalCategory,
                professionalCity,
                experienceYears,
                hourlyRate,
                fixedRate,
                availabilityStatus,
                averageRating,
                reviewCount,
                authProvider,
                CASE WHEN passwordHash IS NOT NULL THEN 1 ELSE 0 END AS hasPassword,
                isActive,
                isVerified,
                lastLoginAt,
                createdAt,
                updatedAt
              FROM "User"
              ORDER BY datetime(createdAt) DESC, id DESC
            `
    ).all().map((user) => ({
      ...user,
      hasPassword: Boolean(user.hasPassword),
      isActive: Boolean(user.isActive),
      isVerified: Boolean(user.isVerified)
    }))
  );
}
function recordUserLogin(userId) {
  const db = getDatabase$5();
  const timestamp = (/* @__PURE__ */ new Date()).toISOString();
  return withSchemaRecovery(db, () => {
    db.prepare(
      `
        UPDATE "User"
        SET lastLoginAt = ?, updatedAt = ?
        WHERE id = ?
      `
    ).run(timestamp, timestamp, userId);
    return timestamp;
  });
}
function getAdminUserStats() {
  const users = getAdminUsers();
  return {
    totalUsers: users.length,
    activeUsers: users.filter((user) => user.isActive).length,
    inactiveUsers: users.filter((user) => !user.isActive).length,
    admins: users.filter((user) => user.role === "ADMIN").length,
    clients: users.filter((user) => user.role === "CLIENT").length,
    professionals: users.filter((user) => user.role === "PROFESSIONAL").length,
    pendingVerifications: users.filter((user) => user.role === "PROFESSIONAL" && !user.isVerified).length
  };
}
function updateUserRoleByAdmin(userId, role) {
  const db = getDatabase$5();
  const timestamp = (/* @__PURE__ */ new Date()).toISOString();
  return withSchemaRecovery(db, () => {
    db.prepare(
      `
        UPDATE "User"
        SET role = ?, updatedAt = ?
        WHERE id = ?
      `
    ).run(role, timestamp, userId);
    return findUserById(userId);
  });
}
function updateUserActiveStatusByAdmin(userId, isActive) {
  const db = getDatabase$5();
  const timestamp = (/* @__PURE__ */ new Date()).toISOString();
  return withSchemaRecovery(db, () => {
    db.prepare(
      `
        UPDATE "User"
        SET isActive = ?, updatedAt = ?
        WHERE id = ?
      `
    ).run(isActive ? 1 : 0, timestamp, userId);
    return findUserById(userId);
  });
}
function updateProfessionalVerifiedStatusByAdmin(userId, isVerified) {
  const db = getDatabase$5();
  const timestamp = (/* @__PURE__ */ new Date()).toISOString();
  return withSchemaRecovery(db, () => {
    db.prepare(
      `
        UPDATE "User"
        SET isVerified = ?, updatedAt = ?
        WHERE id = ? AND role = 'PROFESSIONAL'
      `
    ).run(isVerified ? 1 : 0, timestamp, userId);
    return findUserById(userId);
  });
}
function getClientProfileByUserId(userId) {
  const db = getDatabase$5();
  return withSchemaRecovery(db, () => {
    const user = db.prepare(
      `
            SELECT
              id,
              role,
              firstName,
              lastName,
              email,
              phone,
              avatarUrl,
              companyName,
              companyWebsite,
              industry,
              teamSize,
              companyDescription,
              address,
              savedLocationsJson,
              hiringNeedsJson,
              authProvider
            FROM "User"
            WHERE id = ?
            LIMIT 1
          `
    ).get(userId);
    if (!user) {
      return null;
    }
    return {
      id: user.id,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: `${user.firstName} ${user.lastName}`.trim(),
      email: user.email,
      phone: user.phone ?? "",
      avatarUrl: user.avatarUrl,
      companyName: user.companyName ?? "",
      companyWebsite: user.companyWebsite ?? "",
      industry: user.industry ?? "",
      teamSize: user.teamSize ?? "",
      companyDescription: user.companyDescription ?? "",
      address: user.address ?? "",
      savedLocations: parseSavedLocations(user.savedLocationsJson),
      hiringNeeds: parseHiringNeeds(user.hiringNeedsJson),
      authProvider: user.authProvider
    };
  });
}
function getProfessionalUsers() {
  const db = getDatabase$5();
  return withSchemaRecovery(
    db,
    () => db.prepare(
      `
            SELECT
              id,
              firstName,
              lastName,
              email,
              phone,
              avatarUrl,
              companyName,
              industry,
              companyDescription,
              address,
              professionalCategory,
              professionalCity,
              serviceArea,
              serviceRadiusKm,
              hourlyRate,
              fixedRate,
              averageRating,
              reviewCount,
              isVerified,
              availabilityStatus
            FROM "User"
            WHERE role = 'PROFESSIONAL' AND isActive = 1
            ORDER BY datetime(createdAt) DESC, id DESC
          `
    ).all()
  );
}
function getProfessionalProfileByUserId(userId) {
  const db = getDatabase$5();
  return withSchemaRecovery(db, () => {
    const user = db.prepare(
      `
          SELECT
            id,
            role,
            firstName,
            lastName,
            email,
            phone,
            avatarUrl,
            professionalCategory,
            professionalCity,
            professionalSkillsJson,
            experienceYears,
            hourlyRate,
            fixedRate,
            portfolioUrl,
            workPhotosJson,
            certificationsJson,
            tradeLicenseUrl,
            availabilityStatus,
            serviceArea,
            serviceRadiusKm,
            workMode,
            companyDescription,
            address,
            isVerified,
            averageRating,
            reviewCount,
            emailNotificationsEnabled,
            browserNotificationsEnabled,
            projectActivityNotificationsEnabled
          FROM "User"
          WHERE id = ? AND role = 'PROFESSIONAL'
          LIMIT 1
        `
    ).get(userId);
    if (!user) {
      return null;
    }
    return {
      id: user.id,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: `${user.firstName} ${user.lastName}`.trim(),
      email: user.email,
      phone: user.phone ?? "",
      avatarUrl: user.avatarUrl,
      professionalCategory: user.professionalCategory ?? "",
      professionalCity: user.professionalCity ?? "",
      skills: parseStringList(user.professionalSkillsJson),
      experienceYears: user.experienceYears,
      hourlyRate: user.hourlyRate,
      fixedRate: user.fixedRate,
      portfolioUrl: user.portfolioUrl ?? "",
      workPhotos: parseStringList(user.workPhotosJson),
      certifications: parseStringList(user.certificationsJson),
      tradeLicenseUrl: user.tradeLicenseUrl ?? "",
      availabilityStatus: user.availabilityStatus || "available",
      serviceArea: user.serviceArea ?? "",
      serviceRadiusKm: user.serviceRadiusKm,
      workMode: user.workMode || "both",
      companyDescription: user.companyDescription ?? "",
      address: user.address ?? "",
      isVerified: Boolean(user.isVerified),
      averageRating: Number(user.averageRating || 0),
      reviewCount: Number(user.reviewCount || 0),
      emailNotificationsEnabled: user.emailNotificationsEnabled !== 0,
      browserNotificationsEnabled: user.browserNotificationsEnabled !== 0,
      projectActivityNotificationsEnabled: user.projectActivityNotificationsEnabled !== 0
    };
  });
}
function getUserNotificationPreferences(userId) {
  const db = getDatabase$5();
  return withSchemaRecovery(db, () => {
    const user = db.prepare(
      `
          SELECT
            emailNotificationsEnabled,
            browserNotificationsEnabled,
            projectActivityNotificationsEnabled
          FROM "User"
          WHERE id = ?
          LIMIT 1
        `
    ).get(userId);
    return {
      emailNotificationsEnabled: user?.emailNotificationsEnabled !== 0,
      browserNotificationsEnabled: user?.browserNotificationsEnabled !== 0,
      projectActivityNotificationsEnabled: user?.projectActivityNotificationsEnabled !== 0
    };
  });
}
function updateUserNotificationPreferencesByUserId(input) {
  const db = getDatabase$5();
  const current = getUserNotificationPreferences(input.userId);
  const timestamp = (/* @__PURE__ */ new Date()).toISOString();
  return withSchemaRecovery(db, () => {
    db.prepare(
      `
        UPDATE "User"
        SET
          emailNotificationsEnabled = ?,
          browserNotificationsEnabled = ?,
          projectActivityNotificationsEnabled = ?,
          updatedAt = ?
        WHERE id = ?
      `
    ).run(
      input.emailNotificationsEnabled ?? current.emailNotificationsEnabled ? 1 : 0,
      input.browserNotificationsEnabled ?? current.browserNotificationsEnabled ? 1 : 0,
      input.projectActivityNotificationsEnabled ?? current.projectActivityNotificationsEnabled ? 1 : 0,
      timestamp,
      input.userId
    );
    return getUserNotificationPreferences(input.userId);
  });
}
function updateProfessionalNotificationPreferencesByUserId(input) {
  const db = getDatabase$5();
  const timestamp = (/* @__PURE__ */ new Date()).toISOString();
  return withSchemaRecovery(db, () => {
    db.prepare(
      `
        UPDATE "User"
        SET
          emailNotificationsEnabled = ?,
          browserNotificationsEnabled = ?,
          projectActivityNotificationsEnabled = ?,
          updatedAt = ?
        WHERE id = ? AND role = 'PROFESSIONAL'
      `
    ).run(
      input.emailNotificationsEnabled ? 1 : 0,
      input.browserNotificationsEnabled ? 1 : 0,
      input.projectActivityNotificationsEnabled ? 1 : 0,
      timestamp,
      input.userId
    );
    return getProfessionalProfileByUserId(input.userId);
  });
}
function updateProfessionalProfileByUserId(input) {
  const db = getDatabase$5();
  const timestamp = (/* @__PURE__ */ new Date()).toISOString();
  const { firstName, lastName } = splitFullName(input.fullName);
  return withSchemaRecovery(db, () => {
    db.prepare(
      `
        UPDATE "User"
        SET
          firstName = ?,
          lastName = ?,
          avatarUrl = ?,
          professionalCategory = ?,
          professionalCity = ?,
          professionalSkillsJson = ?,
          experienceYears = ?,
          hourlyRate = ?,
          fixedRate = ?,
          portfolioUrl = ?,
          workPhotosJson = ?,
          certificationsJson = ?,
          tradeLicenseUrl = ?,
          availabilityStatus = ?,
          serviceArea = ?,
          serviceRadiusKm = ?,
          workMode = ?,
          companyDescription = ?,
          address = ?,
          emailNotificationsEnabled = ?,
          browserNotificationsEnabled = ?,
          projectActivityNotificationsEnabled = ?,
          industry = COALESCE(?, industry),
          updatedAt = ?
        WHERE id = ? AND role = 'PROFESSIONAL'
      `
    ).run(
      firstName,
      lastName,
      input.profilePhotoUrl?.trim() || null,
      input.professionalCategory.trim(),
      input.professionalCity.trim(),
      stringifyStringList(input.skills),
      input.experienceYears ?? null,
      input.hourlyRate ?? null,
      input.fixedRate ?? null,
      input.portfolioUrl?.trim() || null,
      stringifyStringList(input.workPhotos),
      stringifyStringList(input.certifications),
      input.tradeLicenseUrl?.trim() || null,
      input.availabilityStatus,
      input.serviceArea.trim(),
      input.serviceRadiusKm ?? null,
      input.workMode,
      input.companyDescription?.trim() || null,
      input.address.trim(),
      input.emailNotificationsEnabled === false ? 0 : 1,
      input.browserNotificationsEnabled === false ? 0 : 1,
      input.projectActivityNotificationsEnabled === false ? 0 : 1,
      null,
      timestamp,
      input.userId
    );
    return getProfessionalProfileByUserId(input.userId);
  });
}
function updateProfessionalAvatarByUserId(input) {
  const db = getDatabase$5();
  const timestamp = (/* @__PURE__ */ new Date()).toISOString();
  return withSchemaRecovery(db, () => {
    db.prepare(
      `
        UPDATE "User"
        SET
          avatarUrl = ?,
          updatedAt = ?
        WHERE id = ? AND role = 'PROFESSIONAL'
      `
    ).run(input.avatarUrl.trim() || null, timestamp, input.userId);
    return getProfessionalProfileByUserId(input.userId);
  });
}
function updateProfessionalWorkPhotosByUserId(input) {
  const db = getDatabase$5();
  const timestamp = (/* @__PURE__ */ new Date()).toISOString();
  return withSchemaRecovery(db, () => {
    db.prepare(
      `
        UPDATE "User"
        SET
          workPhotosJson = ?,
          updatedAt = ?
        WHERE id = ? AND role = 'PROFESSIONAL'
      `
    ).run(stringifyStringList(input.workPhotos), timestamp, input.userId);
    return getProfessionalProfileByUserId(input.userId);
  });
}
function updateClientProfileByUserId(input) {
  const db = getDatabase$5();
  const timestamp = (/* @__PURE__ */ new Date()).toISOString();
  const { firstName, lastName } = splitFullName(input.fullName);
  return withSchemaRecovery(db, () => {
    db.prepare(
      `
        UPDATE "User"
        SET
          firstName = ?,
          lastName = ?,
          email = ?,
          phone = ?,
          avatarUrl = ?,
          companyName = ?,
          companyWebsite = ?,
          industry = ?,
          teamSize = ?,
          companyDescription = ?,
          address = ?,
          savedLocationsJson = ?,
          hiringNeedsJson = ?,
          updatedAt = ?
        WHERE id = ?
      `
    ).run(
      firstName,
      lastName,
      input.email.trim().toLowerCase(),
      input.phone.trim(),
      input.avatarUrl ?? null,
      input.companyName?.trim() || null,
      input.companyWebsite?.trim() || null,
      input.industry?.trim() || null,
      input.teamSize?.trim() || null,
      input.companyDescription?.trim() || null,
      input.address.trim(),
      stringifySavedLocations(input.savedLocations),
      stringifyHiringNeeds(input.hiringNeeds),
      timestamp,
      input.userId
    );
    syncClientProfileTables(
      db,
      {
        userId: input.userId,
        fullName: input.fullName,
        email: input.email,
        phone: input.phone,
        companyName: input.companyName,
        companyWebsite: input.companyWebsite,
        industry: input.industry,
        teamSize: input.teamSize,
        companyDescription: input.companyDescription,
        address: input.address,
        avatarUrl: input.avatarUrl,
        savedLocations: input.savedLocations,
        hiringNeeds: input.hiringNeeds
      },
      timestamp
    );
    return getClientProfileByUserId(input.userId);
  });
}
function createUserRecord(input) {
  const db = getDatabase$5();
  const timestamp = (/* @__PURE__ */ new Date()).toISOString();
  return withSchemaRecovery(db, () => {
    const result = db.prepare(
      `
          INSERT INTO "User" (
            role,
            firstName,
            lastName,
            email,
            phone,
            passwordHash,
            googleId,
            avatarUrl,
            authProvider,
            isActive,
            createdAt,
            updatedAt
          )
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `
    ).run(
      input.role,
      input.firstName.trim(),
      input.lastName.trim(),
      input.email.trim().toLowerCase(),
      input.phone,
      input.passwordHash,
      input.googleId ?? null,
      input.avatarUrl ?? null,
      input.authProvider ?? (input.googleId ? "GOOGLE" : "LOCAL"),
      1,
      timestamp,
      timestamp
    );
    return db.prepare(
      `
          SELECT id, role, firstName, lastName, email, phone, avatarUrl, authProvider
          FROM "User"
          WHERE id = ?
          LIMIT 1
        `
    ).get(result.lastInsertRowid);
  });
}
function linkGoogleAccountToUser(input) {
  const db = getDatabase$5();
  const timestamp = (/* @__PURE__ */ new Date()).toISOString();
  return withSchemaRecovery(db, () => {
    db.prepare(
      `
        UPDATE "User"
        SET
          googleId = ?,
          avatarUrl = COALESCE(?, avatarUrl),
          authProvider = CASE
            WHEN authProvider = 'LOCAL' AND passwordHash IS NOT NULL THEN authProvider
            ELSE 'GOOGLE'
          END,
          firstName = COALESCE(NULLIF(?, ''), firstName),
          lastName = COALESCE(NULLIF(?, ''), lastName),
          updatedAt = ?
        WHERE id = ?
      `
    ).run(
      input.googleId,
      input.avatarUrl ?? null,
      input.firstName?.trim() ?? "",
      input.lastName?.trim() ?? "",
      timestamp,
      input.userId
    );
    return db.prepare(
      `
          SELECT id, role, firstName, lastName, email, phone, avatarUrl, authProvider
          FROM "User"
          WHERE id = ?
          LIMIT 1
        `
    ).get(input.userId);
  });
}
function upsertGoogleUser(input) {
  const existingGoogleUser = findUserByGoogleId(input.googleId);
  if (existingGoogleUser) {
    return mapPublicUser(existingGoogleUser);
  }
  const existingEmailUser = findUserByEmail(input.email);
  if (existingEmailUser) {
    return linkGoogleAccountToUser({
      userId: existingEmailUser.id,
      googleId: input.googleId,
      avatarUrl: input.avatarUrl,
      firstName: input.firstName,
      lastName: input.lastName
    });
  }
  return createUserRecord({
    role: "CLIENT",
    firstName: input.firstName,
    lastName: input.lastName,
    email: input.email,
    phone: null,
    passwordHash: null,
    googleId: input.googleId,
    avatarUrl: input.avatarUrl ?? null,
    authProvider: "GOOGLE"
  });
}
const userDb_server = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createUserRecord,
  findUserByEmail,
  findUserByEmailOrPhone,
  findUserByGoogleId,
  findUserById,
  getAdminUserStats,
  getAdminUsers,
  getClientProfileByUserId,
  getProfessionalProfileByUserId,
  getProfessionalUsers,
  getUserNotificationPreferences,
  linkGoogleAccountToUser,
  recordUserLogin,
  updateClientProfileByUserId,
  updateProfessionalAvatarByUserId,
  updateProfessionalNotificationPreferencesByUserId,
  updateProfessionalProfileByUserId,
  updateProfessionalVerifiedStatusByAdmin,
  updateProfessionalWorkPhotosByUserId,
  updateUserActiveStatusByAdmin,
  updateUserNotificationPreferencesByUserId,
  updateUserPasswordByAdmin,
  updateUserPasswordByEmail,
  updateUserRoleByAdmin,
  upsertGoogleUser
}, Symbol.toStringTag, { value: "Module" }));
const globalForPrisma = globalThis;
function getConfiguredDatabaseUrl() {
  const candidates = [process.env.SUPABASE_POSTGRES_URL, process.env.POSTGRES_URL, process.env.DIRECT_URL, process.env.DATABASE_URL];
  return candidates.find((candidate) => Boolean(candidate && /^postgres(ql)?:\/\//i.test(candidate.trim())))?.trim();
}
async function createPrismaClient() {
  const options = {
    log: ["warn", "error"]
  };
  const configuredDatabaseUrl = getConfiguredDatabaseUrl();
  if (!configuredDatabaseUrl) {
    throw new Error("Missing Prisma database URL. Set SUPABASE_POSTGRES_URL, POSTGRES_URL, or DIRECT_URL to your Supabase PostgreSQL connection string.");
  }
  process.env.DATABASE_URL = configuredDatabaseUrl;
  let adapter;
  try {
    const { PrismaPg } = await import("@prisma/adapter-pg");
    adapter = new PrismaPg({
      connectionString: configuredDatabaseUrl
    });
  } catch (err) {
    throw new Error(
      `Failed to load @prisma/adapter-pg: ${err instanceof Error ? err.message : String(err)}`
    );
  }
  options.adapter = adapter;
  return new PrismaClient(options);
}
function makeUnavailableProxy(message) {
  const handler = {
    get() {
      return new Proxy(() => {
        throw new Error(message);
      }, handler);
    },
    apply() {
      throw new Error(message);
    }
  };
  return new Proxy({}, handler);
}
let prismaInstance = null;
try {
  prismaInstance = globalForPrisma.prisma ?? await createPrismaClient();
  if (false) ;
} catch (err) {
  console.error("Prisma client initialization failed:", err);
  prismaInstance = makeUnavailableProxy("Prisma client is not available in this environment. Check logs for details.");
}
const prisma = prismaInstance;
const xss = xssModule.default ?? xssModule;
const FilterXSS = xss.FilterXSS ?? xss;
function escapeAttributeValue(value) {
  if (typeof xss.escapeAttrValue === "function") {
    return xss.escapeAttrValue(value);
  }
  return String(value ?? "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
const sanitizer = new FilterXSS({
  whiteList: {
    a: ["href", "title", "target", "rel", "class", "id"],
    b: ["class", "id"],
    blockquote: ["class", "id"],
    br: ["class", "id"],
    caption: ["class", "id"],
    code: ["class", "id"],
    div: ["class", "id"],
    em: ["class", "id"],
    figure: ["class", "id"],
    figcaption: ["class", "id"],
    h1: ["class", "id"],
    h2: ["class", "id"],
    h3: ["class", "id"],
    h4: ["class", "id"],
    h5: ["class", "id"],
    h6: ["class", "id"],
    hr: ["class", "id"],
    i: ["class", "id"],
    img: ["src", "alt", "title", "width", "height", "class", "id"],
    label: ["class", "id"],
    li: ["class", "id"],
    nav: ["class", "id"],
    ol: ["class", "id"],
    p: ["class", "id"],
    pre: ["class", "id"],
    section: ["class", "id"],
    small: ["class", "id"],
    span: ["class", "id"],
    strong: ["class", "id"],
    sub: ["class", "id"],
    sup: ["class", "id"],
    table: ["class", "id"],
    tbody: ["class", "id"],
    td: ["colspan", "rowspan", "class", "id"],
    th: ["colspan", "rowspan", "class", "id"],
    thead: ["class", "id"],
    tfoot: ["class", "id"],
    tr: ["class", "id"],
    u: ["class", "id"],
    ul: ["class", "id"]
  },
  stripIgnoreTag: true,
  stripIgnoreTagBody: ["script", "style"],
  safeAttrValue(tag, name, value) {
    if ((name === "href" || name === "src") && /^\s*(javascript|vbscript|data):/i.test(value)) {
      return "";
    }
    return value;
  },
  onIgnoreTagAttr(tag, name, value) {
    if (name === "class" || name === "id") {
      return `${name}="${escapeAttributeValue(value)}"`;
    }
  }
});
function sanitizeHtml(value) {
  return sanitizer.process(value);
}
const purify = sanitizeHtml;
const editableWebsitePages = [
  { pageKey: "home", path: "/", title: "Home Page" },
  { pageKey: "about", path: "/about-us", title: "About Us" },
  { pageKey: "how-it-works", path: "/how-it-works", title: "How It Works" },
  { pageKey: "services", path: "/services", title: "Services / Categories" },
  { pageKey: "for-clients", path: "/for-clients", title: "For Clients Page" },
  { pageKey: "for-professionals", path: "/for-professionals", title: "For Professionals Page" },
  { pageKey: "pricing", path: "/pricing", title: "Pricing / Fees / Commission" },
  { pageKey: "faq", path: "/faq", title: "FAQ Page" },
  { pageKey: "contact", path: "/contact-us", title: "Contact Us" },
  { pageKey: "privacy", path: "/privacy-policy", title: "Privacy Policy" },
  { pageKey: "terms", path: "/terms-and-conditions", title: "Terms & Conditions" }
];
async function ensureWebsitePages() {
  const count2 = await prisma.websitePage.count();
  if (count2 === 0) {
    for (const page of editableWebsitePages) {
      await prisma.websitePage.upsert({
        where: { pageKey: page.pageKey },
        update: {},
        create: {
          pageKey: page.pageKey,
          path: page.path,
          title: page.title,
          content: createDefaultContent(page.title),
          status: "DRAFT"
        }
      });
    }
  }
}
async function listWebsitePages() {
  await ensureWebsitePages();
  const pages = await prisma.websitePage.findMany({
    orderBy: { pageKey: "asc" }
  });
  return pages.map((p) => ({
    ...p,
    status: p.status,
    updatedAt: p.updatedAt.toISOString()
  }));
}
async function listPublishedWebsitePages() {
  await ensureWebsitePages();
  const pages = await prisma.websitePage.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { pageKey: "asc" }
  });
  return pages.map((p) => ({
    ...p,
    status: p.status,
    updatedAt: p.updatedAt.toISOString()
  }));
}
async function getPublishedWebsitePage(pageKey) {
  const page = await prisma.websitePage.findFirst({
    where: { pageKey, status: "PUBLISHED" }
  });
  if (!page) return void 0;
  return {
    ...page,
    status: page.status,
    updatedAt: page.updatedAt.toISOString()
  };
}
async function saveWebsitePage(pageKey, input) {
  if (!editableWebsitePages.some((page) => page.pageKey === pageKey)) {
    throw new Error("This page is not editable.");
  }
  const sanitizedContent = purify(input.content);
  const saved = await prisma.websitePage.update({
    where: { pageKey },
    data: {
      content: sanitizedContent,
      status: input.status,
      updatedAt: /* @__PURE__ */ new Date()
    }
  });
  return {
    ...saved,
    status: saved.status,
    updatedAt: saved.updatedAt.toISOString()
  };
}
function createDefaultContent(title) {
  return `<section class="cms-hero center"><div class="cms-wrap"><p class="cms-kicker">Servio</p><h1>\${title}</h1><p>Edit this page visually or open Source Editing to paste HTML.</p></div></section><section class="cms-section"><div class="cms-wrap"><h2>Main section</h2><div class="cms-grid two"><div class="cms-card"><h3>Content card one</h3><p>Add your page content here.</p></div><div class="cms-card"><h3>Content card two</h3><p>Add supporting information here.</p></div></div><div class="cms-cta"><div><h2>Ready to get started?</h2><p>Join Servio today.</p></div><a class="cms-btn orange" href="/signup">Create account</a></div></div></section>`;
}
const websitePageCms_server = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  editableWebsitePages,
  getPublishedWebsitePage,
  listPublishedWebsitePages,
  listWebsitePages,
  saveWebsitePage
}, Symbol.toStringTag, { value: "Module" }));
const jobUrgencySchema = z.enum(["LOW", "MEDIUM", "HIGH"]);
const jobWorkModeSchema = z.enum(["ON_SITE", "REMOTE", "BOTH"]);
const jobTimingTypeSchema = z.enum(["FIXED", "HOURLY", "WEEKLY"]);
const jobStatusSchema = z.enum(["DRAFT", "OPEN", "CLOSED"]);
const clientJobAttachmentSchema = z.object({
  fileName: z.string().trim().min(1, "File name is required."),
  fileType: z.string().trim().optional().or(z.literal("")),
  fileSize: z.number().int().nonnegative().optional(),
  previewUrl: z.string().trim().optional().or(z.literal(""))
});
const clientJobSchema = z.object({
  category: z.string().trim().min(2, "Select a category."),
  title: z.string().trim().min(1, "Add a job title."),
  description: z.string().trim().min(40, "Description must be at least 40 characters.").max(4e3, "Description is too long."),
  attachments: z.array(clientJobAttachmentSchema).max(10, "Upload up to 10 files.").default([]),
  budgetMin: z.coerce.number().int().nonnegative().optional().nullable(),
  budgetMax: z.coerce.number().int().positive().optional().nullable(),
  urgency: jobUrgencySchema,
  timingType: jobTimingTypeSchema.default("FIXED"),
  hourlyRate: z.coerce.number().int().positive().optional().nullable(),
  jobDate: z.string().trim().optional().or(z.literal("")),
  deadline: z.string().trim().optional().or(z.literal("")).default(""),
  workMode: jobWorkModeSchema,
  locationLabel: z.string().trim().optional().or(z.literal("")),
  locationAddress: z.string().trim().optional().or(z.literal("")),
  locationLat: z.number().optional().nullable(),
  locationLng: z.number().optional().nullable(),
  status: jobStatusSchema.default("OPEN")
}).superRefine((data, ctx) => {
  if (data.budgetMin != null && data.budgetMax != null && data.budgetMin > data.budgetMax) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["budgetMax"],
      message: "Maximum budget must be greater than minimum budget."
    });
  }
  if (data.timingType === "FIXED" && !data.deadline.trim()) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["deadline"],
      message: "Add a deadline."
    });
  }
  if (data.workMode !== "REMOTE" && (!data.locationAddress?.trim() || data.locationLat == null || data.locationLng == null)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["locationAddress"],
      message: "Select a job location by choosing a suggestion or dropping the map pin."
    });
  }
});
const draftClientJobSchema = z.object({
  category: z.string().trim().max(120).default(""),
  title: z.string().trim().default(""),
  description: z.string().trim().max(4e3, "Description is too long.").default(""),
  attachments: z.array(clientJobAttachmentSchema).max(10, "Upload up to 10 files.").default([]),
  budgetMin: z.coerce.number().int().nonnegative().optional().nullable(),
  budgetMax: z.coerce.number().int().positive().optional().nullable(),
  urgency: jobUrgencySchema,
  timingType: jobTimingTypeSchema.default("FIXED"),
  hourlyRate: z.coerce.number().int().positive().optional().nullable(),
  jobDate: z.string().trim().optional().or(z.literal("")),
  deadline: z.string().trim().optional().or(z.literal("")).default(""),
  workMode: jobWorkModeSchema,
  locationLabel: z.string().trim().optional().or(z.literal("")),
  locationAddress: z.string().trim().optional().or(z.literal("")),
  locationLat: z.number().optional().nullable(),
  locationLng: z.number().optional().nullable(),
  status: z.literal("DRAFT")
}).superRefine((data, ctx) => {
  if (data.budgetMin != null && data.budgetMax != null && data.budgetMin > data.budgetMax) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["budgetMax"],
      message: "Maximum budget must be greater than minimum budget."
    });
  }
});
const saveClientJobSchema = z.union([draftClientJobSchema, clientJobSchema]);
const globalForJobDb = globalThis;
function getDatabase$4() {
  if (!globalForJobDb.jobDb) {
    const databasePath = path.resolve(process.cwd(), "prisma", "app.db");
    globalForJobDb.jobDb = new Database(databasePath);
    ensureClientJobTables(globalForJobDb.jobDb);
  }
  return globalForJobDb.jobDb;
}
function ensureClientJobTables(db) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS "ClientJob" (
      "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      "userId" INTEGER NOT NULL,
      "category" TEXT NOT NULL,
      "title" TEXT NOT NULL,
      "description" TEXT NOT NULL,
      "budgetMin" INTEGER,
      "budgetMax" INTEGER,
      "urgency" TEXT NOT NULL DEFAULT 'MEDIUM',
      "timingType" TEXT NOT NULL DEFAULT 'FIXED',
      "hourlyRate" INTEGER,
      "jobDate" TEXT,
      "deadline" TEXT NOT NULL,
      "workMode" TEXT NOT NULL DEFAULT 'BOTH',
      "locationLabel" TEXT,
      "locationAddress" TEXT,
      "locationLat" REAL,
      "locationLng" REAL,
      "status" TEXT NOT NULL DEFAULT 'OPEN',
      "createdAt" TEXT NOT NULL,
      "updatedAt" TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "ClientJobAttachment" (
      "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      "jobId" INTEGER NOT NULL,
      "fileName" TEXT NOT NULL,
      "fileType" TEXT,
      "fileSize" INTEGER,
      "previewUrl" TEXT,
      "createdAt" TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS "ClientJob_userId_idx" ON "ClientJob"("userId");
    CREATE INDEX IF NOT EXISTS "ClientJob_status_idx" ON "ClientJob"("status");
    CREATE INDEX IF NOT EXISTS "ClientJobAttachment_jobId_idx" ON "ClientJobAttachment"("jobId");

    CREATE TABLE IF NOT EXISTS "FavoriteJob" (
      "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      "userId" INTEGER NOT NULL,
      "jobId" INTEGER NOT NULL,
      "createdAt" TEXT NOT NULL,
      UNIQUE("userId", "jobId")
    );

    CREATE INDEX IF NOT EXISTS "FavoriteJob_userId_idx" ON "FavoriteJob"("userId");
    CREATE INDEX IF NOT EXISTS "FavoriteJob_jobId_idx" ON "FavoriteJob"("jobId");

    CREATE TABLE IF NOT EXISTS "ProjectTracking" (
      "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      "requestId" INTEGER NOT NULL,
      "jobId" INTEGER NOT NULL,
      "clientId" INTEGER NOT NULL,
      "professionalId" INTEGER NOT NULL,
      "status" TEXT NOT NULL DEFAULT 'ACTIVE',
      "acceptedAt" TEXT NOT NULL,
      "createdAt" TEXT NOT NULL,
      "updatedAt" TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS "ProjectTracking_jobId_idx" ON "ProjectTracking"("jobId");
  `);
  ensureColumn(
    db,
    "ClientJob",
    "timingType",
    `ALTER TABLE "ClientJob" ADD COLUMN "timingType" TEXT NOT NULL DEFAULT 'FIXED'`
  );
  ensureColumn(
    db,
    "ClientJob",
    "hourlyRate",
    `ALTER TABLE "ClientJob" ADD COLUMN "hourlyRate" INTEGER`
  );
}
function ensureFavoriteJobTable(db) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS "FavoriteJob" (
      "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      "userId" INTEGER NOT NULL,
      "jobId" INTEGER NOT NULL,
      "createdAt" TEXT NOT NULL,
      UNIQUE("userId", "jobId")
    );

    CREATE INDEX IF NOT EXISTS "FavoriteJob_userId_idx" ON "FavoriteJob"("userId");
    CREATE INDEX IF NOT EXISTS "FavoriteJob_jobId_idx" ON "FavoriteJob"("jobId");
  `);
}
function normalizeDateValue(value) {
  const trimmed = value?.trim();
  if (!trimmed) {
    return null;
  }
  return (/* @__PURE__ */ new Date(`${trimmed}T00:00:00.000Z`)).toISOString();
}
function mapJob(row, attachments) {
  return {
    ...row,
    timingType: row.timingType ?? (row.hourlyRate ? "HOURLY" : "FIXED"),
    hourlyRate: row.hourlyRate ?? null,
    attachments
  };
}
function tableExists$1(db, tableName) {
  const result = db.prepare(`SELECT name FROM sqlite_master WHERE type = 'table' AND name = ? LIMIT 1`).get(tableName);
  return Boolean(result);
}
function ensureColumn(db, tableName, columnName, alterSql) {
  const columns = db.prepare(`PRAGMA table_info("${tableName}")`).all();
  if (!columns.some((column) => column.name === columnName)) {
    db.exec(alterSql);
  }
}
function availableJobPredicate() {
  return `
    ClientJob.status = 'OPEN'
    AND NOT EXISTS (
      SELECT 1
      FROM "ProjectTracking"
      WHERE "ProjectTracking".jobId = ClientJob.id
        AND "ProjectTracking".status = 'ACTIVE'
    )
  `;
}
function createClientJob(userId, input) {
  const db = getDatabase$4();
  const timestamp = (/* @__PURE__ */ new Date()).toISOString();
  const createJob = db.transaction((attachments) => {
    const result = db.prepare(
      `
          INSERT INTO "ClientJob" (
            userId,
            category,
            title,
            description,
            budgetMin,
            budgetMax,
            urgency,
            timingType,
            hourlyRate,
            jobDate,
            deadline,
            workMode,
            locationLabel,
            locationAddress,
            locationLat,
            locationLng,
            status,
            createdAt,
            updatedAt
          )
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `
    ).run(
      userId,
      input.category.trim(),
      input.title.trim(),
      input.description.trim(),
      input.budgetMin ?? null,
      input.budgetMax ?? null,
      input.urgency,
      input.timingType,
      input.hourlyRate ?? null,
      normalizeDateValue(input.jobDate),
      normalizeDateValue(input.deadline) ?? timestamp,
      input.workMode,
      input.locationLabel?.trim() || null,
      input.locationAddress?.trim() || null,
      input.locationLat ?? null,
      input.locationLng ?? null,
      input.status,
      timestamp,
      timestamp
    );
    const jobId2 = Number(result.lastInsertRowid);
    const insertAttachment = db.prepare(
      `
        INSERT INTO "ClientJobAttachment" (
          jobId,
          fileName,
          fileType,
          fileSize,
          previewUrl,
          createdAt
        )
        VALUES (?, ?, ?, ?, ?, ?)
      `
    );
    for (const attachment of attachments) {
      insertAttachment.run(
        jobId2,
        attachment.fileName.trim(),
        attachment.fileType?.trim() || null,
        attachment.fileSize ?? null,
        attachment.previewUrl?.trim() || null,
        timestamp
      );
    }
    return jobId2;
  });
  const jobId = createJob(input.attachments ?? []);
  try {
    const socketUrl = process.env.SOCKET_URL || `http://localhost:${process.env.SOCKET_PORT || 4001}`;
    const sock = io(socketUrl, { autoConnect: false });
    sock.connect();
    sock.emit("admin:activity", { reason: "client job posted" });
    sock.disconnect();
  } catch (e) {
  }
  return getClientJobById(userId, jobId);
}
async function getClientJobById(userId, jobId) {
  const job = await prisma.clientJob.findUnique({
    where: { id: jobId },
    include: {
      attachments: { orderBy: { id: "asc" } },
      user: { select: { firstName: true, lastName: true, companyName: true, avatarUrl: true } }
    }
  });
  if (!job || job.userId !== userId) return null;
  const attachments = job.attachments.map((a) => ({
    id: a.id,
    jobId: a.jobId,
    fileName: a.fileName,
    fileType: a.fileType,
    fileSize: a.fileSize,
    previewUrl: a.previewUrl,
    createdAt: a.createdAt.toISOString()
  }));
  return {
    id: job.id,
    userId: job.userId,
    category: job.category,
    title: job.title,
    description: job.description,
    budgetMin: job.budgetMin,
    budgetMax: job.budgetMax,
    urgency: job.urgency,
    timingType: job.jobDate ? "FIXED" : "FIXED",
    hourlyRate: null,
    jobDate: job.jobDate?.toISOString() ?? null,
    deadline: job.deadline.toISOString(),
    workMode: job.workMode,
    locationLabel: job.locationLabel,
    locationAddress: job.locationAddress,
    locationLat: job.locationLat,
    locationLng: job.locationLng,
    status: job.status,
    createdAt: job.createdAt.toISOString(),
    updatedAt: job.updatedAt.toISOString(),
    attachments
  };
}
async function getClientJobsByUserId(userId) {
  const jobs = await prisma.clientJob.findMany({
    where: { userId },
    include: { attachments: { orderBy: { id: "asc" } } },
    orderBy: [{ createdAt: "desc" }, { id: "desc" }]
  });
  return jobs.map(
    (job) => mapJob(
      {
        id: job.id,
        userId: job.userId,
        category: job.category,
        title: job.title,
        description: job.description,
        budgetMin: job.budgetMin,
        budgetMax: job.budgetMax,
        urgency: job.urgency,
        timingType: job.jobDate ? "FIXED" : "FIXED",
        hourlyRate: null,
        jobDate: job.jobDate?.toISOString() ?? null,
        deadline: job.deadline.toISOString(),
        workMode: job.workMode,
        locationLabel: job.locationLabel,
        locationAddress: job.locationAddress,
        locationLat: job.locationLat,
        locationLng: job.locationLng,
        status: job.status,
        createdAt: job.createdAt.toISOString(),
        updatedAt: job.updatedAt.toISOString()
      },
      job.attachments.map((a) => ({
        id: a.id,
        jobId: a.jobId,
        fileName: a.fileName,
        fileType: a.fileType,
        fileSize: a.fileSize,
        previewUrl: a.previewUrl,
        createdAt: a.createdAt.toISOString()
      }))
    )
  );
}
async function getOpenClientJobs() {
  const jobs = await prisma.$queryRawUnsafe(
    `
      SELECT
        cj.*,
        TRIM(u."firstName" || ' ' || u."lastName") AS "clientName",
        u."companyName" AS "clientCompanyName",
        u."avatarUrl" AS "clientAvatarUrl"
      FROM "ClientJob" cj
      INNER JOIN "User" u ON u.id = cj."userId"
      WHERE cj."status" = 'OPEN'
      ORDER BY cj."createdAt" DESC, cj.id DESC
    `
  );
  if (!jobs.length) return [];
  const idsCsv = jobs.map((j) => Number(j.id)).join(",");
  const attachmentRows = idsCsv ? await prisma.$queryRawUnsafe(
    `SELECT * FROM "ClientJobAttachment" WHERE "jobId" IN (${idsCsv}) ORDER BY id ASC`
  ) : [];
  return jobs.map((job) => ({
    ...mapJob(
      {
        id: job.id,
        userId: job.userId,
        category: job.category,
        title: job.title,
        description: job.description,
        budgetMin: job.budgetMin,
        budgetMax: job.budgetMax,
        urgency: job.urgency,
        timingType: job.jobDate ? "FIXED" : "FIXED",
        hourlyRate: null,
        jobDate: job.jobDate ? new Date(job.jobDate).toISOString() : null,
        deadline: new Date(job.deadline).toISOString(),
        workMode: job.workMode,
        locationLabel: job.locationLabel,
        locationAddress: job.locationAddress,
        locationLat: job.locationLat,
        locationLng: job.locationLng,
        status: job.status,
        createdAt: new Date(job.createdAt).toISOString(),
        updatedAt: new Date(job.updatedAt).toISOString()
      },
      attachmentRows.filter((a) => a.jobId === job.id).map((a) => ({
        id: a.id,
        jobId: a.jobId,
        fileName: a.fileName,
        fileType: a.fileType,
        fileSize: a.fileSize,
        previewUrl: a.previewUrl,
        createdAt: new Date(a.createdAt).toISOString()
      }))
    ),
    clientName: job.clientName,
    clientCompanyName: job.clientCompanyName ?? null,
    clientAvatarUrl: job.clientAvatarUrl ?? null
  }));
}
async function getOpenClientJobById(jobId) {
  const job = await prisma.clientJob.findUnique({
    where: { id: jobId },
    include: {
      user: { select: { firstName: true, lastName: true, companyName: true, avatarUrl: true } },
      attachments: { orderBy: { id: "asc" } }
    }
  });
  if (!job || job.status !== "OPEN") return null;
  return {
    ...mapJob(
      {
        id: job.id,
        userId: job.userId,
        category: job.category,
        title: job.title,
        description: job.description,
        budgetMin: job.budgetMin,
        budgetMax: job.budgetMax,
        urgency: job.urgency,
        timingType: job.jobDate ? "FIXED" : "FIXED",
        hourlyRate: null,
        jobDate: job.jobDate?.toISOString() ?? null,
        deadline: job.deadline.toISOString(),
        workMode: job.workMode,
        locationLabel: job.locationLabel,
        locationAddress: job.locationAddress,
        locationLat: job.locationLat,
        locationLng: job.locationLng,
        status: job.status,
        createdAt: job.createdAt.toISOString(),
        updatedAt: job.updatedAt.toISOString()
      },
      job.attachments.map((a) => ({
        id: a.id,
        jobId: a.jobId,
        fileName: a.fileName,
        fileType: a.fileType,
        fileSize: a.fileSize,
        previewUrl: a.previewUrl,
        createdAt: a.createdAt.toISOString()
      }))
    ),
    clientName: `${job.user.firstName} ${job.user.lastName}`.trim(),
    clientCompanyName: job.user.companyName ?? null,
    clientAvatarUrl: job.user.avatarUrl ?? null
  };
}
async function getFavoriteJobIds(userId) {
  const rows = await prisma.favoriteJob.findMany({
    where: { userId },
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    select: { jobId: true }
  });
  return rows.map((r) => r.jobId);
}
async function getFavoriteJobsByUserId(userId) {
  const favoriteIds = await getFavoriteJobIds(userId);
  if (!favoriteIds.length) {
    return [];
  }
  const favoriteIdSet = new Set(favoriteIds);
  const favoriteOrder = new Map(
    favoriteIds.map((jobId, index) => [jobId, index])
  );
  const openJobs = await getOpenClientJobs();
  return openJobs.filter((job) => favoriteIdSet.has(job.id)).sort((a, b) => {
    const aRank = favoriteOrder.get(a.id) ?? 0;
    const bRank = favoriteOrder.get(b.id) ?? 0;
    return aRank - bRank;
  });
}
async function isFavoriteJob(userId, jobId) {
  const row = await prisma.favoriteJob.findFirst({ where: { userId, jobId }, select: { id: true } });
  return Boolean(row);
}
function setFavoriteJob(userId, jobId, favorite) {
  const db = getDatabase$4();
  ensureFavoriteJobTable(db);
  if (favorite) {
    const job = db.prepare(
      `
          SELECT id
          FROM "ClientJob"
          WHERE ClientJob.id = ? AND ${availableJobPredicate()}
          LIMIT 1
        `
    ).get(jobId);
    if (!job) {
      throw new Error("This job is not available.");
    }
    db.prepare(
      `
        INSERT OR IGNORE INTO "FavoriteJob" (userId, jobId, createdAt)
        VALUES (?, ?, ?)
      `
    ).run(userId, jobId, (/* @__PURE__ */ new Date()).toISOString());
    return true;
  }
  db.prepare(
    `
      DELETE FROM "FavoriteJob"
      WHERE userId = ? AND jobId = ?
    `
  ).run(userId, jobId);
  return false;
}
async function updateClientJobStatus(userId, jobId, status) {
  const db = getDatabase$4();
  const timestamp = (/* @__PURE__ */ new Date()).toISOString();
  const existing = await getClientJobById(userId, jobId);
  if (!existing) {
    return void 0;
  }
  const updateJobStatus = db.transaction(() => {
    if (status === "OPEN" && existing.status === "CLOSED") {
      clearReopenedJobRequestDrafts(db, jobId);
    }
    db.prepare(
      `
        UPDATE "ClientJob"
        SET status = ?, updatedAt = ?
        WHERE id = ? AND userId = ?
      `
    ).run(status, timestamp, jobId, userId);
  });
  updateJobStatus();
  return getClientJobById(userId, jobId);
}
function clearReopenedJobRequestDrafts(db, jobId) {
  if (!tableExists$1(db, "ProjectRequest")) {
    return;
  }
  if (tableExists$1(db, "ProjectNegotiation")) {
    db.prepare(
      `
        DELETE FROM "ProjectNegotiation"
        WHERE requestId IN (
          SELECT id
          FROM "ProjectRequest"
          WHERE jobId = ? AND status IN ('PENDING', 'DECLINED')
        )
      `
    ).run(jobId);
  }
  db.prepare(
    `
      DELETE FROM "ProjectRequest"
      WHERE jobId = ? AND status IN ('PENDING', 'DECLINED')
    `
  ).run(jobId);
}
function updateClientJob(userId, jobId, input) {
  const db = getDatabase$4();
  const timestamp = (/* @__PURE__ */ new Date()).toISOString();
  const existing = getClientJobById(userId, jobId);
  if (!existing) {
    return null;
  }
  const updateJob = db.transaction((attachments) => {
    db.prepare(
      `
        UPDATE "ClientJob"
        SET
          category = ?,
          title = ?,
          description = ?,
          budgetMin = ?,
          budgetMax = ?,
          urgency = ?,
          timingType = ?,
          hourlyRate = ?,
          jobDate = ?,
          deadline = ?,
          workMode = ?,
          locationLabel = ?,
          locationAddress = ?,
          locationLat = ?,
          locationLng = ?,
          status = ?,
          updatedAt = ?
        WHERE id = ? AND userId = ?
      `
    ).run(
      input.category.trim(),
      input.title.trim(),
      input.description.trim(),
      input.budgetMin ?? null,
      input.budgetMax ?? null,
      input.urgency,
      input.timingType,
      input.hourlyRate ?? null,
      normalizeDateValue(input.jobDate),
      normalizeDateValue(input.deadline) ?? timestamp,
      input.workMode,
      input.locationLabel?.trim() || null,
      input.locationAddress?.trim() || null,
      input.locationLat ?? null,
      input.locationLng ?? null,
      input.status,
      timestamp,
      jobId,
      userId
    );
    db.prepare(`DELETE FROM "ClientJobAttachment" WHERE jobId = ?`).run(jobId);
    const insertAttachment = db.prepare(
      `
        INSERT INTO "ClientJobAttachment" (
          jobId,
          fileName,
          fileType,
          fileSize,
          previewUrl,
          createdAt
        )
        VALUES (?, ?, ?, ?, ?, ?)
      `
    );
    for (const attachment of attachments) {
      insertAttachment.run(
        jobId,
        attachment.fileName.trim(),
        attachment.fileType?.trim() || null,
        attachment.fileSize ?? null,
        attachment.previewUrl?.trim() || null,
        timestamp
      );
    }
  });
  updateJob(input.attachments ?? []);
  try {
    const socketUrl = process.env.SOCKET_URL || `http://localhost:${process.env.SOCKET_PORT || 4001}`;
    const sock = io(socketUrl, { autoConnect: false });
    sock.connect();
    sock.emit("admin:activity", { reason: "client job updated" });
    sock.disconnect();
  } catch (e) {
  }
  return getClientJobById(userId, jobId);
}
function deleteClientJob(userId, jobId) {
  const db = getDatabase$4();
  const job = getClientJobById(userId, jobId);
  if (!job) {
    return false;
  }
  const deleteJob = db.transaction(() => {
    if (tableExists$1(db, "ProjectTracking")) {
      const retainedTracking = db.prepare(
        `
            SELECT id, status
            FROM "ProjectTracking"
            WHERE jobId = ?
              AND clientId = ?
              AND status IN ('ACTIVE', 'COMPLETED')
            LIMIT 1
          `
      ).get(jobId, userId);
      if (retainedTracking) {
        throw new Error(
          retainedTracking.status === "COMPLETED" ? "Completed projects stay in account history and cannot be deleted." : "Active projects must be cancelled or completed before the job can be deleted."
        );
      }
    }
    const trackingIds = tableExists$1(db, "ProjectTracking") ? db.prepare(`SELECT id FROM "ProjectTracking" WHERE jobId = ? AND clientId = ?`).all(jobId, userId) : [];
    const trackingIdValues = trackingIds.map((tracking) => tracking.id);
    if (trackingIdValues.length) {
      const placeholders = trackingIdValues.map(() => "?").join(",");
      const trackingTables = [
        "ProjectTransaction",
        "ProjectReview",
        "ProjectDispute",
        "ProjectCompletionRequest",
        "ProjectMilestone",
        "ProjectRevisionRequest",
        "ProjectWorkUpload"
      ];
      for (const table of trackingTables) {
        if (tableExists$1(db, table)) {
          db.prepare(`DELETE FROM "${table}" WHERE trackingId IN (${placeholders})`).run(
            ...trackingIdValues
          );
        }
      }
    }
    if (tableExists$1(db, "ProjectTracking")) {
      db.prepare(`DELETE FROM "ProjectTracking" WHERE jobId = ? AND clientId = ?`).run(
        jobId,
        userId
      );
    }
    if (tableExists$1(db, "ProjectRequest")) {
      db.prepare(`DELETE FROM "ProjectRequest" WHERE jobId = ? AND clientId = ?`).run(
        jobId,
        userId
      );
    }
    db.prepare(`DELETE FROM "FavoriteJob" WHERE jobId = ?`).run(jobId);
    db.prepare(`DELETE FROM "ClientJobAttachment" WHERE jobId = ?`).run(jobId);
    db.prepare(`DELETE FROM "ClientJob" WHERE id = ? AND userId = ?`).run(jobId, userId);
  });
  deleteJob();
  return true;
}
const REQUIRED_PROJECT_MILESTONES = 5;
const globalForProjectRequestDb = globalThis;
function getDatabase$3() {
  if (!globalForProjectRequestDb.projectRequestDb) {
    const databasePath = path__default.resolve(process.cwd(), "prisma", "app.db");
    globalForProjectRequestDb.projectRequestDb = new Database(databasePath);
    ensureProjectRequestTables(globalForProjectRequestDb.projectRequestDb);
  }
  return globalForProjectRequestDb.projectRequestDb;
}
function ensureProjectRequestTables(db) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS "ProjectRequest" (
      "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      "jobId" INTEGER NOT NULL,
      "clientId" INTEGER NOT NULL,
      "professionalId" INTEGER NOT NULL,
      "bidAmount" INTEGER,
      "duration" TEXT,
      "coverLetter" TEXT NOT NULL,
      "attachmentsJson" TEXT,
      "status" TEXT NOT NULL DEFAULT 'PENDING',
      "createdAt" TEXT NOT NULL,
      "updatedAt" TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS "ProjectRequest_jobId_idx" ON "ProjectRequest"("jobId");
    CREATE INDEX IF NOT EXISTS "ProjectRequest_clientId_idx" ON "ProjectRequest"("clientId");
    CREATE INDEX IF NOT EXISTS "ProjectRequest_professionalId_idx" ON "ProjectRequest"("professionalId");
    DROP INDEX IF EXISTS "ProjectRequest_job_professional_key";
    CREATE INDEX IF NOT EXISTS "ProjectRequest_job_professional_idx" ON "ProjectRequest"("jobId", "professionalId");

    CREATE TABLE IF NOT EXISTS "ProjectNegotiation" (
      "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      "requestId" INTEGER NOT NULL,
      "jobId" INTEGER NOT NULL,
      "clientId" INTEGER NOT NULL,
      "professionalId" INTEGER NOT NULL,
      "senderId" INTEGER NOT NULL,
      "senderRole" TEXT NOT NULL,
      "previousBidAmount" INTEGER,
      "previousDuration" TEXT,
      "previousMessage" TEXT,
      "bidAmount" INTEGER,
      "duration" TEXT,
      "message" TEXT NOT NULL,
      "createdAt" TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS "ProjectNegotiation_requestId_idx" ON "ProjectNegotiation"("requestId");
    CREATE INDEX IF NOT EXISTS "ProjectNegotiation_clientId_idx" ON "ProjectNegotiation"("clientId");
    CREATE INDEX IF NOT EXISTS "ProjectNegotiation_professionalId_idx" ON "ProjectNegotiation"("professionalId");

    CREATE TABLE IF NOT EXISTS "ProjectTracking" (
      "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      "requestId" INTEGER NOT NULL,
      "jobId" INTEGER NOT NULL,
      "clientId" INTEGER NOT NULL,
      "professionalId" INTEGER NOT NULL,
      "status" TEXT NOT NULL DEFAULT 'ACTIVE',
      "acceptedAt" TEXT NOT NULL,
      "createdAt" TEXT NOT NULL,
      "updatedAt" TEXT NOT NULL
    );

    CREATE UNIQUE INDEX IF NOT EXISTS "ProjectTracking_requestId_key" ON "ProjectTracking"("requestId");
    CREATE INDEX IF NOT EXISTS "ProjectTracking_jobId_idx" ON "ProjectTracking"("jobId");
    CREATE INDEX IF NOT EXISTS "ProjectTracking_clientId_idx" ON "ProjectTracking"("clientId");
    CREATE INDEX IF NOT EXISTS "ProjectTracking_professionalId_idx" ON "ProjectTracking"("professionalId");

    CREATE TABLE IF NOT EXISTS "ProjectWorkUpload" (
      "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      "trackingId" INTEGER NOT NULL,
      "roundNumber" INTEGER NOT NULL,
      "title" TEXT NOT NULL,
      "note" TEXT NOT NULL,
      "fileName" TEXT,
      "fileUrl" TEXT,
      "filesJson" TEXT,
      "createdAt" TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS "ProjectWorkUpload_trackingId_idx" ON "ProjectWorkUpload"("trackingId");

    CREATE TABLE IF NOT EXISTS "ProjectRevisionRequest" (
      "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      "trackingId" INTEGER NOT NULL,
      "clientId" INTEGER NOT NULL,
      "professionalId" INTEGER NOT NULL,
      "note" TEXT NOT NULL,
      "status" TEXT NOT NULL DEFAULT 'REQUESTED',
      "createdAt" TEXT NOT NULL,
      "updatedAt" TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS "ProjectRevisionRequest_trackingId_idx" ON "ProjectRevisionRequest"("trackingId");
    CREATE INDEX IF NOT EXISTS "ProjectRevisionRequest_clientId_idx" ON "ProjectRevisionRequest"("clientId");
    CREATE INDEX IF NOT EXISTS "ProjectRevisionRequest_professionalId_idx" ON "ProjectRevisionRequest"("professionalId");

    CREATE TABLE IF NOT EXISTS "ProjectMilestone" (
      "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      "trackingId" INTEGER NOT NULL,
      "clientId" INTEGER NOT NULL,
      "professionalId" INTEGER NOT NULL,
      "title" TEXT NOT NULL,
      "description" TEXT,
      "amount" INTEGER,
      "dueDate" TEXT,
      "status" TEXT NOT NULL DEFAULT 'PENDING',
      "createdAt" TEXT NOT NULL,
      "updatedAt" TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS "ProjectMilestone_trackingId_idx" ON "ProjectMilestone"("trackingId");
    CREATE INDEX IF NOT EXISTS "ProjectMilestone_clientId_idx" ON "ProjectMilestone"("clientId");
    CREATE INDEX IF NOT EXISTS "ProjectMilestone_professionalId_idx" ON "ProjectMilestone"("professionalId");

    CREATE TABLE IF NOT EXISTS "ProjectCompletionRequest" (
      "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      "trackingId" INTEGER NOT NULL,
      "clientId" INTEGER NOT NULL,
      "professionalId" INTEGER NOT NULL,
      "note" TEXT,
      "status" TEXT NOT NULL DEFAULT 'SUBMITTED',
      "submittedAt" TEXT NOT NULL,
      "updatedAt" TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS "ProjectCompletionRequest_trackingId_idx" ON "ProjectCompletionRequest"("trackingId");
    CREATE INDEX IF NOT EXISTS "ProjectCompletionRequest_clientId_idx" ON "ProjectCompletionRequest"("clientId");
    CREATE INDEX IF NOT EXISTS "ProjectCompletionRequest_professionalId_idx" ON "ProjectCompletionRequest"("professionalId");

    CREATE TABLE IF NOT EXISTS "ProjectTransaction" (
      "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      "trackingId" INTEGER NOT NULL,
      "milestoneId" INTEGER,
      "completionId" INTEGER,
      "clientId" INTEGER NOT NULL,
      "professionalId" INTEGER NOT NULL,
      "amount" INTEGER NOT NULL,
      "currency" TEXT NOT NULL DEFAULT 'USD',
      "type" TEXT NOT NULL,
      "status" TEXT NOT NULL DEFAULT 'COMPLETED',
      "description" TEXT NOT NULL,
      "createdAt" TEXT NOT NULL,
      "updatedAt" TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS "ProjectTransaction_trackingId_idx" ON "ProjectTransaction"("trackingId");
    CREATE INDEX IF NOT EXISTS "ProjectTransaction_clientId_idx" ON "ProjectTransaction"("clientId");
    CREATE INDEX IF NOT EXISTS "ProjectTransaction_professionalId_idx" ON "ProjectTransaction"("professionalId");
    CREATE INDEX IF NOT EXISTS "ProjectTransaction_status_idx" ON "ProjectTransaction"("status");
    CREATE UNIQUE INDEX IF NOT EXISTS "ProjectTransaction_milestoneId_key" ON "ProjectTransaction"("milestoneId") WHERE "milestoneId" IS NOT NULL;
    CREATE UNIQUE INDEX IF NOT EXISTS "ProjectTransaction_completionId_key" ON "ProjectTransaction"("completionId") WHERE "completionId" IS NOT NULL;

    CREATE TABLE IF NOT EXISTS "ProjectWithdrawal" (
      "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      "professionalId" INTEGER NOT NULL,
      "amount" INTEGER NOT NULL,
      "currency" TEXT NOT NULL DEFAULT 'USD',
      "destinationType" TEXT NOT NULL,
      "destinationLabel" TEXT NOT NULL,
      "status" TEXT NOT NULL DEFAULT 'PENDING',
      "note" TEXT,
      "createdAt" TEXT NOT NULL,
      "updatedAt" TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS "ProjectWithdrawal_professionalId_idx" ON "ProjectWithdrawal"("professionalId");
    CREATE INDEX IF NOT EXISTS "ProjectWithdrawal_status_idx" ON "ProjectWithdrawal"("status");

    CREATE TABLE IF NOT EXISTS "ProjectReview" (
      "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      "trackingId" INTEGER NOT NULL,
      "clientId" INTEGER NOT NULL,
      "professionalId" INTEGER NOT NULL,
      "rating" INTEGER NOT NULL,
      "comment" TEXT,
      "professionalResponse" TEXT,
      "professionalResponseAt" TEXT,
      "createdAt" TEXT NOT NULL,
      "updatedAt" TEXT NOT NULL
    );

    CREATE UNIQUE INDEX IF NOT EXISTS "ProjectReview_trackingId_key" ON "ProjectReview"("trackingId");
    CREATE INDEX IF NOT EXISTS "ProjectReview_clientId_idx" ON "ProjectReview"("clientId");
    CREATE INDEX IF NOT EXISTS "ProjectReview_professionalId_idx" ON "ProjectReview"("professionalId");

    CREATE TABLE IF NOT EXISTS "ProjectReviewRequest" (
      "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      "trackingId" INTEGER NOT NULL,
      "clientId" INTEGER NOT NULL,
      "professionalId" INTEGER NOT NULL,
      "note" TEXT,
      "createdAt" TEXT NOT NULL,
      "updatedAt" TEXT NOT NULL
    );

    CREATE UNIQUE INDEX IF NOT EXISTS "ProjectReviewRequest_trackingId_key" ON "ProjectReviewRequest"("trackingId");
    CREATE INDEX IF NOT EXISTS "ProjectReviewRequest_clientId_idx" ON "ProjectReviewRequest"("clientId");
    CREATE INDEX IF NOT EXISTS "ProjectReviewRequest_professionalId_idx" ON "ProjectReviewRequest"("professionalId");

    CREATE TABLE IF NOT EXISTS "ProjectDispute" (
      "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      "trackingId" INTEGER NOT NULL,
      "reporterId" INTEGER NOT NULL,
      "reporterRole" TEXT NOT NULL,
      "clientId" INTEGER NOT NULL,
      "professionalId" INTEGER NOT NULL,
      "issueType" TEXT NOT NULL,
      "priority" TEXT NOT NULL DEFAULT 'MEDIUM',
      "message" TEXT NOT NULL,
      "attachmentsJson" TEXT,
      "status" TEXT NOT NULL DEFAULT 'OPEN',
      "createdAt" TEXT NOT NULL,
      "updatedAt" TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS "ProjectDispute_trackingId_idx" ON "ProjectDispute"("trackingId");
    CREATE INDEX IF NOT EXISTS "ProjectDispute_reporterId_idx" ON "ProjectDispute"("reporterId");
    CREATE INDEX IF NOT EXISTS "ProjectDispute_status_idx" ON "ProjectDispute"("status");
  `);
  const negotiationColumns = new Set(
    db.prepare(`PRAGMA table_info("ProjectNegotiation")`).all().map((column) => column.name)
  );
  if (!negotiationColumns.has("previousBidAmount")) {
    db.exec(`ALTER TABLE "ProjectNegotiation" ADD COLUMN "previousBidAmount" INTEGER`);
  }
  if (!negotiationColumns.has("previousDuration")) {
    db.exec(`ALTER TABLE "ProjectNegotiation" ADD COLUMN "previousDuration" TEXT`);
  }
  if (!negotiationColumns.has("previousMessage")) {
    db.exec(`ALTER TABLE "ProjectNegotiation" ADD COLUMN "previousMessage" TEXT`);
  }
  const columns = new Set(
    db.prepare(`PRAGMA table_info("ProjectRequest")`).all().map((column) => column.name)
  );
  if (!columns.has("attachmentsJson")) {
    db.exec(`ALTER TABLE "ProjectRequest" ADD COLUMN "attachmentsJson" TEXT`);
  }
  const workUploadColumns = new Set(
    db.prepare(`PRAGMA table_info("ProjectWorkUpload")`).all().map((column) => column.name)
  );
  if (!workUploadColumns.has("filesJson")) {
    db.exec(`ALTER TABLE "ProjectWorkUpload" ADD COLUMN "filesJson" TEXT`);
  }
  const reviewColumns = new Set(
    db.prepare(`PRAGMA table_info("ProjectReview")`).all().map((column) => column.name)
  );
  if (!reviewColumns.has("professionalResponse")) {
    db.exec(`ALTER TABLE "ProjectReview" ADD COLUMN "professionalResponse" TEXT`);
  }
  if (!reviewColumns.has("professionalResponseAt")) {
    db.exec(`ALTER TABLE "ProjectReview" ADD COLUMN "professionalResponseAt" TEXT`);
  }
  backfillProjectTransactions(db);
}
function getProjectWorkUploads(trackingId) {
  const db = getDatabase$3();
  ensureProjectRequestTables(db);
  return db.prepare(
    `
        SELECT *
        FROM "ProjectWorkUpload"
        WHERE trackingId = ?
        ORDER BY roundNumber ASC, id ASC
      `
  ).all(trackingId);
}
function getProjectRevisionRequests(trackingId) {
  const db = getDatabase$3();
  ensureProjectRequestTables(db);
  return db.prepare(
    `
        SELECT *
        FROM "ProjectRevisionRequest"
        WHERE trackingId = ?
        ORDER BY datetime(createdAt) ASC, id ASC
      `
  ).all(trackingId);
}
function getProjectMilestones(trackingId) {
  const db = getDatabase$3();
  ensureProjectRequestTables(db);
  return db.prepare(
    `
        SELECT *
        FROM "ProjectMilestone"
        WHERE trackingId = ?
        ORDER BY datetime(createdAt) ASC, id ASC
      `
  ).all(trackingId);
}
function getProjectCompletionRequests(trackingId) {
  const db = getDatabase$3();
  ensureProjectRequestTables(db);
  return db.prepare(
    `
        SELECT *
        FROM "ProjectCompletionRequest"
        WHERE trackingId = ?
        ORDER BY datetime(submittedAt) ASC, id ASC
      `
  ).all(trackingId);
}
function getProjectDisputes(trackingId) {
  const db = getDatabase$3();
  ensureProjectRequestTables(db);
  return db.prepare(
    `
        SELECT *
        FROM "ProjectDispute"
        WHERE trackingId = ?
        ORDER BY datetime(createdAt) ASC, id ASC
      `
  ).all(trackingId);
}
function getProjectTransactions(trackingId) {
  const db = getDatabase$3();
  ensureProjectRequestTables(db);
  return db.prepare(
    `
        SELECT *
        FROM "ProjectTransaction"
        WHERE trackingId = ?
        ORDER BY datetime(createdAt) ASC, id ASC
      `
  ).all(trackingId);
}
function saveMilestoneTransaction(db, milestone, timestamp) {
  if (!milestone.amount || milestone.amount <= 0) {
    return;
  }
  db.prepare(
    `
      INSERT OR IGNORE INTO "ProjectTransaction" (
        trackingId,
        milestoneId,
        completionId,
        clientId,
        professionalId,
        amount,
        currency,
        type,
        status,
        description,
        createdAt,
        updatedAt
      )
      VALUES (?, ?, NULL, ?, ?, ?, 'USD', 'MILESTONE_PAYMENT', 'COMPLETED', ?, ?, ?)
    `
  ).run(
    milestone.trackingId,
    milestone.id,
    milestone.clientId,
    milestone.professionalId,
    milestone.amount,
    `Milestone payment - ${milestone.title}`,
    timestamp,
    timestamp
  );
  db.prepare(
    `
      UPDATE "ProjectTransaction"
      SET amount = ?,
        status = 'COMPLETED',
        description = ?,
        updatedAt = ?
      WHERE milestoneId = ?
    `
  ).run(milestone.amount, `Milestone payment - ${milestone.title}`, timestamp, milestone.id);
}
function cancelMilestoneTransaction(db, milestoneId, timestamp) {
  db.prepare(
    `
      UPDATE "ProjectTransaction"
      SET status = 'CANCELLED', updatedAt = ?
      WHERE milestoneId = ? AND status = 'COMPLETED'
    `
  ).run(timestamp, milestoneId);
}
function saveCompletionTransaction(db, completion, timestamp) {
  const tracking = db.prepare(
    `
        SELECT
          ProjectTracking.*,
          ProjectRequest.bidAmount AS bidAmount,
          ClientJob.title AS projectTitle
        FROM "ProjectTracking"
        INNER JOIN "ProjectRequest" ON ProjectRequest.id = ProjectTracking.requestId
        INNER JOIN "ClientJob" ON ClientJob.id = ProjectTracking.jobId
        WHERE ProjectTracking.id = ?
        LIMIT 1
      `
  ).get(completion.trackingId);
  if (!tracking?.bidAmount || tracking.bidAmount <= 0) {
    return;
  }
  const paid = db.prepare(
    `
        SELECT COALESCE(SUM(amount), 0) AS amount
        FROM "ProjectTransaction"
        WHERE trackingId = ? AND status = 'COMPLETED' AND milestoneId IS NOT NULL
      `
  ).get(completion.trackingId);
  const remainingAmount = Math.max(0, Math.round(tracking.bidAmount - paid.amount));
  if (!remainingAmount) {
    return;
  }
  db.prepare(
    `
      INSERT OR IGNORE INTO "ProjectTransaction" (
        trackingId,
        milestoneId,
        completionId,
        clientId,
        professionalId,
        amount,
        currency,
        type,
        status,
        description,
        createdAt,
        updatedAt
      )
      VALUES (?, NULL, ?, ?, ?, ?, 'USD', 'FINAL_PAYMENT', 'COMPLETED', ?, ?, ?)
    `
  ).run(
    completion.trackingId,
    completion.id,
    completion.clientId,
    completion.professionalId,
    remainingAmount,
    `Final payment - ${tracking.projectTitle || "Project"}`,
    timestamp,
    timestamp
  );
  db.prepare(
    `
      UPDATE "ProjectTransaction"
      SET amount = ?,
        status = 'COMPLETED',
        description = ?,
        updatedAt = ?
      WHERE completionId = ?
    `
  ).run(
    remainingAmount,
    `Final payment - ${tracking.projectTitle || "Project"}`,
    timestamp,
    completion.id
  );
}
function backfillProjectTransactions(db) {
  const paidMilestones = db.prepare(
    `
        SELECT *
        FROM "ProjectMilestone"
        WHERE status = 'PAID' AND amount IS NOT NULL AND amount > 0
      `
  ).all();
  for (const milestone of paidMilestones) {
    saveMilestoneTransaction(db, milestone, milestone.updatedAt || (/* @__PURE__ */ new Date()).toISOString());
  }
  const approvedCompletions = db.prepare(
    `
        SELECT *
        FROM "ProjectCompletionRequest"
        WHERE status = 'APPROVED'
      `
  ).all();
  for (const completion of approvedCompletions) {
    saveCompletionTransaction(db, completion, completion.updatedAt || (/* @__PURE__ */ new Date()).toISOString());
  }
}
function withTrackingActivity(tracking) {
  if (!tracking) {
    return void 0;
  }
  return {
    ...tracking,
    workUploads: getProjectWorkUploads(tracking.id),
    revisionRequests: getProjectRevisionRequests(tracking.id),
    milestones: getProjectMilestones(tracking.id),
    completionRequests: getProjectCompletionRequests(tracking.id),
    transactions: getProjectTransactions(tracking.id),
    disputes: getProjectDisputes(tracking.id)
  };
}
function submitProjectCompletion(professionalId, input) {
  const db = getDatabase$3();
  ensureProjectRequestTables(db);
  const tracking = db.prepare(
    `
        SELECT *
        FROM "ProjectTracking"
        WHERE id = ? AND professionalId = ? AND status = 'ACTIVE'
        LIMIT 1
      `
  ).get(input.trackingId, professionalId);
  if (!tracking) {
    throw new Error(
      "Only the assigned professional can submit completion for this active project."
    );
  }
  const milestoneSummary = db.prepare(
    `
        SELECT
          COUNT(*) AS total,
          SUM(CASE WHEN status = 'PAID' THEN 1 ELSE 0 END) AS paid
        FROM "ProjectMilestone"
        WHERE trackingId = ?
      `
  ).get(tracking.id);
  if (Number(milestoneSummary.total || 0) < REQUIRED_PROJECT_MILESTONES || Number(milestoneSummary.paid || 0) < REQUIRED_PROJECT_MILESTONES) {
    throw new Error(
      `Complete all ${REQUIRED_PROJECT_MILESTONES} milestones before final submission.`
    );
  }
  const timestamp = (/* @__PURE__ */ new Date()).toISOString();
  const note = input.note?.trim() || null;
  db.prepare(
    `
      INSERT INTO "ProjectCompletionRequest" (
        trackingId,
        clientId,
        professionalId,
        note,
        status,
        submittedAt,
        updatedAt
      )
      VALUES (?, ?, ?, ?, 'SUBMITTED', ?, ?)
    `
  ).run(tracking.id, tracking.clientId, tracking.professionalId, note, timestamp, timestamp);
  db.prepare(`UPDATE "ProjectTracking" SET updatedAt = ? WHERE id = ?`).run(timestamp, tracking.id);
  return getProjectCompletionRequests(tracking.id);
}
function updateProjectCompletionStatus(clientId, completionId, status) {
  const db = getDatabase$3();
  ensureProjectRequestTables(db);
  if (!["APPROVED", "REVISION_REQUESTED"].includes(status)) {
    throw new Error("Client can only approve or request revision for completion.");
  }
  const completion = db.prepare(
    `
        SELECT *
        FROM "ProjectCompletionRequest"
        WHERE id = ? AND clientId = ?
        LIMIT 1
      `
  ).get(completionId, clientId);
  if (!completion) {
    throw new Error("Only the client can update this completion request.");
  }
  if (status === "APPROVED") {
    const milestoneSummary = db.prepare(
      `
          SELECT
            COUNT(*) AS total,
            SUM(CASE WHEN status = 'PAID' THEN 1 ELSE 0 END) AS paid
          FROM "ProjectMilestone"
          WHERE trackingId = ?
        `
    ).get(completion.trackingId);
    if (Number(milestoneSummary.total || 0) < REQUIRED_PROJECT_MILESTONES || Number(milestoneSummary.paid || 0) < REQUIRED_PROJECT_MILESTONES) {
      throw new Error(
        `Complete all ${REQUIRED_PROJECT_MILESTONES} milestones before approving final submission.`
      );
    }
  }
  const timestamp = (/* @__PURE__ */ new Date()).toISOString();
  db.prepare(
    `
      UPDATE "ProjectCompletionRequest"
      SET status = ?, updatedAt = ?
      WHERE id = ?
    `
  ).run(status, timestamp, completionId);
  if (status === "APPROVED") {
    db.prepare(
      `
        UPDATE "ProjectTracking"
        SET status = 'COMPLETED', updatedAt = ?
        WHERE id = ? AND clientId = ?
      `
    ).run(timestamp, completion.trackingId, clientId);
    db.prepare(
      `
        UPDATE "ClientJob"
        SET status = 'CLOSED', updatedAt = ?
        WHERE id = (
          SELECT jobId
          FROM "ProjectTracking"
          WHERE id = ? AND clientId = ?
          LIMIT 1
        )
      `
    ).run(timestamp, completion.trackingId, clientId);
    saveCompletionTransaction(db, completion, timestamp);
  } else {
    db.prepare(`UPDATE "ProjectTracking" SET updatedAt = ? WHERE id = ?`).run(
      timestamp,
      completion.trackingId
    );
    db.prepare(
      `
        UPDATE "ProjectTransaction"
        SET status = 'CANCELLED', updatedAt = ?
        WHERE completionId = ? AND status = 'COMPLETED'
      `
    ).run(timestamp, completionId);
  }
  return getProjectCompletionRequests(completion.trackingId);
}
function createProjectDispute(reporterId, reporterRole, input) {
  const db = getDatabase$3();
  ensureProjectRequestTables(db);
  if (![
    "PAYMENT",
    "WORK_QUALITY",
    "DEADLINE_DELAY",
    "COMMUNICATION",
    "FILE_PROBLEM",
    "OTHER"
  ].includes(input.issueType)) {
    throw new Error("Choose a valid issue type.");
  }
  if (!["LOW", "MEDIUM", "HIGH"].includes(input.priority)) {
    throw new Error("Choose a valid priority.");
  }
  const message = input.message.trim();
  if (message.length < 10) {
    throw new Error("Add at least 10 characters describing the issue.");
  }
  const tracking = db.prepare(
    `
        SELECT *
        FROM "ProjectTracking"
        WHERE id = ? AND (clientId = ? OR professionalId = ?)
        LIMIT 1
      `
  ).get(input.trackingId, reporterId, reporterId);
  if (!tracking) {
    throw new Error("Only project participants can raise a dispute.");
  }
  const attachments = (input.attachments ?? []).filter((attachment) => attachment.fileName?.trim()).map((attachment) => ({
    fileName: attachment.fileName.trim(),
    fileType: attachment.fileType?.trim() || null,
    fileSize: attachment.fileSize ?? null,
    fileUrl: attachment.fileUrl?.trim() || null
  }));
  const timestamp = (/* @__PURE__ */ new Date()).toISOString();
  const result = db.prepare(
    `
        INSERT INTO "ProjectDispute" (
          trackingId,
          reporterId,
          reporterRole,
          clientId,
          professionalId,
          issueType,
          priority,
          message,
          attachmentsJson,
          status,
          createdAt,
          updatedAt
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'OPEN', ?, ?)
      `
  ).run(
    tracking.id,
    reporterId,
    reporterRole,
    tracking.clientId,
    tracking.professionalId,
    input.issueType,
    input.priority,
    message,
    attachments.length ? JSON.stringify(attachments) : null,
    timestamp,
    timestamp
  );
  db.prepare(`UPDATE "ProjectTracking" SET updatedAt = ? WHERE id = ?`).run(timestamp, tracking.id);
  return db.prepare(`SELECT * FROM "ProjectDispute" WHERE id = ? LIMIT 1`).get(Number(result.lastInsertRowid));
}
function createProjectMilestone(clientId, input) {
  const db = getDatabase$3();
  ensureProjectRequestTables(db);
  const tracking = db.prepare(
    `
        SELECT *
        FROM "ProjectTracking"
        WHERE id = ? AND clientId = ? AND status = 'ACTIVE'
        LIMIT 1
      `
  ).get(input.trackingId, clientId);
  if (!tracking) {
    throw new Error("Only the client can add milestones to this active project.");
  }
  const existingMilestoneCount = db.prepare(
    `
          SELECT COUNT(*) AS count
          FROM "ProjectMilestone"
          WHERE trackingId = ?
        `
  ).get(tracking.id).count;
  if (existingMilestoneCount >= REQUIRED_PROJECT_MILESTONES) {
    throw new Error("This project already has the required 5 milestones.");
  }
  const projectRequest = db.prepare(
    `
        SELECT bidAmount
        FROM "ProjectRequest"
        WHERE id = ?
        LIMIT 1
      `
  ).get(tracking.requestId);
  const milestoneNumber = existingMilestoneCount + 1;
  const requiredAmount = getRequiredMilestoneAmount(
    projectRequest?.bidAmount ?? 0,
    milestoneNumber
  );
  const title = input.title.trim() || `Milestone ${milestoneNumber}/${REQUIRED_PROJECT_MILESTONES}`;
  const description = input.description?.trim() || null;
  const amount = requiredAmount > 0 ? requiredAmount : null;
  const schedule = getProjectSchedule(db, tracking.jobId);
  const dueDate = normalizeScheduleDate(input.dueDate);
  if (title.length < 3) {
    throw new Error("Add a milestone title.");
  }
  if (dueDate && schedule.startAt && compareScheduleDates(dueDate, schedule.startAt) < 0) {
    throw new Error("Milestone due date cannot be before the project start date.");
  }
  if (dueDate && schedule.endAt && compareScheduleDates(dueDate, schedule.endAt) > 0) {
    throw new Error("Milestone due date cannot be after the project deadline.");
  }
  const timestamp = (/* @__PURE__ */ new Date()).toISOString();
  db.prepare(
    `
      INSERT INTO "ProjectMilestone" (
        trackingId,
        clientId,
        professionalId,
        title,
        description,
        amount,
        dueDate,
        status,
        createdAt,
        updatedAt
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, 'PENDING', ?, ?)
    `
  ).run(
    tracking.id,
    tracking.clientId,
    tracking.professionalId,
    title,
    description,
    amount,
    dueDate,
    timestamp,
    timestamp
  );
  db.prepare(`UPDATE "ProjectTracking" SET updatedAt = ? WHERE id = ?`).run(timestamp, tracking.id);
  return getProjectMilestones(tracking.id);
}
function getRequiredMilestoneAmount(totalAmount, milestoneNumber) {
  const normalizedTotal = Math.max(0, Math.round(Number(totalAmount) || 0));
  const baseAmount = Math.floor(normalizedTotal / REQUIRED_PROJECT_MILESTONES);
  const remainder = normalizedTotal - baseAmount * REQUIRED_PROJECT_MILESTONES;
  return baseAmount + (milestoneNumber <= remainder ? 1 : 0);
}
function updateProjectMilestoneStatus(userId, milestoneId, status) {
  const db = getDatabase$3();
  ensureProjectRequestTables(db);
  const milestone = db.prepare(
    `
        SELECT *
        FROM "ProjectMilestone"
        WHERE id = ? AND (clientId = ? OR professionalId = ?)
        LIMIT 1
      `
  ).get(milestoneId, userId, userId);
  if (!milestone) {
    throw new Error("You cannot update this milestone.");
  }
  const tracking = db.prepare(
    `
        SELECT *
        FROM "ProjectTracking"
        WHERE id = ?
        LIMIT 1
      `
  ).get(milestone.trackingId);
  if (!tracking || tracking.status !== "ACTIVE") {
    throw new Error("Milestones can only be updated while the project is active.");
  }
  const clientStatuses = [
    "APPROVED",
    "REVISION_REQUESTED",
    "PAID",
    "PENDING"
  ];
  const professionalStatuses = ["IN_PROGRESS", "SUBMITTED"];
  const isClient = milestone.clientId === userId;
  const allowedStatuses = isClient ? clientStatuses : professionalStatuses;
  if (!allowedStatuses.includes(status)) {
    throw new Error("This milestone status is not available for your role.");
  }
  const timestamp = (/* @__PURE__ */ new Date()).toISOString();
  if (!isClient && compareScheduleDates(tracking.acceptedAt, timestamp) > 0) {
    throw new Error("This project cannot start before the scheduled job date.");
  }
  db.prepare(
    `
      UPDATE "ProjectMilestone"
      SET status = ?, updatedAt = ?
      WHERE id = ?
    `
  ).run(status, timestamp, milestoneId);
  if (status === "PAID") {
    saveMilestoneTransaction(db, milestone, timestamp);
  } else {
    cancelMilestoneTransaction(db, milestone.id, timestamp);
  }
  const milestoneSummary = db.prepare(
    `
        SELECT
          COUNT(*) AS total,
          SUM(CASE WHEN status = 'PAID' THEN 1 ELSE 0 END) AS paid
        FROM "ProjectMilestone"
        WHERE trackingId = ?
      `
  ).get(milestone.trackingId);
  const isProjectComplete = status === "PAID" && Number(milestoneSummary.total || 0) >= REQUIRED_PROJECT_MILESTONES && Number(milestoneSummary.paid || 0) >= REQUIRED_PROJECT_MILESTONES;
  if (isProjectComplete) {
    db.prepare(
      `
        UPDATE "ProjectTracking"
        SET status = 'COMPLETED', updatedAt = ?
        WHERE id = ? AND status = 'ACTIVE'
      `
    ).run(timestamp, milestone.trackingId);
    db.prepare(
      `
        UPDATE "ClientJob"
        SET status = 'CLOSED', updatedAt = ?
        WHERE id = ?
      `
    ).run(timestamp, tracking.jobId);
  } else {
    db.prepare(`UPDATE "ProjectTracking" SET updatedAt = ? WHERE id = ?`).run(
      timestamp,
      milestone.trackingId
    );
  }
  return getProjectMilestones(milestone.trackingId);
}
function deleteProjectMilestone(clientId, milestoneId) {
  const db = getDatabase$3();
  ensureProjectRequestTables(db);
  const milestone = db.prepare(
    `
        SELECT *
        FROM "ProjectMilestone"
        WHERE id = ? AND clientId = ?
        LIMIT 1
      `
  ).get(milestoneId, clientId);
  if (!milestone) {
    throw new Error("Only the client can delete this milestone.");
  }
  if (!["PENDING", "REVISION_REQUESTED"].includes(milestone.status)) {
    throw new Error("Only pending milestones can be deleted.");
  }
  db.prepare(`DELETE FROM "ProjectMilestone" WHERE id = ?`).run(milestoneId);
  return getProjectMilestones(milestone.trackingId);
}
function createProjectWorkUpload(professionalId, input) {
  const db = getDatabase$3();
  ensureProjectRequestTables(db);
  const tracking = db.prepare(
    `
        SELECT *
        FROM "ProjectTracking"
        WHERE id = ? AND professionalId = ? AND status = 'ACTIVE'
        LIMIT 1
      `
  ).get(input.trackingId, professionalId);
  if (!tracking) {
    throw new Error("Only the assigned professional can upload work for this active project.");
  }
  const files = (input.files ?? []).map((file) => ({
    fileName: file.fileName.trim(),
    fileUrl: file.fileUrl?.trim() || null,
    fileDataUrl: file.fileDataUrl?.trim() || null,
    fileType: file.fileType?.trim() || null,
    fileSize: file.fileSize ?? null
  })).filter((file) => file.fileName);
  input.title?.trim() || files[0]?.fileName || input.fileName?.trim() || "Uploaded work";
  const note = input.note?.trim() || "Work file uploaded.";
  if (!files.length && !input.fileName?.trim()) {
    throw new Error("Add at least one file before uploading work.");
  }
  const nextRound = Number(
    db.prepare(
      `
            SELECT COALESCE(MAX(roundNumber), 0) + 1 AS roundNumber
            FROM "ProjectWorkUpload"
            WHERE trackingId = ?
          `
    ).get(input.trackingId).roundNumber
  );
  const timestamp = (/* @__PURE__ */ new Date()).toISOString();
  const insertUpload = db.prepare(
    `
      INSERT INTO "ProjectWorkUpload" (
        trackingId,
        roundNumber,
        title,
        note,
        fileName,
        fileUrl,
        filesJson,
        createdAt
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `
  );
  const filesToSave = files.length ? files : [
    {
      fileName: input.fileName?.trim() || "Uploaded work",
      fileUrl: input.fileUrl?.trim() || null,
      fileDataUrl: null,
      fileType: null,
      fileSize: null
    }
  ];
  filesToSave.forEach((file, index) => {
    insertUpload.run(
      input.trackingId,
      nextRound + index,
      file.fileName,
      note,
      file.fileName,
      file.fileDataUrl || file.fileUrl,
      JSON.stringify([file]),
      timestamp
    );
  });
  db.prepare(
    `
      UPDATE "ProjectTracking"
      SET updatedAt = ?
      WHERE id = ?
    `
  ).run(timestamp, input.trackingId);
  db.prepare(
    `
      UPDATE "ProjectRevisionRequest"
      SET status = 'ADDRESSED', updatedAt = ?
      WHERE trackingId = ? AND status = 'REQUESTED'
    `
  ).run(timestamp, input.trackingId);
  return getProjectWorkUploads(input.trackingId);
}
function createProjectRevisionRequest(clientId, input) {
  const db = getDatabase$3();
  ensureProjectRequestTables(db);
  const tracking = db.prepare(
    `
        SELECT *
        FROM "ProjectTracking"
        WHERE id = ? AND clientId = ? AND status = 'ACTIVE'
        LIMIT 1
      `
  ).get(input.trackingId, clientId);
  if (!tracking) {
    throw new Error("Only the client can request a revision for this active project.");
  }
  const note = input.note.trim();
  if (note.length < 5) {
    throw new Error("Add a short revision note.");
  }
  const timestamp = (/* @__PURE__ */ new Date()).toISOString();
  db.prepare(
    `
      INSERT INTO "ProjectRevisionRequest" (
        trackingId,
        clientId,
        professionalId,
        note,
        status,
        createdAt,
        updatedAt
      )
      VALUES (?, ?, ?, ?, 'REQUESTED', ?, ?)
    `
  ).run(tracking.id, tracking.clientId, tracking.professionalId, note, timestamp, timestamp);
  db.prepare(
    `
      UPDATE "ProjectTracking"
      SET updatedAt = ?
      WHERE id = ?
    `
  ).run(timestamp, tracking.id);
  return getProjectRevisionRequests(tracking.id);
}
function deleteProjectRevisionRequest(clientId, revisionId) {
  const db = getDatabase$3();
  ensureProjectRequestTables(db);
  const revision = db.prepare(
    `
        SELECT *
        FROM "ProjectRevisionRequest"
        WHERE id = ? AND clientId = ?
        LIMIT 1
      `
  ).get(revisionId, clientId);
  if (!revision) {
    throw new Error("Only the client can clear this revision request.");
  }
  db.prepare(`DELETE FROM "ProjectRevisionRequest" WHERE id = ?`).run(revisionId);
  return getProjectRevisionRequests(revision.trackingId);
}
function deleteProjectWorkUpload(professionalId, uploadId) {
  const db = getDatabase$3();
  ensureProjectRequestTables(db);
  const upload = db.prepare(
    `
        SELECT ProjectWorkUpload.*
        FROM "ProjectWorkUpload"
        INNER JOIN "ProjectTracking" ON ProjectTracking.id = ProjectWorkUpload.trackingId
        WHERE ProjectWorkUpload.id = ? AND ProjectTracking.professionalId = ?
        LIMIT 1
      `
  ).get(uploadId, professionalId);
  if (!upload) {
    throw new Error("Only the assigned professional can delete this uploaded work.");
  }
  db.prepare(`DELETE FROM "ProjectWorkUpload" WHERE id = ?`).run(uploadId);
  return getProjectWorkUploads(upload.trackingId);
}
function createProjectRequest(input) {
  const job = getOpenClientJobById(input.jobId);
  if (!job) {
    throw new Error("Project is not available for requests.");
  }
  if (!input.coverLetter.trim()) {
    throw new Error("Cover letter is required.");
  }
  const db = getDatabase$3();
  ensureProjectRequestTables(db);
  const timestamp = (/* @__PURE__ */ new Date()).toISOString();
  const bidAmount = input.bidAmount && input.bidAmount > 0 ? Math.round(input.bidAmount) : null;
  const duration = input.duration.trim() || null;
  const coverLetter = input.coverLetter.trim();
  const attachmentsJson = JSON.stringify(
    (input.attachments ?? []).filter((attachment) => attachment.fileName.trim()).map((attachment) => ({
      fileName: attachment.fileName.trim(),
      fileType: attachment.fileType?.trim() || null,
      fileSize: attachment.fileSize ?? null,
      fileUrl: attachment.fileUrl?.trim() || null
    }))
  );
  const existingPending = db.prepare(
    `
        SELECT *
        FROM "ProjectRequest"
        WHERE jobId = ? AND professionalId = ? AND status = 'PENDING'
        ORDER BY datetime(updatedAt) DESC, id DESC
        LIMIT 1
      `
  ).get(input.jobId, input.professionalId);
  if (existingPending) {
    db.prepare(
      `
        UPDATE "ProjectRequest"
        SET bidAmount = ?,
          duration = ?,
          coverLetter = ?,
          attachmentsJson = ?,
          updatedAt = ?
        WHERE id = ?
      `
    ).run(bidAmount, duration, coverLetter, attachmentsJson, timestamp, existingPending.id);
    return getProjectRequestById(existingPending.id);
  }
  const result = db.prepare(
    `
      INSERT INTO "ProjectRequest" (
        jobId,
        clientId,
        professionalId,
        bidAmount,
        duration,
        coverLetter,
        attachmentsJson,
        status,
        createdAt,
        updatedAt
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, 'PENDING', ?, ?)
    `
  ).run(
    input.jobId,
    job.userId,
    input.professionalId,
    bidAmount,
    duration,
    coverLetter,
    attachmentsJson,
    timestamp,
    timestamp
  );
  return getProjectRequestById(Number(result.lastInsertRowid));
}
function getProjectRequestById(requestId) {
  const db = getDatabase$3();
  ensureProjectRequestTables(db);
  return db.prepare(
    `
        SELECT *
        FROM "ProjectRequest"
        WHERE id = ?
        LIMIT 1
      `
  ).get(requestId);
}
function getClientProjectRequests(clientId) {
  const db = getDatabase$3();
  ensureProjectRequestTables(db);
  return db.prepare(
    `
        SELECT
          ProjectRequest.*,
          ClientJob.title AS projectTitle,
          ClientJob.category AS projectCategory,
          ClientJob.budgetMin AS projectBudgetMin,
          ClientJob.budgetMax AS projectBudgetMax,
          TRIM(User.firstName || ' ' || User.lastName) AS professionalName,
          User.email AS professionalEmail,
          User.avatarUrl AS professionalAvatarUrl,
          User.professionalCategory AS professionalCategory,
          ProjectTracking.id AS trackingId,
          ProjectTracking.status AS trackingStatus,
          ProjectTracking.acceptedAt AS acceptedAt
        FROM "ProjectRequest"
        INNER JOIN "ClientJob" ON ClientJob.id = ProjectRequest.jobId
        INNER JOIN "User" ON User.id = ProjectRequest.professionalId
        LEFT JOIN "ProjectTracking" ON ProjectTracking.requestId = ProjectRequest.id
        WHERE ProjectRequest.clientId = ?
          AND ProjectRequest.status = 'PENDING'
          AND COALESCE(ProjectTracking.status, '') != 'CANCELLED'
        ORDER BY datetime(ProjectRequest.updatedAt) DESC, ProjectRequest.id DESC
      `
  ).all(clientId);
}
function createProfessionalNegotiation(professionalId, input) {
  const db = getDatabase$3();
  ensureProjectRequestTables(db);
  const message = input.message.trim();
  const duration = input.duration.trim() || null;
  const bidAmount = input.bidAmount && input.bidAmount > 0 ? Math.round(input.bidAmount) : null;
  if (!message) {
    throw new Error("Negotiation message is required.");
  }
  const request = db.prepare(
    `
        SELECT *
        FROM "ProjectRequest"
        WHERE id = ? AND professionalId = ? AND status = 'PENDING'
        LIMIT 1
      `
  ).get(input.requestId, professionalId);
  if (!request) {
    throw new Error("Only pending project requests can be negotiated.");
  }
  const timestamp = (/* @__PURE__ */ new Date()).toISOString();
  db.prepare(
    `
      INSERT INTO "ProjectNegotiation" (
        requestId,
        jobId,
        clientId,
        professionalId,
        senderId,
        senderRole,
        previousBidAmount,
        previousDuration,
        previousMessage,
        bidAmount,
        duration,
        message,
        createdAt
      )
      VALUES (?, ?, ?, ?, ?, 'PROFESSIONAL', ?, ?, ?, ?, ?, ?, ?)
    `
  ).run(
    request.id,
    request.jobId,
    request.clientId,
    request.professionalId,
    professionalId,
    request.bidAmount,
    request.duration,
    request.coverLetter,
    bidAmount,
    duration,
    message,
    timestamp
  );
  db.prepare(
    `
      UPDATE "ProjectRequest"
      SET bidAmount = ?,
        duration = ?,
        coverLetter = ?,
        updatedAt = ?
      WHERE id = ?
    `
  ).run(bidAmount, duration, message, timestamp, request.id);
  return getProjectRequestById(request.id);
}
function getProjectNegotiationsForProfessional(professionalId) {
  const db = getDatabase$3();
  ensureProjectRequestTables(db);
  return db.prepare(
    `
        SELECT *
        FROM "ProjectNegotiation"
        WHERE professionalId = ?
        ORDER BY datetime(createdAt) ASC, id ASC
      `
  ).all(professionalId);
}
function getProjectNegotiationsForClient(clientId) {
  const db = getDatabase$3();
  ensureProjectRequestTables(db);
  return db.prepare(
    `
        SELECT *
        FROM "ProjectNegotiation"
        WHERE clientId = ?
        ORDER BY datetime(createdAt) ASC, id ASC
      `
  ).all(clientId);
}
function updateClientProjectRequestStatus(clientId, requestId, status) {
  const db = getDatabase$3();
  ensureProjectRequestTables(db);
  const timestamp = (/* @__PURE__ */ new Date()).toISOString();
  db.prepare(
    `
      UPDATE "ProjectRequest"
      SET status = ?, updatedAt = ?
      WHERE id = ? AND clientId = ?
    `
  ).run(status, timestamp, requestId, clientId);
  if (status === "ACCEPTED") {
    const request = db.prepare(
      `
          SELECT *
          FROM "ProjectRequest"
          WHERE id = ? AND clientId = ?
          LIMIT 1
        `
    ).get(requestId, clientId);
    if (request) {
      const schedule = getProjectSchedule(db, request.jobId);
      const startsAt = schedule.startAt || timestamp;
      db.prepare(
        `
          INSERT INTO "ProjectTracking" (
            requestId,
            jobId,
            clientId,
            professionalId,
            status,
            acceptedAt,
            createdAt,
            updatedAt
          )
          VALUES (?, ?, ?, ?, 'ACTIVE', ?, ?, ?)
          ON CONFLICT(requestId) DO UPDATE SET
            status = 'ACTIVE',
            updatedAt = excluded.updatedAt
        `
      ).run(
        request.id,
        request.jobId,
        request.clientId,
        request.professionalId,
        startsAt,
        timestamp,
        timestamp
      );
      db.prepare(
        `
          UPDATE "ClientJob"
          SET status = 'CLOSED', updatedAt = ?
          WHERE id = ? AND userId = ?
        `
      ).run(timestamp, request.jobId, request.clientId);
      db.prepare(
        `
          UPDATE "ProjectRequest"
          SET status = 'DECLINED', updatedAt = ?
          WHERE jobId = ?
            AND clientId = ?
            AND id != ?
            AND status = 'PENDING'
        `
      ).run(timestamp, request.jobId, request.clientId, request.id);
    }
  } else if (status === "DECLINED") {
    db.prepare(
      `
        UPDATE "ProjectTracking"
        SET status = 'CANCELLED', updatedAt = ?
        WHERE requestId = ? AND clientId = ?
      `
    ).run(timestamp, requestId, clientId);
  }
  return db.prepare(
    `
        SELECT *
        FROM "ProjectRequest"
        WHERE id = ? AND clientId = ?
        LIMIT 1
      `
  ).get(requestId, clientId);
}
function getProfessionalTrackedProjects(professionalId) {
  const db = getDatabase$3();
  ensureProjectRequestTables(db);
  return db.prepare(
    `
        SELECT
          ProjectTracking.*,
          COALESCE(ClientJob.title, ProjectRequest.coverLetter, 'Completed project') AS projectTitle,
          COALESCE(ClientJob.category, 'Project') AS projectCategory,
          COALESCE(ClientJob.deadline, ProjectTracking.updatedAt) AS deadline,
          TRIM(User.firstName || ' ' || User.lastName) AS clientName,
          User.avatarUrl AS clientAvatarUrl,
          ProjectRequest.bidAmount AS bidAmount,
          ProjectRequest.duration AS duration,
          COALESCE(ProjectRequest.coverLetter, '') AS coverLetter,
          ProjectReview.rating AS reviewRating,
          ProjectReview.comment AS reviewComment,
          ProjectReview.professionalResponse AS reviewResponse,
          ProjectReview.professionalResponseAt AS reviewResponseAt,
          ProjectReview.createdAt AS reviewCreatedAt,
          ProjectReviewRequest.createdAt AS reviewRequestedAt,
          ProjectReviewRequest.note AS reviewRequestNote
        FROM "ProjectTracking"
        LEFT JOIN "ClientJob" ON ClientJob.id = ProjectTracking.jobId
        LEFT JOIN "ProjectRequest" ON ProjectRequest.id = ProjectTracking.requestId
        INNER JOIN "User" ON User.id = ProjectTracking.clientId
        LEFT JOIN "ProjectReview" ON ProjectReview.trackingId = ProjectTracking.id
        LEFT JOIN "ProjectReviewRequest" ON ProjectReviewRequest.trackingId = ProjectTracking.id
        WHERE ProjectTracking.professionalId = ?
          AND ProjectTracking.status IN ('ACTIVE', 'COMPLETED')
        ORDER BY datetime(ProjectTracking.acceptedAt) DESC, ProjectTracking.id DESC
      `
  ).all(professionalId);
}
function getClientTrackedProjects(clientId) {
  const db = getDatabase$3();
  ensureProjectRequestTables(db);
  return db.prepare(
    `
        SELECT
          ProjectTracking.*,
          COALESCE(ClientJob.title, ProjectRequest.coverLetter, 'Completed project') AS projectTitle,
          COALESCE(ClientJob.category, 'Project') AS projectCategory,
          COALESCE(ClientJob.deadline, ProjectTracking.updatedAt) AS deadline,
          TRIM(User.firstName || ' ' || User.lastName) AS professionalName,
          User.avatarUrl AS professionalAvatarUrl,
          User.professionalCategory AS professionalCategory,
          ProjectRequest.bidAmount AS bidAmount,
          ProjectRequest.duration AS duration,
          COALESCE(ProjectRequest.coverLetter, '') AS coverLetter,
          ProjectReview.rating AS reviewRating,
          ProjectReview.comment AS reviewComment,
          ProjectReview.professionalResponse AS reviewResponse,
          ProjectReview.professionalResponseAt AS reviewResponseAt,
          ProjectReview.createdAt AS reviewCreatedAt,
          ProjectReviewRequest.createdAt AS reviewRequestedAt,
          ProjectReviewRequest.note AS reviewRequestNote
        FROM "ProjectTracking"
        LEFT JOIN "ClientJob" ON ClientJob.id = ProjectTracking.jobId
        LEFT JOIN "ProjectRequest" ON ProjectRequest.id = ProjectTracking.requestId
        INNER JOIN "User" ON User.id = ProjectTracking.professionalId
        LEFT JOIN "ProjectReview" ON ProjectReview.trackingId = ProjectTracking.id
        LEFT JOIN "ProjectReviewRequest" ON ProjectReviewRequest.trackingId = ProjectTracking.id
        WHERE ProjectTracking.clientId = ?
          AND ProjectTracking.status IN ('ACTIVE', 'COMPLETED')
        ORDER BY
          CASE ProjectTracking.status WHEN 'ACTIVE' THEN 0 ELSE 1 END,
          datetime(ProjectTracking.updatedAt) DESC,
          ProjectTracking.id DESC
      `
  ).all(clientId);
}
function cancelProjectTracking(userId, trackingId) {
  const db = getDatabase$3();
  ensureProjectRequestTables(db);
  const timestamp = (/* @__PURE__ */ new Date()).toISOString();
  const cancelProject = db.transaction(() => {
    const result = db.prepare(
      `
          UPDATE "ProjectTracking"
          SET status = 'CANCELLED', updatedAt = ?
          WHERE id = ?
            AND status = 'ACTIVE'
            AND (clientId = ? OR professionalId = ?)
        `
    ).run(timestamp, trackingId, userId, userId);
    if (!result.changes) {
      throw new Error("Only active projects can be cancelled by project participants.");
    }
    db.prepare(
      `
        UPDATE "ProjectTransaction"
        SET status = 'CANCELLED', updatedAt = ?
        WHERE trackingId = ? AND status = 'COMPLETED'
      `
    ).run(timestamp, trackingId);
  });
  cancelProject();
  return db.prepare(
    `
        SELECT *
        FROM "ProjectTracking"
        WHERE id = ?
        LIMIT 1
      `
  ).get(trackingId);
}
function rateCompletedProject(clientId, input) {
  const db = getDatabase$3();
  ensureProjectRequestTables(db);
  const rating = Math.max(1, Math.min(5, Math.round(input.rating)));
  const comment = input.comment?.trim() || null;
  const tracking = db.prepare(
    `
        SELECT *
        FROM "ProjectTracking"
        WHERE id = ? AND clientId = ? AND status = 'COMPLETED'
        LIMIT 1
      `
  ).get(input.trackingId, clientId);
  if (!tracking) {
    throw new Error("Only completed projects can be rated by the client.");
  }
  const existing = db.prepare(`SELECT * FROM "ProjectReview" WHERE trackingId = ? LIMIT 1`).get(tracking.id);
  const timestamp = (/* @__PURE__ */ new Date()).toISOString();
  if (existing) {
    db.prepare(
      `
        UPDATE "ProjectReview"
        SET rating = ?, comment = ?, updatedAt = ?
        WHERE id = ?
      `
    ).run(rating, comment, timestamp, existing.id);
  } else {
    db.prepare(
      `
        INSERT INTO "ProjectReview" (
          trackingId,
          clientId,
          professionalId,
          rating,
          comment,
          createdAt,
          updatedAt
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `
    ).run(
      tracking.id,
      tracking.clientId,
      tracking.professionalId,
      rating,
      comment,
      timestamp,
      timestamp
    );
  }
  refreshProfessionalRating(db, tracking.professionalId);
  return db.prepare(`SELECT * FROM "ProjectReview" WHERE trackingId = ? LIMIT 1`).get(tracking.id);
}
function respondToProjectReview(professionalId, input) {
  const db = getDatabase$3();
  ensureProjectRequestTables(db);
  const response = input.response.trim();
  if (response.length < 2) {
    throw new Error("Write a short response before saving.");
  }
  if (response.length > 1e3) {
    throw new Error("Review response must be 1000 characters or less.");
  }
  const review = db.prepare(
    `
        SELECT *
        FROM "ProjectReview"
        WHERE trackingId = ? AND professionalId = ?
        LIMIT 1
      `
  ).get(input.trackingId, professionalId);
  if (!review) {
    throw new Error("Only reviewed projects assigned to you can be responded to.");
  }
  const timestamp = (/* @__PURE__ */ new Date()).toISOString();
  db.prepare(
    `
      UPDATE "ProjectReview"
      SET professionalResponse = ?, professionalResponseAt = ?, updatedAt = ?
      WHERE id = ?
    `
  ).run(response, timestamp, timestamp, review.id);
  return db.prepare(`SELECT * FROM "ProjectReview" WHERE id = ? LIMIT 1`).get(review.id);
}
function refreshProfessionalRating(db, professionalId) {
  const summary = db.prepare(
    `
        SELECT COALESCE(AVG(rating), 0) AS averageRating, COUNT(*) AS reviewCount
        FROM "ProjectReview"
        WHERE professionalId = ?
      `
  ).get(professionalId);
  db.prepare(
    `
      UPDATE "User"
      SET averageRating = ?, reviewCount = ?, updatedAt = ?
      WHERE id = ?
    `
  ).run(
    Number(summary.averageRating || 0),
    Number(summary.reviewCount || 0),
    (/* @__PURE__ */ new Date()).toISOString(),
    professionalId
  );
}
function getProfessionalTransactions(professionalId) {
  const db = getDatabase$3();
  ensureProjectRequestTables(db);
  return db.prepare(
    `
        SELECT
          ProjectTransaction.*,
          COALESCE(ClientJob.title, ProjectTransaction.description, 'Project payment') AS projectTitle,
          COALESCE(ClientJob.category, 'Project') AS projectCategory
        FROM "ProjectTransaction"
        LEFT JOIN "ProjectTracking" ON ProjectTracking.id = ProjectTransaction.trackingId
        LEFT JOIN "ClientJob" ON ClientJob.id = ProjectTracking.jobId
        WHERE ProjectTransaction.professionalId = ?
          AND ProjectTransaction.status = 'COMPLETED'
          AND COALESCE(ProjectTracking.status, '') != 'CANCELLED'
        ORDER BY datetime(ProjectTransaction.createdAt) DESC, ProjectTransaction.id DESC
      `
  ).all(professionalId);
}
function getUserProjectTransactions(userId) {
  const db = getDatabase$3();
  ensureProjectRequestTables(db);
  return db.prepare(
    `
        SELECT
          ProjectTransaction.*,
          COALESCE(ClientJob.title, ProjectTransaction.description, 'Project payment') AS projectTitle,
          COALESCE(ClientJob.category, 'Project') AS projectCategory
        FROM "ProjectTransaction"
        LEFT JOIN "ProjectTracking" ON ProjectTracking.id = ProjectTransaction.trackingId
        LEFT JOIN "ClientJob" ON ClientJob.id = ProjectTracking.jobId
        WHERE (ProjectTransaction.clientId = ? OR ProjectTransaction.professionalId = ?)
          AND ProjectTransaction.status = 'COMPLETED'
          AND COALESCE(ProjectTracking.status, '') != 'CANCELLED'
        ORDER BY datetime(ProjectTransaction.createdAt) DESC, ProjectTransaction.id DESC
      `
  ).all(userId, userId);
}
function getProfessionalWithdrawals(professionalId) {
  const db = getDatabase$3();
  ensureProjectRequestTables(db);
  return db.prepare(
    `
        SELECT *
        FROM "ProjectWithdrawal"
        WHERE professionalId = ?
        ORDER BY datetime(createdAt) DESC, id DESC
      `
  ).all(professionalId);
}
function getProfessionalAvailableWithdrawalBalance(professionalId) {
  const transactions = getProfessionalTransactions(professionalId);
  const withdrawals = getProfessionalWithdrawals(professionalId);
  const earned = transactions.reduce(
    (total, transaction) => total + Math.round(transaction.amount * 0.9),
    0
  );
  const alreadyRequested = withdrawals.filter((withdrawal) => withdrawal.status !== "REJECTED").reduce((total, withdrawal) => total + withdrawal.amount, 0);
  return Math.max(0, earned - alreadyRequested);
}
function createProfessionalWithdrawalRequest(professionalId, input) {
  const amount = Math.round(Number(input.amount));
  const destinationLabel = input.destinationLabel.trim();
  const note = input.note?.trim() || null;
  if (!Number.isFinite(amount) || amount <= 0) {
    throw new Error("Enter a withdrawal amount greater than zero.");
  }
  if (!destinationLabel) {
    throw new Error("Add bank, UPI, or wallet details for this withdrawal.");
  }
  if (!["BANK", "UPI", "WALLET"].includes(input.destinationType)) {
    throw new Error("Select a valid withdrawal method.");
  }
  const availableBalance = getProfessionalAvailableWithdrawalBalance(professionalId);
  if (amount > availableBalance) {
    throw new Error("Withdrawal amount cannot be more than your available balance.");
  }
  const db = getDatabase$3();
  ensureProjectRequestTables(db);
  const timestamp = (/* @__PURE__ */ new Date()).toISOString();
  const result = db.prepare(
    `
        INSERT INTO "ProjectWithdrawal" (
          professionalId,
          amount,
          currency,
          destinationType,
          destinationLabel,
          status,
          note,
          createdAt,
          updatedAt
        )
        VALUES (?, ?, 'USD', ?, ?, 'PENDING', ?, ?, ?)
      `
  ).run(
    professionalId,
    amount,
    input.destinationType,
    destinationLabel,
    note,
    timestamp,
    timestamp
  );
  return db.prepare(`SELECT * FROM "ProjectWithdrawal" WHERE id = ? LIMIT 1`).get(result.lastInsertRowid);
}
function getProfessionalProjectRequests(professionalId) {
  const db = getDatabase$3();
  ensureProjectRequestTables(db);
  return db.prepare(
    `
        SELECT
          ProjectRequest.*,
          ClientJob.title AS projectTitle,
          ClientJob.category AS projectCategory,
          ClientJob.deadline AS deadline,
          TRIM(User.firstName || ' ' || User.lastName) AS clientName,
          User.avatarUrl AS clientAvatarUrl,
          ProjectTracking.id AS trackingId,
          ProjectTracking.status AS trackingStatus,
          ProjectTracking.acceptedAt AS acceptedAt,
          ProjectReview.rating AS reviewRating,
          ProjectReview.comment AS reviewComment,
          ProjectReview.professionalResponse AS reviewResponse,
          ProjectReview.professionalResponseAt AS reviewResponseAt,
          ProjectReview.createdAt AS reviewCreatedAt,
          ProjectReviewRequest.createdAt AS reviewRequestedAt,
          ProjectReviewRequest.note AS reviewRequestNote
        FROM "ProjectRequest"
        INNER JOIN "ClientJob" ON ClientJob.id = ProjectRequest.jobId
        INNER JOIN "User" ON User.id = ProjectRequest.clientId
        LEFT JOIN "ProjectTracking" ON ProjectTracking.requestId = ProjectRequest.id
        LEFT JOIN "ProjectReview" ON ProjectReview.trackingId = ProjectTracking.id
        LEFT JOIN "ProjectReviewRequest" ON ProjectReviewRequest.trackingId = ProjectTracking.id
        LEFT JOIN contracts ON contracts.tracking_id = ProjectTracking.id
        WHERE ProjectRequest.professionalId = ?
          AND COALESCE(ProjectTracking.status, '') != 'CANCELLED'
          AND contracts.id IS NULL
          AND NOT (
            ProjectRequest.status = 'ACCEPTED'
            AND ProjectTracking.status IN ('ACTIVE', 'COMPLETED')
          )
          AND NOT (
            ProjectRequest.status = 'DECLINED'
            AND COALESCE(julianday(ProjectRequest.updatedAt), julianday(ProjectRequest.createdAt)) <= julianday('now', '-24 hours')
          )
        ORDER BY datetime(ProjectRequest.updatedAt) DESC, ProjectRequest.id DESC
      `
  ).all(professionalId);
}
function getProjectTrackingDetails(userId, trackingId) {
  const db = getDatabase$3();
  ensureProjectRequestTables(db);
  const tracking = db.prepare(
    `
        SELECT
          ProjectTracking.*,
          COALESCE(ClientJob.title, ProjectRequest.coverLetter, 'Completed project') AS projectTitle,
          COALESCE(ClientJob.category, 'Project') AS projectCategory,
          COALESCE(ClientJob.description, '') AS projectDescription,
          ClientJob.budgetMin AS projectBudgetMin,
          ClientJob.budgetMax AS projectBudgetMax,
          ClientJob.timingType AS projectTimingType,
          COALESCE(ClientJob.urgency, 'MEDIUM') AS projectUrgency,
          ClientJob.jobDate AS projectJobDate,
          COALESCE(ClientJob.deadline, ProjectTracking.updatedAt) AS projectDeadline,
          COALESCE(ClientJob.workMode, 'REMOTE') AS projectWorkMode,
          ClientJob.locationLabel AS projectLocationLabel,
          ClientJob.locationAddress AS projectLocationAddress,
          TRIM(ClientUser.firstName || ' ' || ClientUser.lastName) AS clientName,
          ClientUser.avatarUrl AS clientAvatarUrl,
          TRIM(ProUser.firstName || ' ' || ProUser.lastName) AS professionalName,
          ProUser.avatarUrl AS professionalAvatarUrl,
          ProUser.professionalCategory AS professionalCategory,
          ProUser.email AS professionalEmail,
          ProjectRequest.bidAmount AS bidAmount,
          ProjectRequest.duration AS duration,
          COALESCE(ProjectRequest.coverLetter, '') AS coverLetter,
          ProjectRequest.attachmentsJson AS attachmentsJson,
          COALESCE(ProjectRequest.status, 'ACCEPTED') AS requestStatus,
          COALESCE(ProjectRequest.createdAt, ProjectTracking.createdAt) AS requestCreatedAt,
          COALESCE(ProjectRequest.updatedAt, ProjectTracking.updatedAt) AS requestUpdatedAt,
          ProjectReview.rating AS reviewRating,
          ProjectReview.comment AS reviewComment,
          ProjectReview.professionalResponse AS reviewResponse,
          ProjectReview.professionalResponseAt AS reviewResponseAt,
          ProjectReview.createdAt AS reviewCreatedAt,
          ProjectReviewRequest.createdAt AS reviewRequestedAt,
          ProjectReviewRequest.note AS reviewRequestNote
        FROM "ProjectTracking"
        LEFT JOIN "ClientJob" ON ClientJob.id = ProjectTracking.jobId
        LEFT JOIN "ProjectRequest" ON ProjectRequest.id = ProjectTracking.requestId
        INNER JOIN "User" ClientUser ON ClientUser.id = ProjectTracking.clientId
        INNER JOIN "User" ProUser ON ProUser.id = ProjectTracking.professionalId
        LEFT JOIN "ProjectReview" ON ProjectReview.trackingId = ProjectTracking.id
        LEFT JOIN "ProjectReviewRequest" ON ProjectReviewRequest.trackingId = ProjectTracking.id
        WHERE ProjectTracking.id = ?
          AND ProjectTracking.status != 'CANCELLED'
          AND (ProjectTracking.clientId = ? OR ProjectTracking.professionalId = ?)
        LIMIT 1
      `
  ).get(trackingId, userId, userId);
  return withTrackingActivity(tracking);
}
function getOrCreateProjectTrackingDetails(userId, trackingKey) {
  const existing = getProjectTrackingDetails(userId, trackingKey) ?? getProjectTrackingDetailsByJob(userId, trackingKey);
  if (existing) {
    return existing;
  }
  const db = getDatabase$3();
  ensureProjectRequestTables(db);
  const request = db.prepare(
    `
        SELECT *
        FROM "ProjectRequest"
        WHERE status = 'ACCEPTED'
          AND (id = ? OR jobId = ?)
          AND (clientId = ? OR professionalId = ?)
        ORDER BY datetime(updatedAt) DESC, id DESC
        LIMIT 1
      `
  ).get(trackingKey, trackingKey, userId, userId);
  if (!request) {
    return null;
  }
  const timestamp = request.updatedAt || (/* @__PURE__ */ new Date()).toISOString();
  const schedule = getProjectSchedule(db, request.jobId);
  const startsAt = schedule.startAt || timestamp;
  db.prepare(
    `
      INSERT INTO "ProjectTracking" (
        requestId,
        jobId,
        clientId,
        professionalId,
        status,
        acceptedAt,
        createdAt,
        updatedAt
      )
      VALUES (?, ?, ?, ?, 'ACTIVE', ?, ?, ?)
      ON CONFLICT(requestId) DO UPDATE SET
        status = 'ACTIVE',
        updatedAt = excluded.updatedAt
    `
  ).run(
    request.id,
    request.jobId,
    request.clientId,
    request.professionalId,
    startsAt,
    timestamp,
    timestamp
  );
  return getProjectTrackingDetailsByJob(userId, request.jobId) ?? getProjectTrackingDetails(userId, trackingKey) ?? null;
}
function getProjectSchedule(db, jobId) {
  const row = db.prepare(
    `
        SELECT jobDate, deadline
        FROM "ClientJob"
        WHERE id = ?
        LIMIT 1
      `
  ).get(jobId);
  return {
    startAt: normalizeScheduleDate(row?.jobDate) || null,
    endAt: normalizeScheduleDate(row?.deadline) || null
  };
}
function normalizeScheduleDate(value) {
  const trimmed = value?.trim();
  if (!trimmed) {
    return null;
  }
  const dateOnly = trimmed.match(/^\d{4}-\d{2}-\d{2}/)?.[0];
  if (!dateOnly) {
    const parsed = new Date(trimmed);
    if (Number.isNaN(parsed.getTime())) {
      return null;
    }
    return new Date(
      Date.UTC(parsed.getUTCFullYear(), parsed.getUTCMonth(), parsed.getUTCDate())
    ).toISOString();
  }
  return (/* @__PURE__ */ new Date(`${dateOnly}T00:00:00.000Z`)).toISOString();
}
function compareScheduleDates(a, b) {
  return new Date(a).getTime() - new Date(b).getTime();
}
function getProjectTrackingDetailsByJob(userId, jobId) {
  const db = getDatabase$3();
  ensureProjectRequestTables(db);
  const tracking = db.prepare(
    `
        SELECT
          ProjectTracking.*,
          COALESCE(ClientJob.title, ProjectRequest.coverLetter, 'Completed project') AS projectTitle,
          COALESCE(ClientJob.category, 'Project') AS projectCategory,
          COALESCE(ClientJob.description, '') AS projectDescription,
          ClientJob.budgetMin AS projectBudgetMin,
          ClientJob.budgetMax AS projectBudgetMax,
          ClientJob.timingType AS projectTimingType,
          COALESCE(ClientJob.urgency, 'MEDIUM') AS projectUrgency,
          ClientJob.jobDate AS projectJobDate,
          COALESCE(ClientJob.deadline, ProjectTracking.updatedAt) AS projectDeadline,
          COALESCE(ClientJob.workMode, 'REMOTE') AS projectWorkMode,
          ClientJob.locationLabel AS projectLocationLabel,
          ClientJob.locationAddress AS projectLocationAddress,
          TRIM(ClientUser.firstName || ' ' || ClientUser.lastName) AS clientName,
          ClientUser.avatarUrl AS clientAvatarUrl,
          TRIM(ProUser.firstName || ' ' || ProUser.lastName) AS professionalName,
          ProUser.avatarUrl AS professionalAvatarUrl,
          ProUser.professionalCategory AS professionalCategory,
          ProUser.email AS professionalEmail,
          ProjectRequest.bidAmount AS bidAmount,
          ProjectRequest.duration AS duration,
          COALESCE(ProjectRequest.coverLetter, '') AS coverLetter,
          ProjectRequest.attachmentsJson AS attachmentsJson,
          COALESCE(ProjectRequest.status, 'ACCEPTED') AS requestStatus,
          COALESCE(ProjectRequest.createdAt, ProjectTracking.createdAt) AS requestCreatedAt,
          COALESCE(ProjectRequest.updatedAt, ProjectTracking.updatedAt) AS requestUpdatedAt,
          ProjectReview.rating AS reviewRating,
          ProjectReview.comment AS reviewComment,
          ProjectReview.professionalResponse AS reviewResponse,
          ProjectReview.professionalResponseAt AS reviewResponseAt,
          ProjectReview.createdAt AS reviewCreatedAt,
          ProjectReviewRequest.createdAt AS reviewRequestedAt,
          ProjectReviewRequest.note AS reviewRequestNote
        FROM "ProjectTracking"
        LEFT JOIN "ClientJob" ON ClientJob.id = ProjectTracking.jobId
        LEFT JOIN "ProjectRequest" ON ProjectRequest.id = ProjectTracking.requestId
        INNER JOIN "User" ClientUser ON ClientUser.id = ProjectTracking.clientId
        INNER JOIN "User" ProUser ON ProUser.id = ProjectTracking.professionalId
        LEFT JOIN "ProjectReview" ON ProjectReview.trackingId = ProjectTracking.id
        LEFT JOIN "ProjectReviewRequest" ON ProjectReviewRequest.trackingId = ProjectTracking.id
        WHERE ProjectTracking.jobId = ?
          AND ProjectTracking.status = 'ACTIVE'
          AND (ProjectTracking.clientId = ? OR ProjectTracking.professionalId = ?)
        ORDER BY datetime(ProjectTracking.acceptedAt) DESC, ProjectTracking.id DESC
        LIMIT 1
      `
  ).get(jobId, userId, userId);
  return withTrackingActivity(tracking);
}
const globalForHireDb = globalThis;
function getDatabase$2() {
  if (!globalForHireDb.hireDb) {
    const databasePath = path__default.resolve(process.cwd(), "prisma", "app.db");
    globalForHireDb.hireDb = new Database(databasePath);
    ensureHireTables(globalForHireDb.hireDb);
  }
  return globalForHireDb.hireDb;
}
function ensureHireTables(db) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS "jobs" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "client_id" TEXT NOT NULL,
      "category_id" INTEGER,
      "title" TEXT NOT NULL,
      "description" TEXT,
      "budget_min" REAL,
      "budget_max" REAL,
      "currency" TEXT NOT NULL DEFAULT 'INR',
      "job_type" TEXT,
      "lat" REAL,
      "lng" REAL,
      "city" TEXT,
      "job_date" TEXT,
      "deadline" TEXT,
      "urgency" TEXT,
      "status" TEXT NOT NULL DEFAULT 'draft',
      "created_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS "job_attachments" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "job_id" TEXT NOT NULL,
      "file_url" TEXT,
      "file_type" TEXT,
      "uploaded_by" TEXT
    );

    CREATE TABLE IF NOT EXISTS "contracts" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "job_id" TEXT NOT NULL,
      "client_id" TEXT NOT NULL,
      "professional_id" TEXT NOT NULL,
      "proposal_id" TEXT,
      "client_project_id" INTEGER,
      "tracking_id" INTEGER,
      "total_amount" REAL,
      "platform_fee" REAL,
      "status" TEXT NOT NULL DEFAULT 'pending',
      "start_date" TEXT,
      "end_date" TEXT,
      "updated_at" TEXT
    );

    CREATE TABLE IF NOT EXISTS "milestones" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "contract_id" TEXT NOT NULL,
      "title" TEXT,
      "amount" REAL,
      "due_date" TEXT,
      "status" TEXT NOT NULL DEFAULT 'pending',
      "completed_proof" TEXT
    );

    CREATE TABLE IF NOT EXISTS "SocketConversation" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "userAId" INTEGER NOT NULL,
      "userBId" INTEGER NOT NULL,
      "userAName" TEXT NOT NULL,
      "userBName" TEXT NOT NULL,
      "userAAvatarUrl" TEXT,
      "userBAvatarUrl" TEXT,
      "job" TEXT NOT NULL DEFAULT 'Direct message',
      "createdAt" TEXT NOT NULL,
      "updatedAt" TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "SocketMessage" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "conversationId" TEXT NOT NULL,
      "senderId" INTEGER NOT NULL,
      "receiverId" INTEGER NOT NULL,
      "body" TEXT NOT NULL,
      "kind" TEXT NOT NULL DEFAULT 'text',
      "createdAt" TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "ClientJob" (
      "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      "userId" INTEGER NOT NULL,
      "category" TEXT NOT NULL,
      "title" TEXT NOT NULL,
      "description" TEXT NOT NULL,
      "budgetMin" INTEGER,
      "budgetMax" INTEGER,
      "urgency" TEXT NOT NULL DEFAULT 'MEDIUM',
      "jobDate" TEXT,
      "deadline" TEXT NOT NULL,
      "workMode" TEXT NOT NULL DEFAULT 'BOTH',
      "locationLabel" TEXT,
      "locationAddress" TEXT,
      "locationLat" REAL,
      "locationLng" REAL,
      "status" TEXT NOT NULL DEFAULT 'OPEN',
      "createdAt" TEXT NOT NULL,
      "updatedAt" TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "ProjectRequest" (
      "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      "jobId" INTEGER NOT NULL,
      "clientId" INTEGER NOT NULL,
      "professionalId" INTEGER NOT NULL,
      "bidAmount" INTEGER,
      "duration" TEXT,
      "coverLetter" TEXT NOT NULL,
      "attachmentsJson" TEXT,
      "status" TEXT NOT NULL DEFAULT 'PENDING',
      "createdAt" TEXT NOT NULL,
      "updatedAt" TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "ProjectTracking" (
      "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      "requestId" INTEGER NOT NULL,
      "jobId" INTEGER NOT NULL,
      "clientId" INTEGER NOT NULL,
      "professionalId" INTEGER NOT NULL,
      "status" TEXT NOT NULL DEFAULT 'ACTIVE',
      "acceptedAt" TEXT NOT NULL,
      "createdAt" TEXT NOT NULL,
      "updatedAt" TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "DirectHireNegotiation" (
      "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      "contractId" TEXT NOT NULL,
      "jobId" TEXT NOT NULL,
      "clientId" TEXT NOT NULL,
      "professionalId" TEXT NOT NULL,
      "senderId" TEXT NOT NULL,
      "senderRole" TEXT NOT NULL,
      "bidAmount" REAL,
      "duration" TEXT,
      "message" TEXT NOT NULL,
      "createdAt" TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS "DirectHireNegotiation_contractId_idx" ON "DirectHireNegotiation"("contractId");
    CREATE INDEX IF NOT EXISTS "DirectHireNegotiation_professionalId_idx" ON "DirectHireNegotiation"("professionalId");
  `);
  const contractColumns = new Set(
    db.prepare(`PRAGMA table_info("contracts")`).all().map((column) => column.name)
  );
  if (!contractColumns.has("updated_at")) {
    db.exec(`ALTER TABLE "contracts" ADD COLUMN "updated_at" TEXT`);
  }
  if (!contractColumns.has("client_project_id")) {
    db.exec(`ALTER TABLE "contracts" ADD COLUMN "client_project_id" INTEGER`);
  }
  if (!contractColumns.has("tracking_id")) {
    db.exec(`ALTER TABLE "contracts" ADD COLUMN "tracking_id" INTEGER`);
  }
}
function normalizeDate(value) {
  return value.trim() || null;
}
function createHireContract(clientId, input) {
  if (!input.acceptedTerms) {
    throw new Error("Please accept the terms and conditions.");
  }
  if (!input.contractTitle.trim()) {
    throw new Error("Contract title is required.");
  }
  if (!input.workDescription.trim()) {
    throw new Error("Work description is required.");
  }
  const db = getDatabase$2();
  const timestamp = (/* @__PURE__ */ new Date()).toISOString();
  const jobId = randomUUID();
  const contractId = randomUUID();
  const totalAmount = input.paymentOption === "fixed" ? input.fixedPrice : null;
  const platformFee = totalAmount != null ? Number((totalAmount * 0.1).toFixed(2)) : null;
  const clientProjectId = input.clientProjectId ?? null;
  if (clientProjectId != null) {
    const project = db.prepare(
      `
          SELECT id
          FROM "ClientJob"
          WHERE id = ? AND userId = ?
          LIMIT 1
        `
    ).get(clientProjectId, clientId);
    if (!project) {
      throw new Error("Selected project was not found.");
    }
  }
  const createRecord = db.transaction(() => {
    db.prepare(
      `
        INSERT INTO "jobs" (
          id,
          client_id,
          title,
          description,
          budget_min,
          budget_max,
          currency,
          job_type,
          city,
          job_date,
          deadline,
          urgency,
          status,
          created_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `
    ).run(
      jobId,
      String(clientId),
      input.contractTitle.trim(),
      input.workDescription.trim(),
      input.paymentOption === "hourly" ? input.hourlyRate : input.fixedPrice,
      input.paymentOption === "hourly" ? input.hourlyRate : input.fixedPrice,
      "INR",
      input.workMode,
      input.location.trim() || null,
      normalizeDate(input.jobDate),
      normalizeDate(input.deadline),
      "medium",
      "draft",
      timestamp
    );
    const insertAttachment = db.prepare(
      `
        INSERT INTO "job_attachments" (
          id,
          job_id,
          file_url,
          file_type,
          uploaded_by
        )
        VALUES (?, ?, ?, ?, ?)
      `
    );
    for (const attachment of input.attachments) {
      insertAttachment.run(
        randomUUID(),
        jobId,
        attachment.fileUrl?.trim() || attachment.fileName.trim(),
        attachment.fileType?.trim() || "document",
        String(clientId)
      );
    }
    db.prepare(
      `
        INSERT INTO "contracts" (
          id,
          job_id,
          client_id,
          professional_id,
          client_project_id,
          total_amount,
          platform_fee,
          status,
          start_date,
          end_date,
          updated_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `
    ).run(
      contractId,
      jobId,
      String(clientId),
      String(input.professionalId),
      clientProjectId,
      totalAmount,
      platformFee,
      "pending",
      normalizeDate(input.jobDate),
      normalizeDate(input.deadline),
      timestamp
    );
    const insertMilestone = db.prepare(
      `
        INSERT INTO "milestones" (
          id,
          contract_id,
          title,
          amount,
          due_date,
          status,
          completed_proof
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `
    );
    const milestones = input.paymentSchedule === "milestones" ? input.milestones.filter((milestone) => milestone.title.trim()) : [{ title: "Whole contract", amount: totalAmount }];
    for (const milestone of milestones) {
      insertMilestone.run(
        randomUUID(),
        contractId,
        milestone.title.trim(),
        milestone.amount,
        normalizeDate(input.deadline),
        "pending",
        null
      );
    }
  });
  createRecord();
  return {
    jobId,
    contractId
  };
}
function getProfessionalHireRequests(professionalId) {
  const db = getDatabase$2();
  return db.prepare(
    `
        SELECT
          contracts.id AS contractId,
          contracts.job_id AS jobId,
          contracts.client_project_id AS clientProjectId,
          contracts.tracking_id AS trackingId,
          contracts.client_id AS clientId,
          contracts.professional_id AS professionalId,
          contracts.total_amount AS totalAmount,
          contracts.platform_fee AS platformFee,
          contracts.status AS status,
          contracts.start_date AS startDate,
          contracts.end_date AS endDate,
          contracts.updated_at AS updatedAt,
          jobs.title AS title,
          jobs.description AS description,
          jobs.budget_min AS budgetMin,
          jobs.budget_max AS budgetMax,
          jobs.job_type AS workMode,
          jobs.city AS location,
          jobs.job_date AS jobDate,
          jobs.deadline AS deadline,
          jobs.created_at AS createdAt,
          TRIM(User.firstName || ' ' || User.lastName) AS clientName,
          CASE WHEN User.avatarUrl LIKE 'data:%' THEN NULL ELSE User.avatarUrl END AS clientAvatarUrl,
          (
            SELECT json_group_array(json_object(
              'fileUrl', job_attachments.file_url,
              'fileType', job_attachments.file_type
            ))
            FROM job_attachments
            WHERE job_attachments.job_id = contracts.job_id
          ) AS attachmentsJson,
          (
            SELECT json_group_array(json_object(
              'title', milestones.title,
              'amount', milestones.amount,
              'dueDate', milestones.due_date,
              'status', milestones.status
            ))
            FROM milestones
            WHERE milestones.contract_id = contracts.id
          ) AS milestonesJson
        FROM contracts
        INNER JOIN jobs ON jobs.id = contracts.job_id
        LEFT JOIN "User" ON User.id = CAST(contracts.client_id AS INTEGER)
        WHERE contracts.professional_id = ?
          AND NOT (
            contracts.status = 'rejected'
            AND COALESCE(julianday(contracts.updated_at), julianday(jobs.created_at)) <= julianday('now', '-1 minute')
          )
        ORDER BY datetime(jobs.created_at) DESC, contracts.id DESC
      `
  ).all(String(professionalId));
}
function getClientHireRequests(clientId) {
  const db = getDatabase$2();
  return db.prepare(
    `
        SELECT
          contracts.id AS contractId,
          contracts.job_id AS jobId,
          contracts.client_project_id AS clientProjectId,
          contracts.tracking_id AS trackingId,
          contracts.client_id AS clientId,
          contracts.professional_id AS professionalId,
          contracts.total_amount AS totalAmount,
          contracts.platform_fee AS platformFee,
          contracts.status AS status,
          contracts.start_date AS startDate,
          contracts.end_date AS endDate,
          contracts.updated_at AS updatedAt,
          jobs.title AS title,
          jobs.description AS description,
          jobs.budget_min AS budgetMin,
          jobs.budget_max AS budgetMax,
          jobs.job_type AS workMode,
          jobs.city AS location,
          jobs.job_date AS jobDate,
          jobs.deadline AS deadline,
          jobs.created_at AS createdAt,
          TRIM(ClientUser.firstName || ' ' || ClientUser.lastName) AS clientName,
          CASE WHEN ClientUser.avatarUrl LIKE 'data:%' THEN NULL ELSE ClientUser.avatarUrl END AS clientAvatarUrl,
          TRIM(ProUser.firstName || ' ' || ProUser.lastName) AS professionalName,
          CASE WHEN ProUser.avatarUrl LIKE 'data:%' THEN NULL ELSE ProUser.avatarUrl END AS professionalAvatarUrl,
          ProUser.professionalCategory AS professionalCategory,
          (
            SELECT json_group_array(json_object(
              'fileUrl', job_attachments.file_url,
              'fileType', job_attachments.file_type
            ))
            FROM job_attachments
            WHERE job_attachments.job_id = contracts.job_id
          ) AS attachmentsJson,
          (
            SELECT json_group_array(json_object(
              'title', milestones.title,
              'amount', milestones.amount,
              'dueDate', milestones.due_date,
              'status', milestones.status
            ))
            FROM milestones
            WHERE milestones.contract_id = contracts.id
          ) AS milestonesJson
        FROM contracts
        INNER JOIN jobs ON jobs.id = contracts.job_id
        LEFT JOIN "User" ClientUser ON ClientUser.id = CAST(contracts.client_id AS INTEGER)
        LEFT JOIN "User" ProUser ON ProUser.id = CAST(contracts.professional_id AS INTEGER)
        WHERE contracts.client_id = ?
          AND NOT (
            contracts.status = 'rejected'
            AND COALESCE(julianday(contracts.updated_at), julianday(jobs.created_at)) <= julianday('now', '-1 minute')
          )
        ORDER BY datetime(COALESCE(contracts.updated_at, jobs.created_at)) DESC, contracts.id DESC
      `
  ).all(String(clientId));
}
function updateProfessionalHireContractStatus(professionalId, contractId, status) {
  if (!["accepted", "rejected"].includes(status)) {
    throw new Error("Hire request status is not available.");
  }
  const db = getDatabase$2();
  const timestamp = (/* @__PURE__ */ new Date()).toISOString();
  const result = db.prepare(
    `
        UPDATE contracts
        SET status = ?, updated_at = ?
        WHERE id = ? AND professional_id = ? AND status = 'pending'
      `
  ).run(status, timestamp, contractId, String(professionalId));
  if (!result.changes) {
    throw new Error("Only pending hire requests can be updated.");
  }
  if (status === "accepted") {
    const contract = db.prepare(
      `
          SELECT client_id AS clientId, client_project_id AS clientProjectId
          FROM contracts
          WHERE id = ? AND professional_id = ?
          LIMIT 1
        `
    ).get(contractId, String(professionalId));
    if (contract?.clientProjectId) {
      db.prepare(
        `
          UPDATE "ClientJob"
          SET status = 'CLOSED', updatedAt = ?
          WHERE id = ? AND userId = ?
        `
      ).run(timestamp, contract.clientProjectId, Number(contract.clientId));
      db.prepare(
        `
          UPDATE "ProjectRequest"
          SET status = 'DECLINED', updatedAt = ?
          WHERE jobId = ?
            AND clientId = ?
            AND status = 'PENDING'
        `
      ).run(timestamp, contract.clientProjectId, Number(contract.clientId));
    }
  }
  return db.prepare(
    `
        SELECT *
        FROM contracts
        WHERE id = ? AND professional_id = ?
        LIMIT 1
      `
  ).get(contractId, String(professionalId));
}
function createProfessionalHireNegotiation(professionalId, input) {
  const db = getDatabase$2();
  const message = input.message.trim();
  const duration = input.duration.trim() || null;
  const bidAmount = input.bidAmount && input.bidAmount > 0 ? Math.round(input.bidAmount) : null;
  const timestamp = (/* @__PURE__ */ new Date()).toISOString();
  if (!message) {
    throw new Error("Negotiation message is required.");
  }
  const contract = db.prepare(
    `
        SELECT
          contracts.id AS contractId,
          contracts.job_id AS jobId,
          contracts.client_id AS clientId,
          contracts.professional_id AS professionalId
        FROM contracts
        WHERE contracts.id = ?
          AND contracts.professional_id = ?
          AND contracts.status = 'pending'
        LIMIT 1
      `
  ).get(input.contractId, String(professionalId));
  if (!contract) {
    throw new Error("Only pending direct hire requests can be negotiated.");
  }
  const saveOffer = db.transaction(() => {
    db.prepare(
      `
        INSERT INTO "DirectHireNegotiation" (
          contractId,
          jobId,
          clientId,
          professionalId,
          senderId,
          senderRole,
          bidAmount,
          duration,
          message,
          createdAt
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `
    ).run(
      contract.contractId,
      contract.jobId,
      contract.clientId,
      contract.professionalId,
      String(professionalId),
      "PROFESSIONAL",
      bidAmount,
      duration,
      message,
      timestamp
    );
    db.prepare(
      `
        UPDATE contracts
        SET total_amount = COALESCE(?, total_amount),
          updated_at = ?
        WHERE id = ?
      `
    ).run(bidAmount, timestamp, contract.contractId);
    if (bidAmount != null) {
      db.prepare(
        `
          UPDATE jobs
          SET budget_min = ?, budget_max = ?
          WHERE id = ?
        `
      ).run(bidAmount, bidAmount, contract.jobId);
    }
  });
  saveOffer();
  return getDirectHireNegotiationsByContract(contract.contractId).at(-1) ?? null;
}
function getProfessionalHireNegotiations(professionalId) {
  const db = getDatabase$2();
  return db.prepare(
    `
        SELECT *
        FROM "DirectHireNegotiation"
        WHERE professionalId = ?
        ORDER BY datetime(createdAt) ASC, id ASC
      `
  ).all(String(professionalId));
}
function getDirectHireNegotiationsByContract(contractId) {
  const db = getDatabase$2();
  return db.prepare(
    `
        SELECT *
        FROM "DirectHireNegotiation"
        WHERE contractId = ?
        ORDER BY datetime(createdAt) ASC, id ASC
      `
  ).all(contractId);
}
function startClientHireProject(clientId, contractId) {
  const db = getDatabase$2();
  const timestamp = (/* @__PURE__ */ new Date()).toISOString();
  const contract = db.prepare(
    `
        SELECT
          contracts.id AS contractId,
          contracts.job_id AS jobId,
          contracts.client_project_id AS clientProjectId,
          contracts.tracking_id AS trackingId,
          contracts.client_id AS clientId,
          contracts.professional_id AS professionalId,
          jobs.title AS title,
          jobs.description AS description,
          jobs.budget_min AS budgetMin,
          jobs.budget_max AS budgetMax,
          jobs.job_type AS workMode,
          jobs.city AS location,
          jobs.job_date AS jobDate,
          jobs.deadline AS deadline,
          TRIM(ClientUser.firstName || ' ' || ClientUser.lastName) AS clientName,
          CASE WHEN ClientUser.avatarUrl LIKE 'data:%' THEN NULL ELSE ClientUser.avatarUrl END AS clientAvatarUrl,
          TRIM(ProUser.firstName || ' ' || ProUser.lastName) AS professionalName,
          CASE WHEN ProUser.avatarUrl LIKE 'data:%' THEN NULL ELSE ProUser.avatarUrl END AS professionalAvatarUrl
        FROM contracts
        INNER JOIN jobs ON jobs.id = contracts.job_id
        LEFT JOIN "User" ClientUser ON ClientUser.id = CAST(contracts.client_id AS INTEGER)
        LEFT JOIN "User" ProUser ON ProUser.id = CAST(contracts.professional_id AS INTEGER)
        WHERE contracts.id = ? AND contracts.client_id = ? AND contracts.status = 'accepted'
        LIMIT 1
      `
  ).get(contractId, String(clientId));
  if (!contract) {
    throw new Error("Only accepted direct hires can be started.");
  }
  if (!contract.clientProjectId) {
    throw new Error("This hire request is not linked to a client project.");
  }
  const professionalId = Number(contract.professionalId);
  const clientProjectId = Number(contract.clientProjectId);
  const conversationId = `client-${contract.clientId}-pro-${contract.professionalId}`;
  const clientName = contract.clientName || `Client ${contract.clientId}`;
  const professionalName = contract.professionalName || "Professional";
  const message = {
    id: randomUUID(),
    conversationId,
    senderId: clientId,
    receiverId: professionalId,
    body: `Hi ${professionalName}, you are in. The project "${contract.title}" has started.`,
    kind: "text",
    createdAt: timestamp
  };
  const userAId = Math.min(clientId, professionalId);
  const userBId = Math.max(clientId, professionalId);
  const userAIsClient = userAId === clientId;
  const startProject = db.transaction(() => {
    const project = db.prepare(
      `
        SELECT id
        FROM "ClientJob"
        WHERE id = ? AND userId = ?
        LIMIT 1
      `
    ).get(clientProjectId, clientId);
    if (!project) {
      throw new Error("Selected project was not found.");
    }
    const projectRequest = db.prepare(
      `
        INSERT INTO "ProjectRequest" (
          jobId,
          clientId,
          professionalId,
          bidAmount,
          duration,
          coverLetter,
          attachmentsJson,
          status,
          createdAt,
          updatedAt
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `
    ).run(
      clientProjectId,
      clientId,
      professionalId,
      Math.round(contract.budgetMax ?? contract.budgetMin ?? 0),
      "",
      "Direct hire project started by the client.",
      null,
      "ACCEPTED",
      timestamp,
      timestamp
    );
    const projectRequestId = Number(projectRequest.lastInsertRowid);
    const tracking = db.prepare(
      `
        INSERT INTO "ProjectTracking" (
          requestId,
          jobId,
          clientId,
          professionalId,
          status,
          acceptedAt,
          createdAt,
          updatedAt
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `
    ).run(
      projectRequestId,
      clientProjectId,
      clientId,
      professionalId,
      "ACTIVE",
      timestamp,
      timestamp,
      timestamp
    );
    const trackingId = Number(tracking.lastInsertRowid);
    db.prepare(
      `
        UPDATE "ClientJob"
        SET status = 'CLOSED', updatedAt = ?
        WHERE id = ? AND userId = ?
      `
    ).run(timestamp, clientProjectId, clientId);
    db.prepare(
      `
        UPDATE "ProjectRequest"
        SET status = 'DECLINED', updatedAt = ?
        WHERE jobId = ?
          AND clientId = ?
          AND id != ?
          AND status = 'PENDING'
      `
    ).run(timestamp, clientProjectId, clientId, projectRequestId);
    db.prepare(
      `
        UPDATE contracts
        SET status = 'started', updated_at = ?, client_project_id = ?, tracking_id = ?
        WHERE id = ? AND client_id = ? AND status = 'accepted'
      `
    ).run(timestamp, clientProjectId, trackingId, contractId, String(clientId));
    db.prepare(
      `
        INSERT INTO "SocketConversation" (
          id,
          userAId,
          userBId,
          userAName,
          userBName,
          userAAvatarUrl,
          userBAvatarUrl,
          job,
          createdAt,
          updatedAt
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(id) DO UPDATE SET
          job = excluded.job,
          updatedAt = excluded.updatedAt
      `
    ).run(
      conversationId,
      userAId,
      userBId,
      userAIsClient ? clientName : professionalName,
      userAIsClient ? professionalName : clientName,
      userAIsClient ? contract.clientAvatarUrl : contract.professionalAvatarUrl,
      userAIsClient ? contract.professionalAvatarUrl : contract.clientAvatarUrl,
      contract.title,
      timestamp,
      timestamp
    );
    db.prepare(
      `
        INSERT INTO "SocketMessage" (
          id,
          conversationId,
          senderId,
          receiverId,
          body,
          kind,
          createdAt
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `
    ).run(
      message.id,
      message.conversationId,
      message.senderId,
      message.receiverId,
      message.body,
      message.kind,
      message.createdAt
    );
  });
  startProject();
  return {
    contractId,
    conversationId,
    message
  };
}
function cancelHireProject(userId, contractId) {
  const db = getDatabase$2();
  const timestamp = (/* @__PURE__ */ new Date()).toISOString();
  const contract = db.prepare(
    `
        SELECT id, tracking_id AS trackingId
        FROM contracts
        WHERE id = ?
          AND status = 'started'
          AND (client_id = ? OR professional_id = ?)
        LIMIT 1
      `
  ).get(contractId, String(userId), String(userId));
  if (!contract) {
    throw new Error("Only started direct hire projects can be cancelled by project participants.");
  }
  const cancelProject = db.transaction(() => {
    db.prepare(
      `
        UPDATE contracts
        SET status = 'cancelled', updated_at = ?
        WHERE id = ?
      `
    ).run(timestamp, contractId);
    if (contract.trackingId) {
      db.prepare(
        `
          UPDATE "ProjectTracking"
          SET status = 'CANCELLED', updatedAt = ?
          WHERE id = ? AND status = 'ACTIVE'
        `
      ).run(timestamp, contract.trackingId);
      db.prepare(
        `
          UPDATE "ProjectTransaction"
          SET status = 'CANCELLED', updatedAt = ?
          WHERE trackingId = ? AND status = 'COMPLETED'
        `
      ).run(timestamp, contract.trackingId);
    }
  });
  cancelProject();
  return {
    contractId,
    status: "cancelled"
  };
}
function deleteRejectedHireRequest(userId, contractId) {
  const db = getDatabase$2();
  const contract = db.prepare(
    `
        SELECT id, job_id AS jobId
        FROM contracts
        WHERE id = ?
          AND status = 'rejected'
          AND (client_id = ? OR professional_id = ?)
        LIMIT 1
      `
  ).get(contractId, String(userId), String(userId));
  if (!contract) {
    throw new Error("Only rejected direct hire requests can be deleted by project participants.");
  }
  const deleteRequest = db.transaction(() => {
    db.prepare(`DELETE FROM "DirectHireNegotiation" WHERE contractId = ?`).run(contract.id);
    db.prepare(`DELETE FROM milestones WHERE contract_id = ?`).run(contract.id);
    db.prepare(`DELETE FROM contracts WHERE id = ?`).run(contract.id);
    db.prepare(`DELETE FROM job_attachments WHERE job_id = ?`).run(contract.jobId);
    db.prepare(`DELETE FROM jobs WHERE id = ?`).run(contract.jobId);
  });
  deleteRequest();
  return {
    contractId,
    deleted: true
  };
}
const globalForNotificationDb = globalThis;
function getDatabase$1() {
  if (!globalForNotificationDb.notificationDb) {
    const databasePath = path__default.resolve(process.cwd(), "prisma", "app.db");
    globalForNotificationDb.notificationDb = new Database(databasePath);
  }
  ensureNotificationTables(globalForNotificationDb.notificationDb);
  return globalForNotificationDb.notificationDb;
}
function ensureNotificationTables(db) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS "UserNotification" (
      "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      "userId" INTEGER NOT NULL,
      "type" TEXT NOT NULL,
      "title" TEXT NOT NULL,
      "description" TEXT NOT NULL,
      "href" TEXT,
      "createdAt" TEXT NOT NULL,
      "readAt" TEXT,
      "clearedAt" TEXT
    );

    CREATE TABLE IF NOT EXISTS "UserNotificationState" (
      "userId" INTEGER NOT NULL,
      "notificationKey" TEXT NOT NULL,
      "readAt" TEXT,
      "clearedAt" TEXT,
      PRIMARY KEY ("userId", "notificationKey")
    );

    CREATE TABLE IF NOT EXISTS "ClientJob" (
      "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      "userId" INTEGER NOT NULL,
      "category" TEXT NOT NULL,
      "title" TEXT NOT NULL,
      "description" TEXT NOT NULL,
      "budgetMin" INTEGER,
      "budgetMax" INTEGER,
      "urgency" TEXT NOT NULL DEFAULT 'MEDIUM',
      "jobDate" TEXT,
      "deadline" TEXT NOT NULL,
      "workMode" TEXT NOT NULL DEFAULT 'BOTH',
      "locationLabel" TEXT,
      "locationAddress" TEXT,
      "locationLat" REAL,
      "locationLng" REAL,
      "status" TEXT NOT NULL DEFAULT 'OPEN',
      "createdAt" TEXT NOT NULL,
      "updatedAt" TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "ProjectRequest" (
      "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      "jobId" INTEGER NOT NULL,
      "clientId" INTEGER NOT NULL,
      "professionalId" INTEGER NOT NULL,
      "bidAmount" INTEGER,
      "duration" TEXT,
      "coverLetter" TEXT NOT NULL,
      "attachmentsJson" TEXT,
      "status" TEXT NOT NULL DEFAULT 'PENDING',
      "createdAt" TEXT NOT NULL,
      "updatedAt" TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "ProjectTracking" (
      "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      "requestId" INTEGER NOT NULL,
      "jobId" INTEGER NOT NULL,
      "clientId" INTEGER NOT NULL,
      "professionalId" INTEGER NOT NULL,
      "status" TEXT NOT NULL DEFAULT 'ACTIVE',
      "acceptedAt" TEXT NOT NULL,
      "createdAt" TEXT NOT NULL,
      "updatedAt" TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "ProjectWorkUpload" (
      "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      "trackingId" INTEGER NOT NULL,
      "roundNumber" INTEGER NOT NULL,
      "title" TEXT NOT NULL,
      "note" TEXT NOT NULL,
      "fileName" TEXT,
      "fileUrl" TEXT,
      "filesJson" TEXT,
      "createdAt" TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "ProjectRevisionRequest" (
      "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      "trackingId" INTEGER NOT NULL,
      "clientId" INTEGER NOT NULL,
      "professionalId" INTEGER NOT NULL,
      "note" TEXT NOT NULL,
      "status" TEXT NOT NULL DEFAULT 'REQUESTED',
      "createdAt" TEXT NOT NULL,
      "updatedAt" TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "ProjectMilestone" (
      "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      "trackingId" INTEGER NOT NULL,
      "clientId" INTEGER NOT NULL,
      "professionalId" INTEGER NOT NULL,
      "title" TEXT NOT NULL,
      "description" TEXT,
      "amount" INTEGER,
      "dueDate" TEXT,
      "status" TEXT NOT NULL DEFAULT 'PENDING',
      "createdAt" TEXT NOT NULL,
      "updatedAt" TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "ProjectCompletionRequest" (
      "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      "trackingId" INTEGER NOT NULL,
      "clientId" INTEGER NOT NULL,
      "professionalId" INTEGER NOT NULL,
      "note" TEXT,
      "status" TEXT NOT NULL DEFAULT 'SUBMITTED',
      "submittedAt" TEXT NOT NULL,
      "updatedAt" TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "SocketConversation" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "userAId" INTEGER NOT NULL,
      "userBId" INTEGER NOT NULL,
      "userAName" TEXT NOT NULL,
      "userBName" TEXT NOT NULL,
      "userAAvatarUrl" TEXT,
      "userBAvatarUrl" TEXT,
      "job" TEXT NOT NULL DEFAULT 'Direct message',
      "createdAt" TEXT NOT NULL,
      "updatedAt" TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "SocketMessage" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "conversationId" TEXT NOT NULL,
      "senderId" INTEGER NOT NULL,
      "receiverId" INTEGER NOT NULL,
      "body" TEXT NOT NULL,
      "kind" TEXT NOT NULL DEFAULT 'text',
      "createdAt" TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "SocketConversationClear" (
      "conversationId" TEXT NOT NULL,
      "userId" INTEGER NOT NULL,
      "clearedAt" TEXT NOT NULL,
      PRIMARY KEY ("conversationId", "userId")
    );

    CREATE TABLE IF NOT EXISTS "jobs" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "client_id" TEXT NOT NULL,
      "category_id" INTEGER,
      "title" TEXT NOT NULL,
      "description" TEXT,
      "budget_min" REAL,
      "budget_max" REAL,
      "currency" TEXT NOT NULL DEFAULT 'INR',
      "job_type" TEXT,
      "lat" REAL,
      "lng" REAL,
      "city" TEXT,
      "job_date" TEXT,
      "deadline" TEXT,
      "urgency" TEXT,
      "status" TEXT NOT NULL DEFAULT 'draft',
      "created_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS "contracts" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "job_id" TEXT NOT NULL,
      "client_id" TEXT NOT NULL,
      "professional_id" TEXT NOT NULL,
      "proposal_id" TEXT,
      "total_amount" REAL,
      "platform_fee" REAL,
      "status" TEXT NOT NULL DEFAULT 'pending',
      "start_date" TEXT,
      "end_date" TEXT,
      "updated_at" TEXT
    );

    CREATE INDEX IF NOT EXISTS "UserNotification_userId_idx" ON "UserNotification"("userId");
    CREATE INDEX IF NOT EXISTS "UserNotificationState_userId_idx" ON "UserNotificationState"("userId");
    CREATE INDEX IF NOT EXISTS "ProjectRequest_clientId_idx" ON "ProjectRequest"("clientId");
    CREATE INDEX IF NOT EXISTS "ProjectRequest_professionalId_idx" ON "ProjectRequest"("professionalId");
    CREATE INDEX IF NOT EXISTS "ProjectWorkUpload_trackingId_idx" ON "ProjectWorkUpload"("trackingId");
    CREATE INDEX IF NOT EXISTS "ProjectRevisionRequest_trackingId_idx" ON "ProjectRevisionRequest"("trackingId");
    CREATE INDEX IF NOT EXISTS "ProjectRevisionRequest_professionalId_idx" ON "ProjectRevisionRequest"("professionalId");
    CREATE INDEX IF NOT EXISTS "ProjectMilestone_trackingId_idx" ON "ProjectMilestone"("trackingId");
    CREATE INDEX IF NOT EXISTS "ProjectMilestone_clientId_idx" ON "ProjectMilestone"("clientId");
    CREATE INDEX IF NOT EXISTS "ProjectMilestone_professionalId_idx" ON "ProjectMilestone"("professionalId");
    CREATE INDEX IF NOT EXISTS "ProjectCompletionRequest_trackingId_idx" ON "ProjectCompletionRequest"("trackingId");
    CREATE INDEX IF NOT EXISTS "ProjectCompletionRequest_clientId_idx" ON "ProjectCompletionRequest"("clientId");
    CREATE INDEX IF NOT EXISTS "ProjectCompletionRequest_professionalId_idx" ON "ProjectCompletionRequest"("professionalId");
    CREATE INDEX IF NOT EXISTS "SocketMessage_receiverId_idx" ON "SocketMessage"("receiverId");
    CREATE INDEX IF NOT EXISTS "SocketConversationClear_userId_idx" ON "SocketConversationClear"("userId");
    CREATE INDEX IF NOT EXISTS "contracts_client_id_idx" ON "contracts"("client_id");
    CREATE INDEX IF NOT EXISTS "contracts_professional_id_idx" ON "contracts"("professional_id");
  `);
  const contractColumns = new Set(
    db.prepare(`PRAGMA table_info("contracts")`).all().map((column) => column.name)
  );
  if (!contractColumns.has("updated_at")) {
    db.exec(`ALTER TABLE "contracts" ADD COLUMN "updated_at" TEXT`);
  }
}
function getUserNotifications(userId, role) {
  const db = getDatabase$1();
  const notifications = [
    ...getManualNotifications(db, userId),
    ...role === "ADMIN" ? getAdminActivityNotifications(db) : [
      ...getMessageNotifications(db, userId, role),
      ...getProjectRequestNotifications(db, userId, role),
      ...getHireContractNotifications(db, userId, role),
      ...getWorkUploadNotifications(db, userId, role),
      ...getRevisionNotifications(db, userId, role),
      ...getMilestoneNotifications(db, userId, role),
      ...getCompletionNotifications(db, userId, role)
    ]
  ];
  const states = getNotificationStates(db, userId);
  return notifications.filter((notification) => notification !== null).map((notification) => {
    const state = states.get(notification.key);
    if (state?.clearedAt) {
      return null;
    }
    return {
      ...notification,
      readAt: notification.readAt ?? state?.readAt ?? null
    };
  }).filter((notification) => notification !== null).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}
function markUserNotificationsRead(userId, role) {
  const db = getDatabase$1();
  const now2 = (/* @__PURE__ */ new Date()).toISOString();
  const notifications = getUserNotifications(userId, role);
  const markDerived = db.prepare(`
    INSERT INTO "UserNotificationState" (userId, notificationKey, readAt, clearedAt)
    VALUES (?, ?, ?, NULL)
    ON CONFLICT(userId, notificationKey) DO UPDATE SET readAt = excluded.readAt
  `);
  const transaction = db.transaction(() => {
    for (const notification of notifications) {
      markDerived.run(userId, notification.key, now2);
    }
    db.prepare(
      `
      UPDATE "UserNotification"
      SET readAt = ?
      WHERE userId = ? AND clearedAt IS NULL
    `
    ).run(now2, userId);
  });
  transaction();
}
function clearUserNotifications(userId, role) {
  const db = getDatabase$1();
  const now2 = (/* @__PURE__ */ new Date()).toISOString();
  const notifications = getUserNotifications(userId, role);
  const clearDerived = db.prepare(`
    INSERT INTO "UserNotificationState" (userId, notificationKey, readAt, clearedAt)
    VALUES (?, ?, ?, ?)
    ON CONFLICT(userId, notificationKey) DO UPDATE SET
      readAt = COALESCE("UserNotificationState".readAt, excluded.readAt),
      clearedAt = excluded.clearedAt
  `);
  const transaction = db.transaction(() => {
    for (const notification of notifications) {
      clearDerived.run(userId, notification.key, notification.readAt ?? now2, now2);
    }
    db.prepare(
      `
      UPDATE "UserNotification"
      SET clearedAt = ?, readAt = COALESCE(readAt, ?)
      WHERE userId = ? AND clearedAt IS NULL
    `
    ).run(now2, now2, userId);
  });
  transaction();
}
function getAdminActivityNotifications(db) {
  const users = db.prepare(
    `
    SELECT id, firstName, lastName, email, role, createdAt
    FROM "User"
    WHERE role != 'ADMIN'
    ORDER BY datetime(createdAt) DESC
    LIMIT 30
  `
  ).all();
  const jobs = db.prepare(
    `
    SELECT ClientJob.id, ClientJob.title, ClientJob.createdAt,
      TRIM(User.firstName || ' ' || User.lastName) AS clientName
    FROM "ClientJob"
    LEFT JOIN "User" ON User.id = ClientJob.userId
    ORDER BY datetime(ClientJob.createdAt) DESC
    LIMIT 30
  `
  ).all();
  const disputes = db.prepare(
    `
    SELECT ProjectDispute.id, ProjectDispute.status, ProjectDispute.priority,
      ProjectDispute.createdAt, COALESCE(ClientJob.title, 'Project') AS jobTitle
    FROM "ProjectDispute"
    LEFT JOIN "ProjectTracking" ON ProjectTracking.id = ProjectDispute.trackingId
    LEFT JOIN "ClientJob" ON ClientJob.id = ProjectTracking.jobId
    ORDER BY datetime(ProjectDispute.createdAt) DESC
    LIMIT 30
  `
  ).all();
  const payments = db.prepare(
    `
    SELECT ProjectTransaction.id, ProjectTransaction.amount, ProjectTransaction.currency,
      ProjectTransaction.createdAt, COALESCE(ClientJob.title, ProjectTransaction.description, 'Project') AS jobTitle
    FROM "ProjectTransaction"
    LEFT JOIN "ProjectTracking" ON ProjectTracking.id = ProjectTransaction.trackingId
    LEFT JOIN "ClientJob" ON ClientJob.id = ProjectTracking.jobId
    WHERE ProjectTransaction.status = 'COMPLETED'
    ORDER BY datetime(ProjectTransaction.createdAt) DESC
    LIMIT 30
  `
  ).all();
  return [
    ...users.map((user) => ({
      key: `admin:user:${user.id}`,
      type: "review",
      title: "New user registered",
      description: `${`${user.firstName} ${user.lastName}`.trim() || user.email} joined as ${user.role.toLowerCase()}.`,
      href: "/user-management",
      createdAt: user.createdAt,
      readAt: null
    })),
    ...jobs.map((job) => ({
      key: `admin:job:${job.id}`,
      type: "project",
      title: "New job posted",
      description: `${job.clientName || "A client"} posted “${job.title}”.`,
      href: "/job-management",
      createdAt: job.createdAt,
      readAt: null
    })),
    ...disputes.map((dispute) => ({
      key: `admin:dispute:${dispute.id}`,
      type: "review",
      title: "New dispute raised",
      description: `${dispute.priority.toLowerCase()} priority dispute for “${dispute.jobTitle}”.`,
      href: "/job-management",
      createdAt: dispute.createdAt,
      readAt: null
    })),
    ...payments.map((payment) => ({
      key: `admin:payment:${payment.id}`,
      type: "payment",
      title: "Payment completed",
      description: `${payment.currency} ${payment.amount.toLocaleString()} paid for “${payment.jobTitle}”.`,
      href: "/earnings-reports",
      createdAt: payment.createdAt,
      readAt: null
    }))
  ];
}
function getManualNotifications(db, userId) {
  return db.prepare(
    `
        SELECT id, type, title, description, href, createdAt, readAt, clearedAt
        FROM "UserNotification"
        WHERE userId = ? AND clearedAt IS NULL
      `
  ).all(userId).map((row) => {
    const notification = row;
    return {
      key: `manual:${notification.id}`,
      type: notification.type,
      title: notification.title,
      description: notification.description,
      href: notification.href || "/notifications",
      createdAt: notification.createdAt,
      readAt: notification.readAt
    };
  });
}
function getMessageNotifications(db, userId, role) {
  return db.prepare(
    `
        SELECT
          message.id,
          message.conversationId,
          message.senderId,
          message.receiverId,
          message.body,
          message.kind,
          message.createdAt,
          conversation.job,
          sender.firstName AS senderFirstName,
          sender.lastName AS senderLastName,
          sender.email AS senderEmail
        FROM "SocketMessage" message
        LEFT JOIN "SocketConversation" conversation ON conversation.id = message.conversationId
        LEFT JOIN "User" sender ON sender.id = message.senderId
        LEFT JOIN "SocketConversationClear" cleared
          ON cleared.conversationId = message.conversationId AND cleared.userId = ?
        WHERE message.receiverId = ?
          AND (cleared.clearedAt IS NULL OR datetime(message.createdAt) > datetime(cleared.clearedAt))
        ORDER BY datetime(message.createdAt) DESC
        LIMIT 50
      `
  ).all(userId, userId).map((row) => {
    const message = row;
    const senderName = formatName(
      message.senderFirstName,
      message.senderLastName,
      message.senderEmail
    );
    const preview = message.kind === "attachment" ? "Sent an attachment" : message.body;
    return {
      key: `message:${message.id}`,
      type: "message",
      title: `New message from ${senderName}`,
      description: `${message.job || "Direct message"}: ${preview}`,
      href: role === "PROFESSIONAL" ? "/professional-messages" : "/messages",
      createdAt: message.createdAt,
      readAt: null
    };
  });
}
function getProjectRequestNotifications(db, userId, role) {
  return db.prepare(
    `
        SELECT
          request.id,
          request.jobId,
          request.clientId,
          request.professionalId,
          request.status,
          request.createdAt,
          request.updatedAt,
          job.title AS projectTitle,
          professional.firstName AS professionalFirstName,
          professional.lastName AS professionalLastName,
          professional.email AS professionalEmail,
          client.firstName AS clientFirstName,
          client.lastName AS clientLastName,
          client.email AS clientEmail,
          tracking.id AS trackingId
        FROM "ProjectRequest" request
        LEFT JOIN "ClientJob" job ON job.id = request.jobId
        LEFT JOIN "User" professional ON professional.id = request.professionalId
        LEFT JOIN "User" client ON client.id = request.clientId
        LEFT JOIN "ProjectTracking" tracking ON tracking.requestId = request.id
        WHERE request.clientId = ? OR request.professionalId = ?
      `
  ).all(userId, userId).map((row) => {
    const request = row;
    const projectTitle = request.projectTitle || "Project";
    if (role === "CLIENT" && request.clientId === userId) {
      const proName = formatName(
        request.professionalFirstName,
        request.professionalLastName,
        request.professionalEmail
      );
      return {
        key: `project-request:${request.id}:${request.updatedAt}`,
        type: "project",
        title: `${proName} sent a project request`,
        description: `${projectTitle} is waiting for your review.`,
        href: "/projects",
        createdAt: request.updatedAt,
        readAt: null
      };
    }
    if (role === "PROFESSIONAL" && request.professionalId === userId) {
      const clientName = formatName(
        request.clientFirstName,
        request.clientLastName,
        request.clientEmail
      );
      const statusLabel = formatStatus(request.status);
      return {
        key: `project-request-status:${request.id}:${request.status}`,
        type: "project",
        title: `${clientName} ${statusLabel} your request`,
        description: `${projectTitle} request status is ${statusLabel}.`,
        href: request.trackingId ? `/project-track/${request.trackingId}` : "/professional-stats",
        createdAt: request.updatedAt,
        readAt: null
      };
    }
    return null;
  }).filter((notification) => notification !== null);
}
function getHireContractNotifications(db, userId, role) {
  return db.prepare(
    `
        SELECT
          contracts.id AS contractId,
          contracts.job_id AS jobId,
          contracts.client_id AS clientId,
          contracts.professional_id AS professionalId,
          contracts.status AS status,
          contracts.start_date AS startDate,
          contracts.end_date AS endDate,
          contracts.updated_at AS updatedAt,
          jobs.title AS title,
          jobs.description AS description,
          jobs.created_at AS createdAt,
          client.firstName AS clientFirstName,
          client.lastName AS clientLastName,
          client.email AS clientEmail,
          professional.firstName AS professionalFirstName,
          professional.lastName AS professionalLastName,
          professional.email AS professionalEmail
        FROM contracts
        INNER JOIN jobs ON jobs.id = contracts.job_id
        LEFT JOIN "User" client ON client.id = CAST(contracts.client_id AS INTEGER)
        LEFT JOIN "User" professional ON professional.id = CAST(contracts.professional_id AS INTEGER)
        WHERE contracts.client_id = ? OR contracts.professional_id = ?
      `
  ).all(String(userId), String(userId)).map((row) => {
    const contract = row;
    const title = contract.title || "Direct hire request";
    if (role === "PROFESSIONAL" && Number(contract.professionalId) === userId) {
      const clientName = formatName(
        contract.clientFirstName,
        contract.clientLastName,
        contract.clientEmail
      );
      return {
        key: `hire-contract:${contract.contractId}:${contract.status}`,
        type: "project",
        title: contract.status === "pending" ? "New direct hire request" : `Hire request ${contract.status}`,
        description: contract.status === "pending" ? `${clientName} sent you a hire request for ${title}.` : `${title} is now ${contract.status}.`,
        href: "/professional-stats",
        createdAt: contract.status === "pending" ? contract.createdAt : contract.updatedAt || contract.createdAt,
        readAt: null
      };
    }
    if (role === "CLIENT" && Number(contract.clientId) === userId && contract.status !== "pending") {
      const proName = formatName(
        contract.professionalFirstName,
        contract.professionalLastName,
        contract.professionalEmail
      );
      return {
        key: `hire-contract-client:${contract.contractId}:${contract.status}`,
        type: "project",
        title: `Hire request ${contract.status}`,
        description: `${proName} ${contract.status} your hire request for ${title}.`,
        href: "/projects",
        createdAt: contract.updatedAt || contract.createdAt,
        readAt: null
      };
    }
    return null;
  }).filter((notification) => notification !== null);
}
function getWorkUploadNotifications(db, userId, role) {
  return db.prepare(
    `
        SELECT
          upload.id,
          upload.trackingId,
          tracking.clientId,
          tracking.professionalId,
          upload.title,
          upload.fileName,
          upload.createdAt,
          job.title AS projectTitle,
          professional.firstName AS professionalFirstName,
          professional.lastName AS professionalLastName,
          professional.email AS professionalEmail,
          client.firstName AS clientFirstName,
          client.lastName AS clientLastName,
          client.email AS clientEmail
        FROM "ProjectWorkUpload" upload
        INNER JOIN "ProjectTracking" tracking ON tracking.id = upload.trackingId
        LEFT JOIN "ClientJob" job ON job.id = tracking.jobId
        LEFT JOIN "User" professional ON professional.id = tracking.professionalId
        LEFT JOIN "User" client ON client.id = tracking.clientId
        WHERE tracking.clientId = ? OR tracking.professionalId = ?
      `
  ).all(userId, userId).map((row) => {
    const upload = row;
    const projectTitle = upload.projectTitle || "Project";
    const fileLabel = upload.fileName || upload.title || "work file";
    if (role === "CLIENT" && upload.clientId === userId) {
      const proName = formatName(
        upload.professionalFirstName,
        upload.professionalLastName,
        upload.professionalEmail
      );
      return {
        key: `work-upload:${upload.id}`,
        type: "work",
        title: "New work file uploaded",
        description: `${proName} uploaded ${fileLabel} for ${projectTitle}.`,
        href: `/project-track/${upload.trackingId}`,
        createdAt: upload.createdAt,
        readAt: null
      };
    }
    if (role === "PROFESSIONAL" && upload.professionalId === userId) {
      return {
        key: `work-upload:${upload.id}`,
        type: "work",
        title: "Work upload saved",
        description: `${fileLabel} is saved for ${projectTitle}.`,
        href: `/project-track/${upload.trackingId}`,
        createdAt: upload.createdAt,
        readAt: null
      };
    }
    return null;
  }).filter((notification) => notification !== null);
}
function getRevisionNotifications(db, userId, role) {
  return db.prepare(
    `
        SELECT
          revision.id,
          revision.trackingId,
          revision.clientId,
          revision.professionalId,
          revision.note,
          revision.status,
          revision.createdAt,
          revision.updatedAt,
          job.title AS projectTitle,
          professional.firstName AS professionalFirstName,
          professional.lastName AS professionalLastName,
          professional.email AS professionalEmail,
          client.firstName AS clientFirstName,
          client.lastName AS clientLastName,
          client.email AS clientEmail
        FROM "ProjectRevisionRequest" revision
        INNER JOIN "ProjectTracking" tracking ON tracking.id = revision.trackingId
        LEFT JOIN "ClientJob" job ON job.id = tracking.jobId
        LEFT JOIN "User" professional ON professional.id = revision.professionalId
        LEFT JOIN "User" client ON client.id = revision.clientId
        WHERE revision.clientId = ? OR revision.professionalId = ?
      `
  ).all(userId, userId).map((row) => {
    const revision = row;
    const projectTitle = revision.projectTitle || "Project";
    if (role === "PROFESSIONAL" && revision.professionalId === userId) {
      const clientName = formatName(
        revision.clientFirstName,
        revision.clientLastName,
        revision.clientEmail
      );
      return {
        key: `revision:${revision.id}`,
        type: "work",
        title: "Revision requested",
        description: `${clientName} requested changes for ${projectTitle}: ${revision.note}`,
        href: `/project-track/${revision.trackingId}`,
        createdAt: revision.createdAt,
        readAt: null
      };
    }
    if (role === "CLIENT" && revision.clientId === userId) {
      return {
        key: `revision:${revision.id}`,
        type: "work",
        title: revision.status === "ADDRESSED" ? "Revision addressed" : "Revision request saved",
        description: `${projectTitle}: ${revision.note}`,
        href: `/project-track/${revision.trackingId}`,
        createdAt: revision.status === "ADDRESSED" ? revision.updatedAt : revision.createdAt,
        readAt: null
      };
    }
    return null;
  }).filter((notification) => notification !== null);
}
function getMilestoneNotifications(db, userId, role) {
  return db.prepare(
    `
        SELECT
          milestone.id,
          milestone.trackingId,
          milestone.clientId,
          milestone.professionalId,
          milestone.title,
          milestone.amount,
          milestone.status,
          milestone.createdAt,
          milestone.updatedAt,
          job.title AS projectTitle,
          professional.firstName AS professionalFirstName,
          professional.lastName AS professionalLastName,
          professional.email AS professionalEmail,
          client.firstName AS clientFirstName,
          client.lastName AS clientLastName,
          client.email AS clientEmail
        FROM "ProjectMilestone" milestone
        INNER JOIN "ProjectTracking" tracking ON tracking.id = milestone.trackingId
        LEFT JOIN "ClientJob" job ON job.id = tracking.jobId
        LEFT JOIN "User" professional ON professional.id = milestone.professionalId
        LEFT JOIN "User" client ON client.id = milestone.clientId
        WHERE milestone.clientId = ? OR milestone.professionalId = ?
      `
  ).all(userId, userId).map((row) => {
    const milestone = row;
    const projectTitle = milestone.projectTitle || "Project";
    const amountLabel = milestone.amount ? ` (${formatMoney(milestone.amount)})` : "";
    if (role === "PROFESSIONAL" && milestone.professionalId === userId) {
      const clientName = formatName(
        milestone.clientFirstName,
        milestone.clientLastName,
        milestone.clientEmail
      );
      const isNew = milestone.status === "PENDING";
      return {
        key: `milestone:${milestone.id}:${milestone.status}`,
        type: milestone.status === "PAID" ? "payment" : "project",
        title: isNew ? "New milestone added" : `Milestone ${formatMilestoneStatus(milestone.status)}`,
        description: `${clientName} ${isNew ? "added" : "updated"} ${milestone.title}${amountLabel} for ${projectTitle}.`,
        href: `/project-track/${milestone.trackingId}`,
        createdAt: isNew ? milestone.createdAt : milestone.updatedAt,
        readAt: null
      };
    }
    if (role === "CLIENT" && milestone.clientId === userId) {
      const proName = formatName(
        milestone.professionalFirstName,
        milestone.professionalLastName,
        milestone.professionalEmail
      );
      const statusLabel = formatMilestoneStatus(milestone.status);
      return {
        key: `milestone:${milestone.id}:${milestone.status}`,
        type: milestone.status === "PAID" ? "payment" : "project",
        title: `Milestone ${statusLabel}`,
        description: `${proName} milestone update: ${milestone.title}${amountLabel} for ${projectTitle}.`,
        href: `/project-track/${milestone.trackingId}`,
        createdAt: milestone.status === "PENDING" ? milestone.createdAt : milestone.updatedAt,
        readAt: null
      };
    }
    return null;
  }).filter((notification) => notification !== null);
}
function getCompletionNotifications(db, userId, role) {
  return db.prepare(
    `
        SELECT
          completion.id,
          completion.trackingId,
          completion.clientId,
          completion.professionalId,
          completion.note,
          completion.status,
          completion.submittedAt,
          completion.updatedAt,
          job.title AS projectTitle,
          professional.firstName AS professionalFirstName,
          professional.lastName AS professionalLastName,
          professional.email AS professionalEmail,
          client.firstName AS clientFirstName,
          client.lastName AS clientLastName,
          client.email AS clientEmail
        FROM "ProjectCompletionRequest" completion
        INNER JOIN "ProjectTracking" tracking ON tracking.id = completion.trackingId
        LEFT JOIN "ClientJob" job ON job.id = tracking.jobId
        LEFT JOIN "User" professional ON professional.id = completion.professionalId
        LEFT JOIN "User" client ON client.id = completion.clientId
        WHERE completion.clientId = ? OR completion.professionalId = ?
      `
  ).all(userId, userId).map((row) => {
    const completion = row;
    const projectTitle = completion.projectTitle || "Project";
    if (role === "CLIENT" && completion.clientId === userId) {
      const proName = formatName(
        completion.professionalFirstName,
        completion.professionalLastName,
        completion.professionalEmail
      );
      return {
        key: `completion:${completion.id}:${completion.status}`,
        type: "project",
        title: completion.status === "SUBMITTED" ? "Final work submitted" : `Final work ${completion.status.toLowerCase().replace(/_/g, " ")}`,
        description: `${proName} submitted final work for ${projectTitle}.`,
        href: `/project-track/${completion.trackingId}`,
        createdAt: completion.status === "SUBMITTED" ? completion.submittedAt : completion.updatedAt,
        readAt: null
      };
    }
    if (role === "PROFESSIONAL" && completion.professionalId === userId) {
      const clientName = formatName(
        completion.clientFirstName,
        completion.clientLastName,
        completion.clientEmail
      );
      return {
        key: `completion:${completion.id}:${completion.status}`,
        type: "project",
        title: completion.status === "APPROVED" ? "Project approved" : completion.status === "REVISION_REQUESTED" ? "Final revision requested" : "Final work submitted",
        description: `${clientName} updated final work review for ${projectTitle}.`,
        href: `/project-track/${completion.trackingId}`,
        createdAt: completion.status === "SUBMITTED" ? completion.submittedAt : completion.updatedAt,
        readAt: null
      };
    }
    return null;
  }).filter((notification) => notification !== null);
}
function getNotificationStates(db, userId) {
  const rows = db.prepare(
    `
        SELECT notificationKey, readAt, clearedAt
        FROM "UserNotificationState"
        WHERE userId = ?
      `
  ).all(userId);
  return new Map(rows.map((row) => [row.notificationKey, row]));
}
function formatName(firstName, lastName, fallback) {
  return `${firstName || ""} ${lastName || ""}`.trim() || fallback || "Someone";
}
function formatStatus(status) {
  return status.toLowerCase() === "accepted" ? "accepted" : status.toLowerCase() === "declined" ? "declined" : "received";
}
function formatMilestoneStatus(status) {
  return status.toLowerCase().replace(/_/g, " ");
}
function formatMoney(value) {
  return `$${value.toLocaleString()}`;
}
const globalForAdminDashboardDb = globalThis;
const PLATFORM_COMMISSION_RATE = 0.1;
function getDatabase() {
  if (!globalForAdminDashboardDb.adminDashboardDb) {
    const databasePath = path__default.resolve(process.cwd(), "prisma", "app.db");
    globalForAdminDashboardDb.adminDashboardDb = new Database(databasePath);
  }
  return globalForAdminDashboardDb.adminDashboardDb;
}
function getAdminDashboardSnapshot() {
  const db = getDatabase();
  const now2 = /* @__PURE__ */ new Date();
  const todayStart = new Date(now2.getFullYear(), now2.getMonth(), now2.getDate()).toISOString();
  const jobs = getAdminJobRecords();
  return {
    generatedAt: now2.toISOString(),
    stats: {
      totalUsers: count(db, `"User"`),
      clients: count(db, `"User"`, `role = 'CLIENT'`),
      professionals: count(db, `"User"`, `role = 'PROFESSIONAL'`),
      admins: count(db, `"User"`, `role = 'ADMIN'`),
      activeUsers: count(db, `"User"`, `isActive = 1`),
      todayUsers: countSince(db, `"User"`, "createdAt", todayStart),
      totalJobs: jobs.length,
      openJobs: jobs.filter((job) => job.status === "OPEN").length,
      draftJobs: jobs.filter((job) => job.status === "DRAFT").length,
      closedJobs: jobs.filter((job) => job.status === "CLOSED").length,
      todayJobs: jobs.filter(
        (job) => new Date(job.createdAt).getTime() >= new Date(todayStart).getTime()
      ).length,
      pendingRequests: count(db, `"ProjectRequest"`, `status = 'PENDING'`),
      activeProjects: count(db, `"ProjectTracking"`, `status = 'ACTIVE'`),
      completedTransactions: count(db, `"ProjectTransaction"`, `status = 'COMPLETED'`),
      todayTransactions: countSince(
        db,
        `"ProjectTransaction"`,
        "createdAt",
        todayStart,
        `status = 'COMPLETED'`
      ),
      totalRevenue: sumAmount(db, null),
      todayRevenue: sumAmount(db, todayStart),
      openDisputes: count(db, `"ProjectDispute"`, `status IN ('OPEN', 'UNDER_REVIEW')`)
    },
    recentJobs: jobs.slice(0, 8).map((job) => ({
      id: job.id,
      title: job.title,
      category: job.category,
      status: job.status,
      budgetMin: job.budgetMin,
      budgetMax: job.budgetMax,
      createdAt: job.createdAt,
      clientName: job.clientName,
      clientEmail: job.clientEmail
    })),
    recentTransactions: getRecentTransactions(db)
  };
}
function getAdminManagedUserDetails(users) {
  const db = getDatabase();
  return Object.fromEntries(
    users.map((user) => {
      const projects = getManagedUserProjects(db, user.id, user.role);
      const transactions = getManagedUserTransactions(db, user.id, user.role);
      const completedTransactions = transactions.filter(
        (transaction) => transaction.status === "COMPLETED"
      );
      return [
        user.id,
        {
          userId: user.id,
          projectCount: projects.length,
          activeProjectCount: projects.filter((project) => project.trackingStatus === "ACTIVE").length,
          completedProjectCount: projects.filter(
            (project) => project.trackingStatus === "COMPLETED"
          ).length,
          totalMoney: completedTransactions.reduce(
            (total, transaction) => total + transaction.amount,
            0
          ),
          projects,
          transactions
        }
      ];
    })
  );
}
function getManagedUserProjects(db, userId, role) {
  const modernProjects = getModernManagedUserProjects(db, userId, role);
  const modernJobIds = new Set(modernProjects.map((project) => project.id));
  const legacyProjects = getLegacyManagedUserProjects(db, userId, role, modernJobIds);
  return [...modernProjects, ...legacyProjects].sort(
    (a, b) => managedProjectStatusOrder(a.trackingStatus) - managedProjectStatusOrder(b.trackingStatus) || new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}
function getModernManagedUserProjects(db, userId, role) {
  if (!tableExists(db, `"ClientJob"`)) {
    return [];
  }
  const hasTracking = tableExists(db, `"ProjectTracking"`);
  const hasRequests = tableExists(db, `"ProjectRequest"`);
  const trackingJoin = hasTracking ? `LEFT JOIN "ProjectTracking" ON ProjectTracking.id = (
        SELECT latest.id FROM "ProjectTracking" AS latest
        WHERE latest.jobId = ClientJob.id
        ORDER BY datetime(latest.updatedAt) DESC, latest.id DESC LIMIT 1
      )` : "";
  const userJoin = hasTracking ? `LEFT JOIN "User" AS Counterpart ON Counterpart.id = ${role === "CLIENT" ? "ProjectTracking.professionalId" : "ProjectTracking.clientId"}` : "";
  const requestJoin = hasTracking && hasRequests ? `LEFT JOIN "ProjectRequest" ON ProjectRequest.id = ProjectTracking.requestId` : "";
  const where = role === "CLIENT" ? "ClientJob.userId = ?" : hasTracking ? "ProjectTracking.professionalId = ?" : "1 = 0";
  return db.prepare(
    `
      SELECT
        ClientJob.id,
        ClientJob.title,
        ClientJob.category,
        ClientJob.status,
        ${hasTracking ? "ProjectTracking.status" : "NULL"} AS trackingStatus,
        ${hasTracking ? "TRIM(Counterpart.firstName || ' ' || Counterpart.lastName)" : "NULL"} AS counterpartName,
        ${hasTracking ? "Counterpart.email" : "NULL"} AS counterpartEmail,
        ${hasTracking && hasRequests ? "ProjectRequest.bidAmount" : "NULL"} AS agreedAmount,
        ClientJob.createdAt
      FROM "ClientJob"
      ${trackingJoin}
      ${userJoin}
      ${requestJoin}
      WHERE ${where}
      ORDER BY
        CASE ${hasTracking ? "ProjectTracking.status" : "NULL"} WHEN 'ACTIVE' THEN 0 WHEN 'COMPLETED' THEN 1 ELSE 2 END,
        datetime(ClientJob.createdAt) DESC
    `
  ).all(userId);
}
function getLegacyManagedUserProjects(db, userId, role, modernJobIds) {
  if (!tableExists(db, `"jobs"`)) {
    return [];
  }
  const hasContracts = tableExists(db, `"contracts"`);
  const hasTracking = tableExists(db, `"ProjectTracking"`);
  if (role === "PROFESSIONAL" && !hasContracts) {
    return [];
  }
  const contractJoin = hasContracts ? `
        LEFT JOIN "contracts" AS Contract ON Contract.id = (
          SELECT latestContract.id
          FROM "contracts" AS latestContract
          WHERE latestContract.job_id = LegacyJob.id
            ${role === "PROFESSIONAL" ? "AND CAST(latestContract.professional_id AS INTEGER) = ?" : ""}
          ORDER BY datetime(latestContract.updated_at) DESC, latestContract.id DESC
          LIMIT 1
        )
      ` : "";
  const trackingJoin = hasContracts && hasTracking ? `
          LEFT JOIN "ProjectTracking" ON ProjectTracking.id = COALESCE(
            Contract.tracking_id,
            (
              SELECT latestTracking.id
              FROM "ProjectTracking" AS latestTracking
              WHERE latestTracking.jobId = Contract.client_project_id
                AND latestTracking.clientId = CAST(Contract.client_id AS INTEGER)
                AND latestTracking.professionalId = CAST(Contract.professional_id AS INTEGER)
              ORDER BY datetime(latestTracking.updatedAt) DESC, latestTracking.id DESC
              LIMIT 1
            )
          )
        ` : "";
  const counterpartJoin = role === "CLIENT" ? hasContracts ? `LEFT JOIN "User" AS Counterpart ON Counterpart.id = CAST(Contract.professional_id AS INTEGER)` : "" : `LEFT JOIN "User" AS Counterpart ON Counterpart.id = CAST(LegacyJob.client_id AS INTEGER)`;
  const where = role === "CLIENT" ? `CAST(LegacyJob.client_id AS INTEGER) = ?` : `Contract.id IS NOT NULL AND CAST(Contract.professional_id AS INTEGER) = ?`;
  const parameters = role === "PROFESSIONAL" ? [userId, userId] : [userId];
  const rows = db.prepare(
    `
        SELECT
          LegacyJob.id AS legacyId,
          LegacyJob.title,
          'Legacy project' AS category,
          LegacyJob.status AS jobStatus,
          ${hasContracts ? "Contract.status" : "NULL"} AS contractStatus,
          ${hasContracts ? "Contract.client_project_id" : "NULL"} AS linkedJobId,
          ${hasContracts ? "Contract.total_amount" : "NULL"} AS contractAmount,
          ${hasContracts && hasTracking ? "ProjectTracking.status" : "NULL"} AS trackingStatus,
          ${hasContracts ? "COALESCE(Contract.total_amount, LegacyJob.budget_max, LegacyJob.budget_min)" : "COALESCE(LegacyJob.budget_max, LegacyJob.budget_min)"} AS agreedAmount,
          ${counterpartJoin ? "TRIM(Counterpart.firstName || ' ' || Counterpart.lastName)" : "NULL"} AS counterpartName,
          ${counterpartJoin ? "Counterpart.email" : "NULL"} AS counterpartEmail,
          LegacyJob.created_at AS createdAt
        FROM "jobs" AS LegacyJob
        ${contractJoin}
        ${trackingJoin}
        ${counterpartJoin}
        WHERE ${where}
        ORDER BY datetime(LegacyJob.created_at) DESC
      `
  ).all(...parameters);
  const contractProjects = rows.filter((project) => !project.linkedJobId || !modernJobIds.has(project.linkedJobId)).map((project, index) => {
    const normalizedTrackingStatus = normalizeManagedProjectTrackingStatus(
      project.trackingStatus,
      project.contractStatus
    );
    return {
      id: -(index + 1),
      title: project.title || "Untitled project",
      category: project.category,
      status: normalizeLegacyJobStatus(
        project.jobStatus,
        project.contractStatus,
        normalizedTrackingStatus
      ),
      trackingStatus: normalizedTrackingStatus,
      counterpartName: project.counterpartName || null,
      counterpartEmail: project.counterpartEmail || null,
      agreedAmount: project.agreedAmount,
      createdAt: project.createdAt
    };
  });
  if (role !== "PROFESSIONAL" || !hasTracking) {
    return contractProjects;
  }
  const hasRequests = tableExists(db, `"ProjectRequest"`);
  const orphanedTrackedProjects = db.prepare(
    `
        SELECT
          ProjectTracking.id,
          ProjectTracking.jobId,
          ProjectTracking.status AS trackingStatus,
          ProjectTracking.createdAt,
          ${hasRequests ? "ProjectRequest.bidAmount" : "NULL"} AS agreedAmount,
          TRIM(ClientUser.firstName || ' ' || ClientUser.lastName) AS counterpartName,
          ClientUser.email AS counterpartEmail
        FROM "ProjectTracking"
        LEFT JOIN "User" AS ClientUser ON ClientUser.id = ProjectTracking.clientId
        ${hasRequests ? `LEFT JOIN "ProjectRequest" ON ProjectRequest.id = ProjectTracking.requestId` : ""}
        WHERE ProjectTracking.professionalId = ?
          ${hasContracts ? `AND NOT EXISTS (
                  SELECT 1
                  FROM "contracts" AS MatchingContract
                  WHERE CAST(MatchingContract.professional_id AS INTEGER) = ProjectTracking.professionalId
                    AND (
                      MatchingContract.tracking_id = ProjectTracking.id
                      OR MatchingContract.client_project_id = ProjectTracking.jobId
                    )
                )` : ""}
        ORDER BY datetime(ProjectTracking.createdAt) DESC, ProjectTracking.id DESC
      `
  ).all(userId);
  return [
    ...contractProjects,
    ...orphanedTrackedProjects.map((project, index) => ({
      id: -(contractProjects.length + index + 1),
      title: `Tracked project #${project.jobId}`,
      category: "Tracked project",
      status: project.trackingStatus === "COMPLETED" ? "CLOSED" : project.trackingStatus,
      trackingStatus: project.trackingStatus,
      counterpartName: project.counterpartName || null,
      counterpartEmail: project.counterpartEmail || null,
      agreedAmount: project.agreedAmount,
      createdAt: project.createdAt
    }))
  ];
}
function normalizeManagedProjectTrackingStatus(trackingStatus, contractStatus) {
  if (trackingStatus) {
    return trackingStatus.toUpperCase();
  }
  const normalizedContractStatus = contractStatus?.toLowerCase();
  if (normalizedContractStatus === "completed") return "COMPLETED";
  if (["cancelled", "rejected"].includes(normalizedContractStatus || "")) return "CANCELLED";
  if (["accepted", "started", "active"].includes(normalizedContractStatus || "")) return "ACTIVE";
  return null;
}
function managedProjectStatusOrder(status) {
  if (status === "ACTIVE") return 0;
  if (status === "COMPLETED") return 1;
  if (status === "CANCELLED") return 3;
  return 2;
}
function getManagedUserTransactions(db, userId, role) {
  if (!tableExists(db, `"ProjectTransaction"`)) {
    return [];
  }
  const hasTracking = tableExists(db, `"ProjectTracking"`);
  const hasJobs = tableExists(db, `"ClientJob"`);
  const counterpartColumn = role === "CLIENT" ? "ProjectTransaction.professionalId" : "ProjectTransaction.clientId";
  const userColumn = role === "CLIENT" ? "ProjectTransaction.clientId" : "ProjectTransaction.professionalId";
  return db.prepare(
    `
      SELECT
        ProjectTransaction.id,
        ${hasTracking && hasJobs ? "COALESCE(ClientJob.title, ProjectTransaction.description)" : "ProjectTransaction.description"} AS projectTitle,
        ProjectTransaction.amount,
        ProjectTransaction.currency,
        ProjectTransaction.type,
        ProjectTransaction.status,
        COALESCE(TRIM(Counterpart.firstName || ' ' || Counterpart.lastName), 'Unknown user') AS counterpartName,
        ProjectTransaction.createdAt
      FROM "ProjectTransaction"
      ${hasTracking ? `LEFT JOIN "ProjectTracking" ON ProjectTracking.id = ProjectTransaction.trackingId` : ""}
      ${hasTracking && hasJobs ? `LEFT JOIN "ClientJob" ON ClientJob.id = ProjectTracking.jobId` : ""}
      LEFT JOIN "User" AS Counterpart ON Counterpart.id = ${counterpartColumn}
      WHERE ${userColumn} = ?
      ORDER BY datetime(ProjectTransaction.createdAt) DESC, ProjectTransaction.id DESC
    `
  ).all(userId);
}
function tableExists(db, tableName) {
  const normalized = tableName.replaceAll(`"`, "");
  const result = db.prepare(`SELECT name FROM sqlite_master WHERE type = 'table' AND name = ? LIMIT 1`).get(normalized);
  return Boolean(result);
}
function count(db, tableName, where) {
  if (!tableExists(db, tableName)) {
    return 0;
  }
  const row = db.prepare(`SELECT COUNT(*) AS value FROM ${tableName}${where ? ` WHERE ${where}` : ""}`).get();
  return Number(row?.value || 0);
}
function countSince(db, tableName, columnName, since, extraWhere) {
  if (!tableExists(db, tableName)) {
    return 0;
  }
  const where = [`datetime(${columnName}) >= datetime(?)`, extraWhere].filter(Boolean).join(" AND ");
  const row = db.prepare(`SELECT COUNT(*) AS value FROM ${tableName} WHERE ${where}`).get(since);
  return Number(row?.value || 0);
}
function sumAmount(db, since) {
  if (!tableExists(db, `"ProjectTransaction"`)) {
    return 0;
  }
  const where = since ? `status = 'COMPLETED' AND datetime(createdAt) >= datetime(?)` : `status = 'COMPLETED'`;
  const row = db.prepare(`SELECT COALESCE(SUM(amount), 0) AS value FROM "ProjectTransaction" WHERE ${where}`).get(...since ? [since] : []);
  return Number(row?.value || 0);
}
function getRecentTransactions(db) {
  if (!tableExists(db, `"ProjectTransaction"`)) {
    return [];
  }
  return db.prepare(
    `
        SELECT
          ProjectTransaction.id,
          ProjectTransaction.amount,
          ProjectTransaction.currency,
          ProjectTransaction.type,
          ProjectTransaction.status,
          ProjectTransaction.description,
          ProjectTransaction.createdAt,
          COALESCE(ClientJob.title, ProjectTransaction.description, 'Project payment') AS projectTitle,
          TRIM(ClientUser.firstName || ' ' || ClientUser.lastName) AS clientName,
          TRIM(ProUser.firstName || ' ' || ProUser.lastName) AS professionalName
        FROM "ProjectTransaction"
        LEFT JOIN "ProjectTracking" ON ProjectTracking.id = ProjectTransaction.trackingId
        LEFT JOIN "ClientJob" ON ClientJob.id = ProjectTracking.jobId
        LEFT JOIN "User" AS ClientUser ON ClientUser.id = ProjectTransaction.clientId
        LEFT JOIN "User" AS ProUser ON ProUser.id = ProjectTransaction.professionalId
        ORDER BY datetime(ProjectTransaction.createdAt) DESC, ProjectTransaction.id DESC
        LIMIT 8
      `
  ).all();
}
function getAdminPaymentTransactions() {
  const db = getDatabase();
  if (!tableExists(db, `"ProjectTransaction"`) || !tableExists(db, `"User"`) || !tableExists(db, `"ProjectTracking"`) || !tableExists(db, `"ClientJob"`)) {
    return [];
  }
  const rows = db.prepare(
    `
        SELECT
          ProjectTransaction.id,
          COALESCE(ClientJob.title, ProjectTransaction.description, 'Project payment') AS jobTitle,
          TRIM(ClientUser.firstName || ' ' || ClientUser.lastName) AS clientName,
          ClientUser.email AS clientEmail,
          TRIM(ProUser.firstName || ' ' || ProUser.lastName) AS professionalName,
          ProUser.email AS professionalEmail,
          ProjectTransaction.amount,
          ProjectTransaction.currency,
          ProjectTransaction.type AS paymentType,
          ProjectTransaction.status,
          ProjectTransaction.createdAt AS dateTime
        FROM "ProjectTransaction"
        LEFT JOIN "ProjectTracking" ON ProjectTracking.id = ProjectTransaction.trackingId
        LEFT JOIN "ClientJob" ON ClientJob.id = ProjectTracking.jobId
        LEFT JOIN "User" AS ClientUser ON ClientUser.id = ProjectTransaction.clientId
        LEFT JOIN "User" AS ProUser ON ProUser.id = ProjectTransaction.professionalId
        ORDER BY datetime(ProjectTransaction.createdAt) DESC, ProjectTransaction.id DESC
      `
  ).all();
  return rows.map((payment) => ({
    ...payment,
    jobTitle: payment.jobTitle || "Project payment",
    clientName: payment.clientName || "Unknown client",
    clientEmail: payment.clientEmail || "Unknown email",
    professionalName: payment.professionalName || "Unknown professional",
    professionalEmail: payment.professionalEmail || "Unknown email"
  }));
}
function getAdminJobRecords() {
  const db = getDatabase();
  if (!tableExists(db, `"User"`)) {
    return [];
  }
  const hasClientJobs = tableExists(db, `"ClientJob"`);
  const hasProjectTracking = tableExists(db, `"ProjectTracking"`);
  const hasCompletionRequests = tableExists(db, `"ProjectCompletionRequest"`);
  const trackingJoin = hasProjectTracking ? `
        LEFT JOIN "ProjectTracking" ON ProjectTracking.id = (
          SELECT latestTracking.id
          FROM "ProjectTracking" AS latestTracking
          WHERE latestTracking.jobId = ClientJob.id
            AND latestTracking.status != 'CANCELLED'
          ORDER BY
            CASE latestTracking.status WHEN 'COMPLETED' THEN 0 WHEN 'ACTIVE' THEN 1 ELSE 2 END,
            datetime(latestTracking.updatedAt) DESC,
            latestTracking.id DESC
          LIMIT 1
        )
        LEFT JOIN "User" AS ProfessionalUser ON ProfessionalUser.id = ProjectTracking.professionalId
      ` : "";
  const completionJoin = hasProjectTracking && hasCompletionRequests ? `
          LEFT JOIN "ProjectCompletionRequest" ON ProjectCompletionRequest.id = (
            SELECT latestCompletion.id
            FROM "ProjectCompletionRequest" AS latestCompletion
            WHERE latestCompletion.trackingId = ProjectTracking.id
            ORDER BY
              CASE latestCompletion.status WHEN 'APPROVED' THEN 0 ELSE 1 END,
              datetime(latestCompletion.updatedAt) DESC,
              latestCompletion.id DESC
            LIMIT 1
          )
        ` : "";
  const rows = hasClientJobs ? db.prepare(
    `
        SELECT
          ClientJob.id,
          ClientJob.title,
          ClientJob.description,
          ClientJob.category,
          ClientJob.status,
          ClientJob.budgetMin,
          ClientJob.budgetMax,
          ClientJob.urgency,
          ClientJob.timingType,
          ClientJob.jobDate,
          ClientJob.deadline,
          ClientJob.workMode,
          ClientJob.locationLabel,
          ClientJob.locationAddress,
          ClientJob.locationLat,
          ClientJob.locationLng,
          ClientJob.createdAt,
          ClientJob.updatedAt,
          TRIM(User.firstName || ' ' || User.lastName) AS clientName,
          User.email AS clientEmail,
          ${hasProjectTracking ? "ProjectTracking.id" : "NULL"} AS trackingId,
          ${hasProjectTracking ? "ProjectTracking.requestId" : "NULL"} AS requestId,
          ${hasProjectTracking ? "ProjectTracking.status" : "NULL"} AS trackingStatus,
          ${hasProjectTracking ? "ProjectTracking.acceptedAt" : "NULL"} AS acceptedAt,
          ${hasProjectTracking ? "CASE WHEN ProjectTracking.status = 'COMPLETED' THEN ProjectTracking.updatedAt ELSE NULL END" : "NULL"} AS completedAt,
          ${hasProjectTracking && hasCompletionRequests ? "ProjectCompletionRequest.submittedAt" : "NULL"} AS completionSubmittedAt,
          ${hasProjectTracking ? "TRIM(ProfessionalUser.firstName || ' ' || ProfessionalUser.lastName)" : "NULL"} AS professionalName,
          ${hasProjectTracking ? "ProfessionalUser.email" : "NULL"} AS professionalEmail
        FROM "ClientJob"
        INNER JOIN "User" ON User.id = ClientJob.userId
        ${trackingJoin}
        ${completionJoin}
        ORDER BY datetime(ClientJob.createdAt) DESC, ClientJob.id DESC
      `
  ).all() : [];
  const attachments = getAdminJobAttachments(db);
  const requests = getAdminJobRequests(db);
  const workUploads = getAdminJobWorkUploads(db);
  const modernJobIds = new Set(rows.map((job) => job.id));
  const legacyRows = getLegacyAdminJobRecords(db, modernJobIds, requests, workUploads);
  return [
    ...rows.map((job) => ({
      ...job,
      clientName: job.clientName || "Unknown client",
      clientEmail: job.clientEmail || "Unknown email",
      professionalName: job.professionalName || null,
      professionalEmail: job.professionalEmail || null,
      attachments: attachments.filter((attachment) => attachment.jobId === job.id),
      requests: requests.filter((request) => request.jobId === job.id),
      workUploads: workUploads.filter((upload) => upload.jobId === job.id)
    })),
    ...legacyRows
  ].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime() || b.id - a.id
  );
}
function getLegacyAdminJobRecords(db, modernJobIds, requests, workUploads) {
  if (!tableExists(db, `"jobs"`)) {
    return [];
  }
  const hasContracts = tableExists(db, `"contracts"`);
  const hasTracking = tableExists(db, `"ProjectTracking"`);
  const hasCompletionRequests = tableExists(db, `"ProjectCompletionRequest"`);
  const contractJoin = hasContracts ? `
        LEFT JOIN "contracts" AS Contract ON Contract.id = (
          SELECT latestContract.id
          FROM "contracts" AS latestContract
          WHERE latestContract.job_id = LegacyJob.id
          ORDER BY datetime(latestContract.updated_at) DESC, latestContract.id DESC
          LIMIT 1
        )
      ` : "";
  const trackingJoin = hasContracts && hasTracking ? `
          LEFT JOIN "ProjectTracking" ON ProjectTracking.id = COALESCE(
            Contract.tracking_id,
            (
              SELECT latestTracking.id
              FROM "ProjectTracking" AS latestTracking
              WHERE latestTracking.jobId = Contract.client_project_id
                AND LOWER(COALESCE(Contract.status, '')) IN ('accepted', 'started', 'active', 'completed', 'cancelled')
              ORDER BY datetime(latestTracking.updatedAt) DESC, latestTracking.id DESC
              LIMIT 1
            )
          )
        ` : "";
  const completionJoin = hasContracts && hasTracking && hasCompletionRequests ? `
          LEFT JOIN "ProjectCompletionRequest" ON ProjectCompletionRequest.id = (
            SELECT latestCompletion.id
            FROM "ProjectCompletionRequest" AS latestCompletion
            WHERE latestCompletion.trackingId = ProjectTracking.id
            ORDER BY datetime(latestCompletion.updatedAt) DESC, latestCompletion.id DESC
            LIMIT 1
          )
        ` : "";
  const rows = db.prepare(
    `
        SELECT
          LegacyJob.id AS legacyId,
          LegacyJob.title,
          COALESCE(LegacyJob.description, '') AS description,
          'Legacy project' AS category,
          LegacyJob.status AS legacyStatus,
          LegacyJob.budget_min AS budgetMin,
          LegacyJob.budget_max AS budgetMax,
          COALESCE(LegacyJob.urgency, 'MEDIUM') AS urgency,
          'FIXED' AS timingType,
          LegacyJob.job_date AS jobDate,
          COALESCE(LegacyJob.deadline, LegacyJob.created_at) AS deadline,
          COALESCE(LegacyJob.job_type, 'both') AS workMode,
          LegacyJob.city AS locationLabel,
          LegacyJob.city AS locationAddress,
          LegacyJob.lat AS locationLat,
          LegacyJob.lng AS locationLng,
          LegacyJob.created_at AS createdAt,
          ${hasContracts ? "COALESCE(Contract.updated_at, LegacyJob.created_at)" : "LegacyJob.created_at"} AS updatedAt,
          TRIM(ClientUser.firstName || ' ' || ClientUser.lastName) AS clientName,
          ClientUser.email AS clientEmail,
          ${hasContracts && hasTracking ? "ProjectTracking.id" : "NULL"} AS trackingId,
          ${hasContracts && hasTracking ? "ProjectTracking.requestId" : "NULL"} AS requestId,
          ${hasContracts && hasTracking ? "ProjectTracking.status" : "NULL"} AS trackingStatus,
          ${hasContracts && hasTracking ? "ProjectTracking.acceptedAt" : "NULL"} AS acceptedAt,
          ${hasContracts && hasTracking ? "CASE WHEN ProjectTracking.status = 'COMPLETED' THEN ProjectTracking.updatedAt ELSE NULL END" : "NULL"} AS completedAt,
          ${hasContracts && hasTracking && hasCompletionRequests ? "ProjectCompletionRequest.submittedAt" : "NULL"} AS completionSubmittedAt,
          ${hasContracts ? "Contract.client_project_id" : "NULL"} AS linkedJobId,
          ${hasContracts ? "Contract.status" : "NULL"} AS contractStatus,
          ${hasContracts ? "Contract.total_amount" : "NULL"} AS contractAmount,
          ${hasContracts ? "TRIM(ProfessionalUser.firstName || ' ' || ProfessionalUser.lastName)" : "NULL"} AS professionalName,
          ${hasContracts ? "ProfessionalUser.email" : "NULL"} AS professionalEmail
        FROM "jobs" AS LegacyJob
        LEFT JOIN "User" AS ClientUser ON CAST(ClientUser.id AS TEXT) = LegacyJob.client_id
        ${contractJoin}
        ${hasContracts ? `LEFT JOIN "User" AS ProfessionalUser ON CAST(ProfessionalUser.id AS TEXT) = Contract.professional_id` : ""}
        ${trackingJoin}
        ${completionJoin}
        ORDER BY datetime(LegacyJob.created_at) DESC
      `
  ).all();
  return rows.filter((row) => !row.linkedJobId || !modernJobIds.has(row.linkedJobId)).map((row, index) => {
    const linkedRequests = row.linkedJobId ? requests.filter((request) => request.jobId === row.linkedJobId) : [];
    const linkedUploads = row.linkedJobId ? workUploads.filter((upload) => upload.jobId === row.linkedJobId) : [];
    const budgetMin = row.budgetMin ?? row.contractAmount;
    const budgetMax = row.budgetMax ?? row.contractAmount;
    return {
      id: -(index + 1),
      title: row.title || "Untitled project",
      description: row.description || "No project description was saved.",
      category: row.category,
      status: normalizeLegacyJobStatus(row.legacyStatus, row.contractStatus, row.trackingStatus),
      budgetMin,
      budgetMax,
      urgency: String(row.urgency || "MEDIUM").toUpperCase(),
      timingType: row.timingType,
      jobDate: row.jobDate,
      deadline: row.deadline,
      workMode: normalizeLegacyWorkMode(row.workMode),
      locationLabel: row.locationLabel,
      locationAddress: row.locationAddress,
      locationLat: row.locationLat,
      locationLng: row.locationLng,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
      clientName: row.clientName || "Unknown client",
      clientEmail: row.clientEmail || "Unknown email",
      trackingId: row.trackingId,
      requestId: row.requestId,
      trackingStatus: row.trackingStatus,
      acceptedAt: row.acceptedAt,
      completedAt: row.completedAt,
      completionSubmittedAt: row.completionSubmittedAt,
      professionalName: row.professionalName || null,
      professionalEmail: row.professionalEmail || null,
      attachments: [],
      requests: linkedRequests,
      workUploads: linkedUploads
    };
  });
}
function normalizeLegacyJobStatus(jobStatus, contractStatus, trackingStatus) {
  if (trackingStatus === "COMPLETED" || contractStatus?.toLowerCase() === "completed") {
    return "CLOSED";
  }
  if (trackingStatus === "CANCELLED" || ["cancelled", "rejected"].includes(contractStatus?.toLowerCase() || "")) {
    return "CANCELLED";
  }
  if (trackingStatus === "ACTIVE" || ["accepted", "started", "active"].includes(contractStatus?.toLowerCase() || "")) {
    return "OPEN";
  }
  const normalized = jobStatus?.toUpperCase();
  return normalized === "OPEN" || normalized === "CLOSED" ? normalized : "DRAFT";
}
function normalizeLegacyWorkMode(value) {
  const normalized = value?.toUpperCase().replace("-", "_");
  if (normalized === "ONSITE") return "ON_SITE";
  if (normalized === "REMOTE") return "REMOTE";
  return "BOTH";
}
function getAdminJobAttachments(db) {
  if (!tableExists(db, `"ClientJobAttachment"`)) {
    return [];
  }
  return db.prepare(
    `
        SELECT id, jobId, fileName, fileType, fileSize, previewUrl, createdAt
        FROM "ClientJobAttachment"
        ORDER BY datetime(createdAt) ASC, id ASC
      `
  ).all();
}
function getAdminJobRequests(db) {
  if (!tableExists(db, `"ProjectRequest"`)) {
    return [];
  }
  const hasUser = tableExists(db, `"User"`);
  const rows = db.prepare(
    `
        SELECT
          ProjectRequest.id,
          ProjectRequest.jobId,
          ProjectRequest.professionalId,
          ${hasUser ? "TRIM(User.firstName || ' ' || User.lastName)" : "NULL"} AS professionalName,
          ${hasUser ? "User.email" : "NULL"} AS professionalEmail,
          ProjectRequest.bidAmount,
          ProjectRequest.duration,
          ProjectRequest.coverLetter,
          ProjectRequest.attachmentsJson,
          ProjectRequest.status,
          ProjectRequest.createdAt,
          ProjectRequest.updatedAt
        FROM "ProjectRequest"
        ${hasUser ? `LEFT JOIN "User" ON User.id = ProjectRequest.professionalId` : ""}
        ORDER BY datetime(ProjectRequest.updatedAt) DESC, ProjectRequest.id DESC
      `
  ).all();
  return rows.map((request) => ({
    ...request,
    professionalName: request.professionalName || "Unknown professional",
    professionalEmail: request.professionalEmail || "Unknown email"
  }));
}
function getAdminJobWorkUploads(db) {
  if (!tableExists(db, `"ProjectWorkUpload"`) || !tableExists(db, `"ProjectTracking"`)) {
    return [];
  }
  const hasUser = tableExists(db, `"User"`);
  const rows = db.prepare(
    `
        SELECT
          ProjectWorkUpload.id,
          ProjectWorkUpload.trackingId,
          ProjectTracking.jobId,
          ${hasUser ? "TRIM(User.firstName || ' ' || User.lastName)" : "NULL"} AS professionalName,
          ${hasUser ? "User.email" : "NULL"} AS professionalEmail,
          ProjectWorkUpload.roundNumber,
          ProjectWorkUpload.title,
          ProjectWorkUpload.note,
          ProjectWorkUpload.fileName,
          ProjectWorkUpload.fileUrl,
          ProjectWorkUpload.filesJson,
          ProjectWorkUpload.createdAt
        FROM "ProjectWorkUpload"
        INNER JOIN "ProjectTracking" ON ProjectTracking.id = ProjectWorkUpload.trackingId
        ${hasUser ? `LEFT JOIN "User" ON User.id = ProjectTracking.professionalId` : ""}
        ORDER BY datetime(ProjectWorkUpload.createdAt) ASC, ProjectWorkUpload.id ASC
      `
  ).all();
  return rows.map((upload) => ({
    ...upload,
    professionalName: upload.professionalName || "Unknown professional",
    professionalEmail: upload.professionalEmail || "Unknown email"
  }));
}
function getAdminDisputeRecords() {
  const db = getDatabase();
  if (!tableExists(db, `"ProjectDispute"`) || !tableExists(db, `"ProjectTracking"`) || !tableExists(db, `"User"`)) {
    return [];
  }
  const hasClientJobs = tableExists(db, `"ClientJob"`);
  const rows = db.prepare(
    `
        SELECT
          ProjectDispute.id,
          ProjectDispute.trackingId,
          ${hasClientJobs ? "ClientJob.id" : "NULL"} AS jobId,
          ${hasClientJobs ? "COALESCE(ClientJob.title, 'Tracked project')" : "'Tracked project'"} AS jobTitle,
          ProjectDispute.issueType,
          ProjectDispute.priority,
          ProjectDispute.status,
          ProjectDispute.message,
          ProjectDispute.createdAt,
          ProjectDispute.updatedAt,
          ProjectDispute.reporterRole,
          TRIM(ReporterUser.firstName || ' ' || ReporterUser.lastName) AS reporterName,
          ReporterUser.email AS reporterEmail,
          TRIM(ClientUser.firstName || ' ' || ClientUser.lastName) AS clientName,
          ClientUser.email AS clientEmail,
          TRIM(ProfessionalUser.firstName || ' ' || ProfessionalUser.lastName) AS professionalName,
          ProfessionalUser.email AS professionalEmail
        FROM "ProjectDispute"
        LEFT JOIN "ProjectTracking" ON ProjectTracking.id = ProjectDispute.trackingId
        ${hasClientJobs ? `LEFT JOIN "ClientJob" ON ClientJob.id = ProjectTracking.jobId` : ""}
        LEFT JOIN "User" AS ReporterUser ON ReporterUser.id = ProjectDispute.reporterId
        LEFT JOIN "User" AS ClientUser ON ClientUser.id = ProjectDispute.clientId
        LEFT JOIN "User" AS ProfessionalUser ON ProfessionalUser.id = ProjectDispute.professionalId
        ORDER BY
          CASE ProjectDispute.status WHEN 'OPEN' THEN 0 WHEN 'UNDER_REVIEW' THEN 1 ELSE 2 END,
          CASE ProjectDispute.priority WHEN 'HIGH' THEN 0 WHEN 'MEDIUM' THEN 1 ELSE 2 END,
          datetime(ProjectDispute.createdAt) DESC,
          ProjectDispute.id DESC
      `
  ).all();
  return rows.map((dispute) => ({
    ...dispute,
    jobTitle: dispute.jobTitle || "Tracked project",
    reporterName: dispute.reporterName || "Unknown reporter",
    reporterEmail: dispute.reporterEmail || "Unknown email",
    clientName: dispute.clientName || "Unknown client",
    clientEmail: dispute.clientEmail || "Unknown email",
    professionalName: dispute.professionalName || "Unknown professional",
    professionalEmail: dispute.professionalEmail || "Unknown email"
  }));
}
function updateAdminDisputeStatus(disputeId, status) {
  const db = getDatabase();
  if (!tableExists(db, `"ProjectDispute"`)) {
    throw new Error("Dispute records are not available.");
  }
  const timestamp = (/* @__PURE__ */ new Date()).toISOString();
  db.prepare(
    `
      UPDATE "ProjectDispute"
      SET status = ?, updatedAt = ?
      WHERE id = ?
    `
  ).run(status, timestamp, disputeId);
  const row = db.prepare(`SELECT id FROM "ProjectDispute" WHERE id = ? LIMIT 1`).get(disputeId);
  if (!row) {
    throw new Error("Dispute not found.");
  }
  return { id: disputeId, status, updatedAt: timestamp };
}
function getAdminEarningsReport() {
  const db = getDatabase();
  const transactions = getAdminEarningsTransactions(db);
  const payouts = getAdminPayoutRecords(db);
  const professionals = getProfessionalEarningsSummaries(transactions, payouts);
  const totals = professionals.reduce(
    (summary, professional) => ({
      grossEarnings: summary.grossEarnings + professional.grossEarnings,
      commissionAmount: summary.commissionAmount + professional.commissionAmount,
      netEarnings: summary.netEarnings + professional.netEarnings,
      requestedPayouts: summary.requestedPayouts + professional.requestedPayouts,
      paidPayouts: summary.paidPayouts + professional.paidPayouts,
      pendingPayouts: summary.pendingPayouts + professional.pendingPayouts,
      processingPayouts: summary.processingPayouts + payouts.filter(
        (payout) => payout.professionalId === professional.professionalId && payout.status === "PROCESSING"
      ).reduce((total, payout) => total + payout.amount, 0),
      rejectedPayouts: summary.rejectedPayouts + professional.rejectedPayouts,
      availableBalance: summary.availableBalance + professional.availableBalance,
      transactionCount: summary.transactionCount + professional.transactionCount,
      payoutCount: summary.payoutCount + professional.payoutCount,
      professionalsWithEarnings: summary.professionalsWithEarnings + (professional.transactionCount > 0 ? 1 : 0)
    }),
    {
      grossEarnings: 0,
      commissionAmount: 0,
      netEarnings: 0,
      requestedPayouts: 0,
      paidPayouts: 0,
      pendingPayouts: 0,
      processingPayouts: 0,
      rejectedPayouts: 0,
      availableBalance: 0,
      transactionCount: 0,
      payoutCount: 0,
      professionalsWithEarnings: 0
    }
  );
  return {
    generatedAt: (/* @__PURE__ */ new Date()).toISOString(),
    commissionRate: PLATFORM_COMMISSION_RATE,
    totals,
    transactions,
    payouts,
    professionals
  };
}
function updateAdminPayoutStatus(payoutId, status) {
  const db = getDatabase();
  if (!tableExists(db, `"ProjectWithdrawal"`)) {
    throw new Error("Payout records are not available.");
  }
  const timestamp = (/* @__PURE__ */ new Date()).toISOString();
  db.prepare(
    `
      UPDATE "ProjectWithdrawal"
      SET status = ?, updatedAt = ?
      WHERE id = ?
    `
  ).run(status, timestamp, payoutId);
  const row = db.prepare(`SELECT id FROM "ProjectWithdrawal" WHERE id = ? LIMIT 1`).get(payoutId);
  if (!row) {
    throw new Error("Payout request not found.");
  }
  return { id: payoutId, status, updatedAt: timestamp };
}
function getAdminEarningsTransactions(db) {
  if (!tableExists(db, `"ProjectTransaction"`)) {
    return [];
  }
  const hasProjectTracking = tableExists(db, `"ProjectTracking"`);
  const hasClientJob = tableExists(db, `"ClientJob"`);
  const hasUser = tableExists(db, `"User"`);
  const rows = db.prepare(
    `
        SELECT
          ProjectTransaction.id,
          ProjectTransaction.trackingId,
          ProjectTransaction.milestoneId,
          ProjectTransaction.completionId,
          ${hasClientJob && hasProjectTracking ? "COALESCE(ClientJob.title, ProjectTransaction.description, 'Project payment')" : "COALESCE(ProjectTransaction.description, 'Project payment')"} AS jobTitle,
          ${hasClientJob && hasProjectTracking ? "COALESCE(ClientJob.category, 'Project')" : "'Project'"} AS projectCategory,
          ${hasUser ? "TRIM(ClientUser.firstName || ' ' || ClientUser.lastName)" : "NULL"} AS clientName,
          ${hasUser ? "ClientUser.email" : "NULL"} AS clientEmail,
          ${hasUser ? "TRIM(ProUser.firstName || ' ' || ProUser.lastName)" : "NULL"} AS professionalName,
          ${hasUser ? "ProUser.email" : "NULL"} AS professionalEmail,
          ProjectTransaction.professionalId,
          ProjectTransaction.amount,
          ProjectTransaction.currency,
          ProjectTransaction.type AS paymentType,
          ProjectTransaction.status,
          ProjectTransaction.description,
          ProjectTransaction.createdAt AS dateTime
        FROM "ProjectTransaction"
        ${hasProjectTracking ? `LEFT JOIN "ProjectTracking" ON ProjectTracking.id = ProjectTransaction.trackingId` : ""}
        ${hasClientJob && hasProjectTracking ? `LEFT JOIN "ClientJob" ON ClientJob.id = ProjectTracking.jobId` : ""}
        ${hasUser ? `LEFT JOIN "User" AS ClientUser ON ClientUser.id = ProjectTransaction.clientId` : ""}
        ${hasUser ? `LEFT JOIN "User" AS ProUser ON ProUser.id = ProjectTransaction.professionalId` : ""}
        ORDER BY datetime(ProjectTransaction.createdAt) DESC, ProjectTransaction.id DESC
      `
  ).all();
  return rows.map((transaction) => {
    const commissionAmount = getCommissionAmount(transaction.amount, transaction.status);
    const netPayoutAmount = transaction.status === "COMPLETED" ? Math.max(0, transaction.amount - commissionAmount) : 0;
    return {
      ...transaction,
      jobTitle: transaction.jobTitle || "Project payment",
      projectCategory: transaction.projectCategory || "Project",
      clientName: transaction.clientName || "Unknown client",
      clientEmail: transaction.clientEmail || "Unknown email",
      professionalName: transaction.professionalName || "Unknown professional",
      professionalEmail: transaction.professionalEmail || "Unknown email",
      grossAmount: transaction.status === "COMPLETED" ? transaction.amount : 0,
      commissionAmount,
      netPayoutAmount,
      platformShareRate: PLATFORM_COMMISSION_RATE
    };
  });
}
function getAdminPayoutRecords(db) {
  if (!tableExists(db, `"ProjectWithdrawal"`)) {
    return [];
  }
  const hasUser = tableExists(db, `"User"`);
  const rows = db.prepare(
    `
        SELECT
          ProjectWithdrawal.id,
          ProjectWithdrawal.professionalId,
          ${hasUser ? "TRIM(User.firstName || ' ' || User.lastName)" : "NULL"} AS professionalName,
          ${hasUser ? "User.email" : "NULL"} AS professionalEmail,
          ProjectWithdrawal.amount,
          ProjectWithdrawal.currency,
          ProjectWithdrawal.destinationType,
          ProjectWithdrawal.destinationLabel,
          ProjectWithdrawal.status,
          ProjectWithdrawal.note,
          ProjectWithdrawal.createdAt,
          ProjectWithdrawal.updatedAt
        FROM "ProjectWithdrawal"
        ${hasUser ? `LEFT JOIN "User" ON User.id = ProjectWithdrawal.professionalId` : ""}
        ORDER BY
          CASE ProjectWithdrawal.status
            WHEN 'PENDING' THEN 0
            WHEN 'PROCESSING' THEN 1
            WHEN 'COMPLETED' THEN 2
            ELSE 3
          END,
          datetime(ProjectWithdrawal.createdAt) DESC,
          ProjectWithdrawal.id DESC
      `
  ).all();
  return rows.map((payout) => ({
    ...payout,
    professionalName: payout.professionalName || "Unknown professional",
    professionalEmail: payout.professionalEmail || "Unknown email"
  }));
}
function getProfessionalEarningsSummaries(transactions, payouts) {
  const professionalIds = /* @__PURE__ */ new Set();
  for (const transaction of transactions) {
    if (transaction.professionalId) {
      professionalIds.add(transaction.professionalId);
    }
  }
  for (const payout of payouts) {
    professionalIds.add(payout.professionalId);
  }
  return Array.from(professionalIds).map((professionalId) => {
    const professionalTransactions = transactions.filter(
      (transaction) => transaction.professionalId === professionalId && transaction.status === "COMPLETED"
    );
    const professionalPayouts = payouts.filter(
      (payout) => payout.professionalId === professionalId
    );
    const firstTransaction = professionalTransactions[0];
    const firstPayout = professionalPayouts[0];
    const grossEarnings = professionalTransactions.reduce(
      (total, transaction) => total + transaction.grossAmount,
      0
    );
    const commissionAmount = professionalTransactions.reduce(
      (total, transaction) => total + transaction.commissionAmount,
      0
    );
    const netEarnings = professionalTransactions.reduce(
      (total, transaction) => total + transaction.netPayoutAmount,
      0
    );
    const requestedPayouts = professionalPayouts.filter((payout) => payout.status !== "REJECTED").reduce((total, payout) => total + payout.amount, 0);
    const paidPayouts = professionalPayouts.filter((payout) => payout.status === "COMPLETED").reduce((total, payout) => total + payout.amount, 0);
    const pendingPayouts = professionalPayouts.filter((payout) => payout.status === "PENDING" || payout.status === "PROCESSING").reduce((total, payout) => total + payout.amount, 0);
    const rejectedPayouts = professionalPayouts.filter((payout) => payout.status === "REJECTED").reduce((total, payout) => total + payout.amount, 0);
    return {
      professionalId,
      professionalName: firstTransaction?.professionalName || firstPayout?.professionalName || "Unknown professional",
      professionalEmail: firstTransaction?.professionalEmail || firstPayout?.professionalEmail || "Unknown email",
      grossEarnings,
      commissionAmount,
      netEarnings,
      requestedPayouts,
      paidPayouts,
      pendingPayouts,
      rejectedPayouts,
      availableBalance: Math.max(0, netEarnings - requestedPayouts),
      transactionCount: professionalTransactions.length,
      payoutCount: professionalPayouts.length,
      lastTransactionAt: professionalTransactions[0]?.dateTime || null,
      lastPayoutAt: professionalPayouts[0]?.createdAt || null
    };
  }).sort((a, b) => b.netEarnings - a.netEarnings || b.availableBalance - a.availableBalance);
}
function getCommissionAmount(amount, status) {
  if (status !== "COMPLETED") {
    return 0;
  }
  return Math.round(amount * PLATFORM_COMMISSION_RATE * 100) / 100;
}
const API_PREFIX = "/api/v1";
const email = z.string().trim().email().transform((value) => value.toLowerCase());
const registration = z.object({
  role: z.enum(["CLIENT", "PROFESSIONAL"]),
  firstName: z.string().trim().min(1).max(80),
  lastName: z.string().trim().min(1).max(80),
  email,
  phone: z.string().trim().max(30).nullable().optional(),
  password: z.string().min(8).max(128)
});
const login = z.object({ email, password: z.string().min(1).max(128) });
const profile = z.object({
  firstName: z.string().trim().min(1).max(80).optional(),
  lastName: z.string().trim().min(1).max(80).optional(),
  phone: z.string().trim().max(30).nullable().optional(),
  avatarUrl: z.string().url().nullable().optional(),
  companyName: z.string().trim().max(160).nullable().optional(),
  address: z.string().trim().max(300).nullable().optional(),
  professionalCategory: z.string().trim().max(120).nullable().optional(),
  professionalCity: z.string().trim().max(120).nullable().optional(),
  skills: z.array(z.string().trim().min(1).max(80)).max(50).optional(),
  hourlyRate: z.number().int().nonnegative().nullable().optional(),
  serviceRadiusKm: z.number().int().positive().max(1e3).nullable().optional()
});
function parse(schema, input) {
  const result = schema.safeParse(input);
  if (!result.success) throw new ApiError(422, "Validation failed.", result.error.flatten());
  return result.data;
}
function publicAccount(user) {
  if (!user) return null;
  const { id, role, firstName, lastName, email: email2, phone, avatarUrl, authProvider } = user;
  return { id, role, firstName, lastName, email: email2, phone, avatarUrl, authProvider };
}
function currentUser(request, roles) {
  const jwt = readAccessToken(request);
  const session = readSessionFromCookieHeader(request.headers.get("cookie"));
  const id = jwt?.sub ?? session?.userId;
  const user = id ? findUserById(id) : null;
  const account = user ? findUserByEmail(user.email) : null;
  if (!user || !account?.isActive) throw new ApiError(401, "Authentication required.");
  if (roles && !roles.includes(user.role))
    throw new ApiError(403, "You do not have permission to perform this action.");
  return user;
}
function match(pathname, pattern) {
  return pathname.match(pattern);
}
function now() {
  return (/* @__PURE__ */ new Date()).toISOString();
}
function escapeHtml(value) {
  return String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/'/g, "&#039;");
}
async function handleBackendApi(request) {
  const url = new URL(request.url);
  if (!url.pathname.startsWith("/api/")) return null;
  const startedAt = Date.now();
  const requestId = request.headers.get("x-request-id") || randomUUID();
  try {
    const response = await route(request, url);
    response.headers.set("x-request-id", requestId);
    console.info(
      JSON.stringify({
        level: "info",
        requestId,
        method: request.method,
        path: url.pathname,
        status: response.status,
        durationMs: Date.now() - startedAt
      })
    );
    return response;
  } catch (error) {
    return errorResponse(error, requestId);
  }
}
async function route(request, url) {
  const db = getApiDatabase();
  const method = request.method;
  const pathname = url.pathname;
  if (method === "GET" && pathname === `${API_PREFIX}/health`)
    return json({ ok: true, database: "connected", timestamp: now() });
  if (method === "POST" && pathname === `${API_PREFIX}/auth/register`) {
    const input = parse(registration, await body(request));
    if (findUserByEmail(input.email)) throw new ApiError(409, "Email is already registered.");
    const user = createUserRecord({
      ...input,
      phone: input.phone ?? null,
      passwordHash: hashPassword(input.password),
      authProvider: "LOCAL"
    });
    const verificationToken = createAccountToken(user.id, "EMAIL_VERIFY", 24 * 60);
    const verificationEmailSent = await sendAccountLink(user.email, "verify", verificationToken);
    return json(
      {
        user: publicAccount(user),
        accessToken: issueAccessToken(user),
        verificationEmailSent,
        verificationToken: void 0
      },
      201
    );
  }
  if (method === "POST" && pathname === `${API_PREFIX}/auth/login`) {
    const input = parse(login, await body(request));
    const user = findUserByEmail(input.email);
    const check = await verifyPassword(input.password, user?.passwordHash ?? null);
    if (!user || !user.isActive || !check.valid)
      throw new ApiError(401, "Invalid email or password.");
    if (check.needsUpgrade) updateUserPasswordByEmail(user.email, hashPassword(input.password));
    return json({ user: publicAccount(user), accessToken: issueAccessToken(user) });
  }
  if (method === "GET" && pathname === `${API_PREFIX}/auth/me`)
    return json(publicAccount(currentUser(request)));
  if (method === "POST" && pathname === `${API_PREFIX}/auth/verify-email`) {
    const input = parse(z.object({ token: z.string().min(20) }), await body(request));
    consumeAccountToken(
      input.token,
      "EMAIL_VERIFY",
      (userId) => db.prepare(`UPDATE "User" SET emailVerifiedAt = ?, updatedAt = ? WHERE id = ?`).run(now(), now(), userId)
    );
    return json({ verified: true });
  }
  if (method === "POST" && pathname === `${API_PREFIX}/auth/password/forgot`) {
    const input = parse(z.object({ email }), await body(request));
    const user = findUserByEmail(input.email);
    const resetToken = user ? createAccountToken(user.id, "PASSWORD_RESET", 30) : void 0;
    if (user && resetToken) await sendAccountLink(user.email, "reset", resetToken);
    return json({
      accepted: true,
      resetToken: void 0
    });
  }
  if (method === "POST" && pathname === `${API_PREFIX}/auth/password/reset`) {
    const input = parse(
      z.object({ token: z.string().min(20), password: z.string().min(8).max(128) }),
      await body(request)
    );
    consumeAccountToken(input.token, "PASSWORD_RESET", (userId) => {
      const user = findUserById(userId);
      if (!user) throw new ApiError(404, "Account not found.");
      updateUserPasswordByEmail(user.email, hashPassword(input.password));
    });
    return json({ reset: true });
  }
  if (method === "GET" && pathname === `${API_PREFIX}/profile`)
    return json(publicAccount(currentUser(request)));
  if (method === "PATCH" && pathname === `${API_PREFIX}/profile`) {
    const user = currentUser(request);
    const input = parse(profile, await body(request));
    const fields = { ...input };
    if (input.skills) {
      fields.professionalSkillsJson = JSON.stringify(input.skills);
      delete fields.skills;
    }
    const allowed = Object.entries(fields);
    if (allowed.length)
      db.prepare(
        `UPDATE "User" SET ${allowed.map(([key]) => `"${key}" = ?`).join(", ")}, "updatedAt" = ? WHERE id = ?`
      ).run(...allowed.map(([, value]) => value), now(), user.id);
    return json(publicAccount(findUserById(user.id)));
  }
  if (method === "GET" && pathname === `${API_PREFIX}/jobs`) {
    currentUser(request);
    return json(await getOpenClientJobs());
  }
  if (method === "GET" && pathname === `${API_PREFIX}/categories`) {
    return json(db.prepare(`SELECT * FROM "ServiceCategory" ORDER BY sortOrder,id`).all());
  }
  if (method === "GET" && pathname === `${API_PREFIX}/services`) {
    return json(db.prepare(`SELECT * FROM "Service" WHERE isActive=1 ORDER BY id DESC`).all());
  }
  if (method === "GET" && pathname === `${API_PREFIX}/client/jobs`) {
    const user = currentUser(request, ["CLIENT"]);
    return json(await getClientJobsByUserId(user.id));
  }
  if (method === "POST" && pathname === `${API_PREFIX}/client/jobs`) {
    const user = currentUser(request, ["CLIENT"]);
    return json(
      createClientJob(user.id, parse(clientJobSchema, await body(request))),
      201
    );
  }
  let routeMatch = match(pathname, new RegExp(`^${API_PREFIX}/client/jobs/(\\d+)$`));
  if (routeMatch && method === "GET") {
    const user = currentUser(request, ["CLIENT"]);
    const result = await getClientJobById(user.id, Number(routeMatch[1]));
    if (!result) throw new ApiError(404, "Job not found.");
    return json(result);
  }
  if (routeMatch && method === "PATCH") {
    const user = currentUser(request, ["CLIENT"]);
    const result = updateClientJob(
      user.id,
      Number(routeMatch[1]),
      parse(clientJobSchema, await body(request))
    );
    if (!result) throw new ApiError(404, "Job not found.");
    return json(result);
  }
  if (routeMatch && method === "DELETE") {
    const user = currentUser(request, ["CLIENT"]);
    if (!deleteClientJob(user.id, Number(routeMatch[1]))) throw new ApiError(404, "Job not found.");
    return json({ cancelled: true });
  }
  if (method === "GET" && pathname === `${API_PREFIX}/client/applications`) {
    const user = currentUser(request, ["CLIENT"]);
    return json(getClientProjectRequests(user.id));
  }
  if (method === "POST" && pathname === `${API_PREFIX}/client/hire`) {
    const user = currentUser(request, ["CLIENT"]);
    return json(createHireContract(user.id, await body(request)), 201);
  }
  if (method === "POST" && pathname === `${API_PREFIX}/client/reviews`) {
    const user = currentUser(request, ["CLIENT"]);
    const input = parse(
      z.object({
        trackingId: z.number().int().positive(),
        rating: z.number().int().min(1).max(5),
        comment: z.string().trim().max(2e3).optional()
      }),
      await body(request)
    );
    return json(rateCompletedProject(user.id, input), 201);
  }
  if (method === "POST" && pathname === `${API_PREFIX}/professional/applications`) {
    const user = currentUser(request, ["PROFESSIONAL"]);
    const input = parse(
      z.object({
        jobId: z.number().int().positive(),
        bidAmount: z.number().int().positive().nullable(),
        duration: z.string().trim().max(120),
        coverLetter: z.string().trim().min(20).max(4e3),
        attachments: z.array(
          z.object({
            fileName: z.string(),
            fileType: z.string().optional(),
            fileSize: z.number().optional(),
            fileUrl: z.string().optional()
          })
        ).max(10).optional()
      }),
      await body(request)
    );
    return json(createProjectRequest({ ...input, professionalId: user.id }), 201);
  }
  if (method === "POST" && pathname === `${API_PREFIX}/professional/services`) {
    const user = currentUser(request, ["PROFESSIONAL"]);
    const input = parse(
      z.object({
        categoryId: z.number().int().positive(),
        name: z.string().trim().min(2).max(160),
        description: z.string().trim().min(20).max(4e3),
        price: z.number().int().nonnegative().nullable().optional(),
        imageUrl: z.string().url().nullable().optional()
      }),
      await body(request)
    );
    const stamp = now();
    const result = db.prepare(
      `INSERT INTO "Service" (categoryId,professionalId,name,description,price,imageUrl,isActive,createdAt,updatedAt) VALUES (?,?,?,?,?,?,1,?,?)`
    ).run(
      input.categoryId,
      user.id,
      input.name,
      input.description,
      input.price ?? null,
      input.imageUrl ?? null,
      stamp,
      stamp
    );
    return json(
      db.prepare(`SELECT * FROM "Service" WHERE id=?`).get(Number(result.lastInsertRowid)),
      201
    );
  }
  if (method === "GET" && pathname === `${API_PREFIX}/professional/jobs/history`) {
    const user = currentUser(request, ["PROFESSIONAL"]);
    return json(getProfessionalProjectRequests(user.id));
  }
  if (method === "GET" && pathname === `${API_PREFIX}/professional/earnings`) {
    const user = currentUser(request, ["PROFESSIONAL"]);
    return json({
      transactions: getProfessionalTransactions(user.id),
      withdrawals: getProfessionalWithdrawals(user.id)
    });
  }
  if (method === "POST" && pathname === `${API_PREFIX}/professional/payouts`) {
    const user = currentUser(request, ["PROFESSIONAL"]);
    const input = parse(
      z.object({
        amount: z.number().int().positive(),
        destinationType: z.enum(["BANK", "UPI", "WALLET"]),
        destinationLabel: z.string().trim().min(2).max(200),
        note: z.string().trim().max(500).optional()
      }),
      await body(request)
    );
    return json(createProfessionalWithdrawalRequest(user.id, input), 201);
  }
  if (method === "GET" && pathname === `${API_PREFIX}/notifications`) {
    const user = currentUser(request);
    return json(getUserNotifications(user.id, user.role));
  }
  if (method === "POST" && pathname === `${API_PREFIX}/notifications/read`) {
    const user = currentUser(request);
    return json(markUserNotificationsRead(user.id, user.role));
  }
  if (method === "POST" && pathname === `${API_PREFIX}/notifications/browser-subscriptions`) {
    const user = currentUser(request);
    const input = parse(
      z.object({ endpoint: z.string().url(), p256dh: z.string().min(1), auth: z.string().min(1) }),
      await body(request)
    );
    db.prepare(
      `INSERT INTO "BrowserSubscription" (userId, endpoint, p256dh, auth, createdAt) VALUES (?, ?, ?, ?, ?) ON CONFLICT(endpoint) DO UPDATE SET userId=excluded.userId,p256dh=excluded.p256dh,auth=excluded.auth`
    ).run(user.id, input.endpoint, input.p256dh, input.auth, now());
    return json({ subscribed: true }, 201);
  }
  if (method === "GET" && pathname === `${API_PREFIX}/maps/address-search`) {
    currentUser(request);
    const query = z.string().trim().min(3).parse(url.searchParams.get("q"));
    const endpoint = process.env.GEOCODING_API_URL || "https://nominatim.openstreetmap.org/search";
    const response = await fetch(
      `${endpoint}?format=jsonv2&limit=8&q=${encodeURIComponent(query)}`,
      { headers: { "user-agent": process.env.GEOCODING_USER_AGENT || "Servio/1.0" } }
    );
    if (!response.ok) throw new ApiError(502, "Address provider is unavailable.");
    return json(await response.json());
  }
  if (method === "POST" && pathname === `${API_PREFIX}/maps/distance`) {
    currentUser(request);
    const input = parse(
      z.object({
        from: z.object({
          latitude: z.number().min(-90).max(90),
          longitude: z.number().min(-180).max(180)
        }),
        to: z.object({
          latitude: z.number().min(-90).max(90),
          longitude: z.number().min(-180).max(180)
        })
      }),
      await body(request)
    );
    return json({
      kilometers: haversine(
        input.from.latitude,
        input.from.longitude,
        input.to.latitude,
        input.to.longitude
      )
    });
  }
  if (method === "GET" && pathname === `${API_PREFIX}/maps/nearby-services`) {
    currentUser(request);
    const latitude = Number(url.searchParams.get("latitude"));
    const longitude = Number(url.searchParams.get("longitude"));
    const radius = Math.min(Number(url.searchParams.get("radiusKm") || 25), 500);
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude))
      throw new ApiError(422, "latitude and longitude are required.");
    const users = db.prepare(
      `SELECT id, firstName, lastName, professionalCategory, professionalCity, serviceArea, serviceRadiusKm, averageRating FROM "User" WHERE role='PROFESSIONAL' AND isActive=1 AND isVerified=1`
    ).all();
    return json({ center: { latitude, longitude }, radiusKm: radius, professionals: users });
  }
  if (method === "POST" && pathname === `${API_PREFIX}/files`) return uploadFile(request);
  routeMatch = match(pathname, new RegExp(`^${API_PREFIX}/files/(\\d+)/access$`));
  if (routeMatch && method === "GET") {
    const user = currentUser(request);
    const file = db.prepare(`SELECT * FROM "StoredFile" WHERE id=?`).get(Number(routeMatch[1]));
    if (!file || !file.isPublic && file.ownerId !== user.id && user.role !== "ADMIN")
      throw new ApiError(404, "File not found.");
    const expires = Date.now() + 3e5;
    return json({
      url: `${API_PREFIX}/files/${file.id}/content?expires=${expires}&signature=${fileSignature(file.id, expires)}`
    });
  }
  routeMatch = match(pathname, new RegExp(`^${API_PREFIX}/files/(\\d+)$`));
  if (routeMatch && method === "DELETE") {
    const user = currentUser(request);
    const id = Number(routeMatch[1]);
    const row = db.prepare(`SELECT * FROM "StoredFile" WHERE id=?`).get(id);
    if (!row) throw new ApiError(404, "File not found.");
    if (row.ownerId !== user.id && user.role !== "ADMIN") throw new ApiError(403, "Not allowed.");
    const root = path__default.resolve(process.cwd(), process.env.FILE_STORAGE_PATH || "storage");
    const target = path__default.resolve(root, row.storageKey);
    if (!target.startsWith(root)) throw new ApiError(400, "Invalid storage path.");
    try {
      await unlink(target).catch(() => {
      });
    } catch {
    }
    db.prepare(`DELETE FROM "StoredFile" WHERE id=?`).run(id);
    return json({ ok: true });
  }
  routeMatch = match(pathname, new RegExp(`^${API_PREFIX}/files/(\\d+)/content$`));
  if (routeMatch && method === "GET") return downloadFile(Number(routeMatch[1]), url);
  if (method === "GET" && pathname === `${API_PREFIX}/wallet`) {
    const user = currentUser(request);
    ensureWallet(user.id);
    const wallet = db.prepare(`SELECT * FROM "Wallet" WHERE userId=?`).get(user.id);
    const transactions = db.prepare(
      `SELECT * FROM "WalletTransaction" WHERE walletId=(SELECT id FROM "Wallet" WHERE userId=?) ORDER BY id DESC`
    ).all(user.id);
    return json({ wallet, transactions });
  }
  if (method === "POST" && pathname === `${API_PREFIX}/payments`) {
    const user = currentUser(request, ["CLIENT"]);
    const input = parse(
      z.object({
        professionalId: z.number().int().positive(),
        jobId: z.number().int().positive().optional(),
        amount: z.number().int().positive(),
        currency: z.string().length(3).optional(),
        idempotencyKey: z.string().min(8).max(100)
      }),
      await body(request)
    );
    return json(createPayment(user.id, { ...input, currency: input.currency || "USD" }), 201);
  }
  routeMatch = match(pathname, new RegExp(`^${API_PREFIX}/payments/(\\d+)/refund$`));
  if (routeMatch && method === "POST") {
    const user = currentUser(request, ["CLIENT", "ADMIN"]);
    return json(refundPayment(Number(routeMatch[1]), user));
  }
  if (method === "GET" && pathname === `${API_PREFIX}/faq`)
    return json(db.prepare(`SELECT * FROM "Faq" WHERE isPublished=1 ORDER BY sortOrder,id`).all());
  if (method === "POST" && pathname === `${API_PREFIX}/contact`) {
    const input = parse(
      z.object({
        name: z.string().trim().min(2).max(120),
        email,
        subject: z.string().trim().min(2).max(200),
        message: z.string().trim().min(10).max(5e3)
      }),
      await body(request)
    );
    const stamp = now();
    const result = db.prepare(
      `INSERT INTO "ContactRequest" (name,email,subject,message,status,createdAt,updatedAt) VALUES (?,?,?,?, 'OPEN',?,?)`
    ).run(input.name, input.email, input.subject, input.message, stamp, stamp);
    return json({ id: Number(result.lastInsertRowid), status: "OPEN" }, 201);
  }
  if (pathname.startsWith(`${API_PREFIX}/admin/`)) currentUser(request, ["ADMIN"]);
  if (method === "GET" && pathname === `${API_PREFIX}/admin/dashboard`)
    return json(getAdminDashboardSnapshot());
  if (method === "GET" && pathname === `${API_PREFIX}/admin/users`) return json(getAdminUsers());
  routeMatch = match(pathname, new RegExp(`^${API_PREFIX}/admin/users/(\\d+)/status$`));
  if (routeMatch && method === "PATCH") {
    const input = parse(z.object({ isActive: z.boolean() }), await body(request));
    return json(updateUserActiveStatusByAdmin(Number(routeMatch[1]), input.isActive));
  }
  routeMatch = match(
    pathname,
    new RegExp(`^${API_PREFIX}/admin/professionals/(\\d+)/verification$`)
  );
  if (routeMatch && method === "PATCH") {
    const input = parse(z.object({ isVerified: z.boolean() }), await body(request));
    return json(updateProfessionalVerifiedStatusByAdmin(Number(routeMatch[1]), input.isVerified));
  }
  if (method === "GET" && pathname === `${API_PREFIX}/admin/jobs`)
    return json(getAdminJobRecords());
  routeMatch = match(pathname, new RegExp(`^${API_PREFIX}/admin/jobs/(\\d+)/status$`));
  if (routeMatch && method === "PATCH") {
    const input = parse(
      z.object({ status: z.enum(["DRAFT", "OPEN", "CLOSED"]) }),
      await body(request)
    );
    const result = db.prepare(`UPDATE "ClientJob" SET status=?,updatedAt=? WHERE id=?`).run(input.status, now(), Number(routeMatch[1]));
    if (!result.changes) throw new ApiError(404, "Job not found.");
    return json({ id: Number(routeMatch[1]), status: input.status });
  }
  if (method === "GET" && pathname === `${API_PREFIX}/admin/payments`)
    return json(getAdminPaymentTransactions());
  if (method === "GET" && pathname === `${API_PREFIX}/admin/reports`)
    return json({
      dashboard: getAdminDashboardSnapshot(),
      payments: getAdminPaymentTransactions()
    });
  if (method === "GET" && pathname === `${API_PREFIX}/admin/cms`) return json(await listWebsitePages());
  routeMatch = match(pathname, new RegExp(`^${API_PREFIX}/admin/cms/([a-z0-9-]+)$`));
  if (routeMatch && method === "PATCH") {
    const input = parse(
      z.object({ content: z.string().max(5e5), status: z.enum(["DRAFT", "PUBLISHED"]) }),
      await body(request)
    );
    return json(await saveWebsitePage(routeMatch[1], input));
  }
  if (method === "GET" && pathname === `${API_PREFIX}/admin/faq`)
    return json(db.prepare(`SELECT * FROM "Faq" ORDER BY sortOrder,id`).all());
  if (method === "POST" && pathname === `${API_PREFIX}/admin/faq`) {
    const input = parse(
      z.object({
        question: z.string().min(3),
        answer: z.string().min(3),
        sortOrder: z.number().int().default(0),
        isPublished: z.boolean().default(true)
      }),
      await body(request)
    );
    const stamp = now();
    const result = db.prepare(
      `INSERT INTO "Faq" (question,answer,sortOrder,isPublished,createdAt,updatedAt) VALUES (?,?,?,?,?,?)`
    ).run(input.question, input.answer, input.sortOrder, Number(input.isPublished), stamp, stamp);
    return json({ id: Number(result.lastInsertRowid) }, 201);
  }
  if (method === "GET" && pathname === `${API_PREFIX}/admin/contact-requests`)
    return json(db.prepare(`SELECT * FROM "ContactRequest" ORDER BY id DESC`).all());
  function countRows(tableName, whereClause = "", params = []) {
    try {
      const result = db.prepare(`SELECT COUNT(*) as cnt FROM "${tableName}"${whereClause ? ` ${whereClause}` : ""}`).get(...params);
      return Number(result?.cnt ?? 0);
    } catch {
      return 0;
    }
  }
  function sumRows(tableName, columnName, whereClause = "", params = []) {
    try {
      const result = db.prepare(`SELECT COALESCE(SUM("${columnName}"), 0) as total FROM "${tableName}"${whereClause ? ` ${whereClause}` : ""}`).get(...params);
      return Number(result?.total ?? 0);
    } catch {
      return 0;
    }
  }
  function buildScopedWhere(tableName, whereClause = "", params = [], from = "", to = "") {
    const columns = getTableColumnNames(tableName);
    const clauses = [];
    const scopeParams = [...params];
    if (columns.includes("createdAt")) {
      if (from) {
        clauses.push(`"createdAt" >= ?`);
        scopeParams.push(from);
      }
      if (to) {
        clauses.push(`"createdAt" <= ?`);
        scopeParams.push(to);
      }
    }
    const baseClause = whereClause?.trim() ? whereClause.trim() : "";
    const normalizedClause = baseClause.startsWith("WHERE") ? baseClause : baseClause ? `WHERE ${baseClause}` : "";
    const combinedClause = clauses.length ? `${normalizedClause ? `${normalizedClause} AND ` : "WHERE "}${clauses.join(" AND ")}` : normalizedClause;
    return { whereClause: combinedClause, params: scopeParams };
  }
  function getTableColumnNames(tableName) {
    try {
      const cols = db.prepare(`PRAGMA table_info("${tableName}")`).all();
      return cols.map((c) => c.name);
    } catch {
      return [];
    }
  }
  function getRealDatabaseTables() {
    try {
      const tables = db.prepare(`
        SELECT name FROM sqlite_master 
        WHERE type='table' AND name NOT LIKE 'sqlite_%' AND name NOT LIKE '%_new'
        ORDER BY name ASC
      `).all();
      return tables.map((t) => t.name);
    } catch (err) {
      console.error("Failed to query database tables:", err);
      return [];
    }
  }
  function getTableRowCount(tableName) {
    try {
      const result = db.prepare(`SELECT COUNT(*) as cnt FROM "${tableName}"`).get();
      return result?.cnt ?? 0;
    } catch {
      return 0;
    }
  }
  function getTablePrimaryKey(tableName) {
    try {
      const cols = db.prepare(`PRAGMA table_info("${tableName}")`).all();
      const pkCol = cols.find((c) => c.pk === 1);
      return pkCol?.name ?? "id";
    } catch {
      return "id";
    }
  }
  const REPORT_CONFIG = {
    "User": {
      from: `"User"`,
      select: `"id", "role", "firstName", "lastName", "email", "phone", "isActive", "isVerified", "createdAt"`,
      columns: ["id", "role", "firstName", "lastName", "email", "phone", "isActive", "isVerified", "createdAt"]
    },
    "ProfessionalVerification": {
      from: `"ProfessionalVerification" v LEFT JOIN "User" u ON v.userId = u.id`,
      select: `v.*, u.firstName as professionalFirstName, u.lastName as professionalLastName, u.email as professionalEmail`,
      columns: ["id", "userId", "status", "professionalFirstName", "professionalLastName", "professionalEmail", "updatedAt"]
    },
    "verifications": {
      from: `"verifications" v LEFT JOIN "User" u ON v.userId = u.id`,
      select: `v.*, u.firstName as professionalFirstName, u.lastName as professionalLastName, u.email as professionalEmail`,
      columns: ["id", "userId", "status", "professionalFirstName", "professionalLastName", "professionalEmail", "updatedAt"]
    },
    "ClientJob": {
      from: `"ClientJob" j LEFT JOIN "User" u ON j.userId = u.id`,
      select: `j.*, u.firstName as clientFirstName, u.lastName as clientLastName, u.email as clientEmail`,
      columns: ["id", "userId", "category", "title", "status", "clientFirstName", "clientLastName", "clientEmail", "createdAt"]
    },
    "ProjectDispute": {
      from: `"ProjectDispute" d LEFT JOIN "User" u ON d.clientId = u.id`,
      select: `d.*, u.firstName as clientFirstName, u.lastName as clientLastName`,
      columns: ["id", "trackingId", "clientId", "status", "priority", "issueType", "clientFirstName", "clientLastName", "createdAt"]
    },
    "ProjectTransaction": {
      from: `"ProjectTransaction" t LEFT JOIN "User" u ON t.professionalId = u.id`,
      select: `t.*, u.firstName as professionalFirstName, u.lastName as professionalLastName`,
      columns: ["id", "trackingId", "amount", "currency", "status", "type", "professionalFirstName", "professionalLastName", "createdAt"]
    },
    "ProjectWithdrawal": {
      from: `"ProjectWithdrawal" w LEFT JOIN "User" u ON w.professionalId = u.id`,
      select: `w.*, u.firstName as professionalFirstName, u.lastName as professionalLastName`,
      columns: ["id", "professionalId", "amount", "currency", "status", "destinationType", "professionalFirstName", "professionalLastName", "createdAt"]
    },
    "ServiceCategory": {
      from: `"ServiceCategory"`,
      select: `*`,
      columns: ["id", "name", "slug", "description", "sortOrder", "createdAt"]
    }
  };
  if (method === "GET" && pathname === `${API_PREFIX}/reports/tables`) {
    try {
      const user = currentUser(request, ["ADMIN", "PROFESSIONAL", "CLIENT"]);
      const allTables = getRealDatabaseTables();
      if (allTables.length === 0) {
        return json({
          tables: [],
          status: "disconnected",
          error: "No database tables found. Database may not be initialized.",
          totalTables: 0,
          totalRecords: 0
        }, 503);
      }
      const tableLabels = {
        "User": "users",
        "ProfessionalVerification": "verification",
        "verifications": "verification",
        "ClientJob": "job",
        "ProjectDispute": "dispute",
        "ProjectTransaction": "earnings",
        "ProjectWithdrawal": "payout",
        "ServiceCategory": "categories",
        "ProjectRequest": "Applications",
        "ProjectReview": "Reviews",
        "Service": "Services",
        "Wallet": "Wallet",
        "WalletTransaction": "Transactions",
        "Notification": "Notifications",
        "ContactRequest": "Support Requests",
        "BrowserSubscription": "Push Subscriptions"
      };
      let visibleTables = allTables;
      if (user.role !== "ADMIN") {
        if (user.role === "PROFESSIONAL") {
          visibleTables = allTables.filter(
            (t) => ["ProjectRequest", "ProjectTransaction", "ProjectReview", "ContactRequest", "Wallet", "WalletTransaction", "Service"].includes(t)
          );
        } else if (user.role === "CLIENT") {
          visibleTables = allTables.filter(
            (t) => ["ClientJob", "ProjectRequest", "ProjectTransaction", "ProjectReview", "ContactRequest", "ServiceCategory", "Service"].includes(t)
          );
        }
      } else {
        const requestedTables = ["User", "ProfessionalVerification", "verifications", "ClientJob", "ProjectDispute", "ProjectTransaction", "ProjectWithdrawal", "ServiceCategory"];
        visibleTables = allTables.filter((t) => requestedTables.includes(t));
        if (visibleTables.includes("ProfessionalVerification") && visibleTables.includes("verifications")) {
          visibleTables = visibleTables.filter((t) => t !== "verifications");
        }
      }
      const tableData = visibleTables.map((t) => ({
        name: t,
        label: tableLabels[t] || t,
        rows: getTableRowCount(t),
        primaryKey: getTablePrimaryKey(t)
      }));
      const totalRecords = tableData.reduce((sum, t) => sum + t.rows, 0);
      return json({
        tables: tableData,
        status: "connected",
        totalTables: tableData.length,
        totalRecords,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error("Reports/tables error:", msg);
      return json({
        tables: [],
        status: "error",
        error: msg,
        totalTables: 0,
        totalRecords: 0
      }, 500);
    }
  }
  if (method === "GET" && pathname === `${API_PREFIX}/reports/summary`) {
    try {
      const user = currentUser(request, ["ADMIN", "PROFESSIONAL", "CLIENT"]);
      const url2 = new URL(request.url);
      const from = url2.searchParams.get("from") ?? "";
      const to = url2.searchParams.get("to") ?? "";
      const scope = from || to ? { from, to } : null;
      if (user.role === "ADMIN") {
        const dashboard = getAdminDashboardSnapshot();
        const userScope = buildScopedWhere("User", "", [], from, to);
        const clientsScope = buildScopedWhere("User", `"role" = 'CLIENT'`, [], from, to);
        const professionalsScope = buildScopedWhere("User", `"role" = 'PROFESSIONAL'`, [], from, to);
        const jobsScope = buildScopedWhere("ClientJob", "", [], from, to);
        const applicationsScope = buildScopedWhere("ProjectRequest", "", [], from, to);
        const paymentsScope = buildScopedWhere("ProjectTransaction", "", [], from, to);
        const reviewsScope = buildScopedWhere("ProjectReview", "", [], from, to);
        const disputesScope = buildScopedWhere("ProjectDispute", "", [], from, to);
        const categoriesScope = buildScopedWhere("ServiceCategory", "", [], from, to);
        const cards2 = [
          { title: "Total Users", value: countRows("User", userScope.whereClause, userScope.params), subtitle: "All active and inactive accounts", icon: "Users" },
          { title: "Total Clients", value: countRows("User", clientsScope.whereClause, clientsScope.params), subtitle: "Users with client access", icon: "Building2" },
          { title: "Total Professionals", value: countRows("User", professionalsScope.whereClause, professionalsScope.params), subtitle: "Verified service providers", icon: "BriefcaseBusiness" },
          { title: "Total Jobs", value: countRows("ClientJob", jobsScope.whereClause, jobsScope.params), subtitle: "Current job pool", icon: "BriefcaseBusiness" },
          { title: "Total Applications", value: countRows("ProjectRequest", applicationsScope.whereClause, applicationsScope.params), subtitle: "Received proposals", icon: "FileText" },
          { title: "Total Payments", value: countRows("ProjectTransaction", paymentsScope.whereClause, paymentsScope.params), subtitle: "Recorded payments", icon: "ReceiptText" },
          { title: "Total Earnings", value: sumRows("ProjectTransaction", "amount", paymentsScope.whereClause, paymentsScope.params), subtitle: "Gross payment volume", icon: "DollarSign" },
          { title: "Total Disputes", value: countRows("ProjectDispute", disputesScope.whereClause, disputesScope.params), subtitle: "Open and resolved cases", icon: "AlertTriangle" },
          { title: "Total Reviews", value: countRows("ProjectReview", reviewsScope.whereClause, reviewsScope.params), subtitle: "Client and professional feedback", icon: "Star" },
          { title: "Total Categories", value: countRows("ServiceCategory", categoriesScope.whereClause, categoriesScope.params), subtitle: "Service categories", icon: "Tag" }
        ];
        const monthlyUsersSeries = db.prepare(`SELECT strftime('%Y-%m', datetime(createdAt)) as month, COUNT(*) as count FROM "User"${userScope.whereClause ? ` ${userScope.whereClause}` : ""} GROUP BY strftime('%Y-%m', datetime(createdAt)) ORDER BY month DESC LIMIT 6`).all(...userScope.params);
        const monthlyEarningsSeries = db.prepare(`SELECT strftime('%Y-%m', datetime(createdAt)) as month, COALESCE(SUM(amount),0) as total FROM "ProjectTransaction"${paymentsScope.whereClause ? ` ${paymentsScope.whereClause}` : ""} GROUP BY strftime('%Y-%m', datetime(createdAt)) ORDER BY month DESC LIMIT 6`).all(...paymentsScope.params);
        const jobsByStatusSeries = [
          { name: "Open", value: countRows("ClientJob", buildScopedWhere("ClientJob", `WHERE "status" = 'OPEN'`, [], from, to).whereClause, buildScopedWhere("ClientJob", `WHERE "status" = 'OPEN'`, [], from, to).params) },
          { name: "Draft", value: countRows("ClientJob", buildScopedWhere("ClientJob", `WHERE "status" = 'DRAFT'`, [], from, to).whereClause, buildScopedWhere("ClientJob", `WHERE "status" = 'DRAFT'`, [], from, to).params) },
          { name: "Closed", value: countRows("ClientJob", buildScopedWhere("ClientJob", `WHERE "status" = 'CLOSED'`, [], from, to).whereClause, buildScopedWhere("ClientJob", `WHERE "status" = 'CLOSED'`, [], from, to).params) }
        ];
        const paymentsByStatusSeries = [
          { name: "Completed", value: countRows("ProjectTransaction", buildScopedWhere("ProjectTransaction", `WHERE "status" = 'COMPLETED'`, [], from, to).whereClause, buildScopedWhere("ProjectTransaction", `WHERE "status" = 'COMPLETED'`, [], from, to).params) },
          { name: "Pending", value: countRows("ProjectTransaction", buildScopedWhere("ProjectTransaction", `WHERE "status" = 'PENDING'`, [], from, to).whereClause, buildScopedWhere("ProjectTransaction", `WHERE "status" = 'PENDING'`, [], from, to).params) },
          { name: "Refunded", value: countRows("ProjectTransaction", buildScopedWhere("ProjectTransaction", `WHERE "status" = 'REFUNDED'`, [], from, to).whereClause, buildScopedWhere("ProjectTransaction", `WHERE "status" = 'REFUNDED'`, [], from, to).params) }
        ];
        const categorySeries = db.prepare(`SELECT "name" as name, COUNT(*) as count FROM "ServiceCategory"${categoriesScope.whereClause ? ` ${categoriesScope.whereClause}` : ""} GROUP BY "name" ORDER BY count DESC LIMIT 6`).all(...categoriesScope.params);
        return json({
          role: user.role,
          cards: cards2,
          charts: {
            monthlyUsers: monthlyUsersSeries.reverse().map((entry) => ({ name: entry.month, value: entry.count })),
            monthlyEarnings: monthlyEarningsSeries.reverse().map((entry) => ({ name: entry.month, value: entry.total })),
            jobsByStatus: jobsByStatusSeries,
            paymentsByStatus: paymentsByStatusSeries,
            categoryDistribution: categorySeries.map((entry) => ({ name: entry.name, value: entry.count }))
          },
          scope,
          generatedAt: (/* @__PURE__ */ new Date()).toISOString()
        });
      }
      if (user.role === "PROFESSIONAL") {
        const professionalId = user.id;
        const applications = countRows("ProjectRequest", `WHERE "professionalId" = ?`, [professionalId]);
        const activeJobs2 = countRows("ProjectTracking", `WHERE "professionalId" = ? AND "status" = 'ACTIVE'`, [professionalId]);
        const completedJobs2 = countRows("ProjectTracking", `WHERE "professionalId" = ? AND "status" = 'COMPLETED'`, [professionalId]);
        const pendingApplications = countRows("ProjectRequest", `WHERE "professionalId" = ? AND "status" = 'PENDING'`, [professionalId]);
        const reviews2 = countRows("ProjectReview", `WHERE "professionalId" = ?`, [professionalId]);
        const withdrawals = countRows("ProjectWithdrawal", `WHERE "professionalId" = ?`, [professionalId]);
        const earnings = sumRows("ProjectTransaction", "amount", `WHERE "professionalId" = ? AND "status" = 'COMPLETED'`, [professionalId]);
        const monthlySeries2 = db.prepare(`SELECT strftime('%Y-%m', datetime(createdAt)) as month, COALESCE(SUM(amount), 0) as total FROM "ProjectTransaction" WHERE "professionalId" = ? AND "status" = 'COMPLETED' GROUP BY strftime('%Y-%m', datetime(createdAt)) ORDER BY month DESC LIMIT 6`).all(professionalId);
        const cards2 = [
          { title: "My Earnings", value: earnings, subtitle: "Completed payments", icon: "DollarSign" },
          { title: "Completed Jobs", value: completedJobs2, subtitle: "Finished projects", icon: "CheckCircle2" },
          { title: "Active Jobs", value: activeJobs2, subtitle: "In progress", icon: "BriefcaseBusiness" },
          { title: "Pending Jobs", value: pendingApplications, subtitle: "Open applications", icon: "Clock3" },
          { title: "Applications", value: applications, subtitle: "Sent proposals", icon: "FileText" },
          { title: "Reviews", value: reviews2, subtitle: "Feedback received", icon: "Star" },
          { title: "Wallet History", value: withdrawals, subtitle: "Withdrawals recorded", icon: "Wallet" },
          { title: "Withdraw History", value: withdrawals, subtitle: "Past payout requests", icon: "Wallet" }
        ];
        return json({
          role: user.role,
          cards: cards2,
          charts: {
            monthlyEarnings: monthlySeries2.reverse().map((entry) => ({ name: entry.month, value: entry.total })),
            applicationsByStatus: [
              { name: "Pending", value: pendingApplications },
              { name: "Accepted", value: countRows("ProjectRequest", `WHERE "professionalId" = ? AND "status" = 'ACCEPTED'`, [professionalId]) },
              { name: "Declined", value: countRows("ProjectRequest", `WHERE "professionalId" = ? AND "status" = 'DECLINED'`, [professionalId]) }
            ]
          },
          scope,
          generatedAt: (/* @__PURE__ */ new Date()).toISOString()
        });
      }
      const clientId = user.id;
      const jobsPosted = countRows("ClientJob", `WHERE "userId" = ?`, [clientId]);
      const activeJobs = countRows("ClientJob", `WHERE "userId" = ? AND "status" = 'OPEN'`, [clientId]);
      const completedJobs = countRows("ClientJob", `WHERE "userId" = ? AND "status" = 'CLOSED'`, [clientId]);
      const cancelledJobs = countRows("ClientJob", `WHERE "userId" = ? AND "status" = 'CANCELLED'`, [clientId]);
      const totalSpending = sumRows("ProjectTransaction", "amount", `WHERE "clientId" = ? AND "status" = 'COMPLETED'`, [clientId]);
      const payments = countRows("ProjectTransaction", `WHERE "clientId" = ?`, [clientId]);
      const hiredProfessionals = countRows("ProjectTracking", `WHERE "clientId" = ?`, [clientId]);
      const reviews = countRows("ProjectReview", `WHERE "clientId" = ?`, [clientId]);
      const monthlySeries = db.prepare(`SELECT strftime('%Y-%m', datetime(createdAt)) as month, COALESCE(SUM(amount), 0) as total FROM "ProjectTransaction" WHERE "clientId" = ? AND "status" = 'COMPLETED' GROUP BY strftime('%Y-%m', datetime(createdAt)) ORDER BY month DESC LIMIT 6`).all(clientId);
      const cards = [
        { title: "Jobs Posted", value: jobsPosted, subtitle: "Your posted work", icon: "BriefcaseBusiness" },
        { title: "Active Jobs", value: activeJobs, subtitle: "Currently open", icon: "Clock3" },
        { title: "Completed Jobs", value: completedJobs, subtitle: "Finished work", icon: "CheckCircle2" },
        { title: "Cancelled Jobs", value: cancelledJobs, subtitle: "Closed without completion", icon: "AlertTriangle" },
        { title: "Total Spending", value: totalSpending, subtitle: "Committed payment volume", icon: "DollarSign" },
        { title: "Payments", value: payments, subtitle: "Transactions recorded", icon: "ReceiptText" },
        { title: "Hired Professionals", value: hiredProfessionals, subtitle: "Engaged service providers", icon: "Users" },
        { title: "Reviews Given", value: reviews, subtitle: "Feedback posted", icon: "Star" }
      ];
      return json({
        role: user.role,
        cards,
        charts: {
          monthlySpending: monthlySeries.reverse().map((entry) => ({ name: entry.month, value: entry.total })),
          jobsByStatus: [
            { name: "Open", value: activeJobs },
            { name: "Closed", value: completedJobs },
            { name: "Cancelled", value: cancelledJobs }
          ]
        },
        scope,
        generatedAt: (/* @__PURE__ */ new Date()).toISOString()
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error("Reports/summary error:", msg);
      return json({ role: "ADMIN", cards: [], charts: { monthlyUsers: [], jobsByStatus: [] }, scope: null, generatedAt: (/* @__PURE__ */ new Date()).toISOString(), error: msg }, 500);
    }
  }
  function buildReportWhereClause(user, table, colNames, filters) {
    const where = [];
    const params = [];
    if (user.role === "PROFESSIONAL") {
      if (table === "User" || table === "users") {
        where.push(`"id" = ?`);
        params.push(user.id);
      } else if (colNames.includes("professionalId")) {
        where.push(`"professionalId" = ?`);
        params.push(user.id);
      } else if (colNames.includes("reviewedBy") && table.toLowerCase().includes("review")) {
        where.push(`("createdBy" = ? OR "reviewedBy" = ?)`);
        params.push(user.id, user.id);
      } else if (colNames.includes("userId")) {
        where.push(`"userId" = ?`);
        params.push(user.id);
      }
    } else if (user.role === "CLIENT") {
      if (table === "User" || table === "users") {
        where.push(`"id" = ?`);
        params.push(user.id);
      } else if (colNames.includes("clientId")) {
        where.push(`"clientId" = ?`);
        params.push(user.id);
      } else if (colNames.includes("userId")) {
        where.push(`"userId" = ?`);
        params.push(user.id);
      }
    }
    if (filters.po) {
      const poCols = colNames.filter(
        (c) => ["trackingId", "requestId", "orderId", "reference", "poNumber", "tracking_id"].includes(c)
      );
      if (poCols.length > 0) {
        const poClause = poCols.map((c) => `"${c}" = ?`).join(" OR ");
        where.push(`(${poClause})`);
        for (let i = 0; i < poCols.length; i++) params.push(filters.po);
      }
    }
    const dateCol = colNames.includes("createdAt") ? "createdAt" : colNames.includes("updatedAt") ? "updatedAt" : null;
    if (dateCol) {
      if (filters.from && String(filters.from).trim()) {
        where.push(`datetime("${dateCol}") >= datetime(?)`);
        params.push(filters.from);
      }
      if (filters.to && String(filters.to).trim()) {
        where.push(`datetime("${dateCol}") <= datetime(?)`);
        params.push(filters.to);
      }
    }
    const statusVal = String(filters.status || filters.jobStatus || filters.paymentStatus || "").trim();
    if (statusVal) {
      const statusCol = colNames.includes("status") ? "status" : colNames.includes("jobStatus") ? "jobStatus" : colNames.includes("paymentStatus") ? "paymentStatus" : null;
      if (statusCol) {
        where.push(`"${statusCol}" = ?`);
        params.push(statusVal);
      }
    }
    if (filters.category && String(filters.category).trim() && colNames.includes("category")) {
      where.push(`"category" = ?`);
      params.push(filters.category);
    }
    if (filters.userType && String(filters.userType).trim() && colNames.includes("role")) {
      where.push(`"role" = ?`);
      params.push(filters.userType);
    }
    if (filters.id && colNames.includes("id")) {
      where.push(`"id" = ?`);
      params.push(filters.id);
    }
    if (filters.search && String(filters.search).trim()) {
      const searchCols = colNames.filter(
        (c) => !["id", "createdAt", "updatedAt", "passwordHash", "googleId", "password_hash"].includes(c)
      );
      if (searchCols.length > 0) {
        const likeClause = searchCols.map((c) => `"${c}" LIKE ?`).join(" OR ");
        where.push(`(${likeClause})`);
        const searchTerm = `%${String(filters.search).trim()}%`;
        for (let i = 0; i < searchCols.length; i++) params.push(searchTerm);
      }
    }
    return {
      whereSql: where.length ? `WHERE ${where.join(" AND ")}` : "",
      params
    };
  }
  if (method === "POST" && pathname === `${API_PREFIX}/reports/preview`) {
    try {
      const user = currentUser(request, ["ADMIN", "PROFESSIONAL", "CLIENT"]);
      const payload = parse(
        z.object({
          table: z.string(),
          page: z.number().int().min(1).default(1),
          pageSize: z.number().int().min(1).max(1e3).default(50),
          filters: z.record(z.any()).optional()
        }),
        await body(request)
      );
      const table = String(payload.table);
      const allTables = getRealDatabaseTables();
      let querySource = `"${table}"`;
      let selectClause = "*";
      let colNames = [];
      const config = user.role === "ADMIN" ? REPORT_CONFIG[table] : null;
      if (config && (allTables.includes(table) || table === "ProfessionalVerification" && allTables.includes("verifications") || table === "verifications" && allTables.includes("ProfessionalVerification"))) {
        let actualTable = table;
        if (table === "ProfessionalVerification" && !allTables.includes(table) && allTables.includes("verifications")) {
          actualTable = "verifications";
        } else if (table === "verifications" && !allTables.includes(table) && allTables.includes("ProfessionalVerification")) {
          actualTable = "ProfessionalVerification";
        }
        const actualConfig = REPORT_CONFIG[actualTable] || config;
        querySource = actualConfig.from;
        selectClause = actualConfig.select;
        colNames = actualConfig.columns;
      } else {
        if (!allTables.includes(table)) {
          throw new ApiError(404, `Table "${table}" not found.`);
        }
        const cols = db.prepare(`PRAGMA table_info("${table}")`).all();
        colNames = cols.map((c) => c.name);
        querySource = `"${table}"`;
      }
      const { whereSql, params } = buildReportWhereClause(user, table, colNames, payload.filters || {});
      const totalRow = db.prepare(`SELECT COUNT(*) as cnt FROM ${querySource} ${whereSql}`).get(...params);
      const total = Number(totalRow?.cnt ?? 0);
      const page = Number(payload.page || 1);
      const pageSize = Number(payload.pageSize || 50);
      const offset = (page - 1) * pageSize;
      const orderByCol = colNames.includes("id") ? "id" : colNames[0];
      const rows = db.prepare(`SELECT ${selectClause} FROM ${querySource} ${whereSql} ORDER BY "${orderByCol}" DESC LIMIT ? OFFSET ?`).all(...params, pageSize, offset);
      return json({
        columns: colNames,
        rows,
        total,
        page,
        pageSize,
        status: "success"
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error("Reports/preview error:", msg);
      if (err instanceof ApiError) throw err;
      throw new ApiError(500, msg);
    }
  }
  if (method === "POST" && pathname === `${API_PREFIX}/reports/download`) {
    try {
      const user = currentUser(request, ["ADMIN", "PROFESSIONAL", "CLIENT"]);
      const payload = parse(
        z.object({
          table: z.string(),
          format: z.enum(["CSV", "JSON", "PDF", "EXCEL"]).default("PDF"),
          filters: z.record(z.any()).optional(),
          reportName: z.string().optional()
        }),
        await body(request)
      );
      const table = String(payload.table);
      const allTables = getRealDatabaseTables();
      let querySource = `"${table}"`;
      let selectClause = "*";
      let colNames = [];
      const config = user.role === "ADMIN" ? REPORT_CONFIG[table] : null;
      if (config && (allTables.includes(table) || table === "ProfessionalVerification" && allTables.includes("verifications") || table === "verifications" && allTables.includes("ProfessionalVerification"))) {
        let actualTable = table;
        if (table === "ProfessionalVerification" && !allTables.includes(table) && allTables.includes("verifications")) {
          actualTable = "verifications";
        } else if (table === "verifications" && !allTables.includes(table) && allTables.includes("ProfessionalVerification")) {
          actualTable = "ProfessionalVerification";
        }
        const actualConfig = REPORT_CONFIG[actualTable] || config;
        querySource = actualConfig.from;
        selectClause = actualConfig.select;
        colNames = actualConfig.columns;
      } else {
        if (!allTables.includes(table)) {
          throw new ApiError(404, `Table "${table}" not found.`);
        }
        const cols = db.prepare(`PRAGMA table_info("${table}")`).all();
        colNames = cols.map((c) => c.name);
        querySource = `"${table}"`;
      }
      const filters = payload.filters || {};
      const { whereSql, params } = buildReportWhereClause(user, table, colNames, filters);
      const orderByCol = colNames.includes("id") ? "id" : colNames[0];
      const rows = db.prepare(`SELECT ${selectClause} FROM ${querySource} ${whereSql} ORDER BY "${orderByCol}" DESC`).all(...params);
      if (payload.format === "JSON") {
        const bodyOut = JSON.stringify({ columns: colNames, rows });
        return new Response(bodyOut, { headers: { "content-type": "application/json", "content-disposition": `attachment; filename="${(payload.reportName || table).replace(/[^a-z0-9.-]/gi, "_")}.json"` } });
      }
      if (payload.format === "CSV" || payload.format === "EXCEL") {
        const escape = (v) => {
          const s = String(v ?? "");
          if (s.includes('"') || s.includes(",") || s.includes("\n")) return `"${s.replace(/"/g, '""')}"`;
          return s;
        };
        const header = colNames.join(",");
        const lines = [header];
        for (const r of rows) lines.push(colNames.map((c) => escape(r[c])).join(","));
        const csv = lines.join("\n");
        const contentType = payload.format === "EXCEL" ? "application/vnd.ms-excel" : "text/csv";
        const extension = payload.format === "EXCEL" ? "xls" : "csv";
        return new Response(csv, { headers: { "content-type": contentType, "content-disposition": `attachment; filename="${(payload.reportName || table).replace(/[^a-z0-9.-]/gi, "_")}.${extension}"` } });
      }
      try {
        const title = payload.reportName || table;
        const generationDate = (/* @__PURE__ */ new Date()).toLocaleString();
        const filtersUsed = Object.entries(filters).filter(([_, v]) => v !== void 0 && v !== "" && v !== null).map(([k, v]) => `<li><strong>${k}:</strong> ${v}</li>`).join("");
        const pdfRows = rows.slice(0, 5e3);
        const isTruncated = rows.length > 5e3;
        const html = `
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(title)}</title>
  <style>
    @page { margin: 2cm; @bottom-right { content: "Page " counter(page) " of " counter(pages); } }
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #334155; line-height: 1.5; margin: 0; padding: 0; }
    .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #3b82f6; padding-bottom: 20px; margin-bottom: 30px; }
    .logo-container { display: flex; align-items: center; gap: 10px; }
    .logo-icon { width: 36px; height: 36px; background-color: #3b82f6; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; }
    .logo-text { font-size: 24px; font-weight: 700; color: #1e293b; }
    .report-info { text-align: right; }
    .report-info h1 { margin: 0; color: #1e293b; font-size: 20px; }
    .report-info p { margin: 5px 0 0; font-size: 12px; color: #64748b; }

    .summary-section { background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin-bottom: 30px; }
    .summary-section h2 { margin-top: 0; font-size: 16px; color: #1e293b; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px; }
    .filter-list { list-style: none; padding: 0; margin: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 13px; }
    .warning { color: #854d0e; background-color: #fefce8; border: 1px solid #fef08a; padding: 10px; border-radius: 6px; font-size: 12px; margin-bottom: 20px; }

    table { width: 100%; border-collapse: collapse; margin-top: 20px; table-layout: auto; }
    th { background-color: #3b82f6; color: white; text-align: left; padding: 12px 8px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; border: 1px solid #2563eb; }
    td { padding: 10px 8px; font-size: 11px; border: 1px solid #e2e8f0; word-break: break-word; }
    tr:nth-child(even) { background-color: #f1f5f9; }

    .footer { position: fixed; bottom: 0; width: 100%; text-align: center; font-size: 10px; color: #94a3b8; padding: 10px 0; border-top: 1px solid #e2e8f0; }
    .page-number:before { content: "Page " counter(page); }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo-container">
      <div class="logo-icon">S</div>
      <div class="logo-text">Servio</div>
    </div>
    <div class="report-info">
      <h1>${escapeHtml(title)} Report</h1>
      <p>Generated on ${generationDate}</p>
      <p>Generated by: ${escapeHtml(String(user.firstName || user.email || "Admin"))}</p>
    </div>
  </div>

  ${isTruncated ? '<div class="warning"><strong>Notice:</strong> This PDF contains the first 5,000 records. For the full dataset, please use CSV or Excel export.</div>' : ""}

  <div class="summary-section">
    <h2>Report Details</h2>
    <ul class="filter-list">
      <li><strong>Total Records:</strong> ${rows.length}</li>
      <li><strong>Status:</strong> All Data</li>
      ${filtersUsed || "<li><strong>Filters:</strong> None applied</li>"}
    </ul>
  </div>

  <table>
    <thead>
      <tr>
        ${colNames.map((c) => `<th>${escapeHtml(c)}</th>`).join("")}
      </tr>
    </thead>
    <tbody>
      ${pdfRows.map((r) => `
        <tr>
          ${colNames.map((c) => `<td>${escapeHtml(String(r[c] ?? "-"))}</td>`).join("")}
        </tr>
      `).join("")}
    </tbody>
  </table>

  <div class="footer">
    <p>&copy; ${(/* @__PURE__ */ new Date()).getFullYear()} Servio Professional Gateway. All rights reserved. | Confidental Business Report</p>
  </div>
</body>
</html>`;
        if (process.env.VERCEL) {
          throw new ApiError(500, "PDF generation is currently disabled in the Vercel environment to prevent build hangs. Use a remote browser service for production PDF generation.");
        }
        const puppeteer = await import("puppeteer");
        const browser = await puppeteer.launch({ args: ["--no-sandbox", "--disable-setuid-sandbox"] });
        const pageP = await browser.newPage();
        await pageP.setContent(html, { waitUntil: "networkidle0" });
        const pdfBuffer = await pageP.pdf({
          format: "A4",
          printBackground: true,
          margin: { top: "20px", bottom: "60px", left: "20px", right: "20px" },
          displayHeaderFooter: true,
          headerTemplate: "<div></div>",
          footerTemplate: '<div style="font-size: 10px; width: 100%; text-align: center; color: #94a3b8;">Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>'
        });
        await browser.close();
        if (!Buffer.isBuffer(pdfBuffer) || pdfBuffer.length === 0) throw new ApiError(500, "PDF generation failed (empty)");
        return new Response(new Uint8Array(pdfBuffer), { headers: { "content-type": "application/pdf", "content-disposition": `attachment; filename="${(payload.reportName || table).replace(/[^a-z0-9.-]/gi, "_")}.pdf"` } });
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        throw new ApiError(500, `Failed to generate PDF. ${msg}`);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error("Reports/download error:", msg);
      if (err instanceof ApiError) throw err;
      throw new ApiError(500, msg);
    }
  }
  if (method === "GET" && pathname === `${API_PREFIX}/reports/history`) {
    currentUser(request, ["ADMIN"]);
    const rows = db.prepare(`SELECT id,fileName,mimeType,sizeBytes,createdAt,ownerId FROM "StoredFile" WHERE purpose='report' ORDER BY createdAt DESC LIMIT 200`).all();
    return json(rows.map((r) => ({ id: r.id, fileName: r.fileName, mimeType: r.mimeType, fileSize: r.sizeBytes, generatedAt: r.createdAt, ownerId: r.ownerId })));
  }
  routeMatch = match(pathname, new RegExp(`^${API_PREFIX}/reports/history/(\\d+)$`));
  if (routeMatch && method === "DELETE") {
    const user = currentUser(request, ["ADMIN"]);
    const id = Number(routeMatch[1]);
    const row = db.prepare(`SELECT * FROM "StoredFile" WHERE id=? AND purpose='report'`).get(id);
    if (!row) throw new ApiError(404, "Report not found");
    if (row.ownerId !== user.id && user.role !== "ADMIN") throw new ApiError(403, "Not allowed");
    const root = path__default.resolve(process.cwd(), process.env.FILE_STORAGE_PATH || "storage");
    const target = path__default.resolve(root, row.storageKey);
    try {
      await import("node:fs").then((m) => m.unlinkSync(target));
    } catch {
    }
    db.prepare(`DELETE FROM "StoredFile" WHERE id=?`).run(id);
    return json({ ok: true });
  }
  throw new ApiError(404, "API route not found.");
}
function createAccountToken(userId, kind, minutes) {
  const db = getApiDatabase();
  const token = opaqueToken();
  db.prepare(`DELETE FROM "ApiToken" WHERE userId=? AND kind=?`).run(userId, kind);
  db.prepare(
    `INSERT INTO "ApiToken" (userId,tokenHash,kind,expiresAt,createdAt) VALUES (?,?,?,?,?)`
  ).run(
    userId,
    tokenHash(token),
    kind,
    new Date(Date.now() + minutes * 6e4).toISOString(),
    now()
  );
  return token;
}
function consumeAccountToken(token, kind, action) {
  const db = getApiDatabase();
  const row = db.prepare(
    `SELECT * FROM "ApiToken" WHERE tokenHash=? AND kind=? AND usedAt IS NULL AND expiresAt>?`
  ).get(tokenHash(token), kind, now());
  if (!row) throw new ApiError(400, "Token is invalid or expired.");
  db.transaction(() => {
    action(row.userId);
    db.prepare(`UPDATE "ApiToken" SET usedAt=? WHERE id=?`).run(now(), row.id);
  })();
}
function haversine(a, b, c, d) {
  const r = 6371, toRad = (v) => v * Math.PI / 180;
  const x = toRad(c - a), y = toRad(d - b);
  const q = Math.sin(x / 2) ** 2 + Math.cos(toRad(a)) * Math.cos(toRad(c)) * Math.sin(y / 2) ** 2;
  return Math.round(r * 2 * Math.atan2(Math.sqrt(q), Math.sqrt(1 - q)) * 100) / 100;
}
async function uploadFile(request) {
  const user = currentUser(request);
  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) throw new ApiError(422, "A file field is required.");
  const max = Number(process.env.MAX_UPLOAD_BYTES || 10 * 1024 * 1024);
  if (file.size > max) throw new ApiError(413, "File is too large.");
  const allowed = (process.env.ALLOWED_UPLOAD_TYPES || "image/jpeg,image/png,image/webp,application/pdf").split(",");
  if (!allowed.includes(file.type)) throw new ApiError(415, "File type is not allowed.");
  const key = `${user.id}/${randomUUID()}${path__default.extname(file.name).toLowerCase()}`;
  const root = path__default.resolve(process.cwd(), process.env.FILE_STORAGE_PATH || "storage");
  const target = path__default.resolve(root, key);
  if (!target.startsWith(root)) throw new ApiError(400, "Invalid storage path.");
  await mkdir(path__default.dirname(target), { recursive: true });
  await writeFile(target, Buffer.from(await file.arrayBuffer()));
  const db = getApiDatabase(), stamp = now();
  const result = db.prepare(
    `INSERT INTO "StoredFile" (ownerId,purpose,fileName,mimeType,sizeBytes,storageKey,isPublic,createdAt) VALUES (?,?,?,?,?,?,?,?)`
  ).run(
    user.id,
    String(form.get("purpose") || "document"),
    file.name,
    file.type,
    file.size,
    key,
    form.get("public") === "true" ? 1 : 0,
    stamp
  );
  return json(
    {
      id: Number(result.lastInsertRowid),
      fileName: file.name,
      mimeType: file.type,
      sizeBytes: file.size
    },
    201
  );
}
function fileSecret() {
  return process.env.FILE_SIGNING_SECRET || process.env.AUTH_SECRET || "dev-file-secret";
}
function fileSignature(id, expires) {
  return createHmac("sha256", fileSecret()).update(`${id}:${expires}`).digest("base64url");
}
async function downloadFile(id, url) {
  const db = getApiDatabase();
  const file = db.prepare(`SELECT * FROM "StoredFile" WHERE id=?`).get(id);
  if (!file) throw new ApiError(404, "File not found.");
  if (!file.isPublic) {
    const expires = Number(url.searchParams.get("expires")), provided = Buffer.from(url.searchParams.get("signature") || ""), expected = Buffer.from(fileSignature(id, expires));
    if (expires < Date.now() || provided.length !== expected.length || !timingSafeEqual(provided, expected))
      throw new ApiError(403, "File access link is invalid or expired.");
  }
  const root = path__default.resolve(process.cwd(), process.env.FILE_STORAGE_PATH || "storage");
  return new Response(await readFile(path__default.resolve(root, file.storageKey)), {
    headers: {
      "content-type": file.mimeType,
      // Force download so browsers don't try to render HTML inline
      "content-disposition": `attachment; filename="${file.fileName.replace(/[\r\n\"]/g, "")}"`
    }
  });
}
function ensureWallet(userId) {
  getApiDatabase().prepare(
    `INSERT OR IGNORE INTO "Wallet" (userId,currency,balance,pendingBalance,updatedAt) VALUES (?,'USD',0,0,?)`
  ).run(userId, now());
}
function createPayment(clientId, input) {
  const db = getApiDatabase();
  const existing = db.prepare(`SELECT * FROM "Payment" WHERE idempotencyKey=?`).get(input.idempotencyKey);
  if (existing) return existing;
  const commission = Math.round(input.amount * Number(process.env.PLATFORM_COMMISSION_RATE || 0.1)), stamp = now();
  return db.transaction(() => {
    ensureWallet(input.professionalId);
    const result = db.prepare(
      `INSERT INTO "Payment" (clientId,professionalId,jobId,amount,commissionAmount,currency,provider,status,idempotencyKey,createdAt,updatedAt) VALUES (?,?,?,?,?,?,'WALLET','COMPLETED',?,?,?)`
    ).run(
      clientId,
      input.professionalId,
      input.jobId ?? null,
      input.amount,
      commission,
      input.currency,
      input.idempotencyKey,
      stamp,
      stamp
    );
    const paymentId = Number(result.lastInsertRowid);
    const wallet = db.prepare(`SELECT id FROM "Wallet" WHERE userId=?`).get(input.professionalId);
    const net = input.amount - commission;
    db.prepare(`UPDATE "Wallet" SET balance=balance+?,updatedAt=? WHERE id=?`).run(
      net,
      stamp,
      wallet.id
    );
    db.prepare(
      `INSERT INTO "WalletTransaction" (walletId,paymentId,type,amount,status,description,createdAt) VALUES (?,?,'CREDIT',?,'COMPLETED','Service payment',?)`
    ).run(wallet.id, paymentId, net, stamp);
    return db.prepare(`SELECT * FROM "Payment" WHERE id=?`).get(paymentId);
  })();
}
function refundPayment(id, user) {
  const db = getApiDatabase();
  const payment = db.prepare(`SELECT * FROM "Payment" WHERE id=?`).get(id);
  if (!payment || user.role !== "ADMIN" && payment.clientId !== user.id)
    throw new ApiError(404, "Payment not found.");
  if (payment.status !== "COMPLETED")
    throw new ApiError(409, "Only completed payments can be refunded.");
  return db.transaction(() => {
    ensureWallet(payment.professionalId);
    const net = payment.amount - payment.commissionAmount;
    const wallet = db.prepare(`SELECT id,balance FROM "Wallet" WHERE userId=?`).get(payment.professionalId);
    if (wallet.balance < net)
      throw new ApiError(409, "Professional wallet has insufficient funds for this refund.");
    db.prepare(`UPDATE "Wallet" SET balance=balance-?,updatedAt=? WHERE id=?`).run(
      net,
      now(),
      wallet.id
    );
    db.prepare(`UPDATE "Payment" SET status='REFUNDED',updatedAt=? WHERE id=?`).run(now(), id);
    db.prepare(
      `INSERT INTO "WalletTransaction" (walletId,paymentId,type,amount,status,description,createdAt) VALUES (?,?,'DEBIT',?,'COMPLETED','Payment refund',?)`
    ).run(wallet.id, id, -net, now());
    return db.prepare(`SELECT * FROM "Payment" WHERE id=?`).get(id);
  })();
}
function getCurrentUser() {
  const request = getRequest();
  const session = readSessionFromCookieHeader(request.headers.get("cookie"));
  if (!session) {
    return null;
  }
  return findUserById(session.userId) ?? null;
}
function requireCurrentUser() {
  const user = getCurrentUser();
  if (!user) {
    throw new Error("Authentication required.");
  }
  return user;
}
function requireCurrentUserRole(role) {
  const user = requireCurrentUser();
  if (user.role !== role) {
    throw new Error("You do not have permission to access this page.");
  }
  return user;
}
const APIRoute$2 = {
  GET: async () => {
    requireCurrentUserRole("ADMIN");
    const db = new Database(path__default.resolve(process.cwd(), "prisma", "app.db"));
    const payments = db.prepare(
      `
          SELECT
            ProjectTransaction.id AS paymentId,
            COALESCE(ClientJob.title, ProjectTransaction.description, 'Project payment') AS jobTitle,
            TRIM(ClientUser.firstName || ' ' || ClientUser.lastName) AS clientName,
            ClientUser.email AS clientEmail,
            TRIM(ProUser.firstName || ' ' || ProUser.lastName) AS professionalName,
            ProUser.email AS professionalEmail,
            ProjectTransaction.amount,
            ProjectTransaction.currency,
            ProjectTransaction.type AS paymentType,
            ProjectTransaction.status,
            ProjectTransaction.createdAt
          FROM "ProjectTransaction"
          LEFT JOIN "ProjectTracking" ON ProjectTracking.id = ProjectTransaction.trackingId
          LEFT JOIN "ClientJob" ON ClientJob.id = ProjectTracking.jobId
          LEFT JOIN "User" AS ClientUser ON ClientUser.id = ProjectTransaction.clientId
          LEFT JOIN "User" AS ProUser ON ProUser.id = ProjectTransaction.professionalId
          ORDER BY datetime(ProjectTransaction.createdAt) DESC, ProjectTransaction.id DESC
        `
    ).all();
    return new Response(
      JSON.stringify({
        payments: payments.map((payment) => ({
          id: payment.paymentId,
          jobTitle: payment.jobTitle || "Project payment",
          clientName: payment.clientName || "Unknown client",
          clientEmail: payment.clientEmail || "Unknown email",
          professionalName: payment.professionalName || "Unknown professional",
          professionalEmail: payment.professionalEmail || "Unknown email",
          amount: payment.amount,
          currency: payment.currency,
          paymentType: payment.paymentType,
          status: payment.status,
          dateTime: payment.createdAt
        }))
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
};
function getGoogleCredentials() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    throw new Error("GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are required for Google OAuth.");
  }
  return { clientId, clientSecret };
}
function getAppBaseUrl(request) {
  return process.env.APP_URL?.trim() || new URL(request.url).origin;
}
function getGoogleCallbackUrl(request) {
  return `${getAppBaseUrl(request)}/api/auth/google/callback`;
}
function buildGoogleAuthorizationUrl(request, state) {
  const { clientId } = getGoogleCredentials();
  const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("redirect_uri", getGoogleCallbackUrl(request));
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", "openid email profile");
  url.searchParams.set("state", state);
  url.searchParams.set("access_type", "offline");
  url.searchParams.set("prompt", "select_account");
  url.searchParams.set("include_granted_scopes", "true");
  url.searchParams.set("nonce", state);
  return url.toString();
}
async function exchangeCodeForGoogleUser(request, code) {
  const { clientId, clientSecret } = getGoogleCredentials();
  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      grant_type: "authorization_code",
      redirect_uri: getGoogleCallbackUrl(request)
    })
  });
  if (!tokenResponse.ok) {
    const failureBody = await tokenResponse.text();
    throw new Error(`Google token exchange failed: ${failureBody}`);
  }
  const tokenPayload = await tokenResponse.json();
  const userInfoResponse = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
    headers: {
      authorization: `Bearer ${tokenPayload.access_token}`
    }
  });
  if (!userInfoResponse.ok) {
    const failureBody = await userInfoResponse.text();
    throw new Error(`Google user info request failed: ${failureBody}`);
  }
  const userInfo = await userInfoResponse.json();
  if (!userInfo.email || userInfo.email_verified === false) {
    throw new Error("Google account must have a verified email address.");
  }
  return userInfo;
}
function deriveNamesFromGoogleProfile(profile2) {
  if (profile2.given_name && profile2.family_name) {
    return {
      firstName: profile2.given_name.trim(),
      lastName: profile2.family_name.trim()
    };
  }
  if (profile2.name) {
    const [firstName, ...rest] = profile2.name.trim().split(/\s+/);
    return {
      firstName: firstName || "Google",
      lastName: rest.join(" ") || "User"
    };
  }
  return {
    firstName: "Google",
    lastName: "User"
  };
}
function sanitizeReturnTo(value) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return "/";
  }
  return value;
}
const APIRoute$1 = {
  GET: async ({ request }) => {
    const requestUrl = new URL(request.url);
    const returnTo = sanitizeReturnTo(requestUrl.searchParams.get("returnTo"));
    const state = randomBytes(24).toString("hex");
    const redirectUrl = buildGoogleAuthorizationUrl(request, state);
    return new Response(null, {
      status: 302,
      headers: {
        Location: redirectUrl,
        "Set-Cookie": createGoogleStateCookie(state, returnTo)
      }
    });
  }
};
function redirectTo(path2, cookie) {
  return new Response(null, {
    status: 302,
    headers: {
      Location: path2,
      "Set-Cookie": cookie
    }
  });
}
const APIRoute = {
  GET: async ({ request }) => {
    const url = new URL(request.url);
    const state = url.searchParams.get("state");
    const code = url.searchParams.get("code");
    const error = url.searchParams.get("error");
    if (error) {
      return redirectTo("/login?oauth=google_denied", clearGoogleStateCookie());
    }
    const savedState = readGoogleStateFromCookieHeader(request.headers.get("cookie"));
    if (!state || !code || !savedState || savedState.state !== state) {
      return redirectTo("/login?oauth=google_state_error", clearGoogleStateCookie());
    }
    try {
      const googleProfile = await exchangeCodeForGoogleUser(request, code);
      const { firstName, lastName } = deriveNamesFromGoogleProfile(googleProfile);
      const user = upsertGoogleUser({
        googleId: googleProfile.sub,
        email: googleProfile.email.trim().toLowerCase(),
        firstName,
        lastName,
        avatarUrl: googleProfile.picture ?? null
      });
      const loginUser = findUserByEmail(user.email);
      if (!loginUser?.isActive) {
        return redirectTo("/login?oauth=account_disabled", clearGoogleStateCookie());
      }
      recordUserLogin(user.id);
      let finalDestination = savedState.returnTo || "/";
      if (user.role === "PROFESSIONAL" && finalDestination === "/") {
        const { getProfessionalProfileByUserId: getProfessionalProfileByUserId2 } = await Promise.resolve().then(() => userDb_server);
        const proProfile = getProfessionalProfileByUserId2(user.id);
        const isProfileComplete = !!(proProfile?.professionalCategory && proProfile?.professionalCity && proProfile?.skills.length && proProfile?.companyDescription && proProfile?.address);
        if (!isProfileComplete) {
          finalDestination = "/professional-profile";
        }
      }
      const headers = new Headers({
        Location: finalDestination
      });
      headers.append("Set-Cookie", clearGoogleStateCookie());
      headers.append("Set-Cookie", createSessionCookie(user));
      return new Response(null, {
        status: 302,
        headers
      });
    } catch (cause) {
      console.error("Google OAuth callback failed:", cause);
      return redirectTo("/login?oauth=google_failed", clearGoogleStateCookie());
    }
  }
};
let serverEntryPromise;
async function getServerEntry() {
  if (!serverEntryPromise) {
    serverEntryPromise = import("./assets/server-BvuapYYX.js").then((n) => n.s).then(
      (m) => m.default ?? m
    );
  }
  return serverEntryPromise;
}
function brandedErrorResponse() {
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" }
  });
}
function healthResponse() {
  return Response.json({
    ok: true,
    service: "skill-shine-gateway",
    database: process.env.DATABASE_URL ? "configured" : "missing",
    realtime: process.env.VITE_SOCKET_URL || process.env.SOCKET_PORT ? "configured" : "optional",
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  });
}
function isCatastrophicSsrErrorBody(body2, responseStatus) {
  let payload;
  try {
    payload = JSON.parse(body2);
  } catch {
    return false;
  }
  if (!payload || Array.isArray(payload) || typeof payload !== "object") {
    return false;
  }
  const fields = payload;
  const expectedKeys = /* @__PURE__ */ new Set(["message", "status", "unhandled"]);
  if (!Object.keys(fields).every((key) => expectedKeys.has(key))) {
    return false;
  }
  return fields.unhandled === true && fields.message === "HTTPError" && (fields.status === void 0 || fields.status === responseStatus);
}
async function normalizeCatastrophicSsrResponse(response) {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;
  const body2 = await response.clone().text();
  if (!isCatastrophicSsrErrorBody(body2, response.status)) {
    return response;
  }
  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body2}`));
  return brandedErrorResponse();
}
const server = {
  async fetch(request, env, ctx) {
    try {
      const url = new URL(request.url);
      if (url.pathname === "/favicon.ico") {
        return new Response(null, { status: 204 });
      }
      if (url.pathname === "/api/health") {
        return healthResponse();
      }
      if (url.pathname === "/api/auth/google") {
        return APIRoute$1.GET({ request });
      }
      if (url.pathname === "/api/auth/google/callback") {
        return APIRoute.GET({ request });
      }
      if (url.pathname === "/api/admin/payments") {
        return APIRoute$2.GET();
      }
      const apiResponse = await handleBackendApi(request);
      if (apiResponse) {
        return apiResponse;
      }
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return brandedErrorResponse();
    }
  }
};
export {
  deleteClientJob as $,
  getProfessionalProfileByUserId as A,
  createProfessionalNegotiation as B,
  updateProfessionalHireContractStatus as C,
  Database as D,
  createProfessionalHireNegotiation as E,
  cancelProjectTracking as F,
  cancelHireProject as G,
  deleteRejectedHireRequest as H,
  respondToProjectReview as I,
  getUserNotificationPreferences as J,
  getUserNotifications as K,
  markUserNotificationsRead as L,
  clearUserNotifications as M,
  updateUserNotificationPreferencesByUserId as N,
  getOpenClientJobById as O,
  isFavoriteJob as P,
  setFavoriteJob as Q,
  createProjectRequest as R,
  requireCurrentUserRole as S,
  getClientProfileByUserId as T,
  updateClientJob as U,
  createClientJob as V,
  getClientJobById as W,
  getClientJobsByUserId as X,
  getOpenClientJobs as Y,
  updateClientJobStatus as Z,
  getProjectTrackingDetailsByJob as _,
  renderErrorPage as a,
  getOrCreateProjectTrackingDetails as a0,
  createProjectWorkUpload as a1,
  deleteProjectWorkUpload as a2,
  createProjectRevisionRequest as a3,
  deleteProjectRevisionRequest as a4,
  createProjectMilestone as a5,
  updateProjectMilestoneStatus as a6,
  deleteProjectMilestone as a7,
  submitProjectCompletion as a8,
  updateProjectCompletionStatus as a9,
  sanitizeHtml as aA,
  userDb_server as aB,
  websitePageCms_server as aC,
  rateCompletedProject as aa,
  createProjectDispute as ab,
  createHireContract as ac,
  getClientHireRequests as ad,
  getClientTrackedProjects as ae,
  getProjectNegotiationsForClient as af,
  getClientProjectRequests as ag,
  updateClientProjectRequestStatus as ah,
  startClientHireProject as ai,
  findUserByEmailOrPhone as aj,
  updateClientProfileByUserId as ak,
  getAdminManagedUserDetails as al,
  updateProfessionalVerifiedStatusByAdmin as am,
  updateUserPasswordByAdmin as an,
  updateProfessionalProfileByUserId as ao,
  updateProfessionalWorkPhotosByUserId as ap,
  updateProfessionalAvatarByUserId as aq,
  getProfessionalWithdrawals as ar,
  createProfessionalWithdrawalRequest as as,
  getProfessionalUsers as at,
  getFavoriteJobIds as au,
  requireCurrentUser as av,
  clearSessionCookie as aw,
  getAdminEarningsReport as ax,
  updateAdminPayoutStatus as ay,
  prisma as az,
  getCurrentUser as b,
  getAdminPaymentTransactions as c,
  getAdminDisputeRecords as d,
  server as default,
  getAdminJobRecords as e,
  getAdminDashboardSnapshot as f,
  getResponse as g,
  getAdminUserStats as h,
  getAdminUsers as i,
  findUserByEmail as j,
  setResponseHeader as k,
  createSessionCookie as l,
  updateUserActiveStatusByAdmin as m,
  updateAdminDisputeStatus as n,
  hashPassword as o,
  getUserProjectTransactions as p,
  getProfessionalTrackedProjects as q,
  requestHandler as r,
  saveClientJobSchema as s,
  getProfessionalHireRequests as t,
  updateUserRoleByAdmin as u,
  verifyPassword as v,
  getProfessionalHireNegotiations as w,
  getProjectNegotiationsForProfessional as x,
  getFavoriteJobsByUserId as y,
  getProfessionalProjectRequests as z
};
