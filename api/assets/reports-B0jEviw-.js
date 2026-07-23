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
const getReportsData_createServerFn_handler = createServerRpc({
  id: "900bb128350f2296e0f61f02a79dc7299cd447591d80524ec1c748722fb00a47",
  name: "getReportsData",
  filename: "src/routes/reports.tsx"
}, (opts) => getReportsData.__executeServer(opts));
const getReportsData = createServerFn({
  method: "GET"
}).handler(getReportsData_createServerFn_handler, async () => {
  const viewer = getCurrentUser();
  return {
    viewer
  };
});
export {
  getReportsData_createServerFn_handler
};
