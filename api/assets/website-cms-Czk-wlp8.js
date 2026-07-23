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
const loadWebsiteCmsData_createServerFn_handler = createServerRpc({
  id: "aec19aa73a307cd432310028eaa0eed27043384ac6eee443f8aec6a9b8ecda9b",
  name: "loadWebsiteCmsData",
  filename: "src/routes/website-cms.tsx"
}, (opts) => loadWebsiteCmsData.__executeServer(opts));
const loadWebsiteCmsData = createServerFn({
  method: "GET"
}).handler(loadWebsiteCmsData_createServerFn_handler, async () => {
  const viewer = getCurrentUser();
  if (!viewer || viewer.role !== "ADMIN") {
    return {
      viewer: null,
      pages: []
    };
  }
  const {
    listLegalPages: listLegalPages2
  } = await import("./legal-cms.server-p_scZBkT.js");
  return {
    viewer,
    pages: await listLegalPages2()
  };
});
const saveWebsiteCmsPage_createServerFn_handler = createServerRpc({
  id: "fb9aa94d0347ab202806b7721a9146d2982139847d35e2d034072254935e44c8",
  name: "saveWebsiteCmsPage",
  filename: "src/routes/website-cms.tsx"
}, (opts) => saveWebsiteCmsPage.__executeServer(opts));
const saveWebsiteCmsPage = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(saveWebsiteCmsPage_createServerFn_handler, async ({
  data
}) => {
  const viewer = getCurrentUser();
  if (!viewer || viewer.role !== "ADMIN") {
    throw new Error("Only admins can update website CMS pages.");
  }
  const {
    saveLegalPage
  } = await import("./legal-cms.server-p_scZBkT.js");
  return await saveLegalPage(data.slug, {
    title: data.title,
    content: data.content,
    status: data.status
  });
});
export {
  loadWebsiteCmsData_createServerFn_handler,
  saveWebsiteCmsPage_createServerFn_handler
};
