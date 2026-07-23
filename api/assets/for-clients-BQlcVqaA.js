import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { Star, CheckCircle2, ShieldCheck, Wallet, Clock, Users } from "lucide-react";
import { S as SiteHeader, B as Button, i as SiteFooter } from "./router-DyXkltGt.js";
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
const benefits = [{
  icon: ShieldCheck,
  title: "Vetted professionals",
  desc: "Every pro is ID-verified. Background checks for in-home services."
}, {
  icon: Wallet,
  title: "Escrow payments",
  desc: "Your money is safe. Released only when you approve a milestone."
}, {
  icon: Clock,
  title: "Fast matches",
  desc: "Get your first proposal in under 2 hours, on average."
}, {
  icon: Users,
  title: "World-class support",
  desc: "Real humans, 24/7 - never a bot."
}];
function ForClients() {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsx(SiteHeader, {}),
    /* @__PURE__ */ jsx("section", { className: "gradient-hero", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold uppercase tracking-wider text-primary", children: "For clients" }),
        /* @__PURE__ */ jsx("h1", { className: "font-display mt-3 text-4xl font-bold tracking-tight md:text-5xl", children: "Hire trusted pros - without the back-and-forth" }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 max-w-lg text-muted-foreground", children: "Post once. Get qualified, vetted proposals fast. Pay only when work is done. It's the modern way to get things done." }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsx(Button, { asChild: true, size: "lg", className: "bg-cta text-cta-foreground hover:bg-cta/90", children: /* @__PURE__ */ jsx(Link, { to: "/post-job", children: "Post a Job - it's free" }) }),
          /* @__PURE__ */ jsx(Button, { asChild: true, size: "lg", variant: "outline", children: /* @__PURE__ */ jsx(Link, { to: "/discover", children: "Browse pros" }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 flex items-center gap-1.5 text-sm", children: [
          /* @__PURE__ */ jsx(Star, { className: "h-4 w-4 fill-warning text-warning" }),
          /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "4.9 / 5" }),
          /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "from 28,400 client reviews" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-3xl border border-border bg-card p-6 shadow-elevated", children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold uppercase tracking-wider text-primary", children: "Sample timeline" }),
        /* @__PURE__ */ jsx("ol", { className: "mt-4 space-y-4", children: [{
          t: "0 min",
          e: "You post a kitchen plumbing job"
        }, {
          t: "8 min",
          e: "First proposal received from Priya, $180"
        }, {
          t: "32 min",
          e: "3 more vetted plumbers have applied"
        }, {
          t: "1h",
          e: "You hire Priya. She's on her way."
        }, {
          t: "Same day",
          e: "Job done. Payment released."
        }].map((item, index) => /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "grid h-8 w-8 shrink-0 place-items-center rounded-full bg-success/10 text-success", children: /* @__PURE__ */ jsx(CheckCircle2, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: item.t }),
            /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", children: item.e })
          ] })
        ] }, index)) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { className: "mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-display text-3xl font-bold tracking-tight", children: "Why clients choose Servio" }),
      /* @__PURE__ */ jsx("div", { className: "mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4", children: benefits.map((benefit) => /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-border bg-card p-6 shadow-soft", children: [
        /* @__PURE__ */ jsx("div", { className: "grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary", children: /* @__PURE__ */ jsx(benefit.icon, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsx("h3", { className: "font-display mt-4 text-lg font-semibold", children: benefit.title }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: benefit.desc })
      ] }, benefit.title)) })
    ] }),
    /* @__PURE__ */ jsx(SiteFooter, {})
  ] });
}
export {
  ForClients as component
};
