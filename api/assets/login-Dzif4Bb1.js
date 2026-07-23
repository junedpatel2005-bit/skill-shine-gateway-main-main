import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { C as useAppDispatch, E as useAppSelector, F as AuthLayout, G as Form, B as Button, H as FormField, J as FormItem, K as FormLabel, L as FormControl, I as Input, M as FormMessage, N as clearLoginFeedback, O as setLoginSubmitting, P as setLoginSubmitError, Q as setLoginSuccessMessage, j as createSsrRpc } from "./router-DyXkltGt.js";
import { c as createServerFn } from "./server-KxTtotOh.js";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "@tanstack/react-router";
import { Chrome } from "lucide-react";
import { useForm } from "react-hook-form";
import { l as loginSchema } from "./login-5WaxsvPC.js";
import "@tanstack/react-query";
import "react";
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
const submitLogin = createServerFn({
  method: "POST"
}).inputValidator((data) => loginSchema.parse(data)).handler(createSsrRpc("89f524fd6c5bf85e111a57c758b432358c7d12e411e9b7863b6f9428c6f137e5"));
function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    submitError,
    successMessage,
    isSubmitting
  } = useAppSelector((state) => state.auth.login);
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });
  const onSubmit = async (values) => {
    dispatch(clearLoginFeedback());
    dispatch(setLoginSubmitting(true));
    form.clearErrors();
    try {
      const result = await submitLogin({
        data: values
      });
      if (!result.ok) {
        Object.entries(result.fieldErrors).forEach(([field, message]) => {
          if (message) {
            form.setError(field, {
              type: "server",
              message
            });
          }
        });
        if (result.formError) {
          dispatch(setLoginSubmitError(result.formError));
        }
        return;
      }
      const nextRoute = result.user.role === "ADMIN" ? "/" : result.user.role === "CLIENT" ? "/" : result.isProfileComplete ? "/" : "/professional-profile";
      dispatch(setLoginSuccessMessage(`Welcome back ${result.user.firstName}. Redirecting...`));
      await navigate({
        to: nextRoute
      });
    } catch (error) {
      console.error("Login failed:", error);
      dispatch(setLoginSubmitError(error instanceof Error ? error.message : "Login failed. Please try again."));
    } finally {
      dispatch(setLoginSubmitting(false));
    }
  };
  return /* @__PURE__ */ jsx(AuthLayout, { title: "Welcome back", subtitle: "Log in to continue to your dashboard.", footer: /* @__PURE__ */ jsxs(Fragment, { children: [
    "Don't have an account?",
    " ",
    /* @__PURE__ */ jsx(Link, { to: "/signup", className: "text-primary hover:underline", children: "Sign up" })
  ] }), children: /* @__PURE__ */ jsx(Form, { ...form, children: /* @__PURE__ */ jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-4", noValidate: true, children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsx(Button, { asChild: true, type: "button", variant: "outline", children: /* @__PURE__ */ jsxs("a", { href: "/api/auth/google?returnTo=/", children: [
        /* @__PURE__ */ jsx(Chrome, {}),
        "Continue with Google"
      ] }) }),
      /* @__PURE__ */ jsx(Button, { type: "button", variant: "outline", children: "Continue with Apple" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "relative py-2 text-center text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsx("span", { className: "relative z-10 bg-background px-3", children: "or" }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-x-0 top-1/2 h-px bg-border" })
    ] }),
    /* @__PURE__ */ jsx(FormField, { control: form.control, name: "email", render: ({
      field
    }) => /* @__PURE__ */ jsxs(FormItem, { children: [
      /* @__PURE__ */ jsx(FormLabel, { children: "Email" }),
      /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { type: "email", placeholder: "you@example.com", autoComplete: "email", ...field }) }),
      /* @__PURE__ */ jsx(FormMessage, {})
    ] }) }),
    /* @__PURE__ */ jsx(FormField, { control: form.control, name: "password", render: ({
      field
    }) => /* @__PURE__ */ jsxs(FormItem, { children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsx(FormLabel, { children: "Password" }),
        /* @__PURE__ */ jsx(Link, { to: "/forgot-password", className: "text-xs text-primary hover:underline", children: "Forgot?" })
      ] }),
      /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { type: "password", placeholder: "••••••••", autoComplete: "current-password", ...field }) }),
      /* @__PURE__ */ jsx(FormMessage, {})
    ] }) }),
    submitError ? /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: submitError }) : null,
    successMessage ? /* @__PURE__ */ jsx("p", { className: "text-sm text-success", children: successMessage }) : null,
    /* @__PURE__ */ jsx(Button, { type: "submit", className: "w-full", disabled: isSubmitting, children: "Log in" })
  ] }) }) });
}
export {
  Login as component
};
