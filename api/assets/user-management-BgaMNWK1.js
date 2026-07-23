import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { c as cn, B as Button, A as AppShell, k as AdminPageHeader, o as AdminSummaryCard, m as AdminSection, I as Input, n as AdminEmptyState, g as Badge, a2 as Switch, D as Dialog, a as DialogContent, b as DialogHeader, d as DialogTitle, v as formatEnum, w as formatDateTime, p as formatMoney, x as formatDate, j as createSsrRpc } from "./router-DyXkltGt.js";
import { c as createServerFn } from "./server-KxTtotOh.js";
import { useLoaderData, useRouter, Link } from "@tanstack/react-router";
import * as React from "react";
import { useState } from "react";
import { ShieldCheck, Users, BriefcaseBusiness, BadgeCheck, UserRound, Search, Mail, Phone, CalendarDays, Clock3, FolderKanban, Banknote, KeyRound, Wallet, Building2, MapPin, Star } from "lucide-react";
import { R as ReportExportActions } from "./ReportExportActions-BT5_v9ec.js";
import * as TabsPrimitive from "@radix-ui/react-tabs";
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
const Tabs = TabsPrimitive.Root;
const TabsList = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.List,
  {
    ref,
    className: cn(
      "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      className
    ),
    ...props
  }
));
TabsList.displayName = TabsPrimitive.List.displayName;
const TabsTrigger = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.Trigger,
  {
    ref,
    className: cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      className
    ),
    ...props
  }
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;
const TabsContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.Content,
  {
    ref,
    className: cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    ),
    ...props
  }
));
TabsContent.displayName = TabsPrimitive.Content.displayName;
const updateManagedUserStatus = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(createSsrRpc("d21ae227bec96e0c5dcf4b0e8804f1ee297797d383b41ca8942fdff33d67acc2"));
const updateManagedProfessionalVerification = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(createSsrRpc("243f2490899071e8ebf4a541df3ecb0b948f66d0efca85f53fb18a6ad2f99af7"));
const updateManagedUserPassword = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(createSsrRpc("e1a8f00cb9eb520da7092dad35237298bc912e8c6d9f496b539773de95a86dcd"));
function UserManagement() {
  const data = useLoaderData({
    from: "/user-management"
  });
  const router = useRouter();
  const [clientQuery, setClientQuery] = useState("");
  const [professionalQuery, setProfessionalQuery] = useState("");
  const [pendingAction, setPendingAction] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [summaryFilter, setSummaryFilter] = useState(null);
  if (!data.viewer || data.viewer.role !== "ADMIN") {
    return /* @__PURE__ */ jsx("div", { className: "grid min-h-screen place-items-center bg-muted/30 px-4", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-sm rounded-2xl border border-border bg-card p-8 text-center shadow-lg", children: [
      /* @__PURE__ */ jsx(ShieldCheck, { className: "mx-auto h-8 w-8 text-primary" }),
      /* @__PURE__ */ jsx("h1", { className: "mt-6 text-xl font-bold", children: "Admin access required" }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Sign in from the admin panel to manage clients and professionals." }),
      /* @__PURE__ */ jsx(Button, { asChild: true, className: "mt-8 w-full", children: /* @__PURE__ */ jsx(Link, { to: "/admin", children: "Open admin panel" }) })
    ] }) });
  }
  const users = data.users;
  const clients = users.filter((user) => user.role === "CLIENT");
  const professionals = users.filter((user) => user.role === "PROFESSIONAL");
  const visibleClients = filterUsers(summaryFilter === "inactive" ? clients.filter((user) => !user.isActive) : clients, clientQuery);
  const visibleProfessionals = filterUsers(summaryFilter === "verified" ? professionals.filter((user) => user.isVerified) : summaryFilter === "inactive" ? professionals.filter((user) => !user.isActive) : professionals, professionalQuery);
  const displayName = `${data.viewer.firstName} ${data.viewer.lastName}`.trim() || data.viewer.email;
  const selectedUser = users.find((user) => user.id === selectedUserId) || null;
  const selectedUserDetail = selectedUserId ? data.userDetails?.[selectedUserId] : void 0;
  async function handleStatusChange(user, isActive) {
    const actionKey = `status-${user.id}`;
    setPendingAction(actionKey);
    try {
      await updateManagedUserStatus({
        data: {
          userId: user.id,
          isActive
        }
      });
      await router.invalidate();
    } finally {
      setPendingAction(null);
    }
  }
  async function handleVerificationChange(user, isVerified) {
    const actionKey = `verified-${user.id}`;
    setPendingAction(actionKey);
    try {
      await updateManagedProfessionalVerification({
        data: {
          userId: user.id,
          isVerified
        }
      });
      await router.invalidate();
    } finally {
      setPendingAction(null);
    }
  }
  async function handlePasswordChange(user, password) {
    const actionKey = `password-${user.id}`;
    setPendingAction(actionKey);
    try {
      await updateManagedUserPassword({
        data: {
          userId: user.id,
          password
        }
      });
      await router.invalidate();
    } finally {
      setPendingAction(null);
    }
  }
  return /* @__PURE__ */ jsxs(AppShell, { userName: displayName, userRole: "Admin", userAvatarUrl: data.viewer.avatarUrl, children: [
    /* @__PURE__ */ jsx(AdminPageHeader, { title: "Users Management", description: "Manage account status, professional verification, and profile readiness.", breadcrumbs: [{
      label: "User Management"
    }], actions: /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(ReportExportActions, { table: "User", reportName: "User management export", variant: "outline" }),
      /* @__PURE__ */ jsx(Button, { asChild: true, variant: "outline", children: /* @__PURE__ */ jsx(Link, { to: "/admin", children: "Back to admin" }) })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: [
      /* @__PURE__ */ jsx(AdminSummaryCard, { icon: Users, label: "Clients", value: clients.length, caption: `${activeCount(clients)} active`, active: summaryFilter === "clients", onClick: () => setSummaryFilter(summaryFilter === "clients" ? null : "clients") }),
      /* @__PURE__ */ jsx(AdminSummaryCard, { icon: BriefcaseBusiness, label: "Professionals", value: professionals.length, caption: `${activeCount(professionals)} active`, active: summaryFilter === "professionals", onClick: () => setSummaryFilter(summaryFilter === "professionals" ? null : "professionals") }),
      /* @__PURE__ */ jsx(AdminSummaryCard, { icon: BadgeCheck, label: "Verified Pros", value: professionals.filter((user) => user.isVerified).length, caption: "Approved providers", active: summaryFilter === "verified", variant: "success", onClick: () => setSummaryFilter(summaryFilter === "verified" ? null : "verified") }),
      /* @__PURE__ */ jsx(AdminSummaryCard, { icon: UserRound, label: "Inactive Users", value: users.filter((user) => !user.isActive).length, caption: "Need attention", active: summaryFilter === "inactive", variant: "destructive", onClick: () => setSummaryFilter(summaryFilter === "inactive" ? null : "inactive") })
    ] }),
    summaryFilter ? /* @__PURE__ */ jsxs("div", { className: "mt-6 flex items-center justify-between rounded-2xl border border-primary/20 bg-primary/5 px-6 py-4 text-sm shadow-sm animate-in slide-in-from-top-2 duration-300", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(ShieldCheck, { className: "h-4 w-4 text-primary" }),
        /* @__PURE__ */ jsxs("span", { className: "font-bold text-primary", children: [
          "FILTER ACTIVE:",
          " ",
          /* @__PURE__ */ jsx("span", { className: "uppercase text-primary/70", children: summaryFilter === "verified" ? "Verified professionals" : summaryFilter === "inactive" ? "Inactive users" : summaryFilter })
        ] })
      ] }),
      /* @__PURE__ */ jsx(Button, { type: "button", size: "sm", variant: "outline", className: "rounded-xl font-bold uppercase tracking-widest text-[10px]", onClick: () => setSummaryFilter(null), children: "Clear Filter" })
    ] }) : null,
    /* @__PURE__ */ jsxs("div", { className: "mt-8 grid gap-8 xl:grid-cols-2", children: [
      summaryFilter !== "professionals" && summaryFilter !== "verified" ? /* @__PURE__ */ jsx(AdminSection, { title: "Clients", description: "People or companies posting jobs and hiring professionals.", icon: Users, actions: /* @__PURE__ */ jsxs("div", { className: "relative w-full sm:w-64", children: [
        /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
        /* @__PURE__ */ jsx(Input, { value: clientQuery, onChange: (event) => setClientQuery(event.target.value), placeholder: "Search clients...", className: "pl-9 h-10 rounded-xl" })
      ] }), children: /* @__PURE__ */ jsx(UserList, { users: visibleClients, pendingAction, onStatusChange: handleStatusChange, onUserSelect: setSelectedUserId, title: "Clients" }) }) : null,
      summaryFilter !== "clients" ? /* @__PURE__ */ jsx(AdminSection, { title: "Professionals", description: "Service providers, verification, rates, and availability.", icon: BriefcaseBusiness, actions: /* @__PURE__ */ jsxs("div", { className: "relative w-full sm:w-64", children: [
        /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
        /* @__PURE__ */ jsx(Input, { value: professionalQuery, onChange: (event) => setProfessionalQuery(event.target.value), placeholder: "Search professionals...", className: "pl-9 h-10 rounded-xl" })
      ] }), children: /* @__PURE__ */ jsx(UserList, { users: visibleProfessionals, pendingAction, onStatusChange: handleStatusChange, onVerificationChange: handleVerificationChange, onUserSelect: setSelectedUserId, title: "Professionals" }) }) : null
    ] }),
    /* @__PURE__ */ jsx(UserDetailDialog, { user: selectedUser, detail: selectedUserDetail, open: selectedUser !== null, pendingAction, onStatusChange: handleStatusChange, onPasswordChange: handlePasswordChange, onOpenChange: (open) => {
      if (!open) setSelectedUserId(null);
    } }, selectedUser?.id || "closed")
  ] });
}
function UserList({
  users,
  pendingAction,
  onStatusChange,
  onVerificationChange,
  onUserSelect,
  title
}) {
  const isProfessionals = title === "Professionals";
  if (!users.length) {
    return /* @__PURE__ */ jsx(AdminEmptyState, { title: `No ${title.toLowerCase()} found`, description: `Try a different name or email search for your ${title.toLowerCase()}.` });
  }
  return /* @__PURE__ */ jsx("div", { className: "divide-y divide-border", children: users.map((user) => {
    const fullName = getFullName(user);
    const statusKey = `status-${user.id}`;
    const verifiedKey = `verified-${user.id}`;
    return /* @__PURE__ */ jsx("article", { className: "group cursor-pointer p-6 transition-all hover:bg-muted/50", onClick: () => onUserSelect(user.id), onKeyDown: (event) => {
      if (event.key === "Enter" || event.key === " ") onUserSelect(user.id);
    }, role: "button", tabIndex: 0, "aria-label": `View full details for ${fullName}`, children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex min-w-0 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative shrink-0", children: [
          /* @__PURE__ */ jsx("img", { src: user.avatarUrl || `https://i.pravatar.cc/100?u=${user.id}`, className: "h-14 w-14 rounded-2xl object-cover ring-2 ring-background shadow-sm", alt: "" }),
          /* @__PURE__ */ jsx("div", { className: cn("absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-background shadow-sm", user.isActive ? "bg-emerald-500" : "bg-slate-300") })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
            /* @__PURE__ */ jsx("h3", { className: "truncate text-lg font-bold text-foreground group-hover:text-primary transition-colors", children: fullName }),
            /* @__PURE__ */ jsx(Badge, { variant: user.isActive ? "default" : "outline", className: "rounded-lg", children: user.isActive ? "Active" : "Inactive" }),
            isProfessionals ? /* @__PURE__ */ jsx(Badge, { variant: user.isVerified ? "default" : "secondary", className: "rounded-lg", children: user.isVerified ? "Verified" : "Pending" }) : null
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-2 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-muted-foreground font-medium", children: [
            /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Mail, { className: "h-3.5 w-3.5 text-primary/60" }),
              user.email
            ] }),
            user.phone ? /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Phone, { className: "h-3.5 w-3.5 text-primary/60" }),
              user.phone
            ] }) : null
          ] }),
          /* @__PURE__ */ jsx(UserDetails, { user })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex shrink-0 flex-col gap-4 rounded-2xl border border-border bg-background p-5 shadow-sm sm:w-60", onClick: (event) => event.stopPropagation(), onKeyDown: (event) => event.stopPropagation(), children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3 text-sm", children: [
          /* @__PURE__ */ jsx("span", { className: "font-bold text-foreground uppercase tracking-wider text-[11px]", children: "Account Access" }),
          /* @__PURE__ */ jsx(Switch, { checked: user.isActive, disabled: pendingAction !== null, onCheckedChange: (checked) => onStatusChange(user, checked), "aria-label": `${user.isActive ? "Deactivate" : "Activate"} ${fullName}` })
        ] }),
        pendingAction === statusKey && /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold text-primary animate-pulse uppercase tracking-widest", children: "Saving status..." }),
        isProfessionals && onVerificationChange && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs("div", { className: "border-t border-border pt-4 flex items-center justify-between gap-3 text-sm", children: [
            /* @__PURE__ */ jsx("span", { className: "font-bold text-foreground uppercase tracking-wider text-[11px]", children: "Verification" }),
            /* @__PURE__ */ jsx(Switch, { checked: user.isVerified, disabled: pendingAction !== null, onCheckedChange: (checked) => onVerificationChange(user, checked), "aria-label": `${user.isVerified ? "Unverify" : "Verify"} ${fullName}` })
          ] }),
          pendingAction === verifiedKey && /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold text-primary animate-pulse uppercase tracking-widest", children: "Saving verification..." })
        ] })
      ] })
    ] }) }, user.id);
  }) });
}
function UserDetailDialog({
  user,
  detail,
  open,
  pendingAction,
  onStatusChange,
  onPasswordChange,
  onOpenChange
}) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState(null);
  if (!user) return null;
  const activeUser = user;
  const fullName = getFullName(user);
  const isProfessional = user.role === "PROFESSIONAL";
  const passwordPending = pendingAction === `password-${user.id}`;
  async function submitPasswordChange(event) {
    event.preventDefault();
    setPasswordMessage(null);
    const passwordError = validatePassword(newPassword);
    if (passwordError) {
      setPasswordMessage({
        type: "error",
        text: passwordError
      });
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordMessage({
        type: "error",
        text: "Password confirmation does not match."
      });
      return;
    }
    try {
      await onPasswordChange(activeUser, newPassword);
      setNewPassword("");
      setConfirmPassword("");
      setPasswordMessage({
        type: "success",
        text: "Password changed successfully."
      });
    } catch (error) {
      setPasswordMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Password could not be changed."
      });
    }
  }
  return /* @__PURE__ */ jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxs(DialogContent, { className: "max-h-[90vh] max-w-5xl overflow-y-auto p-0 rounded-3xl border-none shadow-2xl overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "border-b border-border bg-muted/20 p-8", children: /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-center sm:items-start gap-6", children: [
      /* @__PURE__ */ jsx("img", { src: user.avatarUrl || `https://i.pravatar.cc/100?u=${user.id}`, className: "h-24 w-24 rounded-3xl object-cover ring-4 ring-background shadow-lg", alt: "" }),
      /* @__PURE__ */ jsxs("div", { className: "min-w-0 text-center sm:text-left", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-center sm:justify-start gap-3", children: [
          /* @__PURE__ */ jsx(DialogTitle, { className: "text-3xl font-bold tracking-tight", children: fullName }),
          /* @__PURE__ */ jsx(Badge, { className: "rounded-lg px-3 py-1 font-bold uppercase tracking-widest text-[10px]", children: formatEnum(user.role) }),
          /* @__PURE__ */ jsx(Badge, { variant: user.isActive ? "default" : "outline", className: "rounded-lg px-3 py-1 font-bold uppercase tracking-widest text-[10px]", children: user.isActive ? "Active" : "Inactive" }),
          isProfessional ? /* @__PURE__ */ jsx(Badge, { variant: user.isVerified ? "default" : "secondary", className: "rounded-lg px-3 py-1 font-bold uppercase tracking-widest text-[10px]", children: user.isVerified ? "Verified" : "Pending Review" }) : null
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-3 flex flex-wrap justify-center sm:justify-start gap-x-6 gap-y-2 text-base font-medium text-muted-foreground", children: [
          /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Mail, { className: "h-4 w-4 text-primary" }),
            user.email
          ] }),
          user.phone ? /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Phone, { className: "h-4 w-4 text-primary" }),
            user.phone
          ] }) : null
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxs("div", { className: "p-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: [
        /* @__PURE__ */ jsx(DetailStat, { icon: CalendarDays, label: "Account created", value: formatDateTime(user.createdAt) }),
        /* @__PURE__ */ jsx(DetailStat, { icon: Clock3, label: "Last login", value: user.lastLoginAt ? formatDateTime(user.lastLoginAt) : "Not recorded yet" }),
        /* @__PURE__ */ jsx(DetailStat, { icon: FolderKanban, label: "Projects", value: `${detail?.projectCount || 0} total` }),
        /* @__PURE__ */ jsx(DetailStat, { icon: Banknote, label: isProfessional ? "Gross earned" : "Total paid", value: formatMoney(detail?.totalMoney || 0) })
      ] }),
      /* @__PURE__ */ jsxs(Tabs, { defaultValue: "overview", className: "mt-10", children: [
        /* @__PURE__ */ jsxs(TabsList, { className: "grid w-full grid-cols-3 h-14 rounded-2xl bg-muted p-1 shadow-inner", children: [
          /* @__PURE__ */ jsx(TabsTrigger, { value: "overview", className: "rounded-xl font-bold text-sm data-[state=active]:shadow-md", children: "Overview" }),
          /* @__PURE__ */ jsxs(TabsTrigger, { value: "projects", className: "rounded-xl font-bold text-sm data-[state=active]:shadow-md", children: [
            "Projects (",
            detail?.projectCount || 0,
            ")"
          ] }),
          /* @__PURE__ */ jsxs(TabsTrigger, { value: "payments", className: "rounded-xl font-bold text-sm data-[state=active]:shadow-md", children: [
            "Payments (",
            detail?.transactions.length || 0,
            ")"
          ] })
        ] }),
        /* @__PURE__ */ jsx(TabsContent, { value: "overview", className: "mt-8", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-6 md:grid-cols-2", children: [
          /* @__PURE__ */ jsxs(DetailPanel, { title: "Account Information", children: [
            /* @__PURE__ */ jsx(InfoRow, { label: "Account ID", value: `#${user.id}` }),
            /* @__PURE__ */ jsx(InfoRow, { label: "Sign-in method", value: formatSignInMethod(user) }),
            /* @__PURE__ */ jsx(InfoRow, { label: "Account access", value: user.isActive ? "Allowed" : "Blocked" }),
            /* @__PURE__ */ jsx(InfoRow, { label: "Created", value: formatDateTime(user.createdAt) }),
            /* @__PURE__ */ jsx(InfoRow, { label: "Last updated", value: formatDateTime(user.updatedAt) })
          ] }),
          /* @__PURE__ */ jsx(DetailPanel, { title: isProfessional ? "Professional Profile" : "Client Profile", children: isProfessional ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(InfoRow, { label: "Category", value: user.professionalCategory || "Not set" }),
            /* @__PURE__ */ jsx(InfoRow, { label: "City", value: user.professionalCity || "Not set" }),
            /* @__PURE__ */ jsx(InfoRow, { label: "Experience", value: user.experienceYears ? `${user.experienceYears} years` : "Not set" }),
            /* @__PURE__ */ jsx(InfoRow, { label: "Rate", value: formatProfessionalRate(user) }),
            /* @__PURE__ */ jsx(InfoRow, { label: "Availability", value: formatEnum(user.availabilityStatus || "available") })
          ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(InfoRow, { label: "Company", value: user.companyName || "Not set" }),
            /* @__PURE__ */ jsx(InfoRow, { label: "Industry", value: user.industry || "Not set" }),
            /* @__PURE__ */ jsx(InfoRow, { label: "Projects posted", value: String(detail?.projectCount || 0) })
          ] }) }),
          /* @__PURE__ */ jsxs(DetailPanel, { title: "Project Status", children: [
            /* @__PURE__ */ jsx(InfoRow, { label: "Active", value: String(detail?.activeProjectCount || 0) }),
            /* @__PURE__ */ jsx(InfoRow, { label: "Completed", value: String(detail?.completedProjectCount || 0) }),
            /* @__PURE__ */ jsx(InfoRow, { label: "Other / unassigned", value: String(Math.max(0, (detail?.projectCount || 0) - (detail?.activeProjectCount || 0) - (detail?.completedProjectCount || 0))) })
          ] }),
          /* @__PURE__ */ jsxs(DetailPanel, { title: "Money Summary", children: [
            /* @__PURE__ */ jsx(InfoRow, { label: isProfessional ? "Gross earnings" : "Completed payments", value: formatMoney(detail?.totalMoney || 0) }),
            isProfessional ? /* @__PURE__ */ jsx(InfoRow, { label: "Estimated net after 10% fee", value: formatMoney((detail?.totalMoney || 0) * 0.9) }) : null,
            /* @__PURE__ */ jsx(InfoRow, { label: "Transactions", value: String(detail?.transactions.length || 0) })
          ] }),
          /* @__PURE__ */ jsxs(DetailPanel, { title: "Security \\u0026 Access Control", className: "md:col-span-2 bg-primary/[0.02]", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl border border-primary/20 bg-primary/5 p-6 shadow-sm", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("p", { className: "text-lg font-bold text-primary flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx(ShieldCheck, { className: "h-5 w-5" }),
                  "Account Active Status"
                ] }),
                /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-primary/70 font-medium", children: user.isActive ? "User has full access to the platform." : "User is currently blocked from signing in." })
              ] }),
              /* @__PURE__ */ jsx(Switch, { checked: user.isActive, disabled: pendingAction !== null, onCheckedChange: (checked) => void onStatusChange(user, checked), className: "data-[state=checked]:bg-primary", "aria-label": `${user.isActive ? "Deactivate" : "Activate"} ${fullName}` })
            ] }),
            /* @__PURE__ */ jsxs("form", { className: "mt-8 space-y-5 border-t border-border pt-8", onSubmit: submitPasswordChange, children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsx("div", { className: "grid h-8 w-8 place-items-center rounded-lg bg-amber-100 text-amber-700", children: /* @__PURE__ */ jsx(KeyRound, { className: "h-4 w-4" }) }),
                /* @__PURE__ */ jsx("p", { className: "text-lg font-bold text-foreground", children: "Reset User Password" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-xs font-bold uppercase tracking-widest text-muted-foreground", children: "New Password" }),
                  /* @__PURE__ */ jsx(Input, { type: "password", value: newPassword, onChange: (event) => setNewPassword(event.target.value), placeholder: "••••••••", className: "h-12 rounded-xl", autoComplete: "new-password", disabled: passwordPending })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-xs font-bold uppercase tracking-widest text-muted-foreground", children: "Confirm Password" }),
                  /* @__PURE__ */ jsx(Input, { type: "password", value: confirmPassword, onChange: (event) => setConfirmPassword(event.target.value), placeholder: "••••••••", className: "h-12 rounded-xl", autoComplete: "new-password", disabled: passwordPending })
                ] })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground font-medium italic", children: "Security tip: Use 8+ characters with mixed case, numbers, and symbols." }),
              passwordMessage && /* @__PURE__ */ jsxs("div", { className: cn("rounded-xl p-4 text-sm font-bold flex items-center gap-2 animate-in fade-in duration-300", passwordMessage.type === "error" ? "bg-rose-50 text-rose-700 border border-rose-200" : "bg-emerald-50 text-emerald-700 border border-emerald-200"), children: [
                passwordMessage.type === "error" ? /* @__PURE__ */ jsx(ShieldCheck, { className: "h-4 w-4 text-rose-600" }) : /* @__PURE__ */ jsx(ShieldCheck, { className: "h-4 w-4" }),
                passwordMessage.text
              ] }),
              /* @__PURE__ */ jsx(Button, { type: "submit", size: "lg", className: "h-12 px-8 rounded-xl font-bold", disabled: passwordPending || !newPassword || !confirmPassword, children: passwordPending ? "UPDATING PASSWORD..." : user.hasPassword ? "UPDATE USER PASSWORD" : "SET INITIAL PASSWORD" })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(TabsContent, { value: "projects", className: "mt-8", children: /* @__PURE__ */ jsx("div", { className: "grid gap-4", children: detail?.projects.length ? detail.projects.map((project) => /* @__PURE__ */ jsxs("div", { className: "group rounded-2xl border border-border p-5 hover:border-primary/30 transition-all hover:bg-muted/30", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-start justify-between gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsx("p", { className: "text-lg font-bold text-foreground group-hover:text-primary transition-colors", children: project.title }),
              /* @__PURE__ */ jsxs("div", { className: "mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground font-medium", children: [
                /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsx(FolderKanban, { className: "h-3.5 w-3.5" }),
                  project.category
                ] }),
                /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsx(CalendarDays, { className: "h-3.5 w-3.5" }),
                  formatDate(project.createdAt)
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "rounded-lg px-3 py-1 font-bold uppercase tracking-widest text-[10px]", children: formatEnum(project.trackingStatus || project.status) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-5 grid gap-4 sm:grid-cols-2 rounded-xl bg-background p-4 border border-border/50", children: [
            /* @__PURE__ */ jsx(InfoRow, { label: isProfessional ? "Client Account" : "Hired Professional", value: project.counterpartName || "Not assigned" }),
            /* @__PURE__ */ jsx(InfoRow, { label: "Agreed Budget", value: project.agreedAmount ? formatMoney(project.agreedAmount) : "Not set" })
          ] })
        ] }, project.id)) : /* @__PURE__ */ jsx(EmptyState, { message: "No projects are connected to this user yet." }) }) }),
        /* @__PURE__ */ jsx(TabsContent, { value: "payments", className: "mt-8", children: /* @__PURE__ */ jsx("div", { className: "grid gap-4", children: detail?.transactions.length ? detail.transactions.map((transaction) => /* @__PURE__ */ jsxs("div", { className: "group flex flex-col justify-between gap-4 rounded-2xl border border-border p-6 sm:flex-row sm:items-center hover:border-emerald-200 hover:bg-emerald-50/30 transition-all", children: [
          /* @__PURE__ */ jsx("div", { className: "min-w-0", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("div", { className: "grid h-10 w-10 place-items-center rounded-xl bg-emerald-100 text-emerald-700", children: /* @__PURE__ */ jsx(Wallet, { className: "h-5 w-5" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "font-bold text-foreground group-hover:text-emerald-700 transition-colors", children: transaction.projectTitle }),
              /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground font-medium mt-0.5", children: [
                isProfessional ? "From Client" : "To Professional",
                ":",
                " ",
                /* @__PURE__ */ jsx("span", { className: "text-foreground", children: transaction.counterpartName }),
                " · ",
                formatDateTime(transaction.createdAt)
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "text-left sm:text-right shrink-0", children: [
            /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold tracking-tight text-foreground", children: formatMoney(transaction.amount, transaction.currency) }),
            /* @__PURE__ */ jsx(Badge, { variant: transaction.status === "COMPLETED" ? "default" : "outline", className: "mt-1 rounded-lg uppercase tracking-widest text-[9px] px-2", children: formatEnum(transaction.status) })
          ] })
        ] }, transaction.id)) : /* @__PURE__ */ jsx(EmptyState, { message: "No payment transactions are recorded for this user." }) }) })
      ] })
    ] })
  ] }) });
}
function DetailStat({
  icon: Icon,
  label,
  value
}) {
  return /* @__PURE__ */ jsxs("div", { className: "group rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1", children: [
    /* @__PURE__ */ jsx("div", { className: "grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors", children: /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5" }) }),
    /* @__PURE__ */ jsx("p", { className: "mt-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground", children: label }),
    /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm font-bold text-foreground", children: value })
  ] });
}
function DetailPanel({
  title,
  children,
  className
}) {
  return /* @__PURE__ */ jsxs("section", { className: cn("rounded-2xl border border-border p-6 shadow-sm bg-card", className), children: [
    /* @__PURE__ */ jsxs("h3", { className: "text-lg font-bold tracking-tight text-foreground flex items-center gap-2 mb-5", children: [
      /* @__PURE__ */ jsx("div", { className: "h-1.5 w-1.5 rounded-full bg-primary" }),
      title
    ] }),
    /* @__PURE__ */ jsx("div", { className: "space-y-3", children })
  ] });
}
function InfoRow({
  label,
  value
}) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-4 text-sm border-b border-border/50 pb-2 last:border-0 last:pb-0", children: [
    /* @__PURE__ */ jsx("span", { className: "text-muted-foreground font-medium", children: label }),
    /* @__PURE__ */ jsx("span", { className: "text-right font-bold text-foreground", children: value })
  ] });
}
function EmptyState({
  message
}) {
  return /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border-2 border-dashed border-border p-12 text-center text-sm font-medium text-muted-foreground bg-muted/10", children: [
    /* @__PURE__ */ jsx("div", { className: "mx-auto h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4", children: /* @__PURE__ */ jsx(Search, { className: "h-6 w-6 text-muted-foreground/50" }) }),
    message
  ] });
}
function UserDetails({
  user
}) {
  if (user.role === "CLIENT") {
    return /* @__PURE__ */ jsxs("div", { className: "mt-4 grid gap-3 text-sm text-muted-foreground font-medium sm:grid-cols-2", children: [
      /* @__PURE__ */ jsx(Detail, { icon: Building2, label: user.companyName || "No company added" }),
      /* @__PURE__ */ jsx(Detail, { icon: BriefcaseBusiness, label: user.industry || "Industry not set" }),
      /* @__PURE__ */ jsx(Detail, { icon: ShieldCheck, label: `Joined ${formatDate(user.createdAt)}` }),
      /* @__PURE__ */ jsx(Detail, { icon: UserRound, label: formatEnum(user.authProvider) })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "mt-4 grid gap-3 text-sm text-muted-foreground font-medium sm:grid-cols-2", children: [
    /* @__PURE__ */ jsx(Detail, { icon: BriefcaseBusiness, label: user.professionalCategory || "Category not set" }),
    /* @__PURE__ */ jsx(Detail, { icon: MapPin, label: user.professionalCity || "City not set" }),
    /* @__PURE__ */ jsx(Detail, { icon: Wallet, label: formatProfessionalRate(user) }),
    /* @__PURE__ */ jsx(Detail, { icon: Star, label: `${user.averageRating.toFixed(1)} rating / ${user.reviewCount} reviews` }),
    /* @__PURE__ */ jsx(Detail, { icon: ShieldCheck, label: `Joined ${formatDate(user.createdAt)}` }),
    /* @__PURE__ */ jsx(Detail, { icon: UserRound, label: formatEnum(user.availabilityStatus || "available") })
  ] });
}
function Detail({
  icon: Icon,
  label
}) {
  return /* @__PURE__ */ jsxs("span", { className: "inline-flex min-w-0 items-center gap-2", children: [
    /* @__PURE__ */ jsx(Icon, { className: "h-4 w-4 shrink-0 text-primary/50" }),
    /* @__PURE__ */ jsx("span", { className: "truncate", children: label })
  ] });
}
function filterUsers(users, query) {
  const term = query.trim().toLowerCase();
  if (!term) {
    return users;
  }
  return users.filter((user) => [user.firstName, user.lastName, user.email, user.phone, user.companyName, user.industry, user.professionalCategory, user.professionalCity, user.availabilityStatus, user.authProvider, user.isActive ? "active" : "inactive", user.isVerified ? "verified" : "pending"].join(" ").toLowerCase().includes(term));
}
function activeCount(users) {
  return users.filter((user) => user.isActive).length;
}
function getFullName(user) {
  return `${user.firstName} ${user.lastName}`.trim() || user.email;
}
function formatProfessionalRate(user) {
  if (user.hourlyRate) {
    return `$${user.hourlyRate.toLocaleString()}/hr`;
  }
  if (user.fixedRate) {
    return `$${user.fixedRate.toLocaleString()} fixed`;
  }
  return "Rate not set";
}
function formatSignInMethod(user) {
  if (user.authProvider === "GOOGLE" && user.hasPassword) {
    return "Google + password";
  }
  return user.hasPassword ? "Password" : formatEnum(user.authProvider);
}
function validatePassword(password) {
  if (password.length < 8) return "Password must be at least 8 characters.";
  if (!/[A-Z]/.test(password)) return "Password must include one uppercase letter.";
  if (!/[a-z]/.test(password)) return "Password must include one lowercase letter.";
  if (!/[0-9]/.test(password)) return "Password must include one number.";
  if (!/[^A-Za-z0-9]/.test(password)) return "Password must include one special character.";
  return null;
}
export {
  UserManagement as component
};
