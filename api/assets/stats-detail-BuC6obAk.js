import { c as createServerRpc } from "./createServerRpc-BSWJlf3j.js";
import { c as createServerFn } from "./server-KxTtotOh.js";
import { b as getCurrentUser, I as respondToProjectReview, B as createProfessionalNegotiation } from "../server.js";
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
const saveReviewResponse_createServerFn_handler = createServerRpc({
  id: "8a1c28cedc7196cd4f9754d02e7774264f54ef4c22e9e30f3479e991188e6cb0",
  name: "saveReviewResponse",
  filename: "src/professional/stats-detail.tsx"
}, (opts) => saveReviewResponse.__executeServer(opts));
const saveReviewResponse = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(saveReviewResponse_createServerFn_handler, async ({
  data
}) => {
  const viewer = getCurrentUser();
  if (!viewer || viewer.role !== "PROFESSIONAL") {
    throw new Error("Only professionals can respond to client reviews.");
  }
  return respondToProjectReview(viewer.id, data);
});
const sendNegotiationOffer_createServerFn_handler = createServerRpc({
  id: "21979ea036eadadfd14a1ef9fabc79f952b9d59dc1b92b8560d652fa27c1b7de",
  name: "sendNegotiationOffer",
  filename: "src/professional/stats-detail.tsx"
}, (opts) => sendNegotiationOffer.__executeServer(opts));
const sendNegotiationOffer = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(sendNegotiationOffer_createServerFn_handler, async ({
  data
}) => {
  const viewer = getCurrentUser();
  if (!viewer || viewer.role !== "PROFESSIONAL") {
    throw new Error("Only professionals can negotiate project requests.");
  }
  return createProfessionalNegotiation(viewer.id, data);
});
export {
  saveReviewResponse_createServerFn_handler,
  sendNegotiationOffer_createServerFn_handler
};
