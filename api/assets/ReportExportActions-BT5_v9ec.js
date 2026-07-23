import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { Loader2, FileSpreadsheet, Download, FileText, Printer } from "lucide-react";
import { B as Button } from "./router-DyXkltGt.js";
function ReportExportActions({
  table,
  reportName,
  filters = {},
  onPrint,
  variant = "outline",
  size = "sm"
}) {
  const [downloading, setDownloading] = useState(null);
  async function exportReport(format) {
    setDownloading(format);
    try {
      const res = await fetch("/api/v1/reports/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          table,
          format,
          reportName,
          filters
        })
      });
      if (!res.ok) throw new Error(await res.text().catch(() => res.statusText));
      const blob = await res.blob();
      const disposition = res.headers.get("content-disposition") || "";
      const filenameMatch = disposition.match(/filename=(?:"?)([^";]+)/);
      const fileName = filenameMatch ? filenameMatch[1].replace(/"/g, "") : `${table}-${format.toLowerCase()}.bin`;
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
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
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
    /* @__PURE__ */ jsxs(
      Button,
      {
        type: "button",
        variant,
        size,
        onClick: () => exportReport("CSV"),
        disabled: !!downloading,
        children: [
          downloading === "CSV" ? /* @__PURE__ */ jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsx(FileSpreadsheet, { className: "mr-2 h-4 w-4" }),
          "CSV"
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      Button,
      {
        type: "button",
        variant,
        size,
        onClick: () => exportReport("EXCEL"),
        disabled: !!downloading,
        children: [
          downloading === "EXCEL" ? /* @__PURE__ */ jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsx(Download, { className: "mr-2 h-4 w-4" }),
          "Excel"
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      Button,
      {
        type: "button",
        variant,
        size,
        onClick: () => exportReport("PDF"),
        disabled: !!downloading,
        children: [
          downloading === "PDF" ? /* @__PURE__ */ jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsx(FileText, { className: "mr-2 h-4 w-4" }),
          "PDF"
        ]
      }
    ),
    onPrint && /* @__PURE__ */ jsxs(Button, { type: "button", variant: "secondary", size, onClick: onPrint, children: [
      /* @__PURE__ */ jsx(Printer, { className: "mr-2 h-4 w-4" }),
      "Print"
    ] })
  ] });
}
export {
  ReportExportActions as R
};
