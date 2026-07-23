import { c as createServerRpc } from "./createServerRpc-BSWJlf3j.js";
import { c as createServerFn } from "./server-KxTtotOh.js";
import { b as getCurrentUser, O as getOpenClientJobById, P as isFavoriteJob, Q as setFavoriteJob, R as createProjectRequest } from "../server.js";
import { q as queueAccountEmailNotification } from "./notification-email.server-BOHINCqy.js";
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
const getJobDetails_createServerFn_handler = createServerRpc({
  id: "fbdfe6ab2e50a745fc4a753ad78f5f0482350705c42008ac33293075a8d93ca7",
  name: "getJobDetails",
  filename: "src/client/job.$jobId.tsx"
}, (opts) => getJobDetails.__executeServer(opts));
const getJobDetails = createServerFn({
  method: "GET"
}).inputValidator((jobId) => jobId).handler(getJobDetails_createServerFn_handler, async ({
  data
}) => {
  const viewer = getCurrentUser();
  const jobId = Number(data);
  if (!Number.isInteger(jobId)) {
    return null;
  }
  const job = await getOpenClientJobById(jobId);
  if (!job) {
    return null;
  }
  return {
    viewer,
    job,
    isFavorite: viewer ? await isFavoriteJob(viewer.id, job.id) : false
  };
});
const saveFavoriteJob_createServerFn_handler = createServerRpc({
  id: "944a30392296e8a1c31e157378436df8798cf6f1d7946e14b2325a0ffbacebd5",
  name: "saveFavoriteJob",
  filename: "src/client/job.$jobId.tsx"
}, (opts) => saveFavoriteJob.__executeServer(opts));
const saveFavoriteJob = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(saveFavoriteJob_createServerFn_handler, async ({
  data
}) => {
  const viewer = getCurrentUser();
  if (!viewer) {
    return {
      ok: false,
      error: "Log in to save favorite jobs."
    };
  }
  return {
    ok: true,
    favorite: setFavoriteJob(viewer.id, data.jobId, data.favorite)
  };
});
const submitProjectRequest_createServerFn_handler = createServerRpc({
  id: "098b42f6887d35232744b8a4b5a9d8320fae10641031ab1101b9ac3ee9ef66d5",
  name: "submitProjectRequest",
  filename: "src/client/job.$jobId.tsx"
}, (opts) => submitProjectRequest.__executeServer(opts));
const submitProjectRequest = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(submitProjectRequest_createServerFn_handler, async ({
  data
}) => {
  const viewer = getCurrentUser();
  if (!viewer || viewer.role !== "PROFESSIONAL") {
    return {
      ok: false,
      formError: "Only professional accounts can send project requests."
    };
  }
  try {
    const request = await createProjectRequest({
      jobId: data.jobId,
      professionalId: viewer.id,
      bidAmount: data.bidAmount,
      duration: data.duration,
      coverLetter: data.coverLetter,
      attachments: data.attachments ?? []
    });
    const job = await getOpenClientJobById(data.jobId);
    const professionalName = `${viewer.firstName} ${viewer.lastName}`.trim() || viewer.email;
    const projectTitle = job?.title || "your project";
    if (request) {
      queueAccountEmailNotification(request.clientId, {
        subject: `New project request for ${projectTitle}`,
        title: "New project request",
        body: `${professionalName} sent a request for ${projectTitle}. Review the bid, timeline, message, and attachments in your projects page.`,
        actionLabel: "Review request",
        actionPath: "/projects"
      });
    }
    return {
      ok: true,
      request
    };
  } catch (error) {
    return {
      ok: false,
      formError: error instanceof Error ? error.message : "Could not save this project request."
    };
  }
});
export {
  getJobDetails_createServerFn_handler,
  saveFavoriteJob_createServerFn_handler,
  submitProjectRequest_createServerFn_handler
};
