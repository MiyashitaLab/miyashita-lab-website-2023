import { Entry } from "contentful";

import { CardDefaultImg } from "@/lib/publicImage";
import { TypeProjectSkeleton } from "@/models/contentful";
import { PartialProjectModel, ProjectModel } from "@/models/models";
import { transformCMSImage } from "@/models/transformer/transformCMSImage";

export const transformPartialProjectModel = (
  project: Entry<TypeProjectSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>
): PartialProjectModel => {
  const { category, slug, title, thumbnail } = project.fields;

  const thumbnailAsset = thumbnail?.fields.file;
  return {
    title: title,
    slug: slug,
    thumbnailImg: thumbnailAsset
      ? transformCMSImage(thumbnailAsset)
      : CardDefaultImg,
    category: category,
  };
};

export const transformProjectModel = (
  project: Entry<TypeProjectSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>
): ProjectModel => {
  const { content } = project.fields;
  return {
    ...transformPartialProjectModel(project),
    contentMd: content,
  };
};
