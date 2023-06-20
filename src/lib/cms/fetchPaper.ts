import { client } from "@/lib/cms/contentfulClient";
import { fetchAll } from "@/lib/cms/fetchAll";
import { TypePaperSkeleton } from "@/models/contentful";
import { PaperModel, PartialPaperModel } from "@/models/models";
import {
  transformPaperModel,
  transformPartialPaperModel,
} from "@/models/transformer/transformPaper";

export const fetchPartialPaperList = async (): Promise<PartialPaperModel[]> => {
  const papers = await fetchAll<TypePaperSkeleton>({
    content_type: "paper",
    select: [
      "fields.title",
      "fields.abstract",
      "fields.publicationDate",
      "fields.language",
      "fields.author",
      "fields.type",
      "fields.keyword",
      "fields.thumbnail",
    ],
    order: ["-fields.publicationDate"],
  });

  return papers.map((paper) => transformPartialPaperModel(paper));
};

export const fetchPaper = async (id: string): Promise<PaperModel> => {
  const paperEntry =
    await client.withoutUnresolvableLinks.getEntry<TypePaperSkeleton>(id, {});

  if (paperEntry === undefined) {
    throw new Error("Paper not found");
  }

  return transformPaperModel(paperEntry);
};
