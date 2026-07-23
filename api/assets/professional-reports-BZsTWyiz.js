import { jsx, jsxs } from "react/jsx-runtime";
import { useLoaderData, Link } from "@tanstack/react-router";
import { A as AppShell, B as Button } from "./router-DyXkltGt.js";
import { U as UserPersonalReports } from "./UserPersonalReports-BbcGRzAH.js";
import { ArrowLeft } from "lucide-react";
import "@tanstack/react-query";
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
import "recharts";
import "./popover-ATrRvCCG.js";
import "@radix-ui/react-popover";
import "./ReportExportActions-BT5_v9ec.js";
function ProfessionalReportsPage() {
  const data = useLoaderData({
    from: "/professional-reports"
  });
  const displayName = `${data.viewer?.firstName || ""} ${data.viewer?.lastName || ""}`.trim() || data.viewer?.email || "Professional";
  return /* @__PURE__ */ jsx(AppShell, { title: "My Reports", userName: displayName, userRole: "Professional", userAvatarUrl: data.viewer?.email ?? void 0, children: /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 px-4 py-8 lg:px-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsx("div", { className: "flex items-center gap-3 mb-4", children: /* @__PURE__ */ jsx(Button, { asChild: true, variant: "ghost", size: "sm", children: /* @__PURE__ */ jsx(Link, { to: "/professional-profile", children: /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }) }) }) }),
      /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold tracking-tight text-slate-900", children: "My Reports" }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-lg text-slate-600", children: "View and export your applications, reviews, and contact requests." })
    ] }),
    /* @__PURE__ */ jsx(UserPersonalReports, { userRole: "PROFESSIONAL", userId: data.viewer?.id ?? 0, userName: displayName })
  ] }) });
}
export {
  ProfessionalReportsPage as component
};
