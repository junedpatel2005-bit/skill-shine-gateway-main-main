import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { B as Button, A as AppShell, k as AdminPageHeader, o as AdminSummaryCard, m as AdminSection, c as cn, g as Badge, w as formatDateTime, n as AdminEmptyState, I as Input, j as createSsrRpc } from "./router-DyXkltGt.js";
import { c as createServerFn } from "./server-KxTtotOh.js";
import { useLoaderData, useRouter, Link } from "@tanstack/react-router";
import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { ShieldCheck, UserRound, Clock3, CheckCircle2, XCircle, FileText, BadgeCheck, FileBadge, MapPin, Search, IdCard, FileCheck2, ImageIcon, ExternalLink, X } from "lucide-react";
import { R as ReportExportActions } from "./ReportExportActions-BT5_v9ec.js";
import "@tanstack/react-query";
import "react-redux";
import "sonner";
import "@reduxjs/toolkit";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
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
const updateVerificationReviewStatus = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(createSsrRpc("e0d667c0383670fd421af6b54f07f455c7fc8ad5909abf4b6548b358809bd6b6"));
function VerificationManagement() {
  const data = useLoaderData({
    from: "/verification-management"
  });
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [pendingAction, setPendingAction] = useState(null);
  const [previewFile, setPreviewFile] = useState(null);
  const records = data.records;
  const visibleRecords = useMemo(() => filterRecords(records, query, statusFilter), [records, query, statusFilter]);
  const handleClosePreview = useCallback(() => {
    setPreviewFile(null);
  }, []);
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        handleClosePreview();
      }
    };
    if (previewFile) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [previewFile, handleClosePreview]);
  if (!data.viewer || data.viewer.role !== "ADMIN") {
    return /* @__PURE__ */ jsx("div", { className: "grid min-h-screen place-items-center bg-muted/30 px-4", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-sm rounded-2xl border border-border bg-card p-8 text-center shadow-lg", children: [
      /* @__PURE__ */ jsx(ShieldCheck, { className: "mx-auto h-8 w-8 text-primary" }),
      /* @__PURE__ */ jsx("h1", { className: "mt-6 text-xl font-bold", children: "Admin access required" }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Sign in from the admin panel to review professional verification." }),
      /* @__PURE__ */ jsx(Button, { asChild: true, className: "mt-8 w-full", children: /* @__PURE__ */ jsx(Link, { to: "/admin", children: "Open admin panel" }) })
    ] }) });
  }
  const displayName = `${data.viewer.firstName} ${data.viewer.lastName}`.trim() || data.viewer.email;
  const counts = getStatusCounts(records);
  async function handleReview(record, status) {
    const actionKey = `${status}-${record.userId}`;
    setPendingAction(actionKey);
    try {
      await updateVerificationReviewStatus({
        data: {
          userId: record.userId,
          status
        }
      });
      await router.invalidate();
    } finally {
      setPendingAction(null);
    }
  }
  return /* @__PURE__ */ jsxs(AppShell, { userName: displayName, userRole: "Admin", userAvatarUrl: data.viewer.avatarUrl, children: [
    /* @__PURE__ */ jsx(AdminPageHeader, { title: "Verification Management", description: "Review professional identity documents and approve verified providers.", breadcrumbs: [{
      label: "Verification"
    }], actions: /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(ReportExportActions, { table: "User", reportName: "Verification management export", filters: {
        userType: "PROFESSIONAL"
      }, variant: "outline" }),
      /* @__PURE__ */ jsx(Button, { asChild: true, variant: "outline", children: /* @__PURE__ */ jsx(Link, { to: "/user-management", children: "User Management" }) }),
      /* @__PURE__ */ jsx(Button, { asChild: true, variant: "outline", children: /* @__PURE__ */ jsx(Link, { to: "/admin", children: "Back to admin" }) })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-5", children: [
      /* @__PURE__ */ jsx(AdminSummaryCard, { icon: UserRound, label: "Professionals", value: records.length, caption: "Total accounts", active: statusFilter === "all", onClick: () => setStatusFilter("all") }),
      /* @__PURE__ */ jsx(AdminSummaryCard, { icon: Clock3, label: "Pending", value: counts.pending, caption: "Need review", active: statusFilter === "pending", variant: "warning", onClick: () => setStatusFilter("pending") }),
      /* @__PURE__ */ jsx(AdminSummaryCard, { icon: CheckCircle2, label: "Approved", value: counts.approved, caption: "Verified providers", active: statusFilter === "approved", variant: "success", onClick: () => setStatusFilter("approved") }),
      /* @__PURE__ */ jsx(AdminSummaryCard, { icon: XCircle, label: "Rejected", value: counts.rejected, caption: "Needs correction", active: statusFilter === "rejected", variant: "destructive", onClick: () => setStatusFilter("rejected") }),
      /* @__PURE__ */ jsx(AdminSummaryCard, { icon: FileText, label: "Not Started", value: counts.not_started, caption: "No documents", active: statusFilter === "not_started", onClick: () => setStatusFilter("not_started") })
    ] }),
    /* @__PURE__ */ jsx(AdminSection, { className: "mt-8", title: "Professional Verification Requests", description: "Search by professional name, email, category, city, or status.", icon: BadgeCheck, actions: /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-3 w-full sm:w-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative w-full sm:w-64", children: [
        /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
        /* @__PURE__ */ jsx(Input, { value: query, onChange: (event) => setQuery(event.target.value), placeholder: "Search...", className: "pl-9 h-10 rounded-xl" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-hide", children: ["all", "pending", "approved", "rejected"].map((status) => /* @__PURE__ */ jsx(Button, { type: "button", size: "sm", variant: statusFilter === status ? "default" : "outline", className: "rounded-lg h-10 px-4 font-bold uppercase tracking-widest text-[10px]", onClick: () => setStatusFilter(status), children: status }, status)) })
    ] }), children: visibleRecords.length ? /* @__PURE__ */ jsx("div", { className: "divide-y divide-border", children: visibleRecords.map((record) => {
      const statusMeta = getStatusMeta(record.status);
      const documents = getDocumentItems(record);
      return /* @__PURE__ */ jsx("article", { className: "group p-6 transition-all hover:bg-muted/30", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 sm:flex-row sm:items-start", children: [
            /* @__PURE__ */ jsxs("div", { className: "relative shrink-0", children: [
              /* @__PURE__ */ jsx("img", { src: record.avatarUrl || `https://i.pravatar.cc/100?u=verification-${record.userId}`, className: "h-16 w-16 rounded-2xl object-cover ring-4 ring-background shadow-lg", alt: "" }),
              /* @__PURE__ */ jsx("div", { className: cn("absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-4 border-background shadow-md", record.isVerified ? "bg-emerald-500" : "bg-slate-300") })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
                /* @__PURE__ */ jsx("h3", { className: "truncate text-xl font-bold tracking-tight group-hover:text-primary transition-colors", children: record.professionalName }),
                /* @__PURE__ */ jsx(Badge, { variant: statusMeta.variant, className: "rounded-lg px-3 py-1 font-bold uppercase tracking-widest text-[10px]", children: statusMeta.label }),
                /* @__PURE__ */ jsx(Badge, { variant: record.isActive ? "default" : "outline", className: "rounded-lg px-3 py-1 font-bold uppercase tracking-widest text-[10px]", children: record.isActive ? "Active Account" : "Inactive Account" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground font-medium", children: [
                /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx(FileText, { className: "h-4 w-4 text-primary/60" }),
                  record.professionalEmail
                ] }),
                /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx(FileBadge, { className: "h-4 w-4 text-primary/60" }),
                  record.professionalCategory || "Category not set"
                ] }),
                /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx(MapPin, { className: "h-4 w-4 text-primary/60" }),
                  record.professionalCity || "City not set"
                ] }),
                /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx(Clock3, { className: "h-4 w-4 text-primary/60" }),
                  "Updated ",
                  formatDateTime(record.updatedAt)
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5", children: documents.map((document2) => /* @__PURE__ */ jsxs("div", { className: "group/doc relative rounded-2xl border border-border bg-background p-4 shadow-sm hover:border-primary/40 hover:shadow-md transition-all", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("div", { className: "grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary group-hover/doc:bg-primary group-hover/doc:text-white transition-colors", children: /* @__PURE__ */ jsx(document2.icon, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ jsx("p", { className: "min-w-0 truncate text-xs font-bold uppercase tracking-widest", children: document2.label })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center justify-between gap-2", children: [
              /* @__PURE__ */ jsx(Badge, { variant: document2.hasValue ? "default" : "outline", className: "rounded-lg text-[9px] uppercase tracking-wider", children: document2.hasValue ? "Uploaded" : "Missing" }),
              document2.href ? /* @__PURE__ */ jsx(Button, { size: "sm", variant: "ghost", type: "button", className: "h-8 rounded-lg font-bold text-[11px] text-primary hover:bg-primary/10", onClick: () => setPreviewFile({
                url: document2.href,
                label: document2.label
              }), children: "Preview" }) : null
            ] })
          ] }, document2.label)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex shrink-0 flex-wrap gap-3 xl:w-64 xl:flex-col bg-muted/30 p-4 rounded-2xl border border-border/50 shadow-inner", children: [
          /* @__PURE__ */ jsx("p", { className: "w-full text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/80 mb-1 px-1", children: "Admin Decision" }),
          /* @__PURE__ */ jsxs(Button, { type: "button", className: "gap-2 h-12 rounded-xl font-bold shadow-md hover:shadow-lg transition-all", disabled: pendingAction !== null || record.status === "approved", onClick: () => handleReview(record, "approved"), children: [
            /* @__PURE__ */ jsx(CheckCircle2, { className: "h-4 w-4" }),
            "Approve Provider"
          ] }),
          /* @__PURE__ */ jsxs(Button, { type: "button", variant: "destructive", className: "gap-2 h-12 rounded-xl font-bold shadow-md hover:shadow-lg transition-all", disabled: pendingAction !== null || record.status === "rejected", onClick: () => handleReview(record, "rejected"), children: [
            /* @__PURE__ */ jsx(XCircle, { className: "h-4 w-4" }),
            "Reject Request"
          ] }),
          /* @__PURE__ */ jsxs(Button, { type: "button", variant: "outline", className: "gap-2 h-12 rounded-xl font-bold transition-all", disabled: pendingAction !== null || record.status === "pending", onClick: () => handleReview(record, "pending"), children: [
            /* @__PURE__ */ jsx(Clock3, { className: "h-4 w-4" }),
            "Mark as Pending"
          ] }),
          pendingAction?.endsWith(`-${record.userId}`) && /* @__PURE__ */ jsx("p", { className: "mt-1 text-center text-[10px] font-bold text-primary animate-pulse uppercase tracking-widest", children: "Processing review..." })
        ] })
      ] }) }, record.userId);
    }) }) : /* @__PURE__ */ jsx(AdminEmptyState, { title: "No verification records found", description: "Documents submitted for review will appear here. Try adjusting your search or filters." }) }),
    previewFile ? /* @__PURE__ */ jsx(FilePreviewModal, { url: previewFile.url, label: previewFile.label, onClose: handleClosePreview }) : null
  ] });
}
function FilePreviewModal({
  url,
  label,
  onClose
}) {
  const overlayRef = useRef(null);
  const previewType = getPreviewType(url);
  const handleOverlayClick = useCallback((event) => {
    if (event.target === overlayRef.current) {
      onClose();
    }
  }, [onClose]);
  return /* @__PURE__ */ jsx("div", { ref: overlayRef, onClick: handleOverlayClick, className: "fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-in fade-in duration-200", children: /* @__PURE__ */ jsxs("div", { className: "relative flex max-h-[95vh] w-full max-w-5xl flex-col rounded-3xl bg-background shadow-2xl animate-in zoom-in-95 duration-300 overflow-hidden", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-b border-border px-6 py-4 bg-muted/20", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx("div", { className: "grid h-8 w-8 place-items-center rounded-lg bg-primary text-white", children: /* @__PURE__ */ jsx(BadgeCheck, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsx("h2", { className: "text-lg font-bold tracking-tight", children: label })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxs(Button, { size: "sm", variant: "outline", type: "button", className: "rounded-xl h-9 font-bold px-4", onClick: () => openDocumentInNewTab(url), children: [
          /* @__PURE__ */ jsx(ExternalLink, { className: "mr-2 h-4 w-4" }),
          "Open Full Size"
        ] }),
        /* @__PURE__ */ jsx("button", { type: "button", onClick: onClose, className: "rounded-full p-2 text-muted-foreground transition-all hover:bg-muted hover:text-foreground active:scale-90", children: /* @__PURE__ */ jsx(X, { className: "h-6 w-6" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-auto p-8 custom-scrollbar bg-slate-50/50", children: previewType === "image" ? /* @__PURE__ */ jsx("div", { className: "flex h-full items-center justify-center p-4", children: /* @__PURE__ */ jsx("img", { src: url, alt: label, className: "max-h-[75vh] max-w-full rounded-2xl object-contain shadow-xl ring-1 ring-border" }) }) : previewType === "pdf" ? /* @__PURE__ */ jsx("iframe", { src: `${url}#toolbar=1`, title: label, className: "h-[75vh] w-full rounded-2xl shadow-xl ring-1 ring-border bg-white" }) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center gap-6 py-24 text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "grid h-24 w-24 place-items-center rounded-3xl bg-muted text-muted-foreground/40", children: /* @__PURE__ */ jsx(FileText, { className: "h-12 w-12" }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold", children: "Preview not available" }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-muted-foreground font-medium", children: "This file format cannot be displayed directly. Open it in a new tab to view it." })
      ] }),
      /* @__PURE__ */ jsxs(Button, { type: "button", size: "lg", className: "rounded-xl px-8 font-bold", onClick: () => openDocumentInNewTab(url), children: [
        /* @__PURE__ */ jsx(ExternalLink, { className: "mr-2 h-5 w-5" }),
        "Open In New Tab"
      ] })
    ] }) })
  ] }) });
}
function getPreviewType(url) {
  const normalized = url.trim().toLowerCase();
  if (normalized.startsWith("data:image/") || /\.(jpe?g|png|gif|bmp|webp|svg)(\?|#|$)/i.test(normalized)) {
    return "image";
  }
  if (normalized.startsWith("data:application/pdf") || /\.pdf(\?|#|$)/i.test(normalized)) {
    return "pdf";
  }
  return "other";
}
function openDocumentInNewTab(url) {
  const trimmedUrl = url.trim();
  if (!trimmedUrl) {
    return;
  }
  if (!trimmedUrl.startsWith("data:")) {
    window.open(trimmedUrl, "_blank", "noopener,noreferrer");
    return;
  }
  try {
    const blob = dataUrlToBlob(trimmedUrl);
    const objectUrl = URL.createObjectURL(blob);
    window.open(objectUrl, "_blank", "noopener,noreferrer");
    window.setTimeout(() => URL.revokeObjectURL(objectUrl), 6e4);
  } catch {
    window.open(trimmedUrl, "_blank", "noopener,noreferrer");
  }
}
function dataUrlToBlob(dataUrl) {
  const [header, payload] = dataUrl.split(",", 2);
  const mimeType = header.match(/^data:([^;]+)/)?.[1] || "application/octet-stream";
  const isBase64 = /;base64$/i.test(header) || /;base64;/i.test(header);
  const binary = isBase64 ? atob(payload || "") : decodeURIComponent(payload || "");
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return new Blob([bytes], {
    type: mimeType
  });
}
function getDocumentItems(record) {
  return [{
    label: "Government ID",
    icon: IdCard,
    href: record.governmentIdUrl,
    hasValue: Boolean(record.governmentIdUrl)
  }, {
    label: "License",
    icon: FileBadge,
    href: record.licenseUrl,
    hasValue: Boolean(record.licenseUrl)
  }, {
    label: "Certifications",
    icon: FileCheck2,
    href: record.certifications[0] || "",
    hasValue: record.certifications.length > 0
  }, {
    label: "Insurance",
    icon: FileText,
    href: record.insuranceUrl,
    hasValue: Boolean(record.insuranceUrl)
  }, {
    label: "Selfie",
    icon: ImageIcon,
    href: record.selfieUrl,
    hasValue: Boolean(record.selfieUrl)
  }];
}
function getStatusCounts(records) {
  return records.reduce((counts, record) => ({
    ...counts,
    [record.status]: counts[record.status] + 1
  }), {
    not_started: 0,
    pending: 0,
    approved: 0,
    rejected: 0
  });
}
function filterRecords(records, query, statusFilter) {
  const term = query.trim().toLowerCase();
  return records.filter((record) => {
    const matchesStatus = statusFilter === "all" || record.status === statusFilter;
    if (!matchesStatus) {
      return false;
    }
    if (!term) {
      return true;
    }
    return [record.professionalName, record.professionalEmail, record.professionalCategory, record.professionalCity, record.status, record.isActive ? "active" : "inactive", record.isVerified ? "verified" : "not verified", ...record.certifications, record.governmentIdUrl, record.licenseUrl, record.insuranceUrl, record.selfieUrl].join(" ").toLowerCase().includes(term);
  });
}
function getStatusMeta(status) {
  const labels = {
    not_started: "Not started",
    pending: "Pending review",
    approved: "Approved",
    rejected: "Rejected"
  };
  return {
    label: labels[status],
    variant: status === "approved" ? "default" : status === "pending" ? "secondary" : "outline"
  };
}
export {
  VerificationManagement as component
};
