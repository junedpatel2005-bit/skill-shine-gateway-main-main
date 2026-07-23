import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { c as cn, S as SiteHeader, l as logoutAction, B as Button, D as Dialog, a as DialogContent, b as DialogHeader, d as DialogTitle, e as DialogDescription, f as DialogFooter, g as Badge, h as formatApproximateLocation, i as SiteFooter, j as createSsrRpc } from "./router-DyXkltGt.js";
import { useNavigate, Link, getRouteApi } from "@tanstack/react-router";
import { X, Search, SlidersHorizontal, Save, BookmarkCheck, Trash2, Map, Heart, MapPin, Wallet, CalendarClock, Paperclip, ExternalLink, Briefcase, ChevronDown, Star, Clock, ShieldCheck, Award, Mail, Phone, UserRound, FileText, FileBadge, Camera } from "lucide-react";
import * as React from "react";
import { useState, useEffect } from "react";
import { c as createServerFn } from "./server-KxTtotOh.js";
import { toast } from "sonner";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cva } from "class-variance-authority";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { createClient } from "@supabase/supabase-js";
import "@tanstack/react-query";
import "react-redux";
import "@reduxjs/toolkit";
import "@radix-ui/react-slot";
import "clsx";
import "tailwind-merge";
import "socket.io-client";
import "@radix-ui/react-select";
import "@radix-ui/react-switch";
import "zod";
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
const Sheet = DialogPrimitive.Root;
const SheetPortal = DialogPrimitive.Portal;
const SheetOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Overlay,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
SheetOverlay.displayName = DialogPrimitive.Overlay.displayName;
const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
      }
    },
    defaultVariants: {
      side: "right"
    }
  }
);
const SheetContent = React.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ jsxs(SheetPortal, { children: [
  /* @__PURE__ */ jsx(SheetOverlay, {}),
  /* @__PURE__ */ jsxs(DialogPrimitive.Content, { ref, className: cn(sheetVariants({ side }), className), ...props, children: [
    /* @__PURE__ */ jsxs(DialogPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary", children: [
      /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
    ] }),
    children
  ] })
] }));
SheetContent.displayName = DialogPrimitive.Content.displayName;
const SheetTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Title,
  {
    ref,
    className: cn("text-lg font-semibold text-foreground", className),
    ...props
  }
));
SheetTitle.displayName = DialogPrimitive.Title.displayName;
const SheetDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
SheetDescription.displayName = DialogPrimitive.Description.displayName;
const Collapsible = CollapsiblePrimitive.Root;
const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;
const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent;
const supabaseUrl = "https://utlxnwuavppdmngvuzlj.supabase.co";
const supabaseAnonKey = "sb_publishable_000AjR-ABEKXvlvew70qwQ_0eij48mt";
const supabase = createClient(supabaseUrl, supabaseAnonKey);
const indexRoute = getRouteApi("/");
const saveFavoriteJob = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(createSsrRpc("79c8bfa0dc26a63cfce8d4b298efcd3cbde99f92285a5b43927deab15e082529"));
function Landing() {
  const {
    user
  } = indexRoute.useRouteContext();
  const {
    openJobs,
    professionals,
    favoriteJobIds,
    homeIntroHtml
  } = indexRoute.useLoaderData();
  const welcomeName = user ? `${user.firstName} ${user.lastName}`.trim() : "";
  const isProfessional = user?.role === "PROFESSIONAL";
  const [selectedProfessional, setSelectedProfessional] = useState(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isJobFilterOpen, setIsJobFilterOpen] = useState(false);
  const [isProfessionalListOpen, setIsProfessionalListOpen] = useState(false);
  const [showJobsMap, setShowJobsMap] = useState(false);
  const [selectedMapJobId, setSelectedMapJobId] = useState(null);
  const [jobSearch, setJobSearch] = useState("");
  const [jobCity, setJobCity] = useState("");
  const [jobBudgetMin, setJobBudgetMin] = useState("");
  const [jobBudgetMax, setJobBudgetMax] = useState("");
  const [jobUrgency, setJobUrgency] = useState("all");
  const [jobType, setJobType] = useState("all");
  const [savedJobFilters, setSavedJobFilters] = useState([]);
  const [selectedSavedJobFilterId, setSelectedSavedJobFilterId] = useState("");
  const [favoriteIds, setFavoriteIds] = useState(favoriteJobIds);
  const [favoriteMessage, setFavoriteMessage] = useState(null);
  const [professionalSearch, setProfessionalSearch] = useState("");
  const [professionalSearchFilter, setProfessionalSearchFilter] = useState("all");
  const [supabaseTodos, setSupabaseTodos] = useState([]);
  const navigate = useNavigate();
  const savedJobFilterStorageKey = user?.id ? `servio:saved-home-job-filters:${user.id}` : "servio:saved-home-job-filters:guest";
  useEffect(() => {
    setSavedJobFilters(readSavedJobFilters(savedJobFilterStorageKey));
    setSelectedSavedJobFilterId("");
  }, [savedJobFilterStorageKey]);
  useEffect(() => {
    let isMounted = true;
    async function getTodos() {
      const {
        data,
        error
      } = await supabase.from("todos").select("id, name").limit(5);
      if (!isMounted) {
        return;
      }
      if (!error && data) {
        setSupabaseTodos(data);
      }
    }
    void getTodos();
    return () => {
      isMounted = false;
    };
  }, []);
  const filteredOpenJobs = openJobs.filter((job) => {
    const query = jobSearch.trim().toLowerCase();
    const cityQuery = jobCity.trim().toLowerCase();
    const minBudget = jobBudgetMin ? Number(jobBudgetMin) : null;
    const maxBudget = jobBudgetMax ? Number(jobBudgetMax) : null;
    const locationText = [job.locationLabel, job.locationAddress].filter(Boolean).join(" ");
    const jobBudgetMinValue = job.budgetMin ?? job.budgetMax ?? 0;
    const jobBudgetMaxValue = job.budgetMax ?? job.budgetMin ?? 0;
    const matchesSearch = !query || [job.title, job.description, job.category, job.workMode, job.urgency, locationText, job.clientCompanyName, job.clientName, formatBudget(job.budgetMin, job.budgetMax, job.timingType), formatDate(job.deadline)].filter(Boolean).some((value) => String(value).toLowerCase().includes(query));
    const matchesCity = !cityQuery || locationText.toLowerCase().includes(cityQuery);
    const matchesBudgetMin = minBudget == null || jobBudgetMaxValue >= minBudget;
    const matchesBudgetMax = maxBudget == null || jobBudgetMinValue <= maxBudget;
    const matchesUrgency = jobUrgency === "all" || job.urgency === jobUrgency;
    const matchesType = jobType === "all" || job.workMode === jobType;
    return matchesSearch && matchesCity && matchesBudgetMin && matchesBudgetMax && matchesUrgency && matchesType;
  });
  const hasJobFilters = Boolean(jobSearch || jobCity || jobBudgetMin || jobBudgetMax) || jobUrgency !== "all" || jobType !== "all";
  const activeJobFilterCount = [jobCity, jobBudgetMin, jobBudgetMax, jobUrgency !== "all" ? jobUrgency : "", jobType !== "all" ? jobType : ""].filter(Boolean).length;
  const filteredProfessionals = professionals.filter((professional) => {
    const fullName = `${professional.firstName} ${professional.lastName}`.trim();
    const query = professionalSearch.trim().toLowerCase();
    if (!query) {
      return true;
    }
    const searchableProfessionalFields = {
      all: [fullName, professional.industry, professional.companyName, professional.companyDescription, professional.address, professional.professionalCategory, professional.professionalCity],
      name: [fullName],
      skill: [professional.industry, professional.professionalCategory, professional.companyDescription],
      company: [professional.companyName, professional.companyDescription],
      location: [professional.address, professional.professionalCity]
    };
    return (searchableProfessionalFields[professionalSearchFilter] || searchableProfessionalFields.all).filter(Boolean).some((value) => String(value).toLowerCase().includes(query));
  });
  const selectedVerificationMeta = getVerificationMeta(selectedProfessional?.verification?.status);
  const selectedVerificationBadges = getVerificationBadges(selectedProfessional?.verification);
  const selectedMapJob = filteredOpenJobs.find((job) => job.id === selectedMapJobId) || filteredOpenJobs.find((job) => job.locationAddress);
  const jobsMapQuery = selectedMapJob?.locationAddress || selectedMapJob?.locationLabel || jobCity || filteredOpenJobs.find((job) => job.locationAddress)?.locationAddress || "India";
  const clearJobFilters = () => {
    setJobSearch("");
    setJobCity("");
    setJobBudgetMin("");
    setJobBudgetMax("");
    setJobUrgency("all");
    setJobType("all");
    setSelectedSavedJobFilterId("");
  };
  const currentJobFilterState = () => ({
    search: jobSearch,
    city: jobCity,
    budgetMin: jobBudgetMin,
    budgetMax: jobBudgetMax,
    urgency: jobUrgency,
    type: jobType
  });
  const saveCurrentJobFilter = () => {
    if (savedJobFilters.length >= 5) {
      toast.error("You can save up to 5 filters.", {
        description: "Delete one saved filter before adding another."
      });
      return;
    }
    const filter = {
      id: crypto.randomUUID(),
      name: buildSavedJobFilterName(currentJobFilterState()),
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      filters: currentJobFilterState()
    };
    const nextFilters = [filter, ...savedJobFilters];
    setSavedJobFilters(nextFilters);
    setSelectedSavedJobFilterId(filter.id);
    writeSavedJobFilters(savedJobFilterStorageKey, nextFilters);
    toast.success("Filter saved", {
      description: `${filter.name} was added to home filters.`
    });
  };
  const applySavedJobFilter = (filter) => {
    setJobSearch(filter.filters.search);
    setJobCity(filter.filters.city);
    setJobBudgetMin(filter.filters.budgetMin);
    setJobBudgetMax(filter.filters.budgetMax);
    setJobUrgency(filter.filters.urgency);
    setJobType(filter.filters.type);
    setSelectedMapJobId(null);
    setSelectedSavedJobFilterId(filter.id);
    toast.info("Saved filter applied", {
      description: filter.name
    });
  };
  const deleteSavedJobFilter = (filterId) => {
    const nextFilters = savedJobFilters.filter((filter) => filter.id !== filterId);
    setSavedJobFilters(nextFilters);
    setSelectedSavedJobFilterId((current) => current === filterId ? "" : current);
    writeSavedJobFilters(savedJobFilterStorageKey, nextFilters);
    toast.success("Saved filter deleted");
  };
  useEffect(() => {
    if (!favoriteMessage) {
      return;
    }
    const timeout = window.setTimeout(() => setFavoriteMessage(null), 2e3);
    return () => window.clearTimeout(timeout);
  }, [favoriteMessage]);
  const toggleFavoriteJob = async (jobId) => {
    if (!user) {
      await navigate({
        to: "/login",
        search: {
          returnTo: "/"
        }
      });
      return;
    }
    const nextFavorite = !favoriteIds.includes(jobId);
    const previousFavorites = favoriteIds;
    setFavoriteIds((current) => nextFavorite ? [...current, jobId] : current.filter((favoriteId) => favoriteId !== jobId));
    setFavoriteMessage(nextFavorite ? "Job saved to favorites." : "Job removed from favorites.");
    try {
      const result = await saveFavoriteJob({
        data: {
          jobId,
          favorite: nextFavorite
        }
      });
      if (!result.ok) {
        setFavoriteIds(previousFavorites);
        setFavoriteMessage(result.error);
      }
    } catch (error) {
      setFavoriteIds(previousFavorites);
      setFavoriteMessage(error instanceof Error ? error.message : "Could not update favorite job.");
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsx(SiteHeader, { user, onLogout: logoutAction }),
    /* @__PURE__ */ jsxs("main", { children: [
      homeIntroHtml ? /* @__PURE__ */ jsx("section", { className: "border-b border-border bg-surface", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8", children: (() => {
        let introHtmlToRender = homeIntroHtml;
        let nameInjected = false;
        function escapeHtml(value) {
          return String(value || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/'/g, "&#039;");
        }
        if (user && homeIntroHtml) {
          if (/<h1[^>]*>[\s\S]*?<\/h1>/i.test(homeIntroHtml)) {
            introHtmlToRender = homeIntroHtml.replace(/<h1([^>]*)>([\s\S]*?)<\/h1>/i, (m, attrs, inner) => {
              if (/welcome/i.test(inner)) {
                nameInjected = true;
                return `<h1${attrs}>${inner.replace(/welcome/i, `Welcome, ${escapeHtml(welcomeName)}`)}</h1>`;
              }
              return m;
            });
          }
          if (!nameInjected && /\bWelcome\b/i.test(homeIntroHtml)) {
            introHtmlToRender = homeIntroHtml.replace(/\bWelcome\b/i, `Welcome, ${escapeHtml(welcomeName)}`);
            nameInjected = true;
          }
        }
        return /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { dangerouslySetInnerHTML: {
            __html: introHtmlToRender
          } }),
          !nameInjected && user ? /* @__PURE__ */ jsx("div", { className: "mt-4 rounded-xl border border-primary/15 bg-primary/5 px-5 py-4", children: /* @__PURE__ */ jsx("h1", { className: "text-2xl font-semibold tracking-tight text-primary", children: `Welcome, ${welcomeName || "there"}` }) }) : null
        ] });
      })() }) }) : /* @__PURE__ */ jsx("section", { className: "border-b border-border bg-muted/20", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden rounded-[2rem] border border-primary/15 bg-gradient-to-br from-primary/10 via-background to-primary/5 p-8 shadow-sm", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-4 flex flex-wrap items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "rounded-full border border-primary/20 bg-background/80 px-3 py-1 text-sm font-medium text-primary", children: "Supabase connected" }),
            supabaseTodos.length > 0 ? /* @__PURE__ */ jsxs("span", { className: "text-sm text-muted-foreground", children: [
              "Showing ",
              supabaseTodos.length,
              " synced item",
              supabaseTodos.length === 1 ? "" : "s"
            ] }) : null
          ] }),
          /* @__PURE__ */ jsx("h1", { className: "text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl", children: user ? /* @__PURE__ */ jsxs(Fragment, { children: [
            "Welcome back, ",
            /* @__PURE__ */ jsx("span", { className: "text-primary", children: welcomeName || "there" })
          ] }) : "Welcome to Servio" }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 max-w-2xl text-base font-medium text-muted-foreground leading-relaxed", children: isProfessional ? "Your expertise is in demand. Explore new projects and connect with clients looking for your skills." : "Hire trusted professionals for your next project. We connect you with the best talent in your area." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "absolute -right-12 -top-12 h-64 w-64 rounded-full bg-primary/5 blur-3xl" }),
        /* @__PURE__ */ jsx("div", { className: "absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-blue-500/5 blur-3xl" })
      ] }) }) }),
      /* @__PURE__ */ jsx("section", { className: "mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-border bg-card p-4 shadow-soft", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto_auto]", children: [
          /* @__PURE__ */ jsxs("label", { className: "flex h-11 min-w-0 items-center gap-3 rounded-xl border border-input bg-background px-4", children: [
            /* @__PURE__ */ jsx(Search, { className: "h-5 w-5 text-muted-foreground" }),
            /* @__PURE__ */ jsx("input", { value: jobSearch, onChange: (event) => setJobSearch(event.target.value), placeholder: "Search available jobs", className: "min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" })
          ] }),
          /* @__PURE__ */ jsxs(Button, { type: "button", variant: "outline", className: "h-11 gap-2", onClick: () => setIsJobFilterOpen(true), children: [
            /* @__PURE__ */ jsx(SlidersHorizontal, { className: "h-4 w-4" }),
            "Filters",
            activeJobFilterCount ? /* @__PURE__ */ jsx("span", { className: "rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground", children: activeJobFilterCount }) : null
          ] }),
          /* @__PURE__ */ jsx(Button, { type: "button", variant: "outline", className: "h-11", onClick: clearJobFilters, disabled: !hasJobFilters, children: "Clear" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-3 flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap items-center gap-3", children: activeJobFilterCount ? /* @__PURE__ */ jsxs("span", { children: [
            activeJobFilterCount,
            " filter",
            activeJobFilterCount === 1 ? "" : "s",
            " active"
          ] }) : null }),
          favoriteMessage ? /* @__PURE__ */ jsx("span", { className: "animate-in fade-in slide-in-from-bottom-1 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary", children: favoriteMessage }) : null
        ] })
      ] }) }),
      /* @__PURE__ */ jsx(Dialog, { open: isJobFilterOpen, onOpenChange: setIsJobFilterOpen, children: /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-3xl", children: [
        /* @__PURE__ */ jsxs(DialogHeader, { children: [
          /* @__PURE__ */ jsx(DialogTitle, { children: "Filters" }),
          /* @__PURE__ */ jsx(DialogDescription, { children: "Narrow available jobs by location, budget, urgency, and type." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-border bg-muted/30 p-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-between gap-3 sm:flex-row sm:items-center", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", children: "Saved filters" }),
              /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground", children: [
                savedJobFilters.length,
                "/5 saved on home page"
              ] })
            ] }),
            /* @__PURE__ */ jsxs(Button, { type: "button", size: "sm", className: "gap-2", onClick: saveCurrentJobFilter, children: [
              /* @__PURE__ */ jsx(Save, { className: "h-4 w-4" }),
              "Save current"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("select", { className: "mt-3 h-11 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20", value: selectedSavedJobFilterId, onChange: (event) => {
            const filter = savedJobFilters.find((item) => item.id === event.target.value);
            if (filter) {
              applySavedJobFilter(filter);
            } else {
              setSelectedSavedJobFilterId("");
            }
          }, children: [
            /* @__PURE__ */ jsx("option", { value: "", children: "Choose saved filter" }),
            savedJobFilters.map((filter) => /* @__PURE__ */ jsx("option", { value: filter.id, children: filter.name }, filter.id))
          ] }),
          savedJobFilters.length ? /* @__PURE__ */ jsx("div", { className: "mt-3 grid gap-2 sm:grid-cols-2", children: savedJobFilters.map((filter) => /* @__PURE__ */ jsxs("div", { role: "button", tabIndex: 0, onDoubleClick: () => applySavedJobFilter(filter), onKeyDown: (event) => {
            if (event.key === "Enter") {
              applySavedJobFilter(filter);
            }
          }, className: `flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors ${selectedSavedJobFilterId === filter.id ? "border-primary bg-primary/5" : "border-border bg-background hover:border-primary/50"}`, title: "Double click to apply", children: [
            /* @__PURE__ */ jsx(BookmarkCheck, { className: "h-4 w-4 shrink-0 text-primary" }),
            /* @__PURE__ */ jsx("span", { className: "min-w-0 flex-1 truncate", children: filter.name }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "grid h-8 w-8 shrink-0 place-items-center rounded-md text-muted-foreground hover:bg-muted hover:text-destructive", onClick: (event) => {
              event.stopPropagation();
              deleteSavedJobFilter(filter.id);
            }, "aria-label": `Delete ${filter.name}`, children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" }) })
          ] }, filter.id)) }) : null
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-4 py-2 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxs("label", { className: "space-y-2 text-sm font-medium", children: [
            /* @__PURE__ */ jsx("span", { children: "Location" }),
            /* @__PURE__ */ jsx("input", { value: jobCity, onChange: (event) => setJobCity(event.target.value), placeholder: "Search city, area, or address", className: "h-11 w-full rounded-xl border border-input bg-background px-3 text-sm font-normal outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20" })
          ] }),
          /* @__PURE__ */ jsxs("label", { className: "space-y-2 text-sm font-medium", children: [
            /* @__PURE__ */ jsx("span", { children: "Minimum budget" }),
            /* @__PURE__ */ jsx("input", { type: "number", min: "0", value: jobBudgetMin, onChange: (event) => setJobBudgetMin(event.target.value), placeholder: "Min budget", className: "h-11 w-full rounded-xl border border-input bg-background px-3 text-sm font-normal outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20" })
          ] }),
          /* @__PURE__ */ jsxs("label", { className: "space-y-2 text-sm font-medium", children: [
            /* @__PURE__ */ jsx("span", { children: "Maximum budget" }),
            /* @__PURE__ */ jsx("input", { type: "number", min: "0", value: jobBudgetMax, onChange: (event) => setJobBudgetMax(event.target.value), placeholder: "Max budget", className: "h-11 w-full rounded-xl border border-input bg-background px-3 text-sm font-normal outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20" })
          ] }),
          /* @__PURE__ */ jsxs("label", { className: "space-y-2 text-sm font-medium", children: [
            /* @__PURE__ */ jsx("span", { children: "Urgency" }),
            /* @__PURE__ */ jsxs("select", { className: "h-11 w-full rounded-xl border border-input bg-background px-3 text-sm font-normal outline-none focus:border-primary focus:ring-2 focus:ring-primary/20", value: jobUrgency, onChange: (event) => setJobUrgency(event.target.value), children: [
              /* @__PURE__ */ jsx("option", { value: "all", children: "Any urgency" }),
              /* @__PURE__ */ jsx("option", { value: "HIGH", children: "High" }),
              /* @__PURE__ */ jsx("option", { value: "MEDIUM", children: "Medium" }),
              /* @__PURE__ */ jsx("option", { value: "LOW", children: "Low" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("label", { className: "space-y-2 text-sm font-medium", children: [
            /* @__PURE__ */ jsx("span", { children: "Type" }),
            /* @__PURE__ */ jsxs("select", { className: "h-11 w-full rounded-xl border border-input bg-background px-3 text-sm font-normal outline-none focus:border-primary focus:ring-2 focus:ring-primary/20", value: jobType, onChange: (event) => setJobType(event.target.value), children: [
              /* @__PURE__ */ jsx("option", { value: "all", children: "Any type" }),
              /* @__PURE__ */ jsx("option", { value: "REMOTE", children: "Remote" }),
              /* @__PURE__ */ jsx("option", { value: "ON_SITE", children: "On-site" }),
              /* @__PURE__ */ jsx("option", { value: "BOTH", children: "Both" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(DialogFooter, { children: [
          /* @__PURE__ */ jsx(Button, { type: "button", variant: "ghost", onClick: clearJobFilters, children: "Clear" }),
          /* @__PURE__ */ jsx(Button, { type: "button", onClick: () => setIsJobFilterOpen(false), children: "Apply filters" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: isProfessional ? "" : "flex flex-col gap-6 lg:flex-row lg:items-start", children: [
        /* @__PURE__ */ jsxs("div", { className: cn("rounded-2xl border border-border bg-card p-6 shadow-soft", !isProfessional && "flex-1"), children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-between gap-4 sm:flex-row sm:items-center", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold tracking-tight text-foreground", children: isProfessional ? "Recommended Opportunities" : "Browse Marketplace" }),
              /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: isProfessional ? "Review client requirements, budget, and location before applying for a job." : "Discover trusted professionals and explore available job posts in your area." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              !isProfessional && /* @__PURE__ */ jsx(Button, { type: "button", className: "h-10 gap-2 rounded-xl font-bold transition-all shadow-sm", asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "/post-job", children: "Post a job" }) }),
              /* @__PURE__ */ jsxs(Button, { type: "button", variant: "outline", className: "h-10 gap-2 rounded-xl font-bold border-border shadow-sm hover:bg-primary/5 hover:text-primary transition-all", onClick: () => setShowJobsMap((value) => !value), children: [
                /* @__PURE__ */ jsx(Map, { className: "h-4 w-4" }),
                showJobsMap ? "Hide Map View" : "View on Map"
              ] })
            ] })
          ] }),
          openJobs.length ? filteredOpenJobs.length ? showJobsMap ? /* @__PURE__ */ jsx("div", { className: "mt-5 overflow-hidden rounded-xl border border-border bg-background", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-[minmax(0,1fr)_340px]", children: [
            /* @__PURE__ */ jsx("div", { className: "min-h-[420px]", children: /* @__PURE__ */ jsx("iframe", { title: "Jobs map", src: `https://www.google.com/maps?q=${encodeURIComponent(jobsMapQuery)}&z=12&output=embed`, className: "h-[420px] w-full border-0", loading: "lazy", referrerPolicy: "no-referrer-when-downgrade" }) }),
            /* @__PURE__ */ jsxs("div", { className: "max-h-[420px] overflow-y-auto border-t border-border bg-card p-3 lg:border-l lg:border-t-0", children: [
              /* @__PURE__ */ jsxs("div", { className: "mb-3 flex items-center justify-between gap-3", children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold", children: "Map results" }),
                /* @__PURE__ */ jsx(Badge, { variant: "secondary", children: filteredOpenJobs.length })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "grid gap-3", children: filteredOpenJobs.map((job) => /* @__PURE__ */ jsxs("div", { role: "button", tabIndex: 0, onClick: () => setSelectedMapJobId(job.id), onKeyDown: (event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setSelectedMapJobId(job.id);
                }
              }, className: `rounded-lg border p-3 text-left transition-colors ${selectedMapJob?.id === job.id ? "border-primary bg-primary/5" : "border-border bg-background hover:border-primary/40 hover:bg-primary/5"}`, children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3", children: [
                  /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsx("p", { className: "line-clamp-2 text-sm font-semibold", children: job.title }),
                    /* @__PURE__ */ jsxs("p", { className: "mt-1 truncate text-xs text-muted-foreground", children: [
                      job.category,
                      " ·",
                      " ",
                      formatBudget(job.budgetMin, job.budgetMax, job.timingType)
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex shrink-0 items-center gap-2", children: [
                    /* @__PURE__ */ jsx("button", { type: "button", onClick: (event) => {
                      event.stopPropagation();
                      void toggleFavoriteJob(job.id);
                    }, className: `grid h-8 w-8 place-items-center rounded-md border transition-colors ${favoriteIds.includes(job.id) ? "border-primary bg-primary/10 text-primary" : "border-border bg-card text-muted-foreground hover:text-primary"}`, "aria-label": favoriteIds.includes(job.id) ? "Remove favorite job" : "Save favorite job", children: /* @__PURE__ */ jsx(Heart, { className: `h-4 w-4 ${favoriteIds.includes(job.id) ? "fill-current" : ""}` }) }),
                    /* @__PURE__ */ jsx(Badge, { variant: job.urgency === "HIGH" ? "destructive" : "outline", children: formatEnum(job.urgency) })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "mt-3 flex items-center gap-1.5 text-xs text-muted-foreground", children: [
                  /* @__PURE__ */ jsx(MapPin, { className: "h-3.5 w-3.5 shrink-0" }),
                  /* @__PURE__ */ jsx("span", { className: "truncate", children: formatJobLocation(job) })
                ] }),
                /* @__PURE__ */ jsx(Button, { asChild: true, variant: "outline", size: "sm", className: "mt-3 w-full", children: /* @__PURE__ */ jsx(Link, { to: "/job/$jobId", params: {
                  jobId: String(job.id)
                }, children: "View job" }) })
              ] }, job.id)) })
            ] })
          ] }) }) : /* @__PURE__ */ jsx("div", { className: "mt-5 grid auto-rows-fr gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3", children: filteredOpenJobs.map((job) => /* @__PURE__ */ jsxs("div", { className: "group relative flex flex-col rounded-xl border border-border bg-background p-4 transition-all hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-1.5", children: [
                /* @__PURE__ */ jsx(Badge, { variant: "secondary", className: "bg-primary/5 text-primary border-primary/10 text-[9px] font-bold uppercase tracking-wider px-1.5", children: job.category }),
                /* @__PURE__ */ jsx(Badge, { variant: job.urgency === "HIGH" ? "destructive" : "outline", className: "text-[9px] font-bold uppercase tracking-wider px-1.5", children: formatEnum(job.urgency) }),
                /* @__PURE__ */ jsx(Badge, { className: "text-[9px] font-bold uppercase tracking-wider px-1.5", children: formatWorkMode(job.workMode) })
              ] }),
              /* @__PURE__ */ jsx("button", { type: "button", onClick: (event) => {
                event.preventDefault();
                event.stopPropagation();
                void toggleFavoriteJob(job.id);
              }, className: cn("flex h-8 w-8 items-center justify-center rounded-lg border transition-all hover:scale-110 active:scale-95", favoriteIds.includes(job.id) ? "border-rose-100 bg-rose-50 text-rose-500 shadow-sm shadow-rose-200" : "border-border bg-card text-muted-foreground hover:text-primary hover:border-primary/30"), "aria-label": favoriteIds.includes(job.id) ? "Remove favorite job" : "Save favorite job", children: /* @__PURE__ */ jsx(Heart, { className: cn("h-4 w-4", favoriteIds.includes(job.id) && "fill-current") }) })
            ] }),
            /* @__PURE__ */ jsxs(Link, { to: "/job/$jobId", params: {
              jobId: String(job.id)
            }, className: "flex-1 focus:outline-none", children: [
              /* @__PURE__ */ jsx("h3", { className: "mt-3 text-base font-bold text-foreground transition-colors group-hover:text-primary line-clamp-1", children: job.title }),
              /* @__PURE__ */ jsx("p", { className: "mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground", children: job.description }),
              /* @__PURE__ */ jsxs("div", { className: "mt-4 grid grid-cols-2 gap-3", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx("div", { className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600", children: /* @__PURE__ */ jsx(Wallet, { className: "h-4 w-4" }) }),
                  /* @__PURE__ */ jsxs("div", { className: "flex min-w-0 flex-col", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-[9px] font-bold uppercase tracking-widest text-muted-foreground", children: "Budget" }),
                    /* @__PURE__ */ jsx("span", { className: "truncate text-xs font-bold", children: formatBudget(job.budgetMin, job.budgetMax, job.timingType) })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx("div", { className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600", children: /* @__PURE__ */ jsx(CalendarClock, { className: "h-4 w-4" }) }),
                  /* @__PURE__ */ jsxs("div", { className: "flex min-w-0 flex-col", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-[9px] font-bold uppercase tracking-widest text-muted-foreground", children: "Deadline" }),
                    /* @__PURE__ */ jsx("span", { className: "truncate text-xs font-bold", children: formatDate(job.deadline) })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx("div", { className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-purple-50 text-purple-600", children: /* @__PURE__ */ jsx(MapPin, { className: "h-4 w-4" }) }),
                  /* @__PURE__ */ jsxs("div", { className: "flex min-w-0 flex-col", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-[9px] font-bold uppercase tracking-widest text-muted-foreground", children: "Location" }),
                    /* @__PURE__ */ jsx("span", { className: "truncate text-xs font-bold", children: formatJobLocation(job) })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx("div", { className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600", children: /* @__PURE__ */ jsx(Paperclip, { className: "h-4 w-4" }) }),
                  /* @__PURE__ */ jsxs("div", { className: "flex min-w-0 flex-col", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-[9px] font-bold uppercase tracking-widest text-muted-foreground", children: "Files" }),
                    /* @__PURE__ */ jsxs("span", { className: "truncate text-xs font-bold", children: [
                      job.attachments.length,
                      " attached"
                    ] })
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center justify-between border-t border-border pt-3", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx("div", { className: "flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-[9px] font-bold text-primary", children: (job.clientCompanyName || job.clientName || "C").charAt(0).toUpperCase() }),
                /* @__PURE__ */ jsxs("span", { className: "text-[10px] font-semibold text-muted-foreground", children: [
                  "By ",
                  /* @__PURE__ */ jsx("span", { className: "text-foreground truncate max-w-[60px] inline-block align-bottom", children: job.clientCompanyName || job.clientName })
                ] })
              ] }),
              /* @__PURE__ */ jsxs(Link, { to: "/job/$jobId", params: {
                jobId: String(job.id)
              }, className: "flex items-center gap-1 text-[10px] font-bold text-primary transition-colors hover:underline", children: [
                "View details",
                /* @__PURE__ */ jsx(ExternalLink, { className: "h-2.5 w-2.5" })
              ] })
            ] })
          ] }, job.id)) }) : /* @__PURE__ */ jsxs("div", { className: "mt-6 rounded-lg border border-dashed border-border bg-muted/30 p-10 text-center", children: [
            /* @__PURE__ */ jsx(Search, { className: "mx-auto h-9 w-9 text-muted-foreground" }),
            /* @__PURE__ */ jsx("h3", { className: "mt-3 font-semibold", children: "Job not available" }),
            /* @__PURE__ */ jsxs("p", { className: "mx-auto mt-1 max-w-md text-sm text-muted-foreground", children: [
              'No available job matches "',
              jobSearch.trim(),
              '". Try searching another title, category, location, budget, or client.'
            ] })
          ] }) : /* @__PURE__ */ jsxs("div", { className: "mt-6 rounded-lg border border-dashed border-border bg-muted/30 p-10 text-center", children: [
            /* @__PURE__ */ jsx(Briefcase, { className: "mx-auto h-9 w-9 text-muted-foreground" }),
            /* @__PURE__ */ jsx("h3", { className: "mt-3 font-semibold", children: "No available jobs" }),
            /* @__PURE__ */ jsx("p", { className: "mx-auto mt-1 max-w-md text-sm text-muted-foreground", children: "When a client posts an active job, it will appear here automatically." }),
            user?.role === "CLIENT" ? /* @__PURE__ */ jsx(Button, { className: "mt-4", asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "/post-job", children: "Post your first job" }) }) : null
          ] })
        ] }),
        !isProfessional ? /* @__PURE__ */ jsx("aside", { className: "w-full lg:w-[400px] lg:shrink-0 lg:sticky lg:top-6", children: /* @__PURE__ */ jsx(Collapsible, { open: isProfessionalListOpen, onOpenChange: setIsProfessionalListOpen, className: "w-full", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-5 rounded-2xl border border-border bg-card p-6 shadow-soft transition-all", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-foreground text-balance", children: "Top Professionals" }),
              /* @__PURE__ */ jsxs(Badge, { variant: "secondary", className: "bg-primary/10 text-primary border-none", children: [
                filteredProfessionals.length,
                " found"
              ] })
            ] }),
            /* @__PURE__ */ jsx(CollapsibleTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "sm", className: "h-9 w-9 p-0 rounded-full hover:bg-primary/5", children: /* @__PURE__ */ jsx(ChevronDown, { className: cn("h-5 w-5 text-primary transition-transform duration-300", isProfessionalListOpen && "rotate-180") }) }) })
          ] }),
          /* @__PURE__ */ jsxs(CollapsibleContent, { className: "space-y-5 overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down", children: [
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
              /* @__PURE__ */ jsx("input", { value: professionalSearch, onChange: (event) => setProfessionalSearch(event.target.value), placeholder: "Search name, skill, location...", className: "h-11 w-full rounded-xl border border-input bg-background pl-9 pr-4 text-sm outline-none transition-all focus:border-primary/50 focus:ring-4 focus:ring-primary/5" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: [["all", "All"], ["name", "Name"], ["skill", "Skill"], ["location", "Location"]].map(([value, label]) => /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setProfessionalSearchFilter(value), className: cn("rounded-lg px-3 py-1.5 text-xs font-bold transition-all", professionalSearchFilter === value ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20" : "bg-muted text-muted-foreground hover:bg-muted/80"), children: label }, value)) }),
            professionals.length ? filteredProfessionals.length ? /* @__PURE__ */ jsx("div", { className: "custom-scrollbar grid max-h-[500px] gap-3 overflow-y-auto pr-1", children: filteredProfessionals.map((professional) => {
              const fullName = `${professional.firstName} ${professional.lastName}`.trim();
              const verificationMeta = getVerificationMeta(professional.verification?.status);
              return /* @__PURE__ */ jsx("div", { className: "group relative rounded-xl border border-border bg-background p-4 transition-all hover:border-primary/40 hover:shadow-md", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx("img", { src: professional.avatarUrl || `https://i.pravatar.cc/100?u=pro-${professional.id}`, alt: fullName, className: "h-12 w-12 rounded-xl object-cover shadow-sm" }),
                  /* @__PURE__ */ jsx("div", { className: "absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-background bg-emerald-500" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2", children: [
                    /* @__PURE__ */ jsx("h3", { className: "truncate font-bold text-foreground", children: fullName || "Professional" }),
                    /* @__PURE__ */ jsx(Badge, { variant: "outline", className: cn("h-5 border-none px-1.5 text-[9px] font-bold uppercase tracking-wider", verificationMeta.badgeClass), children: verificationMeta.shortLabel })
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "mt-0.5 truncate text-xs font-medium text-muted-foreground", children: professional.industry || professional.companyName || "Professional Services" }),
                  /* @__PURE__ */ jsxs("div", { className: "mt-3 flex items-center justify-between", children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 text-[11px] font-bold text-muted-foreground", children: [
                      /* @__PURE__ */ jsx(MapPin, { className: "h-3.5 w-3.5 shrink-0 text-primary/60" }),
                      /* @__PURE__ */ jsx("span", { className: "truncate", children: getProfessionalLocation(professional) })
                    ] }),
                    /* @__PURE__ */ jsx("button", { type: "button", onClick: () => {
                      setSelectedProfessional(professional);
                      setIsSheetOpen(true);
                    }, className: "flex items-center gap-1 rounded-lg bg-primary/5 px-2 py-1 text-[11px] font-bold text-primary transition-all hover:bg-primary hover:text-white", children: "View Profile" })
                  ] })
                ] })
              ] }) }, professional.id);
            }) }) : /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-dashed border-border bg-muted/30 p-8 text-center", children: [
              /* @__PURE__ */ jsx(Search, { className: "mx-auto h-8 w-8 text-muted-foreground/50" }),
              /* @__PURE__ */ jsx("h3", { className: "mt-3 text-sm font-bold", children: "No results" }),
              /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "Try adjusting your filters." })
            ] }) : /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-dashed border-border bg-muted/30 p-8 text-center", children: [
              /* @__PURE__ */ jsx(Search, { className: "mx-auto h-8 w-8 text-muted-foreground/50" }),
              /* @__PURE__ */ jsx("h3", { className: "mt-3 text-sm font-bold", children: "Marketplace is quiet" }),
              /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "Professional accounts will appear here." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsx(Button, { type: "button", variant: "outline", size: "sm", className: "flex-1 rounded-xl text-xs font-bold", onClick: () => setProfessionalSearch(""), disabled: !professionalSearch, children: "Reset" }),
              /* @__PURE__ */ jsx(Button, { type: "button", variant: "ghost", size: "sm", className: "flex-1 rounded-xl text-xs font-bold", children: "See All" })
            ] })
          ] })
        ] }) }) }) : null
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(Sheet, { open: isSheetOpen, onOpenChange: setIsSheetOpen, children: /* @__PURE__ */ jsxs(SheetContent, { side: "right", className: "flex h-dvh w-full max-w-none flex-col overflow-hidden p-0 sm:max-w-none md:w-[min(760px,100vw)]", children: [
      /* @__PURE__ */ jsx(SheetTitle, { className: "sr-only", children: "Professional profile preview" }),
      /* @__PURE__ */ jsx(SheetDescription, { className: "sr-only", children: "Preview professional details and open the full profile." }),
      /* @__PURE__ */ jsx("div", { className: "h-24 shrink-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600" }),
      /* @__PURE__ */ jsxs("div", { className: "min-h-0 flex-1 overflow-y-auto px-5 pb-6 sm:px-7", children: [
        /* @__PURE__ */ jsx("div", { className: "-mt-6 rounded-2xl border border-border bg-card shadow-soft", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-5 p-5 sm:grid-cols-[132px_minmax(0,1fr)] sm:items-start", children: [
          /* @__PURE__ */ jsx("div", { className: "relative h-32 w-32 shrink-0 overflow-hidden rounded-2xl bg-muted shadow-lg ring-4 ring-background", children: /* @__PURE__ */ jsx("img", { src: selectedProfessional?.avatarUrl || `https://i.pravatar.cc/160?u=pro-${selectedProfessional?.id}`, alt: getProfessionalName(selectedProfessional), className: "h-full w-full object-cover" }) }),
          /* @__PURE__ */ jsxs("div", { className: "min-w-0 pt-1", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
              /* @__PURE__ */ jsx("h2", { className: "min-w-0 truncate text-2xl font-semibold tracking-tight text-foreground", children: getProfessionalName(selectedProfessional) }),
              /* @__PURE__ */ jsx(Badge, { className: `rounded-full border-0 ${selectedVerificationMeta.badgeClass}`, children: selectedVerificationMeta.label })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 truncate text-sm text-muted-foreground", children: selectedProfessional?.professionalCategory || selectedProfessional?.industry || selectedProfessional?.companyName || "Professional services" }),
            /* @__PURE__ */ jsxs("div", { className: "mt-4 grid gap-3 text-sm text-muted-foreground md:grid-cols-3", children: [
              /* @__PURE__ */ jsx(ProfileMetric, { icon: Star, label: "Rating", value: getRatingLabel(selectedProfessional), accent: "text-warning" }),
              /* @__PURE__ */ jsx(ProfileMetric, { icon: MapPin, label: "Location", value: getProfessionalLocation(selectedProfessional) }),
              /* @__PURE__ */ jsx(ProfileMetric, { icon: Clock, label: "Status", value: formatAvailability(selectedProfessional?.availabilityStatus || selectedProfessional?.availability) })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "mt-4 flex flex-wrap gap-2", children: selectedVerificationBadges.length ? selectedVerificationBadges.map((badge) => /* @__PURE__ */ jsx(VerificationBadge, { icon: badge.icon, label: badge.label }, badge.label)) : /* @__PURE__ */ jsx("span", { className: "rounded-full border border-dashed border-border px-3 py-1.5 text-xs font-medium text-muted-foreground", children: "No verification badges yet" }) })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px]", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
            /* @__PURE__ */ jsxs("section", { className: "rounded-xl border border-border bg-card p-5 shadow-soft", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-base font-semibold", children: "About" }),
              /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm leading-6 text-muted-foreground", children: selectedProfessional?.companyDescription || selectedProfessional?.bio || "This professional has not added a description yet. Open the full profile or message them to discuss services, availability, and fit." })
            ] }),
            /* @__PURE__ */ jsxs("section", { className: "rounded-xl border border-border bg-card p-5 shadow-soft", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-base font-semibold", children: "Profile highlights" }),
              /* @__PURE__ */ jsxs("div", { className: "mt-4 grid gap-3 sm:grid-cols-2", children: [
                /* @__PURE__ */ jsx(DetailTile, { label: "Main service", value: selectedProfessional?.professionalCategory || selectedProfessional?.industry || "Professional services" }),
                /* @__PURE__ */ jsx(DetailTile, { label: "Experience", value: selectedProfessional?.experienceYears != null ? `${selectedProfessional.experienceYears} years` : "Not specified" }),
                /* @__PURE__ */ jsx(DetailTile, { label: "Work mode", value: formatWorkModeLabel(selectedProfessional?.workMode) }),
                /* @__PURE__ */ jsx(DetailTile, { label: "Service radius", value: selectedProfessional?.serviceRadiusKm ? `${selectedProfessional.serviceRadiusKm} km` : "Not set" }),
                /* @__PURE__ */ jsx(DetailTile, { label: "Service area", value: formatApproximateLocation(selectedProfessional?.serviceArea, getProfessionalLocation(selectedProfessional)) }),
                /* @__PURE__ */ jsx(DetailTile, { label: "Verification", value: selectedVerificationMeta.label })
              ] })
            ] }),
            selectedProfessional?.skills?.length ? /* @__PURE__ */ jsxs("section", { className: "rounded-xl border border-border bg-card p-5 shadow-soft", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-base font-semibold", children: "Skills" }),
              /* @__PURE__ */ jsx("div", { className: "mt-4 flex flex-wrap gap-2", children: selectedProfessional.skills.map((skill) => /* @__PURE__ */ jsx("span", { className: "rounded-full border border-border bg-muted px-3 py-1.5 text-sm font-medium text-foreground", children: skill }, skill)) })
            ] }) : null,
            selectedProfessional?.workPhotos?.length ? /* @__PURE__ */ jsxs("section", { className: "rounded-xl border border-border bg-card p-5 shadow-soft", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-base font-semibold", children: "Work photos" }),
              /* @__PURE__ */ jsx("div", { className: "mt-4 grid gap-3 sm:grid-cols-3", children: selectedProfessional.workPhotos.slice(0, 6).map((photo, index) => /* @__PURE__ */ jsx("img", { src: photo, alt: "", className: "aspect-[4/3] w-full rounded-lg border border-border object-cover" }, `${photo}-${index}`)) })
            ] }) : null,
            selectedProfessional?.portfolioUrl || selectedProfessional?.certifications?.length || selectedProfessional?.tradeLicenseUrl ? /* @__PURE__ */ jsxs("section", { className: "rounded-xl border border-border bg-card p-5 shadow-soft", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-base font-semibold", children: "Documents and links" }),
              /* @__PURE__ */ jsxs("div", { className: "mt-4 grid gap-3 sm:grid-cols-2", children: [
                selectedProfessional?.portfolioUrl ? /* @__PURE__ */ jsxs("a", { className: "rounded-lg border border-border p-4 transition-colors hover:border-primary/50 hover:bg-primary/5", href: selectedProfessional.portfolioUrl, target: "_blank", rel: "noreferrer", children: [
                  /* @__PURE__ */ jsx(ExternalLink, { className: "mb-3 h-4 w-4 text-primary" }),
                  /* @__PURE__ */ jsx("p", { className: "font-medium", children: "Portfolio link" }),
                  /* @__PURE__ */ jsx("p", { className: "mt-1 truncate text-sm text-muted-foreground", children: selectedProfessional.portfolioUrl })
                ] }) : null,
                selectedProfessional?.tradeLicenseUrl ? /* @__PURE__ */ jsxs("a", { className: "rounded-lg border border-border p-4 transition-colors hover:border-primary/50 hover:bg-primary/5", href: selectedProfessional.tradeLicenseUrl, target: "_blank", rel: "noreferrer", children: [
                  /* @__PURE__ */ jsx(ShieldCheck, { className: "mb-3 h-4 w-4 text-primary" }),
                  /* @__PURE__ */ jsx("p", { className: "font-medium", children: "Trade license" }),
                  /* @__PURE__ */ jsx("p", { className: "mt-1 truncate text-sm text-muted-foreground", children: "View uploaded license" })
                ] }) : null,
                selectedProfessional?.certifications?.map((cert, index) => /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-border p-4", children: [
                  /* @__PURE__ */ jsx(Award, { className: "mb-3 h-4 w-4 text-primary" }),
                  /* @__PURE__ */ jsx("p", { className: "font-medium", children: "Certification" }),
                  /* @__PURE__ */ jsx("p", { className: "mt-1 truncate text-sm text-muted-foreground", children: cert })
                ] }, `${cert}-${index}`))
              ] })
            ] }) : null,
            /* @__PURE__ */ jsxs("section", { className: "rounded-xl border border-border bg-card p-5 shadow-soft", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-base font-semibold", children: "Contact preview" }),
              /* @__PURE__ */ jsxs("div", { className: "mt-4 grid gap-3 sm:grid-cols-2", children: [
                /* @__PURE__ */ jsx(DetailTile, { label: "Email", value: selectedProfessional?.email || "Not added", icon: Mail }),
                /* @__PURE__ */ jsx(DetailTile, { label: "Phone", value: selectedProfessional?.phone || "Not added", icon: Phone })
              ] })
            ] }),
            selectedProfessional?.portfolio?.length ? /* @__PURE__ */ jsxs("section", { className: "rounded-xl border border-border bg-card p-5 shadow-soft", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-base font-semibold", children: "Portfolio" }),
              /* @__PURE__ */ jsx("div", { className: "mt-4 grid gap-3 sm:grid-cols-2", children: selectedProfessional.portfolio.slice(0, 4).map((p, i) => /* @__PURE__ */ jsxs("div", { className: "min-h-24 rounded-lg border border-border bg-muted/40 p-4", children: [
                /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: p?.tag || "Project" }),
                /* @__PURE__ */ jsx("div", { className: "mt-2 font-medium leading-5", children: p?.title || "Portfolio item" })
              ] }, i)) })
            ] }) : null
          ] }),
          /* @__PURE__ */ jsxs("aside", { className: "space-y-5", children: [
            /* @__PURE__ */ jsxs("section", { className: "rounded-xl border border-border bg-card p-5 shadow-soft", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-base font-semibold", children: "Pricing" }),
              /* @__PURE__ */ jsxs("div", { className: "mt-4 space-y-3 text-sm", children: [
                selectedProfessional?.hourlyRate ? /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-border px-3 py-2", children: [
                  /* @__PURE__ */ jsx("div", { className: "text-muted-foreground", children: "Hourly consulting" }),
                  /* @__PURE__ */ jsxs("div", { className: "mt-1 font-medium", children: [
                    "$",
                    selectedProfessional.hourlyRate,
                    "/hr"
                  ] })
                ] }) : null,
                selectedProfessional?.weeklyRate ? /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-border px-3 py-2", children: [
                  /* @__PURE__ */ jsx("div", { className: "text-muted-foreground", children: "Weekly retainer" }),
                  /* @__PURE__ */ jsxs("div", { className: "mt-1 font-medium", children: [
                    "$",
                    selectedProfessional.weeklyRate,
                    "/wk"
                  ] })
                ] }) : null,
                selectedProfessional?.fixedRate ? /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-border px-3 py-2", children: [
                  /* @__PURE__ */ jsx("div", { className: "text-muted-foreground", children: "Fixed scope project" }),
                  /* @__PURE__ */ jsxs("div", { className: "mt-1 font-medium", children: [
                    "From $",
                    selectedProfessional.fixedRate
                  ] })
                ] }) : null,
                !selectedProfessional?.hourlyRate && !selectedProfessional?.weeklyRate && !selectedProfessional?.fixedRate ? /* @__PURE__ */ jsx("p", { className: "rounded-lg border border-dashed border-border px-3 py-3 text-muted-foreground", children: "Pricing is not added yet." }) : null
              ] })
            ] }),
            /* @__PURE__ */ jsxs("section", { className: "rounded-xl border border-border bg-card p-5 shadow-soft", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-base font-semibold", children: "Service coverage" }),
              /* @__PURE__ */ jsxs("div", { className: "mt-4 space-y-3 text-sm", children: [
                /* @__PURE__ */ jsx(DetailTile, { label: "Area", value: formatApproximateLocation(selectedProfessional?.serviceArea, getProfessionalLocation(selectedProfessional)) }),
                /* @__PURE__ */ jsx(DetailTile, { label: "Approx. location", value: getProfessionalLocation(selectedProfessional) }),
                /* @__PURE__ */ jsx(DetailTile, { label: "Work mode", value: formatWorkModeLabel(selectedProfessional?.workMode) })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("section", { className: "rounded-xl border border-border bg-card p-5 shadow-soft", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("h3", { className: "text-base font-semibold", children: "Verification badges" }),
                  /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: selectedVerificationMeta.description })
                ] }),
                /* @__PURE__ */ jsx("span", { className: `shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${selectedVerificationMeta.badgeClass}`, children: selectedVerificationMeta.shortLabel })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "mt-4 grid gap-2", children: getVerificationBadgeRows(selectedProfessional?.verification).map((badge) => /* @__PURE__ */ jsx(VerificationBadgeRow, { icon: badge.icon, label: badge.label, done: badge.done }, badge.label)) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "sticky bottom-0 -mx-5 mt-6 flex flex-col gap-3 border-t border-border bg-background/95 px-5 py-4 backdrop-blur sm:-mx-7 sm:flex-row sm:items-center sm:justify-end sm:px-7", children: [
          /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: () => setIsSheetOpen(false), children: "Close" }),
          /* @__PURE__ */ jsx(Button, { type: "button", variant: "outline", onClick: () => openProfessionalMessage(user, selectedProfessional, navigate), children: "Message" }),
          /* @__PURE__ */ jsxs(Button, { className: "gap-2", onClick: async () => {
            setIsSheetOpen(false);
            if (selectedProfessional?.id) {
              await navigate({
                to: "/pro/$proId",
                params: {
                  proId: String(selectedProfessional.id)
                }
              });
            }
          }, children: [
            /* @__PURE__ */ jsx(UserRound, { className: "h-4 w-4" }),
            "View profile"
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(SiteFooter, {})
  ] });
}
function readSavedJobFilters(storageKey) {
  if (typeof window === "undefined") {
    return [];
  }
  try {
    const parsed = JSON.parse(window.localStorage.getItem(storageKey) || "[]");
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.slice(0, 5).filter(isSavedJobFilter);
  } catch {
    return [];
  }
}
function writeSavedJobFilters(storageKey, filters) {
  window.localStorage.setItem(storageKey, JSON.stringify(filters.slice(0, 5)));
}
function isSavedJobFilter(value) {
  if (!value || typeof value !== "object") {
    return false;
  }
  const filter = value;
  return Boolean(filter.id && filter.name && filter.filters);
}
function buildSavedJobFilterName(filters) {
  const parts = [filters.search.trim() ? `"${filters.search.trim()}"` : "", filters.city.trim() ? filters.city.trim() : "", filters.budgetMin.trim() ? `From $${Number(filters.budgetMin).toLocaleString()}` : "", filters.budgetMax.trim() ? `Up to $${Number(filters.budgetMax).toLocaleString()}` : "", filters.urgency !== "all" ? `${formatEnum(filters.urgency)} urgency` : "", filters.type !== "all" ? formatWorkMode(filters.type) : ""].filter(Boolean);
  return parts.length ? parts.slice(0, 3).join(" / ") : "All jobs";
}
function DetailTile({
  label,
  value,
  icon: Icon
}) {
  return /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-border bg-muted/50 p-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground", children: [
      Icon ? /* @__PURE__ */ jsx(Icon, { className: "h-3.5 w-3.5" }) : null,
      label
    ] }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 truncate text-sm font-semibold text-foreground", children: value })
  ] });
}
function ProfileMetric({
  icon: Icon,
  label,
  value,
  accent = "text-primary"
}) {
  return /* @__PURE__ */ jsxs("span", { className: "rounded-lg bg-muted px-3 py-2", children: [
    /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1 text-xs", children: [
      /* @__PURE__ */ jsx(Icon, { className: `h-3.5 w-3.5 ${accent}` }),
      label
    ] }),
    /* @__PURE__ */ jsx("span", { className: "mt-1 block truncate font-medium text-foreground", children: value })
  ] });
}
function VerificationBadge({
  icon: Icon,
  label
}) {
  return /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-full border border-primary/15 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary", children: [
    /* @__PURE__ */ jsx(Icon, { className: "h-3.5 w-3.5" }),
    label
  ] });
}
function VerificationBadgeRow({
  icon: Icon,
  label,
  done
}) {
  return /* @__PURE__ */ jsxs("div", { className: `flex items-center justify-between gap-3 rounded-lg border px-3 py-2 text-sm ${done ? "border-primary/15 bg-primary/5" : "border-border bg-muted/40"}`, children: [
    /* @__PURE__ */ jsxs("span", { className: "inline-flex min-w-0 items-center gap-2", children: [
      /* @__PURE__ */ jsx(Icon, { className: `h-4 w-4 shrink-0 ${done ? "text-primary" : "text-muted-foreground"}` }),
      /* @__PURE__ */ jsx("span", { className: "truncate font-medium text-foreground", children: label })
    ] }),
    /* @__PURE__ */ jsx("span", { className: `shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${done ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`, children: done ? "Displayed" : "Not added" })
  ] });
}
function getRatingLabel(professional) {
  const rating = Number(professional?.averageRating || professional?.rating || 0);
  const reviews = Number(professional?.reviewCount || professional?.reviewsCount || 0);
  return rating > 0 ? `${rating.toFixed(1)} (${reviews})` : "New profile";
}
function getProfessionalName(professional) {
  const name = professional?.fullName || `${professional?.firstName || ""} ${professional?.lastName || ""}`.trim();
  return name || professional?.companyName || "Professional profile";
}
function getProfessionalLocation(professional) {
  return formatApproximateLocation(professional?.professionalCity || professional?.serviceArea || professional?.city || professional?.address, "Location not added");
}
function formatJobLocation(job) {
  if (job.workMode === "REMOTE") {
    return "Remote job";
  }
  return formatApproximateLocation(job.locationAddress || job.locationLabel, "Location not set");
}
function formatAvailability(value) {
  if (!value) {
    return "Available now";
  }
  const normalized = value.toLowerCase();
  if (normalized === "available") {
    return "Available now";
  }
  if (normalized === "busy") {
    return "Busy";
  }
  if (normalized === "unavailable") {
    return "Unavailable";
  }
  return formatEnum(value);
}
function formatWorkModeLabel(value) {
  if (!value) {
    return "Remote and on-site";
  }
  const normalized = value.toLowerCase();
  if (normalized === "remote") {
    return "Remote";
  }
  if (normalized === "onsite" || normalized === "on_site") {
    return "On-site";
  }
  return "Remote and on-site";
}
function getVerificationMeta(status) {
  if (status === "approved") {
    return {
      label: "Verified professional",
      shortLabel: "Verified",
      description: "This professional passed verification review.",
      badgeClass: "bg-success/10 text-success"
    };
  }
  if (status === "pending") {
    return {
      label: "Verification pending",
      shortLabel: "Pending",
      description: "Documents are uploaded and waiting for review.",
      badgeClass: "bg-primary/10 text-primary"
    };
  }
  if (status === "rejected") {
    return {
      label: "Needs verification changes",
      shortLabel: "Needs changes",
      description: "Some submitted verification documents need updates.",
      badgeClass: "bg-destructive/10 text-destructive"
    };
  }
  return {
    label: "Not verified yet",
    shortLabel: "Not verified",
    description: "No verification documents are approved for display yet.",
    badgeClass: "bg-muted text-muted-foreground"
  };
}
function getVerificationBadgeRows(verification) {
  return [{
    label: "Government ID",
    icon: FileText,
    done: Boolean(verification?.governmentIdUrl)
  }, {
    label: "Trade license",
    icon: FileBadge,
    done: Boolean(verification?.licenseUrl)
  }, {
    label: "Certifications",
    icon: Award,
    done: Boolean(verification?.certifications?.length)
  }, {
    label: "Insurance",
    icon: ShieldCheck,
    done: Boolean(verification?.insuranceUrl)
  }, {
    label: "Selfie check",
    icon: Camera,
    done: Boolean(verification?.selfieUrl)
  }];
}
function getVerificationBadges(verification) {
  return getVerificationBadgeRows(verification).filter((badge) => badge.done);
}
function openProfessionalMessage(user, professional, navigate) {
  if (!professional?.id) {
    return;
  }
  if (!user || user.role !== "CLIENT" || typeof user.id !== "number") {
    void navigate({
      to: "/login",
      search: {
        returnTo: `/pro/${professional.id}`
      }
    });
    return;
  }
  rememberPendingProfessionalMessage(user.id, professional);
  void navigate({
    to: "/messages",
    search: buildProfessionalMessageSearch(user.id, professional)
  });
}
function buildProfessionalMessageSearch(clientId, professional) {
  const fullName = `${professional.firstName || ""} ${professional.lastName || ""}`.trim() || "this professional";
  return {
    conversationId: buildConversationId(clientId, professional.id),
    toUserId: String(professional.id),
    name: fullName,
    avatar: professional.avatarUrl || "",
    job: "Direct message",
    firstMessage: `Hi ${fullName}, I found your profile and would like to discuss hiring you.`
  };
}
function buildConversationId(clientId, professionalId) {
  return `client-${clientId}-pro-${professionalId}`;
}
function rememberPendingProfessionalMessage(clientId, professional) {
  if (typeof window === "undefined") {
    return;
  }
  const search = buildProfessionalMessageSearch(clientId, professional);
  const pending = {
    createdAt: Date.now(),
    conversation: {
      id: search.conversationId,
      otherUserId: Number(search.toUserId),
      otherUserName: search.name,
      otherUserAvatarUrl: search.avatar || null,
      job: search.job,
      preview: "Start conversation",
      time: "",
      unread: 0
    },
    firstMessage: search.firstMessage
  };
  sessionStorage.setItem("servio:pending-professional-message", JSON.stringify(pending));
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
function Home() {
  return /* @__PURE__ */ jsx(Landing, {});
}
export {
  Home as component
};
