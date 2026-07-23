import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { C as useAppDispatch, E as useAppSelector, F as AuthLayout, G as Form, B as Button, H as FormField, J as FormItem, K as FormLabel, L as FormControl, I as Input, M as FormMessage, V as setSignupOtpStatus, W as setSignupSendingOtp, X as FormDescription, q as Select, r as SelectTrigger, s as SelectValue, t as SelectContent, u as SelectItem, Y as setSignupShowPassword, j as createSsrRpc, Z as clearSignupFeedback, _ as setSignupSubmitting, $ as setSignupSubmitError, a0 as setSignupSuccessMessage } from "./router-DyXkltGt.js";
import { c as createServerFn } from "./server-KxTtotOh.js";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "@tanstack/react-router";
import { Chrome, EyeOff, Eye, LoaderCircle, TriangleAlert, MailCheck, CheckCircle2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { s as signupSchema } from "./signup-D54GJhA7.js";
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
const sendSignupOtp = createServerFn({
  method: "POST"
}).inputValidator((data) => z.object({
  email: z.string().trim().email("Enter a valid email address.")
}).parse(data)).handler(createSsrRpc("13c7d4217cb971cba0b9e699a15703b98809c3996d7081bf760428a8b19a87c7"));
const submitSignup = createServerFn({
  method: "POST"
}).inputValidator((data) => signupSchema.parse(data)).handler(createSsrRpc("04819e7894ac20a9e67842e674a7cafc7662fcf7d57cc791df4e9565891d8768"));
const countryCodes = [{
  value: "+1",
  label: "United States (+1)"
}, {
  value: "+44",
  label: "United Kingdom (+44)"
}, {
  value: "+61",
  label: "Australia (+61)"
}, {
  value: "+91",
  label: "India (+91)"
}, {
  value: "+971",
  label: "UAE (+971)"
}];
function Signup() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    successMessage,
    submitError,
    showPassword,
    otpStatus,
    isSendingOtp,
    isSubmitting
  } = useAppSelector((state) => state.auth.signup);
  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      accountType: "client",
      firstName: "",
      lastName: "",
      email: "",
      otp: "",
      countryCode: "+1",
      phone: "",
      password: ""
    }
  });
  const accountType = form.watch("accountType");
  function parseCountryCodeFromPhone(rawPhone) {
    const sanitized = rawPhone.replace(/\s+/g, "");
    if (!sanitized.startsWith("+")) return void 0;
    return countryCodes.slice().sort((a, b) => b.value.length - a.value.length).find((country) => sanitized.startsWith(country.value))?.value;
  }
  function handlePhoneInputChange(value, onChange) {
    const sanitized = value.replace(/[^\d+]/g, "");
    const matchedCode = parseCountryCodeFromPhone(sanitized);
    if (matchedCode) {
      const rest = sanitized.slice(matchedCode.length).replace(/\D/g, "");
      form.setValue("countryCode", matchedCode, {
        shouldValidate: true
      });
      onChange(rest);
      return;
    }
    onChange(sanitized.replace(/^\+/, ""));
  }
  const onSubmit = async (values) => {
    dispatch(clearSignupFeedback());
    dispatch(setSignupSubmitting(true));
    form.clearErrors();
    try {
      const result = await submitSignup({
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
          dispatch(setSignupSubmitError(result.formError));
        }
        return;
      }
      form.reset({
        accountType: values.accountType,
        firstName: "",
        lastName: "",
        email: "",
        otp: "",
        countryCode: values.countryCode,
        phone: "",
        password: ""
      });
      dispatch(setSignupSuccessMessage(`Account created for ${result.user.firstName} ${result.user.lastName}. Redirecting to profile setup...`));
      await navigate({
        to: result.user.role === "CLIENT" ? "/profile-setup" : "/professional-profile"
      });
    } catch (error) {
      console.error("Signup failed:", error);
      dispatch(setSignupSubmitError(error instanceof Error ? error.message : "Signup failed. Please check your details and try again."));
    } finally {
      dispatch(setSignupSubmitting(false));
    }
  };
  return /* @__PURE__ */ jsxs(AuthLayout, { title: `Create your ${accountType} account`, subtitle: "Complete every field below. Email, phone, and password are all required.", footer: /* @__PURE__ */ jsxs(Fragment, { children: [
    "Already have an account?",
    " ",
    /* @__PURE__ */ jsx(Link, { to: "/login", className: "text-primary hover:underline", children: "Log in" })
  ] }), children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-5", children: [
      /* @__PURE__ */ jsx("p", { className: "mb-3 text-sm font-medium text-foreground", children: "I’m signing up as" }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-2 rounded-xl bg-muted p-1", children: [{
        value: "client",
        label: "I'm a client"
      }, {
        value: "professional",
        label: "I'm a professional"
      }].map((option) => /* @__PURE__ */ jsx("button", { type: "button", onClick: () => form.setValue("accountType", option.value, {
        shouldValidate: true
      }), className: `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${accountType === option.value ? "bg-card text-foreground shadow-soft" : "text-muted-foreground"}`, children: option.label }, option.value)) })
    ] }),
    /* @__PURE__ */ jsx(Form, { ...form, children: /* @__PURE__ */ jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-4", noValidate: true, children: [
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-3", children: /* @__PURE__ */ jsx(Button, { asChild: true, type: "button", variant: "outline", className: "w-full", children: /* @__PURE__ */ jsxs("a", { href: "/api/auth/google?returnTo=/profile-setup", children: [
        /* @__PURE__ */ jsx(Chrome, {}),
        "Register with Google"
      ] }) }) }),
      /* @__PURE__ */ jsxs("div", { className: "relative py-2 text-center text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsx("span", { className: "relative z-10 bg-background px-3", children: "or" }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-x-0 top-1/2 h-px bg-border" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsx(FormField, { control: form.control, name: "firstName", render: ({
          field
        }) => /* @__PURE__ */ jsxs(FormItem, { children: [
          /* @__PURE__ */ jsx(FormLabel, { children: "First name" }),
          /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { placeholder: "FIRST", autoComplete: "given-name", ...field }) }),
          /* @__PURE__ */ jsx(FormMessage, {})
        ] }) }),
        /* @__PURE__ */ jsx(FormField, { control: form.control, name: "lastName", render: ({
          field
        }) => /* @__PURE__ */ jsxs(FormItem, { children: [
          /* @__PURE__ */ jsx(FormLabel, { children: "Last name" }),
          /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { placeholder: "LAST", autoComplete: "family-name", ...field }) }),
          /* @__PURE__ */ jsx(FormMessage, {})
        ] }) })
      ] }),
      /* @__PURE__ */ jsx(FormField, { control: form.control, name: "email", render: ({
        field
      }) => /* @__PURE__ */ jsxs(FormItem, { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsx(FormLabel, { children: "Email address" }),
          /* @__PURE__ */ jsx(Button, { type: "button", className: "h-9 whitespace-nowrap text-sm", onClick: async () => {
            const email = field.value.trim();
            const emailValidation = z.string().trim().email().safeParse(email);
            if (!emailValidation.success) {
              form.setError("email", {
                type: "manual",
                message: "Enter a valid email address before sending OTP."
              });
              dispatch(setSignupOtpStatus(null));
              return;
            }
            form.clearErrors("email");
            dispatch(setSignupOtpStatus("Sending OTP from Servio..."));
            dispatch(setSignupSendingOtp(true));
            try {
              const result = await sendSignupOtp({
                data: {
                  email
                }
              });
              if (!result.ok) {
                if (result.formError) {
                  dispatch(setSignupOtpStatus(result.formError));
                }
                return;
              }
              dispatch(setSignupOtpStatus("OTP sent to your email. Check your inbox."));
            } catch (error) {
              console.error("Send OTP error:", error);
              dispatch(setSignupOtpStatus("Could not send OTP. Please check the email and try again."));
            } finally {
              dispatch(setSignupSendingOtp(false));
            }
          }, disabled: isSendingOtp, children: isSendingOtp ? "Sending..." : "Send OTP" })
        ] }),
        /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { type: "email", placeholder: "you@example.com", autoComplete: "email", ...field }) }),
        /* @__PURE__ */ jsx(FormDescription, { children: "Required. This must be a valid and unique email address." }),
        /* @__PURE__ */ jsx(FormMessage, {}),
        otpStatus ? /* @__PURE__ */ jsx(OtpStatusCard, { message: otpStatus, isSending: isSendingOtp }) : null
      ] }) }),
      /* @__PURE__ */ jsx(FormField, { control: form.control, name: "otp", render: ({
        field
      }) => /* @__PURE__ */ jsxs(FormItem, { children: [
        /* @__PURE__ */ jsx(FormLabel, { children: "OTP code" }),
        /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { placeholder: "Enter OTP", autoComplete: "one-time-code", ...field }) }),
        /* @__PURE__ */ jsx(FormDescription, { children: "Enter the 4-6 digit code sent to your email." }),
        /* @__PURE__ */ jsx(FormMessage, {})
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-[180px_1fr] gap-3", children: [
        /* @__PURE__ */ jsx(FormField, { control: form.control, name: "countryCode", render: ({
          field
        }) => /* @__PURE__ */ jsxs(FormItem, { children: [
          /* @__PURE__ */ jsx(FormLabel, { children: "Country code" }),
          /* @__PURE__ */ jsxs(Select, { value: field.value, onValueChange: field.onChange, children: [
            /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Code" }) }) }),
            /* @__PURE__ */ jsx(SelectContent, { children: countryCodes.map((country) => /* @__PURE__ */ jsx(SelectItem, { value: country.value, children: country.label }, country.value)) })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(FormField, { control: form.control, name: "phone", render: ({
          field
        }) => /* @__PURE__ */ jsxs(FormItem, { children: [
          /* @__PURE__ */ jsx(FormLabel, { children: "Phone number" }),
          /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { placeholder: "555 123 4567", autoComplete: "tel", value: field.value, onChange: (event) => handlePhoneInputChange(event.target.value, field.onChange) }) }),
          /* @__PURE__ */ jsx(FormMessage, {})
        ] }) })
      ] }),
      /* @__PURE__ */ jsx(FormField, { control: form.control, name: "password", render: ({
        field
      }) => /* @__PURE__ */ jsxs(FormItem, { children: [
        /* @__PURE__ */ jsx(FormLabel, { children: "Password" }),
        /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { type: showPassword ? "text" : "password", placeholder: "Create a password", autoComplete: "new-password", ...field }) }),
        /* @__PURE__ */ jsxs("div", { className: "mt-2 flex items-center justify-between gap-2 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsx("span", { children: "Minimum 8 characters." }),
          /* @__PURE__ */ jsx("button", { type: "button", className: "text-primary hover:text-primary/80", onClick: () => dispatch(setSignupShowPassword(!showPassword)), children: showPassword ? /* @__PURE__ */ jsx(EyeOff, { size: 16 }) : /* @__PURE__ */ jsx(Eye, { size: 16 }) })
        ] }),
        /* @__PURE__ */ jsx(FormMessage, {})
      ] }) }),
      submitError ? /* @__PURE__ */ jsx("div", { className: "rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive", children: submitError }) : null,
      successMessage ? /* @__PURE__ */ jsx("div", { className: "rounded-xl border border-success/20 bg-success/5 px-4 py-3 text-sm text-success", children: successMessage }) : null,
      /* @__PURE__ */ jsx(Button, { type: "submit", className: "w-full", disabled: isSubmitting, children: "Create account" })
    ] }) })
  ] });
}
function OtpStatusCard({
  message,
  isSending
}) {
  const isError = /failed|error|invalid|could not/i.test(message);
  const Icon = isSending ? LoaderCircle : isError ? TriangleAlert : MailCheck;
  return /* @__PURE__ */ jsx("div", { className: `mt-3 rounded-xl border px-4 py-3 shadow-soft ${isSending ? "border-primary/20 bg-primary/5 text-primary" : isError ? "border-destructive/20 bg-destructive/5 text-destructive" : "border-success/20 bg-success/5 text-success"}`, children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
    /* @__PURE__ */ jsx("div", { className: `mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg ${isSending ? "bg-primary/10" : isError ? "bg-destructive/10" : "bg-success/10"}`, children: /* @__PURE__ */ jsx(Icon, { className: `h-4 w-4 ${isSending ? "animate-spin" : ""}` }) }),
    /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold", children: isSending ? "Sending OTP" : isError ? "OTP could not be sent" : "OTP sent" }),
      /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-sm opacity-85", children: message })
    ] }),
    !isSending && !isError ? /* @__PURE__ */ jsx(CheckCircle2, { className: "ml-auto h-4 w-4 shrink-0" }) : null
  ] }) });
}
export {
  Signup as component
};
