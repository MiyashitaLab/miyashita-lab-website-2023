import { Entry } from "contentful";

import { TypeTopPageSkeleton } from "@/models/contentful";
import { TopPageModel } from "@/models/models";

export const transformTopPageModel = (
  topContent: Entry<TypeTopPageSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>
): TopPageModel => {
  const imgUrl = topContent.fields.topImg?.fields.file?.url;
  if (imgUrl === undefined) {
    throw new Error("Top page image not found");
  }

  return {
    title: topContent.fields.title,
    topImg: {
      src: imgUrl,
    },
    description: topContent.fields.description,
  };
};
