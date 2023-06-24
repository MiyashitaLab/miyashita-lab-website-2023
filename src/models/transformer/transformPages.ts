import { Entry } from "contentful";

import { TypePagesSkeleton } from "@/models/contentful";
import { GeneralPageModel } from "@/models/models";

export const transformPagesModel = (
  pages: Entry<TypePagesSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>
): GeneralPageModel => {
  const { slug, title, centering, content } = pages.fields;

  return {
    slug: slug,
    title: title,
    contentMd: content,
    centering: centering,
  };
};
