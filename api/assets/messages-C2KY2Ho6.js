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
const getProfessionalMessagesPage_createServerFn_handler = createServerRpc({
  id: "caa7ea0460ff589ca14ad47e869b8dca5174757b5a6860c21cdb76719c13198c",
  name: "getProfessionalMessagesPage",
  filename: "src/professional/messages.tsx"
}, (opts) => getProfessionalMessagesPage.__executeServer(opts));
const getProfessionalMessagesPage = createServerFn({
  method: "GET"
}).handler(getProfessionalMessagesPage_createServerFn_handler, async () => ({
  viewer: getCurrentUser()
}));
export {
  getProfessionalMessagesPage_createServerFn_handler
};
