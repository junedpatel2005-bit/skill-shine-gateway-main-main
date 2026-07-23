import { c as createServerRpc } from "./createServerRpc-BSWJlf3j.js";
import { c as createServerFn } from "./server-KxTtotOh.js";
import { b as getCurrentUser, p as getUserProjectTransactions, q as getProfessionalTrackedProjects, t as getProfessionalHireRequests, w as getProfessionalHireNegotiations, x as getProjectNegotiationsForProfessional, y as getFavoriteJobsByUserId, z as getProfessionalProjectRequests, A as getProfessionalProfileByUserId, B as createProfessionalNegotiation, C as updateProfessionalHireContractStatus, E as createProfessionalHireNegotiation, F as cancelProjectTracking, G as cancelHireProject, H as deleteRejectedHireRequest, I as respondToProjectReview } from "../server.js";
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
const getProfessionalStatsData_createServerFn_handler = createServerRpc({
  id: "050899b9025cd8acdf0542ff35da13724bb9b47516a7a04f814b8e1c68ba0a2c",
  name: "getProfessionalStatsData",
  filename: "src/professional/stats.tsx"
}, (opts) => getProfessionalStatsData.__executeServer(opts));
const getProfessionalStatsData = createServerFn({
  method: "GET"
}).handler(getProfessionalStatsData_createServerFn_handler, async () => {
  const viewer = getCurrentUser();
  if (!viewer) {
    return null;
  }
  if (viewer.role !== "PROFESSIONAL") {
    return {
      viewer,
      profile: null,
      projectRequests: [],
      favoriteJobs: [],
      projectNegotiations: [],
      hireNegotiations: [],
      hireRequests: [],
      trackedProjects: [],
      transactions: []
    };
  }
  return {
    viewer,
    profile: await getProfessionalProfileByUserId(viewer.id),
    projectRequests: await getProfessionalProjectRequests(viewer.id),
    favoriteJobs: await getFavoriteJobsByUserId(viewer.id),
    projectNegotiations: await getProjectNegotiationsForProfessional(viewer.id),
    hireNegotiations: await getProfessionalHireNegotiations(viewer.id),
    hireRequests: await getProfessionalHireRequests(viewer.id),
    trackedProjects: await getProfessionalTrackedProjects(viewer.id),
    transactions: await getUserProjectTransactions(viewer.id)
  };
});
const sendNegotiationOffer_createServerFn_handler = createServerRpc({
  id: "5bd7f7de8a64a2ee076ec76a556f559b62012f42b6011240ddf3997aad10414c",
  name: "sendNegotiationOffer",
  filename: "src/professional/stats.tsx"
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
const updateHireRequestStatus_createServerFn_handler = createServerRpc({
  id: "b7be1155b461346fba94102841135b1efac9a8414a9f7fb9af563d104284628d",
  name: "updateHireRequestStatus",
  filename: "src/professional/stats.tsx"
}, (opts) => updateHireRequestStatus.__executeServer(opts));
const updateHireRequestStatus = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(updateHireRequestStatus_createServerFn_handler, async ({
  data
}) => {
  const viewer = getCurrentUser();
  if (!viewer || viewer.role !== "PROFESSIONAL") {
    throw new Error("Only professionals can update hire requests.");
  }
  updateProfessionalHireContractStatus(viewer.id, data.contractId, data.status);
  return {
    contractId: data.contractId,
    status: data.status
  };
});
const sendHireNegotiationOffer_createServerFn_handler = createServerRpc({
  id: "de3e9c361ee6b8699fb59740e3f7f1792d454180e07aec30eaf58759859aaeb8",
  name: "sendHireNegotiationOffer",
  filename: "src/professional/stats.tsx"
}, (opts) => sendHireNegotiationOffer.__executeServer(opts));
const sendHireNegotiationOffer = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(sendHireNegotiationOffer_createServerFn_handler, async ({
  data
}) => {
  const viewer = getCurrentUser();
  if (!viewer || viewer.role !== "PROFESSIONAL") {
    throw new Error("Only professionals can negotiate direct hire requests.");
  }
  return createProfessionalHireNegotiation(viewer.id, data);
});
const cancelProfessionalTrackedProject_createServerFn_handler = createServerRpc({
  id: "9a9692dd4e7e76f31f2fd3771ae2a31bf928a5249b21dd9f68561ac178b30a86",
  name: "cancelProfessionalTrackedProject",
  filename: "src/professional/stats.tsx"
}, (opts) => cancelProfessionalTrackedProject.__executeServer(opts));
const cancelProfessionalTrackedProject = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(cancelProfessionalTrackedProject_createServerFn_handler, async ({
  data
}) => {
  const viewer = getCurrentUser();
  if (!viewer || viewer.role !== "PROFESSIONAL") {
    throw new Error("Only professionals can cancel projects from this page.");
  }
  return cancelProjectTracking(viewer.id, data.trackingId);
});
const cancelProfessionalDirectHireProject_createServerFn_handler = createServerRpc({
  id: "cae39de6756e250edd0006d2fc13cb6a28c1f3d827e6b6b18554134d1b321d41",
  name: "cancelProfessionalDirectHireProject",
  filename: "src/professional/stats.tsx"
}, (opts) => cancelProfessionalDirectHireProject.__executeServer(opts));
const cancelProfessionalDirectHireProject = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(cancelProfessionalDirectHireProject_createServerFn_handler, async ({
  data
}) => {
  const viewer = getCurrentUser();
  if (!viewer || viewer.role !== "PROFESSIONAL") {
    throw new Error("Only professionals can cancel direct hire projects from this page.");
  }
  return cancelHireProject(viewer.id, data.contractId);
});
const deleteProfessionalRejectedDirectHire_createServerFn_handler = createServerRpc({
  id: "c1dda5569f7d8a8222f5345ddcffb7e438089ea88d58e762a57ec868d51a5db2",
  name: "deleteProfessionalRejectedDirectHire",
  filename: "src/professional/stats.tsx"
}, (opts) => deleteProfessionalRejectedDirectHire.__executeServer(opts));
const deleteProfessionalRejectedDirectHire = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(deleteProfessionalRejectedDirectHire_createServerFn_handler, async ({
  data
}) => {
  const viewer = getCurrentUser();
  if (!viewer || viewer.role !== "PROFESSIONAL") {
    throw new Error("Only professionals can delete rejected direct hire requests from this page.");
  }
  return deleteRejectedHireRequest(viewer.id, data.contractId);
});
const saveReviewResponse_createServerFn_handler = createServerRpc({
  id: "fbaf96e46299326181a9fe147d6f35c7702b6d5d89c811f690a6a22af5cf1ddf",
  name: "saveReviewResponse",
  filename: "src/professional/stats.tsx"
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
export {
  cancelProfessionalDirectHireProject_createServerFn_handler,
  cancelProfessionalTrackedProject_createServerFn_handler,
  deleteProfessionalRejectedDirectHire_createServerFn_handler,
  getProfessionalStatsData_createServerFn_handler,
  saveReviewResponse_createServerFn_handler,
  sendHireNegotiationOffer_createServerFn_handler,
  sendNegotiationOffer_createServerFn_handler,
  updateHireRequestStatus_createServerFn_handler
};
