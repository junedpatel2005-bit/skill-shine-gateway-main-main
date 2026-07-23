import { c as createServerRpc } from "./createServerRpc-BSWJlf3j.js";
import { c as createServerFn } from "./server-KxTtotOh.js";
import { b as getCurrentUser, T as getClientProfileByUserId, y as getFavoriteJobsByUserId, aj as findUserByEmailOrPhone, ak as updateClientProfileByUserId } from "../server.js";
import { c as clientProfileSchema } from "./client-profile-B1xUUnTZ.js";
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
const getMyInfoData_createServerFn_handler = createServerRpc({
  id: "5745e5497e445555fa94b5b1a3b5f87f7888d3e78c9903ed7e454c57230d2aba",
  name: "getMyInfoData",
  filename: "src/client/my-info.tsx"
}, (opts) => getMyInfoData.__executeServer(opts));
const getMyInfoData = createServerFn({
  method: "GET"
}).handler(getMyInfoData_createServerFn_handler, async () => {
  const viewer = getCurrentUser();
  if (!viewer || viewer.role !== "CLIENT") {
    return null;
  }
  const clientProfile = await getClientProfileByUserId(viewer.id);
  return {
    viewer,
    clientProfile,
    favoriteJobs: await getFavoriteJobsByUserId(viewer.id)
  };
});
const updateMyInfo_createServerFn_handler = createServerRpc({
  id: "2427e0ec35ea63d06c06b8c95f151e80ad322b163d72120613f30a0a1d824893",
  name: "updateMyInfo",
  filename: "src/client/my-info.tsx"
}, (opts) => updateMyInfo.__executeServer(opts));
const updateMyInfo = createServerFn({
  method: "POST"
}).inputValidator((data) => clientProfileSchema.parse(data)).handler(updateMyInfo_createServerFn_handler, async ({
  data
}) => {
  const viewer = getCurrentUser();
  if (!viewer || viewer.role !== "CLIENT") {
    return {
      ok: false,
      formError: "Only client accounts can update this page."
    };
  }
  const normalizedEmail = data.email.trim().toLowerCase();
  const normalizedPhone = data.phone.trim();
  const existingUser = findUserByEmailOrPhone(normalizedEmail, normalizedPhone);
  if (existingUser && existingUser.id !== viewer.id) {
    return {
      ok: false,
      formError: existingUser.email === normalizedEmail ? "This email address is already registered." : "This phone number is already registered."
    };
  }
  const profile = updateClientProfileByUserId({
    userId: viewer.id,
    fullName: data.fullName,
    email: normalizedEmail,
    phone: normalizedPhone,
    companyName: data.companyName,
    companyWebsite: data.companyWebsite || null,
    industry: data.industry,
    teamSize: data.teamSize,
    companyDescription: data.companyDescription,
    address: data.address,
    avatarUrl: data.profilePhotoUrl || null,
    savedLocations: data.savedLocations,
    hiringNeeds: data.hiringNeeds
  });
  return {
    ok: true,
    profile
  };
});
export {
  getMyInfoData_createServerFn_handler,
  updateMyInfo_createServerFn_handler
};
