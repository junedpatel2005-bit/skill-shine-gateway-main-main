import { c as createServerRpc } from "./createServerRpc-BSWJlf3j.js";
import { c as createServerFn } from "./server-KxTtotOh.js";
import { b as getCurrentUser, ax as getAdminEarningsReport, ay as updateAdminPayoutStatus } from "../server.js";
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
const getEarningsReportsData_createServerFn_handler = createServerRpc({
  id: "f108177aa08367938e52b83bddcc36fd4b131fcfe5a95865744a3cb3f9976718",
  name: "getEarningsReportsData",
  filename: "src/routes/earnings-reports.tsx"
}, (opts) => getEarningsReportsData.__executeServer(opts));
const getEarningsReportsData = createServerFn({
  method: "GET"
}).handler(getEarningsReportsData_createServerFn_handler, async () => {
  const viewer = getCurrentUser();
  if (!viewer || viewer.role !== "ADMIN") {
    return {
      viewer,
      report: null
    };
  }
  return {
    viewer,
    report: getAdminEarningsReport()
  };
});
const updatePayoutReviewStatus_createServerFn_handler = createServerRpc({
  id: "d7a541c7e5704b9aa7e159708b81abd37fbd1a93c5c947fea36e447fdc291d62",
  name: "updatePayoutReviewStatus",
  filename: "src/routes/earnings-reports.tsx"
}, (opts) => updatePayoutReviewStatus.__executeServer(opts));
const updatePayoutReviewStatus = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(updatePayoutReviewStatus_createServerFn_handler, async ({
  data
}) => {
  const viewer = getCurrentUser();
  if (!viewer || viewer.role !== "ADMIN") {
    throw new Error("Only admins can update payout status.");
  }
  return updateAdminPayoutStatus(data.payoutId, data.status);
});
export {
  getEarningsReportsData_createServerFn_handler,
  updatePayoutReviewStatus_createServerFn_handler
};
