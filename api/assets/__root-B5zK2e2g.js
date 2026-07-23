import { c as createServerRpc } from "./createServerRpc-BSWJlf3j.js";
import { c as createServerFn } from "./server-KxTtotOh.js";
import "../server.js";
import "node:crypto";
import "node:fs/promises";
import "node:path";
import "zod";
import "nodemailer";
import "node:async_hooks";
import "h3-v2";
import "@prisma/client";
import "xss";
import "socket.io-client";
import "@tanstack/router-core";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core/ssr/server";
import "react";
import "@tanstack/react-router";
import "react/jsx-runtime";
import "@tanstack/react-router/ssr/server";
const loadPublishedEditorPages_createServerFn_handler = createServerRpc({
  id: "a21b3d6cf93c73b3a0a3bfb37e618c75f752705a70cc7607a5e2db6bbb3eb8c3",
  name: "loadPublishedEditorPages",
  filename: "src/routes/__root.tsx"
}, (opts) => loadPublishedEditorPages.__executeServer(opts));
const loadPublishedEditorPages = createServerFn({
  method: "GET"
}).handler(loadPublishedEditorPages_createServerFn_handler, async () => {
  const {
    listPublishedWebsitePages
  } = await import("../server.js").then((n) => n.aC);
  return listPublishedWebsitePages();
});
export {
  loadPublishedEditorPages_createServerFn_handler
};
