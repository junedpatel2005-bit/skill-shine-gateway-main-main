import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect, useMemo } from "react";
import { DollarSign, BriefcaseBusiness, Clock3, Users, FileText, Search, SlidersHorizontal, Loader2, TrendingUp, Table2 } from "lucide-react";
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, PieChart, Pie, Cell } from "recharts";
import { I as Input, B as Button } from "./router-DyXkltGt.js";
import { P as Popover, a as PopoverTrigger, b as PopoverContent } from "./popover-ATrRvCCG.js";
import { R as ReportExportActions } from "./ReportExportActions-BT5_v9ec.js";
function UserPersonalReports({ userRole, userId, userName }) {
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState("");
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [filters, setFilters] = useState({
    from: "",
    to: "",
    search: "",
    status: "",
    category: ""
  });
  const [summary, setSummary] = useState(null);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const pageCount = Math.max(1, Math.ceil(totalRows / pageSize));
  useEffect(() => {
    void loadTables();
  }, []);
  useEffect(() => {
    if (!selectedTable) return;
    const timer = setTimeout(() => {
      loadPreview(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [selectedTable, pageSize, filters.from, filters.to, filters.search, filters.status, filters.category]);
  useEffect(() => {
    void loadSummary();
  }, [userRole, filters.from, filters.to]);
  async function parseBackendJson(response) {
    const result = await response.json();
    return result?.data ?? result;
  }
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
      console.error("Failed to load summary:", err);
      setError((current) => current ?? `Failed to load summary: ${err.message}`);
    } finally {
      setSummaryLoading(false);
    }
  }
  async function loadPreview(pageNumber = 1) {
    if (!selectedTable) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/v1/reports/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          table: selectedTable,
          page: pageNumber,
          pageSize,
          filters: {
            from: filters.from,
            to: filters.to,
            search: filters.search,
            status: filters.status,
            category: filters.category
          }
        })
      });
      if (!res.ok) {
        throw new Error(await res.text().catch(() => res.statusText));
      }
      const result = await parseBackendJson(res);
      setColumns(result.columns || []);
      setRows(result.rows || []);
      setTotalRows(result.total || 0);
      setPage(result.page || pageNumber);
    } catch (err) {
      console.error("Failed to load preview:", err);
      setError(`Failed to load data: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }
  function printReport() {
    if (!selectedTable) return;
    const printWindow = window.open("", "_blank", "noopener,noreferrer");
    if (!printWindow) return;
    const reportRows = sortedRows.length ? sortedRows.map((row) => `<tr>${columns.map((column) => `<td>${String(row[column] ?? "-")}</td>`).join("")}</tr>`).join("") : `<tr><td colspan="${columns.length || 1}">No records to display.</td></tr>`;
    printWindow.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>${selectedTable} report</title><style>body{font-family:Arial,sans-serif;padding:24px}table{width:100%;border-collapse:collapse}th,td{border:1px solid #d1d5db;padding:8px;font-size:12px}th{background:#f3f4f6}</style></head><body><h1>${selectedTable} report</h1><p>Generated on ${(/* @__PURE__ */ new Date()).toLocaleString()}</p><table><thead><tr>${columns.map((column) => `<th>${column}</th>`).join("")}</tr></thead><tbody>${reportRows}</tbody></table></body></html>`);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  }
  const lineData = useMemo(
    () => (summary?.charts?.monthlyEarnings ?? summary?.charts?.monthlySpending ?? summary?.charts?.monthlyUsers ?? []).map((item) => ({ name: item.name, value: item.value })),
    [summary]
  );
  const pieData = useMemo(
    () => (summary?.charts?.applicationsByStatus ?? summary?.charts?.jobsByStatus ?? []).map((item) => ({ name: item.name, value: item.value })),
    [summary]
  );
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
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    error && /* @__PURE__ */ jsx("div", { className: "rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700", children: /* @__PURE__ */ jsx("p", { className: "font-medium", children: error }) }),
    summaryLoading ? /* @__PURE__ */ jsx("div", { className: "grid gap-4 md:grid-cols-2 xl:grid-cols-4", children: Array.from({ length: 4 }).map((_, index) => /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm", children: [
      /* @__PURE__ */ jsx("div", { className: "h-4 w-20 animate-pulse rounded bg-slate-200" }),
      /* @__PURE__ */ jsx("div", { className: "mt-3 h-7 w-24 animate-pulse rounded bg-slate-100" })
    ] }, index)) }) : summary?.cards?.length ? /* @__PURE__ */ jsx("div", { className: "grid gap-4 md:grid-cols-2 xl:grid-cols-4", children: summary.cards.map((card, index) => /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-slate-600", children: card.title }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-2xl font-semibold text-slate-900", children: card.value.toLocaleString() })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "rounded-full bg-slate-100 p-2 text-slate-700", children: card.icon === "DollarSign" ? /* @__PURE__ */ jsx(DollarSign, { className: "h-4 w-4" }) : card.icon === "BriefcaseBusiness" ? /* @__PURE__ */ jsx(BriefcaseBusiness, { className: "h-4 w-4" }) : card.icon === "Clock3" ? /* @__PURE__ */ jsx(Clock3, { className: "h-4 w-4" }) : card.icon === "Users" ? /* @__PURE__ */ jsx(Users, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(FileText, { className: "h-4 w-4" }) })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm text-slate-500", children: card.subtitle })
    ] }, `${card.title}-${index}`)) }) : null,
    lineData.length > 0 || pieData.length > 0 ? /* @__PURE__ */ jsxs("div", { className: "grid gap-4 xl:grid-cols-2", children: [
      lineData.length > 0 ? /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-slate-900", children: "Trend overview" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-500", children: "Performance over time" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "h-64", children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(LineChart, { data: lineData, children: [
          /* @__PURE__ */ jsx(CartesianGrid, { vertical: false, stroke: "#e2e8f0" }),
          /* @__PURE__ */ jsx(XAxis, { dataKey: "name", tickLine: false, axisLine: false, fontSize: 12 }),
          /* @__PURE__ */ jsx(YAxis, { tickLine: false, axisLine: false, fontSize: 12 }),
          /* @__PURE__ */ jsx(Tooltip, {}),
          /* @__PURE__ */ jsx(Legend, {}),
          /* @__PURE__ */ jsx(Line, { type: "monotone", dataKey: "value", stroke: "#2563eb", strokeWidth: 2, dot: false })
        ] }) }) })
      ] }) : null,
      pieData.length > 0 ? /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-slate-900", children: "Distribution" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-500", children: "Current status mix" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "h-64", children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(PieChart, { children: [
          /* @__PURE__ */ jsx(Tooltip, {}),
          /* @__PURE__ */ jsx(Legend, {}),
          /* @__PURE__ */ jsx(Pie, { data: pieData, dataKey: "value", nameKey: "name", innerRadius: 55, outerRadius: 80, paddingAngle: 2, children: pieData.map((entry, index) => /* @__PURE__ */ jsx(Cell, { fill: index % 2 === 0 ? "#2563eb" : "#22c55e" }, `${entry.name}-${index}`)) })
        ] }) }) })
      ] }) : null
    ] }) : null,
    /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-slate-200 bg-white p-4 shadow-sm", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-slate-900", children: "Report builder" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500", children: "Choose a category, apply filters, and export." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap items-center gap-2", children: /* @__PURE__ */ jsx(
          ReportExportActions,
          {
            table: selectedTable,
            reportName: `${selectedTable}-report`,
            filters: {
              from: filters.from,
              to: filters.to,
              search: filters.search,
              status: filters.status,
              category: filters.category
            },
            onPrint: printReport
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "rounded-xl border border-slate-200 bg-slate-50 p-3", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "mb-1 block text-[10px] font-bold uppercase tracking-wider text-slate-500", children: "Category" }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              value: selectedTable,
              onChange: (event) => {
                setSelectedTable(event.target.value);
                setPage(1);
              },
              className: "w-full h-8 rounded-md border border-slate-300 bg-white px-2 py-0 text-sm text-slate-700 focus:outline-none focus:ring-1 focus:ring-primary",
              children: [
                tableLoading ? /* @__PURE__ */ jsx("option", { value: "", children: "Loading..." }) : null,
                tables.map((table) => /* @__PURE__ */ jsx("option", { value: table.name, children: table.label || table.name }, table.name))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "mb-1 block text-[10px] font-bold uppercase tracking-wider text-slate-500", children: "Search" }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(Search, { className: "pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                value: filters.search,
                onChange: (event) => setFilters((current) => ({ ...current, search: event.target.value })),
                placeholder: "Search...",
                className: "h-8 pl-8 text-sm"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "mb-1 block text-[10px] font-bold uppercase tracking-wider text-slate-500", children: "Date From" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              type: "date",
              value: filters.from,
              onChange: (event) => setFilters((current) => ({ ...current, from: event.target.value })),
              className: "h-8 text-sm px-2"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "mb-1 block text-[10px] font-bold uppercase tracking-wider text-slate-500", children: "Date To" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              type: "date",
              value: filters.to,
              onChange: (event) => setFilters((current) => ({ ...current, to: event.target.value })),
              className: "h-8 text-sm px-2"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "lg:col-start-4 flex justify-end items-end", children: /* @__PURE__ */ jsxs(Popover, { children: [
          /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { variant: "outline", size: "sm", className: "h-8 w-full lg:w-auto", children: [
            /* @__PURE__ */ jsx(SlidersHorizontal, { className: "mr-2 h-3.5 w-3.5" }),
            "More Filters"
          ] }) }),
          /* @__PURE__ */ jsx(PopoverContent, { className: "w-80 p-4", align: "end", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-3", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs font-bold uppercase tracking-wider text-slate-500", children: "Additional Filters" }),
            /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "mb-1 block text-[10px] font-semibold text-slate-500", children: "Status" }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    value: filters.status,
                    onChange: (event) => setFilters((current) => ({ ...current, status: event.target.value })),
                    placeholder: "OPEN, COMPLETED...",
                    className: "h-8 text-sm"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "mb-1 block text-[10px] font-semibold text-slate-500", children: "Extra Category" }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    value: filters.category,
                    onChange: (event) => setFilters((current) => ({ ...current, category: event.target.value })),
                    placeholder: "Category",
                    className: "h-8 text-sm"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsx(Button, { variant: "secondary", size: "sm", className: "mt-1", onClick: () => setFilters({
              from: filters.from,
              to: filters.to,
              search: filters.search,
              status: "",
              category: ""
            }), children: "Clear Extra Filters" })
          ] }) })
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4 overflow-hidden rounded-2xl border border-slate-200", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-slate-50 px-4 py-3", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-slate-900", children: tables.find((t) => t.name === selectedTable)?.label || selectedTable || "No category selected" }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm text-slate-500", children: [
              totalRows,
              " rows • Page ",
              page,
              " of ",
              pageCount
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("select", { value: pageSize, onChange: (event) => {
              setPageSize(Number(event.target.value));
              setPage(1);
            }, className: "rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-sm text-slate-700", children: [10, 25, 50].map((size) => /* @__PURE__ */ jsxs("option", { value: size, children: [
              size,
              "/page"
            ] }, size)) }),
            /* @__PURE__ */ jsx(Button, { type: "button", variant: "outline", size: "sm", onClick: () => loadPreview(Math.max(1, page - 1)), disabled: loading || page <= 1, children: "Prev" }),
            /* @__PURE__ */ jsx(Button, { type: "button", variant: "outline", size: "sm", onClick: () => loadPreview(Math.min(pageCount, page + 1)), disabled: loading || page >= pageCount, children: "Next" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: loading && rows.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center gap-3 px-6 py-10 text-sm text-slate-500", children: [
          /* @__PURE__ */ jsx(Loader2, { className: "h-6 w-6 animate-spin text-primary" }),
          "Loading data..."
        ] }) : rows.length > 0 ? /* @__PURE__ */ jsxs("table", { className: "min-w-full text-sm", children: [
          /* @__PURE__ */ jsx("thead", { className: "bg-slate-50 text-left text-slate-700", children: /* @__PURE__ */ jsx("tr", { children: columns.map((column) => /* @__PURE__ */ jsx("th", { className: "cursor-pointer whitespace-nowrap border-b border-slate-200 px-4 py-3 font-semibold", onClick: () => toggleSort(column), children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
            column,
            sortColumn === column ? /* @__PURE__ */ jsx(TrendingUp, { className: `h-3.5 w-3.5 ${sortDirection === "desc" ? "rotate-180" : ""}` }) : null
          ] }) }, column)) }) }),
          /* @__PURE__ */ jsx("tbody", { children: sortedRows.map((row, index) => /* @__PURE__ */ jsx("tr", { className: "border-b border-slate-100 bg-white hover:bg-slate-50", children: columns.map((column) => /* @__PURE__ */ jsx("td", { className: "max-w-[220px] truncate px-4 py-3 text-slate-700", children: String(row[column] ?? "-") }, `${column}-${index}`)) }, `${selectedTable}-${index}`)) })
        ] }) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center gap-2 px-6 py-10 text-sm text-slate-500", children: [
          /* @__PURE__ */ jsx(Table2, { className: "h-8 w-8 text-slate-300" }),
          /* @__PURE__ */ jsx("p", { children: "No records matched the current filters." })
        ] }) })
      ] })
    ] })
  ] });
}
export {
  UserPersonalReports as U
};
