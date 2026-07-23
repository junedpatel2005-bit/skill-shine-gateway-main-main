import { c as createServerRpc } from "./createServerRpc-BSWJlf3j.js";
import { c as createServerFn } from "./server-KxTtotOh.js";
import { b as getCurrentUser, K as getUserNotifications, L as markUserNotificationsRead, M as clearUserNotifications } from "../server.js";
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
import "node:path";
import "zod";
import "nodemailer";
import "h3-v2";
import "@prisma/client";
import "xss";
import "socket.io-client";
const getAdminNotifications_createServerFn_handler = createServerRpc({
  id: "ff434e75bc89341f957044cac77a2690d285d7052aee5ea9f68120cee5984435",
  name: "getAdminNotifications",
  filename: "src/admin/admin-notifications.tsx"
}, (opts) => getAdminNotifications.__executeServer(opts));
const getAdminNotifications = createServerFn({
  method: "GET"
}).handler(getAdminNotifications_createServerFn_handler, async () => {
  const viewer = getCurrentUser();
  if (!viewer || viewer.role !== "ADMIN") {
    return null;
  }
  return {
    viewer,
    notifications: getUserNotifications(viewer.id, "ADMIN")
  };
});
const markAdminNotificationsRead_createServerFn_handler = createServerRpc({
  id: "aa2cd770358103e83638d3ec2ca758b10579b0e0280be5ae356a514f8b1f099d",
  name: "markAdminNotificationsRead",
  filename: "src/admin/admin-notifications.tsx"
}, (opts) => markAdminNotificationsRead.__executeServer(opts));
const markAdminNotificationsRead = createServerFn({
  method: "POST"
}).handler(markAdminNotificationsRead_createServerFn_handler, async () => {
  const viewer = getCurrentUser();
  if (!viewer || viewer.role !== "ADMIN") {
    throw new Error("Admin access required.");
  }
  markUserNotificationsRead(viewer.id, "ADMIN");
});
const clearAdminNotifications_createServerFn_handler = createServerRpc({
  id: "0c86f3e56ddd26cf4be6ac95c8df4027d8dc824522e054266058cdcf9b5d6041",
  name: "clearAdminNotifications",
  filename: "src/admin/admin-notifications.tsx"
}, (opts) => clearAdminNotifications.__executeServer(opts));
const clearAdminNotifications = createServerFn({
  method: "POST"
}).handler(clearAdminNotifications_createServerFn_handler, async () => {
  const viewer = getCurrentUser();
  if (!viewer || viewer.role !== "ADMIN") {
    throw new Error("Admin access required.");
  }
  clearUserNotifications(viewer.id, "ADMIN");
});
export {
  clearAdminNotifications_createServerFn_handler,
  getAdminNotifications_createServerFn_handler,
  markAdminNotificationsRead_createServerFn_handler
};
