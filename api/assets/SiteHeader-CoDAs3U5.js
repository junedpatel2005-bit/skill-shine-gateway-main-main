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
const getSiteHeaderUser_createServerFn_handler = createServerRpc({
  id: "47ad1f1e83a28c5c50411a048bd05de7a364ac9e0ca0cb9a48b4b93ea90f3f09",
  name: "getSiteHeaderUser",
  filename: "src/components/SiteHeader.tsx"
}, (opts) => getSiteHeaderUser.__executeServer(opts));
const getSiteHeaderUser = createServerFn({
  method: "GET"
}).handler(getSiteHeaderUser_createServerFn_handler, async () => getCurrentUser());
export {
  getSiteHeaderUser_createServerFn_handler
};
