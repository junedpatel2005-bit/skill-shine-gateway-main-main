import * as path from "node:path";
import Database from "./supabase-compat";
import { io as clientIo } from "socket.io-client";
import { prisma } from "./prisma";

import type { ClientJobAttachmentInput, ClientJobInput } from "./validation/client-job";

type BetterSqlite3Database = Database;

export type JobUrgency = "LOW" | "MEDIUM" | "HIGH";
export type JobWorkMode = "ON_SITE" | "REMOTE" | "BOTH";
export type JobTimingType = "FIXED" | "HOURLY" | "WEEKLY";
export type JobStatus = "DRAFT" | "OPEN" | "CLOSED";

export type ClientJobRecord = {
  id: number;
  userId: number;
  category: string;
  title: string;
  description: string;
  budgetMin: number | null;
  budgetMax: number | null;
  urgency: JobUrgency;
  timingType: JobTimingType;
  hourlyRate: number | null;
  jobDate: string | null;
  deadline: string;
  workMode: JobWorkMode;
  locationLabel: string | null;
  locationAddress: string | null;
  locationLat: number | null;
  locationLng: number | null;
  status: JobStatus;
  createdAt: string;
  updatedAt: string;
  attachments: ClientJobAttachmentRecord[];
};

export type PublicClientJobRecord = ClientJobRecord & {
  clientName: string;
  clientCompanyName: string | null;
  clientAvatarUrl: string | null;
};

export type ClientJobAttachmentRecord = {
  id: number;
  jobId: number;
  fileName: string;
  fileType: string | null;
  fileSize: number | null;
  previewUrl: string | null;
  createdAt: string;
};

const globalForJobDb = globalThis as typeof globalThis & {
  jobDb?: BetterSqlite3Database;
};

function getDatabase(): BetterSqlite3Database {
  if (!globalForJobDb.jobDb) {
    const databasePath = path.resolve(process.cwd(), "prisma", "app.db");
    globalForJobDb.jobDb = new (Database as any)(databasePath);
    ensureClientJobTables(globalForJobDb.jobDb!);
  }

  return globalForJobDb.jobDb!;
}

function ensureClientJobTables(db: BetterSqlite3Database) {
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
    `ALTER TABLE "ClientJob" ADD COLUMN "timingType" TEXT NOT NULL DEFAULT 'FIXED'`,
  );
  ensureColumn(
    db,
    "ClientJob",
    "hourlyRate",
    `ALTER TABLE "ClientJob" ADD COLUMN "hourlyRate" INTEGER`,
  );
}

function ensureFavoriteJobTable(db: BetterSqlite3Database) {
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

function normalizeDateValue(value?: string | null) {
  const trimmed = value?.trim();

  if (!trimmed) {
    return null;
  }

  return new Date(`${trimmed}T00:00:00.000Z`).toISOString();
}

function mapJob(
  row: Omit<ClientJobRecord, "attachments">,
  attachments: ClientJobAttachmentRecord[],
) {
  return {
    ...row,
    timingType: row.timingType ?? (row.hourlyRate ? "HOURLY" : "FIXED"),
    hourlyRate: row.hourlyRate ?? null,
    attachments,
  } satisfies ClientJobRecord;
}

function tableExists(db: BetterSqlite3Database, tableName: string) {
  const result = db
    .prepare(`SELECT name FROM sqlite_master WHERE type = 'table' AND name = ? LIMIT 1`)
    .get(tableName) as { name: string } | undefined;

  return Boolean(result);
}

function ensureColumn(
  db: BetterSqlite3Database,
  tableName: string,
  columnName: string,
  alterSql: string,
) {
  const columns = db.prepare(`PRAGMA table_info("${tableName}")`).all() as Array<{ name: string }>;

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

export async function createClientJob(userId: number, input: ClientJobInput) {
  const db = getDatabase();
  const timestamp = new Date().toISOString();

  const createJob = db.transaction((attachments: ClientJobAttachmentInput[]) => {
    const result = db
      .prepare(
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
        `,
      )
      .run(
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
        timestamp,
      );

    const jobId = Number(result.lastInsertRowid);
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
        `,
      );

    for (const attachment of attachments) {
      insertAttachment.run(
        jobId,
        attachment.fileName.trim(),
        attachment.fileType?.trim() || null,
        attachment.fileSize ?? null,
        attachment.previewUrl?.trim() || null,
        timestamp,
      );
    }

    return jobId;
  });

  const jobId = createJob(input.attachments ?? []);

  // Notify admin room via socket server (best-effort, do not fail job creation)
  try {
    const socketUrl =
      process.env.SOCKET_URL || `http://localhost:${process.env.SOCKET_PORT || 4001}`;
    const sock = clientIo(socketUrl, { autoConnect: false });
    sock.connect();
    sock.emit("admin:activity", { reason: "client job posted" });
    sock.disconnect();
  } catch (e) {
    // ignore errors — admin refresh is best-effort
  }

  return await getClientJobById(userId, jobId);
}

export async function getClientJobById(userId: number, jobId: number) {
  const job = await prisma.clientJob.findUnique({
    where: { id: jobId },
    include: {
      attachments: { orderBy: { id: "asc" } },
      user: { select: { firstName: true, lastName: true, companyName: true, avatarUrl: true } },
    },
  });

  if (!job || job.userId !== userId) return null;

  const attachments = job.attachments.map((a: any) => ({
    id: a.id,
    jobId: a.jobId,
    fileName: a.fileName,
    fileType: a.fileType,
    fileSize: a.fileSize,
    previewUrl: a.previewUrl,
    createdAt: a.createdAt.toISOString(),
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
    workMode: job.workMode as JobWorkMode,
    locationLabel: job.locationLabel,
    locationAddress: job.locationAddress,
    locationLat: job.locationLat,
    locationLng: job.locationLng,
    status: job.status as JobStatus,
    createdAt: job.createdAt.toISOString(),
    updatedAt: job.updatedAt.toISOString(),
    attachments,
  } as ClientJobRecord;
}

export async function getClientJobsByUserId(userId: number) {
  const jobs = await prisma.clientJob.findMany({
    where: { userId },
    include: { attachments: { orderBy: { id: "asc" } } },
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
  });

  return jobs.map((job: any) =>
    mapJob(
      {
        id: job.id,
        userId: job.userId,
        category: job.category,
        title: job.title,
        description: job.description,
        budgetMin: job.budgetMin,
        budgetMax: job.budgetMax,
        urgency: job.urgency as JobUrgency,
        timingType: job.jobDate ? "FIXED" : "FIXED",
        hourlyRate: null,
        jobDate: job.jobDate?.toISOString() ?? null,
        deadline: job.deadline.toISOString(),
        workMode: job.workMode as JobWorkMode,
        locationLabel: job.locationLabel,
        locationAddress: job.locationAddress,
        locationLat: job.locationLat,
        locationLng: job.locationLng,
        status: job.status as JobStatus,
        createdAt: job.createdAt.toISOString(),
        updatedAt: job.updatedAt.toISOString(),
      },
      job.attachments.map((a: any) => ({
        id: a.id,
        jobId: a.jobId,
        fileName: a.fileName,
        fileType: a.fileType,
        fileSize: a.fileSize,
        previewUrl: a.previewUrl,
        createdAt: a.createdAt.toISOString(),
      })),
    ),
  );
}

export async function getOpenClientJobs() {
  try {
    const jobs = (await prisma.$queryRawUnsafe(
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
      `,
    )) as Array<any>;

    if (!jobs || !jobs.length) return [];

    const idsCsv = jobs.map((j: any) => Number(j.id)).join(",");
    const attachmentRows = idsCsv
      ? ((await prisma.$queryRawUnsafe(
          `SELECT * FROM "ClientJobAttachment" WHERE "jobId" IN (${idsCsv}) ORDER BY id ASC`,
        )) as Array<any>)
      : [];

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
          urgency: job.urgency as JobUrgency,
          timingType: job.jobDate ? "FIXED" : "FIXED",
          hourlyRate: null,
          jobDate: job.jobDate ? new Date(job.jobDate).toISOString() : null,
          deadline: new Date(job.deadline).toISOString(),
          workMode: job.workMode as JobWorkMode,
          locationLabel: job.locationLabel,
          locationAddress: job.locationAddress,
          locationLat: job.locationLat,
          locationLng: job.locationLng,
          status: job.status as JobStatus,
          createdAt: new Date(job.createdAt).toISOString(),
          updatedAt: new Date(job.updatedAt).toISOString(),
        },
        (attachmentRows.filter((a: any) => a.jobId === job.id) as Array<any>).map((a: any) => ({
          id: a.id,
          jobId: a.jobId,
          fileName: a.fileName,
          fileType: a.fileType,
          fileSize: a.fileSize,
          previewUrl: a.previewUrl,
          createdAt: new Date(a.createdAt).toISOString(),
        })),
      ),
      clientName: job.clientName,
      clientCompanyName: job.clientCompanyName ?? null,
      clientAvatarUrl: job.clientAvatarUrl ?? null,
    }));
  } catch (error) {
    console.warn("getOpenClientJobs failed (database unconfigured or unreachable):", error instanceof Error ? error.message : error);
    return [];
  }
}

export async function getOpenClientJobById(jobId: number) {
  try {
    const job = await prisma.clientJob.findUnique({
      where: { id: jobId },
      include: {
        user: { select: { firstName: true, lastName: true, companyName: true, avatarUrl: true } },
        attachments: { orderBy: { id: "asc" } },
      },
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
          urgency: job.urgency as JobUrgency,
          timingType: job.jobDate ? "FIXED" : "FIXED",
          hourlyRate: null,
          jobDate: job.jobDate?.toISOString() ?? null,
          deadline: job.deadline.toISOString(),
          workMode: job.workMode as JobWorkMode,
          locationLabel: job.locationLabel,
          locationAddress: job.locationAddress,
          locationLat: job.locationLat,
          locationLng: job.locationLng,
          status: job.status as JobStatus,
          createdAt: job.createdAt.toISOString(),
          updatedAt: job.updatedAt.toISOString(),
        },
        job.attachments.map((a: any) => ({
          id: a.id,
          jobId: a.jobId,
          fileName: a.fileName,
          fileType: a.fileType,
          fileSize: a.fileSize,
          previewUrl: a.previewUrl,
          createdAt: a.createdAt.toISOString(),
        })),
      ),
      clientName: `${job.user.firstName} ${job.user.lastName}`.trim(),
      clientCompanyName: job.user.companyName ?? null,
      clientAvatarUrl: job.user.avatarUrl ?? null,
    };
  } catch (error) {
    console.warn(`getOpenClientJobById(${jobId}) failed:`, error instanceof Error ? error.message : error);
    return null;
  }
}

export async function getFavoriteJobIds(userId: number) {
  try {
    const rows = await prisma.favoriteJob.findMany({
      where: { userId },
      orderBy: [{ createdAt: "desc" }, { id: "desc" }],
      select: { jobId: true },
    });

    return rows.map((r: { jobId: number }) => r.jobId);
  } catch (error) {
    console.warn(`getFavoriteJobIds(${userId}) failed:`, error instanceof Error ? error.message : error);
    return [];
  }
}

export async function getFavoriteJobsByUserId(userId: number) {
  const favoriteIds = await getFavoriteJobIds(userId);

  if (!favoriteIds.length) {
    return [];
  }

  const favoriteIdSet = new Set(favoriteIds);
  const favoriteOrder = new Map<number, number>(
    favoriteIds.map((jobId: number, index: number) => [jobId, index] as [number, number]),
  );

  const openJobs = await getOpenClientJobs();

  return openJobs
    .filter((job) => favoriteIdSet.has(job.id))
    .sort((a, b) => {
      const aRank = favoriteOrder.get(a.id) ?? 0;
      const bRank = favoriteOrder.get(b.id) ?? 0;
      return aRank - bRank;
    });
}

export async function isFavoriteJob(userId: number, jobId: number) {
  try {
    const row = await prisma.favoriteJob.findFirst({ where: { userId, jobId }, select: { id: true } });
    return Boolean(row);
  } catch (error) {
    return false;
  }
}

export function setFavoriteJob(userId: number, jobId: number, favorite: boolean) {
  const db = getDatabase();
  ensureFavoriteJobTable(db);

  if (favorite) {
    const job = db
      .prepare(
        `
          SELECT id
          FROM "ClientJob"
          WHERE ClientJob.id = ? AND ${availableJobPredicate()}
          LIMIT 1
        `,
      )
      .get(jobId) as { id: number } | undefined;

    if (!job) {
      throw new Error("This job is not available.");
    }

    db.prepare(
      `
        INSERT OR IGNORE INTO "FavoriteJob" (userId, jobId, createdAt)
        VALUES (?, ?, ?)
      `,
    ).run(userId, jobId, new Date().toISOString());

    return true;
  }

  db.prepare(
    `
      DELETE FROM "FavoriteJob"
      WHERE userId = ? AND jobId = ?
    `,
  ).run(userId, jobId);

  return false;
}

export async function updateClientJobStatus(userId: number, jobId: number, status: JobStatus) {
  const db = getDatabase();
  const timestamp = new Date().toISOString();
  const existing = await getClientJobById(userId, jobId);

  if (!existing) {
    return undefined;
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
      `,
    ).run(status, timestamp, jobId, userId);
  });

  updateJobStatus();

  return await getClientJobById(userId, jobId);
}

function clearReopenedJobRequestDrafts(db: BetterSqlite3Database, jobId: number) {
  if (!tableExists(db, "ProjectRequest")) {
    return;
  }

  if (tableExists(db, "ProjectNegotiation")) {
    db.prepare(
      `
        DELETE FROM "ProjectNegotiation"
        WHERE requestId IN (
          SELECT id
          FROM "ProjectRequest"
          WHERE jobId = ? AND status IN ('PENDING', 'DECLINED')
        )
      `,
    ).run(jobId);
  }

  db.prepare(
    `
      DELETE FROM "ProjectRequest"
      WHERE jobId = ? AND status IN ('PENDING', 'DECLINED')
    `,
  ).run(jobId);
}

export async function updateClientJob(userId: number, jobId: number, input: ClientJobInput) {
  const db = getDatabase();
  const timestamp = new Date().toISOString();
  const existing = await getClientJobById(userId, jobId);

  if (!existing) {
    return null;
  }

  const updateJob = db.transaction((attachments: ClientJobAttachmentInput[]) => {
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
      `,
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
      userId,
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
      `,
    );

    for (const attachment of attachments) {
      insertAttachment.run(
        jobId,
        attachment.fileName.trim(),
        attachment.fileType?.trim() || null,
        attachment.fileSize ?? null,
        attachment.previewUrl?.trim() || null,
        timestamp,
      );
    }
  });

  updateJob(input.attachments ?? []);

  // Notify admin room about updated job (best-effort)
  try {
    const socketUrl =
      process.env.SOCKET_URL || `http://localhost:${process.env.SOCKET_PORT || 4001}`;
    const sock = clientIo(socketUrl, { autoConnect: false });
    sock.connect();
    sock.emit("admin:activity", { reason: "client job updated" });
    sock.disconnect();
  } catch (e) {
    // ignore errors
  }

  return await getClientJobById(userId, jobId);
}

export async function deleteClientJob(userId: number, jobId: number) {
  const db = getDatabase();
  const job = await getClientJobById(userId, jobId);

  if (!job) {
    return false;
  }

  const deleteJob = db.transaction(() => {
    if (tableExists(db, "ProjectTracking")) {
      const retainedTracking = db
        .prepare(
          `
            SELECT id, status
            FROM "ProjectTracking"
            WHERE jobId = ?
              AND clientId = ?
              AND status IN ('ACTIVE', 'COMPLETED')
            LIMIT 1
          `,
        )
        .get(jobId, userId) as { id: number; status: string } | undefined;

      if (retainedTracking) {
        throw new Error(
          retainedTracking.status === "COMPLETED"
            ? "Completed projects stay in account history and cannot be deleted."
            : "Active projects must be cancelled or completed before the job can be deleted.",
        );
      }
    }

    const trackingIds = tableExists(db, "ProjectTracking")
      ? (db
          .prepare(`SELECT id FROM "ProjectTracking" WHERE jobId = ? AND clientId = ?`)
          .all(jobId, userId) as Array<{ id: number }>)
      : [];
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
        "ProjectWorkUpload",
      ];

      for (const table of trackingTables) {
        if (tableExists(db, table)) {
          db.prepare(`DELETE FROM "${table}" WHERE trackingId IN (${placeholders})`).run(
            ...trackingIdValues,
          );
        }
      }
    }

    if (tableExists(db, "ProjectTracking")) {
      db.prepare(`DELETE FROM "ProjectTracking" WHERE jobId = ? AND clientId = ?`).run(
        jobId,
        userId,
      );
    }

    if (tableExists(db, "ProjectRequest")) {
      db.prepare(`DELETE FROM "ProjectRequest" WHERE jobId = ? AND clientId = ?`).run(
        jobId,
        userId,
      );
    }

    db.prepare(`DELETE FROM "FavoriteJob" WHERE jobId = ?`).run(jobId);
    db.prepare(`DELETE FROM "ClientJobAttachment" WHERE jobId = ?`).run(jobId);
    db.prepare(`DELETE FROM "ClientJob" WHERE id = ? AND userId = ?`).run(jobId, userId);
  });

  deleteJob();

  return true;
}
