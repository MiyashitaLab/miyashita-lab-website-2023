import { Entry } from "contentful";

import { TypeNewsSkeleton } from "@/models/contentful";
import { NewsModel, PartialNewsModel } from "@/models/models";

export const transformPartialNewsModel = (
  news: Entry<TypeNewsSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>
): PartialNewsModel => {
  const imgUrl = news.fields.thumbnail?.fields.file?.url;
  if (imgUrl === undefined) {
    throw new Error("News image unresolved");
  }

  return {
    title: news.fields.title,
    slug: news.fields.slug,
    date: new Date(news.fields.date),
    thumbnail: {
      src: imgUrl,
    },
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
