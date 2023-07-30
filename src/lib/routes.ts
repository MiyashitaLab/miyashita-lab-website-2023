export const ROUTES = {
  HOME: "/",
  NEWS: "/news",
  NEWS_DETAIL: (slug: string) => `/news/${slug}`,
  MEMBERS: "/members",
  MEMBER_DETAIL: (slug: string) => `/members/${slug}`,
  RESEARCHES: "/researches",
  RESEARCH_DETAIL: (slug: string) => `/researches/${slug}`,
  RESEARCH_DETAIL_PDF: (slug: string, fileName: string) =>
    `/researches/${slug}/assets/${fileName}.pdf`,
  RESEARCH_AUTHOR_FILTERED: (authorName: string) =>
    `/researches?filter=author:${authorName}`,
  PROJECTS: "/projects",
  PROJECT_DETAIL: (slug: string) => `/projects/${slug}`,
  ABOUT: "/about",
  PRIVACY_POLICY: "/privacy-policy",
  COPYRIGHT: "/copyright",
} as const;

export const toPublicUrl = (relativePath: string) => {
  return `https://${process.env.NEXT_PUBLIC_BASE_URL}${relativePath}`;
};
