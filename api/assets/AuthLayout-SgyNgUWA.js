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
const getAuthLayoutUser_createServerFn_handler = createServerRpc({
  id: "951c17a8842f1d7cb860c1d26decee12b7759ebea0e564cb42cf8b06b2fa6f96",
  name: "getAuthLayoutUser",
  filename: "src/components/AuthLayout.tsx"
}, (opts) => getAuthLayoutUser.__executeServer(opts));
const getAuthLayoutUser = createServerFn({
  method: "GET"
}).handler(getAuthLayoutUser_createServerFn_handler, async () => getCurrentUser());
export {
  getAuthLayoutUser_createServerFn_handler
};
