import { c as createServerRpc } from "./createServerRpc-BSWJlf3j.js";
import { c as createServerFn } from "./server-KxTtotOh.js";
import { b as getCurrentUser, i as getAdminUsers, al as getAdminManagedUserDetails, m as updateUserActiveStatusByAdmin, am as updateProfessionalVerifiedStatusByAdmin, an as updateUserPasswordByAdmin, o as hashPassword } from "../server.js";
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
const getUserManagementData_createServerFn_handler = createServerRpc({
  id: "f6c254b7f87f34d97319eb6d48703259e6914e716729c3c2f428b5e1e8081982",
  name: "getUserManagementData",
  filename: "src/routes/user-management.tsx"
}, (opts) => getUserManagementData.__executeServer(opts));
const getUserManagementData = createServerFn({
  method: "GET"
}).handler(getUserManagementData_createServerFn_handler, async () => {
  const viewer = getCurrentUser();
  if (!viewer || viewer.role !== "ADMIN") {
    return {
      viewer,
      users: []
    };
  }
  const users = getAdminUsers().filter((user) => user.role === "CLIENT" || user.role === "PROFESSIONAL");
  return {
    viewer,
    users,
    userDetails: getAdminManagedUserDetails(users.map((user) => ({
      id: user.id,
      role: user.role
    })))
  };
});
const updateManagedUserStatus_createServerFn_handler = createServerRpc({
  id: "d21ae227bec96e0c5dcf4b0e8804f1ee297797d383b41ca8942fdff33d67acc2",
  name: "updateManagedUserStatus",
  filename: "src/routes/user-management.tsx"
}, (opts) => updateManagedUserStatus.__executeServer(opts));
const updateManagedUserStatus = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(updateManagedUserStatus_createServerFn_handler, async ({
  data
}) => {
  const viewer = getCurrentUser();
  if (!viewer || viewer.role !== "ADMIN") {
    throw new Error("Only admins can change user status.");
  }
  return updateUserActiveStatusByAdmin(data.userId, data.isActive);
});
const updateManagedProfessionalVerification_createServerFn_handler = createServerRpc({
  id: "243f2490899071e8ebf4a541df3ecb0b948f66d0efca85f53fb18a6ad2f99af7",
  name: "updateManagedProfessionalVerification",
  filename: "src/routes/user-management.tsx"
}, (opts) => updateManagedProfessionalVerification.__executeServer(opts));
const updateManagedProfessionalVerification = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(updateManagedProfessionalVerification_createServerFn_handler, async ({
  data
}) => {
  const viewer = getCurrentUser();
  if (!viewer || viewer.role !== "ADMIN") {
    throw new Error("Only admins can change professional verification.");
  }
  return updateProfessionalVerifiedStatusByAdmin(data.userId, data.isVerified);
});
const updateManagedUserPassword_createServerFn_handler = createServerRpc({
  id: "e1a8f00cb9eb520da7092dad35237298bc912e8c6d9f496b539773de95a86dcd",
  name: "updateManagedUserPassword",
  filename: "src/routes/user-management.tsx"
}, (opts) => updateManagedUserPassword.__executeServer(opts));
const updateManagedUserPassword = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(updateManagedUserPassword_createServerFn_handler, async ({
  data
}) => {
  const viewer = getCurrentUser();
  if (!viewer || viewer.role !== "ADMIN") {
    throw new Error("Only admins can change user passwords.");
  }
  const passwordError = validatePassword(data.password);
  if (passwordError) {
    throw new Error(passwordError);
  }
  updateUserPasswordByAdmin(data.userId, hashPassword(data.password));
  return {
    ok: true
  };
});
function validatePassword(password) {
  if (password.length < 8) return "Password must be at least 8 characters.";
  if (!/[A-Z]/.test(password)) return "Password must include one uppercase letter.";
  if (!/[a-z]/.test(password)) return "Password must include one lowercase letter.";
  if (!/[0-9]/.test(password)) return "Password must include one number.";
  if (!/[^A-Za-z0-9]/.test(password)) return "Password must include one special character.";
  return null;
}
export {
  getUserManagementData_createServerFn_handler,
  updateManagedProfessionalVerification_createServerFn_handler,
  updateManagedUserPassword_createServerFn_handler,
  updateManagedUserStatus_createServerFn_handler
};
