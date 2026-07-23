import { c as createServerRpc } from "./createServerRpc-BSWJlf3j.js";
import { c as createServerFn } from "./server-KxTtotOh.js";
import path__default from "node:path";
import { D as Database } from "../server.js";
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
const globalForSearch = globalThis;
function getDatabase() {
  if (!globalForSearch.adminSearchDb) {
    const databasePath = path__default.resolve(process.cwd(), "prisma", "app.db");
    globalForSearch.adminSearchDb = new Database(databasePath);
  }
  return globalForSearch.adminSearchDb;
}
function tableExists(db, tableName) {
  const normalized = tableName.replaceAll(`"`, "");
  const result = db.prepare(`SELECT name FROM sqlite_master WHERE type = 'table' AND name = ? LIMIT 1`).get(normalized);
  return Boolean(result);
}
function searchUsers(db, term) {
  if (!tableExists(db, "User")) return [];
  const like = `%${term}%`;
  const rows = db.prepare(
    `
        SELECT id, role, firstName, lastName, email, phone, companyName, avatarUrl
        FROM "User"
        WHERE
          LOWER(firstName) LIKE LOWER(?) OR
          LOWER(lastName) LIKE LOWER(?) OR
          LOWER(email) LIKE LOWER(?) OR
          LOWER(phone) LIKE LOWER(?) OR
          LOWER(companyName) LIKE LOWER(?) OR
          LOWER(firstName || ' ' || lastName) LIKE LOWER(?)
        ORDER BY datetime(createdAt) DESC
        LIMIT 15
      `
  ).all(like, like, like, like, like, like);
  return rows.map((user) => ({
    id: `user-${user.id}`,
    group: "Users",
    label: `${user.firstName} ${user.lastName}`.trim() || user.email,
    subtitle: `${user.email}${user.phone ? ` / ${user.phone}` : ""}`,
    badge: user.role,
    avatarUrl: user.avatarUrl || void 0
  }));
}
function searchJobs(db, term) {
  if (!tableExists(db, "User") || !tableExists(db, "ClientJob")) return [];
  const like = `%${term}%`;
  const rows = db.prepare(
    `
        SELECT
          ClientJob.id, ClientJob.title, ClientJob.category, ClientJob.status,
          TRIM(User.firstName || ' ' || User.lastName) AS clientName
        FROM "ClientJob"
        INNER JOIN "User" ON User.id = ClientJob.userId
        WHERE
          LOWER(ClientJob.title) LIKE LOWER(?) OR
          LOWER(ClientJob.description) LIKE LOWER(?) OR
          LOWER(ClientJob.category) LIKE LOWER(?) OR
          LOWER(TRIM(User.firstName || ' ' || User.lastName)) LIKE LOWER(?) OR
          LOWER(User.email) LIKE LOWER(?)
        ORDER BY datetime(ClientJob.createdAt) DESC
        LIMIT 15
      `
  ).all(like, like, like, like, like);
  return rows.map((job) => ({
    id: `job-${job.id}`,
    group: "Jobs",
    label: job.title,
    subtitle: `${job.clientName} / ${job.category}`,
    badge: job.status,
    route: `/project/${job.id}`
  }));
}
function searchDisputes(db, term) {
  if (!tableExists(db, "ProjectDispute")) return [];
  const like = `%${term}%`;
  const rows = db.prepare(
    `
        SELECT id, issueType, priority, status, message
        FROM "ProjectDispute"
        WHERE
          LOWER(message) LIKE LOWER(?) OR
          LOWER(issueType) LIKE LOWER(?) OR
          LOWER(priority) LIKE LOWER(?) OR
          LOWER(status) LIKE LOWER(?)
        ORDER BY
          CASE status WHEN 'OPEN' THEN 0 WHEN 'UNDER_REVIEW' THEN 1 ELSE 2 END,
          datetime(createdAt) DESC
        LIMIT 10
      `
  ).all(like, like, like, like);
  return rows.map((dispute) => ({
    id: `dispute-${dispute.id}`,
    group: "Disputes",
    label: `Dispute #${dispute.id} - ${dispute.issueType}`,
    subtitle: dispute.message.substring(0, 80) + (dispute.message.length > 80 ? "..." : ""),
    badge: `${dispute.status} / ${dispute.priority}`
  }));
}
function searchPayments(db, term) {
  if (!tableExists(db, "ProjectTransaction") || !tableExists(db, "ProjectTracking") || !tableExists(db, "ClientJob"))
    return [];
  const like = `%${term}%`;
  const rows = db.prepare(
    `
        SELECT
          ProjectTransaction.id, ProjectTransaction.amount, ProjectTransaction.type, ProjectTransaction.status,
          COALESCE(ClientJob.title, ProjectTransaction.description, 'Project payment') AS jobTitle,
          TRIM(ClientUser.firstName || ' ' || ClientUser.lastName) AS clientName,
          TRIM(ProUser.firstName || ' ' || ProUser.lastName) AS professionalName
        FROM "ProjectTransaction"
        LEFT JOIN "ProjectTracking" ON ProjectTracking.id = ProjectTransaction.trackingId
        LEFT JOIN "ClientJob" ON ClientJob.id = ProjectTracking.jobId
        LEFT JOIN "User" AS ClientUser ON ClientUser.id = ProjectTransaction.clientId
        LEFT JOIN "User" AS ProUser ON ProUser.id = ProjectTransaction.professionalId
        WHERE
          LOWER(ClientJob.title) LIKE LOWER(?) OR
          LOWER(ProjectTransaction.description) LIKE LOWER(?) OR
          LOWER(ProjectTransaction.type) LIKE LOWER(?) OR
          LOWER(ProjectTransaction.status) LIKE LOWER(?) OR
          LOWER(TRIM(ClientUser.firstName || ' ' || ClientUser.lastName)) LIKE LOWER(?) OR
          LOWER(TRIM(ProUser.firstName || ' ' || ProUser.lastName)) LIKE LOWER(?) OR
          LOWER(ClientUser.email) LIKE LOWER(?) OR
          LOWER(ProUser.email) LIKE LOWER(?)
        ORDER BY datetime(ProjectTransaction.createdAt) DESC
        LIMIT 10
      `
  ).all(like, like, like, like, like, like, like, like);
  return rows.map((payment) => ({
    id: `payment-${payment.id}`,
    group: "Payments",
    label: payment.jobTitle,
    subtitle: `${payment.clientName} → ${payment.professionalName}`,
    badge: `${payment.type} / $${(payment.amount || 0).toLocaleString()}`
  }));
}
function adminGlobalSearch(query) {
  const term = query.trim();
  if (!term || term.length < 1) {
    return { query, results: [], totalCount: 0 };
  }
  const db = getDatabase();
  const users = searchUsers(db, term);
  const jobs = searchJobs(db, term);
  const disputes = searchDisputes(db, term);
  const payments = searchPayments(db, term);
  const allResults = [...users, ...jobs, ...disputes, ...payments];
  return {
    query: term,
    results: allResults,
    totalCount: allResults.length
  };
}
const performSearch_createServerFn_handler = createServerRpc({
  id: "03fe474a9b0c6cd7a657ab1e7c76c97e2f51b03af3a1674c897cf45a7674189b",
  name: "performSearch",
  filename: "src/components/GlobalSearch.tsx"
}, (opts) => performSearch.__executeServer(opts));
const performSearch = createServerFn({
  method: "GET"
}).inputValidator((input) => input).handler(performSearch_createServerFn_handler, async ({
  data
}) => {
  return adminGlobalSearch(data.query);
});
export {
  performSearch_createServerFn_handler
};
