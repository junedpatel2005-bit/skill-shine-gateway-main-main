import { c as createServerRpc } from "./createServerRpc-BSWJlf3j.js";
import { c as createServerFn } from "./server-KxTtotOh.js";
import { b as getCurrentUser } from "../server.js";
import { a as getAdminVerificationRecords, b as updateProfessionalVerificationStatusByAdmin } from "./pro-verification-db.server-D59mOpva.js";
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
const getVerificationManagementData_createServerFn_handler = createServerRpc({
  id: "38e7ef89a0190d3ec419669020cd02b27ca22e5de02c1c2ccabcf2787f723cd2",
  name: "getVerificationManagementData",
  filename: "src/routes/verification-management.tsx"
}, (opts) => getVerificationManagementData.__executeServer(opts));
const getVerificationManagementData = createServerFn({
  method: "GET"
}).handler(getVerificationManagementData_createServerFn_handler, async () => {
  const viewer = getCurrentUser();
  if (!viewer || viewer.role !== "ADMIN") {
    return {
      viewer,
      records: []
    };
  }
  return {
    viewer,
    records: getAdminVerificationRecords()
  };
});
const updateVerificationReviewStatus_createServerFn_handler = createServerRpc({
  id: "e0d667c0383670fd421af6b54f07f455c7fc8ad5909abf4b6548b358809bd6b6",
  name: "updateVerificationReviewStatus",
  filename: "src/routes/verification-management.tsx"
}, (opts) => updateVerificationReviewStatus.__executeServer(opts));
const updateVerificationReviewStatus = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(updateVerificationReviewStatus_createServerFn_handler, async ({
  data
}) => {
  const viewer = getCurrentUser();
  if (!viewer || viewer.role !== "ADMIN") {
    throw new Error("Only admins can review professional verification.");
  }
  return updateProfessionalVerificationStatusByAdmin(data.userId, data.status);
});
export {
  getVerificationManagementData_createServerFn_handler,
  updateVerificationReviewStatus_createServerFn_handler
};
