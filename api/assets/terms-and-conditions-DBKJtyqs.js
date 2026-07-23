import { jsxs, jsx } from "react/jsx-runtime";
import { a1 as Route, S as SiteHeader, i as SiteFooter } from "./router-DyXkltGt.js";
import "@tanstack/react-query";
import "@tanstack/react-router";
import "./server-KxTtotOh.js";
import "../server.js";
import "node:crypto";
import "node:fs/promises";
import "node:path";
import "zod";
import "nodemailer";
import "node:async_hooks";
import "h3-v2";
import "@prisma/client";
import "xss";
import "socket.io-client";
import "@tanstack/router-core";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core/ssr/server";
import "react";
import "@tanstack/react-router/ssr/server";
import "react-redux";
import "sonner";
import "@reduxjs/toolkit";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "lucide-react";
import "@radix-ui/react-select";
import "@radix-ui/react-switch";
import "@radix-ui/react-dialog";
import "@radix-ui/react-label";
import "@radix-ui/react-accordion";
import "@hookform/resolvers/zod";
import "react-hook-form";
import "./forgot-password-D1FDXg_D.js";
import "./client-profile-B1xUUnTZ.js";
import "@radix-ui/react-slider";
function TermsAndConditions() {
  const {
    cmsPage
  } = Route.useLoaderData();
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsx(SiteHeader, {}),
    /* @__PURE__ */ jsx("section", { className: "gradient-hero", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold uppercase tracking-wider text-primary", children: "Legal" }),
      /* @__PURE__ */ jsx("h1", { className: "font-display mt-3 text-4xl font-bold tracking-tight md:text-5xl", children: cmsPage?.title || "Terms & Conditions" })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "mx-auto max-w-3xl px-4 pb-20 sm:px-6 lg:px-8", children: cmsPage?.content ? /* @__PURE__ */ jsx("div", { className: "prose prose-gray max-w-none text-sm leading-7 dark:prose-invert", dangerouslySetInnerHTML: {
      __html: cmsPage.content
    } }) : /* @__PURE__ */ jsxs("div", { className: "text-sm leading-7 text-muted-foreground", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-display text-2xl font-semibold text-foreground", children: "Acceptance of Terms" }),
      /* @__PURE__ */ jsx("p", { className: "mt-3", children: "By accessing or using Servio, you agree to follow these terms." }),
      /* @__PURE__ */ jsx("h2", { className: "font-display mt-8 text-2xl font-semibold text-foreground", children: "User Accounts" }),
      /* @__PURE__ */ jsx("p", { className: "mt-3", children: "You are responsible for your account credentials and activity." }),
      /* @__PURE__ */ jsx("h2", { className: "font-display mt-8 text-2xl font-semibold text-foreground", children: "Payments & Services" }),
      /* @__PURE__ */ jsx("p", { className: "mt-3", children: "Clients and professionals are responsible for agreed work, payments, and platform rules." })
    ] }) }),
    /* @__PURE__ */ jsx(SiteFooter, {})
  ] });
}
export {
  TermsAndConditions as component
};
