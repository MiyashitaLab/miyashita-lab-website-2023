import { Entry } from "contentful";

import { TypeProjectSkeleton } from "@/models/contentful";
import { PartialProjectModel, ProjectModel } from "@/models/models";

export const transformPartialProjectModel = (
  project: Entry<TypeProjectSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>
): PartialProjectModel => {
  if (project.fields.thumbnail?.fields.file?.url === undefined) {
    throw new Error("Project image unresolved");
  }

  return {
    title: project.fields.title,
    slug: project.fields.slug,
    thumbnail: {
      src: project.fields.thumbnail?.fields.file.url,
    },
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
