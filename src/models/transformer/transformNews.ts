import { Entry } from "contentful";

import { CardDefaultImg } from "@/lib/publicImage";
import { TypeNewsSkeleton } from "@/models/contentful";
import { NewsModel, PartialNewsModel } from "@/models/models";
import { transformCMSImage } from "@/models/transformer/transformCMSImage";

export const transformPartialNewsModel = (
  news: Entry<TypeNewsSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>
): PartialNewsModel => {
  const imgAsset = news.fields.thumbnail?.fields.file;
  return {
    title: news.fields.title,
    slug: news.fields.slug,
    dateStr: news.fields.date,
    thumbnail: imgAsset ? transformCMSImage(imgAsset) : CardDefaultImg,
  };
};

export const transformNewsModel = (
  news: Entry<TypeNewsSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>
): NewsModel => {
  return {
    ...transformPartialNewsModel(news),
    contentMd: news.fields.content,
  };
};
