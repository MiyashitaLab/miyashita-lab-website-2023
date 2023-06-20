import { client } from "@/lib/cms/contentfulClient";
import { fetchAllEntries } from "@/lib/cms/fetchAllEntries";
import { TypePagesFields, TypePagesSkeleton } from "@/models/contentful";
import { GeneralPageModel } from "@/models/models";
import { transformPagesModel } from "@/models/transformer/transformPages";

export const fetchPageSlugs = async (): Promise<
  TypePagesFields["slug"]["values"][]
> => {
  const pages = await fetchAllEntries<TypePagesSkeleton>({
    content_type: "pages",
    select: ["fields.slug"],
  });
  return pages.map((page) => page.fields.slug);
};

export const fetchPage = async (
  slug: TypePagesFields["slug"]["values"]
): Promise<GeneralPageModel> => {
  const page =
    await client.withoutUnresolvableLinks.getEntries<TypePagesSkeleton>({
      content_type: "pages",
      "fields.slug": slug,
      include: 1,
    });

  const pageEntry = page.items[0];
  if (pageEntry === undefined) {
    throw new Error("Page not found");
  }

  return transformPagesModel(page.items[0]);
};
