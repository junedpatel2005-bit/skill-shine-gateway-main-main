import "react/jsx-runtime";
import { c as createServerRpc } from "./createServerRpc-BSWJlf3j.js";
import { c as createServerFn } from "./server-KxTtotOh.js";
import { z } from "zod";
import { D as Database, b as getCurrentUser, A as getProfessionalProfileByUserId, ao as updateProfessionalProfileByUserId, ap as updateProfessionalWorkPhotosByUserId, aq as updateProfessionalAvatarByUserId } from "../server.js";
import path__default from "node:path";
import { g as getProfessionalVerificationByUserId, u as upsertProfessionalVerification } from "./pro-verification-db.server-D59mOpva.js";
import "@tanstack/router-core";
import "node:async_hooks";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core/ssr/server";
import "react";
import "@tanstack/react-router";
import "@tanstack/react-router/ssr/server";
import "node:crypto";
import "node:fs/promises";
import "nodemailer";
import "h3-v2";
import "@prisma/client";
import "xss";
import "socket.io-client";
const globalForPhase1ProfileDb = globalThis;
function getDatabase() {
  if (!globalForPhase1ProfileDb.phase1ProfileDb) {
    const databasePath = path__default.resolve(process.cwd(), "prisma", "app.db");
    globalForPhase1ProfileDb.phase1ProfileDb = new Database(databasePath);
    ensurePhase1ProfileTables(globalForPhase1ProfileDb.phase1ProfileDb);
  }
  return globalForPhase1ProfileDb.phase1ProfileDb;
}
function ensurePhase1ProfileTables(db) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS "users" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "role" TEXT NOT NULL,
      "email" TEXT UNIQUE,
      "phone" TEXT UNIQUE,
      "password_hash" TEXT,
      "google_id" TEXT UNIQUE,
      "is_email_verified" INTEGER NOT NULL DEFAULT 0,
      "is_phone_verified" INTEGER NOT NULL DEFAULT 0,
      "status" TEXT NOT NULL DEFAULT 'active',
      "created_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updated_at" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "last_login" TEXT
    );

    CREATE TABLE IF NOT EXISTS "user_profiles" (
      "user_id" TEXT NOT NULL PRIMARY KEY,
      "full_name" TEXT,
      "company_name" TEXT,
      "profile_photo" TEXT,
      "address" TEXT,
      "bio" TEXT,
      "timezone" TEXT,
      "language" TEXT
    );

    CREATE TABLE IF NOT EXISTS "professional_details" (
      "user_id" TEXT NOT NULL PRIMARY KEY,
      "hourly_rate" REAL,
      "fixed_rate" REAL,
      "experience_years" INTEGER,
      "skills" TEXT,
      "service_type" TEXT,
      "service_radius_km" INTEGER,
      "availability_status" TEXT,
      "portfolio_url" TEXT,
      "is_verified" INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS "locations" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "user_id" TEXT,
      "lat" REAL,
      "lng" REAL,
      "city" TEXT,
      "state" TEXT,
      "country" TEXT,
      "address_approx" TEXT,
      "service_radius_km" INTEGER,
      "is_base_location" INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS "verifications" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "professional_id" TEXT,
      "document_type" TEXT,
      "document_url" TEXT,
      "status" TEXT,
      "reviewed_by" TEXT,
      "reviewed_at" TEXT,
      "notes" TEXT
    );
  `);
}
function upsertPhase1ProfessionalProfile(input) {
  const db = getDatabase();
  const timestamp = (/* @__PURE__ */ new Date()).toISOString();
  const userId = String(input.userId);
  db.transaction(() => {
    db.prepare(
      `
        INSERT INTO "users" (
          id,
          role,
          email,
          phone,
          status,
          created_at,
          updated_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(id) DO UPDATE SET
          role = excluded.role,
          email = excluded.email,
          phone = excluded.phone,
          updated_at = excluded.updated_at
      `
    ).run(
      userId,
      input.role.toLowerCase(),
      input.email,
      input.phone || null,
      "active",
      timestamp,
      timestamp
    );
    db.prepare(
      `
        INSERT INTO "user_profiles" (
          user_id,
          full_name,
          company_name,
          profile_photo,
          address,
          bio,
          timezone,
          language
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(user_id) DO UPDATE SET
          full_name = excluded.full_name,
          company_name = excluded.company_name,
          profile_photo = excluded.profile_photo,
          address = excluded.address,
          bio = excluded.bio,
          timezone = excluded.timezone,
          language = excluded.language
      `
    ).run(
      userId,
      input.fullName,
      input.companyName || null,
      input.profilePhotoUrl || null,
      input.address || null,
      input.bio || null,
      "Asia/Calcutta",
      "en"
    );
    db.prepare(
      `
        INSERT INTO "professional_details" (
          user_id,
          hourly_rate,
          fixed_rate,
          experience_years,
          skills,
          service_type,
          service_radius_km,
          availability_status,
          portfolio_url,
          is_verified
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(user_id) DO UPDATE SET
          hourly_rate = excluded.hourly_rate,
          fixed_rate = excluded.fixed_rate,
          experience_years = excluded.experience_years,
          skills = excluded.skills,
          service_type = excluded.service_type,
          service_radius_km = excluded.service_radius_km,
          availability_status = excluded.availability_status,
          portfolio_url = excluded.portfolio_url,
          is_verified = excluded.is_verified
      `
    ).run(
      userId,
      input.hourlyRate ?? null,
      input.fixedRate ?? null,
      input.experienceYears ?? null,
      JSON.stringify(input.skills),
      input.serviceType,
      input.serviceRadiusKm ?? null,
      input.availabilityStatus,
      input.portfolioUrl || null,
      input.isVerified ? 1 : 0
    );
    db.prepare(
      `
        INSERT INTO "locations" (
          id,
          user_id,
          city,
          address_approx,
          service_radius_km,
          is_base_location
        )
        VALUES (?, ?, ?, ?, ?, ?)
        ON CONFLICT(id) DO UPDATE SET
          city = excluded.city,
          address_approx = excluded.address_approx,
          service_radius_km = excluded.service_radius_km,
          is_base_location = excluded.is_base_location
      `
    ).run(
      `base:${userId}`,
      userId,
      input.professionalCity || null,
      input.address || input.professionalCity || null,
      input.serviceRadiusKm ?? null,
      1
    );
  })();
}
function upsertPhase1ProfessionalVerifications(input) {
  const db = getDatabase();
  const userId = String(input.userId);
  const status = input.status || "pending";
  const documents = [
    { type: "government_id", url: input.governmentIdUrl },
    { type: "license", url: input.licenseUrl },
    { type: "insurance", url: input.insuranceUrl },
    { type: "selfie", url: input.selfieUrl },
    ...(input.certifications || []).map((url, index) => ({
      type: `certificate_${index + 1}`,
      url
    }))
  ].filter((document) => Boolean(document.url));
  const upsert = db.prepare(
    `
      INSERT INTO "verifications" (
        id,
        professional_id,
        document_type,
        document_url,
        status,
        reviewed_by,
        reviewed_at,
        notes
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        document_type = excluded.document_type,
        document_url = excluded.document_url,
        status = excluded.status,
        notes = excluded.notes
    `
  );
  for (const document of documents) {
    upsert.run(
      `${userId}:${document.type}`,
      userId,
      document.type,
      document.url,
      status,
      null,
      null,
      "Uploaded from professional profile"
    );
  }
}
const professionalProfileSchema = z.object({
  fullName: z.string().trim().min(2, "Full name is required."),
  profilePhotoUrl: z.string().trim().optional(),
  professionalCategory: z.string().trim().min(2, "Add your main skill or service category."),
  professionalCity: z.string().trim().min(2, "City is required."),
  skillsText: z.string().trim().min(2, "Add at least one skill or service."),
  experienceYears: z.coerce.number().min(0).max(80).optional().nullable(),
  hourlyRate: z.coerce.number().min(0).optional().nullable(),
  fixedRate: z.coerce.number().min(0).optional().nullable(),
  portfolioUrl: z.string().trim().optional(),
  workPhotosText: z.string().trim().optional(),
  certificationsText: z.string().trim().optional(),
  tradeLicenseUrl: z.string().trim().optional(),
  availabilityStatus: z.enum(["available", "busy", "unavailable"]),
  serviceArea: z.string().trim().min(2, "Service area is required."),
  serviceRadiusKm: z.coerce.number().min(0).max(500).optional().nullable(),
  workMode: z.enum(["remote", "onsite", "both"]),
  companyDescription: z.string().trim().min(10, "Add a short professional bio."),
  address: z.string().trim().min(3, "Address or base location is required."),
  emailNotificationsEnabled: z.boolean(),
  browserNotificationsEnabled: z.boolean(),
  projectActivityNotificationsEnabled: z.boolean(),
  governmentIdUrl: z.string().trim().optional(),
  insuranceUrl: z.string().trim().optional(),
  selfieUrl: z.string().trim().optional()
});
const getProfessionalProfilePage_createServerFn_handler = createServerRpc({
  id: "b2006b819abe3a98a4efe84f86e34301cda5272937d3b6465571260d9bd38adf",
  name: "getProfessionalProfilePage",
  filename: "src/professional/profile-setup.tsx"
}, (opts) => getProfessionalProfilePage.__executeServer(opts));
const getProfessionalProfilePage = createServerFn({
  method: "GET"
}).handler(getProfessionalProfilePage_createServerFn_handler, async () => {
  const viewer = getCurrentUser();
  if (!viewer) {
    return null;
  }
  return {
    viewer,
    professionalProfile: viewer.role === "PROFESSIONAL" ? getProfessionalProfileByUserId(viewer.id) : null,
    verification: viewer.role === "PROFESSIONAL" ? getProfessionalVerificationByUserId(viewer.id) : null
  };
});
const saveProfessionalProfile_createServerFn_handler = createServerRpc({
  id: "2e19328f8538965cc4bf2bfc8b18be8bea3d6b7d5a5ff3c16c8035b343b4f683",
  name: "saveProfessionalProfile",
  filename: "src/professional/profile-setup.tsx"
}, (opts) => saveProfessionalProfile.__executeServer(opts));
const saveProfessionalProfile = createServerFn({
  method: "POST"
}).inputValidator((data) => professionalProfileSchema.parse(data)).handler(saveProfessionalProfile_createServerFn_handler, async ({
  data
}) => {
  const viewer = getCurrentUser();
  if (!viewer || viewer.role !== "PROFESSIONAL") {
    return {
      ok: false,
      formError: "Only professional accounts can save a professional profile."
    };
  }
  const profile = updateProfessionalProfileByUserId({
    userId: viewer.id,
    fullName: data.fullName,
    profilePhotoUrl: data.profilePhotoUrl || null,
    professionalCategory: data.professionalCategory,
    professionalCity: data.professionalCity,
    skills: splitList(data.skillsText),
    experienceYears: data.experienceYears ?? null,
    hourlyRate: data.hourlyRate ?? null,
    fixedRate: data.fixedRate ?? null,
    portfolioUrl: data.portfolioUrl || null,
    workPhotos: splitList(data.workPhotosText || ""),
    certifications: splitList(data.certificationsText || ""),
    tradeLicenseUrl: data.tradeLicenseUrl || null,
    availabilityStatus: data.availabilityStatus,
    serviceArea: data.serviceArea,
    serviceRadiusKm: data.serviceRadiusKm ?? null,
    workMode: data.workMode,
    companyDescription: data.companyDescription,
    address: data.address,
    emailNotificationsEnabled: data.emailNotificationsEnabled,
    browserNotificationsEnabled: data.browserNotificationsEnabled,
    projectActivityNotificationsEnabled: data.projectActivityNotificationsEnabled
  });
  const verification = upsertProfessionalVerification({
    userId: viewer.id,
    governmentIdUrl: data.governmentIdUrl || null,
    licenseUrl: data.tradeLicenseUrl || null,
    certifications: splitList(data.certificationsText || ""),
    insuranceUrl: data.insuranceUrl || null,
    selfieUrl: data.selfieUrl || null
  });
  upsertPhase1ProfessionalProfile({
    userId: viewer.id,
    role: viewer.role,
    email: viewer.email,
    phone: viewer.phone,
    fullName: data.fullName,
    profilePhotoUrl: data.profilePhotoUrl || null,
    companyName: viewer.companyName || null,
    address: data.address,
    bio: data.companyDescription,
    professionalCategory: data.professionalCategory,
    professionalCity: data.professionalCity,
    skills: splitList(data.skillsText),
    hourlyRate: data.hourlyRate ?? null,
    fixedRate: data.fixedRate ?? null,
    experienceYears: data.experienceYears ?? null,
    serviceType: data.workMode,
    serviceRadiusKm: data.serviceRadiusKm ?? null,
    availabilityStatus: data.availabilityStatus,
    portfolioUrl: data.portfolioUrl || null,
    isVerified: profile?.isVerified
  });
  upsertPhase1ProfessionalVerifications({
    userId: viewer.id,
    governmentIdUrl: data.governmentIdUrl || null,
    licenseUrl: data.tradeLicenseUrl || null,
    certifications: splitList(data.certificationsText || ""),
    insuranceUrl: data.insuranceUrl || null,
    selfieUrl: data.selfieUrl || null,
    status: verification.status
  });
  return {
    ok: true,
    profile,
    verification
  };
});
const saveProfessionalVerificationUpload_createServerFn_handler = createServerRpc({
  id: "ebed5c2a9559ca743c744b5b964f96de975e6711abfd36ee0215df6b6bfa8f38",
  name: "saveProfessionalVerificationUpload",
  filename: "src/professional/profile-setup.tsx"
}, (opts) => saveProfessionalVerificationUpload.__executeServer(opts));
const saveProfessionalVerificationUpload = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(saveProfessionalVerificationUpload_createServerFn_handler, async ({
  data
}) => {
  const viewer = getCurrentUser();
  if (!viewer || viewer.role !== "PROFESSIONAL") {
    return {
      ok: false,
      formError: "Only professional accounts can upload verification documents."
    };
  }
  const verification = upsertProfessionalVerification({
    userId: viewer.id,
    governmentIdUrl: data.governmentIdUrl || null,
    licenseUrl: data.tradeLicenseUrl || null,
    certifications: splitList(data.certificationsText || ""),
    insuranceUrl: data.insuranceUrl || null,
    selfieUrl: data.selfieUrl || null
  });
  upsertPhase1ProfessionalVerifications({
    userId: viewer.id,
    governmentIdUrl: data.governmentIdUrl || null,
    licenseUrl: data.tradeLicenseUrl || null,
    certifications: splitList(data.certificationsText || ""),
    insuranceUrl: data.insuranceUrl || null,
    selfieUrl: data.selfieUrl || null,
    status: verification.status
  });
  return {
    ok: true,
    verification
  };
});
const saveProfessionalWorkPhotosUpload_createServerFn_handler = createServerRpc({
  id: "78a30400a82c387d7f50258c6808cbacab370d3279d39fe0320a38c6abff7b9a",
  name: "saveProfessionalWorkPhotosUpload",
  filename: "src/professional/profile-setup.tsx"
}, (opts) => saveProfessionalWorkPhotosUpload.__executeServer(opts));
const saveProfessionalWorkPhotosUpload = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(saveProfessionalWorkPhotosUpload_createServerFn_handler, async ({
  data
}) => {
  const viewer = getCurrentUser();
  if (!viewer || viewer.role !== "PROFESSIONAL") {
    return {
      ok: false,
      formError: "Only professional accounts can upload work photos."
    };
  }
  const profile = updateProfessionalWorkPhotosByUserId({
    userId: viewer.id,
    workPhotos: splitList(data.workPhotosText || "")
  });
  return {
    ok: true,
    profile
  };
});
const saveProfessionalProfilePhotoUpload_createServerFn_handler = createServerRpc({
  id: "ee8e3371be33623c7fdc5db78b469509f3e5beacdc3e1feba4b39d1c7891bc6f",
  name: "saveProfessionalProfilePhotoUpload",
  filename: "src/professional/profile-setup.tsx"
}, (opts) => saveProfessionalProfilePhotoUpload.__executeServer(opts));
const saveProfessionalProfilePhotoUpload = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(saveProfessionalProfilePhotoUpload_createServerFn_handler, async ({
  data
}) => {
  const viewer = getCurrentUser();
  if (!viewer || viewer.role !== "PROFESSIONAL") {
    return {
      ok: false,
      formError: "Only professional accounts can upload a profile photo."
    };
  }
  const profile = updateProfessionalAvatarByUserId({
    userId: viewer.id,
    avatarUrl: data.profilePhotoUrl || ""
  });
  return {
    ok: true,
    profile
  };
});
function splitList(value) {
  if (value.includes("data:")) {
    return value.split(/\n+/).flatMap((line) => {
      const trimmedLine = line.trim();
      if (!trimmedLine) {
        return [];
      }
      if (trimmedLine.startsWith("data:")) {
        return [trimmedLine];
      }
      return trimmedLine.split(",").map((entry) => entry.trim()).filter(Boolean);
    });
  }
  return value.split(/,|\n/).map((entry) => entry.trim()).filter(Boolean);
}
export {
  getProfessionalProfilePage_createServerFn_handler,
  saveProfessionalProfilePhotoUpload_createServerFn_handler,
  saveProfessionalProfile_createServerFn_handler,
  saveProfessionalVerificationUpload_createServerFn_handler,
  saveProfessionalWorkPhotosUpload_createServerFn_handler
};
