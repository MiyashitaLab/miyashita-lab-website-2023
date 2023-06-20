import { Entry } from "contentful";

import { CardDefaultImg } from "@/lib/publicImage";
import { TypePaperSkeleton } from "@/models/contentful";
import { PaperHeroModel, PaperModel, PartialPaperModel } from "@/models/models";
import { transformAuthorModel } from "@/models/transformer/transformAuthor";
import { transformCMSImage } from "@/models/transformer/transformCMSImage";

export const transformPartialPaperModel = (
  paper: Entry<TypePaperSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>
): PartialPaperModel => {
  const {
    title,
    abstract,
    publicationDate,
    language,
    author: authorsRaw,
    type,
    keyword,
    thumbnail,
  } = paper.fields;

  const thumbnailAsset = thumbnail?.fields.file;
  return {
    slug: paper.sys.id,
    title: title,
    abstract: abstract,
    publishDateStr: publicationDate,
    language: language,
    authors: authorsRaw
      .filter(filterTruthy)
      .map((author) => transformAuthorModel(author)),
    type: type,
    keywords: keyword,
    thumbnailImg: thumbnailAsset
      ? transformCMSImage(thumbnailAsset)
      : CardDefaultImg,
  };
};

export const transformPaperModel = (
  paper: Entry<TypePaperSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>
): PaperModel => {
  const {
    copyrightHolder,
    pdf,
    volume,
    youtubeUrl,
    lastPage,
    issue,
    journalTitle,
    firstPage,
    slidePdf,
    publishUrl,
    customMetaList,
    thumbnail,
  } = paper.fields;

  const pages = `${firstPage} - ${lastPage}`;
  const quotation = ipsjQuotation(paper);

  const hero: PaperHeroModel = (() => {
    if (youtubeUrl) {
      return {
        type: "youtube",
        youtubeUrl: youtubeUrl,
      } satisfies PaperHeroModel;
    }
    if (slidePdf && slidePdf.fields.file?.url) {
      return {
        type: "slide",
        slidePdfUrl: slidePdf.fields.file?.url,
      } satisfies PaperHeroModel;
    }
    if (thumbnail && thumbnail.fields.file) {
      return {
        type: "image",
        image: transformCMSImage(thumbnail.fields.file),
      };
    }
    throw new Error("Paper hero image unresolved");
  })();

  return {
    ...transformPartialPaperModel(paper),
    publication: {
      url: publishUrl,
      journalTitle: journalTitle,
      volume: volume,
      issue: issue,
      pages: pages,
      copyrightHolder: copyrightHolder,
      quotation: quotation,
      customMetaList: customMetaList ?? [],
    },
    pdfUrl: pdf?.fields.file?.url,
    hero: hero,
  };
};

const ipsjQuotation = (
  paper: Entry<TypePaperSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>
): string => {
  //https://www.ipsj.or.jp/kenkyukai/innyo.html
  const {
    title,
    journalTitle,
    volume,
    issue,
    publicationDate,
    lastPage,
    firstPage,
  } = paper.fields;

  const pages = `${firstPage} - ${lastPage}`;
  const year = new Date(publicationDate).getFullYear();
  return `${title}, ${journalTitle}, Vol.${volume}, No.${issue}, pp.${pages}, ${year}`;
};

const filterTruthy = <T>(value: T | undefined): value is T => {
  return !!value;
};
