import { Entry } from "contentful";

import { CardDefaultImg } from "@/lib/publicImage";
import { TypeNewsSkeleton } from "@/models/contentful";
import { NewsModel, PartialNewsModel } from "@/models/models";
import { transformCMSImage } from "@/models/transformer/transformCMSImage";

export const transformPartialNewsModel = (
  news: Entry<TypeNewsSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>
): PartialNewsModel => {
  const { title, slug, date, thumbnail } = news.fields;

  const thumbnailAsset = thumbnail?.fields.file;
  return {
    title: title,
    slug: slug ?? title,
    dateStr: date,
    thumbnail: thumbnailAsset
      ? transformCMSImage(thumbnailAsset)
      : CardDefaultImg,
  };
};

export const transformNewsModel = (
  news: Entry<TypeNewsSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>
): NewsModel => {
  const { content } = news.fields;
  return {
    ...transformPartialNewsModel(news),
    contentMd: content,
  };
};
