import { jsxs, jsx } from "react/jsx-runtime";
const SplitNotFoundComponent = () => /* @__PURE__ */ jsxs("div", { className: "p-10 text-center", children: [
  /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold", children: "Project not found" }),
  /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The project you're looking for doesn't exist." })
] });
export {
  SplitNotFoundComponent as notFoundComponent
};
