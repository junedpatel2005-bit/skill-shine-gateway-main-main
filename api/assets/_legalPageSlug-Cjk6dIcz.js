import { c as createServerRpc } from "./createServerRpc-BSWJlf3j.js";
import { c as createServerFn } from "./server-KxTtotOh.js";
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
const loadLegalPage_createServerFn_handler = createServerRpc({
  id: "0e146aa39fde9d262e6e06f126a0893e440b786e0b8895f309e09355d861878f",
  name: "loadLegalPage",
  filename: "src/routes/$legalPageSlug.tsx"
}, (opts) => loadLegalPage.__executeServer(opts));
const loadLegalPage = createServerFn({
  method: "GET"
}).inputValidator((input) => input).handler(loadLegalPage_createServerFn_handler, async ({
  data
}) => {
  const {
    getPublishedLegalPageBySlug
  } = await import("./legal-cms.server-p_scZBkT.js");
  return await getPublishedLegalPageBySlug(data.slug) || null;
});
export {
  loadLegalPage_createServerFn_handler
};
