import { CMSImage, CMSImageWithSize } from "@/components/feature/wrapImage";

export type GeneralPageModel = {
  slug: string;
  title: string;
  centering: boolean;
  contentMd: string;
};

export type AuthorModel = {
  id: string;
  fullName: string;
  familyName: {
    ja: string;
    en: string;
  };
  givenName: {
    ja: string;
    en: string;
  };
};

export type PartialMemberModel = {
  slug: string;
  name: string;
  thumbnailImg: CMSImage;
  displayRole: string;
  roleSortOrder: number;
  active: boolean;
};

export type MemberModel = PartialMemberModel & {
  author: AuthorModel | null;
  institution: string;
  contentMd: string;
  achievementMd: string;
};

export type PartialNewsModel = {
  slug: string;
  title: string;
  dateStr: string;
  thumbnailImg: CMSImage;
};

export type NewsModel = PartialNewsModel & {
  contentMd: string;
};

export type PartialPaperModel = {
  slug: string;
  title: string;
  abstract: string | null;
  publishDateStr: string;
  language: "english" | "japanese";
  authors: AuthorModel[];
  type: {
    en: string;
    ja: string;
  };
  journalTitle: string;
  keywords: string[];
  thumbnailImg: CMSImage;
};

export type PaperModel = PartialPaperModel & {
  publication: {
    url: string | null;
    volume: string | null;
    issue: string | null;
    pages: string | null;
    publisher: string | null;
    copyrightHolder: string | null;
    quotation: string;
    customMetaList: {
      key: string;
      value: string;
    }[];
  };
  pdfUrl: string | null;
  hero: PaperHeroModel | null;
};

export type PaperHeroModel =
  | {
      type: "image";
      image: CMSImageWithSize;
    }
  | {
      type: "youtube";
      youtubeId: string;
    }
  | {
      type: "slide";
      slidePdfUrl: string;
    };

export type PartialProjectModel = {
  slug: string;
  title: string;
  thumbnailImg: CMSImage;
  category: string;
};

export type ProjectModel = PartialProjectModel & {
  contentMd: string;
};

export type TopPageModel = {
  title: string;
  topImg: CMSImageWithSize;
  description: string;
};
