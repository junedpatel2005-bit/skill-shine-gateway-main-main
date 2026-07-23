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
const getProfessionalReportsData_createServerFn_handler = createServerRpc({
  id: "f522407dafc3847e81c19f552cdd8d1599c8f85d9d2f336df1bfcf1ec7902cca",
  name: "getProfessionalReportsData",
  filename: "src/routes/professional-reports.tsx"
}, (opts) => getProfessionalReportsData.__executeServer(opts));
const getProfessionalReportsData = createServerFn({
  method: "GET"
}).handler(getProfessionalReportsData_createServerFn_handler, async () => {
  const viewer = getCurrentUser();
  if (!viewer || viewer.role !== "PROFESSIONAL") {
    throw new Error("Not authorized");
  }
  return {
    viewer
  };
});
export {
  getProfessionalReportsData_createServerFn_handler
};
