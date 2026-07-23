import { jsx, jsxs } from "react/jsx-runtime";
import { useLoaderData, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { ShieldCheck, RefreshCw, Search, X, FileText, FileSpreadsheet, FileJson, Loader2, Table2, ArrowLeft, ArrowRight } from "lucide-react";
import { B as Button, A as AppShell, I as Input } from "./router-DyXkltGt.js";
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
function ReportsPage() {
  const data = useLoaderData({
    from: "/reports"
  });
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState("");
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [totalRows, setTotalRows] = useState(0);
  const [search, setSearch] = useState("");
  const [filterId, setFilterId] = useState("");
  const [filterPo, setFilterPo] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(null);
  const [error, setError] = useState(null);
  const canLoad = Boolean(data.viewer && ["ADMIN", "PROFESSIONAL", "CLIENT"].includes(data.viewer.role));
  const displayName = `${data.viewer?.firstName || ""} ${data.viewer?.lastName || ""}`.trim() || data.viewer?.email || "User";
  const roleLabel = data.viewer?.role === "PROFESSIONAL" ? "Professional" : data.viewer?.role === "CLIENT" ? "Client" : "Admin";
  const pageCount = Math.max(1, Math.ceil(totalRows / pageSize));
  useEffect(() => {
    if (canLoad) {
      fetchTables();
    }
  }, [canLoad]);
  useEffect(() => {
    if (!selectedTable) return;
    const timer = setTimeout(() => {
      loadPreview(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [selectedTable, pageSize, from, to, search, filterId, filterPo]);
  async function fetchTables() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/v1/reports/tables");
      if (!res.ok) throw new Error(await res.text());
      const result = await res.json();
      const tableList = (result?.tables || []).map((table) => ({
        name: table.name,
        rows: Number(table.rows ?? 0),
        primaryKey: table.primaryKey || "id"
      }));
      setTables(tableList);
      if (!selectedTable && tableList.length > 0) {
        setSelectedTable(tableList[0].name);
      }
    } catch (err) {
      setError(`Failed to fetch tables: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }
  async function loadPreview(pageNumber = 1) {
    if (!selectedTable) return;
    setLoading(true);
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
            from,
            to,
            search,
            id: filterId ? Number(filterId) : void 0,
            po: filterPo || void 0
          }
        })
      });
      if (!res.ok) throw new Error(await res.text());
      const result = await res.json();
      setColumns(result.columns || []);
      setRows(result.rows || []);
      setTotalRows(result.total || 0);
      setPage(result.page || pageNumber);
    } catch (err) {
      setError(`Failed to load preview: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }
  async function download(format) {
    if (!selectedTable) return;
    setDownloading(format);
    setError(null);
    try {
      const res = await fetch("/api/v1/reports/download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          table: selectedTable,
          format,
          filters: {
            from,
            to,
            search,
            id: filterId ? Number(filterId) : void 0,
            po: filterPo || void 0
          },
          reportName: `${selectedTable}-export`
        })
      });
      if (!res.ok) throw new Error(await res.text());
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      const extension = format === "EXCEL" ? "xls" : format.toLowerCase();
      link.download = `${selectedTable}-export.${extension}`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(`Download failed: ${err.message}`);
    } finally {
      setDownloading(null);
    }
  }
  if (!canLoad) {
    return /* @__PURE__ */ jsx("div", { className: "grid min-h-screen place-items-center bg-slate-50", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx(ShieldCheck, { className: "mx-auto h-12 w-12 text-slate-400" }),
      /* @__PURE__ */ jsx("h1", { className: "mt-4 text-xl font-bold", children: "Access Denied" }),
      /* @__PURE__ */ jsx(Button, { asChild: true, className: "mt-4", children: /* @__PURE__ */ jsx(Link, { to: "/", children: "Back to Home" }) })
    ] }) });
  }
  return /* @__PURE__ */ jsx(AppShell, { title: "Reports", userName: displayName, userRole: roleLabel, children: /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-slate-50 p-6 lg:p-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-8 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold tracking-tight text-slate-900", children: "Reports" }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-500", children: "View and export database records." })
      ] }),
      /* @__PURE__ */ jsxs(Button, { onClick: () => fetchTables(), variant: "outline", className: "gap-2", children: [
        /* @__PURE__ */ jsx(RefreshCw, { className: `h-4 w-4 ${loading ? "animate-spin" : ""}` }),
        "Refresh"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-6 lg:grid-cols-[300px_1fr]", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-slate-200 bg-white p-6 shadow-sm", children: [
          /* @__PURE__ */ jsx("h3", { className: "mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500", children: "Configuration" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "mb-1 block text-xs font-medium text-slate-700", children: "Select Table" }),
              /* @__PURE__ */ jsxs("select", { value: selectedTable, onChange: (e) => {
                setSelectedTable(e.target.value);
                setPage(1);
              }, className: "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none", children: [
                /* @__PURE__ */ jsx("option", { value: "", children: "Choose a table..." }),
                tables.map((table) => /* @__PURE__ */ jsxs("option", { value: table.name, children: [
                  table.name,
                  " (",
                  table.rows,
                  ")"
                ] }, table.name))
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "mb-1 block text-xs font-medium text-slate-700", children: "ID" }),
                /* @__PURE__ */ jsx(Input, { type: "number", placeholder: "ID", value: filterId, onChange: (e) => setFilterId(e.target.value) })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "mb-1 block text-xs font-medium text-slate-700", children: "PO" }),
                /* @__PURE__ */ jsx(Input, { placeholder: "PO #", value: filterPo, onChange: (e) => setFilterPo(e.target.value) })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "mb-1 block text-xs font-medium text-slate-700", children: "Search" }),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" }),
                /* @__PURE__ */ jsx(Input, { className: "pl-9", placeholder: "Keyword...", value: search, onChange: (e) => setSearch(e.target.value) })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "mb-1 block text-xs font-medium text-slate-700", children: "From" }),
                /* @__PURE__ */ jsx(Input, { type: "date", value: from, onChange: (e) => setFrom(e.target.value) })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "mb-1 block text-xs font-medium text-slate-700", children: "To" }),
                /* @__PURE__ */ jsx(Input, { type: "date", value: to, onChange: (e) => setTo(e.target.value) })
              ] })
            ] }),
            /* @__PURE__ */ jsxs(Button, { variant: "ghost", className: "w-full text-xs text-slate-500 hover:text-red-600", onClick: () => {
              setSearch("");
              setFilterId("");
              setFilterPo("");
              setFrom("");
              setTo("");
            }, children: [
              /* @__PURE__ */ jsx(X, { className: "mr-2 h-3 w-3" }),
              "Clear Filters"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-slate-200 bg-white p-6 shadow-sm", children: [
          /* @__PURE__ */ jsx("h3", { className: "mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500", children: "Export" }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
            /* @__PURE__ */ jsxs(Button, { variant: "outline", size: "sm", onClick: () => download("PDF"), disabled: !selectedTable || !!downloading, children: [
              /* @__PURE__ */ jsx(FileText, { className: "mr-2 h-4 w-4 text-red-500" }),
              "PDF"
            ] }),
            /* @__PURE__ */ jsxs(Button, { variant: "outline", size: "sm", onClick: () => download("CSV"), disabled: !selectedTable || !!downloading, children: [
              /* @__PURE__ */ jsx(FileSpreadsheet, { className: "mr-2 h-4 w-4 text-green-500" }),
              "CSV"
            ] }),
            /* @__PURE__ */ jsxs(Button, { variant: "outline", size: "sm", onClick: () => download("JSON"), disabled: !selectedTable || !!downloading, children: [
              /* @__PURE__ */ jsx(FileJson, { className: "mr-2 h-4 w-4 text-purple-500" }),
              "JSON"
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        error && /* @__PURE__ */ jsx("div", { className: "rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800", children: error }),
        /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden", children: [
          /* @__PURE__ */ jsx("div", { className: "border-b border-slate-100 px-6 py-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-semibold text-slate-900", children: selectedTable ? `Preview: ${selectedTable}` : "Select a table to preview" }),
            /* @__PURE__ */ jsxs("div", { className: "text-xs text-slate-500", children: [
              totalRows.toLocaleString(),
              " total records"
            ] })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "overflow-x-auto max-h-[600px]", children: loading && rows.length === 0 ? /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center py-20", children: /* @__PURE__ */ jsx(Loader2, { className: "h-8 w-8 animate-spin text-blue-500" }) }) : rows.length > 0 ? /* @__PURE__ */ jsxs("table", { className: "w-full text-left text-sm", children: [
            /* @__PURE__ */ jsx("thead", { className: "sticky top-0 bg-slate-50 text-slate-700", children: /* @__PURE__ */ jsx("tr", { children: columns.map((col) => /* @__PURE__ */ jsx("th", { className: "whitespace-nowrap px-6 py-3 font-semibold border-b border-slate-200", children: col }, col)) }) }),
            /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-slate-100", children: rows.map((row, i) => /* @__PURE__ */ jsx("tr", { className: "hover:bg-slate-50 transition-colors", children: columns.map((col) => /* @__PURE__ */ jsx("td", { className: "px-6 py-3 text-slate-600", children: row[col] === null ? "-" : String(row[col]) }, col)) }, i)) })
          ] }) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center py-20 text-slate-400", children: [
            /* @__PURE__ */ jsx(Table2, { className: "mb-2 h-12 w-12 opacity-20" }),
            /* @__PURE__ */ jsx("p", { children: "No records found." })
          ] }) }),
          pageCount > 1 && /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-t border-slate-100 bg-slate-50 px-6 py-3", children: [
            /* @__PURE__ */ jsxs("span", { className: "text-xs text-slate-500", children: [
              "Page ",
              page,
              " of ",
              pageCount
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsx(Button, { variant: "outline", size: "sm", disabled: page <= 1 || loading, onClick: () => loadPreview(page - 1), children: /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ jsx(Button, { variant: "outline", size: "sm", disabled: page >= pageCount || loading, onClick: () => loadPreview(page + 1), children: /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" }) })
            ] })
          ] })
        ] })
      ] })
    ] })
  ] }) });
}
export {
  ReportsPage as component
};
