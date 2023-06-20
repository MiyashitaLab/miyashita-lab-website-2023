import { client } from "@/lib/cms/contentfulClient";
import { TypeTopPageSkeleton } from "@/models/contentful";
import { TopPageModel } from "@/models/models";
import { transformTopPageModel } from "@/models/transformer/transformTopPage";

export const fetchTopPage = async (): Promise<TopPageModel> => {
  const top =
    await client.withoutUnresolvableLinks.getEntries<TypeTopPageSkeleton>({
      content_type: "topPage",
    });
  const topContent = top.items[0];
  if (topContent === undefined) {
    throw new Error("Top page data not found");
  }

  return transformTopPageModel(topContent);
};
