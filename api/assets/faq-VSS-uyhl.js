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
const loadFaqPage_createServerFn_handler = createServerRpc({
  id: "a172767e0829445458bae5e557f8faaa303ac6ae415111c949002c34f3898285",
  name: "loadFaqPage",
  filename: "src/client/faq.tsx"
}, (opts) => loadFaqPage.__executeServer(opts));
const loadFaqPage = createServerFn({
  method: "GET"
}).handler(loadFaqPage_createServerFn_handler, async () => {
  const {
    getPublishedLegalPageBySlug
  } = await import("./legal-cms.server-p_scZBkT.js");
  return {
    cmsPage: await getPublishedLegalPageBySlug("faq") || null
  };
});
export {
  loadFaqPage_createServerFn_handler
};
