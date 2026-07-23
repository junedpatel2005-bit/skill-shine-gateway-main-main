import { c as createServerRpc } from "./createServerRpc-BSWJlf3j.js";
import { c as createServerFn } from "./server-KxTtotOh.js";
import { z } from "zod";
import { o as hashPassword, k as setResponseHeader, l as createSessionCookie } from "../server.js";
import { s as signupSchema, n as normalizePhone } from "./signup-D54GJhA7.js";
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
import "nodemailer";
import "h3-v2";
import "@prisma/client";
import "xss";
import "socket.io-client";
const sendSignupOtp_createServerFn_handler = createServerRpc({
  id: "13c7d4217cb971cba0b9e699a15703b98809c3996d7081bf760428a8b19a87c7",
  name: "sendSignupOtp",
  filename: "src/routes/signup.tsx"
}, (opts) => sendSignupOtp.__executeServer(opts));
const sendSignupOtp = createServerFn({
  method: "POST"
}).inputValidator((data) => z.object({
  email: z.string().trim().email("Enter a valid email address.")
}).parse(data)).handler(sendSignupOtp_createServerFn_handler, async ({
  data
}) => {
  try {
    const {
      sendSignupOtpEmail
    } = await import("./otp.server-DF-kFJZc.js");
    const email = data.email.trim().toLowerCase();
    await sendSignupOtpEmail(email);
    return {
      ok: true
    };
  } catch (error) {
    console.error("Send OTP failed:", error);
    return {
      ok: false,
      formError: error instanceof Error ? error.message : "Failed to send OTP."
    };
  }
});
const submitSignup_createServerFn_handler = createServerRpc({
  id: "04819e7894ac20a9e67842e674a7cafc7662fcf7d57cc791df4e9565891d8768",
  name: "submitSignup",
  filename: "src/routes/signup.tsx"
}, (opts) => submitSignup.__executeServer(opts));
const submitSignup = createServerFn({
  method: "POST"
}).inputValidator((data) => signupSchema.parse(data)).handler(submitSignup_createServerFn_handler, async ({
  data
}) => {
  try {
    const {
      createUserRecord,
      findUserByEmailOrPhone
    } = await import("../server.js").then((n) => n.aB);
    const {
      verifySignupOtp
    } = await import("./otp.server-DF-kFJZc.js");
    const email = data.email.trim().toLowerCase();
    const phone = normalizePhone(data.countryCode, data.phone);
    const existingUser = findUserByEmailOrPhone(email, phone);
    const fieldErrors = {};
    if (existingUser?.email === email) {
      fieldErrors.email = "This email address is already registered.";
    }
    if (existingUser?.phone === phone) {
      fieldErrors.phone = "This phone number is already registered.";
    }
    if (!verifySignupOtp(email, data.otp)) {
      fieldErrors.otp = "Invalid or expired OTP. Please resend and try again.";
    }
    if (Object.keys(fieldErrors).length > 0) {
      return {
        ok: false,
        fieldErrors,
        formError: null
      };
    }
    const passwordHash = hashPassword(data.password);
    const createdUser = createUserRecord({
      role: data.accountType === "client" ? "CLIENT" : "PROFESSIONAL",
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      email,
      phone,
      passwordHash
    });
    setResponseHeader("Set-Cookie", createSessionCookie(createdUser));
    return {
      ok: true,
      user: createdUser
    };
  } catch (error) {
    console.error("Signup server action failed:", error);
    return {
      ok: false,
      fieldErrors: {},
      formError: error instanceof Error ? error.message : "Unknown server error"
    };
  }
});
export {
  sendSignupOtp_createServerFn_handler,
  submitSignup_createServerFn_handler
};
