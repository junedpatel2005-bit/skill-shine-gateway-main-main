import { c as createServerRpc } from "./createServerRpc-BSWJlf3j.js";
import { c as createServerFn } from "./server-KxTtotOh.js";
import { D as Database, b as getCurrentUser, W as getClientJobById, _ as getProjectTrackingDetailsByJob, $ as deleteClientJob } from "../server.js";
import path__default from "node:path";
import "@tanstack/router-core";
import "node:async_hooks";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core/ssr/server";
import "react";
import "@tanstack/react-router";
import "react/jsx-runtime";
import "@tanstack/react-router/ssr/server";
import "node:crypto";
import "node:fs/promises";
import "zod";
import "nodemailer";
import "h3-v2";
import "@prisma/client";
import "xss";
import "socket.io-client";
function seedTestJobs(userId) {
  const databasePath = path__default.resolve(process.cwd(), "prisma", "app.db");
  const db = new Database(databasePath);
  const now = (/* @__PURE__ */ new Date()).toISOString();
  const deadline = new Date(Date.now() + 30 * 24 * 60 * 60 * 1e3).toISOString();
  const existing = db.prepare(`SELECT id FROM "ClientJob" WHERE userId = ? AND title = ?`).get(userId, "Website Redesign");
  if (existing) {
    console.log("Test job already exists");
    return;
  }
  const result = db.prepare(
    `
    INSERT INTO "ClientJob" (
      userId, category, title, description, budgetMin, budgetMax,
      urgency, deadline, workMode, locationLabel, locationAddress,
      status, createdAt, updatedAt
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `
  ).run(
    userId,
    "Development",
    "Website Redesign",
    "We need to redesign our company website with modern UI/UX. Should include responsive design, contact form integration, and SEO optimization.",
    5e3,
    15e3,
    "HIGH",
    deadline,
    "REMOTE",
    "San Francisco, CA",
    "123 Market St, San Francisco, CA 94103",
    "OPEN",
    now,
    now
  );
  const jobId = result.lastInsertRowid;
  db.prepare(
    `
    INSERT INTO "ClientJobAttachment" (jobId, fileName, fileType, fileSize, createdAt)
    VALUES (?, ?, ?, ?, ?)
  `
  ).run(jobId, "design-reference.pdf", "application/pdf", 2048e3, now);
  console.log(`Created test job with ID: ${jobId}`);
  return jobId;
}
const checkProjectAuth_createServerFn_handler = createServerRpc({
  id: "21fdf6e8e7840e1cff3b3ca3611a368d5ab8b8f96b9ea15af45c378854b1d5bf",
  name: "checkProjectAuth",
  filename: "src/client/project.$projectId.server.ts"
}, (opts) => checkProjectAuth.__executeServer(opts));
const checkProjectAuth = createServerFn({
  method: "GET"
}).handler(checkProjectAuth_createServerFn_handler, async () => {
  const viewer = getCurrentUser();
  if (!viewer) {
    return {
      authenticated: false,
      isClient: false
    };
  }
  return {
    authenticated: true,
    isClient: viewer.role === "CLIENT"
  };
});
const getProjectData_createServerFn_handler = createServerRpc({
  id: "1352238e92751112f326b98e5a6618a5af4927f592eadfebbc82c8f3eb61ec63",
  name: "getProjectData",
  filename: "src/client/project.$projectId.server.ts"
}, (opts) => getProjectData.__executeServer(opts));
const getProjectData = createServerFn({
  method: "GET"
}).inputValidator((id) => id).handler(getProjectData_createServerFn_handler, async ({
  data
}) => {
  const viewer = getCurrentUser();
  if (!viewer) {
    return null;
  }
  if (viewer.role !== "CLIENT") {
    return null;
  }
  const numericId = parseInt(data.replace(/^p-/i, ""), 10);
  if (isNaN(numericId)) {
    return null;
  }
  let job = await getClientJobById(viewer.id, numericId);
  if (!job && numericId === 1) {
    const testJobId = seedTestJobs(viewer.id);
    if (testJobId) {
      job = await getClientJobById(viewer.id, testJobId);
    }
  }
  const tracking = job ? await getProjectTrackingDetailsByJob(viewer.id, job.id) ?? null : null;
  return {
    viewer,
    job,
    tracking
  };
});
const deleteProject_createServerFn_handler = createServerRpc({
  id: "7fb9024a085484decec73064df196406d2dfa38387498314733a92803139ccf3",
  name: "deleteProject",
  filename: "src/client/project.$projectId.server.ts"
}, (opts) => deleteProject.__executeServer(opts));
const deleteProject = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(deleteProject_createServerFn_handler, async ({
  data
}) => {
  const viewer = getCurrentUser();
  if (!viewer || viewer.role !== "CLIENT") {
    throw new Error("Only clients can delete projects.");
  }
  return deleteClientJob(viewer.id, data.projectId);
});
export {
  checkProjectAuth_createServerFn_handler,
  deleteProject_createServerFn_handler,
  getProjectData_createServerFn_handler
};
