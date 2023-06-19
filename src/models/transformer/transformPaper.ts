import { Entry } from "contentful";

import { TypePaperSkeleton } from "@/models/contentful";
import { PaperHeroModel, PaperModel, PartialPaperModel } from "@/models/models";
import { transformAuthorModel } from "@/models/transformer/transformAuthor";
import { transformCMSImage } from "@/models/transformer/transformCMSImage";

export const transformPartialPaperModel = (
  paper: Entry<TypePaperSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>
): PartialPaperModel => {
  return {
    title: paper.fields.title,
    abstract: paper.fields.abstract,
    publishDateStr: paper.fields.publicationDate,
    language: paper.fields.language,
    authors: paper.fields.author
      .filter(filterTruthy)
      .map((author) => transformAuthorModel(author)),
    type: paper.fields.type,
    keywords: paper.fields.keyword,
    thumbnailImg: transformCMSImage(paper.fields.thumbnail?.fields.file),
  };
};

export const transformPaperModel = (
  paper: Entry<TypePaperSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>
): PaperModel => {
  const pages = `${paper.fields.firstPage} - ${paper.fields.lastPage}`;
  const quotation = ipsjQuotation(paper);

  const hero: PaperHeroModel = (() => {
    if (paper.fields.youtubeUrl) {
      return {
        type: "youtube",
        youtubeUrl: paper.fields.youtubeUrl,
      } satisfies PaperHeroModel;
    }
    if (paper.fields.slidePdf && paper.fields.slidePdf.fields.file?.url) {
      return {
        type: "slide",
        slidePdfUrl: paper.fields.slidePdf.fields.file?.url,
      } satisfies PaperHeroModel;
    }
    if (paper.fields.thumbnail && paper.fields.thumbnail.fields.file) {
      return {
        type: "image",
        image: transformCMSImage(paper.fields.thumbnail.fields.file),
      };
    }
    throw new Error("Paper hero image unresolved");
  })();

  return {
    ...transformPartialPaperModel(paper),
    publication: {
      url: paper.fields.publishUrl,
      journalTitle: paper.fields.journalTitle,
      volume: paper.fields.volume,
      issue: paper.fields.issue,
      pages: pages,
      copyrightHolder: paper.fields.copyrightHolder,
      quotation: quotation,
      customMetaList: paper.fields.customMetaList ?? [],
    },
    pdfUrl: paper.fields.pdf?.fields.file?.url,
    hero: hero,
  };
};

const ipsjQuotation = (
  paper: Entry<TypePaperSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>
): string => {
  //https://www.ipsj.or.jp/kenkyukai/innyo.html
  const title = paper.fields.title;
  const journalTitle = paper.fields.journalTitle;
  const volume = paper.fields.volume;
  const issue = paper.fields.issue;
  const pages = `${paper.fields.firstPage} - ${paper.fields.lastPage}`;
  const year = new Date(paper.fields.publicationDate).getFullYear();
  return `${title}, ${journalTitle}, Vol.${volume}, No.${issue}, pp.${pages}, ${year}`;
};

const filterTruthy = <T>(value: T | undefined): value is T => {
  return !!value;
};
