import xss from "xss";

const XssFilter = xss.FilterXSS ?? xss;

function escapeAttributeValue(value: string) {
  if (typeof xss.escapeAttrValue === "function") {
    return xss.escapeAttrValue(value);
  }

  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

const sanitizer = new XssFilter({
  whiteList: {
    a: ["href", "title", "target", "rel", "class", "id"],
    b: ["class", "id"],
    blockquote: ["class", "id"],
    br: ["class", "id"],
    caption: ["class", "id"],
    code: ["class", "id"],
    div: ["class", "id"],
    em: ["class", "id"],
    figure: ["class", "id"],
    figcaption: ["class", "id"],
    h1: ["class", "id"],
    h2: ["class", "id"],
    h3: ["class", "id"],
    h4: ["class", "id"],
    h5: ["class", "id"],
    h6: ["class", "id"],
    hr: ["class", "id"],
    i: ["class", "id"],
    img: ["src", "alt", "title", "width", "height", "class", "id"],
    label: ["class", "id"],
    li: ["class", "id"],
    nav: ["class", "id"],
    ol: ["class", "id"],
    p: ["class", "id"],
    pre: ["class", "id"],
    section: ["class", "id"],
    small: ["class", "id"],
    span: ["class", "id"],
    strong: ["class", "id"],
    sub: ["class", "id"],
    sup: ["class", "id"],
    table: ["class", "id"],
    tbody: ["class", "id"],
    td: ["colspan", "rowspan", "class", "id"],
    th: ["colspan", "rowspan", "class", "id"],
    thead: ["class", "id"],
    tfoot: ["class", "id"],
    tr: ["class", "id"],
    u: ["class", "id"],
    ul: ["class", "id"],
  },
  stripIgnoreTag: true,
  stripIgnoreTagBody: ["script", "style"],
  safeAttrValue(name, value) {
    if ((name === "href" || name === "src") && /^\s*(javascript|vbscript|data):/i.test(value)) {
      return "";
    }
    return value;
  },
  onIgnoreTagAttr(tag, name, value) {
    if (name === "class" || name === "id") {
      return `${name}="${escapeAttributeValue(value)}"`;
    }
  },
});

export function sanitizeHtml(value: string) {
  return sanitizer.process(value);
}
