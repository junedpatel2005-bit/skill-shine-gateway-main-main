import { c as createServerRpc } from "./createServerRpc-BSWJlf3j.js";
import { c as createServerFn } from "./server-KxTtotOh.js";
import { b as getCurrentUser } from "../server.js";
import { g as getProfessionalVerificationByUserId, u as upsertProfessionalVerification } from "./pro-verification-db.server-D59mOpva.js";
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
const getVerificationPage_createServerFn_handler = createServerRpc({
  id: "38e4caa85870d2b011787db77ba991ad42b78eece051c99b92d28accc79e7e34",
  name: "getVerificationPage",
  filename: "src/professional/verification.tsx"
}, (opts) => getVerificationPage.__executeServer(opts));
const getVerificationPage = createServerFn({
  method: "GET"
}).handler(getVerificationPage_createServerFn_handler, async () => {
  const viewer = getCurrentUser();
  if (!viewer) {
    return null;
  }
  return {
    viewer,
    verification: getProfessionalVerificationByUserId(viewer.id)
  };
});
const saveVerificationDocument_createServerFn_handler = createServerRpc({
  id: "221f7999531e9ffd902d29b3f85e75eda20ade33378579e143f61defc4e53495",
  name: "saveVerificationDocument",
  filename: "src/professional/verification.tsx"
}, (opts) => saveVerificationDocument.__executeServer(opts));
const saveVerificationDocument = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(saveVerificationDocument_createServerFn_handler, async ({
  data
}) => {
  const viewer = getCurrentUser();
  if (!viewer || viewer.role !== "PROFESSIONAL") {
    return {
      ok: false,
      formError: "Only professional accounts can save verification documents."
    };
  }
  const current = getProfessionalVerificationByUserId(viewer.id);
  const next = {
    ...current,
    [data.key]: data.key === "certifications" ? [data.value] : data.value
  };
  const verification = upsertProfessionalVerification({
    userId: viewer.id,
    governmentIdUrl: next.governmentIdUrl,
    licenseUrl: next.licenseUrl,
    certifications: next.certifications,
    insuranceUrl: next.insuranceUrl,
    selfieUrl: next.selfieUrl
  });
  return {
    ok: true,
    verification
  };
});
export {
  getVerificationPage_createServerFn_handler,
  saveVerificationDocument_createServerFn_handler
};
