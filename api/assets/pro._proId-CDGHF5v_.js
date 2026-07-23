import { c as createServerRpc } from "./createServerRpc-BSWJlf3j.js";
import { c as createServerFn } from "./server-KxTtotOh.js";
import { b as getCurrentUser, A as getProfessionalProfileByUserId } from "../server.js";
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
const getProDetails_createServerFn_handler = createServerRpc({
  id: "80eabf15f2715bb64d656ee1c68f69421d7daa00d87f9a424a70ef6c8aa3e507",
  name: "getProDetails",
  filename: "src/professional/pro.$proId.tsx"
}, (opts) => getProDetails.__executeServer(opts));
const getProDetails = createServerFn({
  method: "GET"
}).inputValidator((id) => id).handler(getProDetails_createServerFn_handler, async ({
  data
}) => {
  const viewer = getCurrentUser();
  const proId = Number(data);
  if (!Number.isInteger(proId)) {
    return null;
  }
  const profile = getProfessionalProfileByUserId(proId);
  if (!profile) return null;
  const verification = getProfessionalVerificationByUserId(proId);
  return {
    viewer,
    profile,
    verification
  };
});
export {
  getProDetails_createServerFn_handler
};
