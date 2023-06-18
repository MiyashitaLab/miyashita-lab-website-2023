import { client } from "@/lib/cms/contentfulClient";
import { TypeProjectSkeleton } from "@/models/contentful";
import { PartialProjectModel } from "@/models/models";
import { transformPartialProjectModel } from "@/models/transformer/transformProject";

export const fetchPartialProjectList = async (): Promise<
  PartialProjectModel[]
> => {
  const projects =
    await client.withoutUnresolvableLinks.getEntries<TypeProjectSkeleton>({
      content_type: "project",
      order: ["-sys.updatedAt"],
    });

  return projects.items.map((project) => transformPartialProjectModel(project));
};

export const fetchProject = async (
  slug: string
): Promise<PartialProjectModel> => {
  const project =
    await client.withoutUnresolvableLinks.getEntries<TypeProjectSkeleton>({
      content_type: "project",
      "fields.slug": slug,
    });

  const projectEntry = project.items[0];
  if (projectEntry === undefined) {
    throw new Error("Project not found");
  }

  return transformPartialProjectModel(projectEntry);
};
