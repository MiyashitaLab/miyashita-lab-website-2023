import { client } from "@/lib/cms/contentfulClient";
import { fetchAllEntries } from "@/lib/cms/fetchAllEntries";
import { NEXT_PUBLIC_DISABLE_PROJECTS } from "@/lib/publicEnvironments";
import { TypeProjectSkeleton } from "@/models/contentful";
import { PartialProjectModel, ProjectModel } from "@/models/models";
import {
  transformPartialProjectModel,
  transformProjectModel,
} from "@/models/transformer/transformProject";

export const fetchLatestPartialProjectList = async (
  entryNum: number
): Promise<PartialProjectModel[]> => {
  if (NEXT_PUBLIC_DISABLE_PROJECTS) return [];

  const projects =
    await client.withoutUnresolvableLinks.getEntries<TypeProjectSkeleton>({
      content_type: "project",
      select: [
        "fields.category",
        "fields.slug",
        "fields.title",
        "fields.thumbnail",
      ],
      order: ["-sys.updatedAt"],
      limit: entryNum,
    });
  return projects.items.map((project) => transformPartialProjectModel(project));
};

export const fetchPartialProjectList = async (): Promise<
  PartialProjectModel[]
> => {
  if (NEXT_PUBLIC_DISABLE_PROJECTS) return [];

  const projects = await fetchAllEntries<TypeProjectSkeleton>({
    content_type: "project",
    select: [
      "fields.category",
      "fields.slug",
      "fields.title",
      "fields.thumbnail",
    ],
    order: ["-sys.updatedAt"],
  });

  return projects.map((project) => transformPartialProjectModel(project));
};

export const fetchProject = async (slug: string): Promise<ProjectModel> => {
  if (NEXT_PUBLIC_DISABLE_PROJECTS) {
    throw new Error("Project not found");
  }

  const project =
    await client.withoutUnresolvableLinks.getEntries<TypeProjectSkeleton>({
      content_type: "project",
      "fields.slug": slug,
    });

  const projectEntry = project.items[0];
  if (projectEntry === undefined) {
    throw new Error("Project not found");
  }

  return transformProjectModel(projectEntry);
};
