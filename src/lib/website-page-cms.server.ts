import { prisma } from "@/lib/prisma";
import { sanitizeHtml } from "@/lib/html-sanitizer.server";

const purify = sanitizeHtml;

export type WebsitePageStatus = "DRAFT" | "PUBLISHED";
export type WebsitePageRecord = {
  pageKey: string;
  path: string;
  title: string;
  content: string;
  status: WebsitePageStatus;
  updatedAt: string;
};

export const editableWebsitePages = [
  { pageKey: "home", path: "/", title: "Home Page" },
  { pageKey: "about", path: "/about-us", title: "About Us" },
  { pageKey: "how-it-works", path: "/how-it-works", title: "How It Works" },
  { pageKey: "services", path: "/services", title: "Services / Categories" },
  { pageKey: "for-clients", path: "/for-clients", title: "For Clients Page" },
  { pageKey: "for-professionals", path: "/for-professionals", title: "For Professionals Page" },
  { pageKey: "pricing", path: "/pricing", title: "Pricing / Fees / Commission" },
  { pageKey: "faq", path: "/faq", title: "FAQ Page" },
  { pageKey: "contact", path: "/contact-us", title: "Contact Us" },
  { pageKey: "privacy", path: "/privacy-policy", title: "Privacy Policy" },
  { pageKey: "terms", path: "/terms-and-conditions", title: "Terms & Conditions" },
] as const;

async function ensureWebsitePages() {
  const count = await prisma.websitePage.count();
  if (count === 0) {
    for (const page of editableWebsitePages) {
      await prisma.websitePage.upsert({
        where: { pageKey: page.pageKey },
        update: {},
        create: {
          pageKey: page.pageKey,
          path: page.path,
          title: page.title,
          content: createDefaultContent(page.title),
          status: "DRAFT",
        },
      });
    }
  }
}

export async function listWebsitePages(): Promise<WebsitePageRecord[]> {
  await ensureWebsitePages();
  const pages = await prisma.websitePage.findMany({
    orderBy: { pageKey: "asc" },
  });
  return pages.map((p) => ({
    ...p,
    status: p.status as WebsitePageStatus,
    updatedAt: p.updatedAt.toISOString(),
  }));
}

export async function listPublishedWebsitePages(): Promise<WebsitePageRecord[]> {
  await ensureWebsitePages();
  const pages = await prisma.websitePage.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { pageKey: "asc" },
  });
  return pages.map((p) => ({
    ...p,
    status: p.status as WebsitePageStatus,
    updatedAt: p.updatedAt.toISOString(),
  }));
}

export async function getPublishedWebsitePage(pageKey: string): Promise<WebsitePageRecord | undefined> {
  const page = await prisma.websitePage.findFirst({
    where: { pageKey, status: "PUBLISHED" },
  });
  if (!page) return undefined;
  return {
    ...page,
    status: page.status as WebsitePageStatus,
    updatedAt: page.updatedAt.toISOString(),
  };
}

export async function saveWebsitePage(
  pageKey: string,
  input: Pick<WebsitePageRecord, "content" | "status">,
): Promise<WebsitePageRecord> {
  if (!editableWebsitePages.some((page) => page.pageKey === pageKey)) {
    throw new Error("This page is not editable.");
  }
  const sanitizedContent = purify(input.content);
  const saved = await prisma.websitePage.update({
    where: { pageKey },
    data: {
      content: sanitizedContent,
      status: input.status,
      updatedAt: new Date(),
    },
  });

  return {
    ...saved,
    status: saved.status as WebsitePageStatus,
    updatedAt: saved.updatedAt.toISOString(),
  };
}

function createDefaultContent(title: string) {
  return `<section class="cms-hero center"><div class="cms-wrap"><p class="cms-kicker">Servio</p><h1>\${title}</h1><p>Edit this page visually or open Source Editing to paste HTML.</p></div></section><section class="cms-section"><div class="cms-wrap"><h2>Main section</h2><div class="cms-grid two"><div class="cms-card"><h3>Content card one</h3><p>Add your page content here.</p></div><div class="cms-card"><h3>Content card two</h3><p>Add supporting information here.</p></div></div><div class="cms-cta"><div><h2>Ready to get started?</h2><p>Join Servio today.</p></div><a class="cms-btn orange" href="/signup">Create account</a></div></div></section>`;
}
