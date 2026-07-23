import { c as createServerRpc } from "./createServerRpc-BSWJlf3j.js";
import { c as createServerFn } from "./server-KxTtotOh.js";
import { b as getCurrentUser, A as getProfessionalProfileByUserId, X as getClientJobsByUserId, S as requireCurrentUserRole, ac as createHireContract } from "../server.js";
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
const getHireDetails_createServerFn_handler = createServerRpc({
  id: "1afaf94834e254922e7bf7305944676301838ba478bbbb901e1d474bfdc16e99",
  name: "getHireDetails",
  filename: "src/client/hire.$proId.tsx"
}, (opts) => getHireDetails.__executeServer(opts));
const getHireDetails = createServerFn({
  method: "GET"
}).inputValidator((id) => id).handler(getHireDetails_createServerFn_handler, async ({
  data
}) => {
  const viewer = getCurrentUser();
  const proId = Number(data);
  if (!Number.isInteger(proId)) {
    return null;
  }
  const profile = await getProfessionalProfileByUserId(proId);
  if (!profile) {
    return null;
  }
  return {
    viewer,
    profile,
    projects: viewer?.role === "CLIENT" ? await getClientJobsByUserId(viewer.id) : []
  };
});
const saveHireContract_createServerFn_handler = createServerRpc({
  id: "ea47e43a69ab6d6ce8d3ded0358d8dd4612882a9bd94cb62d0bafb38860338b6",
  name: "saveHireContract",
  filename: "src/client/hire.$proId.tsx"
}, (opts) => saveHireContract.__executeServer(opts));
const saveHireContract = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(saveHireContract_createServerFn_handler, async ({
  data
}) => {
  const viewer = requireCurrentUserRole("CLIENT");
  const result = createHireContract(viewer.id, data);
  return {
    ok: true,
    ...result
  };
});
const getHireAccess_createServerFn_handler = createServerRpc({
  id: "49046d7c5730cbfe7bb34cd5d52f67bee14077c570bd1ff52fc6e218f54d687f",
  name: "getHireAccess",
  filename: "src/client/hire.$proId.tsx"
}, (opts) => getHireAccess.__executeServer(opts));
const getHireAccess = createServerFn({
  method: "GET"
}).handler(getHireAccess_createServerFn_handler, async () => {
  const viewer = requireCurrentUserRole("CLIENT");
  return {
    viewer
  };
});
export {
  getHireAccess_createServerFn_handler,
  getHireDetails_createServerFn_handler,
  saveHireContract_createServerFn_handler
};
