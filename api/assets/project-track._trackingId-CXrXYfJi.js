import { c as createServerRpc } from "./createServerRpc-BSWJlf3j.js";
import { c as createServerFn } from "./server-KxTtotOh.js";
import { b as getCurrentUser, a0 as getOrCreateProjectTrackingDetails, a1 as createProjectWorkUpload, a2 as deleteProjectWorkUpload, a3 as createProjectRevisionRequest, a4 as deleteProjectRevisionRequest, a5 as createProjectMilestone, a6 as updateProjectMilestoneStatus, a7 as deleteProjectMilestone, a8 as submitProjectCompletion, a9 as updateProjectCompletionStatus, aa as rateCompletedProject, ab as createProjectDispute } from "../server.js";
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
const getTrackingPageData_createServerFn_handler = createServerRpc({
  id: "e451185b765523e82bfb50e816caab6fdd07884d4e3887d63e531ff6649f30fe",
  name: "getTrackingPageData",
  filename: "src/client/project-track.$trackingId.tsx"
}, (opts) => getTrackingPageData.__executeServer(opts));
const getTrackingPageData = createServerFn({
  method: "GET"
}).inputValidator((trackingKey) => trackingKey).handler(getTrackingPageData_createServerFn_handler, async ({
  data
}) => {
  const viewer = getCurrentUser();
  const trackingKey = Number(data);
  if (!viewer) {
    return null;
  }
  if (!Number.isInteger(trackingKey) || trackingKey <= 0) {
    return {
      viewer,
      tracking: null
    };
  }
  const tracking = getOrCreateProjectTrackingDetails(viewer.id, trackingKey);
  return {
    viewer,
    tracking
  };
});
const uploadProjectWork_createServerFn_handler = createServerRpc({
  id: "f636a1fc0798a6c639b7a495c21195375d0683eda240bab05234d6ef15e816f5",
  name: "uploadProjectWork",
  filename: "src/client/project-track.$trackingId.tsx"
}, (opts) => uploadProjectWork.__executeServer(opts));
const uploadProjectWork = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(uploadProjectWork_createServerFn_handler, async ({
  data
}) => {
  const viewer = getCurrentUser();
  if (!viewer || viewer.role !== "PROFESSIONAL") {
    throw new Error("Only professionals can upload project work.");
  }
  return createProjectWorkUpload(viewer.id, data);
});
const deleteUploadedWork_createServerFn_handler = createServerRpc({
  id: "9e3e92a6c974eec47913ae5d84eadaf5914fdecd33993b0c2f00e1ad6de28151",
  name: "deleteUploadedWork",
  filename: "src/client/project-track.$trackingId.tsx"
}, (opts) => deleteUploadedWork.__executeServer(opts));
const deleteUploadedWork = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(deleteUploadedWork_createServerFn_handler, async ({
  data
}) => {
  const viewer = getCurrentUser();
  if (!viewer || viewer.role !== "PROFESSIONAL") {
    throw new Error("Only professionals can delete uploaded work.");
  }
  return deleteProjectWorkUpload(viewer.id, data.uploadId);
});
const requestProjectRevision_createServerFn_handler = createServerRpc({
  id: "cb2bb861c5599608c85d8e21f78d33d7b6c50c46f72d5fe6e5b875ff153bfa9c",
  name: "requestProjectRevision",
  filename: "src/client/project-track.$trackingId.tsx"
}, (opts) => requestProjectRevision.__executeServer(opts));
const requestProjectRevision = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(requestProjectRevision_createServerFn_handler, async ({
  data
}) => {
  const viewer = getCurrentUser();
  if (!viewer || viewer.role !== "CLIENT") {
    throw new Error("Only clients can request revisions.");
  }
  return createProjectRevisionRequest(viewer.id, data);
});
const clearProjectRevision_createServerFn_handler = createServerRpc({
  id: "1ab8beec04065a6b46a91078b57a799f049604ec51d771fb9c676749bc38a17c",
  name: "clearProjectRevision",
  filename: "src/client/project-track.$trackingId.tsx"
}, (opts) => clearProjectRevision.__executeServer(opts));
const clearProjectRevision = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(clearProjectRevision_createServerFn_handler, async ({
  data
}) => {
  const viewer = getCurrentUser();
  if (!viewer || viewer.role !== "CLIENT") {
    throw new Error("Only clients can clear revision requests.");
  }
  return deleteProjectRevisionRequest(viewer.id, data.revisionId);
});
const addProjectMilestone_createServerFn_handler = createServerRpc({
  id: "84487b79c8c0dda0932e15f0b533c89810aacfc736af6087a50d35a8550d07f2",
  name: "addProjectMilestone",
  filename: "src/client/project-track.$trackingId.tsx"
}, (opts) => addProjectMilestone.__executeServer(opts));
const addProjectMilestone = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(addProjectMilestone_createServerFn_handler, async ({
  data
}) => {
  const viewer = getCurrentUser();
  if (!viewer || viewer.role !== "CLIENT") {
    throw new Error("Only clients can add milestones.");
  }
  return createProjectMilestone(viewer.id, data);
});
const changeMilestoneStatus_createServerFn_handler = createServerRpc({
  id: "e700a94027d492715aa27d3f891c8366f2ed540f86df2000a5c1552ca6db7596",
  name: "changeMilestoneStatus",
  filename: "src/client/project-track.$trackingId.tsx"
}, (opts) => changeMilestoneStatus.__executeServer(opts));
const changeMilestoneStatus = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(changeMilestoneStatus_createServerFn_handler, async ({
  data
}) => {
  const viewer = getCurrentUser();
  if (!viewer) {
    throw new Error("Please log in to update milestones.");
  }
  return updateProjectMilestoneStatus(viewer.id, data.milestoneId, data.status);
});
const removeProjectMilestone_createServerFn_handler = createServerRpc({
  id: "bdfd373e0f5cc6529d7b2d94d214b1d0e952f0e8734a7226a92bd6dd1652568e",
  name: "removeProjectMilestone",
  filename: "src/client/project-track.$trackingId.tsx"
}, (opts) => removeProjectMilestone.__executeServer(opts));
const removeProjectMilestone = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(removeProjectMilestone_createServerFn_handler, async ({
  data
}) => {
  const viewer = getCurrentUser();
  if (!viewer || viewer.role !== "CLIENT") {
    throw new Error("Only clients can delete milestones.");
  }
  return deleteProjectMilestone(viewer.id, data.milestoneId);
});
const submitFinalWork_createServerFn_handler = createServerRpc({
  id: "8a6d72fdedf604409984b58a246992318228fc681185ded0c9486f2e1fcee1f1",
  name: "submitFinalWork",
  filename: "src/client/project-track.$trackingId.tsx"
}, (opts) => submitFinalWork.__executeServer(opts));
const submitFinalWork = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(submitFinalWork_createServerFn_handler, async ({
  data
}) => {
  const viewer = getCurrentUser();
  if (!viewer || viewer.role !== "PROFESSIONAL") {
    throw new Error("Only professionals can submit finished work.");
  }
  return submitProjectCompletion(viewer.id, data);
});
const reviewFinalWork_createServerFn_handler = createServerRpc({
  id: "c829c55c5ec41e871fc4af8350f0d80871ebfd62b94c1435073a57be85993dee",
  name: "reviewFinalWork",
  filename: "src/client/project-track.$trackingId.tsx"
}, (opts) => reviewFinalWork.__executeServer(opts));
const reviewFinalWork = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(reviewFinalWork_createServerFn_handler, async ({
  data
}) => {
  const viewer = getCurrentUser();
  if (!viewer || viewer.role !== "CLIENT") {
    throw new Error("Only clients can review finished work.");
  }
  return updateProjectCompletionStatus(viewer.id, data.completionId, data.status);
});
const rateProjectProfessional_createServerFn_handler = createServerRpc({
  id: "80c5d0f5007def4b6d3b85805f512f4e7453a3d7ef5bc930f2cbab97f8977afc",
  name: "rateProjectProfessional",
  filename: "src/client/project-track.$trackingId.tsx"
}, (opts) => rateProjectProfessional.__executeServer(opts));
const rateProjectProfessional = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(rateProjectProfessional_createServerFn_handler, async ({
  data
}) => {
  const viewer = getCurrentUser();
  if (!viewer || viewer.role !== "CLIENT") {
    throw new Error("Only clients can rate completed projects.");
  }
  return rateCompletedProject(viewer.id, data);
});
const raiseProjectDispute_createServerFn_handler = createServerRpc({
  id: "b317eff85cc91e7d65af4c84256c953471969d1ad85d0c37dbe07e790417e43e",
  name: "raiseProjectDispute",
  filename: "src/client/project-track.$trackingId.tsx"
}, (opts) => raiseProjectDispute.__executeServer(opts));
const raiseProjectDispute = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(raiseProjectDispute_createServerFn_handler, async ({
  data
}) => {
  const viewer = getCurrentUser();
  if (!viewer) {
    throw new Error("Please log in to raise a dispute.");
  }
  return createProjectDispute(viewer.id, viewer.role, data);
});
export {
  addProjectMilestone_createServerFn_handler,
  changeMilestoneStatus_createServerFn_handler,
  clearProjectRevision_createServerFn_handler,
  deleteUploadedWork_createServerFn_handler,
  getTrackingPageData_createServerFn_handler,
  raiseProjectDispute_createServerFn_handler,
  rateProjectProfessional_createServerFn_handler,
  removeProjectMilestone_createServerFn_handler,
  requestProjectRevision_createServerFn_handler,
  reviewFinalWork_createServerFn_handler,
  submitFinalWork_createServerFn_handler,
  uploadProjectWork_createServerFn_handler
};
