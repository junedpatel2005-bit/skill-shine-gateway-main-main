import { prisma } from "@/lib/prisma";
import { sanitizeHtml } from "@/lib/html-sanitizer.server";

const purify = sanitizeHtml;

export type LegalPageSlug = string;
export type LegalPageStatus = "DRAFT" | "PUBLISHED";

type DefaultLegalPageSlug = "faq" | "terms-and-conditions" | "privacy-policy";

export type LegalPageRecord = {
  slug: LegalPageSlug;
  title: string;
  content: string;
  status: LegalPageStatus;
  updatedAt: string;
};

export type LegalPageInput = {
  title: string;
  content: string;
  status: LegalPageStatus;
};

const defaultLegalPages: Record<DefaultLegalPageSlug, Omit<LegalPageRecord, "updatedAt">> = {
  faq: {
    slug: "faq",
    title: "Frequently asked questions",
    content:
      "<p>Find answers to common questions about hiring, payments, and how Servio works.</p>",
    status: "PUBLISHED",
  },
  "terms-and-conditions": {
    slug: "terms-and-conditions",
    title: "Terms & Conditions",
    content:
      '<p>By accessing or using Servio, you agree to follow these terms.</p><p class="mt-4">You are responsible for your account credentials and activity.</p><p class="mt-4">Clients and professionals are responsible for agreed work, payments, and platform rules.</p>',
    status: "PUBLISHED",
  },
  "privacy-policy": {
    slug: "privacy-policy",
    title: "Privacy Policy",
    content:
      '<p>We collect account, contact, usage, and transaction information needed to operate Servio.</p><p class="mt-4">We use information to provide services, improve safety, process payments, and support users.</p><p class="mt-4">You can update your account information or contact support for privacy requests.</p>',
    status: "PUBLISHED",
  },
};

function getDefaultLegalPageTemplate(slug: string): Omit<LegalPageRecord, "updatedAt"> | null {
  return (defaultLegalPages as Record<string, Omit<LegalPageRecord, "updatedAt">>)[slug] || null;
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
          status: page.status,
        },
      });
    }
  }
}

export async function listLegalPages(): Promise<LegalPageRecord[]> {
  await ensureLegalPages();
  const pages = await prisma.legalPage.findMany();

  // Custom sort to match original behavior
  const slugOrder: Record<string, number> = {
    'faq': 0,
    'terms-and-conditions': 1,
    'privacy-policy': 2
  };

  return pages
    .sort((a, b) => (slugOrder[a.slug] ?? 3) - (slugOrder[b.slug] ?? 3))
    .map(p => ({
      ...p,
      status: p.status as LegalPageStatus,
      updatedAt: p.updatedAt.toISOString()
    }));
}

export async function getLegalPageBySlug(slug: LegalPageSlug): Promise<LegalPageRecord | undefined> {
  const page = await prisma.legalPage.findUnique({
    where: { slug }
  });
  if (!page) return undefined;
  return {
    ...page,
    status: page.status as LegalPageStatus,
    updatedAt: page.updatedAt.toISOString()
  };
}

export async function getPublishedLegalPageBySlug(slug: LegalPageSlug): Promise<LegalPageRecord | undefined> {
  const page = await getLegalPageBySlug(slug);
  return page?.status === "PUBLISHED" ? page : undefined;
}

export async function saveLegalPage(slug: LegalPageSlug, input: LegalPageInput): Promise<LegalPageRecord> {
  const sanitizedContent = purify(input.content);
  const defaultTemplate = getDefaultLegalPageTemplate(slug);
  const fallbackTitle = defaultTemplate?.title || slug.replace(/[-_]+/g, " ").trim() || "New page";

  const saved = await prisma.legalPage.upsert({
    where: { slug },
    create: {
      slug,
      title: input.title.trim() || fallbackTitle,
      content: sanitizedContent,
      status: input.status,
    },
    update: {
      title: input.title.trim() || fallbackTitle,
      content: sanitizedContent,
      status: input.status,
      updatedAt: new Date(),
    }
  });

  return {
    ...saved,
    status: saved.status as LegalPageStatus,
    updatedAt: saved.updatedAt.toISOString()
  };
}
