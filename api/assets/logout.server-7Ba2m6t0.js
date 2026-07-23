import { c as createServerRpc } from "./createServerRpc-BSWJlf3j.js";
import { c as createServerFn } from "./server-KxTtotOh.js";
import { g as getResponse, aw as clearSessionCookie } from "../server.js";
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
const logoutAction_createServerFn_handler = createServerRpc({
  id: "d6cb18f803edd4461bd987b58b861aeac8b544386153c085fd62a805954f078d",
  name: "logoutAction",
  filename: "src/lib/logout.server.ts"
}, (opts) => logoutAction.__executeServer(opts));
const logoutAction = createServerFn({
  method: "POST"
}).handler(logoutAction_createServerFn_handler, async () => {
  const response = getResponse();
  response.headers.set("Set-Cookie", clearSessionCookie());
  return {
    ok: true
  };
});
export {
  logoutAction_createServerFn_handler
};
