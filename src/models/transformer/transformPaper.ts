import { Entry } from "contentful";

import { CardDefaultImg } from "@/lib/publicImage";
import { ROUTES } from "@/lib/routes";
import { TypePaperSkeleton } from "@/models/contentful";
import { PaperHeroModel, PaperModel, PartialPaperModel } from "@/models/models";
import { transformAuthorModel } from "@/models/transformer/transformAuthor";
import { transformCMSImage } from "@/models/transformer/transformCMSImage";

export const paperTypeMap = {
  proceeding: {
    en: "Proceeding",
    ja: "予稿集",
  },
  journal: {
    en: "Journal",
    ja: "論文誌",
  },
  report: {
    en: "Report",
    ja: "研究報告",
  },
  thesis: {
    en: "Thesis",
    ja: "学位論文",
  },
} as const;

export const transformPartialPaperModel = (
  paper: Entry<TypePaperSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>
): PartialPaperModel => {
  const {
    title,
    abstract,
    publicationDate,
    language,
    journalTitle,
    author: authorsRaw,
    type,
    keyword,
    thumbnail,
  } = paper.fields;

  const thumbnailAsset = thumbnail?.fields.file;
  return {
    slug: paper.sys.id,
    title: title,
    abstract: abstract ?? null,
    publishDateStr: publicationDate,
    journalTitle: journalTitle,
    language: language,
    authors: authorsRaw
      .filter(filterTruthy)
      .map((author) => transformAuthorModel(author)),
    type: paperTypeMap[type],
    keywords: keyword,
    thumbnailImg: thumbnailAsset
      ? transformCMSImage(thumbnailAsset)
      : CardDefaultImg,
  };
};

export const transformPaperModel = (
  paper: Entry<TypePaperSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>
): PaperModel => {
  const entryId = paper.sys.id;
  const {
    publisher,
    copyrightHolder,
    pdf,
    volume,
    youtubeUrl,
    lastPage,
    issue,
    firstPage,
    slidePdf,
    publishUrl,
    customMetaList,
    thumbnail,
  } = paper.fields;

  const quotation = ipsjQuotation(paper);

  const hero: PaperHeroModel | null = (() => {
    if (youtubeUrl) {
      //https://www.youtube.com/watch?v=-d23dUR68JA
      //https://youtu.be/-d23dUR68JA?t=1

      const url = new URL(youtubeUrl);
      if (
        url.hostname === "www.youtube.com" ||
        url.hostname === "youtube.com"
      ) {
        const v = url.searchParams.get("v");
        if (v) {
          return {
            type: "youtube",
            youtubeId: v,
          } satisfies PaperHeroModel;
        }
      }

      if (url.hostname === "youtu.be") {
        // /-d23dUR68JAの1文字目の/を取り除く
        return {
          type: "youtube",
          youtubeId: url.pathname.slice(1),
        };
      }
    }

    if (slidePdf && slidePdf.sys.id) {
      return {
        type: "slide",
        slidePdfUrl: ROUTES.API_ASSET(slidePdf.sys.id),
      } satisfies PaperHeroModel;
    }

    if (thumbnail && thumbnail.fields.file) {
      return {
        type: "image",
        image: transformCMSImage(thumbnail.fields.file),
      };
    }

    return null;
  })();

  const metaList: PaperModel["publication"]["customMetaList"] = (
    customMetaList ?? []
  )
    .map((item) => {
      const [key, value] = item.split(":");
      if (!(key && value)) return undefined;
      return {
        key: key,
        value: value,
      };
    })
    .filter(filterTruthy);

  const pdfAssetId = pdf?.sys.id;

  return {
    ...transformPartialPaperModel(paper),
    publication: {
      url: publishUrl ?? null,
      volume: volume ?? null,
      issue: issue ?? null,
      firstPage: firstPage ?? null,
      lastPage: lastPage ?? null,
      publisher: publisher ?? null,
      copyrightHolder: copyrightHolder ?? null,
      quotation: quotation,
      customMetaList: metaList,
    },
    pdfUrl:
      pdfAssetId !== undefined
        ? ROUTES.RESEARCH_DETAIL_PDF(entryId, paper.fields.title)
        : null,
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
    language
  } = paper.fields;

  const authors = paper.fields.author.map((e) => {
    if (language === 'japanese') {
      return e?.fields.fullName
    } else if (language === 'english') {
      return e?.fields.givenNameEn + ' ' + e?.fields.familyNameEn
    }
  })
  const authorsStr = authors.reduce((accumulator, currentValue, currentIndex) => {
    if (currentIndex === authors.length - 1 && language === 'english') {
      const separater = authors.length > 2 ? ', and ' : ' and '
      return accumulator + separater + currentValue
    } else return accumulator + ', ' + currentValue
  })

  const pages = () => {
    if (!firstPage || !lastPage) return undefined;
    if (firstPage === lastPage) return `p.${firstPage}`;
    return `pp.${firstPage} - ${lastPage}`;
  };
  const year = new Date(publicationDate).getFullYear();

  const vol = volume ? `Vol.${volume}` : undefined;
  const no = issue ? `No.${issue}` : undefined;

  return authorsStr + ': ' + [title, journalTitle, vol, no, pages(), year]
    .filter((item) => !!item)
    .join(", ");
};

const filterTruthy = <T>(value: T | undefined): value is T => {
  return !!value;
};
