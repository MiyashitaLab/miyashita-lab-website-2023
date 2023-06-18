import { client } from "@/lib/cms/contentfulClient";
import { TypePagesFields, TypePagesSkeleton } from "@/models/contentful";
import { GeneralPageModel } from "@/models/models";
import { transformPagesModel } from "@/models/transformer/transformPages";

export const fetchPageSlugs = async (): Promise<
  TypePagesFields["slug"]["values"][]
> => {
  const pages =
    await client.withoutUnresolvableLinks.getEntries<TypePagesSkeleton>({
      content_type: "pages",
      include: 1,
      select: ["fields.slug"],
    });
  return pages.items.map((page) => page.fields.slug);
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
