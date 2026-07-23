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
const getClientReportsData_createServerFn_handler = createServerRpc({
  id: "2114fbcd804606ec0ffa4509ea56beb9c77d12bf8af2b79accd1d13504827428",
  name: "getClientReportsData",
  filename: "src/routes/client-reports.tsx"
}, (opts) => getClientReportsData.__executeServer(opts));
const getClientReportsData = createServerFn({
  method: "GET"
}).handler(getClientReportsData_createServerFn_handler, async () => {
  const viewer = getCurrentUser();
  if (!viewer || viewer.role !== "CLIENT") {
    throw new Error("Not authorized");
  }
  return {
    viewer
  };
});
export {
  getClientReportsData_createServerFn_handler
};
