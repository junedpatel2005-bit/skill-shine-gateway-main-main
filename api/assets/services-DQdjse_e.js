import { c as createServerRpc } from "./createServerRpc-BSWJlf3j.js";
import { c as createServerFn } from "./server-KxTtotOh.js";
import { a as getTotalProfessionalsCount, g as getServiceCategories } from "./services-db.server-BD-EXStA.js";
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
const loadServicesData_createServerFn_handler = createServerRpc({
  id: "6f7c48b478f865c6aa2d7de1ee4ba1c033ec49a13573320a947be5889b3768fb",
  name: "loadServicesData",
  filename: "src/routes/services.tsx"
}, (opts) => loadServicesData.__executeServer(opts));
const loadServicesData = createServerFn({
  method: "GET"
}).handler(loadServicesData_createServerFn_handler, async () => {
  return {
    categories: getServiceCategories(),
    totalPros: getTotalProfessionalsCount()
  };
});
export {
  loadServicesData_createServerFn_handler
};
