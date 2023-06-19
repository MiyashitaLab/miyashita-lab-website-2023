import { Entry } from "contentful";

import { TypeTopPageSkeleton } from "@/models/contentful";
import { TopPageModel } from "@/models/models";
import { transformCMSImage } from "@/models/transformer/transformCMSImage";

export const transformTopPageModel = (
  topContent: Entry<TypeTopPageSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>
): TopPageModel => {
  return {
    title: topContent.fields.title,
    topImg: transformCMSImage(topContent.fields.topImg?.fields.file),
    description: topContent.fields.description,
  };
};
