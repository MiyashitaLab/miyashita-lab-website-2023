export const ROUTES = {
  HOME: "/",
  NEWS: "/news",
  NEWS_DETAIL: (slug: string) => `/news/${slug}`,
  MEMBERS: "/members",
  MEMBER_DETAIL: (slug: string) => `/members/${slug}`,
  RESEARCHES: "/researches",
  RESEARCH_DETAIL: (slug: string) => `/researches/${slug}`,
  RESEARCH_AUTHOR_FILTERED: (authorName: string) =>
    `/researches?filter=author:${authorName}`,
  PROJECTS: "/projects",
  PROJECT_DETAIL: (slug: string) => `/projects/${slug}`,
  ABOUT: "/about",
  PRIVACY_POLICY: "/privacy-policy",
  COPYRIGHT: "/copyright",
} as const;
