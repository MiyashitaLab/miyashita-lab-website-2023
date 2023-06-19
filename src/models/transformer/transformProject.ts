import { Entry } from "contentful";

import { CardDefaultImg } from "@/lib/publicImage";
import { TypeProjectSkeleton } from "@/models/contentful";
import { PartialProjectModel, ProjectModel } from "@/models/models";
import { transformCMSImage } from "@/models/transformer/transformCMSImage";

export const transformPartialProjectModel = (
  project: Entry<TypeProjectSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>
): PartialProjectModel => {
  const thumbnailAsset = project.fields.thumbnail?.fields.file;
  return {
    title: project.fields.title,
    slug: project.fields.slug,
    thumbnail: thumbnailAsset
      ? transformCMSImage(thumbnailAsset)
      : CardDefaultImg,
    category: project.fields.category,
  };
};

export const transformProjectModel = (
  project: Entry<TypeProjectSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>
): ProjectModel => {
  return {
    ...transformPartialProjectModel(project),
    contentMd: project.fields.content,
  };
};
