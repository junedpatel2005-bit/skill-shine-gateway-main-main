import "react/jsx-runtime";
import { c as createServerRpc } from "./createServerRpc-BSWJlf3j.js";
import { c as createServerFn } from "./server-KxTtotOh.js";
import { b as getCurrentUser, ar as getProfessionalWithdrawals, p as getUserProjectTransactions, as as createProfessionalWithdrawalRequest } from "../server.js";
import "@tanstack/router-core";
import "node:async_hooks";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core/ssr/server";
import "react";
import "@tanstack/react-router";
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
const getEarningsData_createServerFn_handler = createServerRpc({
  id: "691df0d0f8aeff3d6aadaaf9faa9297462dff6cac5b57ca82500889f4d1ad1cb",
  name: "getEarningsData",
  filename: "src/professional/earnings.tsx"
}, (opts) => getEarningsData.__executeServer(opts));
const getEarningsData = createServerFn({
  method: "GET"
}).handler(getEarningsData_createServerFn_handler, async () => {
  const viewer = getCurrentUser();
  if (!viewer) {
    return {
      viewer: null,
      transactions: [],
      withdrawals: []
    };
  }
  return {
    viewer,
    transactions: getUserProjectTransactions(viewer.id),
    withdrawals: viewer.role === "PROFESSIONAL" ? getProfessionalWithdrawals(viewer.id) : []
  };
});
const requestWithdrawal_createServerFn_handler = createServerRpc({
  id: "4e78feff978e75cd52051d26d221c6c099c8394984a3718bbdb8706e224e31c9",
  name: "requestWithdrawal",
  filename: "src/professional/earnings.tsx"
}, (opts) => requestWithdrawal.__executeServer(opts));
const requestWithdrawal = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(requestWithdrawal_createServerFn_handler, async ({
  data
}) => {
  const viewer = getCurrentUser();
  if (!viewer || viewer.role !== "PROFESSIONAL") {
    throw new Error("Only professionals can request withdrawals.");
  }
  return createProfessionalWithdrawalRequest(viewer.id, data);
});
export {
  getEarningsData_createServerFn_handler,
  requestWithdrawal_createServerFn_handler
};
