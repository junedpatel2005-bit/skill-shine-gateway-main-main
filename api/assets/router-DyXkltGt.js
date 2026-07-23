import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Link, useRouterState, createRootRouteWithContext, useRouter, useLocation, Outlet, HeadContent, Scripts, createFileRoute, lazyRouteComponent, useNavigate, useLoaderData, redirect, useSearch, notFound, createRouter } from "@tanstack/react-router";
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { T as TSS_SERVER_FUNCTION, g as getServerFnById, c as createServerFn } from "./server-KxTtotOh.js";
import * as React from "react";
import { useState, useEffect, useRef, useCallback, useMemo, useEffectEvent } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { Toaster as Toaster$1, toast } from "sonner";
import { createSlice, configureStore } from "@reduxjs/toolkit";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Briefcase, User, LogOut, X, Menu, Facebook, Instagram, Linkedin, Twitter, ShieldCheck, UserCog, BadgeCheck, Wallet as Wallet$1, FileText, FolderKanban, LayoutTemplate, MessageSquare, LayoutDashboard, Users, PlusCircle, Home, Search, Bell, ArrowRight, Star, Video, Phone, PhoneOff, BellRing, Command, Loader2, ReceiptText, AlertTriangle, BriefcaseBusiness, ChevronDown, Check, ChevronUp, ChevronRight, TrendingUp, Radio, Zap, ClipboardList, DollarSign, Clock3, Building2, CalendarRange, MapPin, CheckCheck, Trash2, UserPlus, CalendarClock, FilePlus2, MapPinHouse, Paperclip, Map as Map$1, Save, BookmarkCheck, LocateFixed, SlidersHorizontal, Clock, ArrowDownToLine, CheckCircle2, LoaderCircle, TriangleAlert, MailCheck, MoreHorizontal, Smile, Send, UserRound, Pencil, ImagePlus, Heart, CalendarDays, BellOff, ChevronLeft, Upload, FileBadge, FileCheck, Camera, Mail, Handshake, XCircle, Sparkles, IdCard, Shield, FileCheck2, AlertCircle, FileUp, Tag, Settings, ExternalLink, Share2, Timer, RotateCcw } from "lucide-react";
import { io } from "socket.io-client";
import * as SelectPrimitive from "@radix-ui/react-select";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { z } from "zod";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as LabelPrimitive from "@radix-ui/react-label";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, Controller, useFormContext, useForm } from "react-hook-form";
import { f as forgotPasswordRequestSchema, r as resetPasswordSchema } from "./forgot-password-D1FDXg_D.js";
import { c as clientProfileSchema } from "./client-profile-B1xUUnTZ.js";
import { s as saveClientJobSchema } from "../server.js";
import * as SliderPrimitive from "@radix-ui/react-slider";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({ className, variant, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: cn(badgeVariants({ variant }), className), ...props });
}
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const appCss = "/assets/styles-CnHhkSmE.css";
const initialState$1 = {
  login: {
    submitError: null,
    successMessage: null,
    isSubmitting: false
  },
  signup: {
    submitError: null,
    successMessage: null,
    showPassword: false,
    otpStatus: null,
    isSendingOtp: false,
    isSubmitting: false
  }
};
const authSlice = createSlice({
  name: "auth",
  initialState: initialState$1,
  reducers: {
    clearLoginFeedback(state) {
      state.login.submitError = null;
      state.login.successMessage = null;
    },
    setLoginSubmitError(state, action) {
      state.login.submitError = action.payload;
    },
    setLoginSuccessMessage(state, action) {
      state.login.successMessage = action.payload;
    },
    setLoginSubmitting(state, action) {
      state.login.isSubmitting = action.payload;
    },
    resetLoginState(state) {
      state.login = initialState$1.login;
    },
    clearSignupFeedback(state) {
      state.signup.submitError = null;
      state.signup.successMessage = null;
    },
    setSignupSubmitError(state, action) {
      state.signup.submitError = action.payload;
    },
    setSignupSuccessMessage(state, action) {
      state.signup.successMessage = action.payload;
    },
    setSignupShowPassword(state, action) {
      state.signup.showPassword = action.payload;
    },
    setSignupOtpStatus(state, action) {
      state.signup.otpStatus = action.payload;
    },
    setSignupSendingOtp(state, action) {
      state.signup.isSendingOtp = action.payload;
    },
    setSignupSubmitting(state, action) {
      state.signup.isSubmitting = action.payload;
    },
    resetSignupState(state) {
      state.signup = initialState$1.signup;
    }
  }
});
const {
  clearLoginFeedback,
  clearSignupFeedback,
  resetLoginState,
  resetSignupState,
  setLoginSubmitError,
  setLoginSubmitting,
  setLoginSuccessMessage,
  setSignupOtpStatus,
  setSignupSendingOtp,
  setSignupShowPassword,
  setSignupSubmitError,
  setSignupSubmitting,
  setSignupSuccessMessage
} = authSlice.actions;
const authReducer = authSlice.reducer;
const initialState = {
  profilePhotoPreview: "",
  successMessage: null,
  submitError: null,
  newLocationLabel: "",
  newLocationAddress: "",
  newHiringNeed: "",
  isLoading: false
};
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfilePhotoPreview: (state, action) => {
      state.profilePhotoPreview = action.payload;
    },
    setSuccessMessage: (state, action) => {
      state.successMessage = action.payload;
    },
    setSubmitError: (state, action) => {
      state.submitError = action.payload;
    },
    setNewLocationLabel: (state, action) => {
      state.newLocationLabel = action.payload;
    },
    setNewLocationAddress: (state, action) => {
      state.newLocationAddress = action.payload;
    },
    setNewHiringNeed: (state, action) => {
      state.newHiringNeed = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    resetProfileState: (state) => {
      state.successMessage = null;
      state.submitError = null;
      state.newLocationLabel = "";
      state.newLocationAddress = "";
      state.newHiringNeed = "";
      state.isLoading = false;
    },
    clearMessages: (state) => {
      state.successMessage = null;
      state.submitError = null;
    }
  }
});
const {
  setProfilePhotoPreview,
  setSuccessMessage,
  setSubmitError,
  setNewLocationLabel,
  setNewLocationAddress,
  setNewHiringNeed,
  setIsLoading,
  resetProfileState,
  clearMessages
} = profileSlice.actions;
const profileReducer = profileSlice.reducer;
const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer
  }
});
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref, ...props });
  }
);
Button.displayName = "Button";
function Logo({
  className = "",
  linked = true,
  label = "Servio"
}) {
  const content = /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("span", { className: "grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground shadow-soft", children: /* @__PURE__ */ jsx(Briefcase, { className: "h-4 w-4" }) }),
    /* @__PURE__ */ jsx("span", { className: "text-xl tracking-tight", children: label })
  ] });
  if (!linked) {
    return /* @__PURE__ */ jsx(
      "div",
      {
        className: `flex items-center gap-2 font-display font-bold text-foreground ${className}`,
        children: content
      }
    );
  }
  return /* @__PURE__ */ jsx(
    Link,
    {
      to: "/",
      className: `flex items-center gap-2 font-display font-bold text-foreground ${className}`,
      children: content
    }
  );
}
const logoutAction = createServerFn({
  method: "POST"
}).handler(createSsrRpc("d6cb18f803edd4461bd987b58b861aeac8b544386153c085fd62a805954f078d"));
const links = [{
  to: "/",
  label: "Home"
}, {
  to: "/how-it-works",
  label: "How It Works"
}, {
  to: "/services",
  label: "Services"
}, {
  to: "/for-clients",
  label: "For Clients"
}, {
  to: "/for-professionals",
  label: "For Professionals"
}, {
  to: "/pricing",
  label: "Pricing"
}, {
  to: "/faq",
  label: "FAQ"
}];
const getSiteHeaderUser = createServerFn({
  method: "GET"
}).handler(createSsrRpc("47ad1f1e83a28c5c50411a048bd05de7a364ac9e0ca0cb9a48b4b93ea90f3f09"));
function SiteHeader({
  user,
  onLogout
}) {
  const [open, setOpen] = useState(false);
  const [viewer, setViewer] = useState(user ?? null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const path = useRouterState({
    select: (state) => state.location.pathname
  });
  const profileHref = viewer?.role === "ADMIN" ? "/" : viewer?.role === "CLIENT" ? "/my-info" : "/professional-profile";
  const isActiveLink = (to) => to === "/" ? path === "/" : path.startsWith(to);
  useEffect(() => {
    if (user !== void 0) {
      setViewer(user);
      return;
    }
    let cancelled = false;
    getSiteHeaderUser().then((currentUser) => {
      if (!cancelled) {
        setViewer(currentUser);
      }
    }).catch(() => {
      if (!cancelled) {
        setViewer(null);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [user]);
  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const result = onLogout ? await onLogout() : await logoutAction();
      if (result.ok) {
        window.location.assign("/login");
      }
    } catch (error) {
      console.error("Logout failed:", error);
      setIsLoggingOut(false);
    }
  };
  return /* @__PURE__ */ jsxs("header", { className: "sticky top-0 z-40 w-full border-b border-border/60 bg-background/85 backdrop-blur-md", children: [
    /* @__PURE__ */ jsxs("div", { className: "mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-8", children: [
        /* @__PURE__ */ jsx(Logo, { linked: false }),
        /* @__PURE__ */ jsx("nav", { className: "hidden items-center gap-6 lg:flex", children: links.map((l) => {
          const active = isActiveLink(l.to);
          return /* @__PURE__ */ jsx(Link, { to: l.to, className: `rounded-full px-3 py-1.5 text-sm transition-colors ${active ? "bg-primary/10 font-semibold text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`, children: l.label }, l.to);
        }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "hidden items-center gap-2 lg:flex", children: viewer ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(Button, { asChild: true, variant: "outline", size: "sm", children: /* @__PURE__ */ jsxs(Link, { to: profileHref, className: `flex items-center gap-2 ${isActiveLink(profileHref) ? "text-primary" : ""}`, children: [
          /* @__PURE__ */ jsx(User, { className: "h-4 w-4" }),
          "Profile"
        ] }) }),
        /* @__PURE__ */ jsxs(Button, { variant: "ghost", size: "sm", onClick: handleLogout, disabled: isLoggingOut, className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(LogOut, { className: "h-4 w-4" }),
          isLoggingOut ? "Logging out..." : "Logout"
        ] })
      ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(Button, { asChild: true, variant: isActiveLink("/login") ? "outline" : "ghost", size: "sm", children: /* @__PURE__ */ jsx(Link, { to: "/login", className: isActiveLink("/login") ? "text-primary" : "", children: "Log in" }) }),
        /* @__PURE__ */ jsx(Button, { asChild: true, variant: "outline", size: "sm", children: /* @__PURE__ */ jsx(Link, { to: "/signup", className: isActiveLink("/signup") ? "text-primary" : "", children: "Sign up" }) }),
        /* @__PURE__ */ jsx(Button, { asChild: true, size: "sm", className: "bg-cta text-cta-foreground hover:bg-cta/90 shadow-soft", children: /* @__PURE__ */ jsx(Link, { to: "/post-job", children: "Post a Job" }) })
      ] }) }),
      /* @__PURE__ */ jsx("button", { className: "lg:hidden", onClick: () => setOpen(!open), "aria-label": "Toggle menu", children: open ? /* @__PURE__ */ jsx(X, { className: "h-5 w-5" }) : /* @__PURE__ */ jsx(Menu, { className: "h-5 w-5" }) })
    ] }),
    open && /* @__PURE__ */ jsx("div", { className: "border-t border-border bg-background lg:hidden", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3", children: [
      links.map((l) => {
        const active = isActiveLink(l.to);
        return /* @__PURE__ */ jsx(Link, { to: l.to, className: `rounded-md px-3 py-2 text-sm transition-colors ${active ? "bg-primary/10 font-semibold text-primary" : "text-foreground hover:bg-muted"}`, onClick: () => setOpen(false), children: l.label }, l.to);
      }),
      /* @__PURE__ */ jsx("div", { className: "mt-2 flex flex-col gap-2", children: viewer ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(Button, { asChild: true, variant: "outline", size: "sm", children: /* @__PURE__ */ jsxs(Link, { to: profileHref, onClick: () => setOpen(false), children: [
          /* @__PURE__ */ jsx(User, { className: "h-4 w-4 mr-2" }),
          "Profile"
        ] }) }),
        /* @__PURE__ */ jsxs(Button, { variant: "ghost", size: "sm", onClick: () => {
          setOpen(false);
          handleLogout();
        }, className: "justify-start", children: [
          /* @__PURE__ */ jsx(LogOut, { className: "h-4 w-4 mr-2" }),
          "Logout"
        ] })
      ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(Button, { asChild: true, variant: "outline", size: "sm", children: /* @__PURE__ */ jsx(Link, { to: "/login", children: "Log in" }) }),
        /* @__PURE__ */ jsx(Button, { asChild: true, size: "sm", className: "bg-cta text-cta-foreground hover:bg-cta/90", children: /* @__PURE__ */ jsx(Link, { to: "/post-job", children: "Post a Job" }) })
      ] }) })
    ] }) })
  ] });
}
const loadFooterPages = createServerFn({
  method: "GET"
}).handler(createSsrRpc("978f656b55bcfafae5855f5f72ec85ca2d229bcd432622e80f38a271889c3b0c"));
const fallbackColumns = [{
  title: "Company",
  links: [{
    l: "About",
    to: "/about-us"
  }, {
    l: "Careers"
  }, {
    l: "Blog"
  }]
}, {
  title: "Support",
  links: [{
    l: "FAQ",
    to: "/faq"
  }, {
    l: "Contact",
    to: "/contact-us"
  }, {
    l: "Help Center"
  }]
}, {
  title: "Legal",
  links: [{
    l: "Privacy Policy",
    to: "/privacy-policy"
  }, {
    l: "Terms",
    to: "/terms-and-conditions"
  }, {
    l: "Cookies"
  }]
}];
function SiteFooter() {
  const [legalPages, setLegalPages] = useState([]);
  useEffect(() => {
    loadFooterPages().then(setLegalPages).catch(() => setLegalPages([]));
  }, []);
  const columns = [fallbackColumns[0], fallbackColumns[1], {
    ...fallbackColumns[2],
    links: buildLegalLinks(legalPages)
  }];
  return /* @__PURE__ */ jsxs("footer", { className: "border-t border-border bg-ink text-ink-foreground", children: [
    /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-5 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
        /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-2 font-display text-xl font-bold text-white", children: [
          /* @__PURE__ */ jsx("span", { className: "grid h-9 w-9 place-items-center rounded-lg bg-cta text-cta-foreground", children: "S" }),
          "Servio"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 max-w-sm text-sm text-white/65", children: "The trusted marketplace where clients meet vetted professionals. Post jobs, hire experts, track work — all in one platform." }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 flex gap-2 text-white/70", children: [
          /* @__PURE__ */ jsx("a", { href: "#", className: "rounded-md p-2 hover:bg-white/10 hover:text-white", children: /* @__PURE__ */ jsx(Facebook, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsx("a", { href: "#", className: "rounded-md p-2 hover:bg-white/10 hover:text-white", children: /* @__PURE__ */ jsx(Instagram, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsx("a", { href: "#", className: "rounded-md p-2 hover:bg-white/10 hover:text-white", children: /* @__PURE__ */ jsx(Linkedin, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsx("a", { href: "#", className: "rounded-md p-2 hover:bg-white/10 hover:text-white", children: /* @__PURE__ */ jsx(Twitter, { className: "h-4 w-4" }) })
        ] })
      ] }),
      columns.map((column) => /* @__PURE__ */ jsx(FooterCol, { title: column.title, links: column.links }, column.title))
    ] }),
    /* @__PURE__ */ jsx("div", { className: "border-t border-white/10", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-white/50 sm:flex-row sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsx("span", { children: "© 2026 Servio, Inc. All rights reserved." }),
      /* @__PURE__ */ jsx("span", { children: "Made for trusted local & remote work." })
    ] }) })
  ] });
}
function FooterCol({
  title,
  links: links2
}) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h4", { className: "font-display text-sm font-semibold text-white", children: title }),
    /* @__PURE__ */ jsx("ul", { className: "mt-4 space-y-2 text-sm text-white/65", children: links2.map((l) => /* @__PURE__ */ jsx("li", { children: l.to ? /* @__PURE__ */ jsx(Link, { to: l.to, className: "hover:text-white", children: l.l }) : /* @__PURE__ */ jsx("span", { className: "cursor-default text-white/40", children: l.l }) }, l.l)) })
  ] });
}
function buildLegalLinks(pages) {
  const preferredOrder = ["faq", "terms-and-conditions", "privacy-policy"];
  const orderedPages = [...pages].sort((left, right) => {
    const leftIndex = preferredOrder.indexOf(left.slug);
    const rightIndex = preferredOrder.indexOf(right.slug);
    return (leftIndex === -1 ? preferredOrder.length : leftIndex) - (rightIndex === -1 ? preferredOrder.length : rightIndex);
  });
  return orderedPages.map((page) => ({
    l: page.slug === "faq" ? "FAQ" : page.slug === "terms-and-conditions" ? "Terms" : page.title,
    to: `/${page.slug}`
  }));
}
const loadPublishedEditorPages = createServerFn({
  method: "GET"
}).handler(createSsrRpc("a21b3d6cf93c73b3a0a3bfb37e618c75f752705a70cc7607a5e2db6bbb3eb8c3"));
function NotFoundComponent() {
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsx(Link, { to: "/", className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90", children: "Go home" }) })
  ] }) });
}
function ErrorComponent({
  error,
  reset
}) {
  console.error(error);
  const router2 = useRouter();
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsx("button", { onClick: () => {
        router2.invalidate();
        reset();
      }, className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90", children: "Try again" }),
      /* @__PURE__ */ jsx("a", { href: "/", className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent", children: "Go home" })
    ] })
  ] }) });
}
const Route$1a = createRootRouteWithContext()({
  loader: () => loadPublishedEditorPages(),
  head: () => ({
    meta: [{
      charSet: "utf-8"
    }, {
      name: "viewport",
      content: "width=device-width, initial-scale=1"
    }, {
      title: "Servio — Hire trusted professionals near you"
    }, {
      name: "description",
      content: "Servio is the trusted marketplace to post jobs, hire vetted professionals, track work and manage payments — all in one place."
    }, {
      name: "author",
      content: "Servio"
    }, {
      property: "og:title",
      content: "Servio — Hire trusted professionals near you"
    }, {
      property: "og:description",
      content: "Post jobs, hire experts, track work and manage projects in one platform."
    }, {
      property: "og:type",
      content: "website"
    }, {
      name: "twitter:card",
      content: "summary"
    }, {
      name: "twitter:site",
      content: "@Lovable"
    }],
    links: [{
      rel: "preconnect",
      href: "https://fonts.googleapis.com"
    }, {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "anonymous"
    }, {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap"
    }, {
      rel: "stylesheet",
      href: appCss
    }]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({
  children
}) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const {
    queryClient
  } = Route$1a.useRouteContext();
  const pages = Route$1a.useLoaderData();
  const location = useLocation();
  const editorPage = location.pathname === "/" ? void 0 : pages.find((page) => page.path === location.pathname);
  return /* @__PURE__ */ jsx(Provider, { store, children: /* @__PURE__ */ jsxs(QueryClientProvider, { client: queryClient, children: [
    /* @__PURE__ */ jsx(ActivityToastListener, {}),
    editorPage ? /* @__PURE__ */ jsx(PublishedEditorPage, { page: editorPage }) : /* @__PURE__ */ jsx(Outlet, {}),
    /* @__PURE__ */ jsx(Toaster, { position: "bottom-right", richColors: true, closeButton: true })
  ] }) });
}
function PublishedEditorPage({
  page
}) {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsx(SiteHeader, {}),
    /* @__PURE__ */ jsx("main", { className: "cms-old", dangerouslySetInnerHTML: {
      __html: page.content
    } }),
    /* @__PURE__ */ jsx(SiteFooter, {})
  ] });
}
function ActivityToastListener() {
  const lastToastRef = useRef(null);
  useEffect(() => {
    const onClick = (event) => {
      if (event.button !== 0) {
        return;
      }
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }
      const actionElement = target.closest("a[href], button, [role='button'], [data-activity-toast]");
      if (!actionElement || shouldSkipActivityToast(actionElement)) {
        return;
      }
      const label = getActivityLabel(actionElement);
      const message = label ? getActivityMessage(label, actionElement) : "";
      if (!message) {
        return;
      }
      const now = Date.now();
      const lastToast = lastToastRef.current;
      if (lastToast?.label === message && now - lastToast.shownAt < 900) {
        return;
      }
      lastToastRef.current = {
        label: message,
        shownAt: now
      };
      toast.info(message, {
        duration: 1500
      });
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);
  return null;
}
function shouldSkipActivityToast(element) {
  if (element.dataset.noActivityToast === "true" || element.getAttribute("aria-disabled") === "true" || element.closest("[data-no-activity-toast='true']")) {
    return true;
  }
  if (element instanceof HTMLButtonElement && element.disabled) {
    return true;
  }
  const label = getActivityLabel(element).toLowerCase();
  const ignoredLabels = /* @__PURE__ */ new Set(["", "toggle menu", "hide call popup", "close message popup", "close notification popup", "close"]);
  return ignoredLabels.has(label);
}
function getActivityLabel(element) {
  return (element.dataset.activityToast || element.getAttribute("aria-label") || element.textContent || "").replace(/\s+/g, " ").trim();
}
function getActivityMessage(label, element) {
  const normalized = label.toLowerCase();
  const href = element instanceof HTMLAnchorElement ? element.getAttribute("href") || "" : "";
  if (normalized.includes("track project") || href.includes("project-track")) {
    return "Tracking project";
  }
  if (normalized.includes("view profile") || href.includes("/pro/")) {
    return "Opening profile";
  }
  if (normalized.includes("view job") || href.includes("/job/")) {
    return "Opening job";
  }
  if (normalized.includes("open messages") || normalized === "message" || href.includes("messages")) {
    return "Opening messages";
  }
  if (normalized.includes("notification")) {
    return "Opening notification";
  }
  if (normalized.startsWith("save") || normalized.includes(" save")) {
    return "Saving";
  }
  if (normalized.startsWith("apply") || normalized.includes("apply")) {
    return "Applying";
  }
  if (normalized.startsWith("accept")) {
    return "Accepting request";
  }
  if (normalized.startsWith("reject") || normalized.startsWith("decline")) {
    return "Declining request";
  }
  if (normalized.startsWith("start")) {
    return "Starting project";
  }
  if (normalized.startsWith("cancel")) {
    return "Cancelling";
  }
  if (normalized.startsWith("delete") || normalized.startsWith("remove")) {
    return "Removing";
  }
  if (normalized.startsWith("clear")) {
    return "Clearing";
  }
  if (normalized.startsWith("mark all read")) {
    return "Marking notifications read";
  }
  if (normalized.startsWith("post")) {
    return "Opening post job";
  }
  if (normalized.startsWith("view") || normalized.startsWith("open")) {
    return `Opening ${label.replace(/^(view|open)\s+/i, "").toLowerCase() || "page"}`;
  }
  if (element instanceof HTMLAnchorElement) {
    return `Opening ${label.toLowerCase()}`;
  }
  return `${label} selected`;
}
const $$splitComponentImporter$l = () => import("./index-KAvB0iWl.js");
const getCurrentUserFn = createServerFn({
  method: "GET"
}).handler(createSsrRpc("50c70bc07b503c6662e88c80b6c6da6d6dc2e14b88aab95aee2e3aa832bea6fe"));
const getHomeData$1 = createServerFn({
  method: "GET"
}).handler(createSsrRpc("e5d3f5d948391b170b648653d55968324eb90a864ee693154a5ada87efb58755"));
const Route$19 = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "Servio — Find Trusted Professionals Near You"
    }, {
      name: "description",
      content: "Post jobs, hire experts, track work, and manage projects in one platform."
    }]
  }),
  beforeLoad: async () => {
    const user = await getCurrentUserFn();
    return {
      user,
      logout: logoutAction
    };
  },
  loader: () => getHomeData$1(),
  component: lazyRouteComponent($$splitComponentImporter$l, "component")
});
const $$splitComponentImporter$k = () => import("./_legalPageSlug-Dwsy3ksX.js");
const loadLegalPage = createServerFn({
  method: "GET"
}).inputValidator((input) => input).handler(createSsrRpc("0e146aa39fde9d262e6e06f126a0893e440b786e0b8895f309e09355d861878f"));
const Route$18 = createFileRoute("/$legalPageSlug")({
  loader: ({
    params
  }) => loadLegalPage({
    data: {
      slug: params.legalPageSlug
    }
  }),
  component: lazyRouteComponent($$splitComponentImporter$k, "component")
});
const $$splitComponentImporter$j = () => import("./about-us-DvTfbSCX.js");
const Route$17 = createFileRoute("/about-us")({
  head: () => ({
    meta: [{
      title: "About Us - Servio"
    }, {
      name: "description",
      content: "Learn about Servio's mission, story, and values."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$j, "component")
});
const NOTIFICATION_POPUP_MS = 3e3;
const getNotificationSnapshot = createServerFn({
  method: "GET"
}).handler(createSsrRpc("47ad464b6b0b07fa3ee9d80b2e3474c6d1faa7c83291e440ab9d7ca5511c8fb4"));
const getRealtimeViewer = createServerFn({
  method: "GET"
}).handler(createSsrRpc("2080a9744ef24ed1f2349176327a3f409d884f7adb9f61528d71686ec276c885"));
const loadNotificationPanelData = createServerFn({
  method: "GET"
}).handler(createSsrRpc("3663e1dcb3d83c2308c4233fc773cfd0b41d86e50aee0505ca87d4d9743e05b4"));
const clientItems = [{
  to: "/dashboard",
  icon: LayoutDashboard,
  label: "Dashboard"
}, {
  to: "/my-info",
  icon: User,
  label: "My info"
}, {
  to: "/discover",
  icon: Users,
  label: "Find pros"
}, {
  to: "/post-job",
  icon: PlusCircle,
  label: "Post a job"
}, {
  to: "/projects",
  icon: FolderKanban,
  label: "Projects"
}, {
  to: "/messages",
  icon: MessageSquare,
  label: "Messages"
}, {
  to: "/earnings",
  icon: Wallet$1,
  label: "Earnings"
}, {
  to: "/client-reports",
  icon: FileText,
  label: "Reports"
}];
const professionalItems = [{
  to: "/professional-profile",
  icon: User,
  label: "Profile"
}, {
  to: "/professional-messages",
  icon: MessageSquare,
  label: "Messages"
}, {
  to: "/professional-stats",
  icon: Wallet$1,
  label: "My stats"
}, {
  to: "/professional-reports",
  icon: FileText,
  label: "Reports"
}];
const adminItems = [{
  to: "/admin",
  icon: ShieldCheck,
  label: "Admin panel"
}, {
  to: "/user-management",
  icon: UserCog,
  label: "User management"
}, {
  to: "/verification-management",
  icon: BadgeCheck,
  label: "Verification"
}, {
  to: "/job-management",
  icon: Briefcase,
  label: "Job & Dispute Management"
}, {
  to: "/earnings-reports",
  icon: Wallet$1,
  label: "Earnings & Payouts"
}, {
  to: "/admin-reports",
  icon: FileText,
  label: "Reports"
}, {
  to: "/admin-categories",
  icon: FolderKanban,
  label: "Categories"
}, {
  to: "/web-editor",
  icon: LayoutTemplate,
  label: "Web Editor"
}];
const clientMobileItems = [{
  to: "/dashboard",
  icon: Home,
  label: "Home"
}, {
  to: "/discover",
  icon: Search,
  label: "Search"
}, {
  to: "/projects",
  icon: Briefcase,
  label: "Jobs"
}, {
  to: "/messages",
  icon: MessageSquare,
  label: "Messages"
}, {
  to: "/my-info",
  icon: User,
  label: "Profile"
}, {
  to: "/client-reports",
  icon: FileText,
  label: "Reports"
}];
const professionalMobileItems = [{
  to: "/professional-profile",
  icon: User,
  label: "Profile"
}, {
  to: "/professional-messages",
  icon: MessageSquare,
  label: "Messages"
}, {
  to: "/professional-stats",
  icon: Wallet$1,
  label: "Stats"
}, {
  to: "/professional-reports",
  icon: FileText,
  label: "Reports"
}];
const adminMobileItems = [{
  to: "/admin",
  icon: ShieldCheck,
  label: "Admin"
}, {
  to: "/user-management",
  icon: UserCog,
  label: "Users"
}, {
  to: "/verification-management",
  icon: BadgeCheck,
  label: "Verify"
}, {
  to: "/job-management",
  icon: Briefcase,
  label: "Jobs"
}, {
  to: "/earnings-reports",
  icon: Wallet$1,
  label: "Payouts"
}, {
  to: "/admin-reports",
  icon: FileText,
  label: "Reports"
}, {
  to: "/admin-categories",
  icon: FolderKanban,
  label: "Categories"
}, {
  to: "/web-editor",
  icon: LayoutTemplate,
  label: "Editor"
}];
function normalizePath(path) {
  return path.replace(/\/+$/, "") || "/";
}
function isActivePath(path, target) {
  const normalizedPath = normalizePath(path);
  const normalizedTarget = normalizePath(target);
  return normalizedPath === normalizedTarget || normalizedPath.startsWith(`${normalizedTarget}/`);
}
function AppShell({
  children,
  title,
  userName = "Alex Rivers",
  userRole = "Client",
  userAvatarUrl = "https://i.pravatar.cc/100?u=me"
}) {
  const path = useRouterState({
    select: (s) => s.location.pathname
  });
  const navigate = useNavigate();
  const searchParam = useRouterState({
    select: (s) => s.location.search.search
  });
  const [globalSearch, setGlobalSearch] = useState(searchParam || "");
  useEffect(() => {
    setGlobalSearch(searchParam || "");
  }, [searchParam]);
  const isProfessional = userRole.toLowerCase() === "professional";
  const isAdmin = userRole.toLowerCase() === "admin";
  const items = isAdmin ? adminItems : isProfessional ? professionalItems : clientItems;
  const mobileItems = isAdmin ? adminMobileItems : isProfessional ? professionalMobileItems : clientMobileItems;
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [realtimeViewer, setRealtimeViewer] = useState(null);
  const [messagePopup, setMessagePopup] = useState(null);
  const [notificationPopup, setNotificationPopup] = useState(null);
  const [notificationPanelOpen, setNotificationPanelOpen] = useState(false);
  const [notificationPanelItems, setNotificationPanelItems] = useState([]);
  const [notificationPanelLoading, setNotificationPanelLoading] = useState(false);
  const notificationPreferencesRef = useRef({
    emailNotificationsEnabled: true,
    browserNotificationsEnabled: true,
    projectActivityNotificationsEnabled: true
  });
  const [bellBurst, setBellBurst] = useState(false);
  const [incomingCall, setIncomingCall] = useState(null);
  const latestNotificationKeyRef = useRef(null);
  const notificationPopupTimeoutRef = useRef(null);
  const notificationQueueRef = useRef([]);
  const notificationQueueActiveRef = useRef(false);
  const displayedNotificationKeyRef = useRef(null);
  const notificationStorageKeyRef = useRef(null);
  const notificationSnapshotSignatureRef = useRef(null);
  const notificationQueueTimeoutRef = useRef(null);
  const showNotificationAlert = useCallback((notification, preferences, options = {}) => {
    if (notificationPopupTimeoutRef.current) {
      window.clearTimeout(notificationPopupTimeoutRef.current);
    }
    setBellBurst(true);
    setNotificationPopup(notification);
    displayedNotificationKeyRef.current = notification.key;
    toast.info(notification.title, {
      description: notification.description,
      duration: NOTIFICATION_POPUP_MS,
      action: {
        label: "View",
        onClick: () => window.location.assign(notification.href)
      }
    });
    if (options.showNative !== false) {
      showBrowserNotification(notification.title, notification.description, notification.href, preferences);
    }
    window.setTimeout(() => setBellBurst(false), 900);
    notificationPopupTimeoutRef.current = window.setTimeout(() => {
      setNotificationPopup((current) => current?.key === notification.key ? null : current);
      if (displayedNotificationKeyRef.current === notification.key) {
        displayedNotificationKeyRef.current = null;
      }
      notificationPopupTimeoutRef.current = null;
    }, NOTIFICATION_POPUP_MS);
  }, []);
  const showQueuedNotificationAlerts = useCallback((notifications, preferences) => {
    const queuedKeys = new Set(notificationQueueRef.current.map((notification) => notification.key));
    notificationQueueRef.current.push(...notifications.filter((notification) => notification.key !== displayedNotificationKeyRef.current && !queuedKeys.has(notification.key)));
    if (notificationQueueActiveRef.current || notificationQueueRef.current.length === 0) return;
    notificationQueueActiveRef.current = true;
    const showNext = () => {
      const next = notificationQueueRef.current.shift();
      if (!next) {
        notificationQueueActiveRef.current = false;
        return;
      }
      if (notificationStorageKeyRef.current) {
        window.localStorage.setItem(notificationStorageKeyRef.current, next.key);
      }
      showNotificationAlert(next, preferences);
      notificationQueueTimeoutRef.current = window.setTimeout(showNext, NOTIFICATION_POPUP_MS + 250);
    };
    showNext();
  }, [showNotificationAlert]);
  useEffect(() => {
    return () => {
      if (notificationPopupTimeoutRef.current) {
        window.clearTimeout(notificationPopupTimeoutRef.current);
      }
      if (notificationQueueTimeoutRef.current) {
        window.clearTimeout(notificationQueueTimeoutRef.current);
      }
      notificationQueueRef.current = [];
      notificationQueueActiveRef.current = false;
    };
  }, []);
  const refreshNotifications = useCallback(async (showToast = false) => {
    try {
      const snapshot = await getNotificationSnapshot();
      const latest = snapshot.latest;
      setUnreadNotifications(snapshot.unreadCount);
      notificationPreferencesRef.current = snapshot.preferences;
      const signature = `${snapshot.unreadCount}:${snapshot.latest?.key || "none"}`;
      if (notificationSnapshotSignatureRef.current !== signature) {
        notificationSnapshotSignatureRef.current = signature;
        window.dispatchEvent(new CustomEvent("servio:notifications-refreshed"));
      }
      if (!latest) {
        latestNotificationKeyRef.current = null;
        return;
      }
      const storageKey2 = snapshot.viewerId ? `servio:last-notification-key:${snapshot.viewerId}` : null;
      notificationStorageKeyRef.current = storageKey2;
      const lastSeenKey = storageKey2 ? window.localStorage.getItem(storageKey2) : latestNotificationKeyRef.current;
      const lastSeenIndex = lastSeenKey ? snapshot.unread.findIndex((notification) => notification.key === lastSeenKey) : -1;
      const missed = lastSeenKey ? lastSeenIndex >= 0 ? snapshot.unread.slice(0, lastSeenIndex) : snapshot.unread : snapshot.viewerRole === "ADMIN" ? snapshot.unread : [];
      latestNotificationKeyRef.current = latest.key;
      if (!missed.length && !showToast) {
        return;
      }
      const alerts = (missed.length ? missed : snapshot.unread.slice(0, 1)).slice().reverse().map(({
        key,
        title: title2,
        description,
        href,
        type
      }) => {
        const notification = {
          key,
          title: title2,
          description,
          href,
          type,
          createdAt: (/* @__PURE__ */ new Date()).toISOString()
        };
        return notification;
      });
      showQueuedNotificationAlerts(alerts, snapshot.preferences);
    } catch {
      setUnreadNotifications(0);
    }
  }, [showQueuedNotificationAlerts]);
  useEffect(() => {
    void refreshNotifications(false);
    const interval = window.setInterval(() => void refreshNotifications(false), 15e3);
    const onFocus = () => void refreshNotifications(false);
    window.addEventListener("focus", onFocus);
    return () => {
      window.clearInterval(interval);
      window.removeEventListener("focus", onFocus);
    };
  }, [path, refreshNotifications]);
  useEffect(() => {
    let active = true;
    getRealtimeViewer().then((viewer) => {
      if (active) {
        setRealtimeViewer(viewer);
      }
    }).catch(() => {
      if (active) {
        setRealtimeViewer(null);
      }
    });
    return () => {
      active = false;
    };
  }, []);
  useEffect(() => {
    if (!realtimeViewer) {
      return;
    }
    const socket = io(getSocketUrl$9(), {
      auth: {
        userId: realtimeViewer.id,
        role: realtimeViewer.role,
        name: `${realtimeViewer.firstName} ${realtimeViewer.lastName}`.trim() || realtimeViewer.email,
        avatarUrl: realtimeViewer.avatarUrl
      }
    });
    socket.emit("notifications:subscribe", {
      userId: realtimeViewer.id,
      role: realtimeViewer.role
    });
    if (realtimeViewer.role === "ADMIN") {
      socket.emit("admin:subscribe");
    }
    socket.on("notifications:refresh", () => {
      void refreshNotifications(false);
    });
    socket.on("admin:refresh", () => {
      if (realtimeViewer.role === "ADMIN") {
        void refreshNotifications(true);
      }
    });
    socket.on("project:activity", (payload) => {
      if (!payload?.title || payload.actorId === realtimeViewer.id) {
        return;
      }
      const preferences = notificationPreferencesRef.current;
      if (!preferences.projectActivityNotificationsEnabled) {
        void refreshNotifications(false);
        return;
      }
      setUnreadNotifications((count) => count + 1);
      showNotificationAlert({
        key: `project-activity:${payload.actorId}:${payload.createdAt || (/* @__PURE__ */ new Date()).toISOString()}`,
        title: payload.title,
        description: payload.description || "",
        href: payload.href || "/notifications",
        type: "project",
        createdAt: payload.createdAt || (/* @__PURE__ */ new Date()).toISOString()
      }, preferences);
      void refreshNotifications(false);
    });
    socket.on("conversation:upsert", (payload) => {
      if (!payload?.message || payload.message.senderId === realtimeViewer.id) {
        return;
      }
      void refreshNotifications(true);
      if (isMessagePath(path)) {
        return;
      }
      const href = realtimeViewer.role === "PROFESSIONAL" ? "/professional-messages" : "/messages";
      setUnreadNotifications((count) => count + 1);
      setMessagePopup({
        id: payload.message.id,
        title: `New message from ${payload.fromUser?.name || "Someone"}`,
        description: getMessagePreview$2(payload.message, payload.job),
        href,
        avatarUrl: payload.fromUser?.avatarUrl || null
      });
      window.setTimeout(() => {
        setMessagePopup((current) => current?.id === payload.message.id ? null : current);
      }, 2e3);
    });
    socket.on("call:incoming", (payload) => {
      if (!payload?.callId || !payload.conversationId || payload.fromUserId === realtimeViewer.id || !payload.offer) {
        return;
      }
      rememberIncomingCall(payload);
      setIncomingCall(payload);
    });
    socket.on("call:ended", (payload) => {
      setIncomingCall((current) => current?.callId === payload.callId ? null : current);
    });
    return () => {
      socket.disconnect();
    };
  }, [path, realtimeViewer, refreshNotifications, showNotificationAlert]);
  const openIncomingCall = () => {
    if (!incomingCall) {
      return;
    }
    const href = realtimeViewer?.role === "PROFESSIONAL" ? "/professional-messages" : "/messages";
    window.location.assign(href);
  };
  const loadNotificationPanel = async () => {
    setNotificationPanelLoading(true);
    try {
      const data = await loadNotificationPanelData();
      setNotificationPanelItems(data.notifications);
    } catch {
      setNotificationPanelItems([]);
    } finally {
      setNotificationPanelLoading(false);
    }
  };
  const toggleNotificationPanel = async () => {
    const nextOpen = !notificationPanelOpen;
    setNotificationPanelOpen(nextOpen);
    if (nextOpen) {
      await loadNotificationPanel();
    }
  };
  const declineIncomingCall = () => {
    if (!incomingCall || !realtimeViewer) {
      setIncomingCall(null);
      return;
    }
    const socket = io(getSocketUrl$9(), {
      auth: {
        userId: realtimeViewer.id,
        role: realtimeViewer.role,
        name: `${realtimeViewer.firstName} ${realtimeViewer.lastName}`.trim() || realtimeViewer.email,
        avatarUrl: realtimeViewer.avatarUrl
      }
    });
    socket.emit("call:end", {
      callId: incomingCall.callId,
      conversationId: incomingCall.conversationId,
      fromUserId: realtimeViewer.id,
      toUserId: incomingCall.fromUserId,
      reason: "declined"
    });
    socket.disconnect();
    clearIncomingCall(incomingCall.callId);
    setIncomingCall(null);
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background pb-16 lg:pb-0", children: [
    !isProfessional ? /* @__PURE__ */ jsxs("aside", { className: "fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-border bg-surface lg:block", children: [
      /* @__PURE__ */ jsx("div", { className: "flex h-16 items-center px-5", children: /* @__PURE__ */ jsx(Logo, { label: isAdmin ? "Admin panel" : "Servio" }) }),
      /* @__PURE__ */ jsx("nav", { className: "px-3 py-2", children: items.map((it) => {
        const active = isActivePath(path, it.to);
        return /* @__PURE__ */ jsxs(Link, { to: it.to, className: `mb-1 flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${active ? "bg-primary text-primary-foreground font-medium shadow-soft" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`, children: [
          /* @__PURE__ */ jsx(it.icon, { className: "h-4 w-4" }),
          it.label
        ] }, it.to);
      }) })
    ] }) : null,
    /* @__PURE__ */ jsxs("div", { className: isProfessional ? "" : "lg:pl-64", children: [
      /* @__PURE__ */ jsxs("header", { className: "sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-border bg-background/85 px-4 backdrop-blur-md sm:px-6", children: [
        /* @__PURE__ */ jsx("div", { className: "flex flex-1 items-center gap-2", children: isProfessional ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(Button, { asChild: true, variant: "outline", size: "sm", className: "gap-2", children: /* @__PURE__ */ jsxs(Link, { to: "/", children: [
            /* @__PURE__ */ jsx(Home, { className: "h-4 w-4" }),
            "Back to home"
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "hidden items-center gap-2 sm:flex", children: professionalItems.map((item) => {
            const active = path === item.to;
            return /* @__PURE__ */ jsx(Button, { asChild: true, variant: active ? "default" : "ghost", size: "sm", className: "gap-2", children: /* @__PURE__ */ jsxs(Link, { to: item.to, children: [
              /* @__PURE__ */ jsx(item.icon, { className: "h-4 w-4" }),
              item.label
            ] }) }, item.to);
          }) })
        ] }) : /* @__PURE__ */ jsxs("div", { className: "relative w-full max-w-md", children: [
          /* @__PURE__ */ jsx(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
          /* @__PURE__ */ jsx("input", { value: globalSearch, onChange: (e) => setGlobalSearch(e.target.value), onKeyDown: (e) => {
            if (e.key === "Enter" && globalSearch.trim()) {
              void navigate({
                to: "/discover",
                search: {
                  search: globalSearch.trim()
                }
              });
            }
          }, placeholder: "Search jobs, professionals...", className: "h-9 w-full rounded-lg border border-input bg-surface pl-9 pr-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" })
        ] }) }),
        !isProfessional && !isAdmin ? /* @__PURE__ */ jsx(Link, { to: "/post-job", className: "hidden sm:inline-flex", children: /* @__PURE__ */ jsx(Button, { size: "sm", className: "bg-cta text-cta-foreground hover:bg-cta/90", children: "Post a Job" }) }) : null,
        /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => void toggleNotificationPanel(), className: `relative grid h-9 w-9 place-items-center rounded-lg hover:bg-muted ${unreadNotifications ? "text-cta" : ""}`, "aria-label": unreadNotifications ? `${unreadNotifications} unread notifications` : "Notifications", children: [
          /* @__PURE__ */ jsx(Bell, { className: `h-4 w-4 ${bellBurst ? "notification-bell-burst" : unreadNotifications ? "animate-pulse" : ""}` }),
          unreadNotifications ? /* @__PURE__ */ jsxs("span", { className: "absolute right-1.5 top-1.5 flex h-3 w-3", children: [
            /* @__PURE__ */ jsx("span", { className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-cta opacity-75" }),
            /* @__PURE__ */ jsx("span", { className: "relative inline-flex h-3 w-3 rounded-full bg-cta" })
          ] }) : null
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("img", { src: userAvatarUrl || "https://i.pravatar.cc/100?u=me", alt: "me", className: "h-8 w-8 rounded-full object-cover" }),
          /* @__PURE__ */ jsxs("div", { className: "hidden text-sm leading-tight sm:block", children: [
            /* @__PURE__ */ jsx("p", { className: "font-medium", children: userName }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: userRole })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("main", { className: "mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8", children: [
        title && /* @__PURE__ */ jsx("h1", { className: "font-display mb-6 text-3xl font-bold tracking-tight", children: title }),
        children
      ] })
    ] }),
    !isProfessional ? /* @__PURE__ */ jsx("nav", { className: "fixed inset-x-0 bottom-0 z-30 border-t border-border bg-surface/95 backdrop-blur-md lg:hidden", children: /* @__PURE__ */ jsx("div", { className: "grid", style: {
      gridTemplateColumns: `repeat(${mobileItems.length}, minmax(0, 1fr))`
    }, children: mobileItems.map((it) => {
      const active = isActivePath(path, it.to);
      return /* @__PURE__ */ jsxs(Link, { to: it.to, className: `flex flex-col items-center justify-center gap-0.5 py-2.5 text-[11px] transition-colors ${active ? "text-primary" : "text-muted-foreground"}`, children: [
        /* @__PURE__ */ jsx(it.icon, { className: "h-5 w-5" }),
        it.label
      ] }, it.label);
    }) }) }) : null,
    notificationPanelOpen ? /* @__PURE__ */ jsxs("div", { className: "fixed top-16 right-4 z-50 w-[min(340px,calc(100vw-2rem))] max-h-[calc(100vh-7rem)] overflow-hidden rounded-3xl border border-border bg-card shadow-soft", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3 border-b border-border px-3 py-3", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold", children: "Recent notifications" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Latest 3 alerts" })
        ] }),
        /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setNotificationPanelOpen(false), className: "rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground", "aria-label": "Close notifications", children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "divide-y divide-border", children: notificationPanelLoading ? /* @__PURE__ */ jsx("div", { className: "p-3 text-sm text-muted-foreground", children: "Loading notifications…" }) : notificationPanelItems.length ? notificationPanelItems.map((notification) => {
        const Icon = getNotificationIcon$1(notification.type);
        return /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 px-3 py-4", children: [
          /* @__PURE__ */ jsx("span", { className: "grid h-9 w-9 place-items-center rounded-xl bg-muted text-muted-foreground", children: /* @__PURE__ */ jsx(Icon, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsx("p", { className: "font-medium text-sm", children: notification.title }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground line-clamp-2", children: notification.description }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: formatNotificationTime$1(notification.createdAt) })
          ] })
        ] }, notification.key);
      }) : /* @__PURE__ */ jsx("div", { className: "p-4 text-sm text-muted-foreground", children: "No recent notifications." }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2 border-t border-border px-3 py-3", children: [
        /* @__PURE__ */ jsxs(Link, { to: isAdmin ? "/admin-notifications" : "/notifications", className: "inline-flex items-center gap-2 rounded-full bg-primary px-3 py-2 text-sm text-primary-foreground transition hover:bg-primary/90", children: [
          "View all",
          /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
        ] }),
        /* @__PURE__ */ jsx(Button, { variant: "outline", size: "sm", onClick: () => setNotificationPanelOpen(false), children: "Close" })
      ] })
    ] }) : null,
    /* @__PURE__ */ jsx(RealtimePopup, { messagePopup, incomingCall, notificationPopup, onCloseMessage: () => setMessagePopup(null), onCloseNotification: () => setNotificationPopup(null), onOpenCall: openIncomingCall, onDeclineCall: declineIncomingCall, onDismissCall: () => setIncomingCall(null) })
  ] });
}
function RealtimePopup({
  messagePopup,
  notificationPopup,
  incomingCall,
  onCloseMessage,
  onCloseNotification,
  onOpenCall,
  onDeclineCall,
  onDismissCall
}) {
  if (!messagePopup && !incomingCall && !notificationPopup) {
    return null;
  }
  return /* @__PURE__ */ jsxs("div", { className: "fixed right-4 top-20 z-50 flex w-[min(360px,calc(100vw-2rem))] flex-col gap-3", children: [
    incomingCall ? /* @__PURE__ */ jsxs("div", { className: "overflow-hidden rounded-xl border border-primary/30 bg-card shadow-elevated", children: [
      /* @__PURE__ */ jsxs("div", { className: "gradient-primary flex items-center justify-between px-4 py-3 text-primary-foreground", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          incomingCall.mode === "video" ? /* @__PURE__ */ jsx(Video, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(Phone, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold", children: incomingCall.mode === "video" ? "Incoming video call" : "Incoming voice call" })
        ] }),
        /* @__PURE__ */ jsx("button", { type: "button", onClick: onDismissCall, "aria-label": "Hide call popup", children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid aspect-square place-items-center bg-muted/40 p-5 text-center", children: /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-soft", children: incomingCall.mode === "video" ? /* @__PURE__ */ jsx(Video, { className: "h-7 w-7" }) : /* @__PURE__ */ jsx(Phone, { className: "h-7 w-7" }) }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-lg font-semibold", children: incomingCall.fromName || "Someone" }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: incomingCall.job || "Direct call" }),
        incomingCall.mode === "video" ? /* @__PURE__ */ jsx("div", { className: "mx-auto mt-4 h-24 w-32 rounded-lg border border-border bg-background shadow-inner" }) : null
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2 border-t border-border p-3", children: [
        /* @__PURE__ */ jsxs(Button, { variant: "destructive", className: "flex-1 gap-2", onClick: onDeclineCall, children: [
          /* @__PURE__ */ jsx(PhoneOff, { className: "h-4 w-4" }),
          "Decline"
        ] }),
        /* @__PURE__ */ jsxs(Button, { className: "flex-1 gap-2", onClick: onOpenCall, children: [
          incomingCall.mode === "video" ? /* @__PURE__ */ jsx(Video, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(Phone, { className: "h-4 w-4" }),
          "Open"
        ] })
      ] })
    ] }) : null,
    notificationPopup ? /* @__PURE__ */ jsx("div", { className: "notification-to-bell rounded-xl border border-cta/30 bg-card p-4 shadow-elevated", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
      /* @__PURE__ */ jsx("div", { className: "grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-cta/15 text-cta", children: /* @__PURE__ */ jsx(BellRing, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsx("p", { className: "truncate text-sm font-semibold", children: notificationPopup.title }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 line-clamp-2 text-sm text-muted-foreground", children: notificationPopup.description }),
        /* @__PURE__ */ jsx("a", { href: notificationPopup.href, className: "mt-2 inline-flex text-sm font-medium text-primary", children: "Open notification" })
      ] }),
      /* @__PURE__ */ jsx("button", { type: "button", onClick: onCloseNotification, "aria-label": "Close notification popup", children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4 text-muted-foreground" }) })
    ] }) }) : null,
    messagePopup ? /* @__PURE__ */ jsx("div", { className: "rounded-xl border border-border bg-card p-4 shadow-elevated", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
      /* @__PURE__ */ jsx("img", { src: messagePopup.avatarUrl || "https://i.pravatar.cc/100?u=message-popup", alt: "", className: "h-10 w-10 rounded-full object-cover" }),
      /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsx("p", { className: "truncate text-sm font-semibold", children: messagePopup.title }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 line-clamp-2 text-sm text-muted-foreground", children: messagePopup.description }),
        /* @__PURE__ */ jsx("a", { href: messagePopup.href, className: "mt-2 inline-flex text-sm font-medium text-primary", children: "Open messages" })
      ] }),
      /* @__PURE__ */ jsx("button", { type: "button", onClick: onCloseMessage, "aria-label": "Close message popup", children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4 text-muted-foreground" }) })
    ] }) }) : null
  ] });
}
function isMessagePath(path) {
  return path === "/messages" || path === "/professional-messages";
}
function getNotificationIcon$1(type) {
  if (type === "project") {
    return Briefcase;
  }
  if (type === "work") {
    return FileText;
  }
  if (type === "message") {
    return MessageSquare;
  }
  if (type === "payment") {
    return Wallet$1;
  }
  return Star;
}
function formatNotificationTime$1(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  }).format(date);
}
function showBrowserNotification(title, description, href, preferences) {
  if (!preferences.browserNotificationsEnabled || !("Notification" in window) || Notification.permission !== "granted") {
    return;
  }
  const notification = new Notification(title, {
    body: description,
    tag: href || title
  });
  notification.onclick = () => {
    window.focus();
    if (href) {
      window.location.assign(href);
    }
    notification.close();
  };
}
function getSocketUrl$9() {
  return `${window.location.protocol}//${window.location.hostname}:4001`;
}
function getMessagePreview$2(message, job) {
  const body = message.kind === "attachment" ? "Sent an attachment" : message.kind === "call" ? message.body : message.body || "New message";
  return job ? `${job}: ${body}` : body;
}
function rememberIncomingCall(payload) {
  try {
    sessionStorage.setItem("servio:pending-incoming-call", JSON.stringify({
      createdAt: Date.now(),
      call: payload
    }));
  } catch {
  }
}
function clearIncomingCall(callId) {
  try {
    const raw = sessionStorage.getItem("servio:pending-incoming-call");
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (parsed.call?.callId === callId) {
      sessionStorage.removeItem("servio:pending-incoming-call");
    }
  } catch {
    sessionStorage.removeItem("servio:pending-incoming-call");
  }
}
function AdminEmptyState({
  title,
  description,
  icon: Icon = Search,
  className
}) {
  return /* @__PURE__ */ jsxs("div", { className: cn(
    "flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/20 px-6 py-12 text-center",
    className
  ), children: [
    /* @__PURE__ */ jsx("div", { className: "grid h-16 w-16 place-items-center rounded-full bg-muted text-muted-foreground", children: /* @__PURE__ */ jsx(Icon, { className: "h-8 w-8" }) }),
    /* @__PURE__ */ jsx("h3", { className: "mt-4 text-lg font-bold text-foreground", children: title }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 max-w-sm text-sm text-muted-foreground", children: description })
  ] });
}
const Input = React.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
const performSearch = createServerFn({
  method: "GET"
}).inputValidator((input) => input).handler(createSsrRpc("03fe474a9b0c6cd7a657ab1e7c76c97e2f51b03af3a1674c897cf45a7674189b"));
const groupIcons = {
  Users: User,
  Jobs: BriefcaseBusiness,
  Disputes: AlertTriangle,
  Payments: ReceiptText
};
const groupColors = {
  Users: "bg-blue-500/10 text-blue-600",
  Jobs: "bg-emerald-500/10 text-emerald-600",
  Disputes: "bg-amber-500/10 text-amber-600",
  Payments: "bg-violet-500/10 text-violet-600"
};
function GlobalSearchOverlay({
  open,
  onClose
}) {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [error, setError] = useState(null);
  const debounceRef = useRef(void 0);
  useEffect(() => {
    if (open) {
      setQuery("");
      setResults(null);
      setSelectedIndex(0);
      setError(null);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    const term = query.trim();
    if (!term) {
      setResults(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    debounceRef.current = setTimeout(async () => {
      try {
        const result = await performSearch({
          data: {
            query: term
          }
        });
        setResults(result);
        setSelectedIndex(0);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Search failed");
        setResults(null);
      } finally {
        setLoading(false);
      }
    }, 250);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);
  const allItems = results?.results ?? [];
  const groupedResults = allItems.reduce((acc, item) => {
    if (!acc[item.group]) acc[item.group] = [];
    acc[item.group].push(item);
    return acc;
  }, {});
  const handleSelect = useCallback((item) => {
    onClose();
    if (item.route) {
      navigate({
        to: item.route
      });
    }
  }, [navigate, onClose]);
  const handleKeyDown = useCallback((e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, allItems.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && allItems[selectedIndex]) {
      e.preventDefault();
      handleSelect(allItems[selectedIndex]);
    } else if (e.key === "Escape") {
      onClose();
    }
  }, [allItems, selectedIndex, handleSelect, onClose]);
  useEffect(() => {
    if (!open) return;
    const handleKeyDownGlobal = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDownGlobal);
    return () => window.removeEventListener("keydown", handleKeyDownGlobal);
  }, [open, onClose]);
  if (!open) return null;
  return /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-50 flex items-start justify-center pt-[15vh]", children: [
    /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black/60 backdrop-blur-sm", onClick: onClose, onKeyDown: (e) => e.key === "Escape" && onClose(), tabIndex: -1 }),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 w-full max-w-2xl rounded-xl border border-border bg-card shadow-2xl", onKeyDown: handleKeyDown, children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 border-b border-border px-4 py-3", children: [
        /* @__PURE__ */ jsx(Search, { className: "h-5 w-5 shrink-0 text-muted-foreground" }),
        /* @__PURE__ */ jsx(Input, { ref: inputRef, value: query, onChange: (e) => setQuery(e.target.value), placeholder: "Search users, jobs, disputes, payments...", className: "border-none bg-transparent px-0 text-base shadow-none focus-visible:ring-0 focus-visible:ring-offset-0" }),
        /* @__PURE__ */ jsxs("kbd", { className: "hidden shrink-0 items-center gap-1 rounded-md border border-border bg-muted/50 px-2 py-0.5 text-xs text-muted-foreground sm:inline-flex", children: [
          /* @__PURE__ */ jsx(Command, { className: "h-3 w-3" }),
          "K"
        ] }),
        /* @__PURE__ */ jsx("button", { onClick: onClose, className: "rounded-md border border-border bg-muted/50 px-2 py-0.5 text-xs text-muted-foreground hover:bg-muted", children: "ESC" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "max-h-[60vh] overflow-y-auto p-2", children: [
        loading && /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-2 py-8 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }),
          "Searching..."
        ] }),
        error && /* @__PURE__ */ jsx("div", { className: "py-8 text-center text-sm text-destructive", children: error }),
        !loading && !error && query.trim() && !allItems.length && /* @__PURE__ */ jsxs("div", { className: "py-8 text-center text-sm text-muted-foreground", children: [
          "No results found for ",
          /* @__PURE__ */ jsxs("span", { className: "font-medium text-foreground", children: [
            '"',
            query,
            '"'
          ] })
        ] }),
        !loading && !error && Object.keys(groupedResults).length > 0 && /* @__PURE__ */ jsx("div", { className: "space-y-3", children: Object.entries(groupedResults).map(([group, items]) => {
          const GroupIcon = groupIcons[group] || Search;
          return /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 px-3 py-2", children: [
              /* @__PURE__ */ jsx("div", { className: `rounded-md p-1 ${groupColors[group] || "bg-muted"}`, children: /* @__PURE__ */ jsx(GroupIcon, { className: "h-3.5 w-3.5" }) }),
              /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: group }),
              /* @__PURE__ */ jsxs("span", { className: "text-xs text-muted-foreground", children: [
                "(",
                items.length,
                ")"
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "space-y-0.5", children: items.map((item) => {
              const globalIndex = allItems.indexOf(item);
              const isSelected = globalIndex === selectedIndex;
              return /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => handleSelect(item), className: `flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${isSelected ? "bg-primary/10 text-primary" : "hover:bg-muted/60 text-foreground"}`, children: [
                item.avatarUrl ? /* @__PURE__ */ jsx("img", { src: item.avatarUrl, alt: "", className: "h-8 w-8 shrink-0 rounded-full object-cover" }) : /* @__PURE__ */ jsx("div", { className: `flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-medium ${groupColors[item.group] || "bg-muted"}`, children: item.label.charAt(0).toUpperCase() }),
                /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
                  /* @__PURE__ */ jsx("p", { className: "truncate text-sm font-medium", children: item.label }),
                  /* @__PURE__ */ jsx("p", { className: "truncate text-xs text-muted-foreground", children: item.subtitle })
                ] }),
                item.badge && /* @__PURE__ */ jsx("span", { className: "shrink-0 rounded-md border border-border bg-muted/50 px-2 py-0.5 text-xs text-muted-foreground", children: item.badge })
              ] }, item.id);
            }) })
          ] }, group);
        }) }),
        !loading && !error && !query.trim() && /* @__PURE__ */ jsxs("div", { className: "space-y-3 px-3 py-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsx(Search, { className: "mx-auto h-8 w-8 text-muted-foreground/40" }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Type anything to search across the admin panel" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-4 grid gap-2 sm:grid-cols-2", children: [{
            label: "Search users",
            desc: "Name, email, phone, company"
          }, {
            label: "Search jobs",
            desc: "Title, description, category, client"
          }, {
            label: "Search disputes",
            desc: "Issue, message, status"
          }, {
            label: "Search payments",
            desc: "Transaction, type, client, pro"
          }].map((hint) => /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-border bg-muted/30 p-3 text-left text-sm", children: [
            /* @__PURE__ */ jsx("p", { className: "font-medium text-foreground", children: hint.label }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: hint.desc })
          ] }, hint.label)) })
        ] })
      ] }),
      allItems.length > 0 && /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-t border-border px-4 py-2 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxs("span", { children: [
          results?.totalCount ?? 0,
          " result",
          (results?.totalCount ?? 0) !== 1 ? "s" : ""
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxs("span", { children: [
            /* @__PURE__ */ jsx("kbd", { className: "mr-1 rounded border border-border bg-muted/50 px-1.5 py-0.5", children: "↑↓" }),
            "Navigate"
          ] }),
          /* @__PURE__ */ jsxs("span", { children: [
            /* @__PURE__ */ jsx("kbd", { className: "mr-1 rounded border border-border bg-muted/50 px-1.5 py-0.5", children: "↵" }),
            "Open"
          ] }),
          /* @__PURE__ */ jsxs("span", { children: [
            /* @__PURE__ */ jsx("kbd", { className: "mr-1 rounded border border-border bg-muted/50 px-1.5 py-0.5", children: "Esc" }),
            "Close"
          ] })
        ] })
      ] })
    ] })
  ] });
}
const Select = SelectPrimitive.Root;
const SelectValue = SelectPrimitive.Value;
const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Trigger,
  {
    ref,
    className: cn(
      "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 opacity-50" }) })
    ]
  }
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
const SelectScrollUpButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.ScrollUpButton,
  {
    ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronUp, { className: "h-4 w-4" })
  }
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
const SelectScrollDownButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.ScrollDownButton,
  {
    ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4" })
  }
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;
const SelectContent = React.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs(
  SelectPrimitive.Content,
  {
    ref,
    className: cn(
      "relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-select-content-transform-origin)",
      position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      className
    ),
    position,
    ...props,
    children: [
      /* @__PURE__ */ jsx(SelectScrollUpButton, {}),
      /* @__PURE__ */ jsx(
        SelectPrimitive.Viewport,
        {
          className: cn(
            "p-1",
            position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children
        }
      ),
      /* @__PURE__ */ jsx(SelectScrollDownButton, {})
    ]
  }
) }));
SelectContent.displayName = SelectPrimitive.Content.displayName;
const SelectLabel = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.Label,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", className),
    ...props
  }
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;
const SelectItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children })
    ]
  }
));
SelectItem.displayName = SelectPrimitive.Item.displayName;
const SelectSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;
const Switch = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SwitchPrimitives.Root,
  {
    className: cn(
      "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className
    ),
    ...props,
    ref,
    children: /* @__PURE__ */ jsx(
      SwitchPrimitives.Thumb,
      {
        className: cn(
          "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
        )
      }
    )
  }
));
Switch.displayName = SwitchPrimitives.Root.displayName;
function AdminPageHeader({
  kicker = "Admin panel",
  title,
  description,
  actions,
  breadcrumbs
}) {
  return /* @__PURE__ */ jsxs("div", { className: "mb-8 space-y-4", children: [
    breadcrumbs && /* @__PURE__ */ jsxs("nav", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsx(Link, { to: "/admin", className: "hover:text-primary transition-colors", children: /* @__PURE__ */ jsx(Home, { className: "h-3 w-3" }) }),
      breadcrumbs.map((crumb, index) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(ChevronRight, { className: "h-3 w-3" }),
        crumb.to ? /* @__PURE__ */ jsx(Link, { to: crumb.to, className: "hover:text-primary transition-colors", children: crumb.label }) : /* @__PURE__ */ jsx("span", { className: index === breadcrumbs.length - 1 ? "text-foreground font-medium" : "", children: crumb.label })
      ] }, crumb.label))
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-between gap-4 lg:flex-row lg:items-end", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs font-bold uppercase tracking-[0.2em] text-primary/80", children: kicker }),
        /* @__PURE__ */ jsx("h1", { className: "mt-2 text-3xl font-bold tracking-tight text-slate-900", children: title }),
        description && /* @__PURE__ */ jsx("p", { className: "mt-2 max-w-2xl text-base text-muted-foreground", children: description })
      ] }),
      actions && /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: actions })
    ] })
  ] });
}
function AdminSummaryCard({
  icon: Icon,
  label,
  value,
  caption,
  active,
  onClick,
  className,
  variant = "default"
}) {
  const variants = {
    default: "text-primary bg-primary/10",
    primary: "text-blue-600 bg-blue-50",
    success: "text-emerald-600 bg-emerald-50",
    warning: "text-amber-600 bg-amber-50",
    destructive: "text-rose-600 bg-rose-50"
  };
  return /* @__PURE__ */ jsxs(
    "button",
    {
      type: "button",
      onClick,
      disabled: !onClick,
      className: cn(
        "group relative overflow-hidden rounded-2xl border bg-card p-6 text-left transition-all duration-300",
        onClick ? "cursor-pointer hover:shadow-md hover:-translate-y-1" : "cursor-default",
        active ? "border-primary bg-primary/[0.03] shadow-sm ring-1 ring-primary/20" : "border-border hover:border-primary/30",
        className
      ),
      children: [
        /* @__PURE__ */ jsx("div", { className: cn(
          "grid h-12 w-12 place-items-center rounded-xl transition-colors",
          variants[variant]
        ), children: /* @__PURE__ */ jsx(Icon, { className: "h-6 w-6" }) }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4 space-y-1", children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors", children: label }),
          /* @__PURE__ */ jsx("p", { className: "text-3xl font-bold tracking-tight text-foreground", children: typeof value === "number" ? value.toLocaleString() : value }),
          caption && /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground font-medium", children: caption })
        ] }),
        active && /* @__PURE__ */ jsx("div", { className: "absolute right-0 top-0 h-1.5 w-full bg-primary" })
      ]
    }
  );
}
function AdminSection({
  title,
  description,
  icon: Icon,
  actions,
  children,
  className
}) {
  return /* @__PURE__ */ jsxs("section", { className: cn(
    "rounded-2xl border border-border bg-card shadow-sm overflow-hidden",
    className
  ), children: [
    /* @__PURE__ */ jsx("div", { className: "border-b border-border bg-muted/30 px-6 py-5", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-between gap-4 sm:flex-row sm:items-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
        Icon && /* @__PURE__ */ jsx("div", { className: "grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary", children: /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-bold text-foreground", children: title }),
          description && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: description })
        ] })
      ] }),
      actions && /* @__PURE__ */ jsx("div", { className: "flex shrink-0 flex-wrap items-center gap-2", children: actions })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "p-0", children })
  ] });
}
function formatEnum$a(value) {
  if (!value) {
    return "Not set";
  }
  return value.toLowerCase().split("_").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
}
function formatDate$9(value) {
  if (!value) {
    return "Not set";
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Not set";
  }
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(date);
}
function formatDateTime$6(value) {
  if (!value) {
    return "Not set";
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Not set";
  }
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  }).format(date);
}
function formatMoney$5(value, currency = "USD") {
  if (value === null || value === void 0) {
    return "$0";
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0
  }).format(value);
}
function formatBudget$9(min, max) {
  if (min && max) {
    return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
  }
  if (max) {
    return `Up to $${max.toLocaleString()}`;
  }
  if (min) {
    return `From $${min.toLocaleString()}`;
  }
  return "Budget not set";
}
function formatFileSize$5(value) {
  if (!value) {
    return "Size not saved";
  }
  if (value < 1024) {
    return `${value} B`;
  }
  if (value < 1024 * 1024) {
    return `${Math.round(value / 1024)} KB`;
  }
  return `${Math.round(value / (1024 * 1024) * 10) / 10} MB`;
}
const ADMIN_USERNAME = "";
const getAdminPageData = createServerFn({
  method: "GET"
}).handler(createSsrRpc("94a5151b754e4ae8e302d55aab22e133a9dce54b31bf69ca5e2ae9a5a5533ee9"));
const submitAdminLogin = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(createSsrRpc("1b3c5d79d45933cb865cd3fd1c2138207d34bd67fdd45ca5143b6b5e0e60e1e3"));
const updateManagedUserRole = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(createSsrRpc("0130dd17c6708cf113632c167a9382723e32cfb27fbce797720189b1d05ebac5"));
const updateManagedUserStatus = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(createSsrRpc("9c4e4e55713c4ee4c8202a7c32106c8cc84d850c6ea382a3a7f315b63ccbeecd"));
const updateManagedDisputeStatus = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(createSsrRpc("34873e21d20b0abcbe478ce7f33f3e9c5997242623c5f24d3c882940549f32b6"));
const Route$16 = createFileRoute("/admin")({
  loader: () => getAdminPageData(),
  head: () => ({
    meta: [{
      title: "Admin - Servio"
    }]
  }),
  component: Admin
});
const shortcutConfig = [{
  key: "overview",
  label: "Overview",
  icon: TrendingUp,
  description: "Live platform metrics"
}, {
  key: "jobs",
  label: "Jobs & Disputes",
  icon: BriefcaseBusiness,
  description: "Job posts, tracked work, and dispute queue"
}, {
  key: "users",
  label: "Users",
  icon: Users,
  description: "User roles and access"
}, {
  key: "payments",
  label: "Payments",
  icon: ReceiptText,
  description: "Revenue and payouts"
}];
const tabs$1 = shortcutConfig;
const roleOptions = [{
  value: "ADMIN",
  label: "Admin"
}, {
  value: "CLIENT",
  label: "Client"
}, {
  value: "PROFESSIONAL",
  label: "Professional"
}];
function Admin() {
  const data = useLoaderData({
    from: "/admin"
  });
  const router2 = useRouter();
  const [tab, setTab] = useState("overview");
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [liveStatus, setLiveStatus] = useState("Connecting live feed...");
  const [jobQuery, setJobQuery] = useState("");
  const [disputeQuery, setDisputeQuery] = useState("");
  const [paymentQuery, setPaymentQuery] = useState("");
  const [overviewResult, setOverviewResult] = useState(null);
  function selectTab(nextTab) {
    setOverviewResult(null);
    setTab(nextTab);
  }
  function showOverviewResult(result) {
    setOverviewResult(result);
    setQuery("");
    setJobQuery("");
    setDisputeQuery("");
    setPaymentQuery("");
    setTab(result === "total-users" ? "users" : result === "today-transactions" ? "payments" : "jobs");
  }
  useEffect(() => {
    const handleShortcutKeyDown = (event) => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement || event.target instanceof HTMLSelectElement) {
        return;
      }
      if ((event.ctrlKey || event.metaKey) && /^\d$/.test(event.key)) {
        const index = Number(event.key) - 1;
        if (index >= 0 && index < tabs$1.length) {
          event.preventDefault();
          selectTab(tabs$1[index].key);
        }
      }
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleShortcutKeyDown);
    return () => {
      window.removeEventListener("keydown", handleShortcutKeyDown);
    };
  }, []);
  const filteredJobs = useMemo(() => {
    const term = jobQuery.trim().toLowerCase();
    let jobs = data.jobRecords;
    if (overviewResult === "today-jobs") {
      const generatedAt = data.dashboard?.generatedAt;
      if (generatedAt) {
        jobs = jobs.filter((job) => isOnDashboardDay(job.createdAt, generatedAt));
      } else {
        jobs = [];
      }
    } else if (overviewResult === "open-disputes") {
      const disputedJobIds = new Set(data.disputeRecords.filter((dispute) => dispute.status === "OPEN" || dispute.status === "UNDER_REVIEW").map((dispute) => dispute.jobId));
      jobs = jobs.filter((job) => disputedJobIds.has(job.id));
    }
    if (!term) {
      return jobs;
    }
    return jobs.filter((job) => {
      const haystack = [job.title, job.category, job.status, job.clientName, job.clientEmail, job.professionalName, job.professionalEmail, job.trackingStatus, job.locationLabel, job.locationAddress].join(" ").toLowerCase();
      return haystack.includes(term);
    });
  }, [data.dashboard?.generatedAt, data.disputeRecords, data.jobRecords, jobQuery, overviewResult]);
  const filteredDisputes = useMemo(() => {
    const term = disputeQuery.trim().toLowerCase();
    let disputes = data.disputeRecords;
    if (overviewResult === "open-disputes") {
      disputes = disputes.filter((dispute) => dispute.status === "OPEN" || dispute.status === "UNDER_REVIEW");
    }
    if (!term) {
      return disputes;
    }
    return disputes.filter((dispute) => {
      const haystack = [dispute.jobTitle, dispute.issueType, dispute.priority, dispute.status, dispute.message, dispute.reporterRole, dispute.reporterName, dispute.reporterEmail, dispute.clientName, dispute.clientEmail, dispute.professionalName, dispute.professionalEmail].join(" ").toLowerCase();
      return haystack.includes(term);
    });
  }, [data.disputeRecords, disputeQuery, overviewResult]);
  const filteredPayments = useMemo(() => {
    const term = paymentQuery.trim().toLowerCase();
    let payments = data.paymentTransactions;
    if (overviewResult === "today-transactions") {
      const generatedAt = data.dashboard?.generatedAt;
      if (generatedAt) {
        payments = payments.filter((payment) => payment.status === "COMPLETED" && isOnDashboardDay(payment.dateTime, generatedAt));
      } else {
        payments = [];
      }
    }
    if (!term) {
      return payments;
    }
    return payments.filter((payment) => {
      const haystack = [payment.jobTitle, payment.clientName, payment.clientEmail, payment.professionalName, payment.professionalEmail, payment.status].join(" ").toLowerCase();
      return haystack.includes(term);
    });
  }, [data.dashboard?.generatedAt, data.paymentTransactions, overviewResult, paymentQuery]);
  useEffect(() => {
    if (!data?.viewer || data.viewer.role !== "ADMIN") {
      return;
    }
    const socket = io(getSocketUrl$8(), {
      auth: {
        userId: data.viewer.id,
        role: data.viewer.role,
        name: `${data.viewer.firstName} ${data.viewer.lastName}`.trim() || data.viewer.email,
        avatarUrl: data.viewer.avatarUrl
      }
    });
    const refresh = async (reason) => {
      setLiveStatus(`Live update: ${reason}`);
      await router2.invalidate();
    };
    socket.emit("admin:subscribe");
    socket.on("connect", () => setLiveStatus("Live feed connected"));
    socket.on("disconnect", () => setLiveStatus("Live feed disconnected"));
    socket.on("admin:refresh", (payload) => {
      refresh(payload?.reason || "platform activity");
    });
    socket.on("project:activity", () => {
      refresh("project activity");
    });
    socket.on("notifications:refresh", (payload) => {
      refresh(payload?.reason || "notification activity");
    });
    return () => {
      socket.disconnect();
    };
  }, [data?.viewer, router2]);
  if (!data?.viewer || data.viewer.role !== "ADMIN" || !data.stats || !data.dashboard) {
    return /* @__PURE__ */ jsx(AdminLogin, {});
  }
  const displayName = `${data.viewer.firstName} ${data.viewer.lastName}`.trim() || data.viewer.email;
  const users = data.users;
  const shortcutStats = getShortcutStats(data.dashboard, data.stats, users.length);
  shortcutConfig.find((item) => item.key === tab) ?? shortcutConfig[0];
  const filteredUsers = users.filter((user) => {
    const haystack = `${user.firstName} ${user.lastName} ${user.email} ${user.role}`.toLowerCase();
    return haystack.includes(query.trim().toLowerCase());
  });
  return /* @__PURE__ */ jsxs(AppShell, { userName: displayName, userRole: "Admin", userAvatarUrl: data.viewer.avatarUrl, children: [
    /* @__PURE__ */ jsx(GlobalSearchOverlay, { open: searchOpen, onClose: () => setSearchOpen(false) }),
    /* @__PURE__ */ jsx(AdminPageHeader, { title: "Admin Dashboard", description: "Live view of users, client job posts, transactions, projects, and dispute queues.", actions: /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
      /* @__PURE__ */ jsxs(Button, { variant: "outline", size: "sm", className: "gap-2 rounded-xl", onClick: () => setSearchOpen(true), children: [
        /* @__PURE__ */ jsx(Search, { className: "h-4 w-4" }),
        /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: "Global Search" }),
        /* @__PURE__ */ jsxs("kbd", { className: "hidden items-center gap-1 rounded-lg border border-border bg-muted/50 px-2 py-0.5 text-[10px] md:inline-flex", children: [
          /* @__PURE__ */ jsx(Command, { className: "h-3 w-3" }),
          "K"
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Badge, { variant: "secondary", className: "gap-2 rounded-xl px-4 py-1.5 font-bold uppercase tracking-widest text-[10px]", children: [
        /* @__PURE__ */ jsx(ShieldCheck, { className: "h-3.5 w-3.5 text-primary" }),
        "Secure Admin Session"
      ] }),
      /* @__PURE__ */ jsxs(Badge, { variant: "outline", className: "gap-2 rounded-xl px-4 py-1.5 font-bold uppercase tracking-widest text-[10px] bg-background", children: [
        /* @__PURE__ */ jsx(Radio, { className: cn("h-3.5 w-3.5", liveStatus.includes("connected") ? "text-emerald-500" : "text-rose-500") }),
        liveStatus
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
      /* @__PURE__ */ jsx(AdminSection, { title: "Dashboard Shortcuts", description: "Pick a shortcut to load its summary cards instantly. Use Ctrl/Cmd + 1\\u20134 for fast navigation.", icon: Zap, actions: /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: tabs$1.map((item) => {
        const Icon = item.icon;
        const isActive = item.key === tab;
        return /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => selectTab(item.key), className: cn("inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-[11px] font-bold uppercase tracking-widest transition-all", isActive ? "border-primary bg-primary text-white shadow-md scale-105" : "border-border bg-background text-muted-foreground hover:border-primary/50 hover:bg-muted/50"), children: [
          /* @__PURE__ */ jsx(Icon, { className: "h-4 w-4" }),
          item.label
        ] }, item.key);
      }) }), children: /* @__PURE__ */ jsx("div", { className: "p-8 bg-muted/20", children: /* @__PURE__ */ jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: shortcutStats[tab].map((item) => /* @__PURE__ */ jsx(AdminSummaryCard, { icon: getMetricIcon(item.label), label: item.label, value: item.value, caption: item.caption }, `${tab}-${item.label}`)) }) }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-between gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative w-full max-w-sm", children: [
            /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
            /* @__PURE__ */ jsx(Input, { className: "pl-9 h-11 rounded-2xl shadow-sm border-border bg-background", placeholder: tab === "users" ? "Search users by name or email..." : "Quick search...", value: query, onChange: (event) => setQuery(event.target.value) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: /* @__PURE__ */ jsx(Button, { asChild: true, variant: "outline", className: "rounded-xl h-11 px-6 font-bold shadow-sm", children: /* @__PURE__ */ jsxs(Link, { to: "/web-editor", children: [
            /* @__PURE__ */ jsx(LayoutTemplate, { className: "mr-2 h-4 w-4" }),
            "Web Editor"
          ] }) }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "animate-in fade-in slide-in-from-bottom-2 duration-500", children: [
          tab === "overview" && /* @__PURE__ */ jsx(Overview, { dashboard: data.dashboard, onSelectResult: showOverviewResult }),
          tab === "users" && /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            overviewResult === "total-users" && /* @__PURE__ */ jsx(ResultNotice, { label: "Total users", count: filteredUsers.length, onClear: () => selectTab("users") }),
            /* @__PURE__ */ jsx(AdminSection, { title: "User Access Control", description: "Review all registered accounts and manage their roles and active status.", icon: UserCog, actions: /* @__PURE__ */ jsx(Button, { asChild: true, className: "rounded-xl font-bold", children: /* @__PURE__ */ jsx(Link, { to: "/user-management", children: "Advanced User Management" }) }), children: /* @__PURE__ */ jsx(UsersTable, { users: filteredUsers, currentUserId: data.viewer.id }) })
          ] }),
          tab === "jobs" && /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            overviewResult === "today-jobs" && /* @__PURE__ */ jsx(ResultNotice, { label: "Jobs posted today", count: filteredJobs.length, onClear: () => selectTab("jobs") }),
            overviewResult === "open-disputes" && /* @__PURE__ */ jsx(ResultNotice, { label: "Open disputes", count: filteredDisputes.length, onClear: () => selectTab("jobs") }),
            /* @__PURE__ */ jsx(AdminSection, { title: "Job \\u0026 Dispute Management", description: "Database view of work activity and reported issues.", icon: BriefcaseBusiness, actions: /* @__PURE__ */ jsx(Button, { asChild: true, className: "rounded-xl font-bold", children: /* @__PURE__ */ jsx(Link, { to: "/job-management", children: "Full Job Management" }) }), children: /* @__PURE__ */ jsx(JobDisputeManagement, { jobs: filteredJobs, disputes: filteredDisputes, jobQuery, disputeQuery, onJobQueryChange: setJobQuery, onDisputeQueryChange: setDisputeQuery, resultMode: overviewResult === "today-jobs" ? "jobs" : overviewResult === "open-disputes" ? "disputes" : "all" }) })
          ] }),
          tab === "payments" && /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            overviewResult === "today-transactions" && /* @__PURE__ */ jsx(ResultNotice, { label: "Today transactions", count: filteredPayments.length, onClear: () => selectTab("payments") }),
            /* @__PURE__ */ jsx(AdminSection, { title: "Payment Activity", description: "Real-time transaction log from the platform database.", icon: ReceiptText, actions: /* @__PURE__ */ jsx(Button, { asChild: true, className: "rounded-xl font-bold", children: /* @__PURE__ */ jsx(Link, { to: "/earnings-reports", children: "Full Earnings Report" }) }), children: /* @__PURE__ */ jsx(PaymentsTable, { payments: filteredPayments, loading: false, query: paymentQuery, onQueryChange: setPaymentQuery }) })
          ] })
        ] })
      ] })
    ] })
  ] });
}
function getMetricIcon(label) {
  const l = label.toLowerCase();
  if (l.includes("user")) return Users;
  if (l.includes("job")) return ClipboardList;
  if (l.includes("revenue") || l.includes("transaction") || l.includes("payment")) return DollarSign;
  if (l.includes("dispute")) return AlertTriangle;
  return TrendingUp;
}
function getShortcutStats(dashboard, stats, totalUsers) {
  const totalJobs = dashboard.stats.totalJobs;
  const openJobs = dashboard.stats.openJobs;
  const todayJobs = dashboard.stats.todayJobs;
  const completedJobs = totalJobs - openJobs - todayJobs;
  const totalRevenue = dashboard.stats.totalRevenue || 0;
  const activeUsersCount = stats?.activeUsers ?? totalUsers;
  return {
    overview: [{
      label: "Total users",
      value: stats?.totalUsers ?? 0,
      caption: "Registered accounts"
    }, {
      label: "Active users",
      value: activeUsersCount,
      caption: "Currently active"
    }, {
      label: "Today revenue",
      value: formatMoney$5(dashboard.stats.todayRevenue),
      caption: "Payments completed today"
    }, {
      label: "Open disputes",
      value: dashboard.stats.openDisputes,
      caption: "Needs attention"
    }],
    jobs: [{
      label: "Total jobs",
      value: totalJobs,
      caption: "All posted jobs"
    }, {
      label: "Active jobs",
      value: openJobs,
      caption: "Running and open work"
    }, {
      label: "Completed jobs",
      value: completedJobs,
      caption: "Closed successfully"
    }, {
      label: "Open disputes",
      value: dashboard.stats.openDisputes,
      caption: "Needs admin review"
    }],
    users: [{
      label: "Total users",
      value: stats?.totalUsers ?? totalUsers,
      caption: "All account holders"
    }, {
      label: "Active users",
      value: activeUsersCount,
      caption: "Verified and active"
    }, {
      label: "New today",
      value: dashboard.stats.todayUsers,
      caption: "Accounts created today"
    }, {
      label: "Verified users",
      value: stats?.activeUsers ?? 0,
      caption: "Verified from current database counts"
    }],
    payments: [{
      label: "Total revenue",
      value: formatMoney$5(totalRevenue),
      caption: "Completed earnings"
    }, {
      label: "Successful payments",
      value: dashboard.stats.todayTransactions,
      caption: "Transactions completed"
    }, {
      label: "Monthly revenue",
      value: formatMoney$5(dashboard.stats.todayRevenue * 30),
      caption: "Derived from current database revenue"
    }]
  };
}
function JobDisputeManagement({
  jobs,
  disputes,
  jobQuery,
  disputeQuery,
  onJobQueryChange,
  onDisputeQueryChange,
  resultMode
}) {
  const openDisputes = disputes.filter((dispute) => dispute.status !== "RESOLVED").length;
  const highPriorityDisputes = disputes.filter((dispute) => dispute.priority === "HIGH" && dispute.status !== "RESOLVED").length;
  return /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid gap-4 md:grid-cols-3 p-6 bg-muted/20 border-b border-border", children: [
      /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-border bg-background p-5 shadow-sm", children: [
        /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold uppercase tracking-widest text-muted-foreground", children: "Work queue" }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-3xl font-bold", children: jobs.length }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-muted-foreground font-medium", children: "Matching current filter" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-border bg-background p-5 shadow-sm", children: [
        /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold uppercase tracking-widest text-muted-foreground", children: "Open disputes" }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-3xl font-bold text-rose-600", children: openDisputes }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-muted-foreground font-medium", children: "Open or under review" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-border bg-background p-5 shadow-sm", children: [
        /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold uppercase tracking-widest text-muted-foreground", children: "High priority" }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-3xl font-bold text-rose-700", children: highPriorityDisputes }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-muted-foreground font-medium", children: "Needs immediate action" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "p-6 pt-0 space-y-8", children: [
      resultMode !== "jobs" && /* @__PURE__ */ jsx(DisputesTable, { disputes, query: disputeQuery, onQueryChange: onDisputeQueryChange }),
      resultMode !== "disputes" && /* @__PURE__ */ jsx(JobsTable, { jobs, query: jobQuery, onQueryChange: onJobQueryChange })
    ] })
  ] });
}
function DisputesTable({
  disputes,
  query,
  onQueryChange
}) {
  const router2 = useRouter();
  const [updatingId, setUpdatingId] = useState(null);
  async function handleStatusChange(disputeId, status) {
    if (!["OPEN", "UNDER_REVIEW", "RESOLVED"].includes(status)) {
      return;
    }
    setUpdatingId(disputeId);
    try {
      await updateManagedDisputeStatus({
        data: {
          disputeId,
          status
        }
      });
      await router2.invalidate();
    } finally {
      setUpdatingId(null);
    }
  }
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-start justify-between gap-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-foreground", children: "Dispute Management" }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Review reported issues and update resolution state." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "relative w-full sm:w-64", children: [
        /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
        /* @__PURE__ */ jsx(Input, { value: query, onChange: (event) => onQueryChange(event.target.value), placeholder: "Search disputes...", className: "pl-9 h-10 rounded-xl" })
      ] })
    ] }),
    disputes.length ? /* @__PURE__ */ jsx("div", { className: "divide-y divide-border rounded-2xl border border-border overflow-hidden bg-background shadow-sm", children: disputes.map((dispute) => /* @__PURE__ */ jsxs("div", { className: "group grid gap-6 p-6 lg:grid-cols-[minmax(0,1fr)_240px] lg:items-center hover:bg-muted/30 transition-colors", children: [
      /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ jsx("p", { className: "truncate font-bold text-lg text-foreground group-hover:text-primary transition-colors", children: dispute.jobTitle }),
          /* @__PURE__ */ jsx(Badge, { variant: dispute.status === "OPEN" ? "destructive" : dispute.status === "UNDER_REVIEW" ? "secondary" : "outline", className: "rounded-lg", children: formatEnum$a(dispute.status) }),
          /* @__PURE__ */ jsx(Badge, { variant: dispute.priority === "HIGH" ? "destructive" : "outline", className: "rounded-lg", children: formatEnum$a(dispute.priority) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground font-medium", children: [
          /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsx(UserCog, { className: "h-3.5 w-3.5" }),
            "By ",
            formatEnum$a(dispute.reporterRole),
            ": ",
            dispute.reporterName
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsx(Clock3, { className: "h-3.5 w-3.5" }),
            formatDateTime$6(dispute.createdAt)
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsx(ShieldCheck, { className: "h-3.5 w-3.5" }),
            formatEnum$a(dispute.issueType)
          ] })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "mt-3 line-clamp-2 text-sm text-muted-foreground bg-muted/40 p-3 rounded-xl italic", children: [
          '"',
          dispute.message,
          '"'
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-3 flex gap-4 text-xs font-bold uppercase tracking-wider text-muted-foreground/80", children: [
          /* @__PURE__ */ jsxs("p", { children: [
            "Client: ",
            /* @__PURE__ */ jsx("span", { className: "text-foreground", children: dispute.clientName })
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            "Provider: ",
            /* @__PURE__ */ jsx("span", { className: "text-foreground", children: dispute.professionalName })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-3 bg-muted/30 p-4 rounded-2xl border border-border/50 shadow-inner", children: [
        /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-1", children: "Update Status" }),
        /* @__PURE__ */ jsxs(Select, { value: dispute.status, onValueChange: (value) => handleStatusChange(dispute.id, value), disabled: updatingId === dispute.id, children: [
          /* @__PURE__ */ jsx(SelectTrigger, { className: "rounded-xl h-11 bg-background border-border shadow-sm", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsx(SelectItem, { value: "OPEN", children: "Open" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "UNDER_REVIEW", children: "Under Review" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "RESOLVED", children: "Resolved" })
          ] })
        ] }),
        dispute.jobId ? /* @__PURE__ */ jsx(Button, { asChild: true, variant: "outline", size: "sm", className: "w-full rounded-xl h-10 font-bold", children: /* @__PURE__ */ jsx(Link, { to: "/job-management", children: "View Full Case" }) }) : null
      ] })
    ] }, dispute.id)) }) : /* @__PURE__ */ jsx("div", { className: "rounded-2xl border-2 border-dashed border-border bg-muted/10 p-12 text-center", children: /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-muted-foreground uppercase tracking-widest", children: "No disputes found" }) })
  ] });
}
function JobsTable({
  jobs,
  query,
  onQueryChange
}) {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-start justify-between gap-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-foreground", children: "Platform Job Records" }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Search by client, title, category, or status." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "relative w-full sm:w-64", children: [
        /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
        /* @__PURE__ */ jsx(Input, { value: query, onChange: (event) => onQueryChange(event.target.value), placeholder: "Search jobs...", className: "pl-9 h-10 rounded-xl" })
      ] })
    ] }),
    jobs.length ? /* @__PURE__ */ jsx("div", { className: "divide-y divide-border rounded-2xl border border-border overflow-hidden bg-background shadow-sm", children: jobs.map((job) => /* @__PURE__ */ jsxs("div", { className: "group grid gap-4 p-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center hover:bg-muted/30 transition-colors", children: [
      /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
          /* @__PURE__ */ jsx("p", { className: "truncate font-bold text-lg text-foreground group-hover:text-primary transition-colors", children: job.title }),
          /* @__PURE__ */ jsx(Badge, { variant: job.status === "OPEN" ? "default" : "outline", className: "rounded-lg", children: formatEnum$a(job.status) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-2 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-muted-foreground font-medium uppercase tracking-wider", children: [
          /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsx(Building2, { className: "h-3.5 w-3.5" }),
            job.category
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsx(CalendarRange, { className: "h-3.5 w-3.5" }),
            "Posted ",
            formatDateTime$6(job.createdAt)
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-3 flex gap-6 text-sm", children: [
          /* @__PURE__ */ jsxs("p", { className: "font-medium", children: [
            "Client: ",
            /* @__PURE__ */ jsx("span", { className: "font-bold text-foreground", children: job.clientName })
          ] }),
          job.professionalName && /* @__PURE__ */ jsxs("p", { className: "font-medium", children: [
            "Provider: ",
            /* @__PURE__ */ jsx("span", { className: "font-bold text-foreground", children: job.professionalName })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "mt-2 text-xs text-muted-foreground font-medium uppercase tracking-widest flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(MapPin, { className: "h-3 w-3" }),
          formatEnum$a(job.workMode),
          " \\u00b7 Deadline ",
          formatDate$9(job.deadline),
          job.locationLabel ? ` · ${job.locationLabel}` : ""
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "shrink-0 text-right", children: [
        /* @__PURE__ */ jsx("p", { className: "text-xl font-bold text-foreground tracking-tight", children: formatBudget$9(job.budgetMin, job.budgetMax) }),
        /* @__PURE__ */ jsx(Button, { asChild: true, variant: "ghost", size: "sm", className: "mt-2 h-8 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-primary/10 hover:text-primary", children: /* @__PURE__ */ jsx(Link, { to: "/job-management", children: "Open Job Details" }) })
      ] })
    ] }, job.id)) }) : /* @__PURE__ */ jsx("div", { className: "rounded-2xl border-2 border-dashed border-border bg-muted/10 p-12 text-center", children: /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-muted-foreground uppercase tracking-widest", children: "No jobs found" }) })
  ] });
}
function PaymentsTable({
  payments,
  loading,
  query,
  onQueryChange
}) {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "p-6 border-b border-border bg-muted/10 flex flex-wrap items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-foreground", children: "Database Transaction Log" }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Audit trailing payments and revenue records." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "relative w-full sm:w-64", children: [
        /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
        /* @__PURE__ */ jsx(Input, { value: query, onChange: (event) => onQueryChange(event.target.value), placeholder: "Filter transactions...", className: "pl-9 h-10 rounded-xl bg-background" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "p-6 pt-0", children: loading ? /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsx("div", { className: "h-16 animate-pulse rounded-2xl bg-muted" }),
      /* @__PURE__ */ jsx("div", { className: "h-16 animate-pulse rounded-2xl bg-muted" }),
      /* @__PURE__ */ jsx("div", { className: "h-16 animate-pulse rounded-2xl bg-muted" })
    ] }) : payments.length ? /* @__PURE__ */ jsx("div", { className: "divide-y divide-border rounded-2xl border border-border overflow-hidden bg-background shadow-sm", children: payments.map((payment) => /* @__PURE__ */ jsxs("div", { className: "group grid gap-4 p-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center hover:bg-emerald-50/50 transition-colors", children: [
      /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex items-center gap-4", children: [
        /* @__PURE__ */ jsx("div", { className: "grid h-10 w-10 place-items-center rounded-xl bg-emerald-100 text-emerald-700", children: /* @__PURE__ */ jsx(Wallet, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsx("p", { className: "truncate font-bold text-foreground group-hover:text-emerald-700 transition-colors", children: payment.jobTitle }),
          /* @__PURE__ */ jsxs("p", { className: "mt-1 text-xs text-muted-foreground font-medium uppercase tracking-widest", children: [
            formatEnum$a(payment.paymentType),
            " \\u00b7 ",
            formatDateTime$6(payment.dateTime)
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
        /* @__PURE__ */ jsx("p", { className: "text-lg font-bold text-foreground tracking-tight", children: formatMoney$5(payment.amount) }),
        /* @__PURE__ */ jsxs("p", { className: "mt-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground", children: [
          "Status: ",
          /* @__PURE__ */ jsx("span", { className: "text-emerald-600", children: "COMPLETED" })
        ] })
      ] })
    ] }, payment.id)) }) : /* @__PURE__ */ jsx("div", { className: "rounded-2xl border-2 border-dashed border-border bg-muted/10 p-12 text-center", children: /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-muted-foreground uppercase tracking-widest", children: "No transactions found" }) }) })
  ] });
}
function AdminLogin() {
  const router2 = useRouter();
  const [username, setUsername] = useState(ADMIN_USERNAME);
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  async function handleSubmit(event) {
    event.preventDefault();
    setFormError(null);
    setIsSubmitting(true);
    try {
      const result = await submitAdminLogin({
        data: {
          username,
          password
        }
      });
      if (!result.ok) {
        setFormError(result.formError);
        return;
      }
      await router2.invalidate();
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Admin login failed.");
    } finally {
      setIsSubmitting(false);
    }
  }
  return /* @__PURE__ */ jsx("div", { className: "grid min-h-screen place-items-center bg-muted/30 px-4", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-sm rounded-3xl border border-border bg-card p-8 shadow-2xl animate-in zoom-in-95 duration-300", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsx("div", { className: "grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary", children: /* @__PURE__ */ jsx(ShieldCheck, { className: "h-7 w-7" }) }),
      /* @__PURE__ */ jsx("h1", { className: "mt-6 text-3xl font-bold tracking-tight text-foreground", children: "Admin Login" }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground font-medium", children: "Authorized administrative access only." })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx("label", { className: "text-xs font-bold uppercase tracking-widest text-muted-foreground", htmlFor: "admin-username", children: "Username / Email" }),
        /* @__PURE__ */ jsx(Input, { id: "admin-username", value: username, onChange: (event) => setUsername(event.target.value), autoComplete: "username", className: "h-12 rounded-xl bg-background border-border shadow-sm focus:ring-2 focus:ring-primary/20", placeholder: "admin@servio.com" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx("label", { className: "text-xs font-bold uppercase tracking-widest text-muted-foreground", htmlFor: "admin-password", children: "Security Password" }),
        /* @__PURE__ */ jsx(Input, { id: "admin-password", type: "password", value: password, onChange: (event) => setPassword(event.target.value), autoComplete: "current-password", className: "h-12 rounded-xl bg-background border-border shadow-sm focus:ring-2 focus:ring-primary/20", placeholder: "\\u2022\\u2022\\u2022\\u2022\\u2022\\u2022\\u2022\\u2022" })
      ] }),
      formError && /* @__PURE__ */ jsxs("div", { className: "rounded-xl bg-rose-50 p-4 border border-rose-100 flex items-center gap-2 text-rose-700 text-sm font-bold animate-in fade-in slide-in-from-top-1 duration-200", children: [
        /* @__PURE__ */ jsx(AlertTriangle, { className: "h-4 w-4 shrink-0" }),
        formError
      ] }),
      /* @__PURE__ */ jsx(Button, { type: "submit", className: "w-full h-12 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all active:scale-95", disabled: isSubmitting, children: isSubmitting ? "AUTHORIZING..." : "ENTER ADMIN PANEL" })
    ] })
  ] }) });
}
function Overview({
  dashboard,
  onSelectResult
}) {
  const stats = dashboard.stats;
  return /* @__PURE__ */ jsxs("div", { className: "space-y-8 animate-in fade-in duration-500", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: [
      /* @__PURE__ */ jsx(AdminSummaryCard, { icon: Users, label: "Total Registered Users", value: stats.totalUsers, caption: `${stats.activeUsers} active accounts · ${stats.todayUsers} new today`, onClick: () => onSelectResult("total-users") }),
      /* @__PURE__ */ jsx(AdminSummaryCard, { icon: ClipboardList, label: "Jobs Posted Today", value: stats.todayJobs, caption: `${stats.openJobs} currently open work posts`, variant: "primary", onClick: () => onSelectResult("today-jobs") }),
      /* @__PURE__ */ jsx(AdminSummaryCard, { icon: DollarSign, label: "Today Gross Revenue", value: formatMoney$5(stats.todayRevenue), caption: `${stats.todayTransactions} successful transactions`, variant: "success", onClick: () => onSelectResult("today-transactions") }),
      /* @__PURE__ */ jsx(AdminSummaryCard, { icon: AlertTriangle, label: "Open Disputed Issues", value: stats.openDisputes, caption: `${stats.pendingRequests} project requests pending`, variant: "destructive", onClick: () => onSelectResult("open-disputes") })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-8 xl:grid-cols-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "rounded-3xl border border-border bg-card shadow-sm overflow-hidden flex flex-col", children: [
        /* @__PURE__ */ jsxs("div", { className: "border-b border-border bg-muted/20 px-8 py-6", children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-xl font-bold text-foreground flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("div", { className: "h-8 w-8 rounded-lg bg-primary/10 text-primary grid place-items-center", children: /* @__PURE__ */ jsx(ClipboardList, { className: "h-4 w-4" }) }),
            "Live Client Job Posts"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground font-medium", children: "Real-time feed of work being posted to the platform." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "divide-y divide-border overflow-auto max-h-[500px] custom-scrollbar", children: dashboard.recentJobs.length ? dashboard.recentJobs.map((job) => /* @__PURE__ */ jsxs("div", { className: "group p-6 hover:bg-muted/30 transition-colors flex items-center justify-between gap-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
              /* @__PURE__ */ jsx("p", { className: "truncate font-bold text-foreground group-hover:text-primary transition-colors", children: job.title }),
              /* @__PURE__ */ jsx(Badge, { variant: job.status === "OPEN" ? "default" : "outline", className: "rounded-lg text-[9px] uppercase tracking-widest", children: formatEnum$a(job.status) })
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "mt-1 text-xs text-muted-foreground font-medium uppercase tracking-widest flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-primary/60 font-bold", children: job.clientName || "Unknown Client" }),
              /* @__PURE__ */ jsx("span", { children: "\\u00b7" }),
              /* @__PURE__ */ jsx("span", { children: job.category }),
              /* @__PURE__ */ jsx("span", { children: "\\u00b7" }),
              /* @__PURE__ */ jsx("span", { children: formatDateTime$6(job.createdAt) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "shrink-0 text-right", children: [
            /* @__PURE__ */ jsx("p", { className: "text-base font-bold text-foreground", children: formatBudget$9(job.budgetMin, job.budgetMax) }),
            /* @__PURE__ */ jsx(Link, { to: "/job-management", className: "text-[10px] font-bold text-primary uppercase tracking-widest hover:underline mt-1 block", children: "View Case" })
          ] })
        ] }, job.id)) : /* @__PURE__ */ jsx(EmptyLiveRow, { title: "No live jobs detected", description: "Client job posts will appear here as soon as they are created." }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-3xl border border-border bg-card shadow-sm overflow-hidden flex flex-col", children: [
        /* @__PURE__ */ jsxs("div", { className: "border-b border-border bg-muted/20 px-8 py-6", children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-xl font-bold text-foreground flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("div", { className: "h-8 w-8 rounded-lg bg-emerald-100 text-emerald-700 grid place-items-center", children: /* @__PURE__ */ jsx(Wallet, { className: "h-4 w-4" }) }),
            "Recent Financial Transactions"
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "mt-1 text-sm text-muted-foreground font-medium", children: [
            "Total completed revenue: ",
            /* @__PURE__ */ jsx("span", { className: "font-bold text-emerald-600", children: formatMoney$5(stats.totalRevenue) })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "divide-y divide-border overflow-auto max-h-[500px] custom-scrollbar", children: dashboard.recentTransactions.length ? dashboard.recentTransactions.map((transaction) => /* @__PURE__ */ jsxs("div", { className: "group p-6 hover:bg-emerald-50/30 transition-colors flex items-center justify-between gap-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex items-center gap-4", children: [
            /* @__PURE__ */ jsx("div", { className: "grid h-10 w-10 place-items-center rounded-xl bg-muted text-muted-foreground group-hover:bg-emerald-100 group-hover:text-emerald-700 transition-colors", children: /* @__PURE__ */ jsx(ReceiptText, { className: "h-5 w-5" }) }),
            /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsx("p", { className: "truncate font-bold text-foreground group-hover:text-emerald-700 transition-colors", children: transaction.projectTitle }),
              /* @__PURE__ */ jsxs("p", { className: "mt-1 text-xs text-muted-foreground font-medium uppercase tracking-widest", children: [
                formatEnum$a(transaction.type),
                " \\u00b7 ",
                formatDateTime$6(transaction.createdAt)
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "shrink-0 text-lg font-bold text-foreground tracking-tight", children: formatMoney$5(transaction.amount) })
        ] }, transaction.id)) : /* @__PURE__ */ jsx(EmptyLiveRow, { title: "No transactions found", description: "Completed project payments will appear here." }) })
      ] })
    ] })
  ] });
}
function ResultNotice({
  label,
  count,
  onClear
}) {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-primary/20 bg-primary/5 px-6 py-4 text-sm shadow-sm animate-in slide-in-from-top-2 duration-300", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(Search, { className: "h-4 w-4 text-primary" }),
      /* @__PURE__ */ jsxs("span", { className: "font-bold text-primary uppercase tracking-widest", children: [
        "FILTER ACTIVE: ",
        label,
        " (",
        count.toLocaleString(),
        " RESULTS)"
      ] })
    ] }),
    /* @__PURE__ */ jsx(Button, { type: "button", variant: "outline", size: "sm", className: "rounded-xl font-bold uppercase tracking-widest text-[10px]", onClick: onClear, children: "Clear Selection" })
  ] });
}
function isOnDashboardDay(value, generatedAt) {
  const date = new Date(value);
  const dashboardDate = new Date(generatedAt);
  return date.getFullYear() === dashboardDate.getFullYear() && date.getMonth() === dashboardDate.getMonth() && date.getDate() === dashboardDate.getDate();
}
function EmptyLiveRow({
  title,
  description
}) {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center p-12 text-center rounded-2xl", children: [
    /* @__PURE__ */ jsx("div", { className: "grid h-12 w-12 place-items-center rounded-full bg-muted text-muted-foreground/30 mb-4", children: /* @__PURE__ */ jsx(Radio, { className: "h-6 w-6" }) }),
    /* @__PURE__ */ jsx("p", { className: "font-bold text-muted-foreground uppercase tracking-widest text-[11px]", children: title }),
    /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-muted-foreground max-w-[200px]", children: description })
  ] });
}
function UsersTable({
  users,
  currentUserId
}) {
  const router2 = useRouter();
  const [pendingAction, setPendingAction] = useState(null);
  const visibleUsers = useMemo(() => users, [users]);
  async function handleRoleChange(user, role) {
    const actionKey = `role-${user.id}`;
    setPendingAction(actionKey);
    try {
      await updateManagedUserRole({
        data: {
          userId: user.id,
          role
        }
      });
      await router2.invalidate();
    } finally {
      setPendingAction(null);
    }
  }
  async function handleStatusChange(user, isActive) {
    const actionKey = `status-${user.id}`;
    setPendingAction(actionKey);
    try {
      await updateManagedUserStatus({
        data: {
          userId: user.id,
          isActive
        }
      });
      await router2.invalidate();
    } finally {
      setPendingAction(null);
    }
  }
  if (!visibleUsers.length) {
    return /* @__PURE__ */ jsx(AdminEmptyState, { title: "No users found", description: "Try a different name, email, or role search.", icon: UserCog });
  }
  return /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full min-w-[760px] text-sm border-collapse", children: [
    /* @__PURE__ */ jsx("thead", { className: "bg-muted/50 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground border-b border-border", children: /* @__PURE__ */ jsxs("tr", { children: [
      /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-left", children: "User Profile" }),
      /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-left", children: "Access Role" }),
      /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-left", children: "Active Status" }),
      /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-left", children: "Auth Provider" }),
      /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-left", children: "Registration" })
    ] }) }),
    /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-border", children: visibleUsers.map((user) => {
      const isCurrentUser = user.id === currentUserId;
      const fullName = `${user.firstName} ${user.lastName}`.trim() || user.email;
      return /* @__PURE__ */ jsxs("tr", { className: "group border-b border-border/60 last:border-0 hover:bg-muted/30 transition-colors", children: [
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("img", { src: user.avatarUrl || `https://i.pravatar.cc/100?u=${user.id}`, className: "h-10 w-10 rounded-xl object-cover ring-2 ring-background shadow-sm", alt: "" }),
          /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsx("p", { className: "truncate font-bold text-foreground group-hover:text-primary transition-colors", children: fullName }),
            /* @__PURE__ */ jsx("p", { className: "truncate text-xs text-muted-foreground font-medium", children: user.email })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxs(Select, { value: user.role, onValueChange: (value) => handleRoleChange(user, value), disabled: pendingAction !== null || isCurrentUser, children: [
          /* @__PURE__ */ jsx(SelectTrigger, { className: "rounded-xl h-10 w-44 bg-background border-border shadow-sm text-xs font-bold uppercase tracking-widest", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsx(SelectContent, { children: roleOptions.map((role) => /* @__PURE__ */ jsx(SelectItem, { value: role.value, children: role.label }, role.value)) })
        ] }) }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsx(Switch, { checked: user.isActive, onCheckedChange: (checked) => handleStatusChange(user, checked), disabled: pendingAction !== null || isCurrentUser, className: "data-[state=checked]:bg-emerald-500", "aria-label": `${user.isActive ? "Deactivate" : "Activate"} ${fullName}` }),
          /* @__PURE__ */ jsx("span", { className: cn("rounded-lg px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest", user.isActive ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"), children: user.isActive ? "Active" : "Blocked" })
        ] }) }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "rounded-lg text-[10px] font-bold uppercase tracking-widest bg-background", children: formatEnum$a(user.authProvider) }) }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-xs font-medium text-muted-foreground tabular-nums", children: formatDate$9(user.createdAt) })
      ] }, user.id);
    }) })
  ] }) });
}
function Wallet({
  className
}) {
  return /* @__PURE__ */ jsx(DollarSign, { className });
}
function getSocketUrl$8() {
  return `${window.location.protocol}//${window.location.hostname}:4001`;
}
const Route$15 = Route$16;
const $$splitComponentImporter$i = () => import("./admin-categories-CUj_sHQL.js");
const loadAdminCategoriesData = createServerFn({
  method: "GET"
}).handler(createSsrRpc("547642466553dd72bf7aad332cf0b891936c04e214045162a610d5727ff09263"));
const Route$14 = createFileRoute("/admin-categories")({
  loader: () => loadAdminCategoriesData(),
  head: () => ({
    meta: [{
      title: "Service Categories - Servio"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$i, "component")
});
const getAdminNotifications = createServerFn({
  method: "GET"
}).handler(createSsrRpc("ff434e75bc89341f957044cac77a2690d285d7052aee5ea9f68120cee5984435"));
const markAdminNotificationsRead = createServerFn({
  method: "POST"
}).handler(createSsrRpc("aa2cd770358103e83638d3ec2ca758b10579b0e0280be5ae356a514f8b1f099d"));
const clearAdminNotifications = createServerFn({
  method: "POST"
}).handler(createSsrRpc("0c86f3e56ddd26cf4be6ac95c8df4027d8dc824522e054266058cdcf9b5d6041"));
const Route$13 = createFileRoute("/admin-notifications")({
  beforeLoad: async () => {
    if (!await getAdminNotifications()) {
      throw redirect({
        to: "/admin"
      });
    }
  },
  loader: () => getAdminNotifications(),
  head: () => ({
    meta: [{
      title: "Admin Notifications - Servio"
    }]
  }),
  component: AdminNotifications
});
const filters = ["All", "Users", "Jobs", "Disputes", "Payments"];
function AdminNotifications() {
  const data = useLoaderData({
    from: "/admin-notifications"
  });
  const router2 = useRouter();
  const [filter, setFilter] = useState("All");
  const [updating, setUpdating] = useState(false);
  const notifications = data.notifications;
  const visible = notifications.filter((notification) => matchesFilter(notification, filter));
  const unread = notifications.filter((notification) => !notification.readAt).length;
  const userName = `${data.viewer.firstName} ${data.viewer.lastName}`.trim() || data.viewer.email;
  useEffect(() => {
    const refresh = () => void router2.invalidate();
    window.addEventListener("servio:notifications-refreshed", refresh);
    return () => window.removeEventListener("servio:notifications-refreshed", refresh);
  }, [router2]);
  async function runAction(action) {
    setUpdating(true);
    try {
      if (action === "read") {
        await markAdminNotificationsRead();
      } else {
        await clearAdminNotifications();
      }
      await router2.invalidate();
    } finally {
      setUpdating(false);
    }
  }
  return /* @__PURE__ */ jsxs(AppShell, { userName, userRole: "Admin", userAvatarUrl: data.viewer.avatarUrl, children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-6 flex flex-wrap items-end justify-between gap-3", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold uppercase tracking-[0.18em] text-primary", children: "Admin panel" }),
        /* @__PURE__ */ jsx("h1", { className: "mt-1 text-2xl font-semibold tracking-tight", children: "Notifications" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Live platform activity for users, jobs, disputes, and payments." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2", children: [
        /* @__PURE__ */ jsxs(Button, { variant: "outline", disabled: updating || unread === 0, onClick: () => runAction("read"), children: [
          /* @__PURE__ */ jsx(CheckCheck, { className: "mr-2 h-4 w-4" }),
          " Mark all read"
        ] }),
        /* @__PURE__ */ jsxs(Button, { variant: "outline", disabled: updating || notifications.length === 0, onClick: () => runAction("clear"), children: [
          /* @__PURE__ */ jsx(Trash2, { className: "mr-2 h-4 w-4" }),
          " Clear all"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mb-4 flex flex-wrap gap-2", children: filters.map((item) => /* @__PURE__ */ jsx(Button, { size: "sm", variant: filter === item ? "default" : "outline", onClick: () => setFilter(item), children: item }, item)) }),
    /* @__PURE__ */ jsx("div", { className: "overflow-hidden rounded-xl border border-border bg-card shadow-soft", children: visible.length ? /* @__PURE__ */ jsx("div", { className: "divide-y divide-border", children: visible.map((notification) => {
      const Icon = getNotificationIcon(notification);
      return /* @__PURE__ */ jsxs("a", { href: notification.href, className: "flex gap-4 p-4 transition-colors hover:bg-muted/40", children: [
        /* @__PURE__ */ jsx("div", { className: "grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/10 text-primary", children: /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
            /* @__PURE__ */ jsx("p", { className: "font-semibold", children: notification.title }),
            !notification.readAt ? /* @__PURE__ */ jsx(Badge, { children: "New" }) : null
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: notification.description }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs text-muted-foreground", children: formatDateTime$5(notification.createdAt) })
        ] })
      ] }, notification.key);
    }) }) : /* @__PURE__ */ jsxs("div", { className: "grid place-items-center px-4 py-16 text-center", children: [
      /* @__PURE__ */ jsx(BellRing, { className: "h-10 w-10 text-muted-foreground" }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 font-semibold", children: "No notifications found" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "New admin activity will appear here instantly." })
    ] }) })
  ] });
}
function matchesFilter(notification, filter) {
  if (filter === "All") return true;
  if (filter === "Users") return notification.key.startsWith("admin:user:");
  if (filter === "Jobs") return notification.key.startsWith("admin:job:");
  if (filter === "Disputes") return notification.key.startsWith("admin:dispute:");
  return notification.key.startsWith("admin:payment:");
}
function getNotificationIcon(notification) {
  if (notification.key.startsWith("admin:user:")) return UserPlus;
  if (notification.key.startsWith("admin:job:")) return Briefcase;
  if (notification.key.startsWith("admin:payment:")) return Wallet$1;
  return BellRing;
}
function formatDateTime$5(value) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(value));
}
const Route$12 = Route$13;
const $$splitComponentImporter$h = () => import("./admin-reports-BV8uIaDs.js");
const getAdminReportsData = createServerFn({
  method: "GET"
}).handler(createSsrRpc("786f5101632b203af0eb28be1fb4d679269c74691401ec1b6b449a8edd3067a1"));
const Route$11 = createFileRoute("/admin-reports")({
  loader: () => getAdminReportsData(),
  head: () => ({
    meta: [{
      title: "Platform Reports - Servio"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$h, "component")
});
const $$splitComponentImporter$g = () => import("./client-reports-B4PUu_6R.js");
const getClientReportsData = createServerFn({
  method: "GET"
}).handler(createSsrRpc("2114fbcd804606ec0ffa4509ea56beb9c77d12bf8af2b79accd1d13504827428"));
const Route$10 = createFileRoute("/client-reports")({
  loader: () => getClientReportsData(),
  head: () => ({
    meta: [{
      title: "My Reports - Servio"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$g, "component")
});
const $$splitComponentImporter$f = () => import("./contact-us-DW5qkYEi.js");
const Route$$ = createFileRoute("/contact-us")({
  head: () => ({
    meta: [{
      title: "Contact Us - Servio"
    }, {
      name: "description",
      content: "Contact the Servio support team."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$f, "component")
});
function formatApproximateLocation(location, fallback = "Location not added") {
  const rawLocation = location?.trim();
  if (!rawLocation) {
    return fallback;
  }
  const parts = rawLocation.split(",").map((part) => part.trim()).filter(Boolean);
  if (parts.length >= 3) {
    return parts.slice(-3).join(", ");
  }
  if (parts.length >= 2) {
    return parts.join(", ");
  }
  return rawLocation.replace(
    /^\s*(?:house|flat|apt|apartment|unit|door|plot|no\.?)?\s*#?\d+[A-Za-z/-]*\s+/i,
    ""
  );
}
function formatApproximateCoordinates(lat, lng) {
  if (lat == null || lng == null) {
    return "";
  }
  return `${lat.toFixed(2)}, ${lng.toFixed(2)}`;
}
const Table = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { className: "relative w-full overflow-auto", children: /* @__PURE__ */ jsx("table", { ref, className: cn("w-full caption-bottom text-sm", className), ...props }) })
);
Table.displayName = "Table";
const TableHeader = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("thead", { ref, className: cn("[&_tr]:border-b", className), ...props }));
TableHeader.displayName = "TableHeader";
const TableBody = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("tbody", { ref, className: cn("[&_tr:last-child]:border-0", className), ...props }));
TableBody.displayName = "TableBody";
const TableFooter = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "tfoot",
  {
    ref,
    className: cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className),
    ...props
  }
));
TableFooter.displayName = "TableFooter";
const TableRow = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "tr",
    {
      ref,
      className: cn(
        "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
        className
      ),
      ...props
    }
  )
);
TableRow.displayName = "TableRow";
const TableHead = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "th",
  {
    ref,
    className: cn(
      "h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    ),
    ...props
  }
));
TableHead.displayName = "TableHead";
const TableCell = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "td",
  {
    ref,
    className: cn(
      "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    ),
    ...props
  }
));
TableCell.displayName = "TableCell";
const TableCaption = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("caption", { ref, className: cn("mt-4 text-sm text-muted-foreground", className), ...props }));
TableCaption.displayName = "TableCaption";
const getDashboardAccess = createServerFn({
  method: "GET"
}).handler(createSsrRpc("12163bba88d4762a9cb6b72f6c7362484b1d32999fba614b513a46288400c7ac"));
const setClientJobStatus = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(createSsrRpc("d10fd46a0f32cdc7ad911170dd8cf534414c29108be8166833d5526f9cdb0ea7"));
const Route$_ = createFileRoute("/dashboard")({
  beforeLoad: async ({
    location
  }) => {
    const access = await getDashboardAccess();
    if (!access) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href
        }
      });
    }
    if (access.viewer.role === "ADMIN") {
      throw redirect({
        to: "/"
      });
    }
    if (access.viewer.role === "PROFESSIONAL") {
      throw redirect({
        to: "/professional-profile"
      });
    }
  },
  loader: () => getDashboardAccess(),
  head: () => ({
    meta: [{
      title: "Dashboard - Servio"
    }]
  }),
  component: Dashboard
});
function Dashboard() {
  const access = useLoaderData({
    from: "/dashboard"
  });
  const router2 = useRouter();
  const [statusMessage, setStatusMessage] = useState(null);
  const [statusError, setStatusError] = useState(null);
  const [updatingJobId, setUpdatingJobId] = useState(null);
  if (!access) {
    return null;
  }
  const {
    viewer,
    clientProfile
  } = access;
  const clientJobs = access.clientJobs;
  const displayName = clientProfile?.fullName || `${viewer.firstName} ${viewer.lastName}`.trim();
  if (viewer.role === "ADMIN") {
    return null;
  }
  if (viewer.role === "PROFESSIONAL") {
    return /* @__PURE__ */ jsx(ProfessionalDashboard, { displayName, viewer, openJobs: access.openJobs });
  }
  const openJobs = clientJobs.filter((job) => job.status === "OPEN").length;
  const draftJobs = clientJobs.filter((job) => job.status === "DRAFT").length;
  const closedJobs = clientJobs.filter((job) => job.status === "CLOSED").length;
  const upcomingJobs = clientJobs.filter((job) => new Date(job.deadline) >= /* @__PURE__ */ new Date()).length;
  const totalBudget = clientJobs.reduce((sum, job) => sum + (job.budgetMax ?? job.budgetMin ?? 0), 0);
  const stats = [{
    label: "Total jobs",
    value: String(clientJobs.length),
    icon: Briefcase,
    tint: "text-primary bg-primary/10"
  }, {
    label: "Active jobs",
    value: String(openJobs),
    icon: ClipboardList,
    tint: "text-accent bg-accent/15"
  }, {
    label: "Upcoming deadlines",
    value: String(upcomingJobs),
    icon: CalendarClock,
    tint: "text-warning bg-warning/15"
  }, {
    label: "Planned budget",
    value: totalBudget ? `$${totalBudget.toLocaleString()}` : "$0",
    icon: DollarSign,
    tint: "text-success bg-success/15"
  }];
  const changeJobStatus = async (jobId, status) => {
    setUpdatingJobId(jobId);
    setStatusMessage(null);
    setStatusError(null);
    try {
      const result = await setClientJobStatus({
        data: {
          jobId,
          status
        }
      });
      if (!result.ok) {
        setStatusError(result.formError);
        return;
      }
      setStatusMessage(status === "OPEN" ? "Job is now active and visible to professionals." : status === "DRAFT" ? "Job moved to draft." : "Job closed.");
      await router2.invalidate();
    } catch (error) {
      setStatusError(error instanceof Error ? error.message : "Could not update this job.");
    } finally {
      setUpdatingJobId(null);
    }
  };
  return /* @__PURE__ */ jsxs(AppShell, { userName: displayName, userRole: "Client", userAvatarUrl: clientProfile?.avatarUrl || viewer.avatarUrl, children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-end", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("h1", { className: "text-2xl font-semibold tracking-tight", children: [
          "Welcome back, ",
          displayName
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Post jobs, track the project details you saved, and manage deadlines from one place." })
      ] }),
      /* @__PURE__ */ jsx(Button, { size: "lg", asChild: true, children: /* @__PURE__ */ jsxs(Link, { to: "/post-job", children: [
        /* @__PURE__ */ jsx(FilePlus2, { className: "h-4 w-4" }),
        "Post job / project"
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mb-8 grid gap-6 lg:grid-cols-[1.35fr_1fr]", children: [
      /* @__PURE__ */ jsx("div", { className: "rounded-xl border border-border bg-card p-6 shadow-soft", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
        /* @__PURE__ */ jsx("img", { src: clientProfile?.avatarUrl || viewer.avatarUrl || "https://i.pravatar.cc/120?u=client-dashboard", alt: displayName, className: "h-16 w-16 rounded-xl object-cover" }),
        /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold", children: "Job posting hub" }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: clientProfile?.companyName || "Independent client account" }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm text-foreground", children: clientProfile?.address || "No main address saved yet." })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-border bg-card p-6 shadow-soft", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(MapPinHouse, { className: "h-4 w-4 text-primary" }),
            /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold", children: "Saved locations" })
          ] }),
          /* @__PURE__ */ jsx(Link, { to: "/my-info", className: "text-sm text-primary hover:underline", children: "View profile" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-4 space-y-3", children: (clientProfile?.savedLocations?.length ? clientProfile.savedLocations : [{
          label: "No saved locations yet",
          address: "Add your first location from profile setup."
        }]).map((location, index) => /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-border bg-muted/30 p-4", children: [
          /* @__PURE__ */ jsx("p", { className: "font-medium", children: location.label }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: location.address })
        ] }, `${location.label}-${index}`)) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: stats.map((s) => /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-border bg-card p-5 shadow-soft", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between", children: [
        /* @__PURE__ */ jsx("div", { className: `grid h-10 w-10 place-items-center rounded-xl ${s.tint}`, children: /* @__PURE__ */ jsx(s.icon, { className: "h-5 w-5" }) }),
        draftJobs ? /* @__PURE__ */ jsxs("span", { className: "text-xs font-medium text-muted-foreground", children: [
          draftJobs,
          " draft"
        ] }) : null
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-2xl font-semibold", children: s.value }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: s.label })
    ] }, s.label)) }),
    /* @__PURE__ */ jsxs("div", { className: "mt-8 rounded-xl border border-border bg-card p-6 shadow-soft", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-between gap-3 sm:flex-row sm:items-center", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold", children: "Posted jobs / projects" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Manage draft, active, and closed projects from one table." })
        ] }),
        /* @__PURE__ */ jsx(Button, { variant: "outline", asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "/post-job", children: "Add project" }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4 flex flex-wrap gap-2", children: [
        /* @__PURE__ */ jsxs(Badge, { variant: "secondary", children: [
          draftJobs,
          " Draft"
        ] }),
        /* @__PURE__ */ jsxs(Badge, { children: [
          openJobs,
          " Active"
        ] }),
        /* @__PURE__ */ jsxs(Badge, { variant: "outline", children: [
          closedJobs,
          " Closed"
        ] })
      ] }),
      statusMessage ? /* @__PURE__ */ jsx("div", { className: "mt-4 rounded-lg border border-success/20 bg-success/5 px-4 py-3 text-sm text-success", children: statusMessage }) : null,
      statusError ? /* @__PURE__ */ jsx("div", { className: "mt-4 rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive", children: statusError }) : null,
      clientJobs.length ? /* @__PURE__ */ jsx("div", { className: "mt-5", children: /* @__PURE__ */ jsxs(Table, { children: [
        /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
          /* @__PURE__ */ jsx(TableHead, { children: "Project" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Budget" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Urgency" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Work mode" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Deadline" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Files" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Status" }),
          /* @__PURE__ */ jsx(TableHead, { className: "text-right", children: "Manage" })
        ] }) }),
        /* @__PURE__ */ jsx(TableBody, { children: clientJobs.map((job) => /* @__PURE__ */ jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxs(TableCell, { className: "min-w-56", children: [
            /* @__PURE__ */ jsx(Link, { to: "/project/$projectId", params: {
              projectId: String(job.id)
            }, className: "font-medium text-foreground hover:text-primary hover:underline", children: job.title }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: job.category })
          ] }),
          /* @__PURE__ */ jsx(TableCell, { children: formatBudget$8(job.budgetMin, job.budgetMax, job.timingType) }),
          /* @__PURE__ */ jsx(TableCell, { children: formatEnum$9(job.urgency) }),
          /* @__PURE__ */ jsx(TableCell, { children: formatWorkMode$2(job.workMode) }),
          /* @__PURE__ */ jsx(TableCell, { children: formatDate$8(job.deadline) }),
          /* @__PURE__ */ jsx(TableCell, { children: job.attachments.length }),
          /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(Badge, { variant: job.status === "OPEN" ? "default" : job.status === "DRAFT" ? "secondary" : "outline", children: formatJobStatus(job.status) }) }),
          /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-2", children: [
            job.status === "DRAFT" ? /* @__PURE__ */ jsx(Button, { size: "sm", asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "/post-job", search: {
              draftId: String(job.id)
            }, children: "Continue" }) }) : null,
            job.status === "OPEN" ? /* @__PURE__ */ jsx(Button, { size: "sm", variant: "outline", onClick: () => changeJobStatus(job.id, "CLOSED"), disabled: updatingJobId === job.id, children: updatingJobId === job.id ? "Updating..." : "Close" }) : null,
            job.status === "CLOSED" ? /* @__PURE__ */ jsx(Button, { size: "sm", variant: "outline", onClick: () => changeJobStatus(job.id, "OPEN"), disabled: updatingJobId === job.id, children: updatingJobId === job.id ? "Updating..." : "Reopen" }) : null,
            /* @__PURE__ */ jsx(Button, { size: "sm", variant: "ghost", asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "/project/$projectId", params: {
              projectId: String(job.id)
            }, children: "View" }) })
          ] }) })
        ] }, job.id)) })
      ] }) }) : /* @__PURE__ */ jsxs("div", { className: "mt-5 rounded-lg border border-dashed border-border bg-muted/30 p-8 text-center", children: [
        /* @__PURE__ */ jsx(Briefcase, { className: "mx-auto h-8 w-8 text-muted-foreground" }),
        /* @__PURE__ */ jsx("h3", { className: "mt-3 font-semibold", children: "No jobs posted yet" }),
        /* @__PURE__ */ jsx("p", { className: "mx-auto mt-1 max-w-md text-sm text-muted-foreground", children: "Start with one job or project. The posting flow will capture category, title, description, budget, dates, location, and uploaded files." }),
        /* @__PURE__ */ jsx(Button, { className: "mt-4", asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "/post-job", children: "Post your first job" }) })
      ] })
    ] })
  ] });
}
function ProfessionalDashboard({
  displayName,
  viewer,
  openJobs
}) {
  const highUrgencyJobs = openJobs.filter((job) => job.urgency === "HIGH").length;
  const remoteJobs = openJobs.filter((job) => job.workMode === "REMOTE" || job.workMode === "BOTH").length;
  const withAttachments = openJobs.filter((job) => job.attachments.length > 0).length;
  const stats = [{
    label: "Open jobs",
    value: String(openJobs.length),
    icon: Briefcase,
    tint: "text-primary bg-primary/10"
  }, {
    label: "Remote friendly",
    value: String(remoteJobs),
    icon: Search,
    tint: "text-accent bg-accent/15"
  }, {
    label: "High urgency",
    value: String(highUrgencyJobs),
    icon: CalendarClock,
    tint: "text-warning bg-warning/15"
  }, {
    label: "With files",
    value: String(withAttachments),
    icon: Paperclip,
    tint: "text-success bg-success/15"
  }];
  return /* @__PURE__ */ jsxs(AppShell, { userName: displayName, userRole: "Professional", userAvatarUrl: viewer.avatarUrl, children: [
    /* @__PURE__ */ jsx("div", { className: "mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-end", children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-semibold tracking-tight", children: "Available jobs" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Client-posted jobs appear here as soon as they are posted." })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: stats.map((s) => /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-border bg-card p-5 shadow-soft", children: [
      /* @__PURE__ */ jsx("div", { className: `grid h-10 w-10 place-items-center rounded-xl ${s.tint}`, children: /* @__PURE__ */ jsx(s.icon, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-2xl font-semibold", children: s.value }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: s.label })
    ] }, s.label)) }),
    /* @__PURE__ */ jsxs("div", { className: "mt-8 rounded-xl border border-border bg-card p-6 shadow-soft", children: [
      /* @__PURE__ */ jsx("div", { className: "flex flex-col justify-between gap-3 sm:flex-row sm:items-center", children: /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold", children: "Job feed" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Review budgets, deadlines, work mode, and client details before sending a proposal." })
      ] }) }),
      openJobs.length ? /* @__PURE__ */ jsx("div", { className: "mt-5 grid gap-4 lg:grid-cols-2", children: openJobs.map((job) => /* @__PURE__ */ jsxs(Link, { to: "/job/$jobId", params: {
        jobId: String(job.id)
      }, className: "rounded-xl border border-border bg-background p-5 transition-colors hover:border-primary/50 hover:bg-primary/5", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2", children: [
              /* @__PURE__ */ jsx(Badge, { variant: "secondary", children: job.category }),
              /* @__PURE__ */ jsx(Badge, { variant: job.urgency === "HIGH" ? "destructive" : "outline", children: formatEnum$9(job.urgency) })
            ] }),
            /* @__PURE__ */ jsx("h3", { className: "mt-3 line-clamp-2 text-lg font-semibold", children: job.title }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 line-clamp-3 text-sm text-muted-foreground", children: job.description })
          ] }),
          /* @__PURE__ */ jsx("img", { src: job.clientAvatarUrl || "https://i.pravatar.cc/100?u=client-job", alt: "", className: "h-11 w-11 rounded-full object-cover" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2", children: [
          /* @__PURE__ */ jsx("span", { children: formatBudget$8(job.budgetMin, job.budgetMax, job.timingType) }),
          /* @__PURE__ */ jsx("span", { children: formatWorkMode$2(job.workMode) }),
          /* @__PURE__ */ jsxs("span", { children: [
            "Deadline ",
            formatDate$8(job.deadline)
          ] }),
          /* @__PURE__ */ jsxs("span", { children: [
            job.attachments.length,
            " files"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center gap-2 border-t border-border pt-4 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsx(MapPin, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "truncate", children: formatApproximateLocation(job.locationAddress || job.locationLabel, "Remote job") })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "mt-2 text-xs text-muted-foreground", children: [
          "Posted by ",
          job.clientCompanyName || job.clientName
        ] })
      ] }, job.id)) }) : /* @__PURE__ */ jsxs("div", { className: "mt-5 rounded-lg border border-dashed border-border bg-muted/30 p-8 text-center", children: [
        /* @__PURE__ */ jsx(Briefcase, { className: "mx-auto h-8 w-8 text-muted-foreground" }),
        /* @__PURE__ */ jsx("h3", { className: "mt-3 font-semibold", children: "No client jobs posted yet" }),
        /* @__PURE__ */ jsx("p", { className: "mx-auto mt-1 max-w-md text-sm text-muted-foreground", children: "Once a client posts an active job, it will show here for professional accounts." })
      ] })
    ] })
  ] });
}
function formatEnum$9(value) {
  return value.toLowerCase().split("_").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
}
function formatWorkMode$2(value) {
  return value === "ON_SITE" ? "On-site" : formatEnum$9(value);
}
function formatJobStatus(value) {
  return value === "OPEN" ? "Active" : formatEnum$9(value);
}
function formatDate$8(value) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(value));
}
function formatBudget$8(min, max, timingType = "FIXED") {
  const suffix = getBudgetSuffix$8(timingType);
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
function getBudgetSuffix$8(timingType) {
  if (timingType === "HOURLY") {
    return " / hour";
  }
  if (timingType === "WEEKLY") {
    return " / week";
  }
  return "";
}
const Route$Z = Route$_;
const getDiscoveryData = createServerFn({
  method: "GET"
}).handler(createSsrRpc("eaf4203d0ffa702f7dd50fd5919dd499db4c8f0bd1f7d3f62adda621f9d6884a"));
const Route$Y = createFileRoute("/discover")({
  validateSearch: (search) => z.object({
    search: z.string().optional(),
    category: z.string().optional()
  }).parse(search),
  loader: () => getDiscoveryData(),
  head: () => ({
    meta: [{
      title: "Find professionals - Servio"
    }]
  }),
  component: Discover
});
function Discover() {
  const {
    viewer,
    professionals
  } = useLoaderData({
    from: "/discover"
  });
  const {
    search: searchParam
  } = Route$Y.useSearch();
  const googleMapsApiKey = "AIzaSyCZHfjLWVc0CJ4LMg3CP7fcBc3ncdR9Vtw";
  const [search, setSearch] = useState(searchParam || "");
  useEffect(() => {
    setSearch(searchParam || "");
  }, [searchParam]);
  const [city, setCity] = useState("");
  const [availability, setAvailability] = useState("all");
  const [rating, setRating] = useState("any");
  const [distance, setDistance] = useState("any");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [selectedMapProfessionalId, setSelectedMapProfessionalId] = useState(null);
  const [clientLocation, setClientLocation] = useState(null);
  const [distanceByProfessionalId, setDistanceByProfessionalId] = useState({});
  const [isLocatingClient, setIsLocatingClient] = useState(false);
  const [isResolvingDistances, setIsResolvingDistances] = useState(false);
  const [distanceError, setDistanceError] = useState(null);
  const [savedFilters, setSavedFilters] = useState([]);
  const [selectedSavedFilterId, setSelectedSavedFilterId] = useState("");
  const displayName = viewer ? `${viewer.firstName} ${viewer.lastName}`.trim() : "Guest";
  const savedFilterStorageKey = viewer ? `servio:saved-discovery-filters:${viewer.id}` : "servio:saved-discovery-filters:guest";
  useEffect(() => {
    setSavedFilters(readSavedFilters(savedFilterStorageKey));
    setSelectedSavedFilterId("");
  }, [savedFilterStorageKey]);
  useEffect(() => {
    if (!clientLocation) {
      setDistanceByProfessionalId({});
      setIsResolvingDistances(false);
      return;
    }
    let active = true;
    setIsResolvingDistances(true);
    setDistanceError(null);
    Promise.all(professionals.map(async (professional) => {
      const queries = getProfessionalLocationQueries(professional);
      if (!queries.length) {
        return [professional.id, null];
      }
      let coordinates = null;
      for (const query of queries) {
        coordinates = await geocodeAddress(query, googleMapsApiKey);
        if (coordinates) {
          break;
        }
      }
      if (!coordinates) {
        return [professional.id, null];
      }
      return [professional.id, getDistanceKm$1(clientLocation, coordinates)];
    })).then((entries) => {
      if (!active) {
        return;
      }
      const nextDistances = {};
      entries.forEach(([professionalId, distanceKm]) => {
        if (distanceKm != null) {
          nextDistances[professionalId] = distanceKm;
        }
      });
      setDistanceByProfessionalId(nextDistances);
      if (!Object.keys(nextDistances).length && professionals.length) {
        setDistanceError("Could not resolve professional addresses. Check that profiles have a city, service area, or address.");
      }
    }).catch(() => {
      if (active) {
        setDistanceError("Could not calculate distances right now.");
      }
    }).finally(() => {
      if (active) {
        setIsResolvingDistances(false);
      }
    });
    return () => {
      active = false;
    };
  }, [clientLocation, googleMapsApiKey, professionals]);
  const filteredProfessionals = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    const normalizedCity = city.trim().toLowerCase();
    const maxDistanceKm = distance === "any" ? null : Number(distance);
    return professionals.map((professional) => ({
      ...professional,
      distanceKm: distanceByProfessionalId[professional.id] ?? null
    })).filter((professional) => {
      const fullName = `${professional.firstName} ${professional.lastName}`.trim();
      const professionalLocation = professional.professionalCity || professional.serviceArea || getCityFromAddress(professional.address);
      const averageRating = Number(professional.averageRating || 0);
      const searchable = [fullName, professional.email, professional.companyName, professional.professionalCategory, professional.industry, professional.companyDescription, professional.professionalCity, professional.serviceArea, professional.address].filter(Boolean).join(" ").toLowerCase();
      const matchesSearch = !normalizedSearch || searchable.includes(normalizedSearch);
      const matchesCity = !normalizedCity || professionalLocation.toLowerCase().includes(normalizedCity) || (professional.address || "").toLowerCase().includes(normalizedCity);
      const matchesVerified = !verifiedOnly || Boolean(professional.isVerified);
      const matchesAvailability = availability === "all" || professional.availabilityStatus === availability;
      const matchesRating = rating === "any" || averageRating >= Number(rating);
      const matchesDistance = maxDistanceKm == null || clientLocation != null && professional.distanceKm != null && professional.distanceKm <= maxDistanceKm;
      return matchesSearch && matchesCity && matchesVerified && matchesAvailability && matchesRating && matchesDistance;
    }).sort((left, right) => {
      if (!clientLocation) {
        return 0;
      }
      if (left.distanceKm == null && right.distanceKm == null) {
        return 0;
      }
      if (left.distanceKm == null) {
        return 1;
      }
      if (right.distanceKm == null) {
        return -1;
      }
      return left.distanceKm - right.distanceKm;
    });
  }, [availability, city, clientLocation, distance, distanceByProfessionalId, professionals, rating, search, verifiedOnly]);
  const selectedMapProfessional = filteredProfessionals.find((professional) => professional.id === selectedMapProfessionalId);
  const mapQuery = selectedMapProfessional?.professionalCity || selectedMapProfessional?.serviceArea || formatApproximateLocation(selectedMapProfessional?.address, "") || city || formatApproximateLocation(filteredProfessionals.find((professional) => professional.address)?.address, "") || "India";
  const resetFilters = () => {
    setSearch("");
    setCity("");
    setAvailability("all");
    setRating("any");
    setDistance("any");
    setVerifiedOnly(false);
    setSelectedMapProfessionalId(null);
    setSelectedSavedFilterId("");
  };
  const useClientCurrentLocation = () => {
    setDistanceError(null);
    if (!navigator.geolocation) {
      setDistanceError("Current location is not supported by this browser.");
      return;
    }
    setIsLocatingClient(true);
    navigator.geolocation.getCurrentPosition((position) => {
      setClientLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        label: "Current location"
      });
      setIsLocatingClient(false);
      toast.success("Location enabled", {
        description: "Nearby professionals are sorted by distance."
      });
    }, () => {
      setDistanceError("Allow location access to view nearby professionals.");
      setIsLocatingClient(false);
    }, {
      enableHighAccuracy: true,
      timeout: 1e4,
      maximumAge: 6e4
    });
  };
  const currentFilterState = () => ({
    search,
    city,
    availability,
    rating,
    distance,
    verifiedOnly
  });
  const saveCurrentFilter = () => {
    if (savedFilters.length >= 5) {
      toast.error("You can save up to 5 filters.", {
        description: "Delete one saved filter before adding a new one."
      });
      return;
    }
    const filter = {
      id: crypto.randomUUID(),
      name: buildSavedFilterName(currentFilterState()),
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      filters: currentFilterState()
    };
    const nextFilters = [filter, ...savedFilters];
    setSavedFilters(nextFilters);
    setSelectedSavedFilterId(filter.id);
    writeSavedFilters(savedFilterStorageKey, nextFilters);
    toast.success("Filter saved", {
      description: `${filter.name} was added to your saved filters.`
    });
  };
  const applySavedFilter = (filter) => {
    setSearch(filter.filters.search);
    setCity(filter.filters.city);
    setAvailability(filter.filters.availability);
    setRating(filter.filters.rating);
    setDistance(filter.filters.distance);
    setVerifiedOnly(filter.filters.verifiedOnly);
    setSelectedMapProfessionalId(null);
    setSelectedSavedFilterId(filter.id);
    toast.info("Saved filter applied", {
      description: filter.name
    });
  };
  const deleteSavedFilter = (filterId) => {
    const nextFilters = savedFilters.filter((filter) => filter.id !== filterId);
    setSavedFilters(nextFilters);
    setSelectedSavedFilterId((current) => current === filterId ? "" : current);
    writeSavedFilters(savedFilterStorageKey, nextFilters);
    toast.success("Saved filter deleted");
  };
  return /* @__PURE__ */ jsxs(AppShell, { userName: displayName, userRole: viewer?.role === "PROFESSIONAL" ? "Professional" : "Client", userAvatarUrl: viewer?.avatarUrl, children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-end", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-semibold tracking-tight", children: "Find professionals" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Search saved professional accounts by name, city, service, availability, rating, and verified status." })
      ] }),
      /* @__PURE__ */ jsxs(Button, { variant: "outline", className: "gap-2", onClick: () => setShowMap((value) => !value), children: [
        /* @__PURE__ */ jsx(Map$1, { className: "h-4 w-4" }),
        showMap ? "Hide Map" : "View Professionals on Map"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-6 lg:grid-cols-[280px_1fr]", children: [
      /* @__PURE__ */ jsxs("aside", { className: "h-fit rounded-xl border border-border bg-card p-5 shadow-soft lg:sticky lg:top-20", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("h2", { className: "font-semibold", children: "Filters" }),
          /* @__PURE__ */ jsx("button", { className: "text-xs text-primary hover:underline", onClick: resetFilters, children: "Clear all" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mb-4 rounded-lg border border-border bg-muted/30 p-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", children: "Saved filters" }),
              /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground", children: [
                savedFilters.length,
                "/5 saved"
              ] })
            ] }),
            /* @__PURE__ */ jsxs(Button, { size: "sm", className: "gap-2", onClick: saveCurrentFilter, children: [
              /* @__PURE__ */ jsx(Save, { className: "h-4 w-4" }),
              "Save"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("select", { className: "mt-3 h-9 w-full rounded-lg border border-input bg-background px-2 text-sm", value: selectedSavedFilterId, onChange: (event) => {
            const filter = savedFilters.find((item) => item.id === event.target.value);
            if (filter) {
              applySavedFilter(filter);
            } else {
              setSelectedSavedFilterId("");
            }
          }, children: [
            /* @__PURE__ */ jsx("option", { value: "", children: "Choose saved filter" }),
            savedFilters.map((filter) => /* @__PURE__ */ jsx("option", { value: filter.id, children: filter.name }, filter.id))
          ] }),
          savedFilters.length ? /* @__PURE__ */ jsx("div", { className: "mt-3 space-y-2", children: savedFilters.map((filter) => /* @__PURE__ */ jsxs("div", { role: "button", tabIndex: 0, onDoubleClick: () => applySavedFilter(filter), onKeyDown: (event) => {
            if (event.key === "Enter") {
              applySavedFilter(filter);
            }
          }, className: `flex items-center gap-2 rounded-md border px-2 py-2 text-sm transition-colors ${selectedSavedFilterId === filter.id ? "border-primary bg-primary/5" : "border-border bg-background hover:border-primary/50"}`, title: "Double click to apply", children: [
            /* @__PURE__ */ jsx(BookmarkCheck, { className: "h-4 w-4 shrink-0 text-primary" }),
            /* @__PURE__ */ jsx("span", { className: "min-w-0 flex-1 truncate", children: filter.name }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "grid h-7 w-7 shrink-0 place-items-center rounded-md text-muted-foreground hover:bg-muted hover:text-destructive", onClick: (event) => {
              event.stopPropagation();
              deleteSavedFilter(filter.id);
            }, "aria-label": `Delete ${filter.name}`, children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" }) })
          ] }, filter.id)) }) : null
        ] }),
        /* @__PURE__ */ jsx(FilterSection, { title: "City", children: /* @__PURE__ */ jsx(Input, { value: city, onChange: (event) => setCity(event.target.value), placeholder: "e.g. Surat" }) }),
        /* @__PURE__ */ jsxs(FilterSection, { title: "Distance", children: [
          /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-border bg-muted/30 p-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3", children: [
              /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", children: "Nearby professionals" }),
                /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: clientLocation ? `${clientLocation.label}: ${isResolvingDistances ? "calculating..." : `${Object.keys(distanceByProfessionalId).length} distances ready`}` : "Use your location to show real distance." })
              ] }),
              /* @__PURE__ */ jsxs(Button, { type: "button", size: "sm", variant: "outline", className: "shrink-0 gap-2", onClick: useClientCurrentLocation, disabled: isLocatingClient, children: [
                /* @__PURE__ */ jsx(LocateFixed, { className: "h-4 w-4" }),
                isLocatingClient ? "Finding" : "Use"
              ] })
            ] }),
            distanceError ? /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs text-destructive", children: distanceError }) : null
          ] }),
          /* @__PURE__ */ jsxs("select", { className: "h-9 w-full rounded-lg border border-input bg-background px-2 text-sm", value: distance, onChange: (event) => setDistance(event.target.value), children: [
            /* @__PURE__ */ jsx("option", { value: "any", children: "Anywhere" }),
            /* @__PURE__ */ jsx("option", { value: "5", children: "Within 5 km" }),
            /* @__PURE__ */ jsx("option", { value: "10", children: "Within 10 km" }),
            /* @__PURE__ */ jsx("option", { value: "25", children: "Within 25 km" }),
            /* @__PURE__ */ jsx("option", { value: "50", children: "Within 50 km" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Distance uses your browser location and each professional profile address." })
        ] }),
        /* @__PURE__ */ jsxs(FilterSection, { title: "Rating", children: [
          /* @__PURE__ */ jsxs("select", { className: "h-9 w-full rounded-lg border border-input bg-background px-2 text-sm", value: rating, onChange: (event) => setRating(event.target.value), children: [
            /* @__PURE__ */ jsx("option", { value: "any", children: "Any rating" }),
            /* @__PURE__ */ jsx("option", { value: "4.5", children: "4.5 and up" }),
            /* @__PURE__ */ jsx("option", { value: "4", children: "4.0 and up" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Uses saved average rating and review count." })
        ] }),
        /* @__PURE__ */ jsx(FilterSection, { title: "Verified", children: /* @__PURE__ */ jsxs("label", { className: "flex items-center justify-between text-sm", children: [
          /* @__PURE__ */ jsx("span", { children: "Verified professionals" }),
          /* @__PURE__ */ jsx("input", { type: "checkbox", checked: verifiedOnly, onChange: (event) => setVerifiedOnly(event.target.checked), className: "h-4 w-4 rounded border-border accent-primary" })
        ] }) }),
        /* @__PURE__ */ jsx(FilterSection, { title: "Availability", children: /* @__PURE__ */ jsxs("select", { className: "h-9 w-full rounded-lg border border-input bg-background px-2 text-sm", value: availability, onChange: (event) => setAvailability(event.target.value), children: [
          /* @__PURE__ */ jsx("option", { value: "all", children: "Any availability" }),
          /* @__PURE__ */ jsx("option", { value: "available", children: "Available now" }),
          /* @__PURE__ */ jsx("option", { value: "busy", children: "Busy" }),
          /* @__PURE__ */ jsx("option", { value: "unavailable", children: "Unavailable" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-4 flex flex-wrap items-center gap-2 rounded-xl border border-border bg-card p-3 shadow-soft", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative min-w-[220px] flex-1", children: [
            /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
            /* @__PURE__ */ jsx(Input, { className: "pl-9", value: search, onChange: (event) => setSearch(event.target.value), placeholder: "Search by name, service, company, or address" })
          ] }),
          /* @__PURE__ */ jsxs(Button, { variant: "outline", size: "sm", className: "gap-2 lg:hidden", children: [
            /* @__PURE__ */ jsx(SlidersHorizontal, { className: "h-4 w-4" }),
            "Filters"
          ] })
        ] }),
        showMap ? /* @__PURE__ */ jsxs("div", { className: "mb-4 overflow-hidden rounded-xl border border-border bg-card shadow-soft", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-between gap-2 border-b border-border p-4 sm:flex-row sm:items-center", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h2", { className: "font-semibold", children: "View Professionals on Map" }),
              /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
                "Showing map around ",
                mapQuery,
                ". Nearby results sort by client distance when location is enabled."
              ] })
            ] }),
            /* @__PURE__ */ jsxs(Badge, { variant: "secondary", children: [
              filteredProfessionals.length,
              " results"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-[1fr_320px]", children: [
            /* @__PURE__ */ jsx("iframe", { title: "Professional discovery map", src: `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&z=12&output=embed`, className: "h-[380px] w-full border-0", loading: "lazy", referrerPolicy: "no-referrer-when-downgrade" }),
            /* @__PURE__ */ jsx("div", { className: "max-h-[380px] overflow-y-auto border-t border-border bg-background p-3 lg:border-l lg:border-t-0", children: filteredProfessionals.length ? /* @__PURE__ */ jsx("div", { className: "space-y-3", children: filteredProfessionals.map((professional) => /* @__PURE__ */ jsx(MapProfessionalRow, { professional, distanceKm: professional.distanceKm, selected: selectedMapProfessionalId === professional.id, onSelect: () => setSelectedMapProfessionalId(professional.id) }, professional.id)) }) : /* @__PURE__ */ jsx("div", { className: "rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground", children: "No professionals match these map filters." }) })
          ] })
        ] }) : null,
        /* @__PURE__ */ jsx("div", { className: "mb-4 flex items-center justify-between", children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
          "Showing ",
          filteredProfessionals.length,
          " of ",
          professionals.length,
          " saved professionals"
        ] }) }),
        filteredProfessionals.length ? /* @__PURE__ */ jsx("div", { className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-2", children: filteredProfessionals.map((professional) => /* @__PURE__ */ jsx(ProfessionalResultCard, { professional, distanceKm: professional.distanceKm }, professional.id)) }) : /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-dashed border-border bg-card p-10 text-center shadow-soft", children: [
          /* @__PURE__ */ jsx(BriefcaseBusiness, { className: "mx-auto h-9 w-9 text-muted-foreground" }),
          /* @__PURE__ */ jsx("h3", { className: "mt-3 font-semibold", children: "No professionals found" }),
          /* @__PURE__ */ jsx("p", { className: "mx-auto mt-1 max-w-md text-sm text-muted-foreground", children: "Try clearing filters or add professional accounts with profile details in the database." })
        ] })
      ] })
    ] })
  ] });
}
function ProfessionalResultCard({
  professional,
  distanceKm
}) {
  const fullName = `${professional.firstName} ${professional.lastName}`.trim();
  const verified = Boolean(professional.isVerified);
  const category = professional.professionalCategory || professional.industry || professional.companyName;
  const city = professional.professionalCity || professional.serviceArea || getCityFromAddress(professional.address);
  const averageRating = Number(professional.averageRating || 0);
  const reviewCount = Number(professional.reviewCount || 0);
  const availabilityLabel = formatAvailability$1(professional.availabilityStatus);
  const hourlyRateLabel = professional.hourlyRate != null ? `$${professional.hourlyRate}/hr` : "Contact for rate";
  const fixedRateLabel = professional.fixedRate != null ? `$${professional.fixedRate}` : "Flexible";
  return /* @__PURE__ */ jsxs("div", { className: "flex min-h-[260px] flex-col rounded-xl border border-border bg-card p-4 shadow-soft transition-colors hover:border-primary/40", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative shrink-0", children: [
        /* @__PURE__ */ jsx("img", { src: professional.avatarUrl || `https://i.pravatar.cc/100?u=discover-pro-${professional.id}`, alt: fullName, className: "h-16 w-16 rounded-xl object-cover" }),
        verified ? /* @__PURE__ */ jsx("span", { className: "absolute -bottom-1.5 -right-1.5 grid h-6 w-6 place-items-center rounded-full bg-success text-success-foreground ring-2 ring-card", children: /* @__PURE__ */ jsx(BadgeCheck, { className: "h-3.5 w-3.5" }) }) : null
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsx("h3", { className: "truncate text-base font-semibold text-foreground", children: fullName || "Professional" }),
        /* @__PURE__ */ jsx("p", { className: "truncate text-sm text-muted-foreground", children: category || "Professional account" }),
        /* @__PURE__ */ jsxs("div", { className: "mt-2 flex flex-wrap gap-2", children: [
          /* @__PURE__ */ jsx(Badge, { className: "rounded-full", variant: verified ? "default" : "secondary", children: verified ? "Verified" : "Not verified" }),
          /* @__PURE__ */ jsx(Badge, { className: "rounded-full", variant: "outline", children: availabilityLabel })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-4 grid gap-2 text-sm sm:grid-cols-3", children: [
      /* @__PURE__ */ jsx(MetaPill, { label: "Hourly", value: hourlyRateLabel }),
      /* @__PURE__ */ jsx(MetaPill, { label: "Fixed", value: fixedRateLabel }),
      /* @__PURE__ */ jsx(MetaPill, { label: "Radius", value: professional.serviceRadiusKm ? `${professional.serviceRadiusKm} km` : "Not set" })
    ] }),
    professional.companyDescription ? /* @__PURE__ */ jsx("p", { className: "mt-4 line-clamp-2 text-sm leading-6 text-muted-foreground", children: professional.companyDescription }) : /* @__PURE__ */ jsx("div", { className: "mt-4 flex-1" }),
    /* @__PURE__ */ jsxs("div", { className: "mt-auto border-t border-border pt-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2 text-sm text-muted-foreground", children: [
        /* @__PURE__ */ jsxs("span", { className: "inline-flex max-w-full items-center gap-1.5 rounded-full bg-muted px-3 py-1", children: [
          /* @__PURE__ */ jsx(MapPin, { className: "h-3.5 w-3.5 shrink-0" }),
          /* @__PURE__ */ jsx("span", { className: "truncate", children: formatApproximateLocation(city || professional.address, "Location not added") })
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1", children: [
          /* @__PURE__ */ jsx(LocateFixed, { className: "h-3.5 w-3.5 shrink-0" }),
          formatDistanceLabel$1(distanceKm)
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1", children: [
          /* @__PURE__ */ jsx(Star, { className: "h-3.5 w-3.5 fill-warning text-warning" }),
          averageRating > 0 ? `${averageRating.toFixed(1)} (${reviewCount})` : "No rating yet"
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-4 flex justify-end", children: /* @__PURE__ */ jsx(Button, { asChild: true, variant: "outline", size: "sm", children: /* @__PURE__ */ jsx(Link, { to: "/pro/$proId", params: {
        proId: String(professional.id)
      }, children: "View profile" }) }) })
    ] })
  ] });
}
function MetaPill({
  label,
  value
}) {
  return /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-border bg-muted/60 px-3 py-2", children: [
    /* @__PURE__ */ jsx("p", { className: "text-[11px] font-semibold uppercase tracking-wide text-muted-foreground", children: label }),
    /* @__PURE__ */ jsx("p", { className: "mt-1 truncate font-medium text-foreground", children: value })
  ] });
}
function MapProfessionalRow({
  professional,
  distanceKm,
  selected,
  onSelect
}) {
  const fullName = `${professional.firstName} ${professional.lastName}`.trim();
  const category = professional.professionalCategory || professional.industry || professional.companyName || "Professional services";
  const city = professional.professionalCity || professional.serviceArea || getCityFromAddress(professional.address) || "Location not added";
  const averageRating = Number(professional.averageRating || 0);
  const reviewCount = Number(professional.reviewCount || 0);
  const hourlyRateLabel = professional.hourlyRate != null ? `$${professional.hourlyRate}/hr` : "Contact";
  return /* @__PURE__ */ jsxs("div", { role: "button", tabIndex: 0, onClick: onSelect, onKeyDown: (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelect();
    }
  }, className: `block cursor-pointer rounded-xl border bg-card p-3 text-sm shadow-soft transition hover:border-primary ${selected ? "border-primary ring-2 ring-primary/15" : "border-border"}`, children: [
    /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative shrink-0", children: [
        /* @__PURE__ */ jsx("img", { src: professional.avatarUrl || `https://i.pravatar.cc/100?u=map-pro-${professional.id}`, alt: fullName, className: "h-12 w-12 rounded-xl object-cover" }),
        professional.isVerified ? /* @__PURE__ */ jsx("span", { className: "absolute -bottom-1 -right-1 grid h-5 w-5 place-items-center rounded-full bg-primary text-primary-foreground ring-2 ring-card", children: /* @__PURE__ */ jsx(BadgeCheck, { className: "h-3 w-3" }) }) : null
      ] }),
      /* @__PURE__ */ jsx("div", { className: "min-w-0 flex-1", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsx("p", { className: "truncate font-semibold text-foreground", children: fullName || "Professional" }),
          /* @__PURE__ */ jsx("p", { className: "truncate text-xs text-muted-foreground", children: category })
        ] }),
        /* @__PURE__ */ jsx("span", { className: "shrink-0 rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-foreground", children: hourlyRateLabel })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-3 grid grid-cols-2 gap-2 text-xs", children: [
      /* @__PURE__ */ jsxs("span", { className: "flex min-w-0 items-center gap-1 rounded-lg bg-muted px-2 py-1.5 text-muted-foreground", children: [
        /* @__PURE__ */ jsx(MapPin, { className: "h-3 w-3 shrink-0" }),
        /* @__PURE__ */ jsx("span", { className: "truncate", children: city })
      ] }),
      /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1 rounded-lg bg-muted px-2 py-1.5 text-muted-foreground", children: [
        /* @__PURE__ */ jsx(Clock, { className: "h-3 w-3 shrink-0" }),
        /* @__PURE__ */ jsx("span", { className: "truncate", children: formatAvailability$1(professional.availabilityStatus) })
      ] }),
      /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1 rounded-lg bg-muted px-2 py-1.5 text-muted-foreground", children: [
        /* @__PURE__ */ jsx(Star, { className: "h-3 w-3 shrink-0 fill-warning text-warning" }),
        /* @__PURE__ */ jsx("span", { children: averageRating > 0 ? `${averageRating.toFixed(1)} (${reviewCount})` : "New" })
      ] }),
      /* @__PURE__ */ jsx("span", { className: "rounded-lg bg-muted px-2 py-1.5 text-muted-foreground", children: formatDistanceLabel$1(distanceKm) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-3 flex items-center justify-between gap-2 border-t border-border pt-3", children: [
      /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: selected ? "Showing on map" : "Click card to show location" }),
      /* @__PURE__ */ jsx(Button, { asChild: true, size: "sm", variant: "outline", onClick: (event) => event.stopPropagation(), children: /* @__PURE__ */ jsx(Link, { to: "/pro/$proId", params: {
        proId: String(professional.id)
      }, children: "View profile" }) })
    ] })
  ] });
}
function FilterSection({
  title,
  children
}) {
  return /* @__PURE__ */ jsxs("div", { className: "border-t border-border py-4 first:border-t-0 first:pt-0", children: [
    /* @__PURE__ */ jsx("h3", { className: "mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground", children: title }),
    /* @__PURE__ */ jsx("div", { className: "space-y-2", children })
  ] });
}
function getProfessionalLocationQueries(professional) {
  return Array.from(new Set([professional.address, professional.serviceArea, professional.professionalCity, getCityFromAddress(professional.address)].map((value) => value?.trim()).filter((value) => Boolean(value))));
}
async function geocodeAddress(address, googleMapsApiKey) {
  try {
    const google = await loadGoogleMapsApi(googleMapsApiKey);
    const geocoder = new google.maps.Geocoder();
    return await new Promise((resolve) => {
      geocoder.geocode({
        address
      }, (results, status) => {
        const location = status === "OK" ? results?.[0]?.geometry?.location : null;
        if (!location) {
          resolve(null);
          return;
        }
        resolve({
          lat: location.lat(),
          lng: location.lng()
        });
      });
    });
  } catch {
    return null;
  }
}
function loadGoogleMapsApi(googleMapsApiKey) {
  const win = window;
  if (win.google?.maps?.Geocoder) {
    return Promise.resolve(win.google);
  }
  const existingScript = document.querySelector('script[src*="maps.googleapis.com/maps/api/js"]');
  if (existingScript) {
    return new Promise((resolve, reject) => {
      existingScript.addEventListener("load", () => {
        if (win.google?.maps?.Geocoder) {
          resolve(win.google);
          return;
        }
        reject(new Error("Google Maps geocoder unavailable."));
      }, {
        once: true
      });
      existingScript.addEventListener("error", reject, {
        once: true
      });
    });
  }
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&v=weekly`;
    script.async = true;
    script.defer = true;
    script.dataset.googleMapsDiscovery = "true";
    script.addEventListener("load", () => {
      if (win.google?.maps?.Geocoder) {
        resolve(win.google);
        return;
      }
      reject(new Error("Google Maps geocoder unavailable."));
    }, {
      once: true
    });
    script.addEventListener("error", reject, {
      once: true
    });
    document.head.appendChild(script);
  });
}
function getDistanceKm$1(origin, destination) {
  const earthRadiusKm = 6371;
  const latDelta = toRadians$1(destination.lat - origin.lat);
  const lngDelta = toRadians$1(destination.lng - origin.lng);
  const originLat = toRadians$1(origin.lat);
  const destinationLat = toRadians$1(destination.lat);
  const haversine = Math.sin(latDelta / 2) ** 2 + Math.cos(originLat) * Math.cos(destinationLat) * Math.sin(lngDelta / 2) ** 2;
  return earthRadiusKm * 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));
}
function toRadians$1(value) {
  return value * Math.PI / 180;
}
function formatDistanceLabel$1(distanceKm) {
  if (distanceKm == null) {
    return "Distance unavailable";
  }
  if (distanceKm < 1) {
    return `${Math.round(distanceKm * 1e3)} m away`;
  }
  return `${distanceKm.toFixed(distanceKm < 10 ? 1 : 0)} km away`;
}
function getCityFromAddress(address) {
  if (!address) {
    return "";
  }
  return address.split(",").map((part) => part.trim()).filter(Boolean)[0] || "";
}
function formatAvailability$1(value) {
  if (value === "busy") {
    return "Busy";
  }
  if (value === "unavailable") {
    return "Unavailable";
  }
  return "Available now";
}
function readSavedFilters(storageKey2) {
  if (typeof window === "undefined") {
    return [];
  }
  try {
    const parsed = JSON.parse(window.localStorage.getItem(storageKey2) || "[]");
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.slice(0, 5).filter(isSavedFilter);
  } catch {
    return [];
  }
}
function writeSavedFilters(storageKey2, filters2) {
  window.localStorage.setItem(storageKey2, JSON.stringify(filters2.slice(0, 5)));
}
function isSavedFilter(value) {
  if (!value || typeof value !== "object") {
    return false;
  }
  const filter = value;
  return Boolean(filter.id && filter.name && filter.filters);
}
function buildSavedFilterName(filters2) {
  const parts = [filters2.search.trim() ? `"${filters2.search.trim()}"` : "", filters2.city.trim() ? filters2.city.trim() : "", filters2.availability !== "all" ? formatAvailability$1(filters2.availability) : "", filters2.rating !== "any" ? `${filters2.rating}+ stars` : "", filters2.distance !== "any" ? `${filters2.distance} km` : "", filters2.verifiedOnly ? "Verified" : ""].filter(Boolean);
  return parts.length ? parts.slice(0, 3).join(" / ") : "All professionals";
}
const Route$X = Route$Y;
const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxs(
    DialogPrimitive.Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxs(DialogPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = DialogPrimitive.Content.displayName;
const DialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsx("div", { className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className), ...props });
DialogHeader.displayName = "DialogHeader";
const DialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsx(
  "div",
  {
    className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
    ...props
  }
);
DialogFooter.displayName = "DialogFooter";
const DialogTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Title,
  {
    ref,
    className: cn("text-lg font-semibold leading-none tracking-tight", className),
    ...props
  }
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;
const DialogDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);
const Label = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(LabelPrimitive.Root, { ref, className: cn(labelVariants(), className), ...props }));
Label.displayName = LabelPrimitive.Root.displayName;
const getEarningsData = createServerFn({
  method: "GET"
}).handler(createSsrRpc("691df0d0f8aeff3d6aadaaf9faa9297462dff6cac5b57ca82500889f4d1ad1cb"));
const requestWithdrawal = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(createSsrRpc("4e78feff978e75cd52051d26d221c6c099c8394984a3718bbdb8706e224e31c9"));
const Route$W = createFileRoute("/earnings")({
  loader: async () => getEarningsData(),
  head: () => ({
    meta: [{
      title: "Earnings - Servio"
    }]
  }),
  component: Earnings
});
function Earnings() {
  const {
    viewer,
    transactions,
    withdrawals
  } = Route$W.useLoaderData();
  const router2 = useRouter();
  const isProfessional = viewer?.role === "PROFESSIONAL";
  const viewerName = viewer ? `${viewer.firstName} ${viewer.lastName}`.trim() : void 0;
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawMethod, setWithdrawMethod] = useState("BANK");
  const [withdrawDestination, setWithdrawDestination] = useState("");
  const [withdrawNote, setWithdrawNote] = useState("");
  const [withdrawError, setWithdrawError] = useState(null);
  const [withdrawMessage, setWithdrawMessage] = useState(null);
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const scopedTransactions = transactions.filter((transaction) => isProfessional ? transaction.professionalId === viewer?.id : transaction.clientId === viewer?.id);
  const scopedWithdrawals = isProfessional ? withdrawals : [];
  const completedTransactions = scopedTransactions.filter((transaction) => transaction.status === "COMPLETED");
  const cancelledTransactions = scopedTransactions.filter((transaction) => transaction.status === "CANCELLED");
  const lifetimeTotal = completedTransactions.reduce((total, transaction) => total + transaction.amount, 0);
  const thisMonthTotal = completedTransactions.filter((transaction) => isSameMonth(transaction.createdAt, /* @__PURE__ */ new Date())).reduce((total, transaction) => total + transaction.amount, 0);
  const completedJobs = getCompletedJobs(completedTransactions);
  const pendingPayouts = completedTransactions;
  const invoices = completedTransactions.map((transaction) => createInvoiceRecord(transaction));
  const totalCommission = invoices.reduce((total, invoice) => total + invoice.commission, 0);
  const totalNetPayout = invoices.reduce((total, invoice) => total + invoice.netPayout, 0);
  const requestedWithdrawals = scopedWithdrawals.filter((withdrawal) => withdrawal.status !== "REJECTED").reduce((total, withdrawal) => total + withdrawal.amount, 0);
  const availableBalance = Math.max(0, totalNetPayout - requestedWithdrawals);
  const chartData = getMonthlyTotals(completedTransactions);
  const max = Math.max(1, ...chartData.map((d) => d.value));
  async function handleWithdrawalRequest() {
    const amount = Number(withdrawAmount);
    setIsWithdrawing(true);
    setWithdrawError(null);
    setWithdrawMessage(null);
    try {
      await requestWithdrawal({
        data: {
          amount,
          destinationType: withdrawMethod,
          destinationLabel: withdrawDestination,
          note: withdrawNote
        }
      });
      setWithdrawMessage("Withdrawal request submitted. It is now pending review.");
      setIsWithdrawOpen(false);
      setWithdrawAmount("");
      setWithdrawDestination("");
      setWithdrawNote("");
      await router2.invalidate();
    } catch (error) {
      setWithdrawError(error instanceof Error ? error.message : "Could not submit withdrawal request.");
    } finally {
      setIsWithdrawing(false);
    }
  }
  return /* @__PURE__ */ jsxs(AppShell, { title: isProfessional ? "View Earnings Dashboard" : "Payments", userName: viewerName, userRole: isProfessional ? "Professional" : "Client", userAvatarUrl: viewer?.avatarUrl, children: [
    /* @__PURE__ */ jsxs("div", { className: "space-y-8 px-1 py-2", children: [
      /* @__PURE__ */ jsx("section", { className: "rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-8 shadow-lg", children: /* @__PURE__ */ jsx("div", { className: "flex flex-col justify-between gap-4 lg:flex-row lg:items-center", children: /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("p", { className: "text-xs font-semibold uppercase tracking-widest text-slate-500", children: [
          isProfessional ? "Earnings" : "Payments",
          " Dashboard"
        ] }),
        /* @__PURE__ */ jsx("h1", { className: "mt-3 text-4xl font-bold tracking-tight text-slate-900", children: isProfessional ? "Earnings Overview" : "Payment Summary" }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 max-w-xl text-base text-slate-600", children: isProfessional ? "Track your completed earnings, pending payouts, and withdrawal requests." : "View all payments from your projects." })
      ] }) }) }),
      /* @__PURE__ */ jsxs("section", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1", children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsx("div", { className: "rounded-lg bg-gradient-to-br from-blue-50 to-slate-100 p-3 text-slate-700", children: /* @__PURE__ */ jsx(Wallet$1, { className: "h-5 w-5" }) }) }),
          /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm font-medium text-slate-600", children: isProfessional ? "Available balance" : "Total paid" }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-3xl font-bold text-slate-900", children: formatMoney$4(isProfessional ? availableBalance : lifetimeTotal) }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs text-slate-500", children: isProfessional ? "Ready to withdraw" : "Saved in transactions" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1", children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsx("div", { className: "rounded-lg bg-gradient-to-br from-green-50 to-slate-100 p-3 text-green-700", children: /* @__PURE__ */ jsx(TrendingUp, { className: "h-5 w-5" }) }) }),
          /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm font-medium text-slate-600", children: "This month" }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-3xl font-bold text-slate-900", children: formatMoney$4(thisMonthTotal) }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs text-slate-500", children: "Completed payments" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1", children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsx("div", { className: "rounded-lg bg-gradient-to-br from-purple-50 to-slate-100 p-3 text-purple-700", children: /* @__PURE__ */ jsx(DollarSign, { className: "h-5 w-5" }) }) }),
          /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm font-medium text-slate-600", children: "Completed" }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-3xl font-bold text-slate-900", children: completedTransactions.length }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs text-slate-500", children: "Ledger rows" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1", children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsx("div", { className: "rounded-lg bg-gradient-to-br from-orange-50 to-slate-100 p-3 text-orange-700", children: /* @__PURE__ */ jsx(ArrowDownToLine, { className: "h-5 w-5" }) }) }),
          /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm font-medium text-slate-600", children: "Cancelled" }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-3xl font-bold text-slate-900", children: cancelledTransactions.length }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs text-slate-500", children: "Voided rows" })
        ] })
      ] }),
      isProfessional ? /* @__PURE__ */ jsxs("section", { className: "grid gap-8 lg:grid-cols-[1fr_360px]", children: [
        /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-slate-200 bg-white p-8 shadow-lg", children: [
          /* @__PURE__ */ jsx("div", { className: "mb-6 border-b border-slate-200 pb-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-slate-900", children: "Completed Jobs" }),
              /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-slate-600", children: "Projects with payment records" })
            ] }),
            /* @__PURE__ */ jsx(CheckCircle2, { className: "h-6 w-6 text-green-600" })
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
            completedJobs.map((job) => /* @__PURE__ */ jsxs("div", { className: "group rounded-lg border border-slate-200 bg-gradient-to-r from-slate-50 to-white p-4 transition-all hover:shadow-md", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3", children: [
                /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
                  /* @__PURE__ */ jsx("p", { className: "line-clamp-1 font-semibold text-slate-900", children: job.projectTitle || "Completed project" }),
                  /* @__PURE__ */ jsxs("p", { className: "mt-1 text-sm text-slate-600", children: [
                    job.projectCategory || "Project",
                    " • ",
                    job.paymentCount,
                    " payment",
                    job.paymentCount !== 1 ? "s" : ""
                  ] })
                ] }),
                /* @__PURE__ */ jsx("span", { className: "font-semibold text-slate-900", children: formatMoney$4(job.amount) })
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "mt-2 text-xs text-slate-500", children: [
                "Last paid ",
                formatDate$7(job.lastPaidAt)
              ] })
            ] }, job.trackingId)),
            !completedJobs.length ? /* @__PURE__ */ jsxs("div", { className: "rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 py-12 text-center", children: [
              /* @__PURE__ */ jsx(CheckCircle2, { className: "mx-auto h-8 w-8 text-slate-400" }),
              /* @__PURE__ */ jsx("h3", { className: "mt-3 font-semibold text-slate-900", children: "No completed jobs yet" }),
              /* @__PURE__ */ jsx("p", { className: "mx-auto mt-1 max-w-md text-sm text-slate-600", children: "Completed jobs will appear here after clients approve work or pay milestones." })
            ] }) : null
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-slate-200 bg-white p-6 shadow-lg", children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-6 border-b border-slate-200 pb-6", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-slate-900", children: "Pending Payouts" }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-slate-600", children: "Completed earnings" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mb-6 rounded-lg bg-gradient-to-br from-blue-50 to-slate-50 p-4", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs font-medium uppercase tracking-widest text-slate-600", children: "Total pending" }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 text-3xl font-bold text-slate-900", children: formatMoney$4(lifetimeTotal) }),
            /* @__PURE__ */ jsxs("p", { className: "mt-2 text-xs text-slate-600", children: [
              formatMoney$4(availableBalance),
              " available"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            pendingPayouts.slice(0, 4).map((payout) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between rounded-lg border border-slate-100 bg-white px-3 py-2 text-sm hover:bg-slate-50", children: [
              /* @__PURE__ */ jsx("span", { className: "min-w-0 truncate text-slate-700", children: payout.projectTitle || payout.description }),
              /* @__PURE__ */ jsx("span", { className: "ml-2 font-medium text-slate-900", children: formatMoney$4(payout.amount) })
            ] }, payout.id)),
            !pendingPayouts.length ? /* @__PURE__ */ jsx("p", { className: "rounded-lg border border-dashed border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-600", children: "No pending payouts yet." }) : null
          ] })
        ] })
      ] }) : null
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-8 px-1 py-2", children: [
      isProfessional ? /* @__PURE__ */ jsxs("section", { className: "rounded-2xl border border-slate-200 bg-white p-8 shadow-lg", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-6 flex items-center justify-between border-b border-slate-200 pb-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-slate-900", children: "Invoices & Commission" }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-slate-600", children: "Payment breakdown with commission deduction" })
          ] }),
          /* @__PURE__ */ jsx(ReceiptText, { className: "h-6 w-6 text-slate-700" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-4 sm:grid-cols-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-4", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs font-medium uppercase tracking-widest text-slate-600", children: "Gross invoices" }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 text-2xl font-bold text-slate-900", children: formatMoney$4(lifetimeTotal) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-slate-200 bg-gradient-to-br from-red-50 to-white p-4", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs font-medium uppercase tracking-widest text-slate-600", children: "Commission" }),
            /* @__PURE__ */ jsxs("p", { className: "mt-2 text-2xl font-bold text-red-600", children: [
              "-",
              formatMoney$4(totalCommission)
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-slate-200 bg-gradient-to-br from-green-50 to-white p-4", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs font-medium uppercase tracking-widest text-slate-600", children: "Net payout" }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 text-2xl font-bold text-green-700", children: formatMoney$4(totalNetPayout) })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-6 overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-slate-200 text-left text-xs uppercase tracking-wide text-slate-600", children: [
            /* @__PURE__ */ jsx("th", { className: "py-3 pr-4 font-medium", children: "Invoice" }),
            /* @__PURE__ */ jsx("th", { className: "py-3 pr-4 font-medium", children: "Project" }),
            /* @__PURE__ */ jsx("th", { className: "py-3 pr-4 font-medium", children: "Date" }),
            /* @__PURE__ */ jsx("th", { className: "py-3 pr-4 text-right font-medium", children: "Gross" }),
            /* @__PURE__ */ jsx("th", { className: "py-3 pr-4 text-right font-medium", children: "Commission" }),
            /* @__PURE__ */ jsx("th", { className: "py-3 text-right font-medium", children: "Net payout" })
          ] }) }),
          /* @__PURE__ */ jsxs("tbody", { children: [
            invoices.map((invoice) => /* @__PURE__ */ jsxs("tr", { className: "border-b border-slate-200 last:border-0 hover:bg-slate-50", children: [
              /* @__PURE__ */ jsx("td", { className: "py-3 pr-4 font-medium text-slate-900", children: invoice.invoiceNumber }),
              /* @__PURE__ */ jsx("td", { className: "py-3 pr-4 text-slate-700", children: invoice.projectTitle }),
              /* @__PURE__ */ jsx("td", { className: "py-3 pr-4 text-slate-600", children: formatDate$7(invoice.createdAt) }),
              /* @__PURE__ */ jsx("td", { className: "py-3 pr-4 text-right text-slate-900", children: formatMoney$4(invoice.gross) }),
              /* @__PURE__ */ jsxs("td", { className: "py-3 pr-4 text-right text-red-600", children: [
                "-",
                formatMoney$4(invoice.commission)
              ] }),
              /* @__PURE__ */ jsx("td", { className: "py-3 text-right font-semibold text-slate-900", children: formatMoney$4(invoice.netPayout) })
            ] }, invoice.id)),
            !invoices.length ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 6, className: "py-8 text-center text-slate-600", children: "No invoices yet. Completed project payments will create invoice rows here." }) }) : null
          ] })
        ] }) })
      ] }) : null,
      /* @__PURE__ */ jsxs("div", { className: "grid gap-8 lg:grid-cols-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-slate-200 bg-white p-8 shadow-lg lg:col-span-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-6 border-b border-slate-200 pb-6", children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-bold text-slate-900", children: [
              isProfessional ? "Earnings" : "Payments",
              " by month"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-slate-600", children: "Last 6 months" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex h-56 items-end gap-3", children: chartData.map((d) => /* @__PURE__ */ jsxs("div", { className: "group flex flex-1 flex-col items-center gap-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "relative w-full", children: [
              /* @__PURE__ */ jsx("div", { className: "w-full rounded-t-lg bg-gradient-to-t from-blue-600 to-blue-400 transition-all group-hover:opacity-90", style: {
                height: `${Math.max(4, d.value / max * 200)}px`
              } }),
              /* @__PURE__ */ jsx("span", { className: "absolute -top-6 left-1/2 -translate-x-1/2 rounded bg-slate-900 px-2 py-1 text-[10px] font-medium text-white opacity-0 group-hover:opacity-100", children: formatMoney$4(d.value) })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-600", children: d.month })
          ] }, d.month)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 p-6 text-white shadow-lg", children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm font-medium opacity-90", children: isProfessional ? "Wallet balance" : "Project payments" }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 text-4xl font-bold", children: formatMoney$4(isProfessional ? availableBalance : lifetimeTotal) }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs opacity-80", children: isProfessional ? "Net payout minus requested withdrawals" : "Loaded from the database" }),
          /* @__PURE__ */ jsxs(Button, { className: "mt-6 w-full bg-white/20 text-white hover:bg-white/30 transition-all", disabled: !isProfessional || availableBalance <= 0, onClick: () => {
            setWithdrawAmount(String(Math.floor(availableBalance)));
            setWithdrawError(null);
            setWithdrawMessage(null);
            setIsWithdrawOpen(true);
          }, children: [
            /* @__PURE__ */ jsx(ArrowDownToLine, { className: "mr-2 h-4 w-4" }),
            " Withdraw"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-6 space-y-2 border-t border-white/20 pt-4 text-sm", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsx("span", { className: "opacity-75", children: "Currency" }),
              /* @__PURE__ */ jsx("span", { className: "font-medium", children: "USD" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsx("span", { className: "opacity-75", children: "Source" }),
              /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Project milestones" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsx("span", { className: "opacity-75", children: "Rows" }),
              /* @__PURE__ */ jsx("span", { className: "font-medium", children: scopedTransactions.length })
            ] }),
            isProfessional ? /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsx("span", { className: "opacity-75", children: "Requested" }),
              /* @__PURE__ */ jsx("span", { className: "font-medium", children: formatMoney$4(requestedWithdrawals) })
            ] }) : null
          ] })
        ] })
      ] }),
      isProfessional ? /* @__PURE__ */ jsxs("section", { className: "rounded-2xl border border-slate-200 bg-white p-8 shadow-lg", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-6 flex items-center justify-between border-b border-slate-200 pb-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-slate-900", children: "Withdrawal requests" }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-slate-600", children: "Track bank, UPI, and wallet payouts" })
          ] }),
          /* @__PURE__ */ jsxs(Button, { className: "bg-blue-600 hover:bg-blue-700 text-white", onClick: () => {
            setWithdrawAmount(String(Math.floor(availableBalance)));
            setWithdrawError(null);
            setWithdrawMessage(null);
            setIsWithdrawOpen(true);
          }, disabled: availableBalance <= 0, children: [
            /* @__PURE__ */ jsx(ArrowDownToLine, { className: "h-4 w-4 mr-2" }),
            "Withdraw money"
          ] })
        ] }),
        withdrawMessage ? /* @__PURE__ */ jsx("p", { className: "mb-4 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700", children: withdrawMessage }) : null,
        /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-slate-200 text-left text-xs uppercase tracking-wide text-slate-600", children: [
            /* @__PURE__ */ jsx("th", { className: "py-3 pr-4 font-medium", children: "Date" }),
            /* @__PURE__ */ jsx("th", { className: "py-3 pr-4 font-medium", children: "Method" }),
            /* @__PURE__ */ jsx("th", { className: "py-3 pr-4 font-medium", children: "Destination" }),
            /* @__PURE__ */ jsx("th", { className: "py-3 pr-4 font-medium", children: "Status" }),
            /* @__PURE__ */ jsx("th", { className: "py-3 text-right font-medium", children: "Amount" })
          ] }) }),
          /* @__PURE__ */ jsxs("tbody", { children: [
            scopedWithdrawals.map((withdrawal) => /* @__PURE__ */ jsxs("tr", { className: "border-b border-slate-200 last:border-0 hover:bg-slate-50", children: [
              /* @__PURE__ */ jsx("td", { className: "py-3 pr-4 text-slate-700", children: formatDate$7(withdrawal.createdAt) }),
              /* @__PURE__ */ jsx("td", { className: "py-3 pr-4 text-slate-700", children: formatEnum$8(withdrawal.destinationType) }),
              /* @__PURE__ */ jsx("td", { className: "py-3 pr-4 text-slate-700", children: withdrawal.destinationLabel }),
              /* @__PURE__ */ jsx("td", { className: "py-3 pr-4", children: /* @__PURE__ */ jsx("span", { className: `inline-block rounded-full px-2 py-1 text-xs font-medium ${withdrawal.status === "COMPLETED" ? "bg-green-100 text-green-700" : withdrawal.status === "PENDING" ? "bg-yellow-100 text-yellow-700" : "bg-slate-100 text-slate-700"}`, children: formatEnum$8(withdrawal.status) }) }),
              /* @__PURE__ */ jsx("td", { className: "py-3 text-right font-medium text-slate-900", children: formatMoney$4(withdrawal.amount) })
            ] }, withdrawal.id)),
            !scopedWithdrawals.length ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 5, className: "py-8 text-center text-slate-600", children: "No withdrawal requests yet." }) }) : null
          ] })
        ] }) })
      ] }) : null,
      /* @__PURE__ */ jsxs("section", { className: "rounded-2xl border border-slate-200 bg-white p-8 shadow-lg", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-6 flex items-center justify-between border-b border-slate-200 pb-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-slate-900", children: "All Transactions" }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-slate-600", children: "Complete transaction history and ledger" })
          ] }),
          /* @__PURE__ */ jsxs(Button, { className: "bg-blue-600 hover:bg-blue-700 text-white", size: "sm", onClick: () => downloadTransactionsPdf(scopedTransactions, isProfessional), disabled: !scopedTransactions.length, children: [
            /* @__PURE__ */ jsx(ReceiptText, { className: "h-4 w-4 mr-2" }),
            "Download PDF"
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-slate-200 text-left text-xs uppercase tracking-wide text-slate-600", children: [
            /* @__PURE__ */ jsx("th", { className: "py-3 pr-4 font-medium", children: "Date" }),
            /* @__PURE__ */ jsx("th", { className: "py-3 pr-4 font-medium", children: "Description" }),
            /* @__PURE__ */ jsx("th", { className: "py-3 pr-4 font-medium", children: "Type" }),
            /* @__PURE__ */ jsx("th", { className: "py-3 pr-4 font-medium", children: "Status" }),
            /* @__PURE__ */ jsx("th", { className: "py-3 text-right font-medium", children: "Amount" })
          ] }) }),
          /* @__PURE__ */ jsxs("tbody", { children: [
            scopedTransactions.map((transaction) => /* @__PURE__ */ jsxs("tr", { className: "border-b border-slate-200 last:border-0 hover:bg-slate-50", children: [
              /* @__PURE__ */ jsx("td", { className: "py-3 pr-4 text-slate-700", children: formatDate$7(transaction.createdAt) }),
              /* @__PURE__ */ jsx("td", { className: "py-3 pr-4 text-slate-700", children: transaction.description }),
              /* @__PURE__ */ jsx("td", { className: "py-3 pr-4", children: /* @__PURE__ */ jsx("span", { className: `inline-block rounded-full px-2 py-1 text-xs font-medium ${transaction.type === "MILESTONE_PAYMENT" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`, children: formatTransactionType(transaction.type) }) }),
              /* @__PURE__ */ jsx("td", { className: "py-3 pr-4", children: /* @__PURE__ */ jsx("span", { className: `inline-block rounded-full px-2 py-1 text-xs font-medium ${transaction.status === "COMPLETED" ? "bg-green-100 text-green-700" : transaction.status === "CANCELLED" ? "bg-red-100 text-red-700" : "bg-slate-100 text-slate-700"}`, children: formatEnum$8(transaction.status) }) }),
              /* @__PURE__ */ jsx("td", { className: "py-3 text-right font-medium text-slate-900", children: formatMoney$4(transaction.amount) })
            ] }, transaction.id)),
            !scopedTransactions.length ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 5, className: "py-8 text-center text-slate-600", children: "No transactions yet. Mark a project milestone as paid to create the first record." }) }) : null
          ] })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Dialog, { open: isWithdrawOpen, onOpenChange: setIsWithdrawOpen, children: /* @__PURE__ */ jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsx(DialogTitle, { children: "Withdraw money" }),
        /* @__PURE__ */ jsxs(DialogDescription, { children: [
          "Request a payout from your available balance of ",
          formatMoney$4(availableBalance),
          "."
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-2 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "withdraw-amount", children: "Amount" }),
            /* @__PURE__ */ jsx(Input, { id: "withdraw-amount", type: "number", min: 1, max: Math.floor(availableBalance), value: withdrawAmount, onChange: (event) => setWithdrawAmount(event.target.value) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { children: "Method" }),
            /* @__PURE__ */ jsxs(Select, { value: withdrawMethod, onValueChange: (value) => setWithdrawMethod(value), children: [
              /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsx(SelectItem, { value: "BANK", children: "Bank transfer" }),
                /* @__PURE__ */ jsx(SelectItem, { value: "UPI", children: "UPI" }),
                /* @__PURE__ */ jsx(SelectItem, { value: "WALLET", children: "Wallet" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "withdraw-destination", children: "Payout details" }),
          /* @__PURE__ */ jsx(Input, { id: "withdraw-destination", value: withdrawDestination, onChange: (event) => setWithdrawDestination(event.target.value), placeholder: withdrawMethod === "UPI" ? "name@upi" : withdrawMethod === "WALLET" ? "Wallet ID or phone" : "Bank name, account, IFSC/routing" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "withdraw-note", children: "Note" }),
          /* @__PURE__ */ jsx(Input, { id: "withdraw-note", value: withdrawNote, onChange: (event) => setWithdrawNote(event.target.value), placeholder: "Optional note for admin" })
        ] }),
        withdrawError ? /* @__PURE__ */ jsx("p", { className: "rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive", children: withdrawError }) : null
      ] }),
      /* @__PURE__ */ jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: () => setIsWithdrawOpen(false), children: "Cancel" }),
        /* @__PURE__ */ jsxs(Button, { onClick: handleWithdrawalRequest, disabled: isWithdrawing || availableBalance <= 0, children: [
          /* @__PURE__ */ jsx(ArrowDownToLine, { className: "h-4 w-4" }),
          isWithdrawing ? "Submitting" : "Submit request"
        ] })
      ] })
    ] }) })
  ] });
}
function getMonthlyTotals(transactions) {
  const now = /* @__PURE__ */ new Date();
  return Array.from({
    length: 6
  }, (_, index) => {
    const date = new Date(now.getFullYear(), now.getMonth() - (5 - index), 1);
    const value = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.createdAt);
      return transactionDate.getFullYear() === date.getFullYear() && transactionDate.getMonth() === date.getMonth();
    }).reduce((total, transaction) => total + transaction.amount, 0);
    return {
      month: new Intl.DateTimeFormat("en", {
        month: "short"
      }).format(date),
      value
    };
  });
}
function getCompletedJobs(transactions) {
  const jobs = /* @__PURE__ */ new Map();
  transactions.forEach((transaction) => {
    const existing = jobs.get(transaction.trackingId);
    if (!existing) {
      jobs.set(transaction.trackingId, {
        trackingId: transaction.trackingId,
        projectTitle: transaction.projectTitle,
        projectCategory: transaction.projectCategory,
        amount: transaction.amount,
        paymentCount: 1,
        lastPaidAt: transaction.createdAt
      });
      return;
    }
    existing.amount += transaction.amount;
    existing.paymentCount += 1;
    if (new Date(transaction.createdAt).getTime() > new Date(existing.lastPaidAt).getTime()) {
      existing.lastPaidAt = transaction.createdAt;
    }
  });
  return Array.from(jobs.values()).sort((a, b) => new Date(b.lastPaidAt).getTime() - new Date(a.lastPaidAt).getTime());
}
function createInvoiceRecord(transaction) {
  const commission = Math.round(transaction.amount * 0.1 * 100) / 100;
  return {
    id: transaction.id,
    invoiceNumber: `INV-${String(transaction.id).padStart(5, "0")}`,
    projectTitle: transaction.projectTitle || transaction.description || "Project payment",
    createdAt: transaction.createdAt,
    gross: transaction.amount,
    commission,
    netPayout: Math.max(0, transaction.amount - commission)
  };
}
function downloadTransactionsPdf(transactions, includeCommission) {
  const headers = includeCommission ? ["Date", "Project", "Description", "Type", "Status", "Gross Amount", "Commission Deduction", "Net Payout", "Currency"] : ["Date", "Project", "Description", "Type", "Status", "Amount", "Currency"];
  const rows = transactions.map((transaction) => {
    const invoice = createInvoiceRecord(transaction);
    return includeCommission ? [formatDate$7(transaction.createdAt), transaction.projectTitle || "", transaction.description, formatTransactionType(transaction.type), formatEnum$8(transaction.status), transaction.amount, invoice.commission, invoice.netPayout, transaction.currency] : [formatDate$7(transaction.createdAt), transaction.projectTitle || "", transaction.description, formatTransactionType(transaction.type), formatEnum$8(transaction.status), transaction.amount, transaction.currency];
  });
  const title = includeCommission ? "Servio Professional Earnings" : "Servio Client Payments";
  const lines = [title, `Generated: ${formatDate$7((/* @__PURE__ */ new Date()).toISOString())}`, "", ...formatPdfTable(headers, rows)];
  const blob = new Blob([createSimplePdf(lines)], {
    type: "application/pdf"
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const date = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
  link.href = url;
  link.download = includeCommission ? `servio-professional-earnings-${date}.pdf` : `servio-client-payments-${date}.pdf`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
function formatPdfTable(headers, rows) {
  const columnWidths = headers.map((header, index) => Math.min(Math.max(header.length, ...rows.map((row) => String(row[index] ?? "").length)), index === 2 ? 28 : 18));
  const formatRow = (row) => row.map((cell, index) => truncatePdfCell(String(cell ?? ""), columnWidths[index]).padEnd(columnWidths[index])).join("  ");
  return [formatRow(headers), columnWidths.map((width) => "-".repeat(width)).join("  "), ...rows.map(formatRow)];
}
function truncatePdfCell(value, maxLength) {
  if (value.length <= maxLength) {
    return value;
  }
  return `${value.slice(0, Math.max(0, maxLength - 1))}.`;
}
function createSimplePdf(lines) {
  const pageWidth = 842;
  const pageHeight = 595;
  const marginX = 36;
  const lineHeight = 13;
  const maxLinesPerPage = Math.floor((pageHeight - 72) / lineHeight);
  const pages = chunkLines(lines.length ? lines : ["No transactions available."], maxLinesPerPage);
  const objects = [];
  objects.push("<< /Type /Catalog /Pages 2 0 R >>");
  objects.push(`<< /Type /Pages /Kids [${pages.map((_, index) => `${3 + index * 2} 0 R`).join(" ")}] /Count ${pages.length} >>`);
  pages.forEach((pageLines, index) => {
    const pageObjectId = 3 + index * 2;
    const contentObjectId = pageObjectId + 1;
    const stream = ["BT", "/F1 9 Tf", `${marginX} ${pageHeight - 36} Td`, ...pageLines.flatMap((line, lineIndex) => [lineIndex === 0 ? "" : `0 -${lineHeight} Td`, `(${escapePdfText(line)}) Tj`]).filter(Boolean), "ET"].join("\n");
    objects.push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /Font << /F1 ${3 + pages.length * 2} 0 R >> >> /Contents ${contentObjectId} 0 R >>`);
    objects.push(`<< /Length ${stream.length} >>
stream
${stream}
endstream`);
  });
  objects.push("<< /Type /Font /Subtype /Type1 /BaseFont /Courier >>");
  const parts = ["%PDF-1.4\n"];
  const offsets = [0];
  objects.forEach((object, index) => {
    offsets.push(parts.join("").length);
    parts.push(`${index + 1} 0 obj
${object}
endobj
`);
  });
  const xrefOffset = parts.join("").length;
  parts.push(`xref
0 ${objects.length + 1}
`);
  parts.push("0000000000 65535 f \n");
  offsets.slice(1).forEach((offset) => {
    parts.push(`${String(offset).padStart(10, "0")} 00000 n 
`);
  });
  parts.push(`trailer
<< /Size ${objects.length + 1} /Root 1 0 R >>
startxref
${xrefOffset}
%%EOF`);
  return parts.join("");
}
function chunkLines(lines, size) {
  const chunks = [];
  for (let index = 0; index < lines.length; index += size) {
    chunks.push(lines.slice(index, index + size));
  }
  return chunks.length ? chunks : [[""]];
}
function escapePdfText(value) {
  return value.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}
function isSameMonth(value, date) {
  const transactionDate = new Date(value);
  return transactionDate.getFullYear() === date.getFullYear() && transactionDate.getMonth() === date.getMonth();
}
function formatMoney$4(value) {
  return `$${value.toLocaleString()}`;
}
function formatDate$7(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Not set";
  }
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(date);
}
function formatEnum$8(value) {
  return value.toLowerCase().split("_").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
}
function formatTransactionType(value) {
  return value === "MILESTONE_PAYMENT" ? "Milestone" : "Final";
}
const Route$V = Route$W;
const $$splitComponentImporter$e = () => import("./earnings-reports-BH6luwTy.js");
const getEarningsReportsData = createServerFn({
  method: "GET"
}).handler(createSsrRpc("f108177aa08367938e52b83bddcc36fd4b131fcfe5a95865744a3cb3f9976718"));
const Route$U = createFileRoute("/earnings-reports")({
  loader: () => getEarningsReportsData(),
  head: () => ({
    meta: [{
      title: "Earnings, Commission & Payout Reports - Servio"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$e, "component")
});
const Accordion = AccordionPrimitive.Root;
const AccordionItem = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(AccordionPrimitive.Item, { ref, className: cn("border-b", className), ...props }));
AccordionItem.displayName = "AccordionItem";
const AccordionTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(AccordionPrimitive.Header, { className: "flex", children: /* @__PURE__ */ jsxs(
  AccordionPrimitive.Trigger,
  {
    ref,
    className: cn(
      "flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" })
    ]
  }
) }));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;
const AccordionContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(
  AccordionPrimitive.Content,
  {
    ref,
    className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
    ...props,
    children: /* @__PURE__ */ jsx("div", { className: cn("pb-4 pt-0", className), children })
  }
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;
const faqItems = [{
  id: 1,
  question: "How do I hire a professional?",
  answer: "Post a job, compare proposals, review profiles, and choose the pro that fits your needs."
}, {
  id: 2,
  question: "Is payment safe on Servio?",
  answer: "Yes. Payments are held safely and released when the work or milestone is approved."
}, {
  id: 3,
  question: "How are professionals verified?",
  answer: "Profiles are reviewed for completeness and can include verification badges and platform checks."
}, {
  id: 4,
  question: "Can I contact support directly?",
  answer: "Yes. Use the contact page and our support team will respond as quickly as possible."
}];
const loadFaqPage = createServerFn({
  method: "GET"
}).handler(createSsrRpc("a172767e0829445458bae5e557f8faaa303ac6ae415111c949002c34f3898285"));
const Route$T = createFileRoute("/faq")({
  loader: () => loadFaqPage(),
  head: () => ({
    meta: [{
      title: "FAQ — Common questions answered | Servio"
    }, {
      name: "description",
      content: "Answers to common questions about hiring, pricing, payments, verification, and more."
    }]
  }),
  component: FAQ
});
function FAQ() {
  const {
    cmsPage
  } = Route$T.useLoaderData();
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsx(SiteHeader, {}),
    /* @__PURE__ */ jsx("section", { className: "gradient-hero", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold uppercase tracking-wider text-primary", children: "Help center" }),
      /* @__PURE__ */ jsx("h1", { className: "font-display mt-3 text-4xl font-bold tracking-tight md:text-5xl", children: cmsPage?.title || "Frequently asked questions" }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-muted-foreground", children: "Can't find what you're looking for? Our team is one click away." })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { className: "mx-auto max-w-3xl px-4 pb-20 sm:px-6 lg:px-8", children: [
      cmsPage?.content ? /* @__PURE__ */ jsx("div", { className: "prose prose-gray mb-8 max-w-none rounded-2xl border border-border bg-card p-6 text-sm leading-7 shadow-soft dark:prose-invert", dangerouslySetInnerHTML: {
        __html: cmsPage.content
      } }) : null,
      /* @__PURE__ */ jsx(Accordion, { type: "single", collapsible: true, className: "rounded-2xl border border-border bg-card shadow-soft", children: faqItems.map((faq) => /* @__PURE__ */ jsxs(AccordionItem, { value: `faq-${faq.id}`, className: "px-5", children: [
        /* @__PURE__ */ jsx(AccordionTrigger, { className: "text-left font-medium", children: faq.question }),
        /* @__PURE__ */ jsx(AccordionContent, { className: "text-sm text-muted-foreground", children: faq.answer })
      ] }, faq.id)) }),
      /* @__PURE__ */ jsxs("div", { className: "mt-12 rounded-2xl border border-border bg-card p-8 text-center shadow-soft", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-display text-2xl font-semibold", children: "Still have questions?" }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Our support team replies in under an hour." }),
        /* @__PURE__ */ jsx(Button, { asChild: true, size: "lg", className: "mt-5 bg-cta text-cta-foreground hover:bg-cta/90", children: /* @__PURE__ */ jsx(Link, { to: "/", children: "Contact support" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx(SiteFooter, {})
  ] });
}
const Route$S = Route$T;
const $$splitComponentImporter$d = () => import("./for-clients-BQlcVqaA.js");
const Route$R = createFileRoute("/for-clients")({
  head: () => ({
    meta: [{
      title: "For Clients - Hire vetted professionals | Servio"
    }, {
      name: "description",
      content: "Post a job, compare proposals, and pay safely via escrow. Servio is built to help clients hire with confidence."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const getHomeData = createServerFn({
  method: "GET"
}).handler(createSsrRpc("fdd2792a2c24c834517782fc4c0a485940ed26d7156272db363b023a115fd9b1"));
const Route$Q = createFileRoute("/for-professionals")({
  head: () => ({
    meta: [{
      title: "For Professionals — Grow your business | Servio"
    }, {
      name: "description",
      content: "Find quality jobs near you, get paid safely, and grow your business with Servio."
    }]
  }),
  loader: () => getHomeData(),
  component: ForPros
});
function ForPros() {
  const {
    openJobs
  } = useLoaderData({
    from: "/for-professionals"
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [budgetMin, setBudgetMin] = useState("");
  const [budgetMax, setBudgetMax] = useState("");
  const [urgency, setUrgency] = useState("all");
  const [type, setType] = useState("all");
  const [distance, setDistance] = useState("any");
  const [userLocation, setUserLocation] = useState(null);
  const [locationStatus, setLocationStatus] = useState(null);
  const [selectedMapJobId, setSelectedMapJobId] = useState(null);
  const filteredJobs = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    const normalizedCity = city.trim().toLowerCase();
    const min = budgetMin ? Number(budgetMin) : null;
    const max = budgetMax ? Number(budgetMax) : null;
    const maxDistance = distance === "any" ? null : Number(distance);
    return openJobs.map((job) => ({
      ...job,
      distanceKm: userLocation != null && job.locationLat != null && job.locationLng != null ? getDistanceKm(userLocation, {
        lat: job.locationLat,
        lng: job.locationLng
      }) : null
    })).filter((job) => {
      const jobBudgetMin = job.budgetMin ?? job.budgetMax ?? 0;
      const jobBudgetMax = job.budgetMax ?? job.budgetMin ?? 0;
      const locationText = [job.locationLabel, job.locationAddress].filter(Boolean).join(" ");
      const searchable = [job.title, job.description, job.category, job.urgency, job.workMode, locationText, job.clientCompanyName, job.clientName, formatBudget$7(job.budgetMin, job.budgetMax, job.timingType)].filter(Boolean).join(" ").toLowerCase();
      const matchesSearch = !normalizedSearch || searchable.includes(normalizedSearch);
      const matchesCity = !normalizedCity || locationText.toLowerCase().includes(normalizedCity);
      const matchesBudgetMin = min == null || jobBudgetMax >= min;
      const matchesBudgetMax = max == null || jobBudgetMin <= max;
      const matchesUrgency = urgency === "all" || job.urgency === urgency;
      const matchesType = type === "all" || job.workMode === type;
      const matchesDistance = maxDistance == null || job.workMode === "REMOTE" || userLocation != null && job.distanceKm != null && job.distanceKm <= maxDistance;
      return matchesSearch && matchesCity && matchesBudgetMin && matchesBudgetMax && matchesUrgency && matchesType && matchesDistance;
    }).sort((left, right) => {
      if (!userLocation) {
        return 0;
      }
      if (left.distanceKm == null && right.distanceKm == null) {
        return 0;
      }
      if (left.distanceKm == null) {
        return 1;
      }
      if (right.distanceKm == null) {
        return -1;
      }
      return left.distanceKm - right.distanceKm;
    });
  }, [budgetMax, budgetMin, city, distance, openJobs, search, type, urgency, userLocation]);
  const hasFilters = Boolean(search || city || budgetMin || budgetMax) || distance !== "any" || urgency !== "all" || type !== "all";
  const selectedMapJob = filteredJobs.find((job) => job.id === selectedMapJobId) || filteredJobs.find((job) => job.locationAddress || job.locationLat != null && job.locationLng != null);
  const selectedMapQuery = selectedMapJob?.locationLat != null && selectedMapJob.locationLng != null ? `${selectedMapJob.locationLat},${selectedMapJob.locationLng}` : selectedMapJob?.locationAddress || (userLocation ? `${userLocation.lat},${userLocation.lng}` : city);
  const mappableJobs = filteredJobs.filter((job) => job.locationAddress || job.locationLat != null && job.locationLng != null);
  const activeFilterCount = [city, budgetMin, budgetMax, distance !== "any" ? distance : "", urgency !== "all" ? urgency : "", type !== "all" ? type : ""].filter(Boolean).length;
  const resetFilters = () => {
    setSearch("");
    setCity("");
    setBudgetMin("");
    setBudgetMax("");
    setUrgency("all");
    setType("all");
    setDistance("any");
    setLocationStatus(null);
    setSelectedMapJobId(null);
  };
  const useCurrentLocation = () => {
    setLocationStatus(null);
    if (!navigator.geolocation) {
      setLocationStatus("Current location is not supported by this browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition((position) => {
      setUserLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
      setLocationStatus("Location ready for distance filtering.");
    }, () => setLocationStatus("Allow location access to use distance filtering."), {
      enableHighAccuracy: true,
      timeout: 1e4,
      maximumAge: 6e4
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsx(SiteHeader, {}),
    /* @__PURE__ */ jsx("section", { className: "bg-ink text-ink-foreground", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold uppercase tracking-wider text-cta", children: "For professionals" }),
        /* @__PURE__ */ jsx("h1", { className: "font-display mt-3 text-4xl font-bold tracking-tight text-white md:text-5xl", children: "Find quality jobs. Get paid safely. Grow your business." }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 max-w-lg text-white/70", children: "No more chasing leads or waiting on payments. Servio brings nearby and remote jobs straight to you." }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsx(Button, { asChild: true, size: "lg", className: "bg-cta text-cta-foreground hover:bg-cta/90", children: /* @__PURE__ */ jsx(Link, { to: "/signup", children: "Join as a Pro — free" }) }),
          /* @__PURE__ */ jsx(Button, { asChild: true, size: "lg", variant: "outline", className: "border-white/30 bg-white/10 text-white hover:bg-white/20", children: /* @__PURE__ */ jsx(Link, { to: "/discover", children: "See sample jobs" }) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-8 grid grid-cols-3 gap-6", children: [{
          v: "$3.2k",
          l: "Avg. monthly earnings"
        }, {
          v: "<2h",
          l: "First lead"
        }, {
          v: "120K+",
          l: "Active pros"
        }].map((s) => /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "font-display text-2xl font-bold text-white", children: s.v }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-white/60", children: s.l })
        ] }, s.l)) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid gap-4", children: [{
        icon: TrendingUp,
        t: "Grow",
        d: "Algorithmic match-making puts you in front of the right clients."
      }, {
        icon: ShieldCheck,
        t: "Trusted",
        d: "Verified badges and ratings build long-term reputation."
      }, {
        icon: MapPin,
        t: "Nearby",
        d: "See jobs by distance, urgency, and budget — at a glance."
      }, {
        icon: Wallet$1,
        t: "Paid weekly",
        d: "Withdraw earnings to your bank or wallet, anytime."
      }].map((b) => /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-white/10 bg-white/5 p-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "grid h-10 w-10 place-items-center rounded-xl bg-cta/15 text-cta", children: /* @__PURE__ */ jsx(b.icon, { className: "h-5 w-5" }) }),
          /* @__PURE__ */ jsx("p", { className: "font-display text-lg font-semibold text-white", children: b.t })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-white/70", children: b.d })
      ] }, b.t)) })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { className: "mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-display text-3xl font-bold tracking-tight", children: "Built for professionals like you" }),
      /* @__PURE__ */ jsx("div", { className: "mt-8 grid gap-5 md:grid-cols-3", children: [{
        icon: Briefcase,
        t: "All trades welcome",
        d: "Plumbers, designers, photographers, tutors — there's a market for you."
      }, {
        icon: BadgeCheck,
        t: "Get verified",
        d: "Free identity & license verification builds trust with clients."
      }, {
        icon: TrendingUp,
        t: "Insights & analytics",
        d: "Track win-rates, response times, and earnings in one dashboard."
      }].map((b) => /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-border bg-card p-6 shadow-soft", children: [
        /* @__PURE__ */ jsx("div", { className: "grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary", children: /* @__PURE__ */ jsx(b.icon, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsx("h3", { className: "font-display mt-4 text-lg font-semibold", children: b.t }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: b.d })
      ] }, b.t)) })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "font-display text-3xl font-bold tracking-tight", children: "Jobs posted by clients" }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 max-w-2xl text-sm text-muted-foreground", children: "These are live open jobs created by clients. Professionals can use this feed to browse, review, and apply." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary", children: [
          openJobs.length,
          " active job",
          openJobs.length === 1 ? "" : "s"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-8 rounded-xl border border-border bg-card p-4 shadow-soft", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto_auto]", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
            /* @__PURE__ */ jsx(Input, { className: "pl-9", value: search, onChange: (event) => setSearch(event.target.value), placeholder: "Search jobs, client, category" })
          ] }),
          /* @__PURE__ */ jsxs(Button, { type: "button", variant: "outline", className: "h-9 gap-2", onClick: () => setIsFilterOpen(true), children: [
            /* @__PURE__ */ jsx(SlidersHorizontal, { className: "h-4 w-4" }),
            "Filters",
            activeFilterCount ? /* @__PURE__ */ jsx("span", { className: "rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground", children: activeFilterCount }) : null
          ] }),
          /* @__PURE__ */ jsx(Button, { type: "button", variant: "outline", onClick: resetFilters, disabled: !hasFilters, children: "Clear" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-3 flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxs("span", { children: [
            "Showing ",
            filteredJobs.length,
            " of ",
            openJobs.length,
            " jobs"
          ] }),
          activeFilterCount ? /* @__PURE__ */ jsxs("span", { children: [
            activeFilterCount,
            " filter",
            activeFilterCount === 1 ? "" : "s",
            " active"
          ] }) : null
        ] })
      ] }),
      /* @__PURE__ */ jsx(Dialog, { open: isFilterOpen, onOpenChange: setIsFilterOpen, children: /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-3xl", children: [
        /* @__PURE__ */ jsxs(DialogHeader, { children: [
          /* @__PURE__ */ jsx(DialogTitle, { children: "Filters" }),
          /* @__PURE__ */ jsx(DialogDescription, { children: "Narrow available client jobs by distance, city, budget, urgency, and type." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-4 py-2 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxs("label", { className: "space-y-2 text-sm font-medium", children: [
            /* @__PURE__ */ jsx("span", { children: "City" }),
            /* @__PURE__ */ jsx(Input, { value: city, onChange: (event) => setCity(event.target.value), placeholder: "e.g. Mumbai" })
          ] }),
          /* @__PURE__ */ jsxs("label", { className: "space-y-2 text-sm font-medium", children: [
            /* @__PURE__ */ jsx("span", { children: "Distance" }),
            /* @__PURE__ */ jsxs("select", { className: "h-9 w-full rounded-md border border-input bg-background px-3 text-sm font-normal", value: distance, onChange: (event) => setDistance(event.target.value), children: [
              /* @__PURE__ */ jsx("option", { value: "any", children: "Any distance" }),
              /* @__PURE__ */ jsx("option", { value: "5", children: "Within 5 km" }),
              /* @__PURE__ */ jsx("option", { value: "10", children: "Within 10 km" }),
              /* @__PURE__ */ jsx("option", { value: "25", children: "Within 25 km" }),
              /* @__PURE__ */ jsx("option", { value: "50", children: "Within 50 km" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("label", { className: "space-y-2 text-sm font-medium", children: [
            /* @__PURE__ */ jsx("span", { children: "Minimum budget" }),
            /* @__PURE__ */ jsx(Input, { type: "number", min: "0", value: budgetMin, onChange: (event) => setBudgetMin(event.target.value), placeholder: "Min budget" })
          ] }),
          /* @__PURE__ */ jsxs("label", { className: "space-y-2 text-sm font-medium", children: [
            /* @__PURE__ */ jsx("span", { children: "Maximum budget" }),
            /* @__PURE__ */ jsx(Input, { type: "number", min: "0", value: budgetMax, onChange: (event) => setBudgetMax(event.target.value), placeholder: "Max budget" })
          ] }),
          /* @__PURE__ */ jsxs("label", { className: "space-y-2 text-sm font-medium", children: [
            /* @__PURE__ */ jsx("span", { children: "Urgency" }),
            /* @__PURE__ */ jsxs("select", { className: "h-9 w-full rounded-md border border-input bg-background px-3 text-sm font-normal", value: urgency, onChange: (event) => setUrgency(event.target.value), children: [
              /* @__PURE__ */ jsx("option", { value: "all", children: "Any urgency" }),
              /* @__PURE__ */ jsx("option", { value: "HIGH", children: "High" }),
              /* @__PURE__ */ jsx("option", { value: "MEDIUM", children: "Medium" }),
              /* @__PURE__ */ jsx("option", { value: "LOW", children: "Low" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("label", { className: "space-y-2 text-sm font-medium", children: [
            /* @__PURE__ */ jsx("span", { children: "Type" }),
            /* @__PURE__ */ jsxs("select", { className: "h-9 w-full rounded-md border border-input bg-background px-3 text-sm font-normal", value: type, onChange: (event) => setType(event.target.value), children: [
              /* @__PURE__ */ jsx("option", { value: "all", children: "Any type" }),
              /* @__PURE__ */ jsx("option", { value: "REMOTE", children: "Remote" }),
              /* @__PURE__ */ jsx("option", { value: "ON_SITE", children: "On-site" }),
              /* @__PURE__ */ jsx("option", { value: "BOTH", children: "Both" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "rounded-xl border border-border bg-muted/30 p-3 text-sm text-muted-foreground", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsx("span", { children: locationStatus || "Use your current location for distance filters." }),
          /* @__PURE__ */ jsxs(Button, { type: "button", variant: "outline", size: "sm", className: "gap-2", onClick: useCurrentLocation, children: [
            /* @__PURE__ */ jsx(MapPin, { className: "h-4 w-4" }),
            "Use my location"
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs(DialogFooter, { children: [
          /* @__PURE__ */ jsx(Button, { type: "button", variant: "ghost", onClick: resetFilters, children: "Clear" }),
          /* @__PURE__ */ jsx(Button, { type: "button", onClick: () => setIsFilterOpen(false), children: "Apply filters" })
        ] })
      ] }) }),
      selectedMapQuery ? /* @__PURE__ */ jsxs("div", { className: "mt-8 overflow-hidden rounded-xl border border-border bg-card shadow-soft", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-between gap-2 border-b border-border px-4 py-3 sm:flex-row sm:items-center", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "font-medium", children: "Nearby jobs on map" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: selectedMapJob ? `Showing ${selectedMapJob.title} near ${formatJobLocation$1(selectedMapJob) || formatApproximateCoordinates(selectedMapJob.locationLat, selectedMapJob.locationLng) || "saved location"}.` : userLocation ? "Showing jobs around your current location." : "Choose a job with a saved location to preview it." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
            /* @__PURE__ */ jsxs(Button, { type: "button", variant: "outline", size: "sm", className: "gap-2", onClick: useCurrentLocation, children: [
              /* @__PURE__ */ jsx(LocateFixed, { className: "h-4 w-4" }),
              "Use my location"
            ] }),
            /* @__PURE__ */ jsx("a", { href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedMapQuery)}`, target: "_blank", rel: "noreferrer", className: "rounded-md border border-border px-3 py-2 text-sm font-medium text-primary hover:bg-muted", children: "Open in Google Maps" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-[minmax(0,1fr)_360px]", children: [
          /* @__PURE__ */ jsx("iframe", { title: "Nearby jobs map", src: `https://www.google.com/maps?q=${encodeURIComponent(selectedMapQuery)}&z=${userLocation ? 12 : 14}&output=embed`, className: "h-[380px] w-full border-0", loading: "lazy", referrerPolicy: "no-referrer-when-downgrade" }, selectedMapQuery),
          /* @__PURE__ */ jsxs("div", { className: "max-h-[380px] overflow-y-auto border-t border-border bg-background p-3 lg:border-l lg:border-t-0", children: [
            /* @__PURE__ */ jsxs("div", { className: "mb-3 flex items-center justify-between gap-2 text-sm", children: [
              /* @__PURE__ */ jsxs("span", { className: "font-medium", children: [
                mappableJobs.length,
                " mapped job",
                mappableJobs.length === 1 ? "" : "s"
              ] }),
              /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: userLocation ? "Nearest first" : "Select a job" })
            ] }),
            mappableJobs.length ? /* @__PURE__ */ jsx("div", { className: "space-y-2", children: mappableJobs.map((job) => /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => setSelectedMapJobId(job.id), className: `w-full rounded-lg border p-3 text-left transition-colors ${selectedMapJob?.id === job.id ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/60"}`, children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3", children: [
                /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsx("p", { className: "truncate text-sm font-semibold text-foreground", children: job.title }),
                  /* @__PURE__ */ jsx("p", { className: "mt-1 truncate text-xs text-muted-foreground", children: formatJobLocation$1(job) })
                ] }),
                /* @__PURE__ */ jsx("span", { className: "shrink-0 rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground", children: formatDistanceLabel(job.distanceKm) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mt-2 flex flex-wrap gap-2 text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsx("span", { className: "rounded-full bg-muted px-2 py-1", children: job.category }),
                /* @__PURE__ */ jsx("span", { className: "rounded-full bg-muted px-2 py-1", children: formatBudget$7(job.budgetMin, job.budgetMax, job.timingType) })
              ] })
            ] }, job.id)) }) : /* @__PURE__ */ jsx("div", { className: "rounded-lg border border-dashed border-border p-5 text-center text-sm text-muted-foreground", children: "No jobs with saved map locations match these filters." })
          ] })
        ] })
      ] }) : null,
      filteredJobs.length ? /* @__PURE__ */ jsx("div", { className: "mt-8 grid gap-3 lg:grid-cols-2", children: filteredJobs.map((job) => /* @__PURE__ */ jsxs("div", { className: "group rounded-lg border border-border bg-card p-4 shadow-sm transition-colors hover:border-primary/60 hover:bg-muted/10", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-1.5", children: [
              /* @__PURE__ */ jsx("span", { className: "inline-flex rounded-md bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary", children: job.category }),
              /* @__PURE__ */ jsx("span", { className: "inline-flex rounded-md bg-muted px-2 py-0.5 text-[11px] text-muted-foreground", children: job.workMode === "ON_SITE" ? "On-site" : job.workMode === "REMOTE" ? "Remote" : "Both" }),
              /* @__PURE__ */ jsx("span", { className: `inline-flex rounded-md px-2 py-0.5 text-[11px] ${job.urgency === "HIGH" ? "bg-destructive/10 text-destructive" : "bg-muted text-muted-foreground"}`, children: formatEnum$7(job.urgency) })
            ] }),
            /* @__PURE__ */ jsx("h3", { className: "mt-3 line-clamp-2 text-base font-semibold leading-6 text-foreground", children: job.title })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "shrink-0 rounded-lg border border-primary/20 bg-primary/10 px-3 py-2 text-right", children: [
            /* @__PURE__ */ jsx("p", { className: "text-[10px] font-semibold uppercase text-primary/80", children: "Budget" }),
            /* @__PURE__ */ jsx("p", { className: "mt-0.5 whitespace-nowrap text-sm font-semibold text-primary", children: formatBudget$7(job.budgetMin, job.budgetMax, job.timingType) })
          ] })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-1.5 line-clamp-2 text-sm leading-5 text-muted-foreground", children: job.description }),
        /* @__PURE__ */ jsxs("div", { className: "mt-3 grid gap-1.5 text-xs text-muted-foreground sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex min-w-0 items-center gap-1.5 rounded-md border border-border/70 bg-background px-2 py-1.5", children: [
            /* @__PURE__ */ jsx(CalendarClock, { className: "h-3.5 w-3.5 shrink-0" }),
            /* @__PURE__ */ jsx("span", { className: "truncate", children: new Intl.DateTimeFormat("en", {
              month: "short",
              day: "numeric",
              year: "numeric"
            }).format(new Date(job.deadline)) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex min-w-0 items-center gap-1.5 rounded-md border border-border/70 bg-background px-2 py-1.5", children: [
            /* @__PURE__ */ jsx(Paperclip, { className: "h-3.5 w-3.5 shrink-0" }),
            /* @__PURE__ */ jsxs("span", { children: [
              job.attachments.length,
              " file",
              job.attachments.length === 1 ? "" : "s"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex min-w-0 items-center gap-1.5 rounded-md border border-border/70 bg-background px-2 py-1.5", children: [
            /* @__PURE__ */ jsx(MapPin, { className: "h-3.5 w-3.5 shrink-0" }),
            /* @__PURE__ */ jsx("span", { className: "truncate", children: formatJobLocation$1(job) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex min-w-0 items-center gap-1.5 rounded-md border border-border/70 bg-background px-2 py-1.5", children: [
            /* @__PURE__ */ jsx(LocateFixed, { className: "h-3.5 w-3.5 shrink-0" }),
            /* @__PURE__ */ jsx("span", { className: "truncate", children: formatDistanceLabel(job.distanceKm) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-3", children: [
          /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "Posted by",
            " ",
            /* @__PURE__ */ jsx("span", { className: "font-medium text-foreground", children: job.clientCompanyName || job.clientName })
          ] }),
          job.locationAddress || job.locationLat != null && job.locationLng != null ? /* @__PURE__ */ jsxs(Button, { type: "button", variant: "outline", size: "sm", className: "h-8 gap-1.5 px-2.5 text-xs", onClick: () => setSelectedMapJobId(job.id), children: [
            /* @__PURE__ */ jsx(MapPin, { className: "h-3.5 w-3.5" }),
            "Map"
          ] }) : null
        ] })
      ] }, job.id)) }) : /* @__PURE__ */ jsxs("div", { className: "mt-8 rounded-2xl border border-border bg-muted/10 p-8 text-center", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-muted-foreground", children: "No jobs match these filters." }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Try clearing filters or broadening the budget, city, urgency, or type." })
      ] })
    ] }),
    /* @__PURE__ */ jsx(SiteFooter, {})
  ] });
}
function formatBudget$7(min, max, timingType = "FIXED") {
  const suffix = getBudgetSuffix$7(timingType);
  if (min && max) {
    return `$${min.toLocaleString()} - $${max.toLocaleString()}${suffix}`;
  }
  if (max) {
    return `Up to $${max.toLocaleString()}${suffix}`;
  }
  if (min) {
    return `From $${min.toLocaleString()}${suffix}`;
  }
  return "Budget not set";
}
function formatJobLocation$1(job) {
  if (job.workMode === "REMOTE") {
    return "Remote";
  }
  return formatApproximateLocation(job.locationAddress || job.locationLabel, "Location saved");
}
function getBudgetSuffix$7(timingType) {
  if (timingType === "HOURLY") {
    return " / hour";
  }
  if (timingType === "WEEKLY") {
    return " / week";
  }
  return "";
}
function formatEnum$7(value) {
  return value.toLowerCase().split("_").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
}
function formatDistanceLabel(distanceKm) {
  if (distanceKm == null) {
    return "Distance unavailable";
  }
  if (distanceKm < 1) {
    return `${Math.round(distanceKm * 1e3)} m away`;
  }
  return `${distanceKm.toFixed(distanceKm < 10 ? 1 : 0)} km away`;
}
function getDistanceKm(from, to) {
  const radius = 6371;
  const latDelta = toRadians(to.lat - from.lat);
  const lngDelta = toRadians(to.lng - from.lng);
  const fromLat = toRadians(from.lat);
  const toLat = toRadians(to.lat);
  const haversine = Math.sin(latDelta / 2) * Math.sin(latDelta / 2) + Math.cos(fromLat) * Math.cos(toLat) * Math.sin(lngDelta / 2) * Math.sin(lngDelta / 2);
  return radius * 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));
}
function toRadians(value) {
  return value * Math.PI / 180;
}
const Route$P = Route$Q;
const getAuthLayoutUser = createServerFn({
  method: "GET"
}).handler(createSsrRpc("951c17a8842f1d7cb860c1d26decee12b7759ebea0e564cb42cf8b06b2fa6f96"));
function AuthLayout({
  title,
  subtitle,
  children,
  footer,
  fullWidth = false
}) {
  const [viewer, setViewer] = useState(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const profileHref = viewer?.role === "ADMIN" ? "/" : viewer?.role === "CLIENT" ? "/my-info" : "/professional-profile";
  useEffect(() => {
    let active = true;
    getAuthLayoutUser().then((user) => {
      if (active) {
        setViewer(user);
      }
    }).catch(() => {
      if (active) {
        setViewer(null);
      }
    });
    return () => {
      active = false;
    };
  }, []);
  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const result = await logoutAction();
      if (result.ok) {
        window.location.assign("/login");
      }
    } catch (error) {
      console.error("Logout failed:", error);
      setIsLoggingOut(false);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: fullWidth ? "min-h-screen" : "min-h-screen lg:grid lg:grid-cols-2", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex min-h-screen flex-col px-6 py-8 lg:px-12", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsx(Logo, { linked: false }),
        viewer ? /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Button, { asChild: true, variant: "outline", size: "sm", className: "h-11 rounded-2xl bg-background px-5 shadow-sm", children: /* @__PURE__ */ jsxs(Link, { to: profileHref, className: "gap-2", children: [
            /* @__PURE__ */ jsx(User, { className: "h-4 w-4" }),
            "Profile"
          ] }) }),
          /* @__PURE__ */ jsxs(Button, { type: "button", variant: "ghost", size: "sm", onClick: handleLogout, disabled: isLoggingOut, className: "h-11 rounded-2xl px-4", children: [
            /* @__PURE__ */ jsx(LogOut, { className: "mr-2 h-4 w-4" }),
            isLoggingOut ? "Logging out..." : "Logout"
          ] })
        ] }) : null
      ] }),
      /* @__PURE__ */ jsxs("div", { className: `flex w-full flex-1 flex-col py-10 ${fullWidth ? "max-w-none justify-start" : "mx-auto max-w-md justify-center"}`, children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-semibold tracking-tight", children: title }),
        subtitle && /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: subtitle }),
        /* @__PURE__ */ jsx("div", { className: "mt-8", children }),
        footer && /* @__PURE__ */ jsx("div", { className: `mt-6 text-sm text-muted-foreground ${fullWidth ? "text-left" : "text-center"}`, children: footer })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-center text-xs text-muted-foreground", children: "© 2026 Servio, Inc." })
    ] }),
    !fullWidth ? /* @__PURE__ */ jsx("div", { className: "relative hidden gradient-hero lg:block", children: /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 flex flex-col justify-between p-12", children: [
      /* @__PURE__ */ jsx(Link, { to: "/", className: "text-sm text-muted-foreground hover:text-foreground", children: "← Back to site" }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-border bg-card/80 p-6 shadow-elevated backdrop-blur", children: [
        /* @__PURE__ */ jsx("div", { className: "flex gap-1 text-warning", children: Array.from({
          length: 5
        }).map((_, i) => /* @__PURE__ */ jsx(Star, { className: "h-4 w-4 fill-warning" }, i)) }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 text-lg leading-snug text-foreground", children: '"Servio is the only marketplace I trust. The pros are exceptional and the process is effortless."' }),
        /* @__PURE__ */ jsxs("div", { className: "mt-5 flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("img", { src: "https://i.pravatar.cc/100?u=olivia", className: "h-10 w-10 rounded-full", alt: "" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold", children: "Olivia Bennett" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Founder, Lumen" })
          ] })
        ] })
      ] })
    ] }) }) : null
  ] });
}
const Form = FormProvider;
const FormFieldContext = React.createContext(null);
const FormField = ({
  ...props
}) => {
  return /* @__PURE__ */ jsx(FormFieldContext.Provider, { value: { name: props.name }, children: /* @__PURE__ */ jsx(Controller, { ...props }) });
};
const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();
  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }
  if (!itemContext) {
    throw new Error("useFormField should be used within <FormItem>");
  }
  const fieldState = getFieldState(fieldContext.name, formState);
  const { id } = itemContext;
  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState
  };
};
const FormItemContext = React.createContext(null);
const FormItem = React.forwardRef(
  ({ className, ...props }, ref) => {
    const id = React.useId();
    return /* @__PURE__ */ jsx(FormItemContext.Provider, { value: { id }, children: /* @__PURE__ */ jsx("div", { ref, className: cn("space-y-2", className), ...props }) });
  }
);
FormItem.displayName = "FormItem";
const FormLabel = React.forwardRef(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField();
  return /* @__PURE__ */ jsx(
    Label,
    {
      ref,
      className: cn(error && "text-destructive", className),
      htmlFor: formItemId,
      ...props
    }
  );
});
FormLabel.displayName = "FormLabel";
const FormControl = React.forwardRef(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();
  return /* @__PURE__ */ jsx(
    Slot,
    {
      ref,
      id: formItemId,
      "aria-describedby": !error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`,
      "aria-invalid": !!error,
      ...props
    }
  );
});
FormControl.displayName = "FormControl";
const FormDescription = React.forwardRef(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();
  return /* @__PURE__ */ jsx(
    "p",
    {
      ref,
      id: formDescriptionId,
      className: cn("text-[0.8rem] text-muted-foreground", className),
      ...props
    }
  );
});
FormDescription.displayName = "FormDescription";
const FormMessage = React.forwardRef(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message ?? "") : children;
  if (!body) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    "p",
    {
      ref,
      id: formMessageId,
      className: cn("text-[0.8rem] font-medium text-destructive", className),
      ...props,
      children: body
    }
  );
});
FormMessage.displayName = "FormMessage";
const Route$O = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [{
      title: "Reset password — Servio"
    }]
  }),
  component: Forgot
});
const sendPasswordResetOtp = createServerFn({
  method: "POST"
}).inputValidator((data) => forgotPasswordRequestSchema.parse(data)).handler(createSsrRpc("62594a67bff601f34bf09e77f55d04b1abc3c2cb3e849829c7799ef4601bcce1"));
const resetPassword = createServerFn({
  method: "POST"
}).inputValidator((data) => resetPasswordSchema.parse(data)).handler(createSsrRpc("46409a6e140b0fbbb4054bcde4973dfdce1166763727f42c81d81d3d979feeae"));
function Forgot() {
  const navigate = useNavigate();
  const [otpSent, setOtpSent] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [submitError, setSubmitError2] = useState(null);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const requestForm = useForm({
    resolver: zodResolver(forgotPasswordRequestSchema),
    defaultValues: {
      email: ""
    }
  });
  const resetForm = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
      otp: "",
      password: "",
      confirmPassword: ""
    }
  });
  const handleSendOtp = async (values) => {
    setIsSendingOtp(true);
    setStatusMessage(null);
    setSubmitError2(null);
    try {
      const result = await sendPasswordResetOtp({
        data: values
      });
      if (!result.ok) {
        if (result.formError) {
          setSubmitError2(result.formError);
        }
        return;
      }
      const email = values.email.trim().toLowerCase();
      setOtpSent(true);
      setStatusMessage("If an account exists for this email, a reset code has been sent.");
      resetForm.reset({
        email,
        otp: "",
        password: "",
        confirmPassword: ""
      });
      requestForm.reset({
        email
      });
    } catch (error) {
      console.error("Send OTP failed:", error);
      setSubmitError2(error instanceof Error ? error.message : "Could not send reset code.");
    } finally {
      setIsSendingOtp(false);
    }
  };
  const handleResetPassword = async (values) => {
    setIsResetting(true);
    setSubmitError2(null);
    setStatusMessage(null);
    try {
      const result = await resetPassword({
        data: values
      });
      if (!result.ok) {
        if (result.formError) {
          setSubmitError2(result.formError);
        }
        if (result.fieldErrors) {
          Object.entries(result.fieldErrors).forEach(([field, message]) => {
            if (message) {
              resetForm.setError(field, {
                type: "server",
                message
              });
            }
          });
        }
        return;
      }
      setStatusMessage("Your password has been reset successfully. Redirecting to login...");
      window.setTimeout(() => navigate({
        to: "/login"
      }), 1200);
    } catch (error) {
      console.error("Reset password failed:", error);
      setSubmitError2(error instanceof Error ? error.message : "Password reset failed.");
    } finally {
      setIsResetting(false);
    }
  };
  const handleResendOtp = async () => {
    const email = requestForm.getValues("email").trim();
    if (!email) {
      requestForm.setError("email", {
        type: "manual",
        message: "Enter your email to resend the code."
      });
      return;
    }
    setIsSendingOtp(true);
    setSubmitError2(null);
    setStatusMessage(null);
    try {
      const result = await sendPasswordResetOtp({
        data: {
          email
        }
      });
      if (!result.ok) {
        if (result.formError) {
          setSubmitError2(result.formError);
        }
        return;
      }
      setStatusMessage("A new code has been sent if this email is registered.");
      resetForm.setValue("email", email);
    } catch (error) {
      console.error("Resend OTP failed:", error);
      setSubmitError2(error instanceof Error ? error.message : "Could not resend reset code.");
    } finally {
      setIsSendingOtp(false);
    }
  };
  return /* @__PURE__ */ jsx(AuthLayout, { title: "Reset your password", subtitle: otpSent ? "Enter the code from your email and choose a new password." : "Enter your email and we’ll send a reset code.", footer: /* @__PURE__ */ jsxs(Fragment, { children: [
    "Remembered it?",
    " ",
    /* @__PURE__ */ jsx(Link, { to: "/login", className: "text-primary hover:underline", children: "Back to log in" })
  ] }), children: otpSent ? /* @__PURE__ */ jsx(Form, { ...resetForm, children: /* @__PURE__ */ jsxs("form", { onSubmit: resetForm.handleSubmit(handleResetPassword), className: "space-y-4", noValidate: true, children: [
    /* @__PURE__ */ jsx("div", { className: "rounded-xl border border-success/20 bg-success/5 px-4 py-4 text-success shadow-soft", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
      /* @__PURE__ */ jsx("div", { className: "grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-success/10", children: /* @__PURE__ */ jsx(ShieldCheck, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold", children: "Reset code sent" }),
        /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-sm opacity-85", children: "Check your email and enter the code below. It expires in a few minutes." })
      ] }),
      /* @__PURE__ */ jsx(CheckCircle2, { className: "ml-auto h-4 w-4 shrink-0" })
    ] }) }),
    /* @__PURE__ */ jsx(FormField, { control: resetForm.control, name: "email", render: ({
      field
    }) => /* @__PURE__ */ jsxs(FormItem, { children: [
      /* @__PURE__ */ jsx(FormLabel, { children: "Email" }),
      /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { ...field, type: "email", placeholder: "you@example.com", autoComplete: "email", disabled: true }) }),
      /* @__PURE__ */ jsx(FormMessage, {})
    ] }) }),
    /* @__PURE__ */ jsx(FormField, { control: resetForm.control, name: "otp", render: ({
      field
    }) => /* @__PURE__ */ jsxs(FormItem, { children: [
      /* @__PURE__ */ jsx(FormLabel, { children: "Reset code" }),
      /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { ...field, placeholder: "123456", autoComplete: "one-time-code" }) }),
      /* @__PURE__ */ jsx(FormMessage, {})
    ] }) }),
    /* @__PURE__ */ jsx(FormField, { control: resetForm.control, name: "password", render: ({
      field
    }) => /* @__PURE__ */ jsxs(FormItem, { children: [
      /* @__PURE__ */ jsx(FormLabel, { children: "New password" }),
      /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { ...field, type: "password", placeholder: "••••••••", autoComplete: "new-password" }) }),
      /* @__PURE__ */ jsx(FormMessage, {})
    ] }) }),
    /* @__PURE__ */ jsx(FormField, { control: resetForm.control, name: "confirmPassword", render: ({
      field
    }) => /* @__PURE__ */ jsxs(FormItem, { children: [
      /* @__PURE__ */ jsx(FormLabel, { children: "Confirm password" }),
      /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { ...field, type: "password", placeholder: "Confirm password", autoComplete: "new-password" }) }),
      /* @__PURE__ */ jsx(FormMessage, {})
    ] }) }),
    submitError ? /* @__PURE__ */ jsx(OtpNotice, { message: submitError, tone: "error" }) : null,
    statusMessage ? /* @__PURE__ */ jsx(OtpNotice, { message: statusMessage, tone: "success" }) : null,
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3 sm:flex-row", children: [
      /* @__PURE__ */ jsx(Button, { type: "button", variant: "outline", disabled: isSendingOtp, onClick: handleResendOtp, children: isSendingOtp ? "Resending code..." : "Resend code" }),
      /* @__PURE__ */ jsx(Button, { type: "submit", className: "w-full sm:w-auto", disabled: isResetting, children: isResetting ? "Resetting..." : "Reset password" })
    ] })
  ] }) }) : /* @__PURE__ */ jsx(Form, { ...requestForm, children: /* @__PURE__ */ jsxs("form", { onSubmit: requestForm.handleSubmit(handleSendOtp), className: "space-y-4", noValidate: true, children: [
    /* @__PURE__ */ jsx(FormField, { control: requestForm.control, name: "email", render: ({
      field
    }) => /* @__PURE__ */ jsxs(FormItem, { children: [
      /* @__PURE__ */ jsx(FormLabel, { children: "Email" }),
      /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { ...field, type: "email", placeholder: "you@example.com", autoComplete: "email" }) }),
      /* @__PURE__ */ jsx(FormMessage, {})
    ] }) }),
    submitError ? /* @__PURE__ */ jsx(OtpNotice, { message: submitError, tone: "error" }) : null,
    statusMessage ? /* @__PURE__ */ jsx(OtpNotice, { message: statusMessage, tone: isSendingOtp ? "sending" : "success" }) : null,
    /* @__PURE__ */ jsx(Button, { type: "submit", className: "w-full", disabled: isSendingOtp, children: isSendingOtp ? "Sending code..." : "Send reset code" })
  ] }) }) });
}
function OtpNotice({
  message,
  tone
}) {
  const Icon = tone === "sending" ? LoaderCircle : tone === "error" ? TriangleAlert : MailCheck;
  return /* @__PURE__ */ jsx("div", { className: `rounded-xl border px-4 py-3 shadow-soft ${tone === "sending" ? "border-primary/20 bg-primary/5 text-primary" : tone === "error" ? "border-destructive/20 bg-destructive/5 text-destructive" : "border-success/20 bg-success/5 text-success"}`, children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
    /* @__PURE__ */ jsx("div", { className: `mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg ${tone === "sending" ? "bg-primary/10" : tone === "error" ? "bg-destructive/10" : "bg-success/10"}`, children: /* @__PURE__ */ jsx(Icon, { className: `h-4 w-4 ${tone === "sending" ? "animate-spin" : ""}` }) }),
    /* @__PURE__ */ jsx("p", { className: "min-w-0 text-sm font-medium", children: message })
  ] }) });
}
const Route$N = Route$O;
const Route$M = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How It Works — Servio" },
      {
        name: "description",
        content: "From posting a job to hiring a vetted pro and tracking work — see how Servio gets it done in three simple steps."
      }
    ]
  }),
  component: HowItWorks
});
const stepsClient = [
  {
    icon: ClipboardList,
    title: "Post your job",
    desc: "Describe the work, set your budget and timeline. It's free and takes 2 minutes."
  },
  {
    icon: MessageSquare,
    title: "Compare proposals",
    desc: "Receive quotes from vetted pros. Chat, compare ratings, and shortlist the best."
  },
  {
    icon: ShieldCheck,
    title: "Hire safely",
    desc: "Funds are held in escrow and released only when each milestone is approved."
  },
  {
    icon: Wallet$1,
    title: "Pay & review",
    desc: "Release final payment and rate your pro to help our community."
  }
];
const stepsPro = [
  {
    icon: Users,
    title: "Create your profile",
    desc: "Showcase skills, portfolio, and certifications. Get verified for free."
  },
  {
    icon: MessageSquare,
    title: "Send proposals",
    desc: "Browse nearby and remote jobs. Submit a quote in under a minute."
  },
  {
    icon: Star,
    title: "Win, deliver, get paid",
    desc: "Deliver milestones, get reviews, and grow your business with Servio."
  }
];
function HowItWorks() {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsx(SiteHeader, {}),
    /* @__PURE__ */ jsx(Hero, {}),
    /* @__PURE__ */ jsxs("section", { className: "mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold uppercase tracking-wider text-primary", children: "For clients" }),
      /* @__PURE__ */ jsx("h2", { className: "font-display mt-2 text-3xl font-bold tracking-tight md:text-4xl", children: "Get great work done — in 4 steps" }),
      /* @__PURE__ */ jsx("div", { className: "mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4", children: stepsClient.map((s, i) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: "relative rounded-2xl border border-border bg-card p-6 shadow-soft",
          children: [
            /* @__PURE__ */ jsxs("span", { className: "font-display text-5xl font-bold text-primary/15", children: [
              "0",
              i + 1
            ] }),
            /* @__PURE__ */ jsx("div", { className: "mt-2 grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary", children: /* @__PURE__ */ jsx(s.icon, { className: "h-5 w-5" }) }),
            /* @__PURE__ */ jsx("h3", { className: "font-display mt-4 text-lg font-semibold", children: s.title }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: s.desc })
          ]
        },
        s.title
      )) })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "bg-surface", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold uppercase tracking-wider text-cta", children: "For professionals" }),
      /* @__PURE__ */ jsx("h2", { className: "font-display mt-2 text-3xl font-bold tracking-tight md:text-4xl", children: "Earn more, with less hassle" }),
      /* @__PURE__ */ jsx("div", { className: "mt-10 grid gap-6 md:grid-cols-3", children: stepsPro.map((s, i) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: "rounded-2xl border border-border bg-card p-7 shadow-soft",
          children: [
            /* @__PURE__ */ jsxs("span", { className: "rounded-full bg-cta/10 px-2.5 py-0.5 text-xs font-bold text-cta", children: [
              "Step ",
              i + 1
            ] }),
            /* @__PURE__ */ jsx("div", { className: "mt-3 grid h-11 w-11 place-items-center rounded-xl bg-cta/10 text-cta", children: /* @__PURE__ */ jsx(s.icon, { className: "h-5 w-5" }) }),
            /* @__PURE__ */ jsx("h3", { className: "font-display mt-4 text-lg font-semibold", children: s.title }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: s.desc })
          ]
        },
        s.title
      )) })
    ] }) }),
    /* @__PURE__ */ jsx(CTABand, {}),
    /* @__PURE__ */ jsx(SiteFooter, {})
  ] });
}
function Hero() {
  return /* @__PURE__ */ jsx("section", { className: "gradient-hero", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold uppercase tracking-wider text-primary", children: "How it works" }),
    /* @__PURE__ */ jsxs("h1", { className: "font-display mx-auto mt-3 max-w-3xl text-4xl font-bold tracking-tight md:text-6xl", children: [
      "A simpler way to ",
      /* @__PURE__ */ jsx("span", { className: "text-primary", children: "hire & get hired" })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "mx-auto mt-4 max-w-xl text-muted-foreground", children: "Servio handles the busywork — discovery, vetting, payments, and tracking — so you can focus on the work." })
  ] }) });
}
function CTABand() {
  return /* @__PURE__ */ jsx("section", { className: "mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "rounded-3xl bg-primary p-10 text-white md:p-14", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-6 md:grid-cols-2 md:items-center", children: [
    /* @__PURE__ */ jsx("h3", { className: "font-display text-3xl font-bold md:text-4xl", children: "Get started today" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-3 md:justify-end", children: [
      /* @__PURE__ */ jsx(Button, { asChild: true, size: "lg", className: "bg-cta text-cta-foreground hover:bg-cta/90", children: /* @__PURE__ */ jsxs(Link, { to: "/post-job", children: [
        "Post a Job ",
        /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
      ] }) }),
      /* @__PURE__ */ jsx(
        Button,
        {
          asChild: true,
          size: "lg",
          variant: "outline",
          className: "border-white/30 bg-white/10 text-white hover:bg-white/20",
          children: /* @__PURE__ */ jsx(Link, { to: "/signup", children: "Become a Pro" })
        }
      )
    ] })
  ] }) }) });
}
const Route$L = Route$M;
const $$splitComponentImporter$c = () => import("./job-management-BUw7GLur.js");
const getJobManagementData = createServerFn({
  method: "GET"
}).handler(createSsrRpc("5feb31bfc71b14ea08550c2b12b4cc18685f13d087894e33b7082e8ad614492d"));
const Route$K = createFileRoute("/job-management")({
  loader: () => getJobManagementData(),
  head: () => ({
    meta: [{
      title: "Job & Dispute Management - Servio"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("./login-Dzif4Bb1.js");
const Route$J = createFileRoute("/login")({
  head: () => ({
    meta: [{
      title: "Log in — Servio"
    }, {
      name: "description",
      content: "Log in to your Servio account."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const Route$I = createFileRoute("/messages")({
  loader: () => getClientMessagesPage(),
  head: () => ({
    meta: [{
      title: "Messages - Servio"
    }, {
      name: "description",
      content: "Chat with pros and clients in one place."
    }]
  }),
  component: Messages
});
const getClientMessagesPage = createServerFn({
  method: "GET"
}).handler(createSsrRpc("8bcb83b2ac36f74a5f33ec892c4b41348990edcd59ee70b521aefd68bf37407f"));
function Messages() {
  const {
    viewer
  } = useLoaderData({
    from: "/messages"
  });
  const location = useLocation();
  const [conversations, setConversations] = useState([]);
  const [messagesByConversation, setMessagesByConversation] = useState({});
  const [active, setActive] = useState(null);
  const [draft, setDraft] = useState("");
  const [submitError, setSubmitError2] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [activeCall, setActiveCall] = useState(null);
  const [callSeconds, setCallSeconds] = useState(0);
  const [typingByConversation, setTypingByConversation] = useState({});
  const socketRef = useRef(null);
  const conversationsRef = useRef([]);
  const localCallVideoRef = useRef(null);
  const remoteCallVideoRef = useRef(null);
  const remoteCallAudioRef = useRef(null);
  const callStreamRef = useRef(null);
  const remoteCallStreamRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const pendingIceCandidatesRef = useRef([]);
  const typingStopTimerRef = useRef(null);
  const incomingTypingTimersRef = useRef({});
  useEffect(() => {
    conversationsRef.current = conversations;
  }, [conversations]);
  useEffect(() => {
    if (!viewer) {
      return;
    }
    const urlConversation = peekPendingConversation() || getConversationFromSearch(getSearchFromHref(location.href));
    if (!urlConversation) {
      return;
    }
    setActive(urlConversation);
    setConversations((current) => persistConversations$1(viewer.id, upsertConversationList$1(current, urlConversation)));
    socketRef.current?.emit("conversation:join", {
      conversationId: urlConversation.id
    });
    if (socketRef.current) {
      maybeSendFirstMessage(socketRef.current, viewer, urlConversation);
    }
    schedulePendingConversationClear(urlConversation.id);
  }, [location.href, viewer?.id]);
  useEffect(() => {
    if (!viewer) {
      return;
    }
    const storedConversations = readJson$1(storageKey$1(viewer.id, "conversations"), []);
    const storedMessages = readJson$1(storageKey$1(viewer.id, "messages"), {});
    const urlConversation = peekPendingConversation() || getConversationFromSearch(window.location.search);
    const pendingIncomingCall = readPendingIncomingCall$1(viewer.id);
    const pendingCallConversation = pendingIncomingCall ? buildConversationFromCall$1(pendingIncomingCall) : null;
    const nextConversations = urlConversation ? upsertConversationList$1(storedConversations, urlConversation) : pendingCallConversation ? upsertConversationList$1(storedConversations, pendingCallConversation) : storedConversations;
    setConversations(nextConversations);
    setMessagesByConversation(storedMessages);
    setActive(urlConversation || pendingCallConversation || nextConversations[0] || null);
    const socket = io(getSocketUrl$7(), {
      auth: {
        userId: viewer.id,
        role: viewer.role,
        name: `${viewer.firstName} ${viewer.lastName}`.trim() || viewer.email,
        avatarUrl: viewer.avatarUrl
      }
    });
    socketRef.current = socket;
    nextConversations.forEach((conversation) => {
      socket.emit("conversation:join", {
        conversationId: conversation.id
      });
    });
    if (pendingIncomingCall) {
      socket.emit("conversation:join", {
        conversationId: pendingIncomingCall.conversationId
      });
      setActiveCall({
        callId: pendingIncomingCall.callId,
        conversationId: pendingIncomingCall.conversationId,
        mode: pendingIncomingCall.mode || "voice",
        status: "incoming",
        fromUserId: pendingIncomingCall.fromUserId,
        toUserId: viewer.id,
        fromName: pendingIncomingCall.fromName || "Someone",
        offer: pendingIncomingCall.offer
      });
      setCallSeconds(0);
    }
    socket.on("connect", () => setSubmitError2(null));
    socket.emit("history:load", {
      userId: viewer.id
    }, (history) => {
      const historyConversations = urlConversation ? upsertConversationList$1(history?.conversations || [], urlConversation) : history?.conversations || [];
      const historyMessages = history?.messagesByConversation || {};
      const mergedConversations = mergeConversationLists$1(historyConversations, nextConversations);
      const mergedMessages = mergeMessagesByConversation$1(storedMessages, historyMessages);
      setConversations(persistConversations$1(viewer.id, mergedConversations));
      setMessagesByConversation(persistMessages$1(viewer.id, mergedMessages));
      setActive((current) => urlConversation || current || mergedConversations[0] || null);
      mergedConversations.forEach((conversation) => {
        socket.emit("conversation:join", {
          conversationId: conversation.id
        });
      });
    });
    socket.on("connect_error", () => {
      setSubmitError2("Socket server is not connected. Run npm run socket in another terminal.");
    });
    socket.on("message:new", (message) => {
      if (message.senderId === viewer.id) {
        return;
      }
      appendMessage(viewer.id, message);
    });
    socket.on("conversation:upsert", (payload) => {
      if (!payload?.message || !payload.conversationId) {
        return;
      }
      const conversation = {
        id: payload.conversationId,
        otherUserId: payload.fromUser?.id || payload.message.senderId,
        otherUserName: payload.fromUser?.name || "Client",
        otherUserAvatarUrl: payload.fromUser?.avatarUrl || null,
        job: payload.job || "Direct message",
        preview: getMessagePreview$1(payload.message),
        time: formatTime$1(payload.message.createdAt),
        unread: active?.id === payload.conversationId ? 0 : 1
      };
      socket.emit("conversation:join", {
        conversationId: conversation.id
      });
      setConversations((current) => persistConversations$1(viewer.id, upsertConversationList$1(current, conversation)));
      appendMessage(viewer.id, payload.message);
    });
    socket.on("conversation:cleared", ({
      conversationId,
      userId
    }) => {
      if (userId && userId !== viewer.id) {
        return;
      }
      clearConversationLocally(viewer.id, conversationId);
    });
    socket.on("typing:start", ({
      conversationId,
      userId,
      name
    }) => {
      if (userId === viewer.id) {
        return;
      }
      setTypingByConversation((current) => ({
        ...current,
        [conversationId]: name || "Someone"
      }));
      if (incomingTypingTimersRef.current[conversationId]) {
        window.clearTimeout(incomingTypingTimersRef.current[conversationId]);
      }
      incomingTypingTimersRef.current[conversationId] = window.setTimeout(() => {
        setTypingByConversation((current) => {
          const next = {
            ...current
          };
          delete next[conversationId];
          return next;
        });
      }, 2500);
    });
    socket.on("typing:stop", ({
      conversationId,
      userId
    }) => {
      if (userId === viewer.id) {
        return;
      }
      if (incomingTypingTimersRef.current[conversationId]) {
        window.clearTimeout(incomingTypingTimersRef.current[conversationId]);
        delete incomingTypingTimersRef.current[conversationId];
      }
      setTypingByConversation((current) => {
        const next = {
          ...current
        };
        delete next[conversationId];
        return next;
      });
    });
    socket.on("call:incoming", (payload) => {
      if (!payload?.callId || !payload.conversationId || !payload.fromUserId || payload.fromUserId === viewer.id || !payload.offer) {
        return;
      }
      setActiveCall({
        callId: payload.callId,
        conversationId: payload.conversationId,
        mode: payload.mode || "voice",
        status: "incoming",
        fromUserId: payload.fromUserId,
        toUserId: viewer.id,
        fromName: payload.fromName || "Someone",
        offer: payload.offer
      });
      setActive((current) => {
        if (current?.id === payload.conversationId) {
          return current;
        }
        const existing = conversationsRef.current.find((conversation) => conversation.id === payload.conversationId);
        if (existing) {
          return existing;
        }
        const incomingConversation = buildConversationFromCall$1(payload);
        socket.emit("conversation:join", {
          conversationId: incomingConversation.id
        });
        setConversations((items) => persistConversations$1(viewer.id, upsertConversationList$1(items, incomingConversation)));
        return incomingConversation;
      });
      setCallSeconds(0);
    });
    socket.on("call:answered", async (payload) => {
      if (!payload?.callId || payload.toUserId !== viewer.id || !payload.answer || !peerConnectionRef.current) {
        return;
      }
      await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(payload.answer));
      await flushPendingIceCandidates();
      const startedAt = payload.startedAt ? new Date(payload.startedAt).getTime() : Date.now();
      setActiveCall((current) => current?.callId === payload.callId ? {
        ...current,
        status: "active",
        startedAt
      } : current);
    });
    socket.on("call:ice-candidate", async (payload) => {
      if (!payload?.callId || payload.toUserId !== viewer.id || !payload.candidate) {
        return;
      }
      if (!peerConnectionRef.current?.remoteDescription) {
        pendingIceCandidatesRef.current.push(payload.candidate);
        return;
      }
      await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(payload.candidate));
    });
    socket.on("call:ended", (payload) => {
      if (!payload?.callId || payload.toUserId !== viewer.id) {
        return;
      }
      cleanupCall(false);
    });
    if (urlConversation) {
      socket.emit("conversation:join", {
        conversationId: urlConversation.id
      });
      maybeSendFirstMessage(socket, viewer, urlConversation);
      schedulePendingConversationClear(urlConversation.id);
    }
    return () => {
      if (typingStopTimerRef.current) {
        window.clearTimeout(typingStopTimerRef.current);
      }
      Object.values(incomingTypingTimersRef.current).forEach((timer) => window.clearTimeout(timer));
      cleanupCall(false);
      socket.disconnect();
    };
  }, [viewer?.id]);
  useEffect(() => {
    if (activeCall?.status !== "active" || !activeCall.startedAt) {
      setCallSeconds(0);
      return;
    }
    const updateSeconds = () => {
      setCallSeconds(Math.max(0, Math.floor((Date.now() - activeCall.startedAt) / 1e3)));
    };
    updateSeconds();
    const timer = window.setInterval(updateSeconds, 1e3);
    return () => window.clearInterval(timer);
  }, [activeCall?.status, activeCall?.startedAt]);
  useEffect(() => {
    if (!activeCall) {
      return;
    }
    if (localCallVideoRef.current && callStreamRef.current) {
      localCallVideoRef.current.srcObject = callStreamRef.current;
    }
    if (remoteCallAudioRef.current && remoteCallStreamRef.current) {
      remoteCallAudioRef.current.srcObject = remoteCallStreamRef.current;
    }
    if (remoteCallVideoRef.current && remoteCallStreamRef.current) {
      remoteCallVideoRef.current.srcObject = remoteCallStreamRef.current;
    }
  }, [activeCall?.callId, activeCall?.mode, activeCall?.status]);
  const appendMessage = (userId, message) => {
    setMessagesByConversation((current) => {
      const currentMessages = current[message.conversationId] || [];
      if (currentMessages.some((item) => item.id === message.id)) {
        return current;
      }
      const next = {
        ...current,
        [message.conversationId]: [...currentMessages, message]
      };
      localStorage.setItem(storageKey$1(userId, "messages"), JSON.stringify(next));
      return next;
    });
    setConversations((current) => persistConversations$1(userId, current.map((conversation) => conversation.id === message.conversationId ? {
      ...conversation,
      preview: getMessagePreview$1(message),
      time: formatTime$1(message.createdAt)
    } : conversation)));
  };
  const selectConversation = (conversation) => {
    setActive(conversation);
    setSubmitError2(null);
    socketRef.current?.emit("conversation:join", {
      conversationId: conversation.id
    });
    setConversations((current) => persistConversations$1(viewer?.id || 0, current.map((item) => item.id === conversation.id ? {
      ...item,
      unread: 0
    } : item)));
  };
  const sendMessage = async (body = draft, kind = "text") => {
    if (!viewer || !active || !body.trim() || !socketRef.current) {
      return;
    }
    stopTyping();
    setIsSending(true);
    setSubmitError2(null);
    socketRef.current.emit("message:send", {
      conversationId: active.id,
      senderId: viewer.id,
      receiverId: active.otherUserId,
      body,
      kind,
      job: active.job,
      toUser: {
        id: active.otherUserId,
        name: active.otherUserName,
        avatarUrl: active.otherUserAvatarUrl
      },
      fromUser: {
        id: viewer.id,
        name: `${viewer.firstName} ${viewer.lastName}`.trim() || viewer.email,
        avatarUrl: viewer.avatarUrl
      }
    }, (response) => {
      setIsSending(false);
      if (!response.ok || !response.message) {
        setSubmitError2(response.formError || "Could not send message.");
        return;
      }
      appendMessage(viewer.id, response.message);
      if (kind === "text") {
        setDraft("");
      }
    });
  };
  const sendCallHistoryMessage = (call, body) => {
    if (!viewer || !socketRef.current) {
      return;
    }
    const conversation = conversationsRef.current.find((item) => item.id === call.conversationId) || (active?.id === call.conversationId ? active : null);
    if (!conversation) {
      return;
    }
    const receiverId = call.fromUserId === viewer.id ? call.toUserId : call.fromUserId;
    socketRef.current.emit("message:send", {
      conversationId: conversation.id,
      senderId: viewer.id,
      receiverId,
      body,
      kind: "call",
      job: conversation.job,
      toUser: {
        id: conversation.otherUserId,
        name: conversation.otherUserName,
        avatarUrl: conversation.otherUserAvatarUrl
      },
      fromUser: {
        id: viewer.id,
        name: `${viewer.firstName} ${viewer.lastName}`.trim() || viewer.email,
        avatarUrl: viewer.avatarUrl
      }
    }, (response) => {
      if (response.ok && response.message) {
        appendMessage(viewer.id, response.message);
      }
    });
  };
  const openCall = async (mode) => {
    if (!viewer || !active || !socketRef.current || activeCall) {
      return;
    }
    setSubmitError2(null);
    try {
      const stream = await openLocalCallStream(mode);
      const callId = crypto.randomUUID();
      const peerConnection = createPeerConnection(callId, active.id, viewer.id, active.otherUserId);
      stream.getTracks().forEach((track) => peerConnection.addTrack(track, stream));
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);
      setActiveCall({
        callId,
        conversationId: active.id,
        mode,
        status: "outgoing",
        fromUserId: viewer.id,
        toUserId: active.otherUserId,
        fromName: `${viewer.firstName} ${viewer.lastName}`.trim() || viewer.email
      });
      socketRef.current.emit("call:invite", {
        callId,
        conversationId: active.id,
        fromUserId: viewer.id,
        toUserId: active.otherUserId,
        fromName: `${viewer.firstName} ${viewer.lastName}`.trim() || viewer.email,
        fromAvatarUrl: viewer.avatarUrl,
        job: active.job,
        mode,
        offer
      });
      sendCallHistoryMessage({
        callId,
        conversationId: active.id,
        mode,
        status: "outgoing",
        fromUserId: viewer.id,
        toUserId: active.otherUserId,
        fromName: `${viewer.firstName} ${viewer.lastName}`.trim() || viewer.email
      }, `${getCallModeLabel$1(mode)} call started.`);
    } catch (error) {
      cleanupCall(false);
      setSubmitError2(error instanceof Error ? error.message : "Could not start the call.");
    }
  };
  const answerCall = async () => {
    if (!viewer || !activeCall?.offer || activeCall.status !== "incoming" || !socketRef.current) {
      return;
    }
    setSubmitError2(null);
    try {
      socketRef.current.emit("conversation:join", {
        conversationId: activeCall.conversationId
      });
      const stream = await openLocalCallStream(activeCall.mode);
      const peerConnection = createPeerConnection(activeCall.callId, activeCall.conversationId, viewer.id, activeCall.fromUserId);
      stream.getTracks().forEach((track) => peerConnection.addTrack(track, stream));
      await peerConnection.setRemoteDescription(new RTCSessionDescription(activeCall.offer));
      await flushPendingIceCandidates();
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);
      const startedAt = (/* @__PURE__ */ new Date()).toISOString();
      setActiveCall((current) => current ? {
        ...current,
        status: "active",
        startedAt: Date.now()
      } : current);
      socketRef.current.emit("call:answer", {
        callId: activeCall.callId,
        conversationId: activeCall.conversationId,
        fromUserId: viewer.id,
        toUserId: activeCall.fromUserId,
        answer,
        startedAt
      });
      clearPendingIncomingCall$1(activeCall.callId);
      sendCallHistoryMessage(activeCall, `${getCallModeLabel$1(activeCall.mode)} call answered.`);
    } catch (error) {
      cleanupCall(false);
      setSubmitError2(error instanceof Error ? error.message : "Could not answer the call.");
    }
  };
  const endInlineCall = () => {
    cleanupCall(true);
  };
  const openLocalCallStream = async (mode) => {
    if (!navigator.mediaDevices?.getUserMedia) {
      throw new Error("Camera and microphone are not available in this browser.");
    }
    const stream = mode === "video" ? await openVideoOrAudioFallback() : await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    });
    callStreamRef.current = stream;
    window.setTimeout(() => {
      if (localCallVideoRef.current) {
        localCallVideoRef.current.srcObject = stream;
      }
    }, 0);
    return stream;
  };
  const openVideoOrAudioFallback = async () => {
    try {
      return await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: {
          width: {
            ideal: 1280
          },
          height: {
            ideal: 720
          }
        }
      });
    } catch (error) {
      if (!isVideoSourceError$1(error)) {
        throw error;
      }
      try {
        const audioOnlyStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false
        });
        setSubmitError2("Camera is busy or unavailable, so you joined with microphone only.");
        return audioOnlyStream;
      } catch {
        throw error;
      }
    }
  };
  const createPeerConnection = (callId, conversationId, fromUserId, toUserId) => {
    const peerConnection = new RTCPeerConnection({
      iceServers: [{
        urls: "stun:stun.l.google.com:19302"
      }]
    });
    peerConnectionRef.current = peerConnection;
    remoteCallStreamRef.current = new MediaStream();
    peerConnection.onicecandidate = (event) => {
      if (!event.candidate) {
        return;
      }
      socketRef.current?.emit("call:ice-candidate", {
        callId,
        conversationId,
        fromUserId,
        toUserId,
        candidate: event.candidate.toJSON()
      });
    };
    peerConnection.ontrack = (event) => {
      const [stream] = event.streams;
      const remoteStream = stream || remoteCallStreamRef.current;
      if (!remoteStream) {
        return;
      }
      if (event.track && !remoteStream.getTracks().includes(event.track)) {
        remoteStream.addTrack(event.track);
      }
      remoteCallStreamRef.current = remoteStream;
      if (remoteCallAudioRef.current) {
        remoteCallAudioRef.current.srcObject = remoteStream;
      }
      if (remoteCallVideoRef.current) {
        remoteCallVideoRef.current.srcObject = remoteStream;
      }
    };
    peerConnection.onconnectionstatechange = () => {
      if (["closed", "disconnected", "failed"].includes(peerConnection.connectionState)) {
        cleanupCall(false);
      }
    };
    return peerConnection;
  };
  const flushPendingIceCandidates = async () => {
    if (!peerConnectionRef.current?.remoteDescription) {
      return;
    }
    for (const candidate of pendingIceCandidatesRef.current) {
      await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(candidate));
    }
    pendingIceCandidatesRef.current = [];
  };
  const cleanupCall = (notifyPeer = true) => {
    const callToClose = activeCall;
    if (callToClose) {
      clearPendingIncomingCall$1(callToClose.callId);
    }
    if (notifyPeer && callToClose) {
      sendCallHistoryMessage(callToClose, getCallCloseHistoryBody$1(callToClose));
    }
    if (notifyPeer && viewer && callToClose && socketRef.current) {
      const peerUserId = callToClose.fromUserId === viewer.id ? callToClose.toUserId : callToClose.fromUserId;
      socketRef.current.emit("call:end", {
        callId: callToClose.callId,
        conversationId: callToClose.conversationId,
        fromUserId: viewer.id,
        toUserId: peerUserId
      });
    }
    peerConnectionRef.current?.close();
    peerConnectionRef.current = null;
    callStreamRef.current?.getTracks().forEach((track) => track.stop());
    callStreamRef.current = null;
    remoteCallStreamRef.current?.getTracks().forEach((track) => track.stop());
    remoteCallStreamRef.current = null;
    pendingIceCandidatesRef.current = [];
    if (localCallVideoRef.current) {
      localCallVideoRef.current.srcObject = null;
    }
    if (remoteCallVideoRef.current) {
      remoteCallVideoRef.current.srcObject = null;
    }
    if (remoteCallAudioRef.current) {
      remoteCallAudioRef.current.srcObject = null;
    }
    setActiveCall(null);
    setCallSeconds(0);
  };
  const sendAttachment = async (file) => {
    if (file.size > MAX_ATTACHMENT_BYTES$1) {
      setSubmitError2("Attachment must be 2 MB or smaller.");
      return;
    }
    try {
      const dataUrl = await readFileAsDataUrl$2(file);
      await sendMessage(JSON.stringify({
        fileName: file.name,
        fileType: file.type || "application/octet-stream",
        fileSize: file.size,
        dataUrl
      }), "attachment");
    } catch (error) {
      setSubmitError2(error instanceof Error ? error.message : "Could not attach this file.");
    }
  };
  const updateDraft = (value) => {
    setDraft(value);
    emitTyping(value);
  };
  const emitTyping = (value) => {
    if (!viewer || !active || !socketRef.current) {
      return;
    }
    if (!value.trim()) {
      stopTyping();
      return;
    }
    socketRef.current.emit("typing:start", {
      conversationId: active.id,
      userId: viewer.id,
      receiverId: active.otherUserId,
      name: `${viewer.firstName} ${viewer.lastName}`.trim() || viewer.email
    });
    if (typingStopTimerRef.current) {
      window.clearTimeout(typingStopTimerRef.current);
    }
    typingStopTimerRef.current = window.setTimeout(stopTyping, 1200);
  };
  const stopTyping = () => {
    if (typingStopTimerRef.current) {
      window.clearTimeout(typingStopTimerRef.current);
      typingStopTimerRef.current = null;
    }
    if (!viewer || !active || !socketRef.current) {
      return;
    }
    socketRef.current.emit("typing:stop", {
      conversationId: active.id,
      userId: viewer.id,
      receiverId: active.otherUserId
    });
  };
  const clearConversationLocally = (userId, conversationId) => {
    setMessagesByConversation((current) => {
      const next = {
        ...current,
        [conversationId]: []
      };
      localStorage.setItem(storageKey$1(userId, "messages"), JSON.stringify(next));
      return next;
    });
    setConversations((current) => persistConversations$1(userId, current.map((conversation) => conversation.id === conversationId ? {
      ...conversation,
      preview: "Chat cleared",
      time: "",
      unread: 0
    } : conversation)));
  };
  const clearChat = () => {
    if (!viewer || !active) {
      return;
    }
    const conversationId = active.id;
    clearConversationLocally(viewer.id, conversationId);
    setTypingByConversation((current) => {
      const next = {
        ...current
      };
      delete next[conversationId];
      return next;
    });
    setSubmitError2(null);
    if (!socketRef.current) {
      return;
    }
    socketRef.current.emit("conversation:clear", {
      conversationId,
      userId: viewer.id
    }, (response) => {
      if (!response.ok) {
        console.warn(response.formError || "Could not clear this chat on the server.");
        return;
      }
    });
  };
  const activeMessages = active ? messagesByConversation[active.id] || [] : [];
  const typingName = active ? typingByConversation[active.id] : "";
  return /* @__PURE__ */ jsx(AppShell, { title: "Messages", userName: viewer ? `${viewer.firstName} ${viewer.lastName}`.trim() : "Client", userRole: "Client", userAvatarUrl: viewer?.avatarUrl, children: /* @__PURE__ */ jsxs("div", { className: "grid h-[calc(100vh-12rem)] overflow-hidden rounded-2xl border border-border bg-card shadow-soft md:grid-cols-[320px_1fr]", children: [
    /* @__PURE__ */ jsx(MessageSidebar$1, { conversations, active, emptyText: "No professional messages yet.", onSelect: selectConversation }),
    /* @__PURE__ */ jsx("section", { className: "flex min-h-0 flex-col", children: active ? /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(MessageHeader$1, { active, activeCall: activeCall?.conversationId === active.id ? activeCall : null, callSeconds, typingName, openCall, endCall: endInlineCall, clearChat }),
      /* @__PURE__ */ jsx(InlineCallPanel$1, { activeCall: activeCall?.conversationId === active.id ? activeCall : null, callSeconds, otherUserName: active.otherUserName, localVideoRef: localCallVideoRef, remoteVideoRef: remoteCallVideoRef, remoteAudioRef: remoteCallAudioRef, answerCall, endCall: endInlineCall }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1 space-y-3 overflow-y-auto bg-surface p-6", children: [
        activeMessages.map((message) => /* @__PURE__ */ jsx(MessageBubble$1, { message, mine: message.senderId === viewer?.id }, message.id)),
        typingName ? /* @__PURE__ */ jsx(TypingIndicator$1, { name: typingName }) : null
      ] }),
      /* @__PURE__ */ jsx(MessageComposer$1, { draft, setDraft: updateDraft, submitError, isSending, sendMessage: () => void sendMessage(), sendAttachment: (file) => void sendAttachment(file) })
    ] }) : /* @__PURE__ */ jsx(EmptyConversation$1, { text: "Professional messages will appear here when a conversation starts." }) })
  ] }) });
}
function MessageSidebar$1({
  conversations,
  active,
  emptyText,
  onSelect
}) {
  return /* @__PURE__ */ jsxs("aside", { className: "border-r border-border", children: [
    /* @__PURE__ */ jsx("div", { className: "border-b border-border p-4", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
      /* @__PURE__ */ jsx(Input, { placeholder: "Search conversations", className: "pl-9" })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "overflow-y-auto", children: conversations.length ? conversations.map((conversation) => /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => onSelect(conversation), className: `flex w-full items-start gap-3 border-b border-border px-4 py-3 text-left transition-colors ${active?.id === conversation.id ? "bg-primary/5" : "hover:bg-muted"}`, children: [
      /* @__PURE__ */ jsx("img", { src: conversation.otherUserAvatarUrl || "https://i.pravatar.cc/100?u=message-user", className: "h-10 w-10 rounded-full object-cover", alt: "" }),
      /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2", children: [
          /* @__PURE__ */ jsx("p", { className: "truncate text-sm font-semibold", children: conversation.otherUserName }),
          /* @__PURE__ */ jsx("span", { className: "text-[10px] text-muted-foreground", children: conversation.time })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "truncate text-xs text-muted-foreground", children: conversation.preview }),
        /* @__PURE__ */ jsxs("p", { className: "mt-1 truncate text-[10px] uppercase tracking-wider text-primary", children: [
          "re: ",
          conversation.job
        ] })
      ] }),
      conversation.unread > 0 ? /* @__PURE__ */ jsx("span", { className: "grid h-5 w-5 place-items-center rounded-full bg-cta text-[10px] font-bold text-cta-foreground", children: conversation.unread }) : null
    ] }, conversation.id)) : /* @__PURE__ */ jsx("div", { className: "p-6 text-sm text-muted-foreground", children: emptyText }) })
  ] });
}
function MessageHeader$1({
  active,
  activeCall,
  callSeconds,
  typingName,
  openCall,
  endCall,
  clearChat
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return /* @__PURE__ */ jsxs("header", { className: "flex items-center gap-3 border-b border-border p-4", children: [
    /* @__PURE__ */ jsx("img", { src: active.otherUserAvatarUrl || "https://i.pravatar.cc/100?u=message-user", className: "h-10 w-10 rounded-full object-cover", alt: "" }),
    /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
        /* @__PURE__ */ jsx("p", { className: "truncate text-sm font-semibold", children: active.otherUserName }),
        typingName ? /* @__PURE__ */ jsx(HeaderTypingDots$1, {}) : null,
        activeCall ? /* @__PURE__ */ jsx("span", { className: "rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase text-primary", children: activeCall.status === "active" ? formatCallDuration$1(callSeconds) : activeCall.status }) : null
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "truncate text-xs text-muted-foreground", children: [
        "re: ",
        active.job
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-1 text-muted-foreground", children: [
      activeCall ? /* @__PURE__ */ jsx("button", { type: "button", onClick: endCall, className: "grid h-9 w-9 place-items-center rounded-lg bg-destructive text-destructive-foreground hover:bg-destructive/90", "aria-label": "Hang up call", children: /* @__PURE__ */ jsx(PhoneOff, { className: "h-4 w-4" }) }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("button", { type: "button", onClick: () => openCall("voice"), className: "grid h-9 w-9 place-items-center rounded-lg hover:bg-muted hover:text-foreground", "aria-label": "Start voice call", children: /* @__PURE__ */ jsx(Phone, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsx("button", { type: "button", onClick: () => openCall("video"), className: "grid h-9 w-9 place-items-center rounded-lg hover:bg-muted hover:text-foreground", "aria-label": "Start video call", children: /* @__PURE__ */ jsx(Video, { className: "h-4 w-4" }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setIsMenuOpen((current) => !current), className: "grid h-9 w-9 place-items-center rounded-lg hover:bg-muted hover:text-foreground", children: /* @__PURE__ */ jsx(MoreHorizontal, { className: "h-4 w-4" }) }),
        isMenuOpen ? /* @__PURE__ */ jsx("div", { className: "absolute right-0 top-10 z-30 w-40 rounded-lg border border-border bg-card p-1 shadow-elevated", children: /* @__PURE__ */ jsx("button", { type: "button", onClick: () => {
          clearChat();
          setIsMenuOpen(false);
        }, className: "w-full rounded-md px-3 py-2 text-left text-sm text-destructive hover:bg-muted", children: "Clear chat" }) }) : null
      ] })
    ] })
  ] });
}
function InlineCallPanel$1({
  activeCall,
  callSeconds,
  otherUserName,
  localVideoRef,
  remoteVideoRef,
  remoteAudioRef,
  answerCall,
  endCall
}) {
  if (!activeCall) {
    return null;
  }
  return /* @__PURE__ */ jsx("div", { className: "border-b border-border bg-primary/5 p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3 rounded-xl border border-primary/20 bg-card p-4 shadow-soft sm:flex-row sm:items-center sm:justify-between", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsx("div", { className: "grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground", children: activeCall.mode === "video" ? /* @__PURE__ */ jsx(Video, { className: "h-5 w-5" }) : /* @__PURE__ */ jsx(Phone, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "font-semibold", children: activeCall.status === "incoming" ? "Incoming call" : activeCall.status === "outgoing" ? "Calling..." : formatCallDuration$1(callSeconds) }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
          activeCall.mode === "video" ? "Video call" : "Voice call",
          " with",
          " ",
          activeCall.status === "incoming" ? activeCall.fromName : otherUserName
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("audio", { ref: remoteAudioRef, autoPlay: true, playsInline: true }),
    activeCall.mode === "video" ? /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsx("video", { ref: remoteVideoRef, autoPlay: true, playsInline: true, className: "h-24 w-36 rounded-lg bg-foreground object-cover" }),
      /* @__PURE__ */ jsx("video", { ref: localVideoRef, autoPlay: true, playsInline: true, muted: true, className: "h-24 w-36 rounded-lg bg-foreground object-cover" })
    ] }) : null,
    /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
      activeCall.status === "incoming" ? /* @__PURE__ */ jsx(Button, { onClick: answerCall, children: "Answer" }) : null,
      /* @__PURE__ */ jsx(Button, { variant: "destructive", onClick: endCall, children: activeCall.status === "incoming" ? "Decline" : "Hang up" })
    ] })
  ] }) });
}
function MessageComposer$1({
  draft,
  setDraft,
  submitError,
  isSending,
  sendMessage,
  sendAttachment
}) {
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const fileInputRef = useRef(null);
  return /* @__PURE__ */ jsxs("footer", { className: "border-t border-border p-3", children: [
    submitError ? /* @__PURE__ */ jsx("p", { className: "mb-2 text-sm text-destructive", children: submitError }) : null,
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx("input", { ref: fileInputRef, type: "file", className: "hidden", onChange: (event) => {
        const file = event.target.files?.[0];
        if (file) {
          sendAttachment(file);
        }
        event.currentTarget.value = "";
      } }),
      /* @__PURE__ */ jsx("button", { type: "button", onClick: () => fileInputRef.current?.click(), className: "grid h-9 w-9 place-items-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground", "aria-label": "Attach file", children: /* @__PURE__ */ jsx(Paperclip, { className: "h-4 w-4" }) }),
      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setIsEmojiOpen((current) => !current), className: "grid h-9 w-9 place-items-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground", "aria-label": "Add emoji", children: /* @__PURE__ */ jsx(Smile, { className: "h-4 w-4" }) }),
        isEmojiOpen ? /* @__PURE__ */ jsx("div", { className: "absolute bottom-11 left-0 z-30 grid w-56 grid-cols-8 gap-1 rounded-xl border border-border bg-card p-2 shadow-elevated", children: EMOJIS$1.map((emoji) => /* @__PURE__ */ jsx("button", { type: "button", onClick: () => {
          setDraft(`${draft}${emoji}`);
          setIsEmojiOpen(false);
        }, className: "grid h-7 w-7 place-items-center rounded-md text-lg hover:bg-muted", children: emoji }, emoji)) }) : null
      ] }),
      /* @__PURE__ */ jsx(Input, { placeholder: "Type a message...", className: "flex-1", value: draft, onChange: (event) => setDraft(event.target.value), onKeyDown: (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          sendMessage();
        }
      } }),
      /* @__PURE__ */ jsx(Button, { className: "bg-cta text-cta-foreground hover:bg-cta/90", onClick: sendMessage, disabled: isSending, children: /* @__PURE__ */ jsx(Send, { className: "h-4 w-4" }) })
    ] })
  ] });
}
function MessageBubble$1({
  message,
  mine
}) {
  const isCallMessage = message.kind === "call" || message.body.startsWith("Call started:") || message.body === "Call ended.";
  if (message.kind === "attachment") {
    const attachment = parseAttachment$1(message.body);
    return /* @__PURE__ */ jsx("div", { className: `flex ${mine ? "justify-end" : "justify-start"}`, children: /* @__PURE__ */ jsxs("div", { className: `max-w-md rounded-2xl px-4 py-3 text-sm shadow-soft ${mine ? "bg-primary text-primary-foreground" : "bg-card text-foreground"}`, children: [
      attachment?.fileType.startsWith("image/") ? /* @__PURE__ */ jsx("img", { src: attachment.dataUrl, alt: "", className: "mb-3 max-h-56 rounded-xl object-cover" }) : null,
      /* @__PURE__ */ jsxs("a", { href: attachment?.dataUrl || "#", download: attachment?.fileName, className: `flex items-center gap-2 font-medium ${mine ? "text-primary-foreground" : "text-primary"}`, children: [
        /* @__PURE__ */ jsx(Paperclip, { className: "h-4 w-4" }),
        /* @__PURE__ */ jsx("span", { className: "truncate", children: attachment?.fileName || "Attachment" })
      ] }),
      attachment ? /* @__PURE__ */ jsx("p", { className: `mt-1 text-xs ${mine ? "text-primary-foreground/70" : "text-muted-foreground"}`, children: formatFileSize$4(attachment.fileSize) }) : null,
      /* @__PURE__ */ jsx("p", { className: `mt-1 text-[10px] ${mine ? "text-primary-foreground/70" : "text-muted-foreground"}`, children: new Date(message.createdAt).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit"
      }) })
    ] }) });
  }
  if (isCallMessage) {
    const isEnded = message.body === "Call ended." || message.body.includes("ended") || message.body.includes("canceled") || message.body.includes("declined");
    return /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxs("div", { className: "flex max-w-sm items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm shadow-soft", children: [
      /* @__PURE__ */ jsx("div", { className: `grid h-9 w-9 place-items-center rounded-full ${isEnded ? "bg-muted text-muted-foreground" : "bg-primary text-primary-foreground"}`, children: message.body.includes("Video") ? /* @__PURE__ */ jsx(Video, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(Phone, { className: "h-4 w-4" }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "font-medium", children: getCallHistoryTitle$1(message.body) }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: message.body.replace("Call started: ", "") })
      ] })
    ] }) });
  }
  return /* @__PURE__ */ jsx("div", { className: `flex ${mine ? "justify-end" : "justify-start"}`, children: /* @__PURE__ */ jsxs("div", { className: `max-w-md whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm shadow-soft ${mine ? "bg-primary text-primary-foreground" : "bg-card text-foreground"}`, children: [
    /* @__PURE__ */ jsx("p", { children: message.body }),
    /* @__PURE__ */ jsx("p", { className: `mt-1 text-[10px] ${mine ? "text-primary-foreground/70" : "text-muted-foreground"}`, children: new Date(message.createdAt).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit"
    }) })
  ] }) });
}
function TypingIndicator$1({
  name
}) {
  return /* @__PURE__ */ jsx("div", { className: "flex justify-start", children: /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-card px-4 py-2.5 text-sm shadow-soft", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-1 text-xs text-muted-foreground", children: [
      name,
      " is typing"
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex items-center gap-1", children: [0, 150, 300].map((delay) => /* @__PURE__ */ jsx("span", { className: "h-2 w-2 animate-bounce rounded-full bg-muted-foreground", style: {
      animationDelay: `${delay}ms`
    } }, delay)) })
  ] }) });
}
function HeaderTypingDots$1() {
  return /* @__PURE__ */ jsx("span", { className: "flex h-5 items-center gap-1 rounded-full bg-primary/10 px-2", "aria-label": "Typing", children: [0, 150, 300].map((delay) => /* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 animate-bounce rounded-full bg-primary", style: {
    animationDelay: `${delay}ms`
  } }, delay)) });
}
function EmptyConversation$1({
  text
}) {
  return /* @__PURE__ */ jsx("div", { className: "grid flex-1 place-items-center bg-surface p-6 text-center", children: /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("p", { className: "text-lg font-semibold", children: "No conversation selected" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: text })
  ] }) });
}
function getConversationFromSearch(searchString) {
  const search = new URLSearchParams(searchString);
  const conversationId = search.get("conversationId");
  const otherUserId = Number(search.get("toUserId"));
  if (!conversationId || !Number.isFinite(otherUserId)) {
    return null;
  }
  return {
    id: conversationId,
    otherUserId,
    otherUserName: search.get("name") || "Professional",
    otherUserAvatarUrl: search.get("avatar") || null,
    job: search.get("job") || "Direct message",
    preview: "Start conversation",
    time: "",
    unread: 0
  };
}
function peekPendingConversation() {
  return readPendingConversation();
}
function readPendingConversation() {
  try {
    const raw = sessionStorage.getItem("servio:pending-professional-message");
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw);
    if (!parsed.conversation?.id || !parsed.conversation.otherUserId) {
      return null;
    }
    if (parsed.createdAt && Date.now() - parsed.createdAt > 3e4) {
      sessionStorage.removeItem("servio:pending-professional-message");
      return null;
    }
    if (parsed.firstMessage) {
      sessionStorage.setItem(`servio:pending-first-message:${parsed.conversation.id}`, parsed.firstMessage);
    }
    return parsed.conversation;
  } catch {
    return null;
  }
}
function schedulePendingConversationClear(conversationId) {
  window.setTimeout(() => {
    try {
      const raw = sessionStorage.getItem("servio:pending-professional-message");
      if (!raw) {
        return;
      }
      const parsed = JSON.parse(raw);
      if (parsed.conversation?.id === conversationId) {
        sessionStorage.removeItem("servio:pending-professional-message");
      }
    } catch {
      sessionStorage.removeItem("servio:pending-professional-message");
    }
  }, 1500);
}
function getSearchFromHref(href) {
  const queryStart = href.indexOf("?");
  if (queryStart === -1) {
    return "";
  }
  const hashStart = href.indexOf("#", queryStart);
  return hashStart === -1 ? href.slice(queryStart) : href.slice(queryStart, hashStart);
}
function readPendingIncomingCall$1(viewerId) {
  try {
    const raw = sessionStorage.getItem("servio:pending-incoming-call");
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw);
    const call = parsed.call;
    if (!call?.callId || !call.conversationId || call.toUserId !== viewerId || !call.offer) {
      return null;
    }
    if (parsed.createdAt && Date.now() - parsed.createdAt > 6e4) {
      sessionStorage.removeItem("servio:pending-incoming-call");
      return null;
    }
    return call;
  } catch {
    return null;
  }
}
function clearPendingIncomingCall$1(callId) {
  try {
    const raw = sessionStorage.getItem("servio:pending-incoming-call");
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (parsed.call?.callId === callId) {
      sessionStorage.removeItem("servio:pending-incoming-call");
    }
  } catch {
    sessionStorage.removeItem("servio:pending-incoming-call");
  }
}
function buildConversationFromCall$1(payload) {
  return {
    id: payload.conversationId,
    otherUserId: payload.fromUserId,
    otherUserName: payload.fromName || "Caller",
    otherUserAvatarUrl: payload.fromAvatarUrl || null,
    job: payload.job || "Direct call",
    preview: `${getCallModeLabel$1(payload.mode || "voice")} call incoming`,
    time: formatTime$1((/* @__PURE__ */ new Date()).toISOString()),
    unread: 0
  };
}
function maybeSendFirstMessage(socket, viewer, conversation) {
  const search = new URLSearchParams(window.location.search);
  const pendingFirstMessageKey = `servio:pending-first-message:${conversation.id}`;
  const firstMessage = search.get("firstMessage") || sessionStorage.getItem(pendingFirstMessageKey);
  const firstKey = `socket-first-message:${conversation.id}:${viewer.id}`;
  if (!firstMessage || sessionStorage.getItem(firstKey)) {
    return;
  }
  sessionStorage.setItem(firstKey, "sent");
  sessionStorage.removeItem(pendingFirstMessageKey);
  socket.emit("message:send", {
    conversationId: conversation.id,
    senderId: viewer.id,
    receiverId: conversation.otherUserId,
    body: firstMessage,
    kind: "text",
    job: conversation.job,
    toUser: {
      id: conversation.otherUserId,
      name: conversation.otherUserName,
      avatarUrl: conversation.otherUserAvatarUrl
    },
    fromUser: {
      id: viewer.id,
      name: `${viewer.firstName} ${viewer.lastName}`.trim() || viewer.email,
      avatarUrl: viewer.avatarUrl
    }
  });
}
function storageKey$1(userId, suffix) {
  return `servio:socket:${userId}:${suffix}`;
}
function readJson$1(key, fallback) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}
function persistConversations$1(userId, conversations) {
  if (userId) {
    localStorage.setItem(storageKey$1(userId, "conversations"), JSON.stringify(conversations));
  }
  return conversations;
}
function persistMessages$1(userId, messagesByConversation) {
  if (userId) {
    localStorage.setItem(storageKey$1(userId, "messages"), JSON.stringify(messagesByConversation));
  }
  return messagesByConversation;
}
function upsertConversationList$1(conversations, conversation) {
  const withoutCurrent = conversations.filter((item) => item.id !== conversation.id);
  return [conversation, ...withoutCurrent];
}
function mergeConversationLists$1(primary, fallback) {
  const seen = /* @__PURE__ */ new Set();
  const merged = [];
  for (const conversation of [...primary, ...fallback]) {
    if (seen.has(conversation.id)) {
      continue;
    }
    seen.add(conversation.id);
    merged.push(conversation);
  }
  return merged;
}
function mergeMessagesByConversation$1(fallback, primary) {
  const conversationIds = /* @__PURE__ */ new Set([...Object.keys(fallback), ...Object.keys(primary)]);
  const merged = {};
  for (const conversationId of conversationIds) {
    const byId = /* @__PURE__ */ new Map();
    for (const message of [...fallback[conversationId] || [], ...primary[conversationId] || []]) {
      byId.set(message.id, message);
    }
    merged[conversationId] = Array.from(byId.values()).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  }
  return merged;
}
function formatTime$1(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit"
  });
}
function formatCallDuration$1(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
}
function getCallModeLabel$1(mode) {
  return mode === "video" ? "Video" : "Voice";
}
function getCallCloseHistoryBody$1(call) {
  const mode = getCallModeLabel$1(call.mode);
  if (call.status === "incoming") {
    return `${mode} call declined.`;
  }
  if (call.status === "outgoing") {
    return `${mode} call canceled.`;
  }
  const durationSeconds = call.startedAt ? Math.max(0, Math.floor((Date.now() - call.startedAt) / 1e3)) : 0;
  return `${mode} call ended (${formatCallDuration$1(durationSeconds)}).`;
}
function isVideoSourceError$1(error) {
  if (!(error instanceof DOMException)) {
    return false;
  }
  const message = error.message.toLowerCase();
  return ["NotReadableError", "AbortError", "NotFoundError", "OverconstrainedError"].includes(error.name) || message.includes("video source") || message.includes("camera");
}
function getCallHistoryTitle$1(body) {
  if (body.includes("declined")) {
    return "Call declined";
  }
  if (body.includes("canceled")) {
    return "Call canceled";
  }
  if (body.includes("answered")) {
    return "Call answered";
  }
  if (body.includes("ended") || body === "Call ended.") {
    return "Call ended";
  }
  return "Call started";
}
function getSocketUrl$7() {
  return `${window.location.protocol}//${window.location.hostname}:4001`;
}
const EMOJIS$1 = ["😀", "😁", "😂", "😊", "😍", "👍", "🙏", "🎉", "🔥", "✅", "❤️", "👌", "😎", "🤝", "💡", "⭐"];
const MAX_ATTACHMENT_BYTES$1 = 2 * 1024 * 1024;
function readFileAsDataUrl$2(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("Could not read this file."));
    reader.readAsDataURL(file);
  });
}
function parseAttachment$1(body) {
  try {
    return JSON.parse(body);
  } catch {
    return null;
  }
}
function getMessagePreview$1(message) {
  if (message.kind === "attachment") {
    const attachment = parseAttachment$1(message.body);
    return attachment ? `Attachment: ${attachment.fileName}` : "Attachment";
  }
  return message.body;
}
function formatFileSize$4(bytes) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
const Route$H = Route$I;
const Card = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cn("rounded-xl border bg-card text-card-foreground shadow", className),
      ...props
    }
  )
);
Card.displayName = "Card";
const CardHeader = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("flex flex-col space-y-1.5 p-6", className), ...props })
);
CardHeader.displayName = "CardHeader";
const CardTitle = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cn("font-semibold leading-none tracking-tight", className),
      ...props
    }
  )
);
CardTitle.displayName = "CardTitle";
const CardDescription = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("text-sm text-muted-foreground", className), ...props })
);
CardDescription.displayName = "CardDescription";
const CardContent = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("p-6 pt-0", className), ...props })
);
CardContent.displayName = "CardContent";
const CardFooter = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("flex items-center p-6 pt-0", className), ...props })
);
CardFooter.displayName = "CardFooter";
const Textarea = React.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "textarea",
      {
        className: cn(
          "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Textarea.displayName = "Textarea";
const teamSizeOptions$1 = ["Just me", "2-10 employees", "11-50 employees", "51-200 employees", "200+ employees"];
const suggestedHiringNeeds$1 = ["Web development", "Mobile app design", "SEO", "Content writing", "Customer support", "Bookkeeping", "Video editing", "Lead generation"];
const getMyInfoData = createServerFn({
  method: "GET"
}).handler(createSsrRpc("5745e5497e445555fa94b5b1a3b5f87f7888d3e78c9903ed7e454c57230d2aba"));
const updateMyInfo = createServerFn({
  method: "POST"
}).inputValidator((data) => clientProfileSchema.parse(data)).handler(createSsrRpc("2427e0ec35ea63d06c06b8c95f151e80ad322b163d72120613f30a0a1d824893"));
const Route$G = createFileRoute("/my-info")({
  beforeLoad: async ({
    location
  }) => {
    const data = await getMyInfoData();
    if (!data) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href
        }
      });
    }
  },
  loader: () => getMyInfoData(),
  head: () => ({
    meta: [{
      title: "My Info - Servio"
    }]
  }),
  component: MyInfoPage
});
function MyInfoPage() {
  const data = useLoaderData({
    from: "/my-info"
  });
  const [successMessage, setSuccessMessage2] = useState(null);
  const [submitError, setSubmitError2] = useState(null);
  const [newLocationLabel, setNewLocationLabel2] = useState("");
  const [newLocationAddress, setNewLocationAddress2] = useState("");
  const [newHiringNeed, setNewHiringNeed2] = useState("");
  const [profilePhotoPreview, setProfilePhotoPreview2] = useState(data?.clientProfile?.avatarUrl ?? "");
  const [isEditing, setIsEditing] = useState(false);
  if (!data) {
    return null;
  }
  const {
    viewer,
    clientProfile,
    favoriteJobs
  } = data;
  const displayName = clientProfile?.fullName || `${viewer.firstName} ${viewer.lastName}`.trim();
  const form = useForm({
    resolver: zodResolver(clientProfileSchema),
    defaultValues: {
      fullName: clientProfile?.fullName ?? `${viewer.firstName} ${viewer.lastName}`.trim(),
      email: clientProfile?.email ?? viewer.email,
      phone: clientProfile?.phone ?? viewer.phone ?? "",
      companyName: clientProfile?.companyName ?? "",
      companyWebsite: clientProfile?.companyWebsite ?? "",
      industry: clientProfile?.industry ?? "",
      teamSize: clientProfile?.teamSize ?? "",
      companyDescription: clientProfile?.companyDescription ?? "",
      address: clientProfile?.address ?? "",
      profilePhotoUrl: clientProfile?.avatarUrl ?? viewer.avatarUrl ?? "",
      savedLocations: clientProfile?.savedLocations?.length ? clientProfile.savedLocations.map((location) => ({
        label: location.label,
        address: location.address
      })) : [{
        label: "Primary office",
        address: ""
      }],
      hiringNeeds: clientProfile?.hiringNeeds?.length ? clientProfile.hiringNeeds : []
    }
  });
  const savedLocations = form.watch("savedLocations");
  const hiringNeeds = form.watch("hiringNeeds");
  const primaryLocationAddress = form.watch("address")?.trim() || savedLocations?.[0]?.address?.trim() || clientProfile?.address?.trim() || clientProfile?.savedLocations?.[0]?.address?.trim() || "";
  const profileImage = profilePhotoPreview || clientProfile?.avatarUrl || viewer.avatarUrl || "https://i.pravatar.cc/120?u=client-my-info";
  async function handlePhotoUpload(file) {
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      setProfilePhotoPreview2(result);
      form.setValue("profilePhotoUrl", result, {
        shouldValidate: true
      });
    };
    reader.readAsDataURL(file);
  }
  const addSavedLocation = () => {
    if (!newLocationLabel.trim() || !newLocationAddress.trim()) {
      setSubmitError2("Enter both a location label and address before adding it.");
      return;
    }
    setSubmitError2(null);
    form.setValue("savedLocations", [...savedLocations, {
      label: newLocationLabel.trim(),
      address: newLocationAddress.trim()
    }], {
      shouldValidate: true
    });
    setNewLocationLabel2("");
    setNewLocationAddress2("");
  };
  const removeSavedLocation = (index) => {
    form.setValue("savedLocations", savedLocations.filter((_, currentIndex) => currentIndex !== index), {
      shouldValidate: true
    });
  };
  const addHiringNeed = (value) => {
    const nextNeed = (value ?? newHiringNeed).trim();
    if (!nextNeed) {
      setSubmitError2("Add at least one skill or hiring need before saving.");
      return;
    }
    if (hiringNeeds.some((need) => need.toLowerCase() === nextNeed.toLowerCase())) {
      setSubmitError2("That skill is already listed.");
      return;
    }
    setSubmitError2(null);
    form.setValue("hiringNeeds", [...hiringNeeds, nextNeed], {
      shouldValidate: true
    });
    setNewHiringNeed2("");
  };
  const removeHiringNeed = (needToRemove) => {
    form.setValue("hiringNeeds", hiringNeeds.filter((need) => need !== needToRemove), {
      shouldValidate: true
    });
  };
  const onSubmit = async (values) => {
    setSuccessMessage2(null);
    setSubmitError2(null);
    const result = await updateMyInfo({
      data: values
    });
    if (!result.ok) {
      setSubmitError2(result.formError);
      return;
    }
    if (result.profile) {
      form.reset({
        fullName: result.profile.fullName,
        email: result.profile.email,
        phone: result.profile.phone,
        companyName: result.profile.companyName,
        companyWebsite: result.profile.companyWebsite,
        industry: result.profile.industry,
        teamSize: result.profile.teamSize,
        companyDescription: result.profile.companyDescription,
        address: result.profile.address,
        profilePhotoUrl: result.profile.avatarUrl ?? "",
        savedLocations: result.profile.savedLocations,
        hiringNeeds: result.profile.hiringNeeds
      });
      setProfilePhotoPreview2(result.profile.avatarUrl ?? "");
    }
    setSuccessMessage2("Your client information has been updated successfully.");
    setIsEditing(false);
  };
  if (!isEditing) {
    return /* @__PURE__ */ jsx(AppShell, { title: "My profile", userName: displayName, userRole: "Client", userAvatarUrl: profileImage, children: /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsx(Card, { className: "border-border shadow-soft", children: /* @__PURE__ */ jsx(CardContent, { className: "p-6", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6 md:flex-row md:items-start md:justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
          /* @__PURE__ */ jsx("img", { src: profileImage, alt: displayName, className: "h-24 w-24 rounded-2xl object-cover" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm text-primary", children: [
              /* @__PURE__ */ jsx(UserRound, { className: "h-4 w-4" }),
              "Client profile"
            ] }),
            /* @__PURE__ */ jsx("h1", { className: "mt-2 text-2xl font-semibold tracking-tight", children: displayName || "Client" }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-muted-foreground", children: clientProfile?.companyName || "Company not added" }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 max-w-2xl text-sm text-muted-foreground", children: clientProfile?.companyDescription || "No company description added yet." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Button, { type: "button", onClick: () => setIsEditing(true), className: "gap-2", children: [
          /* @__PURE__ */ jsx(Pencil, { className: "h-4 w-4" }),
          "Edit profile"
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsxs("div", { className: "grid gap-6 lg:grid-cols-[1.35fr_1fr]", children: [
        /* @__PURE__ */ jsxs(Card, { className: "border-border shadow-soft", children: [
          /* @__PURE__ */ jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsx(CardTitle, { children: "Profile information" }),
            /* @__PURE__ */ jsx(CardDescription, { children: "All information saved from the client profile setup." })
          ] }),
          /* @__PURE__ */ jsxs(CardContent, { className: "grid gap-3 sm:grid-cols-2", children: [
            /* @__PURE__ */ jsx(SummaryItem, { label: "Contact name", value: form.watch("fullName") || "Not added" }),
            /* @__PURE__ */ jsx(SummaryItem, { label: "Email", value: form.watch("email") || "Not added" }),
            /* @__PURE__ */ jsx(SummaryItem, { label: "Phone", value: form.watch("phone") || "Not added" }),
            /* @__PURE__ */ jsx(SummaryItem, { label: "Company", value: form.watch("companyName") || "Not added" }),
            /* @__PURE__ */ jsx(SummaryItem, { label: "Website", value: form.watch("companyWebsite") || "Not added" }),
            /* @__PURE__ */ jsx(SummaryItem, { label: "Industry", value: form.watch("industry") || "Not added" }),
            /* @__PURE__ */ jsx(SummaryItem, { label: "Team size", value: form.watch("teamSize") || "Not added" }),
            /* @__PURE__ */ jsx(SummaryItem, { label: "Main address", value: form.watch("address") || "Not added" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs(Card, { className: "border-border shadow-soft", children: [
            /* @__PURE__ */ jsxs(CardHeader, { children: [
              /* @__PURE__ */ jsx(CardTitle, { children: "Hiring needs" }),
              /* @__PURE__ */ jsx(CardDescription, { children: "Skills and services this client hires for." })
            ] }),
            /* @__PURE__ */ jsx(CardContent, { className: "flex flex-wrap gap-2", children: hiringNeeds.length ? hiringNeeds.map((need) => /* @__PURE__ */ jsx("span", { className: "rounded-full border border-border bg-muted/30 px-3 py-1 text-sm", children: need }, need)) : /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "No hiring needs added yet." }) })
          ] }),
          /* @__PURE__ */ jsx(ClientLocationMap, { locationAddress: primaryLocationAddress }),
          /* @__PURE__ */ jsxs(Card, { className: "border-border shadow-soft", children: [
            /* @__PURE__ */ jsxs(CardHeader, { children: [
              /* @__PURE__ */ jsx(CardTitle, { children: "Saved locations" }),
              /* @__PURE__ */ jsx(CardDescription, { children: "Addresses saved for job posting and matching." })
            ] }),
            /* @__PURE__ */ jsx(CardContent, { className: "space-y-3", children: savedLocations.filter((location) => location.address).length ? savedLocations.filter((location) => location.address).map((location, index) => /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-border bg-muted/30 p-4", children: [
              /* @__PURE__ */ jsx("p", { className: "font-medium", children: location.label || "Saved location" }),
              /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: location.address })
            ] }, `${location.label}-${index}`)) : /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "No saved locations added yet." }) })
          ] })
        ] })
      ] })
    ] }) });
  }
  return /* @__PURE__ */ jsx(AppShell, { title: "My info", userName: displayName, userRole: "Client", userAvatarUrl: profilePhotoPreview || clientProfile?.avatarUrl || viewer.avatarUrl, children: /* @__PURE__ */ jsxs("div", { className: "grid gap-6 lg:grid-cols-[1.45fr_1fr]", children: [
    /* @__PURE__ */ jsxs(Card, { className: "border-border shadow-soft", children: [
      /* @__PURE__ */ jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm text-primary", children: [
          /* @__PURE__ */ jsx(UserRound, { className: "h-4 w-4" }),
          "Client account information"
        ] }),
        /* @__PURE__ */ jsx(CardTitle, { children: "Edit your onboarding details" }),
        /* @__PURE__ */ jsx(CardDescription, { children: "Everything the client entered during signup onboarding can be reviewed and updated here." })
      ] }),
      /* @__PURE__ */ jsx(CardContent, { className: "space-y-6", children: /* @__PURE__ */ jsx(Form, { ...form, children: /* @__PURE__ */ jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 rounded-2xl border border-border bg-muted/40 p-4", children: [
          /* @__PURE__ */ jsx("img", { src: profilePhotoPreview || clientProfile?.avatarUrl || viewer.avatarUrl || "https://i.pravatar.cc/120?u=client-my-info", alt: displayName, className: "h-20 w-20 rounded-2xl object-cover" }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 space-y-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsx(ImagePlus, { className: "h-4 w-4" }),
              "Company or profile photo"
            ] }),
            /* @__PURE__ */ jsx(Input, { type: "file", accept: "image/*", onChange: (event) => handlePhotoUpload(event.target.files?.[0]) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsx(FormField, { control: form.control, name: "fullName", render: ({
            field
          }) => /* @__PURE__ */ jsxs(FormItem, { children: [
            /* @__PURE__ */ jsx(FormLabel, { children: "Contact name" }),
            /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { placeholder: "Alex Rivers", ...field }) }),
            /* @__PURE__ */ jsx(FormMessage, {})
          ] }) }),
          /* @__PURE__ */ jsx(FormField, { control: form.control, name: "companyName", render: ({
            field
          }) => /* @__PURE__ */ jsxs(FormItem, { children: [
            /* @__PURE__ */ jsx(FormLabel, { children: "Company name" }),
            /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { placeholder: "Northwind Studio", ...field }) }),
            /* @__PURE__ */ jsx(FormMessage, {})
          ] }) }),
          /* @__PURE__ */ jsx(FormField, { control: form.control, name: "email", render: ({
            field
          }) => /* @__PURE__ */ jsxs(FormItem, { children: [
            /* @__PURE__ */ jsx(FormLabel, { children: "Email" }),
            /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { type: "email", placeholder: "you@example.com", ...field }) }),
            /* @__PURE__ */ jsx(FormMessage, {})
          ] }) }),
          /* @__PURE__ */ jsx(FormField, { control: form.control, name: "phone", render: ({
            field
          }) => /* @__PURE__ */ jsxs(FormItem, { children: [
            /* @__PURE__ */ jsx(FormLabel, { children: "Phone" }),
            /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { placeholder: "9876543210", ...field }) }),
            /* @__PURE__ */ jsx(FormMessage, {})
          ] }) }),
          /* @__PURE__ */ jsx(FormField, { control: form.control, name: "companyWebsite", render: ({
            field
          }) => /* @__PURE__ */ jsxs(FormItem, { children: [
            /* @__PURE__ */ jsx(FormLabel, { children: "Company website" }),
            /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { placeholder: "https://yourcompany.com", ...field }) }),
            /* @__PURE__ */ jsx(FormMessage, {})
          ] }) }),
          /* @__PURE__ */ jsx(FormField, { control: form.control, name: "industry", render: ({
            field
          }) => /* @__PURE__ */ jsxs(FormItem, { children: [
            /* @__PURE__ */ jsx(FormLabel, { children: "Industry" }),
            /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { placeholder: "SaaS, e-commerce, healthcare...", ...field }) }),
            /* @__PURE__ */ jsx(FormMessage, {})
          ] }) }),
          /* @__PURE__ */ jsx(FormField, { control: form.control, name: "teamSize", render: ({
            field
          }) => /* @__PURE__ */ jsxs(FormItem, { children: [
            /* @__PURE__ */ jsx(FormLabel, { children: "Team size" }),
            /* @__PURE__ */ jsxs(Select, { value: field.value, onValueChange: field.onChange, children: [
              /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select your team size" }) }) }),
              /* @__PURE__ */ jsx(SelectContent, { children: teamSizeOptions$1.map((option) => /* @__PURE__ */ jsx(SelectItem, { value: option, children: option }, option)) })
            ] }),
            /* @__PURE__ */ jsx(FormMessage, {})
          ] }) })
        ] }),
        /* @__PURE__ */ jsx(FormField, { control: form.control, name: "companyDescription", render: ({
          field
        }) => /* @__PURE__ */ jsxs(FormItem, { children: [
          /* @__PURE__ */ jsx(FormLabel, { children: "About your company" }),
          /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Textarea, { className: "min-h-28", placeholder: "Describe your company, typical projects, and how you like to work with freelancers.", ...field }) }),
          /* @__PURE__ */ jsx(FormMessage, {})
        ] }) }),
        /* @__PURE__ */ jsx(FormField, { control: form.control, name: "address", render: ({
          field
        }) => /* @__PURE__ */ jsxs(FormItem, { children: [
          /* @__PURE__ */ jsx(FormLabel, { children: "Primary company location" }),
          /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Textarea, { className: "min-h-24", placeholder: "Full office or billing address", ...field }) }),
          /* @__PURE__ */ jsx(FormMessage, {})
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm font-medium text-foreground", children: [
            /* @__PURE__ */ jsx(MapPinHouse, { className: "h-4 w-4 text-primary" }),
            "Saved locations"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid gap-3 rounded-2xl border border-border bg-muted/40 p-4 sm:grid-cols-[180px_1fr_auto]", children: [
            /* @__PURE__ */ jsx(Input, { placeholder: "Location label", value: newLocationLabel, onChange: (event) => setNewLocationLabel2(event.target.value) }),
            /* @__PURE__ */ jsx(Input, { placeholder: "Address", value: newLocationAddress, onChange: (event) => setNewLocationAddress2(event.target.value) }),
            /* @__PURE__ */ jsx(Button, { type: "button", onClick: addSavedLocation, children: "Add" })
          ] }),
          savedLocations.map((location, index) => /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3 rounded-2xl border border-border bg-muted/30 p-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "font-medium", children: location.label }),
              /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: location.address })
            ] }),
            /* @__PURE__ */ jsx(Button, { type: "button", variant: "outline", onClick: () => removeSavedLocation(index), children: "Remove" })
          ] }, `${location.label}-${index}`)),
          /* @__PURE__ */ jsx(FormField, { control: form.control, name: "savedLocations", render: () => /* @__PURE__ */ jsx(FormItem, { children: /* @__PURE__ */ jsx(FormMessage, {}) }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm font-medium text-foreground", children: [
            /* @__PURE__ */ jsx(BriefcaseBusiness, { className: "h-4 w-4 text-primary" }),
            "Hiring needs"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-border bg-muted/40 p-4", children: [
            /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: suggestedHiringNeeds$1.map((need) => /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => addHiringNeed(need), className: "rounded-full border border-border bg-background px-3 py-1.5 text-sm transition-colors hover:border-primary hover:text-primary", children: [
              "+ ",
              need
            ] }, need)) }),
            /* @__PURE__ */ jsxs("div", { className: "mt-4 grid gap-3 sm:grid-cols-[1fr_auto]", children: [
              /* @__PURE__ */ jsx(Input, { placeholder: "Add a custom hiring need", value: newHiringNeed, onChange: (event) => setNewHiringNeed2(event.target.value) }),
              /* @__PURE__ */ jsx(Button, { type: "button", onClick: () => addHiringNeed(), children: "Add skill" })
            ] })
          ] }),
          hiringNeeds.map((need) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between rounded-2xl border border-border bg-muted/30 px-4 py-3", children: [
            /* @__PURE__ */ jsx("span", { className: "font-medium", children: need }),
            /* @__PURE__ */ jsx("button", { type: "button", onClick: () => removeHiringNeed(need), className: "rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground", "aria-label": `Remove ${need}`, children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }) })
          ] }, need)),
          /* @__PURE__ */ jsx(FormField, { control: form.control, name: "hiringNeeds", render: () => /* @__PURE__ */ jsx(FormItem, { children: /* @__PURE__ */ jsx(FormMessage, {}) }) })
        ] }),
        submitError ? /* @__PURE__ */ jsx("div", { className: "rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive", children: submitError }) : null,
        successMessage ? /* @__PURE__ */ jsx("div", { className: "rounded-xl border border-success/20 bg-success/5 px-4 py-3 text-sm text-success", children: successMessage }) : null,
        /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxs(Button, { type: "submit", children: [
            /* @__PURE__ */ jsx(Save, { className: "h-4 w-4" }),
            "Save changes"
          ] }),
          /* @__PURE__ */ jsx(Button, { type: "button", variant: "outline", onClick: () => setIsEditing(false), children: "Cancel" })
        ] })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs(Card, { className: "border-border shadow-soft", children: [
        /* @__PURE__ */ jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm text-primary", children: [
            /* @__PURE__ */ jsx(Building2, { className: "h-4 w-4" }),
            "Company summary"
          ] }),
          /* @__PURE__ */ jsx(CardTitle, { children: "Current company profile" }),
          /* @__PURE__ */ jsx(CardDescription, { children: "A quick view of the client information currently saved from onboarding." })
        ] }),
        /* @__PURE__ */ jsxs(CardContent, { className: "space-y-3", children: [
          /* @__PURE__ */ jsx(SummaryItem, { label: "Company", value: form.watch("companyName") || "Not added" }),
          /* @__PURE__ */ jsx(SummaryItem, { label: "Industry", value: form.watch("industry") || "Not added" }),
          /* @__PURE__ */ jsx(SummaryItem, { label: "Team size", value: form.watch("teamSize") || "Not added" }),
          /* @__PURE__ */ jsx(SummaryItem, { label: "Website", value: form.watch("companyWebsite") || "Not added" })
        ] })
      ] }),
      /* @__PURE__ */ jsx(ClientLocationMap, { locationAddress: primaryLocationAddress }),
      /* @__PURE__ */ jsxs(Card, { className: "border-border shadow-soft", children: [
        /* @__PURE__ */ jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm text-primary", children: [
            /* @__PURE__ */ jsx(BriefcaseBusiness, { className: "h-4 w-4" }),
            "Hiring summary"
          ] }),
          /* @__PURE__ */ jsx(CardTitle, { children: "What this client hires for" }),
          /* @__PURE__ */ jsx(CardDescription, { children: "These skills now come from the onboarding flow and can be changed anytime here." })
        ] }),
        /* @__PURE__ */ jsx(CardContent, { className: "flex flex-wrap gap-2", children: hiringNeeds.map((need) => /* @__PURE__ */ jsx("span", { className: "rounded-full border border-border bg-muted/30 px-3 py-1 text-sm", children: need }, need)) })
      ] }),
      /* @__PURE__ */ jsxs(Card, { className: "border-border shadow-soft", children: [
        /* @__PURE__ */ jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm text-primary", children: [
            /* @__PURE__ */ jsx(Heart, { className: "h-4 w-4" }),
            "Saved favorites"
          ] }),
          /* @__PURE__ */ jsx(CardTitle, { children: "Favorite jobs" }),
          /* @__PURE__ */ jsx(CardDescription, { children: "Jobs you saved from the home page or job details." })
        ] }),
        /* @__PURE__ */ jsx(CardContent, { className: "space-y-3", children: favoriteJobs.length ? favoriteJobs.map((job) => /* @__PURE__ */ jsxs(Link, { to: "/job/$jobId", params: {
          jobId: String(job.id)
        }, className: "block rounded-2xl border border-border bg-muted/30 p-4 transition-colors hover:border-primary/40 hover:bg-primary/5", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsx("p", { className: "line-clamp-2 font-medium", children: job.title }),
              /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: job.category })
            ] }),
            /* @__PURE__ */ jsx(Heart, { className: "h-4 w-4 shrink-0 fill-primary text-primary" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-3 grid gap-2 text-xs text-muted-foreground sm:grid-cols-2", children: [
            /* @__PURE__ */ jsx("span", { children: formatBudget$6(job.budgetMin, job.budgetMax, job.timingType) }),
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(CalendarDays, { className: "h-3.5 w-3.5" }),
              formatDate$6(job.deadline)
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "flex min-w-0 items-center gap-1 sm:col-span-2", children: [
              /* @__PURE__ */ jsx(MapPin, { className: "h-3.5 w-3.5 shrink-0" }),
              /* @__PURE__ */ jsx("span", { className: "truncate", children: formatApproximateLocation(job.locationAddress || job.locationLabel, "Remote job") })
            ] })
          ] })
        ] }, job.id)) : /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-dashed border-border bg-muted/30 p-5 text-center", children: [
          /* @__PURE__ */ jsx(Heart, { className: "mx-auto h-7 w-7 text-muted-foreground" }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm font-medium", children: "No favorite jobs saved yet" }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Save jobs from the home page and they will appear here." })
        ] }) })
      ] })
    ] })
  ] }) });
}
function ClientLocationMap({
  locationAddress
}) {
  const [currentCoords, setCurrentCoords] = useState(null);
  const [isLocating, setIsLocating] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const query = currentCoords ? `${currentCoords.lat},${currentCoords.lng}` : locationAddress.trim();
  const mapSrc = query ? `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed` : "";
  const handleUseMyLocation = () => {
    if (!navigator?.geolocation) {
      setStatusMessage("Location is not supported by this browser.");
      return;
    }
    setIsLocating(true);
    setStatusMessage(null);
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentCoords({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
      setStatusMessage("Showing your current location on the map.");
      setIsLocating(false);
    }, (error) => {
      setStatusMessage(error.message || "Could not get your location.");
      setIsLocating(false);
    }, {
      enableHighAccuracy: true,
      timeout: 1e4
    });
  };
  return /* @__PURE__ */ jsxs(Card, { className: "border-border shadow-soft", children: [
    /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(CardTitle, { children: "Client location map" }),
        /* @__PURE__ */ jsx(CardDescription, { children: "Small embedded Google map for the current client address." })
      ] }),
      /* @__PURE__ */ jsx(Button, { size: "sm", variant: "outline", onClick: handleUseMyLocation, disabled: isLocating, children: isLocating ? "Locating..." : "Use my location" })
    ] }) }),
    /* @__PURE__ */ jsxs(CardContent, { className: "space-y-3", children: [
      /* @__PURE__ */ jsx("div", { className: "rounded-2xl border border-border overflow-hidden bg-muted/40", children: mapSrc ? /* @__PURE__ */ jsx("iframe", { title: "Client location map", src: mapSrc, className: "h-44 w-full", loading: "lazy", referrerPolicy: "no-referrer-when-downgrade" }) : /* @__PURE__ */ jsx("div", { className: "flex h-44 items-center justify-center px-4 text-sm text-muted-foreground", children: "Add an address to your profile or use your location to show the map here." }) }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: currentCoords ? `Current location: ${currentCoords.lat.toFixed(4)}, ${currentCoords.lng.toFixed(4)}` : locationAddress ? locationAddress : "No location is available yet." }),
      statusMessage ? /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: statusMessage }) : null
    ] })
  ] });
}
function formatBudget$6(min, max, timingType = "FIXED") {
  const suffix = getBudgetSuffix$6(timingType);
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
function getBudgetSuffix$6(timingType) {
  if (timingType === "HOURLY") {
    return " / hour";
  }
  if (timingType === "WEEKLY") {
    return " / week";
  }
  return "";
}
function formatDate$6(value) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(value));
}
function SummaryItem({
  label,
  value
}) {
  return /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-border bg-muted/30 p-4", children: [
    /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: label }),
    /* @__PURE__ */ jsx("p", { className: "mt-1 font-medium", children: value })
  ] });
}
const Route$F = Route$G;
const tabs = ["All", "Projects", "Work", "Messages", "Payments", "Reviews"];
const getNotificationsPageData = createServerFn({
  method: "GET"
}).handler(createSsrRpc("08fd37130d4793ce5d4c55b60a23ef25090c5fe2a3d46a7766c0d385178406f9"));
const markNotificationsRead = createServerFn({
  method: "POST"
}).handler(createSsrRpc("5617dd59ed60c0d159164207db053e3ad2ccdb8abef223e148530dcdfcafa6f1"));
const clearNotifications = createServerFn({
  method: "POST"
}).handler(createSsrRpc("cf6c7a846eb399b5fce248e1b1973906faf891dc04c7cdefd0db732ded84c101"));
const updateBrowserNotifications = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(createSsrRpc("e0c85f1131201062c5b88ab1131561692d37ca7915f418c4705f581ad85ddb77"));
const Route$E = createFileRoute("/notifications")({
  beforeLoad: async ({
    location
  }) => {
    const data = await getNotificationsPageData();
    if (!data) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href
        }
      });
    }
  },
  loader: () => getNotificationsPageData(),
  head: () => ({
    meta: [{
      title: "Notifications - Servio"
    }]
  }),
  component: Notifications
});
function Notifications() {
  const data = useLoaderData({
    from: "/notifications"
  });
  const router2 = useRouter();
  const [tab, setTab] = useState("All");
  const [isUpdating, setIsUpdating] = useState(false);
  const [browserPermission, setBrowserPermission] = useState("unsupported");
  const notifications = data.notifications;
  const filtered = notifications.filter((notification) => matchesTab(notification.type, tab));
  const unreadCount = notifications.filter((notification) => !notification.readAt).length;
  const userName = `${data.viewer.firstName} ${data.viewer.lastName}`.trim() || data.viewer.email || "User";
  const userRole = data.viewer.role === "ADMIN" ? "Admin" : data.viewer.role === "PROFESSIONAL" ? "Professional" : "Client";
  const browserAlertsOn = data.preferences.browserNotificationsEnabled && data.preferences.projectActivityNotificationsEnabled && browserPermission === "granted";
  useEffect(() => {
    setBrowserPermission("Notification" in window ? Notification.permission : "unsupported");
  }, []);
  const runAction = async (action) => {
    setIsUpdating(true);
    try {
      if (action === "read") {
        await markNotificationsRead();
      } else {
        await clearNotifications();
      }
      await router2.invalidate();
    } finally {
      setIsUpdating(false);
    }
  };
  const toggleBrowserAlerts = async () => {
    if (!("Notification" in window)) {
      setBrowserPermission("unsupported");
      return;
    }
    setIsUpdating(true);
    try {
      let permission = Notification.permission;
      if (permission === "default") {
        permission = await Notification.requestPermission();
        setBrowserPermission(permission);
      }
      const enabled = permission === "granted" && !browserAlertsOn;
      await updateBrowserNotifications({
        data: {
          enabled
        }
      });
      await router2.invalidate();
    } finally {
      setIsUpdating(false);
    }
  };
  return /* @__PURE__ */ jsxs(AppShell, { userName, userRole, userAvatarUrl: data.viewer.avatarUrl, children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-6 flex flex-wrap items-end justify-between gap-3", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-2xl font-semibold tracking-tight", children: "Notifications" }),
          unreadCount ? /* @__PURE__ */ jsxs(Badge, { children: [
            unreadCount,
            " unread"
          ] }) : null
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Database updates for messages, project requests, uploaded work, and account activity." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2", children: [
        /* @__PURE__ */ jsxs(Button, { variant: "outline", size: "sm", className: "gap-2", disabled: !notifications.length || isUpdating, onClick: () => void runAction("read"), children: [
          /* @__PURE__ */ jsx(CheckCheck, { className: "h-4 w-4" }),
          "Mark all read"
        ] }),
        /* @__PURE__ */ jsxs(Button, { variant: "outline", size: "sm", className: "gap-2", disabled: !notifications.length || isUpdating, onClick: () => void runAction("clear"), children: [
          /* @__PURE__ */ jsx(BellOff, { className: "h-4 w-4" }),
          "Clear"
        ] }),
        /* @__PURE__ */ jsxs(Button, { variant: browserAlertsOn ? "default" : "outline", size: "sm", className: "gap-2", disabled: isUpdating || browserPermission === "denied" || browserPermission === "unsupported", onClick: () => void toggleBrowserAlerts(), children: [
          /* @__PURE__ */ jsx(BellRing, { className: "h-4 w-4" }),
          browserAlertsOn ? "Browser alerts on" : "Enable browser alerts"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mb-6 grid gap-3 rounded-lg border border-border bg-card p-4 text-sm shadow-soft sm:grid-cols-2", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "font-medium", children: "Email notifications" }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-muted-foreground", children: data.preferences.emailNotificationsEnabled ? "Project requests, acceptances, and status updates can be sent to your account email." : "Email notifications are off in your profile settings." })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "font-medium", children: "Browser notifications" }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-muted-foreground", children: browserPermission === "denied" ? "Browser permission is blocked. Enable it from your browser site settings." : browserPermission === "unsupported" ? "This browser does not support desktop notifications." : browserAlertsOn ? "Realtime project activity can appear as browser alerts." : "Enable alerts to see realtime project activity while Servio is open." })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "overflow-hidden rounded-lg border border-border bg-card shadow-soft", children: [
      /* @__PURE__ */ jsx("div", { className: "flex gap-1 overflow-x-auto border-b border-border p-2", children: tabs.map((item) => /* @__PURE__ */ jsx("button", { onClick: () => setTab(item), className: `whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors ${tab === item ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`, children: item }, item)) }),
      filtered.length ? /* @__PURE__ */ jsx("ul", { className: "divide-y divide-border", children: filtered.map((notification) => {
        const Icon = iconFor(notification.type);
        const unread = !notification.readAt;
        return /* @__PURE__ */ jsxs("li", { className: `flex flex-col gap-4 p-5 transition-colors hover:bg-muted/40 sm:flex-row ${unread ? "bg-primary/[0.03]" : ""}`, children: [
          /* @__PURE__ */ jsx("span", { className: `grid h-10 w-10 shrink-0 place-items-center rounded-lg ${tintFor(notification.type)}`, children: /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5" }) }),
          /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
              /* @__PURE__ */ jsx("p", { className: "font-medium", children: notification.title }),
              unread ? /* @__PURE__ */ jsx("span", { className: "h-2 w-2 rounded-full bg-primary" }) : null
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: notification.description }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs text-muted-foreground", children: formatNotificationTime(notification.createdAt) })
          ] }),
          /* @__PURE__ */ jsx(Button, { asChild: true, variant: "ghost", size: "sm", className: "self-start", children: /* @__PURE__ */ jsx("a", { href: notification.href, children: "View" }) })
        ] }, notification.key);
      }) }) : /* @__PURE__ */ jsxs("div", { className: "grid place-items-center px-6 py-16 text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "grid h-12 w-12 place-items-center rounded-full bg-muted text-muted-foreground", children: /* @__PURE__ */ jsx(BellOff, { className: "h-6 w-6" }) }),
        /* @__PURE__ */ jsx("h2", { className: "mt-4 text-lg font-semibold", children: "No notifications" }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 max-w-md text-sm text-muted-foreground", children: "New messages, project requests, accepted work, and uploaded files will appear here." })
      ] })
    ] })
  ] });
}
function matchesTab(type, tab) {
  if (tab === "All") {
    return true;
  }
  if (tab === "Projects") {
    return type === "project";
  }
  if (tab === "Work") {
    return type === "work";
  }
  if (tab === "Messages") {
    return type === "message";
  }
  if (tab === "Payments") {
    return type === "payment";
  }
  return type === "review";
}
function iconFor(type) {
  if (type === "project") {
    return Briefcase;
  }
  if (type === "work") {
    return FileText;
  }
  if (type === "message") {
    return MessageSquare;
  }
  if (type === "payment") {
    return Wallet$1;
  }
  return Star;
}
function tintFor(type) {
  if (type === "project") {
    return "bg-primary/10 text-primary";
  }
  if (type === "work") {
    return "bg-blue-50 text-blue-700";
  }
  if (type === "message") {
    return "bg-success/15 text-success";
  }
  if (type === "payment") {
    return "bg-warning/15 text-warning-foreground";
  }
  return "bg-muted text-muted-foreground";
}
function formatNotificationTime(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  }).format(date);
}
const Route$D = Route$E;
function SearchLocation({
  onSelect,
  placeholder = "Search address, city, postal code..."
}) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }
    const id = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=jsonv2&q=${encodeURIComponent(query)}&addressdetails=1&limit=5`
        );
        const data = await res.json();
        setSuggestions(data || []);
      } catch (e) {
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, 300);
    return () => clearTimeout(id);
  }, [query]);
  return /* @__PURE__ */ jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsx(
      "input",
      {
        className: "w-full rounded-md border px-3 py-2",
        placeholder,
        value: query,
        onChange: (e) => setQuery(e.target.value)
      }
    ),
    suggestions.length ? /* @__PURE__ */ jsx("div", { className: "absolute left-0 right-0 mt-1 max-h-56 w-full overflow-auto rounded-md border bg-white", style: { zIndex: 9999 }, children: suggestions.map((s) => /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => {
          onSelect(s);
          setQuery(s.display_name);
          setSuggestions([]);
        },
        className: "block w-full px-3 py-2 text-left hover:bg-slate-50",
        children: s.display_name
      },
      s.place_id
    )) }) : null,
    loading ? /* @__PURE__ */ jsx("div", { className: "text-sm text-muted-foreground mt-1", children: "Searching..." }) : null
  ] });
}
function LocationPicker({
  initial,
  onChange
}) {
  const mapRef = useRef(null);
  const containerRef = useRef(null);
  const markerRef = useRef(null);
  const leafletRef = useRef(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let mounted = true;
    if (!containerRef.current) return;
    (async () => {
      try {
        const leafletModule = await import("leaflet");
        await Promise.resolve({            });
        const L = leafletModule && (leafletModule.default ?? leafletModule);
        if (!mounted) return;
        leafletRef.current = L;
        mapRef.current = L.map(containerRef.current, { center: [21.1702, 72.8311], zoom: 5 });
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "&copy; OpenStreetMap contributors",
          maxZoom: 19
        }).addTo(mapRef.current);
        mapRef.current.on("click", async (e) => {
          const { lat, lng } = e.latlng;
          placeMarker(lat, lng);
          await reverseGeocode(lat, lng);
        });
        if (initial) {
          mapRef.current.setView([initial.lat, initial.lng], 13);
          placeMarker(initial.lat, initial.lng, true);
          reverseGeocode(initial.lat, initial.lng);
        }
      } catch (err) {
      }
    })();
    return () => {
      mounted = false;
      try {
        mapRef.current && mapRef.current.remove();
      } catch {
      }
    };
  }, []);
  function placeMarker(lat, lng, center = true) {
    if (!mapRef.current) return;
    const L = leafletRef.current;
    if (!L) return;
    if (markerRef.current) {
      markerRef.current.setLatLng([lat, lng]);
    } else {
      markerRef.current = L.marker([lat, lng], { draggable: true }).addTo(mapRef.current);
      markerRef.current.on("dragend", async (ev) => {
        const p = ev.target.getLatLng();
        await reverseGeocode(p.lat, p.lng);
      });
    }
    if (center) {
      mapRef.current.setView([lat, lng], 13, { animate: true });
    }
  }
  async function reverseGeocode(lat, lon) {
    setLoading(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}&addressdetails=1`
      );
      const data = await res.json();
      const addr = data?.display_name ?? "";
      const address = data?.address || {};
      const payload = {
        latitude: lat,
        longitude: lon,
        address: addr,
        city: address.city || address.town || address.village || null,
        state: address.state || null,
        country: address.country || null,
        postalCode: address.postcode || null
      };
      onChange(payload);
    } catch (e) {
      onChange({ latitude: lat, longitude: lon, address: null });
    } finally {
      setLoading(false);
    }
  }
  return /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsx(
      SearchLocation,
      {
        onSelect: (item) => {
          const lat = Number(item.lat);
          const lon = Number(item.lon);
          placeMarker(lat, lon);
          reverseGeocode(lat, lon);
        }
      }
    ),
    /* @__PURE__ */ jsx("div", { ref: containerRef, className: "w-full h-64 rounded-md border" }),
    loading ? /* @__PURE__ */ jsx("div", { className: "text-sm text-muted-foreground", children: "Resolving address..." }) : null
  ] });
}
const getPostJobAccess = createServerFn({
  method: "GET"
}).handler(createSsrRpc("84591fcb04b7f6eb0f011841c740911f1042c20b8d0970e0de1fa91c3a35fdde"));
const saveClientJob = createServerFn({
  method: "POST"
}).inputValidator((data) => ({
  draftId: data.draftId ?? null,
  job: saveClientJobSchema.parse(data.job)
})).handler(createSsrRpc("4df961514bde49cbb0c7192f9b69ed61c09ffaf2e449825947edd4cf122b67e2"));
const getDraftJob = createServerFn({
  method: "GET"
}).inputValidator((data) => data).handler(createSsrRpc("1098c7c3c4f88c50c233de7e63d13343b5b364d4f9c196863026dc40cd9265aa"));
const Route$C = createFileRoute("/post-job")({
  beforeLoad: async ({
    location
  }) => {
    try {
      await getPostJobAccess();
    } catch {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href
        }
      });
    }
  },
  loader: () => getPostJobAccess(),
  head: () => ({
    meta: [{
      title: "Post a job / project - Servio"
    }]
  }),
  component: PostJob
});
const wizardSteps = [{
  id: "basics",
  title: "Job basics",
  subtitle: "Category, title, and project description.",
  icon: BriefcaseBusiness
}, {
  id: "timing",
  title: "Timing",
  subtitle: "Urgency, job date, deadline, and work mode.",
  icon: CalendarDays
}, {
  id: "files",
  title: "Budget & files",
  subtitle: "Budget range and helpful references.",
  icon: Paperclip
}, {
  id: "location",
  title: "Review & save",
  subtitle: "Final review before posting.",
  icon: Check
}];
const workModes = [{
  value: "ON_SITE",
  label: "On-site"
}, {
  value: "REMOTE",
  label: "Remote"
}, {
  value: "BOTH",
  label: "Both"
}];
const urgencyOptions = [{
  value: "LOW",
  label: "Low"
}, {
  value: "MEDIUM",
  label: "Medium"
}, {
  value: "HIGH",
  label: "High"
}];
const timingTypes = [{
  value: "FIXED",
  label: "Fixed project",
  description: "Set one total budget and delivery dates."
}, {
  value: "HOURLY",
  label: "Hourly",
  description: "Set the budget as an hourly rate."
}, {
  value: "WEEKLY",
  label: "Weekly",
  description: "Set the budget as a weekly rate."
}];
function PostJob() {
  const {
    viewer,
    clientProfile,
    categories
  } = useLoaderData({
    from: "/post-job"
  });
  const search = useSearch({
    from: "/post-job"
  });
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [submitError, setSubmitError2] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [draftId, setDraftId] = useState(null);
  const [isLoadingDraft, setIsLoadingDraft] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const [form, setForm] = useState({
    category: "",
    title: "",
    description: "",
    attachments: [],
    budgetMin: null,
    budgetMax: null,
    urgency: "MEDIUM",
    timingType: "FIXED",
    hourlyRate: null,
    jobDate: "",
    deadline: "",
    workMode: "BOTH",
    locationLabel: "Selected job location",
    locationAddress: "",
    locationLat: null,
    locationLng: null,
    status: "OPEN"
  });
  const activeStep = wizardSteps[currentStep];
  const ActiveStepIcon = activeStep.icon;
  const completedPercent = useMemo(() => calculateCompletion({
    ...form,
    attachments
  }), [form, attachments]);
  const displayName = clientProfile?.fullName || `${viewer.firstName} ${viewer.lastName}`.trim();
  useEffect(() => {
    const numericDraftId = Number(search.draftId);
    if (!Number.isFinite(numericDraftId) || numericDraftId <= 0) {
      setDraftId(null);
      return;
    }
    let active = true;
    setIsLoadingDraft(true);
    setSubmitError2(null);
    getDraftJob({
      data: {
        draftId: numericDraftId
      }
    }).then((draft) => {
      if (!active) {
        return;
      }
      if (!draft) {
        setSubmitError2("Draft project was not found.");
        return;
      }
      const draftAttachments = draft.attachments.map((attachment) => ({
        fileName: attachment.fileName,
        fileType: attachment.fileType || void 0,
        fileSize: attachment.fileSize || void 0,
        previewUrl: attachment.previewUrl || void 0
      }));
      setDraftId(draft.id);
      setAttachments(draftAttachments);
      setForm({
        category: draft.category,
        title: draft.title,
        description: draft.description,
        attachments: draftAttachments,
        budgetMin: draft.budgetMin,
        budgetMax: draft.budgetMax,
        urgency: draft.urgency,
        timingType: draft.timingType ?? "FIXED",
        hourlyRate: draft.hourlyRate ?? null,
        jobDate: toDateInputValue(draft.jobDate),
        deadline: toDateInputValue(draft.deadline),
        workMode: draft.workMode,
        locationLabel: draft.locationLabel || "Selected job location",
        locationAddress: draft.locationAddress || "",
        locationLat: draft.locationLat,
        locationLng: draft.locationLng,
        status: draft.status
      });
      setCurrentStep(getFirstIncompleteStep({
        category: draft.category,
        title: draft.title,
        description: draft.description,
        attachments: draftAttachments,
        budgetMin: draft.budgetMin,
        budgetMax: draft.budgetMax,
        urgency: draft.urgency,
        timingType: draft.timingType ?? "FIXED",
        hourlyRate: draft.hourlyRate ?? null,
        jobDate: toDateInputValue(draft.jobDate),
        deadline: toDateInputValue(draft.deadline),
        workMode: draft.workMode,
        locationLabel: draft.locationLabel || "Selected job location",
        locationAddress: draft.locationAddress || "",
        locationLat: draft.locationLat,
        locationLng: draft.locationLng,
        status: draft.status
      }));
    }).catch((error) => {
      if (active) {
        setSubmitError2(error instanceof Error ? error.message : "Could not load this draft.");
      }
    }).finally(() => {
      if (active) {
        setIsLoadingDraft(false);
      }
    });
    return () => {
      active = false;
    };
  }, [search.draftId]);
  const updateField = (key, value) => {
    setSubmitError2(null);
    setForm((current) => ({
      ...current,
      [key]: value
    }));
  };
  const handleFiles = async (fileList) => {
    if (!fileList?.length) {
      return;
    }
    const nextFiles = await Promise.all(Array.from(fileList).slice(0, Math.max(0, 10 - attachments.length)).map((file) => readAttachment(file)));
    const nextAttachments = [...attachments, ...nextFiles];
    setAttachments(nextAttachments);
    updateField("attachments", nextAttachments);
  };
  const removeAttachment = (fileName) => {
    const nextAttachments = attachments.filter((attachment) => attachment.fileName !== fileName);
    setAttachments(nextAttachments);
    updateField("attachments", nextAttachments);
  };
  const goNext = () => {
    const validationMessage = validateStep(activeStep.id, {
      ...form
    });
    if (validationMessage) {
      setSubmitError2(validationMessage);
      return;
    }
    setSubmitError2(null);
    setCurrentStep((step) => Math.min(step + 1, wizardSteps.length - 1));
  };
  const goBack = () => {
    setSubmitError2(null);
    setCurrentStep((step) => Math.max(step - 1, 0));
  };
  const saveJob = async (status) => {
    const payload = {
      ...form,
      attachments,
      status
    };
    if (status === "OPEN") {
      const validationMessage = validateAll(payload);
      if (validationMessage) {
        setSubmitError2(validationMessage);
        return;
      }
    }
    setIsSaving(true);
    setSubmitError2(null);
    try {
      const result = await saveClientJob({
        data: {
          draftId,
          job: payload
        }
      });
      if (result.ok) {
        emitAdminActivity(draftId ? "client job updated" : "client job posted");
        await navigate({
          to: "/dashboard"
        });
      }
    } catch (error) {
      setSubmitError2(error instanceof Error ? error.message : "Could not save this job. Please check the details.");
    } finally {
      setIsSaving(false);
    }
  };
  return /* @__PURE__ */ jsx(AppShell, { userName: displayName, userRole: "Client", userAvatarUrl: clientProfile?.avatarUrl || viewer.avatarUrl, children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-end", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Link, { to: "/dashboard", className: "text-sm text-primary hover:underline", children: "Back to dashboard" }),
        /* @__PURE__ */ jsx("h1", { className: "mt-2 text-3xl font-semibold tracking-tight", children: draftId ? "Continue draft job / project" : "Create new job / project" }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: draftId ? "Your saved draft information is loaded below. Review or complete the missing fields before posting." : "A guided posting flow for the Phase-1 client job feature." })
      ] }),
      /* @__PURE__ */ jsxs(Badge, { variant: "secondary", className: "w-fit", children: [
        completedPercent,
        "% complete"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)]", children: [
      /* @__PURE__ */ jsxs("aside", { className: "rounded-xl border border-border bg-card p-5 shadow-soft", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-5", children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-2 flex items-center justify-between text-xs font-medium text-muted-foreground", children: [
            /* @__PURE__ */ jsxs("span", { children: [
              "Step ",
              currentStep + 1,
              " of ",
              wizardSteps.length
            ] }),
            /* @__PURE__ */ jsxs("span", { children: [
              completedPercent,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "h-2 rounded-full bg-muted", children: /* @__PURE__ */ jsx("div", { className: "h-2 rounded-full bg-primary transition-all", style: {
            width: `${completedPercent}%`
          } }) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-3", children: wizardSteps.map((step, index) => /* @__PURE__ */ jsx(StepButton, { step, index, currentStep, isComplete: isStepComplete(step.id, {
          ...form,
          attachments
        }), onClick: () => setCurrentStep(index) }, step.id)) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "rounded-xl border border-border bg-card shadow-soft", children: [
        /* @__PURE__ */ jsxs("div", { className: "border-b border-border p-5", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm text-primary", children: [
            /* @__PURE__ */ jsx(ActiveStepIcon, { className: "h-4 w-4" }),
            activeStep.title
          ] }),
          /* @__PURE__ */ jsx("h2", { className: "mt-1 text-xl font-semibold", children: activeStep.title }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: activeStep.subtitle })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-6 p-5 sm:p-6", children: [
          isLoadingDraft ? /* @__PURE__ */ jsx("div", { className: "rounded-lg border border-border bg-muted/30 px-4 py-3 text-sm text-muted-foreground", children: "Loading saved draft details..." }) : null,
          activeStep.id === "basics" ? /* @__PURE__ */ jsx(BasicsStep, { form, updateField, categories }) : null,
          activeStep.id === "files" ? /* @__PURE__ */ jsx(FilesStep, { form, attachments, updateField, handleFiles, removeAttachment }) : null,
          activeStep.id === "timing" ? /* @__PURE__ */ jsx(TimingStep, { form, updateField }) : null,
          activeStep.id === "location" ? /* @__PURE__ */ jsx(LocationStep, { form, attachments, updateField }) : null,
          submitError ? /* @__PURE__ */ jsx("div", { className: "rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive", children: submitError }) : null,
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
              /* @__PURE__ */ jsxs(Button, { type: "button", variant: "outline", onClick: goBack, disabled: currentStep === 0 || isSaving, children: [
                /* @__PURE__ */ jsx(ChevronLeft, { className: "h-4 w-4" }),
                "Back"
              ] }),
              /* @__PURE__ */ jsxs(Button, { type: "button", variant: "ghost", onClick: () => saveJob("DRAFT"), disabled: isSaving, children: [
                /* @__PURE__ */ jsx(Save, { className: "h-4 w-4" }),
                "Save draft"
              ] })
            ] }),
            currentStep < wizardSteps.length - 1 ? /* @__PURE__ */ jsxs(Button, { type: "button", onClick: goNext, children: [
              "Continue",
              /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4" })
            ] }) : /* @__PURE__ */ jsx(Button, { type: "button", onClick: () => saveJob("OPEN"), disabled: isSaving, children: isSaving ? "Saving..." : "Post job" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "border-t border-border bg-muted/30 px-5 py-3", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "h-2 flex-1 rounded-full bg-muted", children: /* @__PURE__ */ jsx("div", { className: "h-2 rounded-full bg-primary transition-all", style: {
            width: `${completedPercent}%`
          } }) }),
          /* @__PURE__ */ jsxs("span", { className: "text-xs font-medium text-muted-foreground", children: [
            completedPercent,
            "% done"
          ] })
        ] }) })
      ] })
    ] })
  ] }) });
}
function StepButton({
  step,
  index,
  currentStep,
  isComplete,
  onClick
}) {
  const isActive = index === currentStep;
  const Icon = step.icon;
  return /* @__PURE__ */ jsx("button", { type: "button", onClick, className: `w-full rounded-lg border p-3 text-left transition-colors ${isActive ? "border-primary bg-primary/5" : isComplete ? "border-success/30 bg-success/5" : "border-border bg-card hover:bg-muted/50"}`, children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
    /* @__PURE__ */ jsx("div", { className: `grid h-9 w-9 place-items-center rounded-lg ${isActive ? "bg-primary text-primary-foreground" : isComplete ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`, children: isComplete ? /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(Icon, { className: "h-4 w-4" }) }),
    /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsx("p", { className: "font-medium", children: step.title }),
      /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: step.subtitle }),
      !isActive && !isComplete ? /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs font-medium text-warning-foreground", children: "Pending" }) : null
    ] })
  ] }) });
}
function BasicsStep({
  form,
  updateField,
  categories
}) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Field$1, { label: "Category", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-2 lg:grid-cols-3", children: categories.slice(0, 9).map((category) => /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => updateField("category", category.name), className: `flex min-h-12 items-center gap-2 rounded-lg border px-3 py-2 text-left text-sm transition-colors ${form.category === category.name ? "border-primary bg-primary/5 text-primary" : "border-border hover:bg-muted"}`, children: [
      /* @__PURE__ */ jsx(BriefcaseBusiness, { className: "h-4 w-4 shrink-0" }),
      /* @__PURE__ */ jsx("span", { children: category.name })
    ] }, category.name)) }) }),
    /* @__PURE__ */ jsx(Field$1, { label: "Title", children: /* @__PURE__ */ jsx(Input, { value: form.title, onChange: (event) => updateField("title", event.target.value), placeholder: "e.g. Build a Shopify storefront with custom theme" }) }),
    /* @__PURE__ */ jsx(Field$1, { label: "Description", children: /* @__PURE__ */ jsx(Textarea, { className: "min-h-44", value: form.description, onChange: (event) => updateField("description", event.target.value), placeholder: "Describe scope, goals, deliverables, required skills, and what a successful result should look like." }) })
  ] });
}
function FilesStep({
  form,
  attachments,
  updateField,
  handleFiles,
  removeAttachment
}) {
  const budgetUnit = getBudgetUnit(form.timingType);
  const budgetHint = form.timingType === "HOURLY" ? "Enter the hourly rate range for this job." : form.timingType === "WEEKLY" ? "Enter the weekly rate range for this job." : "Enter the total budget range for this project.";
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-border bg-muted/30 px-4 py-3 text-sm text-muted-foreground", children: [
      budgetHint,
      " Change the timing step to switch this between fixed, hourly, and weekly."
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
      /* @__PURE__ */ jsx(Field$1, { label: `Minimum ${budgetUnit} budget`, children: /* @__PURE__ */ jsx(Input, { type: "number", min: "0", value: form.budgetMin ?? "", onChange: (event) => updateField("budgetMin", event.target.value ? Number(event.target.value) : null), placeholder: form.timingType === "FIXED" ? "$ Min" : `$ Min / ${budgetUnit}` }) }),
      /* @__PURE__ */ jsx(Field$1, { label: `Maximum ${budgetUnit} budget`, children: /* @__PURE__ */ jsx(Input, { type: "number", min: "0", value: form.budgetMax ?? "", onChange: (event) => updateField("budgetMax", event.target.value ? Number(event.target.value) : null), placeholder: form.timingType === "FIXED" ? "$ Max" : `$ Max / ${budgetUnit}` }) })
    ] }),
    /* @__PURE__ */ jsx(Field$1, { label: "Photos / documents", hint: "Upload briefs, photos, screenshots, PDFs, or documents.", children: /* @__PURE__ */ jsxs("label", { className: "flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-background py-10 text-center transition-colors hover:border-primary/40 hover:bg-primary/5", children: [
      /* @__PURE__ */ jsx(Upload, { className: "h-6 w-6 text-muted-foreground" }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm font-medium", children: "Drop files here or click to upload" }),
      /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "PDF, PNG, JPG, DOCX up to 10 files" }),
      /* @__PURE__ */ jsx("input", { type: "file", className: "hidden", multiple: true, accept: "image/*,.pdf,.doc,.docx", onChange: (event) => handleFiles(event.target.files) })
    ] }) }),
    attachments.length ? /* @__PURE__ */ jsx("div", { className: "grid gap-3 sm:grid-cols-2", children: attachments.map((attachment) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 rounded-lg border border-border bg-background p-3", children: [
      attachment.previewUrl ? /* @__PURE__ */ jsx("img", { src: attachment.previewUrl, alt: "", className: "h-12 w-12 rounded-md object-cover" }) : /* @__PURE__ */ jsx("div", { className: "grid h-12 w-12 place-items-center rounded-md bg-muted", children: /* @__PURE__ */ jsx(FileText, { className: "h-5 w-5 text-muted-foreground" }) }),
      /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsx("p", { className: "truncate text-sm font-medium", children: attachment.fileName }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: formatFileSize$3(attachment.fileSize) })
      ] }),
      /* @__PURE__ */ jsx("button", { type: "button", onClick: () => removeAttachment(attachment.fileName), className: "rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground", "aria-label": `Remove ${attachment.fileName}`, children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }) })
    ] }, attachment.fileName)) }) : null
  ] });
}
function TimingStep({
  form,
  updateField
}) {
  const updateJobDate = (value) => {
    updateField("jobDate", value);
    if (value && form.deadline && compareDateInputs$1(form.deadline, value) < 0) {
      updateField("deadline", value);
    }
  };
  const updateTimingType = (value) => {
    updateField("timingType", value);
    updateField("hourlyRate", null);
    if (value === "HOURLY" || value === "WEEKLY") {
      updateField("jobDate", "");
      updateField("deadline", "");
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Field$1, { label: "Job timing", children: /* @__PURE__ */ jsx("div", { className: "grid gap-2 sm:grid-cols-2", children: timingTypes.map((type) => /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => updateTimingType(type.value), className: `rounded-lg border px-4 py-3 text-left transition-colors ${form.timingType === type.value ? "border-primary bg-primary/5 text-primary" : "border-border hover:bg-muted"}`, children: [
      /* @__PURE__ */ jsx("span", { className: "block text-sm font-medium", children: type.label }),
      /* @__PURE__ */ jsx("span", { className: "mt-1 block text-xs text-muted-foreground", children: type.description })
    ] }, type.value)) }) }),
    /* @__PURE__ */ jsx(Field$1, { label: "Urgency", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-2 rounded-lg bg-muted p-1", children: urgencyOptions.map((option) => /* @__PURE__ */ jsx("button", { type: "button", onClick: () => updateField("urgency", option.value), className: `rounded-md py-2 text-sm font-medium transition-colors ${form.urgency === option.value ? "bg-card text-foreground shadow-soft" : "text-muted-foreground"}`, children: option.label }, option.value)) }) }),
    form.timingType === "FIXED" ? /* @__PURE__ */ jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
      /* @__PURE__ */ jsx(Field$1, { label: "Job date", children: /* @__PURE__ */ jsx(Input, { type: "date", value: form.jobDate || "", onChange: (event) => updateJobDate(event.target.value) }) }),
      /* @__PURE__ */ jsx(Field$1, { label: "Deadline", children: /* @__PURE__ */ jsx(Input, { type: "date", min: form.jobDate || void 0, value: form.deadline, onChange: (event) => updateField("deadline", event.target.value) }) })
    ] }) : /* @__PURE__ */ jsx("div", { className: "rounded-lg border border-border bg-muted/30 px-4 py-3 text-sm text-muted-foreground", children: form.timingType === "HOURLY" ? "Hourly selected. Add the hourly budget in Budget & files." : "Weekly selected. Add the weekly budget in Budget & files." }),
    /* @__PURE__ */ jsx(Field$1, { label: "Work mode", children: /* @__PURE__ */ jsx("div", { className: "grid gap-2 sm:grid-cols-3", children: workModes.map((mode) => /* @__PURE__ */ jsx("button", { type: "button", onClick: () => updateField("workMode", mode.value), className: `rounded-lg border px-4 py-3 text-sm font-medium transition-colors ${form.workMode === mode.value ? "border-primary bg-primary/5 text-primary" : "border-border hover:bg-muted"}`, children: mode.label }, mode.value)) }) })
  ] });
}
function LocationStep({
  form,
  attachments,
  updateField
}) {
  const location = {
    locationName: form.locationAddress || "",
    latitude: form.locationLat ?? null,
    longitude: form.locationLng ?? null
  };
  const updateLocation = (nextLocation) => {
    updateField("locationAddress", nextLocation.locationName);
    updateField("locationLabel", nextLocation.locationName ? "Selected job location" : "");
    updateField("locationLat", nextLocation.latitude);
    updateField("locationLng", nextLocation.longitude);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsx(Field$1, { label: "Location search", children: /* @__PURE__ */ jsx(GoogleJobLocationPicker, { location, onLocationChange: updateLocation }) }),
      /* @__PURE__ */ jsx("div", { className: "rounded-lg border border-border bg-background p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
        /* @__PURE__ */ jsx(MapPin, { className: "mt-0.5 h-5 w-5 shrink-0 text-primary" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs font-medium uppercase text-muted-foreground", children: "Saved job location" }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 font-medium", children: formatApproximateLocation(form.locationAddress, "No location selected yet") })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-4 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsx(ReviewItem, { label: "Title", value: form.title || "Not added" }),
      /* @__PURE__ */ jsx(ReviewItem, { label: "Category", value: form.category || "Not selected" }),
      /* @__PURE__ */ jsx(ReviewItem, { label: "Budget", value: formatBudget$5(form.budgetMin ?? null, form.budgetMax ?? null, form.timingType) }),
      /* @__PURE__ */ jsx(ReviewItem, { label: "Timing", value: formatTimingType$1(form.timingType) }),
      /* @__PURE__ */ jsx(ReviewItem, { label: "Urgency", value: formatEnum$6(form.urgency) }),
      /* @__PURE__ */ jsx(ReviewItem, { label: "Work mode", value: form.workMode === "ON_SITE" ? "On-site" : formatEnum$6(form.workMode) }),
      /* @__PURE__ */ jsx(ReviewItem, { label: "Files", value: `${attachments.length} attached` }),
      /* @__PURE__ */ jsx(ReviewItem, { label: "Location", value: formatApproximateLocation(form.locationAddress, "No location selected yet") })
    ] })
  ] });
}
function GoogleJobLocationPicker({
  location,
  onLocationChange
}) {
  return /* @__PURE__ */ jsx(LocationPicker, { initial: location.latitude != null && location.longitude != null ? {
    lat: location.latitude,
    lng: location.longitude
  } : void 0, onChange: (data) => {
    onLocationChange({
      locationName: data.address ?? "",
      latitude: data.latitude ?? null,
      longitude: data.longitude ?? null
    });
  } });
}
function Field$1({
  label,
  hint,
  children
}) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(Label, { className: "text-sm font-medium", children: label }),
    hint ? /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-xs text-muted-foreground", children: hint }) : null,
    /* @__PURE__ */ jsx("div", { className: "mt-2", children })
  ] });
}
function ReviewItem({
  label,
  value
}) {
  return /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-border bg-background p-4", children: [
    /* @__PURE__ */ jsx("p", { className: "text-xs font-medium uppercase text-muted-foreground", children: label }),
    /* @__PURE__ */ jsx("p", { className: "mt-1 font-medium", children: value })
  ] });
}
function validateStep(step, values) {
  if (step === "basics") {
    if (!values.category.trim()) return "Select a category.";
    if (!values.title.trim()) return "Add a job title.";
    if (values.description.trim().length < 40) return "Add a project description with at least 40 characters.";
  }
  if (step === "files") {
    if (values.budgetMin != null && values.budgetMax != null && values.budgetMin > values.budgetMax) {
      return "Maximum budget must be greater than minimum budget.";
    }
  }
  if (step === "timing") {
    if (values.timingType === "FIXED" && !values.deadline.trim()) return "Add a deadline.";
    if (values.deadline.trim() && values.jobDate?.trim() && compareDateInputs$1(values.deadline, values.jobDate) < 0) {
      return "Deadline must be on or after the job date.";
    }
  }
  if (step === "location" && values.workMode !== "REMOTE") {
    if (!values.locationAddress?.trim() || values.locationLat == null || values.locationLng == null) {
      return "Select a job location by choosing a suggestion or dropping the map pin.";
    }
  }
  return null;
}
function isStepComplete(step, values) {
  if (step === "basics") {
    return Boolean(values.category.trim()) && Boolean(values.title.trim()) && values.description.trim().length >= 40;
  }
  if (step === "files") {
    const budgetIsValid = values.budgetMin == null || values.budgetMax == null || values.budgetMin <= values.budgetMax;
    return (values.budgetMin != null || values.budgetMax != null || values.attachments.length > 0) && budgetIsValid;
  }
  if (step === "timing") {
    const deadlineIsValid = values.timingType === "HOURLY" || values.timingType === "WEEKLY" || Boolean(values.deadline.trim()) && (!values.jobDate?.trim() || compareDateInputs$1(values.deadline, values.jobDate) >= 0);
    return Boolean(values.timingType) && deadlineIsValid;
  }
  if (step === "location") {
    return values.workMode === "REMOTE" || Boolean(values.locationAddress?.trim()) && values.locationLat != null && values.locationLng != null;
  }
  return false;
}
function validateAll(values) {
  for (const step of wizardSteps) {
    const message = validateStep(step.id, values);
    if (message) {
      return message;
    }
  }
  return null;
}
function getFirstIncompleteStep(values) {
  const index = wizardSteps.findIndex((step) => !isStepComplete(step.id, values));
  return index >= 0 ? index : wizardSteps.length - 1;
}
function calculateCompletion(values) {
  const checks = [Boolean(values.category?.trim()), Boolean(values.title.trim()), values.description.trim().length >= 40, values.attachments.length > 0, values.budgetMin != null || values.budgetMax != null, Boolean(values.timingType), values.timingType === "FIXED" ? Boolean(values.jobDate?.trim()) : values.budgetMin != null || values.budgetMax != null, values.timingType === "FIXED" ? Boolean(values.deadline?.trim()) : values.budgetMin != null || values.budgetMax != null, values.workMode === "REMOTE" || Boolean(values.locationAddress?.trim()) && values.locationLat != null && values.locationLng != null];
  return Math.round(checks.filter(Boolean).length / checks.length * 100);
}
function toDateInputValue(value) {
  if (!value) {
    return "";
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }
  return date.toISOString().slice(0, 10);
}
function compareDateInputs$1(a, b) {
  return (/* @__PURE__ */ new Date(`${a}T00:00:00.000Z`)).getTime() - (/* @__PURE__ */ new Date(`${b}T00:00:00.000Z`)).getTime();
}
async function readAttachment(file) {
  const base = {
    fileName: file.name,
    fileType: file.type,
    fileSize: file.size
  };
  if (!file.type.startsWith("image/")) {
    return base;
  }
  const previewUrl = await new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(typeof reader.result === "string" ? reader.result : "");
    reader.onerror = () => resolve("");
    reader.readAsDataURL(file);
  });
  return {
    ...base,
    previewUrl
  };
}
function formatFileSize$3(size) {
  if (!size) {
    return "Unknown size";
  }
  if (size < 1024 * 1024) {
    return `${Math.round(size / 1024)} KB`;
  }
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}
function formatEnum$6(value) {
  return value.toLowerCase().split("_").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
}
function emitAdminActivity(reason) {
  try {
    const socket = io(getSocketUrl$6());
    socket.emit("admin:activity", {
      reason
    });
    window.setTimeout(() => socket.disconnect(), 800);
  } catch {
  }
}
function getSocketUrl$6() {
  return `${window.location.protocol}//${window.location.hostname}:4001`;
}
function formatBudget$5(min, max, timingType = "FIXED") {
  const suffix = getBudgetSuffix$5(timingType);
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
function formatTimingType$1(value) {
  if (value === "HOURLY") {
    return "Hourly";
  }
  if (value === "WEEKLY") {
    return "Weekly";
  }
  return "Fixed project";
}
function getBudgetUnit(value) {
  if (value === "HOURLY") {
    return "hourly";
  }
  if (value === "WEEKLY") {
    return "weekly";
  }
  return "total";
}
function getBudgetSuffix$5(value) {
  if (value === "HOURLY") {
    return " / hour";
  }
  if (value === "WEEKLY") {
    return " / week";
  }
  return "";
}
const Route$B = Route$C;
const Route$A = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Simple, transparent | Servio" },
      {
        name: "description",
        content: "Free for clients. Pay only when work is done. Pros pay a small platform fee that drops as you grow."
      }
    ]
  }),
  component: Pricing
});
const tiers = [
  {
    name: "Starter",
    forWho: "For clients & new pros",
    price: { monthly: 0, yearly: 0 },
    desc: "Post jobs and apply for free. Pay only when you hire or are hired.",
    fee: "Pros: 10% platform fee",
    perks: [
      "Unlimited job posts",
      "Up to 8 proposals/month",
      "Standard support",
      "Escrow protection"
    ],
    cta: "Get started"
  },
  {
    name: "Pro",
    forWho: "Most popular for pros",
    price: { monthly: 19, yearly: 15 },
    desc: "Win more work with priority placement and unlimited proposals.",
    fee: "Pros: 7% platform fee",
    perks: [
      "Unlimited proposals",
      "Priority placement",
      "Verified badge",
      "AI proposal writer",
      "Same-day payouts"
    ],
    cta: "Start 14-day trial",
    highlight: true
  },
  {
    name: "Business",
    forWho: "Teams & agencies",
    price: { monthly: 49, yearly: 39 },
    desc: "Hire at scale with team seats, contracts, and dedicated support.",
    fee: "0% platform fee on jobs",
    perks: [
      "Up to 10 team seats",
      "Custom contracts",
      "Bulk hiring",
      "Dedicated account manager",
      "API access"
    ],
    cta: "Talk to sales"
  }
];
function Pricing() {
  const [yearly, setYearly] = useState(true);
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsx(SiteHeader, {}),
    /* @__PURE__ */ jsx("section", { className: "gradient-hero", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold uppercase tracking-wider text-primary", children: "Pricing" }),
      /* @__PURE__ */ jsx("h1", { className: "font-display mt-3 text-4xl font-bold tracking-tight md:text-5xl", children: "Simple, transparent pricing" }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-muted-foreground", children: "Free for clients. Pros pay only when they get paid. No hidden fees." }),
      /* @__PURE__ */ jsxs("div", { className: "mt-8 inline-flex items-center gap-1 rounded-full border border-border bg-card p-1 shadow-soft", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setYearly(false),
            className: `rounded-full px-4 py-1.5 text-sm transition ${!yearly ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`,
            children: "Monthly"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setYearly(true),
            className: `rounded-full px-4 py-1.5 text-sm transition ${yearly ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`,
            children: "Yearly · Save 20%"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { className: "mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsx("div", { className: "grid gap-6 md:grid-cols-3", children: tiers.map((t) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: `relative flex flex-col rounded-3xl border bg-card p-7 shadow-soft ${t.highlight ? "border-primary shadow-card ring-2 ring-primary/15" : "border-border"}`,
          children: [
            t.highlight && /* @__PURE__ */ jsx("span", { className: "absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-cta px-3 py-0.5 text-xs font-bold text-cta-foreground", children: "Most popular" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: t.forWho }),
            /* @__PURE__ */ jsx("h3", { className: "font-display mt-2 text-2xl font-bold", children: t.name }),
            /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-end gap-1", children: [
              /* @__PURE__ */ jsxs("span", { className: "font-display text-5xl font-bold", children: [
                "$",
                yearly ? t.price.yearly : t.price.monthly
              ] }),
              /* @__PURE__ */ jsx("span", { className: "mb-1.5 text-sm text-muted-foreground", children: "/mo" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: t.desc }),
            /* @__PURE__ */ jsx("p", { className: "mt-3 inline-flex w-fit rounded-full bg-success/10 px-2.5 py-0.5 text-xs font-semibold text-success", children: t.fee }),
            /* @__PURE__ */ jsx("ul", { className: "mt-6 space-y-3", children: t.perks.map((p) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2 text-sm", children: [
              /* @__PURE__ */ jsx(Check, { className: "mt-0.5 h-4 w-4 shrink-0 text-success" }),
              " ",
              p
            ] }, p)) }),
            /* @__PURE__ */ jsx(
              Button,
              {
                asChild: true,
                size: "lg",
                className: `mt-7 ${t.highlight ? "bg-cta text-cta-foreground hover:bg-cta/90" : "bg-primary"}`,
                children: /* @__PURE__ */ jsx(Link, { to: "/signup", children: t.cta })
              }
            )
          ]
        },
        t.name
      )) }),
      /* @__PURE__ */ jsxs("p", { className: "mt-10 text-center text-sm text-muted-foreground", children: [
        "Need something custom?",
        " ",
        /* @__PURE__ */ jsx(Link, { to: "/", className: "font-medium text-primary hover:underline", children: "Contact us" }),
        "."
      ] })
    ] }),
    /* @__PURE__ */ jsx(SiteFooter, {})
  ] });
}
const Route$z = Route$A;
const $$splitComponentImporter$a = () => import("./privacy-policy-BDGJHHfu.js");
const loadPrivacyPage = createServerFn({
  method: "GET"
}).handler(createSsrRpc("aa570f29499fd324ade1a4bebcdf028039d509b20f350df4392626c54629c4d9"));
const Route$y = createFileRoute("/privacy-policy")({
  loader: () => loadPrivacyPage(),
  head: () => ({
    meta: [{
      title: "Privacy Policy - Servio"
    }, {
      name: "description",
      content: "Learn how Servio handles privacy and personal data."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const Route$x = createFileRoute("/professional-messages")({
  loader: () => getProfessionalMessagesPage(),
  head: () => ({
    meta: [{
      title: "Professional Messages - Servio"
    }, {
      name: "description",
      content: "Professional inbox for client conversations."
    }]
  }),
  component: ProfessionalMessages
});
const getProfessionalMessagesPage = createServerFn({
  method: "GET"
}).handler(createSsrRpc("caa7ea0460ff589ca14ad47e869b8dca5174757b5a6860c21cdb76719c13198c"));
function ProfessionalMessages() {
  const {
    viewer
  } = useLoaderData({
    from: "/professional-messages"
  });
  const [conversations, setConversations] = useState([]);
  const [messagesByConversation, setMessagesByConversation] = useState({});
  const [active, setActive] = useState(null);
  const [draft, setDraft] = useState("");
  const [submitError, setSubmitError2] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [activeCall, setActiveCall] = useState(null);
  const [callSeconds, setCallSeconds] = useState(0);
  const [typingByConversation, setTypingByConversation] = useState({});
  const socketRef = useRef(null);
  const conversationsRef = useRef([]);
  const localCallVideoRef = useRef(null);
  const remoteCallVideoRef = useRef(null);
  const remoteCallAudioRef = useRef(null);
  const callStreamRef = useRef(null);
  const remoteCallStreamRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const pendingIceCandidatesRef = useRef([]);
  const typingStopTimerRef = useRef(null);
  const incomingTypingTimersRef = useRef({});
  const displayName = `${viewer?.firstName ?? ""} ${viewer?.lastName ?? ""}`.trim() || viewer?.email || "Professional";
  useEffect(() => {
    conversationsRef.current = conversations;
  }, [conversations]);
  useEffect(() => {
    if (!viewer) {
      return;
    }
    const storedConversations = readJson(storageKey(viewer.id, "conversations"), []);
    const storedMessages = readJson(storageKey(viewer.id, "messages"), {});
    const pendingIncomingCall = readPendingIncomingCall(viewer.id);
    const pendingCallConversation = pendingIncomingCall ? buildConversationFromCall(pendingIncomingCall) : null;
    const nextConversations = pendingCallConversation ? upsertConversationList(storedConversations, pendingCallConversation) : storedConversations;
    setConversations(nextConversations);
    setMessagesByConversation(storedMessages);
    setActive(pendingCallConversation || nextConversations[0] || null);
    const socket = io(getSocketUrl$5(), {
      auth: {
        userId: viewer.id,
        role: viewer.role,
        name: displayName,
        avatarUrl: viewer.avatarUrl
      }
    });
    socketRef.current = socket;
    nextConversations.forEach((conversation) => {
      socket.emit("conversation:join", {
        conversationId: conversation.id
      });
    });
    if (pendingIncomingCall) {
      socket.emit("conversation:join", {
        conversationId: pendingIncomingCall.conversationId
      });
      setActiveCall({
        callId: pendingIncomingCall.callId,
        conversationId: pendingIncomingCall.conversationId,
        mode: pendingIncomingCall.mode || "voice",
        status: "incoming",
        fromUserId: pendingIncomingCall.fromUserId,
        toUserId: viewer.id,
        fromName: pendingIncomingCall.fromName || "Someone",
        offer: pendingIncomingCall.offer
      });
      setCallSeconds(0);
    }
    socket.on("connect", () => setSubmitError2(null));
    socket.emit("history:load", {
      userId: viewer.id
    }, (history) => {
      const historyConversations = history?.conversations || [];
      const historyMessages = history?.messagesByConversation || {};
      const mergedConversations = mergeConversationLists(historyConversations, storedConversations);
      const mergedMessages = mergeMessagesByConversation(storedMessages, historyMessages);
      setConversations(persistConversations(viewer.id, mergedConversations));
      setMessagesByConversation(persistMessages(viewer.id, mergedMessages));
      setActive((current) => current || mergedConversations[0] || null);
      mergedConversations.forEach((conversation) => {
        socket.emit("conversation:join", {
          conversationId: conversation.id
        });
      });
    });
    socket.on("connect_error", () => {
      setSubmitError2("Socket server is not connected. Run npm run socket in another terminal.");
    });
    socket.on("message:new", (message) => {
      if (message.senderId === viewer.id) {
        return;
      }
      appendMessage(viewer.id, message);
    });
    socket.on("conversation:upsert", (payload) => {
      if (!payload?.message || !payload.conversationId) {
        return;
      }
      const conversation = {
        id: payload.conversationId,
        otherUserId: payload.fromUser?.id || payload.message.senderId,
        otherUserName: payload.fromUser?.name || "Client",
        otherUserAvatarUrl: payload.fromUser?.avatarUrl || null,
        job: payload.job || "Direct message",
        preview: getMessagePreview(payload.message),
        time: formatTime(payload.message.createdAt),
        unread: active?.id === payload.conversationId ? 0 : 1
      };
      socket.emit("conversation:join", {
        conversationId: conversation.id
      });
      setConversations((current) => persistConversations(viewer.id, upsertConversationList(current, conversation)));
      setActive((current) => current || conversation);
      appendMessage(viewer.id, payload.message);
    });
    socket.on("conversation:cleared", ({
      conversationId,
      userId
    }) => {
      if (userId && userId !== viewer.id) {
        return;
      }
      clearConversationLocally(viewer.id, conversationId);
    });
    socket.on("typing:start", ({
      conversationId,
      userId,
      name
    }) => {
      if (userId === viewer.id) {
        return;
      }
      setTypingByConversation((current) => ({
        ...current,
        [conversationId]: name || "Someone"
      }));
      if (incomingTypingTimersRef.current[conversationId]) {
        window.clearTimeout(incomingTypingTimersRef.current[conversationId]);
      }
      incomingTypingTimersRef.current[conversationId] = window.setTimeout(() => {
        setTypingByConversation((current) => {
          const next = {
            ...current
          };
          delete next[conversationId];
          return next;
        });
      }, 2500);
    });
    socket.on("typing:stop", ({
      conversationId,
      userId
    }) => {
      if (userId === viewer.id) {
        return;
      }
      if (incomingTypingTimersRef.current[conversationId]) {
        window.clearTimeout(incomingTypingTimersRef.current[conversationId]);
        delete incomingTypingTimersRef.current[conversationId];
      }
      setTypingByConversation((current) => {
        const next = {
          ...current
        };
        delete next[conversationId];
        return next;
      });
    });
    socket.on("call:incoming", (payload) => {
      if (!payload?.callId || !payload.conversationId || !payload.fromUserId || payload.fromUserId === viewer.id || !payload.offer) {
        return;
      }
      setActiveCall({
        callId: payload.callId,
        conversationId: payload.conversationId,
        mode: payload.mode || "voice",
        status: "incoming",
        fromUserId: payload.fromUserId,
        toUserId: viewer.id,
        fromName: payload.fromName || "Someone",
        offer: payload.offer
      });
      setActive((current) => {
        if (current?.id === payload.conversationId) {
          return current;
        }
        const existing = conversationsRef.current.find((conversation) => conversation.id === payload.conversationId);
        if (existing) {
          return existing;
        }
        const incomingConversation = buildConversationFromCall(payload);
        socket.emit("conversation:join", {
          conversationId: incomingConversation.id
        });
        setConversations((items) => persistConversations(viewer.id, upsertConversationList(items, incomingConversation)));
        return incomingConversation;
      });
      setCallSeconds(0);
    });
    socket.on("call:answered", async (payload) => {
      if (!payload?.callId || payload.toUserId !== viewer.id || !payload.answer || !peerConnectionRef.current) {
        return;
      }
      await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(payload.answer));
      await flushPendingIceCandidates();
      const startedAt = payload.startedAt ? new Date(payload.startedAt).getTime() : Date.now();
      setActiveCall((current) => current?.callId === payload.callId ? {
        ...current,
        status: "active",
        startedAt
      } : current);
    });
    socket.on("call:ice-candidate", async (payload) => {
      if (!payload?.callId || payload.toUserId !== viewer.id || !payload.candidate) {
        return;
      }
      if (!peerConnectionRef.current?.remoteDescription) {
        pendingIceCandidatesRef.current.push(payload.candidate);
        return;
      }
      await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(payload.candidate));
    });
    socket.on("call:ended", (payload) => {
      if (!payload?.callId || payload.toUserId !== viewer.id) {
        return;
      }
      cleanupCall(false);
    });
    return () => {
      if (typingStopTimerRef.current) {
        window.clearTimeout(typingStopTimerRef.current);
      }
      Object.values(incomingTypingTimersRef.current).forEach((timer) => window.clearTimeout(timer));
      cleanupCall(false);
      socket.disconnect();
    };
  }, [viewer?.id]);
  useEffect(() => {
    if (activeCall?.status !== "active" || !activeCall.startedAt) {
      setCallSeconds(0);
      return;
    }
    const updateSeconds = () => {
      setCallSeconds(Math.max(0, Math.floor((Date.now() - activeCall.startedAt) / 1e3)));
    };
    updateSeconds();
    const timer = window.setInterval(updateSeconds, 1e3);
    return () => window.clearInterval(timer);
  }, [activeCall?.status, activeCall?.startedAt]);
  useEffect(() => {
    if (!activeCall) {
      return;
    }
    if (localCallVideoRef.current && callStreamRef.current) {
      localCallVideoRef.current.srcObject = callStreamRef.current;
    }
    if (remoteCallAudioRef.current && remoteCallStreamRef.current) {
      remoteCallAudioRef.current.srcObject = remoteCallStreamRef.current;
    }
    if (remoteCallVideoRef.current && remoteCallStreamRef.current) {
      remoteCallVideoRef.current.srcObject = remoteCallStreamRef.current;
    }
  }, [activeCall?.callId, activeCall?.mode, activeCall?.status]);
  const appendMessage = (userId, message) => {
    setMessagesByConversation((current) => {
      const currentMessages = current[message.conversationId] || [];
      if (currentMessages.some((item) => item.id === message.id)) {
        return current;
      }
      const next = {
        ...current,
        [message.conversationId]: [...currentMessages, message]
      };
      localStorage.setItem(storageKey(userId, "messages"), JSON.stringify(next));
      return next;
    });
    setConversations((current) => persistConversations(userId, current.map((conversation) => conversation.id === message.conversationId ? {
      ...conversation,
      preview: getMessagePreview(message),
      time: formatTime(message.createdAt)
    } : conversation)));
  };
  const selectConversation = (conversation) => {
    setActive(conversation);
    setSubmitError2(null);
    socketRef.current?.emit("conversation:join", {
      conversationId: conversation.id
    });
    setConversations((current) => persistConversations(viewer?.id || 0, current.map((item) => item.id === conversation.id ? {
      ...item,
      unread: 0
    } : item)));
  };
  const sendMessage = async (body = draft, kind = "text") => {
    if (!viewer || !active || !body.trim() || !socketRef.current) {
      return;
    }
    stopTyping();
    setIsSending(true);
    setSubmitError2(null);
    socketRef.current.emit("message:send", {
      conversationId: active.id,
      senderId: viewer.id,
      receiverId: active.otherUserId,
      body,
      kind,
      job: active.job,
      toUser: {
        id: active.otherUserId,
        name: active.otherUserName,
        avatarUrl: active.otherUserAvatarUrl
      },
      fromUser: {
        id: viewer.id,
        name: displayName,
        avatarUrl: viewer.avatarUrl
      }
    }, (response) => {
      setIsSending(false);
      if (!response.ok || !response.message) {
        setSubmitError2(response.formError || "Could not send message.");
        return;
      }
      appendMessage(viewer.id, response.message);
      if (kind === "text") {
        setDraft("");
      }
    });
  };
  const sendCallHistoryMessage = (call, body) => {
    if (!viewer || !socketRef.current) {
      return;
    }
    const conversation = conversationsRef.current.find((item) => item.id === call.conversationId) || (active?.id === call.conversationId ? active : null);
    if (!conversation) {
      return;
    }
    const receiverId = call.fromUserId === viewer.id ? call.toUserId : call.fromUserId;
    socketRef.current.emit("message:send", {
      conversationId: conversation.id,
      senderId: viewer.id,
      receiverId,
      body,
      kind: "call",
      job: conversation.job,
      toUser: {
        id: conversation.otherUserId,
        name: conversation.otherUserName,
        avatarUrl: conversation.otherUserAvatarUrl
      },
      fromUser: {
        id: viewer.id,
        name: displayName,
        avatarUrl: viewer.avatarUrl
      }
    }, (response) => {
      if (response.ok && response.message) {
        appendMessage(viewer.id, response.message);
      }
    });
  };
  const openCall = async (mode) => {
    if (!viewer || !active || !socketRef.current || activeCall) {
      return;
    }
    setSubmitError2(null);
    try {
      const stream = await openLocalCallStream(mode);
      const callId = crypto.randomUUID();
      const peerConnection = createPeerConnection(callId, active.id, viewer.id, active.otherUserId);
      stream.getTracks().forEach((track) => peerConnection.addTrack(track, stream));
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);
      setActiveCall({
        callId,
        conversationId: active.id,
        mode,
        status: "outgoing",
        fromUserId: viewer.id,
        toUserId: active.otherUserId,
        fromName: displayName
      });
      socketRef.current.emit("call:invite", {
        callId,
        conversationId: active.id,
        fromUserId: viewer.id,
        toUserId: active.otherUserId,
        fromName: displayName,
        fromAvatarUrl: viewer.avatarUrl,
        job: active.job,
        mode,
        offer
      });
      sendCallHistoryMessage({
        callId,
        conversationId: active.id,
        mode,
        status: "outgoing",
        fromUserId: viewer.id,
        toUserId: active.otherUserId,
        fromName: displayName
      }, `${getCallModeLabel(mode)} call started.`);
    } catch (error) {
      cleanupCall(false);
      setSubmitError2(error instanceof Error ? error.message : "Could not start the call.");
    }
  };
  const answerCall = async () => {
    if (!viewer || !activeCall?.offer || activeCall.status !== "incoming" || !socketRef.current) {
      return;
    }
    setSubmitError2(null);
    try {
      socketRef.current.emit("conversation:join", {
        conversationId: activeCall.conversationId
      });
      const stream = await openLocalCallStream(activeCall.mode);
      const peerConnection = createPeerConnection(activeCall.callId, activeCall.conversationId, viewer.id, activeCall.fromUserId);
      stream.getTracks().forEach((track) => peerConnection.addTrack(track, stream));
      await peerConnection.setRemoteDescription(new RTCSessionDescription(activeCall.offer));
      await flushPendingIceCandidates();
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);
      const startedAt = (/* @__PURE__ */ new Date()).toISOString();
      setActiveCall((current) => current ? {
        ...current,
        status: "active",
        startedAt: Date.now()
      } : current);
      socketRef.current.emit("call:answer", {
        callId: activeCall.callId,
        conversationId: activeCall.conversationId,
        fromUserId: viewer.id,
        toUserId: activeCall.fromUserId,
        answer,
        startedAt
      });
      clearPendingIncomingCall(activeCall.callId);
      sendCallHistoryMessage(activeCall, `${getCallModeLabel(activeCall.mode)} call answered.`);
    } catch (error) {
      cleanupCall(false);
      setSubmitError2(error instanceof Error ? error.message : "Could not answer the call.");
    }
  };
  const endInlineCall = () => {
    cleanupCall(true);
  };
  const openLocalCallStream = async (mode) => {
    if (!navigator.mediaDevices?.getUserMedia) {
      throw new Error("Camera and microphone are not available in this browser.");
    }
    const stream = mode === "video" ? await openVideoOrAudioFallback() : await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    });
    callStreamRef.current = stream;
    window.setTimeout(() => {
      if (localCallVideoRef.current) {
        localCallVideoRef.current.srcObject = stream;
      }
    }, 0);
    return stream;
  };
  const openVideoOrAudioFallback = async () => {
    try {
      return await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: {
          width: {
            ideal: 1280
          },
          height: {
            ideal: 720
          }
        }
      });
    } catch (error) {
      if (!isVideoSourceError(error)) {
        throw error;
      }
      try {
        const audioOnlyStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false
        });
        setSubmitError2("Camera is busy or unavailable, so you joined with microphone only.");
        return audioOnlyStream;
      } catch {
        throw error;
      }
    }
  };
  const createPeerConnection = (callId, conversationId, fromUserId, toUserId) => {
    const peerConnection = new RTCPeerConnection({
      iceServers: [{
        urls: "stun:stun.l.google.com:19302"
      }]
    });
    peerConnectionRef.current = peerConnection;
    remoteCallStreamRef.current = new MediaStream();
    peerConnection.onicecandidate = (event) => {
      if (!event.candidate) {
        return;
      }
      socketRef.current?.emit("call:ice-candidate", {
        callId,
        conversationId,
        fromUserId,
        toUserId,
        candidate: event.candidate.toJSON()
      });
    };
    peerConnection.ontrack = (event) => {
      const [stream] = event.streams;
      const remoteStream = stream || remoteCallStreamRef.current;
      if (!remoteStream) {
        return;
      }
      if (event.track && !remoteStream.getTracks().includes(event.track)) {
        remoteStream.addTrack(event.track);
      }
      remoteCallStreamRef.current = remoteStream;
      if (remoteCallAudioRef.current) {
        remoteCallAudioRef.current.srcObject = remoteStream;
      }
      if (remoteCallVideoRef.current) {
        remoteCallVideoRef.current.srcObject = remoteStream;
      }
    };
    peerConnection.onconnectionstatechange = () => {
      if (["closed", "disconnected", "failed"].includes(peerConnection.connectionState)) {
        cleanupCall(false);
      }
    };
    return peerConnection;
  };
  const flushPendingIceCandidates = async () => {
    if (!peerConnectionRef.current?.remoteDescription) {
      return;
    }
    for (const candidate of pendingIceCandidatesRef.current) {
      await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(candidate));
    }
    pendingIceCandidatesRef.current = [];
  };
  const cleanupCall = (notifyPeer = true) => {
    const callToClose = activeCall;
    if (callToClose) {
      clearPendingIncomingCall(callToClose.callId);
    }
    if (notifyPeer && callToClose) {
      sendCallHistoryMessage(callToClose, getCallCloseHistoryBody(callToClose));
    }
    if (notifyPeer && viewer && callToClose && socketRef.current) {
      const peerUserId = callToClose.fromUserId === viewer.id ? callToClose.toUserId : callToClose.fromUserId;
      socketRef.current.emit("call:end", {
        callId: callToClose.callId,
        conversationId: callToClose.conversationId,
        fromUserId: viewer.id,
        toUserId: peerUserId
      });
    }
    peerConnectionRef.current?.close();
    peerConnectionRef.current = null;
    callStreamRef.current?.getTracks().forEach((track) => track.stop());
    callStreamRef.current = null;
    remoteCallStreamRef.current?.getTracks().forEach((track) => track.stop());
    remoteCallStreamRef.current = null;
    pendingIceCandidatesRef.current = [];
    if (localCallVideoRef.current) {
      localCallVideoRef.current.srcObject = null;
    }
    if (remoteCallVideoRef.current) {
      remoteCallVideoRef.current.srcObject = null;
    }
    if (remoteCallAudioRef.current) {
      remoteCallAudioRef.current.srcObject = null;
    }
    setActiveCall(null);
    setCallSeconds(0);
  };
  const sendAttachment = async (file) => {
    if (file.size > MAX_ATTACHMENT_BYTES) {
      setSubmitError2("Attachment must be 2 MB or smaller.");
      return;
    }
    try {
      const dataUrl = await readFileAsDataUrl$1(file);
      await sendMessage(JSON.stringify({
        fileName: file.name,
        fileType: file.type || "application/octet-stream",
        fileSize: file.size,
        dataUrl
      }), "attachment");
    } catch (error) {
      setSubmitError2(error instanceof Error ? error.message : "Could not attach this file.");
    }
  };
  const updateDraft = (value) => {
    setDraft(value);
    emitTyping(value);
  };
  const emitTyping = (value) => {
    if (!viewer || !active || !socketRef.current) {
      return;
    }
    if (!value.trim()) {
      stopTyping();
      return;
    }
    socketRef.current.emit("typing:start", {
      conversationId: active.id,
      userId: viewer.id,
      receiverId: active.otherUserId,
      name: displayName
    });
    if (typingStopTimerRef.current) {
      window.clearTimeout(typingStopTimerRef.current);
    }
    typingStopTimerRef.current = window.setTimeout(stopTyping, 1200);
  };
  const stopTyping = () => {
    if (typingStopTimerRef.current) {
      window.clearTimeout(typingStopTimerRef.current);
      typingStopTimerRef.current = null;
    }
    if (!viewer || !active || !socketRef.current) {
      return;
    }
    socketRef.current.emit("typing:stop", {
      conversationId: active.id,
      userId: viewer.id,
      receiverId: active.otherUserId
    });
  };
  const clearConversationLocally = (userId, conversationId) => {
    setMessagesByConversation((current) => {
      const next = {
        ...current,
        [conversationId]: []
      };
      localStorage.setItem(storageKey(userId, "messages"), JSON.stringify(next));
      return next;
    });
    setConversations((current) => persistConversations(userId, current.map((conversation) => conversation.id === conversationId ? {
      ...conversation,
      preview: "Chat cleared",
      time: "",
      unread: 0
    } : conversation)));
  };
  const clearChat = () => {
    if (!viewer || !active) {
      return;
    }
    const conversationId = active.id;
    clearConversationLocally(viewer.id, conversationId);
    setTypingByConversation((current) => {
      const next = {
        ...current
      };
      delete next[conversationId];
      return next;
    });
    setSubmitError2(null);
    if (!socketRef.current) {
      return;
    }
    socketRef.current.emit("conversation:clear", {
      conversationId,
      userId: viewer.id
    }, (response) => {
      if (!response.ok) {
        console.warn(response.formError || "Could not clear this chat on the server.");
        return;
      }
    });
  };
  const activeMessages = active ? messagesByConversation[active.id] || [] : [];
  const typingName = active ? typingByConversation[active.id] : "";
  return /* @__PURE__ */ jsx(AppShell, { title: "Messages", userName: displayName, userRole: "Professional", userAvatarUrl: viewer?.avatarUrl, children: /* @__PURE__ */ jsxs("div", { className: "grid h-[calc(100vh-12rem)] overflow-hidden rounded-xl border border-border bg-card shadow-soft md:grid-cols-[320px_1fr]", children: [
    /* @__PURE__ */ jsx(MessageSidebar, { conversations, active, emptyText: "No client messages yet.", onSelect: selectConversation }),
    /* @__PURE__ */ jsx("section", { className: "flex min-h-0 flex-col", children: active ? /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(MessageHeader, { active, activeCall: activeCall?.conversationId === active.id ? activeCall : null, callSeconds, typingName, openCall, endCall: endInlineCall, clearChat }),
      /* @__PURE__ */ jsx(InlineCallPanel, { activeCall: activeCall?.conversationId === active.id ? activeCall : null, callSeconds, otherUserName: active.otherUserName, localVideoRef: localCallVideoRef, remoteVideoRef: remoteCallVideoRef, remoteAudioRef: remoteCallAudioRef, answerCall, endCall: endInlineCall }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1 space-y-3 overflow-y-auto bg-surface p-6", children: [
        activeMessages.map((message) => /* @__PURE__ */ jsx(MessageBubble, { message, mine: message.senderId === viewer?.id }, message.id)),
        typingName ? /* @__PURE__ */ jsx(TypingIndicator, { name: typingName }) : null
      ] }),
      /* @__PURE__ */ jsx(MessageComposer, { draft, setDraft: updateDraft, submitError, isSending, sendMessage: () => void sendMessage(), sendAttachment: (file) => void sendAttachment(file) })
    ] }) : /* @__PURE__ */ jsx(EmptyConversation, { text: "Client messages will appear here when someone contacts you." }) })
  ] }) });
}
function MessageSidebar({
  conversations,
  active,
  emptyText,
  onSelect
}) {
  return /* @__PURE__ */ jsxs("aside", { className: "border-r border-border", children: [
    /* @__PURE__ */ jsx("div", { className: "border-b border-border p-4", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
      /* @__PURE__ */ jsx(Input, { placeholder: "Search client messages", className: "pl-9" })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "overflow-y-auto", children: conversations.length ? conversations.map((conversation) => /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => onSelect(conversation), className: `flex w-full items-start gap-3 border-b border-border px-4 py-3 text-left transition-colors ${active?.id === conversation.id ? "bg-primary/5" : "hover:bg-muted"}`, children: [
      /* @__PURE__ */ jsx("img", { src: conversation.otherUserAvatarUrl || "https://i.pravatar.cc/100?u=message-user", className: "h-10 w-10 rounded-full object-cover", alt: "" }),
      /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2", children: [
          /* @__PURE__ */ jsx("p", { className: "truncate text-sm font-semibold", children: conversation.otherUserName }),
          /* @__PURE__ */ jsx("span", { className: "text-[10px] text-muted-foreground", children: conversation.time })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "truncate text-xs text-muted-foreground", children: conversation.preview }),
        /* @__PURE__ */ jsxs("p", { className: "mt-1 truncate text-[10px] uppercase tracking-wider text-primary", children: [
          "re: ",
          conversation.job
        ] })
      ] }),
      conversation.unread > 0 ? /* @__PURE__ */ jsx("span", { className: "grid h-5 w-5 place-items-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground", children: conversation.unread }) : null
    ] }, conversation.id)) : /* @__PURE__ */ jsx("div", { className: "p-6 text-sm text-muted-foreground", children: emptyText }) })
  ] });
}
function MessageHeader({
  active,
  activeCall,
  callSeconds,
  typingName,
  openCall,
  endCall,
  clearChat
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return /* @__PURE__ */ jsxs("header", { className: "flex items-center gap-3 border-b border-border p-4", children: [
    /* @__PURE__ */ jsx("img", { src: active.otherUserAvatarUrl || "https://i.pravatar.cc/100?u=message-user", className: "h-10 w-10 rounded-full object-cover", alt: "" }),
    /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
        /* @__PURE__ */ jsx("p", { className: "truncate text-sm font-semibold", children: active.otherUserName }),
        typingName ? /* @__PURE__ */ jsx(HeaderTypingDots, {}) : null,
        activeCall ? /* @__PURE__ */ jsx("span", { className: "rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase text-primary", children: activeCall.status === "active" ? formatCallDuration(callSeconds) : activeCall.status }) : null
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "truncate text-xs text-muted-foreground", children: [
        "re: ",
        active.job
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-1 text-muted-foreground", children: [
      activeCall ? /* @__PURE__ */ jsx("button", { type: "button", onClick: endCall, className: "grid h-9 w-9 place-items-center rounded-lg bg-destructive text-destructive-foreground hover:bg-destructive/90", "aria-label": "Hang up call", children: /* @__PURE__ */ jsx(PhoneOff, { className: "h-4 w-4" }) }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("button", { type: "button", onClick: () => openCall("voice"), className: "grid h-9 w-9 place-items-center rounded-lg hover:bg-muted hover:text-foreground", "aria-label": "Start voice call", children: /* @__PURE__ */ jsx(Phone, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsx("button", { type: "button", onClick: () => openCall("video"), className: "grid h-9 w-9 place-items-center rounded-lg hover:bg-muted hover:text-foreground", "aria-label": "Start video call", children: /* @__PURE__ */ jsx(Video, { className: "h-4 w-4" }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setIsMenuOpen((current) => !current), className: "grid h-9 w-9 place-items-center rounded-lg hover:bg-muted hover:text-foreground", "aria-label": "Open chat options", children: /* @__PURE__ */ jsx(MoreHorizontal, { className: "h-4 w-4" }) }),
        isMenuOpen ? /* @__PURE__ */ jsx("div", { className: "absolute right-0 top-11 z-20 w-40 rounded-lg border border-border bg-card p-1 text-sm text-foreground shadow-soft", children: /* @__PURE__ */ jsx("button", { type: "button", onClick: () => {
          clearChat();
          setIsMenuOpen(false);
        }, className: "w-full rounded-md px-3 py-2 text-left hover:bg-muted", children: "Clear chat" }) }) : null
      ] })
    ] })
  ] });
}
function InlineCallPanel({
  activeCall,
  callSeconds,
  otherUserName,
  localVideoRef,
  remoteVideoRef,
  remoteAudioRef,
  answerCall,
  endCall
}) {
  if (!activeCall) {
    return null;
  }
  return /* @__PURE__ */ jsx("div", { className: "border-b border-border bg-primary/5 p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3 rounded-xl border border-primary/20 bg-card p-4 shadow-soft sm:flex-row sm:items-center sm:justify-between", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsx("div", { className: "grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground", children: activeCall.mode === "video" ? /* @__PURE__ */ jsx(Video, { className: "h-5 w-5" }) : /* @__PURE__ */ jsx(Phone, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "font-semibold", children: activeCall.status === "incoming" ? "Incoming call" : activeCall.status === "outgoing" ? "Calling..." : formatCallDuration(callSeconds) }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
          activeCall.mode === "video" ? "Video call" : "Voice call",
          " with",
          " ",
          activeCall.status === "incoming" ? activeCall.fromName : otherUserName
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("audio", { ref: remoteAudioRef, autoPlay: true, playsInline: true }),
    activeCall.mode === "video" ? /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsx("video", { ref: remoteVideoRef, autoPlay: true, playsInline: true, className: "h-24 w-36 rounded-lg bg-foreground object-cover" }),
      /* @__PURE__ */ jsx("video", { ref: localVideoRef, autoPlay: true, playsInline: true, muted: true, className: "h-24 w-36 rounded-lg bg-foreground object-cover" })
    ] }) : null,
    /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
      activeCall.status === "incoming" ? /* @__PURE__ */ jsx(Button, { onClick: answerCall, children: "Answer" }) : null,
      /* @__PURE__ */ jsx(Button, { variant: "destructive", onClick: endCall, children: activeCall.status === "incoming" ? "Decline" : "Hang up" })
    ] })
  ] }) });
}
function MessageComposer({
  draft,
  setDraft,
  submitError,
  isSending,
  sendMessage,
  sendAttachment
}) {
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const fileInputRef = useRef(null);
  return /* @__PURE__ */ jsxs("footer", { className: "border-t border-border p-3", children: [
    submitError ? /* @__PURE__ */ jsx("p", { className: "mb-2 text-sm text-destructive", children: submitError }) : null,
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx("input", { ref: fileInputRef, type: "file", className: "hidden", onChange: (event) => {
        const file = event.target.files?.[0];
        if (file) {
          sendAttachment(file);
        }
        event.currentTarget.value = "";
      } }),
      /* @__PURE__ */ jsx("button", { type: "button", onClick: () => fileInputRef.current?.click(), className: "grid h-9 w-9 place-items-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground", "aria-label": "Attach file", children: /* @__PURE__ */ jsx(Paperclip, { className: "h-4 w-4" }) }),
      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setIsEmojiOpen((current) => !current), className: "grid h-9 w-9 place-items-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground", "aria-label": "Add emoji", children: /* @__PURE__ */ jsx(Smile, { className: "h-4 w-4" }) }),
        isEmojiOpen ? /* @__PURE__ */ jsx("div", { className: "absolute bottom-11 left-0 z-30 grid w-56 grid-cols-8 gap-1 rounded-xl border border-border bg-card p-2 shadow-elevated", children: EMOJIS.map((emoji) => /* @__PURE__ */ jsx("button", { type: "button", onClick: () => {
          setDraft(`${draft}${emoji}`);
          setIsEmojiOpen(false);
        }, className: "grid h-7 w-7 place-items-center rounded-md text-lg hover:bg-muted", children: emoji }, emoji)) }) : null
      ] }),
      /* @__PURE__ */ jsx(Input, { placeholder: "Type a message...", className: "flex-1", value: draft, onChange: (event) => setDraft(event.target.value), onKeyDown: (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          sendMessage();
        }
      } }),
      /* @__PURE__ */ jsx(Button, { onClick: sendMessage, disabled: isSending, children: /* @__PURE__ */ jsx(Send, { className: "h-4 w-4" }) })
    ] })
  ] });
}
function MessageBubble({
  message,
  mine
}) {
  const isCallMessage = message.kind === "call" || message.body.startsWith("Call started:") || message.body === "Call ended.";
  if (message.kind === "attachment") {
    const attachment = parseAttachment(message.body);
    return /* @__PURE__ */ jsx("div", { className: `flex ${mine ? "justify-end" : "justify-start"}`, children: /* @__PURE__ */ jsxs("div", { className: `max-w-md rounded-2xl px-4 py-3 text-sm shadow-soft ${mine ? "bg-primary text-primary-foreground" : "bg-card text-foreground"}`, children: [
      attachment?.fileType.startsWith("image/") ? /* @__PURE__ */ jsx("img", { src: attachment.dataUrl, alt: "", className: "mb-3 max-h-56 rounded-xl object-cover" }) : null,
      /* @__PURE__ */ jsxs("a", { href: attachment?.dataUrl || "#", download: attachment?.fileName, className: `flex items-center gap-2 font-medium ${mine ? "text-primary-foreground" : "text-primary"}`, children: [
        /* @__PURE__ */ jsx(Paperclip, { className: "h-4 w-4" }),
        /* @__PURE__ */ jsx("span", { className: "truncate", children: attachment?.fileName || "Attachment" })
      ] }),
      attachment ? /* @__PURE__ */ jsx("p", { className: `mt-1 text-xs ${mine ? "text-primary-foreground/70" : "text-muted-foreground"}`, children: formatFileSize$2(attachment.fileSize) }) : null,
      /* @__PURE__ */ jsx("p", { className: `mt-1 text-[10px] ${mine ? "text-primary-foreground/70" : "text-muted-foreground"}`, children: new Date(message.createdAt).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit"
      }) })
    ] }) });
  }
  if (isCallMessage) {
    const isEnded = message.body === "Call ended." || message.body.includes("ended") || message.body.includes("canceled") || message.body.includes("declined");
    return /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxs("div", { className: "flex max-w-sm items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm shadow-soft", children: [
      /* @__PURE__ */ jsx("div", { className: `grid h-9 w-9 place-items-center rounded-full ${isEnded ? "bg-muted text-muted-foreground" : "bg-primary text-primary-foreground"}`, children: message.body.includes("Video") ? /* @__PURE__ */ jsx(Video, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(Phone, { className: "h-4 w-4" }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "font-medium", children: getCallHistoryTitle(message.body) }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: message.body.replace("Call started: ", "") })
      ] })
    ] }) });
  }
  return /* @__PURE__ */ jsx("div", { className: `flex ${mine ? "justify-end" : "justify-start"}`, children: /* @__PURE__ */ jsxs("div", { className: `max-w-md whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm shadow-soft ${mine ? "bg-primary text-primary-foreground" : "bg-card text-foreground"}`, children: [
    /* @__PURE__ */ jsx("p", { children: message.body }),
    /* @__PURE__ */ jsx("p", { className: `mt-1 text-[10px] ${mine ? "text-primary-foreground/70" : "text-muted-foreground"}`, children: new Date(message.createdAt).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit"
    }) })
  ] }) });
}
function TypingIndicator({
  name
}) {
  return /* @__PURE__ */ jsx("div", { className: "flex justify-start", children: /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-card px-4 py-2.5 text-sm shadow-soft", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-1 text-xs text-muted-foreground", children: [
      name,
      " is typing"
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex items-center gap-1", children: [0, 150, 300].map((delay) => /* @__PURE__ */ jsx("span", { className: "h-2 w-2 animate-bounce rounded-full bg-muted-foreground", style: {
      animationDelay: `${delay}ms`
    } }, delay)) })
  ] }) });
}
function HeaderTypingDots() {
  return /* @__PURE__ */ jsx("span", { className: "flex h-5 items-center gap-1 rounded-full bg-primary/10 px-2", "aria-label": "Typing", children: [0, 150, 300].map((delay) => /* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 animate-bounce rounded-full bg-primary", style: {
    animationDelay: `${delay}ms`
  } }, delay)) });
}
function EmptyConversation({
  text
}) {
  return /* @__PURE__ */ jsx("div", { className: "grid flex-1 place-items-center bg-surface p-6 text-center", children: /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("p", { className: "text-lg font-semibold", children: "No conversation selected" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: text })
  ] }) });
}
function readPendingIncomingCall(viewerId) {
  try {
    const raw = sessionStorage.getItem("servio:pending-incoming-call");
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw);
    const call = parsed.call;
    if (!call?.callId || !call.conversationId || call.toUserId !== viewerId || !call.offer) {
      return null;
    }
    if (parsed.createdAt && Date.now() - parsed.createdAt > 6e4) {
      sessionStorage.removeItem("servio:pending-incoming-call");
      return null;
    }
    return call;
  } catch {
    return null;
  }
}
function clearPendingIncomingCall(callId) {
  try {
    const raw = sessionStorage.getItem("servio:pending-incoming-call");
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (parsed.call?.callId === callId) {
      sessionStorage.removeItem("servio:pending-incoming-call");
    }
  } catch {
    sessionStorage.removeItem("servio:pending-incoming-call");
  }
}
function buildConversationFromCall(payload) {
  return {
    id: payload.conversationId,
    otherUserId: payload.fromUserId,
    otherUserName: payload.fromName || "Caller",
    otherUserAvatarUrl: payload.fromAvatarUrl || null,
    job: payload.job || "Direct call",
    preview: `${getCallModeLabel(payload.mode || "voice")} call incoming`,
    time: formatTime((/* @__PURE__ */ new Date()).toISOString()),
    unread: 0
  };
}
function storageKey(userId, suffix) {
  return `servio:socket:${userId}:${suffix}`;
}
function readJson(key, fallback) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}
function persistConversations(userId, conversations) {
  if (userId) {
    localStorage.setItem(storageKey(userId, "conversations"), JSON.stringify(conversations));
  }
  return conversations;
}
function persistMessages(userId, messagesByConversation) {
  if (userId) {
    localStorage.setItem(storageKey(userId, "messages"), JSON.stringify(messagesByConversation));
  }
  return messagesByConversation;
}
function upsertConversationList(conversations, conversation) {
  const withoutCurrent = conversations.filter((item) => item.id !== conversation.id);
  return [conversation, ...withoutCurrent];
}
function mergeConversationLists(primary, fallback) {
  const seen = /* @__PURE__ */ new Set();
  const merged = [];
  for (const conversation of [...primary, ...fallback]) {
    if (seen.has(conversation.id)) {
      continue;
    }
    seen.add(conversation.id);
    merged.push(conversation);
  }
  return merged;
}
function mergeMessagesByConversation(fallback, primary) {
  const conversationIds = /* @__PURE__ */ new Set([...Object.keys(fallback), ...Object.keys(primary)]);
  const merged = {};
  for (const conversationId of conversationIds) {
    const byId = /* @__PURE__ */ new Map();
    for (const message of [...fallback[conversationId] || [], ...primary[conversationId] || []]) {
      byId.set(message.id, message);
    }
    merged[conversationId] = Array.from(byId.values()).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  }
  return merged;
}
function formatTime(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit"
  });
}
function formatCallDuration(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
}
function getCallModeLabel(mode) {
  return mode === "video" ? "Video" : "Voice";
}
function getCallCloseHistoryBody(call) {
  const mode = getCallModeLabel(call.mode);
  if (call.status === "incoming") {
    return `${mode} call declined.`;
  }
  if (call.status === "outgoing") {
    return `${mode} call canceled.`;
  }
  const durationSeconds = call.startedAt ? Math.max(0, Math.floor((Date.now() - call.startedAt) / 1e3)) : 0;
  return `${mode} call ended (${formatCallDuration(durationSeconds)}).`;
}
function isVideoSourceError(error) {
  if (!(error instanceof DOMException)) {
    return false;
  }
  const message = error.message.toLowerCase();
  return ["NotReadableError", "AbortError", "NotFoundError", "OverconstrainedError"].includes(error.name) || message.includes("video source") || message.includes("camera");
}
function getCallHistoryTitle(body) {
  if (body.includes("declined")) {
    return "Call declined";
  }
  if (body.includes("canceled")) {
    return "Call canceled";
  }
  if (body.includes("answered")) {
    return "Call answered";
  }
  if (body.includes("ended") || body === "Call ended.") {
    return "Call ended";
  }
  return "Call started";
}
function getSocketUrl$5() {
  return `${window.location.protocol}//${window.location.hostname}:4001`;
}
const EMOJIS = ["😀", "😁", "😂", "😊", "😍", "👍", "🙏", "🎉", "🔥", "✅", "❤️", "👌", "😎", "🤝", "💡", "⭐"];
const MAX_ATTACHMENT_BYTES = 2 * 1024 * 1024;
function readFileAsDataUrl$1(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("Could not read this file."));
    reader.readAsDataURL(file);
  });
}
function parseAttachment(body) {
  try {
    return JSON.parse(body);
  } catch {
    return null;
  }
}
function getMessagePreview(message) {
  if (message.kind === "attachment") {
    const attachment = parseAttachment(message.body);
    return attachment ? `Attachment: ${attachment.fileName}` : "Attachment";
  }
  return message.body;
}
function formatFileSize$2(bytes) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
const Route$w = Route$x;
const Slider = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxs(
  SliderPrimitive.Root,
  {
    ref,
    className: cn("relative flex w-full touch-none select-none items-center", className),
    ...props,
    children: [
      /* @__PURE__ */ jsx(SliderPrimitive.Track, { className: "relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20", children: /* @__PURE__ */ jsx(SliderPrimitive.Range, { className: "absolute h-full bg-primary" }) }),
      /* @__PURE__ */ jsx(SliderPrimitive.Thumb, { className: "block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" })
    ]
  }
));
Slider.displayName = SliderPrimitive.Root.displayName;
const professionalProfileSchema = z.object({
  fullName: z.string().trim().min(2, "Full name is required."),
  profilePhotoUrl: z.string().trim().optional(),
  professionalCategory: z.string().trim().min(2, "Add your main skill or service category."),
  professionalCity: z.string().trim().min(2, "City is required."),
  skillsText: z.string().trim().min(2, "Add at least one skill or service."),
  experienceYears: z.coerce.number().min(0).max(80).optional().nullable(),
  hourlyRate: z.coerce.number().min(0).optional().nullable(),
  fixedRate: z.coerce.number().min(0).optional().nullable(),
  portfolioUrl: z.string().trim().optional(),
  workPhotosText: z.string().trim().optional(),
  certificationsText: z.string().trim().optional(),
  tradeLicenseUrl: z.string().trim().optional(),
  availabilityStatus: z.enum(["available", "busy", "unavailable"]),
  serviceArea: z.string().trim().min(2, "Service area is required."),
  serviceRadiusKm: z.coerce.number().min(0).max(500).optional().nullable(),
  workMode: z.enum(["remote", "onsite", "both"]),
  companyDescription: z.string().trim().min(10, "Add a short professional bio."),
  address: z.string().trim().min(3, "Address or base location is required."),
  emailNotificationsEnabled: z.boolean(),
  browserNotificationsEnabled: z.boolean(),
  projectActivityNotificationsEnabled: z.boolean(),
  governmentIdUrl: z.string().trim().optional(),
  insuranceUrl: z.string().trim().optional(),
  selfieUrl: z.string().trim().optional()
});
const verificationDocumentOptions = [{
  value: "governmentIdUrl",
  label: "Government ID",
  description: "Passport, Aadhaar, voter ID, or another government identity document.",
  icon: FileText
}, {
  value: "tradeLicenseUrl",
  label: "License",
  description: "Trade license, professional license, or business registration.",
  icon: FileBadge
}, {
  value: "certificationsText",
  label: "Certificates",
  description: "Training certificate, award, or qualification proof.",
  icon: FileCheck
}, {
  value: "insuranceUrl",
  label: "Insurance",
  description: "Liability, work, or service insurance document.",
  icon: ShieldCheck
}, {
  value: "selfieUrl",
  label: "Selfie verification",
  description: "Selfie check to help confirm the profile owner.",
  icon: Camera
}];
const skillOptions = ["Plumbing", "Electrical", "Cleaning", "Repair", "Moving", "Photography", "Design", "Development", "Marketing", "Tutoring", "Carpentry", "Painting"];
const serviceRadiusPresets = [5, 10, 25, 50];
const getProfessionalProfilePage = createServerFn({
  method: "GET"
}).handler(createSsrRpc("b2006b819abe3a98a4efe84f86e34301cda5272937d3b6465571260d9bd38adf"));
const saveProfessionalProfile = createServerFn({
  method: "POST"
}).inputValidator((data) => professionalProfileSchema.parse(data)).handler(createSsrRpc("2e19328f8538965cc4bf2bfc8b18be8bea3d6b7d5a5ff3c16c8035b343b4f683"));
const saveProfessionalVerificationUpload = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(createSsrRpc("ebed5c2a9559ca743c744b5b964f96de975e6711abfd36ee0215df6b6bfa8f38"));
const saveProfessionalWorkPhotosUpload = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(createSsrRpc("78a30400a82c387d7f50258c6808cbacab370d3279d39fe0320a38c6abff7b9a"));
const saveProfessionalProfilePhotoUpload = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(createSsrRpc("ee8e3371be33623c7fdc5db78b469509f3e5beacdc3e1feba4b39d1c7891bc6f"));
const Route$v = createFileRoute("/professional-profile")({
  beforeLoad: async ({
    location
  }) => {
    const data = await getProfessionalProfilePage();
    if (!data?.viewer) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href
        }
      });
    }
    if (data.viewer.role !== "PROFESSIONAL") {
      throw redirect({
        to: "/profile-setup"
      });
    }
  },
  loader: () => getProfessionalProfilePage(),
  head: () => ({
    meta: [{
      title: "Professional profile setup - Servio"
    }, {
      name: "description",
      content: "Complete your professional profile for Phase-1 discovery."
    }]
  }),
  component: ProfessionalProfileSetup
});
function ProfessionalProfileSetup() {
  const data = useLoaderData({
    from: "/professional-profile"
  });
  const router2 = useRouter();
  const viewer = data?.viewer;
  const profile = data?.professionalProfile;
  const verification = data?.verification;
  const [form, setForm] = useState(() => ({
    fullName: profile?.fullName || `${viewer?.firstName ?? ""} ${viewer?.lastName ?? ""}`.trim(),
    profilePhotoUrl: profile?.avatarUrl || viewer?.avatarUrl || "",
    professionalCategory: profile?.professionalCategory || "",
    professionalCity: profile?.professionalCity || "",
    skillsText: profile?.skills.join(", ") || "",
    experienceYears: profile?.experienceYears ?? 0,
    hourlyRate: profile?.hourlyRate ?? 0,
    fixedRate: profile?.fixedRate ?? 0,
    portfolioUrl: profile?.portfolioUrl || "",
    workPhotosText: profile?.workPhotos.join("\n") || "",
    certificationsText: profile?.certifications.join(", ") || "",
    tradeLicenseUrl: profile?.tradeLicenseUrl || "",
    availabilityStatus: profile?.availabilityStatus || "available",
    serviceArea: profile?.serviceArea || "",
    serviceRadiusKm: profile?.serviceRadiusKm ?? 10,
    workMode: profile?.workMode || "both",
    companyDescription: profile?.companyDescription || "",
    address: profile?.address || "",
    emailNotificationsEnabled: profile?.emailNotificationsEnabled ?? true,
    browserNotificationsEnabled: profile?.browserNotificationsEnabled ?? true,
    projectActivityNotificationsEnabled: profile?.projectActivityNotificationsEnabled ?? true,
    governmentIdUrl: verification?.governmentIdUrl || "",
    insuranceUrl: verification?.insuranceUrl || "",
    selfieUrl: verification?.selfieUrl || ""
  }));
  const [fieldErrors, setFieldErrors] = useState({});
  const [statusMessage, setStatusMessage] = useState(null);
  const [submitError, setSubmitError2] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isVerificationSaving, setIsVerificationSaving] = useState(false);
  const [isWorkPhotosSaving, setIsWorkPhotosSaving] = useState(false);
  const [isProfilePhotoSaving, setIsProfilePhotoSaving] = useState(false);
  const [browserPermission, setBrowserPermission] = useState("unsupported");
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedSkillOption, setSelectedSkillOption] = useState(skillOptions[0]);
  const [customSkill, setCustomSkill] = useState("");
  const [selectedVerificationDoc, setSelectedVerificationDoc] = useState("governmentIdUrl");
  const [locationPickerTarget, setLocationPickerTarget] = useState(null);
  const [locationPickerValue, setLocationPickerValue] = useState("");
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const displayName = form.fullName || `${viewer?.firstName ?? ""} ${viewer?.lastName ?? ""}`.trim() || "Professional";
  const completion = useMemo(() => getCompletion(form), [form]);
  const selectedSkills = splitList(form.skillsText);
  const verificationStatus = getVerificationStatus({
    status: verification?.status,
    governmentIdUrl: form.governmentIdUrl,
    licenseUrl: form.tradeLicenseUrl,
    certificationsText: form.certificationsText,
    insuranceUrl: form.insuranceUrl,
    selfieUrl: form.selfieUrl
  });
  const selectedVerificationOption = verificationDocumentOptions.find((option) => option.value === selectedVerificationDoc) || verificationDocumentOptions[0];
  const SelectedVerificationIcon = selectedVerificationOption.icon;
  const selectedVerificationUploaded = Boolean(form[selectedVerificationDoc]);
  const stopSelfieCamera = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraReady(false);
    setIsCameraOpen(false);
  };
  useEffect(() => {
    return () => {
      stopSelfieCamera();
    };
  }, []);
  useEffect(() => {
    setBrowserPermission("Notification" in window ? Notification.permission : "unsupported");
  }, []);
  useEffect(() => {
    if (!isCameraOpen || !videoRef.current || !streamRef.current) {
      return;
    }
    const video = videoRef.current;
    video.srcObject = streamRef.current;
    const markCameraReady = () => {
      setIsCameraReady(true);
      setCameraError(null);
    };
    video.addEventListener("loadedmetadata", markCameraReady);
    video.addEventListener("canplay", markCameraReady);
    void video.play().catch(() => {
      setCameraError("Camera opened, but the preview could not start. Please try again.");
    });
    return () => {
      video.removeEventListener("loadedmetadata", markCameraReady);
      video.removeEventListener("canplay", markCameraReady);
    };
  }, [isCameraOpen]);
  if (!viewer) {
    return null;
  }
  if (!isEditing) {
    return /* @__PURE__ */ jsx(AppShell, { title: "Professional profile", userName: displayName, userRole: "Professional", userAvatarUrl: form.profilePhotoUrl || viewer.avatarUrl, children: /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsx("div", { className: "rounded-2xl border border-border bg-card p-6 shadow-soft", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6 md:flex-row md:items-start md:justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
          /* @__PURE__ */ jsx("img", { src: form.profilePhotoUrl || viewer.avatarUrl || "https://i.pravatar.cc/140?u=professional-profile", alt: displayName, className: "h-24 w-24 rounded-2xl object-cover" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm text-primary", children: [
              /* @__PURE__ */ jsx(UserRound, { className: "h-4 w-4" }),
              "Professional profile"
            ] }),
            /* @__PURE__ */ jsx("h1", { className: "mt-2 text-2xl font-semibold tracking-tight", children: displayName }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-muted-foreground", children: form.professionalCategory || "Service category not added" }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 max-w-2xl text-sm text-muted-foreground", children: form.companyDescription || "No professional bio added yet." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Button, { type: "button", onClick: () => setIsEditing(true), className: "gap-2", children: [
          /* @__PURE__ */ jsx(Pencil, { className: "h-4 w-4" }),
          "Edit profile"
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "grid gap-6 lg:grid-cols-[1.35fr_1fr]", children: [
        /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-border bg-card p-6 shadow-soft", children: [
          /* @__PURE__ */ jsx(SectionTitle, { title: "Profile information", subtitle: "All information saved in your professional profile." }),
          /* @__PURE__ */ jsxs("div", { className: "mt-5 grid gap-3 sm:grid-cols-2", children: [
            /* @__PURE__ */ jsx(ProfileInfoItem, { label: "Name", value: form.fullName || "Not added" }),
            /* @__PURE__ */ jsx(ProfileInfoItem, { label: "Category", value: form.professionalCategory || "Not added" }),
            /* @__PURE__ */ jsx(ProfileInfoItem, { label: "City", value: form.professionalCity || "Not added" }),
            /* @__PURE__ */ jsx(ProfileInfoItem, { label: "Address", value: form.address || "Not added" }),
            /* @__PURE__ */ jsx(ProfileInfoItem, { label: "Service area", value: form.serviceArea || "Not added" }),
            /* @__PURE__ */ jsx(ProfileInfoItem, { label: "Service radius", value: formatServiceRadius(clampServiceRadius(Number(form.serviceRadiusKm ?? 0))) }),
            /* @__PURE__ */ jsx(ProfileInfoItem, { label: "Work mode", value: capitalizeWords(form.workMode) }),
            /* @__PURE__ */ jsx(ProfileInfoItem, { label: "Availability", value: capitalizeWords(form.availabilityStatus) }),
            /* @__PURE__ */ jsx(ProfileInfoItem, { label: "Experience", value: `${Number(form.experienceYears ?? 0)} years` }),
            /* @__PURE__ */ jsx(ProfileInfoItem, { label: "Hourly rate", value: form.hourlyRate ? `$${Number(form.hourlyRate).toLocaleString()} / hour` : "Not added" }),
            /* @__PURE__ */ jsx(ProfileInfoItem, { label: "Fixed rate", value: form.fixedRate ? `$${Number(form.fixedRate).toLocaleString()}` : "Not added" }),
            /* @__PURE__ */ jsx(ProfileInfoItem, { label: "Portfolio", value: form.portfolioUrl || "Not added" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-border bg-card p-6 shadow-soft", children: [
            /* @__PURE__ */ jsx(SectionTitle, { title: "Skills", subtitle: "Services clients can match with." }),
            /* @__PURE__ */ jsx("div", { className: "mt-5 flex flex-wrap gap-2", children: selectedSkills.length ? selectedSkills.map((skill) => /* @__PURE__ */ jsx("span", { className: "rounded-full border border-border bg-muted/30 px-3 py-1 text-sm", children: skill }, skill)) : /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "No skills added yet." }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-border bg-card p-6 shadow-soft", children: [
            /* @__PURE__ */ jsx(SectionTitle, { title: "Profile status", subtitle: "Completion and verification summary." }),
            /* @__PURE__ */ jsxs("div", { className: "mt-5 space-y-3", children: [
              /* @__PURE__ */ jsx(ProfileInfoItem, { label: "Completion", value: `${completion}%` }),
              /* @__PURE__ */ jsx(ProfileInfoItem, { label: "Verification", value: verificationStatus.label }),
              /* @__PURE__ */ jsx(ProfileInfoItem, { label: "Documents uploaded", value: `${verificationStatus.uploadedCount}/5` })
            ] })
          ] })
        ] })
      ] })
    ] }) });
  }
  const updateField = (key, value) => {
    setForm((current) => ({
      ...current,
      [key]: value
    }));
    setFieldErrors((current) => {
      const next = {
        ...current
      };
      delete next[key];
      return next;
    });
  };
  const openLocationPicker = (target) => {
    setLocationPickerTarget(target);
    setLocationPickerValue(String(form[target] || ""));
  };
  const applyLocationPicker = () => {
    if (!locationPickerTarget) {
      return;
    }
    const selectedLocation = locationPickerValue.trim() || (locationPickerTarget ? String(form[locationPickerTarget] || "").trim() : "");
    if (!selectedLocation) {
      return;
    }
    updateField(locationPickerTarget, selectedLocation);
    if (locationPickerTarget !== "professionalCity" && !form.professionalCity.trim()) {
      updateField("professionalCity", getCityFromLocation(selectedLocation));
    }
    if (locationPickerTarget === "serviceArea") {
      updateField("address", selectedLocation);
    }
    if (locationPickerTarget === "address" && !form.serviceArea.trim()) {
      updateField("serviceArea", selectedLocation);
    }
    setLocationPickerTarget(null);
  };
  const addSkill = (skill) => {
    const trimmedSkill = capitalizeWords(skill).trim();
    if (!trimmedSkill) {
      return;
    }
    const currentSkills = splitList(form.skillsText);
    const alreadyAdded = currentSkills.some((currentSkill) => currentSkill.toLowerCase() === trimmedSkill.toLowerCase());
    if (alreadyAdded) {
      return;
    }
    updateField("skillsText", [...currentSkills, trimmedSkill].join(", "));
  };
  const removeSkill = (skill) => {
    updateField("skillsText", selectedSkills.filter((currentSkill) => currentSkill !== skill).join(", "));
  };
  const handleAddSelectedSkill = () => {
    if (selectedSkillOption === "Other") {
      addSkill(customSkill);
      setCustomSkill("");
      return;
    }
    addSkill(selectedSkillOption);
  };
  const requestBrowserNotificationPermission = async () => {
    if (!("Notification" in window)) {
      setBrowserPermission("unsupported");
      updateField("browserNotificationsEnabled", false);
      setSubmitError2("Browser notifications are not supported in this browser.");
      return;
    }
    const permission = await Notification.requestPermission();
    setBrowserPermission(permission);
    if (permission === "granted") {
      updateField("browserNotificationsEnabled", true);
      setStatusMessage("Browser notifications enabled. Save your profile to keep this setting.");
      return;
    }
    updateField("browserNotificationsEnabled", false);
    setSubmitError2("Browser notification permission was not granted.");
  };
  const handleBrowserNotificationChange = async (checked) => {
    if (!checked) {
      updateField("browserNotificationsEnabled", false);
      return;
    }
    if (!("Notification" in window)) {
      setBrowserPermission("unsupported");
      updateField("browserNotificationsEnabled", false);
      setSubmitError2("Browser notifications are not supported in this browser.");
      return;
    }
    if (Notification.permission === "granted") {
      setBrowserPermission("granted");
      updateField("browserNotificationsEnabled", true);
      return;
    }
    if (Notification.permission === "denied") {
      setBrowserPermission("denied");
      updateField("browserNotificationsEnabled", false);
      setSubmitError2("Browser permission is blocked. Enable notifications from site settings.");
      return;
    }
    await requestBrowserNotificationPermission();
  };
  const readFileAsDataUrl2 = (file) => new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.readAsDataURL(file);
  });
  const handleProfilePhoto = async (file) => {
    if (!file) {
      return;
    }
    const profilePhotoUrl = await readFileAsDataUrl2(file);
    updateField("profilePhotoUrl", profilePhotoUrl);
    setIsProfilePhotoSaving(true);
    setSubmitError2(null);
    setStatusMessage(null);
    try {
      const result = await saveProfessionalProfilePhotoUpload({
        data: {
          profilePhotoUrl
        }
      });
      if (!result.ok) {
        setSubmitError2(result.formError);
        return;
      }
      setStatusMessage("Profile photo updated and saved.");
      await router2.invalidate();
    } catch (error) {
      setSubmitError2(error instanceof Error ? error.message : "Could not save profile photo.");
    } finally {
      setIsProfilePhotoSaving(false);
    }
  };
  const appendWorkPhotos = async (files) => {
    if (!files?.length) {
      return;
    }
    const urls = await Promise.all(Array.from(files).slice(0, 6).map(readFileAsDataUrl2));
    const nextWorkPhotosText = urls.join("\n");
    updateField("workPhotosText", nextWorkPhotosText);
    setIsWorkPhotosSaving(true);
    setSubmitError2(null);
    setStatusMessage(null);
    try {
      const result = await saveProfessionalWorkPhotosUpload({
        data: {
          workPhotosText: nextWorkPhotosText
        }
      });
      if (!result.ok) {
        setSubmitError2(result.formError);
        return;
      }
      setStatusMessage("Work photos updated and saved to your portfolio.");
      await router2.invalidate();
    } catch (error) {
      setSubmitError2(error instanceof Error ? error.message : "Could not save work photos.");
    } finally {
      setIsWorkPhotosSaving(false);
    }
  };
  const appendCertification = async (file) => {
    if (!file) {
      return;
    }
    const current = splitList(form.certificationsText || "");
    updateField("certificationsText", [...current, file.name].join(", "));
  };
  const persistVerificationUpload = async (key, fileUrl) => {
    const nextForm = {
      ...form,
      [key]: fileUrl
    };
    updateField(key, fileUrl);
    setIsVerificationSaving(true);
    setSubmitError2(null);
    setStatusMessage(null);
    try {
      const result = await saveProfessionalVerificationUpload({
        data: {
          governmentIdUrl: nextForm.governmentIdUrl,
          tradeLicenseUrl: nextForm.tradeLicenseUrl,
          certificationsText: nextForm.certificationsText,
          insuranceUrl: nextForm.insuranceUrl,
          selfieUrl: nextForm.selfieUrl
        }
      });
      if (!result.ok) {
        setSubmitError2(result.formError);
        return;
      }
      const documentLabel = verificationDocumentOptions.find((option) => option.value === key)?.label || "Document";
      setStatusMessage(`${documentLabel} uploaded and saved to verification records.`);
      await router2.invalidate();
    } catch (error) {
      setSubmitError2(error instanceof Error ? error.message : "Could not save verification document.");
    } finally {
      setIsVerificationSaving(false);
    }
  };
  const handleVerificationFile = async (key, file) => {
    if (!file) {
      return;
    }
    const fileUrl = await readFileAsDataUrl2(file);
    await persistVerificationUpload(key, fileUrl);
  };
  const startSelfieCamera = async () => {
    setCameraError(null);
    setIsCameraReady(false);
    if (!navigator.mediaDevices?.getUserMedia) {
      setCameraError("Camera access is not available in this browser.");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user"
        },
        audio: false
      });
      streamRef.current = stream;
      setIsCameraOpen(true);
    } catch {
      setIsCameraReady(false);
      setCameraError("Camera permission was denied or the camera could not be opened.");
    }
  };
  const captureSelfie = async () => {
    const video = videoRef.current;
    if (!video || !isCameraReady || !video.videoWidth || !video.videoHeight) {
      setCameraError("Please wait for the camera preview to load.");
      return;
    }
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext("2d");
    context?.drawImage(video, 0, 0, canvas.width, canvas.height);
    const selfieUrl = canvas.toDataURL("image/jpeg", 0.9);
    stopSelfieCamera();
    await persistVerificationUpload("selfieUrl", selfieUrl);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatusMessage(null);
    setSubmitError2(null);
    setFieldErrors({});
    const parsed = professionalProfileSchema.safeParse(form);
    if (!parsed.success) {
      const errors = {};
      for (const issue of parsed.error.issues) {
        errors[String(issue.path[0])] = issue.message;
      }
      setFieldErrors(errors);
      return;
    }
    setIsSaving(true);
    try {
      const result = await saveProfessionalProfile({
        data: parsed.data
      });
      if (!result.ok) {
        setSubmitError2(result.formError);
        return;
      }
      setStatusMessage("Professional profile saved. Clients can now discover this profile.");
      await router2.invalidate();
    } catch (error) {
      setSubmitError2(error instanceof Error ? error.message : "Could not save professional profile.");
    } finally {
      setIsSaving(false);
    }
  };
  return /* @__PURE__ */ jsxs(AppShell, { userName: displayName, userRole: "Professional", userAvatarUrl: form.profilePhotoUrl || viewer.avatarUrl, children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-end", children: [
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("h1", { className: "text-2xl font-semibold tracking-tight", children: "Professional profile setup" }) }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary", children: [
        completion,
        "% complete"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "grid gap-6 lg:grid-cols-[320px_1fr]", children: [
      /* @__PURE__ */ jsxs("aside", { className: "h-fit rounded-xl border border-border bg-card p-5 shadow-soft lg:sticky lg:top-20", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative grid h-24 w-24 shrink-0 place-items-center rounded-full", style: {
            background: `conic-gradient(hsl(var(--primary)) ${completion * 3.6}deg, hsl(var(--muted)) 0deg)`
          }, children: [
            /* @__PURE__ */ jsx("div", { className: "grid h-[86px] w-[86px] place-items-center rounded-full bg-card", children: /* @__PURE__ */ jsx("img", { src: form.profilePhotoUrl || "https://i.pravatar.cc/140?u=professional-profile", alt: displayName, className: "h-20 w-20 rounded-full object-cover" }) }),
            /* @__PURE__ */ jsxs("span", { className: "absolute -bottom-2 rounded-full bg-primary px-2 py-0.5 text-xs font-semibold text-primary-foreground shadow-soft", children: [
              completion,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsx("h2", { className: "truncate font-semibold", children: displayName }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: form.professionalCategory || "Add your main service" }),
            /* @__PURE__ */ jsx(Badge, { className: "mt-3", variant: profile?.isVerified ? "default" : "secondary", children: profile?.isVerified ? "Verified" : "Verification pending" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 rounded-xl border border-border bg-background p-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-sm", children: [
            /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Profile completion" }),
            /* @__PURE__ */ jsxs("span", { className: "font-semibold text-foreground", children: [
              completion,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-3 h-2 overflow-hidden rounded-full bg-muted", children: /* @__PURE__ */ jsx("div", { className: "h-full rounded-full bg-primary", style: {
            width: `${completion}%`
          } }) }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: "Complete your details and verification documents to improve client trust." })
        ] }),
        /* @__PURE__ */ jsx(Button, { asChild: true, type: "button", className: "mt-4 w-full gap-2", children: /* @__PURE__ */ jsxs(Link, { to: "/professional-messages", children: [
          /* @__PURE__ */ jsx(MessageSquare, { className: "h-4 w-4" }),
          "Messages"
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("section", { className: "rounded-xl border border-border bg-card p-6 shadow-soft", children: [
          /* @__PURE__ */ jsx(SectionTitle, { title: "Basic profile", subtitle: "Your public identity on the professional side." }),
          /* @__PURE__ */ jsxs("div", { className: "mt-5 grid gap-4 md:grid-cols-2", children: [
            /* @__PURE__ */ jsx(Field, { label: "Full name", error: fieldErrors.fullName, children: /* @__PURE__ */ jsx(Input, { value: form.fullName, onChange: (event) => updateField("fullName", capitalizeWords(event.target.value)) }) }),
            /* @__PURE__ */ jsx(Field, { label: "Profile picture", error: fieldErrors.profilePhotoUrl, children: /* @__PURE__ */ jsxs("label", { className: "flex h-10 cursor-pointer items-center justify-center gap-2 rounded-md border border-input text-sm hover:bg-muted", children: [
              /* @__PURE__ */ jsx(Camera, { className: "h-4 w-4" }),
              isProfilePhotoSaving ? "Saving..." : form.profilePhotoUrl ? "Change photo" : "Upload photo",
              /* @__PURE__ */ jsx("input", { type: "file", accept: "image/*", className: "sr-only", disabled: isProfilePhotoSaving, onChange: (event) => handleProfilePhoto(event.target.files?.[0]) })
            ] }) }),
            /* @__PURE__ */ jsx(Field, { label: "Main category / service", error: fieldErrors.professionalCategory, children: /* @__PURE__ */ jsx(Input, { placeholder: "e.g. Electrician, UI Designer, Cleaner", value: form.professionalCategory, onChange: (event) => updateField("professionalCategory", capitalizeWords(event.target.value)) }) }),
            /* @__PURE__ */ jsx(Field, { label: "Professional city", error: fieldErrors.professionalCity, children: /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsx(Input, { placeholder: "e.g. Surat", value: form.professionalCity, onChange: (event) => updateField("professionalCity", capitalizeWords(event.target.value)) }),
              /* @__PURE__ */ jsxs(Button, { type: "button", variant: "outline", className: "shrink-0 gap-2", onClick: () => openLocationPicker("professionalCity"), children: [
                /* @__PURE__ */ jsx(MapPin, { className: "h-4 w-4" }),
                "Map"
              ] })
            ] }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "rounded-xl border border-border bg-card p-6 shadow-soft", children: [
          /* @__PURE__ */ jsx(SectionTitle, { title: "Skills, experience, and pricing", subtitle: "Tell clients what you do and how you charge." }),
          /* @__PURE__ */ jsxs("div", { className: "mt-5 grid gap-4 md:grid-cols-2", children: [
            /* @__PURE__ */ jsx(Field, { label: "Skills / services", error: fieldErrors.skillsText, className: "md:col-span-2", children: /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "grid gap-3 md:grid-cols-[1fr_auto]", children: [
                /* @__PURE__ */ jsxs(Select, { value: selectedSkillOption, onValueChange: setSelectedSkillOption, children: [
                  /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
                  /* @__PURE__ */ jsxs(SelectContent, { children: [
                    skillOptions.map((skill) => /* @__PURE__ */ jsx(SelectItem, { value: skill, children: skill }, skill)),
                    /* @__PURE__ */ jsx(SelectItem, { value: "Other", children: "Other" })
                  ] })
                ] }),
                /* @__PURE__ */ jsx(Button, { type: "button", variant: "outline", onClick: handleAddSelectedSkill, children: "Add skill" })
              ] }),
              selectedSkillOption === "Other" ? /* @__PURE__ */ jsxs("div", { className: "grid gap-3 md:grid-cols-[1fr_auto]", children: [
                /* @__PURE__ */ jsx(Input, { placeholder: "Write another skill or service", value: customSkill, onChange: (event) => setCustomSkill(capitalizeWords(event.target.value)) }),
                /* @__PURE__ */ jsx(Button, { type: "button", onClick: () => {
                  addSkill(customSkill);
                  setCustomSkill("");
                }, children: "Add other" })
              ] }) : null,
              /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 rounded-lg border border-dashed border-border bg-muted/20 p-3", children: selectedSkills.length ? selectedSkills.map((skill) => /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => removeSkill(skill), className: "rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary transition-colors hover:bg-primary/20", children: [
                skill,
                " x"
              ] }, skill)) : /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Select a skill and click Add skill. Use Other for anything not listed." }) })
            ] }) }),
            /* @__PURE__ */ jsx(Field, { label: "Experience years", error: fieldErrors.experienceYears, children: /* @__PURE__ */ jsx(Input, { type: "number", min: 0, value: form.experienceYears ?? 0, onChange: (event) => updateField("experienceYears", Number(event.target.value)) }) }),
            /* @__PURE__ */ jsx(Field, { label: "Hourly rate", error: fieldErrors.hourlyRate, children: /* @__PURE__ */ jsx(Input, { type: "number", min: 0, value: form.hourlyRate ?? 0, onChange: (event) => updateField("hourlyRate", Number(event.target.value)) }) }),
            /* @__PURE__ */ jsx(Field, { label: "Fixed rate", error: fieldErrors.fixedRate, children: /* @__PURE__ */ jsx(Input, { type: "number", min: 0, value: form.fixedRate ?? 0, onChange: (event) => updateField("fixedRate", Number(event.target.value)) }) }),
            /* @__PURE__ */ jsx(Field, { label: "Portfolio link", error: fieldErrors.portfolioUrl, children: /* @__PURE__ */ jsx(Input, { placeholder: "https://your-work.com", value: form.portfolioUrl, onChange: (event) => updateField("portfolioUrl", event.target.value) }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "rounded-xl border border-border bg-card p-6 shadow-soft", children: [
          /* @__PURE__ */ jsx(SectionTitle, { title: "Work proof and documents", subtitle: "Add photos, certificates, and license details clients can trust." }),
          /* @__PURE__ */ jsxs("div", { className: "mt-5 grid gap-4 md:grid-cols-2", children: [
            /* @__PURE__ */ jsx(Field, { label: "Work photos", error: fieldErrors.workPhotosText, children: /* @__PURE__ */ jsxs("label", { className: `flex h-10 cursor-pointer items-center justify-center gap-2 rounded-md border text-sm transition-all hover:bg-muted ${form.workPhotosText ? "border-success/40 bg-success/10 text-success shadow-soft" : "border-input"}`, children: [
              form.workPhotosText ? /* @__PURE__ */ jsx(BadgeCheck, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(ImagePlus, { className: "h-4 w-4" }),
              isWorkPhotosSaving ? "Saving..." : form.workPhotosText ? "Uploaded" : "Upload work photos",
              /* @__PURE__ */ jsx("input", { type: "file", accept: "image/*", multiple: true, className: "sr-only", disabled: isWorkPhotosSaving, onChange: (event) => appendWorkPhotos(event.target.files) })
            ] }) }),
            /* @__PURE__ */ jsx(Field, { label: "Certifications", error: fieldErrors.certificationsText, children: /* @__PURE__ */ jsxs("label", { className: `flex h-10 cursor-pointer items-center justify-center gap-2 rounded-md border text-sm transition-all hover:bg-muted ${form.certificationsText ? "border-success/40 bg-success/10 text-success shadow-soft" : "border-input"}`, children: [
              form.certificationsText ? /* @__PURE__ */ jsx(BadgeCheck, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(FileBadge, { className: "h-4 w-4" }),
              form.certificationsText ? "Uploaded" : "Upload certificate",
              /* @__PURE__ */ jsx("input", { type: "file", accept: "image/*,.pdf", className: "sr-only", onChange: (event) => appendCertification(event.target.files?.[0]) })
            ] }) }),
            /* @__PURE__ */ jsx(Field, { label: "Trade license URL", error: fieldErrors.tradeLicenseUrl, className: "md:col-span-2", children: /* @__PURE__ */ jsx(Input, { placeholder: "Paste trade license link if you already have one", value: form.tradeLicenseUrl, onChange: (event) => updateField("tradeLicenseUrl", event.target.value) }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "rounded-xl border border-border bg-card p-6 shadow-soft", children: [
          /* @__PURE__ */ jsx(SectionTitle, { title: "Verification documents", subtitle: "Select one document type, upload one file, and save it to verification records." }),
          /* @__PURE__ */ jsxs("div", { className: "mt-5 grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]", children: [
            /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-border bg-background p-4", children: [
              /* @__PURE__ */ jsx(Field, { label: "Select document type", children: /* @__PURE__ */ jsxs(Select, { value: selectedVerificationDoc, onValueChange: (value) => setSelectedVerificationDoc(value), children: [
                /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsx(SelectContent, { children: verificationDocumentOptions.map((option) => /* @__PURE__ */ jsx(SelectItem, { value: option.value, children: option.label }, option.value)) })
              ] }) }),
              /* @__PURE__ */ jsx("div", { className: "mt-4 rounded-lg bg-muted p-3 text-sm text-muted-foreground", children: "Only one file is uploaded for the selected document type. Uploading again replaces that document." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-border bg-background p-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
                  /* @__PURE__ */ jsx("div", { className: "grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary", children: /* @__PURE__ */ jsx(SelectedVerificationIcon, { className: "h-5 w-5" }) }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("h3", { className: "font-semibold", children: selectedVerificationOption.label }),
                    /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: selectedVerificationOption.description })
                  ] })
                ] }),
                /* @__PURE__ */ jsx(Badge, { variant: selectedVerificationUploaded ? "default" : "secondary", children: selectedVerificationUploaded ? "Uploaded" : "Needed" })
              ] }),
              selectedVerificationDoc === "selfieUrl" ? /* @__PURE__ */ jsxs("div", { className: "mt-4 space-y-3", children: [
                /* @__PURE__ */ jsxs("div", { className: "grid gap-3 sm:grid-cols-2", children: [
                  /* @__PURE__ */ jsxs(Button, { type: "button", variant: "outline", className: "h-12 gap-2", onClick: startSelfieCamera, disabled: isVerificationSaving, children: [
                    /* @__PURE__ */ jsx(Camera, { className: "h-4 w-4" }),
                    isVerificationSaving ? "Saving..." : "Take selfie"
                  ] }),
                  /* @__PURE__ */ jsxs("label", { className: "flex h-12 cursor-pointer items-center justify-center gap-2 rounded-md border border-input text-sm hover:bg-muted", children: [
                    /* @__PURE__ */ jsx(ImagePlus, { className: "h-4 w-4" }),
                    isVerificationSaving ? "Saving..." : "Select image",
                    /* @__PURE__ */ jsx("input", { type: "file", accept: "image/*", className: "sr-only", onChange: (event) => handleVerificationFile("selfieUrl", event.target.files?.[0]) })
                  ] })
                ] }),
                cameraError ? /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: cameraError }) : null,
                isCameraOpen ? /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-border bg-card p-3", children: [
                  /* @__PURE__ */ jsx("video", { ref: videoRef, className: "aspect-video w-full rounded-lg bg-muted object-cover", autoPlay: true, playsInline: true, muted: true, onLoadedMetadata: () => setIsCameraReady(true), onCanPlay: () => setIsCameraReady(true) }),
                  !isCameraReady ? /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Camera preview is starting..." }) : null,
                  /* @__PURE__ */ jsxs("div", { className: "mt-3 grid gap-3 sm:grid-cols-2", children: [
                    /* @__PURE__ */ jsx(Button, { type: "button", onClick: captureSelfie, disabled: isVerificationSaving || !isCameraReady, children: isCameraReady ? "Capture and save" : "Loading camera..." }),
                    /* @__PURE__ */ jsx(Button, { type: "button", variant: "outline", onClick: stopSelfieCamera, children: "Cancel" })
                  ] })
                ] }) : null
              ] }) : /* @__PURE__ */ jsxs("label", { className: "mt-4 flex h-12 cursor-pointer items-center justify-center gap-2 rounded-md border border-input text-sm hover:bg-muted", children: [
                /* @__PURE__ */ jsx(Upload, { className: "h-4 w-4" }),
                isVerificationSaving ? "Saving upload..." : selectedVerificationUploaded ? "Replace selected document" : "Upload selected document",
                /* @__PURE__ */ jsx("input", { type: "file", accept: "image/*,.pdf", className: "sr-only", onChange: (event) => handleVerificationFile(selectedVerificationDoc, event.target.files?.[0]) })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-border bg-background p-4", children: [
              /* @__PURE__ */ jsx("h3", { className: "font-semibold", children: "Verification badges display" }),
              /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Completed documents can appear as trust badges on your public profile after review." }),
              /* @__PURE__ */ jsxs("div", { className: "mt-4 flex flex-wrap gap-2", children: [
                /* @__PURE__ */ jsx(Badge, { variant: form.governmentIdUrl ? "default" : "secondary", children: "ID" }),
                /* @__PURE__ */ jsx(Badge, { variant: form.tradeLicenseUrl ? "default" : "secondary", children: "License" }),
                /* @__PURE__ */ jsx(Badge, { variant: form.certificationsText ? "default" : "secondary", children: "Certs" }),
                /* @__PURE__ */ jsx(Badge, { variant: form.insuranceUrl ? "default" : "secondary", children: "Insurance" }),
                /* @__PURE__ */ jsx(Badge, { variant: form.selfieUrl ? "default" : "secondary", children: "Selfie" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-5 grid gap-3 md:grid-cols-4", children: [
            /* @__PURE__ */ jsx(VerificationStatusBox, { label: "Document upload", done: verificationStatus.uploadedCount > 0 }),
            /* @__PURE__ */ jsx(VerificationStatusBox, { label: "Selfie verification", done: Boolean(form.selfieUrl) }),
            /* @__PURE__ */ jsx(VerificationStatusBox, { label: "Badges ready", done: verificationStatus.requiredComplete }),
            /* @__PURE__ */ jsx(VerificationStatusBox, { label: "Status tracking", value: verificationStatus.label, done: verificationStatus.status === "approved" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "rounded-xl border border-border bg-card p-6 shadow-soft", children: [
          /* @__PURE__ */ jsx(SectionTitle, { title: "Email & Browser Notifications", subtitle: "Choose how you want to hear about projects, messages, reviews, and payments." }),
          /* @__PURE__ */ jsxs("div", { className: "mt-5 grid gap-4 md:grid-cols-2", children: [
            /* @__PURE__ */ jsx(NotificationPreference, { icon: Mail, title: "Email notifications", description: "Send important account and project updates to your email.", checked: form.emailNotificationsEnabled, onChange: (checked) => updateField("emailNotificationsEnabled", checked) }),
            /* @__PURE__ */ jsx(NotificationPreference, { icon: Bell, title: "Browser notifications", description: browserPermission === "granted" ? "Show native browser alerts when new activity arrives." : browserPermission === "denied" ? "Browser permission is blocked. Enable it from site settings." : browserPermission === "unsupported" ? "This browser does not support native notifications." : "Ask this browser for permission to show alerts.", checked: form.browserNotificationsEnabled && browserPermission === "granted", disabled: browserPermission === "unsupported" || browserPermission === "denied", onChange: handleBrowserNotificationChange, action: browserPermission === "default" ? /* @__PURE__ */ jsx(Button, { type: "button", size: "sm", variant: "outline", onClick: requestBrowserNotificationPermission, children: "Allow browser alerts" }) : null }),
            /* @__PURE__ */ jsx(NotificationPreference, { icon: MessageSquare, title: "Project activity alerts", description: "Notify you about milestones, review requests, project tracking, and client actions.", checked: form.projectActivityNotificationsEnabled, onChange: (checked) => updateField("projectActivityNotificationsEnabled", checked), className: "md:col-span-2" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "rounded-xl border border-border bg-card p-6 shadow-soft", children: [
          /* @__PURE__ */ jsx(SectionTitle, { title: "Availability and service area", subtitle: "Control where and how clients can hire you." }),
          /* @__PURE__ */ jsxs("div", { className: "mt-5 grid gap-4 md:grid-cols-2", children: [
            /* @__PURE__ */ jsx(Field, { label: "Availability", error: fieldErrors.availabilityStatus, children: /* @__PURE__ */ jsxs(Select, { value: form.availabilityStatus, onValueChange: (value) => updateField("availabilityStatus", value), children: [
              /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsx(SelectItem, { value: "available", children: "Available now" }),
                /* @__PURE__ */ jsx(SelectItem, { value: "busy", children: "Busy" }),
                /* @__PURE__ */ jsx(SelectItem, { value: "unavailable", children: "Unavailable" })
              ] })
            ] }) }),
            /* @__PURE__ */ jsx(Field, { label: "Remote / on-site / both", error: fieldErrors.workMode, children: /* @__PURE__ */ jsxs(Select, { value: form.workMode, onValueChange: (value) => updateField("workMode", value), children: [
              /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsx(SelectItem, { value: "onsite", children: "On-site" }),
                /* @__PURE__ */ jsx(SelectItem, { value: "remote", children: "Remote" }),
                /* @__PURE__ */ jsx(SelectItem, { value: "both", children: "Both" })
              ] })
            ] }) }),
            /* @__PURE__ */ jsx(Field, { label: "Service location", error: fieldErrors.serviceArea || fieldErrors.address, children: /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsx(Input, { placeholder: "Address, area, or landmark", value: form.serviceArea || form.address, onChange: (event) => {
                const location = capitalizeWords(event.target.value);
                updateField("serviceArea", location);
                updateField("address", location);
              } }),
              /* @__PURE__ */ jsxs(Button, { type: "button", variant: "outline", className: "shrink-0 gap-2", onClick: () => openLocationPicker("serviceArea"), children: [
                /* @__PURE__ */ jsx(MapPin, { className: "h-4 w-4" }),
                "Map"
              ] })
            ] }) }),
            /* @__PURE__ */ jsx(Field, { label: "Service radius in km", error: fieldErrors.serviceRadiusKm, children: /* @__PURE__ */ jsxs("div", { className: "space-y-4 rounded-xl border border-border bg-muted/30 p-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-between gap-3 sm:flex-row sm:items-start", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-foreground", children: formatServiceRadius(form.serviceRadiusKm ?? 0) }),
                  /* @__PURE__ */ jsxs("p", { className: "mt-1 text-xs text-muted-foreground", children: [
                    "Clients nearby can find you from",
                    " ",
                    form.serviceArea || form.address || "your service location",
                    "."
                  ] })
                ] }),
                /* @__PURE__ */ jsx(Input, { type: "number", min: 0, max: 500, value: form.serviceRadiusKm ?? 0, onChange: (event) => updateField("serviceRadiusKm", clampServiceRadius(Number(event.target.value))), className: "w-full sm:w-28" })
              ] }),
              /* @__PURE__ */ jsx(Slider, { value: [Math.min(form.serviceRadiusKm ?? 0, 100)], min: 0, max: 100, step: 1, onValueChange: ([value]) => updateField("serviceRadiusKm", value), "aria-label": "Service radius in kilometers" }),
              /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: serviceRadiusPresets.map((radius) => /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => updateField("serviceRadiusKm", radius), className: `rounded-md border px-3 py-1.5 text-sm font-medium transition-colors ${form.serviceRadiusKm === radius ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-foreground hover:bg-muted"}`, children: [
                radius,
                " km"
              ] }, radius)) }),
              /* @__PURE__ */ jsxs("div", { className: "grid gap-2 text-xs text-muted-foreground sm:grid-cols-3", children: [
                /* @__PURE__ */ jsxs("div", { className: "rounded-lg bg-background px-3 py-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "block font-medium text-foreground", children: "0 km" }),
                  "Remote only or exact location."
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "rounded-lg bg-background px-3 py-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "block font-medium text-foreground", children: "10-25 km" }),
                  "Best for local city service."
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "rounded-lg bg-background px-3 py-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "block font-medium text-foreground", children: "50+ km" }),
                  "Regional coverage."
                ] })
              ] })
            ] }) }),
            /* @__PURE__ */ jsx(Field, { label: "Professional bio", error: fieldErrors.companyDescription, className: "md:col-span-2", children: /* @__PURE__ */ jsx(Textarea, { className: "min-h-28", placeholder: "Write a short profile clients will read before hiring you", value: form.companyDescription, onChange: (event) => updateField("companyDescription", event.target.value) }) })
          ] })
        ] }),
        statusMessage ? /* @__PURE__ */ jsx("div", { className: "rounded-xl border border-success/20 bg-success/5 px-4 py-3 text-sm text-success", children: statusMessage }) : null,
        submitError ? /* @__PURE__ */ jsx("div", { className: "rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive", children: submitError }) : null,
        /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxs(Button, { size: "lg", type: "submit", disabled: isSaving, children: [
          /* @__PURE__ */ jsx(Save, { className: "h-4 w-4" }),
          isSaving ? "Saving..." : "Save professional profile"
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Dialog, { open: Boolean(locationPickerTarget), onOpenChange: (open) => !open && setLocationPickerTarget(null), children: /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-3xl", children: [
      /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(DialogTitle, { children: "Select location on map" }) }),
      /* @__PURE__ */ jsx(LocationMapPicker, { value: locationPickerValue, onChange: setLocationPickerValue, placeholder: locationPickerTarget ? String(form[locationPickerTarget] || "") : "", targetLabel: formatLocationPickerTarget(locationPickerTarget) }),
      /* @__PURE__ */ jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsx(Button, { type: "button", variant: "outline", onClick: () => setLocationPickerTarget(null), children: "Cancel" }),
        /* @__PURE__ */ jsx(Button, { type: "button", onClick: applyLocationPicker, disabled: !locationPickerValue.trim(), children: "Use this location" })
      ] })
    ] }) })
  ] });
}
function SectionTitle({
  title,
  subtitle
}) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold", children: title }),
    /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: subtitle })
  ] });
}
function ProfileInfoItem({
  label,
  value
}) {
  return /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-border bg-muted/30 p-4", children: [
    /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: label }),
    /* @__PURE__ */ jsx("p", { className: "mt-1 break-words font-medium", children: value })
  ] });
}
function NotificationPreference({
  icon: Icon,
  title,
  description,
  checked,
  disabled = false,
  className = "",
  action,
  onChange
}) {
  return /* @__PURE__ */ jsxs("div", { className: `rounded-xl border border-border bg-background p-4 ${className}`, children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex min-w-0 gap-3", children: [
        /* @__PURE__ */ jsx("span", { className: "grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary", children: /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-semibold", children: title }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: description })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("button", { type: "button", role: "switch", "aria-checked": checked, "aria-label": `${checked ? "Turn off" : "Turn on"} ${title}`, disabled, onClick: () => onChange(!checked), className: `relative flex h-8 w-[74px] shrink-0 items-center rounded-full border px-1 text-[10px] font-bold uppercase transition-colors ${checked ? "border-primary bg-primary text-primary-foreground" : "border-border bg-muted text-muted-foreground"} ${disabled ? "cursor-not-allowed opacity-50" : "hover:shadow-sm"}`, children: [
        /* @__PURE__ */ jsx("span", { className: `z-10 flex-1 text-center transition-opacity ${checked ? "opacity-100" : "opacity-40"}`, children: "On" }),
        /* @__PURE__ */ jsx("span", { className: `z-10 flex-1 text-center transition-opacity ${checked ? "opacity-40" : "opacity-100"}`, children: "Off" }),
        /* @__PURE__ */ jsx("span", { className: `absolute top-1 h-6 w-8 rounded-full bg-background shadow transition-transform ${checked ? "translate-x-[34px]" : "translate-x-0"}` })
      ] })
    ] }),
    action ? /* @__PURE__ */ jsx("div", { className: "mt-4 flex justify-end", children: action }) : null
  ] });
}
function Field({
  label,
  error,
  children,
  className = ""
}) {
  return /* @__PURE__ */ jsxs("label", { className: `block space-y-2 ${className}`, children: [
    /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: label }),
    children,
    error ? /* @__PURE__ */ jsx("span", { className: "block text-sm text-destructive", children: error }) : null
  ] });
}
function LocationMapPicker({
  value,
  onChange,
  placeholder,
  targetLabel
}) {
  const googleMapsApiKey = "AIzaSyCZHfjLWVc0CJ4LMg3CP7fcBc3ncdR9Vtw";
  const googleKey = googleMapsApiKey;
  const inputRef = useRef(null);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);
  const [mapError, setMapError] = useState(null);
  const [isResolvingLocation, setIsResolvingLocation] = useState(false);
  useEffect(() => {
    if (!mapRef.current || !inputRef.current) {
      return;
    }
    let cancelled = false;
    const initMap = () => {
      if (cancelled || !mapRef.current || !inputRef.current) {
        return;
      }
      const win2 = window;
      if (!win2.google?.maps) {
        setMapError("Map could not load.");
        return;
      }
      const geocoder = new win2.google.maps.Geocoder();
      const defaultCenter = {
        lat: 21.1702,
        lng: 72.8311
      };
      const map = new win2.google.maps.Map(mapRef.current, {
        center: defaultCenter,
        zoom: 13,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true
      });
      const marker = new win2.google.maps.Marker({
        map,
        position: defaultCenter,
        draggable: true
      });
      mapInstanceRef.current = map;
      markerRef.current = marker;
      const placesService = new win2.google.maps.places.PlacesService(map);
      const updateSelectedLocation = (selectedLocation) => {
        const trimmedLocation = selectedLocation.trim();
        if (!trimmedLocation) {
          return;
        }
        if (inputRef.current) {
          inputRef.current.value = trimmedLocation;
        }
        onChange(trimmedLocation);
        setMapError(null);
      };
      const getGeocodedLocationText = (results) => {
        const result = results?.find((entry) => entry?.formatted_address) || results?.[0];
        if (result?.formatted_address) {
          return result.formatted_address;
        }
        const components = result?.address_components?.map((component) => component?.long_name).filter(Boolean);
        if (components?.length) {
          return components.join(", ");
        }
        const compoundCode = result?.plus_code?.compound_code;
        if (compoundCode) {
          return compoundCode.replace(/^[A-Z0-9+]+\s+/, "");
        }
        return "";
      };
      const setNearestPlace = (latLng) => {
        placesService.nearbySearch({
          location: latLng,
          radius: 50
        }, (places, status) => {
          if (status === "OK" && places?.[0]) {
            updateSelectedLocation(places[0].vicinity ? `${places[0].name}, ${places[0].vicinity}` : places[0].name || "");
          }
        });
      };
      const setSelectedPosition = (latLng) => {
        marker.setPosition(latLng);
        map.panTo(latLng);
        map.setZoom(20);
        setMapError(null);
        geocoder.geocode({
          location: latLng
        }, (results, status) => {
          const selectedLocation = status === "OK" ? getGeocodedLocationText(results) : "";
          if (selectedLocation) {
            updateSelectedLocation(selectedLocation);
            return;
          }
          setNearestPlace(latLng);
        });
      };
      const setSelectedPlace = (placeId, latLng) => {
        setMapError(null);
        placesService.getDetails({
          placeId,
          fields: ["formatted_address", "geometry", "name"]
        }, (place, status) => {
          if (status !== "OK" || !place) {
            if (latLng) {
              setSelectedPosition(latLng);
              return;
            }
            setMapError(null);
            return;
          }
          const location = place.geometry?.location || latLng;
          const selectedAddress = place.formatted_address || place.name || "";
          if (location) {
            marker.setPosition(location);
            map.panTo(location);
            map.setZoom(20);
          }
          if (selectedAddress) {
            updateSelectedLocation(selectedAddress);
            return;
          }
          setMapError(null);
        });
      };
      map.addListener("click", (event) => {
        mapRef.current?.focus();
        if (event.placeId) {
          event.stop();
          setSelectedPlace(event.placeId, event.latLng);
          return;
        }
        if (event.latLng) {
          setSelectedPosition(event.latLng);
        }
      });
      marker.addListener("dragend", () => {
        const position = marker.getPosition();
        if (position) {
          setSelectedPosition(position);
        }
      });
      mapRef.current.addEventListener("keydown", (event) => {
        if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) {
          return;
        }
        const position = marker.getPosition();
        if (!position) {
          return;
        }
        event.preventDefault();
        const moveBy = 5e-5;
        const nextPosition = new win2.google.maps.LatLng(position.lat() + (event.key === "ArrowUp" ? moveBy : event.key === "ArrowDown" ? -moveBy : 0), position.lng() + (event.key === "ArrowRight" ? moveBy : event.key === "ArrowLeft" ? -moveBy : 0));
        setSelectedPosition(nextPosition);
      });
      const autocomplete = new win2.google.maps.places.Autocomplete(inputRef.current, {
        fields: ["formatted_address", "geometry", "name"]
      });
      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        const location = place.geometry?.location;
        if (!location) {
          onChange(place.formatted_address || place.name || inputRef.current?.value || "");
          return;
        }
        marker.setPosition(location);
        map.setCenter(location);
        map.setZoom(20);
        updateSelectedLocation(place.formatted_address || place.name || inputRef.current?.value || "");
      });
      const previewLocation2 = value.trim() || placeholder.trim();
      if (previewLocation2) {
        geocoder.geocode({
          address: previewLocation2
        }, (results, status) => {
          if (status === "OK" && results?.[0]?.geometry?.location) {
            const location = results[0].geometry.location;
            marker.setPosition(location);
            map.setCenter(location);
            map.setZoom(15);
          }
        });
      }
    };
    const win = window;
    if (win.google?.maps?.places) {
      initMap();
      return () => {
        cancelled = true;
      };
    }
    const existingScript = document.querySelector('script[data-google-maps-places="true"]');
    if (existingScript) {
      existingScript.addEventListener("load", initMap, {
        once: true
      });
      return () => {
        cancelled = true;
        existingScript.removeEventListener("load", initMap);
      };
    }
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${googleKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.dataset.googleMapsPlaces = "true";
    script.addEventListener("load", initMap, {
      once: true
    });
    script.addEventListener("error", () => setMapError("Map could not load."));
    document.head.appendChild(script);
    return () => {
      cancelled = true;
      script.removeEventListener("load", initMap);
    };
  }, [googleKey, onChange, placeholder, value]);
  const previewLocation = value.trim() || placeholder.trim();
  const resolveLocationName = async () => {
    value.trim();
    {
      return;
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsx(Input, { ref: inputRef, value, onChange: (event) => onChange(capitalizeWords(event.target.value)), onBlur: resolveLocationName, placeholder: placeholder || "Search city, address, area, or landmark" }),
      null,
      /* @__PURE__ */ jsx(Button, { type: "button", variant: "outline", asChild: true, children: /* @__PURE__ */ jsx("a", { href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(previewLocation || "Surat")}`, target: "_blank", rel: "noreferrer", children: "Open map" }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "overflow-hidden rounded-xl border border-border bg-muted", children: /* @__PURE__ */ jsx("div", { ref: mapRef, className: "h-80 w-full outline-none", tabIndex: 0 }) }),
    /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: `Search or click the map to select the exact ${targetLabel}.` }),
    mapError ? /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: mapError }) : null
  ] });
}
function VerificationStatusBox({
  label,
  done,
  optional = false,
  value
}) {
  return /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-border bg-background p-4 text-sm", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(BadgeCheck, { className: `h-4 w-4 ${done ? "text-primary" : "text-muted-foreground"}` }),
      /* @__PURE__ */ jsx("span", { className: "font-medium", children: label })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-muted-foreground", children: value || (done ? "Complete" : optional ? "Optional" : "Pending") })
  ] });
}
function splitList(value) {
  if (value.includes("data:")) {
    return value.split(/\n+/).flatMap((line) => {
      const trimmedLine = line.trim();
      if (!trimmedLine) {
        return [];
      }
      if (trimmedLine.startsWith("data:")) {
        return [trimmedLine];
      }
      return trimmedLine.split(",").map((entry) => entry.trim()).filter(Boolean);
    });
  }
  return value.split(/,|\n/).map((entry) => entry.trim()).filter(Boolean);
}
function clampServiceRadius(value) {
  if (!Number.isFinite(value)) {
    return 0;
  }
  return Math.min(500, Math.max(0, Math.round(value)));
}
function formatServiceRadius(value) {
  if (value <= 0) {
    return "Exact location / remote only";
  }
  if (value === 1) {
    return "Serving clients within 1 km";
  }
  return `Serving clients within ${value} km`;
}
function capitalizeWords(value) {
  const acronyms = {
    api: "API",
    css: "CSS",
    html: "HTML",
    id: "ID",
    js: "JS",
    seo: "SEO",
    ui: "UI",
    ux: "UX"
  };
  return value.replace(/[A-Za-z]+/g, (word) => {
    const acronym = acronyms[word.toLowerCase()];
    if (acronym) {
      return acronym;
    }
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });
}
function getCityFromLocation(value) {
  return value.split(",").map((part) => part.trim()).filter(Boolean)[0] || value;
}
function formatLocationPickerTarget(target) {
  if (target === "professionalCity") {
    return "professional city";
  }
  if (target === "serviceArea") {
    return "service area";
  }
  return "base address";
}
function getCompletion(form) {
  const checks = [form.fullName, form.profilePhotoUrl, form.professionalCategory, form.professionalCity, form.skillsText, form.experienceYears !== null && form.experienceYears !== void 0, form.hourlyRate || form.fixedRate, form.portfolioUrl || form.workPhotosText, form.certificationsText || form.tradeLicenseUrl, form.availabilityStatus, form.serviceArea, form.workMode, form.companyDescription, form.address];
  return Math.round(checks.filter(Boolean).length / checks.length * 100);
}
function getVerificationStatus(input) {
  const uploadedCount = [input.governmentIdUrl, input.licenseUrl, input.certificationsText, input.insuranceUrl, input.selfieUrl].filter(Boolean).length;
  const requiredComplete = Boolean(input.governmentIdUrl && input.licenseUrl && input.certificationsText && input.insuranceUrl && input.selfieUrl);
  const status = uploadedCount > 0 ? input.status || "pending" : "not_started";
  return {
    status,
    uploadedCount,
    requiredComplete,
    label: status === "approved" ? "Approved" : status === "rejected" ? "Needs changes" : status === "pending" ? "Pending review" : "Not started"
  };
}
const Route$u = Route$v;
const $$splitComponentImporter$9 = () => import("./professional-reports-BZsTWyiz.js");
const getProfessionalReportsData = createServerFn({
  method: "GET"
}).handler(createSsrRpc("f522407dafc3847e81c19f552cdd8d1599c8f85d9d2f336df1bfcf1ec7902cca"));
const Route$t = createFileRoute("/professional-reports")({
  loader: () => getProfessionalReportsData(),
  head: () => ({
    meta: [{
      title: "My Reports - Servio"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const getProfessionalStatsData = createServerFn({
  method: "GET"
}).handler(createSsrRpc("050899b9025cd8acdf0542ff35da13724bb9b47516a7a04f814b8e1c68ba0a2c"));
const sendNegotiationOffer$1 = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(createSsrRpc("5bd7f7de8a64a2ee076ec76a556f559b62012f42b6011240ddf3997aad10414c"));
const updateHireRequestStatus = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(createSsrRpc("b7be1155b461346fba94102841135b1efac9a8414a9f7fb9af563d104284628d"));
const sendHireNegotiationOffer = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(createSsrRpc("de3e9c361ee6b8699fb59740e3f7f1792d454180e07aec30eaf58759859aaeb8"));
const cancelProfessionalTrackedProject = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(createSsrRpc("9a9692dd4e7e76f31f2fd3771ae2a31bf928a5249b21dd9f68561ac178b30a86"));
const cancelProfessionalDirectHireProject = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(createSsrRpc("cae39de6756e250edd0006d2fc13cb6a28c1f3d827e6b6b18554134d1b321d41"));
const deleteProfessionalRejectedDirectHire = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(createSsrRpc("c1dda5569f7d8a8222f5345ddcffb7e438089ea88d58e762a57ec868d51a5db2"));
const saveReviewResponse$1 = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(createSsrRpc("fbaf96e46299326181a9fe147d6f35c7702b6d5d89c811f690a6a22af5cf1ddf"));
const Route$s = createFileRoute("/professional-stats")({
  beforeLoad: async ({
    location
  }) => {
    const data = await getProfessionalStatsData();
    if (!data) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href
        }
      });
    }
    if (data.viewer.role !== "PROFESSIONAL") {
      throw redirect({
        to: "/dashboard"
      });
    }
  },
  loader: () => getProfessionalStatsData(),
  head: () => ({
    meta: [{
      title: "My stats - Servio"
    }]
  }),
  component: ProfessionalStats
});
function ProfessionalStats() {
  const data = useLoaderData({
    from: "/professional-stats"
  });
  const router2 = useRouter();
  const [now, setNow] = useState(() => Date.now());
  const [openNegotiationId, setOpenNegotiationId] = useState(null);
  const [pendingNegotiationId, setPendingNegotiationId] = useState(null);
  const [openHireNegotiationId, setOpenHireNegotiationId] = useState(null);
  const [pendingHireNegotiationId, setPendingHireNegotiationId] = useState(null);
  const [pendingHireActionId, setPendingHireActionId] = useState(null);
  const [pendingCancelActionId, setPendingCancelActionId] = useState(null);
  const [hireActionError, setHireActionError] = useState(null);
  const [hireActionMessage, setHireActionMessage] = useState(null);
  const [negotiationError, setNegotiationError] = useState(null);
  const [statDeltas, setStatDeltas] = useState({});
  const [activeStatsFilter, setActiveStatsFilter] = useState(null);
  const [reviewResponseDrafts, setReviewResponseDrafts] = useState({});
  const [pendingReviewResponseId, setPendingReviewResponseId] = useState(null);
  const [reviewResponseErrorId, setReviewResponseErrorId] = useState(null);
  const [reviewResponseError, setReviewResponseError] = useState(null);
  const [negotiationDrafts, setNegotiationDrafts] = useState({});
  const [hireNegotiationDrafts, setHireNegotiationDrafts] = useState({});
  useEffect(() => {
    const interval = window.setInterval(() => setNow(Date.now()), 1e3);
    return () => window.clearInterval(interval);
  }, []);
  useEffect(() => {
    if (!hireActionMessage) {
      return;
    }
    const timeout = window.setTimeout(() => setHireActionMessage(null), 5e3);
    return () => window.clearTimeout(timeout);
  }, [hireActionMessage]);
  if (!data) {
    return null;
  }
  const {
    viewer,
    profile,
    projectRequests,
    favoriteJobs
  } = data;
  const projectNegotiations = data.projectNegotiations ?? [];
  const hireNegotiations = data.hireNegotiations ?? [];
  const hireRequests = data.hireRequests ?? [];
  const trackedProjects = data.trackedProjects ?? [];
  const transactions = data.transactions ?? [];
  const visibleProjectRequests = projectRequests.filter((project) => isVisibleProjectRequest$1(project));
  const visibleHireRequests = hireRequests.filter((request) => request.status !== "started" && request.status !== "cancelled" && !isExpiredRejectedHireRequest$2(request, now));
  const runningTrackedProjects = trackedProjects.filter((project) => project.status === "ACTIVE");
  const completedTrackedProjects = trackedProjects.filter((project) => project.status === "COMPLETED");
  const startedDirectHires = hireRequests.filter((request) => request.status === "started" && !request.trackingId);
  const completedEarnings = transactions.filter((transaction) => transaction.status === "COMPLETED" && transaction.professionalId === viewer.id).reduce((total, transaction) => total + transaction.amount, 0);
  const displayName = profile?.fullName || `${viewer.firstName} ${viewer.lastName}`.trim();
  const reviewedCompletedProjects = completedTrackedProjects.filter((project) => project.reviewRating);
  const averageRating = profile?.reviewCount && profile.reviewCount > 0 ? Number(profile.averageRating || 0) : reviewedCompletedProjects.length ? reviewedCompletedProjects.reduce((total, review) => total + Number(review.reviewRating || 0), 0) / reviewedCompletedProjects.length : 0;
  const ratingLabel = reviewedCompletedProjects.length ? averageRating.toFixed(1) : "No reviews";
  const statCounts = {
    projects: runningTrackedProjects.length + startedDirectHires.length,
    requests: visibleProjectRequests.length,
    hires: visibleHireRequests.length,
    completed: completedTrackedProjects.length,
    ratings: reviewedCompletedProjects.length,
    earnings: Math.round(completedEarnings)
  };
  const showAllStatsSections = activeStatsFilter === null;
  const activeStatsFilterLabel = activeStatsFilter ? getProfessionalStatsFilterLabel(activeStatsFilter) : null;
  function toggleStatsFilter(filter) {
    setActiveStatsFilter((current) => current === filter ? null : filter);
  }
  useEffect(() => {
    const storageKey2 = `professional-stat-counts:${viewer.id}`;
    const previousCounts = readStoredStatCounts(storageKey2);
    const nextDeltas = Object.fromEntries(Object.entries(statCounts).map(([key, value]) => [key, value - Number(previousCounts[key] || 0)]).filter(([, value]) => Number(value) > 0));
    setStatDeltas(nextDeltas);
    window.localStorage.setItem(storageKey2, JSON.stringify(statCounts));
  }, [viewer.id, statCounts.projects, statCounts.requests, statCounts.hires, statCounts.completed, statCounts.ratings, statCounts.earnings]);
  async function handleSendNegotiation(project) {
    const draft = negotiationDrafts[project.id] ?? {
      bidAmount: project.bidAmount ? String(project.bidAmount) : "",
      duration: getDurationWeeksValue$1(project.duration, project.deadline),
      message: project.coverLetter || ""
    };
    const bidAmount = Number(draft.bidAmount);
    setPendingNegotiationId(project.id);
    setNegotiationError(null);
    try {
      await sendNegotiationOffer$1({
        data: {
          requestId: project.id,
          bidAmount: Number.isFinite(bidAmount) && bidAmount > 0 ? bidAmount : null,
          duration: formatWeeksDuration$1(draft.duration),
          message: draft.message
        }
      });
      await emitProjectNotification$2({
        trackingId: project.trackingId ?? -1,
        actorId: viewer.id,
        recipientId: project.clientId,
        title: "Project negotiation offer",
        description: `${displayName} sent a revised offer for ${project.projectTitle}: ${formatMoney$3(Number.isFinite(bidAmount) && bidAmount > 0 ? bidAmount : 0)}, ${formatWeeksDuration$1(draft.duration)}. ${draft.message}`,
        href: "/projects"
      });
      toast.success("Negotiation offer sent.");
      setOpenNegotiationId(null);
      await router2.invalidate();
    } catch (error) {
      setNegotiationError(error instanceof Error ? error.message : "Could not send negotiation offer.");
    } finally {
      setPendingNegotiationId(null);
    }
  }
  async function handleHireStatus(contractId, status) {
    setPendingHireActionId(contractId);
    setHireActionError(null);
    try {
      await updateHireRequestStatus({
        data: {
          contractId,
          status
        }
      });
      if (status === "rejected") {
        setHireActionMessage("Hire request rejected. It will be removed after 1 minute.");
      }
      await router2.invalidate();
    } catch (error) {
      setHireActionError(error instanceof Error ? error.message : "Could not update hire request.");
    } finally {
      setPendingHireActionId(null);
    }
  }
  async function handleSendHireNegotiation(request) {
    const draft = hireNegotiationDrafts[request.contractId] ?? {
      bidAmount: request.totalAmount || request.budgetMax || request.budgetMin ? String(request.totalAmount ?? request.budgetMax ?? request.budgetMin) : "",
      duration: getDurationWeeksValue$1(null, request.deadline),
      message: request.description || ""
    };
    const bidAmount = Number(draft.bidAmount);
    setPendingHireNegotiationId(request.contractId);
    setHireActionError(null);
    try {
      await sendHireNegotiationOffer({
        data: {
          contractId: request.contractId,
          bidAmount: Number.isFinite(bidAmount) && bidAmount > 0 ? bidAmount : null,
          duration: formatWeeksDuration$1(draft.duration),
          message: draft.message
        }
      });
      await emitProjectNotification$2({
        trackingId: -1,
        actorId: viewer.id,
        recipientId: Number(request.clientId),
        title: "Direct hire negotiation offer",
        description: `${displayName} sent a revised offer for ${request.title}.`,
        href: "/projects"
      });
      toast.success("Direct hire negotiation offer sent.");
      setOpenHireNegotiationId(null);
      await router2.invalidate();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Could not send direct hire negotiation offer.";
      setHireActionError(message);
      toast.error(message);
    } finally {
      setPendingHireNegotiationId(null);
    }
  }
  async function handleCancelTrackedProject(trackingId) {
    const actionKey = `tracked-${trackingId}`;
    setPendingCancelActionId(actionKey);
    setHireActionError(null);
    try {
      await cancelProfessionalTrackedProject({
        data: {
          trackingId
        }
      });
      await router2.invalidate();
    } catch (error) {
      setHireActionError(error instanceof Error ? error.message : "Could not cancel project.");
    } finally {
      setPendingCancelActionId(null);
    }
  }
  async function handleCancelDirectHire(contractId) {
    const actionKey = `hire-${contractId}`;
    setPendingCancelActionId(actionKey);
    setHireActionError(null);
    try {
      await cancelProfessionalDirectHireProject({
        data: {
          contractId
        }
      });
      await router2.invalidate();
    } catch (error) {
      setHireActionError(error instanceof Error ? error.message : "Could not cancel direct hire project.");
    } finally {
      setPendingCancelActionId(null);
    }
  }
  async function handleDeleteRejectedDirectHire(contractId) {
    const actionKey = `delete-hire-${contractId}`;
    setPendingCancelActionId(actionKey);
    setHireActionError(null);
    try {
      await deleteProfessionalRejectedDirectHire({
        data: {
          contractId
        }
      });
      await router2.invalidate();
    } catch (error) {
      setHireActionError(error instanceof Error ? error.message : "Could not delete rejected direct hire request.");
    } finally {
      setPendingCancelActionId(null);
    }
  }
  async function handleSaveReviewResponse(project) {
    const response = (reviewResponseDrafts[project.id] ?? project.reviewResponse ?? "").trim();
    if (!response) {
      setReviewResponseErrorId(project.id);
      setReviewResponseError("Write a response before saving.");
      toast.error("Write a response before saving.");
      return;
    }
    setPendingReviewResponseId(project.id);
    setReviewResponseErrorId(null);
    setReviewResponseError(null);
    try {
      await saveReviewResponse$1({
        data: {
          trackingId: project.id,
          response
        }
      });
      toast.success("Review response saved.");
      setReviewResponseDrafts((current) => {
        const next = {
          ...current
        };
        delete next[project.id];
        return next;
      });
      await router2.invalidate();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Could not save review response.";
      setReviewResponseErrorId(project.id);
      setReviewResponseError(message);
      toast.error(message);
    } finally {
      setPendingReviewResponseId(null);
    }
  }
  function renderReviewResponseEditor(project) {
    const draft = reviewResponseDrafts[project.id] ?? project.reviewResponse ?? "";
    return /* @__PURE__ */ jsxs("div", { className: "mt-3 rounded-lg border border-primary/20 bg-background p-3", children: [
      project.reviewResponse ? /* @__PURE__ */ jsxs("div", { className: "mb-3 text-sm", children: [
        /* @__PURE__ */ jsx("p", { className: "font-medium", children: "Your response" }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-muted-foreground", children: project.reviewResponse })
      ] }) : null,
      /* @__PURE__ */ jsx(Textarea, { value: draft, onChange: (event) => {
        setReviewResponseDrafts((current) => ({
          ...current,
          [project.id]: event.target.value
        }));
        setReviewResponseErrorId(null);
        setReviewResponseError(null);
      }, maxLength: 1e3, rows: 3, placeholder: "Respond to this review" }),
      reviewResponseError && reviewResponseErrorId === project.id ? /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-destructive", children: reviewResponseError }) : null,
      /* @__PURE__ */ jsx("div", { className: "mt-3 flex justify-end", children: /* @__PURE__ */ jsxs(Button, { type: "button", size: "sm", onClick: () => handleSaveReviewResponse(project), disabled: pendingReviewResponseId === project.id, children: [
        /* @__PURE__ */ jsx(MessageSquare, { className: "h-4 w-4" }),
        pendingReviewResponseId === project.id ? "Saving" : project.reviewResponse ? "Update response" : "Respond to review"
      ] }) })
    ] });
  }
  return /* @__PURE__ */ jsxs(AppShell, { userName: displayName, userRole: "Professional", userAvatarUrl: profile?.avatarUrl || viewer.avatarUrl, children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-end", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-semibold tracking-tight", children: "My stats" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Project and earning details from accepted client requests." })
      ] }),
      /* @__PURE__ */ jsx(Button, { variant: "outline", asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "/professional-profile", children: "Profile" }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-6", children: [
      /* @__PURE__ */ jsx(StatBox, { icon: Briefcase, label: "Projects", value: String(statCounts.projects), sub: "Running now", tint: "text-primary bg-primary/10", delta: statDeltas.projects, isActive: activeStatsFilter === "running", onClick: () => toggleStatsFilter("running") }),
      /* @__PURE__ */ jsx(StatBox, { icon: Send, label: "Project requests", value: String(statCounts.requests), sub: "Sent to clients", tint: "text-accent bg-accent/15", delta: statDeltas.requests, isActive: activeStatsFilter === "project-requests", onClick: () => toggleStatsFilter("project-requests") }),
      /* @__PURE__ */ jsx(StatBox, { icon: Handshake, label: "Hire requests", value: String(statCounts.hires), sub: "Direct client requests", tint: "text-warning bg-warning/15", delta: statDeltas.hires, isActive: activeStatsFilter === "hire-requests", onClick: () => toggleStatsFilter("hire-requests") }),
      /* @__PURE__ */ jsx(StatBox, { icon: CheckCircle2, label: "Completed", value: String(statCounts.completed), sub: "Finished projects", tint: "text-success bg-success/15", delta: statDeltas.completed, isActive: activeStatsFilter === "completed", onClick: () => toggleStatsFilter("completed") }),
      /* @__PURE__ */ jsx(StatBox, { icon: Star, label: "Ratings & Reviews", value: ratingLabel, sub: `${reviewedCompletedProjects.length} client review${reviewedCompletedProjects.length === 1 ? "" : "s"}`, tint: "text-warning bg-warning/15", delta: statDeltas.ratings, isActive: activeStatsFilter === "ratings", onClick: () => toggleStatsFilter("ratings") }),
      /* @__PURE__ */ jsx(StatBox, { icon: Wallet$1, label: "Earnings", value: formatMoney$3(completedEarnings), sub: "Open earnings dashboard", tint: "text-success bg-success/15", delta: statDeltas.earnings, isActive: activeStatsFilter === "earnings", onClick: () => toggleStatsFilter("earnings") })
    ] }),
    activeStatsFilterLabel ? /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-col justify-between gap-3 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 sm:flex-row sm:items-center", children: [
      /* @__PURE__ */ jsxs("p", { className: "text-sm font-medium", children: [
        "Showing only ",
        activeStatsFilterLabel.toLowerCase(),
        "."
      ] }),
      /* @__PURE__ */ jsx(Button, { type: "button", size: "sm", variant: "outline", onClick: () => setActiveStatsFilter(null), children: "Show all projects" })
    ] }) : null,
    showAllStatsSections || activeStatsFilter === "completed" ? /* @__PURE__ */ jsxs("div", { className: "mt-6 rounded-xl border border-border bg-card p-6 shadow-soft", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-between gap-3 sm:flex-row sm:items-center", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold", children: "Completed projects" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Finished projects and project details." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: /* @__PURE__ */ jsxs(Badge, { variant: "secondary", children: [
          completedTrackedProjects.length,
          " completed"
        ] }) })
      ] }),
      completedTrackedProjects.length ? /* @__PURE__ */ jsx("div", { className: "mt-5 grid gap-4 lg:grid-cols-2", children: completedTrackedProjects.map((project) => /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-border p-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2", children: [
              /* @__PURE__ */ jsx(Badge, { variant: "secondary", children: project.projectCategory }),
              /* @__PURE__ */ jsx(Badge, { children: "Completed" }),
              project.reviewRating ? /* @__PURE__ */ jsxs(Badge, { variant: "outline", children: [
                project.reviewRating,
                "/5 review"
              ] }) : project.reviewRequestedAt ? /* @__PURE__ */ jsx(Badge, { variant: "outline", children: "Review requested" }) : /* @__PURE__ */ jsx(Badge, { variant: "outline", children: "No review yet" })
            ] }),
            /* @__PURE__ */ jsx("h3", { className: "mt-3 line-clamp-2 font-semibold", children: project.projectTitle }),
            /* @__PURE__ */ jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
              "Client: ",
              project.clientName || `Client ${project.clientId}`
            ] })
          ] }),
          /* @__PURE__ */ jsx("img", { src: project.clientAvatarUrl || `https://i.pravatar.cc/100?u=completed-client-${project.clientId}`, alt: "", className: "h-12 w-12 shrink-0 rounded-lg object-cover" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxs("span", { children: [
            "Price: ",
            formatMoney$3(project.bidAmount ?? 0)
          ] }),
          /* @__PURE__ */ jsxs("span", { children: [
            "Duration: ",
            project.duration || "Not set"
          ] }),
          /* @__PURE__ */ jsxs("span", { children: [
            "Accepted ",
            project.acceptedAt ? formatDate$5(project.acceptedAt) : "Not set"
          ] }),
          /* @__PURE__ */ jsx("span", { children: project.deadline ? `Deadline ${formatDate$5(project.deadline)}` : "Deadline not set" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4 flex flex-wrap gap-2", children: [
          /* @__PURE__ */ jsx(Button, { size: "sm", variant: "outline", asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "/project-track/$trackingId", params: {
            trackingId: String(project.id)
          }, children: "View project" }) }),
          /* @__PURE__ */ jsx(Button, { size: "sm", variant: "outline", asChild: true, children: /* @__PURE__ */ jsxs(Link, { to: "/professional-messages", children: [
            /* @__PURE__ */ jsx(MessageSquare, { className: "h-4 w-4" }),
            "Message client"
          ] }) })
        ] })
      ] }, `completed-${project.id}`)) }) : /* @__PURE__ */ jsxs("div", { className: "mt-5 rounded-lg border border-dashed border-border bg-muted/30 p-8 text-center", children: [
        /* @__PURE__ */ jsx(CheckCircle2, { className: "mx-auto h-8 w-8 text-muted-foreground" }),
        /* @__PURE__ */ jsx("h3", { className: "mt-3 font-semibold", children: "No completed projects yet" }),
        /* @__PURE__ */ jsx("p", { className: "mx-auto mt-1 max-w-md text-sm text-muted-foreground", children: "Completed tracked projects will appear here with review status." })
      ] })
    ] }) : null,
    activeStatsFilter === "ratings" ? /* @__PURE__ */ jsxs("div", { className: "mt-6 rounded-xl border border-border bg-card p-6 shadow-soft", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-between gap-3 sm:flex-row sm:items-center", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold", children: "Ratings & Client Reviews" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Completed projects where clients left a review." })
        ] }),
        /* @__PURE__ */ jsxs(Badge, { variant: "secondary", children: [
          reviewedCompletedProjects.length,
          " client review",
          reviewedCompletedProjects.length === 1 ? "" : "s"
        ] })
      ] }),
      reviewedCompletedProjects.length ? /* @__PURE__ */ jsx("div", { className: "mt-5 grid gap-4 lg:grid-cols-2", children: reviewedCompletedProjects.map((project) => /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-border p-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
              /* @__PURE__ */ jsx(Badge, { variant: "secondary", children: project.projectCategory }),
              /* @__PURE__ */ jsx(RatingStars, { rating: Number(project.reviewRating || 0) }),
              /* @__PURE__ */ jsxs(Badge, { variant: "outline", children: [
                project.reviewRating,
                "/5"
              ] })
            ] }),
            /* @__PURE__ */ jsx("h3", { className: "mt-3 line-clamp-2 font-semibold", children: project.projectTitle }),
            /* @__PURE__ */ jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
              "Client: ",
              project.clientName || `Client ${project.clientId}`
            ] })
          ] }),
          /* @__PURE__ */ jsx("img", { src: project.clientAvatarUrl || `https://i.pravatar.cc/100?u=rating-client-${project.clientId}`, alt: "", className: "h-12 w-12 shrink-0 rounded-lg object-cover" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 rounded-lg border border-border bg-muted/30 p-3 text-sm text-muted-foreground", children: project.reviewComment || "Client left a rating without a written review." }),
        renderReviewResponseEditor(project),
        /* @__PURE__ */ jsxs("div", { className: "mt-4 flex flex-wrap gap-2", children: [
          /* @__PURE__ */ jsx(Button, { size: "sm", variant: "outline", asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "/project-track/$trackingId", params: {
            trackingId: String(project.id)
          }, children: "View project" }) }),
          project.reviewCreatedAt ? /* @__PURE__ */ jsxs(Badge, { variant: "outline", children: [
            "Rated ",
            formatDate$5(project.reviewCreatedAt)
          ] }) : null
        ] })
      ] }, `rating-${project.id}`)) }) : /* @__PURE__ */ jsxs("div", { className: "mt-5 rounded-lg border border-dashed border-border bg-muted/30 p-8 text-center", children: [
        /* @__PURE__ */ jsx(Star, { className: "mx-auto h-8 w-8 text-muted-foreground" }),
        /* @__PURE__ */ jsx("h3", { className: "mt-3 font-semibold", children: "No ratings yet" }),
        /* @__PURE__ */ jsx("p", { className: "mx-auto mt-1 max-w-md text-sm text-muted-foreground", children: "Client reviews for completed projects will appear here." })
      ] })
    ] }) : null,
    activeStatsFilter === "earnings" ? /* @__PURE__ */ jsxs("div", { className: "mt-6 rounded-xl border border-border bg-card p-6 shadow-soft", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-between gap-3 sm:flex-row sm:items-center", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold", children: "Earnings" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Completed project payments from milestones and final approvals." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2", children: [
          /* @__PURE__ */ jsxs(Badge, { children: [
            formatMoney$3(completedEarnings),
            " earned"
          ] }),
          /* @__PURE__ */ jsx(Button, { size: "sm", variant: "outline", asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "/earnings", children: "Open earnings dashboard" }) })
        ] })
      ] }),
      transactions.length ? /* @__PURE__ */ jsx("div", { className: "mt-5 grid gap-4 lg:grid-cols-2", children: transactions.map((transaction) => /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-border p-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2", children: [
              /* @__PURE__ */ jsx(Badge, { variant: "secondary", children: transaction.projectCategory || "Project" }),
              /* @__PURE__ */ jsx(Badge, { variant: "outline", children: formatEnum$5(transaction.type) })
            ] }),
            /* @__PURE__ */ jsx("h3", { className: "mt-3 line-clamp-2 font-semibold", children: transaction.projectTitle || transaction.description || `Project #${transaction.trackingId}` }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: transaction.description })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "shrink-0 text-lg font-semibold", children: formatMoney$3(transaction.amount) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4 flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsx("span", { children: formatDate$5(transaction.createdAt) }),
          /* @__PURE__ */ jsx(Button, { size: "sm", variant: "outline", asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "/project-track/$trackingId", params: {
            trackingId: String(transaction.trackingId)
          }, children: "View project" }) })
        ] })
      ] }, `earning-${transaction.id}`)) }) : /* @__PURE__ */ jsxs("div", { className: "mt-5 rounded-lg border border-dashed border-border bg-muted/30 p-8 text-center", children: [
        /* @__PURE__ */ jsx(Wallet$1, { className: "mx-auto h-8 w-8 text-muted-foreground" }),
        /* @__PURE__ */ jsx("h3", { className: "mt-3 font-semibold", children: "No earnings yet" }),
        /* @__PURE__ */ jsx("p", { className: "mx-auto mt-1 max-w-md text-sm text-muted-foreground", children: "Completed milestone and final payments will appear here." })
      ] })
    ] }) : null,
    showAllStatsSections || activeStatsFilter === "running" ? /* @__PURE__ */ jsxs("div", { className: "mt-6 rounded-xl border border-border bg-card p-6 shadow-soft", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-between gap-3 sm:flex-row sm:items-center", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold", children: "Running projects" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Active tracked jobs and accepted direct hires." })
        ] }),
        /* @__PURE__ */ jsxs(Badge, { children: [
          runningTrackedProjects.length + startedDirectHires.length,
          " running"
        ] })
      ] }),
      runningTrackedProjects.length || startedDirectHires.length ? /* @__PURE__ */ jsxs("div", { className: "mt-5 grid gap-4 lg:grid-cols-2", children: [
        runningTrackedProjects.map((project) => /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-border p-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2", children: [
                /* @__PURE__ */ jsx(Badge, { variant: "secondary", children: project.projectCategory }),
                /* @__PURE__ */ jsx(Badge, { children: "Running" })
              ] }),
              /* @__PURE__ */ jsx("h3", { className: "mt-3 line-clamp-2 font-semibold", children: project.projectTitle }),
              /* @__PURE__ */ jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
                "Client: ",
                project.clientName || `Client ${project.clientId}`
              ] })
            ] }),
            /* @__PURE__ */ jsx("img", { src: project.clientAvatarUrl || `https://i.pravatar.cc/100?u=running-client-${project.clientId}`, alt: "", className: "h-12 w-12 shrink-0 rounded-lg object-cover" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2", children: [
            /* @__PURE__ */ jsxs("span", { children: [
              "Price: ",
              formatMoney$3(project.bidAmount ?? 0)
            ] }),
            /* @__PURE__ */ jsxs("span", { children: [
              "Duration: ",
              project.duration || "Not set"
            ] }),
            /* @__PURE__ */ jsxs("span", { children: [
              "Accepted ",
              project.acceptedAt ? formatDate$5(project.acceptedAt) : "Not set"
            ] }),
            /* @__PURE__ */ jsxs("span", { children: [
              "Tracking ",
              formatEnum$5(project.status || "ACTIVE")
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 flex flex-wrap gap-2", children: [
            /* @__PURE__ */ jsx(Button, { size: "sm", asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "/project-track/$trackingId", params: {
              trackingId: String(project.id)
            }, children: "Track project" }) }),
            /* @__PURE__ */ jsx(Button, { size: "sm", variant: "outline", asChild: true, children: /* @__PURE__ */ jsxs(Link, { to: "/professional-messages", children: [
              /* @__PURE__ */ jsx(MessageSquare, { className: "h-4 w-4" }),
              "Message"
            ] }) }),
            /* @__PURE__ */ jsxs(Button, { size: "sm", variant: "outline", onClick: () => handleCancelTrackedProject(project.id), disabled: pendingCancelActionId === `tracked-${project.id}`, children: [
              /* @__PURE__ */ jsx(XCircle, { className: "h-4 w-4" }),
              pendingCancelActionId === `tracked-${project.id}` ? "Cancelling" : "Cancel"
            ] })
          ] })
        ] }, `tracked-${project.id}`)),
        startedDirectHires.map((request) => /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-border p-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2", children: [
                /* @__PURE__ */ jsx(Badge, { variant: "secondary", children: "Direct hire" }),
                /* @__PURE__ */ jsx(Badge, { children: "Running" })
              ] }),
              /* @__PURE__ */ jsx("h3", { className: "mt-3 line-clamp-2 font-semibold", children: request.title }),
              /* @__PURE__ */ jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
                "Client: ",
                request.clientName || `Client ${request.clientId}`
              ] })
            ] }),
            /* @__PURE__ */ jsx("img", { src: request.clientAvatarUrl || `https://i.pravatar.cc/100?u=running-hire-client-${request.clientId}`, alt: "", className: "h-12 w-12 shrink-0 rounded-lg object-cover" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2", children: [
            /* @__PURE__ */ jsxs("span", { children: [
              "Price:",
              " ",
              formatMoney$3(request.totalAmount ?? request.budgetMax ?? request.budgetMin ?? 0)
            ] }),
            /* @__PURE__ */ jsxs("span", { children: [
              "Work mode: ",
              formatEnum$5(request.workMode || "both")
            ] }),
            /* @__PURE__ */ jsxs("span", { children: [
              "Accepted ",
              request.updatedAt ? formatDate$5(request.updatedAt) : "Not set"
            ] }),
            /* @__PURE__ */ jsx("span", { children: request.deadline ? `Deadline ${formatDate$5(request.deadline)}` : "Deadline not set" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 flex flex-wrap gap-2", children: [
            /* @__PURE__ */ jsx(Button, { size: "sm", variant: "outline", asChild: true, children: /* @__PURE__ */ jsxs(Link, { to: "/professional-messages", children: [
              /* @__PURE__ */ jsx(MessageSquare, { className: "h-4 w-4" }),
              "Message client"
            ] }) }),
            /* @__PURE__ */ jsxs(Button, { size: "sm", variant: "outline", onClick: () => handleCancelDirectHire(request.contractId), disabled: pendingCancelActionId === `hire-${request.contractId}`, children: [
              /* @__PURE__ */ jsx(XCircle, { className: "h-4 w-4" }),
              pendingCancelActionId === `hire-${request.contractId}` ? "Cancelling" : "Cancel"
            ] })
          ] })
        ] }, `hire-${request.contractId}`))
      ] }) : /* @__PURE__ */ jsxs("div", { className: "mt-5 rounded-lg border border-dashed border-border bg-muted/30 p-8 text-center", children: [
        /* @__PURE__ */ jsx(Clock, { className: "mx-auto h-8 w-8 text-muted-foreground" }),
        /* @__PURE__ */ jsx("h3", { className: "mt-3 font-semibold", children: "No running projects yet" }),
        /* @__PURE__ */ jsx("p", { className: "mx-auto mt-1 max-w-md text-sm text-muted-foreground", children: "Accepted tracked jobs and accepted direct hires will appear here." })
      ] })
    ] }) : null,
    showAllStatsSections || activeStatsFilter === "hire-requests" ? /* @__PURE__ */ jsxs("div", { className: "mt-6 rounded-xl border border-border bg-card p-6 shadow-soft", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-between gap-3 sm:flex-row sm:items-center", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold", children: "Direct hire requests" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Client hire requests sent from your professional profile." })
        ] }),
        /* @__PURE__ */ jsxs(Badge, { variant: "secondary", children: [
          visibleHireRequests.length,
          " requests"
        ] })
      ] }),
      hireActionMessage ? /* @__PURE__ */ jsx("p", { className: "mt-4 rounded-lg border border-success/30 bg-success/10 p-3 text-sm text-success", children: hireActionMessage }) : null,
      hireActionError ? /* @__PURE__ */ jsx("p", { className: "mt-4 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive", children: hireActionError }) : null,
      visibleHireRequests.length ? /* @__PURE__ */ jsx("div", { className: "mt-5 grid gap-4 lg:grid-cols-2", children: visibleHireRequests.map((request) => {
        const negotiationHistory = hireNegotiations.filter((negotiation) => negotiation.contractId === request.contractId);
        const latestNegotiation = negotiationHistory.at(-1);
        const hireNegotiationDraft = hireNegotiationDrafts[request.contractId] ?? {
          bidAmount: request.totalAmount || request.budgetMax || request.budgetMin ? String(request.totalAmount ?? request.budgetMax ?? request.budgetMin) : "",
          duration: getDurationWeeksValue$1(null, request.deadline),
          message: request.description || ""
        };
        return /* @__PURE__ */ jsxs("div", { className: `rounded-lg border p-4 transition ${request.status === "pending" ? "border-primary/30 bg-primary/5 shadow-soft" : "border-border"}`, children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2", children: [
                /* @__PURE__ */ jsx(Badge, { variant: "secondary", children: "Direct hire" }),
                /* @__PURE__ */ jsx(Badge, { variant: request.status === "accepted" ? "default" : request.status === "rejected" ? "destructive" : "outline", children: formatEnum$5(request.status) }),
                negotiationHistory.length ? /* @__PURE__ */ jsxs(Badge, { variant: "outline", children: [
                  negotiationHistory.length,
                  " offers"
                ] }) : null
              ] }),
              /* @__PURE__ */ jsx("h3", { className: "mt-3 line-clamp-2 font-semibold", children: request.title }),
              /* @__PURE__ */ jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
                "Client: ",
                request.clientName || `Client ${request.clientId}`
              ] })
            ] }),
            /* @__PURE__ */ jsx("img", { src: request.clientAvatarUrl || `https://i.pravatar.cc/100?u=hire-client-${request.clientId}`, alt: "", className: "h-11 w-11 rounded-lg object-cover" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2", children: [
            /* @__PURE__ */ jsxs("span", { children: [
              "Budget:",
              " ",
              formatMoney$3(request.totalAmount ?? request.budgetMax ?? request.budgetMin ?? 0)
            ] }),
            /* @__PURE__ */ jsxs("span", { children: [
              "Work mode: ",
              formatEnum$5(request.workMode || "both")
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsx(Clock, { className: "h-4 w-4" }),
              "Sent ",
              formatDateTime$4(request.createdAt)
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsx(CalendarDays, { className: "h-4 w-4" }),
              "Updated ",
              request.updatedAt ? formatDateTime$4(request.updatedAt) : "Not set"
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsx(CalendarDays, { className: "h-4 w-4" }),
              "Deadline ",
              request.deadline ? formatDate$5(request.deadline) : "Not set"
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "flex min-w-0 items-center gap-1.5", children: [
              /* @__PURE__ */ jsx(MapPin, { className: "h-4 w-4 shrink-0" }),
              /* @__PURE__ */ jsx("span", { className: "truncate", children: request.location || "Location not set" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 line-clamp-3 text-sm text-muted-foreground", children: request.description || "No work description added." }),
          latestNegotiation ? /* @__PURE__ */ jsxs("div", { className: "mt-3 rounded-lg border border-border bg-muted/30 p-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2 text-sm font-medium", children: [
              /* @__PURE__ */ jsx(Handshake, { className: "h-4 w-4 text-primary" }),
              /* @__PURE__ */ jsx("span", { children: "Latest negotiation offer" }),
              /* @__PURE__ */ jsx("span", { className: "text-xs font-normal text-muted-foreground", children: formatDateTime$4(latestNegotiation.createdAt) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-2 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2", children: [
              /* @__PURE__ */ jsxs("span", { children: [
                "Bid: ",
                formatMoney$3(latestNegotiation.bidAmount ?? 0)
              ] }),
              /* @__PURE__ */ jsxs("span", { children: [
                "Duration: ",
                latestNegotiation.duration || "Not set"
              ] })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 line-clamp-2 text-sm text-muted-foreground", children: latestNegotiation.message })
          ] }) : null,
          request.status === "rejected" ? /* @__PURE__ */ jsx("p", { className: "mt-3 rounded-lg border border-destructive/20 bg-destructive/5 px-3 py-2 text-sm text-destructive", children: "Direct hire rejected. It will be removed after 1 minute." }) : null,
          request.status === "pending" ? /* @__PURE__ */ jsxs("div", { className: "mt-4 flex flex-wrap gap-2", children: [
            /* @__PURE__ */ jsx(Button, { size: "sm", onClick: () => handleHireStatus(request.contractId, "accepted"), disabled: pendingHireActionId === request.contractId, children: pendingHireActionId === request.contractId ? "Updating" : "Accept" }),
            /* @__PURE__ */ jsx(Button, { size: "sm", variant: "outline", onClick: () => handleHireStatus(request.contractId, "rejected"), disabled: pendingHireActionId === request.contractId, children: "Reject" }),
            /* @__PURE__ */ jsxs(Button, { size: "sm", variant: "outline", onClick: () => {
              setHireActionError(null);
              setHireNegotiationDrafts((drafts) => ({
                ...drafts,
                [request.contractId]: hireNegotiationDraft
              }));
              setOpenHireNegotiationId(request.contractId);
            }, children: [
              /* @__PURE__ */ jsx(Handshake, { className: "h-4 w-4" }),
              "Negotiate"
            ] }),
            /* @__PURE__ */ jsx(Button, { size: "sm", variant: "outline", asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "/professional-messages", children: "Message" }) })
          ] }) : /* @__PURE__ */ jsxs("div", { className: "mt-4 flex flex-wrap gap-2", children: [
            /* @__PURE__ */ jsx(Button, { size: "sm", variant: "outline", asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "/professional-messages", children: "Message client" }) }),
            request.status === "rejected" ? /* @__PURE__ */ jsxs(Button, { size: "sm", variant: "outline", onClick: () => handleDeleteRejectedDirectHire(request.contractId), disabled: pendingCancelActionId === `delete-hire-${request.contractId}`, children: [
              /* @__PURE__ */ jsx(XCircle, { className: "h-4 w-4" }),
              pendingCancelActionId === `delete-hire-${request.contractId}` ? "Deleting" : "Delete immediately"
            ] }) : null
          ] }),
          /* @__PURE__ */ jsx(Dialog, { open: openHireNegotiationId === request.contractId, onOpenChange: (open) => setOpenHireNegotiationId(open ? request.contractId : null), children: /* @__PURE__ */ jsxs(DialogContent, { children: [
            /* @__PURE__ */ jsxs(DialogHeader, { children: [
              /* @__PURE__ */ jsx(DialogTitle, { children: "Negotiate direct hire request" }),
              /* @__PURE__ */ jsxs(DialogDescription, { children: [
                "Send the client a revised amount, duration, and message for",
                " ",
                request.title,
                "."
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid gap-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "grid gap-2 sm:grid-cols-2", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: `hire-bid-${request.contractId}`, children: "Bid amount" }),
                  /* @__PURE__ */ jsx(Input, { id: `hire-bid-${request.contractId}`, type: "number", min: "0", value: hireNegotiationDraft.bidAmount, onChange: (event) => setHireNegotiationDrafts((drafts) => ({
                    ...drafts,
                    [request.contractId]: {
                      ...hireNegotiationDraft,
                      bidAmount: event.target.value
                    }
                  })), placeholder: "Direct hire amount" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: `hire-duration-${request.contractId}`, children: "Duration (weeks)" }),
                  /* @__PURE__ */ jsx(Input, { id: `hire-duration-${request.contractId}`, type: "number", min: "1", step: "1", value: hireNegotiationDraft.duration, onChange: (event) => setHireNegotiationDrafts((drafts) => ({
                    ...drafts,
                    [request.contractId]: {
                      ...hireNegotiationDraft,
                      duration: event.target.value
                    }
                  })), placeholder: "Weeks" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: `hire-message-${request.contractId}`, children: "Message" }),
                /* @__PURE__ */ jsx(Textarea, { id: `hire-message-${request.contractId}`, value: hireNegotiationDraft.message, onChange: (event) => setHireNegotiationDrafts((drafts) => ({
                  ...drafts,
                  [request.contractId]: {
                    ...hireNegotiationDraft,
                    message: event.target.value
                  }
                })), className: "min-h-28", placeholder: "Explain your revised direct hire offer" })
              ] }),
              negotiationHistory.length ? /* @__PURE__ */ jsxs("div", { className: "max-h-40 overflow-y-auto rounded-lg border border-border p-3", children: [
                /* @__PURE__ */ jsx("h4", { className: "text-sm font-medium", children: "Offer history" }),
                /* @__PURE__ */ jsx("div", { className: "mt-3 space-y-3", children: negotiationHistory.map((negotiation) => /* @__PURE__ */ jsxs("div", { className: "rounded-md bg-muted/40 p-3 text-sm", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap justify-between gap-2 font-medium", children: [
                    /* @__PURE__ */ jsxs("span", { children: [
                      formatMoney$3(negotiation.bidAmount ?? 0),
                      " /",
                      " ",
                      negotiation.duration || "Not set"
                    ] }),
                    /* @__PURE__ */ jsx("span", { className: "text-xs font-normal text-muted-foreground", children: formatDateTime$4(negotiation.createdAt) })
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "mt-1 text-muted-foreground", children: negotiation.message })
                ] }, negotiation.id)) })
              ] }) : null
            ] }),
            /* @__PURE__ */ jsxs(DialogFooter, { children: [
              /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: () => setOpenHireNegotiationId(null), children: "Cancel" }),
              /* @__PURE__ */ jsxs(Button, { onClick: () => handleSendHireNegotiation(request), disabled: pendingHireNegotiationId === request.contractId, children: [
                /* @__PURE__ */ jsx(Handshake, { className: "h-4 w-4" }),
                pendingHireNegotiationId === request.contractId ? "Sending" : "Send offer"
              ] })
            ] })
          ] }) })
        ] }, request.contractId);
      }) }) : /* @__PURE__ */ jsxs("div", { className: "mt-5 rounded-lg border border-dashed border-border bg-muted/30 p-8 text-center", children: [
        /* @__PURE__ */ jsx(Handshake, { className: "mx-auto h-8 w-8 text-muted-foreground" }),
        /* @__PURE__ */ jsx("h3", { className: "mt-3 font-semibold", children: "No direct hire requests yet" }),
        /* @__PURE__ */ jsx("p", { className: "mx-auto mt-1 max-w-md text-sm text-muted-foreground", children: "When a client sends a hire request from your profile, it will appear here." })
      ] })
    ] }) : null,
    showAllStatsSections ? /* @__PURE__ */ jsxs("div", { className: "mt-6 rounded-xl border border-border bg-card p-6 shadow-soft", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-between gap-3 sm:flex-row sm:items-center", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold", children: "Saved jobs" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Favorite client jobs you saved while browsing." })
        ] }),
        /* @__PURE__ */ jsxs(Badge, { variant: "secondary", children: [
          favoriteJobs.length,
          " saved"
        ] })
      ] }),
      favoriteJobs.length ? /* @__PURE__ */ jsx("div", { className: "mt-5 grid gap-4 lg:grid-cols-2", children: favoriteJobs.map((job) => /* @__PURE__ */ jsxs(Link, { to: "/job/$jobId", params: {
        jobId: String(job.id)
      }, className: "block rounded-lg border border-border p-4 transition-colors hover:border-primary/50 hover:bg-primary/5", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2", children: [
              /* @__PURE__ */ jsx(Badge, { variant: "secondary", children: job.category }),
              /* @__PURE__ */ jsx(Badge, { variant: job.urgency === "HIGH" ? "destructive" : "outline", children: formatEnum$5(job.urgency) })
            ] }),
            /* @__PURE__ */ jsx("h3", { className: "mt-3 line-clamp-2 font-semibold", children: job.title }),
            /* @__PURE__ */ jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
              "Posted by ",
              job.clientCompanyName || job.clientName
            ] })
          ] }),
          /* @__PURE__ */ jsx(Heart, { className: "h-4 w-4 shrink-0 fill-primary text-primary" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2", children: [
          /* @__PURE__ */ jsx("span", { children: formatBudget$4(job.budgetMin, job.budgetMax, job.timingType) }),
          /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsx(CalendarDays, { className: "h-4 w-4" }),
            "Deadline ",
            formatDate$5(job.deadline)
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "flex min-w-0 items-center gap-1.5 sm:col-span-2", children: [
            /* @__PURE__ */ jsx(MapPin, { className: "h-4 w-4 shrink-0" }),
            /* @__PURE__ */ jsx("span", { className: "truncate", children: formatFavoriteJobLocation(job) })
          ] })
        ] })
      ] }, job.id)) }) : /* @__PURE__ */ jsxs("div", { className: "mt-5 rounded-lg border border-dashed border-border bg-muted/30 p-8 text-center", children: [
        /* @__PURE__ */ jsx(Heart, { className: "mx-auto h-8 w-8 text-muted-foreground" }),
        /* @__PURE__ */ jsx("h3", { className: "mt-3 font-semibold", children: "No saved jobs yet" }),
        /* @__PURE__ */ jsx("p", { className: "mx-auto mt-1 max-w-md text-sm text-muted-foreground", children: "Save jobs from the home page or job detail page. They will appear here." })
      ] })
    ] }) : null,
    showAllStatsSections || activeStatsFilter === "project-requests" ? /* @__PURE__ */ jsxs("div", { className: "mt-6 rounded-xl border border-border bg-card p-6 shadow-soft", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-between gap-3 sm:flex-row sm:items-center", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold", children: "Project requests you sent" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Only your submitted project requests appear here with pending, accepted, or rejected status." })
        ] }),
        /* @__PURE__ */ jsxs(Badge, { variant: "secondary", children: [
          visibleProjectRequests.length,
          " projects"
        ] })
      ] }),
      visibleProjectRequests.length ? /* @__PURE__ */ jsx("div", { className: "mt-5 grid gap-4 lg:grid-cols-2", children: visibleProjectRequests.map((project) => {
        const negotiationHistory = projectNegotiations.filter((negotiation) => negotiation.requestId === project.id);
        const latestNegotiation = negotiationHistory.at(-1);
        const negotiationDraft = negotiationDrafts[project.id] ?? {
          bidAmount: project.bidAmount ? String(project.bidAmount) : "",
          duration: getDurationWeeksValue$1(project.duration, project.deadline),
          message: project.coverLetter || ""
        };
        return /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-border p-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2", children: [
                /* @__PURE__ */ jsx(Badge, { variant: "secondary", children: project.projectCategory }),
                /* @__PURE__ */ jsx(Badge, { variant: project.status === "ACCEPTED" ? "default" : project.status === "DECLINED" ? "destructive" : "outline", children: formatEnum$5(project.status) }),
                project.trackingStatus ? /* @__PURE__ */ jsxs(Badge, { variant: "outline", children: [
                  "Tracking ",
                  formatEnum$5(project.trackingStatus)
                ] }) : null,
                negotiationHistory.length ? /* @__PURE__ */ jsxs(Badge, { variant: "outline", children: [
                  negotiationHistory.length,
                  " offers"
                ] }) : null
              ] }),
              /* @__PURE__ */ jsx("h3", { className: "mt-3 line-clamp-2 font-semibold", children: project.projectTitle }),
              /* @__PURE__ */ jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
                "Client: ",
                project.clientName || `Client ${project.clientId}`
              ] })
            ] }),
            /* @__PURE__ */ jsx("img", { src: project.clientAvatarUrl || `https://i.pravatar.cc/100?u=tracked-client-${project.clientId}`, alt: "", className: "h-11 w-11 rounded-lg object-cover" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2", children: [
            /* @__PURE__ */ jsxs("span", { children: [
              "Bid: ",
              formatMoney$3(project.bidAmount ?? 0)
            ] }),
            /* @__PURE__ */ jsxs("span", { children: [
              "Duration: ",
              project.duration || "Not set"
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsx(CalendarDays, { className: "h-4 w-4" }),
              "Deadline ",
              formatDate$5(project.deadline)
            ] }),
            /* @__PURE__ */ jsx("span", { children: project.acceptedAt ? `Accepted ${formatDate$5(project.acceptedAt)}` : `Sent ${formatDate$5(project.createdAt)}` })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 line-clamp-3 text-sm text-muted-foreground", children: project.coverLetter }),
          project.status === "DECLINED" ? /* @__PURE__ */ jsx("p", { className: "mt-3 rounded-lg border border-destructive/20 bg-destructive/5 px-3 py-2 text-sm text-destructive", children: "Project request rejected. It will be removed after 24 hours." }) : null,
          latestNegotiation ? /* @__PURE__ */ jsxs("div", { className: "mt-3 rounded-lg border border-border bg-muted/30 p-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2 text-sm font-medium", children: [
              /* @__PURE__ */ jsx(Handshake, { className: "h-4 w-4 text-primary" }),
              /* @__PURE__ */ jsx("span", { children: "Latest negotiation offer" }),
              /* @__PURE__ */ jsx("span", { className: "text-xs font-normal text-muted-foreground", children: formatDateTime$4(latestNegotiation.createdAt) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-2 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2", children: [
              /* @__PURE__ */ jsxs("span", { children: [
                "Bid: ",
                formatMoney$3(latestNegotiation.bidAmount ?? 0)
              ] }),
              /* @__PURE__ */ jsxs("span", { children: [
                "Duration: ",
                latestNegotiation.duration || "Not set"
              ] })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 line-clamp-2 text-sm text-muted-foreground", children: latestNegotiation.message })
          ] }) : null,
          project.reviewRating ? /* @__PURE__ */ jsxs("div", { className: "mt-3 rounded-lg border border-border bg-muted/30 p-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2 text-sm font-medium", children: [
              /* @__PURE__ */ jsx(Star, { className: "h-4 w-4 fill-primary text-primary" }),
              /* @__PURE__ */ jsxs("span", { children: [
                "Client rating: ",
                project.reviewRating,
                "/5"
              ] }),
              project.reviewCreatedAt ? /* @__PURE__ */ jsx("span", { className: "text-xs font-normal text-muted-foreground", children: formatDate$5(project.reviewCreatedAt) }) : null
            ] }),
            project.reviewComment ? /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: project.reviewComment }) : null
          ] }) : project.trackingStatus === "COMPLETED" ? /* @__PURE__ */ jsx("div", { className: "mt-3 rounded-lg border border-dashed border-border bg-muted/20 p-3 text-sm text-muted-foreground", children: "No client rating yet." }) : null,
          /* @__PURE__ */ jsxs("div", { className: "mt-4 flex flex-wrap gap-2", children: [
            /* @__PURE__ */ jsx(Button, { size: "sm", asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "/job/$jobId", params: {
              jobId: String(project.jobId)
            }, children: "View job" }) }),
            project.status === "PENDING" ? /* @__PURE__ */ jsxs(Button, { size: "sm", variant: "outline", onClick: () => {
              setNegotiationError(null);
              setNegotiationDrafts((drafts) => ({
                ...drafts,
                [project.id]: negotiationDraft
              }));
              setOpenNegotiationId(project.id);
            }, children: [
              /* @__PURE__ */ jsx(Handshake, { className: "h-4 w-4" }),
              "Negotiate"
            ] }) : null,
            project.trackingId ? /* @__PURE__ */ jsx(Button, { size: "sm", variant: "outline", asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "/project-track/$trackingId", params: {
              trackingId: String(project.trackingId)
            }, children: "Track project" }) }) : null,
            /* @__PURE__ */ jsx(Button, { size: "sm", variant: "outline", asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "/professional-messages", children: "Message" }) })
          ] }),
          /* @__PURE__ */ jsx(Dialog, { open: openNegotiationId === project.id, onOpenChange: (open) => setOpenNegotiationId(open ? project.id : null), children: /* @__PURE__ */ jsxs(DialogContent, { children: [
            /* @__PURE__ */ jsxs(DialogHeader, { children: [
              /* @__PURE__ */ jsx(DialogTitle, { children: "Negotiate project offer" }),
              /* @__PURE__ */ jsxs(DialogDescription, { children: [
                "Send the client a revised bid, duration, and message for",
                " ",
                project.projectTitle,
                "."
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid gap-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "grid gap-2 sm:grid-cols-2", children: [
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: `bid-${project.id}`, children: "Bid amount" }),
                  /* @__PURE__ */ jsx(Input, { id: `bid-${project.id}`, type: "number", min: "0", value: negotiationDraft.bidAmount, onChange: (event) => setNegotiationDrafts((drafts) => ({
                    ...drafts,
                    [project.id]: {
                      ...negotiationDraft,
                      bidAmount: event.target.value
                    }
                  })), placeholder: "Project bid" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: `duration-${project.id}`, children: "Duration (weeks)" }),
                  /* @__PURE__ */ jsx(Input, { id: `duration-${project.id}`, type: "number", min: "1", step: "1", value: negotiationDraft.duration, onChange: (event) => setNegotiationDrafts((drafts) => ({
                    ...drafts,
                    [project.id]: {
                      ...negotiationDraft,
                      duration: event.target.value
                    }
                  })), placeholder: "Weeks" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: `message-${project.id}`, children: "Message" }),
                /* @__PURE__ */ jsx(Textarea, { id: `message-${project.id}`, value: negotiationDraft.message, onChange: (event) => setNegotiationDrafts((drafts) => ({
                  ...drafts,
                  [project.id]: {
                    ...negotiationDraft,
                    message: event.target.value
                  }
                })), className: "min-h-28", placeholder: "Explain your revised offer" })
              ] }),
              negotiationHistory.length ? /* @__PURE__ */ jsxs("div", { className: "max-h-40 overflow-y-auto rounded-lg border border-border p-3", children: [
                /* @__PURE__ */ jsx("h4", { className: "text-sm font-medium", children: "Offer history" }),
                /* @__PURE__ */ jsx("div", { className: "mt-3 space-y-3", children: negotiationHistory.map((negotiation) => /* @__PURE__ */ jsxs("div", { className: "rounded-md bg-muted/40 p-3 text-sm", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap justify-between gap-2 font-medium", children: [
                    /* @__PURE__ */ jsxs("span", { children: [
                      formatMoney$3(negotiation.bidAmount ?? 0),
                      " /",
                      " ",
                      negotiation.duration || "Not set"
                    ] }),
                    /* @__PURE__ */ jsx("span", { className: "text-xs font-normal text-muted-foreground", children: formatDateTime$4(negotiation.createdAt) })
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "mt-1 text-muted-foreground", children: negotiation.message })
                ] }, negotiation.id)) })
              ] }) : null,
              negotiationError ? /* @__PURE__ */ jsx("p", { className: "rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive", children: negotiationError }) : null
            ] }),
            /* @__PURE__ */ jsxs(DialogFooter, { children: [
              /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: () => setOpenNegotiationId(null), children: "Cancel" }),
              /* @__PURE__ */ jsxs(Button, { onClick: () => handleSendNegotiation(project), disabled: pendingNegotiationId === project.id, children: [
                /* @__PURE__ */ jsx(Handshake, { className: "h-4 w-4" }),
                pendingNegotiationId === project.id ? "Sending" : "Send offer"
              ] })
            ] })
          ] }) })
        ] }, project.id);
      }) }) : /* @__PURE__ */ jsxs("div", { className: "mt-5 rounded-lg border border-dashed border-border bg-muted/30 p-8 text-center", children: [
        /* @__PURE__ */ jsx(Send, { className: "mx-auto h-8 w-8 text-muted-foreground" }),
        /* @__PURE__ */ jsx("h3", { className: "mt-3 font-semibold", children: "No project requests yet" }),
        /* @__PURE__ */ jsx("p", { className: "mx-auto mt-1 max-w-md text-sm text-muted-foreground", children: "Project requests you send to clients will appear here." })
      ] })
    ] }) : null
  ] });
}
function StatBox({
  icon: Icon,
  label,
  value,
  sub,
  tint,
  delta,
  isActive = false,
  onClick
}) {
  const content = /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3", children: [
      /* @__PURE__ */ jsx("div", { className: `grid h-10 w-10 place-items-center rounded-xl ${tint}`, children: /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5" }) }),
      delta && delta > 0 ? /* @__PURE__ */ jsxs(Badge, { variant: "secondary", className: "shrink-0", children: [
        "+",
        delta,
        " new"
      ] }) : null
    ] }),
    /* @__PURE__ */ jsx("p", { className: "mt-4 text-2xl font-semibold", children: value }),
    /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", children: label }),
    /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: sub })
  ] });
  if (onClick) {
    return /* @__PURE__ */ jsx("button", { type: "button", onClick, "aria-pressed": isActive, className: `rounded-xl border p-5 text-left shadow-soft transition-colors hover:border-primary/50 hover:bg-primary/5 ${isActive ? "border-primary bg-primary/10" : "border-border bg-card"}`, children: content });
  }
  return /* @__PURE__ */ jsx("div", { className: "rounded-xl border border-border bg-card p-5 shadow-soft", children: content });
}
function getProfessionalStatsFilterLabel(filter) {
  switch (filter) {
    case "running":
      return "Running projects";
    case "completed":
      return "Completed projects";
    case "project-requests":
      return "Project requests";
    case "hire-requests":
      return "Direct hire requests";
    case "ratings":
      return "Ratings";
    case "earnings":
      return "Earnings";
  }
}
function RatingStars({
  rating
}) {
  const roundedRating = Math.round(rating);
  return /* @__PURE__ */ jsx("div", { className: "flex items-center gap-1", "aria-label": `${rating.toFixed(1)} out of 5 stars`, children: Array.from({
    length: 5
  }, (_, index) => /* @__PURE__ */ jsx(Star, { className: `h-4 w-4 ${index < roundedRating ? "fill-warning text-warning" : "text-muted-foreground/40"}` }, index)) });
}
function formatEnum$5(value) {
  return value.toLowerCase().split("_").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
}
function formatDate$5(value) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(value));
}
function formatDateTime$4(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Not set";
  }
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit"
  }).format(date);
}
function getDurationWeeksValue$1(duration, fallbackDate) {
  const existingWeeks = parseWeeks$1(duration);
  if (existingWeeks) {
    return String(existingWeeks);
  }
  const fallbackWeeks = getWeeksUntil$1(fallbackDate);
  return fallbackWeeks ? String(fallbackWeeks) : "";
}
function formatWeeksDuration$1(value) {
  const weeks = Math.max(1, Math.round(Number(value) || 0));
  return weeks === 1 ? "1 week" : `${weeks} weeks`;
}
function parseWeeks$1(value) {
  if (!value) {
    return null;
  }
  const weekMatch = value.match(/(\d+(?:\.\d+)?)\s*weeks?/i);
  const anyNumberMatch = value.match(/\d+(?:\.\d+)?/);
  if (weekMatch || !value.toLowerCase().includes("until")) {
    const numericValue = Number((weekMatch || anyNumberMatch)?.[1] ?? anyNumberMatch?.[0]);
    return Number.isFinite(numericValue) && numericValue > 0 ? Math.max(1, Math.round(numericValue)) : null;
  }
  const untilDate = new Date(value.replace(/^until\s+/i, ""));
  if (Number.isNaN(untilDate.getTime())) {
    return null;
  }
  return Math.max(1, Math.ceil((untilDate.getTime() - Date.now()) / (7 * 24 * 60 * 60 * 1e3)));
}
function getWeeksUntil$1(value) {
  if (!value) {
    return null;
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return null;
  }
  return Math.max(1, Math.ceil((date.getTime() - Date.now()) / (7 * 24 * 60 * 60 * 1e3)));
}
function formatBudget$4(min, max, timingType = "FIXED") {
  const suffix = getBudgetSuffix$4(timingType);
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
function formatFavoriteJobLocation(job) {
  if (job.workMode === "REMOTE") {
    return "Remote job";
  }
  return formatApproximateLocation(job.locationAddress || job.locationLabel, "Location not set");
}
function getBudgetSuffix$4(timingType) {
  if (timingType === "HOURLY") {
    return " / hour";
  }
  if (timingType === "WEEKLY") {
    return " / week";
  }
  return "";
}
function formatMoney$3(value) {
  return `$${value.toLocaleString()}`;
}
function readStoredStatCounts(storageKey2) {
  try {
    return JSON.parse(window.localStorage.getItem(storageKey2) || "{}");
  } catch {
    return {};
  }
}
function isVisibleProjectRequest$1(project) {
  if (project.coverLetter === "Direct hire project started by the client.") {
    return false;
  }
  if (project.status === "ACCEPTED" && (project.trackingStatus === "ACTIVE" || project.trackingStatus === "COMPLETED")) {
    return false;
  }
  if (project.status === "DECLINED") {
    const rejectedAt = new Date(project.updatedAt || project.createdAt).getTime();
    if (!Number.isNaN(rejectedAt) && Date.now() - rejectedAt >= 24 * 60 * 60 * 1e3) {
      return false;
    }
  }
  return true;
}
function isExpiredRejectedHireRequest$2(request, now = Date.now()) {
  if (request.status !== "rejected") {
    return false;
  }
  const rejectedAt = new Date(request.updatedAt || request.createdAt).getTime();
  if (Number.isNaN(rejectedAt)) {
    return false;
  }
  return now - rejectedAt >= 60 * 1e3;
}
async function emitProjectNotification$2(payload) {
  try {
    const socket = io(getSocketUrl$4());
    socket.emit("project:activity", payload);
    window.setTimeout(() => socket.disconnect(), 800);
  } catch {
  }
}
function getSocketUrl$4() {
  return `${window.location.protocol}//${window.location.hostname}:4001`;
}
const Route$r = Route$s;
const useAppDispatch = () => useDispatch();
const useAppSelector = useSelector;
const getProfileSetupData = createServerFn({
  method: "GET"
}).handler(createSsrRpc("b4a2717c635ee7c0de3686b24148eb32a359e67ad4d41dffe205a24774bc4ff8"));
const saveClientProfile = createServerFn({
  method: "POST"
}).inputValidator((data) => clientProfileSchema.parse(data)).handler(createSsrRpc("543235704210eeb04c5cc7ffe5ad97072b66baab0cada240c42d7d12da4e8f35"));
const Route$q = createFileRoute("/profile-setup")({
  beforeLoad: async ({
    location
  }) => {
    try {
      await getProfileSetupData();
    } catch {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href
        }
      });
    }
  },
  loader: () => getProfileSetupData(),
  head: () => ({
    meta: [{
      title: "Client onboarding - Servio"
    }, {
      name: "description",
      content: "Set up your client company profile in three guided steps."
    }]
  }),
  component: ProfileSetup
});
const teamSizeOptions = ["Just me", "2-10 employees", "11-50 employees", "51-200 employees", "200+ employees"];
const suggestedHiringNeeds = ["Web development", "Mobile app design", "SEO", "Content writing", "Customer support", "Bookkeeping", "Video editing", "Lead generation"];
const steps = [{
  title: "Company details",
  subtitle: "Start with the same polished company setup clients expect on marketplaces like Upwork.",
  validationMessage: "Please complete the required company details before continuing.",
  icon: Building2,
  fields: ["fullName", "email", "phone", "companyName", "companyWebsite", "industry", "teamSize", "companyDescription"]
}, {
  title: "Locations",
  subtitle: "Add your main company location and any saved service addresses your team uses often.",
  validationMessage: "Please add your main address and at least one saved location before continuing.",
  icon: MapPinHouse,
  fields: ["address", "savedLocations"]
}, {
  title: "Hiring needs",
  subtitle: "Tell us what skills and services you hire for so the dashboard can feel tailored to your workflow.",
  validationMessage: "Please add at least one hiring need or skill before continuing.",
  icon: Sparkles,
  fields: ["hiringNeeds"]
}];
function LocationAutocompleteInput({
  value,
  onChange,
  onLocationSelect
}) {
  const googleKey = "AIzaSyCZHfjLWVc0CJ4LMg3CP7fcBc3ncdR9Vtw";
  const inputRef = useRef(null);
  const handleChange = useEffectEvent(onChange);
  const handleLocationSelect = useEffectEvent(onLocationSelect);
  useEffect(() => {
    if (!inputRef.current) {
      return;
    }
    const win = window;
    let autocompleteListener;
    const initAutocomplete = () => {
      if (!inputRef.current || !win.google?.maps?.places) {
        return;
      }
      const autocomplete = new win.google.maps.places.Autocomplete(inputRef.current, {
        types: ["geocode", "establishment"]
      });
      autocomplete.setFields(["formatted_address", "name"]);
      autocompleteListener = autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        const address = place.formatted_address || place.name || inputRef.current?.value || "";
        const label = place.name || "Selected location";
        handleChange(address);
        void handleLocationSelect({
          address,
          label
        });
      });
    };
    if (win.google?.maps?.places) {
      initAutocomplete();
      return () => {
        autocompleteListener?.remove?.();
      };
    }
    const existingScript = document.querySelector('script[data-google-maps-places="true"]');
    if (existingScript) {
      existingScript.addEventListener("load", initAutocomplete, {
        once: true
      });
      return () => {
        existingScript.removeEventListener("load", initAutocomplete);
        autocompleteListener?.remove?.();
      };
    }
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${googleKey}&libraries=places`;
    script.async = true;
    script.dataset.googleMapsPlaces = "true";
    script.addEventListener("load", initAutocomplete, {
      once: true
    });
    document.head.appendChild(script);
    return () => {
      script.removeEventListener("load", initAutocomplete);
      autocompleteListener?.remove?.();
    };
  }, [googleKey, handleChange, handleLocationSelect]);
  return /* @__PURE__ */ jsx(Input, { ref: inputRef, placeholder: "Select location", value, onChange: (event) => onChange(event.target.value) });
}
function ProfileSetup() {
  const {
    viewer,
    clientProfile
  } = useLoaderData({
    from: "/profile-setup"
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedLocationLabel, setSelectedLocationLabel] = useState(clientProfile?.savedLocations?.[0]?.label ?? "Selected location");
  const {
    profilePhotoPreview,
    successMessage,
    submitError,
    newHiringNeed,
    isLoading
  } = useAppSelector((state) => state.profile);
  const form = useForm({
    resolver: zodResolver(clientProfileSchema),
    defaultValues: {
      fullName: clientProfile?.fullName ?? `${viewer.firstName} ${viewer.lastName}`.trim(),
      email: clientProfile?.email ?? viewer.email,
      phone: clientProfile?.phone ?? viewer.phone ?? "",
      companyName: clientProfile?.companyName ?? "",
      companyWebsite: clientProfile?.companyWebsite ?? "",
      industry: clientProfile?.industry ?? "",
      teamSize: clientProfile?.teamSize ?? "",
      companyDescription: clientProfile?.companyDescription ?? "",
      address: clientProfile?.address ?? "",
      profilePhotoUrl: clientProfile?.avatarUrl ?? viewer.avatarUrl ?? "",
      savedLocations: clientProfile?.savedLocations?.length ? clientProfile.savedLocations.map((location) => ({
        label: location.label,
        address: location.address
      })) : [{
        label: "Primary office",
        address: ""
      }],
      hiringNeeds: clientProfile?.hiringNeeds?.length ? clientProfile.hiringNeeds : []
    }
  });
  const savedLocations = form.watch("savedLocations");
  const hiringNeeds = form.watch("hiringNeeds");
  const currentStepConfig = steps[currentStep];
  const progressPercent = (currentStep + 1) / steps.length * 100;
  const companyName = form.watch("companyName");
  const industry = form.watch("industry");
  const teamSize = form.watch("teamSize");
  const address = form.watch("address");
  const mapQuery = encodeURIComponent(address || savedLocations[0]?.address || "");
  const hasMapLocation = Boolean((address || savedLocations[0]?.address || "").trim());
  async function handlePhotoUpload(file) {
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      dispatch(setProfilePhotoPreview(result));
      form.setValue("profilePhotoUrl", result, {
        shouldValidate: true
      });
    };
    reader.readAsDataURL(file);
  }
  const addHiringNeed = (value) => {
    const nextNeed = (value ?? newHiringNeed).trim();
    if (!nextNeed) {
      dispatch(setSubmitError("Add at least one skill or hiring need before continuing."));
      return;
    }
    if (hiringNeeds.some((need) => need.toLowerCase() === nextNeed.toLowerCase())) {
      dispatch(setSubmitError("That skill is already in your hiring needs list."));
      return;
    }
    dispatch(setSubmitError(null));
    form.setValue("hiringNeeds", [...hiringNeeds, nextNeed], {
      shouldValidate: true
    });
    dispatch(setNewHiringNeed(""));
  };
  const removeHiringNeed = (needToRemove) => {
    form.setValue("hiringNeeds", hiringNeeds.filter((need) => need !== needToRemove), {
      shouldValidate: true
    });
  };
  const goToNextStep = async () => {
    dispatch(clearMessages());
    const stepIsValid = await form.trigger([...currentStepConfig.fields]);
    if (!stepIsValid) {
      dispatch(setSubmitError(currentStepConfig.validationMessage));
      return;
    }
    dispatch(setSubmitError(null));
    setCurrentStep((step) => Math.min(step + 1, steps.length - 1));
  };
  const goToPreviousStep = () => {
    dispatch(clearMessages());
    setCurrentStep((step) => Math.max(step - 1, 0));
  };
  const selectLocation = ({
    address: selectedAddress,
    label
  }) => {
    const trimmedAddress = selectedAddress.trim();
    form.setValue("address", trimmedAddress, {
      shouldValidate: true
    });
    form.setValue("savedLocations", trimmedAddress ? [{
      label: label.trim() || "Selected location",
      address: trimmedAddress
    }] : [], {
      shouldValidate: true
    });
    setSelectedLocationLabel(label.trim() || "Selected location");
    dispatch(setSubmitError(null));
    dispatch(setSuccessMessage(null));
  };
  const applyProfileResult = (profile) => {
    if (!profile) {
      return;
    }
    form.reset({
      fullName: profile.fullName,
      email: profile.email,
      phone: profile.phone,
      companyName: profile.companyName,
      companyWebsite: profile.companyWebsite,
      industry: profile.industry,
      teamSize: profile.teamSize,
      companyDescription: profile.companyDescription,
      address: profile.address,
      profilePhotoUrl: profile.avatarUrl ?? "",
      savedLocations: profile.savedLocations,
      hiringNeeds: profile.hiringNeeds
    });
    setSelectedLocationLabel(profile.savedLocations[0]?.label ?? "Selected location");
    dispatch(setProfilePhotoPreview(profile.avatarUrl ?? ""));
  };
  const saveSelectedLocation = async ({
    address: selectedAddress,
    label
  }) => {
    const trimmedAddress = selectedAddress.trim();
    if (!trimmedAddress) {
      dispatch(setSubmitError("Select a valid location before saving."));
      return;
    }
    const currentValues = form.getValues();
    const nextSavedLocations = [{
      label: label.trim() || "Selected location",
      address: trimmedAddress
    }];
    form.setValue("address", trimmedAddress, {
      shouldValidate: true
    });
    form.setValue("savedLocations", nextSavedLocations, {
      shouldValidate: true
    });
    dispatch(setSubmitError(null));
    dispatch(setSuccessMessage(null));
    dispatch(setIsLoading(true));
    try {
      const result = await saveClientProfile({
        data: {
          ...currentValues,
          address: trimmedAddress,
          savedLocations: nextSavedLocations
        }
      });
      if (!result.ok) {
        dispatch(setSubmitError(result.formError));
        return;
      }
      applyProfileResult(result.profile);
      dispatch(setSuccessMessage("Location saved."));
    } finally {
      dispatch(setIsLoading(false));
    }
  };
  const onSubmit = async (values) => {
    dispatch(setSubmitError(null));
    dispatch(setSuccessMessage(null));
    dispatch(setIsLoading(true));
    try {
      const result = await saveClientProfile({
        data: values
      });
      if (!result.ok) {
        dispatch(setSubmitError(result.formError));
        return;
      }
      applyProfileResult(result.profile);
      dispatch(setSuccessMessage("Client onboarding saved. Opening your home page now."));
      await navigate({
        to: "/"
      });
    } finally {
      dispatch(setIsLoading(false));
    }
  };
  if (viewer.role !== "CLIENT") {
    return /* @__PURE__ */ jsx(AuthLayout, { title: "Professional onboarding", subtitle: "This onboarding flow is currently built only for clients.", footer: /* @__PURE__ */ jsxs(Fragment, { children: [
      "Want to continue later?",
      " ",
      /* @__PURE__ */ jsx(Link, { to: "/", className: "text-primary hover:underline", children: "Go back home" })
    ] }), children: /* @__PURE__ */ jsxs(Card, { className: "border-border shadow-soft", children: [
      /* @__PURE__ */ jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm text-primary", children: [
          /* @__PURE__ */ jsx(ShieldCheck, { className: "h-4 w-4" }),
          "Client-only flow"
        ] }),
        /* @__PURE__ */ jsx(CardTitle, { children: "Professional setup is next" }),
        /* @__PURE__ */ jsx(CardDescription, { children: "We turned this setup into a client-only onboarding wizard. Professional onboarding can be added separately." })
      ] }),
      /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx(Button, { asChild: true, className: "w-full", children: /* @__PURE__ */ jsx(Link, { to: "/", children: "Return to home" }) }) })
    ] }) });
  }
  return /* @__PURE__ */ jsx(AuthLayout, { title: "Set up your client account", subtitle: "Complete your company profile in three steps so your dashboard, saved locations, and future hiring flow all start with the right information.", fullWidth: true, footer: /* @__PURE__ */ jsxs(Fragment, { children: [
    "Prefer editing later?",
    " ",
    /* @__PURE__ */ jsx(Link, { to: "/my-info", className: "text-primary hover:underline", children: "Open my info" })
  ] }), children: /* @__PURE__ */ jsxs("div", { className: "grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]", children: [
    /* @__PURE__ */ jsxs(Card, { className: "border-border shadow-soft", children: [
      /* @__PURE__ */ jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm text-primary", children: [
          /* @__PURE__ */ jsx(ShieldCheck, { className: "h-4 w-4" }),
          "Client onboarding"
        ] }),
        /* @__PURE__ */ jsx(CardTitle, { children: "Build your client profile" }),
        /* @__PURE__ */ jsx(CardDescription, { children: "A clean, Upwork-style onboarding flow for company details, locations, and hiring needs." })
      ] }),
      /* @__PURE__ */ jsxs(CardContent, { className: "space-y-5", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-2 flex items-center justify-between text-xs font-medium text-muted-foreground", children: [
            /* @__PURE__ */ jsxs("span", { children: [
              "Step ",
              currentStep + 1,
              " of ",
              steps.length
            ] }),
            /* @__PURE__ */ jsxs("span", { children: [
              Math.round(progressPercent),
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "h-2 rounded-full bg-muted", children: /* @__PURE__ */ jsx("div", { className: "h-2 rounded-full bg-primary transition-all", style: {
            width: `${progressPercent}%`
          } }) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-3", children: steps.map((step, index) => /* @__PURE__ */ jsx("div", { className: `rounded-2xl border p-4 transition-colors ${index === currentStep ? "border-primary bg-primary/5" : index < currentStep ? "border-success/30 bg-success/5" : "border-border bg-card"}`, children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: `grid h-10 w-10 place-items-center rounded-xl ${index === currentStep ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`, children: /* @__PURE__ */ jsx(step.icon, { className: "h-5 w-5" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "font-medium", children: step.title }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: step.subtitle })
          ] })
        ] }) }, step.title)) }),
        /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-border bg-muted/30 p-4", children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-foreground", children: "Live summary" }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: companyName || "Your company name will appear here" }),
          /* @__PURE__ */ jsxs("p", { className: "mt-1 text-xs text-muted-foreground", children: [
            industry || "Industry not added yet",
            teamSize ? ` - ${teamSize}` : ""
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 text-xs text-muted-foreground", children: address || "Primary location not added yet" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Card, { className: "border-border shadow-soft", children: [
      /* @__PURE__ */ jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm text-primary", children: [
          /* @__PURE__ */ jsx(currentStepConfig.icon, { className: "h-4 w-4" }),
          currentStepConfig.title
        ] }),
        /* @__PURE__ */ jsx(CardTitle, { children: currentStepConfig.title }),
        /* @__PURE__ */ jsx(CardDescription, { children: currentStepConfig.subtitle })
      ] }),
      /* @__PURE__ */ jsx(CardContent, { className: "space-y-6", children: /* @__PURE__ */ jsx(Form, { ...form, children: /* @__PURE__ */ jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-6", children: [
        currentStep === 0 ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 rounded-2xl border border-border bg-muted/40 p-4", children: [
            /* @__PURE__ */ jsx("img", { src: profilePhotoPreview || form.watch("profilePhotoUrl") || "https://i.pravatar.cc/120?u=client-profile", alt: "Profile preview", className: "h-20 w-20 rounded-2xl object-cover" }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1 space-y-3", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm font-medium text-foreground", children: [
                /* @__PURE__ */ jsx(ImagePlus, { className: "h-4 w-4 text-primary" }),
                "Company or profile photo"
              ] }),
              /* @__PURE__ */ jsx(Input, { type: "file", accept: "image/*", onChange: (event) => handlePhotoUpload(event.target.files?.[0]) }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Add a polished logo or profile photo so your dashboard feels complete from day one." })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid gap-4 xl:grid-cols-2", children: [
            /* @__PURE__ */ jsx(FormField, { control: form.control, name: "fullName", render: ({
              field
            }) => /* @__PURE__ */ jsxs(FormItem, { children: [
              /* @__PURE__ */ jsx(FormLabel, { children: "Contact name" }),
              /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { placeholder: "Alex Rivers", ...field }) }),
              /* @__PURE__ */ jsx(FormMessage, {})
            ] }) }),
            /* @__PURE__ */ jsx(FormField, { control: form.control, name: "companyName", render: ({
              field
            }) => /* @__PURE__ */ jsxs(FormItem, { children: [
              /* @__PURE__ */ jsx(FormLabel, { children: "Company name" }),
              /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { placeholder: "Northwind Studio", ...field }) }),
              /* @__PURE__ */ jsx(FormMessage, {})
            ] }) }),
            /* @__PURE__ */ jsx(FormField, { control: form.control, name: "email", render: ({
              field
            }) => /* @__PURE__ */ jsxs(FormItem, { children: [
              /* @__PURE__ */ jsx(FormLabel, { children: "Email" }),
              /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { type: "email", placeholder: "you@example.com", ...field }) }),
              /* @__PURE__ */ jsx(FormMessage, {})
            ] }) }),
            /* @__PURE__ */ jsx(FormField, { control: form.control, name: "phone", render: ({
              field
            }) => /* @__PURE__ */ jsxs(FormItem, { children: [
              /* @__PURE__ */ jsx(FormLabel, { children: "Phone" }),
              /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { placeholder: "9876543210", ...field }) }),
              /* @__PURE__ */ jsx(FormMessage, {})
            ] }) }),
            /* @__PURE__ */ jsx(FormField, { control: form.control, name: "companyWebsite", render: ({
              field
            }) => /* @__PURE__ */ jsxs(FormItem, { children: [
              /* @__PURE__ */ jsx(FormLabel, { children: "Company website" }),
              /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { placeholder: "https://yourcompany.com", ...field }) }),
              /* @__PURE__ */ jsx(FormMessage, {})
            ] }) }),
            /* @__PURE__ */ jsx(FormField, { control: form.control, name: "industry", render: ({
              field
            }) => /* @__PURE__ */ jsxs(FormItem, { children: [
              /* @__PURE__ */ jsx(FormLabel, { children: "Industry" }),
              /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { placeholder: "SaaS, e-commerce, healthcare...", ...field }) }),
              /* @__PURE__ */ jsx(FormMessage, {})
            ] }) }),
            /* @__PURE__ */ jsx(FormField, { control: form.control, name: "teamSize", render: ({
              field
            }) => /* @__PURE__ */ jsxs(FormItem, { children: [
              /* @__PURE__ */ jsx(FormLabel, { children: "Team size" }),
              /* @__PURE__ */ jsxs(Select, { value: field.value, onValueChange: field.onChange, children: [
                /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select your team size" }) }) }),
                /* @__PURE__ */ jsx(SelectContent, { children: teamSizeOptions.map((option) => /* @__PURE__ */ jsx(SelectItem, { value: option, children: option }, option)) })
              ] }),
              /* @__PURE__ */ jsx(FormMessage, {})
            ] }) })
          ] }),
          /* @__PURE__ */ jsx(FormField, { control: form.control, name: "companyDescription", render: ({
            field
          }) => /* @__PURE__ */ jsxs(FormItem, { children: [
            /* @__PURE__ */ jsx(FormLabel, { children: "About your company" }),
            /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Textarea, { className: "min-h-28", placeholder: "Describe what your company does, the kinds of projects you hire for, and what great collaboration looks like for your team.", ...field }) }),
            /* @__PURE__ */ jsx(FormMessage, {})
          ] }) })
        ] }) : null,
        currentStep === 1 ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(FormField, { control: form.control, name: "address", render: ({
            field
          }) => /* @__PURE__ */ jsxs(FormItem, { children: [
            /* @__PURE__ */ jsx(FormLabel, { children: "Primary company location" }),
            /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(LocationAutocompleteInput, { value: field.value, onChange: field.onChange, onLocationSelect: selectLocation }) }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Search on the map, choose one location, then use the save button below." }),
            /* @__PURE__ */ jsx(FormMessage, {})
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "overflow-hidden rounded-2xl border border-border bg-muted/30", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-b border-border px-4 py-3", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "font-medium text-foreground", children: "Google Maps preview" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Preview the company location while entering the address." })
              ] }),
              hasMapLocation ? /* @__PURE__ */ jsx("a", { href: `https://www.google.com/maps/search/?api=1&query=${mapQuery}`, target: "_blank", rel: "noreferrer", className: "text-sm font-medium text-primary hover:underline", children: "Open in Google Maps" }) : null
            ] }),
            hasMapLocation ? /* @__PURE__ */ jsx("iframe", { title: "Company location map", src: `https://www.google.com/maps?q=${mapQuery}&z=14&output=embed`, className: "h-[320px] w-full border-0", loading: "lazy", referrerPolicy: "no-referrer-when-downgrade" }) : /* @__PURE__ */ jsx("div", { className: "grid h-[320px] place-items-center px-6 text-center text-sm text-muted-foreground", children: "Enter a valid company address to preview it on Google Maps here." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm font-medium text-foreground", children: [
              /* @__PURE__ */ jsx(MapPinHouse, { className: "h-4 w-4 text-primary" }),
              "Selected location"
            ] }),
            /* @__PURE__ */ jsx("div", { className: "rounded-2xl border border-border bg-muted/40 p-4", children: savedLocations[0]?.address ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx("p", { className: "font-medium", children: selectedLocationLabel }),
              /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: savedLocations[0].address })
            ] }) : /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "No location selected yet." }) }),
            /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxs(Button, { type: "button", onClick: () => saveSelectedLocation({
              address: form.getValues("address"),
              label: selectedLocationLabel
            }), disabled: isLoading || !form.getValues("address")?.trim(), children: [
              /* @__PURE__ */ jsx(Save, { className: "h-4 w-4" }),
              isLoading ? "Saving..." : "Save location"
            ] }) }),
            /* @__PURE__ */ jsx(FormField, { control: form.control, name: "savedLocations", render: () => /* @__PURE__ */ jsx(FormItem, { children: /* @__PURE__ */ jsx(FormMessage, {}) }) })
          ] })
        ] }) : null,
        currentStep === 2 ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-border bg-muted/40 p-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm font-medium text-foreground", children: [
              /* @__PURE__ */ jsx(BriefcaseBusiness, { className: "h-4 w-4 text-primary" }),
              "What do you hire for?"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Add the skills, roles, or services your company hires for most often." }),
            /* @__PURE__ */ jsx("div", { className: "mt-4 flex flex-wrap gap-2", children: suggestedHiringNeeds.map((need) => /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => addHiringNeed(need), className: "rounded-full border border-border bg-background px-3 py-1.5 text-sm transition-colors hover:border-primary hover:text-primary", children: [
              "+ ",
              need
            ] }, need)) }),
            /* @__PURE__ */ jsxs("div", { className: "mt-4 grid gap-3 sm:grid-cols-[1fr_auto]", children: [
              /* @__PURE__ */ jsx(Input, { placeholder: "Add a custom hiring need", value: newHiringNeed, onChange: (event) => dispatch(setNewHiringNeed(event.target.value)) }),
              /* @__PURE__ */ jsx(Button, { type: "button", onClick: () => addHiringNeed(), children: "Add skill" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
            hiringNeeds.map((need) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between rounded-2xl border border-border bg-card px-4 py-3", children: [
              /* @__PURE__ */ jsx("span", { className: "font-medium", children: need }),
              /* @__PURE__ */ jsx("button", { type: "button", onClick: () => removeHiringNeed(need), className: "rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground", "aria-label": `Remove ${need}`, children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }) })
            ] }, need)),
            /* @__PURE__ */ jsx(FormField, { control: form.control, name: "hiringNeeds", render: () => /* @__PURE__ */ jsx(FormItem, { children: /* @__PURE__ */ jsx(FormMessage, {}) }) })
          ] })
        ] }) : null,
        submitError ? /* @__PURE__ */ jsx("div", { className: "rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive", children: submitError }) : null,
        successMessage ? /* @__PURE__ */ jsx("div", { className: "rounded-xl border border-success/20 bg-success/5 px-4 py-3 text-sm text-success", children: successMessage }) : null,
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsxs(Button, { type: "button", variant: "outline", onClick: goToPreviousStep, disabled: currentStep === 0 || isLoading, children: [
              /* @__PURE__ */ jsx(ChevronLeft, { className: "h-4 w-4" }),
              "Back"
            ] }),
            /* @__PURE__ */ jsx(Button, { variant: "ghost", asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "/my-info", children: "Edit later" }) })
          ] }),
          currentStep < steps.length - 1 ? /* @__PURE__ */ jsxs(Button, { type: "button", onClick: goToNextStep, children: [
            "Continue",
            /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4" })
          ] }) : /* @__PURE__ */ jsxs(Button, { type: "submit", disabled: isLoading, children: [
            /* @__PURE__ */ jsx(Save, { className: "h-4 w-4" }),
            isLoading ? "Saving..." : "Finish setup"
          ] })
        ] })
      ] }) }) })
    ] })
  ] }) });
}
const Route$p = Route$q;
const getProjectsPageData = createServerFn({
  method: "GET"
}).handler(createSsrRpc("7cf9b549da54905b15de3ab7fd7d0d87c0adfbccbaf92c4aef93c08a5496bf86"));
const updateProjectRequest = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(createSsrRpc("b6df212eaa2ab587a99f249bda564bc2a1ae2f9d46be29facb860d178cdcdefb"));
const updateProjectStatus = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(createSsrRpc("8970e96279146b0b7c89d98104e63c2be6bfe7fad738b480a637de26025eacf7"));
const removeProjectImmediately = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(createSsrRpc("99f8bc625c4f192187c9842ee3a566892709d8486e62910e3a0b50dd648a03ff"));
const rateProjectProfessional$1 = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(createSsrRpc("d45d657e65d2dc91c1038c27ffcc9dc1643d278a30371f0a7552c8d53f5b1561"));
const startDirectHireProject = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(createSsrRpc("7289ddbee63ffc3afac939be6d4a48afb6b87577e64db0027216d793e1797742"));
const cancelTrackedProject = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(createSsrRpc("e8e7f8df643a91f5fa16310b31c9084324d8df716e972d847ad9fbb636a8bc2c"));
const cancelDirectHireProject = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(createSsrRpc("1b101f8aa7fd0e5406cfeb84f019d600f221056e114340a2506230526a899ad4"));
const deleteRejectedDirectHire = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(createSsrRpc("bf64e5b60e364c05c09598f2a23046d9968e10d4acbb03fcece2f8c40c48e1dc"));
const Route$o = createFileRoute("/projects")({
  beforeLoad: async ({
    location
  }) => {
    const data = await getProjectsPageData();
    if (!data) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href
        }
      });
    }
    if (data.viewer.role !== "CLIENT") {
      throw redirect({
        to: "/dashboard"
      });
    }
  },
  loader: () => getProjectsPageData(),
  head: () => ({
    meta: [{
      title: "Projects - Servio"
    }]
  }),
  component: Projects
});
function Projects() {
  const data = useLoaderData({
    from: "/projects"
  });
  const router2 = useRouter();
  const [now, setNow] = useState(() => Date.now());
  const [pendingAction, setPendingAction] = useState(null);
  const [expandedTimelineId, setExpandedTimelineId] = useState(null);
  const [ratingDrafts, setRatingDrafts] = useState({});
  const [activeProjectFilter, setActiveProjectFilter] = useState(null);
  useEffect(() => {
    const interval = window.setInterval(() => setNow(Date.now()), 1e3);
    return () => window.clearInterval(interval);
  }, []);
  if (!data) {
    return null;
  }
  const {
    viewer,
    clientProfile
  } = data;
  const projects = data.projects;
  const projectRequests = data.projectRequests ?? [];
  const projectNegotiations = data.projectNegotiations ?? [];
  const trackedProjects = data.trackedProjects ?? [];
  const hireRequests = data.hireRequests ?? [];
  const trackedJobIds = new Set(trackedProjects.filter((project) => project.status === "ACTIVE" || project.status === "COMPLETED").map((project) => project.jobId));
  const visibleProjects = projects.filter((project) => !trackedJobIds.has(project.id) && !isClosedProjectExpired(project, now));
  const displayName = clientProfile?.fullName || `${viewer.firstName} ${viewer.lastName}`.trim();
  const runningProjects = trackedProjects.filter((project) => project.status === "ACTIVE");
  const completedProjects = trackedProjects.filter((project) => project.status === "COMPLETED");
  const visibleHireRequests = hireRequests.filter((request) => request.status !== "started" && request.status !== "cancelled" && !isExpiredRejectedHireRequest$1(request, now));
  const acceptedHireRequests = visibleHireRequests.filter((request) => request.status === "accepted");
  const startedHireRequests = hireRequests.filter((request) => request.status === "started" && !request.trackingId);
  const runningProjectCount = runningProjects.length + startedHireRequests.length;
  const showAllProjectBuckets = activeProjectFilter === null;
  const activeProjectFilterLabel = activeProjectFilter ? getProjectBucketLabel(activeProjectFilter) : null;
  function toggleProjectFilter(filter) {
    setActiveProjectFilter((current) => current === filter ? null : filter);
  }
  async function handleRequestStatus(requestId, status) {
    const actionKey = `${requestId}-${status}`;
    const selectedRequest = projectRequests.find((request) => request.id === requestId);
    setPendingAction(actionKey);
    try {
      const request = await updateProjectRequest({
        data: {
          requestId,
          status
        }
      });
      if (request && selectedRequest) {
        await emitProjectNotification$1({
          trackingId: request.id,
          actorId: viewer.id,
          recipientId: request.professionalId,
          title: status === "ACCEPTED" ? "Project request accepted" : "Project request rejected",
          description: status === "ACCEPTED" ? `${selectedRequest.projectTitle} was accepted. Project tracking is ready.` : `${selectedRequest.projectTitle} request was rejected.`,
          href: "/professional-stats"
        });
      }
      await router2.invalidate();
    } finally {
      setPendingAction(null);
    }
  }
  async function handleProjectStatus(projectId, status) {
    const actionKey = `project-${projectId}-${status}`;
    setPendingAction(actionKey);
    try {
      await updateProjectStatus({
        data: {
          projectId,
          status
        }
      });
      await router2.invalidate();
    } finally {
      setPendingAction(null);
    }
  }
  async function handleRemoveProjectNow(projectId) {
    const actionKey = `project-${projectId}-REMOVE`;
    setPendingAction(actionKey);
    try {
      await removeProjectImmediately({
        data: {
          projectId
        }
      });
      await router2.invalidate();
    } finally {
      setPendingAction(null);
    }
  }
  async function handleRateProject(project) {
    const draft = ratingDrafts[project.id] ?? {
      rating: project.reviewRating ?? 5,
      comment: project.reviewComment ?? ""
    };
    const actionKey = `rate-${project.id}`;
    setPendingAction(actionKey);
    try {
      await rateProjectProfessional$1({
        data: {
          trackingId: project.id,
          rating: draft.rating,
          comment: draft.comment || null
        }
      });
      await router2.invalidate();
    } finally {
      setPendingAction(null);
    }
  }
  async function handleStartDirectHire(request) {
    const actionKey = `start-direct-hire-${request.contractId}`;
    setPendingAction(actionKey);
    try {
      await startDirectHireProject({
        data: {
          contractId: request.contractId
        }
      });
      await router2.invalidate();
    } finally {
      setPendingAction(null);
    }
  }
  async function handleCancelTrackedProject(project) {
    const actionKey = `cancel-tracked-${project.id}`;
    setPendingAction(actionKey);
    try {
      await cancelTrackedProject({
        data: {
          trackingId: project.id
        }
      });
      await router2.invalidate();
    } finally {
      setPendingAction(null);
    }
  }
  async function handleCancelDirectHire(request) {
    const actionKey = `cancel-direct-hire-${request.contractId}`;
    setPendingAction(actionKey);
    try {
      await cancelDirectHireProject({
        data: {
          contractId: request.contractId
        }
      });
      await router2.invalidate();
    } finally {
      setPendingAction(null);
    }
  }
  async function handleDeleteRejectedDirectHire(request) {
    const actionKey = `delete-rejected-direct-hire-${request.contractId}`;
    setPendingAction(actionKey);
    try {
      await deleteRejectedDirectHire({
        data: {
          contractId: request.contractId
        }
      });
      await router2.invalidate();
    } finally {
      setPendingAction(null);
    }
  }
  return /* @__PURE__ */ jsxs(AppShell, { userName: displayName, userRole: "Client", userAvatarUrl: clientProfile?.avatarUrl || viewer.avatarUrl, children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-end", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-semibold tracking-tight", children: "Projects" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "These projects are loaded from your saved database records." })
      ] }),
      /* @__PURE__ */ jsx(Button, { asChild: true, children: /* @__PURE__ */ jsxs(Link, { to: "/post-job", children: [
        /* @__PURE__ */ jsx(PlusCircle, { className: "h-4 w-4" }),
        "Create new project"
      ] }) })
    ] }),
    visibleProjects.length ? /* @__PURE__ */ jsx("div", { className: "mb-6 grid auto-rows-fr gap-4 lg:grid-cols-2", children: visibleProjects.map((project) => {
      const removeInMs = getClosedProjectRemovalMs(project, now);
      return /* @__PURE__ */ jsxs("div", { className: "flex min-h-[240px] flex-col rounded-xl border border-border bg-card p-5 shadow-soft transition-colors hover:border-primary/50 hover:bg-primary/5", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2", children: [
              /* @__PURE__ */ jsx(Badge, { variant: "secondary", children: project.category }),
              /* @__PURE__ */ jsx(Badge, { variant: project.status === "OPEN" ? "default" : project.status === "DRAFT" ? "secondary" : "outline", children: project.status === "OPEN" ? "Active" : formatEnum$4(project.status) })
            ] }),
            /* @__PURE__ */ jsx("h2", { className: "mt-3 line-clamp-2 text-lg font-semibold", children: project.title }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground", children: project.description })
          ] }),
          /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "sm", asChild: true, children: /* @__PURE__ */ jsxs(Link, { to: "/project/$projectId", params: {
            projectId: String(project.id)
          }, children: [
            /* @__PURE__ */ jsx(Search, { className: "h-4 w-4" }),
            "View"
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-5 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(DollarSign, { className: "h-4 w-4" }),
            formatBudget$3(project.budgetMin, project.budgetMax, project.timingType)
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(CalendarDays, { className: "h-4 w-4" }),
            formatDate$4(project.deadline)
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Briefcase, { className: "h-4 w-4" }),
            formatWorkMode$1(project.workMode)
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(FileText, { className: "h-4 w-4" }),
            project.attachments.length,
            " files"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-auto flex items-center gap-2 border-t border-border pt-4 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsx(MapPin, { className: "h-4 w-4 shrink-0" }),
          /* @__PURE__ */ jsx("span", { className: "truncate", children: formatApproximateLocation(project.locationAddress || project.locationLabel, "Remote or no location saved") })
        ] }),
        removeInMs != null ? /* @__PURE__ */ jsxs("div", { className: "mt-3 rounded-lg border border-warning/30 bg-warning/10 px-3 py-2 text-sm text-warning-foreground", children: [
          "Closed project. Removes in ",
          formatCountdown(removeInMs),
          "."
        ] }) : null,
        /* @__PURE__ */ jsxs("div", { className: "mt-4 flex flex-wrap gap-2", children: [
          /* @__PURE__ */ jsx(Button, { size: "sm", asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "/project/$projectId", params: {
            projectId: String(project.id)
          }, children: "View project" }) }),
          project.status === "OPEN" ? /* @__PURE__ */ jsxs(Button, { size: "sm", variant: "outline", onClick: () => handleProjectStatus(project.id, "CLOSED"), disabled: pendingAction !== null, children: [
            /* @__PURE__ */ jsx(XCircle, { className: "h-4 w-4" }),
            pendingAction === `project-${project.id}-CLOSED` ? "Closing" : "Close project"
          ] }) : null,
          project.status === "CLOSED" ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsxs(Button, { size: "sm", variant: "outline", onClick: () => handleProjectStatus(project.id, "OPEN"), disabled: pendingAction !== null, children: [
              /* @__PURE__ */ jsx(CheckCircle2, { className: "h-4 w-4" }),
              pendingAction === `project-${project.id}-OPEN` ? "Opening" : "Reopen project"
            ] }),
            /* @__PURE__ */ jsxs(Button, { size: "sm", variant: "outline", onClick: () => handleRemoveProjectNow(project.id), disabled: pendingAction !== null, children: [
              /* @__PURE__ */ jsx(XCircle, { className: "h-4 w-4" }),
              pendingAction === `project-${project.id}-REMOVE` ? "Removing" : "Close immediately"
            ] })
          ] }) : null
        ] })
      ] }, project.id);
    }) }) : /* @__PURE__ */ jsxs("div", { className: "mb-6 rounded-xl border border-dashed border-border bg-card p-10 text-center shadow-soft", children: [
      /* @__PURE__ */ jsx(Briefcase, { className: "mx-auto h-9 w-9 text-muted-foreground" }),
      /* @__PURE__ */ jsx("h2", { className: "mt-3 font-semibold", children: "No projects saved yet" }),
      /* @__PURE__ */ jsx("p", { className: "mx-auto mt-1 max-w-md text-sm text-muted-foreground", children: "Create a project from the job posting form. After it is saved, it will appear here from the database." }),
      /* @__PURE__ */ jsx(Button, { className: "mt-4", asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "/post-job", children: "Create new project" }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: [
      /* @__PURE__ */ jsx(ProjectStat, { label: "Running", value: runningProjectCount, icon: Clock, isActive: activeProjectFilter === "running", onClick: () => toggleProjectFilter("running") }),
      /* @__PURE__ */ jsx(ProjectStat, { label: "Completed", value: completedProjects.length, icon: CheckCircle2, isActive: activeProjectFilter === "completed", onClick: () => toggleProjectFilter("completed") }),
      /* @__PURE__ */ jsx(ProjectStat, { label: "Requests", value: projectRequests.length, icon: Send, isActive: activeProjectFilter === "requests", onClick: () => toggleProjectFilter("requests") }),
      /* @__PURE__ */ jsx(ProjectStat, { label: "Direct hires", value: acceptedHireRequests.length, icon: Handshake, isActive: activeProjectFilter === "direct-hires", onClick: () => toggleProjectFilter("direct-hires") })
    ] }),
    activeProjectFilterLabel ? /* @__PURE__ */ jsxs("div", { className: "mb-6 flex flex-col justify-between gap-3 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 sm:flex-row sm:items-center", children: [
      /* @__PURE__ */ jsxs("p", { className: "text-sm font-medium", children: [
        "Showing only ",
        activeProjectFilterLabel.toLowerCase(),
        "."
      ] }),
      /* @__PURE__ */ jsx(Button, { type: "button", size: "sm", variant: "outline", onClick: () => setActiveProjectFilter(null), children: "Show all projects" })
    ] }) : null,
    /* @__PURE__ */ jsxs("div", { className: "mb-6 space-y-6", children: [
      showAllProjectBuckets || activeProjectFilter === "running" ? /* @__PURE__ */ jsxs("section", { className: "rounded-xl border border-border bg-card p-6 shadow-soft", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-between gap-3 sm:flex-row sm:items-center", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold", children: "Running projects" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Accepted requests currently in progress." })
          ] }),
          /* @__PURE__ */ jsxs(Badge, { children: [
            runningProjectCount,
            " running"
          ] })
        ] }),
        runningProjectCount ? /* @__PURE__ */ jsxs("div", { className: "mt-5 grid gap-4 lg:grid-cols-2", children: [
          runningProjects.map((project) => /* @__PURE__ */ jsx(TrackedProjectCard, { project, pendingAction, ratingDraft: ratingDrafts[project.id] ?? {
            rating: project.reviewRating ?? 5,
            comment: project.reviewComment ?? ""
          }, onDraftChange: (draft) => setRatingDrafts((drafts) => ({
            ...drafts,
            [project.id]: draft
          })), onRate: () => handleRateProject(project), onCancel: () => handleCancelTrackedProject(project) }, `running-${project.id}`)),
          startedHireRequests.map((request) => /* @__PURE__ */ jsx(RunningDirectHireCard, { request, pendingAction, onCancel: handleCancelDirectHire }, `running-direct-hire-${request.contractId}`))
        ] }) : /* @__PURE__ */ jsx(EmptyProjectBox, { icon: Clock, title: "No running projects", description: "Accepted active projects will appear here." })
      ] }) : null,
      showAllProjectBuckets || activeProjectFilter === "direct-hires" ? /* @__PURE__ */ jsxs("section", { className: "rounded-xl border border-border bg-card p-6 shadow-soft", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-between gap-3 sm:flex-row sm:items-center", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold", children: "Direct hires" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Hire requests you sent directly from professional profiles." })
          ] }),
          /* @__PURE__ */ jsxs(Badge, { variant: "secondary", children: [
            visibleHireRequests.length,
            " hires"
          ] })
        ] }),
        visibleHireRequests.length ? /* @__PURE__ */ jsx("div", { className: "mt-5 grid gap-4 lg:grid-cols-2", children: visibleHireRequests.map((request) => /* @__PURE__ */ jsx(DirectHireCard, { request, pendingAction, onStartProject: handleStartDirectHire, onDeleteRejected: handleDeleteRejectedDirectHire }, request.contractId)) }) : /* @__PURE__ */ jsx(EmptyProjectBox, { icon: Handshake, title: "No direct hires yet", description: "When you send a hire request to a professional, it will appear here." })
      ] }) : null,
      showAllProjectBuckets || activeProjectFilter === "completed" ? /* @__PURE__ */ jsxs("section", { className: "rounded-xl border border-border bg-card p-6 shadow-soft", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-between gap-3 sm:flex-row sm:items-center", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold", children: "Completed projects" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Finished work ready for review history." })
          ] }),
          /* @__PURE__ */ jsxs(Badge, { variant: "secondary", children: [
            completedProjects.length,
            " completed"
          ] })
        ] }),
        completedProjects.length ? /* @__PURE__ */ jsx("div", { className: "mt-5 grid gap-4 lg:grid-cols-2", children: completedProjects.map((project) => /* @__PURE__ */ jsx(TrackedProjectCard, { project, pendingAction, ratingDraft: ratingDrafts[project.id] ?? {
          rating: project.reviewRating ?? 5,
          comment: project.reviewComment ?? ""
        }, onDraftChange: (draft) => setRatingDrafts((drafts) => ({
          ...drafts,
          [project.id]: draft
        })), onRate: () => handleRateProject(project) }, `completed-${project.id}`)) }) : /* @__PURE__ */ jsx(EmptyProjectBox, { icon: CheckCircle2, title: "No completed projects", description: "Projects accepted as finished will appear here." })
      ] }) : null,
      showAllProjectBuckets || activeProjectFilter === "requests" ? /* @__PURE__ */ jsxs("section", { className: "rounded-xl border border-border bg-card p-6 shadow-soft", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-between gap-3 sm:flex-row sm:items-center", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold", children: "Request projects" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Professional requests waiting for your action." })
          ] }),
          /* @__PURE__ */ jsxs(Badge, { variant: "secondary", children: [
            projectRequests.length,
            " requests"
          ] })
        ] }),
        projectRequests.length ? /* @__PURE__ */ jsx("div", { className: "mt-5 grid gap-4 lg:grid-cols-2", children: projectRequests.map((request) => /* @__PURE__ */ jsx(ProjectRequestCard, { request, negotiations: projectNegotiations.filter((negotiation) => negotiation.requestId === request.id), pendingAction, isTimelineOpen: expandedTimelineId === request.id, onToggleTimeline: () => setExpandedTimelineId(expandedTimelineId === request.id ? null : request.id), onRequestStatus: handleRequestStatus }, request.id)) }) : /* @__PURE__ */ jsx(EmptyProjectBox, { icon: Send, title: "No project requests", description: "New professional requests will appear here." })
      ] }) : null
    ] })
  ] });
}
function RunningDirectHireCard({
  request,
  pendingAction,
  onCancel
}) {
  const professionalName = request.professionalName || "Professional";
  const openMessage = () => {
    const search = new URLSearchParams({
      conversationId: `client-${request.clientId}-pro-${request.professionalId}`,
      toUserId: String(request.professionalId),
      name: professionalName,
      avatar: request.professionalAvatarUrl || "",
      job: request.title,
      firstMessage: `Hi ${professionalName}, let's discuss the running project: ${request.title}`
    });
    window.location.href = `/messages?${search.toString()}`;
  };
  return /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-border p-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
      /* @__PURE__ */ jsx("img", { src: request.professionalAvatarUrl || `https://i.pravatar.cc/100?u=running-direct-hire-${request.professionalId}`, alt: professionalName, className: "h-11 w-11 rounded-lg object-cover" }),
      /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-semibold", children: request.title }),
          /* @__PURE__ */ jsx(Badge, { children: "Running" }),
          /* @__PURE__ */ jsx(Badge, { variant: "outline", children: "Direct hire" })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
          "Professional: ",
          professionalName
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-4 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2", children: [
      /* @__PURE__ */ jsx(InfoPill, { icon: DollarSign, label: "Budget", value: formatMoney$2(request.totalAmount ?? request.budgetMax ?? request.budgetMin ?? 0) }),
      /* @__PURE__ */ jsx(InfoPill, { icon: Briefcase, label: "Work mode", value: formatEnum$4(request.workMode || "both") }),
      /* @__PURE__ */ jsx(InfoPill, { icon: CalendarDays, label: "Accepted", value: request.updatedAt ? formatDateTime$3(request.updatedAt) : "Not set" }),
      /* @__PURE__ */ jsx(InfoPill, { icon: MapPin, label: "Location", value: request.location || "Not set" })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "mt-3 line-clamp-3 text-sm text-muted-foreground", children: request.description || "No work description added." }),
    /* @__PURE__ */ jsxs("div", { className: "mt-4 flex flex-wrap gap-2", children: [
      request.trackingId ? /* @__PURE__ */ jsx(Button, { size: "sm", asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "/project-track/$trackingId", params: {
        trackingId: String(request.trackingId)
      }, children: "Track project" }) }) : /* @__PURE__ */ jsx(Button, { size: "sm", disabled: true, children: "Track project" }),
      request.clientProjectId ? /* @__PURE__ */ jsx(Button, { size: "sm", variant: "outline", asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "/project/$projectId", params: {
        projectId: String(request.clientProjectId)
      }, children: "View project" }) }) : /* @__PURE__ */ jsx(Button, { size: "sm", variant: "outline", disabled: true, children: "View project" }),
      /* @__PURE__ */ jsxs(Button, { size: "sm", variant: "outline", onClick: openMessage, children: [
        /* @__PURE__ */ jsx(MessageSquare, { className: "h-4 w-4" }),
        "Message"
      ] }),
      /* @__PURE__ */ jsxs(Button, { size: "sm", variant: "outline", onClick: () => onCancel(request), disabled: pendingAction === `cancel-direct-hire-${request.contractId}`, children: [
        /* @__PURE__ */ jsx(XCircle, { className: "h-4 w-4" }),
        pendingAction === `cancel-direct-hire-${request.contractId}` ? "Cancelling" : "Cancel"
      ] })
    ] })
  ] });
}
function TrackedProjectCard({
  project,
  pendingAction,
  ratingDraft,
  onDraftChange,
  onRate,
  onCancel
}) {
  return /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-border p-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
      /* @__PURE__ */ jsx("img", { src: project.professionalAvatarUrl || `https://i.pravatar.cc/100?u=running-project-${project.professionalId}`, alt: project.professionalName, className: "h-11 w-11 rounded-lg object-cover" }),
      /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-semibold", children: project.projectTitle }),
          /* @__PURE__ */ jsx(Badge, { variant: project.status === "COMPLETED" ? "default" : "secondary", children: project.status === "COMPLETED" ? "Completed" : "Running" }),
          /* @__PURE__ */ jsxs(Badge, { variant: "outline", children: [
            "Tracking ",
            formatEnum$4(project.status)
          ] })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
          "Professional: ",
          project.professionalName || "Professional"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-4 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2", children: [
      /* @__PURE__ */ jsx(InfoPill, { icon: DollarSign, label: "Bid", value: project.bidAmount ? `$${project.bidAmount.toLocaleString()}` : "Not set" }),
      /* @__PURE__ */ jsx(InfoPill, { icon: Clock, label: "Duration", value: project.duration || "Not set" }),
      /* @__PURE__ */ jsx(InfoPill, { icon: CalendarDays, label: "Accepted", value: formatDateTime$3(project.acceptedAt) }),
      /* @__PURE__ */ jsx(InfoPill, { icon: Briefcase, label: "Category", value: project.projectCategory })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-4 flex flex-wrap gap-2", children: [
      /* @__PURE__ */ jsx(Button, { size: "sm", asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "/project-track/$trackingId", params: {
        trackingId: String(project.id)
      }, children: "Track project" }) }),
      /* @__PURE__ */ jsx(Button, { size: "sm", variant: "outline", asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "/project-track/$trackingId", params: {
        trackingId: String(project.id)
      }, children: "View project" }) }),
      /* @__PURE__ */ jsxs(Button, { size: "sm", variant: "outline", onClick: () => {
        const search = new URLSearchParams({
          conversationId: `client-${project.clientId}-pro-${project.professionalId}`,
          toUserId: String(project.professionalId),
          name: project.professionalName || "Professional",
          avatar: project.professionalAvatarUrl || "",
          job: project.projectTitle,
          projectId: String(project.id),
          firstMessage: `Hi ${project.professionalName || "Professional"}, let's discuss the project: ${project.projectTitle}`
        });
        window.location.href = `/messages?${search.toString()}`;
      }, children: [
        /* @__PURE__ */ jsx(MessageSquare, { className: "h-4 w-4" }),
        "Message"
      ] }),
      project.status === "ACTIVE" && onCancel ? /* @__PURE__ */ jsxs(Button, { size: "sm", variant: "outline", onClick: onCancel, disabled: pendingAction === `cancel-tracked-${project.id}`, children: [
        /* @__PURE__ */ jsx(XCircle, { className: "h-4 w-4" }),
        pendingAction === `cancel-tracked-${project.id}` ? "Cancelling" : "Cancel"
      ] }) : null
    ] }),
    project.status === "COMPLETED" ? /* @__PURE__ */ jsx(RateProfessionalBox, { project, draft: ratingDraft, isSaving: pendingAction === `rate-${project.id}`, onDraftChange, onSave: onRate }) : null
  ] });
}
function DirectHireCard({
  request,
  pendingAction,
  onStartProject,
  onDeleteRejected
}) {
  const statusLabel = request.status === "accepted" ? "Accepted" : request.status === "rejected" ? "Rejected" : "Waiting";
  const openDirectHireMessage = () => {
    const professionalName = request.professionalName || "Professional";
    const search = new URLSearchParams({
      conversationId: `client-${request.clientId}-pro-${request.professionalId}`,
      toUserId: String(request.professionalId),
      name: professionalName,
      avatar: request.professionalAvatarUrl || "",
      job: request.title,
      firstMessage: `Hi ${professionalName}, I want to discuss the hire request for "${request.title}".`
    });
    window.location.href = `/messages?${search.toString()}`;
  };
  return /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-border p-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
      /* @__PURE__ */ jsx("img", { src: request.professionalAvatarUrl || `https://i.pravatar.cc/100?u=direct-hire-${request.professionalId}`, alt: request.professionalName || "Professional", className: "h-11 w-11 rounded-lg object-cover" }),
      /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-semibold", children: request.title }),
          /* @__PURE__ */ jsx(Badge, { variant: request.status === "accepted" ? "default" : request.status === "rejected" ? "destructive" : "outline", children: statusLabel })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
          "Professional: ",
          request.professionalName || "Professional"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-4 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2", children: [
      /* @__PURE__ */ jsx(InfoPill, { icon: DollarSign, label: "Budget", value: formatMoney$2(request.totalAmount ?? request.budgetMax ?? request.budgetMin ?? 0) }),
      /* @__PURE__ */ jsx(InfoPill, { icon: Briefcase, label: "Work mode", value: formatEnum$4(request.workMode || "both") }),
      /* @__PURE__ */ jsx(InfoPill, { icon: CalendarDays, label: "Sent", value: formatDateTime$3(request.createdAt) }),
      /* @__PURE__ */ jsx(InfoPill, { icon: MapPin, label: "Location", value: request.location || "Not set" })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "mt-3 line-clamp-3 text-sm text-muted-foreground", children: request.description || "No work description added." }),
    request.status === "rejected" ? /* @__PURE__ */ jsx("p", { className: "mt-3 rounded-lg border border-destructive/20 bg-destructive/5 px-3 py-2 text-sm text-destructive", children: "Direct hire rejected. It will be removed after 1 minute." }) : null,
    /* @__PURE__ */ jsxs("div", { className: "mt-4 flex flex-wrap gap-2", children: [
      request.status === "accepted" ? /* @__PURE__ */ jsxs(Button, { size: "sm", onClick: () => onStartProject(request), disabled: pendingAction === `start-direct-hire-${request.contractId}`, children: [
        /* @__PURE__ */ jsx(Handshake, { className: "h-4 w-4" }),
        pendingAction === `start-direct-hire-${request.contractId}` ? "Starting" : "Start project"
      ] }) : null,
      /* @__PURE__ */ jsxs(Button, { size: "sm", variant: "outline", onClick: openDirectHireMessage, children: [
        /* @__PURE__ */ jsx(MessageSquare, { className: "h-4 w-4" }),
        "Message"
      ] }),
      request.status === "rejected" ? /* @__PURE__ */ jsxs(Button, { size: "sm", variant: "outline", onClick: () => onDeleteRejected(request), disabled: pendingAction === `delete-rejected-direct-hire-${request.contractId}`, children: [
        /* @__PURE__ */ jsx(XCircle, { className: "h-4 w-4" }),
        pendingAction === `delete-rejected-direct-hire-${request.contractId}` ? "Deleting" : "Delete immediately"
      ] }) : null
    ] })
  ] });
}
function ProjectRequestCard({
  request,
  negotiations,
  pendingAction,
  isTimelineOpen,
  onToggleTimeline,
  onRequestStatus
}) {
  const attachments = getRequestAttachments$1(request.attachmentsJson);
  const latestNegotiation = negotiations.at(-1) ?? null;
  return /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-border p-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
      /* @__PURE__ */ jsx("img", { src: request.professionalAvatarUrl || `https://i.pravatar.cc/100?u=project-request-${request.professionalId}`, alt: request.professionalName, className: "h-11 w-11 rounded-lg object-cover" }),
      /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-semibold", children: request.professionalName || "Professional" }),
          /* @__PURE__ */ jsx(Badge, { variant: "outline", children: formatEnum$4(request.status) })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
          request.professionalCategory || "Professional",
          " requested ",
          request.projectTitle
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-4 rounded-lg border border-border bg-muted/30 p-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
        /* @__PURE__ */ jsx(Badge, { variant: "secondary", children: request.projectCategory }),
        request.trackingStatus ? /* @__PURE__ */ jsxs(Badge, { variant: "outline", children: [
          "Tracking ",
          formatEnum$4(request.trackingStatus)
        ] }) : null,
        negotiations.length ? /* @__PURE__ */ jsxs(Badge, { variant: "outline", children: [
          negotiations.length,
          " negotiation offer",
          negotiations.length === 1 ? "" : "s"
        ] }) : null
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-3 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2", children: [
        request.bidAmount ? /* @__PURE__ */ jsx(InfoPill, { icon: DollarSign, label: "Bid", value: `$${request.bidAmount.toLocaleString()}` }) : null,
        request.duration ? /* @__PURE__ */ jsx(InfoPill, { icon: Clock, label: "Duration", value: request.duration }) : null,
        /* @__PURE__ */ jsx(InfoPill, { icon: Briefcase, label: "Project", value: request.projectTitle }),
        /* @__PURE__ */ jsx(InfoPill, { icon: CalendarDays, label: "Sent", value: formatDateTime$3(request.createdAt) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "mt-3 line-clamp-3 text-sm text-muted-foreground", children: request.coverLetter }),
    attachments.length ? /* @__PURE__ */ jsxs("div", { className: "mt-3 rounded-lg bg-muted p-3 text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsx(FileText, { className: "mr-1 inline h-3 w-3" }),
      attachments.length,
      " work sample",
      attachments.length === 1 ? "" : "s",
      " attached"
    ] }) : null,
    /* @__PURE__ */ jsxs("div", { className: "mt-4 flex flex-wrap gap-2", children: [
      /* @__PURE__ */ jsxs(Button, { size: "sm", variant: isTimelineOpen ? "default" : "outline", onClick: onToggleTimeline, children: [
        /* @__PURE__ */ jsx(Clock, { className: "h-4 w-4" }),
        isTimelineOpen ? "Hide details" : latestNegotiation ? "Negotiation details" : "Timeline"
      ] }),
      /* @__PURE__ */ jsx(Button, { size: "sm", asChild: true, children: /* @__PURE__ */ jsx(Link, { to: request.trackingId ? "/project-track/$trackingId" : "/project/$projectId", params: request.trackingId ? {
        trackingId: String(request.trackingId)
      } : {
        projectId: String(request.jobId)
      }, children: "View project" }) }),
      request.status === "PENDING" ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs(Button, { size: "sm", onClick: () => onRequestStatus(request.id, "ACCEPTED"), disabled: pendingAction !== null, children: [
          /* @__PURE__ */ jsx(CheckCircle2, { className: "h-4 w-4" }),
          pendingAction === `${request.id}-ACCEPTED` ? "Accepting" : "Accept"
        ] }),
        /* @__PURE__ */ jsxs(Button, { size: "sm", variant: "outline", onClick: () => onRequestStatus(request.id, "DECLINED"), disabled: pendingAction !== null, children: [
          /* @__PURE__ */ jsx(XCircle, { className: "h-4 w-4" }),
          pendingAction === `${request.id}-DECLINED` ? "Rejecting" : "Reject"
        ] })
      ] }) : null,
      request.status === "ACCEPTED" ? /* @__PURE__ */ jsx(Button, { size: "sm", variant: "outline", asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "/project-track/$trackingId", params: {
        trackingId: String(request.trackingId || request.jobId)
      }, children: "Track project" }) }) : null,
      /* @__PURE__ */ jsxs(Button, { size: "sm", variant: "outline", onClick: () => {
        const search = new URLSearchParams({
          conversationId: `client-${request.clientId}-pro-${request.professionalId}`,
          toUserId: String(request.professionalId),
          name: request.professionalName || "Professional",
          avatar: request.professionalAvatarUrl || "",
          job: request.projectTitle,
          projectId: String(request.jobId),
          firstMessage: `Hi ${request.professionalName || "Professional"}, let's discuss the project: ${request.projectTitle}`
        });
        window.location.href = `/messages?${search.toString()}`;
      }, children: [
        /* @__PURE__ */ jsx(MessageSquare, { className: "h-4 w-4" }),
        "Message"
      ] })
    ] }),
    isTimelineOpen ? /* @__PURE__ */ jsx(ProjectRequestTimeline, { status: request.status, createdAt: request.createdAt, updatedAt: request.updatedAt, acceptedAt: request.acceptedAt, trackingId: request.trackingId, trackingStatus: request.trackingStatus, projectTitle: request.projectTitle, projectCategory: request.projectCategory, professionalName: request.professionalName || "Professional", bidAmount: request.bidAmount, duration: request.duration, coverLetter: request.coverLetter, attachmentsJson: request.attachmentsJson, negotiations }) : null
  ] });
}
function EmptyProjectBox({
  icon: Icon,
  title,
  description
}) {
  return /* @__PURE__ */ jsxs("div", { className: "mt-5 rounded-lg border border-dashed border-border bg-muted/30 p-6 text-center", children: [
    /* @__PURE__ */ jsx(Icon, { className: "mx-auto h-8 w-8 text-muted-foreground" }),
    /* @__PURE__ */ jsx("h3", { className: "mt-3 font-semibold", children: title }),
    /* @__PURE__ */ jsx("p", { className: "mx-auto mt-1 max-w-xs text-sm text-muted-foreground", children: description })
  ] });
}
function ProjectRequestTimeline({
  status,
  createdAt,
  updatedAt,
  acceptedAt,
  trackingId,
  trackingStatus,
  projectTitle,
  projectCategory,
  professionalName,
  bidAmount,
  duration,
  coverLetter,
  attachmentsJson,
  negotiations
}) {
  const attachments = getRequestAttachments$1(attachmentsJson);
  const latestNegotiation = negotiations.at(-1) ?? null;
  const timelineItems = [{
    label: "Request sent",
    description: "Professional sent a project request.",
    time: formatDateTime$3(createdAt),
    state: "complete",
    icon: Send
  }, {
    label: status === "DECLINED" ? "Request rejected" : status === "ACCEPTED" ? "Request accepted" : "Waiting for response",
    description: status === "PENDING" ? "Review the bid, cover note, duration, and files before accepting." : status === "ACCEPTED" ? "Client accepted the request and project tracking started." : "Client rejected the request.",
    time: status === "PENDING" ? "Pending" : formatDateTime$3(status === "ACCEPTED" ? acceptedAt || updatedAt : updatedAt),
    state: status === "PENDING" ? "current" : status === "ACCEPTED" ? "complete" : "declined",
    icon: status === "DECLINED" ? XCircle : CheckCircle2
  }, {
    label: "Track project",
    description: trackingId ? "Project info, time, money, and next steps are available." : "Tracking appears after accepting the request.",
    time: trackingId ? `Tracking #${trackingId}` : "Not started",
    state: trackingId ? "complete" : "upcoming",
    icon: Clock
  }, {
    label: "Message updates",
    description: "Continue conversations and delivery updates in messages.",
    time: "Any time",
    state: trackingId ? "current" : "upcoming",
    icon: MessageSquare
  }];
  return /* @__PURE__ */ jsxs("div", { className: "mt-4 rounded-lg border border-border p-4", children: [
    !latestNegotiation ? /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-between gap-3 sm:flex-row sm:items-start", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h4", { className: "font-medium", children: "Project timeline" }),
          /* @__PURE__ */ jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
            "Full request history and project details for ",
            projectTitle,
            "."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2", children: [
          /* @__PURE__ */ jsx(Badge, { variant: status === "PENDING" ? "secondary" : status === "ACCEPTED" ? "default" : "outline", children: formatEnum$4(status) }),
          trackingStatus ? /* @__PURE__ */ jsxs(Badge, { variant: "outline", children: [
            "Tracking ",
            formatEnum$4(trackingStatus)
          ] }) : null
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4 grid gap-3 rounded-lg bg-muted/30 p-3 text-sm text-muted-foreground sm:grid-cols-2", children: [
        /* @__PURE__ */ jsx(InfoPill, { icon: Briefcase, label: "Project", value: projectTitle }),
        /* @__PURE__ */ jsx(InfoPill, { icon: FileText, label: "Category", value: projectCategory }),
        bidAmount ? /* @__PURE__ */ jsx(InfoPill, { icon: DollarSign, label: "Bid", value: `$${bidAmount.toLocaleString()}` }) : null,
        duration ? /* @__PURE__ */ jsx(InfoPill, { icon: Clock, label: "Duration", value: duration }) : null,
        /* @__PURE__ */ jsx(InfoPill, { icon: MessageSquare, label: "Professional", value: professionalName }),
        /* @__PURE__ */ jsx(InfoPill, { icon: CalendarDays, label: "Last update", value: formatDateTime$3(updatedAt) })
      ] })
    ] }) : null,
    latestNegotiation ? /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-primary/20 bg-primary/5 p-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-between gap-2 sm:flex-row sm:items-start", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h5", { className: "text-sm font-semibold", children: "Negotiation details" }),
          /* @__PURE__ */ jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
            professionalName,
            " revised the offer on",
            " ",
            formatDateTime$3(latestNegotiation.createdAt),
            "."
          ] })
        ] }),
        /* @__PURE__ */ jsx(Badge, { variant: "secondary", children: "Latest offer" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-3", children: /* @__PURE__ */ jsx(OfferCompareBox, { title: "Professional offer", bidAmount: latestNegotiation.bidAmount, duration: latestNegotiation.duration, message: latestNegotiation.message, highlight: true }) }),
      negotiations.length > 1 ? /* @__PURE__ */ jsxs("div", { className: "mt-3 rounded-lg border border-border bg-card/70 p-3", children: [
        /* @__PURE__ */ jsx("h6", { className: "text-sm font-medium", children: "Offer history" }),
        /* @__PURE__ */ jsx("div", { className: "mt-2 space-y-2", children: negotiations.map((negotiation) => /* @__PURE__ */ jsxs("div", { className: "rounded-md bg-muted/40 p-2 text-sm", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap justify-between gap-2 font-medium", children: [
            /* @__PURE__ */ jsx("span", { children: formatOfferSummary(negotiation) }),
            /* @__PURE__ */ jsx("span", { className: "text-xs font-normal text-muted-foreground", children: formatDateTime$3(negotiation.createdAt) })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 whitespace-pre-wrap break-words text-muted-foreground", children: negotiation.message })
        ] }, negotiation.id)) })
      ] }) : null
    ] }) : null,
    !latestNegotiation ? /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("ol", { className: "mt-4 space-y-4", children: timelineItems.map((item, index) => /* @__PURE__ */ jsxs("li", { className: "relative flex gap-3", children: [
        index < timelineItems.length - 1 ? /* @__PURE__ */ jsx("span", { className: "absolute left-4 top-8 h-[calc(100%+0.25rem)] w-px bg-border" }) : null,
        /* @__PURE__ */ jsx("span", { className: `relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full border ${item.state === "complete" ? "border-primary bg-primary text-primary-foreground" : item.state === "declined" ? "border-destructive bg-destructive text-destructive-foreground" : item.state === "current" ? "border-primary bg-card text-primary" : "border-border bg-card text-muted-foreground"}`, children: /* @__PURE__ */ jsx(item.icon, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2", children: [
            /* @__PURE__ */ jsx("p", { className: "font-medium", children: item.label }),
            /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: item.time })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: item.description })
        ] })
      ] }, item.label)) }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4 rounded-lg border border-border p-3", children: [
        /* @__PURE__ */ jsx("h5", { className: "text-sm font-medium", children: "Request note" }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 whitespace-pre-wrap break-words text-sm leading-relaxed text-muted-foreground", children: coverLetter })
      ] })
    ] }) : null,
    attachments.length ? /* @__PURE__ */ jsxs("div", { className: "mt-3 rounded-lg border border-border p-3", children: [
      /* @__PURE__ */ jsx("h5", { className: "text-sm font-medium", children: "Attached files" }),
      /* @__PURE__ */ jsx("div", { className: "mt-2 grid gap-2 sm:grid-cols-2", children: attachments.map((attachment) => /* @__PURE__ */ jsxs("div", { className: "flex min-w-0 items-center gap-2 rounded-md bg-muted/40 p-2 text-sm text-muted-foreground", children: [
        /* @__PURE__ */ jsx(FileText, { className: "h-4 w-4 shrink-0" }),
        /* @__PURE__ */ jsx("span", { className: "truncate", children: attachment.fileName })
      ] }, attachment.fileName)) })
    ] }) : null
  ] });
}
function OfferCompareBox({
  title,
  bidAmount,
  priceLabel,
  duration,
  message,
  highlight = false
}) {
  const hasBid = bidAmount != null && bidAmount > 0;
  const hasPriceLabel = Boolean(priceLabel?.trim() && priceLabel !== "Not set");
  const hasDuration = Boolean(duration?.trim());
  const hasMessage = Boolean(message?.trim());
  return /* @__PURE__ */ jsxs("div", { className: `rounded-lg border p-3 ${highlight ? "border-primary/30 bg-card" : "border-border bg-muted/30"}`, children: [
    /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", children: title }),
    hasBid || hasPriceLabel || hasDuration ? /* @__PURE__ */ jsxs("div", { className: "mt-2 grid gap-2 text-sm text-muted-foreground", children: [
      hasBid || hasPriceLabel ? /* @__PURE__ */ jsx(InfoPill, { icon: DollarSign, label: "Price", value: hasBid ? formatMoney$2(bidAmount) : priceLabel ?? "" }) : null,
      hasDuration ? /* @__PURE__ */ jsx(InfoPill, { icon: Clock, label: "Duration", value: duration ?? "" }) : null
    ] }) : null,
    hasMessage ? /* @__PURE__ */ jsx("p", { className: "mt-3 whitespace-pre-wrap break-words text-sm leading-relaxed text-muted-foreground", children: message }) : null
  ] });
}
function RateProfessionalBox({
  project,
  draft,
  isSaving,
  onDraftChange,
  onSave
}) {
  return /* @__PURE__ */ jsxs("div", { className: "mt-4 rounded-lg border border-border bg-muted/20 p-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-between gap-3 sm:flex-row sm:items-start", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "font-semibold", children: "Rate professional" }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: project.reviewRating ? `You rated ${project.professionalName || "this professional"} ${project.reviewRating}/5.` : project.reviewRequestedAt ? `${project.professionalName || "This professional"} requested a review for this completed project.` : `Share how ${project.professionalName || "this professional"} worked on this project.` })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2", children: [
        project.reviewRequestedAt && !project.reviewRating ? /* @__PURE__ */ jsx(Badge, { variant: "secondary", children: "Review requested" }) : null,
        project.reviewCreatedAt ? /* @__PURE__ */ jsxs(Badge, { variant: "outline", children: [
          "Rated ",
          formatDate$4(project.reviewCreatedAt)
        ] }) : null
      ] })
    ] }),
    project.reviewRequestedAt && !project.reviewRating ? /* @__PURE__ */ jsxs("p", { className: "mt-3 rounded-lg border border-warning/30 bg-warning/10 px-3 py-2 text-sm text-warning-foreground", children: [
      "Requested ",
      formatDate$4(project.reviewRequestedAt),
      project.reviewRequestNote ? `: ${project.reviewRequestNote}` : "."
    ] }) : null,
    /* @__PURE__ */ jsx("div", { className: "mt-4 flex flex-wrap gap-1", children: [1, 2, 3, 4, 5].map((value) => /* @__PURE__ */ jsx("button", { type: "button", onClick: () => onDraftChange({
      ...draft,
      rating: value
    }), className: `grid h-9 w-9 place-items-center rounded-lg border transition-colors ${value <= draft.rating ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground hover:border-primary"}`, "aria-label": `Rate ${value} star${value === 1 ? "" : "s"}`, children: /* @__PURE__ */ jsx(Star, { className: "h-4 w-4" }) }, value)) }),
    /* @__PURE__ */ jsx("textarea", { value: draft.comment, onChange: (event) => onDraftChange({
      ...draft,
      comment: event.target.value
    }), placeholder: "Write a short review", className: "mt-3 min-h-20 w-full resize-y rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" }),
    /* @__PURE__ */ jsx("div", { className: "mt-3 flex justify-end", children: /* @__PURE__ */ jsxs(Button, { size: "sm", onClick: onSave, disabled: isSaving, children: [
      /* @__PURE__ */ jsx(Star, { className: "h-4 w-4" }),
      isSaving ? "Saving" : project.reviewRating ? "Update rating" : "Submit rating"
    ] }) })
  ] });
}
function InfoPill({
  icon: Icon,
  label,
  value
}) {
  return /* @__PURE__ */ jsxs("span", { className: "flex min-w-0 items-center gap-2", children: [
    /* @__PURE__ */ jsx(Icon, { className: "h-4 w-4 shrink-0" }),
    /* @__PURE__ */ jsxs("span", { className: "min-w-0 truncate", children: [
      /* @__PURE__ */ jsxs("span", { className: "text-foreground", children: [
        label,
        ":"
      ] }),
      " ",
      value
    ] })
  ] });
}
function ProjectStat({
  label,
  value,
  icon: Icon,
  isActive = false,
  onClick
}) {
  return /* @__PURE__ */ jsxs("button", { type: "button", onClick, "aria-pressed": isActive, className: `rounded-xl border p-5 text-left shadow-soft transition-colors hover:border-primary/50 hover:bg-primary/5 ${isActive ? "border-primary bg-primary/10" : "border-border bg-card"}`, children: [
    /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5 text-primary" }),
    /* @__PURE__ */ jsx("p", { className: "mt-4 text-2xl font-semibold", children: value }),
    /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
      label,
      " projects"
    ] })
  ] });
}
function getProjectBucketLabel(filter) {
  switch (filter) {
    case "running":
      return "Running projects";
    case "completed":
      return "Completed projects";
    case "requests":
      return "Request projects";
    case "direct-hires":
      return "Direct hire projects";
  }
}
function formatEnum$4(value) {
  return value.toLowerCase().split("_").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
}
function formatWorkMode$1(value) {
  return value === "ON_SITE" ? "On-site" : formatEnum$4(value);
}
function formatDate$4(value) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(value));
}
function formatDateTime$3(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Not set";
  }
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit"
  }).format(date);
}
function formatBudget$3(min, max, timingType = "FIXED") {
  const suffix = getBudgetSuffix$3(timingType);
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
function getBudgetSuffix$3(timingType) {
  if (timingType === "HOURLY") {
    return " / hour";
  }
  if (timingType === "WEEKLY") {
    return " / week";
  }
  return "";
}
function formatMoney$2(value) {
  if (!value) {
    return "Not set";
  }
  return `$${value.toLocaleString()}`;
}
function formatOfferSummary(negotiation) {
  const parts = [negotiation.bidAmount ? formatMoney$2(negotiation.bidAmount) : null, negotiation.duration?.trim() || null].filter(Boolean);
  return parts.length ? parts.join(" / ") : "Offer updated";
}
const CLOSED_PROJECT_REMOVAL_MS = 60 * 60 * 1e3;
function getClosedProjectRemovalMs(project, now) {
  if (project.status !== "CLOSED") {
    return null;
  }
  const closedAt = new Date(project.updatedAt).getTime();
  if (Number.isNaN(closedAt)) {
    return CLOSED_PROJECT_REMOVAL_MS;
  }
  return Math.max(0, closedAt + CLOSED_PROJECT_REMOVAL_MS - now);
}
function isClosedProjectExpired(project, now) {
  const removeInMs = getClosedProjectRemovalMs(project, now);
  return removeInMs != null && removeInMs <= 0;
}
function isExpiredRejectedHireRequest$1(request, now) {
  if (request.status !== "rejected") {
    return false;
  }
  const rejectedAt = new Date(request.updatedAt || request.createdAt).getTime();
  if (Number.isNaN(rejectedAt)) {
    return false;
  }
  return now - rejectedAt >= 60 * 1e3;
}
function formatCountdown(value) {
  const totalSeconds = Math.max(0, Math.ceil(value / 1e3));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}m ${String(seconds).padStart(2, "0")}s`;
}
function getRequestAttachments$1(value) {
  if (!value) {
    return [];
  }
  try {
    const parsed = JSON.parse(value);
    return parsed.filter((attachment) => attachment.fileName);
  } catch {
    return [];
  }
}
async function emitProjectNotification$1(payload) {
  try {
    const socket = io(getSocketUrl$3());
    socket.emit("project:activity", payload);
    window.setTimeout(() => socket.disconnect(), 800);
  } catch {
  }
}
function getSocketUrl$3() {
  return `${window.location.protocol}//${window.location.hostname}:4001`;
}
const Route$n = Route$o;
const $$splitComponentImporter$8 = () => import("./reports-XaJYdABp.js");
const getReportsData = createServerFn({
  method: "GET"
}).handler(createSsrRpc("900bb128350f2296e0f61f02a79dc7299cd447591d80524ec1c748722fb00a47"));
const Route$m = createFileRoute("/reports")({
  loader: () => getReportsData(),
  head: () => ({
    meta: [{
      title: "Reports - Servio"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./services-C0bSsumV.js");
const loadServicesData = createServerFn({
  method: "GET"
}).handler(createSsrRpc("6f7c48b478f865c6aa2d7de1ee4ba1c033ec49a13573320a947be5889b3768fb"));
const Route$l = createFileRoute("/services")({
  head: () => ({
    meta: [{
      title: "Services - Browse all categories | Servio"
    }, {
      name: "description",
      content: "From plumbing to web design, explore every category of service offered by vetted pros on Servio."
    }]
  }),
  loader: () => loadServicesData(),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./signup-Bo1_iwAP.js");
const Route$k = createFileRoute("/signup")({
  head: () => ({
    meta: [{
      title: "Sign up — Servio"
    }, {
      name: "description",
      content: "Create your Servio account with full validation."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./terms-and-conditions-DBKJtyqs.js");
const loadTermsPage = createServerFn({
  method: "GET"
}).handler(createSsrRpc("eea242dfecf25c3556aa69c07e2ff6fabb7fe636a68e719cc719b9a73f9007c0"));
const Route$j = createFileRoute("/terms-and-conditions")({
  loader: () => loadTermsPage(),
  head: () => ({
    meta: [{
      title: "Terms & Conditions - Servio"
    }, {
      name: "description",
      content: "Read the terms and conditions for using Servio."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./user-management-BgaMNWK1.js");
const getUserManagementData = createServerFn({
  method: "GET"
}).handler(createSsrRpc("f6c254b7f87f34d97319eb6d48703259e6914e716729c3c2f428b5e1e8081982"));
const Route$i = createFileRoute("/user-management")({
  loader: () => getUserManagementData(),
  head: () => ({
    meta: [{
      title: "User Management - Servio"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const Route$h = createFileRoute("/verification")({
  head: () => ({
    meta: [{
      title: "Verification - Servio"
    }, {
      name: "description",
      content: "Upload your documents to get verified and earn the trust badge."
    }]
  }),
  beforeLoad: async ({
    location
  }) => {
    const data = await getVerificationPage();
    if (!data?.viewer || data.viewer.role !== "PROFESSIONAL") {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href
        }
      });
    }
  },
  loader: async () => {
    const data = await getVerificationPage();
    if (!data?.viewer || data.viewer.role !== "PROFESSIONAL") {
      throw redirect({
        to: "/login"
      });
    }
    return data;
  },
  component: Verification
});
const documentOptions = [{
  key: "governmentIdUrl",
  title: "Government ID",
  desc: "Passport, Aadhaar, voter ID, driver's license, or national ID.",
  icon: IdCard,
  accept: "image/*,.pdf"
}, {
  key: "licenseUrl",
  title: "Trade License",
  desc: "Required for licensed services such as plumbing, electrical, HVAC, or similar work.",
  icon: FileBadge,
  accept: "image/*,.pdf"
}, {
  key: "certifications",
  title: "Certifications",
  desc: "Training certificates, awards, or professional qualification proof.",
  icon: FileText,
  accept: "image/*,.pdf"
}, {
  key: "insuranceUrl",
  title: "Insurance",
  desc: "Liability, business, or service insurance document.",
  icon: Shield,
  accept: "image/*,.pdf"
}, {
  key: "selfieUrl",
  title: "Selfie verification",
  desc: "A clear selfie to help confirm the profile owner.",
  icon: Camera,
  accept: "image/*"
}];
const getVerificationPage = createServerFn({
  method: "GET"
}).handler(createSsrRpc("38e4caa85870d2b011787db77ba991ad42b78eece051c99b92d28accc79e7e34"));
const saveVerificationDocument = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(createSsrRpc("221f7999531e9ffd902d29b3f85e75eda20ade33378579e143f61defc4e53495"));
function Verification() {
  const {
    viewer,
    verification
  } = useLoaderData({
    from: "/verification"
  });
  const router2 = useRouter();
  const [savingKey, setSavingKey] = useState(null);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const status = getStatusMeta(verification.status);
  const completedCount = getCompletedCount(verification);
  const percent = Math.round(completedCount / documentOptions.length * 100);
  const docs = useMemo(() => documentOptions.map((document2) => ({
    ...document2,
    uploaded: Boolean(getDocumentValue(verification, document2.key))
  })), [verification]);
  const uploadDocument = async (key, file) => {
    if (!file) {
      return;
    }
    setSavingKey(key);
    setMessage(null);
    setError(null);
    try {
      const result = await saveVerificationDocument({
        data: {
          key,
          value: await readFileAsDataUrl(file)
        }
      });
      if (!result.ok) {
        setError(result.formError);
        return;
      }
      setMessage("Document saved to verification database.");
      await router2.invalidate();
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Could not save document.");
    } finally {
      setSavingKey(null);
    }
  };
  return /* @__PURE__ */ jsxs(AppShell, { title: "Verification", userName: `${viewer.firstName} ${viewer.lastName}`.trim(), userAvatarUrl: viewer.avatarUrl, children: [
    /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-border bg-gradient-to-br from-primary/5 via-card to-success/5 p-6 shadow-soft", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-4", children: [
        /* @__PURE__ */ jsx("div", { className: "grid h-14 w-14 place-items-center rounded-2xl bg-success text-success-foreground shadow-soft", children: /* @__PURE__ */ jsx(BadgeCheck, { className: "h-7 w-7" }) }),
        /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
            /* @__PURE__ */ jsxs("h2", { className: "font-display text-xl font-bold", children: [
              percent,
              "% verified"
            ] }),
            /* @__PURE__ */ jsxs("span", { className: `inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${status.color}`, children: [
              /* @__PURE__ */ jsx(status.icon, { className: "h-3.5 w-3.5" }),
              status.label
            ] })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
            completedCount,
            " of ",
            documentOptions.length,
            " verification items saved in the database."
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-3 h-2 w-full max-w-md overflow-hidden rounded-full bg-muted", children: /* @__PURE__ */ jsx("div", { className: "h-full rounded-full bg-success transition-all", style: {
            width: `${percent}%`
          } }) })
        ] })
      ] }),
      message ? /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm font-medium text-primary", children: message }) : null,
      error ? /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm font-medium text-destructive", children: error }) : null
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-6 grid gap-5 md:grid-cols-2", children: docs.map((document2) => {
      const Icon = document2.icon;
      const isSaving = savingKey === document2.key;
      return /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-border bg-card p-5 shadow-soft", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
          /* @__PURE__ */ jsx("div", { className: "grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary", children: /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5" }) }),
          /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2", children: [
              /* @__PURE__ */ jsx("h3", { className: "font-display text-base font-semibold", children: document2.title }),
              /* @__PURE__ */ jsx(DocumentBadge, { uploaded: document2.uploaded })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: document2.desc })
          ] })
        ] }),
        document2.uploaded ? /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center justify-between gap-3 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm", children: [
          /* @__PURE__ */ jsxs("span", { className: "truncate font-medium", children: [
            document2.title,
            " saved"
          ] }),
          /* @__PURE__ */ jsxs("label", { className: "cursor-pointer", children: [
            /* @__PURE__ */ jsx("span", { className: "inline-flex h-9 items-center rounded-md px-3 text-sm font-medium hover:bg-muted", children: isSaving ? "Saving..." : "Replace" }),
            /* @__PURE__ */ jsx("input", { type: "file", accept: document2.accept, className: "sr-only", disabled: isSaving, onChange: (event) => uploadDocument(document2.key, event.target.files?.[0]) })
          ] })
        ] }) : /* @__PURE__ */ jsxs("label", { className: "mt-4 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border p-6 text-center hover:bg-muted/40", children: [
          document2.key === "selfieUrl" ? /* @__PURE__ */ jsx(ImagePlus, { className: "h-5 w-5 text-muted-foreground" }) : /* @__PURE__ */ jsx(Upload, { className: "h-5 w-5 text-muted-foreground" }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs text-muted-foreground", children: isSaving ? "Saving to database..." : "Click to upload" }),
          /* @__PURE__ */ jsx("span", { className: "mt-3 inline-flex h-9 items-center rounded-md bg-cta px-3 text-sm font-medium text-cta-foreground hover:bg-cta/90", children: isSaving ? "Saving..." : "Upload file" }),
          /* @__PURE__ */ jsx("input", { type: "file", accept: document2.accept, className: "sr-only", disabled: isSaving, onChange: (event) => uploadDocument(document2.key, event.target.files?.[0]) })
        ] })
      ] }, document2.key);
    }) })
  ] });
}
function DocumentBadge({
  uploaded
}) {
  if (uploaded) {
    return /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary", children: [
      /* @__PURE__ */ jsx(FileCheck2, { className: "h-3 w-3" }),
      "Uploaded"
    ] });
  }
  return /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 rounded-full bg-warning/15 px-2.5 py-0.5 text-xs font-semibold text-warning-foreground", children: [
    /* @__PURE__ */ jsx(Upload, { className: "h-3 w-3" }),
    "Needed"
  ] });
}
function getStatusMeta(status) {
  if (status === "approved") {
    return {
      label: "Approved",
      color: "bg-success/10 text-success",
      icon: FileCheck2
    };
  }
  if (status === "pending") {
    return {
      label: "Reviewing",
      color: "bg-primary/10 text-primary",
      icon: Clock
    };
  }
  if (status === "rejected") {
    return {
      label: "Needs changes",
      color: "bg-destructive/10 text-destructive",
      icon: AlertCircle
    };
  }
  return {
    label: "Not started",
    color: "bg-warning/15 text-warning-foreground",
    icon: Upload
  };
}
function getDocumentValue(verification, key) {
  if (key === "certifications") {
    return verification.certifications[0] || "";
  }
  return verification[key];
}
function getCompletedCount(verification) {
  return documentOptions.filter((document2) => Boolean(getDocumentValue(verification, document2.key))).length;
}
function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("Could not read the selected file."));
    reader.readAsDataURL(file);
  });
}
const Route$g = Route$h;
const $$splitComponentImporter$3 = () => import("./verification-management-CPWDb4g0.js");
const getVerificationManagementData = createServerFn({
  method: "GET"
}).handler(createSsrRpc("38e7ef89a0190d3ec419669020cd02b27ca22e5de02c1c2ccabcf2787f723cd2"));
const Route$f = createFileRoute("/verification-management")({
  loader: () => getVerificationManagementData(),
  head: () => ({
    meta: [{
      title: "Verification Management - Servio"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const Route$e = createFileRoute("/verify")({
  head: () => ({ meta: [{ title: "Verify your account — Servio" }] }),
  component: Verify
});
function Verify() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const refs = useRef([]);
  const set = (i, v) => {
    const next = [...code];
    next[i] = v.slice(-1);
    setCode(next);
    if (v && i < 5) refs.current[i + 1]?.focus();
  };
  return /* @__PURE__ */ jsxs(
    AuthLayout,
    {
      title: "Verify your email",
      subtitle: "We sent a 6-digit code to jane@company.com. Enter it below to continue.",
      footer: /* @__PURE__ */ jsxs(Fragment, { children: [
        "Didn't get it? ",
        /* @__PURE__ */ jsx("button", { className: "text-primary hover:underline", children: "Resend code" })
      ] }),
      children: [
        /* @__PURE__ */ jsx("div", { className: "flex justify-between gap-2", children: code.map((c, i) => /* @__PURE__ */ jsx(
          "input",
          {
            ref: (el) => {
              refs.current[i] = el;
            },
            value: c,
            onChange: (e) => set(i, e.target.value),
            className: "h-14 w-12 rounded-xl border border-input bg-card text-center text-xl font-semibold outline-none focus:border-primary focus:ring-2 focus:ring-primary/20",
            inputMode: "numeric",
            maxLength: 1
          },
          i
        )) }),
        /* @__PURE__ */ jsx(Button, { asChild: true, className: "mt-6 w-full", children: /* @__PURE__ */ jsx(Link, { to: "/dashboard", children: "Verify and continue" }) })
      ]
    }
  );
}
const Route$d = Route$e;
const $$splitComponentImporter$2 = () => import("./web-editor-CsAuePbG.js");
const getWebEditorData = createServerFn({
  method: "GET"
}).handler(createSsrRpc("cafc9756e06bfb73d91de8bc1aa45992a234b001e43353d2d042974b8b7b3eb0"));
const Route$c = createFileRoute("/web-editor")({
  loader: () => getWebEditorData(),
  head: () => ({
    meta: [{
      title: "Web Editor - Servio"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./website-cms-DZE8B18e.js");
const loadWebsiteCmsData = createServerFn({
  method: "GET"
}).handler(createSsrRpc("aec19aa73a307cd432310028eaa0eed27043384ac6eee443f8aec6a9b8ecda9b"));
const Route$b = createFileRoute("/website-cms")({
  loader: () => loadWebsiteCmsData(),
  head: () => ({
    meta: [{
      title: "Website CMS - Servio Admin"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const getHireDetails = createServerFn({
  method: "GET"
}).inputValidator((id) => id).handler(createSsrRpc("1afaf94834e254922e7bf7305944676301838ba478bbbb901e1d474bfdc16e99"));
const saveHireContract = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(createSsrRpc("ea47e43a69ab6d6ce8d3ded0358d8dd4612882a9bd94cb62d0bafb38860338b6"));
const getHireAccess = createServerFn({
  method: "GET"
}).handler(createSsrRpc("49046d7c5730cbfe7bb34cd5d52f67bee14077c570bd1ff52fc6e218f54d687f"));
const Route$a = createFileRoute("/hire/$proId")({
  beforeLoad: async ({
    location
  }) => {
    try {
      await getHireAccess();
    } catch {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href
        }
      });
    }
  },
  loader: async ({
    params
  }) => {
    const result = await getHireDetails({
      data: params.proId
    });
    if (!result) {
      throw notFound();
    }
    return result;
  },
  head: () => ({
    meta: [{
      title: "Hire professional - Servio"
    }]
  }),
  component: HireProfessional,
  notFoundComponent: () => /* @__PURE__ */ jsx("div", { className: "p-10 text-center", children: "Professional not found." })
});
function HireProfessional() {
  const {
    viewer,
    profile: pro,
    projects
  } = useLoaderData({
    from: "/hire/$proId"
  });
  if (!viewer) {
    throw new Error("Authenticated client data is unavailable.");
  }
  const clientProjects = projects ?? [];
  const [selectedProjectId, setSelectedProjectId] = useState(clientProjects[0]?.id ?? null);
  const [workDescription, setWorkDescription] = useState("");
  const [submitError, setSubmitError2] = useState(null);
  const [successMessage, setSuccessMessage2] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isStartingMessage, setIsStartingMessage] = useState(false);
  const selectedProject = clientProjects.find((project) => project.id === selectedProjectId) ?? null;
  const displayName = viewer ? `${viewer.firstName} ${viewer.lastName}`.trim() : "Guest";
  const rateLabel = pro.hourlyRate != null ? `$${pro.hourlyRate}/hr` : "Contact for rate";
  const fixedLabel = pro.fixedRate != null ? `$${pro.fixedRate}` : "Flexible";
  const locationLabel = formatApproximateLocation(pro.professionalCity || pro.serviceArea || pro.address, "Location not provided");
  const ratingLabel = `${pro.averageRating.toFixed(1)} - ${pro.reviewCount} ${pro.reviewCount === 1 ? "review" : "reviews"}`;
  const availabilityLabel = formatAvailability(pro.availabilityStatus);
  const workModeLabel = pro.workMode === "remote" ? "Remote" : pro.workMode === "onsite" ? "On-site" : "Remote and on-site";
  const openSocketMessages = (firstMessage, job) => {
    if (!viewer) {
      throw new Error("Please log in as a client to message this professional.");
    }
    const search = new URLSearchParams({
      conversationId: buildConversationId$1(viewer.id, pro.id),
      toUserId: String(pro.id),
      name: pro.fullName,
      avatar: pro.avatarUrl || "",
      job,
      firstMessage
    });
    window.location.href = `/messages?${search.toString()}`;
  };
  const saveContract = async () => {
    if (!selectedProject) {
      setSubmitError2("Select a project before sending the hire request.");
      return;
    }
    const payload = {
      professionalId: pro.id,
      clientProjectId: selectedProject.id,
      hiringTeam: "Direct hire",
      contractTitle: selectedProject.title,
      workDescription: buildHireDescription(selectedProject, workDescription),
      jobDate: dateInputValue(selectedProject.jobDate),
      deadline: dateInputValue(selectedProject.deadline),
      workMode: toHireWorkMode(selectedProject.workMode),
      location: selectedProject.locationAddress || selectedProject.locationLabel || "",
      paymentOption: "fixed",
      hourlyRate: null,
      fixedPrice: selectedProject.budgetMax ?? selectedProject.budgetMin ?? pro.fixedRate ?? null,
      paymentSchedule: "whole",
      acceptedTerms: true,
      attachments: selectedProject.attachments.map((attachment) => ({
        fileName: attachment.fileName,
        fileType: attachment.fileType || "document",
        fileSize: attachment.fileSize ?? void 0,
        fileUrl: attachment.previewUrl || attachment.fileName
      })),
      milestones: []
    };
    setIsSaving(true);
    setSubmitError2(null);
    setSuccessMessage2(null);
    try {
      const result = await saveHireContract({
        data: payload
      });
      if (result.ok) {
        await emitDirectHireNotification({
          actorId: viewer.id,
          recipientId: pro.id,
          title: "New direct hire request",
          description: `${displayName || "A client"} sent a direct hire request for ${selectedProject.title}.`,
          href: "/professional-stats"
        });
        setSuccessMessage2("Hire request sent successfully. The professional will see it in My Stats and notifications.");
        window.setTimeout(() => {
          if (window.history.length > 1) {
            window.history.back();
            return;
          }
          window.location.href = `/pro/${pro.id}`;
        }, 900);
      }
    } catch (error) {
      setSubmitError2(error instanceof Error ? error.message : "Could not save contract. Please check the details.");
    } finally {
      setIsSaving(false);
    }
  };
  const messageBeforeHiring = async () => {
    setIsStartingMessage(true);
    setSubmitError2(null);
    setSuccessMessage2(null);
    try {
      openSocketMessages(`Hi ${pro.fullName}, I am interested in hiring you and would like to discuss the work details.`, "Direct hire discussion");
    } catch (error) {
      setSubmitError2(error instanceof Error ? error.message : "Could not open messages.");
    } finally {
      setIsStartingMessage(false);
    }
  };
  return /* @__PURE__ */ jsxs(AppShell, { userName: displayName, userRole: viewer?.role === "PROFESSIONAL" ? "Professional" : "Client", userAvatarUrl: viewer?.avatarUrl, children: [
    /* @__PURE__ */ jsx("div", { className: "mb-5", children: /* @__PURE__ */ jsx(Link, { to: "/pro/$proId", params: {
      proId: String(pro.id)
    }, className: "text-sm text-primary hover:underline", children: "Back to profile" }) }),
    /* @__PURE__ */ jsxs("div", { className: "overflow-hidden rounded-3xl border border-border bg-card shadow-soft", children: [
      /* @__PURE__ */ jsx("div", { className: "h-36 gradient-primary" }),
      /* @__PURE__ */ jsx("div", { className: "px-6 pb-6 sm:px-8", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-end gap-5", children: [
          /* @__PURE__ */ jsx("img", { src: pro.avatarUrl || "https://i.pravatar.cc/240?u=hire-professional", alt: pro.fullName, className: "-mt-12 h-24 w-24 rounded-2xl border-4 border-card object-cover shadow-elevated" }),
          /* @__PURE__ */ jsxs("div", { className: "pb-1", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
              /* @__PURE__ */ jsx("h1", { className: "text-2xl font-semibold tracking-tight", children: pro.fullName }),
              pro.isVerified ? /* @__PURE__ */ jsx(BadgeCheck, { className: "h-5 w-5 text-primary" }) : null
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: pro.professionalCategory || "Professional services" }),
            /* @__PURE__ */ jsxs("div", { className: "mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1 text-foreground", children: [
                /* @__PURE__ */ jsx(Star, { className: "h-3 w-3 fill-warning text-warning" }),
                ratingLabel
              ] }),
              /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsx(MapPin, { className: "h-3 w-3" }),
                locationLabel
              ] }),
              /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsx(Clock, { className: "h-3 w-3" }),
                availabilityLabel
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Button, { type: "button", className: "gap-2 sm:mb-2", onClick: messageBeforeHiring, disabled: isStartingMessage, children: [
          /* @__PURE__ */ jsx(MessageSquare, { className: "h-4 w-4" }),
          isStartingMessage ? "Opening..." : "Message before hiring"
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 grid gap-6 lg:grid-cols-[1fr_360px]", children: [
      /* @__PURE__ */ jsx("div", { className: "space-y-6", children: /* @__PURE__ */ jsxs("section", { className: "rounded-2xl border border-border bg-card p-6 shadow-soft", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold", children: "Posted projects" }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Select one of your posted jobs and add a short note for the professional." })
          ] }),
          /* @__PURE__ */ jsx(Badge, { variant: "secondary", children: "Direct hire" })
        ] }),
        clientProjects.length ? /* @__PURE__ */ jsx("div", { className: "mt-5 grid auto-rows-fr gap-4 xl:grid-cols-2", children: clientProjects.map((project) => /* @__PURE__ */ jsx(ProjectOptionCard, { project, checked: selectedProjectId === project.id, onSelect: () => {
          setSelectedProjectId(project.id);
          setSubmitError2(null);
          setSuccessMessage2(null);
        } }, project.id)) }) : /* @__PURE__ */ jsxs("div", { className: "mt-5 rounded-xl border border-dashed border-border bg-background p-8 text-center", children: [
          /* @__PURE__ */ jsx(BriefcaseBusiness, { className: "mx-auto h-8 w-8 text-muted-foreground" }),
          /* @__PURE__ */ jsx("h3", { className: "mt-3 font-semibold", children: "No projects yet" }),
          /* @__PURE__ */ jsx("p", { className: "mx-auto mt-1 max-w-md text-sm text-muted-foreground", children: "Create a project first, then send it as a direct hire request." }),
          /* @__PURE__ */ jsx(Button, { className: "mt-4", asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "/post-job", children: "Create project" }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-5", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "direct-hire-description", children: "Description" }),
          /* @__PURE__ */ jsx(Textarea, { id: "direct-hire-description", rows: 7, value: workDescription, onChange: (event) => {
            setWorkDescription(event.target.value);
            setSubmitError2(null);
            setSuccessMessage2(null);
          }, placeholder: "Add anything specific for this professional: schedule notes, access details, preferred outcome, or questions.", className: "mt-2" })
        ] }),
        submitError ? /* @__PURE__ */ jsx("div", { className: "mt-4 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive", children: submitError }) : null,
        successMessage ? /* @__PURE__ */ jsx("div", { className: "mt-4 rounded-xl border border-success/30 bg-success/5 px-4 py-3 text-sm text-success", children: successMessage }) : null
      ] }) }),
      /* @__PURE__ */ jsxs("aside", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("section", { className: "rounded-2xl border border-border bg-card p-6 shadow-soft", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold", children: "Professional details" }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 grid gap-3", children: [
            /* @__PURE__ */ jsx(InfoCard$1, { label: "Hourly money", value: rateLabel, icon: DollarSign }),
            /* @__PURE__ */ jsx(InfoCard$1, { label: "Fixed rate", value: fixedLabel, icon: DollarSign }),
            /* @__PURE__ */ jsx(InfoCard$1, { label: "Service area", value: formatApproximateLocation(pro.serviceArea, locationLabel), icon: MapPin }),
            /* @__PURE__ */ jsx(InfoCard$1, { label: "Work mode", value: workModeLabel, icon: BriefcaseBusiness }),
            /* @__PURE__ */ jsx(InfoCard$1, { label: "Availability", value: availabilityLabel, icon: CalendarDays }),
            /* @__PURE__ */ jsx(InfoCard$1, { label: "Service radius", value: pro.serviceRadiusKm ? `${pro.serviceRadiusKm} km` : "Not set", icon: MapPin })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-5 text-sm leading-relaxed text-muted-foreground", children: pro.companyDescription || "This professional has not added a full description yet." })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "rounded-2xl border border-border bg-card p-6 shadow-soft", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold", children: "Hire checklist" }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 space-y-3 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsx(ChecklistRow, { text: "Project selected" }),
            /* @__PURE__ */ jsx(ChecklistRow, { text: "Project budget and deadline included" }),
            /* @__PURE__ */ jsx(ChecklistRow, { text: "Description added for the professional" })
          ] }),
          /* @__PURE__ */ jsxs(Button, { type: "button", className: "mt-5 w-full gap-2", onClick: saveContract, disabled: isSaving || !clientProjects.length, children: [
            /* @__PURE__ */ jsx(ShieldCheck, { className: "h-4 w-4" }),
            isSaving ? "Sending..." : "Send hire request"
          ] })
        ] })
      ] })
    ] })
  ] });
}
function ProjectOptionCard({
  project,
  checked,
  onSelect
}) {
  return /* @__PURE__ */ jsxs("div", { className: `flex min-h-[260px] flex-col rounded-xl border bg-background p-5 text-left transition ${checked ? "border-primary bg-primary/5" : "border-border bg-background hover:border-primary/60"}`, children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2", children: [
          /* @__PURE__ */ jsx(Badge, { variant: "secondary", children: project.category }),
          /* @__PURE__ */ jsx(Badge, { variant: project.status === "OPEN" ? "default" : "outline", children: project.status === "OPEN" ? "Active" : formatEnum$3(project.status) }),
          checked ? /* @__PURE__ */ jsx(Badge, { variant: "outline", children: "Selected" }) : null
        ] }),
        /* @__PURE__ */ jsx("h3", { className: "mt-3 line-clamp-2 text-lg font-semibold", children: project.title }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground", children: project.description })
      ] }),
      /* @__PURE__ */ jsx(Button, { type: "button", variant: "ghost", size: "sm", asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "/project/$projectId", params: {
        projectId: String(project.id)
      }, children: "View" }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-5 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2", children: [
      /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsx(DollarSign, { className: "h-4 w-4 text-primary" }),
        formatBudget$2(project.budgetMin, project.budgetMax, project.timingType)
      ] }),
      /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsx(CalendarDays, { className: "h-4 w-4 text-primary" }),
        "Deadline ",
        formatDate$3(project.deadline)
      ] }),
      /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsx(BriefcaseBusiness, { className: "h-4 w-4 text-primary" }),
        formatEnum$3(project.workMode)
      ] }),
      /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsx(FileUp, { className: "h-4 w-4 text-primary" }),
        project.attachments.length,
        " files"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-auto flex items-center gap-2 border-t border-border pt-4 text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsx(MapPin, { className: "h-4 w-4 shrink-0 text-primary" }),
      /* @__PURE__ */ jsx("span", { className: "truncate", children: formatApproximateLocation(project.locationAddress || project.locationLabel, "Remote or no location saved") })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-4 flex flex-wrap gap-2", children: [
      /* @__PURE__ */ jsx(Button, { type: "button", size: "sm", onClick: onSelect, variant: checked ? "default" : "outline", children: checked ? "Selected project" : "Select project" }),
      /* @__PURE__ */ jsx(Button, { type: "button", size: "sm", variant: "outline", asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "/project/$projectId", params: {
        projectId: String(project.id)
      }, children: "View project" }) })
    ] })
  ] });
}
function InfoCard$1({
  label,
  value,
  icon: Icon
}) {
  return /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-border bg-background p-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground", children: [
      /* @__PURE__ */ jsx(Icon, { className: "h-3.5 w-3.5 text-primary" }),
      label
    ] }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 font-medium text-foreground", children: value })
  ] });
}
function ChecklistRow({
  text
}) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
    /* @__PURE__ */ jsx(ShieldCheck, { className: "h-4 w-4 text-primary" }),
    /* @__PURE__ */ jsx("span", { children: text })
  ] });
}
function buildConversationId$1(clientId, professionalId) {
  return `client-${clientId}-pro-${professionalId}`;
}
async function emitDirectHireNotification(payload) {
  try {
    const socket = io(getSocketUrl$2());
    socket.emit("project:activity", {
      trackingId: -1,
      ...payload
    });
    window.setTimeout(() => socket.disconnect(), 800);
  } catch {
  }
}
function getSocketUrl$2() {
  return `${window.location.protocol}//${window.location.hostname}:4001`;
}
function buildHireDescription(project, note) {
  const parts = [project.description, note.trim() ? `Client note: ${note.trim()}` : ""].filter(Boolean);
  return parts.join("\n\n");
}
function dateInputValue(value) {
  if (!value) {
    return "";
  }
  return value.slice(0, 10);
}
function toHireWorkMode(value) {
  if (value === "REMOTE") {
    return "remote";
  }
  if (value === "ON_SITE") {
    return "onsite";
  }
  return "both";
}
function formatBudget$2(min, max, timingType = "FIXED") {
  const suffix = getBudgetSuffix$2(timingType);
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
function getBudgetSuffix$2(timingType) {
  if (timingType === "HOURLY") {
    return " / hour";
  }
  if (timingType === "WEEKLY") {
    return " / week";
  }
  return "";
}
function formatDate$3(value) {
  if (!value) {
    return "Not set";
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Not set";
  }
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(date);
}
function formatEnum$3(value) {
  return value.toLowerCase().split("_").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
}
function formatAvailability(value) {
  if (value === "busy") {
    return "Busy";
  }
  if (value === "unavailable") {
    return "Unavailable";
  }
  return "Available now";
}
const Route$9 = Route$a;
const getJobDetails = createServerFn({
  method: "GET"
}).inputValidator((jobId) => jobId).handler(createSsrRpc("fbdfe6ab2e50a745fc4a753ad78f5f0482350705c42008ac33293075a8d93ca7"));
const saveFavoriteJob = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(createSsrRpc("944a30392296e8a1c31e157378436df8798cf6f1d7946e14b2325a0ffbacebd5"));
const submitProjectRequest = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(createSsrRpc("098b42f6887d35232744b8a4b5a9d8320fae10641031ab1101b9ac3ee9ef66d5"));
const Route$8 = createFileRoute("/job/$jobId")({
  loader: async ({
    params
  }) => {
    const result = await getJobDetails({
      data: params.jobId
    });
    if (!result) {
      throw notFound();
    }
    return result;
  },
  head: () => ({
    meta: [{
      title: "Job details - Servio"
    }]
  }),
  component: JobDetails
});
function JobDetails() {
  const {
    viewer,
    job,
    isFavorite
  } = useLoaderData({
    from: "/job/$jobId"
  });
  const isProfessional = viewer?.role === "PROFESSIONAL";
  const displayName = viewer ? `${viewer.firstName} ${viewer.lastName}`.trim() : "Guest";
  const skillTags = getSkillTags(job.category, job.title, job.description);
  const budgetLabel = formatBudget$1(job.budgetMin, job.budgetMax, job.timingType);
  const budgetType = job.budgetMin || job.budgetMax ? formatTimingType(job.timingType) : "Budget not set";
  const clientLocation = formatJobLocation(job);
  const jobMapQuery = job.locationLat != null && job.locationLng != null ? `${job.locationLat},${job.locationLng}` : job.locationAddress;
  const [favorite, setFavorite] = useState(isFavorite);
  const [favoriteStatus, setFavoriteStatus] = useState(null);
  const [isProposalOpen, setIsProposalOpen] = useState(false);
  const toggleFavorite = async () => {
    if (!viewer) {
      window.location.href = `/login?returnTo=${encodeURIComponent(`/job/${job.id}`)}`;
      return;
    }
    const nextFavorite = !favorite;
    setFavorite(nextFavorite);
    setFavoriteStatus(nextFavorite ? "Job saved to favorites." : "Job removed from favorites.");
    try {
      const result = await saveFavoriteJob({
        data: {
          jobId: job.id,
          favorite: nextFavorite
        }
      });
      if (!result.ok) {
        setFavorite(!nextFavorite);
        setFavoriteStatus(result.error);
      }
    } catch (error) {
      setFavorite(!nextFavorite);
      setFavoriteStatus(error instanceof Error ? error.message : "Could not update favorite job.");
    }
  };
  return /* @__PURE__ */ jsxs(AppShell, { userName: displayName, userRole: viewer?.role === "PROFESSIONAL" ? "Professional" : "Client", userAvatarUrl: viewer?.avatarUrl, children: [
    /* @__PURE__ */ jsx("div", { className: "mb-5", children: /* @__PURE__ */ jsx(Link, { to: "/dashboard", className: "text-sm text-primary hover:underline", children: "Back to dashboard" }) }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-6 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsx("div", { className: "space-y-6 lg:col-span-2", children: /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-border bg-card p-6 shadow-soft sm:p-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2 text-xs", children: [
          /* @__PURE__ */ jsx(Badge, { variant: "secondary", children: job.category }),
          /* @__PURE__ */ jsx(Badge, { children: formatEnum$2(job.status) }),
          /* @__PURE__ */ jsxs(Badge, { variant: job.urgency === "HIGH" ? "destructive" : "outline", children: [
            formatEnum$2(job.urgency),
            " urgency"
          ] })
        ] }),
        /* @__PURE__ */ jsx("h1", { className: "mt-3 text-2xl font-semibold tracking-tight sm:text-3xl", children: job.title }),
        /* @__PURE__ */ jsxs("div", { className: "mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5", children: [
            "Posted ",
            formatRelativeTime(job.createdAt)
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsx(MapPin, { className: "h-4 w-4" }),
            clientLocation
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsx(Briefcase, { className: "h-4 w-4" }),
            formatWorkMode(job.workMode)
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-6 grid gap-3 sm:grid-cols-3", children: [{
          label: budgetType,
          value: budgetLabel,
          icon: Tag
        }, {
          label: "Experience level",
          value: getExperienceLevel(job.urgency),
          icon: Settings
        }, {
          label: "Deadline",
          value: formatDate$2(job.deadline),
          icon: CalendarDays
        }].map((item) => /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-border p-4", children: [
          /* @__PURE__ */ jsx(item.icon, { className: "mb-3 h-5 w-5 text-muted-foreground" }),
          /* @__PURE__ */ jsx("p", { className: "font-semibold", children: item.value }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: item.label })
        ] }, item.label)) }),
        /* @__PURE__ */ jsxs("div", { className: "mt-8", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold", children: "Summary" }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground", children: job.description })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 rounded-lg border border-border p-4 text-sm", children: [
          /* @__PURE__ */ jsx("span", { className: "font-semibold text-foreground", children: "Project Type:" }),
          /* @__PURE__ */ jsx("span", { className: "ml-2 text-muted-foreground", children: getProjectType(job.status) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold", children: "Skills and Expertise" }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm font-medium", children: "Mandatory skills" }),
          /* @__PURE__ */ jsx("div", { className: "mt-3 flex flex-wrap gap-2", children: skillTags.map((skill) => /* @__PURE__ */ jsx("span", { className: "rounded-full bg-muted px-3 py-1.5 text-sm font-medium text-muted-foreground", children: skill }, skill)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold", children: "Attachments" }),
          job.attachments.length ? /* @__PURE__ */ jsx("ul", { className: "mt-3 space-y-2", children: job.attachments.map((attachment) => /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3 rounded-lg border border-border p-3 text-sm", children: [
            /* @__PURE__ */ jsx(FileText, { className: "h-4 w-4 text-muted-foreground" }),
            /* @__PURE__ */ jsx("span", { className: "min-w-0 flex-1 truncate", children: attachment.fileName }),
            /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: formatFileSize$1(attachment.fileSize) })
          ] }, attachment.id)) }) : /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "No files attached." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-8 grid gap-6 border-t border-border pt-6 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold", children: "Preferred qualifications" }),
            /* @__PURE__ */ jsxs("p", { className: "mt-3 text-sm text-muted-foreground", children: [
              getExperienceLevel(job.urgency),
              " professional with clear communication and examples of similar work."
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold", children: "Activity on this job" }),
            /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: "Proposals: 0 to 5. Interviewing: 0. Invites sent: 0." })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxs(Dialog, { open: isProposalOpen, onOpenChange: setIsProposalOpen, children: [
          /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-border bg-card p-6 shadow-soft", children: [
            /* @__PURE__ */ jsxs("a", { href: `/job/${job.id}`, target: "_blank", rel: "noreferrer", className: "mb-5 flex items-center gap-2 text-sm font-semibold text-primary", children: [
              /* @__PURE__ */ jsx(ExternalLink, { className: "h-4 w-4" }),
              "Open job in a new window"
            ] }),
            /* @__PURE__ */ jsx("div", { className: "rounded-xl bg-muted p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-3 text-sm", children: [
              /* @__PURE__ */ jsx(MessageSquare, { className: "mt-1 h-5 w-5 shrink-0 text-muted-foreground" }),
              /* @__PURE__ */ jsx("p", { children: "Send a message to the client to ask questions, confirm the work, and discuss next steps." })
            ] }) }),
            isProfessional ? /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { className: "mt-5 w-full gap-2", children: [
              /* @__PURE__ */ jsx(MessageSquare, { className: "h-4 w-4" }),
              "Send message to client"
            ] }) }) : /* @__PURE__ */ jsx(Button, { className: "mt-4 w-full", asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "/login", children: "Log in as professional" }) }),
            /* @__PURE__ */ jsxs(Button, { variant: "outline", className: "mt-3 w-full gap-2", onClick: toggleFavorite, children: [
              /* @__PURE__ */ jsx(Heart, { className: `h-4 w-4 ${favorite ? "fill-current text-primary" : ""}` }),
              favorite ? "Saved job" : "Save job"
            ] }),
            favoriteStatus ? /* @__PURE__ */ jsx("p", { className: "mt-2 text-center text-xs text-muted-foreground", children: favoriteStatus }) : null
          ] }),
          /* @__PURE__ */ jsx(ProposalDialog, { jobId: job.id, budgetMax: job.budgetMax, viewerId: viewer?.id ?? null, clientId: job.userId, projectTitle: job.title, onSent: () => setIsProposalOpen(false) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-border bg-card p-6 shadow-soft", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-semibold", children: "About the client" }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("img", { src: job.clientAvatarUrl || "https://i.pravatar.cc/100?u=client-job-detail", className: "h-12 w-12 rounded-full object-cover", alt: "" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "font-medium", children: job.clientCompanyName || job.clientName }),
              /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsx(Star, { className: "h-3 w-3 fill-warning text-warning" }),
                "Client account"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-5 space-y-3 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(BadgeCheck, { className: "h-4 w-4 text-success" }),
              "Payment method verified"
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(BadgeCheck, { className: "h-4 w-4 text-success" }),
              "Phone number verified"
            ] }),
            /* @__PURE__ */ jsx("p", { children: clientLocation }),
            /* @__PURE__ */ jsx("p", { children: "1 job posted" }),
            /* @__PURE__ */ jsx("p", { children: "0% hire rate, 1 open job" }),
            /* @__PURE__ */ jsx("p", { children: job.category }),
            /* @__PURE__ */ jsx("p", { children: "Individual client" })
          ] })
        ] }),
        jobMapQuery ? /* @__PURE__ */ jsxs("div", { className: "overflow-hidden rounded-xl border border-border bg-card shadow-soft", children: [
          /* @__PURE__ */ jsxs("div", { className: "border-b border-border p-4", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-semibold", children: "Location" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: clientLocation })
          ] }),
          /* @__PURE__ */ jsx("iframe", { title: "Job location map", src: `https://www.google.com/maps?q=${encodeURIComponent(jobMapQuery)}&z=16&output=embed`, className: "h-56 w-full border-0", loading: "lazy", referrerPolicy: "no-referrer-when-downgrade" })
        ] }) : null
      ] })
    ] })
  ] });
}
function ProposalDialog({
  jobId,
  budgetMax,
  viewerId,
  clientId,
  projectTitle,
  onSent
}) {
  const [bid, setBid] = useState(budgetMax ?? 0);
  const [durationWeeks, setDurationWeeks] = useState(1);
  const [coverLetter, setCoverLetter] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [formError, setFormError] = useState(null);
  const serviceFee = Math.round(bid * 0.1);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const trimmedCoverLetter = coverLetter.trim();
    if (!trimmedCoverLetter) {
      setFormError("Cover letter is required.");
      return;
    }
    setIsSaving(true);
    setStatusMessage(null);
    setFormError(null);
    try {
      const result = await submitProjectRequest({
        data: {
          jobId,
          bidAmount: bid > 0 ? bid : null,
          duration: `${durationWeeks} ${durationWeeks === 1 ? "week" : "weeks"}`,
          coverLetter: trimmedCoverLetter,
          attachments
        }
      });
      if (!result.ok) {
        setFormError(result.formError);
        return;
      }
      if (viewerId && result.request) {
        void emitProjectNotification({
          trackingId: result.request.id,
          actorId: viewerId,
          recipientId: clientId,
          title: "New project request",
          description: `A professional sent a request for ${projectTitle}.`,
          href: "/projects"
        });
      }
      setStatusMessage("Project request saved and sent to the client.");
      window.setTimeout(onSent, 1100);
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Could not save this project request.");
    } finally {
      setIsSaving(false);
    }
  };
  const readFileAsDataUrl2 = (file) => new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.readAsDataURL(file);
  });
  const handleAttachments = async (files) => {
    if (!files?.length) {
      return;
    }
    const nextAttachments = await Promise.all(Array.from(files).slice(0, 5).map(async (file) => ({
      fileName: file.name,
      fileType: file.type || null,
      fileSize: file.size,
      fileUrl: await readFileAsDataUrl2(file)
    })));
    setAttachments(nextAttachments);
    setFormError(null);
  };
  return /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-lg", children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(DialogTitle, { children: "Submit your proposal" }) }),
    /* @__PURE__ */ jsxs("form", { className: "space-y-4", onSubmit: handleSubmit, children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsx(Label, { children: "Your bid" }),
          /* @__PURE__ */ jsx(Input, { type: "number", placeholder: "$ Total", value: bid || "", onChange: (event) => {
            setBid(Number(event.target.value));
            setFormError(null);
          } })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsx(Label, { children: "Weeks" }),
          /* @__PURE__ */ jsx(Input, { type: "number", min: 1, placeholder: "3", value: durationWeeks, onChange: (event) => {
            setDurationWeeks(Math.max(1, Number(event.target.value) || 1));
            setFormError(null);
          } })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsx(Label, { children: "Cover letter" }),
        /* @__PURE__ */ jsx(Textarea, { rows: 6, placeholder: "Why are you the best fit for this job?", value: coverLetter, onChange: (event) => {
          setCoverLetter(event.target.value);
          setFormError(null);
        } })
      ] }),
      statusMessage ? /* @__PURE__ */ jsx("div", { className: "rounded-lg border border-success/20 bg-success/5 px-3 py-2 text-sm text-success", children: statusMessage }) : null,
      formError ? /* @__PURE__ */ jsx("div", { className: "rounded-lg border border-destructive/20 bg-destructive/5 px-3 py-2 text-sm text-destructive", children: formError }) : null,
      /* @__PURE__ */ jsxs("label", { className: "block cursor-pointer rounded-lg border border-dashed border-border p-3 text-xs text-muted-foreground hover:bg-muted/40", children: [
        /* @__PURE__ */ jsx(Paperclip, { className: "mr-1 inline h-3 w-3" }),
        attachments.length ? `${attachments.length} work sample${attachments.length === 1 ? "" : "s"} selected` : "Attach work samples (optional)",
        /* @__PURE__ */ jsx("input", { type: "file", multiple: true, className: "sr-only", onChange: (event) => handleAttachments(event.target.files) })
      ] }),
      attachments.length ? /* @__PURE__ */ jsx("div", { className: "space-y-1 text-xs text-muted-foreground", children: attachments.map((attachment) => /* @__PURE__ */ jsx("div", { className: "truncate rounded-md bg-muted px-2 py-1", children: attachment.fileName }, attachment.fileName)) }) : null,
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between rounded-lg bg-muted p-3 text-sm", children: [
        /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Service fee (10%)" }),
        /* @__PURE__ */ jsxs("span", { children: [
          "-$",
          serviceFee.toLocaleString()
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-sm font-semibold", children: [
        /* @__PURE__ */ jsx("span", { children: "You'll receive" }),
        /* @__PURE__ */ jsxs("span", { children: [
          "$",
          Math.max(0, bid - serviceFee).toLocaleString()
        ] })
      ] }),
      /* @__PURE__ */ jsx(Button, { className: "w-full", type: "submit", disabled: isSaving, children: isSaving ? "Saving..." : "Submit request" })
    ] })
  ] });
}
function formatEnum$2(value) {
  return value.toLowerCase().split("_").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
}
function formatWorkMode(value) {
  return value === "ON_SITE" ? "On-site" : formatEnum$2(value);
}
function formatDate$2(value) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(value));
}
function formatBudget$1(min, max, timingType = "FIXED") {
  const suffix = getBudgetSuffix$1(timingType);
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
function formatTimingType(timingType) {
  if (timingType === "HOURLY") {
    return "Hourly";
  }
  if (timingType === "WEEKLY") {
    return "Weekly";
  }
  return "Fixed-price";
}
function formatJobLocation(job) {
  if (job.workMode === "REMOTE") {
    return "Remote";
  }
  return formatApproximateLocation(job.locationAddress || job.locationLabel, "Worldwide");
}
function getBudgetSuffix$1(timingType) {
  if (timingType === "HOURLY") {
    return " / hour";
  }
  if (timingType === "WEEKLY") {
    return " / week";
  }
  return "";
}
function formatFileSize$1(size) {
  if (!size) {
    return "Unknown size";
  }
  if (size < 1024 * 1024) {
    return `${Math.round(size / 1024)} KB`;
  }
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}
function formatRelativeTime(value) {
  const postedAt = new Date(value).getTime();
  const diffMs = Math.max(0, Date.now() - postedAt);
  const diffMinutes = Math.floor(diffMs / 6e4);
  if (diffMinutes < 1) {
    return "just now";
  }
  if (diffMinutes < 60) {
    return `${diffMinutes} ${diffMinutes === 1 ? "minute" : "minutes"} ago`;
  }
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) {
    return `${diffHours} ${diffHours === 1 ? "hour" : "hours"} ago`;
  }
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} ${diffDays === 1 ? "day" : "days"} ago`;
}
function getExperienceLevel(urgency) {
  if (urgency === "HIGH") {
    return "Expert";
  }
  if (urgency === "LOW") {
    return "Entry level";
  }
  return "Intermediate";
}
function getProjectType(status) {
  if (status === "OPEN") {
    return "Ongoing project";
  }
  return formatEnum$2(status);
}
function getSkillTags(category, title, description) {
  const text = `${category} ${title} ${description}`.toLowerCase();
  const tags = /* @__PURE__ */ new Set();
  tags.add(category);
  if (text.includes("web") || text.includes("website")) {
    tags.add("Web Design");
    tags.add("Web Development");
    tags.add("HTML");
    tags.add("CSS");
  }
  if (text.includes("react")) {
    tags.add("React");
  }
  if (text.includes("design")) {
    tags.add("Design");
  }
  if (text.includes("photo")) {
    tags.add("Photography");
  }
  if (text.includes("seo") || text.includes("marketing")) {
    tags.add("Marketing");
  }
  return Array.from(tags).slice(0, 6);
}
async function emitProjectNotification(payload) {
  try {
    const socket = io(getSocketUrl$1());
    socket.emit("project:activity", payload);
    window.setTimeout(() => socket.disconnect(), 800);
  } catch {
  }
}
function getSocketUrl$1() {
  return `${window.location.protocol}//${window.location.hostname}:4001`;
}
const Route$7 = Route$8;
const Route$6 = createFileRoute("/pro/$proId")({
  head: () => ({
    meta: [{
      title: "Professional profile — Servio"
    }]
  }),
  loader: async ({
    params
  }) => {
    const result = await getProDetails({
      data: params.proId
    });
    if (!result || !result.profile) {
      throw notFound();
    }
    return result;
  },
  component: ProProfile,
  errorComponent: ({
    error
  }) => /* @__PURE__ */ jsx("div", { className: "p-10 text-center", children: error.message }),
  notFoundComponent: () => /* @__PURE__ */ jsx("div", { className: "p-10 text-center", children: "Pro not found." })
});
const getProDetails = createServerFn({
  method: "GET"
}).inputValidator((id) => id).handler(createSsrRpc("80eabf15f2715bb64d656ee1c68f69421d7daa00d87f9a424a70ef6c8aa3e507"));
function ProProfile() {
  const navigate = useNavigate();
  const {
    viewer,
    profile: pro,
    verification
  } = useLoaderData({
    from: "/pro/$proId"
  });
  const rateLabel = pro.hourlyRate != null ? `$${pro.hourlyRate}/hr` : "Contact for rate";
  const fixedLabel = pro.fixedRate != null ? `$${pro.fixedRate}` : "Flexible";
  const locationLabel = formatApproximateLocation(pro.professionalCity || pro.serviceArea || pro.address, "Location not provided");
  const mapLocation = locationLabel;
  const certificationLabels = getCertificationLabels(pro.certifications);
  getWorkPhotoUrls(pro.workPhotos);
  const workModeLabel = pro.workMode === "remote" ? "Remote" : pro.workMode === "onsite" ? "On-site" : "Remote & on-site";
  const ratingLabel = `${pro.averageRating.toFixed(1)} · ${pro.reviewCount} ${pro.reviewCount === 1 ? "review" : "reviews"}`;
  const verificationMeta = getVerificationMeta(verification.status);
  const verificationDocs = getVerificationDocuments(verification);
  const verificationBadges = verificationDocs.filter((document2) => document2.done);
  const uploadedVerificationCount = verificationDocs.filter((document2) => document2.done).length;
  return /* @__PURE__ */ jsxs(AppShell, { userName: viewer ? `${viewer.firstName} ${viewer.lastName}`.trim() : void 0, userRole: viewer?.role === "PROFESSIONAL" ? "Professional" : "Client", userAvatarUrl: viewer?.avatarUrl, children: [
    /* @__PURE__ */ jsxs("div", { className: "overflow-hidden rounded-3xl border border-border bg-card shadow-soft", children: [
      /* @__PURE__ */ jsx("div", { className: "h-32 gradient-primary" }),
      /* @__PURE__ */ jsx("div", { className: "px-6 pb-6 sm:px-8", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-end gap-5", children: [
          /* @__PURE__ */ jsx("img", { src: pro.avatarUrl || "https://i.pravatar.cc/240?u=pro-profile", alt: pro.fullName, className: "-mt-12 h-24 w-24 rounded-2xl border-4 border-card object-cover shadow-elevated" }),
          /* @__PURE__ */ jsxs("div", { className: "pb-1", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
              /* @__PURE__ */ jsx("h1", { className: "text-2xl font-semibold tracking-tight", children: pro.fullName }),
              verification.status === "approved" ? /* @__PURE__ */ jsx(BadgeCheck, { className: "h-5 w-5 text-primary" }) : null,
              /* @__PURE__ */ jsx("span", { className: `rounded-full px-2.5 py-1 text-xs font-semibold ${verificationMeta.badgeClass}`, children: verificationMeta.label })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: pro.professionalCategory || "Professional services" }),
            /* @__PURE__ */ jsxs("div", { className: "mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1 text-foreground", children: [
                /* @__PURE__ */ jsx(Star, { className: "h-3 w-3 fill-warning text-warning" }),
                ratingLabel
              ] }),
              /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsx(MapPin, { className: "h-3 w-3" }),
                locationLabel
              ] }),
              /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsx(Clock, { className: "h-3 w-3" }),
                pro.availabilityStatus
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "mt-3 flex flex-wrap gap-2", children: verificationBadges.length ? verificationBadges.map((badge) => /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-full border border-primary/15 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary", children: [
              /* @__PURE__ */ jsx(badge.icon, { className: "h-3.5 w-3.5" }),
              badge.label
            ] }, badge.label)) : /* @__PURE__ */ jsx("span", { className: "rounded-full border border-dashed border-border px-3 py-1 text-xs font-medium text-muted-foreground", children: "No verification badges yet" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2 sm:pb-2", children: [
          /* @__PURE__ */ jsxs(Button, { variant: "outline", size: "sm", className: "gap-2", children: [
            /* @__PURE__ */ jsx(Heart, { className: "h-4 w-4" }),
            " Save"
          ] }),
          /* @__PURE__ */ jsxs(Button, { variant: "outline", size: "sm", className: "gap-2", children: [
            /* @__PURE__ */ jsx(Share2, { className: "h-4 w-4" }),
            " Share"
          ] }),
          /* @__PURE__ */ jsxs(Button, { type: "button", size: "sm", className: "gap-2", onClick: () => openProfessionalMessage(viewer, pro, navigate), children: [
            /* @__PURE__ */ jsx(MessageSquare, { className: "h-4 w-4" }),
            " Message"
          ] }),
          /* @__PURE__ */ jsx(Button, { size: "sm", variant: "default", asChild: true, children: /* @__PURE__ */ jsxs(Link, { to: "/hire/$proId", params: {
            proId: String(pro.id)
          }, children: [
            "Hire - ",
            rateLabel
          ] }) })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 grid gap-6 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-6 lg:col-span-2", children: [
        /* @__PURE__ */ jsx(Section, { title: "About this pro", children: /* @__PURE__ */ jsx("p", { className: "text-sm leading-relaxed text-muted-foreground", children: pro.companyDescription || "This professional has not yet added a description. Contact them to learn more about their experience and services." }) }),
        /* @__PURE__ */ jsx(Section, { title: "Services", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsx(InfoCard, { label: "Category", value: pro.professionalCategory || "Not specified" }),
          /* @__PURE__ */ jsx(InfoCard, { label: "Service area", value: formatApproximateLocation(pro.serviceArea, locationLabel) }),
          /* @__PURE__ */ jsx(InfoCard, { label: "Work mode", value: workModeLabel }),
          /* @__PURE__ */ jsx(InfoCard, { label: "Availability", value: pro.availabilityStatus || "Not specified" }),
          /* @__PURE__ */ jsx(InfoCard, { label: "Hourly rate", value: rateLabel }),
          /* @__PURE__ */ jsx(InfoCard, { label: "Fixed rate", value: fixedLabel })
        ] }) }),
        /* @__PURE__ */ jsx(Section, { title: "Portfolio", children: pro.portfolioUrl ? /* @__PURE__ */ jsx("a", { className: "inline-block rounded-lg border border-primary bg-primary/5 px-4 py-2 text-primary font-medium hover:bg-primary/10 transition", href: pro.portfolioUrl, target: "_blank", rel: "noreferrer", children: "Visit portfolio" }) : /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "No portfolio link added yet." }) }),
        /* @__PURE__ */ jsxs(Section, { title: "Skills & experience", children: [
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: pro.skills.length > 0 ? pro.skills.map((skill) => /* @__PURE__ */ jsx("span", { className: "rounded-full border border-border bg-background px-3 py-1 text-xs", children: skill }, skill)) : /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground", children: "No skills added yet." }) }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 grid gap-3 sm:grid-cols-2 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-foreground font-medium", children: "Experience" }),
              /* @__PURE__ */ jsx("p", { children: pro.experienceYears != null ? `${pro.experienceYears} years` : "Not specified" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-foreground font-medium", children: "Trade license" }),
              pro.tradeLicenseUrl ? /* @__PURE__ */ jsx("a", { href: pro.tradeLicenseUrl, target: "_blank", rel: "noreferrer", className: "text-primary hover:underline", children: "View license" }) : /* @__PURE__ */ jsx("p", { children: "Not provided" })
            ] })
          ] })
        ] }),
        certificationLabels.length > 0 ? /* @__PURE__ */ jsx(Section, { title: "Certifications", children: /* @__PURE__ */ jsx("ul", { className: "list-disc space-y-2 pl-5 text-sm text-muted-foreground", children: certificationLabels.map((cert) => /* @__PURE__ */ jsx("li", { children: cert }, cert)) }) }) : null,
        /* @__PURE__ */ jsxs(Section, { title: "Verification badges", children: [
          /* @__PURE__ */ jsx("div", { className: "rounded-2xl border border-border bg-background p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-between gap-4 sm:flex-row sm:items-center", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsx("div", { className: `grid h-11 w-11 shrink-0 place-items-center rounded-xl ${verificationMeta.iconClass}`, children: /* @__PURE__ */ jsx(verificationMeta.icon, { className: "h-5 w-5" }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "font-semibold", children: verificationMeta.label }),
                /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: verificationMeta.description }),
                verification.updatedAt ? /* @__PURE__ */ jsxs("p", { className: "mt-2 text-xs text-muted-foreground", children: [
                  "Last updated ",
                  formatDateTime$2(verification.updatedAt)
                ] }) : null
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "rounded-xl bg-muted px-4 py-3 text-center", children: [
              /* @__PURE__ */ jsxs("p", { className: "text-xl font-semibold", children: [
                uploadedVerificationCount,
                "/",
                verificationDocs.length
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "items uploaded" })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "mt-4 grid gap-4 sm:grid-cols-2", children: verificationDocs.map((document2) => /* @__PURE__ */ jsx(VerificationCard, { icon: document2.icon, label: document2.label, done: document2.done, value: document2.done ? "Uploaded" : "Missing" }, document2.label)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsx(ProLocationMap, { location: mapLocation, label: locationLabel, proName: pro.fullName }),
        /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-border bg-card p-6 shadow-soft", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-semibold", children: "Contact" }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 space-y-4 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsx(ContactRow, { icon: Mail, label: "Email", value: pro.email || "Not available" }),
            /* @__PURE__ */ jsx(ContactRow, { icon: Phone, label: "Phone", value: pro.phone || "Not available" }),
            /* @__PURE__ */ jsx(ContactRow, { icon: MapPin, label: "Approx. location", value: locationLabel })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-border bg-card p-6 shadow-soft", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-semibold", children: "Snapshot" }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 space-y-4 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsx(StatRow, { label: "Verification", value: verificationMeta.label }),
            /* @__PURE__ */ jsx(StatRow, { label: "Rating", value: ratingLabel }),
            /* @__PURE__ */ jsx(StatRow, { label: "Service radius", value: pro.serviceRadiusKm ? `${pro.serviceRadiusKm} km` : "Not set" }),
            /* @__PURE__ */ jsx(StatRow, { label: "Work mode", value: workModeLabel })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-border bg-card p-6 shadow-soft", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-semibold", children: "Availability" }),
          /* @__PURE__ */ jsxs("p", { className: "mt-4 text-sm text-muted-foreground", children: [
            pro.availabilityStatus,
            " and accepting new inquiries."
          ] })
        ] })
      ] })
    ] })
  ] });
}
function ProLocationMap({
  location,
  label,
  proName
}) {
  const hasLocation = Boolean(location.trim());
  const mapQuery = encodeURIComponent(location || label);
  return /* @__PURE__ */ jsxs("div", { className: "overflow-hidden rounded-2xl border border-border bg-card shadow-soft", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3 p-6 pb-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "font-semibold", children: "Location map" }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: label })
      ] }),
      /* @__PURE__ */ jsx("span", { className: "rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary", children: "Pro marker" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "relative h-64 border-t border-border bg-muted", children: [
      hasLocation ? /* @__PURE__ */ jsx("iframe", { title: `${proName} location map`, src: `https://www.google.com/maps?q=${mapQuery}&z=12&output=embed`, className: "h-full w-full border-0", loading: "lazy" }) : /* @__PURE__ */ jsx("div", { className: "grid h-full place-items-center px-6 text-center text-sm text-muted-foreground", children: "Location not added yet." }),
      hasLocation ? /* @__PURE__ */ jsxs("div", { className: "pointer-events-none absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center", children: [
        /* @__PURE__ */ jsx("span", { className: "absolute h-16 w-16 animate-ping rounded-full bg-primary/25" }),
        /* @__PURE__ */ jsx("span", { className: "absolute h-10 w-10 rounded-full border-2 border-primary/40 bg-primary/10" }),
        /* @__PURE__ */ jsx("span", { className: "relative grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground shadow-elevated", children: /* @__PURE__ */ jsx(MapPin, { className: "h-5 w-5 fill-current" }) }),
        /* @__PURE__ */ jsx("span", { className: "mt-2 max-w-40 rounded-full bg-background/95 px-3 py-1 text-center text-xs font-medium text-foreground shadow-soft", children: proName })
      ] }) : null
    ] })
  ] });
}
function Section({
  title,
  children
}) {
  return /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-border bg-card p-6 shadow-soft", children: [
    /* @__PURE__ */ jsx("h2", { className: "mb-4 text-lg font-semibold", children: title }),
    children
  ] });
}
function InfoCard({
  label,
  value
}) {
  return /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-border bg-background p-4 text-sm", children: [
    /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-xs uppercase tracking-[0.2em]", children: label }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 font-medium text-foreground", children: value })
  ] });
}
function VerificationCard({
  icon: Icon,
  label,
  done,
  optional = false,
  value
}) {
  return /* @__PURE__ */ jsx("div", { className: "rounded-2xl border border-border bg-background p-4 text-sm", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3", children: [
    /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 font-medium text-foreground", children: [
      /* @__PURE__ */ jsx(Icon, { className: "h-4 w-4 text-primary" }),
      label
    ] }),
    /* @__PURE__ */ jsx("span", { className: `shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${done ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`, children: value || (done ? "Uploaded" : optional ? "Optional" : "Missing") })
  ] }) });
}
function buildConversationId(clientId, professionalId) {
  return `client-${clientId}-pro-${professionalId}`;
}
function openProfessionalMessage(viewer, pro, navigate) {
  if (!viewer || viewer.role !== "CLIENT") {
    void navigate({
      to: "/login",
      search: {
        returnTo: `/pro/${pro.id}`
      }
    });
    return;
  }
  rememberPendingProfessionalMessage(viewer.id, pro);
  void navigate({
    to: "/messages",
    search: {
      conversationId: buildConversationId(viewer.id, pro.id),
      toUserId: String(pro.id),
      name: pro.fullName,
      avatar: pro.avatarUrl || "",
      job: "Direct message",
      firstMessage: `Hi ${pro.fullName}, I found your profile and would like to discuss hiring you.`
    }
  });
}
function rememberPendingProfessionalMessage(viewerId, pro) {
  if (typeof window === "undefined") {
    return;
  }
  const conversationId = buildConversationId(viewerId, pro.id);
  sessionStorage.setItem("servio:pending-professional-message", JSON.stringify({
    createdAt: Date.now(),
    conversation: {
      id: conversationId,
      otherUserId: pro.id,
      otherUserName: pro.fullName,
      otherUserAvatarUrl: pro.avatarUrl || null,
      job: "Direct message",
      preview: "Start conversation",
      time: "",
      unread: 0
    },
    firstMessage: `Hi ${pro.fullName}, I found your profile and would like to discuss hiring you.`
  }));
}
function ContactRow({
  icon: Icon,
  label,
  value
}) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
    /* @__PURE__ */ jsx(Icon, { className: "h-4 w-4 text-primary mt-1" }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-[0.2em] text-muted-foreground", children: label }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 font-medium text-foreground break-words", children: value })
    ] })
  ] });
}
function getVerificationMeta(status) {
  if (status === "approved") {
    return {
      label: "Approved",
      description: "This professional has passed verification review.",
      badgeClass: "bg-success/10 text-success",
      iconClass: "bg-success/10 text-success",
      icon: BadgeCheck
    };
  }
  if (status === "rejected") {
    return {
      label: "Needs changes",
      description: "Submitted verification needs updated documents before approval.",
      badgeClass: "bg-destructive/10 text-destructive",
      iconClass: "bg-destructive/10 text-destructive",
      icon: ShieldCheck
    };
  }
  if (status === "pending") {
    return {
      label: "Pending review",
      description: "Verification documents are saved and waiting for review.",
      badgeClass: "bg-primary/10 text-primary",
      iconClass: "bg-primary/10 text-primary",
      icon: Clock
    };
  }
  return {
    label: "Not started",
    description: "This professional has not uploaded verification documents yet.",
    badgeClass: "bg-muted text-muted-foreground",
    iconClass: "bg-muted text-muted-foreground",
    icon: ShieldCheck
  };
}
function getVerificationDocuments(verification) {
  return [{
    label: "Government ID",
    icon: FileText,
    done: Boolean(verification.governmentIdUrl)
  }, {
    label: "Trade license",
    icon: FileBadge,
    done: Boolean(verification.licenseUrl)
  }, {
    label: "Certifications",
    icon: BadgeCheck,
    done: Boolean(verification.certifications.length)
  }, {
    label: "Insurance",
    icon: ShieldCheck,
    done: Boolean(verification.insuranceUrl)
  }, {
    label: "Selfie verification",
    icon: Camera,
    done: Boolean(verification.selfieUrl)
  }];
}
function formatDateTime$2(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "recently";
  }
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit"
  }).format(date);
}
function getCertificationLabels(certifications) {
  return certifications.map((certification, index) => formatCertificationLabel(certification, index)).filter(Boolean);
}
function formatCertificationLabel(certification, index) {
  const trimmedCertification = certification.trim();
  if (!trimmedCertification) {
    return "";
  }
  if (trimmedCertification.startsWith("data:") || trimmedCertification.includes(";base64") || /^[A-Za-z0-9+/=]{80,}$/.test(trimmedCertification)) {
    return `Certificate ${index + 1}`;
  }
  return trimmedCertification;
}
function getWorkPhotoUrls(workPhotos) {
  const urls = [];
  for (let index = 0; index < workPhotos.length; index += 1) {
    const photo = workPhotos[index]?.trim();
    const nextPhoto = workPhotos[index + 1]?.trim();
    if (!photo) {
      continue;
    }
    if (photo.startsWith("data:image/") && !photo.includes(",")) {
      if (nextPhoto) {
        urls.push(`${photo},${nextPhoto}`);
        index += 1;
      }
      continue;
    }
    if (photo.startsWith("data:image/") || /^https?:\/\//i.test(photo)) {
      urls.push(photo);
    }
  }
  return urls;
}
function StatRow({
  label,
  value
}) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-sm", children: [
    /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: label }),
    /* @__PURE__ */ jsx("span", { className: "font-medium text-foreground", children: value })
  ] });
}
const Route$5 = Route$6;
const Route$4 = createFileRoute("/professional-stats/$section")({
  beforeLoad: async ({
    location
  }) => {
    const data = await getProfessionalStatsData();
    if (!data) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href
        }
      });
    }
    if (data.viewer.role !== "PROFESSIONAL") {
      throw redirect({
        to: "/dashboard"
      });
    }
  },
  loader: () => getProfessionalStatsData(),
  head: ({
    params
  }) => ({
    meta: [{
      title: `${getSectionTitle(params.section)} - Servio`
    }]
  }),
  component: ProfessionalStatsDetail
});
const saveReviewResponse = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(createSsrRpc("8a1c28cedc7196cd4f9754d02e7774264f54ef4c22e9e30f3479e991188e6cb0"));
const sendNegotiationOffer = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(createSsrRpc("21979ea036eadadfd14a1ef9fabc79f952b9d59dc1b92b8560d652fa27c1b7de"));
function ProfessionalStatsDetail() {
  const data = Route$4.useLoaderData();
  const {
    section
  } = Route$4.useParams();
  if (!data) {
    return null;
  }
  const {
    viewer,
    profile,
    projectRequests
  } = data;
  const projectNegotiations = data.projectNegotiations ?? [];
  const hireRequests = data.hireRequests ?? [];
  const trackedProjects = data.trackedProjects ?? [];
  const visibleProjectRequests = projectRequests.filter((project) => isVisibleProjectRequest(project));
  const visibleHireRequests = hireRequests.filter((request) => request.status !== "started" && request.status !== "cancelled" && !isExpiredRejectedHireRequest(request));
  const runningProjects = trackedProjects.filter((project) => project.status === "ACTIVE");
  const completedProjects = trackedProjects.filter((project) => project.status === "COMPLETED");
  const reviewedProjects = completedProjects.filter((project) => project.reviewRating);
  const displayName = profile?.fullName || `${viewer.firstName} ${viewer.lastName}`.trim();
  const title = getSectionTitle(section);
  return /* @__PURE__ */ jsxs(AppShell, { userName: displayName, userRole: "Professional", userAvatarUrl: profile?.avatarUrl || viewer.avatarUrl, children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-end", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-semibold tracking-tight", children: title }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: getSectionDescription(section) })
      ] }),
      /* @__PURE__ */ jsx(Button, { variant: "outline", asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "/professional-stats", children: "Back to stats" }) })
    ] }),
    section === "projects" ? /* @__PURE__ */ jsx(ProjectGrid, { projects: runningProjects, emptyTitle: "No running projects" }) : null,
    section === "project-requests" ? /* @__PURE__ */ jsx(RequestGrid, { projects: visibleProjectRequests, negotiations: projectNegotiations }) : null,
    section === "hire-requests" ? /* @__PURE__ */ jsx(HireGrid, { requests: visibleHireRequests }) : null,
    section === "completed" ? /* @__PURE__ */ jsx(ProjectGrid, { projects: completedProjects, emptyTitle: "No completed projects" }) : null,
    section === "ratings" ? /* @__PURE__ */ jsx(ProjectGrid, { projects: reviewedProjects, emptyTitle: "No client reviews yet", showReviews: true }) : null,
    !["projects", "project-requests", "hire-requests", "completed", "ratings"].includes(section) ? /* @__PURE__ */ jsx(EmptyState, { title: "Stats section not found", description: "Choose one of the stat cards from My stats." }) : null
  ] });
}
function ProjectGrid({
  projects,
  emptyTitle,
  showReviews = false
}) {
  if (!projects.length) {
    return /* @__PURE__ */ jsx(EmptyState, { title: emptyTitle, description: "New items will appear here when the project status changes." });
  }
  return /* @__PURE__ */ jsx("div", { className: "grid gap-4 lg:grid-cols-2", children: projects.map((project) => /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-border bg-card p-5 shadow-soft", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2", children: [
          /* @__PURE__ */ jsx(Badge, { variant: "secondary", children: project.projectCategory }),
          /* @__PURE__ */ jsx(Badge, { children: project.status === "COMPLETED" ? "Completed" : "Running" })
        ] }),
        /* @__PURE__ */ jsx("h2", { className: "mt-3 line-clamp-2 font-semibold", children: project.projectTitle }),
        /* @__PURE__ */ jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
          "Client: ",
          project.clientName || `Client ${project.clientId}`
        ] })
      ] }),
      /* @__PURE__ */ jsx("img", { src: project.clientAvatarUrl || `https://i.pravatar.cc/100?u=stat-detail-${project.clientId}`, alt: "", className: "h-12 w-12 shrink-0 rounded-lg object-cover" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-4 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2", children: [
      /* @__PURE__ */ jsx(Info, { icon: Briefcase, label: "Price", value: formatMoney$1(project.bidAmount ?? 0) }),
      /* @__PURE__ */ jsx(Info, { icon: CalendarDays, label: "Accepted", value: project.acceptedAt ? formatDate$1(project.acceptedAt) : "Not set" }),
      /* @__PURE__ */ jsx(Info, { icon: MapPin, label: "Deadline", value: project.deadline ? formatDate$1(project.deadline) : "Not set" }),
      /* @__PURE__ */ jsx(Info, { icon: CheckCircle2, label: "Status", value: formatEnum$1(project.status) })
    ] }),
    showReviews ? /* @__PURE__ */ jsx(ReviewSummary, { project }) : null,
    /* @__PURE__ */ jsxs("div", { className: "mt-4 flex flex-wrap gap-2", children: [
      /* @__PURE__ */ jsx(Button, { size: "sm", asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "/project-track/$trackingId", params: {
        trackingId: String(project.id)
      }, children: "View project" }) }),
      /* @__PURE__ */ jsx(Button, { size: "sm", variant: "outline", asChild: true, children: /* @__PURE__ */ jsxs(Link, { to: "/professional-messages", children: [
        /* @__PURE__ */ jsx(MessageSquare, { className: "h-4 w-4" }),
        "Message"
      ] }) })
    ] })
  ] }, project.id)) });
}
function RequestGrid({
  projects,
  negotiations
}) {
  const router2 = useRouter();
  const [openNegotiationId, setOpenNegotiationId] = useState(null);
  const [pendingNegotiationId, setPendingNegotiationId] = useState(null);
  const [negotiationError, setNegotiationError] = useState(null);
  const [negotiationDrafts, setNegotiationDrafts] = useState({});
  if (!projects.length) {
    return /* @__PURE__ */ jsx(EmptyState, { title: "No project requests", description: "Requests you send to clients will appear here." });
  }
  async function handleSendNegotiation(project) {
    const draft = negotiationDrafts[project.id] ?? {
      bidAmount: project.bidAmount ? String(project.bidAmount) : "",
      duration: getDurationWeeksValue(project.duration, project.deadline),
      message: project.coverLetter || ""
    };
    const bidAmount = Number(draft.bidAmount);
    setPendingNegotiationId(project.id);
    setNegotiationError(null);
    try {
      await sendNegotiationOffer({
        data: {
          requestId: project.id,
          bidAmount: Number.isFinite(bidAmount) && bidAmount > 0 ? bidAmount : null,
          duration: formatWeeksDuration(draft.duration),
          message: draft.message
        }
      });
      toast.success("Negotiation offer sent.");
      setOpenNegotiationId(null);
      await router2.invalidate();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Could not send negotiation offer.";
      setNegotiationError(message);
      toast.error(message);
    } finally {
      setPendingNegotiationId(null);
    }
  }
  return /* @__PURE__ */ jsx("div", { className: "grid gap-4 lg:grid-cols-2", children: projects.map((project) => {
    const negotiationHistory = negotiations.filter((negotiation) => negotiation.requestId === project.id);
    const latestNegotiation = negotiationHistory.at(-1);
    const negotiationDraft = negotiationDrafts[project.id] ?? {
      bidAmount: project.bidAmount ? String(project.bidAmount) : "",
      duration: getDurationWeeksValue(project.duration, project.deadline),
      message: project.coverLetter || ""
    };
    return /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-border bg-card p-5 shadow-soft", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2", children: [
        /* @__PURE__ */ jsx(Badge, { variant: "secondary", children: project.projectCategory }),
        /* @__PURE__ */ jsx(Badge, { variant: project.status === "ACCEPTED" ? "default" : project.status === "DECLINED" ? "destructive" : "outline", children: formatEnum$1(project.status) }),
        project.trackingStatus ? /* @__PURE__ */ jsxs(Badge, { variant: "outline", children: [
          "Tracking ",
          formatEnum$1(project.trackingStatus)
        ] }) : null,
        negotiationHistory.length ? /* @__PURE__ */ jsxs(Badge, { variant: "outline", children: [
          negotiationHistory.length,
          " offers"
        ] }) : null
      ] }),
      /* @__PURE__ */ jsx("h2", { className: "mt-3 line-clamp-2 font-semibold", children: project.projectTitle }),
      /* @__PURE__ */ jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
        "Client: ",
        project.clientName || `Client ${project.clientId}`
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2", children: [
        /* @__PURE__ */ jsx(Info, { icon: Briefcase, label: "Bid", value: formatMoney$1(project.bidAmount ?? 0) }),
        /* @__PURE__ */ jsx(Info, { icon: CalendarDays, label: "Deadline", value: project.deadline ? formatDate$1(project.deadline) : "Not set" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mt-3 line-clamp-3 text-sm text-muted-foreground", children: project.coverLetter }),
      latestNegotiation ? /* @__PURE__ */ jsxs("div", { className: "mt-4 rounded-lg border border-border bg-muted/30 p-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2 text-sm font-medium", children: [
          /* @__PURE__ */ jsx(Handshake, { className: "h-4 w-4 text-primary" }),
          /* @__PURE__ */ jsx("span", { children: "Latest negotiation offer" }),
          /* @__PURE__ */ jsx("span", { className: "text-xs font-normal text-muted-foreground", children: formatDateTime$1(latestNegotiation.createdAt) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-2 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxs("span", { children: [
            "Bid: ",
            formatMoney$1(latestNegotiation.bidAmount ?? 0)
          ] }),
          /* @__PURE__ */ jsxs("span", { children: [
            "Duration: ",
            latestNegotiation.duration || "Not set"
          ] })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 line-clamp-2 text-sm text-muted-foreground", children: latestNegotiation.message })
      ] }) : null,
      /* @__PURE__ */ jsxs("div", { className: "mt-4 flex flex-wrap gap-2", children: [
        /* @__PURE__ */ jsx(Button, { size: "sm", asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "/job/$jobId", params: {
          jobId: String(project.jobId)
        }, children: "View job" }) }),
        project.status === "PENDING" ? /* @__PURE__ */ jsxs(Button, { size: "sm", variant: "outline", onClick: () => {
          setNegotiationError(null);
          setNegotiationDrafts((drafts) => ({
            ...drafts,
            [project.id]: negotiationDraft
          }));
          setOpenNegotiationId(project.id);
        }, children: [
          /* @__PURE__ */ jsx(Handshake, { className: "h-4 w-4" }),
          "Negotiate"
        ] }) : null,
        project.trackingId ? /* @__PURE__ */ jsx(Button, { size: "sm", variant: "outline", asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "/project-track/$trackingId", params: {
          trackingId: String(project.trackingId)
        }, children: "Track project" }) }) : null,
        /* @__PURE__ */ jsx(Button, { size: "sm", variant: "outline", asChild: true, children: /* @__PURE__ */ jsxs(Link, { to: "/professional-messages", children: [
          /* @__PURE__ */ jsx(MessageSquare, { className: "h-4 w-4" }),
          "Message"
        ] }) })
      ] }),
      /* @__PURE__ */ jsx(Dialog, { open: openNegotiationId === project.id, onOpenChange: (open) => setOpenNegotiationId(open ? project.id : null), children: /* @__PURE__ */ jsxs(DialogContent, { children: [
        /* @__PURE__ */ jsxs(DialogHeader, { children: [
          /* @__PURE__ */ jsx(DialogTitle, { children: "Negotiate project offer" }),
          /* @__PURE__ */ jsxs(DialogDescription, { children: [
            "Send the client a revised bid, duration, and message for ",
            project.projectTitle,
            "."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid gap-2 sm:grid-cols-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: `detail-bid-${project.id}`, children: "Bid amount" }),
              /* @__PURE__ */ jsx(Input, { id: `detail-bid-${project.id}`, type: "number", min: "0", value: negotiationDraft.bidAmount, onChange: (event) => setNegotiationDrafts((drafts) => ({
                ...drafts,
                [project.id]: {
                  ...negotiationDraft,
                  bidAmount: event.target.value
                }
              })), placeholder: "Project bid" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: `detail-duration-${project.id}`, children: "Duration (weeks)" }),
              /* @__PURE__ */ jsx(Input, { id: `detail-duration-${project.id}`, type: "number", min: "1", step: "1", value: negotiationDraft.duration, onChange: (event) => setNegotiationDrafts((drafts) => ({
                ...drafts,
                [project.id]: {
                  ...negotiationDraft,
                  duration: event.target.value
                }
              })), placeholder: "Weeks" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: `detail-message-${project.id}`, children: "Message" }),
            /* @__PURE__ */ jsx(Textarea, { id: `detail-message-${project.id}`, value: negotiationDraft.message, onChange: (event) => setNegotiationDrafts((drafts) => ({
              ...drafts,
              [project.id]: {
                ...negotiationDraft,
                message: event.target.value
              }
            })), className: "min-h-28", placeholder: "Explain your revised offer" })
          ] }),
          negotiationHistory.length ? /* @__PURE__ */ jsxs("div", { className: "max-h-40 overflow-y-auto rounded-lg border border-border p-3", children: [
            /* @__PURE__ */ jsx("h4", { className: "text-sm font-medium", children: "Offer history" }),
            /* @__PURE__ */ jsx("div", { className: "mt-3 space-y-3", children: negotiationHistory.map((negotiation) => /* @__PURE__ */ jsxs("div", { className: "rounded-md bg-muted/40 p-3 text-sm", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap justify-between gap-2 font-medium", children: [
                /* @__PURE__ */ jsxs("span", { children: [
                  formatMoney$1(negotiation.bidAmount ?? 0),
                  " /",
                  " ",
                  negotiation.duration || "Not set"
                ] }),
                /* @__PURE__ */ jsx("span", { className: "text-xs font-normal text-muted-foreground", children: formatDateTime$1(negotiation.createdAt) })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "mt-1 text-muted-foreground", children: negotiation.message })
            ] }, negotiation.id)) })
          ] }) : null,
          negotiationError ? /* @__PURE__ */ jsx("p", { className: "rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive", children: negotiationError }) : null
        ] }),
        /* @__PURE__ */ jsxs(DialogFooter, { children: [
          /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: () => setOpenNegotiationId(null), children: "Cancel" }),
          /* @__PURE__ */ jsxs(Button, { onClick: () => handleSendNegotiation(project), disabled: pendingNegotiationId === project.id, children: [
            /* @__PURE__ */ jsx(Handshake, { className: "h-4 w-4" }),
            pendingNegotiationId === project.id ? "Sending" : "Send offer"
          ] })
        ] })
      ] }) })
    ] }, project.id);
  }) });
}
function HireGrid({
  requests
}) {
  if (!requests.length) {
    return /* @__PURE__ */ jsx(EmptyState, { title: "No hire requests", description: "Direct client hire requests will appear here." });
  }
  return /* @__PURE__ */ jsx("div", { className: "grid gap-4 lg:grid-cols-2", children: requests.map((request) => /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-border bg-card p-5 shadow-soft", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2", children: [
      /* @__PURE__ */ jsx(Badge, { variant: "secondary", children: "Direct hire" }),
      /* @__PURE__ */ jsx(Badge, { variant: request.status === "accepted" ? "default" : request.status === "rejected" ? "destructive" : "outline", children: formatEnum$1(request.status) })
    ] }),
    /* @__PURE__ */ jsx("h2", { className: "mt-3 line-clamp-2 font-semibold", children: request.title }),
    /* @__PURE__ */ jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
      "Client: ",
      request.clientName || `Client ${request.clientId}`
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-4 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2", children: [
      /* @__PURE__ */ jsx(Info, { icon: Clock, label: "Sent", value: formatDateTime$1(request.createdAt) }),
      /* @__PURE__ */ jsx(Info, { icon: CalendarDays, label: "Updated", value: request.updatedAt ? formatDateTime$1(request.updatedAt) : "Not set" }),
      /* @__PURE__ */ jsx(Info, { icon: Briefcase, label: "Budget", value: formatMoney$1(request.totalAmount ?? request.budgetMax ?? request.budgetMin ?? 0) }),
      /* @__PURE__ */ jsx(Info, { icon: MapPin, label: "Deadline", value: request.deadline ? formatDate$1(request.deadline) : "Not set" })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "mt-3 line-clamp-3 text-sm text-muted-foreground", children: request.description || "No work description added." })
  ] }, request.contractId)) });
}
function ReviewSummary({
  project
}) {
  const router2 = useRouter();
  const [response, setResponse] = useState(project.reviewResponse || "");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  if (!project.reviewRating) {
    return /* @__PURE__ */ jsx("div", { className: "mt-4 rounded-lg border border-dashed border-border bg-muted/20 p-3 text-sm text-muted-foreground", children: project.reviewRequestedAt ? `Review requested ${formatDate$1(project.reviewRequestedAt)}.` : "Client review not submitted yet." });
  }
  async function handleSaveResponse() {
    const nextResponse = response.trim();
    if (!nextResponse) {
      setError("Write a response before saving.");
      return;
    }
    setIsSaving(true);
    setError(null);
    try {
      await saveReviewResponse({
        data: {
          trackingId: project.id,
          response: nextResponse
        }
      });
      toast.success("Review response saved.");
      await router2.invalidate();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Could not save review response.";
      setError(message);
      toast.error(message);
    } finally {
      setIsSaving(false);
    }
  }
  return /* @__PURE__ */ jsxs("div", { className: "mt-4 rounded-lg border border-border bg-muted/30 p-3", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2 text-sm font-medium", children: [
      /* @__PURE__ */ jsx(Star, { className: "h-4 w-4 fill-warning text-warning" }),
      /* @__PURE__ */ jsxs("span", { children: [
        project.reviewRating,
        "/5 client review"
      ] }),
      project.reviewCreatedAt ? /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: formatDate$1(project.reviewCreatedAt) }) : null
    ] }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: project.reviewComment || "Client left a rating without a written review." }),
    project.reviewResponse ? /* @__PURE__ */ jsxs("div", { className: "mt-3 rounded-lg border border-primary/20 bg-background p-3 text-sm", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2 font-medium", children: [
        /* @__PURE__ */ jsx(MessageSquare, { className: "h-4 w-4 text-primary" }),
        /* @__PURE__ */ jsx("span", { children: "Your response" }),
        project.reviewResponseAt ? /* @__PURE__ */ jsx("span", { className: "text-xs font-normal text-muted-foreground", children: formatDate$1(project.reviewResponseAt) }) : null
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-muted-foreground", children: project.reviewResponse })
    ] }) : null,
    /* @__PURE__ */ jsxs("div", { className: "mt-3 space-y-2", children: [
      /* @__PURE__ */ jsx(Textarea, { value: response, onChange: (event) => {
        setResponse(event.target.value);
        setError(null);
      }, maxLength: 1e3, rows: 3, placeholder: "Respond to this client review" }),
      error ? /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: error }) : null,
      /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx(Button, { size: "sm", onClick: handleSaveResponse, disabled: isSaving, children: isSaving ? "Saving..." : project.reviewResponse ? "Update response" : "Save response" }) })
    ] })
  ] });
}
function EmptyState({
  title,
  description
}) {
  return /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-dashed border-border bg-card p-10 text-center shadow-soft", children: [
    /* @__PURE__ */ jsx(Send, { className: "mx-auto h-8 w-8 text-muted-foreground" }),
    /* @__PURE__ */ jsx("h2", { className: "mt-3 font-semibold", children: title }),
    /* @__PURE__ */ jsx("p", { className: "mx-auto mt-1 max-w-md text-sm text-muted-foreground", children: description })
  ] });
}
function Info({
  icon: Icon,
  label,
  value
}) {
  return /* @__PURE__ */ jsxs("span", { className: "flex min-w-0 items-center gap-2", children: [
    /* @__PURE__ */ jsx(Icon, { className: "h-4 w-4 shrink-0" }),
    /* @__PURE__ */ jsxs("span", { className: "truncate", children: [
      /* @__PURE__ */ jsxs("span", { className: "text-foreground", children: [
        label,
        ":"
      ] }),
      " ",
      value
    ] })
  ] });
}
function getSectionTitle(section) {
  const titles = {
    projects: "Running projects",
    "project-requests": "Project requests",
    "hire-requests": "Hire requests",
    completed: "Completed projects",
    ratings: "Ratings & Client Reviews"
  };
  return titles[section] || "Professional stats";
}
function getSectionDescription(section) {
  const descriptions = {
    projects: "Active tracked jobs and accepted direct hires.",
    "project-requests": "Project requests you sent to clients.",
    "hire-requests": "Direct hire requests from clients.",
    completed: "Finished projects with review status.",
    ratings: "Client ratings and written reviews from completed projects."
  };
  return descriptions[section] || "Focused professional stats details.";
}
function formatEnum$1(value) {
  return value.toLowerCase().split("_").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
}
function formatDate$1(value) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(value));
}
function formatDateTime$1(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Not set";
  }
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit"
  }).format(date);
}
function getDurationWeeksValue(duration, fallbackDate) {
  const existingWeeks = parseWeeks(duration);
  if (existingWeeks) {
    return String(existingWeeks);
  }
  const fallbackWeeks = getWeeksUntil(fallbackDate);
  return fallbackWeeks ? String(fallbackWeeks) : "";
}
function formatWeeksDuration(value) {
  const weeks = Math.max(1, Math.round(Number(value) || 0));
  return weeks === 1 ? "1 week" : `${weeks} weeks`;
}
function parseWeeks(value) {
  if (!value) {
    return null;
  }
  const weekMatch = value.match(/(\d+(?:\.\d+)?)\s*weeks?/i);
  const anyNumberMatch = value.match(/\d+(?:\.\d+)?/);
  if (weekMatch || !value.toLowerCase().includes("until")) {
    const numericValue = Number((weekMatch || anyNumberMatch)?.[1] ?? anyNumberMatch?.[0]);
    return Number.isFinite(numericValue) && numericValue > 0 ? Math.max(1, Math.round(numericValue)) : null;
  }
  const untilDate = new Date(value.replace(/^until\s+/i, ""));
  if (Number.isNaN(untilDate.getTime())) {
    return null;
  }
  return Math.max(1, Math.ceil((untilDate.getTime() - Date.now()) / (7 * 24 * 60 * 60 * 1e3)));
}
function getWeeksUntil(value) {
  if (!value) {
    return null;
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return null;
  }
  return Math.max(1, Math.ceil((date.getTime() - Date.now()) / (7 * 24 * 60 * 60 * 1e3)));
}
function formatMoney$1(value) {
  return `$${value.toLocaleString()}`;
}
function isVisibleProjectRequest(project) {
  if (project.coverLetter === "Direct hire project started by the client.") {
    return false;
  }
  if (project.status === "ACCEPTED" && (project.trackingStatus === "ACTIVE" || project.trackingStatus === "COMPLETED")) {
    return false;
  }
  if (project.status === "DECLINED") {
    const rejectedAt = new Date(project.updatedAt || project.createdAt).getTime();
    if (!Number.isNaN(rejectedAt) && Date.now() - rejectedAt >= 24 * 60 * 60 * 1e3) {
      return false;
    }
  }
  return true;
}
function isExpiredRejectedHireRequest(request) {
  if (request.status !== "rejected") {
    return false;
  }
  const rejectedAt = new Date(request.updatedAt || request.createdAt).getTime();
  if (Number.isNaN(rejectedAt)) {
    return false;
  }
  return Date.now() - rejectedAt >= 24 * 60 * 60 * 1e3;
}
const Route$3 = Route$4;
const REQUIRED_PROJECT_MILESTONES = 5;
const getTrackingPageData = createServerFn({
  method: "GET"
}).inputValidator((trackingKey) => trackingKey).handler(createSsrRpc("e451185b765523e82bfb50e816caab6fdd07884d4e3887d63e531ff6649f30fe"));
const uploadProjectWork = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(createSsrRpc("f636a1fc0798a6c639b7a495c21195375d0683eda240bab05234d6ef15e816f5"));
const deleteUploadedWork = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(createSsrRpc("9e3e92a6c974eec47913ae5d84eadaf5914fdecd33993b0c2f00e1ad6de28151"));
const requestProjectRevision = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(createSsrRpc("cb2bb861c5599608c85d8e21f78d33d7b6c50c46f72d5fe6e5b875ff153bfa9c"));
const clearProjectRevision = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(createSsrRpc("1ab8beec04065a6b46a91078b57a799f049604ec51d771fb9c676749bc38a17c"));
const addProjectMilestone = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(createSsrRpc("84487b79c8c0dda0932e15f0b533c89810aacfc736af6087a50d35a8550d07f2"));
const changeMilestoneStatus = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(createSsrRpc("e700a94027d492715aa27d3f891c8366f2ed540f86df2000a5c1552ca6db7596"));
const removeProjectMilestone = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(createSsrRpc("bdfd373e0f5cc6529d7b2d94d214b1d0e952f0e8734a7226a92bd6dd1652568e"));
const submitFinalWork = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(createSsrRpc("8a6d72fdedf604409984b58a246992318228fc681185ded0c9486f2e1fcee1f1"));
const reviewFinalWork = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(createSsrRpc("c829c55c5ec41e871fc4af8350f0d80871ebfd62b94c1435073a57be85993dee"));
const rateProjectProfessional = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(createSsrRpc("80c5d0f5007def4b6d3b85805f512f4e7453a3d7ef5bc930f2cbab97f8977afc"));
const raiseProjectDispute = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(createSsrRpc("b317eff85cc91e7d65af4c84256c953471969d1ad85d0c37dbe07e790417e43e"));
const Route$2 = createFileRoute("/project-track/$trackingId")({
  loader: async ({
    location,
    params
  }) => {
    const result = await getTrackingPageData({
      data: params.trackingId
    });
    if (!result) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href
        }
      });
    }
    return result;
  },
  head: () => ({
    meta: [{
      title: "Track project - Servio"
    }]
  }),
  component: ProjectTrack
});
function ProjectTrack() {
  const {
    viewer,
    tracking
  } = useLoaderData({
    from: "/project-track/$trackingId"
  });
  const router2 = useRouter();
  const isProfessional = viewer.role === "PROFESSIONAL";
  const displayName = `${viewer.firstName} ${viewer.lastName}`.trim();
  const fileInputRef = useRef(null);
  const socketRef = useRef(null);
  const milestoneListRef = useRef(null);
  const [uploadFiles, setUploadFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [deletingUploadId, setDeletingUploadId] = useState(null);
  const [revisionNote, setRevisionNote] = useState("");
  const [isRequestingRevision, setIsRequestingRevision] = useState(false);
  const [revisionError, setRevisionError] = useState(null);
  const [clearingRevisionId, setClearingRevisionId] = useState(null);
  const [milestoneTitle, setMilestoneTitle] = useState("");
  const [milestoneDescription, setMilestoneDescription] = useState("");
  const [milestoneDueDate, setMilestoneDueDate] = useState("");
  const [milestoneError, setMilestoneError] = useState(null);
  const [isSavingMilestone, setIsSavingMilestone] = useState(false);
  const [updatingMilestoneId, setUpdatingMilestoneId] = useState(null);
  const [completionNote, setCompletionNote] = useState("");
  const [isSubmittingCompletion, setIsSubmittingCompletion] = useState(false);
  const [reviewingCompletionId, setReviewingCompletionId] = useState(null);
  const [reviewDraft, setReviewDraft] = useState(null);
  const [isSavingReview, setIsSavingReview] = useState(false);
  const [reviewError, setReviewError] = useState(null);
  const [disputeIssueType, setDisputeIssueType] = useState("WORK_QUALITY");
  const [disputePriority, setDisputePriority] = useState("MEDIUM");
  const [disputeMessage, setDisputeMessage] = useState("");
  const [disputeFiles, setDisputeFiles] = useState([]);
  const [isRaisingDispute, setIsRaisingDispute] = useState(false);
  const [disputeError, setDisputeError] = useState(null);
  const [currentTime, setCurrentTime] = useState(() => /* @__PURE__ */ new Date());
  useEffect(() => {
    const interval = window.setInterval(() => setCurrentTime(/* @__PURE__ */ new Date()), 6e4);
    return () => window.clearInterval(interval);
  }, []);
  useEffect(() => {
    if (!tracking) {
      return;
    }
    const socket = io(getSocketUrl(), {
      auth: {
        userId: viewer.id,
        role: viewer.role,
        name: displayName || viewer.email,
        avatarUrl: viewer.avatarUrl
      }
    });
    socketRef.current = socket;
    socket.emit("project:join", {
      trackingId: tracking.id
    });
    socket.on("project:activity", (payload) => {
      if (payload?.actorId !== viewer.id && payload?.trackingId === tracking.id) {
        void router2.invalidate();
      }
    });
    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [displayName, router2, tracking?.id, viewer.avatarUrl, viewer.email, viewer.id, viewer.role]);
  if (!tracking) {
    return /* @__PURE__ */ jsx(AppShell, { userName: displayName, userRole: isProfessional ? "Professional" : "Client", userAvatarUrl: viewer.avatarUrl, children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-2xl rounded-xl border border-border bg-card p-8 text-center shadow-soft", children: [
      /* @__PURE__ */ jsx(Briefcase, { className: "mx-auto h-10 w-10 text-muted-foreground" }),
      /* @__PURE__ */ jsx("h1", { className: "mt-4 text-2xl font-semibold", children: "No active project tracking" }),
      /* @__PURE__ */ jsx("p", { className: "mx-auto mt-2 max-w-md text-sm text-muted-foreground", children: "Tracking starts after the client accepts a professional request. Accept a request from Projects, then open Track project again." }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
        /* @__PURE__ */ jsx(Button, { asChild: true, children: /* @__PURE__ */ jsx(Link, { to: isProfessional ? "/professional-stats" : "/projects", children: isProfessional ? "Go to my stats" : "Go to projects" }) }),
        /* @__PURE__ */ jsx(Button, { asChild: true, variant: "outline", children: /* @__PURE__ */ jsx(Link, { to: isProfessional ? "/professional-messages" : "/messages", children: "Open messages" }) })
      ] })
    ] }) });
  }
  const activeTracking = tracking;
  const expectedWeeks = parseDurationWeeks(tracking.duration);
  const expectedDays = expectedWeeks ? expectedWeeks * 7 : null;
  const elapsedDays = getElapsedDays(tracking.acceptedAt, currentTime);
  const remainingDays = expectedDays == null ? null : Math.max(0, expectedDays - elapsedDays);
  const progress = expectedDays ? Math.min(100, Math.round(elapsedDays / expectedDays * 100)) : 0;
  const displayProgress = tracking.status === "COMPLETED" ? 100 : progress;
  const projectValue = tracking.bidAmount ?? 0;
  const scheduleStartInput = getDateInputValue(tracking.projectJobDate || tracking.acceptedAt);
  const scheduleEndInput = getDateInputValue(tracking.projectDeadline);
  const canStartProject = !scheduleStartInput || compareDateInputs(getDateInputValue(currentTime.toISOString()), scheduleStartInput) >= 0;
  const displayMilestones = tracking.milestones.slice(0, REQUIRED_PROJECT_MILESTONES);
  const nextMilestoneNumber = Math.min(tracking.milestones.length + 1, REQUIRED_PROJECT_MILESTONES);
  const isMilestonePlanComplete = tracking.milestones.length >= REQUIRED_PROJECT_MILESTONES;
  const requiredMilestoneAmount = getRequiredMilestoneAmount(projectValue, nextMilestoneNumber);
  const completedMilestoneCount = tracking.milestones.filter((milestone) => milestone.status === "PAID").length;
  const canSubmitFinalWork = completedMilestoneCount >= REQUIRED_PROJECT_MILESTONES;
  const milestonePaidAmount = tracking.milestones.filter((milestone) => milestone.status === "PAID").reduce((total, milestone) => total + (milestone.amount ?? 0), 0);
  const paidAmount = tracking.status === "COMPLETED" ? projectValue : Math.min(projectValue, milestonePaidAmount);
  const remainingAmount = Math.max(0, projectValue - paidAmount);
  const requestAttachments = getRequestAttachments(tracking.attachmentsJson);
  const openRevisionRequests = tracking.revisionRequests.filter((revision) => revision.status === "REQUESTED");
  const latestRevisionRequest = tracking.revisionRequests.at(-1) ?? null;
  const latestCompletionRequest = tracking.completionRequests.at(-1) ?? null;
  const finalChangesLockAt = latestCompletionRequest?.status === "APPROVED" ? new Date(new Date(latestCompletionRequest.updatedAt).getTime() + 864e5).toISOString() : null;
  const projectActivityRecipientId = isProfessional ? activeTracking.clientId : activeTracking.professionalId;
  function emitProjectActivity(title, description) {
    socketRef.current?.emit("project:activity", {
      trackingId: activeTracking.id,
      actorId: viewer.id,
      recipientId: projectActivityRecipientId,
      title,
      description,
      href: `/project-track/${activeTracking.id}`,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    });
  }
  async function handleWorkUpload(event) {
    event.preventDefault();
    if (!tracking) {
      return;
    }
    setIsUploading(true);
    try {
      await uploadProjectWork({
        data: {
          trackingId: tracking.id,
          files: uploadFiles
        }
      });
      setUploadFiles([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      toast.success("Work uploaded");
      emitProjectActivity("New work uploaded", `${displayName || "Professional"} uploaded work for ${tracking.projectTitle}.`);
      await router2.invalidate();
    } finally {
      setIsUploading(false);
    }
  }
  async function handleBrowseFiles(event) {
    const selectedFiles = Array.from(event.target.files ?? []);
    if (!selectedFiles.length) {
      return;
    }
    const loadedFiles = await Promise.all(selectedFiles.map((file) => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve({
          fileName: file.name,
          fileUrl: "",
          fileDataUrl: typeof reader.result === "string" ? reader.result : "",
          fileType: file.type || "application/octet-stream",
          fileSize: file.size
        });
      };
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    })));
    setUploadFiles((files) => [...files, ...loadedFiles]);
  }
  async function handleDisputeFiles(event) {
    const selectedFiles = Array.from(event.target.files ?? []);
    if (!selectedFiles.length) {
      return;
    }
    const loadedFiles = await Promise.all(selectedFiles.map((file) => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve({
          fileName: file.name,
          fileType: file.type || null,
          fileSize: file.size,
          fileUrl: typeof reader.result === "string" ? reader.result : null
        });
      };
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    })));
    setDisputeFiles((files) => [...files, ...loadedFiles]);
  }
  async function handleDeleteWorkUpload(uploadId) {
    setDeletingUploadId(uploadId);
    try {
      await deleteUploadedWork({
        data: {
          uploadId
        }
      });
      toast.success("Work file deleted");
      emitProjectActivity("Work file deleted", `${displayName || "Professional"} deleted a work file from ${activeTracking.projectTitle}.`);
      await router2.invalidate();
    } finally {
      setDeletingUploadId(null);
    }
  }
  async function handleRevisionRequest(event) {
    event.preventDefault();
    if (!tracking) {
      return;
    }
    if (revisionNote.trim().length < 5) {
      setRevisionError("Add a short revision note.");
      return;
    }
    setIsRequestingRevision(true);
    setRevisionError(null);
    try {
      await requestProjectRevision({
        data: {
          trackingId: activeTracking.id,
          note: revisionNote
        }
      });
      setRevisionNote("");
      toast.success("Revision requested");
      emitProjectActivity("Revision requested", `${displayName || "Client"} requested changes for ${activeTracking.projectTitle}.`);
      await router2.invalidate();
    } catch (error) {
      setRevisionError(error instanceof Error ? error.message : "Could not request revision.");
    } finally {
      setIsRequestingRevision(false);
    }
  }
  async function handleClearRevision(revisionId) {
    setClearingRevisionId(revisionId);
    try {
      await clearProjectRevision({
        data: {
          revisionId
        }
      });
      toast.success("Revision cleared");
      emitProjectActivity("Revision cleared", `${displayName || "Client"} cleared a revision request for ${activeTracking.projectTitle}.`);
      await router2.invalidate();
    } finally {
      setClearingRevisionId(null);
    }
  }
  async function handleAddMilestone(event) {
    event.preventDefault();
    if (!tracking) {
      return;
    }
    if (tracking.milestones.length >= REQUIRED_PROJECT_MILESTONES) {
      setMilestoneError("This project already has the required 5 milestones.");
      return;
    }
    const title = milestoneTitle.trim() || `Milestone ${nextMilestoneNumber}/${REQUIRED_PROJECT_MILESTONES}`;
    if (title.length < 3) {
      setMilestoneError("Add a milestone title.");
      return;
    }
    if (milestoneDueDate && scheduleStartInput && compareDateInputs(milestoneDueDate, scheduleStartInput) < 0) {
      setMilestoneError("Milestone due date cannot be before the project start date.");
      return;
    }
    if (milestoneDueDate && scheduleEndInput && compareDateInputs(milestoneDueDate, scheduleEndInput) > 0) {
      setMilestoneError("Milestone due date cannot be after the project deadline.");
      return;
    }
    setIsSavingMilestone(true);
    setMilestoneError(null);
    try {
      await addProjectMilestone({
        data: {
          trackingId: tracking.id,
          title,
          description: milestoneDescription || null,
          amount: requiredMilestoneAmount || null,
          dueDate: milestoneDueDate || null
        }
      });
      setMilestoneTitle("");
      setMilestoneDescription("");
      setMilestoneDueDate("");
      toast.success(`Milestone ${nextMilestoneNumber}/${REQUIRED_PROJECT_MILESTONES} added`);
      emitProjectActivity("Milestone added", `${displayName || "Client"} added "${title}" to ${tracking.projectTitle}.`);
      await router2.invalidate();
      window.requestAnimationFrame(() => milestoneListRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      }));
    } catch (error) {
      setMilestoneError(error instanceof Error ? error.message : "Could not add milestone.");
    } finally {
      setIsSavingMilestone(false);
    }
  }
  async function handleMilestoneStatus(milestoneId, status) {
    setUpdatingMilestoneId(milestoneId);
    const paidMilestoneCountAfterChange = activeTracking.milestones.filter((milestone) => milestone.id === milestoneId ? status === "PAID" : milestone.status === "PAID").length;
    const willCompleteProject = status === "PAID" && activeTracking.milestones.length >= REQUIRED_PROJECT_MILESTONES && paidMilestoneCountAfterChange >= REQUIRED_PROJECT_MILESTONES;
    try {
      await changeMilestoneStatus({
        data: {
          milestoneId,
          status
        }
      });
      if (willCompleteProject) {
        toast.success("Project completed");
        emitProjectActivity("Project completed", `${displayName || "Client"} completed all 5 milestones for ${activeTracking.projectTitle}.`);
      } else {
        toast.success(`Milestone ${formatMilestoneStatus(status).toLowerCase()}`);
        emitProjectActivity(`Milestone ${formatMilestoneStatus(status).toLowerCase()}`, `${displayName || "Someone"} updated a milestone in ${activeTracking.projectTitle}.`);
      }
      await router2.invalidate();
    } finally {
      setUpdatingMilestoneId(null);
    }
  }
  async function handleDeleteMilestone(milestoneId) {
    setUpdatingMilestoneId(milestoneId);
    try {
      await removeProjectMilestone({
        data: {
          milestoneId
        }
      });
      toast.success("Milestone deleted");
      emitProjectActivity("Milestone deleted", `${displayName || "Client"} deleted a milestone from ${activeTracking.projectTitle}.`);
      await router2.invalidate();
      window.requestAnimationFrame(() => milestoneListRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      }));
    } finally {
      setUpdatingMilestoneId(null);
    }
  }
  async function handleSubmitCompletion(event) {
    event.preventDefault();
    if (!tracking) {
      return;
    }
    if (!canSubmitFinalWork) {
      toast.error(`Complete all ${REQUIRED_PROJECT_MILESTONES} milestones before final submission.`);
      return;
    }
    setIsSubmittingCompletion(true);
    try {
      await submitFinalWork({
        data: {
          trackingId: tracking.id,
          note: completionNote || null
        }
      });
      setCompletionNote("");
      toast.success("Final work submitted");
      emitProjectActivity("Final work submitted", `${displayName || "Professional"} submitted final work for ${tracking.projectTitle}.`);
      await router2.invalidate();
    } finally {
      setIsSubmittingCompletion(false);
    }
  }
  async function handleReviewCompletion(completionId, status) {
    setReviewingCompletionId(completionId);
    try {
      await reviewFinalWork({
        data: {
          completionId,
          status
        }
      });
      toast.success(status === "APPROVED" ? "Project completed" : "Revision requested");
      emitProjectActivity(status === "APPROVED" ? "Project completed" : "Final revision requested", `${displayName || "Client"} ${status === "APPROVED" ? "approved" : "requested changes to"} final work for ${activeTracking.projectTitle}.`);
      await router2.invalidate();
    } finally {
      setReviewingCompletionId(null);
    }
  }
  async function handleSaveProjectReview() {
    if (!tracking) {
      return;
    }
    const draft = reviewDraft ?? {
      rating: tracking.reviewRating ?? 5,
      comment: tracking.reviewComment ?? ""
    };
    setIsSavingReview(true);
    setReviewError(null);
    try {
      await rateProjectProfessional({
        data: {
          trackingId: tracking.id,
          rating: draft.rating,
          comment: draft.comment || null
        }
      });
      await router2.invalidate();
    } catch (error) {
      setReviewError(error instanceof Error ? error.message : "Could not save review.");
    } finally {
      setIsSavingReview(false);
    }
  }
  async function handleRaiseDispute(event) {
    event.preventDefault();
    if (!tracking) {
      return;
    }
    if (disputeMessage.trim().length < 10) {
      setDisputeError("Add at least 10 characters describing the issue.");
      return;
    }
    setIsRaisingDispute(true);
    setDisputeError(null);
    try {
      await raiseProjectDispute({
        data: {
          trackingId: tracking.id,
          issueType: disputeIssueType,
          priority: disputePriority,
          message: disputeMessage,
          attachments: disputeFiles
        }
      });
      setDisputeIssueType("WORK_QUALITY");
      setDisputePriority("MEDIUM");
      setDisputeMessage("");
      setDisputeFiles([]);
      toast.success("Dispute raised.");
      emitProjectActivity("Dispute raised", `${displayName || "Someone"} raised a dispute for ${tracking.projectTitle}.`);
      await router2.invalidate();
    } catch (error) {
      setDisputeError(error instanceof Error ? error.message : "Could not raise dispute.");
    } finally {
      setIsRaisingDispute(false);
    }
  }
  return /* @__PURE__ */ jsxs(AppShell, { userName: displayName, userRole: isProfessional ? "Professional" : "Client", userAvatarUrl: viewer.avatarUrl, children: [
    /* @__PURE__ */ jsx("div", { className: "mb-5", children: /* @__PURE__ */ jsxs(Link, { to: isProfessional ? "/professional-stats" : "/projects", className: "text-sm text-primary hover:underline", children: [
      "Back to ",
      isProfessional ? "my stats" : "projects"
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-end", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2", children: [
          /* @__PURE__ */ jsx(Badge, { variant: "secondary", children: tracking.projectCategory }),
          /* @__PURE__ */ jsx(Badge, { children: formatEnum(tracking.status) }),
          /* @__PURE__ */ jsxs(Badge, { variant: "outline", children: [
            "Request ",
            formatEnum(tracking.requestStatus)
          ] })
        ] }),
        /* @__PURE__ */ jsx("h1", { className: "mt-3 text-2xl font-semibold tracking-tight", children: tracking.projectTitle }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: isProfessional ? `Client: ${tracking.clientName}` : `Professional: ${tracking.professionalName}` })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: /* @__PURE__ */ jsx(Button, { asChild: true, children: /* @__PURE__ */ jsxs(Link, { to: isProfessional ? "/professional-messages" : "/messages", children: [
        /* @__PURE__ */ jsx(MessageSquare, { className: "h-4 w-4" }),
        "Message"
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: [
      /* @__PURE__ */ jsx(Stat, { icon: DollarSign, label: "Project value", value: formatMoney(projectValue) }),
      /* @__PURE__ */ jsx(Stat, { icon: Clock, label: "Expected duration", value: tracking.duration || "Not set" }),
      /* @__PURE__ */ jsx(Stat, { icon: Timer, label: "Time tracked", value: `${elapsedDays} day${elapsedDays === 1 ? "" : "s"}` }),
      /* @__PURE__ */ jsx(Stat, { icon: DollarSign, label: "Remaining money", value: formatMoney(remainingAmount) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 grid gap-6 lg:grid-cols-[1fr_360px]", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("section", { className: "rounded-xl border border-border bg-card p-6 shadow-soft", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-between gap-3 sm:flex-row sm:items-start", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold", children: "Project timeline" }),
              /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Request, acceptance, tracking, work, and payment activity in one place." })
            ] }),
            /* @__PURE__ */ jsxs(Badge, { variant: "secondary", children: [
              "Tracking #",
              tracking.id
            ] })
          ] }),
          /* @__PURE__ */ jsx(ProjectTimeline, { trackingStatus: tracking.status, requestStatus: tracking.requestStatus, requestCreatedAt: tracking.requestCreatedAt, requestUpdatedAt: tracking.requestUpdatedAt, acceptedAt: tracking.acceptedAt, progress, remainingDays, workUploads: tracking.workUploads, revisionRequests: tracking.revisionRequests, completionRequests: tracking.completionRequests })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "rounded-xl border border-border bg-card p-6 shadow-soft", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-between gap-3 sm:flex-row sm:items-start", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold", children: "Milestones" }),
              /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Exactly 5 milestones are required. Project money is divided automatically." })
            ] }),
            /* @__PURE__ */ jsxs(Badge, { variant: isMilestonePlanComplete ? "default" : "secondary", children: [
              Math.min(tracking.milestones.length, REQUIRED_PROJECT_MILESTONES),
              "/",
              REQUIRED_PROJECT_MILESTONES,
              " milestones"
            ] })
          ] }),
          !isProfessional && !isMilestonePlanComplete ? /* @__PURE__ */ jsx(MilestoneForm, { milestoneNumber: nextMilestoneNumber, requiredCount: REQUIRED_PROJECT_MILESTONES, title: milestoneTitle, description: milestoneDescription, amountLabel: formatMoney(requiredMilestoneAmount), dueDate: milestoneDueDate, minDate: scheduleStartInput || void 0, maxDate: scheduleEndInput || void 0, error: milestoneError, isSaving: isSavingMilestone, onTitleChange: setMilestoneTitle, onDescriptionChange: setMilestoneDescription, onDueDateChange: setMilestoneDueDate, onSubmit: handleAddMilestone }) : null,
          /* @__PURE__ */ jsx("div", { ref: milestoneListRef, children: /* @__PURE__ */ jsx(MilestoneList, { milestones: displayMilestones, requiredCount: REQUIRED_PROJECT_MILESTONES, isProfessional, canStartProject, projectStartLabel: formatScheduleDate(tracking.projectJobDate || tracking.acceptedAt), updatingMilestoneId, onStatusChange: handleMilestoneStatus, onDelete: handleDeleteMilestone }) })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "rounded-xl border border-border bg-card p-6 shadow-soft", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-between gap-3 sm:flex-row sm:items-start", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold", children: "Uploaded work" }),
                !isProfessional && tracking.workUploads.length ? /* @__PURE__ */ jsxs("span", { className: "relative grid h-8 w-8 place-items-center rounded-full bg-primary/10 text-primary", children: [
                  /* @__PURE__ */ jsx("span", { className: "absolute h-8 w-8 animate-ping rounded-full bg-primary/20" }),
                  /* @__PURE__ */ jsx(Bell, { className: "relative h-4 w-4" })
                ] }) : null
              ] }),
              /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: isProfessional ? "Files you upload here are visible to the client." : tracking.workUploads.length ? "New work files are available. Open them below." : "Files uploaded by the professional will appear here." })
            ] }),
            /* @__PURE__ */ jsxs(Badge, { variant: !isProfessional && tracking.workUploads.length ? "default" : "secondary", children: [
              tracking.workUploads.length,
              " files"
            ] })
          ] }),
          /* @__PURE__ */ jsx(WorkFiles, { uploads: tracking.workUploads, isProfessional, deletingUploadId, onDelete: handleDeleteWorkUpload }),
          !isProfessional ? /* @__PURE__ */ jsx(RevisionRequestForm, { canRequest: tracking.status === "ACTIVE", hasUploadedWork: tracking.workUploads.length > 0, note: revisionNote, error: revisionError, isSubmitting: isRequestingRevision, openRevisionCount: openRevisionRequests.length, onNoteChange: setRevisionNote, onSubmit: handleRevisionRequest }) : null
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "rounded-xl border border-border bg-card p-6 shadow-soft", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-between gap-3 sm:flex-row sm:items-start", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold", children: "Project details" }),
              /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Saved job data and accepted proposal details from the database." })
            ] }),
            /* @__PURE__ */ jsxs(Badge, { variant: tracking.projectUrgency === "HIGH" ? "destructive" : "outline", children: [
              formatEnum(tracking.projectUrgency),
              " urgency"
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-5 whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground", children: tracking.projectDescription }),
          /* @__PURE__ */ jsxs("div", { className: "mt-5 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2", children: [
            /* @__PURE__ */ jsx(InfoLine, { icon: DollarSign, text: `Posted budget ${formatBudget(tracking.projectBudgetMin, tracking.projectBudgetMax, tracking.projectTimingType ?? "FIXED")}` }),
            /* @__PURE__ */ jsx(InfoLine, { icon: CalendarDays, text: `Start date ${formatScheduleDate(tracking.projectJobDate || tracking.acceptedAt)}` }),
            /* @__PURE__ */ jsx(InfoLine, { icon: CalendarDays, text: `End date ${formatScheduleDate(tracking.projectDeadline ?? void 0)}` }),
            /* @__PURE__ */ jsx(InfoLine, { icon: Briefcase, text: formatEnum(tracking.projectWorkMode) }),
            /* @__PURE__ */ jsx(InfoLine, { icon: MapPin, text: tracking.projectLocationLabel || "No location label" }),
            /* @__PURE__ */ jsx(InfoLine, { icon: MapPin, text: tracking.projectLocationAddress || "Remote or no location saved", wide: true })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "rounded-xl border border-border bg-card p-6 shadow-soft", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-between gap-3 sm:flex-row sm:items-center", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold", children: tracking.status === "COMPLETED" ? "Work completed" : "Work and time" }),
              /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: tracking.status === "COMPLETED" ? "The client accepted the finished work." : "Shows how much time passed after the client accepted this work." })
            ] }),
            /* @__PURE__ */ jsx(Badge, { variant: "outline", children: tracking.status === "COMPLETED" ? "100% complete" : `${progress}% time used` })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-5 h-2 overflow-hidden rounded-full bg-muted", children: /* @__PURE__ */ jsx("div", { className: "h-full rounded-full bg-primary", style: {
            width: `${displayProgress}%`
          } }) }),
          /* @__PURE__ */ jsxs("div", { className: "mt-5 grid gap-4 md:grid-cols-3", children: [
            /* @__PURE__ */ jsx(ProgressBox, { label: "Start date", value: formatScheduleDate(tracking.projectJobDate || tracking.acceptedAt) }),
            /* @__PURE__ */ jsx(ProgressBox, { label: "End date", value: formatScheduleDate(tracking.projectDeadline) }),
            /* @__PURE__ */ jsx(ProgressBox, { label: tracking.status === "COMPLETED" ? "Completed in" : "Days used", value: `${elapsedDays} day${elapsedDays === 1 ? "" : "s"}` })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "rounded-xl border border-border bg-card p-6 shadow-soft", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold", children: "Money" }),
          /* @__PURE__ */ jsxs("div", { className: "mt-5 grid gap-4 md:grid-cols-3", children: [
            /* @__PURE__ */ jsx(ProgressBox, { label: "Accepted bid", value: formatMoney(projectValue) }),
            /* @__PURE__ */ jsx(ProgressBox, { label: "Paid amount", value: formatMoney(paidAmount) }),
            /* @__PURE__ */ jsx(ProgressBox, { label: "Remaining amount", value: formatMoney(remainingAmount) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "rounded-xl border border-border bg-card p-6 shadow-soft", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-between gap-3 sm:flex-row sm:items-start", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold", children: "Proposal details" }),
              /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "The accepted request from the professional." })
            ] }),
            /* @__PURE__ */ jsxs(Badge, { variant: "outline", children: [
              "Sent ",
              formatDateTime(tracking.requestCreatedAt)
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground", children: tracking.coverLetter }),
          /* @__PURE__ */ jsxs("div", { className: "mt-5 grid gap-4 md:grid-cols-2", children: [
            /* @__PURE__ */ jsx(ProgressBox, { label: "Professional bid", value: tracking.bidAmount ? formatMoney(tracking.bidAmount) : "Not set" }),
            /* @__PURE__ */ jsx(ProgressBox, { label: "Proposed duration", value: tracking.duration || "Not set" })
          ] }),
          requestAttachments.length ? /* @__PURE__ */ jsxs("div", { className: "mt-5", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-sm font-medium", children: "Attached work samples" }),
            /* @__PURE__ */ jsx("div", { className: "mt-3 grid gap-3 md:grid-cols-2", children: requestAttachments.map((attachment) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 rounded-lg border border-border p-3", children: [
              /* @__PURE__ */ jsx(FileText, { className: "h-4 w-4 shrink-0 text-muted-foreground" }),
              /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsx("p", { className: "truncate text-sm font-medium", children: attachment.fileName }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: formatFileSize(attachment.fileSize) })
              ] })
            ] }, attachment.fileName)) })
          ] }) : null
        ] })
      ] }),
      /* @__PURE__ */ jsxs("aside", { className: "space-y-6", children: [
        /* @__PURE__ */ jsx(CompletionPanel, { isProfessional, trackingStatus: tracking.status, latestCompletion: latestCompletionRequest, completedMilestoneCount, requiredMilestoneCount: REQUIRED_PROJECT_MILESTONES, canSubmitFinalWork, note: completionNote, isSubmitting: isSubmittingCompletion, reviewingCompletionId, onNoteChange: setCompletionNote, onSubmit: handleSubmitCompletion, onReview: handleReviewCompletion }),
        /* @__PURE__ */ jsx(DisputePanel, { disputes: tracking.disputes, issueType: disputeIssueType, priority: disputePriority, message: disputeMessage, files: disputeFiles, error: disputeError, isSubmitting: isRaisingDispute, onIssueTypeChange: setDisputeIssueType, onPriorityChange: setDisputePriority, onMessageChange: setDisputeMessage, onFilesChange: handleDisputeFiles, onRemoveFile: (index) => setDisputeFiles((files) => files.filter((_, fileIndex) => fileIndex !== index)), onSubmit: handleRaiseDispute }),
        !isProfessional && tracking.status === "COMPLETED" ? /* @__PURE__ */ jsx(ProjectReviewPanel, { professionalName: tracking.professionalName, reviewRating: tracking.reviewRating, reviewComment: tracking.reviewComment, reviewCreatedAt: tracking.reviewCreatedAt, reviewRequestedAt: tracking.reviewRequestedAt, reviewRequestNote: tracking.reviewRequestNote, draft: reviewDraft ?? {
          rating: tracking.reviewRating ?? 5,
          comment: tracking.reviewComment ?? ""
        }, isSaving: isSavingReview, error: reviewError, onDraftChange: setReviewDraft, onSave: handleSaveProjectReview }) : null,
        isProfessional ? /* @__PURE__ */ jsxs("section", { className: "rounded-xl border border-border bg-card p-6 shadow-soft", children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-start justify-between gap-3", children: /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "font-semibold", children: "Upload your work" }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: tracking.status === "COMPLETED" ? "This project is completed. Uploaded work is now shown as project details." : "Upload files for the client." })
          ] }) }),
          tracking.status === "COMPLETED" ? /* @__PURE__ */ jsxs("div", { className: "mt-5 rounded-lg border border-border bg-muted/30 p-4 text-sm text-muted-foreground", children: [
            "Project changes are locked after 24 hours from finish. After that, you cannot upload documents or change work; this page remains available for details only.",
            finalChangesLockAt ? /* @__PURE__ */ jsxs("span", { className: "mt-2 block text-xs", children: [
              "Lock time: ",
              formatDateTime(finalChangesLockAt)
            ] }) : null
          ] }) : /* @__PURE__ */ jsxs("form", { className: "mt-5 space-y-4", onSubmit: handleWorkUpload, children: [
            openRevisionRequests.length ? /* @__PURE__ */ jsx("div", { className: "rounded-lg border border-warning/40 bg-warning/10 p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsx(RotateCcw, { className: "mt-0.5 h-4 w-4 shrink-0 text-warning-foreground" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold", children: "Revision requested" }),
                /* @__PURE__ */ jsx("p", { className: "mt-1 whitespace-pre-wrap text-sm text-muted-foreground", children: openRevisionRequests.at(-1)?.note }),
                /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs text-muted-foreground", children: "Upload updated work to mark this revision as addressed." })
              ] })
            ] }) }) : latestRevisionRequest ? /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-border bg-muted/30 p-4 text-sm text-muted-foreground", children: [
              "Last revision request was addressed",
              " ",
              formatDateTime(latestRevisionRequest.updatedAt),
              "."
            ] }) : null,
            /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-sm font-medium", children: "Files" }),
                /* @__PURE__ */ jsxs(Button, { type: "button", size: "sm", variant: "outline", onClick: () => fileInputRef.current?.click(), children: [
                  /* @__PURE__ */ jsx(Upload, { className: "h-4 w-4" }),
                  "Browse"
                ] })
              ] }),
              /* @__PURE__ */ jsx("input", { ref: fileInputRef, type: "file", multiple: true, className: "hidden", onChange: handleBrowseFiles }),
              uploadFiles.map((file, index) => /* @__PURE__ */ jsxs("div", { className: "flex min-w-0 items-center justify-between gap-2 rounded-lg border border-border p-3", children: [
                /* @__PURE__ */ jsxs("span", { className: "min-w-0 flex-1 truncate text-sm text-muted-foreground", children: [
                  file.fileName,
                  /* @__PURE__ */ jsxs("span", { className: "ml-1 text-xs", children: [
                    "(",
                    formatFileSize(file.fileSize),
                    ")"
                  ] })
                ] }),
                /* @__PURE__ */ jsx(Button, { type: "button", size: "sm", variant: "outline", onClick: () => setUploadFiles((files) => files.filter((_, itemIndex) => itemIndex !== index)), children: "Remove" })
              ] }, `${file.fileName}-${index}`)),
              !uploadFiles.length ? /* @__PURE__ */ jsx("div", { className: "rounded-lg border border-dashed border-border bg-muted/30 p-4 text-sm text-muted-foreground", children: "Choose one or more files from your computer." }) : null
            ] }),
            /* @__PURE__ */ jsxs(Button, { type: "submit", className: "w-full", disabled: isUploading || !uploadFiles.length, children: [
              /* @__PURE__ */ jsx(Upload, { className: "h-4 w-4" }),
              isUploading ? "Uploading" : "Upload work"
            ] })
          ] })
        ] }) : null,
        /* @__PURE__ */ jsx(RevisionHistory, { revisions: tracking.revisionRequests, isProfessional, clearingRevisionId, onClear: handleClearRevision }),
        /* @__PURE__ */ jsxs("section", { className: "rounded-xl border border-border bg-card p-6 shadow-soft", children: [
          /* @__PURE__ */ jsx("h2", { className: "font-semibold", children: "Professional working" }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("img", { src: tracking.professionalAvatarUrl || `https://i.pravatar.cc/100?u=tracking-pro-${tracking.professionalId}`, alt: tracking.professionalName, className: "h-12 w-12 rounded-lg object-cover" }),
            /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsx("p", { className: "truncate font-medium", children: tracking.professionalName }),
              /* @__PURE__ */ jsx("p", { className: "truncate text-sm text-muted-foreground", children: tracking.professionalCategory || "Professional" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 space-y-2 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsx(InfoLine, { icon: UserRound, text: tracking.professionalEmail }),
            /* @__PURE__ */ jsx(InfoLine, { icon: CheckCircle2, text: `Accepted ${formatDate(tracking.acceptedAt)}` })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "rounded-xl border border-border bg-card p-6 shadow-soft", children: [
          /* @__PURE__ */ jsx("h2", { className: "font-semibold", children: "Client" }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("img", { src: tracking.clientAvatarUrl || `https://i.pravatar.cc/100?u=tracking-client-${tracking.clientId}`, alt: tracking.clientName, className: "h-12 w-12 rounded-lg object-cover" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "font-medium", children: tracking.clientName }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Project owner" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "rounded-xl border border-border bg-card p-6 shadow-soft", children: [
          /* @__PURE__ */ jsx("h2", { className: "font-semibold", children: "Next steps" }),
          /* @__PURE__ */ jsx("div", { className: "mt-4 space-y-3 text-sm text-muted-foreground", children: tracking.status === "COMPLETED" ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(InfoLine, { icon: CheckCircle2, text: "Project finished and accepted" }),
            /* @__PURE__ */ jsx(InfoLine, { icon: FileText, text: finalChangesLockAt ? `Document upload and changes lock after ${formatDateTime(finalChangesLockAt)}` : "After 24 hours, uploads and changes are locked" }),
            /* @__PURE__ */ jsx(InfoLine, { icon: FileText, text: "This page will show project details only" })
          ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(InfoLine, { icon: FileText, text: "Share work updates in messages" }),
            /* @__PURE__ */ jsx(InfoLine, { icon: CheckCircle2, text: "Client reviews delivered work" }),
            /* @__PURE__ */ jsx(InfoLine, { icon: DollarSign, text: "Release remaining payment after completion" })
          ] }) })
        ] })
      ] })
    ] })
  ] });
}
function ProjectTimeline({
  trackingStatus,
  requestStatus,
  requestCreatedAt,
  requestUpdatedAt,
  acceptedAt,
  progress,
  remainingDays,
  workUploads,
  revisionRequests,
  completionRequests
}) {
  const latestUpload = workUploads.at(-1);
  const latestRevision = revisionRequests.at(-1);
  const latestCompletion = completionRequests.at(-1);
  const timelineItems = [{
    label: "Request sent",
    description: "The professional sent the bid, duration, cover note, and any work samples.",
    time: formatDateTime(requestCreatedAt),
    state: "complete",
    icon: Send
  }, {
    label: requestStatus === "ACCEPTED" ? "Project start" : formatEnum(requestStatus),
    description: "The client accepted the request and project tracking uses the scheduled start date.",
    time: formatScheduleDate(acceptedAt || requestUpdatedAt),
    state: "complete",
    icon: CheckCircle2
  }, {
    label: "Project in progress",
    description: remainingDays == null ? `${progress}% of the tracked estimate is used.` : `${progress}% of the tracked estimate is used, with ${remainingDays} day${remainingDays === 1 ? "" : "s"} remaining.`,
    time: formatEnum(trackingStatus),
    state: trackingStatus === "ACTIVE" ? "current" : "complete",
    icon: Timer
  }, {
    label: "Messages and files",
    description: latestUpload ? `Latest uploaded file: ${latestUpload.fileName || latestUpload.title}.` : "Use messages to share updates, proofs, questions, and delivery notes.",
    time: latestUpload ? formatDateTime(latestUpload.createdAt) : "Ongoing",
    state: trackingStatus === "ACTIVE" ? "current" : "complete",
    icon: MessageSquare
  }, {
    label: latestRevision ? "Revision requested" : "Revision review",
    description: latestRevision ? latestRevision.note : "If the uploaded work needs changes, the client can request a revision.",
    time: latestRevision ? formatDateTime(latestRevision.createdAt) : "Optional",
    state: latestRevision ? latestRevision.status === "REQUESTED" ? "current" : "complete" : "upcoming",
    icon: RotateCcw
  }, {
    label: trackingStatus === "COMPLETED" ? "Project completed" : latestCompletion ? "Final work submitted" : "Review and payment",
    description: trackingStatus === "COMPLETED" ? "Client approved the final work." : latestCompletion ? latestCompletion.note || "Professional marked the project finished for client review." : "Final review and remaining payment happen after delivery.",
    time: trackingStatus === "COMPLETED" ? formatDateTime(latestCompletion?.updatedAt || latestCompletion?.submittedAt || acceptedAt) : latestCompletion ? formatDateTime(latestCompletion.submittedAt) : "Upcoming",
    state: trackingStatus === "COMPLETED" ? "complete" : latestCompletion ? "current" : "upcoming",
    icon: ReceiptText
  }];
  return /* @__PURE__ */ jsx("ol", { className: "mt-5 space-y-5", children: timelineItems.map((item, index) => /* @__PURE__ */ jsxs("li", { className: "relative flex gap-4", children: [
    index < timelineItems.length - 1 ? /* @__PURE__ */ jsx("span", { className: "absolute left-5 top-10 h-[calc(100%+0.25rem)] w-px bg-border" }) : null,
    /* @__PURE__ */ jsx("span", { className: `relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border ${item.state === "complete" ? "border-primary bg-primary text-primary-foreground" : item.state === "current" ? "border-primary bg-card text-primary" : "border-border bg-card text-muted-foreground"}`, children: /* @__PURE__ */ jsx(item.icon, { className: "h-4 w-4" }) }),
    /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1 rounded-lg border border-border p-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-medium", children: item.label }),
        /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: item.time })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: item.description })
    ] })
  ] }, item.label)) });
}
function CompletionPanel({
  isProfessional,
  trackingStatus,
  latestCompletion,
  completedMilestoneCount,
  requiredMilestoneCount,
  canSubmitFinalWork,
  note,
  isSubmitting,
  reviewingCompletionId,
  onNoteChange,
  onSubmit,
  onReview
}) {
  const pendingClientReview = latestCompletion?.status === "SUBMITTED";
  const remainingMilestones = Math.max(0, requiredMilestoneCount - completedMilestoneCount);
  let description = "Submit and review final project completion.";
  if (trackingStatus === "COMPLETED") {
    description = "This project is completed.";
  } else if (!isProfessional && pendingClientReview) {
    description = "Professional marked this work finished. Review and accept it or request changes.";
  } else if (isProfessional && !canSubmitFinalWork) {
    description = `Final submission unlocks after ${requiredMilestoneCount} completed milestones.`;
  }
  return /* @__PURE__ */ jsxs("section", { className: "rounded-xl border border-border bg-card p-6 shadow-soft", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "font-semibold", children: !isProfessional && pendingClientReview ? "Accept work request" : "Final work" }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: description })
      ] }),
      /* @__PURE__ */ jsx(Badge, { variant: trackingStatus === "COMPLETED" ? "default" : "outline", children: trackingStatus === "COMPLETED" ? "Completed" : latestCompletion ? formatEnum(latestCompletion.status) : "Open" })
    ] }),
    latestCompletion ? /* @__PURE__ */ jsxs("div", { className: "mt-4 rounded-lg border border-border bg-muted/20 p-3", children: [
      /* @__PURE__ */ jsxs("p", { className: "text-sm font-medium", children: [
        "Submitted ",
        formatDateTime(latestCompletion.submittedAt)
      ] }),
      latestCompletion.note ? /* @__PURE__ */ jsx("p", { className: "mt-2 whitespace-pre-wrap text-sm text-muted-foreground", children: latestCompletion.note }) : null
    ] }) : null,
    isProfessional && trackingStatus !== "COMPLETED" && !canSubmitFinalWork ? /* @__PURE__ */ jsxs("div", { className: "mt-4 rounded-lg border border-dashed border-border bg-muted/20 p-3", children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", children: "Final submission locked" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: remainingMilestones === 1 ? "Complete 1 more milestone to send final submission." : `Complete ${remainingMilestones} more milestones to send final submission.` }),
      /* @__PURE__ */ jsxs(Badge, { variant: "secondary", className: "mt-3", children: [
        completedMilestoneCount,
        "/",
        requiredMilestoneCount,
        " completed"
      ] })
    ] }) : null,
    isProfessional && trackingStatus !== "COMPLETED" && canSubmitFinalWork ? /* @__PURE__ */ jsxs("form", { className: "mt-4 space-y-3", onSubmit, children: [
      /* @__PURE__ */ jsx("textarea", { value: note, onChange: (event) => onNoteChange(event.target.value), placeholder: "Final note for the client", className: "min-h-24 w-full resize-y rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" }),
      /* @__PURE__ */ jsxs(Button, { type: "submit", className: "w-full", disabled: isSubmitting || pendingClientReview, children: [
        /* @__PURE__ */ jsx(CheckCircle2, { className: "h-4 w-4" }),
        pendingClientReview ? "Accept request sent" : isSubmitting ? "Submitting" : "Send accept work request"
      ] })
    ] }) : null,
    !isProfessional && pendingClientReview ? /* @__PURE__ */ jsxs("div", { className: "mt-4 flex flex-wrap gap-2", children: [
      /* @__PURE__ */ jsxs(Button, { onClick: () => onReview(latestCompletion.id, "APPROVED"), disabled: reviewingCompletionId !== null, children: [
        /* @__PURE__ */ jsx(CheckCircle2, { className: "h-4 w-4" }),
        "Accept work"
      ] }),
      /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: () => onReview(latestCompletion.id, "REVISION_REQUESTED"), disabled: reviewingCompletionId !== null, children: "Request revision" })
    ] }) : null
  ] });
}
function DisputePanel({
  disputes,
  issueType,
  priority,
  message,
  files,
  error,
  isSubmitting,
  onIssueTypeChange,
  onPriorityChange,
  onMessageChange,
  onFilesChange,
  onRemoveFile,
  onSubmit
}) {
  const latestDispute = disputes.at(-1) ?? null;
  return /* @__PURE__ */ jsxs("section", { className: "rounded-xl border border-border bg-card p-6 shadow-soft", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "font-semibold", children: "Report issue" }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Raise a dispute for payment, delivery, files, deadlines, or communication." })
      ] }),
      /* @__PURE__ */ jsx(Badge, { variant: latestDispute?.status === "OPEN" ? "destructive" : "outline", children: latestDispute ? formatDisputeStatus(latestDispute.status) : "No disputes" })
    ] }),
    /* @__PURE__ */ jsxs("form", { className: "mt-4 space-y-3", onSubmit, children: [
      /* @__PURE__ */ jsxs("div", { className: "grid gap-3 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxs("label", { className: "text-sm", children: [
          /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Issue type" }),
          /* @__PURE__ */ jsxs("select", { value: issueType, onChange: (event) => onIssueTypeChange(event.target.value), className: "mt-1 h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20", children: [
            /* @__PURE__ */ jsx("option", { value: "PAYMENT", children: "Payment issue" }),
            /* @__PURE__ */ jsx("option", { value: "WORK_QUALITY", children: "Work quality" }),
            /* @__PURE__ */ jsx("option", { value: "DEADLINE_DELAY", children: "Deadline delay" }),
            /* @__PURE__ */ jsx("option", { value: "COMMUNICATION", children: "Communication" }),
            /* @__PURE__ */ jsx("option", { value: "FILE_PROBLEM", children: "File problem" }),
            /* @__PURE__ */ jsx("option", { value: "OTHER", children: "Other" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("label", { className: "text-sm", children: [
          /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Priority" }),
          /* @__PURE__ */ jsxs("select", { value: priority, onChange: (event) => onPriorityChange(event.target.value), className: "mt-1 h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20", children: [
            /* @__PURE__ */ jsx("option", { value: "LOW", children: "Low" }),
            /* @__PURE__ */ jsx("option", { value: "MEDIUM", children: "Medium" }),
            /* @__PURE__ */ jsx("option", { value: "HIGH", children: "High" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("textarea", { value: message, onChange: (event) => onMessageChange(event.target.value), placeholder: "Explain what happened...", className: "min-h-28 w-full resize-y rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-dashed border-border bg-muted/20 p-3", children: [
        /* @__PURE__ */ jsxs("label", { className: "flex cursor-pointer items-center justify-center gap-2 text-sm font-medium text-primary", children: [
          /* @__PURE__ */ jsx(Upload, { className: "h-4 w-4" }),
          "Attach proof",
          /* @__PURE__ */ jsx("input", { type: "file", multiple: true, className: "hidden", onChange: onFilesChange })
        ] }),
        files.length ? /* @__PURE__ */ jsx("div", { className: "mt-3 grid gap-2", children: files.map((file, index) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2 rounded-md bg-background p-2 text-sm", children: [
          /* @__PURE__ */ jsxs("span", { className: "min-w-0 truncate text-muted-foreground", children: [
            file.fileName,
            file.fileSize ? /* @__PURE__ */ jsxs("span", { className: "ml-1 text-xs", children: [
              "(",
              formatFileSize(file.fileSize),
              ")"
            ] }) : null
          ] }),
          /* @__PURE__ */ jsx("button", { type: "button", onClick: () => onRemoveFile(index), className: "shrink-0 text-xs text-primary hover:underline", children: "Remove" })
        ] }, `${file.fileName}-${index}`)) }) : null
      ] }),
      error ? /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: error }) : null,
      /* @__PURE__ */ jsxs(Button, { type: "submit", className: "w-full", disabled: isSubmitting, children: [
        /* @__PURE__ */ jsx(AlertTriangle, { className: "h-4 w-4" }),
        isSubmitting ? "Submitting" : "Raise dispute"
      ] })
    ] }),
    disputes.length ? /* @__PURE__ */ jsxs("div", { className: "mt-5 border-t border-border pt-4", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold", children: "Dispute history" }),
      /* @__PURE__ */ jsx("div", { className: "mt-3 space-y-3", children: disputes.slice().reverse().map((dispute) => {
        const attachments = getDisputeAttachments(dispute.attachmentsJson);
        return /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-border p-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2", children: [
              /* @__PURE__ */ jsx(Badge, { variant: dispute.status === "OPEN" ? "destructive" : "outline", children: formatDisputeStatus(dispute.status) }),
              /* @__PURE__ */ jsx(Badge, { variant: "secondary", children: formatDisputeType(dispute.issueType) }),
              /* @__PURE__ */ jsx(Badge, { variant: "outline", children: formatEnum(dispute.priority) })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: formatDateTime(dispute.createdAt) })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 whitespace-pre-wrap text-sm text-muted-foreground", children: dispute.message }),
          attachments.length ? /* @__PURE__ */ jsxs("div", { className: "mt-2 text-xs text-muted-foreground", children: [
            attachments.length,
            " proof file",
            attachments.length === 1 ? "" : "s",
            " ",
            "attached"
          ] }) : null
        ] }, dispute.id);
      }) })
    ] }) : null
  ] });
}
function ProjectReviewPanel({
  professionalName,
  reviewRating,
  reviewComment,
  reviewCreatedAt,
  reviewRequestedAt,
  reviewRequestNote,
  draft,
  isSaving,
  error,
  onDraftChange,
  onSave
}) {
  return /* @__PURE__ */ jsxs("section", { className: "rounded-xl border border-border bg-card p-6 shadow-soft", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-between gap-3 sm:flex-row sm:items-start", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "font-semibold", children: "Leave review" }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: reviewRating ? `You rated ${professionalName || "this professional"} ${reviewRating}/5.` : reviewRequestedAt ? `${professionalName || "This professional"} requested a review for this completed project.` : `Share how ${professionalName || "this professional"} worked on this project.` })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2", children: [
        reviewRequestedAt && !reviewRating ? /* @__PURE__ */ jsx(Badge, { variant: "secondary", children: "Review requested" }) : null,
        reviewCreatedAt ? /* @__PURE__ */ jsxs(Badge, { variant: "outline", children: [
          "Rated ",
          formatDate(reviewCreatedAt)
        ] }) : null
      ] })
    ] }),
    reviewRequestedAt && !reviewRating ? /* @__PURE__ */ jsxs("p", { className: "mt-3 rounded-lg border border-warning/30 bg-warning/10 px-3 py-2 text-sm text-warning-foreground", children: [
      "Requested ",
      formatDate(reviewRequestedAt),
      reviewRequestNote ? `: ${reviewRequestNote}` : "."
    ] }) : null,
    /* @__PURE__ */ jsx("div", { className: "mt-4 flex flex-wrap gap-1", children: [1, 2, 3, 4, 5].map((value) => /* @__PURE__ */ jsx("button", { type: "button", onClick: () => onDraftChange({
      ...draft,
      rating: value
    }), className: `grid h-9 w-9 place-items-center rounded-lg border transition-colors ${value <= draft.rating ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground hover:border-primary"}`, "aria-label": `Rate ${value} star${value === 1 ? "" : "s"}`, children: /* @__PURE__ */ jsx(Star, { className: "h-4 w-4" }) }, value)) }),
    /* @__PURE__ */ jsx("textarea", { value: draft.comment, onChange: (event) => onDraftChange({
      ...draft,
      comment: event.target.value
    }), placeholder: "Write a short review", className: "mt-3 min-h-20 w-full resize-y rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" }),
    reviewComment && !draft.comment ? /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: reviewComment }) : null,
    error ? /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-destructive", children: error }) : null,
    /* @__PURE__ */ jsx("div", { className: "mt-3 flex justify-end", children: /* @__PURE__ */ jsxs(Button, { size: "sm", onClick: onSave, disabled: isSaving, children: [
      /* @__PURE__ */ jsx(Star, { className: "h-4 w-4" }),
      isSaving ? "Saving" : reviewRating ? "Update review" : "Submit review"
    ] }) })
  ] });
}
function MilestoneForm({
  milestoneNumber,
  requiredCount,
  title,
  description,
  amountLabel,
  dueDate,
  minDate,
  maxDate,
  error,
  isSaving,
  onTitleChange,
  onDescriptionChange,
  onDueDateChange,
  onSubmit
}) {
  return /* @__PURE__ */ jsxs("form", { className: "mt-5 rounded-lg border border-border bg-muted/20 p-4", onSubmit, children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-3 flex flex-wrap items-center justify-between gap-2", children: [
      /* @__PURE__ */ jsxs(Badge, { variant: "secondary", children: [
        "Milestone ",
        milestoneNumber,
        "/",
        requiredCount
      ] }),
      /* @__PURE__ */ jsxs("span", { className: "text-sm font-medium", children: [
        "Amount: ",
        amountLabel
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-3 sm:grid-cols-2", children: [
      /* @__PURE__ */ jsx("input", { value: title, onChange: (event) => onTitleChange(event.target.value), placeholder: `Milestone ${milestoneNumber}/${requiredCount} title`, className: "h-10 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" }),
      /* @__PURE__ */ jsx("div", { className: "flex h-10 items-center rounded-lg border border-input bg-muted px-3 text-sm font-medium text-muted-foreground", children: amountLabel }),
      /* @__PURE__ */ jsx("input", { value: dueDate, onChange: (event) => onDueDateChange(event.target.value), type: "date", min: minDate, max: maxDate, className: "h-10 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center justify-end", children: /* @__PURE__ */ jsxs(Button, { type: "submit", disabled: isSaving, children: [
        /* @__PURE__ */ jsx(CheckCircle2, { className: "h-4 w-4" }),
        isSaving ? "Saving" : "Add milestone"
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("textarea", { value: description, onChange: (event) => onDescriptionChange(event.target.value), placeholder: "Milestone details", className: "mt-3 min-h-20 w-full resize-y rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" }),
    error ? /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-destructive", children: error }) : null
  ] });
}
function MilestoneList({
  milestones,
  requiredCount,
  isProfessional,
  canStartProject,
  projectStartLabel,
  updatingMilestoneId,
  onStatusChange,
  onDelete
}) {
  if (!milestones.length) {
    return /* @__PURE__ */ jsx("div", { className: "mt-5 rounded-lg border border-dashed border-border bg-muted/30 p-5 text-sm text-muted-foreground", children: "No milestones yet. The client must create 5 milestones for this project." });
  }
  return /* @__PURE__ */ jsx("div", { className: "mt-5 grid gap-3", children: milestones.map((milestone, index) => /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-border p-4", children: [
    /* @__PURE__ */ jsx("div", { className: "flex flex-col justify-between gap-3 sm:flex-row sm:items-start", children: /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
        /* @__PURE__ */ jsxs(Badge, { variant: "secondary", children: [
          index + 1,
          "/",
          requiredCount
        ] }),
        /* @__PURE__ */ jsx("h3", { className: "font-semibold", children: milestone.title }),
        /* @__PURE__ */ jsx(Badge, { variant: milestone.status === "PAID" ? "default" : "outline", children: formatMilestoneStatus(milestone.status) })
      ] }),
      milestone.description ? /* @__PURE__ */ jsx("p", { className: "mt-2 whitespace-pre-wrap text-sm text-muted-foreground", children: milestone.description }) : null,
      /* @__PURE__ */ jsxs("div", { className: "mt-3 flex flex-wrap gap-3 text-sm text-muted-foreground", children: [
        /* @__PURE__ */ jsx("span", { children: milestone.amount ? formatMoney(milestone.amount) : "No amount" }),
        /* @__PURE__ */ jsx("span", { children: milestone.dueDate ? `Due ${formatDate(milestone.dueDate)}` : "No due date" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "mt-4 flex flex-wrap gap-2", children: [
      isProfessional ? /* @__PURE__ */ jsxs(Fragment, { children: [
        milestone.status === "PENDING" ? /* @__PURE__ */ jsx(Button, { size: "sm", variant: "outline", onClick: () => onStatusChange(milestone.id, "IN_PROGRESS"), disabled: updatingMilestoneId !== null || !canStartProject, children: "Start" }) : null,
        ["PENDING", "IN_PROGRESS", "REVISION_REQUESTED"].includes(milestone.status) ? /* @__PURE__ */ jsx(Button, { size: "sm", onClick: () => onStatusChange(milestone.id, "SUBMITTED"), disabled: updatingMilestoneId !== null || !canStartProject, children: "Submit" }) : null,
        !canStartProject ? /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center rounded-md bg-muted px-3 py-2 text-xs text-muted-foreground", children: [
          "Starts ",
          projectStartLabel
        ] }) : null
      ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        milestone.status === "SUBMITTED" ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(Button, { size: "sm", onClick: () => onStatusChange(milestone.id, "APPROVED"), disabled: updatingMilestoneId !== null, children: "Approve" }),
          /* @__PURE__ */ jsx(Button, { size: "sm", variant: "outline", onClick: () => onStatusChange(milestone.id, "REVISION_REQUESTED"), disabled: updatingMilestoneId !== null, children: "Request revision" })
        ] }) : null,
        milestone.status === "APPROVED" ? /* @__PURE__ */ jsx(Button, { size: "sm", onClick: () => onStatusChange(milestone.id, "PAID"), disabled: updatingMilestoneId !== null, children: "Mark paid" }) : null,
        ["PENDING", "REVISION_REQUESTED"].includes(milestone.status) ? /* @__PURE__ */ jsx(Button, { size: "sm", variant: "outline", onClick: () => onDelete(milestone.id), disabled: updatingMilestoneId !== null, children: "Delete" }) : null
      ] }),
      updatingMilestoneId === milestone.id ? /* @__PURE__ */ jsx("span", { className: "self-center text-sm text-muted-foreground", children: "Updating..." }) : null
    ] })
  ] }, milestone.id)) });
}
function RevisionRequestForm({
  canRequest,
  hasUploadedWork,
  note,
  error,
  isSubmitting,
  openRevisionCount,
  onNoteChange,
  onSubmit
}) {
  return /* @__PURE__ */ jsxs("form", { className: "mt-5 rounded-lg border border-border bg-muted/20 p-4", onSubmit, children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-between gap-3 sm:flex-row sm:items-start", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "font-semibold", children: "Request revision" }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Tell the professional what needs to change in the uploaded work." })
      ] }),
      openRevisionCount ? /* @__PURE__ */ jsxs(Badge, { variant: "secondary", children: [
        openRevisionCount,
        " open"
      ] }) : null
    ] }),
    /* @__PURE__ */ jsx("textarea", { value: note, onChange: (event) => onNoteChange(event.target.value), disabled: !canRequest || isSubmitting, placeholder: canRequest && hasUploadedWork ? "Example: Please update the final file with the corrected colors and export as PDF." : canRequest ? "Example: Please share an updated file, add missing details, or change the delivered work." : "Revision can be requested while the project is active.", className: "mt-4 min-h-28 w-full resize-y rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" }),
    error ? /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-destructive", children: error }) : null,
    /* @__PURE__ */ jsx("div", { className: "mt-3 flex justify-end", children: /* @__PURE__ */ jsxs(Button, { type: "submit", disabled: !canRequest || isSubmitting, children: [
      /* @__PURE__ */ jsx(RotateCcw, { className: "h-4 w-4" }),
      isSubmitting ? "Requesting" : "Request revision"
    ] }) })
  ] });
}
function RevisionHistory({
  revisions,
  isProfessional,
  clearingRevisionId,
  onClear
}) {
  if (!revisions.length) {
    return null;
  }
  return /* @__PURE__ */ jsxs("section", { className: "rounded-xl border border-border bg-card p-6 shadow-soft", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "font-semibold", children: "Revision history" }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: isProfessional ? "Client revision notes for this project." : "Revision requests you sent to the professional." })
      ] }),
      /* @__PURE__ */ jsx(Badge, { variant: "outline", children: revisions.length })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-4 space-y-3", children: revisions.slice().reverse().map((revision) => /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-border p-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ jsx(Badge, { variant: revision.status === "REQUESTED" ? "default" : "outline", children: revision.status === "REQUESTED" ? "Requested" : "Addressed" }),
          !isProfessional ? /* @__PURE__ */ jsx(Button, { size: "sm", variant: "outline", onClick: () => onClear(revision.id), disabled: clearingRevisionId !== null, children: clearingRevisionId === revision.id ? "Clearing" : "Clear" }) : null
        ] }),
        /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: formatDateTime(revision.createdAt) })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 whitespace-pre-wrap text-sm text-muted-foreground", children: revision.note })
    ] }, revision.id)) })
  ] });
}
function WorkFiles({
  uploads,
  isProfessional,
  deletingUploadId,
  onDelete
}) {
  if (!uploads.length) {
    return /* @__PURE__ */ jsx("div", { className: "mt-5 rounded-lg border border-dashed border-border bg-muted/30 p-5", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
      /* @__PURE__ */ jsx("div", { className: "grid h-12 w-12 shrink-0 place-items-center rounded-full border border-primary bg-card text-primary", children: /* @__PURE__ */ jsx(Upload, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-semibold", children: "No files uploaded yet" }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: isProfessional ? "Use the upload box on the right to send work files." : "The professional has not uploaded work files yet." })
      ] })
    ] }) });
  }
  return /* @__PURE__ */ jsx("div", { className: "mt-5 grid gap-3", children: uploads.map((upload) => /* @__PURE__ */ jsx(WorkFileItem, { upload, canDelete: isProfessional, isDeleting: deletingUploadId === upload.id, onDelete }, upload.id)) });
}
function WorkFileItem({
  upload,
  canDelete,
  isDeleting,
  onDelete
}) {
  const files = getWorkUploadFiles(upload);
  const primaryFile = files[0] ?? {
    fileName: upload.fileName || upload.title || "Uploaded file",
    fileUrl: upload.fileUrl,
    fileType: null,
    fileSize: null
  };
  return /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-border p-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex min-w-0 items-center gap-3", children: [
        /* @__PURE__ */ jsx("div", { className: "grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary", children: /* @__PURE__ */ jsx(FileText, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsx("h3", { className: "truncate font-semibold", children: primaryFile.fileName }),
          /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "Uploaded ",
            formatDateTime(upload.createdAt),
            primaryFile.fileSize ? ` · ${formatFileSize(primaryFile.fileSize)}` : ""
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2", children: [
        primaryFile.fileUrl ? /* @__PURE__ */ jsx(Button, { size: "sm", variant: "outline", onClick: () => openWorkFile(primaryFile), children: "Open" }) : /* @__PURE__ */ jsx(Button, { size: "sm", variant: "outline", disabled: true, children: "Open" }),
        canDelete ? /* @__PURE__ */ jsx(Button, { size: "sm", variant: "outline", onClick: () => onDelete(upload.id), disabled: isDeleting, children: isDeleting ? "Deleting" : "Delete" }) : null
      ] })
    ] }),
    files.length > 1 ? /* @__PURE__ */ jsx("div", { className: "mt-3 grid gap-2 sm:grid-cols-2", children: files.slice(1).map((file) => /* @__PURE__ */ jsxs("div", { className: "flex min-w-0 items-center justify-between gap-2 rounded-md bg-muted/40 p-2 text-sm", children: [
      /* @__PURE__ */ jsx("span", { className: "truncate text-muted-foreground", children: file.fileName }),
      file.fileUrl ? /* @__PURE__ */ jsx("button", { type: "button", onClick: () => openWorkFile(file), className: "shrink-0 text-primary hover:underline", children: "Open" }) : null
    ] }, `${upload.id}-${file.fileName}-${file.fileUrl || ""}`)) }) : null
  ] });
}
function openWorkFile(file) {
  if (!file.fileUrl) {
    return;
  }
  if (!file.fileUrl.startsWith("data:")) {
    window.open(file.fileUrl, "_blank", "noopener,noreferrer");
    return;
  }
  const blob = dataUrlToBlob(file.fileUrl, file.fileType);
  const objectUrl = URL.createObjectURL(blob);
  const openedWindow = window.open(objectUrl, "_blank", "noopener,noreferrer");
  if (!openedWindow) {
    const link = document.createElement("a");
    link.href = objectUrl;
    link.download = file.fileName;
    link.click();
  }
  window.setTimeout(() => URL.revokeObjectURL(objectUrl), 6e4);
}
function dataUrlToBlob(dataUrl, fallbackType) {
  const [metadata = "", base64 = ""] = dataUrl.split(",");
  const contentType = metadata.match(/^data:([^;]+)/)?.[1] || fallbackType || "application/octet-stream";
  const binary = window.atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return new Blob([bytes], {
    type: contentType
  });
}
function Stat({
  icon: Icon,
  label,
  value
}) {
  return /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-border bg-card p-5 shadow-soft", children: [
    /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5 text-primary" }),
    /* @__PURE__ */ jsx("p", { className: "mt-4 text-2xl font-semibold", children: value }),
    /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: label })
  ] });
}
function InfoLine({
  icon: Icon,
  text,
  wide = false
}) {
  return /* @__PURE__ */ jsxs("span", { className: `flex min-w-0 items-center gap-2 ${wide ? "sm:col-span-2" : ""}`, children: [
    /* @__PURE__ */ jsx(Icon, { className: "h-4 w-4 shrink-0" }),
    /* @__PURE__ */ jsx("span", { className: "truncate", children: text })
  ] });
}
function ProgressBox({
  label,
  value
}) {
  return /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-border p-4", children: [
    /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: label }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 font-semibold", children: value })
  ] });
}
function parseDurationWeeks(value) {
  if (!value) {
    return null;
  }
  const match = value.match(/\d+/);
  return match ? Number(match[0]) : null;
}
function getElapsedDays(value, now = /* @__PURE__ */ new Date()) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return 0;
  }
  const startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
  const todayDate = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  return Math.max(0, Math.floor((todayDate - startDate) / 864e5));
}
function formatEnum(value) {
  return value.toLowerCase().split("_").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
}
function formatMilestoneStatus(value) {
  return value === "REVISION_REQUESTED" ? "Revision requested" : formatEnum(value);
}
function formatDisputeType(value) {
  const labels = {
    PAYMENT: "Payment issue",
    WORK_QUALITY: "Work quality",
    DEADLINE_DELAY: "Deadline delay",
    COMMUNICATION: "Communication",
    FILE_PROBLEM: "File problem",
    OTHER: "Other"
  };
  return labels[value];
}
function formatDisputeStatus(value) {
  return value === "UNDER_REVIEW" ? "Under review" : formatEnum(value);
}
function formatDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Not set";
  }
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(date);
}
function formatScheduleDate(value) {
  const input = getDateInputValue(value);
  if (!input) {
    return "Not set";
  }
  const [year, month, day] = input.split("-").map(Number);
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(Date.UTC(year, month - 1, day)));
}
function getDateInputValue(value) {
  if (!value) {
    return "";
  }
  if (value instanceof Date) {
    return [value.getFullYear(), String(value.getMonth() + 1).padStart(2, "0"), String(value.getDate()).padStart(2, "0")].join("-");
  }
  const dateOnly = value.match(/^\d{4}-\d{2}-\d{2}/)?.[0];
  if (dateOnly) {
    return dateOnly;
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }
  return [date.getUTCFullYear(), String(date.getUTCMonth() + 1).padStart(2, "0"), String(date.getUTCDate()).padStart(2, "0")].join("-");
}
function compareDateInputs(a, b) {
  return (/* @__PURE__ */ new Date(`${a}T00:00:00.000Z`)).getTime() - (/* @__PURE__ */ new Date(`${b}T00:00:00.000Z`)).getTime();
}
function formatDateTime(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Not set";
  }
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit"
  }).format(date);
}
function formatMoney(value) {
  return `$${value.toLocaleString()}`;
}
function getRequiredMilestoneAmount(totalAmount, milestoneNumber) {
  const normalizedTotal = Math.max(0, Math.round(Number(totalAmount) || 0));
  const baseAmount = Math.floor(normalizedTotal / REQUIRED_PROJECT_MILESTONES);
  const remainder = normalizedTotal - baseAmount * REQUIRED_PROJECT_MILESTONES;
  return baseAmount + (milestoneNumber <= remainder ? 1 : 0);
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
function formatFileSize(size) {
  if (!size) {
    return "Unknown size";
  }
  if (size < 1024 * 1024) {
    return `${Math.round(size / 1024)} KB`;
  }
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}
function getRequestAttachments(value) {
  if (!value) {
    return [];
  }
  try {
    const parsed = JSON.parse(value);
    return parsed.filter((attachment) => attachment.fileName).map((attachment) => ({
      fileName: attachment.fileName || "Attachment",
      fileSize: attachment.fileSize ?? null
    }));
  } catch {
    return [];
  }
}
function getDisputeAttachments(value) {
  if (!value) {
    return [];
  }
  try {
    const parsed = JSON.parse(value);
    return parsed.filter((attachment) => attachment.fileName).map((attachment) => ({
      fileName: attachment.fileName || "Proof file",
      fileSize: attachment.fileSize ?? null
    }));
  } catch {
    return [];
  }
}
function getWorkUploadFiles(upload) {
  if (upload.filesJson) {
    try {
      const parsed = JSON.parse(upload.filesJson);
      const files = parsed.filter((file) => file.fileName).map((file) => ({
        fileName: file.fileName || "File",
        fileUrl: file.fileDataUrl || file.fileUrl || null,
        fileType: file.fileType || null,
        fileSize: file.fileSize ?? null
      }));
      if (files.length) {
        return files;
      }
    } catch {
    }
  }
  if (upload.fileName || upload.fileUrl) {
    return [{
      fileName: upload.fileName || upload.fileUrl || "File",
      fileUrl: upload.fileUrl,
      fileType: null,
      fileSize: null
    }];
  }
  return [];
}
function getSocketUrl() {
  return `${window.location.protocol}//${window.location.hostname}:4001`;
}
const Route$1 = Route$2;
const checkProjectAuth = createServerFn({
  method: "GET"
}).handler(createSsrRpc("21fdf6e8e7840e1cff3b3ca3611a368d5ab8b8f96b9ea15af45c378854b1d5bf"));
const getProjectData = createServerFn({
  method: "GET"
}).inputValidator((id) => id).handler(createSsrRpc("1352238e92751112f326b98e5a6618a5af4927f592eadfebbc82c8f3eb61ec63"));
const deleteProject = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(createSsrRpc("7fb9024a085484decec73064df196406d2dfa38387498314733a92803139ccf3"));
const $$splitNotFoundComponentImporter = () => import("./project._projectId-mZMVxaQw.js");
const $$splitErrorComponentImporter = () => import("./project._projectId-DepqUDNJ.js");
const $$splitComponentImporter = () => import("./project._projectId-CmX3NTi2.js");
const Route = createFileRoute("/project/$projectId")({
  head: () => ({
    meta: [{
      title: "Project tracking — Servio"
    }]
  }),
  beforeLoad: async ({
    location
  }) => {
    const auth = await checkProjectAuth();
    if (!auth.authenticated) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href
        }
      });
    }
    if (!auth.isClient) {
      throw redirect({
        to: "/dashboard"
      });
    }
  },
  loader: async ({
    params
  }) => {
    const result = await getProjectData({
      data: params.projectId
    });
    if (!result || !result.job) {
      throw notFound();
    }
    return result;
  },
  component: lazyRouteComponent($$splitComponentImporter, "component"),
  errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent"),
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent")
});
const IndexRoute = Route$19.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$1a
});
const LegalPageSlugRoute = Route$18.update({
  id: "/$legalPageSlug",
  path: "/$legalPageSlug",
  getParentRoute: () => Route$1a
});
const AboutUsRoute = Route$17.update({
  id: "/about-us",
  path: "/about-us",
  getParentRoute: () => Route$1a
});
const AdminRoute = Route$15.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => Route$1a
});
const AdminCategoriesRoute = Route$14.update({
  id: "/admin-categories",
  path: "/admin-categories",
  getParentRoute: () => Route$1a
});
const AdminNotificationsRoute = Route$12.update({
  id: "/admin-notifications",
  path: "/admin-notifications",
  getParentRoute: () => Route$1a
});
const AdminReportsRoute = Route$11.update({
  id: "/admin-reports",
  path: "/admin-reports",
  getParentRoute: () => Route$1a
});
const ClientReportsRoute = Route$10.update({
  id: "/client-reports",
  path: "/client-reports",
  getParentRoute: () => Route$1a
});
const ContactUsRoute = Route$$.update({
  id: "/contact-us",
  path: "/contact-us",
  getParentRoute: () => Route$1a
});
const DashboardRoute = Route$Z.update({
  id: "/dashboard",
  path: "/dashboard",
  getParentRoute: () => Route$1a
});
const DiscoverRoute = Route$X.update({
  id: "/discover",
  path: "/discover",
  getParentRoute: () => Route$1a
});
const EarningsRoute = Route$V.update({
  id: "/earnings",
  path: "/earnings",
  getParentRoute: () => Route$1a
});
const EarningsReportsRoute = Route$U.update({
  id: "/earnings-reports",
  path: "/earnings-reports",
  getParentRoute: () => Route$1a
});
const FaqRoute = Route$S.update({
  id: "/faq",
  path: "/faq",
  getParentRoute: () => Route$1a
});
const ForClientsRoute = Route$R.update({
  id: "/for-clients",
  path: "/for-clients",
  getParentRoute: () => Route$1a
});
const ForProfessionalsRoute = Route$P.update({
  id: "/for-professionals",
  path: "/for-professionals",
  getParentRoute: () => Route$1a
});
const ForgotPasswordRoute = Route$N.update({
  id: "/forgot-password",
  path: "/forgot-password",
  getParentRoute: () => Route$1a
});
const HowItWorksRoute = Route$L.update({
  id: "/how-it-works",
  path: "/how-it-works",
  getParentRoute: () => Route$1a
});
const JobManagementRoute = Route$K.update({
  id: "/job-management",
  path: "/job-management",
  getParentRoute: () => Route$1a
});
const LoginRoute = Route$J.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$1a
});
const MessagesRoute = Route$H.update({
  id: "/messages",
  path: "/messages",
  getParentRoute: () => Route$1a
});
const MyInfoRoute = Route$F.update({
  id: "/my-info",
  path: "/my-info",
  getParentRoute: () => Route$1a
});
const NotificationsRoute = Route$D.update({
  id: "/notifications",
  path: "/notifications",
  getParentRoute: () => Route$1a
});
const PostJobRoute = Route$B.update({
  id: "/post-job",
  path: "/post-job",
  getParentRoute: () => Route$1a
});
const PricingRoute = Route$z.update({
  id: "/pricing",
  path: "/pricing",
  getParentRoute: () => Route$1a
});
const PrivacyPolicyRoute = Route$y.update({
  id: "/privacy-policy",
  path: "/privacy-policy",
  getParentRoute: () => Route$1a
});
const ProfessionalMessagesRoute = Route$w.update({
  id: "/professional-messages",
  path: "/professional-messages",
  getParentRoute: () => Route$1a
});
const ProfessionalProfileRoute = Route$u.update({
  id: "/professional-profile",
  path: "/professional-profile",
  getParentRoute: () => Route$1a
});
const ProfessionalReportsRoute = Route$t.update({
  id: "/professional-reports",
  path: "/professional-reports",
  getParentRoute: () => Route$1a
});
const ProfessionalStatsRoute = Route$r.update({
  id: "/professional-stats",
  path: "/professional-stats",
  getParentRoute: () => Route$1a
});
const ProfileSetupRoute = Route$p.update({
  id: "/profile-setup",
  path: "/profile-setup",
  getParentRoute: () => Route$1a
});
const ProjectsRoute = Route$n.update({
  id: "/projects",
  path: "/projects",
  getParentRoute: () => Route$1a
});
const ReportsRoute = Route$m.update({
  id: "/reports",
  path: "/reports",
  getParentRoute: () => Route$1a
});
const ServicesRoute = Route$l.update({
  id: "/services",
  path: "/services",
  getParentRoute: () => Route$1a
});
const SignupRoute = Route$k.update({
  id: "/signup",
  path: "/signup",
  getParentRoute: () => Route$1a
});
const TermsAndConditionsRoute = Route$j.update({
  id: "/terms-and-conditions",
  path: "/terms-and-conditions",
  getParentRoute: () => Route$1a
});
const UserManagementRoute = Route$i.update({
  id: "/user-management",
  path: "/user-management",
  getParentRoute: () => Route$1a
});
const VerificationRoute = Route$g.update({
  id: "/verification",
  path: "/verification",
  getParentRoute: () => Route$1a
});
const VerificationManagementRoute = Route$f.update({
  id: "/verification-management",
  path: "/verification-management",
  getParentRoute: () => Route$1a
});
const VerifyRoute = Route$d.update({
  id: "/verify",
  path: "/verify",
  getParentRoute: () => Route$1a
});
const WebEditorRoute = Route$c.update({
  id: "/web-editor",
  path: "/web-editor",
  getParentRoute: () => Route$1a
});
const WebsiteCmsRoute = Route$b.update({
  id: "/website-cms",
  path: "/website-cms",
  getParentRoute: () => Route$1a
});
const HireProIdRoute = Route$9.update({
  id: "/hire/$proId",
  path: "/hire/$proId",
  getParentRoute: () => Route$1a
});
const JobJobIdRoute = Route$7.update({
  id: "/job/$jobId",
  path: "/job/$jobId",
  getParentRoute: () => Route$1a
});
const ProProIdRoute = Route$5.update({
  id: "/pro/$proId",
  path: "/pro/$proId",
  getParentRoute: () => Route$1a
});
const ProfessionalStatsSectionRoute = Route$3.update({
  id: "/$section",
  path: "/$section",
  getParentRoute: () => ProfessionalStatsRoute
});
const ProjectTrackTrackingIdRoute = Route$1.update({
  id: "/project-track/$trackingId",
  path: "/project-track/$trackingId",
  getParentRoute: () => Route$1a
});
const ProjectProjectIdRoute = Route.update({
  id: "/project/$projectId",
  path: "/project/$projectId",
  getParentRoute: () => Route$1a
});
const ProfessionalStatsRouteChildren = {
  ProfessionalStatsSectionRoute
};
const ProfessionalStatsRouteWithChildren = ProfessionalStatsRoute._addFileChildren(ProfessionalStatsRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  LegalPageSlugRoute,
  AboutUsRoute,
  AdminRoute,
  AdminCategoriesRoute,
  AdminNotificationsRoute,
  AdminReportsRoute,
  ClientReportsRoute,
  ContactUsRoute,
  DashboardRoute,
  DiscoverRoute,
  EarningsRoute,
  EarningsReportsRoute,
  FaqRoute,
  ForClientsRoute,
  ForProfessionalsRoute,
  ForgotPasswordRoute,
  HowItWorksRoute,
  JobManagementRoute,
  LoginRoute,
  MessagesRoute,
  MyInfoRoute,
  NotificationsRoute,
  PostJobRoute,
  PricingRoute,
  PrivacyPolicyRoute,
  ProfessionalMessagesRoute,
  ProfessionalProfileRoute,
  ProfessionalReportsRoute,
  ProfessionalStatsRoute: ProfessionalStatsRouteWithChildren,
  ProfileSetupRoute,
  ProjectsRoute,
  ReportsRoute,
  ServicesRoute,
  SignupRoute,
  TermsAndConditionsRoute,
  UserManagementRoute,
  VerificationRoute,
  VerificationManagementRoute,
  VerifyRoute,
  WebEditorRoute,
  WebsiteCmsRoute,
  HireProIdRoute,
  JobJobIdRoute,
  ProProIdRoute,
  ProjectTrackTrackingIdRoute,
  ProjectProjectIdRoute
};
const routeTree = Route$1a._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  setSignupSubmitError as $,
  AppShell as A,
  Button as B,
  useAppDispatch as C,
  Dialog as D,
  useAppSelector as E,
  AuthLayout as F,
  Form as G,
  FormField as H,
  Input as I,
  FormItem as J,
  FormLabel as K,
  FormControl as L,
  FormMessage as M,
  clearLoginFeedback as N,
  setLoginSubmitting as O,
  setLoginSubmitError as P,
  setLoginSuccessMessage as Q,
  Route$18 as R,
  SiteHeader as S,
  Textarea as T,
  Route$y as U,
  setSignupOtpStatus as V,
  setSignupSendingOtp as W,
  FormDescription as X,
  setSignupShowPassword as Y,
  clearSignupFeedback as Z,
  setSignupSubmitting as _,
  DialogContent as a,
  setSignupSuccessMessage as a0,
  Route$j as a1,
  Switch as a2,
  deleteProject as a3,
  router as a4,
  DialogHeader as b,
  cn as c,
  DialogTitle as d,
  DialogDescription as e,
  DialogFooter as f,
  Badge as g,
  formatApproximateLocation as h,
  SiteFooter as i,
  createSsrRpc as j,
  AdminPageHeader as k,
  logoutAction as l,
  AdminSection as m,
  AdminEmptyState as n,
  AdminSummaryCard as o,
  formatMoney$5 as p,
  Select as q,
  SelectTrigger as r,
  SelectValue as s,
  SelectContent as t,
  SelectItem as u,
  formatEnum$a as v,
  formatDateTime$6 as w,
  formatDate$9 as x,
  formatBudget$9 as y,
  formatFileSize$5 as z
};
