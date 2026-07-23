import { jsx, jsxs } from "react/jsx-runtime";
import { B as Button, A as AppShell, k as AdminPageHeader, o as AdminSummaryCard, p as formatMoney, m as AdminSection, q as Select, r as SelectTrigger, s as SelectValue, t as SelectContent, u as SelectItem, I as Input, c as cn, g as Badge, n as AdminEmptyState, v as formatEnum, w as formatDateTime, x as formatDate, j as createSsrRpc } from "./router-DyXkltGt.js";
import { c as createServerFn } from "./server-KxTtotOh.js";
import { useLoaderData, useRouter, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { ShieldCheck, CircleDollarSign, Percent, Wallet, ArrowDownToLine, BadgeDollarSign, CalendarRange, Search, Loader2, FileSpreadsheet, Printer, ReceiptText, Download, Landmark, CheckCircle2, AlertCircle, UserRound, FileText } from "lucide-react";
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
const updatePayoutReviewStatus = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(createSsrRpc("d7a541c7e5704b9aa7e159708b81abd37fbd1a93c5c947fea36e447fdc291d62"));
function EarningsReports() {
  const data = useLoaderData({
    from: "/earnings-reports"
  });
  const router = useRouter();
  const [transactionQuery, setTransactionQuery] = useState("");
  const [payoutQuery, setPayoutQuery] = useState("");
  const [professionalQuery, setProfessionalQuery] = useState("");
  const [reportPeriod, setReportPeriod] = useState("ALL");
  const [transactionStatus, setTransactionStatus] = useState("ALL");
  const [payoutStatus, setPayoutStatus] = useState("ALL");
  const [pendingPayoutId, setPendingPayoutId] = useState(null);
  const [summaryResult, setSummaryResult] = useState(null);
  if (!data.viewer || data.viewer.role !== "ADMIN" || !data.report) {
    return /* @__PURE__ */ jsx("div", { className: "grid min-h-screen place-items-center bg-muted/30 px-4", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-sm rounded-2xl border border-border bg-card p-8 text-center shadow-lg", children: [
      /* @__PURE__ */ jsx(ShieldCheck, { className: "h-8 w-8 text-primary mx-auto" }),
      /* @__PURE__ */ jsx("h1", { className: "mt-6 text-xl font-bold", children: "Admin access required" }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Sign in from the admin panel to view earnings and payout reports." }),
      /* @__PURE__ */ jsx(Button, { asChild: true, className: "mt-8 w-full", children: /* @__PURE__ */ jsx(Link, { to: "/admin", children: "Open admin panel" }) })
    ] }) });
  }
  const report = data.report;
  const visibleTransactions = useMemo(() => filterTransactions(report.transactions, transactionQuery, reportPeriod, transactionStatus), [report.transactions, transactionQuery, reportPeriod, transactionStatus]);
  const visiblePayouts = useMemo(() => filterPayouts(report.payouts, payoutQuery, reportPeriod, payoutStatus), [report.payouts, payoutQuery, reportPeriod, payoutStatus]);
  const visibleProfessionals = useMemo(() => filterProfessionals(report.professionals, professionalQuery), [report.professionals, professionalQuery]);
  const displayName = `${data.viewer.firstName} ${data.viewer.lastName}`.trim() || data.viewer.email;
  const [downloading, setDownloading] = useState(null);
  async function handlePayoutStatus(payout, status) {
    setPendingPayoutId(payout.id);
    try {
      await updatePayoutReviewStatus({
        data: {
          payoutId: payout.id,
          status
        }
      });
      await router.invalidate();
    } finally {
      setPendingPayoutId(null);
    }
  }
  async function exportReport(table, format) {
    setDownloading(format);
    try {
      const res = await fetch("/api/v1/reports/download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          table,
          format,
          reportName: `Admin-${table}-report`,
          filters: {}
        })
      });
      if (!res.ok) throw new Error(await res.text().catch(() => res.statusText));
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${table}-${format.toLowerCase()}.${format.toLowerCase() === "pdf" ? "pdf" : format.toLowerCase() === "csv" ? "csv" : "xlsx"}`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert(`Export failed: ${err.message}`);
    } finally {
      setDownloading(null);
    }
  }
  function printReport(title, columns, dataRows) {
    const reportRows = dataRows.map((row) => {
      return columns.map((column) => `${column}: ${String(row[column] ?? "")}`).join(" | ");
    });
    const printWindow = window.open("", "_blank", "noopener,noreferrer");
    if (!printWindow) return;
    printWindow.document.write(`<!doctype html><html><head><title>${title}</title><style>body{font-family:Arial,sans-serif;padding:24px}table{width:100%;border-collapse:collapse}th,td{border:1px solid #ddd;padding:8px;font-size:12px}th{background:#f8fafc}</style></head><body><h1>${title}</h1><p>Generated on ${(/* @__PURE__ */ new Date()).toLocaleString()}</p><table><thead><tr>${columns.map((column) => `<th>${column}</th>`).join("")}</tr></thead><tbody>${reportRows.map((row) => `<tr><td>${row.replace(/\|/g, "</td><td>")}</td></tr>`).join("")}</tbody></table></body></html>`);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  }
  return /* @__PURE__ */ jsxs(AppShell, { userName: displayName, userRole: "Admin", userAvatarUrl: data.viewer.avatarUrl, children: [
    /* @__PURE__ */ jsx(AdminPageHeader, { title: "Earnings \\u0026 Payouts", description: "Comprehensive report of gross platform earnings, commission share, and professional payouts.", breadcrumbs: [{
      label: "Earnings Reports"
    }], actions: /* @__PURE__ */ jsx(Button, { asChild: true, variant: "outline", children: /* @__PURE__ */ jsx(Link, { to: "/admin", children: "Back to admin" }) }) }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5", children: [
      /* @__PURE__ */ jsx(AdminSummaryCard, { icon: CircleDollarSign, label: "Gross Earnings", value: formatMoney(report.totals.grossEarnings), caption: `${report.totals.transactionCount} total records`, active: summaryResult === "transactions", onClick: () => setSummaryResult("transactions") }),
      /* @__PURE__ */ jsx(AdminSummaryCard, { icon: Percent, label: "Commission", value: formatMoney(report.totals.commissionAmount), caption: `${Math.round(report.commissionRate * 100)}% share`, variant: "primary", active: summaryResult === "transactions", onClick: () => setSummaryResult("transactions") }),
      /* @__PURE__ */ jsx(AdminSummaryCard, { icon: Wallet, label: "Net Payable", value: formatMoney(report.totals.netEarnings), caption: "Professional earnings", variant: "success", active: summaryResult === "transactions", onClick: () => setSummaryResult("transactions") }),
      /* @__PURE__ */ jsx(AdminSummaryCard, { icon: ArrowDownToLine, label: "Requested Payouts", value: formatMoney(report.totals.requestedPayouts), caption: `${report.totals.payoutCount} payout requests`, variant: "warning", active: summaryResult === "payouts", onClick: () => setSummaryResult("payouts") }),
      /* @__PURE__ */ jsx(AdminSummaryCard, { icon: BadgeDollarSign, label: "Available Balance", value: formatMoney(report.totals.availableBalance), caption: "Unclaimed net total", active: summaryResult === "balances", onClick: () => setSummaryResult("balances") })
    ] }),
    summaryResult && /* @__PURE__ */ jsxs("div", { className: "mt-6 flex items-center justify-between rounded-2xl border border-primary/20 bg-primary/5 px-6 py-4 text-sm shadow-sm animate-in slide-in-from-top-2 duration-300", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(ShieldCheck, { className: "h-4 w-4 text-primary" }),
        /* @__PURE__ */ jsxs("span", { className: "font-bold text-primary", children: [
          "FILTER ACTIVE:",
          " ",
          /* @__PURE__ */ jsx("span", { className: "uppercase text-primary/70", children: summaryResult === "balances" ? "Professional Balances" : summaryResult })
        ] })
      ] }),
      /* @__PURE__ */ jsx(Button, { type: "button", size: "sm", variant: "outline", className: "rounded-xl font-bold uppercase tracking-widest text-[10px]", onClick: () => setSummaryResult(null), children: "Show All Data" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-8 space-y-8", children: [
      /* @__PURE__ */ jsx(AdminSection, { title: "Reporting Options", description: "Narrow transactions and payouts without changing lifetime totals.", icon: CalendarRange, className: "bg-gradient-to-br from-blue-50/50 to-white", actions: /* @__PURE__ */ jsx(Button, { type: "button", variant: "outline", size: "sm", className: "rounded-lg h-9 font-bold text-[10px] uppercase tracking-widest", onClick: () => {
        setReportPeriod("ALL");
        setTransactionStatus("ALL");
        setPayoutStatus("ALL");
        setTransactionQuery("");
        setPayoutQuery("");
        setProfessionalQuery("");
      }, children: "Reset All Filters" }), children: /* @__PURE__ */ jsxs("div", { className: "p-6 grid gap-4 sm:grid-cols-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1", children: "Period" }),
          /* @__PURE__ */ jsxs(Select, { value: reportPeriod, onValueChange: (value) => setReportPeriod(value), children: [
            /* @__PURE__ */ jsx(SelectTrigger, { className: "rounded-xl h-11 bg-background border-border shadow-sm", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsx(SelectItem, { value: "ALL", children: "All Time" }),
              /* @__PURE__ */ jsx(SelectItem, { value: "30_DAYS", children: "Last 30 Days" }),
              /* @__PURE__ */ jsx(SelectItem, { value: "90_DAYS", children: "Last 90 Days" }),
              /* @__PURE__ */ jsx(SelectItem, { value: "THIS_YEAR", children: "This Year" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1", children: "Transactions" }),
          /* @__PURE__ */ jsxs(Select, { value: transactionStatus, onValueChange: setTransactionStatus, children: [
            /* @__PURE__ */ jsx(SelectTrigger, { className: "rounded-xl h-11 bg-background border-border shadow-sm", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsx(SelectItem, { value: "ALL", children: "All Statuses" }),
              /* @__PURE__ */ jsx(SelectItem, { value: "COMPLETED", children: "Completed" }),
              /* @__PURE__ */ jsx(SelectItem, { value: "CANCELLED", children: "Cancelled" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1", children: "Payouts" }),
          /* @__PURE__ */ jsxs(Select, { value: payoutStatus, onValueChange: setPayoutStatus, children: [
            /* @__PURE__ */ jsx(SelectTrigger, { className: "rounded-xl h-11 bg-background border-border shadow-sm", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsx(SelectItem, { value: "ALL", children: "All Statuses" }),
              /* @__PURE__ */ jsx(SelectItem, { value: "PENDING", children: "Pending" }),
              /* @__PURE__ */ jsx(SelectItem, { value: "PROCESSING", children: "Processing" }),
              /* @__PURE__ */ jsx(SelectItem, { value: "COMPLETED", children: "Completed" }),
              /* @__PURE__ */ jsx(SelectItem, { value: "REJECTED", children: "Rejected" })
            ] })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx(FinanceOverview, { report }),
      (!summaryResult || summaryResult === "balances") && /* @__PURE__ */ jsx(ProfessionalSummarySection, { professionals: visibleProfessionals, query: professionalQuery, onQueryChange: setProfessionalQuery }),
      (!summaryResult || summaryResult === "payouts") && /* @__PURE__ */ jsx(AdminSection, { title: "Payout Requests", description: "Manage withdrawal requests from professional bank, UPI, and wallets.", icon: ArrowDownToLine, actions: /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative w-full sm:w-64", children: [
          /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
          /* @__PURE__ */ jsx(Input, { value: payoutQuery, onChange: (event) => setPayoutQuery(event.target.value), placeholder: "Search payouts...", className: "pl-9 h-10 rounded-xl" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-1", children: [
          /* @__PURE__ */ jsxs(Button, { size: "sm", variant: "outline", className: "h-10 rounded-xl", onClick: () => exportReport("ProjectWithdrawal", "CSV"), disabled: !!downloading, children: [
            downloading === "CSV" ? /* @__PURE__ */ jsx(Loader2, { className: "h-3 w-3 animate-spin" }) : /* @__PURE__ */ jsx(FileSpreadsheet, { className: "h-3 w-3" }),
            "CSV"
          ] }),
          /* @__PURE__ */ jsx(Button, { size: "sm", variant: "outline", className: "h-10 rounded-xl", onClick: () => printReport("Payout Reports", ["professionalName", "amount", "status", "destinationType", "destinationLabel", "createdAt"], visiblePayouts), children: /* @__PURE__ */ jsx(Printer, { className: "h-3 w-3" }) })
        ] })
      ] }), children: /* @__PURE__ */ jsx(PayoutList, { payouts: visiblePayouts, pendingPayoutId, onStatusChange: handlePayoutStatus }) }),
      (!summaryResult || summaryResult === "transactions") && /* @__PURE__ */ jsx(AdminSection, { title: "Transaction History", description: "Detailed log of all platform project payments and commissions.", icon: ReceiptText, actions: /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative w-full sm:w-64", children: [
          /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
          /* @__PURE__ */ jsx(Input, { value: transactionQuery, onChange: (event) => setTransactionQuery(event.target.value), placeholder: "Search transactions...", className: "pl-9 h-10 rounded-xl" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-1", children: [
          /* @__PURE__ */ jsxs(Button, { size: "sm", variant: "outline", className: "h-10 rounded-xl", onClick: () => exportReport("ProjectTransaction", "EXCEL"), disabled: !!downloading, children: [
            downloading === "EXCEL" ? /* @__PURE__ */ jsx(Loader2, { className: "h-3 w-3 animate-spin" }) : /* @__PURE__ */ jsx(Download, { className: "h-3 w-3" }),
            "Excel"
          ] }),
          /* @__PURE__ */ jsx(Button, { size: "sm", variant: "outline", className: "h-10 rounded-xl", onClick: () => printReport("Transaction Reports", ["jobTitle", "amount", "commissionAmount", "netPayoutAmount", "status", "dateTime"], visibleTransactions), children: /* @__PURE__ */ jsx(Printer, { className: "h-3 w-3" }) })
        ] })
      ] }), children: /* @__PURE__ */ jsx(TransactionList, { transactions: visibleTransactions }) })
    ] })
  ] });
}
function FinanceOverview({
  report
}) {
  const payoutLiability = report.totals.availableBalance + report.totals.pendingPayouts;
  const reconciledNet = report.totals.paidPayouts + report.totals.pendingPayouts + report.totals.availableBalance;
  const reconciliationDifference = Math.abs(report.totals.netEarnings - reconciledNet);
  const isBalanced = reconciliationDifference < 0.01;
  return /* @__PURE__ */ jsxs("div", { className: "grid gap-6 lg:grid-cols-2", children: [
    /* @__PURE__ */ jsxs("div", { className: "rounded-3xl border border-indigo-200 bg-indigo-50/20 p-8 shadow-sm", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-indigo-900", children: "Payout Pipeline" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-indigo-700 font-medium", children: "Platform fund movement distribution." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid h-12 w-12 place-items-center rounded-2xl bg-indigo-100 text-indigo-700 shadow-inner", children: /* @__PURE__ */ jsx(Landmark, { className: "h-6 w-6" }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-8 grid gap-4 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsx(PipelineMetric, { label: "Paid Out", value: report.totals.paidPayouts, variant: "success" }),
        /* @__PURE__ */ jsx(PipelineMetric, { label: "Pending Review", value: report.totals.pendingPayouts, variant: "warning" }),
        /* @__PURE__ */ jsx(PipelineMetric, { label: "Processing", value: report.totals.processingPayouts, variant: "primary" }),
        /* @__PURE__ */ jsx(PipelineMetric, { label: "Rejected", value: report.totals.rejectedPayouts, variant: "destructive" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6 flex items-center justify-between gap-4 rounded-2xl bg-white/80 p-5 shadow-sm border border-indigo-100", children: [
        /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-indigo-900 uppercase tracking-widest", children: "Total Outstanding Liability" }),
        /* @__PURE__ */ jsx("span", { className: "text-2xl font-bold text-indigo-950 tabular-nums", children: formatMoney(payoutLiability) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: cn("rounded-3xl border p-8 shadow-sm flex flex-col", isBalanced ? "border-emerald-200 bg-emerald-50/20" : "border-rose-200 bg-rose-50/20"), children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: cn("text-xl font-bold", isBalanced ? "text-emerald-900" : "text-rose-900"), children: "Finance Reconciliation" }),
          /* @__PURE__ */ jsx("p", { className: cn("text-sm font-medium", isBalanced ? "text-emerald-700" : "text-rose-700"), children: "Auditing net earnings against tracked funds." })
        ] }),
        isBalanced ? /* @__PURE__ */ jsx("div", { className: "h-12 w-12 rounded-2xl bg-emerald-100 grid place-items-center text-emerald-600", children: /* @__PURE__ */ jsx(CheckCircle2, { className: "h-6 w-6" }) }) : /* @__PURE__ */ jsx("div", { className: "h-12 w-12 rounded-2xl bg-rose-100 grid place-items-center text-rose-600 animate-pulse", children: /* @__PURE__ */ jsx(AlertCircle, { className: "h-6 w-6" }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-8 space-y-4 flex-1", children: [
        /* @__PURE__ */ jsx(ReconciliationRow, { label: "Net Platform Earnings", value: report.totals.netEarnings, variant: isBalanced ? "emerald" : "rose" }),
        /* @__PURE__ */ jsx(ReconciliationRow, { label: "Total Reconciled Funds", value: reconciledNet, variant: isBalanced ? "emerald" : "rose" }),
        /* @__PURE__ */ jsx("div", { className: "h-px bg-current opacity-10 mx-2" }),
        /* @__PURE__ */ jsx(ReconciliationRow, { label: "Reconciliation Difference", value: reconciliationDifference, strong: true, variant: isBalanced ? "emerald" : "rose" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: cn("mt-6 rounded-xl py-2 px-4 text-center font-bold uppercase tracking-[0.2em] text-[10px]", isBalanced ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"), children: isBalanced ? "SYSTEM BALANCED" : "REVIEW REQUIRED — DATA MISMATCH" })
    ] })
  ] });
}
function PipelineMetric({
  label,
  value,
  variant
}) {
  const styles = {
    success: "border-emerald-200 bg-emerald-50 text-emerald-700",
    warning: "border-amber-200 bg-amber-50 text-amber-700",
    primary: "border-blue-200 bg-blue-50 text-blue-700",
    destructive: "border-rose-200 bg-rose-50 text-rose-700"
  };
  return /* @__PURE__ */ jsxs("div", { className: cn("rounded-2xl border p-4 shadow-sm bg-white hover:scale-[1.02] transition-transform", styles[variant]), children: [
    /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold uppercase tracking-widest opacity-80", children: label }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-xl font-bold tabular-nums", children: formatMoney(value) })
  ] });
}
function ReconciliationRow({
  label,
  value,
  strong,
  variant
}) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-4 text-sm px-2", children: [
    /* @__PURE__ */ jsx("span", { className: cn("font-medium", variant === "emerald" ? "text-emerald-700" : "text-rose-700"), children: label }),
    /* @__PURE__ */ jsx("span", { className: cn("font-bold tabular-nums", strong ? variant === "emerald" ? "text-emerald-900 text-lg" : "text-rose-900 text-lg" : variant === "emerald" ? "text-emerald-800" : "text-rose-800"), children: formatMoney(value) })
  ] });
}
function ProfessionalSummarySection({
  professionals,
  query,
  onQueryChange
}) {
  const totals = professionals.reduce((acc, p) => {
    acc.gross += Number(p.grossEarnings || 0);
    acc.commission += Number(p.commissionAmount || 0);
    acc.net += Number(p.netEarnings || 0);
    acc.requested += Number(p.requestedPayouts || 0);
    acc.paid += Number(p.paidPayouts || 0);
    acc.available += Number(p.availableBalance || 0);
    return acc;
  }, {
    gross: 0,
    commission: 0,
    net: 0,
    requested: 0,
    paid: 0,
    available: 0
  });
  return /* @__PURE__ */ jsx(AdminSection, { title: "Professional Ledger Balances", description: "Track earnings, commission deductions, and payable balances per provider.", icon: UserRound, actions: /* @__PURE__ */ jsxs("div", { className: "relative w-full sm:w-72", children: [
    /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
    /* @__PURE__ */ jsx(Input, { value: query, onChange: (event) => onQueryChange(event.target.value), placeholder: "Search providers...", className: "pl-9 h-10 rounded-xl" })
  ] }), children: /* @__PURE__ */ jsxs("div", { className: "divide-y divide-border", children: [
    professionals.length ? professionals.map((p) => /* @__PURE__ */ jsxs("div", { className: "group p-6 hover:bg-muted/30 transition-colors", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row justify-between gap-4 mb-6", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h4", { className: "font-bold text-lg text-foreground group-hover:text-primary transition-colors", children: p.professionalName }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground font-medium", children: p.professionalEmail })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2 items-center", children: [
          /* @__PURE__ */ jsxs(Badge, { variant: "outline", className: "rounded-lg h-7 font-bold uppercase tracking-widest text-[9px]", children: [
            p.transactionCount,
            " Trans."
          ] }),
          /* @__PURE__ */ jsxs(Badge, { variant: "outline", className: "rounded-lg h-7 font-bold uppercase tracking-widest text-[9px]", children: [
            p.payoutCount,
            " Payouts"
          ] }),
          (p.pendingPayouts > 0 || p.availableBalance > 0) && /* @__PURE__ */ jsx(Badge, { variant: "secondary", className: "rounded-lg h-7 font-bold uppercase tracking-widest text-[9px] bg-amber-50 text-amber-700 border-amber-200", children: "Action Required" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-6", children: [
        /* @__PURE__ */ jsx(BalanceBox, { label: "Gross", value: p.grossEarnings }),
        /* @__PURE__ */ jsx(BalanceBox, { label: "Comm.", value: p.commissionAmount, negative: true }),
        /* @__PURE__ */ jsx(BalanceBox, { label: "Net", value: p.netEarnings, strong: true }),
        /* @__PURE__ */ jsx(BalanceBox, { label: "Req.", value: p.requestedPayouts }),
        /* @__PURE__ */ jsx(BalanceBox, { label: "Paid", value: p.paidPayouts }),
        /* @__PURE__ */ jsx(BalanceBox, { label: "Avail.", value: p.availableBalance, variant: "success" })
      ] })
    ] }, p.professionalId)) : /* @__PURE__ */ jsx(AdminEmptyState, { title: "No provider ledger records", description: "Professional financial summaries will appear here as transactions complete." }),
    professionals.length > 0 && /* @__PURE__ */ jsxs("div", { className: "bg-muted/40 p-8", children: [
      /* @__PURE__ */ jsx("h4", { className: "text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4", children: "Total Aggregate Balance" }),
      /* @__PURE__ */ jsxs("div", { className: "grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-6", children: [
        /* @__PURE__ */ jsx(BalanceBox, { label: "Total Gross", value: totals.gross, size: "lg" }),
        /* @__PURE__ */ jsx(BalanceBox, { label: "Total Comm.", value: totals.commission, negative: true, size: "lg" }),
        /* @__PURE__ */ jsx(BalanceBox, { label: "Total Net", value: totals.net, strong: true, size: "lg" }),
        /* @__PURE__ */ jsx(BalanceBox, { label: "Total Req.", value: totals.requested, size: "lg" }),
        /* @__PURE__ */ jsx(BalanceBox, { label: "Total Paid", value: totals.paid, size: "lg" }),
        /* @__PURE__ */ jsx(BalanceBox, { label: "Total Avail.", value: totals.available, variant: "success", size: "lg" })
      ] })
    ] })
  ] }) });
}
function BalanceBox({
  label,
  value,
  negative,
  strong,
  variant = "default",
  size = "md"
}) {
  return /* @__PURE__ */ jsxs("div", { className: cn("rounded-2xl border p-4 shadow-sm bg-background transition-all", variant === "success" ? "border-emerald-200 bg-emerald-50/50" : "border-border", size === "lg" ? "p-5 border-2" : ""), children: [
    /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold uppercase tracking-widest text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxs("p", { className: cn("mt-1 font-bold tabular-nums tracking-tight", size === "lg" ? "text-2xl" : "text-lg", negative ? "text-rose-600" : variant === "success" ? "text-emerald-700" : "text-foreground", strong && !negative && variant !== "success" ? "text-primary" : ""), children: [
      negative && value > 0 ? "-" : "",
      formatMoney(value)
    ] })
  ] });
}
function PayoutList({
  payouts,
  pendingPayoutId,
  onStatusChange
}) {
  if (!payouts.length) return null;
  return /* @__PURE__ */ jsx("div", { className: "divide-y divide-border", children: payouts.map((payout) => /* @__PURE__ */ jsx("div", { className: "group p-6 hover:bg-muted/30 transition-colors", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row justify-between gap-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
        /* @__PURE__ */ jsx("p", { className: "font-bold text-lg text-foreground group-hover:text-primary transition-colors", children: payout.professionalName }),
        /* @__PURE__ */ jsx(Badge, { variant: getPayoutStatusVariant(payout.status), className: "rounded-lg px-3 py-1 font-bold uppercase tracking-widest text-[10px]", children: formatEnum(payout.status) }),
        /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "rounded-lg h-7 font-bold uppercase tracking-widest text-[9px] bg-background", children: formatEnum(payout.destinationType) })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground font-medium", children: payout.professionalEmail }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4 grid gap-4 sm:grid-cols-2 rounded-2xl bg-muted/40 p-4 border border-border/50", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold uppercase tracking-widest text-muted-foreground", children: "Payout Destination" }),
          /* @__PURE__ */ jsxs("p", { className: "text-sm font-bold text-foreground flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Landmark, { className: "h-3.5 w-3.5 text-primary/60" }),
            payout.destinationLabel
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold uppercase tracking-widest text-muted-foreground", children: "Admin Notes" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm italic text-muted-foreground", children: payout.note || "No administrative notes added." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "mt-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(CalendarRange, { className: "h-3 w-3" }),
        "Requested ",
        formatDateTime(payout.createdAt),
        " \\u00b7 Updated ",
        formatDateTime(payout.updatedAt)
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "w-full lg:w-72 space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border-2 border-primary/20 bg-primary/[0.02] p-5 text-center shadow-sm", children: [
        /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold uppercase tracking-widest text-primary/70", children: "Requested Amount" }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-3xl font-bold text-primary tabular-nums tracking-tight", children: formatMoney(payout.amount) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1", children: "Change Payout Status" }),
        /* @__PURE__ */ jsxs(Select, { value: payout.status, disabled: pendingPayoutId === payout.id, onValueChange: (value) => onStatusChange(payout, value), children: [
          /* @__PURE__ */ jsx(SelectTrigger, { className: "rounded-xl h-11 bg-background border-border shadow-sm font-bold text-xs uppercase tracking-widest", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsx(SelectItem, { value: "PENDING", children: "Pending Approval" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "PROCESSING", children: "In Process" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "COMPLETED", children: "Paid / Completed" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "REJECTED", children: "Reject Request" })
          ] })
        ] }),
        pendingPayoutId === payout.id && /* @__PURE__ */ jsx("p", { className: "text-center text-[10px] font-bold text-primary animate-pulse uppercase tracking-widest mt-2", children: "Updating Status..." })
      ] })
    ] })
  ] }) }, payout.id)) });
}
function TransactionList({
  transactions
}) {
  if (!transactions.length) return null;
  return /* @__PURE__ */ jsx("div", { className: "divide-y divide-border", children: transactions.map((t) => /* @__PURE__ */ jsx("div", { className: "group p-6 hover:bg-muted/30 transition-colors", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row justify-between gap-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
        /* @__PURE__ */ jsx("p", { className: "font-bold text-lg text-foreground group-hover:text-primary transition-colors", children: t.jobTitle }),
        /* @__PURE__ */ jsx(Badge, { variant: t.status === "COMPLETED" ? "default" : "outline", className: "rounded-lg uppercase tracking-widest text-[9px]", children: formatEnum(t.status) }),
        /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "rounded-lg h-6 font-bold uppercase tracking-widest text-[8px] bg-background", children: formatEnum(t.paymentType) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-2 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-muted-foreground font-medium", children: [
        /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsx(CalendarRange, { className: "h-3.5 w-3.5" }),
          t.projectCategory
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsx(FileText, { className: "h-3.5 w-3.5" }),
          "TRK #",
          t.trackingId
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4 flex flex-wrap gap-8 text-sm", children: [
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold uppercase tracking-widest text-muted-foreground block mb-1", children: "Client" }),
          " ",
          /* @__PURE__ */ jsx("span", { className: "font-bold text-foreground", children: t.clientName })
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold uppercase tracking-widest text-muted-foreground block mb-1", children: "Professional" }),
          " ",
          /* @__PURE__ */ jsx("span", { className: "font-bold text-foreground", children: t.professionalName })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 lg:w-[480px]", children: [
      /* @__PURE__ */ jsx(MiniBox, { label: "Gross", value: t.amount }),
      /* @__PURE__ */ jsx(MiniBox, { label: "Comm.", value: t.commissionAmount, negative: true }),
      /* @__PURE__ */ jsx(MiniBox, { label: "Net", value: t.netPayoutAmount, strong: true }),
      /* @__PURE__ */ jsx(MiniBox, { label: "Date", value: formatDate(t.dateTime), isDate: true })
    ] })
  ] }) }, t.id)) });
}
function MiniBox({
  label,
  value,
  negative,
  strong,
  isDate
}) {
  return /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-border bg-background p-3 shadow-sm text-center group-hover:border-primary/20 transition-colors", children: [
    /* @__PURE__ */ jsx("p", { className: "text-[9px] font-bold uppercase tracking-widest text-muted-foreground mb-1", children: label }),
    /* @__PURE__ */ jsxs("p", { className: cn("font-bold tabular-nums tracking-tight whitespace-nowrap", isDate ? "text-[11px] text-muted-foreground" : "text-sm", negative ? "text-rose-600" : strong ? "text-primary" : "text-foreground"), children: [
      negative && !isDate && value > 0 ? "-" : "",
      isDate ? value : formatMoney(value)
    ] })
  ] });
}
function filterTransactions(transactions, query, period, status) {
  const term = query.trim().toLowerCase();
  return transactions.filter((transaction) => {
    if (!isInReportPeriod(transaction.dateTime, period)) return false;
    if (status !== "ALL" && transaction.status !== status) return false;
    if (!term) return true;
    return [transaction.jobTitle, transaction.projectCategory, transaction.clientName, transaction.clientEmail, transaction.professionalName, transaction.professionalEmail, transaction.paymentType, transaction.status, transaction.description].join(" ").toLowerCase().includes(term);
  });
}
function filterPayouts(payouts, query, period, status) {
  const term = query.trim().toLowerCase();
  return payouts.filter((payout) => {
    if (!isInReportPeriod(payout.createdAt, period)) return false;
    if (status !== "ALL" && payout.status !== status) return false;
    if (!term) return true;
    return [payout.professionalName, payout.professionalEmail, payout.destinationType, payout.destinationLabel, payout.status, payout.note].join(" ").toLowerCase().includes(term);
  });
}
function isInReportPeriod(value, period) {
  if (period === "ALL") return true;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return false;
  const now = /* @__PURE__ */ new Date();
  if (period === "THIS_YEAR") return date.getFullYear() === now.getFullYear();
  const days = period === "30_DAYS" ? 30 : 90;
  return date.getTime() >= now.getTime() - days * 24 * 60 * 60 * 1e3;
}
function filterProfessionals(professionals, query) {
  const term = query.trim().toLowerCase();
  if (!term) {
    return professionals;
  }
  return professionals.filter((professional) => [professional.professionalName, professional.professionalEmail].join(" ").toLowerCase().includes(term));
}
function getPayoutStatusVariant(status) {
  if (status === "COMPLETED") {
    return "default";
  }
  if (status === "REJECTED") {
    return "destructive";
  }
  if (status === "PROCESSING") {
    return "secondary";
  }
  return "outline";
}
export {
  EarningsReports as component
};
