import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { c as cn, B as Button, A as AppShell, k as AdminPageHeader, o as AdminSummaryCard, m as AdminSection, v as formatEnum, g as Badge, n as AdminEmptyState, I as Input, q as Select, r as SelectTrigger, s as SelectValue, t as SelectContent, u as SelectItem, w as formatDateTime, x as formatDate, y as formatBudget, z as formatFileSize, p as formatMoney, j as createSsrRpc } from "./router-DyXkltGt.js";
import { c as createServerFn } from "./server-KxTtotOh.js";
import { useLoaderData, useRouter, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { ShieldCheck, BriefcaseBusiness, ListChecks, AlertTriangle, CheckCircle2, Eye, Search, X, UserRound, CalendarDays, Clock3, MapPin, DollarSign, RotateCcw, Paperclip, Mail, Upload, FileText } from "lucide-react";
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
function AdminTable({ headers, children, className, emptyState }) {
  if (!children || Array.isArray(children) && children.length === 0) {
    return emptyState || /* @__PURE__ */ jsx("div", { className: "flex flex-col items-center justify-center py-12 text-center", children: /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-muted-foreground", children: "No records found" }) });
  }
  return /* @__PURE__ */ jsx("div", { className: cn("overflow-x-auto", className), children: /* @__PURE__ */ jsxs("table", { className: "w-full min-w-[800px] border-collapse text-sm", children: [
    /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsx("tr", { className: "border-b border-border bg-muted/50 transition-colors", children: headers.map((header, index) => /* @__PURE__ */ jsx(
      "th",
      {
        className: cn(
          "px-6 py-4 text-left font-bold uppercase tracking-wider text-muted-foreground text-[10px]",
          index === headers.length - 1 && "text-right"
        ),
        children: header
      },
      header
    )) }) }),
    /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-border", children })
  ] }) });
}
function AdminTableRow({ children, onClick, className }) {
  return /* @__PURE__ */ jsx(
    "tr",
    {
      onClick,
      className: cn(
        "group transition-all duration-200 hover:bg-muted/50",
        onClick && "cursor-pointer",
        className
      ),
      children
    }
  );
}
function AdminTableCell({ children, className, align = "left" }) {
  return /* @__PURE__ */ jsx("td", { className: cn(
    "px-6 py-4 align-top",
    align === "right" && "text-right",
    align === "center" && "text-center",
    className
  ), children });
}
const updateDisputeReviewStatus = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(createSsrRpc("3c1e409d910825d3a5a277a9a5f297e2365837eb02ddc09f92a7788eef1bf966"));
function JobManagement() {
  const data = useLoaderData({
    from: "/job-management"
  });
  const router = useRouter();
  const [jobQuery, setJobQuery] = useState("");
  const [disputeQuery, setDisputeQuery] = useState("");
  const [jobQuickFilter, setJobQuickFilter] = useState(null);
  const [disputeQuickFilter, setDisputeQuickFilter] = useState(null);
  const [jobFilters, setJobFilters] = useState({
    customer: "",
    provider: "",
    category: "ALL",
    status: "ALL",
    paymentStatus: "ALL"
  });
  const [disputeFilters, setDisputeFilters] = useState({
    status: "ALL",
    priority: "ALL",
    customer: "",
    provider: ""
  });
  const [pendingDisputeId, setPendingDisputeId] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedDispute, setSelectedDispute] = useState(null);
  if (!data.viewer || data.viewer.role !== "ADMIN") {
    return /* @__PURE__ */ jsx("div", { className: "grid min-h-screen place-items-center bg-muted/30 px-4", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-sm rounded-2xl border border-border bg-card p-8 text-center shadow-lg", children: [
      /* @__PURE__ */ jsx("div", { className: "mx-auto grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary", children: /* @__PURE__ */ jsx(ShieldCheck, { className: "h-6 w-6" }) }),
      /* @__PURE__ */ jsx("h1", { className: "mt-6 text-xl font-bold", children: "Admin access required" }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Sign in from the admin panel to manage jobs and disputes." }),
      /* @__PURE__ */ jsx(Button, { asChild: true, className: "mt-8 w-full", children: /* @__PURE__ */ jsx(Link, { to: "/admin", children: "Open admin panel" }) })
    ] }) });
  }
  const jobs = data.jobs;
  const disputes = data.disputes;
  const visibleJobs = useMemo(() => filterJobs(jobs, disputes, jobQuery, jobFilters, jobQuickFilter), [jobs, disputes, jobQuery, jobFilters, jobQuickFilter]);
  const visibleDisputes = useMemo(() => filterDisputes(disputes, disputeQuery, disputeFilters, disputeQuickFilter), [disputes, disputeQuery, disputeFilters, disputeQuickFilter]);
  const displayName = `${data.viewer.firstName} ${data.viewer.lastName}`.trim() || data.viewer.email;
  const stats = getPageStats(jobs, disputes);
  const jobStatuses = useMemo(() => uniqueOptions(jobs.flatMap((job) => [job.status, job.trackingStatus].filter(Boolean))), [jobs]);
  async function handleDisputeStatus(dispute, status) {
    setPendingDisputeId(dispute.id);
    try {
      await updateDisputeReviewStatus({
        data: {
          disputeId: dispute.id,
          status
        }
      });
      await router.invalidate();
    } finally {
      setPendingDisputeId(null);
    }
  }
  return /* @__PURE__ */ jsxs(AppShell, { userName: displayName, userRole: "Admin", userAvatarUrl: data.viewer.avatarUrl, children: [
    /* @__PURE__ */ jsx(AdminPageHeader, { title: "Job & Dispute Management", description: "Monitor posted jobs, assigned work, completion activity, and dispute resolution.", breadcrumbs: [{
      label: "Job Management"
    }], actions: /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(ReportExportActions, { table: "ClientJob", reportName: "Job management export", variant: "outline" }),
      /* @__PURE__ */ jsx(Button, { asChild: true, variant: "outline", children: /* @__PURE__ */ jsx(Link, { to: "/admin", children: "Back to admin" }) })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: [
      /* @__PURE__ */ jsx(AdminSummaryCard, { icon: BriefcaseBusiness, label: "Total jobs", value: stats.totalJobs, caption: `${stats.openJobs} open jobs`, active: jobQuickFilter === "TOTAL", onClick: () => {
        setDisputeQuickFilter(null);
        setJobQuickFilter("TOTAL");
      } }),
      /* @__PURE__ */ jsx(AdminSummaryCard, { icon: ListChecks, label: "Assigned jobs", value: stats.assignedJobs, caption: `${stats.inProgressJobs} in progress`, active: jobQuickFilter === "ASSIGNED", onClick: () => {
        setDisputeQuickFilter(null);
        setJobQuickFilter("ASSIGNED");
      } }),
      /* @__PURE__ */ jsx(AdminSummaryCard, { icon: AlertTriangle, label: "Open disputes", value: stats.openDisputes, caption: `${stats.highPriorityDisputes} high priority`, active: disputeQuickFilter === "OPEN_ALL", variant: "destructive", onClick: () => {
        setJobQuickFilter(null);
        setDisputeQuickFilter("OPEN_ALL");
      } }),
      /* @__PURE__ */ jsx(AdminSummaryCard, { icon: CheckCircle2, label: "Completed jobs", value: stats.completedJobs, caption: `${stats.resolvedDisputes} disputes resolved`, active: jobQuickFilter === "COMPLETED", variant: "success", onClick: () => {
        setDisputeQuickFilter(null);
        setJobQuickFilter("COMPLETED");
      } })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-8 space-y-8", children: [
      !jobQuickFilter ? /* @__PURE__ */ jsxs(AdminSection, { icon: AlertTriangle, title: "Dispute queue", description: "Review issue type, parties, priority, and resolution status.", actions: /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative w-full sm:w-64", children: [
          /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
          /* @__PURE__ */ jsx(Input, { value: disputeQuery, onChange: (event) => setDisputeQuery(event.target.value), placeholder: "Search disputes...", className: "pl-9 h-10 rounded-xl" })
        ] }),
        /* @__PURE__ */ jsx(FilterSelect, { label: "Status", value: disputeFilters.status, values: ["ALL", "OPEN", "UNDER_REVIEW", "RESOLVED"], onChange: (value) => setDisputeFilters({
          ...disputeFilters,
          status: value
        }) }),
        /* @__PURE__ */ jsx(FilterSelect, { label: "Priority", value: disputeFilters.priority, values: ["ALL", "HIGH", "MEDIUM", "LOW"], onChange: (value) => setDisputeFilters({
          ...disputeFilters,
          priority: value
        }) })
      ] }), children: [
        disputeQuickFilter && /* @__PURE__ */ jsx("div", { className: "px-6 py-2 border-b border-border bg-primary/5", children: /* @__PURE__ */ jsx(ActiveFilterPill, { label: `Showing ${formatEnum(disputeQuickFilter)}`, onClear: () => setDisputeQuickFilter(null) }) }),
        /* @__PURE__ */ jsx(AdminTable, { headers: ["Dispute ID", "Customer", "Provider", "Status", "Actions"], emptyState: /* @__PURE__ */ jsx(AdminEmptyState, { title: "No disputes found", description: "Raised disputes will appear here for admin review." }), children: visibleDisputes.map((dispute) => /* @__PURE__ */ jsxs(AdminTableRow, { onClick: () => setSelectedDispute(dispute), children: [
          /* @__PURE__ */ jsx(AdminTableCell, { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
            /* @__PURE__ */ jsxs("span", { className: "font-bold text-foreground", children: [
              "#",
              dispute.id
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground font-medium", children: dispute.jobId ? `Job #${dispute.jobId}` : "No job" })
          ] }) }),
          /* @__PURE__ */ jsx(AdminTableCell, { children: /* @__PURE__ */ jsx("p", { className: "font-medium text-foreground", children: dispute.clientName }) }),
          /* @__PURE__ */ jsx(AdminTableCell, { children: /* @__PURE__ */ jsx("p", { className: "font-medium text-foreground", children: dispute.professionalName }) }),
          /* @__PURE__ */ jsx(AdminTableCell, { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-start gap-1.5", children: [
            /* @__PURE__ */ jsx(Badge, { variant: getDisputeStatusVariant(dispute.status), children: formatEnum(dispute.status) }),
            /* @__PURE__ */ jsx(Badge, { variant: dispute.priority === "HIGH" ? "destructive" : "outline", children: formatEnum(dispute.priority) })
          ] }) }),
          /* @__PURE__ */ jsx(AdminTableCell, { align: "right", children: /* @__PURE__ */ jsxs(Button, { type: "button", variant: "outline", size: "sm", className: "gap-2 rounded-lg", onClick: (e) => {
            e.stopPropagation();
            setSelectedDispute(dispute);
          }, children: [
            /* @__PURE__ */ jsx(Eye, { className: "h-4 w-4" }),
            "View Details"
          ] }) })
        ] }, dispute.id)) })
      ] }) : null,
      !disputeQuickFilter ? /* @__PURE__ */ jsxs(AdminSection, { icon: BriefcaseBusiness, title: "Posted jobs", description: "View client jobs, assigned professionals, budgets, deadlines, and work status.", actions: /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative w-full sm:w-64", children: [
          /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
          /* @__PURE__ */ jsx(Input, { value: jobQuery, onChange: (event) => setJobQuery(event.target.value), placeholder: "Search jobs...", className: "pl-9 h-10 rounded-xl" })
        ] }),
        /* @__PURE__ */ jsx(FilterSelect, { label: "Status", value: jobFilters.status, values: ["ALL", ...jobStatuses], onChange: (value) => setJobFilters({
          ...jobFilters,
          status: value
        }) }),
        /* @__PURE__ */ jsx(FilterSelect, { label: "Payment", value: jobFilters.paymentStatus, values: ["ALL", "PENDING", "PAID", "REFUND_DUE"], onChange: (value) => setJobFilters({
          ...jobFilters,
          paymentStatus: value
        }) })
      ] }), children: [
        jobQuickFilter && /* @__PURE__ */ jsx("div", { className: "px-6 py-2 border-b border-border bg-primary/5", children: /* @__PURE__ */ jsx(ActiveFilterPill, { label: `Showing ${formatEnum(jobQuickFilter)}`, onClear: () => setJobQuickFilter(null) }) }),
        /* @__PURE__ */ jsx(AdminTable, { headers: ["Job ID", "Customer", "Provider", "Status", "Actions"], emptyState: /* @__PURE__ */ jsx(AdminEmptyState, { title: "No jobs found", description: "Client job posts will appear here after they are created." }), children: visibleJobs.map((job) => /* @__PURE__ */ jsxs(AdminTableRow, { onClick: () => setSelectedJob(job), children: [
          /* @__PURE__ */ jsx(AdminTableCell, { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
            /* @__PURE__ */ jsxs("span", { className: "font-bold text-foreground", children: [
              "#",
              job.id
            ] }),
            /* @__PURE__ */ jsx("span", { className: "max-w-[160px] truncate text-xs text-muted-foreground font-medium", children: job.title })
          ] }) }),
          /* @__PURE__ */ jsx(AdminTableCell, { children: /* @__PURE__ */ jsx("p", { className: "font-medium text-foreground", children: job.clientName }) }),
          /* @__PURE__ */ jsx(AdminTableCell, { children: /* @__PURE__ */ jsx("p", { className: "font-medium text-foreground", children: job.professionalName || "Not assigned" }) }),
          /* @__PURE__ */ jsx(AdminTableCell, { children: /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1.5", children: getJobStatusBadges(job).map((badge) => /* @__PURE__ */ jsx(Badge, { variant: badge.variant, children: badge.label }, badge.label)) }) }),
          /* @__PURE__ */ jsx(AdminTableCell, { align: "right", children: /* @__PURE__ */ jsxs(Button, { type: "button", variant: "outline", size: "sm", className: "gap-2 rounded-lg", onClick: (e) => {
            e.stopPropagation();
            setSelectedJob(job);
          }, children: [
            /* @__PURE__ */ jsx(Eye, { className: "h-4 w-4" }),
            "View Details"
          ] }) })
        ] }, job.id)) })
      ] }) : null
    ] }),
    selectedJob ? /* @__PURE__ */ jsx(JobDetailModal, { job: selectedJob, onClose: () => setSelectedJob(null) }) : null,
    selectedDispute ? /* @__PURE__ */ jsx(DisputeDetailModal, { dispute: selectedDispute, pending: pendingDisputeId === selectedDispute.id, onClose: () => setSelectedDispute(null), onStatusChange: handleDisputeStatus }) : null
  ] });
}
function JobDetailModal({
  job,
  onClose
}) {
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm transition-all animate-in fade-in", children: /* @__PURE__ */ jsxs("div", { className: "flex max-h-[92vh] w-full max-w-6xl flex-col rounded-3xl border border-border bg-background shadow-2xl animate-in zoom-in-95 duration-200", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-4 border-b border-border px-8 py-6 bg-muted/20", children: [
      /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
          /* @__PURE__ */ jsx("h2", { className: "truncate text-2xl font-bold tracking-tight", children: job.title }),
          /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: getJobStatusBadges(job).map((badge) => /* @__PURE__ */ jsx(Badge, { variant: badge.variant, children: badge.label }, badge.label)) })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "mt-2 text-sm text-muted-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsxs("span", { className: "font-semibold text-primary", children: [
            "Job #",
            job.id
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-border", children: "|" }),
          /* @__PURE__ */ jsx("span", { children: job.category }),
          /* @__PURE__ */ jsx("span", { className: "text-border", children: "|" }),
          /* @__PURE__ */ jsxs("span", { children: [
            "Uploaded by ",
            job.clientName,
            " on ",
            formatDateTime(job.createdAt)
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("button", { type: "button", onClick: onClose, className: "rounded-full p-2 text-muted-foreground transition-all hover:bg-muted hover:text-foreground active:scale-90", "aria-label": "Close job details", children: /* @__PURE__ */ jsx(X, { className: "h-6 w-6" }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "overflow-auto p-8 custom-scrollbar", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid gap-6 lg:grid-cols-[1.1fr_0.9fr]", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs(InfoPanel, { title: "Job Details", icon: BriefcaseBusiness, children: [
            /* @__PURE__ */ jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
              /* @__PURE__ */ jsx(InfoLine, { icon: UserRound, label: "Client", value: `${job.clientName} / ${job.clientEmail}` }),
              /* @__PURE__ */ jsx(InfoLine, { icon: BriefcaseBusiness, label: "Assigned professional", value: job.professionalName ? `${job.professionalName} / ${job.professionalEmail}` : "Not assigned" }),
              /* @__PURE__ */ jsx(InfoLine, { icon: CalendarDays, label: "Posted", value: formatDateTime(job.createdAt) }),
              /* @__PURE__ */ jsx(InfoLine, { icon: Clock3, label: "Updated", value: formatDateTime(job.updatedAt) }),
              /* @__PURE__ */ jsx(InfoLine, { icon: CalendarDays, label: "Job date", value: formatDate(job.jobDate) }),
              /* @__PURE__ */ jsx(InfoLine, { icon: CalendarDays, label: "Deadline", value: formatDate(job.deadline) }),
              /* @__PURE__ */ jsx(InfoLine, { icon: Clock3, label: "Urgency", value: formatEnum(job.urgency) }),
              /* @__PURE__ */ jsx(InfoLine, { icon: Clock3, label: "Work mode", value: formatEnum(job.workMode) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-4 rounded-2xl border border-border bg-muted/30 p-5", children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs font-bold uppercase tracking-widest text-muted-foreground", children: "Description" }),
              /* @__PURE__ */ jsx("p", { className: "mt-3 whitespace-pre-wrap text-sm leading-relaxed text-foreground/90", children: job.description || "No description added." })
            ] })
          ] }),
          /* @__PURE__ */ jsx(InfoPanel, { title: "Timeline", icon: Clock3, children: /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsx(TimelineRow, { label: "Job uploaded by client", value: formatDateTime(job.createdAt) }),
            /* @__PURE__ */ jsx(TimelineRow, { label: "Last updated", value: formatDateTime(job.updatedAt) }),
            /* @__PURE__ */ jsx(TimelineRow, { label: "Professional accepted", value: formatDateTime(job.acceptedAt) }),
            /* @__PURE__ */ jsx(TimelineRow, { label: "Completion submitted", value: formatDateTime(job.completionSubmittedAt) }),
            /* @__PURE__ */ jsx(TimelineRow, { label: "Completed / closed", value: formatDateTime(job.completedAt) })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsx(InfoPanel, { title: "Budget & Location", icon: MapPin, children: /* @__PURE__ */ jsxs("div", { className: "grid gap-4", children: [
            /* @__PURE__ */ jsx(InfoLine, { icon: BriefcaseBusiness, label: "Budget", value: formatBudget(job.budgetMin, job.budgetMax) }),
            /* @__PURE__ */ jsx(InfoLine, { icon: DollarSign, label: "Payment status", value: formatEnum(getPaymentStatus(job)) }),
            /* @__PURE__ */ jsx(InfoLine, { icon: DollarSign, label: "Transaction ID", value: job.trackingId ? `Tracking #${job.trackingId}` : "Not available" }),
            /* @__PURE__ */ jsx(InfoLine, { icon: RotateCcw, label: "Refund status", value: getPaymentStatus(job) === "REFUND_DUE" ? "Review needed" : "No refund pending" }),
            /* @__PURE__ */ jsx(InfoLine, { icon: Clock3, label: "Timing type", value: formatEnum(job.timingType) }),
            /* @__PURE__ */ jsx(InfoLine, { icon: MapPin, label: "Location label", value: job.locationLabel || "Not set" }),
            /* @__PURE__ */ jsx(InfoLine, { icon: MapPin, label: "Address", value: job.locationAddress || "Not set" })
          ] }) }),
          /* @__PURE__ */ jsx(InfoPanel, { title: "Client Uploaded Files", icon: Paperclip, children: job.attachments.length ? /* @__PURE__ */ jsx("div", { className: "space-y-3", children: job.attachments.map((attachment) => /* @__PURE__ */ jsx(FileRow, { title: attachment.fileName, subtitle: `Uploaded by ${job.clientName} · ${formatDateTime(attachment.createdAt)} · ${formatFileSize(attachment.fileSize)}`, href: attachment.previewUrl }, attachment.id)) }) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center py-6 text-center rounded-xl border-2 border-dashed border-border", children: [
            /* @__PURE__ */ jsx(Paperclip, { className: "h-8 w-8 text-muted-foreground/40" }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground font-medium", children: "No client files uploaded." })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-8 grid gap-6 lg:grid-cols-2", children: [
        /* @__PURE__ */ jsx(InfoPanel, { title: "Professional Proposals", icon: Mail, children: job.requests.length ? /* @__PURE__ */ jsx("div", { className: "space-y-4", children: job.requests.map((request) => /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-border bg-muted/20 p-5 hover:bg-muted/40 transition-colors", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-between gap-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "font-bold text-foreground", children: request.professionalName }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground font-medium", children: request.professionalEmail })
            ] }),
            /* @__PURE__ */ jsx(Badge, { variant: request.status === "ACCEPTED" ? "default" : "outline", className: "rounded-lg", children: formatEnum(request.status) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(DollarSign, { className: "h-4 w-4 text-primary/60" }),
              /* @__PURE__ */ jsxs("span", { children: [
                "Bid: ",
                /* @__PURE__ */ jsx("span", { className: "font-bold text-foreground", children: request.bidAmount ? formatMoney(request.bidAmount) : "Not set" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Clock3, { className: "h-4 w-4 text-primary/60" }),
              /* @__PURE__ */ jsxs("span", { children: [
                "Duration: ",
                /* @__PURE__ */ jsx("span", { className: "font-bold text-foreground", children: request.duration || "Not set" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 p-4 rounded-xl border border-border bg-background", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2", children: "Cover Letter" }),
            /* @__PURE__ */ jsxs("p", { className: "whitespace-pre-wrap text-sm leading-relaxed italic", children: [
              '"',
              request.coverLetter || "No cover letter.",
              '"'
            ] })
          ] }),
          /* @__PURE__ */ jsx(AttachmentJsonList, { value: request.attachmentsJson, uploadedBy: request.professionalName })
        ] }, request.id)) }) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center py-8 text-center rounded-xl border-2 border-dashed border-border", children: [
          /* @__PURE__ */ jsx(Mail, { className: "h-10 w-10 text-muted-foreground/40" }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm text-muted-foreground font-medium", children: "No proposals submitted for this job." })
        ] }) }),
        /* @__PURE__ */ jsx(InfoPanel, { title: "Professional Work Uploads", icon: Upload, children: job.workUploads.length ? /* @__PURE__ */ jsx("div", { className: "space-y-4", children: job.workUploads.map((upload) => /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-border bg-muted/20 p-5 hover:bg-muted/40 transition-colors", children: [
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap items-center justify-between gap-4", children: /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("p", { className: "font-bold text-foreground", children: [
              "Round ",
              upload.roundNumber,
              ": ",
              upload.title
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground font-medium", children: [
              "Uploaded by ",
              upload.professionalName,
              " · ",
              formatDateTime(upload.createdAt)
            ] })
          ] }) }),
          /* @__PURE__ */ jsxs("p", { className: "mt-3 text-sm text-muted-foreground leading-relaxed italic", children: [
            '"',
            upload.note,
            '"'
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 space-y-3", children: [
            upload.fileName ? /* @__PURE__ */ jsx(FileRow, { title: upload.fileName, subtitle: "Single uploaded work file", href: upload.fileUrl }) : null,
            /* @__PURE__ */ jsx(AttachmentJsonList, { value: upload.filesJson, uploadedBy: upload.professionalName })
          ] })
        ] }, upload.id)) }) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center py-8 text-center rounded-xl border-2 border-dashed border-border", children: [
          /* @__PURE__ */ jsx(Upload, { className: "h-10 w-10 text-muted-foreground/40" }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm text-muted-foreground font-medium", children: "No professional work uploads yet." })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-8", children: /* @__PURE__ */ jsx(InfoPanel, { title: "Activity Log", icon: ListChecks, children: /* @__PURE__ */ jsx(ActivityLogRows, { rows: [{
        date: job.createdAt,
        user: job.clientName,
        role: "Customer",
        action: "Created job",
        description: job.title
      }, ...job.acceptedAt ? [{
        date: job.acceptedAt,
        user: job.professionalName || "Provider",
        role: "Provider",
        action: "Accepted job",
        description: "Provider assigned to job"
      }] : [], ...job.completionSubmittedAt ? [{
        date: job.completionSubmittedAt,
        user: job.professionalName || "Provider",
        role: "Provider",
        action: "Submitted work",
        description: "Completion request submitted"
      }] : [], {
        date: job.updatedAt,
        user: "System",
        role: "System",
        action: "Updated record",
        description: `Status: ${formatEnum(job.trackingStatus || job.status)}`
      }] }) }) })
    ] })
  ] }) });
}
function DisputeDetailModal({
  dispute,
  pending,
  onClose,
  onStatusChange
}) {
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm transition-all animate-in fade-in", children: /* @__PURE__ */ jsxs("div", { className: "flex max-h-[92vh] w-full max-w-6xl flex-col rounded-3xl border border-border bg-background shadow-2xl animate-in zoom-in-95 duration-200", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-4 border-b border-border px-8 py-6 bg-muted/20", children: [
      /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
          /* @__PURE__ */ jsxs("h2", { className: "truncate text-2xl font-bold tracking-tight", children: [
            "Dispute #",
            dispute.id
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsx(Badge, { variant: getDisputeStatusVariant(dispute.status), children: formatEnum(dispute.status) }),
            /* @__PURE__ */ jsx(Badge, { variant: dispute.priority === "HIGH" ? "destructive" : "outline", children: formatEnum(dispute.priority) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "mt-2 text-sm text-muted-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsxs("span", { className: "font-semibold text-primary", children: [
            "Job #",
            dispute.jobId || "unlinked"
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-border", children: "|" }),
          /* @__PURE__ */ jsx("span", { className: "truncate max-w-md", children: dispute.jobTitle }),
          /* @__PURE__ */ jsx("span", { className: "text-border", children: "|" }),
          /* @__PURE__ */ jsxs("span", { children: [
            "Opened ",
            formatDateTime(dispute.createdAt)
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("button", { type: "button", onClick: onClose, className: "rounded-full p-2 text-muted-foreground transition-all hover:bg-muted hover:text-foreground active:scale-90", "aria-label": "Close dispute details", children: /* @__PURE__ */ jsx(X, { className: "h-6 w-6" }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "overflow-auto p-8 custom-scrollbar", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid gap-6 lg:grid-cols-2", children: [
        /* @__PURE__ */ jsxs(InfoPanel, { title: "Dispute Information", icon: AlertTriangle, children: [
          /* @__PURE__ */ jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
            /* @__PURE__ */ jsx(InfoLine, { icon: FileText, label: "Reason", value: formatEnum(dispute.issueType) }),
            /* @__PURE__ */ jsx(InfoLine, { icon: BriefcaseBusiness, label: "Job ID", value: dispute.jobId ? `#${dispute.jobId}` : "Not linked" }),
            /* @__PURE__ */ jsx(InfoLine, { icon: CalendarDays, label: "Created", value: formatDateTime(dispute.createdAt) }),
            /* @__PURE__ */ jsx(InfoLine, { icon: Clock3, label: "Updated", value: formatDateTime(dispute.updatedAt) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-6 rounded-2xl border border-border bg-muted/30 p-5", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs font-bold uppercase tracking-widest text-muted-foreground", children: "Description" }),
            /* @__PURE__ */ jsxs("p", { className: "mt-3 whitespace-pre-wrap text-sm leading-relaxed text-foreground/90 italic", children: [
              '"',
              dispute.message,
              '"'
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx(InfoPanel, { title: "People Involved", icon: UserRound, children: /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsx(InfoLine, { icon: UserRound, label: "Reporter", value: `${dispute.reporterName} · ${formatEnum(dispute.reporterRole)} · ${dispute.reporterEmail}` }),
          /* @__PURE__ */ jsx(InfoLine, { icon: UserRound, label: "Customer", value: `${dispute.clientName} · ${dispute.clientEmail}` }),
          /* @__PURE__ */ jsx(InfoLine, { icon: BriefcaseBusiness, label: "Provider", value: `${dispute.professionalName} · ${dispute.professionalEmail}` })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-8 grid gap-6 lg:grid-cols-2", children: [
        /* @__PURE__ */ jsxs(InfoPanel, { title: "Evidence & Conversation", icon: Paperclip, children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center py-10 text-center rounded-2xl border-2 border-dashed border-border bg-muted/5", children: [
            /* @__PURE__ */ jsx(Paperclip, { className: "h-12 w-12 text-muted-foreground/40" }),
            /* @__PURE__ */ jsx("h4", { className: "mt-4 font-bold text-foreground", children: "No evidence files attached" }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 max-w-xs text-sm text-muted-foreground leading-relaxed", children: "Images, videos, PDFs, screenshots, and admin notes will appear here when the evidence table is connected." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-6 rounded-2xl border border-border bg-primary/5 p-5", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs font-bold uppercase tracking-widest text-primary mb-2", children: "Conversation Timeline" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: "Customer/provider messages and admin notes are ready to display once message history is exposed to this admin loader." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(InfoPanel, { title: "Resolution Actions", icon: ShieldCheck, children: [
          /* @__PURE__ */ jsxs("div", { className: "grid gap-3 sm:grid-cols-3", children: [
            /* @__PURE__ */ jsx(Button, { type: "button", size: "lg", variant: dispute.status === "OPEN" ? "default" : "outline", disabled: pending, className: "rounded-xl h-14", onClick: () => onStatusChange(dispute, "OPEN"), children: "Mark Open" }),
            /* @__PURE__ */ jsx(Button, { type: "button", size: "lg", variant: dispute.status === "UNDER_REVIEW" ? "default" : "outline", disabled: pending, className: "rounded-xl h-14", onClick: () => onStatusChange(dispute, "UNDER_REVIEW"), children: "Under Review" }),
            /* @__PURE__ */ jsx(Button, { type: "button", size: "lg", variant: dispute.status === "RESOLVED" ? "default" : "outline", disabled: pending, className: "rounded-xl h-14", onClick: () => onStatusChange(dispute, "RESOLVED"), children: "Mark Resolved" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-6 rounded-2xl border border-border bg-amber-50 p-5", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs font-bold uppercase tracking-widest text-amber-700 mb-2", children: "Admin Note" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-amber-900/70 leading-relaxed", children: "Carefully review all evidence and party statements before finalizing the resolution status. Status changes are logged for auditing." })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-8", children: /* @__PURE__ */ jsx(InfoPanel, { title: "Resolution History", icon: ListChecks, children: /* @__PURE__ */ jsx(ActivityLogRows, { rows: [{
        date: dispute.createdAt,
        user: dispute.reporterName,
        role: formatEnum(dispute.reporterRole),
        action: "Opened dispute",
        description: dispute.message
      }, {
        date: dispute.updatedAt,
        user: "Admin/System",
        role: "Admin",
        action: "Updated status",
        description: `Current status: ${formatEnum(dispute.status)}`
      }] }) }) })
    ] })
  ] }) });
}
function InfoPanel({
  title,
  icon: Icon,
  children
}) {
  return /* @__PURE__ */ jsxs("div", { className: "rounded-3xl border border-border bg-card p-6 shadow-sm", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-5 flex items-center gap-3", children: [
      /* @__PURE__ */ jsx("div", { className: "grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary", children: /* @__PURE__ */ jsx(Icon, { className: "h-4 w-4" }) }),
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold tracking-tight text-foreground", children: title })
    ] }),
    children
  ] });
}
function FilterSelect({
  label,
  value,
  values,
  onChange
}) {
  return /* @__PURE__ */ jsxs(Select, { value, onValueChange: onChange, children: [
    /* @__PURE__ */ jsx(SelectTrigger, { "aria-label": label, className: "h-10 rounded-xl shadow-sm bg-background w-full sm:w-44", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: label }) }),
    /* @__PURE__ */ jsx(SelectContent, { children: values.map((option) => /* @__PURE__ */ jsx(SelectItem, { value: option, children: option === "ALL" ? `All ${label}` : formatEnum(option) }, option)) })
  ] });
}
function ActiveFilterPill({
  label,
  onClear
}) {
  return /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-primary", children: [
    label,
    /* @__PURE__ */ jsx("button", { type: "button", onClick: onClear, className: "rounded-full p-0.5 hover:bg-primary/10 transition-colors", "aria-label": "Clear quick filter", children: /* @__PURE__ */ jsx(X, { className: "h-3 w-3" }) })
  ] });
}
function ActivityLogRows({
  rows
}) {
  return /* @__PURE__ */ jsx("div", { className: "overflow-x-auto rounded-2xl border border-border", children: /* @__PURE__ */ jsxs("table", { className: "w-full min-w-[680px] text-sm", children: [
    /* @__PURE__ */ jsx("thead", { className: "bg-muted/50 text-[10px] uppercase tracking-widest text-muted-foreground", children: /* @__PURE__ */ jsxs("tr", { children: [
      /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-left font-bold", children: "Date" }),
      /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-left font-bold", children: "User" }),
      /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-left font-bold", children: "Role" }),
      /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-left font-bold", children: "Action" }),
      /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-left font-bold", children: "Description" }),
      /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-left font-bold", children: "IP Address" })
    ] }) }),
    /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-border", children: rows.map((row, index) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-muted/30 transition-colors", children: [
      /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-muted-foreground tabular-nums", children: formatDateTime(row.date) }),
      /* @__PURE__ */ jsx("td", { className: "px-6 py-4 font-medium text-foreground", children: row.user }),
      /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "rounded-lg text-[10px] uppercase tracking-wider", children: row.role }) }),
      /* @__PURE__ */ jsx("td", { className: "px-6 py-4 font-bold text-primary", children: row.action }),
      /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-muted-foreground leading-relaxed max-w-xs truncate", children: row.description }),
      /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-muted-foreground/60 italic text-xs", children: "Not logged" })
    ] }, `${row.action}-${index}`)) })
  ] }) });
}
function InfoLine({
  icon: Icon,
  label,
  value
}) {
  return /* @__PURE__ */ jsxs("div", { className: "min-w-0 rounded-2xl border border-border bg-background p-4 shadow-sm hover:border-primary/20 transition-colors", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1", children: [
      /* @__PURE__ */ jsx(Icon, { className: "h-3.5 w-3.5 text-primary/60" }),
      /* @__PURE__ */ jsx("span", { children: label })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "mt-1 break-words text-sm font-bold text-foreground", children: value })
  ] });
}
function TimelineRow({
  label,
  value
}) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-4 rounded-xl border border-border bg-background px-5 py-3 text-sm shadow-sm", children: [
    /* @__PURE__ */ jsx("span", { className: "text-muted-foreground font-medium", children: label }),
    /* @__PURE__ */ jsx("span", { className: "text-right font-bold tabular-nums text-foreground", children: value })
  ] });
}
function FileRow({
  title,
  subtitle,
  href
}) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-4 rounded-2xl border border-border bg-background p-4 shadow-sm hover:border-primary/30 transition-all group", children: [
    /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex items-center gap-4", children: [
      /* @__PURE__ */ jsx("div", { className: "grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors", children: /* @__PURE__ */ jsx(Paperclip, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsx("p", { className: "truncate text-sm font-bold text-foreground", children: title }),
        /* @__PURE__ */ jsx("p", { className: "text-[11px] text-muted-foreground font-medium uppercase tracking-wider mt-0.5", children: subtitle })
      ] })
    ] }),
    href ? /* @__PURE__ */ jsx("a", { href, target: "_blank", rel: "noreferrer", className: "shrink-0 text-sm font-bold text-primary hover:underline px-4 py-2 rounded-xl hover:bg-primary/10 transition-colors", children: "View File" }) : null
  ] });
}
function AttachmentJsonList({
  value,
  uploadedBy
}) {
  const files = parseAttachmentJson(value);
  if (!files.length) {
    return null;
  }
  return /* @__PURE__ */ jsx("div", { className: "mt-4 space-y-3", children: files.map((file, index) => /* @__PURE__ */ jsx(FileRow, { title: file.fileName || `Attachment ${index + 1}`, subtitle: `Uploaded by ${uploadedBy}${file.fileSize ? ` · ${formatFileSize(file.fileSize)}` : ""}`, href: file.fileUrl || file.fileDataUrl || null }, `${file.fileName}-${index}`)) });
}
function getPageStats(jobs, disputes) {
  const unresolvedDisputes = disputes.filter((dispute) => dispute.status !== "RESOLVED");
  const disputedJobIds = new Set(disputes.map((dispute) => dispute.jobId).filter((id) => id != null));
  return {
    totalJobs: jobs.length,
    pendingJobs: jobs.filter((job) => job.status === "DRAFT" || !job.trackingId && job.status !== "OPEN").length,
    openJobs: jobs.filter((job) => job.status === "OPEN").length,
    assignedJobs: jobs.filter((job) => Boolean(job.trackingId)).length,
    inProgressJobs: jobs.filter((job) => job.trackingStatus === "ACTIVE").length,
    completedJobs: jobs.filter((job) => job.status === "CLOSED" || job.trackingStatus === "COMPLETED").length,
    cancelledJobs: jobs.filter((job) => job.status === "CANCELLED" || job.trackingStatus === "CANCELLED").length,
    disputedJobs: jobs.filter((job) => disputedJobIds.has(job.id)).length,
    totalDisputes: disputes.length,
    openDisputes: unresolvedDisputes.length,
    newDisputes: disputes.filter((dispute) => dispute.status === "OPEN").length,
    underReviewDisputes: disputes.filter((dispute) => dispute.status === "UNDER_REVIEW").length,
    resolvedDisputes: disputes.filter((dispute) => dispute.status === "RESOLVED").length,
    highPriorityDisputes: unresolvedDisputes.filter((dispute) => dispute.priority === "HIGH").length
  };
}
function filterJobs(jobs, disputes, query, filters, quickFilter) {
  const term = query.trim().toLowerCase();
  const disputedJobIds = new Set(disputes.map((dispute) => dispute.jobId).filter((id) => id != null));
  return jobs.filter((job) => {
    const searchable = [String(job.id), job.title, job.description, job.category, job.status, job.clientName, job.clientEmail, job.professionalName, job.professionalEmail, job.trackingStatus, job.locationLabel, job.locationAddress, job.workMode].join(" ").toLowerCase();
    const statusValues = [job.status, job.trackingStatus].filter(Boolean).map(String);
    if (term && !searchable.includes(term)) return false;
    if (filters.customer.trim() && !`${job.clientName} ${job.clientEmail}`.toLowerCase().includes(filters.customer.trim().toLowerCase())) return false;
    if (filters.provider.trim() && !`${job.professionalName || ""} ${job.professionalEmail || ""}`.toLowerCase().includes(filters.provider.trim().toLowerCase())) return false;
    if (filters.category !== "ALL" && job.category !== filters.category) return false;
    if (filters.status !== "ALL" && !statusValues.includes(filters.status)) return false;
    if (filters.paymentStatus !== "ALL" && getPaymentStatus(job) !== filters.paymentStatus) return false;
    if (!matchesJobQuickFilter(job, quickFilter, disputedJobIds)) return false;
    return true;
  });
}
function filterDisputes(disputes, query, filters, quickFilter) {
  const term = query.trim().toLowerCase();
  return disputes.filter((dispute) => {
    const searchable = [String(dispute.id), dispute.jobId ? String(dispute.jobId) : "", dispute.jobTitle, dispute.issueType, dispute.priority, dispute.status, dispute.message, dispute.reporterRole, dispute.reporterName, dispute.reporterEmail, dispute.clientName, dispute.clientEmail, dispute.professionalName, dispute.professionalEmail].join(" ").toLowerCase();
    if (term && !searchable.includes(term)) return false;
    if (filters.status !== "ALL" && dispute.status !== filters.status) return false;
    if (filters.priority !== "ALL" && dispute.priority !== filters.priority) return false;
    if (filters.customer.trim() && !`${dispute.clientName} ${dispute.clientEmail}`.toLowerCase().includes(filters.customer.trim().toLowerCase())) return false;
    if (filters.provider.trim() && !`${dispute.professionalName} ${dispute.professionalEmail}`.toLowerCase().includes(filters.provider.trim().toLowerCase())) return false;
    if (!matchesDisputeQuickFilter(dispute, quickFilter)) return false;
    return true;
  });
}
function matchesJobQuickFilter(job, quickFilter, disputedJobIds) {
  if (!quickFilter || quickFilter === "TOTAL") return true;
  if (quickFilter === "PENDING") return job.status === "DRAFT" || !job.trackingId && job.status !== "OPEN";
  if (quickFilter === "OPEN") return job.status === "OPEN";
  if (quickFilter === "ASSIGNED") return Boolean(job.trackingId);
  if (quickFilter === "IN_PROGRESS") return job.trackingStatus === "ACTIVE";
  if (quickFilter === "COMPLETED") return job.status === "CLOSED" || job.trackingStatus === "COMPLETED";
  if (quickFilter === "CANCELLED") return job.status === "CANCELLED" || job.trackingStatus === "CANCELLED";
  if (quickFilter === "DISPUTED") return disputedJobIds.has(job.id);
  return true;
}
function matchesDisputeQuickFilter(dispute, quickFilter) {
  if (!quickFilter || quickFilter === "TOTAL") return true;
  if (quickFilter === "OPEN_ALL") return dispute.status === "OPEN" || dispute.status === "UNDER_REVIEW";
  if (quickFilter === "NEW") return dispute.status === "OPEN";
  if (quickFilter === "UNDER_REVIEW") return dispute.status === "UNDER_REVIEW";
  if (quickFilter === "WAITING_CUSTOMER" || quickFilter === "WAITING_PROVIDER") return false;
  if (quickFilter === "RESOLVED" || quickFilter === "CLOSED") return dispute.status === "RESOLVED";
  return true;
}
function getDisputeStatusVariant(status) {
  if (status === "OPEN") {
    return "destructive";
  }
  if (status === "UNDER_REVIEW") {
    return "secondary";
  }
  return "outline";
}
function getPaymentStatus(job) {
  if (job.trackingStatus === "COMPLETED" || job.status === "CLOSED") {
    return "PAID";
  }
  if (job.status === "CANCELLED" || job.trackingStatus === "CANCELLED") {
    return "REFUND_DUE";
  }
  return "PENDING";
}
function getJobStatusBadges(job) {
  if (job.status === "CLOSED" || job.trackingStatus === "COMPLETED") {
    return [{
      label: "Closed",
      variant: "outline"
    }];
  }
  if (job.status === "CANCELLED" || job.trackingStatus === "CANCELLED") {
    return [{
      label: "Cancelled",
      variant: "destructive"
    }];
  }
  if (job.status === "OPEN") {
    return [{
      label: "Open",
      variant: "default"
    }, {
      label: "Active",
      variant: "secondary"
    }];
  }
  if (job.trackingStatus) {
    return [{
      label: formatEnum(job.trackingStatus),
      variant: "secondary"
    }];
  }
  return [{
    label: formatEnum(job.status),
    variant: "outline"
  }];
}
function uniqueOptions(values) {
  return Array.from(new Set(values.filter(Boolean))).sort((a, b) => a.localeCompare(b));
}
function parseAttachmentJson(value) {
  if (!value) {
    return [];
  }
  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.filter((file) => file && typeof file === "object").map((file) => ({
      fileName: typeof file.fileName === "string" ? file.fileName : "Attachment",
      fileUrl: typeof file.fileUrl === "string" ? file.fileUrl : null,
      fileDataUrl: typeof file.fileDataUrl === "string" ? file.fileDataUrl : null,
      fileSize: typeof file.fileSize === "number" ? file.fileSize : null
    }));
  } catch {
    return [];
  }
}
export {
  JobManagement as component
};
