import { az as prisma, aA as sanitizeHtml } from "../server.js";
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
const purify = sanitizeHtml;
const defaultLegalPages = {
  faq: {
    slug: "faq",
    title: "Frequently asked questions",
    content: "<p>Find answers to common questions about hiring, payments, and how Servio works.</p>",
    status: "PUBLISHED"
  },
  "terms-and-conditions": {
    slug: "terms-and-conditions",
    title: "Terms & Conditions",
    content: '<p>By accessing or using Servio, you agree to follow these terms.</p><p class="mt-4">You are responsible for your account credentials and activity.</p><p class="mt-4">Clients and professionals are responsible for agreed work, payments, and platform rules.</p>',
    status: "PUBLISHED"
  },
  "privacy-policy": {
    slug: "privacy-policy",
    title: "Privacy Policy",
    content: '<p>We collect account, contact, usage, and transaction information needed to operate Servio.</p><p class="mt-4">We use information to provide services, improve safety, process payments, and support users.</p><p class="mt-4">You can update your account information or contact support for privacy requests.</p>',
    status: "PUBLISHED"
  }
};
function getDefaultLegalPageTemplate(slug) {
  return defaultLegalPages[slug] || null;
}
async function ensureLegalPages() {
  const count = await prisma.legalPage.count();
  if (count === 0) {
    for (const page of Object.values(defaultLegalPages)) {
      await prisma.legalPage.upsert({
        where: { slug: page.slug },
        update: {},
        create: {
          slug: page.slug,
          title: page.title,
          content: page.content,
          status: page.status
        }
      });
    }
  }
}
async function listLegalPages() {
  await ensureLegalPages();
  const pages = await prisma.legalPage.findMany();
  const slugOrder = {
    faq: 0,
    "terms-and-conditions": 1,
    "privacy-policy": 2
  };
  return pages.sort((a, b) => (slugOrder[a.slug] ?? 3) - (slugOrder[b.slug] ?? 3)).map((p) => ({
    ...p,
    status: p.status,
    updatedAt: p.updatedAt.toISOString()
  }));
}
async function getLegalPageBySlug(slug) {
  const page = await prisma.legalPage.findUnique({
    where: { slug }
  });
  if (!page) return void 0;
  return {
    ...page,
    status: page.status,
    updatedAt: page.updatedAt.toISOString()
  };
}
async function getPublishedLegalPageBySlug(slug) {
  const page = await getLegalPageBySlug(slug);
  return page?.status === "PUBLISHED" ? page : void 0;
}
async function saveLegalPage(slug, input) {
  const sanitizedContent = purify(input.content);
  const defaultTemplate = getDefaultLegalPageTemplate(slug);
  const fallbackTitle = defaultTemplate?.title || slug.replace(/[-_]+/g, " ").trim() || "New page";
  const saved = await prisma.legalPage.upsert({
    where: { slug },
    create: {
      slug,
      title: input.title.trim() || fallbackTitle,
      content: sanitizedContent,
      status: input.status
    },
    update: {
      title: input.title.trim() || fallbackTitle,
      content: sanitizedContent,
      status: input.status,
      updatedAt: /* @__PURE__ */ new Date()
    }
  });
  return {
    ...saved,
    status: saved.status,
    updatedAt: saved.updatedAt.toISOString()
  };
}
export {
  getLegalPageBySlug,
  getPublishedLegalPageBySlug,
  listLegalPages,
  saveLegalPage
};
