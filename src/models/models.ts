import { CMSImage, CMSImageWithSize } from "@/components/feature/wrapImage";

export type GeneralPageModel = {
  slug: string;
  title: string;
  contentMd: string;
};

export type AuthorModel = {
  fullName: string;
  familyName: {
    ja: string;
    en: string;
  };
  lastName: {
    ja: string;
    en: string;
  };
};

export type PartialMemberModel = {
  slug: string;
  name: string;
  displayRole: string;
  roleSortOrder: number;
};

export type MemberModel = PartialMemberModel & {
  author?: AuthorModel;
  institution: string;
  contentMd?: string;
  achievementMd?: string;
};

export type PartialNewsModel = {
  slug: string;
  title: string;
  date: Date;
  thumbnail?: CMSImage;
};

export type NewsModel = PartialNewsModel & {
  contentMd: string;
};

export type PartialPaperModel = {
  title: string;
  abstract: string;
  publishDate: Date;
  language: "english" | "japanese";
  authors: AuthorModel[];
  type: "journal" | "proceeding" | "report" | "thesis";
  keywords: string[];
  thumbnailImg?: CMSImage;
};

export type PaperModel = PartialPaperModel & {
  publication: {
    url?: string;
    journalTitle: string;
    volume?: string;
    issue?: string;
    pages?: string;
    copyrightHolder?: string;
    quotation: string;
    customMetaList: string[];
  };
  pdfUrl?: string;
  hero: PaperHeroModel;
};

export type PaperHeroModel =
  | {
      type: "image";
      image: CMSImageWithSize;
    }
  | {
      type: "youtube";
      youtubeUrl: string;
    }
  | {
      type: "slide";
      slidePdfUrl: string;
    };

export type PartialProjectModel = {
  slug: string;
  title: string;
  thumbnail?: CMSImage;
  category: string;
};

export type ProjectModel = PartialProjectModel & {
  contentMd: string;
};

export type TopPageModel = {
  title: string;
  topImg: CMSImage;
  description: string;
};
