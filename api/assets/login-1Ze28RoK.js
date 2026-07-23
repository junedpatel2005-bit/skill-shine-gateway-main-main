import { c as createServerRpc } from "./createServerRpc-BSWJlf3j.js";
import { c as createServerFn } from "./server-KxTtotOh.js";
import { v as verifyPassword, o as hashPassword, k as setResponseHeader, l as createSessionCookie } from "../server.js";
import { l as loginSchema } from "./login-5WaxsvPC.js";
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
const submitLogin_createServerFn_handler = createServerRpc({
  id: "89f524fd6c5bf85e111a57c758b432358c7d12e411e9b7863b6f9428c6f137e5",
  name: "submitLogin",
  filename: "src/routes/login.tsx"
}, (opts) => submitLogin.__executeServer(opts));
const submitLogin = createServerFn({
  method: "POST"
}).inputValidator((data) => loginSchema.parse(data)).handler(submitLogin_createServerFn_handler, async ({
  data
}) => {
  try {
    const {
      findUserByEmail,
      recordUserLogin,
      getProfessionalProfileByUserId
    } = await import("../server.js").then((n) => n.aB);
    const email = data.email.trim().toLowerCase();
    const user = findUserByEmail(email);
    if (!user) {
      return {
        ok: false,
        fieldErrors: {
          email: "No account found for that email."
        },
        formError: null
      };
    }
    if (!user.isActive) {
      return {
        ok: false,
        fieldErrors: {
          email: "This account is disabled. Contact an administrator."
        },
        formError: null
      };
    }
    if (!user.passwordHash) {
      return {
        ok: false,
        fieldErrors: {
          email: user.googleId ? "This account uses Google sign-in. Continue with Google instead." : "This account does not have a password yet."
        },
        formError: null
      };
    }
    const passwordCheck = await verifyPassword(data.password, user.passwordHash);
    if (!passwordCheck.valid) {
      return {
        ok: false,
        fieldErrors: {
          password: "Incorrect password."
        },
        formError: null
      };
    }
    if (passwordCheck.needsUpgrade) {
      const {
        updateUserPasswordByEmail
      } = await import("../server.js").then((n) => n.aB);
      updateUserPasswordByEmail(email, hashPassword(data.password));
    }
    recordUserLogin(user.id);
    let isProfileComplete = false;
    if (user.role === "PROFESSIONAL") {
      const proProfile = getProfessionalProfileByUserId(user.id);
      isProfileComplete = !!(proProfile?.professionalCategory && proProfile?.professionalCity && proProfile?.skills.length && proProfile?.companyDescription && proProfile?.address);
    }
    setResponseHeader("Set-Cookie", createSessionCookie({
      id: user.id,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      avatarUrl: user.avatarUrl,
      authProvider: user.authProvider
    }));
    return {
      ok: true,
      isProfileComplete,
      user: {
        id: user.id,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        avatarUrl: user.avatarUrl,
        authProvider: user.authProvider
      }
    };
  } catch (error) {
    console.error("Login server action failed:", error);
    return {
      ok: false,
      fieldErrors: {},
      formError: error instanceof Error ? error.message : "Unknown server error"
    };
  }
});
export {
  submitLogin_createServerFn_handler
};
