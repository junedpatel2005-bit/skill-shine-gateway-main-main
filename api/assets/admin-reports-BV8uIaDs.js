import { jsxs, jsx } from "react/jsx-runtime";
import { useLoaderData, Link } from "@tanstack/react-router";
import { useState, useEffect, useMemo } from "react";
import { ShieldCheck, ReceiptText, Search, SlidersHorizontal, Loader2, TrendingUp, Clock3, Wallet, BriefcaseBusiness, Building2, Users } from "lucide-react";
import { A as AppShell, k as AdminPageHeader, B as Button, o as AdminSummaryCard, m as AdminSection, I as Input, c as cn, n as AdminEmptyState } from "./router-DyXkltGt.js";
import { P as Popover, a as PopoverTrigger, b as PopoverContent } from "./popover-ATrRvCCG.js";
import { R as ReportExportActions } from "./ReportExportActions-BT5_v9ec.js";
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
import "@radix-ui/react-popover";
function AdminReportsPage() {
  const data = useLoaderData({
    from: "/admin-reports"
  });
  const displayName = `${data.viewer?.firstName || ""} ${data.viewer?.lastName || ""}`.trim() || data.viewer?.email || "Admin";
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState("");
  const [summary, setSummary] = useState(null);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const [rowLoading, setRowLoading] = useState(false);
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [error, setError] = useState(null);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [filters, setFilters] = useState({
    from: "",
    to: "",
    search: "",
    status: "",
    category: "",
    userType: "",
    paymentStatus: "",
    jobStatus: ""
  });
  async function parseBackendJson(response) {
    const result = await response.json();
    return result?.data ?? result;
  }
  useEffect(() => {
    void loadTables();
  }, []);
  useEffect(() => {
    void loadSummary();
  }, [filters.from, filters.to]);
  useEffect(() => {
    if (!selectedTable) return;
    const timer = window.setTimeout(() => {
      void loadRows(1);
    }, 250);
    return () => window.clearTimeout(timer);
  }, [selectedTable, pageSize, filters.from, filters.to, filters.search, filters.status, filters.category, filters.userType, filters.paymentStatus, filters.jobStatus]);
  async function loadTables() {
    setTableLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/v1/reports/tables");
      if (!res.ok) throw new Error(await res.text().catch(() => res.statusText));
      const result = await parseBackendJson(res);
      if (result?.status === "connected") {
        const nextTables = Array.isArray(result.tables) ? result.tables : [];
        setTables(nextTables);
        if (!selectedTable && nextTables[0]) {
          setSelectedTable(nextTables[0].name);
        }
      } else {
        setError(result?.error || "The reports database is currently unavailable.");
      }
    } catch (err) {
      setError(`Unable to load report tables: ${err.message}`);
    } finally {
      setTableLoading(false);
    }
  }
  async function loadSummary() {
    setSummaryLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.from) params.set("from", filters.from);
      if (filters.to) params.set("to", filters.to);
      const res = await fetch(`/api/v1/reports/summary${params.toString() ? `?${params.toString()}` : ""}`);
      if (!res.ok) throw new Error(await res.text().catch(() => res.statusText));
      const result = await parseBackendJson(res);
      setSummary(result);
    } catch (err) {
      setError((current) => current ?? `Unable to load summary cards: ${err.message}`);
    } finally {
      setSummaryLoading(false);
    }
  }
  async function loadRows(pageNumber = 1) {
    if (!selectedTable) return;
    setRowLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/v1/reports/preview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          table: selectedTable,
          page: pageNumber,
          pageSize,
          filters: {
            from: filters.from,
            to: filters.to,
            search: filters.search,
            status: filters.status,
            category: filters.category,
            userType: filters.userType,
            paymentStatus: filters.paymentStatus,
            jobStatus: filters.jobStatus
          }
        })
      });
      if (!res.ok) throw new Error(await res.text().catch(() => res.statusText));
      const result = await parseBackendJson(res);
      setColumns(result.columns || []);
      setRows(result.rows || []);
      setTotalRows(result.total || 0);
      setPage(result.page || pageNumber);
    } catch (err) {
      setError(`Unable to load rows: ${err.message}`);
    } finally {
      setRowLoading(false);
    }
  }
  function printReport() {
    if (!selectedTable) return;
    const reportRows = sortedRows.map((row) => {
      return columns.map((column) => `${column}: ${String(row[column] ?? "")}`).join(" | ");
    });
    const printWindow = window.open("", "_blank", "noopener,noreferrer");
    if (!printWindow) return;
    printWindow.document.write(`<!doctype html><html><head><title>${selectedTable} report</title><style>body{font-family:Arial,sans-serif;padding:24px}table{width:100%;border-collapse:collapse}th,td{border:1px solid #ddd;padding:8px;font-size:12px}th{background:#f8fafc}</style></head><body><h1>${selectedTable} report</h1><p>Generated on ${(/* @__PURE__ */ new Date()).toLocaleString()}</p><table><thead><tr>${columns.map((column) => `<th>${column}</th>`).join("")}</tr></thead><tbody>${reportRows.map((row) => `<tr><td>${row.replace(/\|/g, "</td><td>")}</td></tr>`).join("")}</tbody></table></body></html>`);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  }
  const pageCount = Math.max(1, Math.ceil(totalRows / pageSize));
  const sortedRows = useMemo(() => {
    if (!sortColumn) return rows;
    const copy = [...rows];
    copy.sort((left, right) => {
      const a = left[sortColumn];
      const b = right[sortColumn];
      if (typeof a === "number" && typeof b === "number") {
        return sortDirection === "asc" ? a - b : b - a;
      }
      const leftValue = String(a ?? "");
      const rightValue = String(b ?? "");
      return sortDirection === "asc" ? leftValue.localeCompare(rightValue) : rightValue.localeCompare(leftValue);
    });
    return copy;
  }, [rows, sortColumn, sortDirection]);
  function toggleSort(column) {
    if (sortColumn === column) {
      setSortDirection((current) => current === "asc" ? "desc" : "asc");
      return;
    }
    setSortColumn(column);
    setSortDirection("asc");
  }
  function getIcon(iconName) {
    switch (iconName) {
      case "Users":
        return Users;
      case "Building2":
        return Building2;
      case "BriefcaseBusiness":
        return BriefcaseBusiness;
      case "ReceiptText":
        return ReceiptText;
      case "Wallet":
        return Wallet;
      case "Clock3":
        return Clock3;
      default:
        return TrendingUp;
    }
  }
  const userAvatarUrl = data.viewer?.email ? "https://i.pravatar.cc/100?u=" + data.viewer.email : void 0;
  return /* @__PURE__ */ jsxs(AppShell, { userName: displayName, userRole: "Admin", userAvatarUrl, children: [
    /* @__PURE__ */ jsx(AdminPageHeader, { title: "Platform Data Reports", description: "Visualize system metrics and extract detailed database records for analysis.", breadcrumbs: [{
      label: "System Reports"
    }], actions: /* @__PURE__ */ jsx(Button, { asChild: true, variant: "outline", children: /* @__PURE__ */ jsx(Link, { to: "/admin", children: "Back to admin" }) }) }),
    error && /* @__PURE__ */ jsxs("div", { className: "mb-6 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700 font-bold flex items-center gap-2 animate-in fade-in duration-300", children: [
      /* @__PURE__ */ jsx(ShieldCheck, { className: "h-4 w-4" }),
      error
    ] }),
    summaryLoading ? /* @__PURE__ */ jsx("div", { className: "mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4", children: Array.from({
      length: 4
    }).map((_, index) => /* @__PURE__ */ jsx("div", { className: "h-32 rounded-2xl border border-border bg-card animate-pulse" }, index)) }) : summary?.cards?.length ? /* @__PURE__ */ jsx("div", { className: "mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4", children: summary.cards.map((card, index) => /* @__PURE__ */ jsx(AdminSummaryCard, { icon: getIcon(card.icon), label: card.title, value: card.value, caption: card.subtitle }, `${card.title}-${index}`)) }) : null,
    /* @__PURE__ */ jsxs(AdminSection, { title: "Report Builder & Explorer", description: "Choose a database table, apply filters, and generate custom exports.", icon: ReceiptText, actions: /* @__PURE__ */ jsx(ReportExportActions, { table: selectedTable, reportName: `${selectedTable}-report`, filters, onPrint: printReport }), children: [
      /* @__PURE__ */ jsx("div", { className: "p-6 bg-muted/20 border-b border-border", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1", children: "Database Table" }),
          /* @__PURE__ */ jsxs("select", { value: selectedTable, onChange: (event) => {
            setSelectedTable(event.target.value);
            setPage(1);
          }, className: "w-full h-11 rounded-xl border border-border bg-background px-4 py-0 text-sm font-bold text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20", children: [
            tableLoading ? /* @__PURE__ */ jsx("option", { value: "", children: "Loading..." }) : null,
            tables.map((table) => /* @__PURE__ */ jsx("option", { value: table.name, children: table.label || table.name }, table.name))
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1", children: "Quick Search" }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
            /* @__PURE__ */ jsx(Input, { value: filters.search, onChange: (event) => setFilters((current) => ({
              ...current,
              search: event.target.value
            })), placeholder: "Filter records...", className: "h-11 pl-9 rounded-xl bg-background border-border shadow-sm" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1", children: "Date Range (Start)" }),
          /* @__PURE__ */ jsx(Input, { type: "date", value: filters.from, onChange: (event) => setFilters((current) => ({
            ...current,
            from: event.target.value
          })), className: "h-11 rounded-xl bg-background border-border shadow-sm" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1", children: "More Filters" }),
          /* @__PURE__ */ jsxs(Popover, { children: [
            /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { variant: "outline", className: "h-11 w-full rounded-xl font-bold bg-background border-border shadow-sm", children: [
              /* @__PURE__ */ jsx(SlidersHorizontal, { className: "mr-2 h-4 w-4" }),
              "Advanced Filters"
            ] }) }),
            /* @__PURE__ */ jsx(PopoverContent, { className: "w-80 p-6 rounded-2xl shadow-2xl border-border", align: "end", children: /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs font-bold uppercase tracking-widest text-muted-foreground", children: "Additional Query Filters" }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold uppercase tracking-widest text-muted-foreground", children: "Status" }),
                  /* @__PURE__ */ jsx(Input, { value: filters.status, onChange: (event) => setFilters((current) => ({
                    ...current,
                    status: event.target.value
                  })), placeholder: "e.g. OPEN, DRAFT", className: "h-9 rounded-lg text-sm" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold uppercase tracking-widest text-muted-foreground", children: "Category" }),
                  /* @__PURE__ */ jsx(Input, { value: filters.category, onChange: (event) => setFilters((current) => ({
                    ...current,
                    category: event.target.value
                  })), placeholder: "e.g. Design, Dev", className: "h-9 rounded-lg text-sm" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold uppercase tracking-widest text-muted-foreground", children: "User Type" }),
                  /* @__PURE__ */ jsx(Input, { value: filters.userType, onChange: (event) => setFilters((current) => ({
                    ...current,
                    userType: event.target.value
                  })), placeholder: "CLIENT / PROFESSIONAL", className: "h-9 rounded-lg text-sm" })
                ] })
              ] }),
              /* @__PURE__ */ jsx(Button, { variant: "secondary", className: "w-full rounded-xl font-bold h-10 mt-2", onClick: () => setFilters({
                from: filters.from,
                to: filters.to,
                search: filters.search,
                status: "",
                category: "",
                userType: "",
                paymentStatus: "",
                jobStatus: ""
              }), children: "Clear All Extra Filters" })
            ] }) })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "bg-background", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-between gap-4 px-6 py-4 bg-muted/10 border-b border-border", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("p", { className: "text-sm font-bold text-foreground flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("div", { className: "h-2 w-2 rounded-full bg-emerald-500" }),
              selectedTable ? `Table: ${selectedTable}` : "Choose a table to begin"
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground font-medium mt-0.5", children: [
              totalRows.toLocaleString(),
              " total records found"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("select", { value: pageSize, onChange: (event) => {
              setPageSize(Number(event.target.value));
              setPage(1);
            }, className: "rounded-xl border border-border bg-background px-3 py-2 text-xs font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20", children: [10, 25, 50, 100].map((size) => /* @__PURE__ */ jsxs("option", { value: size, children: [
              size,
              " per page"
            ] }, size)) }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-1", children: [
              /* @__PURE__ */ jsx(Button, { type: "button", variant: "outline", size: "sm", className: "h-9 rounded-xl font-bold", onClick: () => loadRows(Math.max(1, page - 1)), disabled: rowLoading || page <= 1, children: "Prev" }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center px-4 bg-muted/30 rounded-xl text-xs font-bold tabular-nums", children: [
                page,
                " / ",
                pageCount
              ] }),
              /* @__PURE__ */ jsx(Button, { type: "button", variant: "outline", size: "sm", className: "h-9 rounded-xl font-bold", onClick: () => loadRows(Math.min(pageCount, page + 1)), disabled: rowLoading || page >= pageCount, children: "Next" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "overflow-x-auto min-h-[400px]", children: rowLoading && rows.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center gap-4 py-24", children: [
          /* @__PURE__ */ jsx(Loader2, { className: "h-10 w-10 animate-spin text-primary/40" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-muted-foreground uppercase tracking-widest", children: "Fetching Dataset..." })
        ] }) : rows.length > 0 ? /* @__PURE__ */ jsxs("table", { className: "w-full text-sm border-collapse", children: [
          /* @__PURE__ */ jsx("thead", { className: "bg-muted/50 text-left border-b border-border", children: /* @__PURE__ */ jsx("tr", { children: columns.map((column) => /* @__PURE__ */ jsx("th", { className: "group cursor-pointer whitespace-nowrap px-6 py-4 font-bold text-[10px] uppercase tracking-[0.15em] text-muted-foreground hover:text-primary transition-colors", onClick: () => toggleSort(column), children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            column,
            sortColumn === column ? /* @__PURE__ */ jsx(TrendingUp, { className: cn("h-3 w-3 transition-transform", sortDirection === "desc" && "rotate-180") }) : /* @__PURE__ */ jsx(TrendingUp, { className: "h-3 w-3 opacity-0 group-hover:opacity-30 transition-opacity" })
          ] }) }, column)) }) }),
          /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-border", children: sortedRows.map((row, index) => /* @__PURE__ */ jsx("tr", { className: "hover:bg-muted/30 transition-colors", children: columns.map((column) => /* @__PURE__ */ jsx("td", { className: "max-w-[300px] truncate px-6 py-4 text-foreground font-medium", children: String(row[column] ?? "-") }, `${column}-${index}`)) }, `${selectedTable}-${index}`)) })
        ] }) : /* @__PURE__ */ jsx(AdminEmptyState, { title: "No report data available", description: "No records matched your selection or filters. Try choosing a different table or clearing your search.", icon: ShieldCheck }) })
      ] })
    ] })
  ] });
}
export {
  AdminReportsPage as component
};
