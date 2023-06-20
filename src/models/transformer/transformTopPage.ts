import { Entry } from "contentful";

import { TypeTopPageSkeleton } from "@/models/contentful";
import { TopPageModel } from "@/models/models";
import { transformCMSImage } from "@/models/transformer/transformCMSImage";

export const transformTopPageModel = (
  topContent: Entry<TypeTopPageSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>
): TopPageModel => {
  const { topImg, description, title } = topContent.fields;

  const asset = topImg?.fields.file;
  if (!asset) {
    throw new Error("No top image found");
  }

  return {
    title: title,
    topImg: transformCMSImage(asset),
    description: description,
  };
};
