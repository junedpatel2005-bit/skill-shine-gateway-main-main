import { c as createServerRpc } from "./createServerRpc-BSWJlf3j.js";
import { c as createServerFn } from "./server-KxTtotOh.js";
import { b as getCurrentUser, f as getAdminDashboardSnapshot, d as getAdminDisputeRecords, e as getAdminJobRecords, n as updateAdminDisputeStatus } from "../server.js";
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
const getJobManagementData_createServerFn_handler = createServerRpc({
  id: "5feb31bfc71b14ea08550c2b12b4cc18685f13d087894e33b7082e8ad614492d",
  name: "getJobManagementData",
  filename: "src/routes/job-management.tsx"
}, (opts) => getJobManagementData.__executeServer(opts));
const getJobManagementData = createServerFn({
  method: "GET"
}).handler(getJobManagementData_createServerFn_handler, async () => {
  const viewer = getCurrentUser();
  if (!viewer || viewer.role !== "ADMIN") {
    return {
      viewer,
      jobs: [],
      disputes: [],
      dashboard: null
    };
  }
  return {
    viewer,
    jobs: getAdminJobRecords(),
    disputes: getAdminDisputeRecords(),
    dashboard: getAdminDashboardSnapshot()
  };
});
const updateDisputeReviewStatus_createServerFn_handler = createServerRpc({
  id: "3c1e409d910825d3a5a277a9a5f297e2365837eb02ddc09f92a7788eef1bf966",
  name: "updateDisputeReviewStatus",
  filename: "src/routes/job-management.tsx"
}, (opts) => updateDisputeReviewStatus.__executeServer(opts));
const updateDisputeReviewStatus = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(updateDisputeReviewStatus_createServerFn_handler, async ({
  data
}) => {
  const viewer = getCurrentUser();
  if (!viewer || viewer.role !== "ADMIN") {
    throw new Error("Only admins can update disputes.");
  }
  return updateAdminDisputeStatus(data.disputeId, data.status);
});
export {
  getJobManagementData_createServerFn_handler,
  updateDisputeReviewStatus_createServerFn_handler
};
