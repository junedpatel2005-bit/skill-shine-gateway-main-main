import { c as createServerRpc } from "./createServerRpc-BSWJlf3j.js";
import { c as createServerFn } from "./server-KxTtotOh.js";
import { v as verifyPassword, o as hashPassword } from "../server.js";
import { f as forgotPasswordRequestSchema, r as resetPasswordSchema } from "./forgot-password-D1FDXg_D.js";
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
const sendPasswordResetOtp_createServerFn_handler = createServerRpc({
  id: "62594a67bff601f34bf09e77f55d04b1abc3c2cb3e849829c7799ef4601bcce1",
  name: "sendPasswordResetOtp",
  filename: "src/client/forgot-password.tsx"
}, (opts) => sendPasswordResetOtp.__executeServer(opts));
const sendPasswordResetOtp = createServerFn({
  method: "POST"
}).inputValidator((data) => forgotPasswordRequestSchema.parse(data)).handler(sendPasswordResetOtp_createServerFn_handler, async ({
  data
}) => {
  try {
    const email = data.email.trim().toLowerCase();
    const {
      findUserByEmail
    } = await import("../server.js").then((n) => n.aB);
    const user = findUserByEmail(email);
    if (user) {
      const {
        sendPasswordResetOtpEmail
      } = await import("./otp.server-DF-kFJZc.js");
      await sendPasswordResetOtpEmail(email);
    }
    return {
      ok: true
    };
  } catch (error) {
    console.error("Send password reset OTP failed:", error);
    return {
      ok: false,
      formError: error instanceof Error ? error.message : "Failed to send reset code."
    };
  }
});
const resetPassword_createServerFn_handler = createServerRpc({
  id: "46409a6e140b0fbbb4054bcde4973dfdce1166763727f42c81d81d3d979feeae",
  name: "resetPassword",
  filename: "src/client/forgot-password.tsx"
}, (opts) => resetPassword.__executeServer(opts));
const resetPassword = createServerFn({
  method: "POST"
}).inputValidator((data) => resetPasswordSchema.parse(data)).handler(resetPassword_createServerFn_handler, async ({
  data
}) => {
  try {
    const email = data.email.trim().toLowerCase();
    const {
      findUserByEmail,
      updateUserPasswordByEmail
    } = await import("../server.js").then((n) => n.aB);
    const {
      verifyPasswordResetOtp
    } = await import("./otp.server-DF-kFJZc.js");
    const fieldErrors = {};
    const user = findUserByEmail(email);
    if (!user) {
      fieldErrors.email = "No account found for that email.";
      return {
        ok: false,
        fieldErrors,
        formError: null
      };
    }
    if (!verifyPasswordResetOtp(email, data.otp)) {
      fieldErrors.otp = "Invalid or expired OTP. Please resend and try again.";
      return {
        ok: false,
        fieldErrors,
        formError: null
      };
    }
    if ((await verifyPassword(data.password, user.passwordHash)).valid) {
      fieldErrors.password = "This password is the same as your old password. Please write another password.";
      return {
        ok: false,
        fieldErrors,
        formError: null
      };
    }
    const updated = updateUserPasswordByEmail(email, hashPassword(data.password));
    if (!updated) {
      return {
        ok: false,
        fieldErrors: {},
        formError: "Unable to update your password. Please try again."
      };
    }
    return {
      ok: true
    };
  } catch (error) {
    console.error("Reset password failed:", error);
    return {
      ok: false,
      fieldErrors: {},
      formError: error instanceof Error ? error.message : "Failed to reset password."
    };
  }
});
export {
  resetPassword_createServerFn_handler,
  sendPasswordResetOtp_createServerFn_handler
};
