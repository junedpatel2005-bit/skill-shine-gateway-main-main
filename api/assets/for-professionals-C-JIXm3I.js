import { c as createServerRpc } from "./createServerRpc-BSWJlf3j.js";
import { c as createServerFn } from "./server-KxTtotOh.js";
import { Y as getOpenClientJobs } from "../server.js";
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
const getHomeData_createServerFn_handler = createServerRpc({
  id: "fdd2792a2c24c834517782fc4c0a485940ed26d7156272db363b023a115fd9b1",
  name: "getHomeData",
  filename: "src/professional/for-professionals.tsx"
}, (opts) => getHomeData.__executeServer(opts));
const getHomeData = createServerFn({
  method: "GET"
}).handler(getHomeData_createServerFn_handler, async () => {
  return {
    openJobs: await getOpenClientJobs()
  };
});
export {
  getHomeData_createServerFn_handler
};
