import { Entry } from "contentful";

import { TypePagesSkeleton } from "@/models/contentful";
import { GeneralPageModel } from "@/models/models";

export const transformPagesModel = (
  pages: Entry<TypePagesSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>
): GeneralPageModel => {
  return {
    slug: pages.fields.slug,
    title: pages.fields.title,
    contentMd: pages.fields.content,
  };
};
