import { Entry } from "contentful";

import { TypeProjectSkeleton } from "@/models/contentful";
import { PartialProjectModel, ProjectModel } from "@/models/models";
import { transformCMSImage } from "@/models/transformer/transformCMSImage";

export const transformPartialProjectModel = (
  project: Entry<TypeProjectSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>
): PartialProjectModel => {
  return {
    title: project.fields.title,
    slug: project.fields.slug,
    thumbnail: transformCMSImage(project.fields.thumbnail?.fields.file),
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
