import { c as createServerRpc } from "./createServerRpc-BSWJlf3j.js";
import { c as createServerFn } from "./server-KxTtotOh.js";
import { b as getCurrentUser, T as getClientProfileByUserId, X as getClientJobsByUserId, Y as getOpenClientJobs, Z as updateClientJobStatus } from "../server.js";
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
const getDashboardAccess_createServerFn_handler = createServerRpc({
  id: "12163bba88d4762a9cb6b72f6c7362484b1d32999fba614b513a46288400c7ac",
  name: "getDashboardAccess",
  filename: "src/client/dashboard.tsx"
}, (opts) => getDashboardAccess.__executeServer(opts));
const getDashboardAccess = createServerFn({
  method: "GET"
}).handler(getDashboardAccess_createServerFn_handler, async () => {
  const viewer = getCurrentUser();
  if (!viewer) {
    return null;
  }
  if (viewer.role === "CLIENT") {
    const clientProfile = await getClientProfileByUserId(viewer.id);
    const clientJobs = await getClientJobsByUserId(viewer.id);
    return {
      viewer,
      clientProfile,
      clientJobs,
      openJobs: []
    };
  }
  return {
    viewer,
    clientProfile: null,
    clientJobs: [],
    openJobs: await getOpenClientJobs()
  };
});
const setClientJobStatus_createServerFn_handler = createServerRpc({
  id: "d10fd46a0f32cdc7ad911170dd8cf534414c29108be8166833d5526f9cdb0ea7",
  name: "setClientJobStatus",
  filename: "src/client/dashboard.tsx"
}, (opts) => setClientJobStatus.__executeServer(opts));
const setClientJobStatus = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(setClientJobStatus_createServerFn_handler, async ({
  data
}) => {
  const viewer = getCurrentUser();
  if (!viewer || viewer.role !== "CLIENT") {
    return {
      ok: false,
      formError: "Only clients can manage posted jobs."
    };
  }
  const job = await updateClientJobStatus(viewer.id, data.jobId, data.status);
  if (!job) {
    return {
      ok: false,
      formError: "Job not found."
    };
  }
  return {
    ok: true,
    job
  };
});
export {
  getDashboardAccess_createServerFn_handler,
  setClientJobStatus_createServerFn_handler
};
