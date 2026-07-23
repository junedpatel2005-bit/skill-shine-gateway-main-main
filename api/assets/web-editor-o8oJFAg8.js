import { c as createServerRpc } from "./createServerRpc-BSWJlf3j.js";
import { c as createServerFn } from "./server-KxTtotOh.js";
import { b as getCurrentUser } from "../server.js";
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
const getWebEditorData_createServerFn_handler = createServerRpc({
  id: "cafc9756e06bfb73d91de8bc1aa45992a234b001e43353d2d042974b8b7b3eb0",
  name: "getWebEditorData",
  filename: "src/routes/web-editor.tsx"
}, (opts) => getWebEditorData.__executeServer(opts));
const getWebEditorData = createServerFn({
  method: "GET"
}).handler(getWebEditorData_createServerFn_handler, async () => {
  const viewer = getCurrentUser();
  if (!viewer || viewer.role !== "ADMIN") return {
    viewer: null,
    pages: []
  };
  const {
    listWebsitePages
  } = await import("../server.js").then((n) => n.aC);
  return {
    viewer,
    pages: await listWebsitePages()
  };
});
const saveWebEditorPage_createServerFn_handler = createServerRpc({
  id: "a4c31141410ac6780d4cd742b0257e4d637ef0ce0b6c71e3fdb2d21268b861b8",
  name: "saveWebEditorPage",
  filename: "src/routes/web-editor.tsx"
}, (opts) => saveWebEditorPage.__executeServer(opts));
const saveWebEditorPage = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(saveWebEditorPage_createServerFn_handler, async ({
  data
}) => {
  const viewer = getCurrentUser();
  if (!viewer || viewer.role !== "ADMIN") throw new Error("Admin access required.");
  const {
    saveWebsitePage
  } = await import("../server.js").then((n) => n.aC);
  return await saveWebsitePage(data.pageKey, data);
});
export {
  getWebEditorData_createServerFn_handler,
  saveWebEditorPage_createServerFn_handler
};
