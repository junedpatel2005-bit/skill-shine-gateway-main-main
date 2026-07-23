import { jsx, jsxs } from "react/jsx-runtime";
import { B as Button, A as AppShell, I as Input, T as Textarea, j as createSsrRpc } from "./router-DyXkltGt.js";
import { c as createServerFn } from "./server-KxTtotOh.js";
import { useLoaderData, useRouter, Link } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import "@tanstack/react-query";
import "react-redux";
import "sonner";
import "@reduxjs/toolkit";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "lucide-react";
import "socket.io-client";
import "@radix-ui/react-select";
import "@radix-ui/react-switch";
import "zod";
import "@radix-ui/react-dialog";
import "@radix-ui/react-label";
import "@radix-ui/react-accordion";
import "@hookform/resolvers/zod";
import "react-hook-form";
import "./forgot-password-D1FDXg_D.js";
import "./client-profile-B1xUUnTZ.js";
import "../server.js";
import "node:crypto";
import "node:fs/promises";
import "node:path";
import "nodemailer";
import "node:async_hooks";
import "h3-v2";
import "@prisma/client";
import "xss";
import "@radix-ui/react-slider";
import "@tanstack/router-core";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core/ssr/server";
import "@tanstack/react-router/ssr/server";
const saveWebsiteCmsPage = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(createSsrRpc("fb9aa94d0347ab202806b7721a9146d2982139847d35e2d034072254935e44c8"));
function WebsiteCms() {
  const data = useLoaderData({
    from: "/website-cms"
  });
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const [selectedSlug, setSelectedSlug] = useState("faq");
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("faq");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("PUBLISHED");
  const [message, setMessage] = useState(null);
  const [saving, setSaving] = useState(false);
  const pages = data.pages;
  const selectedPage = useMemo(() => pages.find((page) => page.slug === selectedSlug), [pages, selectedSlug]);
  useEffect(() => {
    if (!selectedPage) return;
    setIsCreating(false);
    setSlug(selectedPage.slug);
    setTitle(selectedPage.title);
    setContent(selectedPage.content);
    setStatus(selectedPage.status);
    setMessage(null);
  }, [selectedPage]);
  if (!data.viewer || data.viewer.role !== "ADMIN") {
    return /* @__PURE__ */ jsx("div", { className: "grid min-h-screen place-items-center bg-muted/30 px-4", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-sm rounded-lg border border-border bg-white p-6 text-center shadow-soft", children: [
      /* @__PURE__ */ jsx("h1", { className: "mt-4 text-xl font-semibold", children: "Admin access required" }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Sign in from the admin panel to manage website pages." }),
      /* @__PURE__ */ jsx(Button, { asChild: true, className: "mt-5 w-full bg-primary hover:bg-primary/90", children: /* @__PURE__ */ jsx(Link, { to: "/admin", children: "Open admin panel" }) })
    ] }) });
  }
  const displayName = `${data.viewer.firstName} ${data.viewer.lastName}`.trim() || data.viewer.email;
  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const targetSlug = isCreating ? slug.trim() : selectedSlug;
      if (isCreating && !targetSlug) {
        setMessage("Page slug is required.");
        return;
      }
      const saved = await saveWebsiteCmsPage({
        data: {
          slug: targetSlug,
          title,
          content,
          status
        }
      });
      setSelectedSlug(saved.slug);
      setTitle(saved.title);
      setSlug(saved.slug);
      setContent(saved.content);
      setStatus(saved.status);
      setMessage(`Saved ${saved.slug}.`);
      setIsCreating(false);
      await router.invalidate();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to save page.");
    } finally {
      setSaving(false);
    }
  };
  return /* @__PURE__ */ jsx(AppShell, { userName: displayName, userRole: "Admin", userAvatarUrl: data.viewer.avatarUrl, children: /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold uppercase tracking-[0.18em] text-primary", children: "Admin / Website CMS" }),
      /* @__PURE__ */ jsx("h1", { className: "mt-1 text-3xl font-semibold tracking-tight", children: "Website Pages CMS" }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Edit FAQ, Terms & Conditions, and Privacy Policy only." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
      /* @__PURE__ */ jsx(Button, { type: "button", variant: "outline", onClick: () => {
        setIsCreating(true);
        setSlug("");
        setTitle("");
        setContent("");
        setStatus("DRAFT");
        setMessage(null);
      }, children: "Add new page" }),
      isCreating ? /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Create a new footer page or legal page." }) : null
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-4 md:grid-cols-[240px_1fr]", children: [
      /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-border bg-card p-4 shadow-soft", children: [
        /* @__PURE__ */ jsx("label", { className: "text-sm font-medium text-foreground", htmlFor: "legal-page-select", children: "Select page" }),
        /* @__PURE__ */ jsx("select", { id: "legal-page-select", value: selectedSlug, onChange: (event) => setSelectedSlug(event.target.value), className: "mt-2 h-10 w-full rounded-md border border-border bg-background px-3 text-sm", children: pages.map((page) => /* @__PURE__ */ jsx("option", { value: page.slug, children: page.title }, page.slug)) }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsx("p", { className: "font-medium text-foreground", children: "Status" }),
          /* @__PURE__ */ jsx("p", { children: status }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 font-medium text-foreground", children: "Last updated" }),
          /* @__PURE__ */ jsx("p", { children: selectedPage?.updatedAt ? new Date(selectedPage.updatedAt).toLocaleString() : "Never" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4 rounded-xl border border-border bg-card p-5 shadow-soft", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "text-sm font-medium", htmlFor: "legal-page-title", children: "Page title" }),
            /* @__PURE__ */ jsx(Input, { id: "legal-page-title", className: "mt-2", value: title, onChange: (event) => setTitle(event.target.value) })
          ] }),
          isCreating ? /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "text-sm font-medium", htmlFor: "legal-page-slug", children: "Page slug" }),
            /* @__PURE__ */ jsx(Input, { id: "legal-page-slug", className: "mt-2", value: slug, onChange: (event) => setSlug(event.target.value) })
          ] }) : null,
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "text-sm font-medium", htmlFor: "legal-page-status", children: "Publish status" }),
            /* @__PURE__ */ jsxs("select", { id: "legal-page-status", value: status, onChange: (event) => setStatus(event.target.value), className: "mt-2 h-10 w-full rounded-md border border-border bg-background px-3 text-sm", children: [
              /* @__PURE__ */ jsx("option", { value: "DRAFT", children: "Draft" }),
              /* @__PURE__ */ jsx("option", { value: "PUBLISHED", children: "Published" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "text-sm font-medium", htmlFor: "legal-page-content", children: "Page content HTML" }),
          /* @__PURE__ */ jsx(Textarea, { id: "legal-page-content", className: "mt-2 min-h-[340px] font-mono text-sm", value: content, onChange: (event) => setContent(event.target.value) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
          /* @__PURE__ */ jsx(Button, { onClick: handleSave, disabled: saving, className: "bg-primary text-primary-foreground hover:bg-primary/90", children: saving ? "Saving..." : isCreating ? "Create page" : "Save page" }),
          message ? /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: message }) : null
        ] })
      ] })
    ] })
  ] }) });
}
export {
  WebsiteCms as component
};
