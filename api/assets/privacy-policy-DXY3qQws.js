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
const loadPrivacyPage_createServerFn_handler = createServerRpc({
  id: "aa570f29499fd324ade1a4bebcdf028039d509b20f350df4392626c54629c4d9",
  name: "loadPrivacyPage",
  filename: "src/routes/privacy-policy.tsx"
}, (opts) => loadPrivacyPage.__executeServer(opts));
const loadPrivacyPage = createServerFn({
  method: "GET"
}).handler(loadPrivacyPage_createServerFn_handler, async () => {
  const {
    getPublishedLegalPageBySlug
  } = await import("./legal-cms.server-p_scZBkT.js");
  return {
    cmsPage: await getPublishedLegalPageBySlug("privacy-policy") || null
  };
});
export {
  loadPrivacyPage_createServerFn_handler
};
