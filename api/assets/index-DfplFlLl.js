import { c as createServerRpc } from "./createServerRpc-BSWJlf3j.js";
import { c as createServerFn } from "./server-KxTtotOh.js";
import { b as getCurrentUser, at as getProfessionalUsers, au as getFavoriteJobIds, Y as getOpenClientJobs } from "../server.js";
import { g as getProfessionalVerificationByUserId } from "./pro-verification-db.server-D59mOpva.js";
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
const getCurrentUserFn_createServerFn_handler = createServerRpc({
  id: "50c70bc07b503c6662e88c80b6c6da6d6dc2e14b88aab95aee2e3aa832bea6fe",
  name: "getCurrentUserFn",
  filename: "src/routes/index.tsx"
}, (opts) => getCurrentUserFn.__executeServer(opts));
const getCurrentUserFn = createServerFn({
  method: "GET"
}).handler(getCurrentUserFn_createServerFn_handler, async () => {
  const user = getCurrentUser();
  return user;
});
const getHomeData_createServerFn_handler = createServerRpc({
  id: "e5d3f5d948391b170b648653d55968324eb90a864ee693154a5ada87efb58755",
  name: "getHomeData",
  filename: "src/routes/index.tsx"
}, (opts) => getHomeData.__executeServer(opts));
const getHomeData = createServerFn({
  method: "GET"
}).handler(getHomeData_createServerFn_handler, async () => {
  const user = getCurrentUser();
  const {
    getPublishedWebsitePage
  } = await import("../server.js").then((n) => n.aC);
  const editorPage = await getPublishedWebsitePage("home");
  return {
    homeIntroHtml: editorPage ? extractFirstSection(editorPage.content) : null,
    openJobs: await getOpenClientJobs(),
    favoriteJobIds: user ? await getFavoriteJobIds(user.id) : [],
    professionals: (await getProfessionalUsers()).map((professional) => ({
      ...professional,
      verification: getProfessionalVerificationByUserId(professional.id)
    }))
  };
});
function extractFirstSection(content) {
  const section = content.match(/<section\b[\s\S]*?<\/section>/i)?.[0];
  return section || content;
}
export {
  getCurrentUserFn_createServerFn_handler,
  getHomeData_createServerFn_handler
};
