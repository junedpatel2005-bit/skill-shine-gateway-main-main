import { c as createServerRpc } from "./createServerRpc-BSWJlf3j.js";
import { c as createServerFn } from "./server-KxTtotOh.js";
import { S as requireCurrentUserRole, T as getClientProfileByUserId, s as saveClientJobSchema, U as updateClientJob, V as createClientJob, W as getClientJobById } from "../server.js";
import { g as getServiceCategories } from "./services-db.server-BD-EXStA.js";
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
const getPostJobAccess_createServerFn_handler = createServerRpc({
  id: "84591fcb04b7f6eb0f011841c740911f1042c20b8d0970e0de1fa91c3a35fdde",
  name: "getPostJobAccess",
  filename: "src/client/post-job.tsx"
}, (opts) => getPostJobAccess.__executeServer(opts));
const getPostJobAccess = createServerFn({
  method: "GET"
}).handler(getPostJobAccess_createServerFn_handler, async () => {
  const viewer = requireCurrentUserRole("CLIENT");
  const clientProfile = getClientProfileByUserId(viewer.id);
  return {
    viewer,
    clientProfile,
    categories: getServiceCategories()
  };
});
const saveClientJob_createServerFn_handler = createServerRpc({
  id: "4df961514bde49cbb0c7192f9b69ed61c09ffaf2e449825947edd4cf122b67e2",
  name: "saveClientJob",
  filename: "src/client/post-job.tsx"
}, (opts) => saveClientJob.__executeServer(opts));
const saveClientJob = createServerFn({
  method: "POST"
}).inputValidator((data) => ({
  draftId: data.draftId ?? null,
  job: saveClientJobSchema.parse(data.job)
})).handler(saveClientJob_createServerFn_handler, async ({
  data
}) => {
  const viewer = requireCurrentUserRole("CLIENT");
  const job = data.draftId ? await updateClientJob(viewer.id, data.draftId, data.job) : await createClientJob(viewer.id, data.job);
  return {
    ok: true,
    job
  };
});
const getDraftJob_createServerFn_handler = createServerRpc({
  id: "1098c7c3c4f88c50c233de7e63d13343b5b364d4f9c196863026dc40cd9265aa",
  name: "getDraftJob",
  filename: "src/client/post-job.tsx"
}, (opts) => getDraftJob.__executeServer(opts));
const getDraftJob = createServerFn({
  method: "GET"
}).inputValidator((data) => data).handler(getDraftJob_createServerFn_handler, async ({
  data
}) => {
  const viewer = requireCurrentUserRole("CLIENT");
  const job = await getClientJobById(viewer.id, data.draftId);
  if (!job || job.status !== "DRAFT") {
    return null;
  }
  return job;
});
export {
  getDraftJob_createServerFn_handler,
  getPostJobAccess_createServerFn_handler,
  saveClientJob_createServerFn_handler
};
