import { jsx, jsxs } from "react/jsx-runtime";
import { B as Button, A as AppShell, k as AdminPageHeader, m as AdminSection, g as Badge, n as AdminEmptyState, I as Input, T as Textarea, j as createSsrRpc } from "./router-DyXkltGt.js";
import { c as createServerFn } from "./server-KxTtotOh.js";
import { useLoaderData, useRouter, Link } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { ShieldCheck, Plus, FolderKanban, Search, BriefcaseBusiness, Trash2 } from "lucide-react";
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
const saveServiceCategory = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(createSsrRpc("e6474fabb0c7002835fe9cf233562b70c976f1753e8258ac38019f98d7b13067"));
const removeServiceCategory = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(createSsrRpc("576fe12dd784cc869a9ca756e2b212df90341c076f6142ed21f5ba66874fffc2"));
function AdminCategories() {
  const data = useLoaderData({
    from: "/admin-categories"
  });
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [message, setMessage] = useState(null);
  const [categoryForm, setCategoryForm] = useState({
    name: "",
    slug: "",
    description: "",
    iconName: "",
    sortOrder: 0
  });
  const categories = data.categories;
  const selectedCategory = useMemo(() => categories.find((category) => category.id === selectedId) ?? null, [categories, selectedId]);
  useEffect(() => {
    if (selectedCategory) {
      setCategoryForm({
        name: selectedCategory.name,
        slug: selectedCategory.slug,
        description: selectedCategory.description,
        iconName: selectedCategory.iconName,
        sortOrder: selectedCategory.sortOrder
      });
      return;
    }
    setCategoryForm({
      name: "",
      slug: "",
      description: "",
      iconName: "",
      sortOrder: 0
    });
  }, [selectedCategory]);
  const filteredCategories = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) {
      return categories;
    }
    return categories.filter((category) => [category.name, category.slug, category.description, category.iconName].join(" ").toLowerCase().includes(term));
  }, [categories, search]);
  const isEditing = selectedCategory !== null;
  async function handleSubmit(event) {
    event.preventDefault();
    setMessage(null);
    setIsSaving(true);
    try {
      await saveServiceCategory({
        data: {
          id: selectedCategory?.id,
          name: categoryForm.name,
          slug: categoryForm.slug,
          description: categoryForm.description,
          iconName: categoryForm.iconName,
          sortOrder: categoryForm.sortOrder
        }
      });
      await router.invalidate();
      setMessage({
        text: "Category saved successfully.",
        type: "success"
      });
      if (!selectedCategory) {
        setSelectedId(null);
      }
    } catch (error) {
      setMessage({
        text: error instanceof Error ? error.message : "Failed to save category.",
        type: "error"
      });
    } finally {
      setIsSaving(false);
    }
  }
  async function handleDelete() {
    if (!selectedCategory) return;
    if (!confirm("Are you sure you want to delete this category? This action cannot be undone.")) return;
    setMessage(null);
    setIsDeleting(true);
    try {
      await removeServiceCategory({
        data: {
          id: selectedCategory.id
        }
      });
      await router.invalidate();
      setSelectedId(null);
      setMessage({
        text: "Category deleted.",
        type: "success"
      });
    } catch (error) {
      setMessage({
        text: error instanceof Error ? error.message : "Failed to delete category.",
        type: "error"
      });
    } finally {
      setIsDeleting(false);
    }
  }
  if (!data.viewer || data.viewer.role !== "ADMIN") {
    return /* @__PURE__ */ jsx("div", { className: "grid min-h-screen place-items-center bg-muted/30 px-4", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-sm rounded-2xl border border-border bg-card p-8 text-center shadow-lg", children: [
      /* @__PURE__ */ jsx(ShieldCheck, { className: "mx-auto h-8 w-8 text-primary" }),
      /* @__PURE__ */ jsx("h1", { className: "mt-6 text-xl font-bold", children: "Admin access required" }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Sign in from the admin panel to manage service categories." }),
      /* @__PURE__ */ jsx(Button, { asChild: true, className: "mt-8 w-full", children: /* @__PURE__ */ jsx(Link, { to: "/admin", children: "Open admin panel" }) })
    ] }) });
  }
  const displayName = `${data.viewer.firstName} ${data.viewer.lastName}`.trim() || data.viewer.email;
  return /* @__PURE__ */ jsxs(AppShell, { userName: displayName, userRole: "Admin", userAvatarUrl: data.viewer.avatarUrl, children: [
    /* @__PURE__ */ jsx(AdminPageHeader, { title: "Service Categories", description: "Manage the directory of service types used for job posts and professional profiles.", breadcrumbs: [{
      label: "Categories"
    }], actions: /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsx(ReportExportActions, { table: "ServiceCategory", reportName: "Admin categories export", variant: "outline" }),
      /* @__PURE__ */ jsx(Button, { asChild: true, variant: "outline", children: /* @__PURE__ */ jsx(Link, { to: "/admin", children: "Back to admin" }) }),
      /* @__PURE__ */ jsxs(Button, { className: "gap-2 rounded-xl font-bold h-10 px-6", onClick: () => {
        setSelectedId(null);
        setMessage(null);
      }, children: [
        /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" }),
        "Create Category"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-8 xl:grid-cols-[400px_1fr]", children: [
      /* @__PURE__ */ jsx(AdminSection, { title: "Browse Categories", description: `${categories.length} items defined`, icon: FolderKanban, actions: /* @__PURE__ */ jsxs("div", { className: "relative w-full", children: [
        /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
        /* @__PURE__ */ jsx(Input, { value: search, onChange: (event) => setSearch(event.target.value), placeholder: "Quick search...", className: "pl-9 h-9 rounded-lg" })
      ] }), children: /* @__PURE__ */ jsx("div", { className: "p-4 space-y-3 max-h-[600px] overflow-y-auto custom-scrollbar bg-muted/20", children: filteredCategories.length ? filteredCategories.map((category) => /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => setSelectedId(category.id), className: cn("block w-full rounded-2xl border p-5 text-left transition-all hover:shadow-md active:scale-[0.98]", selectedId === category.id ? "border-primary bg-primary/[0.03] ring-1 ring-primary/20 shadow-sm" : "border-border bg-background hover:border-primary/40"), children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsx("p", { className: cn("font-bold text-lg truncate", selectedId === category.id ? "text-primary" : "text-foreground"), children: category.name }),
            /* @__PURE__ */ jsxs("p", { className: "mt-1 text-sm text-muted-foreground line-clamp-1 font-medium italic", children: [
              '"',
              category.description,
              '"'
            ] })
          ] }),
          /* @__PURE__ */ jsxs(Badge, { variant: "outline", className: "rounded-lg h-6 font-bold text-[9px] uppercase tracking-wider bg-background shrink-0", children: [
            category.jobCount,
            " Jobs"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsx("span", { className: "text-primary/40", children: "SLUG:" }),
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-foreground/80", children: category.slug })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsx("span", { className: "text-primary/40", children: "ICON:" }),
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-foreground/80", children: category.iconName || "NONE" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsx("span", { className: "text-primary/40", children: "ORDER:" }),
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-foreground/80", children: category.sortOrder })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsx("span", { className: "text-primary/40", children: "PROS:" }),
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-foreground/80", children: category.proCount })
          ] })
        ] })
      ] }, category.id)) : /* @__PURE__ */ jsx(AdminEmptyState, { title: "No categories found", description: "Try a different search term or create a new category.", className: "py-12" }) }) }),
      /* @__PURE__ */ jsx(AdminSection, { title: isEditing ? "Modify Category" : "Register New Category", description: isEditing ? "Update platform category details." : "Add a fresh work vertical to the marketplace.", icon: BriefcaseBusiness, actions: isEditing && /* @__PURE__ */ jsxs(Button, { variant: "destructive", size: "sm", className: "rounded-xl font-bold h-9 px-4", onClick: handleDelete, disabled: isDeleting, children: [
        /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4 mr-2" }),
        isDeleting ? "DELETING..." : "DELETE"
      ] }), children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "p-8 space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-6 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx("label", { className: "text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1", htmlFor: "category-name", children: "Category Name" }),
            /* @__PURE__ */ jsx(Input, { id: "category-name", value: categoryForm.name, onChange: (event) => setCategoryForm((current) => ({
              ...current,
              name: event.target.value
            })), required: true, placeholder: "e.g. Graphic Design", className: "h-12 rounded-xl bg-background border-border shadow-sm focus:ring-2 focus:ring-primary/20" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx("label", { className: "text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1", htmlFor: "category-slug", children: "URL Slug" }),
            /* @__PURE__ */ jsx(Input, { id: "category-slug", value: categoryForm.slug, onChange: (event) => setCategoryForm((current) => ({
              ...current,
              slug: event.target.value
            })), placeholder: "e.g. graphic-design", className: "h-12 rounded-xl bg-background border-border shadow-sm" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx("label", { className: "text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1", htmlFor: "category-icon", children: "Lucide Icon Name" }),
            /* @__PURE__ */ jsx(Input, { id: "category-icon", value: categoryForm.iconName, onChange: (event) => setCategoryForm((current) => ({
              ...current,
              iconName: event.target.value
            })), placeholder: "e.g. Palette, Code, Camera", className: "h-12 rounded-xl bg-background border-border shadow-sm" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx("label", { className: "text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1", htmlFor: "category-sort-order", children: "Sort Priority (Order)" }),
            /* @__PURE__ */ jsx(Input, { id: "category-sort-order", type: "number", value: categoryForm.sortOrder ?? 0, onChange: (event) => setCategoryForm((current) => ({
              ...current,
              sortOrder: Number(event.target.value) || 0
            })), className: "h-12 rounded-xl bg-background border-border shadow-sm font-bold tabular-nums" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx("label", { className: "text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1", htmlFor: "category-description", children: "Marketplace Description" }),
          /* @__PURE__ */ jsx(Textarea, { id: "category-description", value: categoryForm.description, onChange: (event) => setCategoryForm((current) => ({
            ...current,
            description: event.target.value
          })), placeholder: "Describe what kind of services fall under this category...", className: "min-h-[120px] rounded-xl bg-background border-border shadow-sm p-4 leading-relaxed" })
        ] }),
        message && /* @__PURE__ */ jsxs("div", { className: cn("rounded-xl p-4 text-sm font-bold flex items-center gap-2 animate-in fade-in duration-300", message.type === "error" ? "bg-rose-50 text-rose-700 border border-rose-200" : "bg-emerald-50 text-emerald-700 border border-emerald-200"), children: [
          message.type === "error" ? /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(ShieldCheck, { className: "h-4 w-4" }),
          message.text
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-3 pt-4", children: [
          /* @__PURE__ */ jsx(Button, { type: "submit", size: "lg", className: "h-12 px-8 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all active:scale-95", disabled: isSaving, children: isSaving ? "SAVING RECORD..." : isEditing ? "UPDATE CATEGORY" : "REGISTER CATEGORY" }),
          /* @__PURE__ */ jsx(Button, { type: "button", variant: "outline", size: "lg", className: "h-12 px-8 rounded-xl font-bold", onClick: () => {
            setSelectedId(null);
            setMessage(null);
          }, children: "CLEAR FORM" })
        ] })
      ] }) })
    ] })
  ] });
}
function cn(...inputs) {
  return inputs.filter(Boolean).join(" ");
}
export {
  AdminCategories as component
};
