import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { B as Button, A as AppShell, j as createSsrRpc } from "./router-DyXkltGt.js";
import { useLoaderData, useRouter, Link } from "@tanstack/react-router";
import { c as createServerFn } from "./server-KxTtotOh.js";
import { FileText, Pencil, ArrowLeft, ExternalLink, Save } from "lucide-react";
import { useState, useEffect } from "react";
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
const saveWebEditorPage = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(createSsrRpc("a4c31141410ac6780d4cd742b0257e4d637ef0ce0b6c71e3fdb2d21268b861b8"));
function ClientOnlyEditor({
  content,
  onChange
}) {
  const [editorSetup, setEditorSetup] = useState(null);
  useEffect(() => {
    let cancelled = false;
    Promise.all([import("@ckeditor/ckeditor5-react").then((module) => module.CKEditor), import("ckeditor5").then((module) => module), Promise.resolve({              })]).then(([CKEditorComponent2, ckeditorModules]) => {
      if (cancelled) return;
      const config2 = {
        licenseKey: "GPL",
        plugins: [ckeditorModules.Essentials, ckeditorModules.Paragraph, ckeditorModules.Heading, ckeditorModules.Bold, ckeditorModules.Italic, ckeditorModules.Underline, ckeditorModules.Strikethrough, ckeditorModules.Alignment, ckeditorModules.RemoveFormat, ckeditorModules.Table, ckeditorModules.TableToolbar, ckeditorModules.List, ckeditorModules.SourceEditing, ckeditorModules.GeneralHtmlSupport, ckeditorModules.ImageBlock, ckeditorModules.ImageCaption, ckeditorModules.ImageStyle, ckeditorModules.ImageResize, ckeditorModules.ImageToolbar, ckeditorModules.ImageInsertViaUrl, ckeditorModules.ImageTextAlternative, ckeditorModules.LinkImage, ckeditorModules.Link],
        toolbar: {
          items: ["undo", "redo", "|", "heading", "|", "bold", "italic", "underline", "strikethrough", "removeFormat", "|", "alignment", "|", "link", "bulletedList", "numberedList", "|", "insertTable", "insertImageViaUrl", "|", "sourceEditing"],
          shouldNotGroupWhenFull: false
        },
        image: {
          toolbar: ["imageStyle:inline", "imageStyle:block", "imageStyle:side", "|", "toggleImageCaption", "imageTextAlternative", "linkImage"]
        },
        table: {
          contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"]
        },
        link: {
          addTargetToExternalLinks: true,
          defaultProtocol: "https://"
        },
        htmlSupport: {
          allow: [{
            name: /.*/,
            attributes: true,
            classes: true,
            styles: true
          }]
        }
      };
      setEditorSetup({
        CKEditorComponent: CKEditorComponent2,
        ClassicEditor: ckeditorModules.ClassicEditor,
        config: config2
      });
    }).catch(() => {
      if (!cancelled) {
        setEditorSetup(null);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);
  if (!editorSetup) {
    return /* @__PURE__ */ jsx("div", { className: "rounded-2xl border border-border bg-card p-8 text-sm text-muted-foreground", children: "Loading editor..." });
  }
  const {
    CKEditorComponent,
    ClassicEditor,
    config
  } = editorSetup;
  return /* @__PURE__ */ jsx(CKEditorComponent, { editor: ClassicEditor, config, data: content, onChange: (_event, editor) => onChange(editor.getData()) });
}
function WebEditorPage() {
  const data = useLoaderData({
    from: "/web-editor"
  });
  const router = useRouter();
  const [pages, setPages] = useState(data.pages);
  const [selectedPageKey, setSelectedPageKey] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const selectedPage = pages.find((page) => page.pageKey === selectedPageKey) || null;
  if (!data.viewer || data.viewer.role !== "ADMIN") {
    return /* @__PURE__ */ jsx("div", { className: "grid min-h-screen place-items-center bg-muted/30 px-4", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-sm rounded-xl border bg-card p-6 text-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-xl font-semibold", children: "Admin access required" }),
      /* @__PURE__ */ jsx(Button, { asChild: true, className: "mt-5 w-full", children: /* @__PURE__ */ jsx(Link, { to: "/admin", children: "Open admin panel" }) })
    ] }) });
  }
  const displayName = `${data.viewer.firstName} ${data.viewer.lastName}`.trim() || data.viewer.email;
  async function persistPage(status) {
    if (!selectedPage) return;
    setSaving(true);
    setMessage(null);
    try {
      const saved = await saveWebEditorPage({
        data: {
          pageKey: selectedPage.pageKey,
          content: selectedPage.content,
          status
        }
      });
      setPages((current) => current.map((page) => page.pageKey === saved.pageKey ? saved : page));
      await router.invalidate();
      setMessage(status === "PUBLISHED" ? "Page published." : "Draft saved. The public page is unchanged.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to save page.");
    } finally {
      setSaving(false);
    }
  }
  return /* @__PURE__ */ jsxs(AppShell, { userName: displayName, userRole: "Admin", userAvatarUrl: data.viewer.avatarUrl, children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold uppercase tracking-[0.18em] text-primary", children: "Admin / Website editor" }),
      /* @__PURE__ */ jsx("h1", { className: "mt-1 text-3xl font-semibold", children: selectedPage?.title || "Web Page UI Editor" }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: selectedPage ? "Edit visually or use Source Editing for HTML, then save as a draft or publish." : "Choose a public page to edit." }),
      selectedPage?.pageKey === "home" ? /* @__PURE__ */ jsx("p", { className: "mt-2 rounded-lg border border-primary/20 bg-primary/5 px-3 py-2 text-sm text-primary", children: "Home keeps its live jobs and professionals. Only the first <section> in this editor is published; edit the Welcome section at the top." }) : null
    ] }),
    !selectedPage ? /* @__PURE__ */ jsxs("section", { className: "overflow-hidden rounded-2xl border border-border bg-card shadow-soft", children: [
      /* @__PURE__ */ jsxs("div", { className: "border-b px-5 py-4", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-semibold", children: "Website pages" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Published editor content replaces the coded page. Drafts do not affect the public site." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "divide-y", children: pages.map((page) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3 px-5 py-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("span", { className: "grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary", children: /* @__PURE__ */ jsx(FileText, { className: "h-5 w-5" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "font-medium", children: page.title }),
            /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground", children: [
              page.path,
              " · ",
              page.status === "PUBLISHED" ? "Published" : "Draft"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Button, { onClick: () => {
          setSelectedPageKey(page.pageKey);
          setMessage(null);
        }, children: [
          /* @__PURE__ */ jsx(Pencil, { className: "mr-2 h-4 w-4" }),
          "Open Editor"
        ] })
      ] }, page.pageKey)) })
    ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-5 flex flex-wrap items-center gap-3", children: [
        /* @__PURE__ */ jsxs(Button, { variant: "outline", onClick: () => setSelectedPageKey(null), children: [
          /* @__PURE__ */ jsx(ArrowLeft, { className: "mr-2 h-4 w-4" }),
          "Back to page list"
        ] }),
        /* @__PURE__ */ jsx(Button, { asChild: true, variant: "outline", children: /* @__PURE__ */ jsxs("a", { href: selectedPage.path, target: "_blank", rel: "noreferrer", children: [
          /* @__PURE__ */ jsx(ExternalLink, { className: "mr-2 h-4 w-4" }),
          "View page"
        ] }) }),
        /* @__PURE__ */ jsx("span", { className: `rounded-full px-3 py-1 text-xs font-semibold ${selectedPage.status === "PUBLISHED" ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`, children: selectedPage.status })
      ] }),
      /* @__PURE__ */ jsx("section", { className: "website-ckeditor full-page-ckeditor rounded-2xl border border-border bg-card p-4 shadow-soft", children: /* @__PURE__ */ jsx(ClientOnlyEditor, { content: selectedPage.content, onChange: (value) => setPages((current) => current.map((page) => page.pageKey === selectedPage.pageKey ? {
        ...page,
        content: value
      } : page)) }) }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4 flex flex-wrap items-center gap-3", children: [
        /* @__PURE__ */ jsxs(Button, { disabled: saving, variant: "outline", onClick: () => persistPage("DRAFT"), children: [
          /* @__PURE__ */ jsx(Save, { className: "mr-2 h-4 w-4" }),
          "Save draft"
        ] }),
        /* @__PURE__ */ jsx(Button, { disabled: saving, onClick: () => persistPage("PUBLISHED"), children: saving ? "Saving..." : "Publish page" }),
        message ? /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: message }) : null
      ] })
    ] })
  ] });
}
export {
  WebEditorPage as component
};
