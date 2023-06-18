import { client } from "@/lib/cms/contentfulClient";
import { TypeNewsSkeleton } from "@/models/contentful";
import { PartialNewsModel } from "@/models/models";
import { transformPartialNewsModel } from "@/models/transformer/transformNews";

export const fetchPartialNewsList = async (): Promise<PartialNewsModel[]> => {
  const newsList =
    await client.withoutUnresolvableLinks.getEntries<TypeNewsSkeleton>({
      content_type: "news",
      order: ["-fields.date"],
    });

  return newsList.items.map((news) => transformPartialNewsModel(news));
};

export const fetchNews = async (slug: string): Promise<PartialNewsModel> => {
  const news =
    await client.withoutUnresolvableLinks.getEntries<TypeNewsSkeleton>({
      content_type: "news",
      "fields.slug": slug,
    });

  const newsEntry = news.items[0];
  if (newsEntry === undefined) {
    throw new Error("News not found");
  }

  return transformPartialNewsModel(news.items[0]);
};
