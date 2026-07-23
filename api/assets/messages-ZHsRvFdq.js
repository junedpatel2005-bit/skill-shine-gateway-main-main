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
const getClientMessagesPage_createServerFn_handler = createServerRpc({
  id: "8bcb83b2ac36f74a5f33ec892c4b41348990edcd59ee70b521aefd68bf37407f",
  name: "getClientMessagesPage",
  filename: "src/client/messages.tsx"
}, (opts) => getClientMessagesPage.__executeServer(opts));
const getClientMessagesPage = createServerFn({
  method: "GET"
}).handler(getClientMessagesPage_createServerFn_handler, async () => ({
  viewer: getCurrentUser()
}));
export {
  getClientMessagesPage_createServerFn_handler
};
