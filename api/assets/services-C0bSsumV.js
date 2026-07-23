import { jsxs, jsx } from "react/jsx-runtime";
import { useNavigate, Link, useLoaderData } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { S as SiteHeader, I as Input, q as Select, r as SelectTrigger, s as SelectValue, t as SelectContent, u as SelectItem, B as Button, g as Badge, i as SiteFooter } from "./router-DyXkltGt.js";
import { Search, X, MapPin, Filter, HeartPulse, Briefcase, Music, Truck, Sparkles, Hammer, GraduationCap, Megaphone, Camera, Paintbrush, Code, Wrench } from "lucide-react";
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
const ICON_MAP = {
  Wrench,
  Code,
  Paintbrush,
  Camera,
  Megaphone,
  GraduationCap,
  Hammer,
  Sparkles,
  Truck,
  Music,
  Briefcase,
  HeartPulse
};
function buildDiscoverSearch(category, extra) {
  const params = {};
  if (category) params.category = category;
  if (extra) Object.assign(params, extra);
  return params;
}
function ServicesPageContent({
  categories,
  totalPros
}) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [ratingFilters, setRatingFilters] = useState([]);
  const [distanceFilters, setDistanceFilters] = useState([]);
  const [availabilityFilters, setAvailabilityFilters] = useState([]);
  const [otherFilters, setOtherFilters] = useState(/* @__PURE__ */ new Set());
  const hasActiveFilters = searchQuery || locationQuery || selectedCategory || ratingFilters.length || distanceFilters.length || availabilityFilters.length || otherFilters.size > 0;
  const filteredCategories = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return categories;
    return categories.filter((c) => c.name.toLowerCase().includes(q));
  }, [categories, searchQuery]);
  function toggleRating(value) {
    setRatingFilters(
      (prev) => prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  }
  function toggleDistance(value) {
    setDistanceFilters(
      (prev) => prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  }
  function toggleAvailability(value) {
    setAvailabilityFilters(
      (prev) => prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  }
  function toggleOther(value) {
    setOtherFilters((prev) => {
      const next = new Set(prev);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });
  }
  function clearAllFilters() {
    setSearchQuery("");
    setLocationQuery("");
    setSelectedCategory("");
    setRatingFilters([]);
    setDistanceFilters([]);
    setAvailabilityFilters([]);
    setOtherFilters(/* @__PURE__ */ new Set());
  }
  function handleSearch() {
    const extra = {};
    if (locationQuery.trim()) extra.location = locationQuery.trim();
    if (otherFilters.has("Verified only")) extra.verifiedOnly = "true";
    if (otherFilters.has("Remote")) extra.workMode = "REMOTE";
    if (otherFilters.has("On-site")) extra.workMode = "ON_SITE";
    if (ratingFilters.length > 0)
      extra.rating = Math.min(...ratingFilters.map(parseRating)).toString();
    navigate({
      to: "/discover",
      search: buildDiscoverSearch(
        selectedCategory || void 0,
        Object.keys(extra).length ? extra : void 0
      )
    });
  }
  const appliedFilterCount = ratingFilters.length + distanceFilters.length + availabilityFilters.length + otherFilters.size;
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsx(SiteHeader, {}),
    /* @__PURE__ */ jsx("section", { className: "border-b border-border bg-surface", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsx("h1", { className: "font-display text-3xl font-bold tracking-tight md:text-4xl", children: "Browse all services" }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-muted-foreground", children: "Find exactly the type of pro you need." }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6 grid gap-2 rounded-2xl border border-border bg-card p-2 shadow-soft sm:grid-cols-[1fr_1fr_auto_auto]", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 rounded-xl px-3", children: [
          /* @__PURE__ */ jsx(Search, { className: "h-4 w-4 text-muted-foreground shrink-0" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              placeholder: "Search services",
              value: searchQuery,
              onChange: (e) => setSearchQuery(e.target.value),
              className: "border-0 shadow-none focus-visible:ring-0"
            }
          ),
          searchQuery ? /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setSearchQuery(""),
              className: "grid h-6 w-6 place-items-center rounded-md text-muted-foreground hover:bg-muted",
              children: /* @__PURE__ */ jsx(X, { className: "h-3.5 w-3.5" })
            }
          ) : null
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 rounded-xl px-3 sm:border-l sm:border-border", children: [
          /* @__PURE__ */ jsx(MapPin, { className: "h-4 w-4 text-muted-foreground shrink-0" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              placeholder: "Location",
              value: locationQuery,
              onChange: (e) => setLocationQuery(e.target.value),
              className: "border-0 shadow-none focus-visible:ring-0"
            }
          ),
          locationQuery ? /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setLocationQuery(""),
              className: "grid h-6 w-6 place-items-center rounded-md text-muted-foreground hover:bg-muted",
              children: /* @__PURE__ */ jsx(X, { className: "h-3.5 w-3.5" })
            }
          ) : null
        ] }),
        /* @__PURE__ */ jsxs(Select, { value: selectedCategory, onValueChange: setSelectedCategory, children: [
          /* @__PURE__ */ jsx(SelectTrigger, { className: "rounded-xl border-border", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "All categories" }) }),
          /* @__PURE__ */ jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsx(SelectItem, { value: "all", children: "All categories" }),
            categories.map((c) => /* @__PURE__ */ jsx(SelectItem, { value: c.name, children: c.name }, c.slug))
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Button, { className: "rounded-xl bg-primary", onClick: handleSearch, children: [
          /* @__PURE__ */ jsx(Search, { className: "h-4 w-4" }),
          "Search"
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[260px_1fr] lg:px-8", children: [
      /* @__PURE__ */ jsx("aside", { className: "space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-border bg-card p-5 shadow-soft", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-display font-semibold", children: "Filters" }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            appliedFilterCount > 0 ? /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "rounded-full px-2 text-xs", children: appliedFilterCount }) : null,
            /* @__PURE__ */ jsx(Filter, { className: "h-4 w-4 text-muted-foreground" })
          ] })
        ] }),
        hasActiveFilters ? /* @__PURE__ */ jsx("div", { className: "mt-3", children: /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: clearAllFilters,
            className: "text-xs text-primary hover:underline",
            children: "Clear all filters"
          }
        ) }) : null,
        /* @__PURE__ */ jsx(
          FilterGroup,
          {
            title: "Rating",
            options: ["4.5 & up", "4.0 & up", "3.5 & up"],
            selected: ratingFilters,
            onToggle: toggleRating
          }
        ),
        /* @__PURE__ */ jsx(
          FilterGroup,
          {
            title: "Distance",
            options: ["Within 2 km", "Within 5 km", "Within 10 km", "Any"],
            selected: distanceFilters,
            onToggle: toggleDistance
          }
        ),
        /* @__PURE__ */ jsx(
          FilterGroup,
          {
            title: "Availability",
            options: ["Now", "This week", "Next week"],
            selected: availabilityFilters,
            onToggle: toggleAvailability
          }
        ),
        /* @__PURE__ */ jsx(
          FilterGroup,
          {
            title: "Other",
            options: ["Verified only", "Remote", "On-site"],
            selected: Array.from(otherFilters),
            onToggle: (value) => toggleOther(value)
          }
        ),
        /* @__PURE__ */ jsxs(Button, { className: "mt-4 w-full bg-primary", onClick: handleSearch, children: [
          /* @__PURE__ */ jsx(Search, { className: "h-4 w-4" }),
          appliedFilterCount > 0 ? `Apply ${appliedFilterCount} filter${appliedFilterCount > 1 ? "s" : ""}` : "Apply filters"
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxs("span", { className: "font-semibold text-foreground", children: [
            filteredCategories.length,
            " categor",
            filteredCategories.length === 1 ? "y" : "ies"
          ] }),
          totalPros > 0 ? /* @__PURE__ */ jsxs("span", { children: [
            " · ",
            totalPros.toLocaleString(),
            " pros"
          ] }) : null
        ] }),
        filteredCategories.length ? /* @__PURE__ */ jsx("div", { className: "mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3", children: filteredCategories.map((c) => {
          const IconComponent = ICON_MAP[c.iconName] || null;
          return /* @__PURE__ */ jsxs(
            Link,
            {
              to: "/discover",
              search: { category: c.name },
              className: "group flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-card",
              children: [
                /* @__PURE__ */ jsx("div", { className: "grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground", children: IconComponent ? /* @__PURE__ */ jsx(IconComponent, { className: "h-6 w-6" }) : null }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "font-display text-base font-semibold", children: c.name }),
                  /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground", children: [
                    c.proCount.toLocaleString(),
                    " professional",
                    c.proCount === 1 ? "" : "s"
                  ] }),
                  c.jobCount > 0 ? /* @__PURE__ */ jsxs("p", { className: "mt-0.5 text-xs text-muted-foreground", children: [
                    c.jobCount,
                    " open job",
                    c.jobCount === 1 ? "" : "s"
                  ] }) : null,
                  /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs text-primary opacity-0 transition-opacity group-hover:opacity-100", children: "Browse pros →" })
                ] })
              ]
            },
            c.name
          );
        }) }) : /* @__PURE__ */ jsxs("div", { className: "mt-10 text-center", children: [
          /* @__PURE__ */ jsx(Search, { className: "mx-auto h-8 w-8 text-muted-foreground" }),
          /* @__PURE__ */ jsx("h3", { className: "mt-3 font-semibold", children: "No categories match" }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Try a different search term or clear your filters." }),
          /* @__PURE__ */ jsxs(Button, { variant: "outline", className: "mt-4", onClick: clearAllFilters, children: [
            /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
            "Clear filters"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(SiteFooter, {})
  ] });
}
function parseRating(label) {
  if (label.startsWith("4.5")) return 4.5;
  if (label.startsWith("4.0")) return 4;
  if (label.startsWith("3.5")) return 3.5;
  return 0;
}
function FilterGroup({
  title,
  options,
  selected,
  onToggle
}) {
  return /* @__PURE__ */ jsxs("div", { className: "mt-5 border-t border-border pt-4", children: [
    /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: title }),
    /* @__PURE__ */ jsx("div", { className: "mt-3 space-y-2", children: options.map((o) => /* @__PURE__ */ jsxs("label", { className: "flex cursor-pointer items-center gap-2 text-sm", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "checkbox",
          checked: selected.includes(o),
          onChange: () => onToggle(o),
          className: "h-4 w-4 rounded border-border accent-primary"
        }
      ),
      o
    ] }, o)) })
  ] });
}
function Services() {
  const {
    categories,
    totalPros
  } = useLoaderData({
    from: "/services"
  });
  return /* @__PURE__ */ jsx(ServicesPageContent, { categories, totalPros });
}
export {
  Services as component
};
