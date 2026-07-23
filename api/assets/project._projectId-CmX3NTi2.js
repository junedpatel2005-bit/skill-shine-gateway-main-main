import { jsx, jsxs } from "react/jsx-runtime";
import { useLoaderData, useParams, useRouter, Link } from "@tanstack/react-router";
import { useState } from "react";
import { A as AppShell, g as Badge, B as Button, h as formatApproximateLocation, a3 as deleteProject } from "./router-DyXkltGt.js";
import { Trash2, MessageSquare, AlertTriangle, Users, BriefcaseBusiness, Search, CalendarDays, Send, CheckCircle2, Timer, FileText, ReceiptText, Upload, MapPin } from "lucide-react";
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
function Project() {
  const { viewer, job, tracking } = useLoaderData({ from: "/project/$projectId" });
  const { projectId } = useParams({ from: "/project/$projectId" });
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  if (!job) {
    return /* @__PURE__ */ jsx("div", { className: "p-10 text-center", children: "Project not found." });
  }
  const activeJob = job;
  const displayName = viewer ? `${viewer.firstName} ${viewer.lastName}`.trim() : void 0;
  const projectNumber = projectId.replace(/^p-/i, "").toUpperCase() || String(job.id);
  const budgetLabel = formatBudget(job.budgetMin, job.budgetMax, job.timingType);
  const statusLabel = job.status === "OPEN" ? "Active" : formatEnum(job.status);
  const isDraft = job.status === "DRAFT";
  async function handleDeleteProject() {
    const confirmed = window.confirm(
      "Delete this project? Draft or untracked project data will be removed. Active and completed tracked projects stay in account history."
    );
    if (!confirmed) {
      return;
    }
    setIsDeleting(true);
    setDeleteError(null);
    try {
      await deleteProject({ data: { projectId: activeJob.id } });
      await router.navigate({ to: "/projects" });
    } catch (error) {
      setDeleteError(error instanceof Error ? error.message : "Could not delete project.");
    } finally {
      setIsDeleting(false);
    }
  }
  return /* @__PURE__ */ jsxs(AppShell, { userName: displayName, userRole: "Client", userAvatarUrl: viewer?.avatarUrl, children: [
    /* @__PURE__ */ jsx("div", { className: "mb-5", children: /* @__PURE__ */ jsx(Link, { to: "/dashboard", className: "text-sm text-primary hover:underline", children: "Back to dashboard" }) }),
    /* @__PURE__ */ jsxs("div", { className: "mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-end", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
          "Project #",
          projectNumber
        ] }),
        /* @__PURE__ */ jsx("h1", { className: "mt-1 text-2xl font-semibold tracking-tight", children: job.title }),
        /* @__PURE__ */ jsxs("div", { className: "mt-3 flex flex-wrap gap-2", children: [
          /* @__PURE__ */ jsx(Badge, { variant: "secondary", children: job.category }),
          /* @__PURE__ */ jsx(
            Badge,
            {
              variant: job.status === "OPEN" ? "default" : job.status === "DRAFT" ? "secondary" : "outline",
              children: statusLabel
            }
          ),
          /* @__PURE__ */ jsxs(Badge, { variant: job.urgency === "HIGH" ? "destructive" : "outline", children: [
            formatEnum(job.urgency),
            " urgency"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2", children: [
        /* @__PURE__ */ jsxs(Button, { variant: "outline", onClick: handleDeleteProject, disabled: isDeleting, children: [
          /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" }),
          isDeleting ? "Deleting" : "Delete project"
        ] }),
        /* @__PURE__ */ jsx(Button, { variant: "outline", asChild: true, children: /* @__PURE__ */ jsxs(Link, { to: "/messages", children: [
          /* @__PURE__ */ jsx(MessageSquare, { className: "h-4 w-4" }),
          "Messages"
        ] }) }),
        isDraft ? /* @__PURE__ */ jsx(Button, { asChild: true, children: /* @__PURE__ */ jsxs(Link, { to: "/post-job", search: { draftId: String(job.id) }, children: [
          /* @__PURE__ */ jsx(AlertTriangle, { className: "h-4 w-4" }),
          "Continue draft"
        ] }) }) : /* @__PURE__ */ jsx(Button, { asChild: true, children: /* @__PURE__ */ jsxs(Link, { to: "/discover", children: [
          /* @__PURE__ */ jsx(Users, { className: "h-4 w-4" }),
          "Hire professional"
        ] }) })
      ] })
    ] }),
    deleteError ? /* @__PURE__ */ jsx("p", { className: "-mt-3 mb-5 text-sm text-destructive", children: deleteError }) : null,
    isDraft ? /* @__PURE__ */ jsx("div", { className: "mb-6 rounded-xl border border-warning/30 bg-warning/10 p-5 text-warning-foreground shadow-soft", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsx("div", { className: "grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-warning/20", children: /* @__PURE__ */ jsx(AlertTriangle, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "font-semibold", children: "Project is incomplete" }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm", children: "This project is still saved as a draft. Complete the missing details and post it before professionals can see it or send requests." })
        ] })
      ] }),
      /* @__PURE__ */ jsx(Button, { asChild: true, className: "shrink-0", children: /* @__PURE__ */ jsx(Link, { to: "/post-job", search: { draftId: String(job.id) }, children: "Continue draft" }) })
    ] }) }) : null,
    /* @__PURE__ */ jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: [
      { label: "Budget", value: budgetLabel, icon: BriefcaseBusiness },
      { label: "Work mode", value: formatWorkMode(job.workMode), icon: Search },
      { label: "Deadline", value: formatDate(job.deadline), icon: CalendarDays },
      {
        label: "Tracking",
        value: isDraft ? "Incomplete" : tracking ? "Active" : "Ready",
        icon: Send
      }
    ].map((item) => /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-border bg-card p-5 shadow-soft", children: [
      /* @__PURE__ */ jsx(item.icon, { className: "h-5 w-5 text-primary" }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-xl font-semibold", children: item.value }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: item.label })
    ] }, item.label)) }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 grid gap-6 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-6 lg:col-span-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-border bg-card p-6 shadow-soft", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold", children: "Project details" }),
          /* @__PURE__ */ jsx("p", { className: "mt-4 whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground", children: job.description })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-border bg-card p-6 shadow-soft", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-between gap-3 sm:flex-row sm:items-center", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold", children: tracking ? "Tracking overview" : "Hire and work requests" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: tracking ? "Live status and activity pulled from the project tracking records in the database." : "Use this project as the source when you contact professionals or start a direct hire." })
            ] }),
            isDraft ? /* @__PURE__ */ jsx(Button, { asChild: true, children: /* @__PURE__ */ jsxs(Link, { to: "/post-job", search: { draftId: String(job.id) }, children: [
              /* @__PURE__ */ jsx(AlertTriangle, { className: "h-4 w-4" }),
              "Continue draft"
            ] }) }) : tracking ? /* @__PURE__ */ jsx(Button, { asChild: true, children: /* @__PURE__ */ jsxs(Link, { to: "/project-track/$trackingId", params: { trackingId: String(tracking.id) }, children: [
              /* @__PURE__ */ jsx(Search, { className: "h-4 w-4" }),
              "Open tracking"
            ] }) }) : /* @__PURE__ */ jsx(Button, { asChild: true, children: /* @__PURE__ */ jsxs(Link, { to: "/discover", children: [
              /* @__PURE__ */ jsx(Search, { className: "h-4 w-4" }),
              "Find pros"
            ] }) })
          ] }),
          tracking ? /* @__PURE__ */ jsxs("div", { className: "mt-5 space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
              /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-border p-4", children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Tracking status" }),
                /* @__PURE__ */ jsxs("div", { className: "mt-2 flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx(Badge, { children: formatEnum(tracking.status) }),
                  /* @__PURE__ */ jsxs("span", { className: "text-sm text-muted-foreground", children: [
                    "accepted ",
                    formatDate(tracking.acceptedAt)
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-border p-4", children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Professional" }),
                /* @__PURE__ */ jsx("p", { className: "mt-2 font-medium", children: tracking.professionalName }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: tracking.professionalCategory || "Professional" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid gap-4 md:grid-cols-3", children: [
              /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-border p-4", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-primary", children: [
                  /* @__PURE__ */ jsx(CheckCircle2, { className: "h-4 w-4" }),
                  /* @__PURE__ */ jsx("p", { className: "font-semibold", children: "Milestones" })
                ] }),
                /* @__PURE__ */ jsxs("p", { className: "mt-3 text-2xl font-semibold", children: [
                  tracking.milestones.filter((milestone) => milestone.status === "PAID").length,
                  "/",
                  tracking.milestones.length
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Completed from the database" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-border p-4", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-primary", children: [
                  /* @__PURE__ */ jsx(Timer, { className: "h-4 w-4" }),
                  /* @__PURE__ */ jsx("p", { className: "font-semibold", children: "Work updates" })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "mt-3 text-2xl font-semibold", children: tracking.workUploads.length }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Uploaded work entries" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-border p-4", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-primary", children: [
                  /* @__PURE__ */ jsx(FileText, { className: "h-4 w-4" }),
                  /* @__PURE__ */ jsx("p", { className: "font-semibold", children: "Revision requests" })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "mt-3 text-2xl font-semibold", children: tracking.revisionRequests.filter((item) => item.status === "REQUESTED").length }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Pending review items" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
              /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-border p-4", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-primary", children: [
                  /* @__PURE__ */ jsx(ReceiptText, { className: "h-4 w-4" }),
                  /* @__PURE__ */ jsx("p", { className: "font-semibold", children: "Completion requests" })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "mt-3 text-2xl font-semibold", children: tracking.completionRequests.length }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Saved approval requests" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-border p-4", children: [
                /* @__PURE__ */ jsx("p", { className: "font-semibold", children: "Latest tracking update" }),
                /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: tracking.workUploads.length > 0 ? `${tracking.workUploads[tracking.workUploads.length - 1].title} • ${formatDate(tracking.workUploads[tracking.workUploads.length - 1].createdAt)}` : tracking.revisionRequests.length > 0 ? `${tracking.revisionRequests[tracking.revisionRequests.length - 1].note} • ${formatDate(tracking.revisionRequests[tracking.revisionRequests.length - 1].createdAt)}` : `Tracking started on ${formatDate(tracking.acceptedAt)}` })
              ] })
            ] })
          ] }) : isDraft ? /* @__PURE__ */ jsxs("div", { className: "mt-5 rounded-lg border border-dashed border-warning/40 bg-warning/5 p-5", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-semibold text-warning-foreground", children: "Finish this draft first" }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Once the project is posted, you can request work, hire professionals, and begin tracking progress from here." }),
            /* @__PURE__ */ jsx(Button, { className: "mt-4", asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "/post-job", search: { draftId: String(job.id) }, children: "Continue draft" }) })
          ] }) : /* @__PURE__ */ jsxs("div", { className: "mt-5 grid gap-4 md:grid-cols-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-border p-4", children: [
              /* @__PURE__ */ jsx("h3", { className: "font-semibold", children: "Request work from this project" }),
              /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Share the project scope with a professional, discuss availability, and move into messages." }),
              /* @__PURE__ */ jsx(Button, { className: "mt-4 w-full", variant: "outline", asChild: true, children: /* @__PURE__ */ jsxs(Link, { to: "/discover", children: [
                /* @__PURE__ */ jsx(Send, { className: "h-4 w-4" }),
                "Request work"
              ] }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-border p-4", children: [
              /* @__PURE__ */ jsx("h3", { className: "font-semibold", children: "Create a hire request" }),
              /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Choose a professional from Discover, then send a hire request with the title, budget, files, and dates." }),
              /* @__PURE__ */ jsx(Button, { className: "mt-4 w-full", asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "/discover", children: "Hire from project" }) })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-border bg-card p-6 shadow-soft", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-semibold", children: "Project summary" }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 space-y-3 text-sm", children: [
            /* @__PURE__ */ jsxs("p", { children: [
              /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Category:" }),
              " ",
              job.category
            ] }),
            /* @__PURE__ */ jsxs("p", { children: [
              /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Posted:" }),
              " ",
              formatDate(job.createdAt)
            ] }),
            /* @__PURE__ */ jsxs("p", { children: [
              /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Job date:" }),
              " ",
              job.jobDate ? formatDate(job.jobDate) : "Not set"
            ] }),
            /* @__PURE__ */ jsxs("p", { children: [
              /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Status:" }),
              " ",
              statusLabel
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-border bg-card p-6 shadow-soft", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-semibold", children: "Attached files" }),
          job.attachments.length > 0 ? /* @__PURE__ */ jsx("ul", { className: "mt-4 space-y-3 text-sm", children: job.attachments.map((file) => /* @__PURE__ */ jsxs(
            "li",
            {
              className: "flex items-center gap-3 rounded-lg border border-border p-3",
              children: [
                /* @__PURE__ */ jsx(FileText, { className: "h-4 w-4 text-muted-foreground" }),
                /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
                  /* @__PURE__ */ jsx("p", { className: "truncate text-sm", children: file.fileName }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: formatFileSize(file.fileSize) })
                ] })
              ]
            },
            file.id
          )) }) : /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm text-muted-foreground", children: "No files attached yet." }),
          /* @__PURE__ */ jsxs(Button, { variant: "outline", size: "sm", className: "mt-4 w-full gap-2", children: [
            /* @__PURE__ */ jsx(Upload, { className: "h-4 w-4" }),
            "Upload file"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-border bg-card p-6 shadow-soft", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-semibold", children: "Location" }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 space-y-3 text-sm", children: [
            job.locationLabel ? /* @__PURE__ */ jsx("p", { children: formatApproximateLocation(job.locationLabel) }) : null,
            job.locationAddress ? /* @__PURE__ */ jsxs("p", { className: "flex gap-2 text-muted-foreground", children: [
              /* @__PURE__ */ jsx(MapPin, { className: "mt-0.5 h-4 w-4 shrink-0" }),
              formatApproximateLocation(job.locationAddress)
            ] }) : /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Remote or no location specified." })
          ] })
        ] })
      ] })
    ] })
  ] });
}
function formatEnum(value) {
  return value.toLowerCase().split("_").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
}
function formatWorkMode(value) {
  return value === "ON_SITE" ? "On-site" : formatEnum(value);
}
function formatDate(value) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(value));
}
function formatBudget(min, max, timingType = "FIXED") {
  const suffix = getBudgetSuffix(timingType);
  if (min && max) {
    return `$${min.toLocaleString()} - $${max.toLocaleString()}${suffix}`;
  }
  if (max) {
    return `Up to $${max.toLocaleString()}${suffix}`;
  }
  if (min) {
    return `From $${min.toLocaleString()}${suffix}`;
  }
  return "Not set";
}
function getBudgetSuffix(timingType) {
  if (timingType === "HOURLY") {
    return " / hour";
  }
  if (timingType === "WEEKLY") {
    return " / week";
  }
  return "";
}
function formatFileSize(size) {
  if (!size) {
    return "Unknown size";
  }
  if (size < 1024 * 1024) {
    return `${Math.round(size / 1024)} KB`;
  }
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}
const SplitComponent = Project;
export {
  SplitComponent as component
};
