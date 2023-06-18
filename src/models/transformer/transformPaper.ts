import { Entry } from "contentful";

import { TypePaperSkeleton } from "@/models/contentful";
import { PaperHeroModel, PaperModel, PartialPaperModel } from "@/models/models";
import { transformAuthorModel } from "@/models/transformer/transformAuthor";

export const transformPartialPaperModel = (
  paper: Entry<TypePaperSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>
): PartialPaperModel => {
  const imgUrl = paper.fields.thumbnail?.fields.file?.url;
  if (imgUrl === undefined) {
    throw new Error("Paper image unresolved");
  }

  return {
    title: paper.fields.title,
    abstract: paper.fields.abstract,
    publishDate: new Date(paper.fields.publicationDate),
    language: paper.fields.language,
    authors: paper.fields.author
      .filter(filterTruthy)
      .map((author) => transformAuthorModel(author)),
    type: paper.fields.type,
    keywords: paper.fields.keyword,
    thumbnailImg: {
      src: imgUrl,
    },
  };
};

export const transformPaperModel = (
  paper: Entry<TypePaperSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>
): PaperModel => {
  const pages = `${paper.fields.firstPage} - ${paper.fields.lastPage}`;
  const quotation = "";

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
        image: {
          src: paper.fields.thumbnail.fields.file.url,
          width: paper.fields.thumbnail.fields.file.details.image!.width,
          height: paper.fields.thumbnail.fields.file.details.image!.height,
        },
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

const filterTruthy = <T>(value: T | undefined): value is T => {
  return !!value;
};
