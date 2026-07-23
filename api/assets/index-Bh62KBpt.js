import { c as createServerRpc } from "./createServerRpc-BSWJlf3j.js";
import { c as createServerFn } from "./server-KxTtotOh.js";
import { b as getCurrentUser, Q as setFavoriteJob } from "../server.js";
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
const saveFavoriteJob_createServerFn_handler = createServerRpc({
  id: "79c8bfa0dc26a63cfce8d4b298efcd3cbde99f92285a5b43927deab15e082529",
  name: "saveFavoriteJob",
  filename: "src/client/index.tsx"
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
export {
  saveFavoriteJob_createServerFn_handler
};
